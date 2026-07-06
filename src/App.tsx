import { ParticleField } from './components/ParticleField'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { StatsBar } from './components/StatsBar'
import { ResearchAreasSection } from './components/ResearchAreasSection'
import { HonorsSection } from './components/HonorsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { PublicationsSection } from './components/PublicationsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { TechStackSection } from './components/TechStackSection'
import { ResearchInterestsSection } from './components/ResearchInterestsSection'
import { GitHubSection } from './components/GitHubSection'
import { Footer } from './components/Footer'

const wrapperStyle: React.CSSProperties = {
  maxWidth: 1200, margin: '0 auto', padding: '0 32px',
}

export default function App() {
  return (
    <main>
      <ParticleField />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <div style={wrapperStyle}>
          <StatsBar />
        </div>
        <ResearchAreasSection />
        <HonorsSection />
        <ProjectsSection />
        <PublicationsSection />
        <ExperienceSection />
        <TechStackSection />
        <ResearchInterestsSection />
        <GitHubSection />
        <Footer />
      </div>
    </main>
  )
}
