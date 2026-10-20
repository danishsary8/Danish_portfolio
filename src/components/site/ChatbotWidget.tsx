import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { MessageSquare, X, Send, Sparkles, User, Bot, ArrowRight, FileText, Mail, Github, ExternalLink } from "lucide-react";
import botAnimationData from "@/assets/bot-animation.json";
import { PROFILE, PROJECTS, SKILL_GROUPS } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  links?: { label: string; href?: string; action?: () => void }[];
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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
    } else {
      window.location.hash = `#${id}`;
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Generate intelligent reply based on Danish's authentic portfolio data
    setTimeout(() => {
      const q = query.toLowerCase();
      let botResponse = "";
      let links: Message["links"] = undefined;

      if (q.includes("project") || q.includes("bookly") || q.includes("loomora") || q.includes("diabetes") || q.includes("app")) {
        botResponse =
          "Danish has built 4 standout real-world applications:\n\n" +
          "1. 📚 Bookly: Online bookstore with Laravel REST API, React/TS, PostgreSQL, JWT & Google auth.\n" +
          "2. ⏱️ Loomora: Routine & habit planner with React, Tailwind, and Laravel.\n" +
          "3. 🏥 Diabetes Expert System: Bilingual clinical assistant (AI Expert System Award Winner 2026).\n" +
          "4. 🚗 Driving Rules App: Cambodian driving theory learning app built with Flutter & Dart.";
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
        links,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* Chat Window / Dialog Modal */}
      {isOpen && (
        <div
          ref={cardRef}
          role="dialog"
          aria-labelledby="chatbot-title"
          className="absolute bottom-16 sm:bottom-18 right-0 mb-2 w-[calc(100vw-2rem)] sm:w-[370px] max-w-[400px] h-[520px] max-h-[calc(100dvh-6.5rem)] rounded-2xl border border-line-strong bg-surface-2/95 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface-1/60">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 border border-line-strong shadow-xs p-0.5">
                {isMounted ? (
                  <Lottie animationData={botAnimationData} loop autoplay className="h-full w-full" />
                ) : (
                  <BotAvatarSVG className="h-full w-full" />
                )}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
              </div>
              <div>
                <h3 id="chatbot-title" className="text-[14px] font-semibold text-fg leading-tight flex items-center gap-1.5">
                  Danish AI Assistant
                  <Sparkles className="h-3 w-3 text-gold" />
                </h3>
                <p className="text-[11px] text-fg-subtle flex items-center gap-1.5 font-mono">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online • Phnom Penh
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="press rounded-lg p-1.5 text-fg-muted hover:bg-surface-1 hover:text-fg transition-colors"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="border-b border-line bg-surface-1/30 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[12px]">
            <button
              type="button"
              onClick={() => handleSend("Tell me about your projects")}
              className="whitespace-nowrap rounded-md border border-line bg-surface-2/90 px-2.5 py-1 text-fg-muted hover:border-gold hover:text-fg transition-all"
            >
              📚 Projects
            </button>
            <button
              type="button"
              onClick={() => handleSend("What is your tech stack?")}
              className="whitespace-nowrap rounded-md border border-line bg-surface-2/90 px-2.5 py-1 text-fg-muted hover:border-gold hover:text-fg transition-all"
            >
              ⚡ Tech Stack
            </button>
            <button
              type="button"
              onClick={() => handleSend("How can I hire or contact you?")}
              className="whitespace-nowrap rounded-md border border-line bg-surface-2/90 px-2.5 py-1 text-fg-muted hover:border-gold hover:text-fg transition-all"
            >
              ✉️ Contact
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[13px] leading-relaxed">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-1 border border-line">
                    <Bot className="h-3.5 w-3.5 text-gold" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                    m.sender === "user"
                      ? "bg-fg text-bg rounded-br-xs font-medium"
                      : "bg-surface-1/90 text-fg rounded-bl-xs border border-line shadow-2xs whitespace-pre-line"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-line/60 flex flex-wrap gap-1.5">
                      {m.links.map((link, idx) =>
                        link.action ? (
                          <button
                            key={idx}
                            type="button"
                            onClick={link.action}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-gold hover:underline"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="h-2.5 w-2.5" />
                          </button>
                        ) : link.href ? (
                          <a
                            key={idx}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-gold hover:underline"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        ) : null
                      )}
                    </div>
                  )}
                  <span
                    className={`block mt-1 text-[10px] font-mono ${
                      m.sender === "user" ? "text-bg/60 text-right" : "text-fg-subtle"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-line p-2.5 bg-surface-1/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Danish's work..."
              className="flex-1 rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none focus:border-gold/80 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fg text-bg disabled:opacity-40 transition-opacity"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button (FAB) */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle Danish AI Assistant"
        className="press group relative flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full border border-line-strong bg-surface-2/95 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-gold hover:shadow-[0_16px_40px_-8px_rgba(59,130,246,0.45)]"
      >
        {/* Ambient Glow Aura */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-cyan-400/30 opacity-70 blur-lg transition-opacity duration-300 group-hover:opacity-100 animate-pulse [animation-duration:3.2s]"
        />

        {/* Floating / Bobbing Animated Bot Container */}
        <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110 motion-safe:animate-[bot-float-bob_2.8s_ease-in-out_infinite]">
          {isMounted ? (
            <Lottie animationData={botAnimationData} loop autoplay className="h-full w-full" />
          ) : (
            <BotAvatarSVG className="h-full w-full" />
          )}
        </div>

        {/* Live Online Signal Badge */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.5s]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
        </span>
      </button>
    </div>
  );
}

/**
 * High-craft SVG Bot Avatar
 * Perfectly matches the 3D illustrated character with glowing cyan eyes,
 * rounded white helmet, antenna beacon, core light, and floating hands.
 */
function BotAvatarSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Ambient Back Glow */}
        <radialGradient id="bot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
        {/* Metallic Helmet Gradient */}
        <linearGradient id="bot-helmet" x1="20" y1="15" x2="80" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        {/* Cyan Neon Glow for Eyes & Core */}
        <linearGradient id="bot-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Background Soft Aura */}
      <circle cx="50" cy="50" r="44" fill="url(#bot-glow)" />

      {/* Floating Ground Shadow */}
      <ellipse cx="50" cy="88" rx="18" ry="4" fill="#090d16" fillOpacity="0.35" />

      {/* Torso Body Pod */}
      <ellipse cx="50" cy="67" rx="16" ry="14" fill="url(#bot-helmet)" stroke="#94a3b8" strokeWidth="1.2" />

      {/* Chest Core Glowing Light */}
      <circle cx="50" cy="67" r="4.5" fill="url(#bot-cyan)" filter="drop-shadow(0 0 3px #22d3ee)" />

      {/* Left Floating Hand */}
      <ellipse cx="28" cy="68" rx="4" ry="7" transform="rotate(-15 28 68)" fill="url(#bot-helmet)" stroke="#94a3b8" strokeWidth="1" />

      {/* Right Floating Hand */}
      <ellipse cx="72" cy="68" rx="4" ry="7" transform="rotate(15 72 68)" fill="url(#bot-helmet)" stroke="#94a3b8" strokeWidth="1" />

      {/* Antenna Stem & Glowing Bulb */}
      <line x1="50" y1="20" x2="50" y2="14" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="13" r="3.5" fill="url(#bot-cyan)" filter="drop-shadow(0 0 4px #22d3ee)" />

      {/* Robot Head Helmet */}
      <rect x="22" y="20" width="56" height="40" rx="19" fill="url(#bot-helmet)" stroke="#94a3b8" strokeWidth="1.4" />

      {/* Dark Visor Face Screen */}
      <rect x="28" y="26" width="44" height="28" rx="14" fill="#0b0f19" stroke="#1e293b" strokeWidth="1" />

      {/* Cute Glowing Cyan Eyes */}
      <rect x="36" y="34" width="7" height="11" rx="3.5" fill="url(#bot-cyan)" filter="drop-shadow(0 0 4px #22d3ee)" />
      <rect x="57" y="34" width="7" height="11" rx="3.5" fill="url(#bot-cyan)" filter="drop-shadow(0 0 4px #22d3ee)" />
    </svg>
  );
}

export default ChatbotWidget;
