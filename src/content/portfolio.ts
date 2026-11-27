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
  /** Short "AI-powered" line shown on the card. */
  ai?: string;
  /** Working copy while the main domain is being finished. */
  demoUrl?: string;
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
  /** "How I built it" (no longer shown). */
  steps?: { title: string; text: string }[];
  /** One screen shown on the laptop and the phone at the same time. */
  screens: {
    group: "Customer" | "Staff" | "Admin";
    title: string;
    text: string;
    desktop: string;
    phone: string;
  }[];
  stats: { value: number; suffix?: string; label: string }[];
  practices: string[];
  challenges: { title: string; fix: string; result: string }[];
  /** "Future scale development": where the product grows next. */
  future: { when: string; title: string; text: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "bookly",
    title: "Bookly",
    kind: "Online bookstore · E-commerce",
    ai: "AI-powered search by meaning and similar-book picks",
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
    demoUrl: "https://bookly-frontend-five.vercel.app/",
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
        "A bookshop made for Cambodia. Khmer on every page, prices in riel or dollars, AI search that understands what you mean, and you pay the way people here pay.",
      facts: [
        { label: "Role", value: "Solo, full-stack" },
        { label: "Status", value: "bookly.site · demo on Vercel" },
        { label: "Languages", value: "English · ខ្មែរ" },
        { label: "Payments", value: "KHQR · Cash" },
      ],
      problem:
        "In Cambodia, most book shops sell through a Facebook page and a chat. You can't search for a title, you don't know if it's in stock, and after you pay you just wait and hope. Paying by bank app means sending a screenshot and waiting for a reply.",
      solution:
        "So I built a real online bookshop. You search in English or Khmer, see the price and stock right away, pay with KHQR or cash on delivery, and follow your order step by step. Staff run everything from one dashboard: orders, stock and reports.",
      screens: [
        {
          group: "Customer",
          title: "Storefront",
          text: "Opens with this week's favourite books, new arrivals and offers.",
          desktop: ASSETS.projects.booklyShot("home"),
          phone: ASSETS.projects.booklyShot("m-home"),
        },
        {
          group: "Customer",
          title: "Sign in",
          text: "Sign in with an email code, Google, Facebook or Telegram.",
          desktop: ASSETS.projects.booklyShot("login"),
          phone: ASSETS.projects.booklyShot("m-login"),
        },
        {
          group: "Customer",
          title: "Browse by category",
          text: "Pick a category, then narrow it down by topic in one tap.",
          desktop: ASSETS.projects.booklyShot("category"),
          phone: ASSETS.projects.booklyShot("m-category"),
        },
        {
          group: "Customer",
          title: "All books",
          text: "Filter by format, price or stock. Sort by best sellers.",
          desktop: ASSETS.projects.booklyShot("best"),
          phone: ASSETS.projects.booklyShot("m-best"),
        },
        {
          group: "Customer",
          title: "Book page",
          text: "See the price, stock and delivery time before you buy.",
          desktop: ASSETS.projects.booklyShot("book"),
          phone: ASSETS.projects.booklyShot("m-book"),
        },
        {
          group: "Customer",
          title: "Cart",
          text: "Discounts and free delivery update as you add books.",
          desktop: ASSETS.projects.booklyShot("cart"),
          phone: ASSETS.projects.booklyShot("m-cart"),
        },
        {
          group: "Customer",
          title: "Checkout",
          text: "Choose an address, delivery and payment in a few short steps.",
          desktop: ASSETS.projects.booklyShot("checkout"),
          phone: ASSETS.projects.booklyShot("m-checkout"),
        },
        {
          group: "Customer",
          title: "Pay with KHQR",
          text: "Scan with any Cambodian bank app. The order confirms itself.",
          desktop: ASSETS.projects.booklyShot("khqr"),
          phone: ASSETS.projects.booklyShot("m-khqr"),
        },
        {
          group: "Customer",
          title: "My orders",
          text: "Follow every order, from packed to delivered.",
          desktop: ASSETS.projects.booklyShot("orders"),
          phone: ASSETS.projects.booklyShot("m-orders"),
        },
        {
          group: "Staff",
          title: "Today's tasks",
          text: "Orders to pack, returns to check and books running low.",
          desktop: ASSETS.projects.booklyShot("staff-today"),
          phone: ASSETS.projects.booklyShot("m-staff-today"),
        },
        {
          group: "Staff",
          title: "Stock",
          text: "Low and sold-out books come first. Restock in one click.",
          desktop: ASSETS.projects.booklyShot("staff-stock"),
          phone: ASSETS.projects.booklyShot("m-staff-stock"),
        },
        {
          group: "Admin",
          title: "Dashboard",
          text: "Sales, orders and new customers at a glance.",
          desktop: ASSETS.projects.booklyShot("admin-dash"),
          phone: ASSETS.projects.booklyShot("m-admin-dash"),
        },
        {
          group: "Admin",
          title: "Reports",
          text: "Revenue and profit by period, ready to print or export.",
          desktop: ASSETS.projects.booklyShot("admin-reports"),
          phone: ASSETS.projects.booklyShot("m-admin-reports"),
        },
      ],
      stats: [
        { value: 1058, label: "API tests" },
        { value: 746, label: "app tests" },
        { value: 104, label: "migrations" },
        { value: 316, label: "API endpoints" },
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
          fix: "The free plan kept running out of compute hours. I moved the data to Supabase and added nightly encrypted backups, tested with a real restore.",
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
      future: [
        {
          when: "Now",
          title: "Launch on bookly.site",
          text: "Move the shop from the test address to its own domain, ready for real customers.",
        },
        {
          when: "Next",
          title: "Search by meaning for everyone",
          text: "It is built and tested. Next it gets switched on for every reader.",
        },
        {
          when: "Next",
          title: "A faster phone experience",
          text: "Install Bookly on the home screen and keep browsing on a weak connection.",
        },
        {
          when: "Later",
          title: "More shops, one platform",
          text: "Let other local book shops sell on Bookly, each with its own stock and staff.",
        },
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
