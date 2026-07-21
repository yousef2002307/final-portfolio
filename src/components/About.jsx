import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, inView } from '../lib/motion';

const STATS = [
  { value: '60+', label: 'Projects Built' },
  { value: '15+', label: 'Live Client Products' },
  { value: '2+', label: 'Years Experience' },
  { value: '50+', label: 'Public Repositories' },
];

const SKILLS = [
  'Laravel', 'PHP', 'HTML5', 'CSS3','Node.js','React.js','jQuery','Tailwind','Bootstrap','Git','GitHub', 'MySQL', 'Redis', 'REST APIs',
  'WebSockets', 'SSE', 'Real-time', 'Queues', 'RBAC', 'Payments',
  'Firebase', 'JavaScript', 'SEO', 'PHPUnit', 'Docker','CI/CD'
];

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <motion.span
            variants={fadeUp}
            className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gradient"
          >
            About Me
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Backend engineer who ships, end to end
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="glass mt-10 grid gap-8 rounded-3xl p-6 sm:p-10 md:grid-cols-5"
          >
            {/* Narrative */}
            <div className="md:col-span-3">
              <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                I&apos;m a full-stack web developer with over{' '}
                <span className="text-white">4 years of experience</span> and a
                computer-science graduate. I&apos;ve delivered more than{' '}
                <span className="text-white">60 projects</span> in web
                development, including 13+ live products for real clients — from
                API design and database architecture all the way to deployment.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                My sweet spot is building{' '}
                <span className="text-slate-200">scalable Laravel &amp;
                Node.js systems</span>: multi-tenant SaaS platforms, real-time
                logistics, fleet management, and high-traffic APIs optimized
                with Redis, queues, and smart caching.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="glow-border rounded-2xl bg-white/5 p-4 text-center"
                >
                  <div className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={fadeUp} className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Tech I work with
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
