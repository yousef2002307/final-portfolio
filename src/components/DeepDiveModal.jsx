import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, AlertTriangle, Lightbulb, TrendingUp, ChevronRight } from "lucide-react";

/**
 * Standalone "Problems I Solved" modal.
 * Renders the deepDives array from a project as rich Problem / Solution / Result cards.
 * Closes on backdrop click, X button, or Escape key.
 */
export default function DeepDiveModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  const dives = project?.deepDives ?? [];

  return (
    <AnimatePresence>
      {project && dives.length > 0 && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — problems I solved`}
        >
          {/* Backdrop */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: "rgba(4,3,12,0.82)" }}
          />

          {/* Panel */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 48, scale: 0.96 },
              visible: {
                opacity: 1, y: 0, scale: 1,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border shadow-2xl sm:rounded-3xl"
            style={{
              background: "linear-gradient(145deg, rgba(10,8,24,0.99) 0%, rgba(16,8,32,0.99) 100%)",
              border: "1px solid rgba(139,92,246,0.28)",
              boxShadow: "0 0 80px rgba(139,92,246,0.14), 0 30px 60px rgba(0,0,0,0.8)",
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex shrink-0 items-center justify-between gap-4 border-b px-6 py-5"
              style={{ borderColor: "rgba(139,92,246,0.18)", background: "rgba(139,92,246,0.06)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-500/15">
                  <Zap className="h-4.5 w-4.5 text-violet-400" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-base font-bold text-white sm:text-lg leading-tight">
                    Problems I Solved
                  </h2>
                  <p className="truncate text-xs text-slate-400">{project.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Dive count badge */}
                <span className="hidden rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 font-mono text-xs font-semibold text-violet-300 sm:inline">
                  {dives.length} deep dive{dives.length !== 1 ? "s" : ""}
                </span>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Scrollable cards ── */}
            <div
              className="flex-1 overflow-y-auto p-5 sm:p-6"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}
            >
              <div className="space-y-5">
                {dives.map((dive, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-2xl border p-5 transition-all sm:p-6"
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.025)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    {/* Ambient glow */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-600/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Card title */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 mt-0.5">
                        <span className="font-mono text-[11px] font-bold text-violet-300">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display text-[15px] font-bold leading-snug text-white sm:text-base">
                        {dive.title}
                      </h3>
                    </div>

                    {/* Problem / Solution / Result */}
                    <div className="mt-5 space-y-4">

                      {/* Problem */}
                      <div className="rounded-xl border border-rose-500/15 bg-rose-500/[0.06] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="grid h-5 w-5 place-items-center rounded-md bg-rose-500/20">
                            <AlertTriangle className="h-3 w-3 text-rose-400" />
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-400">
                            The Problem
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-300">{dive.problem}</p>
                      </div>

                      {/* Arrow connector */}
                      <div className="flex justify-center">
                        <ChevronRight className="h-4 w-4 rotate-90 text-slate-600" />
                      </div>

                      {/* Solution */}
                      <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.06] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="grid h-5 w-5 place-items-center rounded-md bg-violet-500/20">
                            <Lightbulb className="h-3 w-3 text-violet-400" />
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-violet-400">
                            The Solution
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-300">{dive.solution}</p>
                      </div>

                      {/* Arrow connector */}
                      <div className="flex justify-center">
                        <ChevronRight className="h-4 w-4 rotate-90 text-slate-600" />
                      </div>

                      {/* Result */}
                      <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="grid h-5 w-5 place-items-center rounded-md bg-emerald-500/20">
                            <TrendingUp className="h-3 w-3 text-emerald-400" />
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            The Result
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-300">{dive.result}</p>
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
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
