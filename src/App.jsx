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
    try {
      if (sessionStorage.getItem('visit_logged')) return;
    } catch (_) {}

    const urlParams = new URLSearchParams(window.location.search);
    const ec = urlParams.get('ec');

    let screenRes = 'Unknown';
    try {
      if (typeof window !== 'undefined' && window.screen) {
        screenRes = `${window.screen.width}x${window.screen.height}`;
      }
    } catch (_) {}

    let tz = 'Unknown';
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    } catch (_) {}

    const clientData = {
      ...(ec ? { ec } : {}),
      url:        window.location.href,
      screen:     screenRes,
      viewport:   typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown',
      language:   navigator?.language || 'Unknown',
      timezone:   tz,
      referrer:   document.referrer || 'Direct',
      connection: navigator?.connection?.effectiveType || 'Unknown',
      platform:   navigator?.platform || 'Unknown',
      touch:      (navigator?.maxTouchPoints > 0) ? 'Yes' : 'No',
      cookieEnabled: navigator?.cookieEnabled ? 'Yes' : 'No',
    };

    fetch('/api/log-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
      keepalive: true,
    })
      .then(res => {
        console.log('[Telegram] /api/log-visit status:', res.status);
        return res.json().then(data => {
          console.log('[Telegram] response:', data);
          if (res.ok) {
            try { sessionStorage.setItem('visit_logged', 'true'); } catch (_) {}
          }
        });
      })
      .catch(err => console.error('[Telegram] fetch error:', err));
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
