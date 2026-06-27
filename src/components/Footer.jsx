import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
        <p>
          © {year} Yousef Ahmed. Built with React, Tailwind &amp; Framer Motion.
        </p>
        <p className="inline-flex items-center gap-1.5">
          Crafted with <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> &amp; clean code.
        </p>
      </div>
    </footer>
  );
}
