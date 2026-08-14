import { Link } from 'react-router-dom'

const roles = [
  { title: 'Software Developer', type: 'Technology', location: 'Remote', level: 'Mid–Senior' },
  { title: 'Cloud Infrastructure Engineer', type: 'Technology', location: 'Remote', level: 'Mid–Senior' },
  { title: 'Customer Service Representative', type: 'BPO', location: 'Remote / Philippines', level: 'Entry–Mid' },
  { title: 'Technical Support Specialist', type: 'BPO', location: 'Remote / Philippines', level: 'Entry–Mid' },
  { title: 'Data Processing Associate', type: 'Operations', location: 'Philippines', level: 'Entry' },
  { title: 'Virtual Assistant', type: 'BPO', location: 'Remote / Philippines', level: 'Entry–Mid' },
  { title: 'Web Developer', type: 'Technology', location: 'Remote', level: 'Mid' },
  { title: 'HR & Recruitment Coordinator', type: 'Operations', location: 'Philippines', level: 'Mid' },
]

export default function Careers() {
  return (
    <main>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">Careers</p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Build your career.<br />Operate in advance.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Join a team working on technology, operations and business processes for organizations worldwide. We offer remote and Philippines-based opportunities across technology and BPO career paths.
            </p>
          </div>
        </div>
      </section>

      {/* Career paths */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Career paths at OPERAVA</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { title: 'Technology Careers', desc: 'Software development, cloud, systems and IT consulting roles.', emoji: '💻' },
              { title: 'BPO Careers', desc: 'Customer service, technical support, help desk and operations.', emoji: '🎧' },
              { title: 'Operations', desc: 'Back-office, data processing, HR and administrative functions.', emoji: '⚙️' },
              { title: 'Remote Work', desc: 'Flexible remote opportunities for global talent.', emoji: '🌏' },
            ].map((path) => (
              <div key={path.title} className="p-7 bg-gray-50 border border-gray-100 rounded-2xl hover:border-violet-200 hover:bg-violet-50 transition-all duration-200">
                <div className="text-3xl mb-4">{path.emoji}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{path.desc}</p>
              </div>
            ))}
          </div>

          {/* Current openings */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current opportunities</h2>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-violet-200 transition-colors group"
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <span className="text-xs text-gray-400">{role.type}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{role.location}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{role.level}</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-violet-700 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors"
                >
                  Apply
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-16 lg:py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Why work at OPERAVA?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Remote opportunities', desc: 'Work from wherever you do your best work.' },
              { title: 'Growth-oriented', desc: 'We invest in professional development and career advancement.' },
              { title: 'Collaborative team', desc: 'Work alongside skilled technology and operations professionals.' },
              { title: 'Meaningful work', desc: 'Deliver services that help businesses operate better every day.' },
              { title: 'Technology-forward', desc: 'Work with modern tools and technologies.' },
              { title: 'Global exposure', desc: 'Serve organizations across markets and industries.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Don't see a role that fits?
          </h2>
          <p className="text-base text-gray-500 mb-8">
            We are always interested in hearing from skilled professionals. Send us your details and we will keep you in mind for future opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
          >
            Join OPERAVA
          </Link>
        </div>
      </section>
    </main>
  )
}
