import React, { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { JarvisChat } from "@/components/JarvisChat";

export type BotState = "idle" | "listening" | "greeting" | "ready";

/** sessionStorage flag: set once the visitor has opened Jarvis, so the unread badge only shows on first visit. */
const SEEN_KEY = "jarvis-seen-v1";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [unread, setUnread] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      if (!window.sessionStorage.getItem(SEEN_KEY)) setUnread(true);
    } catch {
      setUnread(true);
    }
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (unread) {
      setUnread(false);
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore blocked storage */
      }
    }
  };

  const handleClose = useCallback((reason?: string) => {
    setIsOpen(false);
    if (reason === "escape") buttonRef.current?.focus();
  }, []);

  // A reply that lands while the panel is closed raises the unread badge again.
  const handleBotMessage = useCallback(() => {
    if (!isOpenRef.current) setUnread(true);
  }, []);

  // Determine current active visual state
  const currentBotState: BotState = isThinking
    ? "listening"
    : isOpen
      ? "ready"
      : isHovered
        ? "greeting"
        : "idle";

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end pointer-events-none select-none">
      {/* Jarvis chat window (client only; stays mounted so a pending reply survives closing) */}
      {isMounted && (
        <JarvisChat
          open={isOpen}
          onClose={handleClose}
          triggerRef={buttonRef}
          avatar={<BotCharacterSVG state={isThinking ? "listening" : "idle"} className="h-10 w-10" />}
          onBusyChange={setIsThinking}
          onBotMessage={handleBotMessage}
        />
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
          <span className="text-[12px] font-semibold text-fg">Ask Jarvis</span>
          <Sparkles className="h-3.5 w-3.5 text-gold-ink dark:text-gold" aria-hidden="true" />
        </div>

        {/* Bot Button + Centered Ground Shadow */}
        <div className="flex flex-col items-center">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-expanded={isOpen}
            aria-label={unread && !isOpen ? "Chat with Jarvis, 1 new message" : "Chat with Jarvis"}
            className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center p-0 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
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

            {/* Close badge while open / unread count before the first open / live beacon otherwise */}
            {isOpen ? (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-surface-2 border border-line-strong text-fg-muted shadow-sm text-[10px] font-bold"
              >
                ✕
              </span>
            ) : unread ? (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 [animation-duration:2.5s]" />
                <span className="relative inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-surface-2">
                  1
                </span>
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.5s]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
              </span>
            )}
          </button>

          {/* Dynamic Breathing Ground Shadow */}
          <div
            aria-hidden="true"
            className="pointer-events-none -mt-1.5 h-2 w-9 rounded-[100%] bg-black/25 dark:bg-black/50 blur-[2px] motion-safe:animate-[bot-shadow-breathe_2.8s_ease-in-out_infinite]"
          />
        </div>
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
