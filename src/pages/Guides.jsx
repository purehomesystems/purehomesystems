import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'
import { guideTopics, getGuidesByTopic, getGuideBySlug } from '../data/guides'

const POPULAR_SLUGS = [
  'best-water-purifier-for-home',
  'water-purifier-vs-water-filter',
  'types-of-water-purifiers',
]

export default function Guides() {
  const guideHubSchema = createServiceSchema({
    name: 'Home Wellness Buying Guides',
    description:
      'Educational guides from PureHome Systems covering water purifiers, air purifiers, bidets, and home wellness product selection.',
    serviceType: 'Home wellness buying guidance',
    path: '/guides',
  })

  return (
    <div className="pt-16">
      <Seo
        title="Home Wellness Guides | Water, Air, and Bidet Buying Advice"
        description="Explore practical guides on choosing water purifiers, air purifiers, and bidets. Learn tradeoffs, avoid common mistakes, and get personalized recommendation support."
        path="/guides"
        keywords="home wellness guides, best water purifier for home, air purifier buying guide, benefits of bidet, CUCKOO product research, home system comparison"
        schema={[guideHubSchema]}
      />

      <section className="relative py-20 sm:py-28 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(59,130,196,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Guides</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 max-w-3xl">
            Practical buying guides for home water, air, and comfort systems.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            Research-first content to help you compare options, understand tradeoffs, and choose the right system for your home.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
          {/* Featured guide */}
          <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-3">
              <p className="section-label">Featured guide</p>
              <span className="text-[11px] font-semibold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full leading-none">
                Start here
              </span>
            </div>
            <h2 className="text-xl font-semibold text-charcoal leading-tight mb-2">
              <Link to="/best-water-purifier-for-home" className="hover:underline underline-offset-2">
                Best Water Purifier for Home
              </Link>
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed mb-5">
              A complete guide to choosing the right system for your home
            </p>
            <Link to="/best-water-purifier-for-home" className="btn-primary text-sm px-5 py-2.5">
              Read full guide &rarr;
            </Link>
          </div>

          {/* Popular guides */}
          {(() => {
            const popularGuides = POPULAR_SLUGS.map(getGuideBySlug).filter(Boolean)
            if (!popularGuides.length) return null
            return (
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-6">
                  Popular Guides
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {popularGuides.map((guide) => (
                    <article key={guide.slug} className="card flex flex-col gap-4 h-full">
                      <div className="flex items-center justify-between gap-3">
                        <p className="section-label">{guide.readingTime}</p>
                        <p className="text-xs text-charcoal-muted">Updated {guide.updatedAt}</p>
                      </div>
                      <h3 className="text-xl font-semibold text-charcoal leading-tight line-clamp-2">
                        <Link
                          to={`/guides/${guide.slug}`}
                          className="hover:underline underline-offset-2"
                        >
                          {guide.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-3">{guide.excerpt}</p>
                      <div className="pt-3 border-t border-border flex items-center justify-end mt-auto">
                        <Link to={`/guides/${guide.slug}`} className="btn-secondary text-sm px-4 py-2">
                          Read guide
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })()}

          {guideTopics.map((topic) => {
            const topicGuides = getGuidesByTopic(topic.id)
            if (!topicGuides.length) return null

            return (
              <div key={topic.id} id={`topic-${topic.id}`}>
                <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-6">
                  {topic.label}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {topicGuides.map((guide) => (
                    <article key={guide.slug} className="card flex flex-col gap-4 h-full">
                      <div className="flex items-center justify-between gap-3">
                        <p className="section-label">{guide.readingTime}</p>
                        <p className="text-xs text-charcoal-muted">Updated {guide.updatedAt}</p>
                      </div>
                      <h3 className="text-xl font-semibold text-charcoal leading-tight line-clamp-2">
                        <Link
                          to={`/guides/${guide.slug}`}
                          className="hover:underline underline-offset-2"
                        >
                          {guide.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-3">{guide.excerpt}</p>
                      <div className="pt-3 border-t border-border flex items-center justify-end mt-auto">
                        <Link to={`/guides/${guide.slug}`} className="btn-secondary text-sm px-4 py-2">
                          Read guide
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
                {topic.id === 'water' && (
                  <p className="mt-4 text-sm text-charcoal-muted">
                    Want to understand pricing?{' '}
                    <Link to="/water-purifier-cost" className="font-medium text-charcoal hover:underline underline-offset-2">
                      See water purifier cost breakdown &rarr;
                    </Link>
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-4">
            Need help choosing for your exact home setup?
          </h2>
          <p className="text-charcoal-muted text-sm leading-relaxed max-w-xl mx-auto mb-8">
            If you already know the category you want, compare products directly. If you want a guided shortlist, request a personalized recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="btn-secondary px-8 py-3.5">
              Explore products
            </Link>
            <Link to="/get-recommendation" className="btn-primary px-8 py-3.5">
              Get recommendation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
