import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ResearchMap } from './components/ResearchMap'
import { ProjectSlider } from './components/ProjectSlider'
import { Timeline } from './components/Timeline'
import { PublicationsSection } from './components/PublicationsSection'
import { SkillsMatrix } from './components/SkillsMatrix'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <ResearchMap />
        <ProjectSlider />
        <Timeline />
        <PublicationsSection />
        <SkillsMatrix />
        <ContactSection />
      </main>
    </>
  )
}

export default App