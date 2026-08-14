import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Information Technology', href: '/services/it', description: 'Software, cloud, infrastructure & data' },
      { label: 'Business Process Outsourcing', href: '/services/bpo', description: 'Customer ops, back-office & workforce' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group" aria-label="OPERAVA Global Solutions — Home">
          <span className="text-xl font-black tracking-tight text-gray-900 group-hover:text-violet-700 transition-colors duration-200">
            OPERAVA
          </span>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-violet-700 uppercase">
            Global Solutions
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  onKeyDown={(e) => e.key === 'Escape' && setServicesOpen(false)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-violet-700 bg-violet-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-violet-50 transition-colors duration-150 group"
                      >
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                          {child.label}
                        </span>
                        <span className="text-xs text-gray-500">{child.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-violet-700 bg-violet-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/services/it"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            Explore Services
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Talk to Us
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          className="lg:hidden bg-white border-t border-gray-100 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setServicesOpen((o) => !o)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-800 rounded-xl hover:bg-gray-50"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="px-4 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.href) ? 'text-violet-700 bg-violet-50' : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-gray-100 mt-2 flex flex-col gap-3">
              <Link
                to="/contact"
                className="flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
