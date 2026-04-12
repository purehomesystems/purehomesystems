import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

const planTypes = [
  {
    title: 'Self Care',
    tagline: 'Filter deliveries, you replace them',
    description: 'Replacement filters are shipped to you on a set schedule. You install them yourself following CUCKOO\'s instructions. This plan type is available for most water purifier and air purifier models and carries a lower monthly cost than Visit Care.',
    includes: [
      'Replacement filters delivered on schedule',
      'Equipment covered during the rental term',
      'CUCKOO customer service support',
      'Professional installation at the start of your plan',
    ],
  },
  {
    title: 'Visit Care',
    tagline: 'Technician handles everything',
    description: 'A CUCKOO-certified technician visits your home on a set schedule to replace filters, inspect the system, and confirm everything is working. This plan type removes all maintenance responsibility from you.',
    includes: [
      'Periodic technician visits for filter replacement',
      'System inspection at each visit',
      'Equipment covered during the rental term',
      'CUCKOO customer service support',
      'Professional installation at the start of your plan',
    ],
  },
]

const termInfo = [
  {
    length: '3-Year',
    description: 'Shorter commitment, generally available at a higher monthly rate. Suitable if you want flexibility.',
  },
  {
    length: '5-Year',
    description: 'Mid-range term available for many products. Balances commitment and monthly cost.',
  },
  {
    length: '6-Year',
    description: 'Longer term available for select products, typically at a lower monthly rate.',
  },
]

const included = [
  {
    title: 'Professional installation',
    desc: 'Most products requiring installation are set up by a CUCKOO technician at the start of your plan.',
  },
  {
    title: 'Filter replacements',
    desc: 'Covered throughout the plan term, either delivered to you (Self Care) or installed by a technician (Visit Care).',
  },
  {
    title: 'Equipment coverage',
    desc: 'The CUCKOO equipment is covered for the duration of your rental term.',
  },
  {
    title: 'Service calls',
    desc: 'Equipment malfunctions covered under the warranty are handled by CUCKOO during the plan.',
  },
  {
    title: 'Customer support',
    desc: 'CUCKOO customer service is available throughout your plan for questions and service requests.',
  },
  {
    title: 'Scheduled maintenance',
    desc: 'Visit Care plans include periodic technician check-ins on a predetermined schedule.',
  },
]

const faqs = [
  {
    q: 'Do I own the equipment under a rental plan?',
    a: 'No. Under a rental plan, the equipment belongs to CUCKOO for the duration of the term. This is what allows CUCKOO to include installation, filter replacements, and service within the monthly cost. At the end of your term, options vary by product and plan.',
  },
  {
    q: 'Is there a down payment?',
    a: 'Down payment requirements vary by product and plan type. Some plans require an initial payment and others do not. Contact us and we will clarify what applies to the specific product and plan you are considering.',
  },
  {
    q: 'Can I switch between Self Care and Visit Care?',
    a: 'Plan changes are subject to CUCKOO\'s terms. Contact CUCKOO customer service directly for questions about modifying an active plan.',
  },
  {
    q: 'What happens at the end of the rental term?',
    a: 'Options at plan end vary by product and plan. Common outcomes include renewing the plan, returning the equipment, or transitioning to a different arrangement. CUCKOO will communicate your options before the end of your term.',
  },
  {
    q: 'Are all products available on both plan types?',
    a: 'No. Plan availability depends on the product. Some products are only offered on Self Care plans. Others offer both. We will confirm which plan types are available when we give you a recommendation.',
  },
  {
    q: 'What products require installation service?',
    a: 'Water purifiers (depending on model), bidets, and the Micro-Bubble Cleanser typically require professional installation. Some air purifier models and massage chairs are self-placement and do not require a technician visit for setup.',
  },
]

export default function RentalPlans() {
  const planServiceSchema = createServiceSchema({
    name: 'Flexible Home Appliance Plans',
    description:
      'Compare flexible CUCKOO plan options for water purifiers, air purifiers, bidets, and other home systems with installation and maintenance support.',
    serviceType: 'Flexible appliance plans and pricing guidance',
    path: '/rental-plans',
  })

  return (
    <div className="pt-16">
      <Seo
        title="Flexible Plans for Water, Air, and Bidet Systems"
        description="Review flexible monthly plan options for premium CUCKOO home systems, including installation support, maintenance coverage, and term-length choices."
        path="/rental-plans"
        keywords="water purifier rental, air purifier rental, bidet rental, home appliance plans, monthly water purifier plans, flexible home system plans, Santa Clara"
        schema={[planServiceSchema]}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">How renting works</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            CUCKOO rental plans explained.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            All CUCKOO products are offered through a rental model. You pay a monthly fee that covers the equipment, installation, and ongoing service. Here is how the plans work.
          </p>
        </div>
      </section>

      {/* How it works intro */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col gap-8 text-charcoal-muted leading-relaxed">
            <p>
              Instead of purchasing a water purifier, air purifier, or bidet outright, you pay a fixed monthly fee for a set term. That fee covers the equipment itself, professional installation, filter replacements, and any scheduled maintenance, depending on the plan type you select.
            </p>
            <p>
              CUCKOO offers two plan types: Self Care and Visit Care. The key difference is who handles filter replacements during the plan. Both include the same equipment and initial installation.
            </p>
            <p>
              Plan terms are typically 3, 5, or 6 years depending on the product. Shorter terms generally carry a higher monthly cost. Longer terms are offered at lower monthly rates.
            </p>
            <p>
              Specific monthly pricing depends on the product, plan type, and term length. We share pricing details during the recommendation process, as rates can vary and are confirmed directly through CUCKOO.
            </p>
            <p>
              If you are still evaluating categories, start with our buyer education content in the{' '}
              <Link to="/guides" className="underline hover:text-charcoal transition-colors">
                guides section
              </Link>
              {' '}before selecting a plan.
            </p>
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

          <div className="grid lg:grid-cols-2 gap-6">
            {planTypes.map((plan) => (
              <div key={plan.title} className="card flex flex-col gap-5">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-1">{plan.title}</h3>
                  <p className="text-sm text-accent-blue font-medium">{plan.tagline}</p>
                </div>
                <p className="text-sm text-charcoal-muted leading-relaxed">{plan.description}</p>
                <ul className="flex flex-col gap-2.5 pt-2 border-t border-border">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-accent-green-light text-accent-green flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-sm text-charcoal leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-charcoal-muted mt-6 max-w-lg">
            Plan availability varies by product. Not all products are offered on both plan types. We confirm availability when providing a recommendation.
          </p>
        </div>
      </section>

      {/* Term lengths */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Term lengths</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight">
              Common plan durations
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl">
            {termInfo.map((term) => (
              <div key={term.length} className="card flex flex-col gap-3">
                <h3 className="text-base font-semibold text-charcoal">{term.length}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{term.description}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-charcoal-muted mt-6 max-w-lg">
            Not all term lengths are available for every product. Term options are confirmed based on the specific model you select.
          </p>
        </div>
      </section>

      {/* What is included */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">What is covered</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight">
              What rental plans include
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
      <section className="py-16 sm:py-24">
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
            Ready to find the right plan?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            We will walk you through the options based on the product you are interested in and your home situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/get-recommendation" className="btn-accent px-8 py-3.5">
              Get My Free Recommendation
            </Link>
            <Link to="/products" className="btn-secondary px-8 py-3.5 border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
