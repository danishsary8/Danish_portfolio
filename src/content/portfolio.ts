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
  phone: "087 680 999",
  github: "https://github.com/danishsary8",
  githubHandle: "danishsary8",
  linkedin: "https://www.linkedin.com/in/sarydanish/",
  linkedinHandle: "sarydanish",
  telegram: "https://t.me/sarydanish",
  facebook: "https://www.facebook.com/danish.sary.5",
  facebookHandle: "danish.sary.5",
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
  images?: string[];
  image?: string;
  imageAlt?: string;
  award?: string;
  team?: boolean;
  /** Extra source repos (shown in the case study). */
  repos?: { label: string; url: string }[];
  /** Short line printed on the project cover. */
  coverLine?: string;
  /** Full case study (Bookly first; the others keep the short details for now). */
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  pitch: string;
  facts: { label: string; value: string }[];
  problem: string;
  solution: string;
  /** "How I built it": the real order the work happened in. */
  steps: { title: string; text: string }[];
  /** Screens shown in the auto-playing carousel, one topic each. */
  features: { title: string; image: string; alt: string; phone?: boolean }[];
  stats: { value: number; suffix?: string; label: string }[];
  practices: string[];
  challenges: { title: string; fix: string; result: string }[];
  lessons: string[];
  next: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "bookly",
    title: "Bookly",
    kind: "Online bookstore · E-commerce",
    summary:
      "A full online bookstore for Cambodia in English and Khmer: OTP and Google login, cart, checkout with cash on delivery or Bakong KHQR, order tracking, reviews, an admin dashboard, and Telegram order updates.",
    highlights: [
      "Laravel REST API with role-based access and staff two-factor login",
      "React + TypeScript storefront and admin, in English and Khmer",
      "Live on its own domain with public API docs",
    ],
    stack: ["React", "TypeScript", "Laravel", "PostgreSQL", "Tailwind CSS", "REST APIs"],
    hosting: "Vercel · Render · Supabase",
    liveUrl: "https://bookly.site/",
    githubUrl: "https://github.com/danishsary8/bookly_frontend",
    repos: [
      { label: "Frontend", url: "https://github.com/danishsary8/bookly_frontend" },
      { label: "Backend API", url: "https://github.com/danishsary8/bookly_backend_v2" },
    ],
    apiDocsUrl: "https://bookly-api-zasc.onrender.com/docs",
    image: ASSETS.projects.bookly.src,
    imageAlt: "Bookly storefront showing the book catalogue",
    coverLine: "Books delivered across Cambodia",
    caseStudy: {
      pitch:
        "A bookshop made for Cambodia. Khmer on every page, prices in riel or dollars, and you pay the way people here pay.",
      facts: [
        { label: "Role", value: "Solo, full-stack" },
        { label: "Status", value: "Live on bookly.site" },
        { label: "Languages", value: "English · ខ្មែរ" },
        { label: "Payments", value: "KHQR · Cash" },
      ],
      problem:
        "Most shops here are a Facebook page and a chat. No search, no tracking, no easy way to pay.",
      solution:
        "A real store: search, cart, checkout, order tracking and a staff dashboard, in both languages.",
      steps: [
        { title: "Plan", text: "Pages mapped to endpoints" },
        { title: "Database", text: "Schema first, as migrations" },
        { title: "API + tests", text: "Laravel REST, tested in CI" },
        { title: "Design system", text: "Colour, type, motion" },
        { title: "Frontend", text: "React, built in phases" },
        { title: "Ship + run", text: "Domain, email, backups" },
      ],
      features: [
        { title: "Storefront", image: ASSETS.projects.booklyShots.home, alt: "Bookly home page" },
        {
          title: "Browse by category",
          image: ASSETS.projects.booklyShots.category,
          alt: "Bookly comics and manga category page",
        },
        {
          title: "Book page",
          image: ASSETS.projects.booklyShots.book,
          alt: "Bookly book page for Dune",
        },
        {
          title: "Similar books, by AI",
          image: ASSETS.projects.booklyShots.similar,
          alt: "Similar in theme recommendations under a book",
        },
        {
          title: "Search by meaning",
          image: ASSETS.projects.booklyShots.search,
          alt: "Search results for books about building good habits",
        },
        {
          title: "Khmer, on phones",
          image: ASSETS.projects.booklyShots.phoneHome,
          alt: "Bookly home page in Khmer on a phone",
          phone: true,
        },
        {
          title: "Book page in Khmer",
          image: ASSETS.projects.booklyShots.phoneBook,
          alt: "A Bookly book page in Khmer on a phone",
          phone: true,
        },
      ],
      stats: [
        { value: 1041, label: "API tests" },
        { value: 708, label: "app tests" },
        { value: 101, label: "migrations" },
        { value: 250, suffix: "+", label: "API routes" },
      ],
      practices: [
        "Sanctum tokens",
        "Email OTP",
        "Google sign-in",
        "Staff 2FA",
        "Rate limits",
        "Turnstile",
        "CI on every push",
        "Nightly backups",
      ],
      challenges: [
        {
          title: "The database ran out of hours",
          fix: "An uptime check kept it awake. I moved the check, then moved the data to Supabase.",
          result: "No downtime, no data lost",
        },
        {
          title: "Rebuilding a live shop",
          fix: "Swapped the old PHP API for Laravel one small phase at a time.",
          result: "No big-bang rewrite",
        },
        {
          title: "Payments for Cambodia",
          fix: "Built KHQR and cash on delivery. The API checks each payment itself.",
          result: "Checkout people trust",
        },
      ],
      lessons: [
        "Design the database first. Every shortcut came back as a migration.",
        "Small branches and tests make big changes feel safe.",
        "Running a real site teaches what tutorials don't.",
      ],
      next: ["Gift offers in the cart", "Ask how people found us", "Facebook sign-in"],
    },
  },
  {
    id: "loomora",
    title: "Loomora",
    coverLine: "Plan your day, keep your routines",
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
    coverLine: "Early diabetes screening, in two languages",
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
    coverLine: "Pass the driving theory exam",
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
    title: "Front-End",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Back-End",
    skills: ["PHP", "Laravel", "REST APIs", "SQL"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Supabase", "Oracle"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "Postman", "Cloudinary", "VS Code"],
  },
  {
    title: "Also used",
    skills: ["Python", "Java", "Flutter", "Flask"],
  },
] as const;

export type Skill = (typeof SKILL_GROUPS)[number]["skills"][number];

export const EXPERIENCE = [
  {
    title: "Web Developer Internship",
    org: "ETEC & KruITSolution",
    period: "Jul 2026 – Present",
    detail: "Phnom Penh, Cambodia",
    summary:
      "Hands-on training with a development team at ETEC and KruITSolution. I learned and shipped the frontend first, earned its certificate, and have now moved into a backend role, building REST APIs with the team.",
    frontend: [
      "Built UI dashboards and connected them to live REST APIs.",
      "Shipped through Git and GitHub with feature branches, clear commits and pull requests.",
    ],
    backend: [
      "Building REST APIs alongside the backend team.",
      "Agreeing API requirements with teammates and sharing ideas in team discussions.",
    ],
  },
  {
    title: "AI Expert System and Innovation 2026",
    org: "1st Place · Team of 4",
    period: "Sep 2026",
    detail: "Norton University · Department of Computer Studies",
    summary: "My team of four built the Diabetes Expert System and entered it in the competition.",
    points: [
      "A bilingual (Khmer/English) clinical assistant that screens for early signs of diabetes.",
      "A health check-up: users enter their health details, see their possible risk level and get a personal care plan.",
      "Every result is explained by the rules behind it, so users understand and trust the outcome.",
      "Built with React, Flask and PostgreSQL, with secure sign-in and role-based access.",
    ],
  },
] as const;

export const EDUCATION = [
  {
    title: "Bachelor of Software Development",
    org: "Norton University",
    period: "Jan 2024 – Present",
    detail: "Fourth year",
  },
  {
    title: "General English Program",
    org: "Australian Centre for Education (ACE)",
    period: "2024 – 2026",
    detail: "Completes 2026",
  },
] as const;

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  topics: string;
};

// ETEC courses (owner: education first, courses after, no awards here).
export const CERTIFICATES: Certificate[] = [
  {
    title: "Frontend Development",
    issuer: "ETEC Center",
    date: "Jan – Aug 2025",
    topics: "HTML, CSS, Bootstrap, JavaScript, React.js and a project course",
  },
  {
    title: "Backend Development",
    issuer: "ETEC Center",
    date: "Oct 2025 – Mar 2026",
    topics: "PHP and Laravel",
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
