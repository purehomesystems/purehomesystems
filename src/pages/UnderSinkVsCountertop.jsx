import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createArticleSchema, createBreadcrumbSchema, createFAQSchema } from '../seo/site'

// ── Stable module-level references ───────────────────────────────────────────
const articleSchema = createArticleSchema({
  headline: 'Under Sink vs Countertop Water Filter: Full Comparison',
  description:
    'Compare under sink and countertop water filters across installation, cost, filtration quality, and convenience to find the right fit for your home.',
  path: '/under-sink-vs-countertop-water-filter',
  publishedAt: '2026-04-30',
  updatedAt: '2026-04-30',
})
const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Under Sink vs Countertop Water Filter', path: '/under-sink-vs-countertop-water-filter' },
])

const FAQ_ITEMS = [
  {
    q: 'What is the main difference between under sink and countertop water filters?',
    a: 'The primary difference is placement and installation. Under sink filters are installed beneath the counter and connected directly to your water line, dispensing filtered water through a dedicated tap. Countertop filters sit on the counter and connect to your existing faucet or operate as standalone dispensers — no plumbing required. Both can use similar multi-stage filtration technology; the choice comes down to space, permanence, and whether you want professional installation.',
  },
  {
    q: 'Is an under sink water filter better than a countertop filter?',
    a: 'Not categorically. Under sink filters offer a cleaner aesthetic and preserve counter space, but require plumbing work and are harder to move. Countertop filters are more flexible — easier to install, relocate, or take with you — but take up counter space and are more visible. For households prioritizing a permanent, low-profile setup, under sink is generally preferred. For renters or those who move frequently, countertop systems are a practical alternative.',
  },
  {
    q: 'How much does an under sink water filter cost compared to a countertop unit?',
    a: 'Under sink systems typically have a higher upfront cost than countertop units because they require additional hardware and often professional installation. With a rental plan, both system types can be accessed for a predictable monthly cost that includes filters, maintenance, and service — making the installation-cost difference less significant. See our full water purifier cost guide for a detailed breakdown.',
  },
  {
    q: 'Can I install an under sink water filter myself?',
    a: 'Some under sink systems are designed for straightforward self-installation, but most require tapping into your existing water supply line and adding a dedicated faucet, which benefits from a professional installation. CUCKOO rental plans include professional installation in select service areas. Countertop and freestanding systems generally require no plumbing and can be set up without a technician.',
  },
  {
    q: 'Which water filter is better for renters?',
    a: 'Countertop and freestanding systems are generally better suited for renters. They require no plumbing modifications, can be moved between homes, and do not require any work that might conflict with a lease. Under sink installation requires drilling or modifying cabinet space, which is not always practical or permitted in rental properties.',
  },
]

const faqSchema = createFAQSchema(FAQ_ITEMS)
const SCHEMA = [articleSchema, breadcrumbSchema, faqSchema]

const HERO_GRADIENT = {
  background:
    'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)',
}

const TOC = [
  { id: 'under-sink',     label: 'What is an under sink filter' },
  { id: 'countertop',     label: 'What is a countertop filter' },
  { id: 'comparison',     label: 'Side-by-side comparison' },
  { id: 'cost',           label: 'Cost breakdown' },
  { id: 'pros-cons',      label: 'Pros and cons' },
  { id: 'which-to-choose', label: 'Which one should you choose' },
  { id: 'faq',            label: 'Frequently asked questions' },
]

export default function UnderSinkVsCountertop() {
  return (
    <div className="pt-16">
      <Seo
        title="Under Sink vs Countertop Water Filter"
        description="Compare under sink and countertop water filters side by side — installation, cost, filtration, and which is right for your home."
        path="/under-sink-vs-countertop-water-filter"
        keywords="under sink vs countertop water filter, under sink water filter, countertop water filter, best water filter for home, water filter comparison"
        schema={SCHEMA}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={HERO_GRADIENT} />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/35 mb-6">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/guides" className="hover:text-white/60 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-white/55">Under Sink vs Countertop</span>
          </nav>

          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
            Comparison Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-5 max-w-3xl">
            Under Sink vs Countertop Water Filter
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-7">
            Both types can deliver clean, filtered water — but they suit different homes and lifestyles. This guide covers every meaningful difference so you can choose with confidence.
          </p>

          {/* Value stack */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-8">
            {[
              'Honest side-by-side comparison',
              'Real cost differences explained',
              'No-plumbing options available',
            ].map((point) => (
              <div key={point} className="flex items-center gap-2 text-white/65 text-sm">
                <span className="w-4 h-4 rounded-full bg-accent-green/20 border border-accent-green/40 flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {point}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link
              to="/get-recommendation"
              className="inline-flex items-center justify-center gap-2 bg-white text-charcoal font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/92 transition-colors"
            >
              Get a Personalized Match
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/products?category=water"
              className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              Browse Water Systems
            </Link>
          </div>

          {/* Byline */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/30">
            <span>10 min read</span>
            <span>Updated April 2026</span>
            <span>By PureHome Systems Team</span>
          </div>
        </div>
      </section>

      {/* ── QUICK COMPARISON CARD ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
          <p className="section-label mb-4">At a glance</p>
          <div className="grid sm:grid-cols-2 gap-0 sm:divide-x divide-border">
            <div className="pb-5 sm:pb-0 sm:pr-6 border-b sm:border-b-0 border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-muted mb-3">Under sink filter</p>
              <ul className="space-y-2 text-sm text-charcoal-muted">
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Installation</span>Professional recommended</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Counter space</span>None — hidden below</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Portability</span>Permanent fixture</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Aesthetics</span>Completely out of sight</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Best for</span>Homeowners, long-term</li>
              </ul>
            </div>
            <div className="pt-5 sm:pt-0 sm:pl-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-muted mb-3">Countertop filter</p>
              <ul className="space-y-2 text-sm text-charcoal-muted">
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Installation</span>No plumbing needed</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Counter space</span>Takes counter space</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Portability</span>Easy to move or relocate</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Aesthetics</span>Visible on counter</li>
                <li className="flex items-start gap-2"><span className="text-charcoal font-medium w-28 flex-shrink-0">Best for</span>Renters, flexible setups</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── ZONE 1: TWO-COLUMN (intro sections + sidebar) ───────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-4 lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] lg:gap-14 xl:gap-16 lg:items-start">

        {/* Left column */}
        <div className="min-w-0">
          <div className="space-y-10">

            {/* What is an under sink filter */}
            <section id="under-sink">
              <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                What is an under sink water filter?
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed text-charcoal font-medium">
                  An under sink water filter is installed inside the cabinet beneath your kitchen sink and connects directly to your home's cold water supply line. Filtered water is delivered through a separate dedicated tap mounted on your counter or sink.
                </p>
                <p className="leading-relaxed text-charcoal-muted">
                  Because the system is hidden from view, it does not affect the appearance of your counter or kitchen. The dedicated tap means you always have a clear distinction between filtered and unfiltered water, and the system can handle high daily volumes without manual refilling.
                </p>
                <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Connected to the supply line:</span> Water is filtered on demand as it passes through the system — there is no tank to fill or pitcher to wait for.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Dedicated filtered tap:</span> A separate faucet is mounted at the sink, making it easy to distinguish filtered water from the main tap.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Higher volume capacity:</span> Under sink systems can supply filtered water throughout the day without running out, making them well-suited for larger households.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Permanent installation:</span> Once installed, the system stays in place. Moving it requires disconnecting from the water line and potentially patching the tap hole.
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 mt-2">
                  <p className="text-sm text-charcoal-muted leading-relaxed flex-1">
                    Under sink systems are available on rental plans with professional installation included in select areas.
                  </p>
                  <Link
                    to="/installation-availability"
                    className="flex-shrink-0 text-sm font-medium text-charcoal hover:underline underline-offset-2 whitespace-nowrap"
                  >
                    Check availability &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* What is a countertop filter */}
            <section id="countertop">
              <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                What is a countertop water filter?
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed text-charcoal font-medium">
                  A countertop water filter sits on your kitchen counter and either connects to your existing faucet via a diverter valve, or operates as a standalone dispensing unit. No plumbing work is needed — setup is typically straightforward.
                </p>
                <p className="leading-relaxed text-charcoal-muted">
                  Countertop systems range from basic faucet-mounted carbon filters to premium multi-stage freestanding dispensers with hot, cold, and ambient temperature modes. The key advantage is flexibility: they can be moved, relocated to another home, or unplugged when not needed.
                </p>
                <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">No plumbing required:</span> Countertop and freestanding systems connect to a standard water supply or operate from a tank, requiring no permanent modifications.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Portable and renter-friendly:</span> Easy to move between homes and does not require landlord approval or drilling.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Hot and cold options:</span> Premium countertop and freestanding dispensers can provide instant hot, cold, and ambient temperature filtered water from a single unit.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Visible on the counter:</span> The unit takes up counter space, which matters in smaller kitchens. Compact models are available for tighter setups.
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-5">

            {/* TOC */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal-muted font-semibold mb-3">
                On this page
              </p>
              <nav className="flex flex-col gap-2">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* CTA card */}
            <div className="bg-charcoal rounded-2xl p-5 text-white">
              <p className="text-sm font-semibold mb-1">Not sure which type fits your home?</p>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Tell us about your setup and we will match you to the right system.
              </p>
              <Link to="/get-recommendation" className="btn-accent block text-center">
                Get a recommendation
              </Link>
            </div>

            {/* Explore links */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal-muted font-semibold mb-3">
                Explore
              </p>
              <div className="flex flex-col gap-2.5">
                <Link to="/products?category=water" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  Water purifier lineup &rarr;
                </Link>
                <Link to="/best-water-purifier-for-home" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  Best water purifier for home &rarr;
                </Link>
                <Link to="/water-purifier-cost" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  Water purifier cost guide &rarr;
                </Link>
                <Link to="/installation-availability" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  Installation and service area &rarr;
                </Link>
                <Link to="/guides" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  All guides &rarr;
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="border border-border rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal-muted font-semibold mb-3">
                Questions?
              </p>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-3">
                Call or message us. We are happy to help you decide.
              </p>
              <a href="tel:+14089102223" className="text-sm font-medium text-charcoal hover:underline underline-offset-2">
                (408) 910-2223
              </a>
            </div>

          </div>
        </aside>
      </div>

      {/* ── ZONE 2: FULL-WIDTH SINGLE COLUMN ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-10 pb-12 sm:pb-16">
        <div className="space-y-10">

          {/* Related reading */}
          <div className="border-l-2 border-accent-blue pl-5">
            <p className="section-label mb-3">Related reading</p>
            <div className="flex flex-col gap-2">
              {[
                { to: '/best-water-purifier-for-home', label: 'Best Water Purifier for Home: how to choose the right system' },
                { to: '/water-purifier-cost', label: 'Water Purifier Cost: full price breakdown for all system types' },
                { to: '/guides', label: 'All home wellness buying guides' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Side-by-side comparison */}
          <section id="comparison">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
              Side-by-side comparison
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-charcoal font-medium">
                The right choice between an under sink and countertop water filter depends on your living situation, kitchen layout, and how much permanence you want from your setup.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Under sink filter</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">Installed beneath the counter — no visible hardware on the surface</li>
                    <li className="text-sm leading-relaxed">Requires connection to your water supply line and a dedicated tap</li>
                    <li className="text-sm leading-relaxed">Professional installation recommended; included with some rental plans</li>
                    <li className="text-sm leading-relaxed">High-volume filtered water on demand, no tank to refill</li>
                    <li className="text-sm leading-relaxed">Permanent — not practical to move frequently</li>
                    <li className="text-sm leading-relaxed">Best for homeowners and households wanting a long-term, low-visibility setup</li>
                  </ul>
                </div>
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Countertop filter</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">Sits on the counter — no plumbing required for most models</li>
                    <li className="text-sm leading-relaxed">Connects to the existing faucet or operates as a standalone unit</li>
                    <li className="text-sm leading-relaxed">Can be set up without a technician in most cases</li>
                    <li className="text-sm leading-relaxed">Premium models dispense hot, cold, and ambient temperature water</li>
                    <li className="text-sm leading-relaxed">Portable — can move with you between homes</li>
                    <li className="text-sm leading-relaxed">Best for renters, smaller households, or those who want flexibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cost breakdown */}
          <section id="cost" className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-3">Cost breakdown</h2>
            <div className="space-y-4">
              <p className="text-charcoal-muted leading-relaxed text-sm">
                Under sink systems generally carry a higher hardware cost than basic countertop units, primarily because of the additional components needed — dedicated faucet hardware, tubing, and connection fittings. Installation adds to this if a technician is required.
              </p>
              <p className="text-charcoal-muted leading-relaxed text-sm">
                However, premium countertop and freestanding dispensers — particularly those with multi-stage filtration and hot/cold modes — can reach or exceed the cost of under sink systems. The cost comparison depends heavily on the specific models you are comparing, not just the category.
              </p>
              <p className="text-charcoal-muted leading-relaxed text-sm">
                With a managed rental plan, both system types are accessible for a predictable monthly cost that includes the hardware, filters, and maintenance. The upfront cost difference between under sink and countertop becomes less significant when you are not purchasing outright.
              </p>
              <div className="mt-2 pt-4 border-t border-border">
                <Link
                  to="/water-purifier-cost"
                  className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
                >
                  See full water purifier cost breakdown including rental vs buying &rarr;
                </Link>
              </div>
            </div>
          </section>

          {/* Pros and cons */}
          <section id="pros-cons">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
              Pros and cons
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-charcoal mb-1">Under sink</h3>
                <p className="section-label mb-3">Pros</p>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted mb-5">
                  <li className="text-sm leading-relaxed">Out of sight — no visible footprint on the counter</li>
                  <li className="text-sm leading-relaxed">High-capacity, continuous supply without refilling</li>
                  <li className="text-sm leading-relaxed">Clean aesthetic for kitchen design</li>
                  <li className="text-sm leading-relaxed">No counter space required</li>
                </ul>
                <p className="section-label mb-3">Cons</p>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                  <li className="text-sm leading-relaxed">Requires plumbing work and a dedicated tap installation</li>
                  <li className="text-sm leading-relaxed">Not practical for renters or frequent movers</li>
                  <li className="text-sm leading-relaxed">Higher installation complexity if not included in a plan</li>
                </ul>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-charcoal mb-1">Countertop</h3>
                <p className="section-label mb-3">Pros</p>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted mb-5">
                  <li className="text-sm leading-relaxed">No plumbing required — easy self-setup</li>
                  <li className="text-sm leading-relaxed">Portable and renter-friendly</li>
                  <li className="text-sm leading-relaxed">Premium models offer hot/cold/ambient dispensing</li>
                  <li className="text-sm leading-relaxed">Lower barrier to entry</li>
                </ul>
                <p className="section-label mb-3">Cons</p>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                  <li className="text-sm leading-relaxed">Takes up counter space</li>
                  <li className="text-sm leading-relaxed">Visible unit may not suit all kitchen aesthetics</li>
                  <li className="text-sm leading-relaxed">Freestanding tank models require occasional water refilling</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Which one to choose */}
          <section id="which-to-choose">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
              Which one should you choose?
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-charcoal font-medium">
                There is no universally better option — the right choice depends on how you live in your home.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Choose under sink if:</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">You own your home and want a permanent, built-in solution</li>
                    <li className="text-sm leading-relaxed">Counter space is limited and you want nothing visible</li>
                    <li className="text-sm leading-relaxed">You prefer a clean, minimal kitchen aesthetic</li>
                    <li className="text-sm leading-relaxed">Your household uses a high volume of filtered water daily</li>
                    <li className="text-sm leading-relaxed">Professional installation is available through your plan</li>
                  </ul>
                </div>
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Choose countertop if:</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">You rent and cannot make permanent plumbing changes</li>
                    <li className="text-sm leading-relaxed">You move homes periodically and need a portable solution</li>
                    <li className="text-sm leading-relaxed">You want instant hot and cold filtered water from a single unit</li>
                    <li className="text-sm leading-relaxed">You prefer a simpler, self-installed setup</li>
                    <li className="text-sm leading-relaxed">You want to start quickly without waiting for an installation appointment</li>
                  </ul>
                </div>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                If you are still weighing options, our{' '}
                <Link to="/best-water-purifier-for-home" className="font-medium text-charcoal hover:underline underline-offset-2">
                  complete guide to choosing the best water purifier for your home
                </Link>{' '}
                covers all system types with detailed recommendations by household size and situation. You can also{' '}
                <Link to="/get-recommendation" className="font-medium text-charcoal hover:underline underline-offset-2">
                  request a personalized recommendation
                </Link>{' '}
                based on your specific setup.
              </p>
            </div>
          </section>

          {/* Mid-page CTA */}
          <div className="bg-charcoal rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-white/40 mb-2">
                Free recommendation
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
                Not sure which type fits your home?
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                Tell us about your kitchen setup and household size and we will match you to the right system.
              </p>
            </div>
            <Link
              to="/get-recommendation"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-charcoal text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Get matched
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* FAQ */}
          <section id="faq" className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-5">
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
                  <h3 className="text-base font-semibold text-charcoal mb-2">{item.q}</h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-charcoal rounded-3xl p-7 sm:p-8 text-white">
            <p className="section-label text-white/45 mb-3">Ready to choose?</p>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Get matched to the right system for your home.
            </h2>
            <p className="text-white/65 leading-relaxed mb-6">
              Tell us a bit about your household and we will give you a specific recommendation.
              No pressure, no sales script.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link to="/get-recommendation" className="btn-accent">
                Get a free recommendation
              </Link>
              <Link
                to="/products?category=water"
                className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              >
                Browse water purifiers
              </Link>
              <Link
                to="/installation-availability"
                className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              >
                See service area
              </Link>
            </div>
          </section>

          {/* Internal link footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-t border-border">
            <p className="text-sm text-charcoal-muted">Looking for the full picture?</p>
            <Link
              to="/best-water-purifier-for-home"
              className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
            >
              Read our complete water purifier buying guide &rarr;
            </Link>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────────────────── */}
      <section className="py-10 border-t border-border bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-charcoal-muted">
            Questions? Call{' '}
            <a className="underline hover:text-charcoal" href="tel:+14089102223">
              (408) 910-2223
            </a>{' '}
            or{' '}
            <Link to="/get-recommendation" className="underline hover:text-charcoal">
              fill out the recommendation form
            </Link>
            .
          </p>
          <Link to="/products" className="btn-secondary">
            Browse all products
          </Link>
        </div>
      </section>
    </div>
  )
}
