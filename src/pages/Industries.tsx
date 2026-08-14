import { Link } from 'react-router-dom'

const industries = [
  {
    name: 'Technology',
    desc: 'Software companies, tech startups and digital product teams seeking development, infrastructure and operational support.',
    services: ['Software Development', 'Cloud Services', 'Technical Support', 'IT Consulting'],
  },
  {
    name: 'SaaS',
    desc: 'SaaS businesses building scalable platforms, managing customer operations and processing growing data volumes.',
    services: ['SaaS Platform Development', 'Customer Service', 'Help Desk', 'Data Processing'],
  },
  {
    name: 'E-commerce',
    desc: 'Online retailers requiring order management, customer service, back-office support and platform development.',
    services: ['Back-Office Operations', 'Customer Service', 'Data Entry', 'Web Development'],
  },
  {
    name: 'Financial Services',
    desc: 'Financial organizations requiring technology solutions, data processing and structured back-office operations.',
    services: ['Finance & Accounting Support', 'Data Processing', 'Systems Integration', 'IT Consulting'],
  },
  {
    name: 'Healthcare',
    desc: 'Healthcare organizations needing technology systems, document processing, records management and administrative support.',
    services: ['Document Processing', 'Data Entry', 'IT Systems Development', 'HR Administration'],
  },
  {
    name: 'Professional Services',
    desc: 'Consulting, legal and professional firms requiring virtual assistance, research and administrative operations.',
    services: ['Virtual Assistance', 'Research & Analysis', 'Document Processing', 'HR Administration'],
  },
  {
    name: 'Real Estate',
    desc: 'Real estate organizations requiring data management, document processing and administrative support.',
    services: ['Data Entry', 'Document Processing', 'Virtual Assistance', 'Back-Office Operations'],
  },
  {
    name: 'Logistics',
    desc: 'Supply chain and logistics companies requiring supply chain support, data processing and systems integration.',
    services: ['Supply Chain Support', 'Data Processing', 'Systems Integration', 'Back-Office Operations'],
  },
  {
    name: 'Retail',
    desc: 'Retail organizations requiring customer service, order management, data processing and operational support.',
    services: ['Customer Service', 'Back-Office Operations', 'Data Processing', 'Web Development'],
  },
  {
    name: 'Startups',
    desc: 'Early-stage companies requiring flexible technology development, operational support and virtual assistance.',
    services: ['Software Development', 'Virtual Assistance', 'IT Consulting', 'Cloud Services'],
  },
  {
    name: 'SMEs',
    desc: 'Small and medium enterprises seeking affordable, flexible technology and business process support.',
    services: ['IT Infrastructure & Support', 'Virtual Assistance', 'Data Entry', 'Customer Service'],
  },
  {
    name: 'Enterprise',
    desc: 'Large organizations requiring scalable technology solutions, complex integrations and high-volume operational support.',
    services: ['Systems Integration', 'IT Consulting', 'Knowledge Process Outsourcing', 'HR Administration'],
  },
]

export default function Industries() {
  return (
    <main>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">Industries</p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Built for different industries.<br />Designed around your operation.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              OPERAVA serves organizations across a range of industries — each with different technology requirements, operational challenges and growth objectives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="group flex flex-col p-7 bg-white border border-gray-100 rounded-2xl hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors">
                  {industry.name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{industry.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {industry.services.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-xs font-medium bg-violet-50 text-violet-700 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Don't see your industry listed?
          </h2>
          <p className="text-base text-gray-500 mb-8">
            We work with organizations across many sectors. Contact us to discuss your specific requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
          >
            Discuss Your Requirements
          </Link>
        </div>
      </section>
    </main>
  )
}
