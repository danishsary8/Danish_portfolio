import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type Locale = "en" | "km";

export interface I18nDictionary {
  brandName: string;
  roleKicker: string;
  locationKicker: string;
  traineeStatus: string;
  language: string;
  navProjects: string;
  navCapabilities: string;
  navTrajectory: string;
  navDispatch: string;
  runtimeTelemetry: string;
  runAudit: string;
  heroHeadline: string;
  heroBio: string;
  nav: {
    overview: string;
    capabilities: string;
    projects: string;
    experience: string;
    contact: string;
  };
  heroBioKhmerCallout: string;
  heroKicker: string;
  heroHeading: string;
  capabilitiesHeading: string;
  projectsHeading: string;
  experienceHeading: string;
  contactHeading: string;
  terminalPrompt: string;
}

export const DICTIONARY: Record<Locale, I18nDictionary> = {
  en: {
    brandName: "Sary Danish",
    roleKicker: "JUNIOR FULL-STACK DEVELOPER",
    locationKicker: "PHNOM PENH, CAMBODIA • 4TH-YEAR SOFTWARE DEV @ NORTON UNIVERSITY",
    traineeStatus: "TRAINEE @ ETEC & KruITSolution",
    language: "Language",
    navProjects: "Projects",
    navCapabilities: "Architecture",
    navTrajectory: "Experience",
    navDispatch: "Contact",
    runtimeTelemetry: "RUNTIME TELEMETRY",
    runAudit: "RUN DOM & A11Y CHECK",
    heroHeadline: "Building Production Full-Stack Software.",
    heroBio:
      "fourth-year Software Development student at Norton University, Phnom Penh, Cambodia. I build and deploy full-stack web applications — from secure REST APIs to responsive React frontends with clean UI. I enjoy turning real problems into working software, writing maintainable code, and collaborating in teams. My dream is to become a highly skilled Full-Stack Developer, capable of building complete, real-world web applications that are scalable, maintainable, and genuinely useful to people.",
    nav: {
      overview: "Overview",
      capabilities: "Capabilities",
      projects: "Engineering Works",
      experience: "Experience & Awards",
      contact: "Contact",
    },
    heroBioKhmerCallout:
      "Bilingual English/Khmer Developer • Norton University AI Expert System Winner 2026",
    heroKicker: "ENGINEERING DISPATCH // ICT UTC+7",
    heroHeading: "Building Complete, Scalable Web Applications from Phnom Penh.",
    capabilitiesHeading: "Engineered for Scale, Maintainability, and Precision.",
    projectsHeading: "Production Full-Stack Applications & Clinical Prototypes.",
    experienceHeading: "Engineering Trajectory, Norton University & Awards.",
    contactHeading: "Initiate Direct Communication Channel.",
    terminalPrompt: "DIRECT TERMINAL DISPATCH",
  },
  km: {
    brandName: "សារី ដានីស (Sary Danish)",
    roleKicker: "វិស្វករកម្មវិធីពេញលេញ (FULL-STACK DEV)",
    locationKicker:
      "ភ្នំពេញ, កម្ពុជា • និស្សិតឆ្នាំទី៤ ផ្នែកអភិវឌ្ឍន៍កម្មវិធី នៃសាកលវិទ្យាល័យន័រតុន",
    traineeStatus: "សិក្ខាកាម @ ETEC & KruITSolution",
    language: "ភាសា (Language)",
    navProjects: "គម្រោងវិស្វកម្ម",
    navCapabilities: "ស្ថាបត្យកម្ម",
    navTrajectory: "បទពិសោធន៍",
    navDispatch: "ទំនាក់ទំនង",
    runtimeTelemetry: "ទិន្នន័យដំណើរការផ្ទាល់",
    runAudit: "ដំណើរការត្រួតពិនិត្យ DOM & A11Y",
    heroHeadline: "បង្កើតកម្មវិធីវិស្វកម្មពេញលេញ (FULL-STACK SOFTWARE)",
    heroBio:
      "និស្សិតឆ្នាំទី៤ ផ្នែកអភិវឌ្ឍន៍កម្មវិធី នៅសាកលវិទ្យាល័យន័រតុន រាជធានីភ្នំពេញ។ ខ្ញុំបង្កើតនិងដាក់ឱ្យប្រើប្រាស់នូវកម្មវិធីគេហទំព័រពេញលេញ ចាប់ពី REST APIs ដែលមានសុវត្ថិភាព រហូតដល់ React Frontends ដែលមានចំណុចប្រទាក់ស្អាត។ ខ្ញុំចូលចិត្តដោះស្រាយបញ្ហាជាក់ស្តែង ទៅជាកម្មវិធីដែលមានប្រសិទ្ធភាព និងសរសេរកូដដែលមានស្តង់ដារ។",
    nav: {
      overview: "ទិដ្ឋភាពទូទៅ",
      capabilities: "ស្ថាបត្យកម្មប្រព័ន្ធ",
      projects: "គម្រោងវិស្វកម្ម",
      experience: "បទពិសោធន៍និងការសិក្សា",
      contact: "ទំនាក់ទំនងផ្ទាល់",
    },
    heroBioKhmerCallout:
      "ខ្ញុំបាទឈ្មោះ សារី ដានីស (Sary Danish) ជានិស្សិតឆ្នាំទី៤ ផ្នែកអភិវឌ្ឍន៍កម្មវិធី នៅសាកលវិទ្យាល័យន័រតុន រាជធានីភ្នំពេញ។ ជ័យលាភីពានរង្វាន់ប្រព័ន្ធជំនាញបញ្ញាសិប្បនិម្មិត (AI Expert System) ឆ្នាំ២០២៦។",
    heroKicker: "ទូរលេខវិស្វកម្ម // ម៉ោងកម្ពុជា ICT UTC+7",
    heroHeading: "បង្កើតកម្មវិធីគេហទំព័រពេញលេញ មានគុណភាព និងអាចពង្រីកបានពីរាជធានីភ្នំពេញ។",
    capabilitiesHeading: "រៀបចំឡើងសម្រាប់ការពង្រីក ប្រសិទ្ធភាព និងភាពជាក់លាក់ខ្ពស់។",
    projectsHeading: "កម្មវិធីជាក់ស្តែងពេញលេញ (Full-Stack) និងប្រព័ន្ធគំរូវេជ្ជសាស្ត្រ។",
    experienceHeading: "បទពិសោធន៍វិស្វកម្ម សាកលវិទ្យាល័យន័រតុន និងពានរង្វាន់។",
    contactHeading: "បង្កើតបណ្តាញទំនាក់ទំនងវិស្វកម្មផ្ទាល់។",
    terminalPrompt: "ប្រព័ន្ធទំនាក់ទំនងផ្ទាល់ (DIRECT DISPATCH)",
  },
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: I18nDictionary;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Strict default 'en' to preserve deterministic SSR and Vitest assertions
  const [locale, setLocaleState] = useState<Locale>("en");

  // Client hydration sync from localStorage
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("portfolio_locale") as Locale | null;
      if (savedLocale === "km" || savedLocale === "en") {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      localStorage.setItem("portfolio_locale", nextLocale);
      document.documentElement.lang = nextLocale;
    } catch {
      // Safe fallback
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "km" : "en";
      try {
        localStorage.setItem("portfolio_locale", next);
        document.documentElement.lang = next;
      } catch {
        // Safe fallback
      }
      return next;
    });
  }, []);

  // Listen to custom global toggle events from keyboard chords or command ledger
  useEffect(() => {
    const handleCustomToggle = () => {
      toggleLocale();
    };

    window.addEventListener("portfolio:toggle-locale", handleCustomToggle);
    return () => {
      window.removeEventListener("portfolio:toggle-locale", handleCustomToggle);
    };
  }, [toggleLocale]);

  const value: LocaleContextType = {
    locale,
    setLocale,
    toggleLocale,
    t: DICTIONARY[locale],
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      locale: "en",
      setLocale: () => {},
      toggleLocale: () => {},
      t: DICTIONARY.en,
    };
  }
  return context;
}
