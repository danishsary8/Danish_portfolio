import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles, User, Bot, ArrowRight, FileText, Mail, Github, ExternalLink } from "lucide-react";
import { PROFILE, PROJECTS, SKILL_GROUPS } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";

export interface ChatLink {
  label: string;
  href?: string;
  action?: () => void;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  links?: ChatLink[];
}

export type BotState = "idle" | "listening" | "greeting" | "ready";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi there! I'm Danish's AI assistant. Ask me anything about his projects, tech stack, experience, or how to get in touch!",
      time: "Just now",
      links: [
        { label: "View Projects", action: () => scrollToSection("projects") },
        { label: "Check Skills", action: () => scrollToSection("skills") },
        { label: "Contact Danish", action: () => scrollToSection("contact") },
      ],
    },
  ]);

  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll messages to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle Escape key and click outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        cardRef.current &&
        !cardRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = (userText?: string) => {
    const textToSend = (userText ?? input).trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // Context-aware AI responses based on Danish's verified background
    setTimeout(() => {
      setIsThinking(false);
      const q = textToSend.toLowerCase();
      let botResponse = "";
      let links: Message["links"] = undefined;

      if (q.includes("bookly")) {
        const p = PROJECTS.find((x) => x.id === "bookly");
        botResponse = `Bookly is an online bookstore platform Danish engineered with Laravel, React, and PostgreSQL. It features OTP & Google authentication, order tracking, admin dashboard, Telegram bot alerts, and Cloudinary media.`;
        links = [
          ...(p?.liveUrl ? [{ label: "Bookly Live App", href: p.liveUrl }] : []),
          ...(p?.apiDocsUrl ? [{ label: "REST API Docs", href: p.apiDocsUrl }] : []),
        ];
      } else if (q.includes("loomora")) {
        const p = PROJECTS.find((x) => x.id === "loomora");
        botResponse = `Loomora is a daily routine & habit planner built with React, Tailwind CSS, Framer Motion, and Laravel with PostgreSQL. Features secure authentication, habit streaks, and reminders.`;
        links = p?.liveUrl ? [{ label: "Loomora Live App", href: p.liveUrl }] : [];
      } else if (q.includes("diabetes") || q.includes("expert") || q.includes("award")) {
        const p = PROJECTS.find((x) => x.id === "diabetes");
        botResponse = `The Diabetes Expert System is a bilingual (EN/Khmer) clinical decision assistant built with Flask, React, and PostgreSQL. It won the AI Expert System and Innovation 2026 Team Award at Norton University! Danish contributed Google OAuth, UI refactors, and testing.`;
        links = p?.liveUrl ? [{ label: "Clinical System Live App", href: p.liveUrl }] : [];
      } else if (q.includes("driving") || q.includes("flutter")) {
        const p = PROJECTS.find((x) => x.id === "driving");
        botResponse = `Driving Rules App is an offline bilingual (Khmer/English) learning app for Cambodia's official driving exam, built with Flutter and Dart with local storage and mock tests.`;
        links = p?.liveUrl ? [{ label: "Driving App Web Demo", href: p.liveUrl }] : [];
      } else if (q.includes("project")) {
        botResponse =
          "Danish has built 4 key production applications:\n\n" +
          "1. 📚 Bookly — E-commerce bookstore (Laravel + React + PostgreSQL)\n" +
          "2. 🗓️ Loomora — Routine & habit tracker (React + Laravel)\n" +
          "3. 🏥 Diabetes Expert System — Award-winning clinical screening AI (Flask + React)\n" +
          "4. 🚗 Driving Rules App — Bilingual Cambodia driving theory app (Flutter)";
        links = [
          { label: "Explore Projects Section", action: () => scrollToSection("projects") },
          { label: "View Bookly Live", href: "https://bookly-frontend-five.vercel.app/" },
        ];
      } else if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("react") || q.includes("laravel")) {
        botResponse =
          "Danish's core stack covers full-stack web development:\n\n" +
          "• Frontend: React, TypeScript, Tailwind CSS, Framer Motion\n" +
          "• Backend: Laravel, PHP, Python/Flask, RESTful APIs\n" +
          "• Database: PostgreSQL, Supabase, SQLite, Oracle\n" +
          "• Workflow: Git/GitHub, Docker, JWT & OAuth, Postman";
        links = [{ label: "View Complete Skills Grid", action: () => scrollToSection("skills") }];
      } else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("telegram")) {
        botResponse =
          `You can reach Danish directly via email at ${PROFILE.email} or Telegram at ${PROFILE.telegram}. He is based in Phnom Penh (UTC+7) and actively available for full-time opportunities!`;
        links = [
          { label: "Open Contact Form", action: () => scrollToSection("contact") },
          { label: "Send Email", href: `mailto:${PROFILE.email}` },
        ];
      } else if (q.includes("cv") || q.includes("resume") || q.includes("download")) {
        botResponse = "Danish's complete CV details his education at Norton University, internship at ETEC, and full-stack projects.";
        links = [{ label: "📄 Download CV (PDF)", href: CV_HREF }];
      } else if (q.includes("experience") || q.includes("intern") || q.includes("job") || q.includes("work")) {
        botResponse =
          "Danish is currently a Web Developer Trainee Intern at ETEC & KruITSolution (July 2026 – Present), collaborating on a team tour booking platform with REST API integrations and Git feature branches.";
        links = [{ label: "View Experience Ledger", action: () => scrollToSection("experience") }];
      } else if (q.includes("education") || q.includes("university") || q.includes("norton")) {
        botResponse =
          "Danish is a 4th-Year Software Development student at Norton University in Phnom Penh, Cambodia (2024 – Present), and graduated from the ACE General English Program.";
        links = [{ label: "View Education Details", action: () => scrollToSection("education") }];
      } else {
        botResponse =
          "I'm here to help you explore Danish's portfolio! Feel free to ask about his 4 core projects, technical skills in React & Laravel, work experience, or how to get in touch.";
        links = [
          { label: "Top Projects", action: () => scrollToSection("projects") },
          { label: "Tech Stack", action: () => scrollToSection("skills") },
          { label: "Contact Danish", action: () => scrollToSection("contact") },
        ];
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        ...(links && links.length > 0 ? { links } : {}),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  // Determine current active visual state
  const currentBotState: BotState = isThinking
    ? "listening"
    : isOpen
      ? "ready"
      : isHovered
        ? "greeting"
        : "idle";

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none select-none">
      {/* Chat Window / Dialog Modal */}
      {isOpen && (
        <div
          ref={cardRef}
          role="dialog"
          aria-labelledby="chatbot-title"
          className="pointer-events-auto mb-2.5 w-[min(380px,calc(100vw-1.5rem))] h-[min(520px,calc(100dvh-6.5rem))] rounded-2xl flex flex-col overflow-hidden bg-surface-2 border border-line-strong shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18),0_10px_20px_-5px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),0_8px_24px_-4px_rgba(0,0,0,0.6)] ring-1 ring-black/[0.04] dark:ring-white/[0.06] origin-bottom-right animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface-1">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-surface-2 border border-line-strong shadow-2xs overflow-visible">
                <BotCharacterSVG state={isThinking ? "listening" : "idle"} className="h-10 w-10" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
              </div>
              <div>
                <h3 id="chatbot-title" className="text-[13.5px] font-semibold text-fg leading-tight flex items-center gap-1.5">
                  Danish AI Assistant
                  <span className="rounded bg-gold/15 px-1 py-0.2 text-[9.5px] font-mono font-medium text-gold-ink dark:text-gold">
                    AI
                  </span>
                </h3>
                <p className="text-[11px] text-fg-subtle flex items-center gap-1.5 font-mono mt-0.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isThinking ? "Thinking..." : "Online • Phnom Penh (ICT)"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="press flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-line bg-surface-2 text-fg-muted hover:text-fg hover:border-line-strong transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="border-b border-line bg-surface-1/60 px-3.5 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[12px]">
            <button
              type="button"
              onClick={() => handleSend("Tell me about your projects")}
              className="press whitespace-nowrap rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-fg-muted hover:border-gold hover:text-fg hover:bg-surface-1 transition-all cursor-pointer shadow-2xs"
            >
              📚 Projects
            </button>
            <button
              type="button"
              onClick={() => handleSend("What is your tech stack?")}
              className="press whitespace-nowrap rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-fg-muted hover:border-gold hover:text-fg hover:bg-surface-1 transition-all cursor-pointer shadow-2xs"
            >
              ⚡ Tech Stack
            </button>
            <button
              type="button"
              onClick={() => handleSend("How can I hire or contact you?")}
              className="press whitespace-nowrap rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-fg-muted hover:border-gold hover:text-fg hover:bg-surface-1 transition-all cursor-pointer shadow-2xs"
            >
              ✉️ Contact
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[13px] leading-relaxed bg-surface-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-1 border border-line shadow-2xs">
                    <Bot className="h-3.5 w-3.5 text-gold-ink dark:text-gold" />
                  </div>
                )}
                <div
                  className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 ${
                    m.sender === "user"
                      ? "bg-fg text-bg rounded-tr-xs font-medium shadow-xs"
                      : "bg-surface-1 text-fg rounded-tl-xs border border-line shadow-2xs whitespace-pre-line"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.links && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1.5 border-t border-line/60">
                      {m.links.map((link, idx) =>
                        link.href ? (
                          <a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="press inline-flex items-center gap-1 rounded-md border border-line-strong bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-fg hover:border-gold hover:text-gold-ink dark:hover:text-gold transition-colors shadow-2xs"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="h-3 w-3 opacity-60" />
                          </a>
                        ) : (
                          <button
                            key={idx}
                            type="button"
                            onClick={link.action}
                            className="press inline-flex items-center gap-1 rounded-md border border-line-strong bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-fg hover:border-gold hover:text-gold-ink dark:hover:text-gold transition-colors cursor-pointer shadow-2xs"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="h-3 w-3 opacity-60" />
                          </button>
                        )
                      )}
                    </div>
                  )}
                  <span
                    className={`block mt-1 text-[10px] font-mono ${
                      m.sender === "user" ? "text-bg/60 text-right" : "text-fg-subtle text-left"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex gap-2.5 justify-start">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-1 border border-line shadow-2xs">
                  <Bot className="h-3.5 w-3.5 text-gold-ink dark:text-gold" />
                </div>
                <div className="rounded-2xl rounded-tl-xs bg-surface-1 border border-line px-4 py-2.5 text-fg-muted flex items-center gap-1.5 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-ink dark:bg-gold animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-ink dark:bg-gold animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-ink dark:bg-gold animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-line p-2.5 sm:p-3 bg-surface-1 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Danish's work..."
              className="flex-1 rounded-xl border border-line-strong bg-surface-2 px-3.5 py-2 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fg text-bg disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating 3D AI Robot Widget Trigger */}
      <div className="relative flex flex-col items-end pointer-events-auto">
        {/* Hover Speech Bubble / Greeting Badge (Active State) */}
        <div
          className={`pointer-events-none mb-1.5 mr-1 flex items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 px-3 py-1 shadow-md transition-all duration-300 ${
            isHovered && !isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1.5 scale-95"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[12px] font-semibold text-fg">Ask Danish AI</span>
          <span className="text-[13px]">✨</span>
        </div>

        {/* Main Floating Trigger Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-expanded={isOpen}
          aria-label="Toggle Danish AI Assistant"
          className="group relative flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center p-0 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
        >
          {/* Ambient Cyber Aura Glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/25 via-blue-500/20 to-purple-500/25 opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl animate-pulse [animation-duration:3.2s]"
          />

          {/* Floating / Bobbing Animated Bot Character */}
          <div className="relative flex h-full w-full items-center justify-center motion-safe:animate-[bot-float-bob_2.8s_ease-in-out_infinite]">
            <BotCharacterSVG state={currentBotState} className="h-full w-full drop-shadow-[0_8px_16px_rgba(34,211,238,0.22)]" />
          </div>

          {/* Live Online Signal Beacon */}
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.5s]" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
          </span>
        </button>

        {/* Dynamic Breathing Ground Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none -mt-2 h-2.5 w-11 rounded-[100%] bg-black/25 dark:bg-black/50 blur-[2px] motion-safe:animate-[bot-shadow-breathe_2.8s_ease-in-out_infinite]"
        />
      </div>
    </div>
  );
}

/**
 * Animated High-Craft 3D AI Robot Character
 * Replicates the multi-state 3D robot from the reference design sheet:
 * - Antenna on head with glowing cyan sphere
 * - Angled side ear wings with purple/cyan lighting
 * - Glossy white dome helmet with dark visor & cyan glowing eyes
 * - Pearlescent egg torso with cyan core reactor or audio soundwave
 * - Floating teardrop hands (waving in greeting/hover state)
 * - Tilted cyan/purple orbital energy rings in listening/active state
 * - Ground shadow & ambient rim glows
 */
export function BotCharacterSVG({
  state = "idle",
  className = "",
}: {
  state?: BotState;
  className?: string;
}) {
  const isListening = state === "listening";
  const isGreeting = state === "greeting";
  const isReady = state === "ready";

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Robot Helmet/Body Pearlescent Lighting */}
        <linearGradient id="bot-body-grad" x1="25" y1="18" x2="95" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f1f5f9" />
          <stop offset="85%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Left Cyan Rim Lighting */}
        <linearGradient id="bot-rim-cyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>

        {/* Right Purple Rim Lighting */}
        <linearGradient id="bot-rim-purple" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </linearGradient>

        {/* Visor Glass Screen */}
        <linearGradient id="bot-visor-grad" x1="36" y1="28" x2="84" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="70%" stopColor="#090d16" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Glowing Cyan Glow for Eyes & Reactor */}
        <linearGradient id="bot-cyan-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Purple/Cyan Orbital Rings */}
        <linearGradient id="bot-ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        {/* Drop Shadow Filter for Glows */}
        <filter id="neon-cyan" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22d3ee" floodOpacity="0.9" />
        </filter>
        <filter id="neon-purple" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#c084fc" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* Floating Ground Contact Shadow */}
      <ellipse cx="60" cy="112" rx="24" ry="4" fill="#090d16" fillOpacity="0.32" />

      {/* Orbital Swirling Energy Rings (Active in Listening or Greeting state) */}
      {(isListening || isGreeting) && (
        <g className="motion-safe:animate-[bot-orbital-spin_6s_linear_infinite]" style={{ transformOrigin: "60px 78px" }}>
          <ellipse
            cx="60"
            cy="78"
            rx="42"
            ry="14"
            transform="rotate(-18 60 78)"
            fill="none"
            stroke="url(#bot-ring-grad)"
            strokeWidth="1.8"
            strokeDasharray="12 4"
            opacity="0.85"
            filter="url(#neon-cyan)"
          />
        </g>
      )}

      {/* Torso Body Pod */}
      <g>
        <ellipse cx="60" cy="80" rx="20" ry="17" fill="url(#bot-body-grad)" stroke="#94a3b8" strokeWidth="1" />
        {/* Left/Right Rim Glow on Torso */}
        <path d="M 40 80 Q 42 94 56 97 Q 44 91 40 80 Z" fill="#22d3ee" opacity="0.65" />
        <path d="M 80 80 Q 78 94 64 97 Q 76 91 80 80 Z" fill="#c084fc" opacity="0.65" />

        {/* Chest Element: Soundwave (if listening) OR Glowing Circular Core (if idle/ready) */}
        {isListening ? (
          <g>
            {/* Audio Waveform Capsule */}
            <rect x="44" y="74" width="32" height="13" rx="6.5" fill="#0b0f19" stroke="#22d3ee" strokeWidth="1" filter="url(#neon-cyan)" />
            {/* Animated Soundwave Bars */}
            <rect x="49" y="77" width="2" height="7" rx="1" fill="#22d3ee" className="motion-safe:animate-[bot-soundwave_0.8s_ease-in-out_infinite]" />
            <rect x="54" y="76" width="2" height="9" rx="1" fill="#38bdf8" className="motion-safe:animate-[bot-soundwave_0.9s_ease-in-out_infinite_0.15s]" />
            <rect x="59" y="75" width="2" height="11" rx="1" fill="#67e8f9" className="motion-safe:animate-[bot-soundwave_0.7s_ease-in-out_infinite_0.3s]" />
            <rect x="64" y="76" width="2" height="9" rx="1" fill="#38bdf8" className="motion-safe:animate-[bot-soundwave_0.9s_ease-in-out_infinite_0.45s]" />
            <rect x="69" y="77" width="2" height="7" rx="1" fill="#22d3ee" className="motion-safe:animate-[bot-soundwave_0.8s_ease-in-out_infinite_0.2s]" />
          </g>
        ) : (
          <g>
            <circle cx="60" cy="80" r="7.5" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="60" cy="80" r="5" fill="url(#bot-cyan-glow)" filter="url(#neon-cyan)" />
            <circle cx="58.5" cy="78.5" r="1.5" fill="#ffffff" opacity="0.85" />
          </g>
        )}
      </g>

      {/* Left Floating Hand */}
      <ellipse
        cx="33"
        cy="81"
        rx="5.5"
        ry="10"
        transform="rotate(-16 33 81)"
        fill="url(#bot-body-grad)"
        stroke="#94a3b8"
        strokeWidth="0.8"
      />

      {/* Right Floating Hand (Waving in Greeting State OR Floating in Idle) */}
      {isGreeting ? (
        <g className="motion-safe:animate-[bot-hand-wave_1.4s_ease-in-out_infinite]" style={{ transformOrigin: "87px 72px" }}>
          {/* Raised Arm */}
          <ellipse cx="88" cy="62" rx="5.5" ry="10" transform="rotate(35 88 62)" fill="url(#bot-body-grad)" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Cute Waving Fingers */}
          <circle cx="94" cy="54" r="2.2" fill="url(#bot-body-grad)" />
          <circle cx="97" cy="57" r="2.2" fill="url(#bot-body-grad)" />
        </g>
      ) : (
        <ellipse
          cx="87"
          cy="81"
          rx="5.5"
          ry="10"
          transform="rotate(16 87 81)"
          fill="url(#bot-body-grad)"
          stroke="#94a3b8"
          strokeWidth="0.8"
        />
      )}

      {/* Ear Fins (Left & Right) */}
      {/* Left Ear Fin */}
      <path
        d="M 28 36 L 19 28 C 17 26 19 23 22 24 L 32 30 Z"
        fill="url(#bot-body-grad)"
        stroke="#94a3b8"
        strokeWidth="0.8"
      />
      <circle cx="21" cy="26" r="2.5" fill="#22d3ee" filter="url(#neon-cyan)" />

      {/* Right Ear Fin */}
      <path
        d="M 92 36 L 101 28 C 103 26 101 23 98 24 L 88 30 Z"
        fill="url(#bot-body-grad)"
        stroke="#94a3b8"
        strokeWidth="0.8"
      />
      <circle cx="99" cy="26" r="2.5" fill="#c084fc" filter="url(#neon-purple)" />

      {/* Top Antenna Stem & Glowing Orb */}
      <line x1="60" y1="22" x2="60" y2="13" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="60" cy="11.5" r="4.5" fill="url(#bot-cyan-glow)" filter="url(#neon-cyan)" />
      <circle cx="58.8" cy="10" r="1.5" fill="#ffffff" opacity="0.9" />

      {/* Robot Head Helmet Dome */}
      <g>
        <rect
          x="26"
          y="20"
          width="68"
          height="48"
          rx="24"
          fill="url(#bot-body-grad)"
          stroke="#94a3b8"
          strokeWidth="1.2"
        />

        {/* Pearlescent Cyan/Purple Rim Highlights on Helmet */}
        <path d="M 27 34 Q 28 22 42 21 Q 30 25 27 34 Z" fill="#22d3ee" opacity="0.8" />
        <path d="M 93 34 Q 92 22 78 21 Q 90 25 93 34 Z" fill="#c084fc" opacity="0.8" />

        {/* Dark Visor Face Screen */}
        <rect
          x="32"
          y="27"
          width="56"
          height="34"
          rx="17"
          fill="url(#bot-visor-grad)"
          stroke="#1e293b"
          strokeWidth="1"
        />

        {/* Curved Specular Visor Reflection */}
        <path
          d="M 37 34 Q 60 29 83 34"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Cute Glowing Cyan Eyes */}
        {isGreeting || isReady ? (
          /* Happy Arch Eyes */
          <g filter="url(#neon-cyan)">
            <path d="M 43 45 Q 48 39 53 45" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 67 45 Q 72 39 77 45" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ) : isListening ? (
          /* Thinking Tilted Eyes */
          <g filter="url(#neon-cyan)">
            <rect x="44" y="42" width="9" height="7" rx="3.5" transform="rotate(12 48.5 45.5)" fill="url(#bot-cyan-glow)" />
            <rect x="67" y="42" width="9" height="7" rx="3.5" transform="rotate(-12 71.5 45.5)" fill="url(#bot-cyan-glow)" />
          </g>
        ) : (
          /* Classic Idle Glow Eyes */
          <g filter="url(#neon-cyan)">
            <rect x="44" y="38" width="8" height="13" rx="4" fill="url(#bot-cyan-glow)" />
            <rect x="68" y="38" width="8" height="13" rx="4" fill="url(#bot-cyan-glow)" />
            {/* Eye Catchlights */}
            <circle cx="46.5" cy="41" r="1.6" fill="#ffffff" opacity="0.9" />
            <circle cx="70.5" cy="41" r="1.6" fill="#ffffff" opacity="0.9" />
          </g>
        )}
      </g>

      {/* Greeting Speech Bubble (Active State) */}
      {isGreeting && (
        <g className="animate-in fade-in zoom-in-75 duration-200">
          <rect x="85" y="14" width="28" height="22" rx="7" fill="url(#bot-cyan-glow)" stroke="#ffffff" strokeWidth="1" filter="url(#neon-cyan)" />
          <polygon points="88,34 94,34 85,41" fill="#06b6d4" />
          {/* Smiling Emoji Inside Speech Bubble */}
          <circle cx="99" cy="25" r="5" fill="#fde047" />
          <circle cx="97.2" cy="24" r="0.8" fill="#713f12" />
          <circle cx="100.8" cy="24" r="0.8" fill="#713f12" />
          <path d="M 97 26.5 Q 99 28.5 101 26.5" stroke="#713f12" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Response State Sparkles */}
      {isReady && (
        <g fill="#38bdf8" filter="url(#neon-cyan)" opacity="0.9">
          {/* Top Left Sparkle */}
          <polygon points="20,12 22,7 24,12 29,14 24,16 22,21 20,16 15,14" transform="scale(0.7) translate(8, 2)" />
          {/* Bottom Right Sparkle */}
          <polygon points="20,12 22,7 24,12 29,14 24,16 22,21 20,16 15,14" transform="scale(0.55) translate(145, 90)" />
        </g>
      )}
    </svg>
  );
}

export default ChatbotWidget;
