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
  SiOpenapiinitiative,
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
import { TbApi } from "react-icons/tb";
import { Code2, Database, HardDrive } from "lucide-react";
import type { ComponentType, CSSProperties, SVGProps } from "react";

type AnyIcon = IconType | ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

// Brand marks from Simple Icons & Tabler; lucide fallbacks where no brand mark is published.
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
  "REST APIs": TbApi,
  OpenAPI: SiOpenapiinitiative,
  JWT: SiJsonwebtokens,
  Docker: SiDocker,
  Postman: SiPostman,
  Cloudinary: SiCloudinary,
  "VS Code": Code2,
  "Local Storage": HardDrive,
};

// Authentic brand colors for every supported technology
export const SKILL_COLORS: Record<string, string> = {
  React: "#61DAFB",
  TypeScript: "#3178C6",
  Laravel: "#FF2D20",
  PostgreSQL: "#4169E1",
  "Tailwind CSS": "#06B6D4",
  "REST APIs": "#0284C7",
  OpenAPI: "#6BA539",
  Docker: "#2496ED",
  JavaScript: "#F7DF1E",
  PHP: "#777BB4",
  Python: "#3776AB",
  Java: "#ED8B00",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  Bootstrap: "#7952B3",
  "Framer Motion": "#0055FF",
  Flutter: "#02569B",
  Dart: "#0175C2",
  Supabase: "#3ECF8E",
  SQLite: "#003B57",
  Oracle: "#F80000",
  Git: "#F05032",
  GitHub: "#EDEDEF",
  JWT: "#D63AFF",
  Postman: "#FF6C37",
  Cloudinary: "#3448C5",
  "VS Code": "#007ACC",
  "Local Storage": "#F59E0B",
};

export function getSkillColor(name: string): string {
  return SKILL_COLORS[name] ?? "#A1A1AA";
}

// Brand marks that vanish on light surfaces get a deeper shade of the same brand colour.
const LIGHT_OVERRIDES: Record<string, string> = {
  JavaScript: "#9C7A00",
  GitHub: "#181717",
  "Local Storage": "#B45309",
};

/**
 * Brand colour tuned for the active theme, so every mark stays visible. Marks with a light-theme
 * shade resolve through CSS variables keyed on the `dark` class (styles.css), so the server render
 * is right for both themes before hydration.
 */
export function themedSkillColor(name: string): string {
  return LIGHT_OVERRIDES[name] ? `var(--brand-${slug(name)})` : getSkillColor(name);
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function getSkillGlow(name: string): string {
  const color = SKILL_COLORS[name] ?? "#A1A1AA";
  if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.28)`;
  }
  return "rgba(255, 255, 255, 0.12)";
}

export function hasSkillIcon(name: string) {
  return name in ICONS;
}

export function SkillIcon({
  name,
  className,
  useBrandColor = false,
  style,
}: {
  name: string;
  className?: string;
  useBrandColor?: boolean;
  style?: CSSProperties;
}) {
  const Icon = ICONS[name] ?? Code2;
  const brandColor = SKILL_COLORS[name];

  return (
    <Icon
      className={className}
      aria-hidden="true"
      focusable="false"
      strokeWidth={name === "REST APIs" ? 1.8 : 1.5}
      style={{
        ...(useBrandColor && brandColor ? { color: brandColor } : {}),
        ...style,
      }}
    />
  );
}
