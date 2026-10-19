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

export function SectionHeader({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-3 sm:mb-12">
      <Reveal>
        <h2
          id={id}
          className="text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[32px]"
        >
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal index={1}>
          <p className="max-w-[58ch] text-fg-muted">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
