import { useState, useEffect } from 'react';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

function App() {
  // The currently-selected project. When set, the details modal renders on top.
  const [selectedProject, setSelectedProject] = useState(null);

  // Log the visit once per session via a Vercel serverless function.
  // sessionStorage guard prevents duplicate pings on in-app navigation.
  useEffect(() => {
    if (!sessionStorage.getItem('visit_logged')) {
      fetch('/api/log-visit', { method: 'POST' })
        .then(res => { if (res.ok) sessionStorage.setItem('visit_logged', 'true'); })
        .catch(() => {}); // silent fail — never break the UI
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects onOpen={setSelectedProject} />
       {/* <Education />*/}
        <Contact />
      </main>

      <Footer />

      {/* Full-screen animated project details overlay */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
