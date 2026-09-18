import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import Fireworks from './components/Fireworks';
import Terminal from './components/Terminal';

function App() {
  // The currently-selected project. When set, the details modal renders on top.
  const [selectedProject, setSelectedProject] = useState(null);

  // Hide Navbar during the fireworks intro; show it once fireworks finish.
  const [showNav, setShowNav] = useState(false);

  // Developer terminal — toggled by Ctrl + `
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // If ?ju=1 is in the URL, render junior-level copy (1–2 yrs, Junior Developer).
  const isJunior = new URLSearchParams(window.location.search).get('ju') === '1';

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
      <Fireworks onDone={() => setShowNav(true)} />
      <AuroraBackground />

      {/* Navbar fades in smoothly after fireworks finish */}
      <div
        style={{
          transition: 'opacity 0.6s ease',
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none',
        }}
      >
        <Navbar onTerminalOpen={() => setTerminalOpen(true)} />
      </div>

      <main>
        <Hero isJunior={isJunior} />
        <About isJunior={isJunior} />
        <Experience />
        <Projects onOpen={setSelectedProject} />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Full-screen animated project details overlay */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Developer / Terminal mode — Ctrl + ` to toggle */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Floating terminal trigger button */}
      <motion.button
        onClick={() => setTerminalOpen((v) => !v)}
        initial={{ opacity: 0, y: 20 }}
        animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open Developer Terminal"
        className="group fixed bottom-16 right-6 z-[998] flex items-center gap-2 overflow-hidden rounded-2xl px-4 py-3 sm:bottom-6"
        style={{
          background: 'linear-gradient(135deg, rgba(10,6,24,0.95), rgba(20,10,40,0.95))',
          border: '1px solid rgba(139,92,246,0.5)',
          boxShadow: '0 0 24px rgba(139,92,246,0.3), 0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pulsing ring */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: '0 0 0 0 rgba(139,92,246,0.6)',
            animation: 'terminalPulse 2.4s ease-out infinite',
          }}
        />

        {/* Prompt characters */}
        <span className="font-mono text-sm font-bold text-violet-300 transition-colors group-hover:text-violet-100">
          &gt;_
        </span>

        {/* Label — slides in on hover via max-width trick */}
        <span
          className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs font-semibold text-slate-300 opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:opacity-100"
        >
          Dev Terminal
        </span>

        {/* Blinking cursor */}
        <span
          className="h-3.5 w-0.5 rounded-full bg-violet-400"
          style={{ animation: 'terminalBlink 1s step-end infinite' }}
        />
      </motion.button>

      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes terminalPulse {
          0%   { box-shadow: 0 0 0 0   rgba(139,92,246,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(139,92,246,0);   }
          100% { box-shadow: 0 0 0 0   rgba(139,92,246,0);   }
        }
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default App;
