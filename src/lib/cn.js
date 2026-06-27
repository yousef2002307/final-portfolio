import clsx from 'clsx';

/** Tiny className combiner (clsx passthrough). */
export default function cn(...args) {
  return clsx(args);
}
