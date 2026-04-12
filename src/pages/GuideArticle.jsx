import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Seo from '../seo/Seo'
import {
  BUSINESS,
  createArticleSchema,
  createBreadcrumbSchema,
  createServiceSchema,
} from '../seo/site'
import { getGuideBySlug, guideTopics } from '../data/guides'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function GuideArticle() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const guide = getGuideBySlug(slug)

  useEffect(() => {
    if (!guide) {
      navigate('/guides', { replace: true })
    }
  }, [guide, navigate])

  if (!guide) return null

  const relatedGuides = guide.relatedSlugs
    .map((relatedSlug) => getGuideBySlug(relatedSlug))
    .filter(Boolean)
  const topic = guideTopics.find((item) => item.id === guide.topic)

  const articleSchema = createArticleSchema({
    headline: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt,
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ])

  const guideServiceSchema = createServiceSchema({
    name: `${guide.title} - Buying Guide`,
    description: guide.description,
    serviceType: 'Home wellness product education',
    path: `/guides/${guide.slug}`,
  })

  return (
    <div className="pt-16">
      <Seo
        title={guide.title}
        description={guide.description}
        path={`/guides/${guide.slug}`}
        keywords={[guide.primaryKeyword, ...guide.secondaryKeywords, 'PureHome Systems', 'CUCKOO authorized partner'].join(', ')}
        schema={[articleSchema, breadcrumbSchema, guideServiceSchema]}
      />

      <section className="py-8 border-b border-border bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-charcoal-muted">
            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/guides" className="hover:text-charcoal transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-charcoal">{guide.title}</span>
          </nav>
        </div>
      </section>

      <article className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <header className="mb-10">
            <p className="section-label mb-4">Guide</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-charcoal tracking-tighter leading-tight mb-5">
              {guide.title}
            </h1>
            <p className="text-lg text-charcoal-muted leading-relaxed max-w-3xl mb-6">
              {guide.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-muted">
              <span>By {BUSINESS.name} Team</span>
              <span>•</span>
              <span>{guide.readingTime}</span>
              <span>•</span>
              <span>Published {formatDate(guide.publishedAt)}</span>
              <span>•</span>
              <span>Updated {formatDate(guide.updatedAt)}</span>
            </div>
            <p className="text-sm text-charcoal-muted mt-4">
              Reviewed by PureHome Systems Specialists
            </p>
            <p className="text-sm text-charcoal-muted">
              Based on real customer installations and product experience
            </p>
            {topic && (
              <p className="text-sm text-charcoal-muted mt-3">
                Topic cluster:{' '}
                <Link to={`/guides#topic-${topic.id}`} className="underline hover:text-charcoal transition-colors">
                  {topic.label}
                </Link>
              </p>
            )}
          </header>

          <div className="space-y-10">
            {guide.sections.map((section, sectionIndex) => (
              <section key={section.heading}>
                <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-charcoal-muted leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {/* Inline contextual callout — links naturally to related content */}
                  {section.callout && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 mt-2">
                      <p className="text-sm text-charcoal-muted leading-relaxed flex-1">{section.callout.text}</p>
                      <Link
                        to={section.callout.to}
                        className="flex-shrink-0 text-sm font-medium text-charcoal hover:underline underline-offset-2 whitespace-nowrap"
                      >
                        {section.callout.cta} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
                {/* Mid-article related links — shown after the 2nd section */}
                {sectionIndex === 1 && guide.midArticleLinks?.length > 0 && (
                  <div className="mt-8 border border-border rounded-2xl p-5">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-charcoal-muted font-semibold mb-3">Related reading</p>
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

            <section className="bg-white border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-3">Common mistakes to avoid</h2>
              <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                {guide.commonMistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </section>

            {(guide.pros?.length || guide.cons?.length) && (
              <section className="grid md:grid-cols-2 gap-4">
                {guide.pros?.length > 0 && (
                  <div className="bg-white border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-charcoal mb-3">Pros</h2>
                    <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                      {guide.pros.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {guide.cons?.length > 0 && (
                  <div className="bg-white border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-charcoal mb-3">Cons</h2>
                    <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                      {guide.cons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {(guide.chooseWhen?.length || guide.avoidWhen?.length) && (
              <section className="bg-white border border-border rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-charcoal mb-4">When to choose this approach</h2>
                {guide.chooseWhen?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-charcoal mb-2">Usually a strong fit if:</h3>
                    <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                      {guide.chooseWhen.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {guide.avoidWhen?.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-charcoal mb-2">Consider alternatives if:</h3>
                    <ul className="space-y-2 pl-5 list-disc text-charcoal-muted">
                      {guide.avoidWhen.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {guide.costNotes?.length > 0 && (
              <section className="bg-white border border-border rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-charcoal mb-3">Cost considerations</h2>
                <div className="space-y-3">
                  {guide.costNotes.map((note) => (
                    <p key={note} className="text-charcoal-muted leading-relaxed">{note}</p>
                  ))}
                </div>
              </section>
            )}

            {guide.decisionFramework?.length > 0 && (
              <section className="bg-white border border-border rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-charcoal mb-3">Quick decision framework</h2>
                <ol className="space-y-2 pl-5 list-decimal text-charcoal-muted">
                  {guide.decisionFramework.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            )}

            <section className="bg-white border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-3">Conclusion</h2>
              <p className="text-charcoal-muted leading-relaxed">{guide.conclusion}</p>
            </section>

            <section className="bg-charcoal rounded-3xl p-7 sm:p-8 text-white">
              <p className="section-label text-white/45 mb-3">Need help choosing?</p>
              <h2 className="text-2xl font-semibold tracking-tight mb-3">
                Compare options with guidance that fits your home.
              </h2>
              <p className="text-white/65 leading-relaxed mb-6">
                Explore category options, then request a personalized recommendation if you want help narrowing the shortlist.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                {guide.productLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="btn-secondary border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                    {link.label}
                  </Link>
                ))}
                <Link to="/get-recommendation" className="btn-accent">
                  Get your recommendation
                </Link>
              </div>
            </section>

            {relatedGuides.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-5">Related guides</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedGuides.map((relatedGuide) => (
                    <article key={relatedGuide.slug} className="card flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-charcoal leading-tight">
                        <Link to={`/guides/${relatedGuide.slug}`} className="hover:underline underline-offset-2">
                          {relatedGuide.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-charcoal-muted leading-relaxed">{relatedGuide.excerpt}</p>
                      <div className="pt-2 border-t border-border">
                        <Link to={`/guides/${relatedGuide.slug}`} className="text-sm text-charcoal hover:underline">
                          Read related guide
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <section className="py-14 border-t border-border bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-charcoal-muted">
            Need direct support? Call <a className="underline hover:text-charcoal" href="tel:+14089102223">(408) 910-2223</a>.
          </p>
          <Link to="/guides" className="btn-secondary">
            Back to all guides
          </Link>
        </div>
      </section>
    </div>
  )
}
