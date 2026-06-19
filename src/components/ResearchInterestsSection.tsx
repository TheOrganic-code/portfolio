import { motion } from 'framer-motion'

const interests = [
  {
    title: 'Scientific ML',
    desc: 'ML for crystal structure prediction, materials discovery, and physics-constrained optimization.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    title: 'Probabilistic Computing',
    desc: 'Stochastic computing with p-bits, Ising models, and Boltzmann machines for optimization.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
  },
  {
    title: 'Physics-Informed NN',
    desc: 'Embedding physical laws into neural architectures for solving differential equations and inverse problems.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    title: 'AI for Science',
    desc: 'Using ML to accelerate scientific discovery — from computational physics to experimental analysis.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    title: 'Optimization',
    desc: 'Energy minimization, combinatorial optimization via Ising machines, and gradient-based methods.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    title: 'ML Systems',
    desc: 'Rust-based ML frameworks, LLM inference optimization, and production-grade quantization pipelines.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="8" height="8" rx="2"/><rect x="14" y="2" width="8" height="8" rx="2"/><rect x="2" y="14" width="8" height="8" rx="2"/><rect x="14" y="14" width="8" height="8" rx="2"/></svg>,
  },
]

export function ResearchInterestsSection() {
  return (
    <section className="relative z-10 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-10">
          <div className="line" />
          <span>Research Interests</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card p-5"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#707070' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
