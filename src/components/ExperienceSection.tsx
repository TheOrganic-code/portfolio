import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Undergraduate Researcher',
    org: 'QM Lab, RGIPT',
    period: 'Jan 2026 - Jun 2026',
    desc: 'Developing machine learning methods for muon-site prediction in crystalline materials. Applying physics-informed neural networks to analyze muon spin relaxation data for crystal structure characterization.',
    tags: ['PyTorch', 'PINNs', 'Scientific Computing', 'PyMatGen'],
  },
  {
    role: 'AI Engineer Intern',
    org: 'DigitiTwin',
    period: 'May 2026 - Present',
    desc: 'Building AI-powered systems for enterprise use. Fine-tuning LLMs on domain-specific datasets and building RAG pipelines for proprietary knowledge retrieval.',
    tags: ['LLMs', 'RAG', 'Python', 'MLOps'],
  },
]

export function ExperienceSection() {
  return (
    <section className="relative z-10 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-10">
          <div className="line" />
          <span>Experience</span>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] md:left-[199px] top-0 bottom-0 w-px" style={{ background: '#1E1E1E' }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col md:flex-row gap-4 md:gap-8 pb-14 last:pb-0"
            >
              <div className="md:w-48 flex-shrink-0 flex items-start gap-3 md:justify-end">
                <div className="md:hidden w-[14px] h-[14px] rounded-full mt-[3px] flex-shrink-0" style={{ background: '#FF5C8A' }} />
                <div>
                  <span className="text-xs font-mono" style={{ color: '#707070' }}>{exp.period}</span>
                  <div className="hidden md:block absolute md:left-[190px] top-[3px] w-[14px] h-[14px] rounded-full ring-[3px] ring-[#0B0B0B]" style={{ background: '#FF5C8A' }} />
                </div>
              </div>

              <div className="flex-1 card p-5">
                <h3 className="text-white font-semibold text-base mb-0.5">{exp.role}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: '#FF5C8A' }}>{exp.org}</p>
                <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#707070' }}>{exp.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
