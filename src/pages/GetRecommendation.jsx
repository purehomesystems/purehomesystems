import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products as catalogProducts } from '../data/products'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

const homeTypes = ['House', 'Condo / Apartment', 'Townhome', 'Other']
const productInterests = [
  { id: 'water', label: 'Water Purifier', desc: 'Countertop, freestanding, under-sink, or ice' },
  { id: 'air', label: 'Air Purifier', desc: 'Room or whole-space purifiers' },
  { id: 'bidet', label: 'Bidet', desc: 'Electric bidet seat' },
  { id: 'bubble', label: 'Bubble Cleanser', desc: 'Shower-integrated microbubble system' },
  { id: 'massage', label: 'Massage Chair', desc: '3D or 4D Renature massage chair' },
  { id: 'multiple', label: 'Multiple products', desc: 'Not sure yet, help me figure it out' },
]

const productCategoryLabels = {
  water: 'Water Purifier',
  air: 'Air Purifier',
  bidet: 'Bidet',
  bubble: 'Bubble Cleanser',
  massage: 'Massage Chair',
}

export default function GetRecommendation() {
  const [searchParams] = useSearchParams()
  const validSlugs = useMemo(() => new Set(catalogProducts.map((p) => p.slug)), [])
  const [selectedProductSlugs, setSelectedProductSlugs] = useState(() => {
    const raw = searchParams.get('products')
    if (!raw) return []
    return [...new Set(raw.split(',').map((s) => s.trim()).filter((s) => validSlugs.has(s)))]
  })
  const [productPickerOpen, setProductPickerOpen] = useState(false)
  const selectedProducts = selectedProductSlugs
    .map((slug) => catalogProducts.find((p) => p.slug === slug))
    .filter(Boolean)
  const availableProducts = catalogProducts.filter((p) => !selectedProductSlugs.includes(p.slug))
  const isProductIntent = selectedProductSlugs.length > 0

  function inferInterestFromProducts(slugs) {
    if (slugs.length === 0) return ''
    const categories = [...new Set(
      slugs
        .map((slug) => catalogProducts.find((p) => p.slug === slug)?.category)
        .filter(Boolean)
    )]
    if (categories.length > 1) return 'multiple'
    return categories[0] || ''
  }

  function addProductSelection(slug) {
    if (!slug || selectedProductSlugs.includes(slug)) return
    const next = [...selectedProductSlugs, slug]
    setSelectedProductSlugs(next)
    const inferredInterest = inferInterestFromProducts(next)
    if (inferredInterest) {
      setForm((prev) => ({ ...prev, interest: inferredInterest }))
      setErrors((prev) => ({ ...prev, interest: undefined }))
    }
    setProductPickerOpen(false)
  }

  function removeProductSelection(slug) {
    const next = selectedProductSlugs.filter((s) => s !== slug)
    setSelectedProductSlugs(next)
    const inferredInterest = inferInterestFromProducts(next)
    if (inferredInterest) {
      setForm((prev) => ({ ...prev, interest: inferredInterest }))
      setErrors((prev) => ({ ...prev, interest: undefined }))
    }
  }

  const initialInterest = inferInterestFromProducts(selectedProductSlugs)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    homeType: '',
    interest: initialInterest,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const recommendationServiceSchema = createServiceSchema({
    name: 'Home System Recommendation Service',
    description:
      'Get a personalized recommendation for CUCKOO water purifiers, air purifiers, bidets, and massage chairs based on your home and goals.',
    serviceType: 'Personalized home system recommendation',
    path: '/get-recommendation',
  })

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.homeType) e.homeType = 'Please select your home type'
    if (!form.interest && selectedProductSlugs.length === 0) e.interest = 'Please select your main interest'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Seo
          title="Recommendation Request Received"
          description="PureHome Systems received your recommendation request and will follow up with a personalized home system plan."
          path="/get-recommendation"
          keywords="personalized water purifier recommendation, home system consultation, CUCKOO recommendation"
          schema={[recommendationServiceSchema]}
        />

        <div className="max-w-md mx-auto px-5 sm:px-8 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-accent-green-light text-accent-green flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-3">
            We'll be in touch soon!
          </h2>
          <p className="text-charcoal-muted text-sm leading-relaxed mb-8">
            Thanks, {form.name.split(' ')[0]}. We've received your info and will reach out within one business day with a personalized recommendation for your home.
          </p>
          {selectedProducts.length > 0 && (
            <p className="text-xs text-charcoal-muted leading-relaxed mb-6">
              Requested products: {selectedProducts.map((p) => p.name).join(', ')}.
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Link to="/products" className="btn-primary">
              Browse systems in the meantime
            </Link>
            <Link to="/" className="btn-secondary">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <Seo
        title="Get Your Free Home System Recommendation"
        description="Request a personalized recommendation for the right water purifier, air purifier, bidet, or massage chair with flexible plans and setup support."
        path="/get-recommendation"
        keywords="water purifier recommendation, home water system consultation, air purifier recommendation, bidet recommendation, home wellness consultation, Santa Clara"
        schema={[recommendationServiceSchema]}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-4">Free & no obligation</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-charcoal tracking-tighter leading-tight mb-6">
              {isProductIntent ? (
                <>
                  Get your free<br />recommendation for these products.
                </>
              ) : (
                <>
                  Get your free<br />recommendation.
                </>
              )}
            </h1>
            <p className="text-charcoal-muted text-lg leading-relaxed mb-8">
              {isProductIntent
                ? 'We prefilled the product you came from. Add more products if you want, then submit once and our team will follow up with a tailored plan.'
                : 'Tell us a little about your home and what you\'re looking for. We\'ll follow up with an honest, personalized recommendation. No pushy sales tactics.'}
            </p>

            <p className="text-sm text-charcoal-muted mb-8">
              Prefer direct contact?{' '}
              <a href="tel:+14089102223" className="underline hover:text-charcoal transition-colors">
                (408) 910-2223
              </a>{' '}
              ·{' '}
              <a href="mailto:alex@getpurehomesystems.com" className="underline hover:text-charcoal transition-colors">
                alex@getpurehomesystems.com
              </a>
            </p>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  title: 'Takes 2 minutes',
                  desc: 'Quick form, no lengthy surveys.',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  ),
                  title: 'Personalized to you',
                  desc: 'We match you to the right system, not the most expensive one.',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  ),
                  title: 'Real follow-up',
                  desc: 'A team member reaches out personally with your recommendation.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-accent-blue flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal mb-0.5">{item.title}</p>
                    <p className="text-sm text-charcoal-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-3xl p-8 sm:p-10 flex flex-col gap-6" noValidate>
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-charcoal" htmlFor="name">
                  Your name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-charcoal" htmlFor="phone">
                  Phone number <span className="text-charcoal-muted font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-charcoal" htmlFor="email">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Home type */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-charcoal">
                  Home type <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {homeTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleChange('homeType', type)}
                      className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 text-left ${
                        form.homeType === type
                          ? 'border-charcoal bg-charcoal text-white font-medium'
                          : 'border-border bg-background text-charcoal-muted hover:border-charcoal/30 hover:text-charcoal'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.homeType && <p className="text-xs text-red-500">{errors.homeType}</p>}
              </div>

              {/* Product interest */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-charcoal">
                  Products you want help with
                </label>
                {selectedProducts.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map((product) => (
                      <span
                        key={product.slug}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-blue-light text-accent-blue rounded-full text-xs font-medium"
                      >
                        {product.name}
                        <button
                          type="button"
                          onClick={() => removeProductSelection(product.slug)}
                          className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-accent-blue/10"
                          aria-label={`Remove ${product.name}`}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-charcoal-muted">No products selected yet.</p>
                )}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => availableProducts.length > 0 && setProductPickerOpen((prev) => !prev)}
                    className={`input-field flex items-center justify-between text-left ${availableProducts.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={availableProducts.length === 0}
                  >
                    <span className="text-charcoal-muted">
                      {availableProducts.length === 0 ? 'All products already added' : 'Add another product'}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-charcoal-muted transition-transform duration-200 ${productPickerOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {productPickerOpen && availableProducts.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-white border border-border rounded-xl shadow-[0_12px_30px_rgba(26,26,26,0.12)] overflow-hidden">
                      <div className="max-h-64 overflow-y-auto py-1">
                        {availableProducts.map((product) => (
                          <button
                            key={product.slug}
                            type="button"
                            onClick={() => addProductSelection(product.slug)}
                            className="w-full px-4 py-3 text-left hover:bg-background transition-colors flex items-center justify-between gap-3"
                          >
                            <span className="flex flex-col">
                              <span className="text-sm font-medium text-charcoal">{product.name}</span>
                              <span className="text-xs text-charcoal-muted">
                                {productCategoryLabels[product.category] || product.category}
                              </span>
                            </span>
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border text-charcoal-muted">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-charcoal">
                  What are you most interested in? <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  {productInterests.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleChange('interest', item.id)}
                      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                        form.interest === item.id
                          ? 'border-charcoal bg-charcoal text-white'
                          : 'border-border bg-background hover:border-charcoal/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
                        form.interest === item.id
                          ? 'border-white bg-white'
                          : 'border-charcoal-muted'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${form.interest === item.id ? 'text-white' : 'text-charcoal'}`}>
                          {item.label}
                        </p>
                        <p className={`text-xs mt-0.5 ${form.interest === item.id ? 'text-white/70' : 'text-charcoal-muted'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.interest && <p className="text-xs text-red-500">{errors.interest}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button type="submit" className="btn-primary w-full py-4 text-base">
                  Send My Recommendation Request
                </button>
                <p className="text-xs text-charcoal-muted text-center mt-3">
                  No spam. No commitments. We'll reach out personally.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="bg-white border border-border rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-border">
              <p className="section-label mb-3">Showroom</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-3">
                See and demo selected units in person
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                1590 Los Padres Blvd, Santa Clara, CA 95050
              </p>
              <p className="text-xs text-charcoal-muted leading-relaxed mt-2">
                Showroom visits are by appointment. Please call ahead and ask for Alex.
              </p>
            </div>
            <div className="aspect-[16/9] sm:aspect-[21/9]">
              <iframe
                title="PureHome Systems Showroom Map"
                src="https://maps.google.com/maps?q=1590%20Los%20Padres%20Blvd%2C%20Santa%20Clara%2C%20CA%2095050&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
