# CLAUDE.md

Personal portfolio of **Sary Danish** (goes by Danish), a Junior Web Developer in Phnom Penh. Its job is to land a Web Developer role: a recruiter should understand his level, stack and shipped work within one screen, then open a live project or GitHub and get in touch.

- **Design authority and phase log:** `AGENTS.md` (imported below). Read §0 before any task.
- **Product truth and copy:** `PRODUCT.md` and the CV at `public/sary-danish-cv.pdf`. Never invent copy, claims, metrics or links.

@AGENTS.md

## Commands

```bash
bun install            # package-lock.json is out of sync with package.json, so `npm ci` fails; bun works
npm run dev            # Vite dev server (TanStack Start)
npx tsc --noEmit       # typecheck
npm test -- --run      # Vitest, must stay 100% green
npm run lint           # ESLint
npm run build          # production build
```

Do not commit lockfile changes made only to get a local install working.

## Stack

React 19 · TanStack Start + TanStack Router (file routes in `src/routes/`) · Tailwind CSS v4 (tokens and the Apple layer live in `src/styles.css`) · shadcn/ui (Radix) · Framer Motion · React Bits components · lucide-react + react-icons/si · three.js (lanyard) · Vitest + Testing Library. Built and hosted through Lovable (`@lovable.dev/vite-tanstack-config`).

## Where things live

| Path | What it holds |
| --- | --- |
| `src/routes/index.tsx` | Home page: composes the sections in order |
| `src/routes/design-system.tsx` | Live `/design-system` showcase; keep it in sync with real tokens and classes |
| `src/routes/__root.tsx` | Document shell, fonts, the inline `html.js` script |
| `src/components/site/` | One file per section: `Hero`, `PortraitCard`, `About`, `Skills`, `Projects`, `Experience`, `Education`, `Contact` (+ `SiteFooter`), `SiteNav`, `ProfileModal` (3D lanyard), `Reveal` (scroll reveal, `SECTION`, `SectionHeader`) |
| `src/components/ui/` | shadcn primitives plus React Bits components (`LogoLoop`, `SplitFlapText`, `VariableProximity`, `Lanyard`, …). Reuse these; do not reinstall them (local edits would be lost) |
| `src/content/portfolio.ts` | All structured content: `PROFILE`, `PROJECTS`, `SKILL_GROUPS`, `EXPERIENCE`, `EDUCATION`, `CERTIFICATES` |
| `src/lib/` | `assets.ts` (photo, project shots, CV path), `use-theme`, `use-local-time`, `motion.ts` springs, `cv-link` |
| `src/styles.css` | Theme tokens (light `:root`, dark `.dark`), elevation `--elev-1..3`, `--sheen`, Apple layer classes, keyframes |
| `src/test/` | `portfolio.test.tsx` asserts visible copy; `app-routing`, `cv-link` |

## Rules that bite

- **Styling:** use the existing classes, never ad-hoc shadows or colours: `.tactile`, `.frame-float`, `.lift`, `.squircle` + `--r`, `.icon-tile` / `.icon-tile-gold` / `.icon-tile-light`, `.btn-apple` + `.btn-apple-primary` / `.btn-apple-secondary`, `.field`. Gold is only for the status dot, the name highlight and awards.
- **Tests assert copy.** Hero must render `Junior Web Developer` and `Phnom Penh` exactly once each, an `Email me` mailto link, a `View projects` link to `#projects`, and a GitHub link. Change a test only when the owner asks for that copy change.
- **SSR safety:** content must read without JavaScript. First-load motion is CSS (`.enter`, `.enter-settle`); scroll reveals hide content only under `html.js`. No inline `opacity: 0`.
- **Motion:** transform / opacity / blur only, `--ease-out` curves, reduced-motion variants ship with every animation, pointer effects only for `(hover: hover) and (pointer: fine)`.
- **Content facts:** no TypeScript claim; Flask is not mentioned in the Hero or its core stack (owner request); never repeat "Phnom Penh", the role title or "Email me" inside the portrait card (tests expect each once). No invented badges such as a "verified" tick.

## Before reporting work done

1. `npx tsc --noEmit` and `npm test -- --run` pass.
2. For UI work, look at the rendered page (Playwright + Chromium) at 1440×900 and 1366×768 in light and dark. Phone and tablet passes are still to do (see the phase log).
3. Run the Impeccable detector on changed UI files: `sh .claude/skills/impeccable/scripts/impeccable detect --json <files>`.
4. Update the matching entry in `AGENTS.md` §0.D.
5. Report what changed, what was verified, and what was not.

## Git and deploys

- **Work directly on `main`** (owner request): no feature branches, no pull requests. When a change is done and verified (see the checklist above), commit and push to `main`.
- The live site is Vercel project `danish-portfolio` (https://danish-portfolio-nine.vercel.app). It redeploys automatically on every push to `main`, in about 30 seconds.
- The repo was created from Lovable. Never force-push, rebase, amend or squash pushed commits. The Lovable project is currently not syncing from this repo, so its preview is stale.
- Keep `index.html` out of the repo root: Nitro would use it as the renderer template and Vercel would serve an empty page.

## Environment notes

- The owner works on Windows PowerShell 5.1 (chain with `;` and `if ($?) { … }`); cloud sessions run Linux bash.
- Locally, project screenshots (`/__l5e/` Lovable asset URLs) 404 and the Devicon logos (jsDelivr) may be blocked by a sandbox proxy. Neither is a code bug.
