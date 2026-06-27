import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { fadeUp, staggerContainer, inView } from '../lib/motion';

const EMAIL = 'yousef20022008@gmail.com';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/yousef2002307', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yousef-ahmed-a22961307', Icon: FaLinkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="mx-auto max-w-3xl"
      >
        <motion.div
          variants={fadeUp}
          className="glow-border relative overflow-hidden rounded-3xl bg-white/5 p-8 text-center sm:p-12"
        >
          {/* Glow accent */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-violet-500/30 blur-[90px]" />

          <motion.span
            variants={fadeUp}
            className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gradient"
          >
            Get in touch
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Let&apos;s build something exceptional
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-slate-400"
          >
            I&apos;m open to backend &amp; full-stack roles, freelance projects,
            and collaborations. Have an idea or a role in mind? My inbox is
            always open.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="glow-border group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" /> Say hello
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-200 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>

          <motion.a
            variants={fadeUp}
            href={`mailto:${EMAIL}`}
            className="mt-6 inline-block text-sm text-slate-500 underline-offset-4 transition-colors hover:text-slate-300 hover:underline"
          >
            {EMAIL}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
