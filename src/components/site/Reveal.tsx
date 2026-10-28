import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
};

/**
 * Fades content in once it scrolls into view. Without JS (or before hydration in a
 * no-JS context) nothing is hidden: the hidden state only applies under `html.js`.
 */
export function Reveal({ children, as: Tag = "div", index = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset["visible"] = "";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset["visible"] = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Shared section frame: same width and rhythm as the Hero. */
export const SECTION = "mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-6 lg:py-32";

/** Title left, one-line summary right (desktop). The heading carries the weight; no eyebrow. */
export function SectionHeader({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <div className="mb-12 grid gap-4 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
      <Reveal>
        <h2
          id={id}
          className="text-balance text-[32px] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[40px] lg:text-[48px]"
        >
          <span className="mask-rise">
            <span>{title}</span>
          </span>
        </h2>
      </Reveal>
      {lede ? (
        <Reveal index={1} className="lg:justify-self-end">
          <p className="max-w-[30.498em] text-pretty text-[15.5px] leading-[1.6] text-fg-muted lg:pb-1.5">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
