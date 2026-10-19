import { type Variants, type Transition, useReducedMotion } from "framer-motion";

/**
 * Emil Kowalski Custom Easing Curves
 * - EASE_OUT: [0.23, 1, 0.32, 1] - Primary ease-out for all viewport entrances, drawer reveals,
 *   modal appearances, and dropdown openings. Immediate response followed by a smooth settle.
 * - EASE_IN_OUT: [0.65, 0, 0.35, 1] - Spatial movement when an existing on-screen element
 *   morphs position or shifts layout indicator bars.
 * - EASE_STD: [0.25, 0.1, 0.25, 1] - Interactive hover curve for subtle color and border shifts.
 * - EASE_SNAPPY: [0.16, 1, 0.3, 1] - Micro-interactions and tactile button clicks.
 *
 * Strict Prohibition: Never define or export an ease-in curve for UI entrances.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_STD = [0.25, 0.1, 0.25, 1] as const;
export const EASE_SNAPPY = [0.16, 1, 0.3, 1] as const;

// Aliases for compatibility
export const EASE_OUT_EXPO = EASE_OUT;
export const EASE_IN_OUT_CUBIC = EASE_IN_OUT;

/**
 * Strict Duration Budgets (Mapped in Seconds)
 */
export const DURATION = {
  instant: 0.1, // 100ms - keyboard shortcut feedback, theme toggle icon swap
  micro: 0.15, // 150ms - button press feedback, link underline, badge hover
  fast: 0.22, // 220ms - tooltip and popover appearances
  drawer: 0.28, // 280ms - sliding Sheet drawer for REST API & DB schema inspector
  drawerExit: 0.2, // 200ms - faster drawer exit so UI never blocks user
  card: 0.36, // 360ms - interactive card and matrix column entrance
  reveal: 0.38, // 380ms - scroll-triggered section and project row entrances
  hero: 0.4, // 400ms - first-time hero load choreography
} as const;

// Alias for compatibility
export const MOTION_DURATION = DURATION;

export const transitionFast: Transition = {
  duration: DURATION.micro,
  ease: EASE_SNAPPY,
};

export const transitionStandard: Transition = {
  duration: DURATION.reveal,
  ease: EASE_OUT,
};

export const transitionOverlay: Transition = {
  duration: DURATION.drawer,
  ease: EASE_OUT,
};

/**
 * 1. Hero Editorial Load Choreography
 * Purpose: First-time rare load delight and hierarchy establishment.
 * Behavior: Staggers headline, bio, action buttons, and right-column portrait by 70ms.
 * Each item enters from opacity: 0, y: 16, scale: 0.97 to opacity: 1, y: 0, scale: 1 over 0.40s.
 */
export function getHeroContainerVariants(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0, delayChildren: 0 },
      },
    };
  }
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
  };
}

export function getHeroItemVariants(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: DURATION.micro, ease: "linear" },
      },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 16,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: DURATION.hero,
        ease: EASE_OUT,
      },
    },
  };
}

export const heroContainerVariants: Variants = getHeroContainerVariants(false);
export const heroItemVariants: Variants = getHeroItemVariants(false);

/**
 * 2. Scroll-Triggered Section & Ledger Reveal
 * Purpose: Spatial consistency and progressive disclosure down the asymmetric grid.
 * Behavior: Staggers child rows by 60ms. Starts from opacity: 0, y: 14 (<= 16px) and settles at y: 0 in 0.36s.
 */
export function getSectionRevealVariants(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0, delayChildren: 0 },
      },
    };
  }
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.04,
      },
    },
  };
}

export function getLedgerRowVariants(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: DURATION.micro, ease: "linear" },
      },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.36,
        ease: EASE_OUT,
      },
    },
  };
}

export const sectionRevealVariants: Variants = getSectionRevealVariants(false);
export const ledgerRowVariants: Variants = getLedgerRowVariants(false);

/**
 * 3. Surface & Card Scale Entrance
 * Purpose: State indication for technical schema blocks, modal dialogs, and interactive architecture panels.
 * Behavior: Enters from opacity: 0, scale: 0.96 (never scale from 0) to opacity: 1, scale: 1 over 0.24s using EASE_OUT.
 */
export function getSurfaceScaleVariants(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: DURATION.micro, ease: "linear" },
      },
    };
  }
  return {
    hidden: {
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.24,
        ease: EASE_OUT,
      },
    },
  };
}

export const surfaceScaleVariants: Variants = getSurfaceScaleVariants(false);
export const scaleInVariants: Variants = surfaceScaleVariants;

/**
 * 4. Spatial Fade Up Variant
 * Starts with subtle y: 16px translation; falls back to instant opacity fade under reduced motion.
 */
export function getFadeUpVariant(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: DURATION.micro, ease: "linear" },
      },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.reveal,
        ease: EASE_OUT,
      },
    },
  };
}

export const fadeInUpVariants: Variants = getFadeUpVariant(false);

/**
 * 5. Drawer & Sheet Slide Variant
 * Spatial continuity for API Architecture Sheet: slides from right edge in 280ms, exits in 200ms.
 */
export function getDrawerSlideVariant(shouldReduceMotion?: boolean | null): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: DURATION.micro },
      },
      exit: {
        opacity: 0,
        transition: { duration: DURATION.micro },
      },
    };
  }
  return {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: DURATION.drawer,
        ease: EASE_OUT,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: DURATION.drawerExit,
        ease: EASE_OUT,
      },
    },
  };
}

export const drawerSlideVariant: Variants = getDrawerSlideVariant(false);

/**
 * 6. Tactile Button & Trigger Feedback
 * Immediate physical feedback on click/press without exaggerated scaling.
 */
export const buttonTapProps = {
  whileTap: {
    scale: 0.985,
    transition: { duration: 0.12, ease: EASE_OUT },
  },
} as const;

export const buttonTapFeedback = {
  whileTap: { scale: 0.985, transition: { duration: 0.12, ease: EASE_OUT } },
  whileHover: { transition: { duration: 0.14, ease: EASE_SNAPPY } },
} as const;

/**
 * 7. Reduced-Motion Adaptive Helper (Hook & Resolver)
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.micro, ease: "linear" },
  },
};

export function getAccessibleVariants(
  variants: Variants,
  shouldReduceMotion?: boolean | null,
): Variants {
  return shouldReduceMotion ? reducedMotionVariants : variants;
}

export function getMotionVariant(
  variants: Variants,
  shouldReduceMotion?: boolean | null,
): Variants {
  return getAccessibleVariants(variants, shouldReduceMotion);
}

/**
 * Custom React Hook: usePortfolioMotion
 * Returns current reduced motion preference and mapped variant helpers.
 */
export function usePortfolioMotion() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion: !!shouldReduceMotion,
    heroContainer: getHeroContainerVariants(shouldReduceMotion),
    heroItem: getHeroItemVariants(shouldReduceMotion),
    sectionReveal: getSectionRevealVariants(shouldReduceMotion),
    ledgerRow: getLedgerRowVariants(shouldReduceMotion),
    surfaceScale: getSurfaceScaleVariants(shouldReduceMotion),
    fadeUp: getFadeUpVariant(shouldReduceMotion),
    drawerSlide: getDrawerSlideVariant(shouldReduceMotion),
    buttonTap: buttonTapProps,
    resolve: (variants: Variants) => getAccessibleVariants(variants, shouldReduceMotion),
  };
}

// Backward-compatible export
export const staggerContainerVariants: Variants = getSectionRevealVariants(false);
export function getStaggerContainerVariant(
  shouldReduceMotion?: boolean | null,
  staggerMs = 0.065,
  delayMs = 0.04,
): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0, delayChildren: 0 },
      },
    };
  }
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerMs, delayChildren: delayMs },
    },
  };
}
export function getScaleRevealVariant(shouldReduceMotion?: boolean | null): Variants {
  return getSurfaceScaleVariants(shouldReduceMotion);
}
