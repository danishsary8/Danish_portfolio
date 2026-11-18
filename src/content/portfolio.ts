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
  overview: { label: string; text: string }[];
  /** "How I built it": the real order the work happened in. */
  steps: { title: string; text: string }[];
  features: { title: string; text: string; image: string; alt: string; phone?: boolean }[];
  architecture: {
    flow: { name: string; role: string; host: string }[];
    services: { name: string; role: string }[];
  };
  stats: { value: number; suffix?: string; label: string }[];
  engineering: string[];
  challenges: { title: string; problem: string; fix: string; result: string }[];
  results: string[];
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
        "I wanted a bookshop that feels made for Cambodia: Khmer on every page, prices in dollars or riel, and paying the way people here actually pay, cash on delivery or a KHQR scan.",
      overview: [
        {
          label: "Problem",
          text: "Most online shops here are a Facebook page and a chat. You can't search, track an order or pay without messaging someone.",
        },
        {
          label: "Solution",
          text: "A real store with search, a cart, checkout, order tracking and a staff dashboard, built for local payments and both languages.",
        },
        {
          label: "My role",
          text: "Solo, end to end: database, API, frontend, design system, testing, deployment and running it.",
        },
        {
          label: "Timeline",
          text: "Started on an old PHP API, then rebuilt as v2 (Laravel + React) in planned phases. Live on bookly.site since November 2026.",
        },
      ],
      steps: [
        {
          title: "Plan",
          text: "Wrote the requirements and mapped every page to the endpoints it needs.",
        },
        { title: "Database", text: "Designed the schema first, as Laravel migrations." },
        { title: "API", text: "Laravel REST API under /api/v1 with Sanctum auth and roles." },
        { title: "Tests", text: "Feature tests for each endpoint, run in CI on every push." },
        { title: "API docs", text: "OpenAPI spec, a live /docs page and a Postman collection." },
        {
          title: "Design system",
          text: "Colours, type, spacing and motion, written down before any page.",
        },
        {
          title: "Frontend",
          text: "Built in phases: API layer, UI kit, catalogue, auth, checkout, admin.",
        },
        { title: "Deploy", text: "Vercel, Render and PostgreSQL, a custom domain and email." },
        {
          title: "Run & improve",
          text: "Monitoring, nightly backups, and fixing what real use shows.",
        },
      ],
      features: [
        {
          title: "Pay the local way",
          text: "Cash on delivery, or scan a Bakong KHQR code. The order confirms itself once the payment lands.",
          image: ASSETS.projects.booklyShots.khqr,
          alt: "Bookly checkout showing a Bakong KHQR payment code",
        },
        {
          title: "Khmer and English",
          text: "Every screen in both languages, with prices in USD or riel. Built for phones first.",
          image: ASSETS.projects.booklyShots.phoneHome,
          alt: "Bookly home page in Khmer on a phone",
          phone: true,
        },
        {
          title: "A dashboard for the shop",
          text: "Staff manage books, stock, orders, offers and reports: sales, profit and inventory.",
          image: ASSETS.projects.booklyShots.admin,
          alt: "Bookly admin dashboard with sales charts",
        },
        {
          title: "Find the next book",
          text: 'Search that forgives typos, and "similar in theme" picks powered by Gemini embeddings.',
          image: ASSETS.projects.booklyShots.book,
          alt: "A Bookly book page with recommendations",
        },
      ],
      architecture: {
        flow: [
          { name: "Browser", role: "Phone or laptop", host: "bookly.site" },
          { name: "React app", role: "Storefront + admin", host: "Vercel" },
          { name: "Laravel API", role: "REST /api/v1", host: "Render" },
          { name: "PostgreSQL", role: "All shop data", host: "Supabase" },
        ],
        services: [
          { name: "Bakong KHQR", role: "Payments" },
          { name: "Resend", role: "Email" },
          { name: "Telegram", role: "Order updates" },
          { name: "Gemini", role: "Similar books" },
        ],
      },
      stats: [
        { value: 1041, label: "backend tests" },
        { value: 708, label: "frontend tests" },
        { value: 101, label: "database migrations" },
        { value: 250, suffix: "+", label: "documented API paths" },
      ],
      engineering: [
        "Token auth with Laravel Sanctum, email OTP, Google sign-in and two-factor login for staff",
        "Cloudflare Turnstile on sign-in forms, and rate limits on every sensitive route",
        "Roles and permissions checked on the API, never only in the UI",
        "GitHub Actions run lint, type checks, unit tests and Playwright tests on every push",
        "A nightly, encrypted database backup",
      ],
      challenges: [
        {
          title: "The database ran out of hours",
          problem:
            "Mid-month, the free database said it had used all its compute time, and the shop was about to go offline.",
          fix: "I traced it to an uptime check that hit a database route every 5 minutes, so it never slept. I pointed the check at a route that skips the database, then moved the data to Supabase with pg_dump and pg_restore.",
          result: "No downtime and no lost data. Every table count matched before I switched over.",
        },
        {
          title: "Rebuilding while it was live",
          problem: "The first version ran on an old PHP API that was hard to change safely.",
          fix: "I rebuilt the API in Laravel and moved the frontend over in small phases, one branch each, with tests before each switch.",
          result: "The new version replaced the old one without a big-bang rewrite.",
        },
        {
          title: "Payments that fit Cambodia",
          problem: "Card checkout doesn't match how most people here pay.",
          fix: "I built cash on delivery and Bakong KHQR, where the API checks the payment and confirms the order by itself.",
          result: "Checkout works the way local customers already pay.",
        },
      ],
      results: [
        "Live at bookly.site, in English and Khmer",
        "1,700+ automated tests across the API and the app",
        "Public API docs anyone can try with a demo account",
      ],
      lessons: [
        "Design the database before anything else. Every time I skipped ahead, I ended up rewriting a migration.",
        "Small branches and tests make big changes feel safe. I could rebuild the whole API without being scared of breaking the shop.",
        "Running a real site teaches what tutorials don't: monitoring, backups and reading logs at night matter as much as features.",
      ],
      next: [
        "Gift announcements in the cart and on book pages",
        "Ask customers how they found Bookly",
        "Facebook sign-in, once the business is verified",
      ],
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
