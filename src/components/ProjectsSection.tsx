import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Muon Site Detection using ML',
    subtitle: 'Physics + Machine Learning Research',
    problem: 'Predicting muon stopping sites in crystalline materials is computationally expensive and requires extensive physical simulation. Traditional methods lack accuracy and scalability.',
    approach: 'Developed a machine learning approach combining crystal structure features with physics-informed constraints to predict muon sites with higher accuracy and significantly reduced computational cost.',
    tech: ['PyTorch', 'PINNs', 'PyMatGen', 'NumPy', 'SciPy'],
    outcomes: [
      'Improved prediction accuracy over traditional methods',
      'Reduced computation time by orders of magnitude',
      'Co-author on paper submitted to Physical Review B',
    ],
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
    github: 'https://github.com/TheOrganic-code/P-bit-Simulator',
    flip: false,
  },
  {
    title: 'P-Bit Simulator & Library',
    subtitle: 'Probabilistic Computing Framework',
    problem: 'Probabilistic computing with p-bits requires robust simulation frameworks for Ising spin systems and Boltzmann machines, with tunable thermal noise and reliable convergence verification.',
    approach: 'Built a stochastic computing simulator from scratch using PyTorch, implementing Ising spin dynamics with tunable noise. Verified convergence via energy minimization on MAX-CUT benchmarks.',
    tech: ['Python', 'PyTorch', 'Ising Models', 'Energy-Based Models'],
    outcomes: [
      'Verified convergence on standard MAX-CUT benchmarks',
      'Reusable p-bit library with PyTorch-compatible APIs',
      'Enables hybrid deterministic-stochastic workflows',
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    github: 'https://github.com/TheOrganic-code/P-bit-Simulator',
    flip: true,
  },
  {
    title: 'Habitability Predictor',
    subtitle: 'Exoplanet ML Classification',
    problem: 'Classifying exoplanet habitability from astrophysical data requires handling complex feature interactions across planetary and stellar parameters.',
    approach: 'Designed a Random Forest classifier trained on planetary and stellar feature datasets, using scikit-learn with careful feature engineering and cross-validation.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    outcomes: [
      'Accurate habitability classification from stellar/planetary features',
      'Feature importance analysis revealing key predictive factors',
      'End-to-end ML pipeline for astrophysical data',
    ],
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    github: 'https://github.com/TheOrganic-code/Habitability-Predictor',
    flip: false,
  },
  {
    title: 'Brain Tumor Classifier',
    subtitle: 'Deep Learning for Medical Imaging',
    problem: 'Automated brain tumor classification from MRI scans requires robust CNN architectures with interpretable predictions for clinical trust and validation.',
    approach: 'Built a CNN-based deep learning pipeline using PyTorch with Grad-CAM visualization for model interpretability, enabling clinicians to verify model focus regions.',
    tech: ['PyTorch', 'CNNs', 'Grad-CAM', 'Medical Imaging'],
    outcomes: [
      'Accurate tumor classification from MRI scans',
      'Grad-CAM visualizations for clinical interpretability',
      'End-to-end deep learning pipeline for medical imaging',
    ],
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
    github: 'https://github.com/TheOrganic-code/Brain-Tumor-Classifier',
    flip: true,
  },
]

export function ProjectsSection() {
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
          <h2 className="text-sm font-medium text-[#8B5CF6] uppercase tracking-widest">Featured Projects</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#707070] text-base max-w-xl mb-16"
        >
          Research and engineering projects at the intersection of ML, physics, and systems.
        </motion.p>

        <div className="space-y-20">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex flex-col ${proj.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-start`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="rounded-xl overflow-hidden card-border">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div>
                  <p className="text-[#8B5CF6] text-xs font-medium uppercase tracking-wider mb-1">{proj.subtitle}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{proj.title}</h3>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#707070] uppercase tracking-wider mb-1.5">Problem</h4>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{proj.problem}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#707070] uppercase tracking-wider mb-1.5">Approach</h4>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{proj.approach}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-[#1A1A1A] text-[#A0A0A0] border border-[#252525]">{t}</span>
                  ))}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#707070] uppercase tracking-wider mb-1.5">Outcomes</h4>
                  <ul className="space-y-1">
                    {proj.outcomes.map((o) => (
                      <li key={o} className="text-[#A0A0A0] text-sm flex items-start gap-2">
                        <span className="text-[#8B5CF6] mt-1 flex-shrink-0">&#x2022;</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={proj.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2A2A2A] text-[#A0A0A0] text-sm font-medium hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
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
