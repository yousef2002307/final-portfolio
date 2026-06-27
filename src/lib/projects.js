/**
 * Centralized pagination helper for the projects section.
 *
 * @param {Array} items  - full list of projects
 * @param {number} page  - current 1-indexed page (clamped to valid range)
 * @param {number} perPage - items per page (the spec asks for exactly 2)
 * @returns {{ current: Array, totalPages: number, start: number, end: number }}
 */
export function paginate(items, page, perPage) {
  const total = Array.isArray(items) ? items.length : 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = (safePage - 1) * perPage;
  const end = start + perPage;
  const current = total ? items.slice(start, end) : [];

  return { current, totalPages, start, end };
}
