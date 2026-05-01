import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createArticleSchema, createBreadcrumbSchema, createFAQSchema } from '../seo/site'
import { getGuideBySlug } from '../data/guides'

const guide = getGuideBySlug('best-water-purifier-for-home')

// Stable module-level references — prevents Seo's useEffect from re-running
// on every render due to new array/object literals being passed as props
const articleSchema = createArticleSchema({
  headline: 'Best Water Purifier for Home',
  description: guide.description,
  path: '/best-water-purifier-for-home',
  publishedAt: guide.publishedAt,
  updatedAt: guide.updatedAt,
})
const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Best Water Purifier for Home', path: '/best-water-purifier-for-home' },
])
const FAQ_ITEMS = [
  {
    q: 'What is the best water purifier for home use?',
    a: 'For most homes, a reverse osmosis (RO) system provides the most thorough filtration — removing dissolved solids, heavy metals, and contaminants that carbon filters leave behind. The right form factor depends on your space: countertop units suit smaller households and renters, while under-sink and freestanding systems work well for families. A managed rental plan can give you access to a premium RO system without the upfront cost.',
  },
  {
    q: 'How much does a home water purifier cost?',
    a: 'Costs vary widely. Basic pitcher filters run $50–$200. Standard countertop or under-sink systems range from $200–$800. Premium systems with multi-stage filtration and hot/cold dispensing can reach $800–$2,000 or more. Rental plans for premium systems typically run $30–$80 per month and include filters, maintenance, and service support. See our full water purifier cost breakdown for a detailed comparison.',
  },
  {
    q: 'Is it better to buy or rent a water purifier?',
    a: 'Both approaches work, but they suit different priorities. Buying means higher upfront cost and you manage all maintenance yourself — filter replacements, servicing, and repairs. Renting a premium system through a plan typically includes filters, maintenance, and support at a predictable monthly rate. Most households find the managed model simpler, especially for systems that require regular servicing.',
  },
  {
    q: 'How often do water purifier filters need to be replaced?',
    a: 'Filter replacement schedules depend on the system and your water usage and quality. Multi-stage systems have different filters at different stages, each with its own lifespan. With a managed rental plan, filter replacements are scheduled and handled for you — you do not need to track or order them separately.',
  },
  {
    q: 'Do I need a professional to install a water purifier?',
    a: 'It depends on the system type. Countertop and most freestanding systems require no plumbing and can be set up without a technician. Under-sink systems and those that connect directly to your water line benefit from professional installation. With a CUCKOO rental plan, professional installation is included in select service areas.',
  },
]

const faqSchema = createFAQSchema(FAQ_ITEMS)
const SCHEMA = [articleSchema, breadcrumbSchema, faqSchema]

const HERO_GRADIENT = {
  background:
    'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)',
}

// Card data for the Recommended Systems section (section index 5).
// The guide data holds the full prose; these cards are a curated
// presentation layer for scannability on this standalone page.
const RECOMMENDED_CARDS = [
  {
    tag: 'Countertop system',
    label: 'Best for small households',
    description:
      'A compact countertop unit covers daily needs without taking much counter space. Minimal install, easy to move — ideal for apartments and couples.',
  },
  {
    tag: 'Tankless system',
    label: 'Best for families',
    description:
      'A tankless freestanding or countertop system with hot, cold, and warm modes handles daily volume and eliminates the need for a separate kettle.',
  },
  {
    tag: 'Under-sink system',
    label: 'Best for clean aesthetics',
    description:
      'An under-sink system with a dedicated faucet tap delivers filtered water with nothing visible on the counter. Clean, low-profile, permanent.',
  },
  {
    tag: 'Smart-enabled system',
    label: 'Best for tech households',
    description:
      'Smart-enabled CUCKOO models track filter life and system status remotely. Maintenance is visible without thinking about it.',
  },
]

// Shared section renderer — used by both layout zones.
// Accepts the section object and its ORIGINAL guide index (0–6)
// so all conditional checks (index === 1, 3, 5) work correctly
// regardless of which map slice the section comes from.
function GuideSection({ section, index }) {
  return (
    <section key={section.heading} id={`section-${index}`}>
      <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
        {section.heading}
      </h2>
      <div className="space-y-4">
        {section.paragraphs?.map((para, i) => (
          <p
            key={i}
            className={`leading-relaxed ${
              i === 0 ? 'text-charcoal font-medium' : 'text-charcoal-muted'
            }`}
          >
            {para}
          </p>
        ))}

        {/* Section 5 (Recommended Systems): render as cards instead of a plain list */}
        {index === 5 && section.bullets ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {RECOMMENDED_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="bg-white border border-border rounded-2xl p-5 flex flex-col gap-3"
                >
                  <div>
                    <p className="section-label mb-1">{card.tag}</p>
                    <p className="text-base font-semibold text-charcoal leading-snug">
                      {card.label}
                    </p>
                  </div>
                  <p className="text-sm text-charcoal-muted leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <div className="pt-3 border-t border-border">
                    <Link
                      to="/products?category=water"
                      className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
                    >
                      View options &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Deciding between form factors? See our detailed breakdown of{' '}
              <Link
                to="/under-sink-vs-countertop-water-filter"
                className="font-medium text-charcoal hover:underline underline-offset-2"
              >
                under sink vs countertop water filters
              </Link>
              , including installation, cost, and which suits renters vs homeowners.
            </p>
          </>
        ) : (
          section.bullets && (
            <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          )
        )}

        {section.callout && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 mt-2">
            <p className="text-sm text-charcoal-muted leading-relaxed flex-1">
              {section.callout.text}
            </p>
            <Link
              to={section.callout.to}
              className="flex-shrink-0 text-sm font-medium text-charcoal hover:underline underline-offset-2 whitespace-nowrap"
            >
              {section.callout.cta} &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* Mid-page CTA #2 — rendered after section 3 (what to look for) */}
      {index === 3 && (
        <div className="mt-8 bg-charcoal rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-white/40 mb-2">
              Free recommendation
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
              Not sure what fits your home?
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              Answer a few quick questions and we will match you to the right system for your household.
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
      )}
    </section>
  )
}

export default function BestWaterPurifierForHome() {
  return (
    <div className="pt-16">
      <Seo
        title="Best Water Purifier for Home"
        description="Find the best water purifier for your home. Compare purifier types, learn what is actually in tap water, and get a system matched to your household size and habits."
        path="/best-water-purifier-for-home"
        keywords={[
          guide.primaryKeyword,
          ...guide.secondaryKeywords,
          'CUCKOO water purifier',
          'water purifier Bay Area',
          'PureHome Systems',
          'home water purification system',
        ].join(', ')}
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
            <span className="text-white/55">Best Water Purifier for Home</span>
          </nav>

          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
            Buyer's Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-5 max-w-2xl">
            Best Water Purifier for Home
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-7">
            {guide.description}
          </p>

          {/* Value stack */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-8">
            {[
              'No bottles or refills',
              'Clean water on demand',
              'Installation or self-setup nationwide',
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

          {/* CTAs — primary dominant */}
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
            <span>{guide.readingTime}</span>
            <span>Updated April 2026</span>
            <span>By PureHome Systems Team</span>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BLOCK ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="section-label mb-2">Best choice for most homes</p>
              <p className="text-lg font-semibold text-charcoal leading-snug mb-2">
                Reverse osmosis system (under-sink or countertop tankless)
              </p>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Removes the widest range of contaminants. Works in any home layout. Available on
                flexible rental plans with service included.
              </p>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
              <p className="section-label mb-3">Quick match</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { type: 'Families', match: 'tank or tankless freestanding system' },
                  { type: 'Renters', match: 'compact countertop unit' },
                  { type: 'Convenience', match: 'managed rental plan with service included' },
                ].map(({ type, match }) => (
                  <div key={type} className="flex items-baseline gap-2 text-sm">
                    <span className="text-charcoal font-medium w-28 flex-shrink-0">{type}</span>
                    <span className="text-charcoal-muted">{match}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        ── ZONE 1: TWO-COLUMN ────────────────────────────────────────────────
        Sections 0–1 ("Why needed" + "Tap water") sit in the left column
        alongside the sticky sidebar. The grid stops after these two sections.
      */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-4 lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] lg:gap-14 xl:gap-16 lg:items-start">

        {/* Left column: introductory sections only */}
        <div className="min-w-0">
          <div className="space-y-10">
            {guide.sections.slice(0, 2).map((section, i) => (
              <GuideSection
                key={section.heading}
                section={section}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Right column: sticky sidebar — only occupies layout space in Zone 1 */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-5">

            {/* Table of contents */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal-muted font-semibold mb-3">
                On this page
              </p>
              <nav className="flex flex-col gap-2">
                {guide.sections.map((section, index) => (
                  <a
                    key={section.heading}
                    href={`#section-${index}`}
                    className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
                <a
                  href="#section-mistakes"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug"
                >
                  Common mistakes
                </a>
              </nav>
            </div>

            {/* CTA card */}
            <div className="bg-charcoal rounded-2xl p-5 text-white">
              <p className="text-sm font-semibold mb-1">Not sure which to get?</p>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                We can match you to the right system in one short conversation.
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
                <Link
                  to="/products?category=water"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Water purifier lineup &rarr;
                </Link>
                <Link
                  to="/products"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  All products &rarr;
                </Link>
                <Link
                  to="/installation-availability"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Installation and service area &rarr;
                </Link>
                <Link
                  to="/how-it-works"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  How the rental plan works &rarr;
                </Link>
                <Link
                  to="/guides"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
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
                Call or message us. We are happy to help you choose the right system.
              </p>
              <a
                href="tel:+14089102223"
                className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
              >
                (408) 910-2223
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/*
        ── ZONE 2: SINGLE-COLUMN CENTERED ───────────────────────────────────
        Starting at "Types of water purifiers" (section index 2), all remaining
        content flows in a centered single-column layout. The sidebar does not
        exist in this zone — it is only rendered inside Zone 1 above.

        max-w-[780px] gives a comfortable reading width that is wide enough for
        the 2-column card grids (recommended systems, benefits/tradeoffs) while
        still being constrained for long-form prose.

        mt-10 matches the space-y-10 rhythm so section 2 visually continues
        from section 1 with the same vertical gap.
      */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-10 pb-12 sm:pb-16">
        <div className="space-y-10">

          {/* Related reading — moved here from GuideSection so it renders
              centered in the single-column zone rather than inside the
              narrower left column of the two-column grid above */}
          {guide.midArticleLinks?.length > 0 && (
            <div className="border-l-2 border-accent-blue pl-5">
              <p className="section-label mb-3">Related reading</p>
              <div className="flex flex-col gap-2">
                {guide.midArticleLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/under-sink-vs-countertop-water-filter"
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug"
                >
                  Under Sink vs Countertop Water Filter: full side-by-side comparison
                </Link>
              </div>
            </div>
          )}

          {/* Sections 2–6: pass original index as i+2 so all conditional
              checks (index === 3 for mid-page CTA, index === 5 for cards)
              continue to work exactly as before */}
          {guide.sections.slice(2).map((section, i) => (
            <GuideSection
              key={section.heading}
              section={section}
              index={i + 2}
            />
          ))}

          {/* Common mistakes */}
          <section id="section-mistakes" className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Common mistakes to avoid
            </h2>
            <ul className="space-y-3 pl-5 list-disc text-charcoal-muted">
              {guide.commonMistakes.map((mistake) => (
                <li key={mistake} className="leading-relaxed">{mistake}</li>
              ))}
            </ul>
          </section>

          {/* Benefits / Tradeoffs */}
          <section className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-3">Benefits</h2>
              <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                {guide.pros.map((item) => (
                  <li key={item} className="text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-3">Tradeoffs</h2>
              <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                {guide.cons.map((item) => (
                  <li key={item} className="text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Choose when / Avoid when */}
          <section className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Is a home water purifier right for you?
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-2">Good fit if:</h3>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                  {guide.chooseWhen.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-2">
                  Consider alternatives if:
                </h3>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                  {guide.avoidWhen.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Cost considerations */}
          <section className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-3">Cost considerations</h2>
            <div className="space-y-3">
              {guide.costNotes.map((note) => (
                <p key={note} className="text-charcoal-muted leading-relaxed text-sm">{note}</p>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
              <Link
                to="/water-purifier-cost"
                className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
              >
                See our full water purifier cost breakdown &rarr;
              </Link>
              <Link
                to="/installation-availability"
                className="text-sm text-charcoal-muted hover:text-charcoal hover:underline underline-offset-2 transition-colors"
              >
                See installation details and service area &rarr;
              </Link>
            </div>
          </section>

          {/* Decision framework */}
          <section className="bg-white border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-3">
              How to decide: a quick framework
            </h2>
            <ol className="space-y-2.5 pl-5 list-decimal text-charcoal-muted">
              {guide.decisionFramework.map((step) => (
                <li key={step} className="text-sm leading-relaxed">{step}</li>
              ))}
            </ol>
          </section>

          {/* Conclusion */}
          <section>
            <p className="text-charcoal-muted leading-relaxed">{guide.conclusion}</p>
          </section>

          {/* CTA #3 — bottom dark block */}
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

          {/* FAQ */}
          <section className="bg-white border border-border rounded-2xl p-6">
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

          {/* Link back to guide version */}
          <div className="flex items-center justify-between py-4 border-t border-border">
            <p className="text-sm text-charcoal-muted">Prefer the full editorial format?</p>
            <Link
              to="/guides/best-water-purifier-for-home"
              className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
            >
              Read in Guides &rarr;
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
