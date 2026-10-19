import type { ReactNode } from "react";
import { Award } from "lucide-react";
import { EXPERIENCE } from "@/content/portfolio";
import { Reveal, SectionHeader } from "./Reveal";

export function TimelineRow({
  period,
  title,
  org,
  detail,
  icon,
  index,
  children,
}: {
  period: string;
  title: string;
  org: string;
  detail?: string;
  icon?: ReactNode;
  index: number;
  children?: ReactNode;
}) {
  return (
    <Reveal
      as="li"
      index={index}
      className="grid gap-x-10 gap-y-2 border-t border-line py-7 first:border-t-0 md:grid-cols-[200px_1fr]"
    >
      <p className="font-mono text-[12.5px] tabular-nums text-fg-subtle md:pt-1">{period}</p>
      <div className="min-w-0">
        <h3 className="flex items-center gap-2 text-[17px] font-medium tracking-[-0.01em] text-fg">
          {icon}
          {title}
        </h3>
        <p className="mt-0.5 text-[14px] text-fg-muted">
          {org}
          {detail ? <span className="text-fg-subtle"> · {detail}</span> : null}
        </p>
        {children}
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-[1120px] px-5 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="experience-title"
        title="Experience"
        lede="Team work on a real booking platform, and an award for applied AI."
      />
      <ol>
        {EXPERIENCE.map((e, i) => (
          <TimelineRow
            key={e.title}
            index={i}
            period={e.period}
            title={e.title}
            org={e.org}
            detail={e.detail}
            icon={
              e.title.includes("Expert System") ? (
                <Award className="h-4 w-4 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
              ) : undefined
            }
          >
            <ul className="mt-4 grid max-w-[68ch] gap-2">
              {e.points.map((p) => (
                <li key={p} className="flex gap-3 text-[14.5px] leading-[1.6] text-fg-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-fg-subtle"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </TimelineRow>
        ))}
      </ol>
    </section>
  );
}
