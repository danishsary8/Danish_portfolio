/**
 * Centralized Asset Manifest & Type Helper
 * In accordance with AGENTS.md:
 * - App media (photos, screenshots, documents) are referenced through local imports or CDN asset pointers.
 * - Raw binary assets are managed via pointer files or canonical local files.
 */

import photo from "@/assets/danish-photo.jpg";
import { DANISH_PHOTO_DATA_URI } from "@/assets/danish-photo.base64";
import chatbotIcon from "@/assets/chatbot.png";
import signature from "@/assets/signature.png";
import signatureTransparent from "@/assets/signature-transparent.png";
import booklyShot from "@/assets/project-bookly.jpg.asset.json";
import loomoraShot from "@/assets/project-loomora.jpg.asset.json";
import drivingShot from "@/assets/project-driving.jpg.asset.json";
// Real Bookly screenshots (current UI, 19 Nov 2026): desktop 1440×900, phone 430×932 (iPhone 15 Pro Max).
// Checkout, KHQR and account screens come from a local copy of the API with demo data (no real customer).
const bk = import.meta.glob("@/assets/projects/bookly/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const bookly = (name: string) => bk[`/src/assets/projects/bookly/${name}.webp`] ?? "";
const dx = import.meta.glob("@/assets/projects/diabetes/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const diabetes = (name: string) => dx[`/src/assets/projects/diabetes/${name}.webp`] ?? "";
const lm = import.meta.glob("@/assets/projects/loomora/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const loomora = (name: string) => lm[`/src/assets/projects/loomora/${name}.webp`] ?? "";
const dr = import.meta.glob("@/assets/projects/driving/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const driving = (name: string) => dr[`/src/assets/projects/driving/${name}.webp`] ?? "";
const pk = import.meta.glob("@/assets/projects/pitchkh/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const pitchkh = (name: string) => pk[`/src/assets/projects/pitchkh/${name}.webp`] ?? "";
const sh = import.meta.glob("@/assets/projects/sport/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const sport = (name: string) => sh[`/src/assets/projects/sport/${name}.webp`] ?? "";

export interface ProjectAsset {
  src: string;
  alt: string;
  aspectRatio: string;
}

export const ASSETS = {
  chatbot: {
    icon: chatbotIcon,
    alt: "Sary Danish AI Assistant",
  },
  profile: {
    photo: DANISH_PHOTO_DATA_URI || photo,
    photoUrl: photo,
    alt: "Sary Danish — Junior Full-Stack Developer & Software Development Student",
    // Owner's handwritten signature (blue ink on white), used on the hero card back.
    signature,
    // Cropped transparent vector-grade signature for floating badges and hero accents.
    signatureTransparent,
  },
  projects: {
    booklyShots: {
      home: bookly("home"),
      phoneHome: bookly("m-home"),
    },
    /** Raw lookup for the case-study screens: `booklyShot("book")`, `booklyShot("m-book")`. */
    booklyShot: bookly,
    /** Diabetes case-study screens and covers: `diabetesShot("result")`. */
    diabetesShot: diabetes,
    /** Loomora case-study screens and covers: `loomoraShot("week")`. */
    loomoraShot: loomora,
    /** Driving Rules phone screens and covers: `drivingShot("m-home")`. */
    drivingShot: driving,
    /** PitchKH phone screens and covers: `pitchkhShot("m-pitch")`. */
    pitchkhShot: pitchkh,
    /** Sport Heaven case-study screens and covers: `sportShot("home")`. */
    sportShot: sport,
    bookly: {
      src: bookly("home") || booklyShot.url,
      alt: "Bookly — Full-Stack Bookstore & REST API Architecture",
      aspectRatio: "16/10",
    },
    loomora: {
      src: loomoraShot.url,
      alt: "Loomora — Personal Routine & Habit Planner Web Application",
      aspectRatio: "16/10",
    },
    driving: {
      src: drivingShot.url,
      alt: "Cambodian Driving Rules & Theory Practice Mobile Application",
      aspectRatio: "16/10",
    },
    diabetes: {
      // Prototype clinical expert system UI fallback / architectural schema view
      src: "",
      alt: "Clinical Diabetes Expert System Prototype & Risk Engine",
      aspectRatio: "16/10",
    },
  },
  documents: {
    cv: "/sary-danish-cv.pdf",
  },
} as const;
