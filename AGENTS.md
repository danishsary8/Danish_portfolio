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

## 0. Agent Operating Protocol (read first, every task)

Context is the scarcest resource. These rules keep each task focused, cheap, and consistent.

### A. Scope discipline
1. **One task, one target.** Before starting, state the target file(s) and the single goal in one line. Anything outside that list is out of scope unless the user adds it.
2. **Read narrowly.** Read the target file and only its direct imports when needed. No repo-wide `grep`/`glob` sweeps, no re-reading files already in context, no reading `src/routeTree.gen.ts` (generated).
3. **This file is the design authority.** Do not re-derive tokens, fonts, or rules from CSS/components when §2–§4 already state them. Content comes only from §5; never invent copy or claims.
4. **Edit in one pass.** Plan the full change, then write it. No incremental screenshot/tweak loops.
5. **Reserved files stay untouched** unless the active phase names them (see §0.D).

### B. Skill routing (use the smallest skill that fits)

| Need | Skill | Notes |
| --- | --- | --- |
| Find/install a capability not yet available | `/find-skills` | Install with `npx -y skills add <repo> -y` (non-interactive). Skills live in `.agents/skills/`, symlinked into `.claude/skills/`. |
| Multi-file or multi-phase work | `/planning` | Split into small vertical slices; each slice ends green (tsc + tests). |
| Any UI build, redesign, polish, audit | `/impeccable` | Windows launcher: `.claude/skills/impeccable/scripts/impeccable.cmd`. Run `context --target <file>` once per session, `detect --json <file>` once after edits. Product truth is in `PRODUCT.md`; design authority is this file. |
| Aesthetic direction for a new layout | `/frontend-design`, `/taste-skill` | Only for new surfaces; refinements follow §2 directly. |
| Codebase questions / onboarding | `/understand`, `/understand-explain`, `/understand-diff` | Prefer over manual broad scans. `understand-dashboard` and `understand-figma` were flagged High Risk at install — do not run without user approval. |

### C. Verification (mandatory before reporting done)
- Run `npx tsc --noEmit` then `npm test -- --run`. All tests must pass (currently 17).
- Tests assert visible copy (e.g. Hero must render the text `Junior Web Developer`, `Phnom Penh`, an `Email me` mailto link, a `View projects` link to `#projects`, and a GitHub link). Do not rename these strings.
- Report honestly: what changed, what was verified, what was not (e.g. no browser check).
- Shell is Windows PowerShell 5.1: chain with `;` + `if ($?) { … }`, not `&&`.

### D. Phase log (update when a phase completes)
Product truth lives in `PRODUCT.md` (from the CV `public/sary-danish-cv.pdf`).

**Autonomous mode (owner request):** do not stop for approval between phases or steps. Plan → build → verify (tsc + tests + screenshots) → fix → move on, then report once at the end with what changed and what was not verified. Ask only when a fact is missing from the CV/PRODUCT.md or a choice is irreversible. Work directly on `main` (owner request: no feature branches or PRs). When a change is done and verified, commit and push to `main`; Vercel deploys `main` automatically. Never force-push or rewrite pushed history (Lovable note at top).

1. **Hero** (`Hero.tsx`, `PortraitCard.tsx`): approved, then refined to 9/10. "Open to Web Developer roles" pill + split-flap Phnom Penh clock (status dot pings 3 times, then rests; `.hero-clock` flattens the tiles: no hinge, tile edge or text shadow, 16px whole-pixel tiles so digits have no seam); per-letter CSS blur-rise name at `clamp(60px, 9.6vh, 92px)` / -0.045em; on desktop the name/card grid fills exactly one screen below the nav (`lg:min-h-[100dvh]`) and the proof strip starts at the fold (click swaps the gold word); role line "Junior Web Developer" at 22–26px semibold (owner: bigger, more visible) + muted "4th-year Software Development student" line under it (owner request); pitch (owner wording, no project names): lead "Hands-on experience building full-stack web apps that actually work in the real world." (owner dropped "4 live today") (18–20px, fg) + "I build responsive React front ends on secure Laravel REST APIs and PostgreSQL, with real sign-in through JWT, OTP and Google OAuth, and code that stays clean and maintainable." Kept to ~3 lines so the core stack stays above the fold (measured: 72–162px spare at 1280×720, 1366×768, 1536×730, 1440×900, 1903×917; CTAs mt-7, stack mt-6) (owner asked to drop Flask from the hero and core stack); **skeuomorphic hero layer (owner request; `.skeuo-key`, `.skeuo-key-ink`, `.skeuo-well`, `.skeuo-gloss` in `styles.css`, hero only)**: physical keys lit from above with an inset bottom edge that sink 1px on press: glossy ink `Email me` (mailto; white key in dark), light `View projects` (#projects), round GitHub key (`aria-label="GitHub profile"`; the hero Telegram key was removed by owner request, Telegram stays on the card); hover (owner request, `(hover: hover) and (pointer: fine)` only): each `.btn-apple.skeuo-key*` rises 1.5px with a deeper shadow and a light band sweeps once across the cap (`::before`, clipped by the key, 750ms `--ease-out`); Email me's envelope tips -10° and up 1px, View projects' arrow slides 4px, the GitHub mark tilts -8° and scales 1.1; pressing a hovered key still sinks it; reduced motion drops the lift, sweep and icon motion; the clock digits sit in an engraved `.skeuo-well`; core-stack chips are keycaps; proof chips removed (owner request; the proof strip below still carries "4 live projects" and the award); React Bits LogoLoop of the 7 core-stack chips kept by owner request (reuse `src/components/ui/LogoLoop.tsx`; do not reinstall via shadcn); **"At a glance" widget shelf below (owner redesign; replaces the path strip and the boxed proof cells):** four iOS-style widgets (`.tactile` squircles, r 22) on a `1.55fr 1fr 1fr 1fr` grid (2 columns on sm, stacked on phones), each with its own micro-visual and only glanceable facts the sections below do not repeat: **Live now** (pulsing dot, "4 apps", a status-page list of the 4 apps from `PROJECTS` with their hosts; each row opens the live site), **Intern** (ETEC & KruITSolution, an M–S week strip with the weekend keys lit, "Weekends · since Jul 2026", links #experience), **Award** (the only gold widget, "AI Expert System & Innovation 2026", "Team winner · Sep 2026", links #education), **Studying** (Software Development, Norton University, a 2024 → 2025 → 4th-year track with a pulsing now dot, links #education). Link widgets lift on hover and show an arrow; mobile avatar. `PortraitCard` (Apple-style creator card, up to 312×460 (owner: smaller to fit the hero), always dark): the whole portrait at card width (398px tall) fading into a navy `#0c1527` footer strip, name centred in the photo's blue headroom (Plus Jakarta Sans 28px bold, -0.02em, leading 1.05 via `font-poster`, sized to the 312px card; owner choice after trying Instrument Serif and Bricolage Grotesque; soft navy text shadow: Contact Poster feel) with a frosted role capsule (gold available dot + "Junior Web Developer", owner request; tests expect the role twice: hero line + card); footer is one quiet row (owner: tiles + full-width button looked heavy): Phone (`tel:`) and Telegram (@sarydanish) as two stacked 14px text links on the left (real app marks, owner request: Phone = iOS green #34C759 disc with a white handset; Telegram = #26A5E4 disc with the white plane), a compact white `View profile` capsule (40px, semibold) on the right that opens the lanyard modal. **Flip card (owner request, skeuomorphic):** click anywhere on the card to turn it 180° on Y (700ms `--ease-in-out`; instant under reduced motion); clicks on its links and buttons do not flip. No visible flip icon (owner request); keyboard users get an `sr-only` "Flip card" / "Flip back" button that shows as a small pill on focus, and focus follows to the other face. Back = the back of a real card on matte navy card stock (`.card-stock`): edge-to-edge magnetic stripe (`.card-magstripe`); guilloche signature panel (`.card-sigpanel`) holding the owner's real handwritten signature (`src/assets/signature.png`, `ASSETS.profile.signature`, blue ink on white, shown with `mix-blend-multiply` so the paper drops out) + "Authorized signature"; printed card data as plain text (ID No. B20235079, email, phone, github.com/danishsary8: plain text so the Hero test still finds one phone link and one GitHub link) beside a scannable Telegram QR (`src/assets/telegram-qr.ts`, generated once with segno, error correction M, version 2, 25×25, for https://t.me/sarydanish; decoded and verified with jsQR at 10, 3 and 2 px/module; regenerate if the handle changes); fine print "The holder builds full-stack web apps with secure REST APIs, using React, Laravel and PostgreSQL. Designed by Danish in Cambodia."; bottom: gold "2026 Award Winner · Team" and the holographic foil "SD" (`.card-holo`). The hidden face is `inert` and swaps `visibility` at the 350ms midpoint (Chrome paints composited children through `backface-visibility`). Never put "Phnom Penh", the role or an extra GitHub/email link on the back (tests). Front wrapped in React Bits `GlareHover` (reuse `src/components/ui/GlareHover.tsx`, never reinstall; owner config: hover, streak, #fff, opacity 0.5, size 30, softness 0.6, angle -45, screen, rimGlint, 650ms). Stats row, bio line, copy-email and the Bookly Live Activity were removed for the cleaner look. Never repeat "Phnom Penh" or "Email me" in the card; no school name; no fake "verified" tick. Layout polish (owner approved): the hero grid uses `lg:content-center` and the card column `lg:self-start`, so the card top lines up with the status pill at every desktop width; from 90rem (1440px) the card column widens to 460px with the card at its start (`min-[90rem]:grid-cols-[minmax(0,1fr)_460px]`, gap 48px) so the card sits closer to the text with balanced space on both sides. Use rem breakpoints here: px arbitrary breakpoints do not order against lg/xl. 1366×768 is unchanged (card left 906, gap 96). First load (CSS only): name letters rise → card settles (`.enter-settle`, scale 0.97 + blur 4px, 600ms `--ease-out`); reduced motion = fades only. Gold only on the name highlight, status dot and award cell (primary button is ink: `.btn-apple-ink`).
2. **Profile modal** (`ProfileModal.tsx`, `badge-texture.ts`): approved. Lanyard stage on tokens, CV-true copy, 2×2 hairline facts panel, capsule actions (copy email, Telegram, GitHub); badge texture shows real handles instead of invented ID text.
3. **Navigation** (`SiteNav.tsx`): otherwise untouched by owner request. Brand mark is the "DANISH" wordmark (owner request, after trying an SD monogram): `PROFILE.shortName` uppercased, Plus Jakarta Sans 800 (`font-poster`), 17–18px, tracking 0.14em, `.nav-wordmark` = solid `--fg` with a crisp letterpress shadow (1px highlight + tight 2–4px shadow, no blur halo); link `aria-label="Sary Danish, back to top"`. The old GradientText wordmark and its `.nav-brand-text` drop-shadows (the smudge) were removed. Favicon set replaced Lovable's with the same SD tile: `public/favicon.ico` (16/32/48 PNG entries), `public/icon-192.png`, `public/apple-touch-icon.png` (full-bleed square; iOS rounds it), linked in `__root.tsx`.
4. **About** (`About.tsx`): approved. Pull quote from bio, CV-true paragraphs, "How I work" hairline list.
5. **Skills** (`Skills.tsx`): approved. One tactile panel, 4 hairline columns, brand-coloured icons (`themedSkillColor`), CV soft skills line.
6. **Projects** (`Projects.tsx`): approved, then upgraded to a stacked deck. Desktop: each `<li>` pins (`lg:sticky`, top offset +18px per card); card N recedes (`.deck-card`, scale 0.94 + `--deck-dim`) driven by card N+1's view timeline via `timeline-scope` on the `<ol>`. Scroll-driven CSS only; plain stacking where unsupported; off under reduced motion; normal list on phones. Section titles rise from a mask (`.mask-rise`). Skills groups dim siblings on hover (desktop). Screenshots use Lovable `/__l5e/` asset URLs (404 on localhost).
7. **Experience** (`Experience.tsx`): approved. Real timeline; `.timeline-rail` draws on reveal.
8. **Education** (`Education.tsx`): approved. Tactile degree panel + courses & awards ledger.
9. **Contact + footer** (`Contact.tsx`): approved. React Bits `VariableProximity` closing headline (Geist loaded as variable 100..900), iOS grouped contact list, form.
10. **Global pass**: approved. Copy de-duplicated across sections (each phrase appears once; paraphrases elsewhere). `/design-system` synced: light tokens, Apple layer section (capsules, glass pill, tactile chips, squircle radii, proof row, browser frame, timeline nodes). Touch targets ≥44px on phones. Open: chatbot button overlaps content on phones.
11. **iOS polish pass** (laptop first; `styles.css` + every section): owner asked for an expensive, iOS-flavoured finish. Elevation tokens `--elev-1..3`, top `--sheen` on cards, glossy icon tiles (`.icon-tile` ink, `.icon-tile-gold` awards only, `.icon-tile-light` brand/neutral), recessed `.field` inputs (unlayered so it beats the shadcn Input utilities), one glossy ink tint for every primary button (`.btn-apple-primary` = `.btn-apple-ink`; gold buttons retired). About "How I work", Education courses and the Contact list are iOS inset-grouped cards; the Experience entry sits on a raised card; soft skills and "Worked with" are chips. `/design-system` shows the elevation scale, tiles and field. Responsive pass still to do.

**Shared:** `SECTION` + `SectionHeader` in `Reveal.tsx` (title left, lede right). Content fixed to CV: no TypeScript/SQLite claims, Loomora has no "streaks", award organiser not stated.

**Decisions:** role title "Junior Web Developer" (full-stack shown in pitch); availability "Open to Web Developer roles"; audience = local hiring teams in Phnom Penh; no TypeScript claim (not on CV).

### E. Output style
- No narration of options you will not pursue. Final report: short bullets of changes + verification result.
- Work on `main`; commit and push finished, verified work there (owner request). Never rewrite pushed history (see Lovable note above).

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
5. **iOS elevation, never hard shadows (owner request):** Cards and controls sit on the soft layered scale: `--elev-1` resting cards (`.tactile`), `--elev-2` hover and floating chips (`.lift`, Live Activity), `--elev-3` the portrait and project cards (`.frame-float`). Light-mode shadows are warm-tinted, dark-mode shadows are deep black. `--shadow-float` stays for dialogs and sheets. No zero-blur or coloured-glow shadows.
6. **No gradient typography:** Text is always a solid token colour.
7. **ZERO Emoji Icons:** Use `lucide-react` (1.5px stroke) or Simple Icons brand marks from `react-icons/si`.
8. **ZERO Symmetrical 3-Card Feature Rows:** No row of three equal icon-topped cards. Prefer lists, hairline grids, and asymmetric columns.
9. **Radius scale:** 12px panels/cards, 8px buttons/inputs, 6px badges/chips. `rounded-full` only for the status dot and the avatar.
10. **Fonts:** Geist and Geist Mono (plus Kantumruy Pro for Khmer). **Exception (owner request):** Plus Jakarta Sans (`--font-poster` / `font-poster`) for the name on the hero portrait card only. Never `Cormorant`, `Playfair Display`, `Space Grotesk`, `DM Sans`, or `Inter`.
11. **Monochrome + one accent:** Gold (`--gold` / `--gold-ink`) is reserved for the status dot, award markers, and gold text. No terracotta, rust, indigo, violet, or cyan. **Exception (owner request):** tech-stack brand marks may use their real brand colour (`getSkillColor`) on the icon and as a faint hover tint; never on text or glows.
12. **Apple layer (owner request, Hero first):** use the classes in `styles.css`, never ad-hoc values. `.squircle` + `--r` for continuous corners (progressive `corner-shape`); `.glass-pill` frosted capsule only where it floats over the hero glow; `.tactile` (specular top edge + inner shade) for chips, frames, secondary controls; `.btn-apple-primary` / `.btn-apple-secondary` for buttons (specular edge + `--shadow-contact`, `scale(0.97)` press). Contact shadows ≤2px are allowed on these controls; large shadows stay floating-only. Data rows/ledgers stay flat. Legacy `.ios-glass-*` belongs to nav/chatbot — don't reuse it for new work.
13. **ZERO Template Gimmicks:** No typewriter loops, cursor-following glow borders, particles, or rainbow shaders.

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
| `--bg`          | `#FAF9F6`            | `#0A0A0B`               | Page canvas               |
| `--surface-1`   | `#F3F2EE`            | `#111113`               | Panels, hovered rows      |
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
- **Telegram:** `@sarydanish`
- **Exact Bio (blended from CV + prior site copy):**
  > "My name is Sary Danish, a fourth-year Software Development student at Norton University, Phnom Penh, Cambodia. I build real web applications with React, Laravel, and PostgreSQL — including an online bookstore, a habit planner, and a bilingual clinical expert system — with secure APIs using JWT, OTP verification, and Google OAuth. I focus on responsive interfaces and clean, scalable, maintainable code, and enjoy turning real problems into working software. My goal is to grow into a skilled Full-Stack Developer, building complete, real-world applications that are genuinely useful to people."
- **Tech Stack:**
  - Languages & Fundamentals: JavaScript (ES6+), PHP, Java, Python, HTML5, CSS3
  - Frameworks & UI: React, Tailwind CSS, Bootstrap, Framer Motion, Laravel, Flask
  - Databases & Storage: PostgreSQL, Supabase, SQLite, Oracle
  - Tools & Workflow: Git, GitHub, REST APIs, JWT Authentication, Docker, Cloudinary, Postman
- **Experience:**
  - **Web Developer Trainee Intern (Weekends)** — ETEC & KruITSolution — July 2026 – Present — Phnom Penh, Cambodia. Web developer on a team tour booking platform, building UI dashboards and fetching/integrating REST APIs. Collaborated via Git/GitHub using feature branches, commits, and pull requests. Coordinated API requirements with backend teammates and shared ideas in team discussions.
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
