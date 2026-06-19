import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Undergraduate Researcher',
    org: 'QM Lab, RGIPT',
    period: 'Jan 2026 - Jun 2026',
    desc: 'Working on machine learning methods for muon-site prediction and scientific computing applications. Applying physics-informed neural networks to analyze muon spin relaxation data for crystal structure characterization.',
    tags: ['PyTorch', 'PINNs', 'Scientific Computing', 'PyMatGen'],
  },
  {
    role: 'AI Engineer Intern',
    org: 'DigitiTwin',
    period: 'May 2026 - Present',
    desc: 'Building AI-powered systems and contributing to engineering and product development. Fine-tuning LLMs on domain-specific datasets and building RAG pipelines for enterprise knowledge retrieval.',
    tags: ['LLMs', 'RAG', 'Python', 'MLOps'],
  },
]

export function ExperienceSection() {
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
          <h2 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-widest">Experience</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#707070] text-base max-w-xl mb-16"
        >
          Research and engineering roles.
        </motion.p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-48 top-0 bottom-0 w-px bg-[#1A1A1A]" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col md:flex-row gap-4 md:gap-8 pb-16 last:pb-0"
            >
              {/* Timeline dot + date */}
              <div className="md:w-48 flex-shrink-0 flex items-start gap-3 md:justify-end">
                <div className="md:hidden w-3 h-3 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-[#707070] font-mono">{exp.period}</span>
                  <div className="hidden md:block absolute left-[11.3rem] top-1.5 w-3 h-3 rounded-full bg-[#8B5CF6] ring-4 ring-[#0B0B0B]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 card-border rounded-xl p-6 card-hover">
                <h3 className="text-white font-semibold text-lg mb-0.5">{exp.role}</h3>
                <p className="text-[#8B5CF6] text-sm font-medium mb-3">{exp.org}</p>
                <p className="text-[#707070] text-sm leading-relaxed mb-4">{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#1A1A1A] text-[#A0A0A0] border border-[#252525]"
                    >
                      {tag}
                    </span>
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
