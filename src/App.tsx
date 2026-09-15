import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { OperatingPrinciple } from './components/OperatingPrinciple'
import { ProjectAtlas } from './components/ProjectAtlas'
import { Timeline } from './components/Timeline'
import { EvidenceShelf } from './components/EvidenceShelf'
import { CapabilityGraph } from './components/CapabilityGraph'
import { ContactSection } from './components/ContactSection'

function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <OperatingPrinciple />
        <ProjectAtlas />
        <Timeline />
        <EvidenceShelf />
        <CapabilityGraph />
        <ContactSection />
      </main>
    </>
  )
}

export default App