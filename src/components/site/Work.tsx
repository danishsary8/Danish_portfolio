import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Check, FileText, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/content/portfolio";
import { SPRING_HOVER } from "@/lib/motion";
import { RevealGroup, RevealItem, SectionHeading } from "./Reveal";
import { SkillIcon, hasSkillIcon } from "./SkillIcon";

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {stack.map((s) => (
        <li
          key={s}
          className="inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-glass-border bg-[var(--glass-surface)] px-2.5 font-mono text-[12px] text-primaryText"
        >
          {hasSkillIcon(s) ? <SkillIcon name={s} className="h-3.5 w-3.5 text-mutedText" /> : null}
          {s}
        </li>
      ))}
    </ul>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open the live ${project.title} site`}
        className="inline-flex h-11 items-center gap-1.5 rounded-control bg-primaryText px-4 text-[14px] font-semibold text-[var(--bg-base)] transition-[background-color,color,transform] duration-150 hover:bg-gold hover:text-[#0A0A0A] active:scale-[0.98]"
      >
        Live site
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} source on GitHub`}
        className="glass-panel inline-flex h-11 items-center gap-1.5 rounded-control px-4 text-[14px] font-medium text-primaryText transition-[border-color,transform] duration-150 hover:border-gold active:scale-[0.98]"
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
          className="glass-panel inline-flex h-11 items-center gap-1.5 rounded-control px-4 text-[14px] font-medium text-primaryText transition-[border-color,transform] duration-150 hover:border-gold active:scale-[0.98]"
        >
          <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          API docs
        </a>
      ) : null}
    </div>
  );
}

function Shot({ project, className = "" }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // An image that fails before hydration never fires React's onError, so check once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div
      className={`relative overflow-hidden rounded-[12px] border border-glass-border bg-[var(--glass-surface-strong)] ${className}`}
    >
      {project.image && !failed ? (
        <img
          ref={imgRef}
          src={project.image}
          alt={project.imageAlt ?? `${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1000}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025]"
        />
      ) : (
        <div className="grid h-full w-full place-items-center p-6">
          <span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.04em] text-primaryText/15">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <RevealItem as="article" className={className}>
      <motion.div
        whileHover={reduce ? {} : { y: -4 }}
        transition={SPRING_HOVER}
        className="glass-card group h-full p-3 sm:p-4"
      >
        {children}
      </motion.div>
    </RevealItem>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((h) => (
        <li key={h} className="flex gap-2.5 text-[15px] leading-[1.5] text-primaryText">
          <Check
            className="mt-[3px] h-4 w-4 shrink-0 text-gold-ink"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {h}
        </li>
      ))}
    </ul>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className="mt-1.5 text-[14px] text-mutedText">
      {project.kind} <span aria-hidden="true">·</span> {project.hosting}
    </p>
  );
}

export function Work() {
  const [bookly, loomora, diabetes, driving] = PROJECTS as [Project, Project, Project, Project];

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-24 sm:px-6 lg:py-36"
    >
      <SectionHeading
        id="work-title"
        title="Selected work"
        lede="Four projects that are live today — from a full e-commerce platform to an award-winning clinical assistant. Each one is deployed and used, not just a mockup."
      />

      <RevealGroup className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Card className="lg:col-span-12">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
            <Shot project={bookly} className="aspect-[16/10]" />
            <div className="flex flex-col gap-6 px-2 pb-2 lg:py-4 lg:pr-4">
              <div>
                <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1] tracking-[-0.035em] text-primaryText">
                  {bookly.title}
                </h3>
                <ProjectMeta project={bookly} />
              </div>
              <p className="text-[16px] leading-[1.6] text-mutedText">{bookly.summary}</p>
              <Highlights items={bookly.highlights} />
              <StackList stack={bookly.stack} />
              <div className="mt-auto">
                <Actions project={bookly} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-7">
          <div className="flex h-full flex-col gap-6">
            <Shot project={loomora} className="aspect-[16/10]" />
            <div className="flex flex-1 flex-col gap-5 px-2 pb-2">
              <div>
                <h3 className="font-display text-[32px] font-bold leading-[1.02] tracking-[-0.03em] text-primaryText">
                  {loomora.title}
                </h3>
                <ProjectMeta project={loomora} />
              </div>
              <p className="text-[16px] leading-[1.6] text-mutedText">{loomora.summary}</p>
              <StackList stack={loomora.stack} />
              <div className="mt-auto">
                <Actions project={loomora} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <div className="flex h-full flex-col gap-6">
            <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-[12px] border border-glass-border bg-[var(--glass-surface-strong)] p-6 lg:aspect-auto lg:min-h-[220px]">
              <div className="text-center">
                <p className="font-display text-[clamp(2.4rem,6vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em] text-primaryText">
                  EN <span className="text-gold-ink">/</span>{" "}
                  <span lang="km" className="font-khmer">
                    ខ្មែរ
                  </span>
                </p>
                <p className="mt-3 text-[13px] text-mutedText">Bilingual screening interface</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5 px-2 pb-2">
              {diabetes.award ? (
                <p className="inline-flex w-fit items-center gap-2 rounded-[9px] border border-gold/40 bg-gold/10 px-2.5 py-1.5 text-[13px] font-medium text-gold-ink">
                  <Award className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {diabetes.award}
                </p>
              ) : null}
              <div>
                <h3 className="font-display text-[32px] font-bold leading-[1.02] tracking-[-0.03em] text-primaryText">
                  {diabetes.title}
                </h3>
                <ProjectMeta project={diabetes} />
              </div>
              <p className="text-[16px] leading-[1.6] text-mutedText">{diabetes.summary}</p>
              <StackList stack={diabetes.stack} />
              <div className="mt-auto">
                <Actions project={diabetes} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-12">
          <div className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-8">
            <div className="flex flex-col gap-5 px-2 pb-2 md:order-1 md:py-4 md:pl-4">
              <div>
                <h3 className="font-display text-[32px] font-bold leading-[1.02] tracking-[-0.03em] text-primaryText">
                  {driving.title}
                </h3>
                <ProjectMeta project={driving} />
              </div>
              <p className="text-[16px] leading-[1.6] text-mutedText">{driving.summary}</p>
              <Highlights items={driving.highlights} />
              <StackList stack={driving.stack} />
              <Actions project={driving} />
            </div>
            <Shot project={driving} className="aspect-[16/10] md:order-2" />
          </div>
        </Card>
      </RevealGroup>
    </section>
  );
}
