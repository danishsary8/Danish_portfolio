import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, Award, Check, FileText, Github, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlareHover } from "@/components/ui/GlareHover";
import { PROJECTS, type Project } from "@/content/portfolio";
import { useTheme } from "@/lib/use-theme";
import { Reveal, SECTION, SectionHeader } from "./Reveal";
import { SkillIcon, hasSkillIcon, themedSkillColor } from "./SkillIcon";

// Deck order: flagship first, award second, then the two lighter apps.
const ORDER: Project["id"][] = ["bookly", "diabetes", "loomora", "driving"];

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

const host = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

/** Safari-style window chrome: the real live URL, so the frame states a fact. */
function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="tactile squircle [--r:18px] w-full overflow-hidden whitespace-normal">
      <div className="flex h-10 items-center gap-3 border-b border-[var(--edge)] bg-surface-1 px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
          ))}
        </span>
        <span className="mx-auto flex h-6 min-w-0 max-w-[70%] items-center gap-1.5 rounded-[7px] bg-surface-2 px-2.5 font-mono text-[11.5px] text-fg-subtle">
          <Lock aria-hidden="true" strokeWidth={1.75} className="h-3 w-3 shrink-0" />
          <span className="truncate">{host(url)}</span>
        </span>
        <span aria-hidden="true" className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

function ProjectShot({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // An image that errored before hydration never fires React's onError. Only an image that
  // has actually finished (complete with a resolved currentSrc) and has no pixels counts.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.currentSrc && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!project.image || failed) {
    if (project.id !== "diabetes") {
      return (
        <div className="grid aspect-[16/10] place-items-center bg-surface-1">
          <span className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-[-0.04em] text-fg-subtle">
            {project.title}
          </span>
        </div>
      );
    }
    // No screenshot: say what the product is, in both of its languages.
    return (
      <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-surface-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_45%,var(--glow),transparent_70%)]"
        />
        <div className="relative text-center">
          <p className="text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-fg">
            EN <span className="text-fg-subtle">/</span>{" "}
            <span lang="km" className="font-khmer">
              ខ្មែរ
            </span>
          </p>
          <p className="mt-4 text-[13.5px] text-fg-muted">Early diabetes screening</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] overflow-hidden bg-surface-1">
      <img
        ref={imgRef}
        src={project.image}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        width={1600}
        height={1000}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]"
      />
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <GlareHover
      glareColor="#ffffff"
      glareOpacity={0.18}
      variant="sheen"
      borderRadius="18px"
      transitionDuration={900}
      width="100%"
      className="block w-full max-w-full"
    >
      <BrowserFrame url={project.liveUrl}>
        <ProjectShot project={project} />
      </BrowserFrame>
    </GlareHover>
  );
}

function StackChips({ stack, dark }: { stack: string[]; dark: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {stack.map((s) => (
        <li
          key={s}
          className="squircle [--r:7px] inline-flex h-7 items-center gap-1.5 border border-[var(--edge)] bg-surface-1 px-2.5 text-[12.5px] text-fg-muted"
        >
          {hasSkillIcon(s) ? (
            <SkillIcon name={s} className="h-3.5 w-3.5" style={{ color: themedSkillColor(s, dark) }} />
          ) : null}
          {s}
        </li>
      ))}
    </ul>
  );
}

function Actions({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${project.title} (live site)`}
        className={`btn-apple btn-apple-primary group/live inline-flex h-11 items-center sm:h-10 gap-1.5 rounded-full px-4 text-[13.5px] font-medium ${FOCUS}`}
      >
        Live site
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover/live:-translate-y-px group-hover/live:translate-x-px"
        />
      </a>
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`${project.title}: view details`}
        className={`btn-apple btn-apple-secondary inline-flex h-11 items-center rounded-full px-4 sm:h-10 text-[13.5px] font-medium ${FOCUS}`}
      >
        Details
      </button>
    </div>
  );
}

function ProjectTitle({ project, size }: { project: Project; size: "lg" | "md" }) {
  return (
    <div>
      <p className="text-[13px] text-fg-subtle">{project.kind}</p>
      <h3
        className={`mt-2 flex flex-wrap items-center gap-3 font-semibold tracking-[-0.03em] text-fg ${
          size === "lg" ? "text-[30px] leading-[1.1] lg:text-[34px]" : "text-[24px] leading-[1.15]"
        }`}
      >
        {project.title}
        {project.award ? (
          <span
            role="img"
            aria-label="Award winner"
            title={project.award}
            className="squircle [--r:8px] inline-flex h-7 items-center gap-1.5 bg-gold px-2.5 text-[12px] font-medium tracking-normal text-white dark:text-bg"
          >
            <Award aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
            <span aria-hidden="true">Award 2026</span>
          </span>
        ) : null}
      </h3>
    </div>
  );
}

/**
 * One card in the stacked project deck. On desktop each card pins near the top; the next card
 * slides over it while this one recedes (CSS scroll-driven, see .deck-* in styles.css).
 */
function DeckCard({
  project,
  index,
  last,
  onOpen,
  dark,
}: {
  project: Project;
  index: number;
  last: boolean;
  onOpen: (p: Project) => void;
  dark: boolean;
}) {
  const flip = index % 2 === 1;
  // The <li> pins (its parent is the whole list, so every card stays stuck until the deck ends).
  // Card N recedes while card N+1 rises: N+1's view timeline (--deck-N) drives N's animation.
  const slotStyle = {
    top: `calc(104px + ${index * 18}px)`,
    ...(index > 0 ? { viewTimeline: `--deck-${index - 1} block` } : {}),
  } as CSSProperties;
  const cardStyle = (last ? {} : { "--deck-tl": `--deck-${index}` }) as CSSProperties;
  return (
    <li className={`lg:sticky ${last ? "" : "pb-10 lg:pb-[16vh]"}`} style={slotStyle}>
      <article
        className={`${last ? "" : "deck-card"} group tactile frame-float squircle [--r:28px] bg-surface-2 p-5 sm:p-7 lg:p-9`}
        style={cardStyle}
      >
        <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
            <ProjectVisual project={project} />
          </div>
          <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
            <ProjectTitle project={project} size="lg" />
            <p className="mt-4 text-pretty text-[15.5px] leading-[1.65] text-fg-muted">
              {project.summary}
            </p>
            <div className="mt-6">
              <StackChips stack={project.stack} dark={dark} />
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <Actions project={project} onOpen={onOpen} />
              <span className="inline-flex items-center gap-2 font-mono text-[12px] text-fg-subtle">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                Live · {project.hosting}
              </span>
            </div>
          </div>
        </Reveal>
      </article>
    </li>
  );
}

const dialogLink =
  "btn-apple inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium";

function ProjectDetails({ project, dark }: { project: Project; dark: boolean }) {
  return (
    <>
      <DialogHeader className="pr-10">
        <DialogTitle className="text-[24px] tracking-[-0.03em]">{project.title}</DialogTitle>
        <DialogDescription>
          {project.kind} · {project.hosting}
        </DialogDescription>
      </DialogHeader>
      <BrowserFrame url={project.liveUrl}>
        <ProjectShot project={project} />
      </BrowserFrame>
      {project.award ? (
        <p className="inline-flex w-fit items-center gap-2 text-[13.5px] font-medium text-gold-ink dark:text-gold">
          <Award className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {project.award}
        </p>
      ) : null}
      <p className="text-[15px] leading-[1.6] text-fg-muted">{project.summary}</p>
      <ul className="grid gap-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-[14px] leading-[1.5] text-fg">
            <Check
              className="mt-[3px] h-4 w-4 shrink-0 text-gold-ink dark:text-gold"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>
      <StackChips stack={project.stack} dark={dark} />
      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open the live ${project.title} site`}
          className={`${dialogLink} btn-apple-primary ${FOCUS}`}
        >
          Live site
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className={`${dialogLink} btn-apple-secondary ${FOCUS}`}
        >
          <Github className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Source
        </a>
        {project.apiDocsUrl ? (
          <a
            href={project.apiDocsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} API documentation`}
            className={`${dialogLink} btn-apple-secondary ${FOCUS}`}
          >
            <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            API docs
          </a>
        ) : null}
      </div>
    </>
  );
}

export function Projects() {
  const { dark } = useTheme();
  const [selected, setSelected] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openProject = (p: Project) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSelected(p);
    setDialogOpen(true);
  };

  const byId = (id: Project["id"]) => PROJECTS.find((p) => p.id === id)!;

  return (
    <section id="projects" aria-labelledby="projects-title" className={SECTION}>
      <SectionHeader
        id="projects-title"
        title="Projects"
        lede="Four apps that are live today, from a full e-commerce platform to an award-winning clinical assistant."
      />

      <ol
        aria-label="Projects"
        style={{ timelineScope: ORDER.slice(0, -1).map((_, i) => `--deck-${i}`).join(", ") } as CSSProperties}
      >
        {ORDER.map((id, i) => (
          <DeckCard
            key={id}
            project={byId(id)}
            index={i}
            last={i === ORDER.length - 1}
            onOpen={openProject}
            dark={dark}
          />
        ))}
      </ol>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="squircle [--r:24px] max-w-2xl gap-5 border-[var(--edge)] bg-surface-2 p-7"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          {selected ? <ProjectDetails project={selected} dark={dark} /> : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
