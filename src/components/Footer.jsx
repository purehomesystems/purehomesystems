import { Link } from 'react-router-dom'
import { openInstagram, INSTAGRAM_WEB } from '../utils/social'

const navLinks = [
  { to: '/products', label: 'Products' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/guides', label: 'Guides' },
  { to: '/promotions', label: 'Promotions' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
  { to: '/get-recommendation', label: 'Get Recommendation' },
]

const popularGuides = [
  { to: '/guides/best-water-purifier-for-home', label: 'Best Water Purifier for Home' },
  { to: '/guides/air-purifier-for-allergies', label: 'Air Purifier for Allergies' },
  { to: '/guides/types-of-water-purifiers', label: 'Types of Water Purifiers' },
  { to: '/guides/benefits-of-a-bidet', label: 'Benefits of a Bidet' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4 items-center sm:items-start sm:col-span-2 lg:col-span-1">
            <Link to="/">
              <img src="/purehome-logo.png" alt="PureHome Systems" className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-charcoal-muted leading-relaxed text-center sm:text-left">
              Clean water, pure air, and elevated comfort. Delivered to your home with care.
            </p>
            <div className="flex flex-col gap-1.5 items-center sm:items-start">
              <a
                href="mailto:alex@getpurehomesystems.com"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                alex@getpurehomesystems.com
              </a>
              <a
                href="tel:+14089102223"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                (408) 910-2223
              </a>
              <a
                href="https://maps.google.com/?q=1590+Los+Padres+Blvd,+Santa+Clara,+CA+95050"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors text-center sm:text-left"
              >
                1590 Los Padres Blvd, Santa Clara, CA 95050
              </a>
              <p className="text-xs text-charcoal-muted text-center sm:text-left">Showroom by appointment. Ask for Alex.</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3 items-center sm:items-start">
            <p className="section-label">Navigation</p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2 items-center sm:items-start">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Trust & Contact */}
          <div className="flex flex-col gap-3 items-center sm:items-start">
            <p className="section-label">Trust & Contact</p>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <Link to="/author" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                Our Team
              </Link>
              <Link to="/editorial-policy" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">
                Editorial Policy
              </Link>
              <a
                href="https://maps.google.com/?q=1590+Los+Padres+Blvd,+Santa+Clara,+CA+95050"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Visit Showroom
              </a>
              <a
                href="tel:+14089102223"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Call Us
              </a>
              <a
                href="mailto:alex@getpurehomesystems.com"
                className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Email Us
              </a>
            </div>

            <div className="mt-3">
              <a
                href={INSTAGRAM_WEB}
                target="_blank"
                rel="noopener noreferrer"
                title="PureHome Systems on Instagram"
                aria-label="Instagram"
                onClick={openInstagram}
                className="inline-flex items-center text-charcoal-muted hover:text-charcoal transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 4: Popular Guides */}
          <div className="flex flex-col gap-3 items-center sm:items-start">
            <p className="section-label">Popular Guides</p>
            <nav aria-label="Popular guides" className="flex flex-col gap-2 items-center sm:items-start">
              {popularGuides.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-charcoal-muted hover:text-charcoal transition-colors leading-snug text-center sm:text-left"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-charcoal-muted">
            © {new Date().getFullYear()} PureHome Systems. All rights reserved.
          </p>
          <p className="text-xs text-charcoal-muted">
            Clean Water · Pure Air · Better Living
          </p>
        </div>
      </div>
    </footer>
  )
}
