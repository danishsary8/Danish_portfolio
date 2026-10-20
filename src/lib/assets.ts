/**
 * Centralized Asset Manifest & Type Helper
 * In accordance with AGENTS.md:
 * - App media (photos, screenshots, documents) are referenced through local imports or CDN asset pointers.
 * - Raw binary assets are managed via pointer files or canonical local files.
 */

import photo from "@/assets/danish-photo.jpg";
import chatbotIcon from "@/assets/chatbot.png";
import booklyShot from "@/assets/project-bookly.jpg.asset.json";
import loomoraShot from "@/assets/project-loomora.jpg.asset.json";
import drivingShot from "@/assets/project-driving.jpg.asset.json";

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
    photo,
    alt: "Sary Danish — Junior Full-Stack Developer & Software Development Student",
  },
  projects: {
    bookly: {
      src: booklyShot.url,
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
