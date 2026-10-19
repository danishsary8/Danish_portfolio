import React, { useEffect, useState, useCallback } from "react";
import {
  FileText,
  Mail,
  Copy,
  Check,
  Github,
  ExternalLink,
  ArrowUpRight,
  Sun,
  Moon,
  Layers,
  Server,
  Briefcase,
  Terminal,
  Award,
  Database,
  Languages,
  Activity,
  FileCode,
  Zap,
  Compass,
  ShieldCheck,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { CV_HREF, getCvLinkProps } from "@/components/portfolio/cv-link";

interface CommandLedgerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMAIL_ADDRESS = "danishsary4@gmail.com";
const GITHUB_URL = "https://github.com/danishsary8";

export function CommandLedger({ open: controlledOpen, onOpenChange }: CommandLedgerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("12:00:00");
  const [isDark, setIsDark] = useState<boolean>(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(nextOpen);
      } else {
        setInternalOpen(nextOpen);
      }
    },
    [isControlled, onOpenChange],
  );

  // Initialize and synchronize theme state
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Phnom Penh Telemetry Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Phnom_Penh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setCurrentTime(timeStr);
      } catch {
        setCurrentTime("12:00:00");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K & Custom Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    const handleCustomOpen = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("portfolio:open-command-ledger", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("portfolio:open-command-ledger", handleCustomOpen);
    };
  }, [isOpen, setOpen]);

  const handleAction = (action: () => void) => {
    action();
    setOpen(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDark(nextDark);
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cvProps = getCvLinkProps(CV_HREF);

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command, project, or section anchor..." />
      <CommandList>
        <CommandEmpty>No matching commands found in telemetry index.</CommandEmpty>

        {/* Group 1: Quick Dispatch & Resume Actions */}
        <CommandGroup heading="Direct Dispatch & Credentials">
          <CommandItem
            onSelect={() =>
              handleAction(() => {
                if (cvProps.href) {
                  window.open(cvProps.href, "_blank", "noopener,noreferrer");
                }
              })
            }
          >
            <FileText className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">Download Curriculum Vitae (PDF)</span>
              <span className="font-mono text-[10px] text-mutedText">
                Canonical verified credentials & experience
              </span>
            </div>
            <CommandShortcut>CV</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={handleCopyEmail}>
            {emailCopied ? (
              <Check className="h-4 w-4 text-gold" aria-hidden="true" />
            ) : (
              <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
            )}
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                {emailCopied ? "Copied danishsary4@gmail.com!" : "Copy Developer Dispatch Email"}
              </span>
              <span className="font-mono text-[10px] text-mutedText">{EMAIL_ADDRESS}</span>
            </div>
            <CommandShortcut>{emailCopied ? "COPIED" : "EMAIL"}</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              })
            }
          >
            <Terminal className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Recruiter Technical Briefing &amp; Role-Match Dispatch
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Generate tailored candidate dossier &amp; stack match
              </span>
            </div>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
              })
            }
          >
            <Github className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">GitHub Developer Profile</span>
              <span className="font-mono text-[10px] text-mutedText">
                @danishsary8 — Repositories & open source
              </span>
            </div>
            <CommandShortcut>GH</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Group 2: Live Production Deployments & API Docs */}
        <CommandGroup heading="Production Applications & API Docs">
          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.open(
                  "https://bookly-frontend-five.vercel.app/",
                  "_blank",
                  "noopener,noreferrer",
                );
              })
            }
          >
            <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">Launch Bookly — Online Bookstore</span>
              <span className="font-mono text-[10px] text-mutedText">
                Full-Stack Bookstore (Laravel, React, PostgreSQL)
              </span>
            </div>
            <CommandShortcut>APP</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.open(
                  "https://bookly-api-zasc.onrender.com/docs",
                  "_blank",
                  "noopener,noreferrer",
                );
              })
            }
          >
            <ExternalLink className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Inspect Bookly — REST API Documentation
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Render Swagger API & JWT specifications
              </span>
            </div>
            <CommandShortcut>DOCS</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.open(
                  "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
                  "_blank",
                  "noopener,noreferrer",
                );
              })
            }
          >
            <Award className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">Launch Diabetes Expert System</span>
              <span className="font-mono text-[10px] text-mutedText">
                Clinical Decision Prototype (Norton Award Winner 2026)
              </span>
            </div>
            <CommandShortcut>AI</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.open("https://daycraft-vnid.onrender.com/", "_blank", "noopener,noreferrer");
              })
            }
          >
            <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">Launch Loomora Habit Planner</span>
              <span className="font-mono text-[10px] text-mutedText">
                Full-stack routine & habit tracking web app
              </span>
            </div>
            <CommandShortcut>APP</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.open(
                  "https://drivingruletest.netlify.app/",
                  "_blank",
                  "noopener,noreferrer",
                );
              })
            }
          >
            <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Launch Cambodian Driving Rules App
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Interactive theory test app (Flutter Web)
              </span>
            </div>
            <CommandShortcut>FLUTTER</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Group 3: Architecture Navigation */}
        <CommandGroup heading="Architecture Navigation">
          <CommandItem onSelect={() => handleAction(() => handleScrollTo("top"))}>
            <Layers className="h-4 w-4 text-mutedText" aria-hidden="true" />
            <span>Overview &amp; Editorial Hero</span>
            <CommandShortcut>G T</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(new CustomEvent("portfolio:open-topology-modal"));
              })
            }
          >
            <Database className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Inspect Full-Stack Relational ERD &amp; System Topology
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Interactive PostgreSQL ERD, JWT pipeline &amp; clinical heuristics
              </span>
            </div>
            <CommandShortcut>G S</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(
                  new CustomEvent("portfolio:open-adr-modal", { detail: { adrId: "adr-001" } }),
                );
              })
            }
          >
            <FileCode className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Architecture Decision Records (ADR) &amp; Codebase Tree
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                ADR-001 to ADR-004: Engineering trade-offs &amp; file structures
              </span>
            </div>
            <CommandShortcut>G A</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(
                  new CustomEvent("portfolio:open-query-plan-modal", {
                    detail: { benchmarkId: "bookly" },
                  }),
                );
              })
            }
          >
            <Zap className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                PostgreSQL Query Execution Plans (`EXPLAIN ANALYZE`) &amp; N+1 Benchmarks
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Indexed scans vs. sequential scans &amp; Eloquent eager loading
              </span>
            </div>
            <CommandShortcut>G Q</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(new CustomEvent("portfolio:toggle-blueprint-xray"));
              })
            }
          >
            <Compass className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Toggle Architectural Blueprint &amp; Grid X-Ray Mode
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Expose 12-column Swiss structural grid, CAD telemetry &amp; node box dimensions
              </span>
            </div>
            <CommandShortcut>G B</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                const el = document.getElementById("code-craft-matrix");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              })
            }
          >
            <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Inspect Code-Craft &amp; Security Hardening Matrix
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Side-by-side: Junior anti-patterns vs. Sary Danish's production standards
              </span>
            </div>
            <CommandShortcut>G X</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(
                  new CustomEvent("portfolio:open-deployment-modal", {
                    detail: { profileId: "bookly" },
                  }),
                );
              })
            }
          >
            <Layers className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Inspect CI/CD &amp; Cloud Deployment Topology
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Multi-cloud pipeline: Vercel edge, Render container API &amp; PostgreSQL pooling
              </span>
            </div>
            <CommandShortcut>G I</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(new CustomEvent("portfolio:open-perf-modal"));
              })
            }
          >
            <Zap className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Lighthouse 100/100 &amp; Core Web Vitals Benchmark Suite
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                4-Pillar 100 scores, sub-second LCP, zero CLS &amp; WCAG AAA auditor
              </span>
            </div>
            <CommandShortcut>G P</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                const el = document.getElementById("role-alignment-engine");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              })
            }
          >
            <Award className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Role-Requirement &amp; Stack Alignment Matcher
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Filter verified production code evidence against your job description
              </span>
            </div>
            <CommandShortcut>G R</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={() => handleAction(() => handleScrollTo("capabilities"))}>
            <Server className="h-4 w-4 text-mutedText" aria-hidden="true" />
            <span>System Capabilities &amp; Architecture Matrix</span>
            <CommandShortcut>G C</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={() => handleAction(() => handleScrollTo("projects"))}>
            <Terminal className="h-4 w-4 text-mutedText" aria-hidden="true" />
            <span>Selected Engineering Works &amp; Schema Inspector</span>
            <CommandShortcut>G W</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={() => handleAction(() => handleScrollTo("experience"))}>
            <Briefcase className="h-4 w-4 text-mutedText" aria-hidden="true" />
            <span>Experience, Norton University &amp; Awards</span>
            <CommandShortcut>G E</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={() => handleAction(() => handleScrollTo("contact"))}>
            <Mail className="h-4 w-4 text-mutedText" aria-hidden="true" />
            <span>Direct Terminal Dispatch &amp; Contact</span>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Group 4: Workspace Environment Controls */}
        <CommandGroup heading="Environment Preferences">
          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(new CustomEvent("portfolio:toggle-locale"));
              })
            }
          >
            <Languages className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Switch Language (English / ភាសាខ្មែរ)
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Toggle bilingual editorial localization
              </span>
            </div>
            <CommandShortcut>G L</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleAction(() => {
                window.dispatchEvent(new CustomEvent("portfolio:toggle-diagnostics"));
              })
            }
          >
            <Activity className="h-4 w-4 text-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">Toggle Runtime Diagnostics Bar</span>
              <span className="font-mono text-[10px] text-mutedText">
                Live DOM nodes, Emil Kowalski physics, A11y checks
              </span>
            </div>
            <CommandShortcut>G M</CommandShortcut>
          </CommandItem>

          <CommandItem onSelect={handleToggleTheme}>
            {isDark ? (
              <Sun className="h-4 w-4 text-gold" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-gold" aria-hidden="true" />
            )}
            <div className="flex flex-col">
              <span className="font-medium text-primaryText">
                Switch to {isDark ? "Editorial Parchment (Light)" : "Technical Obsidian (Dark)"}
              </span>
              <span className="font-mono text-[10px] text-mutedText">
                Toggle theme state without reload
              </span>
            </div>
            <CommandShortcut>THEME</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      {/* Terminal Telemetry & Navigation Hints Footer */}
      <div className="flex items-center justify-between border-t border-borderSubtle bg-surface px-4 py-2.5 font-mono text-[11px] text-mutedText">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span>PHNOM PENH, KH [ICT UTC+7] {currentTime}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px]">
          <span>
            <kbd className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5">↑↓</kbd>{" "}
            NAVIGATE
          </span>
          <span>
            <kbd className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5">↵</kbd>{" "}
            EXECUTE
          </span>
          <span>
            <kbd className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5">ESC</kbd>{" "}
            CLOSE
          </span>
        </div>
      </div>
    </CommandDialog>
  );
}

export default CommandLedger;
