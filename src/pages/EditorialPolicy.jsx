import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

const policies = [
  {
    number: '01',
    title: 'How content is created',
    body: 'Guides are written by team members with direct experience in product selection and home installation. We do not outsource content creation or publish AI-generated copy without human review and verification against our own product knowledge.',
  },
  {
    number: '02',
    title: 'How content is reviewed',
    body: 'Before publishing, each guide is reviewed against our own product knowledge and real customer question patterns. We cross-check claims against CUCKOO Rental America\'s published specifications and pricing to confirm accuracy before a page goes live.',
  },
  {
    number: '03',
    title: 'How often content is updated',
    body: 'All guides include a published date and a last-updated date. We review content when products change, pricing is updated, or reader questions indicate that something is outdated or unclear. Updates are made at the page level, not through blanket refreshes.',
  },
  {
    number: '04',
    title: 'Our commitment to accuracy',
    body: 'We do not publish speculative claims. Where data is unavailable or unverified, we say so explicitly. Product pricing and plan availability shown on this site reflects CUCKOO\'s publicly listed prices at the time of last update, noted on each relevant page.',
  },
  {
    number: '05',
    title: 'Conflicts of interest',
    body: 'PureHome Systems is an authorized CUCKOO Rental America partner. We believe CUCKOO products are a strong option for many homes, but we acknowledge this relationship in all contexts and aim to provide honest tradeoff guidance, including acknowledging product limitations or recommending that a given product category may not be the right fit.',
  },
]

export default function EditorialPolicy() {
  const editorialSchema = createServiceSchema({
    name: 'PureHome Systems Editorial Policy',
    description:
      'PureHome Systems content standards: how guides are created, reviewed, updated, and kept accurate. An authorized CUCKOO Rental America partner committed to objective homeowner guidance.',
    serviceType: 'Home wellness editorial standards',
    path: '/editorial-policy',
  })

  return (
    <div className="pt-16">
      <Seo
        title="Editorial Policy | PureHome Systems Content Standards"
        description="How PureHome Systems creates, reviews, and updates content. Our commitment to accuracy, conflict-of-interest disclosure, and objective homeowner guidance."
        path="/editorial-policy"
        keywords="PureHome Systems editorial policy, content standards, CUCKOO partner disclosure, home wellness content accuracy, how content is written"
        schema={[editorialSchema]}
      />

      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Content Standards</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            Editorial Policy
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            Our content is created to help homeowners make informed decisions, not to promote products.
          </p>
        </div>
      </section>

      {/* Intro prose */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col gap-6 text-charcoal-muted leading-relaxed text-sm">
            <p>
              PureHome Systems publishes buying guides, product comparisons, and category overviews to help homeowners evaluate water purification, air quality, and comfort systems. This page explains how that content is produced and maintained.
            </p>
            <p>
              We are an authorized CUCKOO Rental America partner. We disclose that relationship on every page where it is relevant. Our editorial standards exist to ensure that relationship does not compromise the quality or objectivity of our guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Policy areas */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Our policies</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight mb-10">
              Five areas that govern our content
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {policies.map((policy) => (
              <div key={policy.number} className="card flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-widest text-charcoal/30 uppercase">
                  {policy.number}
                </span>
                <h3 className="text-base font-semibold text-charcoal leading-snug">{policy.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{policy.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Correction policy */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <p className="section-label mb-3">Corrections</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight mb-10">
              What happens when we get something wrong
            </h2>
          </div>
          <div className="flex flex-col gap-6 text-charcoal-muted leading-relaxed text-sm">
            <p>
              If a reader identifies an error, we investigate and correct it. Corrections are noted at the top of the relevant page with a brief description of what changed and when. We do not silently update content to remove inaccuracies without acknowledgment.
            </p>
            <p>
              To report a factual error or flag outdated information, call us at (408) 910-2223 or use the recommendation form to send us a note. We take accuracy feedback seriously.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
            Ready to explore our content?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Browse our buying guides or get a personalized recommendation based on your home and priorities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            <Link to="/guides" className="btn-accent px-8 py-3.5 sm:flex-1">
              Read Our Buying Guides
            </Link>
            <Link to="/get-recommendation" className="btn-secondary px-8 py-3.5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 sm:flex-1">
              Get a Free Recommendation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
