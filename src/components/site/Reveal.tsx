import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
};

/**
 * Fades content in when it scrolls into view, and replays every time you scroll down to it
 * again (slideshow feel): once the block has left the screen downward it resets, so the next
 * pass plays the transition again. Blocks above the viewport stay shown, so scrolling up never
 * reveals half-hidden content. Without JS nothing is hidden: the hidden state only applies
 * under `html.js`.
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
    const show = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.dataset["visible"] = "";
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    // Reset only once the block is completely below the screen, so the reset is never seen.
    const reset = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting && entry.boundingClientRect.top > 0) {
        delete el.dataset["visible"];
      }
    });
    show.observe(el);
    reset.observe(el);
    return () => {
      show.disconnect();
      reset.disconnect();
    };
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
