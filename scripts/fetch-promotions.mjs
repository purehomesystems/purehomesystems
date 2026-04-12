/**
 * fetch-promotions.mjs
 *
 * Build-time script that fetches the CUCKOO Rental America promotions page,
 * parses whatever content is available from the server-rendered HTML, and
 * writes a normalized JSON file to src/data/promotions.json.
 *
 * If the fetch fails or returns unusable content the existing JSON is
 * preserved and only the lastSynced / fetchError fields are updated so the
 * app always has valid data to render.
 *
 * Run:  node scripts/fetch-promotions.mjs
 * Auto: fired before every `vite build` via the "build" npm script.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const OUTPUT     = join(__dirname, '../src/data/promotions.json')
const SOURCE_URL = 'https://cuckoorental.com/pages/promotion'

// ─── Helpers ────────────────────────────────────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function extractPrices(text) {
  const patterns = [
    // $19.99/mo  $19.99/month
    /\$(\d{1,4}(?:\.\d{2})?)\s*\/\s*mo(?:nth)?/gi,
    // $599  $1,299
    /\$(\d{1,2},?\d{3}(?:\.\d{2})?)/g,
  ]
  const found = []
  for (const re of patterns) {
    let m
    while ((m = re.exec(text)) !== null) {
      const val = parseFloat(m[1].replace(',', ''))
      if (!isNaN(val) && val > 0) found.push(val)
    }
  }
  return [...new Set(found)].sort((a, b) => a - b)
}

// Map rough text signals to our category keys
const CATEGORY_SIGNALS = {
  water: ['water purifier', 'water system', 'filtration', 'purifier', 'ro purifier', 'reverse osmosis'],
  air:   ['air purifier', 'air system', 'air quality', 'hepa', 'air filtration'],
  bidet: ['bidet', 'toilet seat', 'bathroom'],
  massage: ['massage chair', 'massage', 'renature'],
  bubble: ['bubble cleanser', 'microbubble', 'bubble'],
}

function detectCategory(text) {
  const lower = text.toLowerCase()
  for (const [cat, signals] of Object.entries(CATEGORY_SIGNALS)) {
    if (signals.some(s => lower.includes(s))) return cat
  }
  return 'all'
}

// Map category → our slug patterns (first match wins)
const SLUG_MAP = {
  water:   'fit-water-purifier',
  air:     'room-care-smart-air-purifier',
  bidet:   'inspure-instant-heating-premium-bidet',
  massage: 'renature-3d-massage-chair',
  bubble:  'micro-bubble-cleanser',
}

// Extract H2/H3 headings from raw HTML
function extractHeadings(html) {
  const re = /<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi
  const headings = []
  let m
  while ((m = re.exec(html)) !== null) {
    const text = stripHtml(m[1]).trim()
    if (text.length > 3 && text.length < 200) headings.push(text)
  }
  return headings
}

// Extract paragraphs / block text
function extractBlocks(html) {
  const re = /<(?:p|li|div)[^>]*>([\s\S]*?)<\/(?:p|li|div)>/gi
  const blocks = []
  let m
  while ((m = re.exec(html)) !== null) {
    const text = stripHtml(m[1]).trim()
    if (text.length > 20 && text.length < 600) blocks.push(text)
  }
  return [...new Set(blocks)]
}

// Build normalized promo objects from discovered content
function buildPromosFromParsed({ headings, blocks, prices, html }) {
  const promos = []

  // Group headings with nearby blocks + prices
  for (let i = 0; i < headings.length; i++) {
    const title = headings[i]
    const lower = title.toLowerCase()

    // Skip headings that look like navigation or page chrome
    const skip = ['menu', 'cart', 'search', 'footer', 'header', 'navigation', 'sign in', 'log in']
    if (skip.some(s => lower.includes(s))) continue

    const category = detectCategory(title)
    const nearbyBlocks = blocks.filter(b => {
      const bl = b.toLowerCase()
      return Object.values(CATEGORY_SIGNALS)
        .flat()
        .some(sig => bl.includes(sig))
    }).slice(0, 2)

    const summary = nearbyBlocks[0] || ''
    const relevantPrices = prices.slice(0, 3)

    const monthly = relevantPrices.find(p => p < 200)
    const sale    = relevantPrices.find(p => p >= 200 && p < 5000)

    // Require at least some useful signal
    if (!summary && !monthly && !sale) continue

    promos.push({
      id: `parsed-${i}-${Date.now()}`,
      title,
      summary: summary.slice(0, 280),
      sourceHeadline: title,
      productName: '',
      productCategory: category,
      productSlug: SLUG_MAP[category] || '',
      monthlyPrice: monthly || null,
      salePrice: sale || null,
      regularPrice: null,
      promoType: lower.includes('sale') || lower.includes('off') ? 'sale' : 'featured',
      status: 'active',
      bestFor: '',
      whyItStandsOut: '',
      sourceUrl: SOURCE_URL,
      lastSynced: new Date().toISOString(),
    })
  }

  return promos
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const now = new Date().toISOString()

  // Load existing data as fallback
  let existing = null
  if (existsSync(OUTPUT)) {
    try {
      existing = JSON.parse(readFileSync(OUTPUT, 'utf8'))
    } catch {
      console.warn('[promotions] Could not parse existing promotions.json — will use seed on failure')
    }
  }

  // ── Fetch ────────────────────────────────────────────────────────────────
  let html = ''
  let fetchError = null

  try {
    console.log(`[promotions] Fetching ${SOURCE_URL} …`)
    const res = await fetch(SOURCE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    html = await res.text()
    console.log(`[promotions] Fetched ${(html.length / 1024).toFixed(1)} KB`)
  } catch (err) {
    fetchError = err.message
    console.warn(`[promotions] Fetch failed: ${err.message}`)
  }

  // ── Parse ────────────────────────────────────────────────────────────────
  let parsedPromos = []

  if (html.length > 2000) {
    const headings = extractHeadings(html)
    const blocks   = extractBlocks(html)
    const text     = stripHtml(html)
    const prices   = extractPrices(text)

    console.log(`[promotions] Found ${headings.length} headings, ${blocks.length} blocks, ${prices.length} prices`)

    parsedPromos = buildPromosFromParsed({ headings, blocks, prices, html })
    console.log(`[promotions] Built ${parsedPromos.length} parsed promotions`)
  }

  // ── Merge strategy ───────────────────────────────────────────────────────
  //  - If we parsed fresh content: use parsed + curated seed (curated takes precedence)
  //  - If parse returned nothing: preserve existing promotions, update metadata only
  //  - Curated items (those without 'parsed-' prefix) are always preserved

  const curatedFromExisting = existing?.promotions?.filter(p => !p.id.startsWith('parsed-')) || []

  let finalPromos
  if (parsedPromos.length > 0) {
    // Merge: curated first, then parsed (deduped by title)
    const titles = new Set(curatedFromExisting.map(p => p.title.toLowerCase()))
    const newParsed = parsedPromos.filter(p => !titles.has(p.title.toLowerCase()))
    finalPromos = [...curatedFromExisting, ...newParsed]
    console.log(`[promotions] Merged: ${curatedFromExisting.length} curated + ${newParsed.length} parsed`)
  } else {
    // Nothing new — keep existing promotions unchanged
    finalPromos = existing?.promotions || []
    console.log(`[promotions] No new parsed data — preserving ${finalPromos.length} existing promotions`)
  }

  // ── Write ────────────────────────────────────────────────────────────────
  const output = {
    lastSynced: now,
    fetchError,
    sourcePage: SOURCE_URL,
    promotions: finalPromos,
  }

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf8')
  console.log(`[promotions] Wrote ${finalPromos.length} promotions to src/data/promotions.json`)
}

main().catch(err => {
  console.error('[promotions] Fatal error:', err)
  // Do not exit with code 1 — a fetch failure must not break the build
})
