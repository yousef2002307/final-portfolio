import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays } from 'lucide-react';
import { education } from '../data';
import { staggerContainer, fadeUp, inView } from '../lib/motion';

export default function Education() {
  return (
    <section id="education" className="relative px-4 py-24 sm:px-6">
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
            Education
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Degrees & certifications
          </motion.h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {education.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className="glow-border group flex flex-col rounded-2xl bg-white/5 p-6 transition-transform hover:-translate-y-1.5"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300 ring-1 ring-white/10">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <h3 className="font-display text-lg font-bold leading-snug text-white">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gradient">
                  {item.institution}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" /> {item.period}
                </span>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.details}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
