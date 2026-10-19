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
   - **What to Reject (Anti-AI Filter):** Never pull neon glow borders, rainbow text shaders, floating particle backgrounds, or `SpotlightCard` radial cursor gradients. Every primitive pulled from `reactbits dev` must be restyled into flat `#F5F0E8` cream, `#0A0A0A` near-black, and `#C9973A` gold tokens.

2. **`21st` (`21st.dev`) MCP Server**
   - **What to Pull:** High-craft structural layout inspiration, interactive data tables, expandable architectural specification drawers, and command-palette/terminal dispatch patterns.
   - **What to Reject (Anti-AI Filter):** Reject all generic SaaS bento grids, glassmorphic cards, pill-shaped badges, and centered 3-column feature blocks. Strip all default Tailwind indigo/violet/slate classes and map strictly to the portfolio's custom CSS variables.

3. **`framer-motion` MCP Server**
   - **What to Pull:** Layout choreography (`LayoutGroup`, `AnimatePresence`), staggered scroll-triggered reveals (`whileInView`), and custom spring/bezier physics that strictly obey Emil Kowalski's motion constitution.

4. **`shadcn/ui` (`src/components/ui/*`)**
   - **What to Use:** Leverage existing Radix-based primitives already installed in `src/components/ui/`—specifically `sheet.tsx` (for the interactive Project Architecture & API Schema Inspector drawer), `dialog.tsx`, `tabs.tsx` (for switching between Live UI Preview, PostgreSQL Schema, and REST API Payload views), `tooltip.tsx`, `badge.tsx`, and `accordion.tsx`.
   - **How to Customize:** Override all default `shadcn/ui` `rounded-md`/`rounded-lg` classes and drop shadows. Restyle all `shadcn/ui` primitives to have sharp architectural corners (`2px`–`4px` border radius, `rounded-brand`), flat solid backgrounds (`--bg-surface` or `--bg-card`), and subtle tactile borders (`--border-subtle`).

---

## 2. The 12 Non-Negotiable Anti-AI Design Laws

Any component or layout violating even one of these 12 laws is considered a build failure:

1. **ZERO Eyebrow Labels:** Never place small uppercase tracked text above a section heading (e.g., no `PORTFOLIO`, `ABOUT ME`, `CAPABILITIES`, or `WELCOME` labels sitting above an `h2`). The heading itself must carry the full semantic weight.
2. **ZERO Decorative Numbering:** Never prepend fake sequence numbers like `01`, `02`, `03` or `(001)` to section titles or unordered capability blocks.
3. **ZERO Hairline Section Dividers:** Never place a `1px` `<hr>` or border line between major page sections. Separate major sections strictly using generous whitespace (`120px–180px` desktop vertical padding) and alternating flat background tone shifts (`--bg-base` `#F5F0E8` shifting to `--bg-surface` `#ECE5D8` in light mode; `#0A0A0A` shifting to `#141414` in dark mode).
4. **ZERO Glassmorphism:** Never use `backdrop-blur`, translucent white/black cards (`bg-white/10`), or frosted acrylic panels anywhere.
5. **ZERO Resting Drop Shadows:** Static cards, buttons, and containers on the page canvas must have `shadow-none`. Shadows are permitted exclusively on floating overlay layers (`Sheet`, `Dialog`, `Popover`) to indicate z-axis elevation.
6. **ZERO Gradients:** Never use `bg-gradient-to-*`, `radial-gradient`, or `bg-clip-text text-transparent` gradient typography. Use 100% flat, solid color fields.
7. **ZERO Emoji Icons:** Never render emojis (`🚀`, `💻`, `✨`, `🇰🇭`) anywhere in the UI. Always use crisp `1.5px` stroke vector icons from `lucide-react`.
8. **ZERO Symmetrical 3-Card Rows:** Never build a row of 3 equal-width centered cards topped with icons. Always use asymmetric multi-column splits (`65/35`, `60/40`, `40/60`) or dense architectural specification matrices.
9. **ZERO Pill Shapes on Interactive Controls:** Never use `rounded-full` on buttons, tabs, or action triggers (only a tiny `8px` status dot indicator may be round). All buttons, badges, and inputs must use sharp `2px–4px` border radius (`rounded-brand`).
10. **ZERO Banned AI Font Pairings:** Never import or fallback to `Cormorant`, `Playfair Display`, `Space Grotesk`, `DM Sans`, or `Inter`.
11. **ZERO "Assistant Palette" Colors:** Never use terracotta, rust, indigo, violet, or cyan accents. Stick exclusively to the locked brand hex tokens.
12. **ZERO Generic Template Gimmicks:** Never use infinite typewriter text loops (`TextType.tsx`) or mouse-following radial glow borders (`SpotlightCard.tsx`).

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
5. **No Ease-In on UI:** Never use `ease-in` curves on interactive UI elements. Always use `cubic-bezier(0.23, 1, 0.32, 1)` (sharp ease-out) for entrances/exits and `ease-in-out` (`[0.65, 0, 0.35, 1]`) for on-screen spatial morphing.
6. **Pointer Media Gating:** All hover transforms and color shifts must be gated behind `@media (hover: hover) and (pointer: fine)` so touch devices never experience sticky hover states.
7. **Reduced Motion Accessibility:** Every motion wrapper and `framer-motion` hook must check `useReducedMotion()`. When enabled, strip all `y` and `scale` movement and fallback to a clean `150ms` opacity fade.

---

## 4. Brand Tokens & Typography Specification

### Color Tokens

#### Light Theme (Editorial Parchment)

- **Base Canvas (`--bg-base`):** `#F5F0E8` (Warm Cream Canvas)
- **Structural Surface (`--bg-surface`):** `#ECE5D8` (Secondary Section Shift Canvas)
- **Elevated Card Surface (`--bg-card`):** `#FAF7F2` (Elevated Flat Structural Surface)
- **High-Contrast Text (`--text-primary`):** `#0A0A0A` (Near-Black Primary Ink)
- **Technical / Annotation Muted Text (`--text-muted`):** `#5A554C` (Warm Charcoal Technical Annotations)
- **Spec Gold Accent (`--accent-gold`):** `#C9973A` (Signature Gold Accent & Active Beacons)
- **Gold Interactive Hover (`--accent-gold-hover`):** `#B0822D` (Gold Interactive Hover)
- **Subtle Border (`--border-subtle`):** `rgba(10, 10, 10, 0.10)` (Crisp Structural Ledger Lines)
- **Focus Ring Border (`--border-focus`):** `#0A0A0A` (Crisp Focus Outline)

#### Dark Theme (Technical Obsidian `.dark`)

- **Base Canvas (`--bg-base`):** `#0A0A0A` (Deep Near-Black Canvas)
- **Structural Surface (`--bg-surface`):** `#121212` (Secondary Section Shift Canvas)
- **Elevated Card Surface (`--bg-card`):** `#181818` (Flat Structural Surface)
- **High-Contrast Text (`--text-primary`):** `#F5F0E8` (Cream Primary Ink)
- **Technical / Annotation Muted Text (`--text-muted`):** `#9A948A` (Muted Warm Stone Annotations)
- **Spec Gold Accent (`--accent-gold`):** `#C9973A` (Signature Gold Accent)
- **Gold Interactive Hover (`--accent-gold-hover`):** `#DDA94B` (Lighter Gold Hover)
- **Subtle Border (`--border-subtle`):** `rgba(245, 240, 232, 0.12)` (Crisp Structural Ledger Lines)
- **Focus Ring Border (`--border-focus`):** `#C9973A` (Gold Focus Outline)

### Typography Pairing (Max 2 Primary Families + Technical Monospace)

1. **Display / Section Headlines:** `Syne` (Weights: `700`, `800`). Wide, architectural, unapologetic proportions that command presence at large display sizes (48px–96px) without feeling like a generic luxury template.
2. **Body & UI Copy:** `Plus Jakarta Sans` (Weights: `400`, `500`, `600`, `700`). Modern, balanced geometric sans designed specifically for high-density interfaces, readable across all device sizes.
3. **Technical Metadata / Code / API Schemas:** `JetBrains Mono` (Weights: `400`, `500`). Used strictly for live Phnom Penh telemetry, REST API endpoints, database schema previews, and tech stack tags.

---

## 5. Canonical Content Source of Truth (Verbatim Authority)

All components must draw strictly from these authentic biographical facts. Never invent placeholder lorem ipsum or generic titles:

- **Developer:** Sary Danish (goes by Danish)
- **Role:** Junior Full-Stack Developer / 4th-Year Software Development Student at Norton University
- **Location:** Phnom Penh, Cambodia (`ICT UTC+7`)
- **Email:** `danishsary4@gmail.com`
- **GitHub:** `https://github.com/danishsary8`
- **Exact Bio:**
  > "My name is Sary Danish, a fourth-year Software Development student at Norton University, Phnom Penh, Cambodia. I build and deploy full-stack web applications — from secure REST APIs to responsive React frontends with clean UI. I enjoy turning real problems into working software, writing maintainable code, and collaborating in teams. My dream is to become a highly skilled Full-Stack Developer, capable of building complete, real-world web applications that are scalable, maintainable, and genuinely useful to people."
- **Tech Stack:**
  - Languages & Fundamentals: JavaScript, PHP, Java, Python, HTML, CSS
  - Frameworks & UI: React, Tailwind CSS, Bootstrap, Laravel, Flask
  - Databases & Storage: PostgreSQL, Supabase, SQLite, Oracle
  - Tools & Workflow: Git, GitHub, REST APIs, Figma
- **Experience:**
  - **Frontend & Backend Developer Trainee** — ETEC & KruITSolution — July 2026 – Present — Phnom Penh, Cambodia. Weekend internship training in web development covering frontend and backend technologies, hands-on with real projects.
- **Projects (All 4 Required):**
  1. **Bookly:** Online bookstore platform with full e-commerce features. REST API backend with Laravel, React/TypeScript frontend, JWT authentication, PostgreSQL database.
     - Live: `https://bookly-frontend-five.vercel.app/`
     - API Docs: `https://bookly-api-zasc.onrender.com/docs`
     - GitHub: `https://github.com/danishsary8`
  2. **Loomora:** Personal routine and habit planner web app, deployed full-stack with scheduling features.
     - Live: `https://daycraft-vnid.onrender.com/`
     - GitHub: `https://github.com/danishsary8`
  3. **Diabetes Expert System:** Full-stack clinical assistance prototype, bilingual EN/Khmer, JWT RBAC, rule-based expert system for diabetes risk assessment. Winner of AI Expert System Competition 2026 at Norton University.
     - Live: `https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/`
     - GitHub: `https://github.com/danishsary8`
  4. **Driving Rules App:** Frontend app for learning Cambodian driving theory, built with Flutter.
     - Live: `https://drivingruletest.netlify.app/`
     - GitHub: `https://github.com/danishsary8`
- **Education & Awards:**
  - **Norton University** — B.S. in Software Development — 2023 – Present (Expected 2027) — Phnom Penh, Cambodia
  - **Award:** Winner of AI Expert System Competition 2026 — Norton University
  - **ACE (American Culture and English / Australian Centre for Education)** — English Language Program — Completed
  - **ETEC Frontend Development Course & Backend Development Course** — Completed

---

## 6. Architectural & Engineering Workspace Conventions

- **Media Handling:** App media (photos, screenshots, documents) is served from CDN via `.asset.json` pointer files — never commit raw binaries into the repository.
- **Hydration & SSR Safety:** Portfolio content must render visibly before hydration and without viewport observers; motion is a progressive enhancement, never a prerequisite for reading the page.
- **Technical Skill Presentation:** Keep technical skill presentation in dedicated components; pointer effects use event-local CSS variables and semantic tokens to stay SSR-safe and lightweight.
- **Architecture Illustration:** Keep the skills architecture illustration separate from the category controls; every technology remains visible and selection changes only its matching visual layer.
- **Typing Components:** Name wordmarks must render immediately as static, confident editorial typography; never use interval loops or blinking cursor gimmicks.
- **Test Integrity:** Every layout addition or component refactor must maintain 100% pass rate in the Vitest test suite (`npm test`).
