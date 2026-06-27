import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { experience } from '../data';
import { staggerContainer, fadeUp, inView } from '../lib/motion';

export default function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
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
            Experience
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Where I&apos;ve built &amp; shipped
          </motion.h2>

          {/* Timeline */}
          <div className="relative mt-12">
            {/* Vertical gradient line — mobile left, desktop center */}
            <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-violet-500/60 via-blue-500/40 to-transparent md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {experience.map((job, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={job.id}
                    variants={fadeUp}
                    className={`
                      relative pl-12
                      md:w-[calc(50%-2rem)]
                      ${isEven ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}
                    `}
                  >
                    {/* Glowing node */}
                    <span
                      className={`
                        absolute top-1 grid h-8 w-8 place-items-center rounded-full
                        bg-gradient-to-br from-violet-500 to-blue-500 text-white
                        shadow-lg shadow-violet-500/40 ring-4 ring-ink-950
                        left-0
                        md:top-1
                        ${isEven
                          ? 'md:right-[-2.6rem] md:left-auto'
                          : 'md:left-[-2.6rem]'
                        }
                      `}
                    >
                      <Briefcase className="h-4 w-4" />
                    </span>

                    <div className="glow-border rounded-2xl bg-white/5 p-5 transition-transform hover:-translate-y-1">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {job.period}
                        </span>
                        <span className="opacity-50">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {job.location}
                        </span>
                      </div>

                      <h3 className="mt-2 font-display text-lg font-bold text-white">
                        {job.role}
                      </h3>
                      <p className="text-gradient text-sm font-semibold">
                        {job.company}
                      </p>

                      {/* Achievement bullets */}
                      <ul className="mt-3 space-y-2 text-sm text-slate-400">
                        {job.points.map((p, idx) => (
                          <li key={idx} className="flex gap-2 leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
