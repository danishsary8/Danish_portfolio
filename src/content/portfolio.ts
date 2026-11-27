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
  /** Ready-made cover art (16:10) and case-study banner (2.4:1). */
  coverImage?: string;
  bannerImage?: string;
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
    group:
      | "Customer"
      | "Staff"
      | "Admin"
      | "Patient"
      | "Doctor"
      | "Plan"
      | "Focus"
      | "Review"
      | "Account"
      | "Learn"
      | "Exam"
      | "Practice";
    title: string;
    text: string;
    /** Leave out for phone-only apps. */
    desktop?: string;
    phone: string;
  }[];
  stats: { value: number; suffix?: string; label: string }[];
  practices: string[];
  challenges?: { title: string; fix: string; result: string }[];
  /** "Future scale development": where the product grows next. */
  future?: { when: string; title: string; text: string }[];
  /** "Try it yourself": short steps a visitor can do right now. */
  /** "Tech highlights": how the hardest parts work. */
  highlights?: {
    icon: "ai" | "qr" | "shield" | "live" | "offline" | "sync" | "timer" | "lang" | "exam";
    tag: string;
    title: string;
    text: string;
  }[];
  tryIt?: {
    icon: "store" | "search" | "key" | "qr";
    title: string;
    text: string;
    cta: string;
    href: string;
  }[];
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
      highlights: [
        {
          icon: "ai",
          tag: "pgvector · Gemini",
          title: "AI search by meaning",
          text: "Each book is turned into an embedding, so readers can describe a book and find it. If the AI service fails, search falls back to normal search.",
        },
        {
          icon: "qr",
          tag: "Bakong KHQR",
          title: "Payments the server checks",
          text: "Checkout makes a real KHQR code with a 15-minute timer. The API asks Bakong if it was paid before the order is confirmed.",
        },
        {
          icon: "shield",
          tag: "Sanctum · 2FA",
          title: "Staff sign-in with 2FA",
          text: "Staff and admins use a second step to sign in, and each role only reaches its own endpoints. A customer token gets 403.",
        },
        {
          icon: "live",
          tag: "Order timeline",
          title: "Orders that update live",
          text: "When staff pack or ship an order, the customer's timeline updates by itself, without a page reload.",
        },
      ],
    },
  },
  {
    id: "loomora",
    title: "Loomora",
    coverLine: "Plan your day. Focus. See how it went.",
    kind: "Day & focus planner · PWA",
    ai: "Works offline, no account needed, syncs on sign-up",
    summary:
      "A mobile-first planner that puts your to-dos and your weekly routine on one Today screen, with a focus timer, notes and insights that show how the week really went. I built the React frontend and the Laravel API on my own.",
    highlights: [
      "Laravel REST API with 56 endpoints on PostgreSQL",
      "Installable React app that works offline, no sign-up needed",
      "985 frontend and 714 backend tests, all passing",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Laravel", "PostgreSQL"],
    hosting: "Vercel · Render · Neon",
    liveUrl: "https://loomora-craft.vercel.app/",
    githubUrl: "https://github.com/danishsary8/Loomora_front",
    repos: [
      { label: "Frontend", url: "https://github.com/danishsary8/Loomora_front" },
      { label: "Backend API", url: "https://github.com/danishsary8/loomora_back" },
    ],
    image: ASSETS.projects.loomoraShot("today"),
    coverImage: ASSETS.projects.loomoraShot("cover-card"),
    bannerImage: ASSETS.projects.loomoraShot("cover-banner"),
    imageAlt: "Loomora week view on a laptop and the Today screen on a phone",
    caseStudy: {
      pitch:
        "Your to-dos and your weekly routine on one screen. Focus on what's next, then see how the week really went.",
      facts: [
        { label: "Role", value: "Solo, full-stack" },
        { label: "Status", value: "Live on Vercel" },
        { label: "Start", value: "No sign-up needed" },
        { label: "Works", value: "Offline · installable" },
      ],
      problem:
        "Most planners make you choose between a to-do list and a calendar. Your routine lives in one app, your tasks in another, and nothing tells you how the week actually went.",
      solution:
        "Loomora keeps both on one Today screen: to-dos next to a repeating weekly routine, with what's on now and next. A focus timer helps you start, and insights compare the plan with what really happened.",
      screens: [
        {
          group: "Plan",
          title: "Today",
          text: "Today's progress, a one-line intention, and what's on now and next.",
          desktop: ASSETS.projects.loomoraShot("today"),
          phone: ASSETS.projects.loomoraShot("m-today"),
        },
        {
          group: "Plan",
          title: "To-dos",
          text: "Each to-do has a category, priority, subtasks and repeat days.",
          desktop: ASSETS.projects.loomoraShot("today-todos"),
          phone: ASSETS.projects.loomoraShot("m-today-todos"),
        },
        {
          group: "Plan",
          title: "Add a to-do",
          text: "Start with just a title. Category, due date and the rest can wait.",
          desktop: ASSETS.projects.loomoraShot("new-task"),
          phone: ASSETS.projects.loomoraShot("m-new-task"),
        },
        {
          group: "Plan",
          title: "Your week",
          text: "The fixed weekly routine, colour-coded by category.",
          desktop: ASSETS.projects.loomoraShot("week"),
          phone: ASSETS.projects.loomoraShot("m-week"),
        },
        {
          group: "Plan",
          title: "Edit a block",
          text: "Change the time, the days it repeats and its category.",
          desktop: ASSETS.projects.loomoraShot("edit-block"),
          phone: ASSETS.projects.loomoraShot("m-edit-block"),
        },
        {
          group: "Focus",
          title: "Focus timer",
          text: "A countdown linked to a to-do, with four focus rounds and breaks.",
          desktop: ASSETS.projects.loomoraShot("focus"),
          phone: ASSETS.projects.loomoraShot("m-focus"),
        },
        {
          group: "Review",
          title: "Insights",
          text: "Focus time, to-dos done and the streak for the week.",
          desktop: ASSETS.projects.loomoraShot("insights"),
          phone: ASSETS.projects.loomoraShot("m-insights"),
        },
        {
          group: "Review",
          title: "Plan vs reality",
          text: "What you planned against what you really did, day by day.",
          desktop: ASSETS.projects.loomoraShot("insights-review"),
          phone: ASSETS.projects.loomoraShot("m-insights-review"),
        },
        {
          group: "Review",
          title: "Notes",
          text: "Pinned, coloured and tagged notes, on their own or on a block.",
          desktop: ASSETS.projects.loomoraShot("notes"),
          phone: ASSETS.projects.loomoraShot("m-notes"),
        },
        {
          group: "Account",
          title: "Save your plan",
          text: "Sign up with email or Google. Your guest plan moves to the account.",
          desktop: ASSETS.projects.loomoraShot("sign-up"),
          phone: ASSETS.projects.loomoraShot("m-sign-up"),
        },
      ],
      stats: [
        { value: 985, label: "frontend tests" },
        { value: 714, label: "backend tests" },
        { value: 56, label: "API endpoints" },
        { value: 36, label: "end-to-end specs" },
      ],
      practices: [
        "Sanctum tokens",
        "Google sign-in",
        "Email verification",
        "OpenAPI contract",
        "Pest + Larastan",
        "Playwright E2E",
        "CI on every push",
      ],
      highlights: [
        {
          icon: "offline",
          tag: "PWA · IndexedDB",
          title: "Use it without an account",
          text: "Guests keep their plan in the browser with Dexie, and the app installs and opens offline. Nothing is lost if the connection drops.",
        },
        {
          icon: "sync",
          tag: "Guest → account",
          title: "Sign up and keep everything",
          text: "The same screens run on two storage layers: one in the browser, one on the API. When a guest signs up, their plan moves to the account.",
        },
        {
          icon: "timer",
          tag: "Focus timer",
          title: "A timer that survives a reload",
          text: "The countdown keeps running when you change pages and comes back after a refresh. Ending early still saves the time you did.",
        },
        {
          icon: "shield",
          tag: "Laravel · Sanctum",
          title: "A tested REST API",
          text: "56 endpoints under /api/v1, described in an OpenAPI file and covered by 714 tests on PostgreSQL in CI.",
        },
      ],
      future: [
        {
          when: "Next",
          title: "Khmer language",
          text: "Every screen in Khmer, so more people here can use it.",
        },
        {
          when: "Next",
          title: "Push reminders",
          text: "Reminders that arrive even when the app is closed.",
        },
        {
          when: "Later",
          title: "Quick add by typing",
          text: "Type \u201cGym tomorrow 6pm\u201d and the item is ready.",
        },
        {
          when: "Later",
          title: "Export your data",
          text: "Download your plan, focus history and notes.",
        },
      ],
    },
  },
  {
    id: "diabetes",
    title: "Diabetes Expert System",
    coverLine: "Early diabetes screening, in two languages",
    kind: "Clinical assistant · Team project",
    ai: "Expert system: 59 rules that explain every result",
    summary:
      "A bilingual English/Khmer system for early diabetes screening. Patients answer simple questions, a rule engine explains its result, and doctors review it and send a care plan. I contributed Google sign-in, UI improvements and testing.",
    highlights: [
      "Explainable rule engine: 59 rules, each result shows why",
      "Patient, doctor and admin apps in English and Khmer",
      "Works on phone and laptop",
    ],
    stack: ["React", "Flask", "PostgreSQL", "Tailwind CSS", "JWT", "RBAC"],
    hosting: "Vercel · Railway · Supabase",
    liveUrl: "https://diabetes-expert-system-chi.vercel.app/",
    githubUrl: "https://github.com/danishsary8/diabetes_expert_system",
    repos: [
      { label: "Source", url: "https://github.com/danishsary8/diabetes_expert_system" },
      { label: "Team repo", url: "https://github.com/dev-vichea/diabetes-expert-system-v2" },
    ],
    award: "Award Winner · AI Expert System and Innovation 2026",
    team: true,
    image: ASSETS.projects.diabetesShot("doctor-home"),
    coverImage: ASSETS.projects.diabetesShot("cover-card"),
    bannerImage: ASSETS.projects.diabetesShot("cover-banner"),
    imageAlt: "Diabetes Expert System doctor dashboard and patient home on a phone",
    caseStudy: {
      pitch:
        "Answer a few questions in English or Khmer, see your diabetes risk and the reasons behind it, and get a care plan your doctor has checked.",
      facts: [
        { label: "Role", value: "Team of 4" },
        { label: "Award", value: "1st place, 2026" },
        { label: "Languages", value: "English · ខ្មែរ" },
        { label: "Engine", value: "59 explainable rules" },
      ],
      problem:
        "Early diabetes is easy to miss. Most screening tools are in English only and give a score with no reason why. Doctors also have no quick way to see which patients need them first.",
      solution:
        "We built a screening assistant in both languages. Patients take a guided check-up and get a result that shows its evidence. Doctors work from a review queue, and patients follow a care plan their doctor has checked.",
      screens: [
        {
          group: "Patient",
          title: "Home",
          text: "Today's fasting glucose on a colour band, so you see at a glance if you're on track.",
          desktop: ASSETS.projects.diabetesShot("patient-home"),
          phone: ASSETS.projects.diabetesShot("m-patient-home"),
        },
        {
          group: "Patient",
          title: "Result with reasons",
          text: "A plain-language result, how sure the system is, and why.",
          desktop: ASSETS.projects.diabetesShot("result"),
          phone: ASSETS.projects.diabetesShot("m-result"),
        },
        {
          group: "Patient",
          title: "Care plan",
          text: "Today's goals, medicine times and appointments, built from the latest result.",
          desktop: ASSETS.projects.diabetesShot("care-plan"),
          phone: ASSETS.projects.diabetesShot("m-care-plan"),
        },
        {
          group: "Patient",
          title: "Dr. Bot",
          text: "A friendly assistant answers common diabetes questions.",
          desktop: ASSETS.projects.diabetesShot("assistant"),
          phone: ASSETS.projects.diabetesShot("m-assistant"),
        },
        {
          group: "Patient",
          title: "In Khmer",
          text: "Every screen switches to Khmer with one tap.",
          desktop: ASSETS.projects.diabetesShot("patient-home-km"),
          phone: ASSETS.projects.diabetesShot("m-patient-home-km"),
        },
        {
          group: "Doctor",
          title: "Dashboard",
          text: "Urgent patients, cases to review and care plans in one view.",
          desktop: ASSETS.projects.diabetesShot("doctor-home"),
          phone: ASSETS.projects.diabetesShot("m-doctor-home"),
        },
        {
          group: "Doctor",
          title: "Guided assessment",
          text: "One question at a time, with pictures. Known answers are filled in.",
          desktop: ASSETS.projects.diabetesShot("assessment"),
          phone: ASSETS.projects.diabetesShot("m-assessment"),
        },
        {
          group: "Doctor",
          title: "Review queue",
          text: "Check the result, add a note and flag urgent cases.",
          desktop: ASSETS.projects.diabetesShot("review"),
          phone: ASSETS.projects.diabetesShot("m-review"),
        },
        {
          group: "Doctor",
          title: "Patient record",
          text: "Profile, visits, symptoms, lab results and every past result.",
          desktop: ASSETS.projects.diabetesShot("patient-record"),
          phone: ASSETS.projects.diabetesShot("m-patient-record"),
        },
        {
          group: "Doctor",
          title: "Rule editor",
          text: "Doctors write rules as IF / AND / OR conditions. No code needed.",
          desktop: ASSETS.projects.diabetesShot("rule-editor"),
          phone: ASSETS.projects.diabetesShot("m-rule-editor"),
        },
        {
          group: "Admin",
          title: "Roles & permissions",
          text: "Five built-in roles, plus custom roles from 19 permissions.",
          desktop: ASSETS.projects.diabetesShot("admin-roles"),
          phone: ASSETS.projects.diabetesShot("m-admin-roles"),
        },
      ],
      stats: [
        { value: 59, label: "clinical rules" },
        { value: 99, label: "clinical facts" },
        { value: 219, label: "backend tests" },
        { value: 2695, label: "strings in Khmer" },
      ],
      practices: [
        "JWT sign-in",
        "Google sign-in",
        "Role-based access",
        "Rule versions",
        "Audit log",
      ],
      future: [
        {
          when: "Now",
          title: "Dark mode",
          text: "A calm dark theme for every screen, easy on the eyes at night.",
        },
        {
          when: "Next",
          title: "Reminders on Telegram",
          text: "A short message when it's time to check your glucose.",
        },
        {
          when: "Next",
          title: "Smartwatch sync",
          text: "Steps, heart rate and sleep from a smartwatch flow into the care plan.",
        },
        {
          when: "Later",
          title: "Checked by doctors",
          text: "Test the rules with doctors on real, anonymised cases.",
        },
      ],
    },
  },
  {
    id: "driving",
    title: "Driving Rules",
    coverLine: "Pass the driving theory exam",
    kind: "Driving theory app · Flutter",
    ai: "Practice exam with the real pass rules, offline",
    summary:
      "An offline, bilingual Khmer/English app for Cambodia's driving theory exam: lessons for all 249 questions, road-sign flashcards, a timed practice exam with the real pass rules, a speed quiz and a mistakes bank.",
    highlights: [
      "Practice exam with the real rules: 45 questions, 45 minutes, 38 to pass",
      "Every screen in Khmer and English",
      "Works offline: questions and progress stay on the device",
    ],
    stack: ["Flutter", "Dart", "GetX", "GetStorage"],
    hosting: "Netlify",
    liveUrl: "https://drivingruletest.netlify.app/",
    githubUrl: "https://github.com/danishsary8/driving-rules",
    repos: [{ label: "Source", url: "https://github.com/danishsary8/driving-rules" }],
    image: ASSETS.projects.drivingShot("km-home"),
    coverImage: ASSETS.projects.drivingShot("cover-card"),
    bannerImage: ASSETS.projects.drivingShot("cover-banner"),
    imageAlt: "Driving Rules home screen and a passed practice exam on two phones",
    caseStudy: {
      pitch:
        "Learn Cambodia's road rules in Khmer or English, then take a practice exam that works like the real one: 45 questions, 45 minutes, and no mistakes allowed on right of way.",
      facts: [
        { label: "Role", value: "Solo, Flutter" },
        { label: "Platform", value: "Phone-first, works offline" },
        { label: "Languages", value: "English · ខ្មែរ" },
        { label: "Exam", value: "45 questions · 38 to pass" },
      ],
      problem:
        "Learners in Cambodia prepare for the theory exam from printed question lists. There's no easy way to practise under the real exam rules, and nothing shows which questions you keep getting wrong.",
      solution:
        "I built a phone app that works offline. It has lessons for every question, road-sign flashcards, a timed exam with the real pass rules, and a mistakes bank that brings back what you got wrong until you get it right.",
      screens: [
        {
          group: "Learn",
          title: "Home in Khmer",
          text: "The app opens in Khmer, with lessons, road signs and an exam one tap away.",
          phone: ASSETS.projects.drivingShot("km-home"),
        },
        {
          group: "Learn",
          title: "Lessons",
          text: "All 249 questions with their correct answers, in five topics.",
          phone: ASSETS.projects.drivingShot("km-lessons"),
        },
        {
          group: "Learn",
          title: "Road-sign flashcards",
          text: "100 signs to learn. Flip a card to see what it means.",
          phone: ASSETS.projects.drivingShot("km-flashcards"),
        },
        {
          group: "Exam",
          title: "Exam rules",
          text: "Before the timer starts, short slides explain the rules, like zero mistakes on right of way.",
          phone: ASSETS.projects.drivingShot("km-exam-rules"),
        },
        {
          group: "Exam",
          title: "Exam question",
          text: "One question at a time, with a 45-minute timer and your progress saved.",
          phone: ASSETS.projects.drivingShot("km-exam"),
        },
        {
          group: "Practice",
          title: "Speed quiz",
          text: "Ten questions, 15 seconds each, three lives.",
          phone: ASSETS.projects.drivingShot("km-speed-quiz"),
        },
        {
          group: "Practice",
          title: "Progress",
          text: "A readiness score and your last exam scores, so you know when you're ready.",
          phone: ASSETS.projects.drivingShot("km-progress"),
        },
      ],
      stats: [
        { value: 249, label: "practice questions" },
        { value: 100, label: "road-sign questions" },
        { value: 333, label: "strings in Khmer" },
        { value: 71, label: "automated tests" },
      ],
      practices: [
        "GetX state + routing",
        "Saved on the device",
        "Session recovery",
        "Keyboard support",
        "CI on every push",
      ],
      highlights: [
        {
          icon: "exam",
          tag: "Exam rules",
          title: "Works like the real exam",
          text: "45 questions in 45 minutes, 38 to pass. Questions 26 to 30 are about right of way, and one mistake there fails the exam.",
        },
        {
          icon: "offline",
          tag: "Offline-first",
          title: "No internet needed",
          text: "Questions and sign images ship with the app. Results, mistakes and settings are saved on the phone with GetStorage.",
        },
        {
          icon: "timer",
          tag: "Session recovery",
          title: "An exam you can't lose",
          text: "An exam in progress is saved as you go, so a refresh or a closed app doesn't throw away your answers.",
        },
        {
          icon: "lang",
          tag: "Two languages",
          title: "Khmer that reads well",
          text: "Every string exists in both languages, and a test checks nothing is missing. Khmer text gets extra size and spacing so it stays clear.",
        },
      ],
      future: [
        {
          when: "Next",
          title: "On Google Play and the App Store",
          text: "Publish the app so learners can install it from their phone's store.",
        },
        {
          when: "Next",
          title: "Checked by an instructor",
          text: "A driving instructor reviews every answer and its explanation.",
        },
        {
          when: "Later",
          title: "Questions read aloud",
          text: "Listen to each question in Khmer, for learners who prefer to hear it.",
        },
        {
          when: "Later",
          title: "Smart review",
          text: "Mistakes come back on a schedule, so the hard questions stick.",
        },
      ],
    },
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
