import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import HeroVisual from '../components/HeroVisual'
import { itServices, bpoServices, type Service } from '../data/services'

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal').forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [])
  return ref
}

const industries = [
  'Technology', 'SaaS', 'E-commerce', 'Financial Services',
  'Healthcare', 'Professional Services', 'Real Estate', 'Logistics',
  'Retail', 'Startups', 'SMEs', 'Enterprise',
]

const operatingModel = [
  { step: '01', label: 'Discover', desc: 'Understand business objectives, processes and requirements.' },
  { step: '02', label: 'Design', desc: 'Create the appropriate technology, workforce or outsourcing solution.' },
  { step: '03', label: 'Build', desc: 'Develop systems, workflows and operational processes.' },
  { step: '04', label: 'Launch', desc: 'Deploy the solution and transition operations.' },
  { step: '05', label: 'Operate', desc: 'Provide ongoing support and management.' },
  { step: '06', label: 'Improve', desc: 'Continuously optimize performance, technology and processes.' },
]

const whyFeatures = [
  { title: 'Technology-led', desc: 'Modern technology built around business outcomes.' },
  { title: 'People-powered', desc: 'Skilled professionals supporting business operations.' },
  { title: 'Flexible', desc: 'Solutions that can scale with business requirements.' },
  { title: 'Process-driven', desc: 'Structured workflows designed for consistency.' },
  { title: 'Global-ready', desc: 'Remote service delivery designed for organizations operating across markets.' },
  { title: 'Client-focused', desc: 'Solutions designed around each client\'s requirements.' },
]

const techCategories = [
  'Cloud', 'Software', 'APIs', 'Databases', 'Automation',
  'Cybersecurity', 'Data', 'Digital Platforms', 'Systems Integration',
]

const ServiceIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, ReactNode> = {
    code: <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    layers: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    terminal: <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
    lightbulb: <><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /></>,
    'git-merge': <><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
    server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
    'bar-chart': <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></>,
    tool: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
    'life-buoy': <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="14.83" y1="9.17" x2="18.36" y2="5.64" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>,
    'user-check': <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></>,
    'dollar-sign': <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    'user-plus': <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    'book-open': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    truck: <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
    inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      {icons[icon] || <circle cx="12" cy="12" r="10" />}
    </svg>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div
      className={`reveal reveal-delay-${Math.min(index % 4 + 1, 5)} group bg-white border border-gray-100 rounded-2xl p-6 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 group-hover:bg-violet-100 group-hover:scale-110 transition-all duration-300">
          <ServiceIcon icon={service.icon} />
        </div>
        <span className="text-xs font-mono text-gray-300">{service.number}</span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors duration-200">
        {service.name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.shortDescription}</p>
      <Link
        to={`/services/${service.category}/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:gap-2.5 transition-all duration-200"
      >
        Explore service
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </Link>
    </div>
  )
}

export default function Home() {
  const trustRef = useIntersection()
  const itRef = useIntersection()
  const bpoRef = useIntersection()
  const modelRef = useIntersection()
  const industriesRef = useIntersection()
  const whyRef = useIntersection()
  const workforceRef = useIntersection()
  const techRef = useIntersection()
  const securityRef = useIntersection()
  const aboutRef = useIntersection()
  const careersRef = useIntersection()
  const contactRef = useIntersection()

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % operatingModel.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
        {/* Soft background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-white to-white pointer-events-none" />
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 lg:py-20">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-violet-700">
                <span className="w-5 h-px bg-violet-700" />
                OPERAVA GLOBAL SOLUTIONS
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05] animate-fade-up"
              style={{ animationDelay: '80ms' }}
            >
              Operating<br />
              <span className="text-violet-700">in Advance.</span>
            </h1>

            <p
              className="text-lg text-gray-500 leading-relaxed max-w-[500px] animate-fade-up"
              style={{ animationDelay: '160ms' }}
            >
              Technology, workforce and business process services designed to help organizations build, operate and scale with confidence.
            </p>

            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: '240ms' }}
            >
              <Link
                to="/services/it"
                className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-xl hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 active:scale-95 transition-all duration-200"
              >
                Talk to Our Team
              </Link>
            </div>

            <div
              className="flex flex-wrap gap-x-4 gap-y-1 animate-fade-up"
              style={{ animationDelay: '320ms' }}
            >
              {['Technology', 'IT Services', 'Cloud', 'Data', 'BPO', 'Global Workforce'].map((t, i) => (
                <span key={t} className="text-xs text-gray-400 font-medium">
                  {i > 0 && <span className="mr-4 text-gray-200">•</span>}
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── TRUST / POSITIONING ── */}
      <section ref={trustRef} className="py-20 lg:py-28 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Our Approach
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Built for the way modern businesses operate.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Technology',
                desc: 'Digital platforms, software, cloud infrastructure and IT services.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                  </svg>
                ),
              },
              {
                title: 'Workforce',
                desc: 'Skilled remote professionals supporting global operations.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                title: 'Business Processes',
                desc: 'Reliable outsourced operations designed around efficiency and scalability.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 10V7m0 10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${i + 2} bg-gray-950 text-white rounded-2xl p-8 group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-violet-700/20 flex items-center justify-center text-violet-400 mb-5 group-hover:bg-violet-700/30 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IT SERVICES ── */}
      <section ref={itRef} className="py-20 lg:py-28 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
                Information Technology
              </p>
              <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Technology and operations,<br />connected.
              </h2>
              <p className="reveal reveal-delay-2 text-base text-gray-500 mt-4 leading-relaxed">
                Technology solutions that help organizations build digital products, modernize infrastructure, connect systems and operate securely at scale.
              </p>
            </div>
            <div className="reveal reveal-delay-3 shrink-0">
              <Link
                to="/services/it"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-violet-700 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors"
              >
                View all IT services
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {itServices.slice(0, 8).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BPO SERVICES ── */}
      <section ref={bpoRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
                Business Process Outsourcing
              </p>
              <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Extend your capabilities.<br />Scale your operations.
              </h2>
              <p className="reveal reveal-delay-2 text-base text-gray-500 mt-4 leading-relaxed">
                Flexible business process services that help organizations extend their capabilities, improve efficiency and scale operations without unnecessary overhead.
              </p>
            </div>
            <div className="reveal reveal-delay-3 shrink-0">
              <Link
                to="/services/bpo"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-violet-700 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors"
              >
                View all BPO services
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bpoServices.slice(0, 8).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATING MODEL ── */}
      <section ref={modelRef} className="py-20 lg:py-28 bg-gray-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-3">
              How We Work
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              The OPERAVA<br />operating model.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operatingModel.map((step, i) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(i)}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} text-left p-6 rounded-2xl border transition-all duration-300 ${
                  activeStep === i
                    ? 'border-violet-500 bg-violet-700/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-mono font-bold ${activeStep === i ? 'text-violet-400' : 'text-gray-500'}`}>
                    {step.step}
                  </span>
                  <div
                    className={`h-px flex-1 transition-colors duration-300 ${activeStep === i ? 'bg-violet-500' : 'bg-white/10'}`}
                  />
                </div>
                <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${activeStep === i ? 'text-white' : 'text-gray-400'}`}>
                  {step.label}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeStep === i ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section ref={industriesRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Industries
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Built for different industries.<br />Designed around your operation.
            </h2>
          </div>
          <div className="reveal reveal-delay-2 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <Link
                key={industry}
                to="/industries"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200"
              >
                {industry}
              </Link>
            ))}
          </div>
          <div className="reveal reveal-delay-3 mt-8">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:gap-3 transition-all duration-200"
            >
              Explore all industries
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GLOBAL WORKFORCE ── */}
      <section ref={workforceRef} className="py-20 lg:py-28 bg-violet-700 text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 1px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-200 mb-4">
              Global Workforce
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Extend your team without extending your complexity.
            </h2>
            <p className="reveal reveal-delay-2 text-lg text-violet-100 leading-relaxed mb-8">
              OPERAVA provides access to skilled professionals who can support technology, customer operations, administration and specialized business processes remotely.
            </p>
            <div className="reveal reveal-delay-3">
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-violet-700 bg-white rounded-xl hover:bg-violet-50 active:scale-95 transition-all duration-200"
              >
                Build Your Team
              </Link>
            </div>
          </div>
          {/* Simple globe visualization */}
          <div className="reveal reveal-delay-2 flex items-center justify-center">
            <svg viewBox="0 0 400 320" className="w-full max-w-sm opacity-80" fill="none" aria-hidden="true">
              <ellipse cx="200" cy="160" rx="130" ry="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <ellipse cx="200" cy="160" rx="80" ry="130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <ellipse cx="200" cy="160" rx="130" ry="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <ellipse cx="200" cy="160" rx="130" ry="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              {[
                [120, 100], [280, 90], [90, 180], [310, 160], [160, 220], [240, 200], [200, 130], [175, 175],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.9)" />
                  <circle cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.3)">
                    <animate attributeName="r" values="5;14;5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.3;0;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
              {[
                [120, 100, 280, 90], [90, 180, 160, 220], [310, 160, 240, 200],
                [200, 130, 175, 175], [280, 90, 310, 160], [120, 100, 90, 180],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section ref={techRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Technology
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Technology that moves<br />your business forward.
            </h2>
          </div>
          <div className="reveal reveal-delay-2 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {techCategories.map((cat) => (
              <div
                key={cat}
                className="flex flex-col items-center justify-center aspect-square bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:border-violet-200 hover:bg-violet-50 transition-all duration-200 group"
              >
                <span className="text-xs font-semibold text-gray-600 text-center group-hover:text-violet-700 transition-colors leading-tight">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY & TRUST ── */}
      <section ref={securityRef} className="py-20 lg:py-28 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Security & Trust
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Designed with security and responsibility in mind.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Secure Development', desc: 'Security-conscious development practices built into delivery workflows.' },
              { title: 'Access Controls', desc: 'Role-based access controls limiting exposure to sensitive systems and data.' },
              { title: 'Data Handling', desc: 'Defined procedures for handling, storing and processing business data.' },
              { title: 'Privacy-Conscious', desc: 'Privacy-by-design principles applied to how we build and operate systems.' },
              { title: 'Operational Controls', desc: 'Structured operational controls for service delivery consistency.' },
              { title: 'Security Monitoring', desc: 'Ongoing monitoring of systems and operations for anomalies.' },
              { title: 'Defined Procedures', desc: 'Documented procedures for incident response and escalation.' },
              { title: 'Responsible Operations', desc: 'Ethical and responsible business operations across all service lines.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} p-6 bg-white border border-gray-100 rounded-2xl hover:border-violet-100 transition-all duration-200`}
              >
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-700 mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OPERAVA ── */}
      <section ref={whyRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Why OPERAVA
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              A better way to operate.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFeatures.map((f, i) => (
              <div
                key={f.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex gap-4`}
              >
                <div className="w-1 shrink-0 rounded-full bg-violet-700 mt-1 self-stretch" />
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section ref={aboutRef} className="py-20 lg:py-28 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">
              About OPERAVA
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Operating in Advance.
            </h2>
            <p className="reveal reveal-delay-2 text-base text-gray-600 leading-relaxed mb-6">
              OPERAVA Global Solutions combines technology, people and business processes to help organizations build better systems, operate efficiently and scale with confidence.
            </p>
            <p className="reveal reveal-delay-3 text-base text-gray-600 leading-relaxed mb-8">
              We provide technology services and BPO/IT-BPM capabilities for organizations seeking flexible and reliable operational support.
            </p>
            <div className="reveal reveal-delay-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
              >
                Learn about OPERAVA
              </Link>
            </div>
          </div>
          <div className="reveal reveal-delay-2 grid grid-cols-1 gap-4">
            {[
              { label: 'Technology enables.', sub: 'Modern platforms and systems for business.' },
              { label: 'People operate.', sub: 'Skilled professionals driving results.' },
              { label: 'Processes scale.', sub: 'Structured operations that grow with you.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-violet-700 mt-2 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-base">{item.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREERS ── */}
      <section ref={careersRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">Careers</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
              Build your career.<br />Operate in advance.
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Join a team working on technology, operations and business processes for organizations worldwide. We offer remote opportunities across technology and BPO career paths.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-violet-700 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors"
            >
              View Opportunities
            </Link>
          </div>
          <div className="reveal reveal-delay-2 grid grid-cols-2 gap-4">
            {[
              { label: 'Technology Careers', icon: '💻' },
              { label: 'BPO Careers', icon: '🎧' },
              { label: 'Operations', icon: '⚙️' },
              { label: 'Remote Work', icon: '🌏' },
            ].map((item) => (
              <div key={item.label} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-violet-200 hover:bg-violet-50 transition-all duration-200">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section ref={contactRef} className="py-20 lg:py-28 bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-4">
            Get Started
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            Let's build what<br />comes next.
          </h2>
          <p className="reveal reveal-delay-2 text-lg text-gray-400 mb-10 leading-relaxed">
            Build better systems. Operate efficiently. Scale with confidence.
          </p>
          <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-600 active:scale-95 transition-all duration-200"
            >
              Talk to Us
            </Link>
            <Link
              to="/services/it"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold text-gray-300 border border-white/20 rounded-xl hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
