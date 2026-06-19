import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Muon Site Detection using ML',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
    desc: 'Developing machine learning methods for predicting muon stopping sites in crystalline materials as part of undergraduate research at QM Lab, RGIPT.',
    tags: ['PyTorch', 'PINNs', 'PyMatGen', 'SciML'],
    github: 'https://github.com/TheOrganic-code/P-bit-Simulator',
    flip: false,
  },
  {
    title: 'P-Bit Simulator',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    desc: 'A probabilistic computing framework implementing stochastic p-bits and optimization experiments using Ising spin systems with tunable thermal noise.',
    tags: ['Python', 'PyTorch', 'Ising', 'Energy-Based'],
    github: 'https://github.com/TheOrganic-code/P-bit-Simulator',
    flip: true,
  },
  {
    title: 'NeuraRust',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    desc: 'A Rust-based neural network and ML experimentation project focused on building core components from scratch while exploring high-performance systems programming.',
    tags: ['Rust', 'Machine Learning', 'Systems Programming'],
    github: 'https://github.com/TheOrganic-code/neuraRust',
    flip: false,
  },
  {
    title: 'Habitability Predictor',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    desc: 'ML system for exoplanet habitability prediction using astrophysical datasets and ensemble learning methods.',
    tags: ['Python', 'scikit-learn', 'Pandas'],
    github: 'https://github.com/TheOrganic-code/Habitability-Predictor',
    flip: true,
  },
  {
    title: 'Brain Tumor Classifier',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
    desc: 'Deep learning pipeline for automated MRI-based brain tumor classification with Grad-CAM interpretability.',
    tags: ['PyTorch', 'CNNs', 'Grad-CAM'],
    github: 'https://github.com/TheOrganic-code/Brain-Tumor-Classifier',
    flip: false,
  },
]

export function ProjectsSection() {
  return (
    <section className="relative z-10 section-padding">
      <div className="blob blob-pink" style={{ width: '400px', height: '400px', top: '30%', right: '-10%' }} />
      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-3">
          <div className="line" />
          <span>Featured Projects</span>
        </div>
        <p className="text-sm mb-12" style={{ color: '#707070' }}>Research and engineering projects.</p>

        <div className="space-y-16">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`flex flex-col ${proj.flip ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-10 items-start`}
            >
              <div className="w-full md:w-[45%]">
                <div className="rounded-xl overflow-hidden card">
                  <img src={proj.image} alt={proj.title} loading="lazy" className="w-full h-56 sm:h-72 object-cover" />
                </div>
              </div>
              <div className="w-full md:w-[55%] space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{proj.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#707070' }}>{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <a href={proj.github} target="_blank" className="btn btn-outline !inline-flex !w-auto !mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
