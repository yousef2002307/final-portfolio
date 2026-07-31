import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, ExternalLink, ShieldCheck } from 'lucide-react';
import { education, certificatesUrl } from '../data';
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
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
            </div>

            {certificatesUrl && (
              <motion.a
                variants={fadeUp}
                href={certificatesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-300 ring-1 ring-violet-500/20 transition-all hover:bg-violet-500/20 hover:text-white hover:ring-violet-500/40 active:scale-95 sm:self-end"
              >
                <ShieldCheck className="h-4 w-4 text-violet-400" />
                <span>Verify All Certificates</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </motion.a>
            )}
          </div>

          <div className={`mt-10 grid gap-6 ${education.length === 1 ? 'max-w-2xl' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
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
