import { Link } from 'react-router-dom'

const footerServices = [
  { label: 'Information Technology', href: '/services/it' },
  { label: 'Business Process Outsourcing', href: '/services/bpo' },
  { label: 'Cloud Services', href: '/services/it/cloud-services' },
  { label: 'Data Processing', href: '/services/it/data-processing-it' },
  { label: 'Technical Support', href: '/services/bpo/technical-support' },
]

const footerCompany = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

const footerLegal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="text-2xl font-black tracking-tight text-white">OPERAVA</div>
              <div className="text-[10px] font-semibold tracking-[0.18em] text-violet-400 uppercase mt-0.5">
                Global Solutions
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Operating in Advance.
            </p>
            <p className="text-xs text-gray-500">
              Technology • Workforce • Business Process Services
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">Services</h3>
            <ul className="space-y-3">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">Legal</h3>
            <ul className="space-y-3 mb-8">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-600 transition-colors duration-200"
            >
              Talk to Us
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 OPERAVA Global Solutions. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">Philippines • Global Operations</p>
        </div>
      </div>
    </footer>
  )
}
