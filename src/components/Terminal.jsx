import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import projects from "../data";
import { experience, education, certificatesUrl } from "../data";

const EMAIL = "yousef20022008@gmail.com";
const GITHUB = "https://github.com/yousef2002307";
const LINKEDIN = "https://linkedin.com/in/yousef-ahmed-a22961307";

const SECTIONS = {
  home: "home",
  about: "about",
  experience: "experience",
  work: "experience",
  projects: "projects",
  education: "education",
  contact: "contact",
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return true; }
  return false;
};

const openUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

const line = (text, type = "info") => ({ text, type });
const blank = () => ({ text: "", type: "info" });

const SKILLS = [
  "PHP", "Laravel", "Node.js", "React.js", "REST APIs", "WebSockets",
  "Redis", "MySQL", "Docker", "Kubernetes", "GitHub Actions (CI/CD)",
  "Firebase", "Queues / Jobs", "RBAC", "SaaS Architecture",
];

const HELP_TEXT = [
  line("┌─────────────────────────────────────────────────────┐", "title"),
  line("│           YOUSEF.DEV  —  Developer Terminal          │", "title"),
  line("└─────────────────────────────────────────────────────┘", "title"),
  blank(),
  line("Navigation:", "warn"),
  line("  home / about / experience / projects / education / contact", "success"),
  blank(),
  line("Projects:", "warn"),
  line("  projects              — list all projects", "success"),
  line("  project <id|title>    — show project details", "success"),
  line("  open <id|title>       — open project link in browser", "success"),
  blank(),
  line("Info:", "warn"),
  line("  skills    whoami    experience    education", "success"),
  line("  contact   socials   email         certificates", "success"),
  blank(),
  line("System:", "warn"),
  line("  help / ?   clear   exit", "success"),
  blank(),
  line("Tip: Ctrl + `  toggles this terminal anytime.", "raw"),
];

const findProject = (query) => {
  const q = query.toLowerCase().trim();
  return projects.find(
    (p) => String(p.id) === q || p.title.toLowerCase().includes(q)
  );
};

const runCommand = (raw, close) => {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
  const rest = args.join(" ");

  if (SECTIONS[cmd]) {
    const ok = scrollTo(SECTIONS[cmd]);
    return ok
      ? [line("↗ Navigating to #" + SECTIONS[cmd] + "…", "success")]
      : [line(`Section "${cmd}" not found.`, "error")];
  }

  switch (cmd) {
    case "clear": return [{ __clear: true }];
    case "exit":
    case "quit":
      close();
      return [line("Terminal closed. See you! 👋", "success")];
    case "help":
    case "?":
      return HELP_TEXT;

    case "whoami":
      return [
        blank(),
        line("👤  Yousef Ahmed", "title"),
        line("    Backend & Full-Stack Developer", "info"),
        line("    Egypt · Remote-friendly", "info"),
        line("    Email : " + EMAIL, "info"),
        line("    GitHub: " + GITHUB, "info"),
        blank(),
      ];

    case "skills":
      return [
        blank(),
        line("⚙  Tech Stack:", "title"),
        ...SKILLS.map((s) => line("   • " + s, "info")),
        blank(),
      ];

    case "projects":
      return [
        blank(),
        line("📂  Projects:", "title"),
        ...projects.map((p) => line("   [" + p.id + "]  " + p.title, "info")),
        blank(),
        line("Run  project <id|title>  for details.", "raw"),
        blank(),
      ];

    case "project": {
      if (!rest) return [line("Usage: project <id|title>", "error")];
      const p = findProject(rest);
      if (!p) return [line(`Project "${rest}" not found. Run  projects  to list all.`, "error")];
      return [
        blank(),
        line("🚀  " + p.title, "title"),
        line("    Tags   : " + p.tags.join(", "), "info"),
        line("    Live   : " + (p.liveUrl || "—"), "info"),
        line("    GitHub : " + (p.githubUrl || "—"), "info"),
        blank(),
        ...p.description.trim().split("\n").map((l) => line("    " + l.trim(), "raw")),
        blank(),
        line("Run  open " + p.id + "  to open in browser.", "raw"),
        blank(),
      ];
    }

    case "open": {
      if (!rest) return [line("Usage: open <id|title>", "error")];
      const p = findProject(rest);
      if (!p) return [line(`Project "${rest}" not found.`, "error")];
      const url = p.liveUrl || p.githubUrl;
      if (!url) return [line("No URL attached to this project.", "error")];
      openUrl(url);
      return [line(`✔ Opened "${p.title}" in a new tab.`, "success")];
    }

    case "experience":
    case "work":
      return [
        blank(),
        line("💼  Work Experience:", "title"),
        ...experience.flatMap((e) => [
          blank(),
          line("   " + e.role + "  @  " + e.company, "warn"),
          line("   " + e.period + (e.location ? " · " + e.location : ""), "info"),
        ]),
        blank(),
      ];

    case "education":
      return [
        blank(),
        line("🎓  Education:", "title"),
        ...education.flatMap((e) => [
          blank(),
          line("   " + e.degree, "warn"),
          line("   " + e.institution, "info"),
          line("   " + e.period, "info"),
          line("   " + e.details, "raw"),
        ]),
        blank(),
      ];

    case "contact":
      return [
        blank(),
        line("📬  Contact:", "title"),
        line("   Email   : " + EMAIL, "info"),
        line("   GitHub  : " + GITHUB, "info"),
        line("   LinkedIn: " + LINKEDIN, "info"),
        blank(),
        line("Run  email  to copy address to clipboard.", "raw"),
        blank(),
      ];

    case "socials":
      openUrl(GITHUB);
      openUrl(LINKEDIN);
      return [line("✔ Opened GitHub & LinkedIn in new tabs.", "success")];

    case "email":
      try {
        navigator.clipboard.writeText(EMAIL);
        return [line("✔ Copied  " + EMAIL + "  to clipboard.", "success")];
      } catch {
        return [line("Email: " + EMAIL, "info")];
      }

    case "certificates":
    case "certs":
      openUrl(certificatesUrl);
      return [line("✔ Opened certificates drive in new tab.", "success")];

    default:
      return [
        line(`Command not found: "${trimmed}"`, "error"),
        line("Type  help  to see available commands.", "raw"),
      ];
  }
};

const TYPE_CLASS = {
  info:    "text-slate-300",
  success: "text-emerald-400",
  error:   "text-rose-400",
  warn:    "text-amber-400",
  raw:     "text-slate-500",
  title:   "text-violet-300 font-semibold",
};

const AUTOCOMPLETE = [
  "help","clear","exit","home","about","experience","projects",
  "project","education","contact","skills","whoami","socials",
  "email","certificates","open","work","quit",
];

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState(HELP_TEXT);
  const [input,   setInput]   = useState("");
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef  = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const submit = useCallback(() => {
    const raw = input.trim();
    const echo = line("$ " + (input || ""), "raw");
    const output = raw ? runCommand(raw, onClose) : [];

    if (output.length === 1 && output[0].__clear) {
      setHistory([]);
      setInput("");
      setCmdHist((h) => (raw ? [raw, ...h] : h));
      setHistIdx(-1);
      return;
    }

    setHistory((h) => [...h, echo, ...output]);
    setCmdHist((h) => (raw ? [raw, ...h] : h));
    setInput("");
    setHistIdx(-1);
  }, [input, onClose]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, cmdHist.length - 1);
        setInput(cmdHist[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : cmdHist[next] ?? "");
        return next;
      });
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = AUTOCOMPLETE.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-overlay"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              height: "min(560px, 85vh)",
              background: "linear-gradient(135deg, rgba(8,8,18,0.99) 0%, rgba(14,8,28,0.99) 100%)",
              border: "1px solid rgba(139,92,246,0.35)",
              boxShadow: "0 0 80px rgba(139,92,246,0.18), 0 25px 60px rgba(0,0,0,0.75)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div
              className="flex shrink-0 items-center gap-3 border-b px-4 py-3"
              style={{ borderColor: "rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.06)" }}
            >
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="group grid h-3.5 w-3.5 place-items-center rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
                  title="Close"
                >
                  <X className="h-2 w-2 text-rose-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="h-3.5 w-3.5 rounded-full bg-amber-400/60" />
                <span className="h-3.5 w-3.5 rounded-full bg-emerald-400/60" />
              </div>

              <div className="flex flex-1 items-center justify-center gap-2">
                <TerminalIcon className="h-4 w-4 text-violet-400" />
                <span className="font-mono text-xs font-semibold tracking-widest text-violet-300">
                  YOUSEF.DEV — DEVELOPER TERMINAL
                </span>
              </div>

              <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 sm:inline">
                Ctrl + `
              </kbd>
            </div>

            {/* Output */}
            <div
              className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, i) => (
                <div key={i} className={TYPE_CLASS[item.type] ?? "text-slate-300"}>
                  {item.text || "\u00A0"}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              className="flex shrink-0 items-center gap-2 border-t px-4 py-3"
              style={{ borderColor: "rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.04)" }}
            >
              <span className="select-none font-mono text-sm text-violet-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                placeholder="type a command… (help for list)"
                className="flex-1 bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600"
                style={{ caretColor: "#a78bfa" }}
              />
              <button
                onClick={submit}
                className="rounded-lg border border-violet-500/30 bg-violet-600/20 px-3 py-1 font-mono text-xs text-violet-300 transition-colors hover:bg-violet-600/40"
              >
                ENTER
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
