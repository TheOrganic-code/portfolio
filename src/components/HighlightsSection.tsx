import { motion } from 'framer-motion'

const highlights = [
  {
    label: 'Undergraduate Researcher',
    org: 'Quantum Materials Lab, RGIPT',
    value: 'QM Lab',
    desc: 'ML methods for muon-site prediction in crystalline materials using physics-informed neural networks.',
  },
  {
    label: 'AI Engineer Intern',
    org: 'DigitiTwin',
    value: 'DigitiTwin',
    desc: 'Building AI-powered systems, LLM fine-tuning, and RAG pipelines for enterprise workflows.',
  },
  {
    label: 'Hackathon Finalist',
    org: 'Union Bank Ideathon',
    value: 'Finalist',
    desc: 'Advanced to finals in a national-level banking and fintech ideathon competition.',
  },
  {
    label: 'Multiple ML Projects',
    org: 'Open Source & Research',
    value: '6+ Projects',
    desc: 'From Rust neural frameworks to probabilistic computing simulators and medical imaging classifiers.',
  },
  {
    label: 'Open Source',
    org: 'GitHub Contributions',
    value: 'Contributor',
    desc: 'Active open source contributions with 12+ public repositories across ML, systems, and scientific computing.',
  },
]

export function HighlightsSection() {
  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-1 h-5 bg-[#8B5CF6] rounded-full" />
          <h2 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-widest">Featured Highlights</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group card-border rounded-xl p-6 card-hover cursor-default"
            >
              <div className="text-[#8B5CF6] text-2xl font-semibold mb-2 font-mono">0{i + 1}</div>
              <h3 className="text-white font-semibold text-lg mb-1">{h.label}</h3>
              <p className="text-[#8B5CF6] text-xs font-medium mb-3">{h.org}</p>
              <p className="text-[#707070] text-sm leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
