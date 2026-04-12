import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'
import { guideTopics, getGuidesByTopic } from '../data/guides'

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
          {guideTopics.map((topic) => {
            const topicGuides = getGuidesByTopic(topic.id)
            if (!topicGuides.length) return null

            return (
              <div key={topic.id} id={`topic-${topic.id}`}>
                <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight mb-6">
                  {topic.label}
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {topicGuides.map((guide) => (
                    <article key={guide.slug} className="card flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="section-label">{guide.readingTime}</p>
                        <p className="text-xs text-charcoal-muted">Updated {guide.updatedAt}</p>
                      </div>
                      <h3 className="text-xl font-semibold text-charcoal leading-tight">
                        <Link
                          to={`/guides/${guide.slug}`}
                          className="hover:underline underline-offset-2"
                        >
                          {guide.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-charcoal-muted leading-relaxed">{guide.excerpt}</p>
                      <div className="pt-3 border-t border-border flex items-center justify-end">
                        <Link to={`/guides/${guide.slug}`} className="btn-secondary text-sm px-4 py-2">
                          Read guide
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
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
