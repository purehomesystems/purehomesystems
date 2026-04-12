import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/guides', label: 'Guides' },
  { to: '/promotions', label: 'Promotions' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 16
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled))
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-sm border-b border-border'
          : 'bg-background/92'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/">
            <img
              src="/purehome-logo.png"
              alt="PureHome Systems"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-charcoal font-medium bg-white shadow-sm border border-border'
                      : 'text-charcoal-muted hover:text-charcoal hover:bg-white/60'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+14089102223"
              aria-label="Call (408) 910-2223"
              className="text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.46-1.31a2 2 0 0 1 2.11-.45c.83.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <Link to="/get-recommendation" className="btn-primary text-sm">
              Get Recommendation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-charcoal transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-charcoal transition-all duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-charcoal transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          className="absolute inset-0 bg-charcoal/35 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`relative h-full flex flex-col transition-all duration-300 ${
            menuOpen ? 'translate-y-0' : 'translate-y-3'
          }`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/25 bg-black/20 text-white flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex-1 overflow-y-auto px-6 pt-24 pb-8 flex flex-col">
            <nav aria-label="Mobile" className="flex flex-col gap-2 mb-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-5 py-4 rounded-2xl text-2xl leading-none transition-colors ${
                      isActive
                        ? 'text-white bg-white/15 border border-white/25 font-semibold'
                        : 'text-white/85 bg-white/5 border border-white/10 hover:bg-white/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/20 pt-5 flex flex-col gap-3">
              <a
                href="tel:+14089102223"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl border border-white/25 text-white font-medium bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.46-1.31a2 2 0 0 1 2.11-.45c.83.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92z" />
                </svg>
                Call (408) 910-2223
              </a>
              <Link to="/get-recommendation" className="w-full text-center py-4 text-base rounded-2xl bg-white text-charcoal font-semibold">
                Get Recommendation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
