import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Zap } from 'lucide-react';
import { fadeUp } from '../lib/motion';

/**
 * A premium project card. Gracefully handles missing fields (image, tags)
 * with elegant placeholders so partial data never breaks the layout.
 *
 * onOpen  → opens the full project detail modal
 * onDive  → opens the "Problems I Solved" deep-dive modal
 */
export default function ProjectCard({ project, onOpen, onDive, index }) {
  const hasImage  = Boolean(project?.imageUrl);
  const tags      = project?.tags?.length ? project.tags : [];
  const hasDives  = Boolean(project?.deepDives?.length);

  return (
    <motion.article
      variants={fadeUp}
      onClick={() => onOpen(project)}
      className="glow-border group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white/5 transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Image / placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {hasImage ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="skeleton h-full w-full" />
        )}

        {/* Gradient scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent" />

        {/* Hover badge */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          View details <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
          {project.title ?? 'Untitled project'}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {project.description?.trim() || 'No description available.'}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="rounded-md px-2 py-0.5 text-[11px] font-medium text-slate-500">
              +{tags.length - 4}
            </span>
          )}
          {tags.length === 0 && (
            <span className="text-[11px] text-slate-600">No tags</span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
          {/* Details link (card click already opens it) */}
          <span className="text-sm font-semibold text-gradient">Details →</span>

          <div className="flex items-center gap-2">
            {/* "Problems I Solved" button — only when deepDives exist */}
            {hasDives && (
              <button
                onClick={(e) => { e.stopPropagation(); onDive?.(project); }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/35 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold text-violet-300 transition-all hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-violet-100"
                style={{ boxShadow: '0 0 12px rgba(139,92,246,0.15)' }}
                aria-label={`Problems I solved in ${project.title}`}
              >
                <Zap className="h-3 w-3 shrink-0" />
                <span>Problems I solved in this project</span>
              </button>
            )}





            {/* GitHub icon */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`${project.title} on GitHub`}
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

