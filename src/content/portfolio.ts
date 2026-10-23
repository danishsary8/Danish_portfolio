import { ASSETS } from "@/lib/assets";

export const PROFILE = {
  name: "Sary Danish",
  shortName: "Danish",
  role: "Junior Web Developer",
  location: "Phnom Penh, Cambodia",
  // Owner-supplied personal details (shown in the profile modal only).
  address: "Russey Keo, Phnom Penh",
  birthDate: "8 November 2005",
  // Owner's own goal statement (profile modal pull quote).
  goal: "My goal is to become a skilled engineer who builds something new: complete, real-world applications that solve real problems and are genuinely useful to people, contributing fresh ideas both as part of a team and on my own.",
  timezone: "Asia/Phnom_Penh",
  timezoneLabel: "ICT",
  email: "danishsary4@gmail.com",
  phone: '087 680 999',
  github: "https://github.com/danishsary8",
  githubHandle: "danishsary8",
  telegram: "https://t.me/sarydanish",
  telegramHandle: "@sarydanish",
  pitch:
    "I build secure REST APIs and clean, responsive React interfaces — and ship them to real users.",
  bio: [
    "My name is Sary Danish, a fourth-year Software Development student at Norton University, Phnom Penh, Cambodia. I build real web applications with React, Laravel, and PostgreSQL — including an online bookstore, a habit planner, and a bilingual clinical expert system — with secure APIs using JWT, OTP verification, and Google OAuth.",
    "I focus on responsive interfaces and clean, scalable, maintainable code, and enjoy turning real problems into working software. My goal is to grow into a skilled Full-Stack Developer, building complete, real-world applications that are genuinely useful to people.",
  ],
} as const;

export const FACTS = [
  { value: "4th", label: "year at Norton University" },
  { value: "4", label: "projects live in production" },
  { value: "2026", label: "AI Expert System award" },
] as const;

export type Project = {
  id: "bookly" | "loomora" | "diabetes" | "driving";
  title: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
  hosting: string;
  liveUrl: string;
  githubUrl: string;
  apiDocsUrl?: string;
  image?: string;
  imageAlt?: string;
  award?: string;
  team?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "bookly",
    title: "Bookly",
    kind: "Online bookstore · E-commerce",
    summary:
      "A full e-commerce platform for buying books: OTP and Google login, cart, checkout, order tracking, reviews, an admin dashboard, and a Telegram bot for order updates.",
    highlights: [
      "Laravel REST API with role-based authorization",
      "Book covers and media hosted on Cloudinary",
      "Public API documentation on Render",
    ],
    stack: ["Laravel", "React", "PostgreSQL", "REST APIs", "Cloudinary"],
    hosting: "Vercel & Railway",
    liveUrl: "https://bookly-frontend-five.vercel.app/",
    githubUrl: "https://github.com/danishsary8",
    apiDocsUrl: "https://bookly-api-zasc.onrender.com/docs",
    image: ASSETS.projects.bookly.src,
    imageAlt: "Bookly storefront showing the book catalogue",
  },
  {
    id: "loomora",
    title: "Loomora",
    kind: "Routine & habit planner",
    summary:
      "A productivity app where people build daily routines and reminders, with secure login, Google sign-in, and email verification.",
    highlights: [
      "Laravel and PostgreSQL backend",
      "Framer Motion for smooth transitions",
      "Tailwind CSS layouts that adapt to any screen",
    ],
    stack: ["React", "Tailwind CSS", "Framer Motion", "Laravel", "PostgreSQL"],
    hosting: "Render",
    liveUrl: "https://daycraft-vnid.onrender.com/",
    githubUrl: "https://github.com/danishsary8",
    image: ASSETS.projects.loomora.src,
    imageAlt: "Loomora dashboard with a daily routine planner",
  },
  {
    id: "diabetes",
    title: "Diabetes Expert System",
    kind: "Clinical assistant · Team project",
    summary:
      "A bilingual English/Khmer system for early diabetes screening, with explainable rule-based risk assessments and care plans. I contributed Google sign-in, UI improvements, and testing.",
    highlights: [
      "Flask API with PostgreSQL",
      "Role-based access secured by JWT",
      "Each risk result comes with a care plan",
    ],
    stack: ["React", "Flask", "PostgreSQL", "JWT", "RBAC"],
    hosting: "Vercel & Railway",
    liveUrl: "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
    githubUrl: "https://github.com/danishsary8",
    award: "Award Winner · AI Expert System and Innovation 2026",
    team: true,
  },
  {
    id: "driving",
    title: "Driving Rules",
    kind: "Driving theory learning app",
    summary:
      "An offline, bilingual Khmer/English app for Cambodia's driving theory exam, with road-sign lessons and practice exams.",
    highlights: ["Built with Flutter and Dart", "Lessons and practice saved on the device"],
    stack: ["Flutter", "Dart", "Local Storage"],
    hosting: "Netlify",
    liveUrl: "https://drivingruletest.netlify.app/",
    githubUrl: "https://github.com/danishsary8",
    image: ASSETS.projects.driving.src,
    imageAlt: "Driving Rules app showing a road-sign lesson",
  },
];

export const SKILL_GROUPS = [
  {
    title: "Languages",
    skills: ["JavaScript", "PHP", "Python", "Java", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & UI",
    skills: ["React", "Laravel", "Flask", "Tailwind CSS", "Bootstrap", "Framer Motion", "Flutter"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Supabase", "Oracle"],
  },
  {
    title: "Tools & APIs",
    skills: ["Git", "GitHub", "REST APIs", "JWT", "Docker", "Postman", "Cloudinary", "VS Code"],
  },
] as const;

export type Skill = (typeof SKILL_GROUPS)[number]["skills"][number];

export const EXPERIENCE = [
  {
    title: "Web Developer Trainee Intern",
    org: "ETEC & KruITSolution",
    period: "Jul 2026 – Present",
    detail: "Weekend internship",
    points: [
      "Web developer on a team tour booking platform, building UI dashboards and fetching and integrating REST APIs.",
      "Collaborated through Git and GitHub using feature branches, commits, and pull requests.",
      "Coordinated API requirements with backend teammates and shared ideas in team discussions.",
    ],
  },
  {
    title: "AI Expert System and Innovation 2026",
    org: "Award Winner (Team)",
    period: "Sep 2026",
    detail: "Presented the Diabetes Expert System",
    points: ["Won with a bilingual, AI-based screening tool for early diabetes risk."],
  },
] as const;

export const EDUCATION = [
  {
    title: "Bachelor of Software Development",
    org: "Norton University",
    period: "2024 – Present",
    detail: "Fourth year",
  },
  {
    title: "General English Program",
    org: "Australian Centre for Education (ACE)",
    period: "2024 – 2026",
    detail: "Completed",
  },
] as const;

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  /** Path under /public or a CDN URL. Leave undefined until the scan is added. */
  image?: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    title: "AI Expert System and Innovation 2026 — Award Winner (Team)",
    issuer: "Team award · Diabetes Expert System",
    date: "Sep 2026",
  },
  {
    title: "Backend Development: PHP, Laravel",
    issuer: "ETEC",
    date: "Nov 2025 – Mar 2026",
  },
  {
    title: "Frontend Development: HTML, CSS, JavaScript, React.js",
    issuer: "ETEC",
    date: "Jan 2025 – Jul 2025",
  },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;
