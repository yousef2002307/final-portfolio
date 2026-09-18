import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, Zap, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

/**
 * Animated full-screen project details overlay.
 *
 * - Backdrop fade + content scale/slide in via AnimatePresence.
 * - Closes on backdrop click, the X button, or Escape.
 * - Locks body scroll while open and restores focus on close.
 * - Renders a "Technical Deep Dives" section when project.deepDives is present.
 */
export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  // Escape to close + body scroll lock while the modal is mounted.
  useEffect(() => {
    if (!project) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  const paragraphs = (project?.description ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const tags      = project?.tags?.length ? project.tags : [];
  const deepDives = project?.deepDives?.length ? project.deepDives : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} â€” project details`}
        >
          {/* Backdrop */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.97 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-900/95 shadow-2xl shadow-black/60 sm:rounded-3xl"
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-slate-200 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable body */}
            <div className="overflow-y-auto">
              {/* Hero image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="skeleton h-full w-full" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h2 className="pr-12 font-display text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h2>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Overview
                  </h3>
                  {paragraphs.length > 0 ? (
                    paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[15px] leading-relaxed text-slate-300"
                      >
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-slate-400">No description available.</p>
                  )}
                </div>

                {/* â”€â”€ Technical Deep Dives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                {deepDives.length > 0 && (
                  <div className="mt-10">
                    {/* Section header */}
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/15 text-violet-400">
                        <Zap className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-white sm:text-lg">
                          Technical Deep Dives
                        </h3>
                        <p className="text-xs text-slate-400">
                          Engineering challenges &amp; how I solved them
                        </p>
                      </div>
                    </div>

                    {/* Cards */}
                    <div className="mt-5 space-y-5">
                      {deepDives.map((dive, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all hover:border-violet-400/25 hover:bg-white/[0.05] sm:p-6"
                          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
                        >
                          {/* Ambient glow on hover */}
                          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-600/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

                          {/* Card header */}
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 font-mono text-xs font-bold text-violet-300">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <h4 className="font-display text-[15px] font-bold leading-snug text-white sm:text-base">
                              {dive.title}
                            </h4>
                          </div>

                          {/* Problem / Solution / Result rows */}
                          <div className="mt-4 space-y-3">
                            {/* Problem */}
                            <div className="flex gap-3">
                              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-500/15">
                                <AlertTriangle className="h-3 w-3 text-rose-400" />
                              </span>
                              <div className="min-w-0">
                                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-rose-400">
                                  The Problem
                                </span>
                                <p className="text-[13px] leading-relaxed text-slate-300">
                                  {dive.problem}
                                </p>
                              </div>
                            </div>

                            {/* Solution */}
                            <div className="flex gap-3">
                              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-500/15">
                                <Lightbulb className="h-3 w-3 text-violet-400" />
                              </span>
                              <div className="min-w-0">
                                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-violet-400">
                                  The Solution
                                </span>
                                <p className="text-[13px] leading-relaxed text-slate-300">
                                  {dive.solution}
                                </p>
                              </div>
                            </div>

                            {/* Result */}
                            <div className="flex gap-3">
                              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/15">
                                <TrendingUp className="h-3 w-3 text-emerald-400" />
                              </span>
                              <div className="min-w-0">
                                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                  The Result
                                </span>
                                <p className="text-[13px] leading-relaxed text-slate-300">
                                  {dive.result}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Stack chips */}
                          {dive.stack?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {dive.stack.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-border inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-500">
                      <ExternalLink className="h-4 w-4" /> Demo unavailable
                    </span>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-colors hover:bg-white/10"
                    >
                      <Globe className="h-4 w-4" /> View Code
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-500">
                      <Globe className="h-4 w-4" /> Private repo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
