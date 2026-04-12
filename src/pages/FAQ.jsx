import { useState } from 'react'
import { Link } from 'react-router-dom'
import { openInstagram, INSTAGRAM_WEB } from '../utils/social'
import { faqs, faqCategories } from '../data/faq'
import Seo from '../seo/Seo'
import { createFAQSchema, createServiceSchema } from '../seo/site'

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  const faqSchema = createFAQSchema(faqs)
  const faqServiceSchema = createServiceSchema({
    name: 'Home System FAQ and Support',
    description:
      'Answers to common questions about CUCKOO products, installation, maintenance, and flexible plans from PureHome Systems.',
    serviceType: 'Customer support and product guidance',
    path: '/faq',
  })

  return (
    <div className="pt-16">
      <Seo
        title="FAQ | Water Purifier, Air Purifier, and Bidet Questions"
        description="Read frequently asked questions about CUCKOO water purifiers, air purifiers, bidets, installation, service, and flexible plan options."
        path="/faq"
        keywords="best water purifier for home, what water purifier should I get, water purifier vs filter, best air purifier for home, air purifier for allergies, benefits of bidet"
        schema={[faqSchema, faqServiceSchema]}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Help</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-xl">
            Frequently asked questions.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            Common questions about CUCKOO's rental program, installation, service, and products. If you do not see your question here, contact us directly.
          </p>
        </div>
      </section>

      {/* Filter + Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {/* Category filters */}
          <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'bg-white border border-border text-charcoal-muted hover:text-charcoal hover:border-charcoal/30'
              }`}
            >
              All
            </button>
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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

          {/* FAQ list */}
          <div className="flex flex-col divide-y divide-border">
            {filtered.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-3">
            Still have questions?
          </h2>
          <p className="text-charcoal-muted text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Fill out our recommendation form and we will follow up personally. Or reach CUCKOO customer service directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-recommendation" className="btn-primary px-8 py-3.5">
              Get a Free Recommendation
            </Link>
            <a
              href="mailto:hq@cuckoorental.com"
              className="btn-secondary px-8 py-3.5"
            >
              Contact CUCKOO Directly
            </a>
            <a
              href={INSTAGRAM_WEB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={openInstagram}
              className="btn-secondary px-8 py-3.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-charcoal-muted mt-6">
            PureHome Systems: (408) 910-2223 · CUCKOO Rental America: hq@cuckoorental.com · 888-700-0425
          </p>
        </div>
      </section>
    </div>
  )
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 text-left group"
      >
        <span className={`text-sm font-semibold leading-relaxed transition-colors ${open ? 'text-charcoal' : 'text-charcoal group-hover:text-charcoal'}`}>
          {faq.q}
        </span>
        <span className={`flex-shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center transition-all duration-200 mt-0.5 ${open ? 'bg-charcoal border-charcoal' : 'group-hover:border-charcoal/40'}`}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? 'white' : 'currentColor'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? 'rotate-45' : ''} ${open ? '' : 'text-charcoal-muted'}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-sm text-charcoal-muted leading-relaxed mt-3 pr-8">
          {faq.a}
        </p>
      )}
    </div>
  )
}
