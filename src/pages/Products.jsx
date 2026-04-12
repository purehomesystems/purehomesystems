import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

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

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all')
  }, [searchParams])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const productsServiceSchema = createServiceSchema({
    name: 'CUCKOO Products for Home Wellness',
    description:
      'Explore CUCKOO water purifiers, air purifiers, bidets, bubble cleanser systems, and massage chairs with flexible plans and installation support.',
    serviceType: 'Home wellness product selection support',
    path: '/products',
  })

  function handleCategory(id) {
    setActiveCategory(id)
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
        schema={[productsServiceSchema]}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
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
          {/* Category filters */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
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

          {/* Count */}
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

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
