import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createArticleSchema, createBreadcrumbSchema } from '../seo/site'
import { getGuideBySlug } from '../data/guides'

const guide = getGuideBySlug('best-water-purifier-for-home')

export default function BestWaterPurifierForHome() {
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
        schema={[articleSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/35 mb-6">
            <Link to="/" className="hover:text-white/60 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/55">Best Water Purifier for Home</span>
          </nav>

          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
            Buyer's Guide
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-2xl">
            Best Water Purifier for Home
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-8">
            {guide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/get-recommendation" className="btn-accent">
              Get a free recommendation
            </Link>
            <Link
              to="/products?category=water"
              className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              Browse water purifiers
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-white/35">
            <span>{guide.readingTime}</span>
            <span>Updated April 2026</span>
            <span>By PureHome Systems Team</span>
          </div>
        </div>
      </section>

      {/* Article + Sidebar layout */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] lg:gap-14 xl:gap-16 lg:items-start">

        {/* Main article */}
        <article className="min-w-0">
          <div className="space-y-10">

            {/* Content sections */}
            {guide.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index}`}>
                <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((para, i) => (
                    <p key={i} className="text-charcoal-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2.5 pl-5 list-disc text-charcoal-muted">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
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

                {/* Mid-article related links after section index 1 */}
                {index === 1 && guide.midArticleLinks?.length > 0 && (
                  <div className="mt-8 border border-border rounded-2xl p-5">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal-muted font-semibold mb-3">
                      Related reading
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {guide.midArticleLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="text-sm font-medium text-charcoal hover:underline underline-offset-2 leading-snug"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Common mistakes */}
            <section className="bg-white border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Common mistakes to avoid
              </h2>
              <ul className="space-y-3 pl-5 list-disc text-charcoal-muted">
                {guide.commonMistakes.map((mistake) => (
                  <li key={mistake} className="leading-relaxed">
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits / Tradeoffs */}
            <section className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-3">Benefits</h2>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                  {guide.pros.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-3">Tradeoffs</h2>
                <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                  {guide.cons.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">
                      {item}
                    </li>
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
                      <li key={item} className="text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-2">
                    Consider alternatives if:
                  </h3>
                  <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                    {guide.avoidWhen.map((item) => (
                      <li key={item} className="text-sm leading-relaxed">
                        {item}
                      </li>
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
                  <p key={note} className="text-charcoal-muted leading-relaxed text-sm">
                    {note}
                  </p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  to="/installation-availability"
                  className="text-sm font-medium text-charcoal hover:underline underline-offset-2"
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
                  <li key={step} className="text-sm leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            {/* Conclusion */}
            <section>
              <p className="text-charcoal-muted leading-relaxed">{guide.conclusion}</p>
            </section>

            {/* Primary CTA block */}
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
        </article>

        {/* Sticky sidebar */}
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

      {/* Bottom bar */}
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
