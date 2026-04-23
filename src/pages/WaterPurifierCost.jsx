import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createArticleSchema, createBreadcrumbSchema } from '../seo/site'

// ── Stable module-level references ───────────────────────────────────────────
const articleSchema = createArticleSchema({
  headline: 'Water Purifier Cost: What You Should Expect to Pay',
  description:
    'A clear breakdown of water purifier costs — from cheap filters to premium systems and rental plans — so you can make a confident decision for your home.',
  path: '/water-purifier-cost',
  publishedAt: '2026-04-23',
  updatedAt: '2026-04-23',
})
const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Water Purifier Cost', path: '/water-purifier-cost' },
])
const SCHEMA = [articleSchema, breadcrumbSchema]

const HERO_GRADIENT = {
  background:
    'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)',
}

// ── Sidebar table of contents ─────────────────────────────────────────────────
const TOC = [
  { id: 'cost-ranges',        label: 'Typical cost ranges' },
  { id: 'what-affects',       label: 'What affects the cost' },
  { id: 'hidden-costs',       label: 'Hidden costs to know' },
  { id: 'buy-vs-rent',        label: 'Buying vs. renting' },
  { id: 'real-comparison',    label: 'Real cost comparison' },
  { id: 'what-people-choose', label: 'What most homeowners choose' },
  { id: 'installation',       label: 'Installation and availability' },
  { id: 'what-you-pay',       label: 'What you are actually paying for' },
]

export default function WaterPurifierCost() {
  return (
    <div className="pt-16">
      <Seo
        title="Water Purifier Cost: What You Should Expect to Pay"
        description="A clear breakdown of water purifier costs — basic filters, premium systems, and rental plans — so you can choose confidently without overpaying or under-buying."
        path="/water-purifier-cost"
        keywords="water purifier cost, how much does a water purifier cost, water purifier price, water filter rental cost, CUCKOO water purifier price, water purifier vs bottled water cost"
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
            <span className="text-white/55">Water Purifier Cost</span>
          </nav>

          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
            Cost Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-5 max-w-2xl">
            Water Purifier Cost: What You Should Expect to Pay
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-7">
            Prices range from $50 to over $2,000 depending on technology and features. This guide breaks down what actually drives the cost so you know exactly what you are paying for.
          </p>

          {/* Value stack */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-8">
            {[
              'No large upfront investment required',
              'Clean water without bottled costs',
              'Flexible monthly options available',
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
              Get Your Free Recommendation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/products?category=water"
              className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              Browse Systems
            </Link>
          </div>

          {/* Trust signal */}
          <p className="text-xs text-white/30 mb-6 tracking-wide">
            CUCKOO Authorized Partner · Serving customers nationwide
          </p>

          {/* Byline */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/30">
            <span>12 min read</span>
            <span>Updated April 2026</span>
            <span>By PureHome Systems Team</span>
          </div>
        </div>
      </section>

      {/* ── QUICK COST SUMMARY ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
          <p className="section-label mb-4">Typical cost ranges</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Basic pitcher filters',    range: '$50 – $200',       note: 'Carbon only, no installation' },
              { label: 'Standard systems',         range: '$200 – $800',      note: 'Countertop or under-sink' },
              { label: 'Premium systems',          range: '$800 – $2,000+',   note: 'RO, hot/cold, smart features' },
              { label: 'Rental plans',             range: '~$30 – $80/mo',    note: 'Service and filters included' },
            ].map(({ label, range, note }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wide">{label}</p>
                <p className="text-xl font-semibold text-charcoal tracking-tight">{range}</p>
                <p className="text-xs text-charcoal-muted leading-snug">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ZONE 1: TWO-COLUMN (intro sections + sidebar) ───────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-4 lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] lg:gap-14 xl:gap-16 lg:items-start">

        {/* Left column */}
        <div className="min-w-0">
          <div className="space-y-10">

            {/* Section 0: What affects the cost */}
            <section id="what-affects">
              <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                What affects the cost of a water purifier?
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed text-charcoal font-medium">
                  The price gap between a $50 pitcher filter and a $1,500 under-sink system is real, and it is not just marketing. Different technologies do fundamentally different things.
                </p>
                <p className="leading-relaxed text-charcoal-muted">
                  Understanding what drives cost makes it easier to decide what you actually need versus what you are paying extra for.
                </p>
                <ul className="space-y-3 pl-5 list-disc text-charcoal-muted">
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Filtration technology:</span> Carbon filters are inexpensive and improve taste. Reverse osmosis (RO) removes dissolved solids, heavy metals, and pharmaceuticals but costs more upfront and wastes some water. Ultrafiltration (UF) sits between the two.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">System type:</span> Countertop units are compact and portable. Freestanding dispensers hold large volumes and often include hot and cold modes. Under-sink systems are hidden and permanent. Each type has different installation and hardware costs.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Temperature options:</span> A system that delivers only cold filtered water is cheaper than one that also provides instant hot water. Hot and cold modes eliminate your kettle but add to the unit price.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Smart features:</span> Filter life tracking, app connectivity, and auto-flushing add cost but reduce the chance of running expired filters without knowing it.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Installation:</span> Some countertop systems require no plumbing. Others need a professional to tap into your water line. Professional installation typically adds $100–$300 to the purchase price.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 1: Hidden costs */}
            <section id="hidden-costs">
              <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                Hidden costs most people miss
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed text-charcoal font-medium">
                  Hidden costs are primarily a concern when you own a system outright. With a managed rental plan, these costs are bundled into one monthly amount — but it is still worth understanding what you are avoiding.
                </p>
                <p className="leading-relaxed text-charcoal-muted">
                  If you buy a water purification system on your own:
                </p>
                <ul className="space-y-3 pl-5 list-disc text-charcoal-muted">
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Filter replacements:</span> Filters require periodic replacement to continue working properly. How often depends on the system and your water usage. This is an ongoing cost that is easy to underestimate when comparing upfront prices.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Routine maintenance:</span> Multi-stage systems need periodic servicing — membrane checks, sanitization, and component inspections. Without a service plan, you are responsible for scheduling and paying for this yourself.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Repairs:</span> After a warranty period ends, component failures come out of pocket. Finding a qualified technician familiar with your specific system can add both cost and delay.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-medium text-charcoal">Upgrade costs:</span> If you want a newer model or a different system type down the line, you are starting the purchase process over again.
                  </li>
                </ul>
                <p className="leading-relaxed text-charcoal-muted">
                  With a rental plan, filter replacements, maintenance, and service support are included. The monthly cost covers the system and the ongoing care — there is no separate bill when something needs attention.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 mt-2">
                  <p className="text-sm text-charcoal-muted leading-relaxed flex-1">
                    Want to see exactly what a rental plan includes?
                  </p>
                  <Link
                    to="/how-it-works"
                    className="flex-shrink-0 text-sm font-medium text-charcoal hover:underline underline-offset-2 whitespace-nowrap"
                  >
                    How plans work &rarr;
                  </Link>
                </div>
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
              <p className="text-sm font-semibold mb-1">Not sure what fits your budget?</p>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Tell us about your home and we will match you to the right plan.
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
                <Link to="/installation-availability" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  Installation and service area &rarr;
                </Link>
                <Link to="/how-it-works" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                  How the rental plan works &rarr;
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
                Call or message us. We are happy to walk through pricing with you.
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
                { to: '/best-water-purifier-for-home', label: 'Best Water Purifier for Home: complete buying guide' },
                { to: '/guides/types-of-water-purifiers', label: 'Types of Water Purifiers: A Complete Comparison' },
                { to: '/guides/water-purifier-vs-water-filter', label: 'Water Purifier vs Water Filter: What Is the Difference?' },
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

          {/* Buying vs Renting */}
          <section id="buy-vs-rent">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
              Buying vs. renting: which makes more sense?
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-charcoal font-medium">
                Both paths can work, but they suit very different priorities. The key difference is not just price — it is who handles the ongoing work.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Buying outright</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">Higher upfront cost for a premium system</li>
                    <li className="text-sm leading-relaxed">You own the unit and manage all maintenance</li>
                    <li className="text-sm leading-relaxed">Filter replacements are your responsibility to track and order</li>
                    <li className="text-sm leading-relaxed">Service and repairs are separate costs after the warranty period</li>
                    <li className="text-sm leading-relaxed">Upgrading to a newer system means purchasing again</li>
                  </ul>
                </div>
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Renting (CUCKOO model)</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">Lower barrier to entry — no large upfront payment</li>
                    <li className="text-sm leading-relaxed">Filter replacements included in the monthly plan</li>
                    <li className="text-sm leading-relaxed">Maintenance and service support covered</li>
                    <li className="text-sm leading-relaxed">One predictable monthly cost with no surprise bills</li>
                    <li className="text-sm leading-relaxed">Access to newer systems over time</li>
                  </ul>
                </div>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                Most households that use managed rental systems choose them because the convenience outweighs the ownership appeal. When filters, service, and support are handled for you, clean water simply becomes part of your home — without ongoing effort.
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
                Not sure if buying or renting makes sense for you?
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                We will walk through your situation and give you an honest answer — no pressure.
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

          {/* Real cost comparison */}
          <section id="real-comparison">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
              Real cost comparison
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-charcoal font-medium">
                Running the numbers puts things in perspective. Most households significantly underestimate what they already spend on water.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Bottled water</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">A family of 4 drinking bottled water spends roughly $100–$150 per month</li>
                    <li className="text-sm leading-relaxed">That is $1,200–$1,800 per year before accounting for convenience store purchases</li>
                    <li className="text-sm leading-relaxed">Plastic waste, storage hassle, and running out are ongoing costs that do not show up in the number</li>
                  </ul>
                </div>
                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-charcoal mb-3">Rental plan</h3>
                  <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                    <li className="text-sm leading-relaxed">A premium rental plan runs $30–$80/month depending on the system</li>
                    <li className="text-sm leading-relaxed">Filters, maintenance, and service are included — no hidden add-ons</li>
                    <li className="text-sm leading-relaxed">Most households break even in 1–3 months compared to their bottled water spend</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-charcoal mb-3">Long-term ownership vs. rental</h3>
                <p className="text-sm text-charcoal-muted leading-relaxed mb-3">
                  A $1,200 system with $150/year in filters and one $250 service call over 5 years costs roughly $2,150 total — or about $36/month. A rental plan at $50/month over the same period is $3,000, but includes a better system, guaranteed service, and no surprise expenses.
                </p>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  The right answer depends on whether you want ownership responsibility or predictable simplicity. Neither is wrong — they just suit different households.
                </p>
              </div>
            </div>
          </section>

          {/* What most homeowners choose */}
          <section id="what-people-choose">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
              What most homeowners actually end up choosing
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-charcoal font-medium">
                After working with hundreds of customers, a clear pattern shows up: people who start with cheap filters almost always upgrade. People who go straight to a premium system rarely look back.
              </p>
              <ul className="space-y-3 pl-5 list-disc text-charcoal-muted">
                <li className="leading-relaxed">
                  <span className="font-medium text-charcoal">Cheap filters lose their appeal quickly.</span> Pitcher filters need frequent refilling and replacement. The quality feels noticeably worse than a proper purification system. Most households stop using them within a year.
                </li>
                <li className="leading-relaxed">
                  <span className="font-medium text-charcoal">Convenience matters more than people expect.</span> Having instant hot and cold filtered water changes daily habits in a way that is hard to give up. Households that choose multi-temperature systems consistently report higher satisfaction.
                </li>
                <li className="leading-relaxed">
                  <span className="font-medium text-charcoal">Maintenance fatigue is real.</span> People who buy systems often let filter changes slide past their due date. A managed plan removes this entirely — service is scheduled and handled for you.
                </li>
                <li className="leading-relaxed">
                  <span className="font-medium text-charcoal">Premium systems are chosen for peace of mind.</span> When the system is professionally installed, regularly serviced, and backed by a known brand, you simply stop thinking about your water. That is the outcome most people are actually looking for.
                </li>
              </ul>
            </div>
          </section>

          {/* Installation and availability */}
          <section id="installation" className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-3">
              Installation and availability
            </h2>
            <div className="space-y-3">
              <p className="text-charcoal-muted leading-relaxed text-sm">
                CUCKOO systems are available nationwide. In select service areas, professional installation is provided as part of the rental plan — a technician handles the full setup and walks you through the system before leaving.
              </p>
              <p className="text-charcoal-muted leading-relaxed text-sm">
                In areas outside the direct service zone, guided self-installation support is available. Many countertop and freestanding systems do not require any plumbing connection and are straightforward to set up.
              </p>
              <p className="text-charcoal-muted leading-relaxed text-sm">
                Installation is typically bundled with the service plan rather than charged separately. If you are comparing options, this is worth factoring in — it is a cost that often gets added on top with other brands.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                to="/installation-availability"
                className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
              >
                Check installation availability in your area &rarr;
              </Link>
            </div>
          </section>

          {/* What you are actually paying for */}
          <section id="what-you-pay" className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-3">
              What you are actually paying for
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed mb-4">
              When the monthly cost of a premium system is compared side by side with a cheap filter, the difference is not just the hardware. Here is what the price covers:
            </p>
            <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
              <li className="text-sm leading-relaxed">
                <span className="font-medium text-charcoal">Filtration quality:</span> Multi-stage systems remove a broader range of contaminants than basic carbon filters. The result is consistently clean water, not just improved taste.
              </li>
              <li className="text-sm leading-relaxed">
                <span className="font-medium text-charcoal">Temperature functionality:</span> Many CUCKOO systems dispense hot, cold, and ambient temperature water from a single unit. This replaces a separate kettle or hot water dispenser and changes how the system fits into daily life.
              </li>
              <li className="text-sm leading-relaxed">
                <span className="font-medium text-charcoal">Filter replacements:</span> Included in the rental plan on a set schedule — no tracking, no separate orders, no running expired filters.
              </li>
              <li className="text-sm leading-relaxed">
                <span className="font-medium text-charcoal">Ongoing maintenance:</span> Routine servicing is covered as part of the plan. You do not need to source a technician or manage this independently.
              </li>
              <li className="text-sm leading-relaxed">
                <span className="font-medium text-charcoal">Service reliability:</span> Access to support when something needs attention, backed by CUCKOO's service network rather than a third-party repair call.
              </li>
            </ul>
          </section>

          {/* CTA #3 — bottom dark block */}
          <section className="bg-charcoal rounded-3xl p-7 sm:p-8 text-white">
            <p className="section-label text-white/45 mb-3">Ready to find your fit?</p>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Not sure what makes sense for your home?
            </h2>
            <p className="text-white/65 leading-relaxed mb-6">
              Tell us about your household and budget and we will give you a specific recommendation.
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
            <p className="text-sm text-charcoal-muted">Choosing between systems?</p>
            <Link
              to="/best-water-purifier-for-home"
              className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
            >
              Read our full buying guide &rarr;
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
