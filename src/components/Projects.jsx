import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FolderGit2 } from 'lucide-react';
import projectsData from '../data';
import { paginate } from '../lib/projects';
import { fadeUp, staggerContainer, inView } from '../lib/motion';
import ProjectCard from './ProjectCard';

const PROJECTS_PER_PAGE = 2; // spec: exactly 2 projects per page

export default function Projects({ onOpen }) {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(0); // +1 next, -1 prev (for slide dir)

  const projects = useMemo(
    () => (Array.isArray(projectsData) ? projectsData : []),
    []
  );

  const { current, totalPages } = paginate(projects, page, PROJECTS_PER_PAGE);

  const go = (next) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6">
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
            Projects
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 flex items-center gap-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            <FolderGit2 className="h-7 w-7 text-violet-400" />
            Selected work
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-slate-400"
          >
            A curated slice of the systems I&apos;ve built — from multi-tenant
            SaaS to real-time logistics. Click any card for the full breakdown.
          </motion.p>
        </motion.div>

        {/* Sliding, fading page of project cards */}
        <div className="relative mt-10 min-h-[26rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {current.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={onOpen}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination controls */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-slate-400">
            Page{' '}
            <span className="font-semibold text-white">{page}</span> of{' '}
            <span className="font-semibold text-white">{totalPages}</span> ·{' '}
            {projects.length} projects
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(Math.max(1, page - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            {/* Dotted page indicators */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i + 1)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    page === i + 1
                      ? 'w-6 bg-gradient-to-r from-violet-400 to-cyan-300'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
