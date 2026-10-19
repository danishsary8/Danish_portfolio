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
   - **What to Reject (Anti-AI Filter):** Never pull neon glow borders, rainbow text shaders, floating particle backgrounds, or `SpotlightCard` radial cursor gradients. Every primitive pulled from `reactbits dev` must be restyled into this portfolio's monochrome surface, line, and text tokens, with gold used only as an accent.

2. **`21st` (`21st.dev`) MCP Server**
   - **What to Pull:** High-craft structural layout inspiration, interactive data tables, list rows, and flat panel patterns.
   - **What to Reject (Anti-AI Filter):** Reject generic SaaS bento grids, pill-shaped badges, and centered 3-column feature blocks. Strip all default Tailwind indigo/violet/slate classes and map strictly to the portfolio's custom CSS variables (surface, line, fg tokens, gold accent).

3. **`framer-motion` MCP Server**
   - **What to Pull:** Layout choreography (`LayoutGroup`, `AnimatePresence`), staggered scroll-triggered reveals (`whileInView`), and spring physics that obey the motion constitution in section 3.

4. **`shadcn/ui` (`src/components/ui/*`)**
   - **What to Use:** Leverage existing Radix-based primitives already installed in `src/components/ui/`—specifically `button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `tabs.tsx`, `dialog.tsx`, `sheet.tsx`, and `tooltip.tsx`.
   - **How to Customize:** Restyle all `shadcn/ui` primitives to the flat token system: `--surface-1`/`--surface-2` fills, 1px `--line` borders, 8px radius on controls and 12px on panels, `.press` feedback on buttons, and `--shadow-float` only on dialogs and sheets.

---

## 2. Design Laws (Linear / Emil Kowalski Era)

The portfolio uses a calm, high-craft, Linear-inspired look: monochrome greys, one restrained gold accent, flat layered surfaces, and 1px hairline borders. Any component violating one of these laws is a build failure:

1. **ZERO Eyebrow Labels:** No small uppercase tracked text above a section heading. The heading carries the weight.
2. **ZERO Decorative Numbering:** No `01`, `02`, `03` or zero-padded counters next to titles or groups.
3. **Flat layers, not glass:** Depth comes from three surface tokens (`--bg`, `--surface-1`, `--surface-2`) and 1px `--line` borders. No `backdrop-filter` glass panels on content; the only blur allowed is the sticky nav bar once scrolled. No mesh or gradient backgrounds, except the single faint `.hero-glow` behind the hero.
4. **Hairlines are structural:** 1px borders separate rows, cells, and panels. Sections are separated by whitespace (80–112px vertical padding), not by divider rules.
5. **Shadows only on floating layers:** `--shadow-float` is for dialogs, sheets, and the project hover preview. Resting content has no shadow.
6. **No gradient typography:** Text is always a solid token colour.
7. **ZERO Emoji Icons:** Use `lucide-react` (1.5px stroke) or Simple Icons brand marks from `react-icons/si`.
8. **ZERO Symmetrical 3-Card Feature Rows:** No row of three equal icon-topped cards. Prefer lists, hairline grids, and asymmetric columns.
9. **Radius scale:** 12px panels/cards, 8px buttons/inputs, 6px badges/chips. `rounded-full` only for the status dot and the avatar.
10. **Fonts:** Geist and Geist Mono (plus Kantumruy Pro for Khmer). Never `Cormorant`, `Playfair Display`, `Space Grotesk`, `DM Sans`, or `Inter`.
11. **Monochrome + one accent:** Gold (`--gold` / `--gold-ink`) is reserved for the status dot, award markers, and gold text. No terracotta, rust, indigo, violet, or cyan.
12. **ZERO Template Gimmicks:** No typewriter loops, cursor-following glow borders, particles, or rainbow shaders.

---

## 3. Motion Constitution (Emil Kowalski)

1. **Gate first:** Anything triggered 100+ times a day or from the keyboard (theme toggle, nav clicks) does not animate beyond a colour change. Name the purpose (feedback, spatial consistency, state, preventing a jarring change, first-load delight) before animating.
2. **Cheapest tool:** CSS transitions for hover, press, and colour; CSS keyframes for the first-paint hero stagger (`.enter`, runs before hydration); `IntersectionObserver` + CSS transitions for scroll reveals (`<Reveal>`, only hidden under `html.js`); Framer Motion only for springs, layout (`layoutId` nav pill), and pointer-following.
3. **Properties:** `transform`, `opacity`, and `filter: blur()` only. Never `width`/`height`/`margin`/`padding`/`top`/`left`. Never `transition: all`.
4. **Curves (from `styles.css`):** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for entrances and UI, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement, `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` for sheets. Never `ease-in` on UI.
5. **Durations:** press 160ms (`scale(0.97)`, the `.press` utility), hover 150ms, dialogs ~200–250ms (`scale(0.96)` + fade), first-load and scroll reveals 500–600ms with 50–60ms stagger.
6. **Springs (`src/lib/motion.ts`):** `SPRING_UI` (duration 0.35, bounce 0.15) for sliding indicators; `SPRING_FOLLOW` for the pointer-following project preview. No scale-from-zero entrances.
7. **Gating:** Hover motion relies on Tailwind v4 `hover:` (gated by `(hover: hover)`); pointer-following effects require `(hover: hover) and (pointer: fine)` and are off under reduced motion. Reduced motion keeps opacity fades and drops movement and blur.

---

## 4. Brand Tokens & Typography

### Colour tokens

| Token           | Light                | Dark                    | Use                       |
| --------------- | -------------------- | ----------------------- | ------------------------- |
| `--bg`          | `#FBFBFA`            | `#0A0A0B`               | Page canvas               |
| `--surface-1`   | `#F4F4F3`            | `#111113`               | Panels, hovered rows      |
| `--surface-2`   | `#FFFFFF`            | `#18181B`               | Dialogs, popovers         |
| `--line`        | `rgba(10,10,12,.08)` | `rgba(255,255,255,.08)` | Hairline borders          |
| `--line-strong` | `rgba(10,10,12,.14)` | `rgba(255,255,255,.14)` | Inputs, secondary buttons |
| `--fg`          | `#111113`            | `#EDEDEF`               | Headings, primary text    |
| `--fg-muted`    | `#5C5C66`            | `#A1A1AA`               | Body copy                 |
| `--fg-subtle`   | `#6B6B75`            | `#8A8A93`               | Metadata                  |
| `--gold`        | `#B0822D`            | `#C9973A`               | Status dot, award fills   |
| `--gold-ink`    | `#85601F`            | `#C9973A`               | Gold text (≥ 4.5:1)       |

Dark is the default theme; light is available via the toggle. Every text token passes WCAG AA (4.5:1) on every surface in both themes.

### Typography

- **Geist** 400/500/600 for all UI and headings. Display 56–72px, weight 600, `-0.045em`; section headings 26–32px, weight 600, `-0.03em`; body 15px / 1.6.
- **Geist Mono** 400 for dates, hosting labels, and data, with `tabular-nums`.
- **Kantumruy Pro** for Khmer text.

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
- **Hydration & SSR Safety:** Portfolio content must be readable without JavaScript. The hero entrance is pure CSS; scroll reveals only hide content once the inline head script has added `html.js`. Motion is a progressive enhancement, never a prerequisite for reading the page.
- **Technical Skill Presentation:** Keep technical skill presentation in dedicated components; pointer effects use event-local CSS variables and semantic tokens to stay SSR-safe and lightweight.
- **Architecture Illustration:** Keep the skills architecture illustration separate from the category controls; every technology remains visible and selection changes only its matching visual layer.
- **Typing Components:** Name wordmarks must render immediately as static, confident editorial typography; never use interval loops or blinking cursor gimmicks.
- **Test Integrity:** Every layout addition or component refactor must maintain 100% pass rate in the Vitest test suite (`npm test`).
- **Design System Showcase:** `/design-system` is a standalone route showing every color token, the type scale, live/interactive component samples, surface layers, and replayable animation samples. It is linked only from a small footer link, never the primary nav, and must stay in sync with the actual tokens/components in use (not a static mockup).
