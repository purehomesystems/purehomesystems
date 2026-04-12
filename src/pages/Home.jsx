import { Link } from 'react-router-dom'
import { featuredProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import Seo from '../seo/Seo'
import { createServiceSchema } from '../seo/site'

// Icons
const WaterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6 8 4 12 4 15a8 8 0 0016 0c0-3-2-7-8-13z" />
  </svg>
)

const AirIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
)

const BidetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16M4 7a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2M9 17v2m6-2v2" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const steps = [
  {
    number: '01',
    title: 'Tell us about your home',
    description: 'Answer a few quick questions and we will identify the right CUCKOO system for your water, air, and comfort needs.',
  },
  {
    number: '02',
    title: 'We handle setup',
    description: 'CUCKOO\'s team installs your chosen system professionally. Most installs are completed in a single visit.',
  },
  {
    number: '03',
    title: 'Ongoing service included',
    description: 'Depending on your rental plan, filter replacements and technician visits are included throughout your term.',
  },
]

const whyUs = [
  {
    title: 'Guided selection',
    description: 'We help you compare models and plans before you commit to anything.',
  },
  {
    title: 'Professional installation',
    description: 'CUCKOO\'s certified technicians handle setup for most products.',
  },
  {
    title: 'Service included',
    description: 'Rental plans cover filter replacements and scheduled maintenance throughout your term.',
  },
  {
    title: 'Flexible plan options',
    description: 'CUCKOO offers Self Care and Visit Care plans across multiple term lengths to suit different needs.',
  },
]

const BubbleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <circle cx="5" cy="7" r="2" />
    <circle cx="19" cy="7" r="2" />
    <circle cx="5" cy="17" r="2" />
    <circle cx="19" cy="17" r="2" />
  </svg>
)

const MassageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l4-4 4 4M7 5v14M21 15l-4 4-4-4M17 19V5" />
  </svg>
)

const categories = [
  {
    id: 'water',
    title: 'Water Purifiers',
    description: 'Countertop, freestanding, under-sink, and ice purifiers. 15 models from CUCKOO.',
    icon: <WaterIcon />,
    color: 'bg-accent-blue-light text-accent-blue',
    count: '15 models',
  },
  {
    id: 'air',
    title: 'Air Purifiers',
    description: 'Room purifiers with 360-degree filtration and real-time air quality monitoring.',
    icon: <AirIcon />,
    color: 'bg-accent-blue-light text-accent-blue',
    count: '5 models',
  },
  {
    id: 'bidet',
    title: 'Bidets',
    description: 'Electric bidet seats with instant heating, self-cleaning nozzle, and remote control.',
    icon: <BidetIcon />,
    color: 'bg-accent-green-light text-accent-green',
    count: '2 models',
  },
  {
    id: 'bubble',
    title: 'Bubble Cleanser',
    description: 'Shower-integrated microbubble system for chemical-free daily skin and hair cleansing.',
    icon: <BubbleIcon />,
    color: 'bg-accent-blue-light text-accent-blue',
    count: '1 model',
  },
  {
    id: 'massage',
    title: 'Massage Chairs',
    description: '3D and 4D full-body massage chairs from CUCKOO\'s Renature line.',
    icon: <MassageIcon />,
    color: 'bg-accent-green-light text-accent-green',
    count: '2 models',
  },
]

const categoryShowcase = [
  {
    id: 'water',
    title: 'Water Purifiers',
    subtitle: 'Clean and fresh direct mineral water',
    image: 'https://cdn.shopify.com/s/files/1/0727/8936/0944/files/M-01.jpg?v=1773079460',
    count: '15 models',
    span: 'md:col-span-2',
  },
  {
    id: 'air',
    title: 'Air Purifier',
    subtitle: '360° air purification system has no blind spots',
    image: 'https://cdn.shopify.com/s/files/1/0727/8936/0944/files/F-01.jpg?v=1744388028',
    count: '5 models',
    span: 'md:col-span-2',
  },
  {
    id: 'bidet',
    title: 'Bidets',
    subtitle: 'The instant heating premium bidet',
    image: 'https://cdn.shopify.com/s/files/1/0727/8936/0944/files/IS-02.jpg?v=1763748281',
    count: '2 models',
    span: 'md:col-span-2',
  },
  {
    id: 'bubble',
    title: 'Bubble Cleanser',
    subtitle: 'Microbubble shower cleansing for daily care',
    image: 'https://cdn.shopify.com/s/files/1/0727/8936/0944/products/CWS-AO201W_03.jpg?v=1770683776',
    count: '1 model',
    span: 'md:col-span-3',
  },
  {
    id: 'massage',
    title: 'Massage Chairs',
    subtitle: '3D and 4D full-body recovery at home',
    image: 'https://cdn.shopify.com/s/files/1/0727/8936/0944/files/4D_Massage_Chair.jpg?v=1746220862',
    count: '2 models',
    span: 'md:col-span-3',
  },
]

export default function Home() {
  const homeSchema = createServiceSchema({
    name: 'Premium Home Wellness Systems with Flexible Plans',
    description:
      'PureHome Systems helps homeowners choose CUCKOO water purifiers, air purifiers, bidets, and massage chairs with flexible plans, installation, and ongoing support.',
    serviceType: 'Home wellness system consultation and installation support',
    path: '/',
  })

  return (
    <div className="pt-16">
      <Seo
        title="Premium Home Water and Wellness Systems"
        description="PureHome Systems helps you choose the right water purifier, air purifier, bidet, or massage chair with flexible plans, installation support, and ongoing service."
        path="/"
        keywords="home water system, water purifier for home, home wellness systems, CUCKOO authorized partner, water purifier installation, air purifier for home, flexible appliance plans, Santa Clara"
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=75&auto=format&fit=crop"
        schema={[homeSchema]}
      />

      {/* Hero */}
      <section className="relative min-h-[620px] sm:min-h-[680px] flex items-center overflow-hidden">

        {/* Background image — blurred premium home interior */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=75&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover scale-[1.06] will-change-transform"
            style={{ filter: 'blur(2px) brightness(0.77)' }}
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-charcoal/78" />
          {/* Bottom gradient — deepens toward footer transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/74 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/8 border border-white/14 rounded-full mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse flex-shrink-0" />
            <span className="text-xs text-white/70 font-medium tracking-wide">CUCKOO Authorized Partner</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-semibold text-white tracking-tightest leading-[1.04] mb-7">
            Find the right<br />
            home system.<br />
            <span className="text-white/55">Rent with ease.</span>
          </h1>

          <p className="text-white/90 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            We match your home with the right CUCKOO water purifier, air purifier, bidet, or massage chair, then handle setup and ongoing service.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 sm:mb-14">
            <Link
              to="/get-recommendation"
              className="inline-flex items-center justify-center gap-2 bg-white text-charcoal font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/92 transition-colors"
            >
              Get Your Free Recommendation
              <ArrowRight />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white/85 text-sm font-medium rounded-full hover:bg-white/8 hover:text-white hover:border-white/40 transition-all"
            >
              Browse All Products
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-px border border-white/10 rounded-2xl overflow-hidden max-w-lg mx-auto">
            {[
              { label: 'Categories', value: '5' },
              { label: 'Available models', value: '25+' },
              { label: 'Starting at', value: '$19.99/mo' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex-1 w-full px-6 py-4 bg-white/6 hover:bg-white/10 transition-colors text-center border-white/10"
                style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
              >
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/55 mb-1">{stat.label}</p>
                <p className="text-sm font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">The solution</p>
              <h2 className="text-4xl sm:text-5xl font-semibold text-charcoal tracking-tighter leading-tight mb-6 text-balance">
                One source.<br />Clear guidance.<br />Ongoing support.
              </h2>
              <p className="text-charcoal-muted text-lg leading-relaxed mb-8">
                PureHome Systems helps you navigate CUCKOO's full catalog, choose the right rental plan, and get your system installed and maintained. We handle the complexity so you do not have to.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/get-recommendation" className="btn-primary gap-2">
                  Find your right system
                  <ArrowRight />
                </Link>
                <Link to="/guides" className="btn-secondary">
                  Read buying guides
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Product categories covered', value: '5' },
                { label: 'Rental plan types', value: '2' },
                { label: 'Support model', value: 'Consult + Install + Care' },
              ].map(({ label, value }) => (
                <div key={label} className="card flex items-center justify-between">
                  <span className="text-charcoal-muted text-sm">{label}</span>
                  <span className="text-2xl font-semibold text-charcoal tracking-tight">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-label mb-3">CUCKOO Catalog</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
                Featured products
              </h2>
            </div>
            <Link to="/products" className="btn-secondary text-sm self-start sm:self-auto shrink-0">
              View all systems
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">What we offer</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
              Five categories. One home.
            </h2>
          </div>

          <div className="grid md:grid-cols-6 gap-4 sm:gap-5">
            {categoryShowcase.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className={`group relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[360px] ${cat.span}`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/35 to-charcoal/20" />

                <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-end">
                  <h3 className="text-3xl sm:text-[42px] font-semibold text-white tracking-tight leading-none mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 max-w-[26ch]">
                    {cat.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/30">
                    <span className="text-sm text-white/80">{cat.count}</span>
                    <span className="text-3xl text-white/90 leading-none transition-transform duration-300 group-hover:translate-x-1">
                      +
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <p className="section-label mb-3">The process</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
              Simple from start to finish
            </h2>
          </div>

          <div className="relative">
            <div
              className="hidden sm:block absolute left-0 right-0 top-5 h-px bg-border"
              aria-hidden="true"
            />
            <div className="grid sm:grid-cols-3 gap-8 relative">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-semibold relative z-10">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-charcoal mb-2">{step.title}</h3>
                    <p className="text-sm text-charcoal-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works" className="btn-secondary">
              Learn more about the process
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-6">
            <div className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 sm:p-8">
              <p className="section-label mb-3">How we help</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight mb-5">
                What to expect when working with us
              </h2>
              <p className="text-charcoal-muted text-base leading-relaxed mb-8">
                We focus on practical fit, clear recommendations, and support after installation so your system works long-term, not just on day one.
              </p>
              <Link to="/get-recommendation" className="btn-primary gap-2">
                Get Your Free Recommendation
                <ArrowRight />
              </Link>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {whyUs.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-white border border-border rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.14em] uppercase text-charcoal-muted font-semibold">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-accent-green-light text-accent-green flex items-center justify-center">
                      <CheckIcon />
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-charcoal leading-tight">{item.title}</h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-charcoal">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <p className="section-label text-white/40 mb-4">Ready to start?</p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6 text-balance">
            Get your personalized<br />recommendation today.
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-10">
            It takes less than 2 minutes. We'll match you with the perfect system for your home and budget.
          </p>
          <Link to="/get-recommendation" className="btn-accent px-10 py-4 text-base gap-2">
            Get Your Free Recommendation
            <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}
