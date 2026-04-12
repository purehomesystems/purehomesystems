import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { openInstagram, INSTAGRAM_WEB } from '../utils/social'
import { products, formatPrice } from '../data/products'
import { rentalPlans } from '../data/rentalPlans'
import ProductCard from '../components/ProductCard'
import { getGuideBySlug } from '../data/guides'
import Seo from '../seo/Seo'
import {
  createBreadcrumbSchema,
  createProductSchema,
  createServiceSchema,
} from '../seo/site'

function fmt(price) {
  return `$${price.toFixed(2)}`
}

function RentalTable({ label, rows }) {
  return (
    <div>
      <p className="text-xs font-semibold text-charcoal mb-2">{label}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 font-medium text-charcoal-muted">Term</th>
              <th className="text-right py-2 pr-4 font-medium text-charcoal-muted">$0 Down</th>
              <th className="text-right py-2 font-medium text-charcoal-muted">$100 Down</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.term} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-4 text-charcoal">{row.term}</td>
                <td className="py-2.5 pr-4 text-right text-charcoal">{fmt(row.d0)}/mo</td>
                <td className="py-2.5 text-right text-charcoal">{fmt(row.d100)}/mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RentalPlansSection({ slug }) {
  const plans = rentalPlans[slug]
  const [open, setOpen] = useState(false)
  if (!plans) return null

  const hasSelfCare = plans.selfCare && plans.selfCare.length > 0
  const hasVisitCare = plans.visitCare && plans.visitCare.length > 0
  const isSingle = plans.single && plans.single.length > 0

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-white flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
        >
          Rental plans
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <Link to="/rental-plans" className="text-xs text-charcoal-muted underline hover:text-charcoal transition-colors">
          How rental works
        </Link>
      </div>
      {open && (
      <div className="px-5 py-5 flex flex-col gap-6 bg-background">
        {isSingle && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-charcoal-muted">Term</th>
                    <th className="text-right py-2 pr-4 font-medium text-charcoal-muted">Down Payment</th>
                    <th className="text-right py-2 font-medium text-charcoal-muted">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.single.map((row) => (
                    <tr key={row.term} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-4 text-charcoal">{row.term}</td>
                      <td className="py-2.5 pr-4 text-right text-charcoal">${row.down}</td>
                      <td className="py-2.5 text-right text-charcoal">${row.monthly}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {hasSelfCare && (
          <RentalTable label="Rental — Self Care" rows={plans.selfCare} />
        )}

        {hasVisitCare && (
          <RentalTable label="Rental — Visit Care" rows={plans.visitCare} />
        )}

        <div className="pt-1 border-t border-border flex flex-col gap-1.5">
          {hasSelfCare && (
            <p className="text-xs text-charcoal-muted">
              <span className="font-medium text-charcoal">Self Care:</span> Replacement filters shipped to you on a set schedule. You install them.
            </p>
          )}
          {hasVisitCare && (
            <p className="text-xs text-charcoal-muted">
              <span className="font-medium text-charcoal">Visit Care:</span> CUCKOO technician visits your home to replace filters and inspect the system.
            </p>
          )}
        </div>
      </div>
      )}
    </div>
  )
}

const categoryLabels = {
  water: 'Water Purifier',
  air: 'Air Purifier',
  bidet: 'Bidet',
  bubble: 'Bubble Cleanser',
  massage: 'Massage Chair',
}

const categoryGuideSlugs = {
  water: [
    'best-water-purifier-for-home',
    'water-purifier-vs-water-filter',
    'how-to-choose-a-water-purifier',
  ],
  air: [
    'best-air-purifier-for-home',
    'air-purifier-for-allergies',
  ],
  bidet: [
    'benefits-of-a-bidet',
    'bidet-vs-toilet-paper',
  ],
}

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [activeVariant, setActiveVariant] = useState(0)

  useEffect(() => {
    if (!product) navigate('/products', { replace: true })
    setActiveImage(0)
    setActiveVariant(0)
  }, [product, navigate, slug])

  if (!product) return null

  const hasDiscount = product.comparePrice && product.comparePrice > product.price
  const savings = hasDiscount ? product.comparePrice - product.price : 0
  const hasVariants = product.variants && product.variants.length > 1

  const related = products
    .filter(p => p.category === product.category && p.slug !== slug)
    .slice(0, 3)
  const buyingGuides = (categoryGuideSlugs[product.category] || [])
    .map((guideSlug) => getGuideBySlug(guideSlug))
    .filter(Boolean)

  const productSchema = createProductSchema(product)
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: categoryLabels[product.category] || product.category, path: `/products?category=${product.category}` },
    { name: product.name, path: `/products/${product.slug}` },
  ])
  const productServiceSchema = createServiceSchema({
    name: `${product.name} Consultation and Installation Support`,
    description: `Get guidance on whether ${product.name} is the right fit for your home, including flexible plan options and setup support.`,
    serviceType: 'Product recommendation and installation support',
    path: `/products/${product.slug}`,
  })

  return (
    <div className="pt-16">
      <Seo
        title={`${product.name} | CUCKOO ${categoryLabels[product.category] || 'Home System'}`}
        description={
          product.description ||
          `${product.name} by CUCKOO. Compare features, pricing, and flexible plan options with professional installation and service support from PureHome Systems.`
        }
        path={`/products/${product.slug}`}
        keywords={`${product.name}, ${categoryLabels[product.category] || 'home wellness system'}, CUCKOO authorized partner, flexible plans, water purifier installation, home wellness systems`}
        image={product.images?.[0]}
        type="product"
        schema={[productSchema, breadcrumbSchema, productServiceSchema]}
      />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
        <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs sm:text-sm text-charcoal-muted">
          <Link to="/products" className="hover:text-charcoal transition-colors flex-shrink-0">Products</Link>
          <span className="flex-shrink-0 select-none">/</span>
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-charcoal transition-colors capitalize flex-shrink-0"
          >
            {categoryLabels[product.category] || product.category}
          </Link>
          <span className="flex-shrink-0 select-none">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">

            {/* Image gallery */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-3 min-w-0">
              {/* Main image */}
              <div className="aspect-square bg-white rounded-2xl border border-border overflow-hidden flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    key={activeImage}
                    src={product.images[activeImage]}
                    alt={`${product.name} — view ${activeImage + 1}`}
                    className="w-full h-full object-contain p-4 sm:p-8 transition-opacity duration-300"
                  />
                ) : (
                  <div className="text-charcoal-muted text-sm">No image available</div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl border overflow-hidden bg-white transition-all duration-200 ${
                        activeImage === i
                          ? 'border-charcoal shadow-sm'
                          : 'border-border hover:border-charcoal/40'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-7 min-w-0">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="section-label">{categoryLabels[product.category] || product.category}</span>
                  {product.model && (
                    <>
                      <span className="text-border">·</span>
                      <span className="text-xs text-charcoal-muted font-mono">{product.model}</span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-semibold text-charcoal tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-charcoal-muted line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                    <span className="text-sm font-medium px-2.5 py-1 bg-accent-green-light text-accent-green rounded-full">
                      Save {formatPrice(savings)}
                    </span>
                  </>
                )}
              </div>

              {/* Variants */}
              {hasVariants && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-charcoal">
                    {product.variants[0].title.includes('Type') ? 'Seat Type' : 'Color'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveVariant(i)}
                        disabled={!variant.available}
                        className={`px-4 py-2 rounded-xl text-sm border transition-all duration-200 ${
                          !variant.available
                            ? 'border-border text-charcoal-muted/50 cursor-not-allowed line-through'
                            : activeVariant === i
                            ? 'border-charcoal bg-charcoal text-white font-medium'
                            : 'border-border text-charcoal hover:border-charcoal/40'
                        }`}
                      >
                        {variant.title}
                        {!variant.available && ' (Unavailable)'}
                      </button>
                    ))}
                  </div>
                  {product.variants[activeVariant]?.sku && (
                    <p className="text-xs text-charcoal-muted font-mono">
                      SKU: {product.variants[activeVariant].sku}
                    </p>
                  )}
                </div>
              )}

              {/* Single variant SKU */}
              {!hasVariants && product.variants?.[0]?.sku && (
                <p className="text-xs text-charcoal-muted font-mono -mt-3">
                  SKU: {product.variants[0].sku}
                </p>
              )}

              {/* Description */}
              {product.description && (
                <div>
                  <p className="section-label mb-2">About this product</p>
                  <p className="text-charcoal-muted text-sm leading-relaxed">{product.description}</p>
                </div>
              )}

              {buyingGuides.length > 0 && (
                <div className="bg-white border border-border rounded-2xl p-4">
                  <p className="section-label mb-2">Buying guidance</p>
                  <p className="text-sm text-charcoal-muted mb-3">
                    Compare options before deciding:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {buyingGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        to={`/guides/${guide.slug}`}
                        className="text-sm text-charcoal hover:underline underline-offset-2"
                      >
                        {guide.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Rental Plans */}
              <RentalPlansSection slug={product.slug} />

              {/* Install note */}
              {product.tags?.includes('installation-service') && (
                <div className="flex items-start gap-3 p-4 bg-accent-blue-light rounded-xl">
                  <svg className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <p className="text-xs text-accent-blue leading-relaxed">
                    Professional installation service available for this product. Ask us about setup when you get your recommendation.
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                <Link
                  to={`/get-recommendation?products=${encodeURIComponent(product.slug)}`}
                  className="btn-primary w-full text-center py-4 text-base"
                >
                  Get Your Free Recommendation
                </Link>
                <a
                  href={INSTAGRAM_WEB}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openInstagram}
                  className="btn-secondary w-full text-center py-4 text-base mt-3 inline-flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                  DM on Instagram
                </a>
              </div>

              {/* Source note */}
              <p className="text-xs text-charcoal-muted">
                Pricing sourced from{' '}
                <a
                  href="https://cuckoorental.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-charcoal transition-colors"
                >
                  cuckoorental.com
                </a>
                . Contact us for current availability and rental program details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 border-t border-border bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-2">More {categoryLabels[product.category] || product.category}s</p>
                <h2 className="text-2xl font-semibold text-charcoal tracking-tight">
                  Related products
                </h2>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="btn-secondary text-sm hidden sm:inline-flex"
              >
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
