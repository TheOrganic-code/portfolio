import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-16">
      <div className="max-w-5xl mx-auto w-full">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span className="text-xs font-medium text-[#8B5CF6] uppercase tracking-widest">
            Undergraduate Researcher / AI Engineer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none mb-6"
          style={{ letterSpacing: '-0.04em' }}
        >
          Ayush{' '}
          <span className="text-[#8B5CF6]">Pandey</span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="space-y-1.5 mb-8"
        >
          <p className="text-lg md:text-xl text-[#A0A0A0] font-medium">
            Undergraduate Researcher <span className="text-[#8B5CF6]">@</span> QM Lab, RGIPT
          </p>
          <p className="text-lg md:text-xl text-[#A0A0A0] font-medium">
            AI Engineer Intern <span className="text-[#8B5CF6]">@</span> DigitiTwin
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base md:text-lg text-[#707070] max-w-2xl leading-relaxed mb-10"
        >
          Building intelligent systems at the intersection of Machine Learning, Scientific Computing, Physics, and Probabilistic Computing.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="/Ayush_Pandey_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#7C3AED] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Resume
          </a>
          <a
            href="https://github.com/TheOrganic-code"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2A2A2A] text-[#A0A0A0] text-sm font-medium hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ayushpandey1801/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2A2A2A] text-[#A0A0A0] text-sm font-medium hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="mailto:grunchie1801@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2A2A2A] text-[#A0A0A0] text-sm font-medium hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </motion.div>
      </div>
    </section>
  )
}
