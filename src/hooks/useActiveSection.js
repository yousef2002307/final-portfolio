import { useEffect, useState } from 'react';

/**
 * Scroll-spy hook. Watches a list of section ids and returns the id of the
 * section currently closest to the top of the viewport. Drives the sticky
 * navbar's active-link highlight.
 *
 * @param {string[]} sectionIds - ordered ids to observe (e.g. ['home','about'])
 * @param {object} [options]
 * @param {string} [options.rootMargin='-45% 0px -50% 0px'] - shrinks the
 *   intersection box so a section is "active" near the middle of the screen.
 * @returns {string} the active section id (or '' before mount)
 */
export default function useActiveSection(sectionIds, options = {}) {
  const [active, setActive] = useState(sectionIds?.[0] ?? '');

  useEffect(() => {
    if (!sectionIds?.length) return;

    const { rootMargin = '-45% 0px -50% 0px' } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds?.join(',')]);

  return active;
}
