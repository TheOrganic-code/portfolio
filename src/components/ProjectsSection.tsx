import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  {
    num: '01',
    name: 'NeuraRust',
    category: 'Systems / ML',
    client: 'Open Source',
    col1: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80',
    ],
    col2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    num: '02',
    name: 'P-bit Simulator',
    category: 'Physics / ML',
    client: 'Research',
    col1: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&q=80',
    ],
    col2: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
  },
  {
    num: '03',
    name: 'Brain Tumor Classifier',
    category: 'Deep Learning',
    client: 'Academic',
    col1: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    ],
    col2: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const totalCards = projects.length
  const targetScale = 1 - (totalCards - 1 - index) * 0.03

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.1'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} className="h-[85vh] sticky top-24 md:top-32 z-10" style={{ top: `${index * 28}px` }}>
      <motion.div
        style={{ scale, transformOrigin: 'top center' }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 h-full overflow-hidden"
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="text-[#D7E2EA] font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.num}
            </span>
            <div>
              <p className="text-[#D7E2EA] font-medium uppercase opacity-70 text-sm sm:text-base">{project.category}</p>
              <h3
                className="text-[#D7E2EA] font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-[#D7E2EA] text-xs sm:text-sm opacity-50 mt-1">{project.client}</p>
            </div>
          </div>
          <a href="https://github.com/TheOrganic-code" target="_blank" rel="noopener noreferrer">
            <button
              className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest
                         px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base
                         hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              Live Project
            </button>
          </a>
        </div>

        <div className="flex gap-3 sm:gap-4 h-[calc(100%-8rem)]">
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
            <img
              src={project.col1[0]}
              alt=""
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1[1]}
              alt=""
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.col2}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32">
      <h2
        className="hero-heading font-black uppercase text-center mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div className="max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
