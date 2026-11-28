import { useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Award, Check, FileText, Github, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlareHover } from "@/components/ui/GlareHover";
import { PROJECTS, type Project } from "@/content/portfolio";
import { Reveal, SECTION, SectionHeader } from "./Reveal";
import { SkillIcon, hasSkillIcon, themedSkillColor } from "./SkillIcon";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectCover } from "./ProjectCover";
import { BooklyCaseStudy } from "./BooklyCaseStudy";

// Deck order: flagship first, award second, then the two lighter apps.
const ORDER: Project["id"][] = ["bookly", "diabetes", "loomora", "pitchkh", "driving"];

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

function ProjectVisual({ project, onOpen }: { project: Project; onOpen?: (p: Project) => void }) {
  return (
    <div
      onClick={onOpen ? () => onOpen(project) : undefined}
      className={onOpen ? "group cursor-pointer" : undefined}
      title={onOpen ? `View ${project.title} details` : undefined}
    >
      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.18}
        variant="sheen"
        borderRadius="18px"
        transitionDuration={900}
        width="100%"
        className="block w-full max-w-full"
      >
        <div className="tactile squircle [--r:18px] w-full overflow-hidden">
          <ProjectCover project={project} />
        </div>
      </GlareHover>
    </div>
  );
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {stack.map((s) => (
        <li
          key={s}
          className="squircle [--r:8px] inline-flex h-7 items-center gap-1.5 border border-[var(--line-strong)] bg-surface-1 px-2.5 text-[12.5px] font-medium text-fg-muted transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--chip)_35%,var(--line-strong))] hover:text-fg"
          style={{ "--chip": themedSkillColor(s) } as CSSProperties}
        >
          {hasSkillIcon(s) ? (
            <SkillIcon name={s} className="h-3.5 w-3.5" style={{ color: themedSkillColor(s) }} />
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
        className={`btn-apple btn-apple-secondary group/live inline-flex h-11 items-center sm:h-10 gap-1.5 rounded-full px-4 text-[13.5px] font-medium ${FOCUS}`}
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
        className={`btn-apple btn-apple-primary inline-flex h-11 items-center rounded-full px-4 sm:h-10 text-[13.5px] font-medium ${FOCUS}`}
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
            className="icon-tile-gold squircle [--r:8px] inline-flex h-7 items-center gap-1.5 px-2.5 text-[12px] font-medium tracking-normal"
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
}: {
  project: Project;
  index: number;
  last: boolean;
  onOpen: (p: Project) => void;
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
            <ProjectVisual project={project} onOpen={onOpen} />
          </div>
          <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
            <ProjectTitle project={project} size="lg" />
            {project.ai ? (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-[12.5px] font-medium text-[#6d4fd6] dark:text-[#b9a6ff]">
                <Sparkles aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
                {project.ai}
              </p>
            ) : null}
            <p className="mt-4 text-pretty text-[15.5px] leading-[1.65] text-fg-muted">
              {project.summary}
            </p>
            <div className="mt-6">
              <StackChips stack={project.stack} />
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

function CaseHeader({ project }: { project: Project }) {
  return (
    <DialogHeader className="pr-10 text-left">
      <DialogDescription className="text-[13px] text-fg-subtle">
        Case study · {project.kind.split(" · ")[0]}
      </DialogDescription>
      <DialogTitle className="text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-fg sm:text-[38px]">
        {project.title}
      </DialogTitle>
    </DialogHeader>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <DialogHeader className="pr-10">
        <DialogTitle className="text-[22px] sm:text-[25px] font-semibold tracking-[-0.03em] text-fg">
          {project.title}
        </DialogTitle>
        <DialogDescription className="text-[13px] text-fg-subtle">
          {project.kind} · {project.hosting}
        </DialogDescription>
      </DialogHeader>

      {/* Expensive Slideshow Gallery */}
      <ProjectGallery project={project} />

      {project.award ? (
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[13px] font-medium text-gold-ink dark:text-gold">
          <Award className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          <span>{project.award}</span>
        </div>
      ) : null}

      <div className="rounded-xl border border-[var(--edge)] bg-surface-1/60 p-4">
        <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-fg-subtle">
          Overview
        </h4>
        <p className="mt-1.5 text-[14.5px] leading-[1.6] text-fg-muted">{project.summary}</p>
      </div>

      <div className="rounded-xl border border-[var(--edge)] bg-surface-1/60 p-4">
        <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-fg-subtle mb-2.5">
          Key Highlights & Architecture
        </h4>
        <ul className="grid gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[13.5px] leading-[1.5] text-fg">
              <Check
                className="mt-[3px] h-4 w-4 shrink-0 text-gold-ink dark:text-gold"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-fg-subtle mb-2">
          Technologies
        </h4>
        <StackChips stack={project.stack} />
      </div>

      <div className="flex flex-wrap gap-2.5 pt-2 border-t border-[var(--edge)]">
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
        style={
          {
            timelineScope: ORDER.slice(0, -1)
              .map((_, i) => `--deck-${i}`)
              .join(", "),
          } as CSSProperties
        }
      >
        {ORDER.map((id, i) => (
          <DeckCard
            key={id}
            project={byId(id)}
            index={i}
            last={i === ORDER.length - 1}
            onOpen={openProject}
          />
        ))}
      </ol>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={`squircle [--r:24px] max-h-[90dvh] overflow-y-auto overscroll-contain gap-5 outline-none focus:outline-none border-[var(--edge)] bg-surface-2 p-5 sm:p-7 ${
            selected?.caseStudy ? "max-w-4xl lg:p-9" : "max-w-2xl"
          }`}
          onOpenAutoFocus={(e) => {
            // Start on the dialog itself, so the auto-playing carousel is not focused (focus pauses it).
            e.preventDefault();
            (e.currentTarget as HTMLElement | null)?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          {selected?.caseStudy ? (
            <BooklyCaseStudy project={selected} header={<CaseHeader project={selected} />} />
          ) : selected ? (
            <ProjectDetails project={selected} />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
