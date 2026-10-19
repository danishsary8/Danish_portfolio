<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# AGENTS.md — Master Architecture, Skill Orchestration & Anti-AI Design Constitution

This document serves as the immutable, permanent Master Architecture & Design Constitution for Sary Danish's developer portfolio. It defines the architectural boundaries, skill/MCP orchestration matrices, motion invariants, color semantics, and non-negotiable anti-AI design laws that all subsequent agent tasks, code refactors, and component implementations in this codebase MUST adhere to without exception.

---

## 1. Mandatory Skill & MCP Server Orchestration Matrix

Every component, layout, and interaction must pass through this orchestration matrix. Combine and filter installed tools according to their exact domains of mastery:

### A. Installed Workspace Skills

1. **`/taste-skill` / `design-taste-frontend` (`https://github.com/Leonxlnx/taste-skill.git`)**
   - **Domain:** High-Craft Aesthetic Direction, Editorial Grid Proportion, and Anti-Generic Filtering.
   - **Mandatory Usage:** Must be evaluated before creating or refactoring any layout section. Use `/taste-skill` to enforce:
     - Asymmetric column splits (e.g., 65/35 in Hero, 60/40 in Engineering Works, 4-column tabular ledgers in Capabilities).
     - Extreme typographic scale contrast (commanding architectural display headers vs. crisp, ultra-precise technical metadata).
     - Generous negative space and vertical rhythm (120px–180px on desktop, 80px on mobile).
     - Zero ornamental clutter (no empty cards, no generic dividers).

2. **`/impeccable` (`https://github.com/pbakaus/impeccable.git`)**
   - **Domain:** Micro-Typography, Optical Alignment, Tactile Surface Precision, and Polish.
   - **Mandatory Usage:** Must be applied during component styling to audit:
     - Optical padding and rhythm inside cards and interactive surfaces.
     - Line-height tightness (0.95 to 1.05 on display headlines; 1.4 to 1.6 on body copy).
     - Tabular numeral alignment (`tabular-nums`) on live clocks, dates, and technical metrics.
     - Crisp 1px structural borders within data ledgers (never as lazy section dividers).
     - Zero-jank state transitions and tight micro-interaction feedbacks.

3. **`/ui-ux-pro-max`**
   - **Domain:** Interaction Ergonomics, Accessibility Compliance (WCAG AA/AAA), Responsive Breakpoint Mechanics, and Usability Architecture.
   - **Mandatory Usage:** Must govern:
     - All interactive states and keyboard navigation flows (`:focus-visible` outlines with `--border-focus`).
     - Touch-target sizing (`>= 44x44px` on mobile surfaces).
     - Responsive stacking and reflow mechanics across `375px` (Mobile), `768px` (Tablet), `1024px` (Laptop), and `1440px+` (Desktop Widescreen).
     - Accessible color contrast across both Light (Editorial Parchment) and Dark (Technical Obsidian) themes.

4. **`/img2threejs` (`https://github.com/img2threejs/img2threejs.git`)**
   - **Domain:** Tactile 3D Depth, Perspective Projection, and Hardware-Accelerated WebGL/Three.js Micro-Visuals.
   - **Mandatory Usage:** Restricted strictly to the Hero right-column portrait & architectural node frame:
     - Transform `src/assets/danish-photo.jpg` or an accompanying geometric architectural mesh into a subtle, tactile, pointer-reactive depth plane.
     - Respond to cursor coordinates via smooth matrix transforms without dropping below 60fps or bloating the bundle.
     - Gracefully fallback to a high-contrast editorial static portrait when WebGL is unavailable or when `prefers-reduced-motion` is active.

### B. Connected MCP Servers & Component Libraries (Strict Filtering Rules)

1. **`reactbits dev` MCP Server**
   - **What to Pull:** Kinetic typography primitives, subtle magnetic button wrappers, decrypted/tabular text reveal mechanics for technical telemetry strings, and smooth scroll-linked layout helpers.
   - **What to Reject (Anti-AI Filter):** Never pull neon glow borders, rainbow text shaders, floating particle backgrounds, or `SpotlightCard` radial cursor gradients. Every primitive pulled from `reactbits dev` must be restyled into this portfolio's glass surface/border tokens, obsidian/parchment text tokens, and `#C9973A` gold accent.

2. **`21st` (`21st.dev`) MCP Server**
   - **What to Pull:** High-craft structural layout inspiration, interactive data tables, expandable architectural specification drawers, and glass-surface card/panel patterns.
   - **What to Reject (Anti-AI Filter):** Reject generic SaaS bento grids, pill-shaped badges, and centered 3-column feature blocks. Strip all default Tailwind indigo/violet/slate classes and map strictly to the portfolio's custom CSS variables (gold accent, glass surface/border tokens).

3. **`framer-motion` MCP Server**
   - **What to Pull:** Layout choreography (`LayoutGroup`, `AnimatePresence`), staggered scroll-triggered reveals (`whileInView`), and custom spring/bezier physics that strictly obey Emil Kowalski's motion constitution.

4. **`shadcn/ui` (`src/components/ui/*`)**
   - **What to Use:** Leverage existing Radix-based primitives already installed in `src/components/ui/`—specifically `button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `tabs.tsx`, `dialog.tsx`, `sheet.tsx`, and `tooltip.tsx`.
   - **How to Customize:** Restyle all `shadcn/ui` primitives to soft iOS-style radius (`16px` cards/panels, `10–12px` buttons/inputs/badges), glass surfaces (`--glass-surface` background, `backdrop-filter: blur()`, `--glass-border`), and shadows reserved for floating/elevated states only.

---

## 2. The Anti-AI Design Laws (Glassmorphism Era)

This section was revised to permit the glassmorphic, iOS-style visual language the portfolio now uses, while keeping the anti-generic-template discipline that still applies. Any component or layout violating one of these is considered a build failure:

1. **ZERO Eyebrow Labels:** Never place small uppercase tracked text above a section heading (e.g., no `PORTFOLIO`, `ABOUT ME`, `CAPABILITIES`, or `WELCOME` labels sitting above an `h2`). The heading itself must carry the full semantic weight.
2. **ZERO Decorative Numbering:** Never prepend fake sequence numbers like `01`, `02`, `03` or `(001)` to section titles or unordered capability blocks.
3. **ZERO Hairline Section Dividers:** Never place a `1px` `<hr>` or border line between major page sections. Separate major sections with generous whitespace (`120px–180px` desktop vertical padding) and the page's background mesh-gradient tone shifts, not divider rules.
4. **Glassmorphism is the house style, used deliberately:** Frosted `backdrop-filter: blur()` surfaces, translucent panels (`--glass-surface`), and thin light borders (`--glass-border`) are expected on nav, cards, modals, and floating controls. The resting page background is a soft mesh/radial gradient (`--bg-elevated`) so the blur always has something to refract — never place a glass panel directly on a flat, gradient-less fill. Avoid the overused "pure white 10% opacity on a plain photo" cliché; keep panels legible with real contrast against `--text-primary`.
5. **Shadows are for elevation, not decoration:** Flat resting page content stays shadow-free; soft shadows are reserved for floating/elevated layers — glass cards on hover-lift, nav bar, modals, dialogs, sheets, popovers — to indicate real z-axis depth.
6. **No gradient typography:** Backgrounds and surfaces may use mesh/radial gradients, but never `bg-clip-text text-transparent` gradient text — text stays a solid, readable color.
7. **ZERO Emoji Icons:** Never render emojis (`🚀`, `💻`, `✨`, `🇰🇭`) anywhere in the UI. Always use crisp `1.5px` stroke vector icons from `lucide-react`.
8. **ZERO Symmetrical 3-Card Rows:** Never build a row of 3 equal-width centered cards topped with icons. Always use asymmetric multi-column splits (`65/35`, `60/40`, `40/60`) or dense architectural specification matrices.
9. **Soft iOS-style radius, never a pill:** Cards/panels use `16px` radius, buttons/inputs/badges use `10–12px` radius. `rounded-full` stays banned on buttons, tabs, and action triggers — only the `8px` status dot indicator may be fully round.
10. **ZERO Banned AI Font Pairings:** Never import or fallback to `Cormorant`, `Playfair Display`, `Space Grotesk`, `DM Sans`, or `Inter`.
11. **ZERO "Assistant Palette" Colors:** Never use terracotta, rust, indigo, violet, or cyan accents. The one accent stays the locked brand gold (`--accent-gold`).
12. **ZERO Generic Template Gimmicks:** Never use infinite typewriter text loops (`TextType.tsx`) or mouse-following radial glow borders (`SpotlightCard.tsx`). Any `reactbits.dev` primitive pulled in (decrypted/reveal text, magnetic button) must be restyled to this palette — no neon glow, rainbow shaders, or floating particles.

---

## 3. Emil Kowalski Motion & Animation Constitution

All Framer Motion transitions and CSS animations in this repository must strictly follow this decision framework:

1. **Purpose-First Rule:** Before animating any element, identify its exact purpose: _Feedback_, _Spatial Consistency_, _State Indication_, _Preventing Jarring Layout Shifts_, or _Delight (First-time Hero Load only)_. If an animation has no clear purpose, do not animate it.
2. **Frequency Hierarchy:**
   - **High-frequency interactions** (keyboard navigation, theme switch): Instant or near-imperceptible (`100ms–120ms`).
   - **Frequent actions** (button hover, link underline, tab switch): Fast and responsive (`120ms–160ms`, `ease`).
   - **Occasional interactions** (sliding `Sheet` drawer for API architecture inspection, `Dialog` modals): Controlled spatial transition (`220ms–300ms`, `cubic-bezier(0.23, 1, 0.32, 1)`).
   - **Rare / Viewport entry reveals:** Staggered section entrance (`350ms–420ms` duration, `60ms–80ms` child stagger, `cubic-bezier(0.23, 1, 0.32, 1)`).
3. **Hardware-Accelerated Properties Only:** Animate exclusively `transform` (`translate3d`, `scale`) and `opacity`. Never animate layout-triggering properties (`width`, `height`, `margin`, `padding`, `top`, or `left`).
4. **No Scale-From-Zero:** Never animate an element entering from `scale(0)`. Always start entrances from `scale(0.96)` or `scale(0.97)` paired with `opacity: 0` and `y: 16px`.
5. **Spring-First Motion:** Entrances, hover lifts, and press feedback use Framer Motion spring physics (not cubic-bezier) for a native, iOS-style feel — entrances `{ stiffness: 300, damping: 30 }`, hover lift `{ stiffness: 400, damping: 28 }`, press `{ stiffness: 500, damping: 35 }`. `cubic-bezier(0.23, 1, 0.32, 1)` (sharp ease-out) remains the fallback for CSS-only transitions (color/border on hover) where a spring isn't practical. Never use `ease-in` curves on interactive UI elements.
6. **Pointer Media Gating:** All hover transforms and color shifts must be gated behind `@media (hover: hover) and (pointer: fine)` so touch devices never experience sticky hover states.
7. **Reduced Motion Accessibility:** Every motion wrapper and `framer-motion` hook must check `useReducedMotion()`. When enabled, strip all `y` and `scale` movement and fallback to a clean `150ms` opacity fade.

---

## 4. Brand Tokens & Typography Specification

### Color Tokens (Glass Era)

#### Light Theme

- **Base Canvas (`--bg-base`):** `#F0EEE9` (Warm Parchment Canvas)
- **Elevated Mesh Background (`--bg-elevated`):** `#F7F5F0` → `#ECE8DF` radial/mesh gradient — sits behind every glass panel so blur has something to refract
- **Glass Surface (`--glass-surface`):** `rgba(255, 255, 255, 0.55)`
- **Glass Border (`--glass-border`):** `rgba(10, 10, 10, 0.10)`
- **High-Contrast Text (`--text-primary`):** `#0A0A0A`
- **Muted Text (`--text-muted`):** `#5A554C`
- **Spec Gold Accent (`--accent-gold`):** `#B0822D`
- **Gold Interactive Hover (`--accent-gold-hover`):** `#9A6F26`
- **Focus Ring Border (`--border-focus`):** `#0A0A0A`
- **Blur:** `18px` on content cards, `28px` on nav/modals

#### Dark Theme (`.dark`)

- **Base Canvas (`--bg-base`):** `#0A0A0C` (Near-Black, slight blue cast)
- **Elevated Mesh Background (`--bg-elevated`):** `#15131A` → `#0A0A0C` radial/mesh gradient
- **Glass Surface (`--glass-surface`):** `rgba(255, 255, 255, 0.06)`
- **Glass Border (`--glass-border`):** `rgba(255, 255, 255, 0.12)`
- **High-Contrast Text (`--text-primary`):** `#F5F0E8`
- **Muted Text (`--text-muted`):** `#9A948A`
- **Spec Gold Accent (`--accent-gold`):** `#C9973A`
- **Gold Interactive Hover (`--accent-gold-hover`):** `#DDA94B`
- **Focus Ring Border (`--border-focus`):** `#C9973A`
- **Blur:** `18px` on content cards, `28px` on nav/modals

### Radius Scale

- Cards / panels: `16px`
- Buttons / inputs / badges: `10–12px`
- Status dot indicator only: fully round (`8px` diameter)

### Typography Pairing (Max 2 Primary Families + Technical Monospace)

1. **Display / Section Headlines:** `Syne` (Weights: `700`, `800`). Wide, architectural, unapologetic proportions that command presence at large display sizes (48px–96px) without feeling like a generic luxury template.
2. **Body & UI Copy:** `Plus Jakarta Sans` (Weights: `400`, `500`, `600`, `700`). Modern, balanced geometric sans designed specifically for high-density interfaces, readable across all device sizes.
3. **Technical Metadata / Code / API Schemas:** `JetBrains Mono` (Weights: `400`, `500`). Used strictly for live Phnom Penh telemetry, REST API endpoints, database schema previews, and tech stack tags.

---

## 5. Canonical Content Source of Truth (Verbatim Authority)

All components must draw strictly from these authentic biographical facts. Never invent placeholder lorem ipsum or generic titles:

- **Developer:** Sary Danish (goes by Danish)
- **Role:** Junior Web Developer / 4th-Year Software Development Student at Norton University
- **Location:** Phnom Penh, Cambodia (`ICT UTC+7`)
- **Email:** `danishsary4@gmail.com`
- **GitHub:** `https://github.com/danishsary8`
- **Telegram:** `@danishsary`
- **Exact Bio (blended from CV + prior site copy):**
  > "My name is Sary Danish, a fourth-year Software Development student at Norton University, Phnom Penh, Cambodia. I build real web applications with React, Laravel, and PostgreSQL — including an online bookstore, a habit planner, and a bilingual clinical expert system — with secure APIs using JWT, OTP verification, and Google OAuth. I focus on responsive interfaces and clean, scalable, maintainable code, and enjoy turning real problems into working software. My goal is to grow into a skilled Full-Stack Developer, building complete, real-world applications that are genuinely useful to people."
- **Tech Stack:**
  - Languages & Fundamentals: JavaScript (ES6+), PHP, Java, Python, HTML5, CSS3
  - Frameworks & UI: React, Tailwind CSS, Bootstrap, Framer Motion, Laravel, Flask
  - Databases & Storage: PostgreSQL, Supabase, SQLite, Oracle
  - Tools & Workflow: Git, GitHub, REST APIs, JWT Authentication, Docker, Cloudinary, Postman
- **Experience:**
  - **Web Developer Trainee (Weekends)** — ETEC & KruITSolution — July 2026 – Present — Phnom Penh, Cambodia. Web developer on a team tour booking platform, building UI dashboards and fetching/integrating REST APIs. Collaborated via Git/GitHub using feature branches, commits, and pull requests. Coordinated API requirements with backend teammates and shared ideas in team discussions.
- **Projects (All 4 Required):**
  1. **Bookly:** Online bookstore (e-commerce) platform. Laravel + React/TypeScript + PostgreSQL REST API, OTP & Google login, cart, checkout, order tracking, reviews, admin dashboard, Telegram bot, Cloudinary media.
     - Live: `https://bookly-frontend-five.vercel.app/`
     - API Docs: `https://bookly-api-zasc.onrender.com/docs`
     - GitHub: `https://github.com/danishsary8`
  2. **Loomora:** Routine & habit planner. React, Tailwind CSS, Framer Motion, Laravel, PostgreSQL — secure login, Google sign-in, email verification, daily routines and reminders.
     - Live: `https://daycraft-vnid.onrender.com/`
     - GitHub: `https://github.com/danishsary8`
  3. **Diabetes Expert System:** Bilingual (EN/Khmer) clinical assistant for early diabetes screening. React, Flask, PostgreSQL, JWT, RBAC — explainable rule-based risk assessments and care plans; contributed Google sign-in, UI improvements, and testing. Team project.
     - Live: `https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/`
     - GitHub: `https://github.com/danishsary8`
  4. **Driving Rules App:** Offline, bilingual (Khmer/English) driving theory learning app for Cambodia's driving exam. Flutter, Dart, local storage — road-sign lessons and practice exams.
     - Live: `https://drivingruletest.netlify.app/`
     - GitHub: `https://github.com/danishsary8`
- **Education & Awards:**
  - **Norton University** — B.S. in Software Development — 2024 – Present — Phnom Penh, Cambodia
  - **Award:** AI Expert System and Innovation 2026 — Award Winner (Team), September 2026 — presented the Diabetes Expert System
  - **ACE (Australian Centre for Education)** — General English Program — 2024 – 2026, Completed
  - **ETEC** — Frontend Development Course (HTML, CSS, JavaScript, React.js) — Jan 2025 – Jul 2025, Completed
  - **ETEC** — Backend Development Course (PHP, Laravel) — Nov 2025 – Mar 2026, Completed

---

## 6. Architectural & Engineering Workspace Conventions

- **Media Handling:** App media (photos, screenshots, documents) is served from CDN via `.asset.json` pointer files — never commit raw binaries into the repository.
- **Hydration & SSR Safety:** Portfolio content must render visibly before hydration and without viewport observers; motion is a progressive enhancement, never a prerequisite for reading the page.
- **Technical Skill Presentation:** Keep technical skill presentation in dedicated components; pointer effects use event-local CSS variables and semantic tokens to stay SSR-safe and lightweight.
- **Architecture Illustration:** Keep the skills architecture illustration separate from the category controls; every technology remains visible and selection changes only its matching visual layer.
- **Typing Components:** Name wordmarks must render immediately as static, confident editorial typography; never use interval loops or blinking cursor gimmicks.
- **Test Integrity:** Every layout addition or component refactor must maintain 100% pass rate in the Vitest test suite (`npm test`).
- **Design System Showcase:** `/design-system` is a standalone route showing every color token, the type scale, live/interactive component samples, glass effect levels, and replayable animation samples. It is linked only from a small footer link, never the primary nav, and must stay in sync with the actual tokens/components in use (not a static mockup).
