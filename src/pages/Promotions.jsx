import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import promotionsData from '../data/generated/promotions.json'
import { createBreadcrumbSchema, createServiceSchema } from '../seo/site'

// ─── Filter config ──────────────────────────────────────────────────────────

const FILTERS = [
  { id: 'all',     label: 'All Offers' },
  { id: 'water',   label: 'Water Purifiers' },
  { id: 'air',     label: 'Air Purifiers' },
  { id: 'bidet',   label: 'Bidets' },
  { id: 'bubble',  label: 'Bubble Cleanser' },
  { id: 'massage', label: 'Massage Chairs' },
]

const CATEGORY_LABELS = {
  water:   'Water Purifier',
  air:     'Air Purifier',
  bidet:   'Bidet',
  bubble:  'Bubble Cleanser',
  massage: 'Massage Chair',
}

const PROMO_TYPE_LABELS = {
  'discounted-price': 'On Sale',
  'monthly-plan':     'Monthly Plan',
  'featured-offer':   'Featured Offer',
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSyncDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function savingsAmount(promo) {
  if (!promo.salePrice || !promo.regularPrice) return null
  const sale = parseFloat(String(promo.salePrice).replace(/[$,]/g, ''))
  const reg  = parseFloat(String(promo.regularPrice).replace(/[$,]/g, ''))
  if (isNaN(sale) || isNaN(reg) || reg <= sale) return null
  return { amount: reg - sale, pct: Math.round(((reg - sale) / reg) * 100) }
}

// ─── Icons ──────────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// ─── Promotion card ─────────────────────────────────────────────────────────

function PromoCard({ promo }) {
  const savings  = savingsAmount(promo)
  const catLabel = CATEGORY_LABELS[promo.category]
  const typeLabel = PROMO_TYPE_LABELS[promo.promoType] || 'Offer'

  return (
    <article className="bg-white border border-border rounded-2xl flex flex-col hover:shadow-md transition-shadow duration-200 overflow-hidden">

      {/* Header band */}
      <div className="px-5 pt-5 pb-4 border-b border-border/60">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {catLabel && (
              <span className="px-2.5 py-1 bg-accent-blue-light text-accent-blue rounded-full text-[11px] font-semibold tracking-wide uppercase">
                {catLabel}
              </span>
            )}
            <span className="px-2.5 py-1 bg-background border border-border text-charcoal-muted rounded-full text-[11px] font-medium">
              {typeLabel}
            </span>
          </div>
          {savings && (
            <span className="flex-shrink-0 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-semibold">
              Save {savings.pct}%
            </span>
          )}
        </div>

        <h2 className="text-lg font-semibold text-charcoal leading-snug">
          {promo.title}
        </h2>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">

        <p className="text-sm text-charcoal-muted leading-relaxed">
          {promo.summary}
        </p>

        {/* Pricing */}
        {(promo.monthlyPrice || promo.salePrice) && (
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {promo.monthlyPrice && (
              <span className="text-xl font-bold text-charcoal">
                {promo.monthlyPrice}
              </span>
            )}
            {promo.salePrice && (
              <span className="text-base font-semibold text-charcoal">
                {promo.salePrice}
                {promo.regularPrice && promo.regularPrice !== promo.salePrice && (
                  <span className="ml-2 text-sm font-normal text-charcoal-muted line-through">
                    {promo.regularPrice}
                  </span>
                )}
              </span>
            )}
          </div>
        )}

        {/* Best for */}
        {promo.bestFor && (
          <div className="bg-background rounded-xl px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-charcoal-muted mb-1.5 font-semibold">Best for</p>
            <p className="text-sm text-charcoal leading-relaxed">{promo.bestFor}</p>
          </div>
        )}

        {/* Why it stands out */}
        {promo.whyItStandsOut && (
          <div className="flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-accent-green-light text-accent-green flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle />
            </span>
            <p className="text-sm text-charcoal-muted leading-relaxed">{promo.whyItStandsOut}</p>
          </div>
        )}

      </div>

      {/* Footer CTAs */}
      <div className="px-5 pb-5 pt-4 border-t border-border/60 flex gap-2">
        <Link
          to={promo.ctaUrl || '/get-recommendation'}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-charcoal text-white text-sm font-medium rounded-xl hover:bg-charcoal/85 transition-colors flex-1"
        >
          {promo.ctaUrl?.startsWith('/products/') ? 'View Product' : 'Browse Products'}
          <ArrowRight />
        </Link>
        <Link
          to="/get-recommendation"
          className="inline-flex items-center justify-center px-4 py-2.5 border border-border text-charcoal text-sm font-medium rounded-xl hover:bg-background transition-colors flex-1"
        >
          Get Recommendation
        </Link>
      </div>

    </article>
  )
}

// ─── How promotions work ────────────────────────────────────────────────────

function HowPromosWork() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-border">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <p className="section-label mb-3">Context</p>
        <h2 className="text-3xl font-semibold text-charcoal tracking-tight mb-10">How these promotions work</h2>
        <div className="flex flex-col gap-6">
          {[
            {
              title: 'Sale pricing vs. rental pricing',
              body: "Products listed with a sale price reflect the current reduced purchase price on CUCKOO's site. Rental plan pricing (shown as /mo) is separate and covers the equipment, installation, and ongoing service under a fixed term.",
            },
            {
              title: 'Rental plan types',
              body: 'Most products are available under Self Care plans (filters delivered, you replace them) or Visit Care plans (technician handles filter replacements on schedule). Term lengths are typically 3, 5, or 6 years depending on the product.',
            },
            {
              title: 'How to take advantage of a promotion',
              body: 'Contact us or use the recommendation form. We confirm current pricing and plan availability directly, then help you get the system ordered and installed. Pricing shown reflects our most recent sync with CUCKOO listings.',
            },
          ].map(item => (
            <div key={item.title} className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 items-start">
              <p className="text-sm font-semibold text-charcoal">{item.title}</p>
              <p className="text-sm text-charcoal-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Promotions() {
  const [activeFilter, setActiveFilter] = useState('all')

  const allPromos  = (promotionsData.promotions || []).filter(p => p.status === 'active')
  const syncDate   = formatSyncDate(promotionsData.lastSuccessfulSyncAt || promotionsData.syncedAt)

  const filtered = activeFilter === 'all'
    ? allPromos
    : allPromos.filter(p => p.category === activeFilter || p.category === null)

  const serviceSchema = createServiceSchema({
    name: 'Current Home Wellness Promotions',
    description: 'Current promotion highlights for CUCKOO home water, air, and comfort systems curated by PureHome Systems.',
    serviceType: 'Promotion and offer guidance',
    path: '/promotions',
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Promotions', path: '/promotions' },
  ])

  return (
    <div className="pt-16">
      <Seo
        title="Current Promotions | Home Water, Air, and Comfort Offers"
        description="Current CUCKOO sale pricing and featured offers on water purifiers, air purifiers, bidets, and massage chairs, presented with clear guidance by PureHome Systems."
        path="/promotions"
        keywords="water purifier promotions, air purifier offers, bidet deals, home wellness promotions, CUCKOO promotions, flexible plan offers"
        schema={[serviceSchema, breadcrumbSchema]}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Current Offers</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            Active promotions and sale pricing.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            Current CUCKOO sale pricing and featured offers, presented with our own context and guidance. Prices and availability are confirmed directly when you request a recommendation.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {syncDate && (
              <p className="text-xs text-white/30">Last synced: {syncDate}</p>
            )}
            {promotionsData.stale && (
              <p className="text-xs text-orange-400/70">Live sync unavailable. Showing last known data.</p>
            )}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1 -mx-1 px-1">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                  activeFilter === f.id
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-white border border-border text-charcoal-muted hover:text-charcoal hover:border-charcoal/25'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(promo => (
                  <PromoCard key={promo.id} promo={promo} />
                ))}
              </div>

              <p className="mt-10 text-xs text-charcoal-muted max-w-xl leading-relaxed">
                Pricing shown reflects CUCKOO Rental America's publicly listed pricing at the time of our last sync. Actual pricing and promotion availability are confirmed at the time of your inquiry. We do not guarantee that all listed offers remain active. Contact us to verify current pricing before proceeding.
              </p>
            </>
          ) : (
            <div className="text-center py-24 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-charcoal mb-3">No active offers in this category</h2>
              <p className="text-charcoal-muted text-sm leading-relaxed mb-8">
                Check back soon, or browse the full catalog and request a recommendation. We confirm current pricing on every inquiry.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/products" className="btn-primary gap-2">Browse Products</Link>
                <Link to="/get-recommendation" className="btn-secondary">Get Recommendation</Link>
              </div>
            </div>
          )}

        </div>
      </section>

      <HowPromosWork />

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
            Want help selecting the right offer?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            We confirm pricing, walk you through plan options, and help you move forward only when you are ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <Link to="/get-recommendation" className="btn-accent px-8 py-3.5 flex-1">
              Get My Free Recommendation
            </Link>
            <a href="tel:+14089102223" className="btn-secondary px-8 py-3.5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 flex-1">
              Call Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
