import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { SPRING_ENTRANCE } from "@/lib/motion";

/*
 * Content is never hidden while waiting for hydration or an observer:
 * the hidden state only offsets position, opacity stays 1.
 */
export const revealItem: Variants = {
  hidden: { opacity: 1, y: 20 },
  visible: { opacity: 1, y: 0, transition: SPRING_ENTRANCE },
};

export const revealGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const still: Variants = { hidden: { y: 0 }, visible: { y: 0 } };

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
      variants={revealGroup}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp className={className} variants={reduce ? still : revealItem}>
      {children}
    </Comp>
  );
}

export function SectionHeading({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <RevealGroup className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
      <RevealItem>
        <h2
          id={id}
          className="font-display text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.035em] text-primaryText"
        >
          {title}
        </h2>
      </RevealItem>
      {lede ? (
        <RevealItem>
          <p className="max-w-[52ch] text-[16px] leading-[1.6] text-mutedText sm:text-[17px]">
            {lede}
          </p>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
