import { useMemo, useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products as catalogProducts } from '../data/products'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

// ─── Static data ─────────────────────────────────────────────────────────────

const homeTypes = ['House', 'Condo / Apartment', 'Townhome', 'Other']

const productInterests = [
  { id: 'water',    label: 'Water Purifier',      desc: 'Countertop, freestanding, under-sink, or ice' },
  { id: 'air',      label: 'Air Purifier',         desc: 'Room or whole-space purifiers' },
  { id: 'bidet',    label: 'Bidet',                desc: 'Electric bidet seat' },
  { id: 'bubble',   label: 'Bubble Cleanser',      desc: 'Shower-integrated microbubble system' },
  { id: 'massage',  label: 'Massage Chair',         desc: '3D or 4D Renature massage chair' },
  { id: 'multiple', label: 'Multiple / Not sure',  desc: 'Help me figure out what I need' },
]

const categoryLabels = {
  water: 'Water Purifier',
  air: 'Air Purifier',
  bidet: 'Bidet',
  bubble: 'Bubble Cleanser',
  massage: 'Massage Chair',
}

// ─── Small shared UI pieces ───────────────────────────────────────────────────

function CheckIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function StepBar({ current, total = 3 }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-[3px] bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-charcoal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span className="text-xs font-medium text-charcoal-muted flex-shrink-0 tabular-nums">
        {current} / {total}
      </span>
    </div>
  )
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1">{msg}</p>
}

function SectionLabel({ children }) {
  return <p className="text-xs font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-3">{children}</p>
}

// ─── Left panel ───────────────────────────────────────────────────────────────

function LeftPanel({ selectedProducts }) {
  return (
    <div className="lg:sticky lg:top-28 flex flex-col gap-6">
      <div>
        <p className="section-label mb-3">Free and no obligation</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-charcoal tracking-tighter leading-tight mb-5">
          Get your free<br />recommendation.
        </h1>
        <p className="text-charcoal-muted leading-relaxed mb-6">
          Tell us about your home and what you are looking for. We follow up with an honest, personalized recommendation. No pushy sales tactics.
        </p>
        <p className="text-sm text-charcoal-muted">
          Prefer direct contact?{' '}
          <a href="tel:+14089102223" className="underline hover:text-charcoal transition-colors">(408) 910-2223</a>
          {' · '}
          <a href="mailto:alex@getpurehomesystems.com" className="underline hover:text-charcoal transition-colors">Email us</a>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { title: 'Takes 2 minutes', desc: 'Quick form, no lengthy surveys.' },
          { title: 'Matched to your home', desc: 'We recommend the right system, not the most expensive one.' },
          { title: 'Personal follow-up', desc: 'A team member reaches out directly with your recommendation.' },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center text-accent-blue flex-shrink-0 mt-0.5">
              <CheckIcon size={10} />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-0.5">{item.title}</p>
              <p className="text-sm text-charcoal-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live product summary */}
      {selectedProducts.length > 0 && (
        <div className="border border-border rounded-2xl p-5">
          <SectionLabel>Your selection</SectionLabel>
          <div className="flex flex-col gap-3">
            {selectedProducts.map((p) => (
              <div key={p.slug} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-border overflow-hidden flex-shrink-0">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-1" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal leading-snug line-clamp-2">{p.name}</p>
                  <p className="text-xs text-charcoal-muted">{categoryLabels[p.category]}</p>
                </div>
                <Link
                  to={`/products/${p.slug}`}
                  className="flex-shrink-0 text-charcoal-muted hover:text-charcoal transition-colors"
                  title={`View ${p.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Step 1: Contact & Home ───────────────────────────────────────────────────

function Step1({ form, errors, onChange }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal tracking-tight mb-1">About you</h2>
        <p className="text-sm text-charcoal-muted">We will use this to follow up with your recommendation.</p>
      </div>

      {/* Name + Phone row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-charcoal" htmlFor="name">
            Full name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            className={`input-field ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
          />
          <FieldError msg={errors.name} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-charcoal" htmlFor="phone">
            Phone <span className="text-charcoal-muted font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-charcoal" htmlFor="email">
          Email address <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => onChange('email', e.target.value)}
          className={`input-field ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
        />
        <FieldError msg={errors.email} />
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
              onClick={() => onChange('homeType', type)}
              className={`px-4 py-3 rounded-xl text-sm border transition-all duration-200 text-left font-medium ${
                form.homeType === type
                  ? 'border-charcoal bg-charcoal text-white'
                  : 'border-border bg-background text-charcoal-muted hover:border-charcoal/30 hover:text-charcoal hover:bg-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <FieldError msg={errors.homeType} />
      </div>
    </div>
  )
}

// ─── Step 2: Interest & Products ──────────────────────────────────────────────

function Step2({ form, errors, onChange, selectedProductSlugs, onToggleProduct }) {
  const [productSectionOpen, setProductSectionOpen] = useState(selectedProductSlugs.length > 0)

  const filteredProducts = useMemo(() => {
    if (!form.interest || form.interest === 'multiple') return catalogProducts
    return catalogProducts.filter((p) => p.category === form.interest)
  }, [form.interest])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal tracking-tight mb-1">What you are looking for</h2>
        <p className="text-sm text-charcoal-muted">Select your main interest so we can tailor the recommendation.</p>
      </div>

      {/* Interest tiles */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-charcoal">
          Primary interest <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {productInterests.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange('interest', item.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                form.interest === item.id
                  ? 'border-charcoal bg-charcoal text-white'
                  : 'border-border bg-background hover:border-charcoal/30 hover:bg-white'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors flex items-center justify-center ${
                form.interest === item.id ? 'border-white bg-white' : 'border-charcoal-muted'
              }`}>
                {form.interest === item.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${form.interest === item.id ? 'text-white' : 'text-charcoal'}`}>
                  {item.label}
                </p>
                <p className={`text-xs mt-0.5 leading-snug ${form.interest === item.id ? 'text-white/65' : 'text-charcoal-muted'}`}>
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
        <FieldError msg={errors.interest} />
      </div>

      {/* Specific product selection (collapsible) */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setProductSectionOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-background/60 transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-charcoal">
              Have a specific product in mind?
              <span className="ml-2 text-xs font-normal text-charcoal-muted">(optional)</span>
            </p>
            {selectedProductSlugs.length > 0 && !productSectionOpen && (
              <p className="text-xs text-accent-blue mt-0.5">
                {selectedProductSlugs.length} product{selectedProductSlugs.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`text-charcoal-muted flex-shrink-0 transition-transform duration-200 ${productSectionOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {productSectionOpen && (
          <div className="border-t border-border px-5 pb-5 pt-4">
            {form.interest && form.interest !== 'multiple' && (
              <p className="text-xs text-charcoal-muted mb-3">
                Showing {categoryLabels[form.interest] || ''} options. Change your interest above to see other products.
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-0.5">
              {filteredProducts.map((product) => {
                const isSelected = selectedProductSlugs.includes(product.slug)
                return (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => onToggleProduct(product.slug)}
                    className={`relative flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-charcoal bg-charcoal/[0.04] ring-1 ring-charcoal/25'
                        : 'border-border bg-white hover:border-charcoal/20'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-charcoal flex items-center justify-center">
                        <CheckIcon size={10} className="text-white" />
                      </div>
                    )}
                    <div className="w-full aspect-square bg-background rounded-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain p-1.5"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal leading-snug line-clamp-2">{product.name}</p>
                      <p className="text-xs text-charcoal-muted mt-0.5">${product.price.toLocaleString()}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Review & Submit ───────────────────────────────────────────────────

function Step3Review({ form, selectedProducts, isSubmitting, submitError, onGoToStep }) {
  const interestLabel = productInterests.find((i) => i.id === form.interest)?.label || form.interest

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-charcoal tracking-tight mb-1">Review your request</h2>
        <p className="text-sm text-charcoal-muted">Check everything looks right before submitting.</p>
      </div>

      {/* Contact block */}
      <div className="bg-background rounded-2xl border border-border p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <SectionLabel>Contact</SectionLabel>
          <button
            type="button"
            onClick={() => onGoToStep(1)}
            className="text-xs text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-2 flex-shrink-0"
          >
            Edit
          </button>
        </div>
        <p className="text-sm font-medium text-charcoal">{form.name}</p>
        <p className="text-sm text-charcoal-muted">{form.email}</p>
        {form.phone && <p className="text-sm text-charcoal-muted">{form.phone}</p>}
      </div>

      {/* Home + Interest block */}
      <div className="bg-background rounded-2xl border border-border p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <SectionLabel>Home & Interest</SectionLabel>
          <button
            type="button"
            onClick={() => onGoToStep(1)}
            className="text-xs text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-2 flex-shrink-0"
          >
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.homeType && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-border rounded-full text-xs font-medium text-charcoal">
              {form.homeType}
            </span>
          )}
          {form.interest && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-border rounded-full text-xs font-medium text-charcoal">
              {interestLabel}
            </span>
          )}
        </div>
      </div>

      {/* Selected products */}
      {selectedProducts.length > 0 && (
        <div className="bg-background rounded-2xl border border-border p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <SectionLabel>Selected Products</SectionLabel>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-2 flex-shrink-0"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {selectedProducts.map((p) => (
              <div key={p.slug} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-border overflow-hidden flex-shrink-0">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-1" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal leading-snug">{p.name}</p>
                  <p className="text-xs text-charcoal-muted">{categoryLabels[p.category]} · ${p.price.toLocaleString()}</p>
                </div>
                <Link
                  to={`/products/${p.slug}`}
                  className="text-xs text-charcoal-muted hover:text-charcoal underline underline-offset-2 flex-shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full py-4 text-base flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
              </svg>
              Sending your request...
            </>
          ) : (
            'Send My Recommendation Request'
          )}
        </button>

        {submitError && (
          <div className="mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-xs text-red-600 leading-relaxed">{submitError}</p>
          </div>
        )}

        <p className="text-xs text-charcoal-muted text-center mt-3">
          No spam. No commitments. We will reach out personally within one business day.
        </p>
      </div>
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({ name, selectedProducts, recommendationSchema }) {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <Seo
        title="Recommendation Request Received"
        description="PureHome Systems received your recommendation request and will follow up with a personalized home system plan."
        path="/get-recommendation"
        schema={[recommendationSchema]}
      />
      <div className="max-w-lg mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-accent-green-light text-accent-green flex items-center justify-center mx-auto mb-6">
          <CheckIcon size={24} />
        </div>
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-3">
          Request received
        </h2>
        <p className="text-charcoal-muted text-sm leading-relaxed mb-2">
          Thanks, {name.split(' ')[0]}. We have received your details and will reach out within one business day with a personalized recommendation.
        </p>
        <p className="text-xs text-charcoal-muted mb-8">
          Keep an eye on your inbox. If anything is urgent, call (408) 910-2223.
        </p>

        {selectedProducts.length > 0 && (
          <div className="text-left border border-border rounded-2xl p-5 mb-8">
            <SectionLabel>Products in your request</SectionLabel>
            <div className="flex flex-col gap-3">
              {selectedProducts.map((p) => (
                <div key={p.slug} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background border border-border overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-1" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal leading-snug">{p.name}</p>
                    <p className="text-xs text-charcoal-muted">{categoryLabels[p.category]}</p>
                  </div>
                  <Link to={`/products/${p.slug}`} className="text-xs text-charcoal-muted hover:text-charcoal underline underline-offset-2 flex-shrink-0">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link to="/products" className="btn-primary">
            Browse products in the meantime
          </Link>
          <Link to="/promotions" className="btn-secondary">
            See current promotions
          </Link>
          <Link to="/" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GetRecommendation() {
  const [searchParams] = useSearchParams()
  const validSlugs = useMemo(() => new Set(catalogProducts.map((p) => p.slug)), [])
  const formCardRef = useRef(null)

  // Product selection
  const [selectedProductSlugs, setSelectedProductSlugs] = useState(() => {
    const raw = searchParams.get('products')
    if (!raw) return []
    return [...new Set(raw.split(',').map((s) => s.trim()).filter((s) => validSlugs.has(s)))]
  })

  const selectedProducts = useMemo(
    () => selectedProductSlugs.map((slug) => catalogProducts.find((p) => p.slug === slug)).filter(Boolean),
    [selectedProductSlugs],
  )

  function inferInterest(slugs) {
    if (slugs.length === 0) return ''
    const cats = [...new Set(slugs.map((s) => catalogProducts.find((p) => p.slug === s)?.category).filter(Boolean))]
    return cats.length > 1 ? 'multiple' : cats[0] || ''
  }

  function handleToggleProduct(slug) {
    setSelectedProductSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      const inferred = inferInterest(next)
      if (inferred) {
        setForm((f) => ({ ...f, interest: inferred }))
        setErrors((e) => ({ ...e, interest: undefined }))
      }
      return next
    })
  }

  // Form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    homeType: '',
    interest: inferInterest(selectedProductSlugs.length > 0
      ? selectedProductSlugs.filter((s) => validSlugs.has(s))
      : []),
  })

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // Step state
  const [currentStep, setCurrentStep] = useState(1)
  const [transitioning, setTransitioning] = useState(false)

  // Submission state
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Scroll to top immediately when success state appears
  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [submitted])

  const recommendationSchema = createServiceSchema({
    name: 'Home System Recommendation Service',
    description: 'Get a personalized recommendation for CUCKOO water purifiers, air purifiers, bidets, and massage chairs.',
    serviceType: 'Personalized home system recommendation',
    path: '/get-recommendation',
  })

  // Step validation
  function validateStep(step) {
    const e = {}
    if (step === 1) {
      if (!form.name.trim()) e.name = 'Name is required'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
      if (!form.homeType) e.homeType = 'Please select your home type'
    }
    if (step === 2) {
      if (!form.interest && selectedProductSlugs.length === 0) {
        e.interest = 'Please select what you are most interested in'
      }
    }
    return e
  }

  function scrollToForm() {
    if (!formCardRef.current) return
    const top = formCardRef.current.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  function goToStep(step) {
    setErrors({})
    setTransitioning(true)
    setTimeout(() => {
      setCurrentStep(step)
      setTransitioning(false)
      scrollToForm()
    }, 150)
  }

  function handleNext() {
    const errs = validateStep(currentStep)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    goToStep(currentStep + 1)
  }

  function handleBack() {
    goToStep(currentStep - 1)
  }

  // Final submit
  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const selectedProductsPayload = selectedProducts.map((p) => ({
        slug: p.slug,
        name: p.name,
        category: categoryLabels[p.category] || p.category,
        image: p.images?.[0] || '',
        price: p.price,
        productUrl: `https://getpurehomesystems.com/products/${p.slug}`,
      }))

      const selectedInterestLabel = productInterests.find((i) => i.id === form.interest)?.label || form.interest

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          interest: selectedInterestLabel,
          selectedProductSlugs,
          selectedProducts: selectedProductsPayload,
          sourcePage: '/get-recommendation',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Unable to send your request right now.')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Recommendation form submission failed:', error)
      setSubmitError('We could not submit your request right now. Please try again or call (408) 910-2223.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <SuccessState
        name={form.name}
        selectedProducts={selectedProducts}
        recommendationSchema={recommendationSchema}
      />
    )
  }

  return (
    <div className="pt-16">
      <Seo
        title="Get Your Free Home System Recommendation"
        description="Request a personalized recommendation for the right water purifier, air purifier, bidet, or massage chair with flexible plans and setup support."
        path="/get-recommendation"
        keywords="water purifier recommendation, home water system consultation, air purifier recommendation, bidet recommendation, home wellness consultation, Santa Clara"
        schema={[recommendationSchema]}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info + live summary */}
          <LeftPanel selectedProducts={selectedProducts} />

          {/* Right: Stepped form */}
          <div>
            <form onSubmit={handleSubmit} noValidate>
              <div ref={formCardRef} className="bg-white border border-border rounded-3xl p-8 sm:p-10">
                <StepBar current={currentStep} total={3} />

                {/* Step content with fade transition */}
                <div className={`transition-opacity duration-150 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                  {currentStep === 1 && (
                    <Step1 form={form} errors={errors} onChange={handleChange} />
                  )}
                  {currentStep === 2 && (
                    <Step2
                      form={form}
                      errors={errors}
                      onChange={handleChange}
                      selectedProductSlugs={selectedProductSlugs}
                      onToggleProduct={handleToggleProduct}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3Review
                      form={form}
                      selectedProducts={selectedProducts}
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                      onGoToStep={goToStep}
                    />
                  )}
                </div>

                {/* Navigation buttons (steps 1 + 2) */}
                {currentStep < 3 && (
                  <div className={`flex gap-3 mt-6 transition-opacity duration-150 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="btn-secondary flex-shrink-0 px-5"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary flex-1 py-3.5"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Back button on review step */}
                {currentStep === 3 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-3 w-full text-sm text-charcoal-muted hover:text-charcoal transition-colors py-2"
                  >
                    Back to edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Showroom */}
        <div className="mt-16">
          <div className="bg-white border border-border rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-border">
              <p className="section-label mb-3">Showroom</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-2">
                See and demo selected units in person
              </h2>
              <p className="text-sm text-charcoal-muted">1590 Los Padres Blvd, Santa Clara, CA 95050</p>
              <p className="text-xs text-charcoal-muted mt-1">Showroom visits are by appointment. Please call ahead and ask for Alex.</p>
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
