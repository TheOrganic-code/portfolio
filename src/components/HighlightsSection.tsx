import { motion } from 'framer-motion'

const highlights = [
  { num: '01', label: 'Undergraduate Researcher', org: 'QM Lab, RGIPT', desc: 'ML methods for muon-site prediction in crystalline materials using physics-informed neural networks.' },
  { num: '02', label: 'AI Engineer Intern', org: 'DigitiTwin', desc: 'Building AI systems, LLM fine-tuning, and RAG pipelines for enterprise workflows.' },
  { num: '03', label: 'Hackathon Finalist', org: 'Union Bank Ideathon', desc: 'Finalist in a national-level banking and fintech ideathon competition.' },
  { num: '04', label: 'Multiple ML Projects', org: 'Open Source', desc: 'From Rust neural frameworks to probabilistic computing simulators and medical imaging classifiers.' },
  { num: '05', label: 'Open Source Contributor', org: 'GitHub', desc: 'Active contributions with 12+ public repositories across ML, systems, and scientific computing.' },
]

export function HighlightsSection() {
  return (
    <section className="relative z-10 section-padding">
      <div className="blob blob-pink" style={{ width: '350px', height: '350px', top: '10%', left: '-10%' }} />
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-10">
          <div className="line" />
          <span>Featured Highlights</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card p-5"
            >
              <div style={{ color: '#FF5C8A' }} className="text-lg font-semibold mb-2 font-mono">{h.num}</div>
              <h3 className="text-white font-semibold text-base mb-1">{h.label}</h3>
              <p style={{ color: '#FF5C8A' }} className="text-xs font-medium mb-2.5">{h.org}</p>
              <p style={{ color: '#707070' }} className="text-sm leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
