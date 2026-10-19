import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Award, Check, FileText, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROJECTS, type Project } from "@/content/portfolio";
import { SPRING_FOLLOW } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { Reveal, SectionHeader } from "./Reveal";
import { SkillIcon, hasSkillIcon } from "./SkillIcon";

const PREVIEW_W = 320;
const PREVIEW_OFFSET = 20;

function ProjectShot({ project, className = "" }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // An image that fails before hydration never fires React's onError, so check once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!project.image || failed) {
    return (
      <div
        className={`grid place-items-center overflow-hidden rounded-[10px] border border-line bg-surface ${className}`}
      >
        {project.id === "diabetes" ? (
          <span className="text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.04em] text-fg">
            EN <span className="text-fg-subtle">/</span>{" "}
            <span lang="km" className="font-khmer">
              ខ្មែរ
            </span>
          </span>
        ) : (
          <span className="text-[clamp(1.4rem,3.5vw,2rem)] font-semibold tracking-[-0.04em] text-fg-subtle">
            {project.title}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[10px] border border-line bg-surface ${className}`}>
      <img
        ref={imgRef}
        src={project.image}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        width={1600}
        height={1000}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

function HoverPreview({
  project,
  visible,
  x,
  y,
}: {
  project: Project | null;
  visible: boolean;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;
  return (
    <motion.div
      aria-hidden="true"
      style={{ transform, width: PREVIEW_W }}
      className="pointer-events-none fixed left-0 top-0 z-40"
    >
      <div
        className={`origin-top-left rounded-xl border border-line bg-raised p-1.5 shadow-[var(--shadow-float)] transition-[opacity,transform] duration-200 ease-[var(--ease-out)] ${
          visible ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
        }`}
      >
        {project ? <ProjectShot project={project} className="aspect-[16/10]" /> : null}
      </div>
    </motion.div>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
  onHover,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  onHover: (p: Project | null) => void;
}) {
  return (
    <Reveal as="li" index={index}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        onPointerEnter={() => onHover(project)}
        onPointerLeave={() => onHover(null)}
        aria-label={`${project.title}: view details`}
        className="group grid w-full gap-x-8 gap-y-2 px-5 py-6 text-left transition-colors duration-150 hover:bg-surface sm:px-6 md:grid-cols-[220px_minmax(0,1fr)_150px] md:items-center"
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.01em] text-fg">
            {project.title}
            {project.award ? (
              <Award
                className="h-4 w-4 text-gold-ink"
                strokeWidth={1.5}
                aria-label="Award winner"
              />
            ) : null}
          </span>
          <span className="mt-0.5 block text-[13px] text-fg-subtle">{project.kind}</span>
        </span>
        <span className="line-clamp-2 text-[14px] leading-[1.55] text-fg-muted">
          {project.summary}
        </span>
        <span className="flex items-center justify-between gap-4 md:justify-end">
          <span className="font-mono text-[12px] text-fg-subtle">{project.hosting}</span>
          <ArrowUpRight
            className="h-4 w-4 text-fg-subtle transition-[transform,color] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </button>
    </Reveal>
  );
}

const linkBtn =
  "press inline-flex h-10 items-center gap-2 rounded-control px-4 text-[14px] font-medium transition-[background-color,opacity,transform] duration-150";

function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <DialogHeader className="pr-10">
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>
          {project.kind} · {project.hosting}
        </DialogDescription>
      </DialogHeader>
      <ProjectShot project={project} className="aspect-[16/10]" />
      {project.award ? (
        <p className="inline-flex w-fit items-center gap-2 rounded-[6px] border border-gold/40 bg-gold/10 px-2 py-1 text-[13px] text-gold-ink">
          <Award className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {project.award}
        </p>
      ) : null}
      <p className="text-[15px] leading-[1.6] text-fg-muted">{project.summary}</p>
      <ul className="grid gap-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-[14px] leading-[1.5] text-fg">
            <Check
              className="mt-[3px] h-4 w-4 shrink-0 text-fg-subtle"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
        {project.stack.map((s) => (
          <li
            key={s}
            className="inline-flex h-7 items-center gap-1.5 rounded-[6px] border border-line bg-surface px-2 font-mono text-[12px] text-fg-muted"
          >
            {hasSkillIcon(s) ? <SkillIcon name={s} className="h-3.5 w-3.5" /> : null}
            {s}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open the live ${project.title} site`}
          className={`${linkBtn} bg-fg text-bg hover:opacity-90`}
        >
          Live site
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className={`${linkBtn} border border-line-strong text-fg hover:bg-surface`}
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
            className={`${linkBtn} border border-line-strong text-fg hover:bg-surface`}
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
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const previewEnabled = fine && !reduce;

  const [hovered, setHovered] = useState<Project | null>(null);
  const [lastHovered, setLastHovered] = useState<Project | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openProject = (p: Project) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSelected(p);
    setDialogOpen(true);
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING_FOLLOW);
  const y = useSpring(my, SPRING_FOLLOW);

  const place = (e: PointerEvent, jump: boolean) => {
    const flip = e.clientX + PREVIEW_OFFSET + PREVIEW_W > window.innerWidth - 16;
    const nx = flip ? e.clientX - PREVIEW_OFFSET - PREVIEW_W : e.clientX + PREVIEW_OFFSET;
    const ny = e.clientY + PREVIEW_OFFSET;
    mx.set(nx);
    my.set(ny);
    if (jump) {
      x.jump(nx);
      y.jump(ny);
    }
  };

  const onHover = (p: Project | null) => {
    setHovered(p);
    if (p) setLastHovered(p);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-[1120px] px-5 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="projects-title"
        title="Projects"
        lede="Four apps that are live today, from a full e-commerce platform to an award-winning clinical assistant."
      />
      <ul
        className="divide-y divide-line overflow-hidden rounded-brand border border-line"
        onPointerMove={previewEnabled ? (e) => place(e, hovered === null) : undefined}
        onPointerEnter={previewEnabled ? (e) => place(e, true) : undefined}
      >
        {PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            onOpen={openProject}
            onHover={previewEnabled ? onHover : () => {}}
          />
        ))}
      </ul>

      {previewEnabled ? (
        <HoverPreview
          project={hovered ?? lastHovered}
          visible={hovered !== null && !dialogOpen}
          x={x}
          y={y}
        />
      ) : null}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-xl"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          {selected ? <ProjectDetails project={selected} /> : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
