import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

const credentials = [
  {
    title: 'CUCKOO Authorized Partner',
    description:
      'Authorized to recommend and support CUCKOO Rental America products including water purifiers, air purifiers, bidets, and massage chairs. We work directly with CUCKOO to match customers with the right plan and product.',
  },
  {
    title: 'Hands-On Installation Experience',
    description:
      'Team members have worked through the installation and setup process for multiple product categories across real customer homes in the Santa Clara area. Our guidance reflects what the process actually looks like.',
  },
  {
    title: 'Direct Customer Support',
    description:
      'We handle recommendation calls, answer pre-purchase questions, and provide post-install guidance. The questions customers ask most often are what shapes our content.',
  },
]

export default function Author() {
  const authorSchema = createServiceSchema({
    name: 'PureHome Systems Editorial Team',
    description:
      'PureHome Systems content is written by specialists with hands-on experience in home water purification, air quality, and comfort systems as an authorized CUCKOO Rental America partner.',
    serviceType: 'Home wellness content and consultation',
    path: '/author',
  })

  return (
    <div className="pt-16">
      <Seo
        title="About Our Team | PureHome Systems Content Authors"
        description="PureHome Systems content is created by specialists with direct experience in CUCKOO product selection, installation, and customer support. Learn who writes our guides."
        path="/author"
        keywords="PureHome Systems team, CUCKOO authorized partner Santa Clara, water purifier experts, who writes PureHome content, home wellness specialists"
        schema={[authorSchema]}
      />

      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">About the Authors</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            About Our Team
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl">
            PureHome Systems content is created by specialists with hands-on experience in home water purification, air quality, and comfort systems.
          </p>
        </div>
      </section>

      {/* Who writes our content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <p className="section-label mb-3">Who writes our content</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight mb-10">
              Written by people who do the work
            </h2>
          </div>
          <div className="flex flex-col gap-6 text-charcoal-muted leading-relaxed text-sm">
            <p>
              PureHome Systems is a CUCKOO Rental America authorized partner based in Santa Clara, CA. The team behind our content works directly with customers on product selection, installation coordination, and post-install support.
            </p>
            <p>
              Our guides and comparison pages are drawn from real product experience and real customer installations. We are not summarizing spec sheets or aggregating third-party reviews. We write from firsthand familiarity with how these products behave in actual homes.
            </p>
            <p>
              When a customer asks us whether a countertop water purifier is right for a small kitchen, or whether a self-care rental plan makes sense for their usage pattern, we answer from experience. That same knowledge base is what we draw from when writing content.
            </p>
            <p>
              Our showroom is located at 1590 Los Padres Blvd, Santa Clara, CA 95050. Showroom visits are by appointment. Call ahead and ask for Alex.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Our experience</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight mb-10">
              What qualifies us to write this content
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {credentials.map((c) => (
              <div key={c.title} className="card flex flex-col gap-3">
                <h3 className="text-base font-semibold text-charcoal">{c.title}</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="mb-10">
            <p className="section-label mb-3">Our approach</p>
            <h2 className="text-3xl font-semibold text-charcoal tracking-tight mb-10">
              How we decide what to write
            </h2>
          </div>
          <div className="flex flex-col gap-6 text-charcoal-muted leading-relaxed text-sm">
            <p>
              We write guides based on what helps homeowners make better decisions. That means covering tradeoffs honestly, explaining plan structures clearly, and acknowledging limitations when they exist.
            </p>
            <p>
              We do not accept advertising. We do not accept affiliate compensation from CUCKOO. We do not write promotional copy that conflicts with objective guidance. As an authorized partner, we have an obvious interest in CUCKOO products, and we say so openly. That transparency is part of how we maintain trust with readers.
            </p>
            <p>
              If a product category is not a strong fit for a given home, we say that too. Our goal is accurate guidance, not maximum conversion.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
            Have a question? Call us directly.
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            We answer product and plan questions by phone. If you want a guided recommendation, fill out our short form and we will follow up.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
            <Link to="/get-recommendation" className="btn-accent px-8 py-3.5 sm:flex-1">
              Get a Free Recommendation
            </Link>
            <a href="tel:+14089102223" className="btn-secondary px-8 py-3.5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 sm:flex-1">
              Call (408) 910-2223
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
