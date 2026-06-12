import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { DashboardMarquee } from './components/DashboardMarquee'
import { About } from './components/About'
import { Timeline } from './components/Timeline'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { AILab } from './components/AILab'
import { DemoDashboard } from './components/DemoDashboard'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { ScrollProgress } from './components/ScrollProgress'

function App() {
  return (
    <div className="bg-grid relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <DashboardMarquee />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <AILab />
        <DemoDashboard />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}

export default App
