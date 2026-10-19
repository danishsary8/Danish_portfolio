import type { Transition } from "framer-motion";

// Mirrors the CSS custom properties in styles.css.
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

// Sliding indicators and small layout shifts.
export const SPRING_UI: Transition = { type: "spring", duration: 0.35, bounce: 0.15 };
// Elements that follow the pointer: carries velocity, settles without overshoot.
export const SPRING_FOLLOW = { stiffness: 350, damping: 32, mass: 0.6 } as const;
// Dialog and popover surfaces.
export const SURFACE_ENTER: Transition = { duration: 0.22, ease: EASE_OUT };
