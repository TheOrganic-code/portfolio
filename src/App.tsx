import { ParticleField } from './components/ParticleField'
import { HeroSection } from './components/HeroSection'
import { HighlightsSection } from './components/HighlightsSection'
import { ResearchInterestsSection } from './components/ResearchInterestsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { TechStackSection } from './components/TechStackSection'
import { AchievementsSection } from './components/AchievementsSection'
import { GitHubSection } from './components/GitHubSection'
import { motion } from 'framer-motion'

export default function App() {
  return (
    <main>
      <ParticleField />
      <HeroSection />
      <HighlightsSection />
      <ResearchInterestsSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <AchievementsSection />
      <GitHubSection />

      {/* Contact */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-24 border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#707070] text-sm mb-4"
          >
            Get in touch
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            href="mailto:grunchie1801@gmail.com"
            className="text-2xl sm:text-3xl font-bold text-white hover:text-[#8B5CF6] transition-colors"
          >
            grunchie1801@gmail.com
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mt-6"
          >
            <a href="https://github.com/TheOrganic-code" target="_blank" className="text-[#707070] hover:text-[#8B5CF6] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ayushpandey1801/" target="_blank" className="text-[#707070] hover:text-[#8B5CF6] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://sites.google.com/rgipt.ac.in/magneism-lab/home" target="_blank" className="text-[#707070] hover:text-[#8B5CF6] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[#505050] text-xs mt-8"
          >
            &copy; 2026 Ayush Pandey
          </motion.p>
        </div>
      </section>
    </main>
  )
}
