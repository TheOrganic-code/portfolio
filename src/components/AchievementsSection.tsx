import { motion } from 'framer-motion'

const achievements = [
  {
    title: 'Union Bank Ideathon Finalist',
    desc: 'Finalist in a national-level banking and fintech ideathon, competing against teams from across India.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  },
  {
    title: 'QM Lab Research Experience',
    desc: 'Selected to work at the Quantum Materials Lab, RGIPT on ML-physics research for muon spectroscopy applications.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    title: 'AI Engineering Internship',
    desc: 'Industry internship at DigitiTwin working on production AI systems, LLM fine-tuning, and enterprise RAG pipelines.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="8" height="8" rx="2"/><rect x="14" y="2" width="8" height="8" rx="2"/><rect x="2" y="14" width="8" height="8" rx="2"/><rect x="14" y="14" width="8" height="8" rx="2"/></svg>,
  },
  {
    title: 'Open Source Contributor',
    desc: 'Active on GitHub with 12+ public repositories spanning ML frameworks, probabilistic computing, and scientific tools.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  },
  {
    title: 'PRB Publication',
    desc: 'Co-author on muon spin relaxation paper submitted to Physical Review B. First-author paper in drafting on ML + muon SR.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5C8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
]

export function AchievementsSection() {
  return (
    <section className="relative z-10 section-padding">
      <div className="blob blob-soft" style={{ width: '350px', height: '350px', bottom: '0%', right: '-5%' }} />
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-10">
          <div className="line" />
          <span>Achievements</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card p-4 flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,92,138,0.06)', border: '1px solid rgba(255,92,138,0.1)' }}>
                {a.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-0.5">{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#707070' }}>{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
