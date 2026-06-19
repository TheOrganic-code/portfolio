import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Machine Learning',
    items: ['Python', 'PyTorch', 'Scikit-Learn', 'OpenCV'],
  },
  {
    name: 'Programming',
    items: ['Python', 'C++', 'Rust', 'SQL'],
  },
  {
    name: 'Research',
    items: ['Scientific Computing', 'Numerical Methods', 'Data Analysis'],
  },
  {
    name: 'Tools',
    items: ['Git', 'Linux', 'Jupyter', 'VS Code'],
  },
]

export function TechStackSection() {
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
          <h2 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-widest">Technical Stack</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#707070] text-base max-w-xl mb-12"
        >
          Technologies and tools I work with.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-xs font-semibold text-[#707070] uppercase tracking-wider mb-3">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1.5 rounded-lg bg-[#141414] text-[#A0A0A0] border border-[#252525] hover:border-[#8B5CF6]/30 hover:text-[#8B5CF6] transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
