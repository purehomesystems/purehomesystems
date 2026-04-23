import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

export default function InstallationAvailability() {
  const installationServiceSchema = createServiceSchema({
    name: 'Nationwide Rental Availability and Installation Options',
    description:
      'PureHome Systems offers nationwide rental availability across the US, with professional installation in select areas and self-install support elsewhere.',
    serviceType: 'Home system rental availability and installation guidance',
    path: '/installation-availability',
  })

  return (
    <div className="pt-16">
      <Seo
        title="Installation & Availability | Nationwide Rental Coverage"
        description="PureHome Systems offers premium home water system rentals nationwide. Professional installation is available in select areas, with guided self-install options elsewhere."
        path="/installation-availability"
        keywords="nationwide water purifier rental, installation availability, professional installation select areas, self-install water purifier rental, home water system rental support"
        schema={[installationServiceSchema]}
      />

      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Installation & Availability</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-3xl">
            Nationwide rental access with clear installation options.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            We provide premium home water purification systems through flexible rental plans across the United States, with professional installation in select service areas and self-installation support elsewhere.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col gap-12">
          <div className="card flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
              Nationwide availability
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              Our rental products are available nationwide. Customers across the US can access premium water systems through a rental-first model designed for long-term convenience and predictable monthly planning.
            </p>
          </div>

          <div className="card flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
              Installation options
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              Installation is handled through one of two paths depending on serviceability: professional installation in select areas, or self-installation with guidance outside those areas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-charcoal">
                Professional installation in select areas
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Where professional service is available, installation is coordinated for you. This option is built for households that want a fully managed setup experience from day one.
              </p>
            </div>
            <div className="card flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-charcoal">
                Self-installation outside covered areas
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                If your location is outside current installation coverage, you can still rent the same systems and complete a straightforward self-install process. Guidance and support are available when needed.
              </p>
            </div>
          </div>

          <div className="card flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
              Why customers choose this setup
            </h2>
            <ul className="pl-5 list-disc space-y-2 text-charcoal-muted leading-relaxed">
              <li>Nationwide access to premium home water systems through flexible rental plans.</li>
              <li>Clear installation paths without conflicting expectations.</li>
              <li>Support available for customers who need guidance during setup.</li>
              <li>A practical way to enjoy clean, convenient water at home without relying on bottled water.</li>
            </ul>
          </div>

          <div className="card flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
              Next steps
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              If you want to confirm whether your location qualifies for professional installation and which rental options fit your home, start with a recommendation request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/get-recommendation" className="btn-primary px-8 py-3.5">
                Get My Free Recommendation
              </Link>
              <Link to="/rental-plans" className="btn-secondary px-8 py-3.5">
                View Rental Plans
              </Link>
              <Link to="/how-it-works" className="btn-secondary px-8 py-3.5">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
