# Sary Danish — Senior Full-Stack Engineering Portfolio

> **Architectural Constitution:** Built in accordance with the `AGENTS.md` Anti-AI Design Constitution, Emil Kowalski Motion Physics, and Editorial Modernism.

---

## 1. Executive Summary

This repository hosts the production portfolio of **Sary Danish**, a fourth-year Software Development student at **Norton University** and Frontend/Backend Developer Trainee at **ETEC & KruITSolution** in Phnom Penh, Cambodia (`ICT UTC+7`).

The application is engineered as a high-craft single-page editorial interface combining dense technical telemetry, asymmetric grid layouts (65/35 Hero, 4-column matrix, 60/40 engineering works, 7/5 experience ledger), and an interactive **REST API & PostgreSQL Database Schema Inspector** drawer.

- **Developer:** Sary Danish (Danish)
- **Location:** Phnom Penh, Cambodia (`ICT UTC+7`)
- **Email:** `danishsary4@gmail.com`
- **GitHub:** [https://github.com/danishsary8](https://github.com/danishsary8)
- **Degree:** B.S. in Software Development, Norton University (2023 – Expected 2027)
- **Honors:** Winner of AI Expert System Competition 2026, Norton University

---

## 2. Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT PRESENTATION LAYER                       │
│     React 19  •  TypeScript 5.8  •  TanStack Router  •  Tailwind CSS v4│
│   Radix UI Primitives (Sheet, Tabs, Dialog)  •  Lucide Vector Icons     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    EMIL KOWALSKI MOTION PHYSICS ENGINE                 │
│      src/lib/motion.ts  •  Hardware-Accelerated transform & opacity    │
│    Sharp Ease-Out [0.23, 1, 0.32, 1]  •  prefers-reduced-motion Gate   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                   PERSISTENT SERVER RUNTIME & SSR/SSG                  │
│       Vite 8  •  TanStack Start  •  Nitro Cloudflare Module Preset     │
└────────────────────────────────────────────────────────────────────────┘
```

| Layer                  | Technologies                                       | Purpose                                                               |
| :--------------------- | :------------------------------------------------- | :-------------------------------------------------------------------- |
| **Framework & Router** | React 19, TanStack Router, TanStack Start          | Type-safe single-page routing, zero-bundle overhead                   |
| **Styling & Tokens**   | Tailwind CSS v4, Custom CSS Variables              | Editorial parchment palette, strict 2px–4px architectural radii       |
| **UI Primitives**      | Radix UI / `shadcn/ui` (`sheet`, `tabs`, `dialog`) | Accessible headless interactive drawers and schema inspectors         |
| **Motion Physics**     | Framer Motion 14, `src/lib/motion.ts`              | 60–120fps physics transitions, zero ease-in, reduced-motion fallbacks |
| **Build & Deploy**     | Vite 8, Nitro, Cloudflare Pages/Workers            | Sub-second hydration, SSR capability, edge asset caching              |
| **Quality & Tests**    | Vitest 4, `@testing-library/react`, ESLint 9       | 100% test pass gate, type verification, zero-runtime errors           |

---

## 3. Design System & Anti-AI Philosophy

The visual and interaction architecture strictly adheres to the **12 Non-Negotiable Anti-AI Design Laws** defined in `AGENTS.md`:

1. **Zero Eyebrow Labels:** Section headings carry full semantic authority without uppercase tracking labels above `h2`s.
2. **Zero Decorative Numbering:** No fake `01`, `02`, or `03` prefixes on headings or matrices.
3. **Zero Hairline Dividers:** No `1px` lines between major sections. Spatial rhythm is governed strictly by generous vertical padding (`120px–180px` desktop) and alternating flat surface tone shifts (`--bg-base` $\leftrightarrow$ `--bg-surface`).
4. **Zero Glassmorphism:** No `backdrop-blur` or translucent acrylic cards.
5. **Zero Resting Drop Shadows:** All canvas surfaces use `shadow-none`. Elevated z-index shadows are reserved exclusively for sliding modal drawers (`Sheet`).
6. **Zero Gradients:** 100% flat, solid color fields with zero neon/rainbow typography.
7. **Zero Emojis:** All iconography is rendered via crisp `1.5px` stroke vector icons from `lucide-react`.
8. **Zero Symmetrical 3-Card Rows:** Asymmetric splits (`65/35`, `60/40`, `7/5`) ensure bespoke editorial density.
9. **Zero Pill Shapes on Controls:** All interactive buttons and tabs use sharp architectural corners (`rounded-brand` = `3px`).
10. **Zero Banned AI Fonts:** Typography is restricted to our locked triad (`Syne` + `Plus Jakarta Sans` + `JetBrains Mono`).
11. **Zero Assistant Palette Colors:** No generic cyan or rust accents; locked to Spec Gold (`#C9973A`).
12. **Zero Generic Template Gimmicks:** No infinite typewriter loops or glowing cursor spotlight borders.

### Color Tokens

| Token                 | Light Theme (Editorial Parchment)    | Dark Theme (Technical Obsidian `.dark`) |
| :-------------------- | :----------------------------------- | :-------------------------------------- |
| **`--bg-base`**       | `#F5F0E8` (Warm Cream Canvas)        | `#0A0A0A` (Deep Near-Black Canvas)      |
| **`--bg-surface`**    | `#ECE5D8` (Secondary Section Canvas) | `#121212` (Secondary Section Canvas)    |
| **`--bg-card`**       | `#FAF7F2` (Elevated Flat Surface)    | `#181818` (Flat Structural Surface)     |
| **`--text-primary`**  | `#0A0A0A` (Near-Black Primary Ink)   | `#F5F0E8` (Cream Primary Ink)           |
| **`--text-muted`**    | `#5A554C` (Warm Charcoal Metadata)   | `#9A948A` (Muted Warm Stone)            |
| **`--accent-gold`**   | `#C9973A` (Signature Spec Gold)      | `#C9973A` (Signature Spec Gold)         |
| **`--border-subtle`** | `rgba(10, 10, 10, 0.10)`             | `rgba(245, 240, 232, 0.12)`             |
| **`--border-focus`**  | `#0A0A0A` (Crisp Focus Outline)      | `#C9973A` (Gold Focus Outline)          |

### Typography Triad

- **Display Headings (`font-display`):** `Syne` (Weights: `700`, `800`) — Architectural, confident proportions.
- **Body & UI (`font-body`):** `Plus Jakarta Sans` (Weights: `400`, `500`, `600`, `700`) — High-density readability.
- **Technical Telemetry & Code (`font-mono`):** `JetBrains Mono` (Weights: `400`, `500`) — Tabular figures and API specs.

---

## 4. Component Architecture Map

All primary page sections are modularly assembled inside `src/routes/index.tsx`:

```
src/
├── components/
│   ├── portfolio/
│   │   ├── NavLedger.tsx          # Persistent top telemetry header & Phnom Penh clock
│   │   ├── Hero.tsx               # Asymmetric 65/35 Hero & 3D tilt portrait node
│   │   ├── SystemCapabilities.tsx # 4-column full-stack architecture matrix
│   │   ├── FeaturedProjects.tsx   # Alternating project rows & Schema Inspector drawer
│   │   ├── ExperienceLedger.tsx   # Trajectory, degree & award credentials ledger
│   │   ├── ContactFooter.tsx      # Terminal email dispatch & telemetry footer
│   │   ├── KineticPrimitives.tsx  # Tabular telemetry counters & spring helpers
│   │   ├── Reveal.tsx             # SSR-safe staggered reveal observer
│   │   └── cv-link.ts             # Canonical resume configuration & inert safety gate
│   └── ui/                        # Headless Radix UI components (sheet, tabs, dialog)
├── lib/
│   ├── motion.ts                  # Centralized Emil Kowalski motion physics engine
│   ├── assets.ts                  # CDN asset pointer registry
│   └── error-page.ts              # Custom architectural 500 fallback template
├── routes/
│   ├── __root.tsx                 # Root layout, theme FOUC script, 404 handler
│   └── index.tsx                  # Master single-page editorial assembly
└── test/                          # Comprehensive Vitest regression test suite
```

---

## 5. Asset & Resume Replacement Guide (For Sary Danish)

### A. Updating Your Portrait Photo

- **File Location:** `src/assets/danish-photo.jpg`
- **Recommended Specs:** Aspect ratio `1:1` or `4:5`, resolution at least `800x800px`.
- **Note:** The photo is automatically rendered with an editorial grayscale filter that transitions smoothly to full color upon mouse hover.

### B. Updating Project Preview Screenshots

Project screenshots are registered in `src/lib/assets.ts` and managed via CDN asset pointer JSON files:

- **Bookly Screenshot:** `src/assets/project-bookly.jpg.asset.json`
- **Loomora Screenshot:** `src/assets/project-loomora.jpg.asset.json`
- **Driving Rules Screenshot:** `src/assets/project-driving.jpg.asset.json`
- To point to a new local or CDN image, edit the `src` URL in `src/lib/assets.ts` or replace the pointer JSON targets.

### C. Updating Your Resume / CV Link

1. Place your finalized resume PDF in the public directory:
   ```
   public/sary-danish-cv.pdf
   ```
2. Open `src/components/portfolio/cv-link.ts` and update `CV_HREF`:
   ```ts
   // To activate resume download:
   export const CV_HREF = "/sary-danish-cv.pdf";
   ```
3. When `CV_HREF = "#"`, all CV action buttons in the navigation bar and hero stay inert with `aria-disabled="true"` to prevent broken downloads. Once set to a valid URL, they automatically open the PDF in a new tab.

---

## 6. Local Development, Testing & Verification

### Prerequisites

- Node.js `v20.x` or later (or Bun `v1.1+`)
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/danishsary8/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
# Start local Vite development server with hot module reload
npm run dev
```

### Automated Test Suite

```bash
# Run full Vitest regression suite (all 14 tests)
npm test
```

### Code Formatting & Linting

```bash
# Verify ESLint code quality across src/
npm run lint

# Format codebase with Prettier
npm run format
```

### Production Build

```bash
# Compile client and Nitro Cloudflare SSR distribution bundles
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Production Projects Showcased

1. **Bookly Platform:**
   - E-commerce bookstore with decoupled Laravel REST API, PostgreSQL database modeling, and React/TypeScript frontend.
   - Live Application: [https://bookly-frontend-five.vercel.app/](https://bookly-frontend-five.vercel.app/)
   - API Docs: [https://bookly-api-zasc.onrender.com/docs](https://bookly-api-zasc.onrender.com/docs)
2. **Diabetes Expert System:**
   - Full-stack clinical assistance prototype with bilingual EN/Khmer interface, JWT RBAC, and deterministic rule-based evaluation.
   - Winner of Norton University AI Competition 2026.
   - Live Application: [https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/](https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/)
3. **Loomora Habit Planner:**
   - Full-stack personal routine scheduling and streak tracking application.
   - Live Application: [https://daycraft-vnid.onrender.com/](https://daycraft-vnid.onrender.com/)
4. **Driving Rules App:**
   - Cross-platform theory evaluation and Cambodian road regulation question bank engine built with Flutter & Dart.
   - Live Application: [https://drivingruletest.netlify.app/](https://drivingruletest.netlify.app/)
