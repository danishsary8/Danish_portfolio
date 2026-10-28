# AI Agent Handoff & Architecture Guide

> **To Claude Code, Kiro, Cursor, or any incoming AI coding agent:**
> Read this document first alongside `AGENTS.md` and `PRODUCT.md`. It explains exactly what has been completed, how the architecture works, and the workflow for picking up the **About** section and subsequent features.

---

## 1. Project & Profile Summary
- **Developer:** Sary Danish (goes by Danish)
- **Role Title:** `Junior Web Developer` (4th-year Software Development student at Norton University, Phnom Penh)
- **Status / Availability:** `"Available for Full-time Work"` (used in Hero & ProfileModal)
- **Core Stack (from authentic CV):** React, JavaScript, Laravel, PHP, PostgreSQL, Tailwind CSS, Docker
- **Product Truth Authority:** `PRODUCT.md` and `public/sary-danish-cv.pdf`. **Never invent copy, claims, awards, metrics, or technologies not in the CV.**

---

## 2. Completed & Approved Modules (Do Not Break)

### A. Hero (`src/components/site/Hero.tsx`, `PortraitCard.tsx`)
- Status pill: `"Available for Full-time Work"` with pinging gold dot.
- Split-flap live Phnom Penh clock with whole-pixel tiles in an engraved skeuomorphic well (`.skeuo-well`).
- Skeuomorphic hero action buttons: `.btn-apple.skeuo-key-ink` ("Email me"), `.btn-apple.skeuo-key` ("View projects", round GitHub key).
- Core tech stack LogoLoop marquee.
- Apple-style 3D flip card (`PortraitCard.tsx`):
  - **Front:** Portrait fading into navy `#0c1527`, frosted role capsule, phone and Telegram links, and "View profile" button that opens `ProfileModal`. Wrapped in `GlareHover`.
  - **Back:** Authentic magnetic stripe, guilloche signature panel with Danish's real handwritten signature (`ASSETS.profile.signature`), Telegram QR, and holographic foil.
  - Clicks flip card 180° on Y; accessible `sr-only` flip button for keyboard navigation.

### B. Profile Modal (`src/components/site/ProfileModal.tsx`, `Lanyard.tsx`, `badge-faces.ts`)
- **Lag-Free Delayed Drop:** Opening the modal plays the smooth dialog scale/fade animation first without lag. After **450ms**, the 3D `<Lanyard>` mounts with `intro="drop"`, dropping the badge into view with spring bounce.
- Satin finish lanyard, clear acrylic badge case, high-DPI canvas textures for front/back badge faces.
- Status pill matches Hero: `"Available for Full-time Work"`.
- Pull-quote goal statement from `PROFILE.goal`, plus authentic details ID data page (Address, Date of birth, Languages, contact console).

### C. Navigation (`src/components/site/SiteNav.tsx`)
- Solid "DANISH" wordmark with crisp letterpress shadow.
- Theme switcher (light/dark mode) with SSR-safe CSS variables.

### D. Jarvis Assistant (`src/components/JarvisChat.jsx`, `ChatbotWidget.tsx`)
- Fully tested with 22 streaming / failover tests in `src/test/jarvis.test.tsx`.
- Keep clean and free of experimental mascots.

---

## 3. Next Target: About Section (`src/components/site/About.tsx`)

This is the primary section assigned to **Claude Code** and **Kiro** for further iteration.

### Structure of `About.tsx`:
1. **Section Header:** Standardized `<SectionHeader id="about-title" title="About" lede="Who I am, what I build, and where I’m heading next." />`.
2. **Left Column:**
   - Editorial pull-quote from Danish's philosophy.
   - Authentic Identity & Milestone ledger (Norton University 4th year, KruITSolution internship, AI Competition winner).
3. **Right Column:**
   - How I work / Engineering practices (Responsive & intuitive UI, secure APIs & auth, clean architecture).
   - Core stack badges & live project jump links.

### Guidelines for Claude Code / Kiro in About:
- **Design Tokens:** Always use existing CSS utility classes:
  - Surfaces: `bg-surface-1`, `bg-surface-2`, `border-line`
  - Tactile depth: `.tactile`, `.squircle`, `--elev-1`, `--elev-2`, `--sheen`
  - Typography: Geist Sans, Geist Mono for metadata/labels (`font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle`).
- **No Clutter:** No generic SaaS 3-column cards, no emojis, no rainbow glows.
- **Copy Truth:** Maintain exact correspondence with `PRODUCT.md` and CV facts.

---

## 4. Verification Workflow (Mandatory)

Before finishing any edit or reporting done:
1. **Type Check:**
   ```bash
   npx tsc --noEmit
   ```
2. **Unit & Integration Tests:**
   ```bash
   npm test -- --run
   ```
   **All 39 tests must pass!**
   - Tests assert specific copy in Hero (`Junior Web Developer`, `Phnom Penh`, `Email me`, `View projects`, GitHub link). Do not alter or delete these required test anchors.
3. **Git Protocol:**
   - Work on `main`.
   - Never force-push or rewrite pushed git history (connected to Lovable and Vercel auto-deploy).
