import { motion, useAnimationControls, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, type ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
export const item: Variants = {
  // Content must remain readable if hydration or viewport observation stalls.
  hidden: { opacity: 1, transform: "translateY(12px)" },
  show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3, ease: EASE } },
};
/* Badges / chips: subtle spring pop-in */
export const badgeContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
export const badgeItem: Variants = {
  hidden: { opacity: 1, transform: "translateY(8px) scale(0.97)" },
  show: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: { duration: 0.25, ease: EASE },
  },
};

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? { hidden: { opacity: 1, transform: "none" }, show: { opacity: 1, transform: "none" } }
          : item
      }
    >
      {children}
    </motion.div>
  );
}

export function BadgeReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={badgeContainer}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function BadgeItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? { hidden: { opacity: 1, transform: "none" }, show: { opacity: 1, transform: "none" } }
          : badgeItem
      }
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({ text, className }: { text: string; className?: string }) {
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!reduce) controls.start("show");
  }, [controls, reduce]);
  return (
    <motion.span
      className={className}
      initial={false}
      animate={controls}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
      }}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block pr-[0.25em]"
            variants={{
              hidden: { transform: "translateY(0px)", opacity: 1 },
              show: {
                transform: ["translateY(18px)", "translateY(0px)"],
                opacity: 1,
                transition: { duration: 0.3, ease: EASE },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionHeader({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker: string;
}) {
  return (
    <Reveal className="section-heading mb-10 flex flex-col gap-4 sm:mb-12">
      <RevealItem>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs text-highlight">
          <span className="section-index">{index}</span> {kicker}
        </p>
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      </RevealItem>
    </Reveal>
  );
}
