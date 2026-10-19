import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiCloudinary,
  SiCss,
  SiDart,
  SiDocker,
  SiFlask,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLaravel,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Code2, Database, HardDrive, Webhook } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type AnyIcon = IconType | ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

// Brand marks from Simple Icons; lucide fallbacks where no brand mark is published.
const ICONS: Record<string, AnyIcon> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  Python: SiPython,
  Java: SiOpenjdk,
  HTML5: SiHtml5,
  CSS3: SiCss,
  React: SiReact,
  Laravel: SiLaravel,
  Flask: SiFlask,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "Framer Motion": SiFramer,
  Flutter: SiFlutter,
  Dart: SiDart,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  SQLite: SiSqlite,
  Oracle: Database,
  Git: SiGit,
  GitHub: SiGithub,
  "REST APIs": Webhook,
  JWT: SiJsonwebtokens,
  Docker: SiDocker,
  Postman: SiPostman,
  Cloudinary: SiCloudinary,
  "VS Code": Code2,
  "Local Storage": HardDrive,
};

export function hasSkillIcon(name: string) {
  return name in ICONS;
}

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Code2;
  return <Icon className={className} aria-hidden="true" focusable="false" strokeWidth={1.5} />;
}
