import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

// Inline style extracted to a module-level constant — avoids creating a new
// object on every render, which would force style recalculation each re-render
const HEADER_GRADIENT = {
  background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)',
}

// Schema created once at module level — stable reference so Seo's useEffect
// does not re-run on every render triggered by filter state changes
const productsServiceSchema = createServiceSchema({
  name: 'CUCKOO Products for Home Wellness',
  description:
    'Explore CUCKOO water purifiers, air purifiers, bidets, bubble cleanser systems, and massage chairs with flexible plans and installation support.',
  serviceType: 'Home wellness product selection support',
  path: '/products',
})
const PRODUCTS_SCHEMA = [productsServiceSchema]

const categoryDescriptions = {
  all: 'The full CUCKOO Rental America catalog, professionally installed and serviced.',
  water: 'Countertop, freestanding, and under-sink water purifiers from CUCKOO.',
  air: 'Room and whole-space air purifiers with intelligent real-time filtration.',
  bidet: 'Electric bidet seats with instant heating, remote control, and self-cleaning nozzles.',
  bubble: 'Shower-integrated microbubble cleanser for daily skin and hair care without added chemicals.',
  massage: 'Premium 3D and 4D massage chairs for whole-body recovery at home.',
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all')
  }, [searchParams])

  // Close mobile dropdown on Escape
  useEffect(() => {
    if (!filterOpen) return
    function onKey(e) { if (e.key === 'Escape') setFilterOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [filterOpen])

  // Memoized so the filter only recomputes when activeCategory changes,
  // not on every re-render (e.g. dropdown open/close state changes)
  const filtered = useMemo(
    () => activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  const activeCategoryLabel = categories.find(c => c.id === activeCategory)?.label ?? 'All Products'

  function handleCategory(id) {
    setActiveCategory(id)
    setFilterOpen(false)
    if (id === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: id })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pt-16">
      <Seo
        title="CUCKOO Water Purifiers, Air Purifiers, Bidets, and More"
        description="Browse PureHome Systems product catalog for premium CUCKOO water purifiers, air purifiers, bidets, bubble cleanser systems, and massage chairs."
        path="/products"
        canonical="https://purehomesystemsco.com/products"
        keywords="CUCKOO products, CUCKOO water purifier, CUCKOO air purifier, CUCKOO bidet, best water purifier for home, home wellness solutions, Santa Clara"
        schema={PRODUCTS_SCHEMA}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={HEADER_GRADIENT}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">CUCKOO Catalog</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight">
              All products
            </h1>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              {categoryDescriptions[activeCategory]}
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* ── Mobile filter button (hidden on sm+) ── */}
          <div className="relative sm:hidden mb-6">
            <button
              type="button"
              onClick={() => setFilterOpen(v => !v)}
              aria-haspopup="listbox"
              aria-expanded={filterOpen}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory !== 'all'
                  ? 'bg-charcoal text-white border border-charcoal'
                  : 'bg-white border border-border text-charcoal shadow-sm'
              }`}
            >
              {/* Funnel icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>{activeCategoryLabel}</span>
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {filterOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden="true"
                  onClick={() => setFilterOpen(false)}
                />
                {/* Dropdown */}
                <div
                  role="listbox"
                  aria-label="Filter by category"
                  className="absolute top-full left-0 mt-2 z-20 bg-white border border-border rounded-2xl shadow-[0_8px_28px_rgba(26,26,26,0.10)] overflow-hidden w-52"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      role="option"
                      aria-selected={activeCategory === cat.id}
                      onClick={() => handleCategory(cat.id)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm border-b border-border last:border-b-0 transition-colors ${
                        activeCategory === cat.id
                          ? 'bg-background text-charcoal font-semibold'
                          : 'text-charcoal-muted hover:bg-background hover:text-charcoal'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {activeCategory === cat.id && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Desktop filter chips (hidden on mobile) ── */}
          <div className="hidden sm:flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-white border border-border text-charcoal-muted hover:text-charcoal hover:border-charcoal/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Count + helper */}
          <p className="text-sm text-charcoal-muted mb-2">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
          <p className="text-sm text-charcoal-muted mb-8">
            Need help deciding? Read our{' '}
            <Link to="/guides" className="underline hover:text-charcoal transition-colors">
              home system buying guides
            </Link>
            .
          </p>

          {/* Grid — 2 cols on mobile, existing breakpoints on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map(product => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
