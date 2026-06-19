import { motion } from 'framer-motion'

const categories = [
  { name: 'Machine Learning', items: ['Python', 'PyTorch', 'Scikit-Learn', 'OpenCV'] },
  { name: 'Programming', items: ['Python', 'C++', 'Rust', 'SQL'] },
  { name: 'Research', items: ['Scientific Computing', 'Numerical Methods', 'Data Analysis'] },
  { name: 'Tools', items: ['Git', 'Linux', 'Jupyter', 'VS Code'] },
]

export function TechStackSection() {
  return (
    <section className="relative z-10 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-10">
          <div className="line" />
          <span>Technical Stack</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#707070' }}>{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="tag text-sm !px-3 !py-1.5">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
