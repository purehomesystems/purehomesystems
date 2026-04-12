import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

const principles = [
  {
    title: 'Guided, not pressured',
    description: 'We help you understand which CUCKOO system fits your home and budget before any commitment is made.',
  },
  {
    title: 'Accurate information',
    description: 'We only share what we can confirm from the source. If we do not know a detail, we say so.',
  },
  {
    title: 'Installation and maintenance support',
    description: 'CUCKOO\'s rental plans include professional installation and ongoing service. We help you navigate those options.',
  },
  {
    title: 'Long-term fit over one-time sale',
    description: 'The right system for your home depends on usage, water quality, space, and budget. We take all of that into account.',
  },
]

export default function About() {
  const aboutServiceSchema = createServiceSchema({
    name: 'CUCKOO Authorized Partner Guidance',
    description:
      'PureHome Systems provides trusted guidance for choosing CUCKOO water purifiers, air purifiers, bidets, and massage chairs with flexible plans and support.',
    serviceType: 'Home wellness consultation',
    path: '/about',
  })

  return (
    <div className="pt-16">
      <Seo
        title="About PureHome Systems | CUCKOO Authorized Partner"
        description="PureHome Systems is a CUCKOO authorized partner helping homeowners choose premium water, air, bidet, and comfort systems with clear guidance and support."
        path="/about"
        keywords="CUCKOO authorized partner, official CUCKOO dealer, home wellness systems, water purifier experts, Santa Clara showroom, PureHome Systems"
        schema={[aboutServiceSchema]}
      />

      {/* Header */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">About</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            PureHome Systems
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            We help homeowners find, rent, and set up CUCKOO water purifiers, air purifiers, bidets, bubble cleansers, and massage chairs. Our role is to guide you to the right product and make the process straightforward.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col gap-8 text-charcoal-muted leading-relaxed">
            <p>
              Choosing a home purification or comfort system can be confusing. There are many models, multiple rental plan types, and variables specific to each home. Most people do not know where to start.
            </p>
            <p>
              PureHome Systems exists to remove that friction. We review the full CUCKOO catalog, explain the differences between models, walk through rental plan structures, and help you get the right system installed and maintained.
            </p>
            <p>
              We work with CUCKOO Rental America as the product source. All equipment, installation, and service plans are part of CUCKOO's rental program. Our role is to help you navigate it clearly.
            </p>
            <p>
              We also offer a local showroom where some units are available to see and demo in person: 1590 Los Padres Blvd, Santa Clara, CA 95050. Showroom visits are by appointment. Please call ahead and ask for Alex.
            </p>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Product categories</p>
            <h2 className="text-2xl font-semibold text-charcoal tracking-tight">
              What we can help you with
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Water Purifiers', desc: 'Countertop, freestanding, under-sink, and ice models from CUCKOO.' },
              { title: 'Air Purifiers', desc: 'Room and whole-space purifiers with real-time air quality monitoring.' },
              { title: 'Bidets', desc: 'Electric bidet seats with instant heating and self-cleaning nozzles.' },
              { title: 'Bubble Cleanser', desc: 'Shower-integrated microbubble cleansing for daily skin and hair care.' },
              { title: 'Massage Chairs', desc: '3D and 4D full-body massage chairs from CUCKOO\'s Renature line.' },
              { title: 'Rental Plans', desc: 'Self Care and Visit Care rental plans explained simply and clearly.' },
            ].map((item) => (
              <div key={item.title} className="card flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">How we work</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight">
              Our approach
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {principles.map((p) => (
              <div key={p.title} className="card flex flex-col gap-3">
                <h3 className="text-base font-semibold text-charcoal">{p.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
            Ready to find the right system?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Fill out a short form and we will follow up with a clear recommendation based on your home and priorities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            <Link to="/get-recommendation" className="btn-accent px-8 py-3.5 sm:flex-1">
              Get My Free Recommendation
            </Link>
            <a href="tel:+14089102223" className="btn-secondary px-8 py-3.5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 sm:flex-1">
              Call (408) 910-2223
            </a>
          </div>
          <p className="text-white/55 text-xs mt-4">
            Showroom visits are by appointment. Please call ahead and ask for Alex.
          </p>
        </div>
      </section>
    </div>
  )
}
