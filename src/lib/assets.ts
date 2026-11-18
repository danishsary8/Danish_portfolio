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
// Real Bookly screenshots (from the Bookly repo, 1440×900 desktop and 390×844 phone, webp).
import booklyHome from "@/assets/projects/bookly/home.webp";
import booklyBook from "@/assets/projects/bookly/book.webp";
import booklyAdmin from "@/assets/projects/bookly/admin-dashboard.webp";
import booklyKhqr from "@/assets/projects/bookly/khqr-pay.webp";
import booklyPhoneHome from "@/assets/projects/bookly/phone-home-km.webp";

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
      home: booklyHome,
      book: booklyBook,
      admin: booklyAdmin,
      khqr: booklyKhqr,
      phoneHome: booklyPhoneHome,
    },
    bookly: {
      src: booklyHome || booklyShot.url,
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
