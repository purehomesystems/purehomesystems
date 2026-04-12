import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import https from 'node:https'
import { products } from '../src/data/products.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SOURCE_URL = 'https://cuckoorental.com/pages/promotion'
const OUTPUT_PATH = resolve(__dirname, '../src/data/generated/promotions.json')
const LOG_PATH = resolve(__dirname, './logs/promotions-sync.log')
const REQUEST_TIMEOUT_MS = 15000

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true })
}

function log(level, message, extra = '') {
  const line = `[${new Date().toISOString()}] [${level}] ${message}${extra ? ` | ${extra}` : ''}`
  console.log(line)
  ensureDir(LOG_PATH)
  appendFileSync(LOG_PATH, `${line}\n`, 'utf8')
}

function fetchHtml(url) {
  return new Promise((resolvePromise, rejectPromise) => {
    const request = https.get(
      url,
      {
        headers: {
          'User-Agent': 'PureHomeSystemsPromotionSync/1.0 (+https://purehomesystemsco.com)',
          Accept: 'text/html,application/xhtml+xml',
        },
      },
      (response) => {
        const { statusCode } = response
        if (!statusCode || statusCode >= 400) {
          rejectPromise(new Error(`HTTP ${statusCode || 'unknown'} from source`))
          response.resume()
          return
        }

        let data = ''
        response.setEncoding('utf8')
        response.on('data', (chunk) => {
          data += chunk
        })
        response.on('end', () => {
          resolvePromise(data)
        })
      },
    )

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error(`Timed out after ${REQUEST_TIMEOUT_MS}ms`))
    })

    request.on('error', (error) => rejectPromise(error))
  })
}

function decodeHtml(text = '') {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/')
    .replace(/\s+/g, ' ')
    .trim()
}

function stripTags(html = '') {
  return decodeHtml(html.replace(/<[^>]*>/g, ' '))
}

function sanitizeText(value = '') {
  return decodeHtml(value)
    .replace(/\{[%{][\s\S]*?[%}]\}/g, ' ')
    .replace(/[-–—>]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function normalizeName(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenSet(value = '') {
  const stopWords = new Set(['the', 'and', 'for', 'with', 'home', 'system', 'cuckoo', 'premium'])
  return new Set(
    normalizeName(value)
      .split(' ')
      .filter((token) => token.length > 2 && !stopWords.has(token)),
  )
}

function inferCategory(text = '') {
  const v = normalizeName(text)
  if (v.includes('water')) return 'water'
  if (v.includes('air')) return 'air'
  if (v.includes('bidet')) return 'bidet'
  if (v.includes('bubble')) return 'bubble'
  if (v.includes('massage')) return 'massage'
  return null
}

function inferBestFor(category) {
  if (category === 'water') return 'Homes prioritizing daily drinking-water convenience'
  if (category === 'air') return 'Households focused on room-by-room air quality support'
  if (category === 'bidet') return 'Bathrooms where comfort and routine usability are priorities'
  if (category === 'bubble') return 'Homes interested in shower-integrated cleansing systems'
  if (category === 'massage') return 'Users wanting in-home recovery and comfort support'
  return 'Homeowners comparing flexible plan options with installation support'
}

function inferSummary({ title, category, monthlyPrice, salePrice, regularPrice }) {
  const categoryCopy =
    category === 'water'
      ? 'water purification'
      : category === 'air'
      ? 'air purification'
      : category === 'bidet'
      ? 'bidet comfort'
      : category === 'bubble'
      ? 'shower microbubble cleansing'
      : category === 'massage'
      ? 'in-home massage comfort'
      : 'home wellness systems'

  const pricingPart = monthlyPrice
    ? ` Current listed pricing starts at ${monthlyPrice}.`
    : salePrice && regularPrice
    ? ` Listed offer pricing appears reduced from ${regularPrice} to ${salePrice}.`
    : ''

  return `${title} promotion focused on ${categoryCopy}.${pricingPart}`.trim()
}

function getPriceCandidates(text) {
  const matches = text.match(/\$\s?\d[\d,]*(?:\.\d{1,2})?(?:\s*\/\s*(?:mo|month))?/gi) || []
  return matches.map((m) => m.replace(/\s+/g, '').replace('/month', '/mo'))
}

function parseHeadline(html) {
  const headingMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (!headingMatch) return 'Current promotions'
  const heading = stripTags(headingMatch[1])
  return heading || 'Current promotions'
}

function parseJsonLdOffers(html) {
  const entries = []
  const scriptRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = scriptRegex.exec(html))) {
    const raw = match[1]?.trim()
    if (!raw) continue
    try {
      const parsed = JSON.parse(raw)
      const nodes = Array.isArray(parsed) ? parsed : [parsed]
      nodes.forEach((node) => {
        const queue = [node]
        while (queue.length > 0) {
          const current = queue.shift()
          if (!current || typeof current !== 'object') continue
          const type = String(current['@type'] || '').toLowerCase()
          if (type.includes('product') || type.includes('offer')) {
            const title = decodeHtml(current.name || current.headline || '')
            const sourceUrl = current.url || current.mainEntityOfPage || SOURCE_URL
            const offer = current.offers && typeof current.offers === 'object' ? current.offers : current
            const salePrice = offer.price ? `$${offer.price}` : null
            entries.push({ title, sourceUrl, salePrice, rawText: title })
          }
          Object.values(current).forEach((value) => {
            if (Array.isArray(value)) value.forEach((item) => queue.push(item))
            else if (value && typeof value === 'object') queue.push(value)
          })
        }
      })
    } catch {
      // ignore malformed json-ld
    }
  }
  return entries
}

function parseAnchorOffers(html) {
  const entries = []
  const anchorRegex = /<a[^>]+href=["']([^"']*\/products\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi
  const seen = new Set()
  let match

  while ((match = anchorRegex.exec(html))) {
    const href = match[1]
    if (href.includes('{{') || href.includes('{%')) continue
    const absoluteHref = href.startsWith('http') ? href : `https://cuckoorental.com${href.startsWith('/') ? '' : '/'}${href}`
    if (seen.has(absoluteHref)) continue
    seen.add(absoluteHref)

    const anchorHtml = match[2]
    const anchorTitle = sanitizeText(stripTags(anchorHtml))
    const index = match.index
    const context = html.slice(Math.max(0, index - 800), Math.min(html.length, index + 1200))
    const contextText = stripTags(context)
    const prices = getPriceCandidates(context)
    const monthlyPrice = prices.find((price) => /\/mo|mo$/i.test(price)) || null
    const salePrice = prices.find((price) => !/\/mo|mo$/i.test(price)) || null
    const regularPrice = prices.length > 1 ? prices[1] : null

    if (anchorTitle.includes('{{') || anchorTitle.includes('{%')) continue
    if (!anchorTitle && prices.length === 0) continue

    entries.push({
      title: anchorTitle || 'Promotion offer',
      sourceUrl: absoluteHref,
      monthlyPrice,
      salePrice,
      regularPrice,
      rawText: contextText,
    })
  }

  return entries
}

function bestProductMatch(candidateTitle, sourceUrl) {
  const sourceSlugMatch = sourceUrl.match(/\/products\/([^/?#]+)/i)
  const sourceSlug = sourceSlugMatch ? sourceSlugMatch[1].toLowerCase() : null
  if (sourceSlug) {
    const bySlug = products.find((p) => sourceSlug.includes(p.slug) || p.slug.includes(sourceSlug))
    if (bySlug) return bySlug
  }

  const candidateTokens = tokenSet(candidateTitle)
  if (candidateTokens.size === 0) return null

  let best = null
  let bestScore = 0

  products.forEach((product) => {
    const productTokens = tokenSet(`${product.name} ${product.model || ''}`)
    if (productTokens.size === 0) return

    let overlap = 0
    candidateTokens.forEach((token) => {
      if (productTokens.has(token)) overlap += 1
    })

    const score = overlap / Math.max(candidateTokens.size, productTokens.size)
    if (score > bestScore) {
      bestScore = score
      best = product
    }
  })

  return bestScore >= 0.25 ? best : null
}

function dedupeOffers(entries) {
  const map = new Map()
  entries.forEach((entry) => {
    const key = `${normalizeName(entry.title)}|${entry.sourceUrl}`
    if (!map.has(key)) {
      map.set(key, entry)
      return
    }

    const existing = map.get(key)
    map.set(key, {
      ...existing,
      monthlyPrice: existing.monthlyPrice || entry.monthlyPrice,
      salePrice: existing.salePrice || entry.salePrice,
      regularPrice: existing.regularPrice || entry.regularPrice,
      rawText: existing.rawText.length >= entry.rawText.length ? existing.rawText : entry.rawText,
    })
  })
  return [...map.values()]
}

function normalizePromotions({ headline, rawOffers, syncedAt }) {
  const deduped = dedupeOffers(rawOffers)

  return deduped.slice(0, 24).map((offer, index) => {
    const safeTitle = sanitizeText(offer.title)
    const productMatch = bestProductMatch(offer.title, offer.sourceUrl)
    const mergedName = productMatch?.name || safeTitle || 'Promotion Offer'
    const category = productMatch?.category || inferCategory(`${offer.title} ${offer.rawText}`)
    const ctaUrl = productMatch
      ? `/products/${productMatch.slug}`
      : category
      ? `/products?category=${category}`
      : '/get-recommendation'

    const promoType = offer.monthlyPrice
      ? 'monthly-plan'
      : offer.salePrice && offer.regularPrice
      ? 'discounted-price'
      : 'featured-offer'

    const title = safeTitle && safeTitle.length > 4 ? safeTitle : mergedName

    return {
      id: `${slugify(mergedName)}-${index + 1}`,
      slug: slugify(title || mergedName || `promotion-${index + 1}`),
      title,
      sourceHeadline: headline,
      productName: mergedName,
      category,
      summary: inferSummary({
        title,
        category,
        monthlyPrice: offer.monthlyPrice,
        salePrice: offer.salePrice,
        regularPrice: offer.regularPrice,
      }),
      monthlyPrice: offer.monthlyPrice || null,
      salePrice: offer.salePrice || null,
      regularPrice: offer.regularPrice || null,
      promoType,
      bestFor: inferBestFor(category),
      status: 'active',
      sourceUrl: offer.sourceUrl || SOURCE_URL,
      ctaUrl,
      syncedAt,
    }
  }).filter((promotion) => {
    const invalidPatterns = ['{{', '{%', 'translation.', 'product.handle']
    const combined = `${promotion.title} ${promotion.sourceUrl}`.toLowerCase()
    return !invalidPatterns.some((pattern) => combined.includes(pattern))
  })
}

// ─── Curated seed data ───────────────────────────────────────────────────────
// These hand-verified promotions are always written as the baseline.
// Parser-found promos supplement (but never replace) curated entries.
// To update a curated entry: edit directly here, then run the sync.

const CURATED_PROMOTIONS = [
  {
    id: 'four-product-bundle-2026',
    slug: 'four-product-bundle',
    title: '4 Systems, One Home',
    sourceHeadline: 'Current Promotions',
    productName: 'Water Purifier, Air Purifier, Bidet, Massage Chair',
    category: null,
    summary: "CUCKOO's current featured promotion spans all four main product categories: water purifier, air purifier, bidet, and massage chair. Each category has models at reduced sale pricing with flexible monthly rental plans starting at $19.99/mo.",
    monthlyPrice: '$19.99/mo',
    salePrice: null,
    regularPrice: null,
    promoType: 'featured-offer',
    bestFor: 'Homeowners outfitting a new home or upgrading multiple rooms at once',
    whyItStandsOut: 'Covers all four major categories under one rental program. Each system includes professional installation and its own service plan.',
    status: 'active',
    sourceUrl: SOURCE_URL,
    ctaUrl: '/products',
  },
  {
    id: 'fit-water-purifier-sale-2026',
    slug: 'fit-water-purifier',
    title: 'FIT Water Purifier',
    sourceHeadline: 'Current Promotions',
    productName: 'CUCKOO FIT Water Purifier',
    category: 'water',
    summary: 'The FIT Water Purifier (CP-MN031W) is currently listed at $509, down from $599. A compact countertop unit with self-cleaning technology, hot/cold/room-temperature dispensing, and quiet operation. Rental plans start at $19.99/mo under a Self Care plan.',
    monthlyPrice: '$19.99/mo',
    salePrice: '$509',
    regularPrice: '$599',
    promoType: 'discounted-price',
    bestFor: 'First-time renters and small households wanting entry-level purification with hands-off maintenance',
    whyItStandsOut: '$90 off the regular price. The lowest available monthly rental rate in the CUCKOO lineup. Self-cleaning means no manual filter contact between scheduled deliveries.',
    status: 'active',
    sourceUrl: 'https://cuckoorental.com/products/cp-mn031',
    ctaUrl: '/products/fit-water-purifier',
  },
  {
    id: 'bidet-promotion-2026',
    slug: 'inspure-instant-heating-premium-bidet',
    title: 'Inspure Instant Heating Premium Bidet',
    sourceHeadline: 'Current Promotions',
    productName: 'CUCKOO Inspure Instant Heating Premium Bidet',
    category: 'bidet',
    summary: 'CUCKOO is currently featuring their bidet lineup. The Inspure Instant Heating Premium Bidet (CBT-IS1131) includes instant heating, a 3-in-1 stainless steel self-cleaning nozzle, air drying, seat temperature adjustment, and remote control. Available for elongated and round toilet seats.',
    monthlyPrice: null,
    salePrice: '$649',
    regularPrice: '$649',
    promoType: 'featured-offer',
    bestFor: 'Homeowners upgrading their bathroom who want instant heating and professional installation included',
    whyItStandsOut: 'Includes CUCKOO certified professional installation. The 3-in-1 stainless steel nozzle self-cleans before and after every use.',
    status: 'active',
    sourceUrl: 'https://cuckoorental.com/products/cbt-is1131',
    ctaUrl: '/products/inspure-instant-heating-premium-bidet',
  },
  {
    id: 'room-care-air-purifier-sale-2026',
    slug: 'room-care-smart-air-purifier',
    title: 'Room Care Smart Air Purifier',
    sourceHeadline: 'Current Promotions',
    productName: 'CUCKOO Room Care Smart Air Purifier',
    category: 'air',
    summary: 'The Room Care Smart Air Purifier (CAC-C1020FW) is listed at $594, down from $699. Features real-time 6-color LED air quality indicators, automatic room-size detection, a dust sensor, and a dedicated baby mode. Runs continuously with whisper-quiet operation.',
    monthlyPrice: null,
    salePrice: '$594',
    regularPrice: '$699',
    promoType: 'discounted-price',
    bestFor: 'Households with allergy concerns, pets, or young children',
    whyItStandsOut: '$105 off the regular price. The 6-color real-time LED display shows air quality at a glance without needing an app.',
    status: 'active',
    sourceUrl: 'https://cuckoorental.com/products/cac-c1020fw',
    ctaUrl: '/products/room-care-smart-air-purifier',
  },
  {
    id: 'tower-max-air-purifier-sale-2026',
    slug: 'tower-max-air-purifier',
    title: 'Tower MAX Air Purifier',
    sourceHeadline: 'Current Promotions',
    productName: 'CUCKOO Tower MAX Air Purifier',
    category: 'air',
    summary: 'The Tower MAX Air Purifier (CAC-D2020FW) is listed at $849, down from $999. A 360-degree purification tower with 8,200 air filtration pores for comprehensive room coverage and effective pet dander removal. The all-in-one filter simplifies replacement.',
    monthlyPrice: null,
    salePrice: '$849',
    regularPrice: '$999',
    promoType: 'discounted-price',
    bestFor: 'Larger living spaces, open-plan homes, or households with multiple pets',
    whyItStandsOut: '$150 off the regular price. The 360-degree design eliminates directional dead spots in coverage, effective for larger or irregularly shaped rooms.',
    status: 'active',
    sourceUrl: 'https://cuckoorental.com/products/cac-d2020fw',
    ctaUrl: '/products/tower-max-air-purifier',
  },
  {
    id: 'renature-3d-massage-chair-sale-2026',
    slug: 'renature-3d-massage-chair',
    title: 'Renature 3D Massage Chair',
    sourceHeadline: 'Current Promotions',
    productName: 'CUCKOO Renature 3D Massage Chair',
    category: 'massage',
    summary: 'The Renature 3D Massage Chair (CMS-D10SLGB) is listed at $4,499, reduced from $5,499. A full-body 3D massage chair with 12 automatic modes, foot rollers, full-body scan, zero-gravity positioning, Bluetooth speakers, and long-range remote.',
    monthlyPrice: '$89/mo',
    salePrice: '$4,499',
    regularPrice: '$5,499',
    promoType: 'discounted-price',
    bestFor: 'Homeowners who want a full-body recovery tool at home without a recurring gym or spa cost',
    whyItStandsOut: '$1,000 off the regular price. A monthly rental option at $89/mo over 5 years removes the large upfront cost entirely.',
    status: 'active',
    sourceUrl: 'https://cuckoorental.com/products/cms-d10slgb',
    ctaUrl: '/products/renature-3d-massage-chair',
  },
  {
    id: 'bubble-cleanser-sale-2026',
    slug: 'micro-bubble-cleanser',
    title: 'Micro-Bubble Cleanser',
    sourceHeadline: 'Current Promotions',
    productName: 'CUCKOO Micro-Bubble Cleanser',
    category: 'bubble',
    summary: 'The Micro-Bubble Cleanser (CWS-AO201W) is listed at $509, down from $599. A shower-integrated microbubble system that generates nanobubbles to cleanse skin and hair without chemical additives. Installs inline with your existing showerhead.',
    monthlyPrice: null,
    salePrice: '$509',
    regularPrice: '$599',
    promoType: 'discounted-price',
    bestFor: 'Anyone with sensitive skin, dry hair, or looking to reduce chemical exposure in their daily shower routine',
    whyItStandsOut: '$90 off the regular price. Works with your existing shower setup and requires no specialized maintenance between scheduled filter services.',
    status: 'active',
    sourceUrl: 'https://cuckoorental.com/products/cws-ao201w',
    ctaUrl: '/products/micro-bubble-cleanser',
  },
]

function loadExistingData() {
  if (!existsSync(OUTPUT_PATH)) return null
  try {
    return JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'))
  } catch (error) {
    log('ERROR', 'Failed to parse existing promotions cache', error.message)
    return null
  }
}

function writeData(payload) {
  ensureDir(OUTPUT_PATH)
  writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2))
}

// Merge strategy: curated items are always the foundation.
// Valid parser-found items are appended if they introduce a new product slug
// not already covered by a curated entry.
function mergeWithCurated(parsed, syncedAt) {
  const curatedWithTimestamp = CURATED_PROMOTIONS.map(p => ({ ...p, syncedAt }))
  if (!parsed || parsed.length === 0) return curatedWithTimestamp

  const curatedSlugs = new Set(curatedWithTimestamp.map(p => p.slug))
  const newFromParser = parsed.filter(p => p.slug && !curatedSlugs.has(p.slug))

  if (newFromParser.length > 0) {
    log('INFO', `Parser found ${newFromParser.length} additional promotions not in curated set`)
  }

  return [...curatedWithTimestamp, ...newFromParser]
}

async function main() {
  const existing = loadExistingData()
  const now = new Date().toISOString()

  try {
    const html = await fetchHtml(SOURCE_URL)
    const headline = parseHeadline(html)
    const jsonLdOffers = parseJsonLdOffers(html)
    const anchorOffers = parseAnchorOffers(html)

    const combined = [...anchorOffers, ...jsonLdOffers]
    const normalized = normalizePromotions({
      headline,
      rawOffers: combined,
      syncedAt: now,
    })

    const finalPromotions = mergeWithCurated(normalized, now)

    const payload = {
      version: 1,
      sourceUrl: SOURCE_URL,
      sourceHeadline: headline,
      syncedAt: now,
      lastSuccessfulSyncAt: now,
      syncStatus: normalized.length > 0 ? 'success' : 'curated',
      stale: false,
      message: normalized.length === 0 ? 'Source parsed but returned no new entries. Showing curated promotions.' : '',
      promotions: finalPromotions,
    }

    writeData(payload)
    log('INFO', `Promotions written: ${finalPromotions.length} total (${normalized.length} from parser, ${CURATED_PROMOTIONS.length} curated)`)
  } catch (error) {
    // Fetch failed — write curated data with fallback metadata
    const finalPromotions = mergeWithCurated(existing?.promotions?.filter(p => !CURATED_PROMOTIONS.some(c => c.id === p.id)) || [], now)

    const fallbackPayload = {
      version: 1,
      sourceUrl: SOURCE_URL,
      sourceHeadline: existing?.sourceHeadline || 'Current Promotions',
      syncedAt: now,
      lastSuccessfulSyncAt: existing?.lastSuccessfulSyncAt || existing?.syncedAt || null,
      syncStatus: 'fallback',
      stale: true,
      message: `Live sync unavailable: ${error.message}. Showing curated promotions.`,
      promotions: finalPromotions,
    }

    writeData(fallbackPayload)
    log('ERROR', 'Promotion sync failed — wrote curated fallback', error.message)
  }
}

main()
