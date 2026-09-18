import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { fadeUp } from "../lib/motion";

const GITHUB_USERNAME = "yousef2002307";

const LEVEL_COLOR = {
  0: "#1a1a2e",
  1: "#1a4731",
  2: "#1e6b3e",
  3: "#25a244",
  4: "#39d353",
};

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS  = ["Mon","","Wed","","Fri","",""];

function buildGrid(contributions) {
  if (!contributions || contributions.length === 0) return [];
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const first    = new Date(sorted[0].date);
  const dayOfWeek = (first.getDay() + 6) % 7;
  const padded = Array(dayOfWeek).fill(null).concat(sorted);
  const cols = [];
  for (let i = 0; i < padded.length; i += 7) {
    cols.push(padded.slice(i, i + 7));
  }
  return cols;
}

function buildMonthLabels(grid) {
  const labels = [];
  let lastMonth = -1;
  grid.forEach((col, ci) => {
    const first = col.find(Boolean);
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) {
      labels.push({ label: MONTH_NAMES[m], col: ci });
      lastMonth = m;
    }
  });
  return labels;
}

function SkeletonGrid() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-[3px]">
        {Array.from({ length: 53 }).map((_, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, ri) => (
              <div key={ri} className="h-[10px] w-[10px] rounded-sm" style={{ background: "#1a1a2e" }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GithubStats() {
  const [contributions, setContributions] = useState([]);
  const [total, setTotal]                 = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => {
        setContributions(data.contributions || []);
        setTotal(data.total?.lastYear ?? data.total ?? null);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const grid        = buildGrid(contributions);
  const monthLabels = buildMonthLabels(grid);

  return (
    <motion.div
      variants={fadeUp}
      className="relative mt-10 overflow-hidden rounded-3xl p-6 sm:p-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(139,92,246,0.22)",
        boxShadow: "0 0 48px rgba(139,92,246,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-emerald-600/10 blur-[90px]" />

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
            <FaGithub className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-mono text-sm font-bold tracking-wider text-white sm:text-base">
                CONTRIBUTION GRAPH
              </h4>
              <span className="font-mono text-xs text-violet-400">@{GITHUB_USERNAME}</span>
            </div>
            <p className="font-mono text-xs text-slate-400">
              {total !== null
                ? `${total.toLocaleString()} contributions in the last year`
                : "GitHub activity calendar"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {loading ? "LOADING\u2026" : error ? "OFFLINE" : "LIVE \u2022 GITHUB API"}
        </div>
      </div>

      {/* Graph */}
      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <p className="py-8 text-center font-mono text-sm text-slate-500">
          Unable to load contribution data right now.
        </p>
      ) : (
        <div className="w-full overflow-x-auto pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}>
          <div style={{ minWidth: 660 }}>

            {/* Month labels */}
            <div className="relative mb-1 flex" style={{ paddingLeft: 28 }}>
              {monthLabels.map(({ label, col }) => (
                <div
                  key={label + col}
                  className="absolute font-mono text-[10px] text-slate-400"
                  style={{ left: 28 + col * 13, top: 0 }}
                >
                  {label}
                </div>
              ))}
              <div className="h-4 w-full" />
            </div>

            {/* Day labels + cells */}
            <div className="flex gap-0">
              <div className="mr-1 flex flex-col gap-[3px]" style={{ width: 24 }}>
                {DAY_LABELS.map((lbl, i) => (
                  <div key={i} className="font-mono text-[9px] text-slate-500" style={{ height: 10, lineHeight: "10px" }}>
                    {lbl}
                  </div>
                ))}
              </div>

              <div className="flex gap-[3px]">
                {grid.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-[3px]">
                    {col.map((cell, ri) =>
                      cell === null ? (
                        <div key={ri} style={{ width: 10, height: 10 }} />
                      ) : (
                        <div
                          key={ri}
                          title={`${cell.date}: ${cell.count} contribution${cell.count !== 1 ? "s" : ""}`}
                          className="rounded-sm transition-transform hover:scale-125 cursor-default"
                          style={{
                            width: 10,
                            height: 10,
                            background: LEVEL_COLOR[cell.level] ?? LEVEL_COLOR[0],
                            outline: cell.level > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                          }}
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer: profile link + legend */}
            <div className="mt-4 flex items-center justify-between">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-violet-300 transition-colors hover:text-violet-100 hover:underline"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    className="rounded-sm"
                    style={{
                      width: 10,
                      height: 10,
                      background: LEVEL_COLOR[lvl],
                      outline: lvl > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </motion.div>
  );
}
