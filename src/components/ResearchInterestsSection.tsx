import { motion } from 'framer-motion'

const interests = [
  {
    title: 'Scientific Machine Learning',
    desc: 'Applying ML to scientific problems — crystal structure prediction, materials discovery, and physics-constrained optimization.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Probabilistic Computing',
    desc: 'Stochastic computing with p-bits, Ising models, and Boltzmann machines for optimization and sampling problems.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Physics-Informed Neural Networks',
    desc: 'Embedding physical laws into neural architectures for solving differential equations and scientific inverse problems.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'AI for Science',
    desc: 'Using ML to accelerate scientific discovery — from computational physics to automated experimental analysis.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Optimization',
    desc: 'Energy minimization, combinatorial optimization via Ising machines, and gradient-based methods for ML systems.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'ML Systems',
    desc: 'Building performant ML infrastructure — from Rust-based frameworks to LLM inference optimization with quantization.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="2"/><rect x="14" y="2" width="8" height="8" rx="2"/><rect x="2" y="14" width="8" height="8" rx="2"/><rect x="14" y="14" width="8" height="8" rx="2"/>
      </svg>
    ),
  },
]

export function ResearchInterestsSection() {
  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="w-1 h-5 bg-[#8B5CF6] rounded-full" />
          <h2 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-widest">Research Interests</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#707070] text-base max-w-xl mb-12"
        >
          Areas I actively explore and contribute to.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-border rounded-xl p-6 card-hover"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-[#707070] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
