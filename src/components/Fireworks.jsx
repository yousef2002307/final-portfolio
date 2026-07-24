import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen Fireworks entrance animation.
 * - Dark overlay covers the entire screen during the show.
 * - Fast rockets with motion-blur trails (fill instead of clearRect).
 * - Efficient canvas: reduced shadow cost, 80-110 particles per burst.
 * - Fires every page load.
 */
export default function Fireworks({ onDone }) {
  const canvasRef = useRef(null);
  const [overlayFading, setOverlayFading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageFading, setMessageFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let rafId;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const rockets = [];

    const COLORS = [
      '#ff4500', '#ff7700', '#ffcc00', '#ff0055',
      '#c084fc', '#22d3ee', '#3b82f6', '#ffffff',
    ];

    const rnd = (a, b) => Math.random() * (b - a) + a;

    /* ── Particle ── */
    class Particle {
      constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        const angle = rnd(0, Math.PI * 2);
        const spd = rnd(3, 13);
        this.vx = Math.cos(angle) * spd;
        this.vy = Math.sin(angle) * spd;
        this.alpha = 1;
        this.decay = rnd(0.013, 0.022);
        this.size = rnd(2, 4);
      }
      update() {
        this.vx *= 0.95; this.vy *= 0.95;
        this.vy += 0.1;
        this.x += this.vx; this.y += this.vy;
        this.alpha -= this.decay;
      }
      draw(cx) {
        cx.globalAlpha = Math.max(this.alpha, 0);
        cx.fillStyle = this.color;
        cx.beginPath();
        cx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cx.fill();
      }
    }

    /* ── Rocket ── */
    class Rocket {
      constructor() {
        this.x = rnd(canvas.width * 0.15, canvas.width * 0.85);
        this.y = canvas.height;
        this.targetY = rnd(canvas.height * 0.08, canvas.height * 0.45);
        // Fast: covers screen height in ~30-40 frames
        this.vy = -rnd(canvas.height * 0.022, canvas.height * 0.030);
        this.vx = rnd(-1.5, 1.5);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.trail = [];
        this.exploded = false;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > 12) this.trail.pop();
        if (this.y <= this.targetY) this.explode();
      }
      explode() {
        this.exploded = true;
        const n = Math.floor(rnd(80, 110));
        for (let i = 0; i < n; i++) particles.push(new Particle(this.x, this.y, this.color));
      }
      draw(cx) {
        this.trail.forEach((p, idx) => {
          const a = 1 - idx / this.trail.length;
          cx.globalAlpha = a * 0.85;
          cx.fillStyle = this.color;
          cx.beginPath();
          cx.arc(p.x, p.y, 3 * a, 0, Math.PI * 2);
          cx.fill();
        });
      }
    }

    /* ── Launch rockets every 220 ms ── */
    let count = 0;
    const MAX = 16;
    const launcher = setInterval(() => {
      if (!running || count >= MAX) { clearInterval(launcher); return; }
      rockets.push(new Rocket());
      count++;
    }, 220);

    /* ── Animation loop (motion-blur: fill with semi-transparent dark bg) ── */
    const loop = () => {
      if (!running) return;

      // Semi-transparent fill creates trail/motion-blur effect
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(ctx);
        if (rockets[i].exploded) rockets.splice(i, 1);
      }

      // Particles (no per-particle shadow — use composite 'lighter' globally)
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }
      ctx.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(loop);
    };
    loop();

    // t=4s → show welcome message
    const t1 = setTimeout(() => setShowMessage(true), 3000);

    // t=7s → start fading welcome message + overlay
    const t2 = setTimeout(() => {
      setMessageFading(true);
      setOverlayFading(true);
    }, 7000);

    // t=7.8s → full cleanup + notify parent
    const t3 = setTimeout(() => {
      running = false;
      cancelAnimationFrame(rafId);
      setVisible(false);
      if (typeof onDone === 'function') onDone();
    }, 7800);

    return () => {
      running = false;
      clearInterval(launcher);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (!visible) return null;

  // Each word is a flex group; each character is its own animated+gradient span.
  const title = 'Welcome to My Portfolio!';
  const words = title.split(' ');
  const STAGGER = 0.07;
  const LETTER_DURATION = 0.45;
  const totalLetters = title.replace(/ /g, '').length;
  const totalAnimTime = (totalLetters - 1) * STAGGER + LETTER_DURATION;
  let globalCharIdx = 0;

  return (
    <>
      <style>{`
        @keyframes letterDrop {
          0%   { opacity: 0; transform: translateY(-70px) scale(1.5) rotate(-10deg); filter: blur(8px); }
          55%  { opacity: 1; transform: translateY(6px)  scale(0.93) rotate(2deg);  filter: blur(0); }
          75%  { transform: translateY(-3px) scale(1.03) rotate(-0.5deg); }
          90%  { transform: translateY(1px)  scale(0.99) rotate(0.3deg); }
          100% { opacity: 1; transform: translateY(0)    scale(1)    rotate(0);     filter: blur(0); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes barGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes subtitleFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Full-screen dark backdrop */}
      <div
        style={{
          transition: 'opacity 0.8s ease',
          opacity: overlayFading ? 0 : 1,
          background: 'rgba(0,0,0,0.92)',
        }}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {showMessage && (
          <div
            style={{
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              opacity: messageFading ? 0 : 1,
              transform: messageFading ? 'scale(0.93)' : 'scale(1)',
            }}
            className="relative z-10 px-4 text-center"
          >
            {/*
              Flex row of word-groups. Each word is `inline-flex` with `white-space:nowrap`
              so letters inside a word never collapse onto each other.
              The gradient+clip is applied per-letter (not on the parent) to avoid
              the clip-mask collapsing animated children.
            */}
            <h1
              aria-label={title}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'flex-end',
                lineHeight: 1.15,
                filter: 'drop-shadow(0 0 30px rgba(192,132,252,0.7))',
              }}
            >
              {words.map((word, wi) => {
                const lastWord = wi === words.length - 1;
                return (
                  <span
                    key={wi}
                    style={{
                      display: 'inline-flex',
                      whiteSpace: 'nowrap',
                      marginRight: lastWord ? 0 : '0.28em',
                    }}
                  >
                    {word.split('').map((char) => {
                      const delay = (globalCharIdx++) * STAGGER;
                      return (
                        <span
                          key={`${wi}-${char}-${delay}`}
                          style={{
                            display: 'inline-block',
                            opacity: 0,
                            /* gradient applied per-letter so clip works on each independently */
                            background:
                              'linear-gradient(90deg,#c084fc 0%,#f472b6 22%,#ffffff 40%,#22d3ee 60%,#c084fc 80%,#f472b6 100%)',
                            backgroundSize: '300% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: [
                              `letterDrop ${LETTER_DURATION}s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
                              `shimmerSweep 2.8s linear ${totalAnimTime + 0.15}s infinite`,
                            ].join(', '),
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>

            {/* Accent bar */}
            <div
              style={{
                background: 'linear-gradient(90deg,#a855f7,#f472b6,#22d3ee)',
                transformOrigin: 'center',
                transform: 'scaleX(0)',
                opacity: 0,
                animation: `barGrow 0.55s cubic-bezier(0.22,1,0.36,1) ${totalAnimTime + 0.08}s forwards`,
              }}
              className="mx-auto mt-4 h-1 w-28 rounded-full sm:w-44"
            />

            {/* Tagline */}
            <p
              style={{
                opacity: 0,
                animation: `subtitleFade 0.55s ease ${totalAnimTime + 0.35}s forwards`,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                marginTop: '0.75rem',
              }}
            >
              Crafted with passion &amp; code
            </p>
          </div>
        )}
      </div>
    </>
  );
}
