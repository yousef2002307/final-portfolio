import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Globe, Mail } from 'lucide-react';
import { staggerContainer, fadeUp } from '../lib/motion';

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center px-4 pt-24 pb-16 sm:px-6"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        {/* Availability badge */}
        <motion.div variants={fadeUp} className="mb-6 flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.p
          variants={fadeUp}
          className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gradient sm:text-base"
        >
          Backend & Full-Stack Developer
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">Yousef Ahmed</span>
          <br />
          <span className="text-slate-200">I build scalable</span>{' '}
          <span className="relative whitespace-nowrap">
            <span className="text-gradient">web systems</span>
            <svg
              className="absolute -bottom-2 left-0 w-full text-violet-400/60"
              viewBox="0 0 200 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 9C50 3 150 3 198 9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Summary */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          A Full-stack web developer(Laravel & Node.js & React.js) with 2+ years of work
          experience delivering <span className="text-slate-200">60+ web
          projects</span>, including 15+ live client products. I architect
          high-performance Laravel &amp; Node.js APIs, real-time features, and
          robust admin platforms — end to end. and computer-science bachelor's degree holder
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="glow-border group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            View My Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-colors hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </button>
          <a
            href="https://github.com/yousef2002307"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-colors hover:bg-white/10"
          >
            <Globe className="h-4 w-4" />
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition-colors hover:text-slate-200"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </motion.button>
    </section>
  );
}
