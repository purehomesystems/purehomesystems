import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

// Contextual lifestyle images — one per process step
const STEP1_IMG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80'
const STEP2_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80'
const STEP3_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'

const steps = [
  {
    number: '01',
    title: 'Get a free recommendation',
    subtitle: 'We help you choose the right product',
    description: 'Fill out our short form and tell us about your home. We will review your needs and follow up personally with a recommendation from the CUCKOO catalog. No pressure, no commitment required.',
    details: [
      'Short form, takes under 2 minutes',
      'Covers water, air, bidet, bubble cleanser, and massage chairs',
      'We explain the differences between models and plan types',
    ],
    image: STEP1_IMG,
    imageAlt: 'Modern kitchen — home consultation',
  },
  {
    number: '02',
    title: 'Schedule installation',
    subtitle: 'Professional setup at your home',
    description: 'Once you select a product and plan, CUCKOO schedules a professional installation visit. A certified technician arrives, installs the system, and confirms everything is working before leaving.',
    details: [
      'Available for most water purifiers, bidets, and bubble cleansers',
      'Installation is included in CUCKOO rental plans',
      'Typically completed in a single visit',
    ],
    image: STEP2_IMG,
    imageAlt: 'Professional technician installing a home system',
  },
  {
    number: '03',
    title: 'Ongoing service throughout your plan',
    subtitle: 'Maintenance covered by your rental',
    description: 'Depending on the plan type you choose, CUCKOO covers filter replacements, technician check-ins, and service calls. Self Care plans include filter deliveries. Visit Care plans include scheduled technician visits.',
    details: [
      'Self Care: filters shipped to you on schedule',
      'Visit Care: technician visits to replace filters and inspect the system',
      'Plan terms vary by product (typically 3, 5, or 6 years)',
    ],
    image: STEP3_IMG,
    imageAlt: 'Clean modern home interior — ongoing comfort',
  },
]

const planTypes = [
  {
    title: 'Self Care',
    description: 'You receive replacement filters on a set schedule and replace them yourself. Lower monthly cost, no technician visits. Best for people comfortable with basic maintenance.',
  },
  {
    title: 'Visit Care',
    description: 'A CUCKOO technician visits your home periodically to replace filters and inspect the system. Hands-off maintenance included throughout your plan term.',
  },
]

const included = [
  { title: 'Professional installation', desc: 'Technician installs most CUCKOO products at your home.' },
  { title: 'Filter replacements', desc: 'Covered by your plan, either shipped to you or installed by a technician.' },
  { title: 'Equipment warranty', desc: 'CUCKOO equipment is covered during the rental term.' },
  { title: 'Scheduled service', desc: 'Visit Care plans include periodic technician check-ins.' },
  { title: 'Plan flexibility', desc: 'Multiple term lengths and plan types to fit different budgets.' },
  { title: 'Dedicated support', desc: 'CUCKOO customer service throughout the duration of your plan.' },
]

const faqs = [
  {
    q: 'What is the difference between Self Care and Visit Care?',
    a: 'Self Care plans deliver replacement filters to you on a schedule. You replace them yourself. Visit Care plans include technician visits to handle filter replacements and system inspections for you. Visit Care plans are typically priced higher.',
  },
  {
    q: 'How long are the rental terms?',
    a: 'Rental term lengths vary by product and plan. Common options are 3-year, 5-year, and 6-year terms. Shorter terms are generally available at higher monthly rates. Contact us and we will clarify options for the specific product you are interested in.',
  },
  {
    q: 'Is installation included?',
    a: 'Professional installation is included in CUCKOO rental plans for products that require it, such as water purifiers, bidets, and the bubble cleanser. Some products, like certain air purifiers and massage chairs, may not require installation service.',
  },
  {
    q: 'Do I own the equipment?',
    a: 'Under a rental plan, the equipment belongs to CUCKOO for the duration of the term. This is what allows the rental model to include service and maintenance. At plan end, options vary by product and plan.',
  },
  {
    q: 'What happens if the equipment needs repair?',
    a: 'Equipment malfunctions covered under the warranty are handled by CUCKOO during the plan term. Contact CUCKOO customer service directly for service requests.',
  },
]

export default function HowItWorks() {
  const processServiceSchema = createServiceSchema({
    name: 'Home System Installation and Service Process',
    description:
      'Understand how PureHome Systems handles recommendations, CUCKOO installation coordination, and ongoing maintenance support.',
    serviceType: 'Water purifier installation process and service guidance',
    path: '/how-it-works',
  })

  return (
    <div className="pt-16">
      <Seo
        title="How Installation and Service Works"
        description="Learn how PureHome Systems guides you from recommendation to installation and ongoing maintenance for CUCKOO water purifiers, air purifiers, and bidets."
        path="/how-it-works"
        keywords="water purifier installation, home water system installation, air purifier setup, bidet installation, CUCKOO maintenance service, how water purifier rental works"
        schema={[processServiceSchema]}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">The process</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            From recommendation to installation to ongoing service.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            CUCKOO's rental program covers the full lifecycle of your product. Here is how it works, and where we fit in.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col gap-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`grid lg:grid-cols-2 gap-12 xl:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text */}
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-semibold tabular-nums">
                      {step.number}
                    </div>
                    <p className="section-label">{step.subtitle}</p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                    {step.title}
                  </h2>
                  <p className="text-charcoal-muted leading-relaxed mb-7">
                    {step.description}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                        <span className="text-sm text-charcoal leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contextual step image */}
                <div className={`aspect-[4/3] rounded-2xl overflow-hidden bg-background border border-border ${
                  i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}>
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan types */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Plan types</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight">
              Self Care vs. Visit Care
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
            {planTypes.map((plan) => (
              <div key={plan.title} className="card flex flex-col gap-3">
                <h3 className="text-base font-semibold text-charcoal">{plan.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{plan.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-charcoal-muted mt-6 max-w-lg">
            Plan availability and pricing vary by product. Contact us for specifics on the product you are considering.
          </p>
        </div>
      </section>

      {/* What is included */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">What is included</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight">
              What rental plans cover
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl">
            {included.map((item) => (
              <div key={item.title} className="card flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Common questions</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight">
              Frequently asked
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-base font-semibold text-charcoal mb-3">{faq.q}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Get your personalized recommendation in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-recommendation" className="btn-accent px-8 py-3.5">
              Get My Free Recommendation
            </Link>
            <Link to="/rental-plans" className="btn-secondary px-8 py-3.5 border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              View Rental Plan Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
