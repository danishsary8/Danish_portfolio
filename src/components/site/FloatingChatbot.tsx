import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Mail, FileText, ArrowRight, Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { PROFILE } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape or click outside
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

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      {/* Quick Assistant Popup Card */}
      {isOpen && (
        <div
          ref={cardRef}
          role="dialog"
          aria-labelledby="chatbot-title"
          className="absolute bottom-16 right-0 mb-2 w-[calc(100vw-2.5rem)] sm:w-[340px] rounded-2xl border border-line-strong bg-surface-2/95 p-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-surface-1 border border-line p-1">
                <img
                  src={ASSETS.chatbot.icon}
                  alt={ASSETS.chatbot.alt}
                  className="h-full w-full object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
              </div>
              <div>
                <h4 id="chatbot-title" className="text-[14px] font-semibold text-fg leading-none flex items-center gap-1.5">
                  Danish Assistant
                  <Sparkles className="h-3 w-3 text-gold" />
                </h4>
                <p className="mt-1 font-mono text-[11px] text-fg-subtle">Online · UTC+7 Phnom Penh</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="press flex h-7 w-7 items-center justify-center rounded-lg text-fg-subtle hover:bg-surface-1 hover:text-fg transition-colors"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Assistant Greeting */}
          <div className="mt-3 rounded-xl bg-surface-1/80 border border-line/60 p-3 text-[13px] leading-relaxed text-fg-muted">
            👋 Hi! I&apos;m Danish&apos;s portfolio assistant. How can I help you today?
          </div>

          {/* Quick Actions List */}
          <div className="mt-3 flex flex-col gap-1.5">
            <a
              href="https://t.me/sarydanish"
              target="_blank"
              rel="noopener noreferrer"
              className="press flex items-center justify-between rounded-xl border border-line/70 bg-surface-1/50 px-3 py-2 text-[13px] font-medium text-fg hover:border-gold/50 hover:bg-surface-1 transition-all group"
            >
              <span className="flex items-center gap-2">
                <Send className="h-3.5 w-3.5 text-gold group-hover:translate-x-0.5 transition-transform" />
                Chat on Telegram
              </span>
              <span className="font-mono text-[11px] text-fg-subtle">@sarydanish</span>
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="press flex items-center justify-between rounded-xl border border-line/70 bg-surface-1/50 px-3 py-2 text-[13px] font-medium text-fg hover:border-gold/50 hover:bg-surface-1 transition-all group"
            >
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold group-hover:translate-x-0.5 transition-transform" />
                Send an Email
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-fg-subtle group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="press flex items-center justify-between rounded-xl border border-line/70 bg-surface-1/50 px-3 py-2 text-[13px] font-medium text-fg hover:border-gold/50 hover:bg-surface-1 transition-all group w-full text-left"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-gold group-hover:translate-x-0.5 transition-transform" />
                View Featured Projects
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-fg-subtle group-hover:translate-x-0.5 transition-transform" />
            </button>

            {CV_HREF && CV_HREF !== "#" && (
              <a
                {...getCvLinkProps()}
                className="press flex items-center justify-between rounded-xl border border-line/70 bg-surface-1/50 px-3 py-2 text-[13px] font-medium text-fg hover:border-gold/50 hover:bg-surface-1 transition-all group"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-gold group-hover:translate-x-0.5 transition-transform" />
                  Download Danish&apos;s CV
                </span>
                <span className="font-mono text-[11px] text-fg-subtle">PDF</span>
              </a>
            )}
          </div>

          {/* Bottom Footer Note */}
          <div className="mt-3 pt-2 text-center border-t border-line/40">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="font-mono text-[11px] text-gold hover:underline transition-all"
            >
              Or leave a message in Contact form →
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open Danish portfolio assistant"
        className="press group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-line-strong/80 bg-surface-2/95 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold/60 hover:shadow-[0_16px_44px_-8px_rgba(201,151,58,0.35)]"
      >
        {/* Glow Halo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r from-gold/20 via-transparent to-gold/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Chatbot Icon with subtle breathing hover animation */}
        <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <img
            src={ASSETS.chatbot.icon}
            alt={ASSETS.chatbot.alt}
            className="h-full w-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
          />
        </div>

        {/* Live Online Badge Indicator */}
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.5s]" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
        </span>
      </button>
    </div>
  );
}
