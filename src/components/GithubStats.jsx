import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FolderGit2, Activity, GitBranch, ExternalLink, Sparkles } from "lucide-react";
import { fadeUp } from "../lib/motion";

const GITHUB_USERNAME = "yousef2002307";
const CACHE_KEY = "github_live_stats_v1";

const DEFAULT_DATA = {
  public_repos: 156,
  followers: 4,
  following: 1,
  created_at: "2021-06-10T15:34:50Z",
  recent_repos: [
    { name: "final-portfolio", lang: "JavaScript" },
    { name: "HelpDeskTask", lang: "PHP" },
    { name: "blog-app-using-node.js", lang: "TypeScript" },
    { name: "laravel-api-responder", lang: "PHP" },
  ],
};

export default function GithubStats() {
  const [stats, setStats] = useState(DEFAULT_DATA);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Check session cache first to prevent rate limiting
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setStats(JSON.parse(cached));
        setIsLive(true);
        return;
      }
    } catch (_) {}

    // Fetch live user stats & top recent repos
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=6&sort=updated`
      ).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([userData, reposData]) => {
        if (!userData) return;
        const recentRepos = Array.isArray(reposData)
          ? reposData
              .filter((r) => !r.fork && r.name !== GITHUB_USERNAME)
              .slice(0, 4)
              .map((r) => ({ name: r.name, lang: r.language || "Web" }))
          : DEFAULT_DATA.recent_repos;

        const liveStats = {
          public_repos: userData.public_repos ?? DEFAULT_DATA.public_repos,
          followers: userData.followers ?? DEFAULT_DATA.followers,
          following: userData.following ?? DEFAULT_DATA.following,
          created_at: userData.created_at || DEFAULT_DATA.created_at,
          recent_repos: recentRepos.length ? recentRepos : DEFAULT_DATA.recent_repos,
        };

        setStats(liveStats);
        setIsLive(true);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(liveStats));
        } catch (_) {}
      })
      .catch(() => {
        // Graceful fallback to default data
        setIsLive(false);
      });
  }, []);

  const yearsCoding = Math.max(
    3,
    new Date().getFullYear() - new Date(stats.created_at).getFullYear()
  );

  return (
    <motion.div
      variants={fadeUp}
      className="glow-border relative mt-10 overflow-hidden rounded-3xl bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
      style={{
        border: "1px solid rgba(139,92,246,0.25)",
        boxShadow: "0 0 40px rgba(139,92,246,0.08)",
      }}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-600/15 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-600/15 blur-[80px]" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white shadow-inner">
            <FaGithub className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-mono text-sm font-bold tracking-wider text-white sm:text-base">
                GITHUB SYSTEM TELEMETRY
              </h4>
              <span className="font-mono text-xs text-violet-400">@{GITHUB_USERNAME}</span>
            </div>
            <p className="font-mono text-xs text-slate-400">
              Live GitHub API status & public codebase metrics
            </p>
          </div>
        </div>

        {/* Live Pulse Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {isLive ? "LIVE • CONNECTED" : "CACHE • ACTIVE"}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-violet-400/40">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
            <FolderGit2 className="h-3.5 w-3.5 text-violet-400" />
            <span>Public Repos</span>
          </div>
          <div className="mt-2 font-display text-2xl font-extrabold text-gradient sm:text-3xl">
            {stats.public_repos}
          </div>
          <div className="mt-1 font-mono text-[10px] text-emerald-400">100% Open & Active</div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-cyan-400/40">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span>Coding Span</span>
          </div>
          <div className="mt-2 font-display text-2xl font-extrabold text-gradient sm:text-3xl">
            {yearsCoding}+ Yrs
          </div>
          <div className="mt-1 font-mono text-[10px] text-slate-400">Since 2021</div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-emerald-400/40">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
            <GitBranch className="h-3.5 w-3.5 text-emerald-400" />
            <span>Followers</span>
          </div>
          <div className="mt-2 font-display text-2xl font-extrabold text-gradient sm:text-3xl">
            {stats.followers}
          </div>
          <div className="mt-1 font-mono text-[10px] text-slate-400">Dev Community</div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-pink-400/40">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            <span>Primary Focus</span>
          </div>
          <div className="mt-2 font-display text-lg font-bold text-white sm:text-xl">
            PHP / Laravel
          </div>
          <div className="mt-1 font-mono text-[10px] text-violet-300">& Full Stack Node/React</div>
        </div>
      </div>

      {/* Recent Public Work & Profile Link */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/30 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-slate-400">Active Repos:</span>
          {stats.recent_repos.map((r) => (
            <a
              key={r.name}
              href={`https://github.com/${GITHUB_USERNAME}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-violet-400/50 hover:text-white"
            >
              <span>{r.name}</span>
              <span className="text-[10px] text-violet-400">({r.lang})</span>
            </a>
          ))}
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-violet-300 transition-colors hover:text-violet-100 hover:underline"
        >
          <span>View GitHub Profile</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
}
