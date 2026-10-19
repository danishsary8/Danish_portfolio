import { motion, useAnimationControls, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { EASE_OUT_EXPO, MOTION_DURATION } from "@/lib/motion";

const EASE = EASE_OUT_EXPO;

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.04 } },
};

/**
 * Invariant: Content must remain visible (opacity: 1) before and during observer wait,
 * satisfying SSR readability and Vitest assertions in portfolio-visibility.test.tsx.
 */
export const item: Variants = {
  hidden: { opacity: 1, transform: "translateY(12px)" },
  show: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: MOTION_DURATION.reveal, ease: EASE_OUT_EXPO },
  },
};

/* Badges / chips: subtle pop-in with strict 0.97 min scale */
export const badgeContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const badgeItem: Variants = {
  hidden: { opacity: 1, transform: "translateY(8px) scale(0.97)" },
  show: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: { duration: MOTION_DURATION.card, ease: EASE_OUT_EXPO },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduce
          ? { opacity: 1, transform: "none" }
          : {
              opacity: [0.72, 1],
              transform: ["translateY(16px)", "translateY(0px)"],
            }
      }
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: MOTION_DURATION.reveal, ease: EASE_OUT_EXPO, delay }}
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

export function SectionHeader({ title }: { index?: string; title: string; kicker?: string }) {
  return (
    <Reveal className="section-heading mb-10 sm:mb-14">
      <RevealItem>
        <h2 className="font-display text-3xl font-bold tracking-tight text-primaryText sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </RevealItem>
    </Reveal>
  );
}

/**
 * StaggerGrid & LedgerReveal: Reusable parent-child stagger orchestration
 * for multi-column asymmetric sections (SystemCapabilities, FeaturedProjects, EngineeringWorks).
 */
export function StaggerGrid({
  children,
  className,
  stagger = 0.06,
  delay = 0.04,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function LedgerReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.36,
            ease: EASE,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
