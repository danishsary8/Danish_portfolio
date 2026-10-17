import { motion, useReducedMotion } from "framer-motion";
import { PanelsTopLeft, Server, Database } from "lucide-react";

export type SkillLayer = "Frontend" | "Backend" | "Database";
const layers = [
  { name: "Frontend", title: "Interface", icon: PanelsTopLeft },
  { name: "Backend", title: "API & logic", icon: Server },
  { name: "Database", title: "Data", icon: Database },
] as const;

export function SkillsArchitecture({ selected }: { selected: SkillLayer }) {
  const reduce = useReducedMotion();
  return (
    <div
      className="skills-illustration"
      role="img"
      aria-label={`Full-stack architecture: interface, API and database. ${selected} selected.`}
    >
      <p className="mb-8 font-mono text-xs text-muted-foreground">
        01 / INTERFACE → 02 / LOGIC → 03 / DATA
      </p>
      {layers.map(({ name, title, icon: Icon }, index) => (
        <div key={name}>
          <motion.div
            className="architecture-layer"
            data-active={selected === name}
            initial={false}
            animate={{
              transform: reduce || selected !== name ? "translateX(0px)" : "translateX(8px)",
            }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-4">
              <Icon className="h-6 w-6 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold">{title}</p>
                <p className="mt-1 text-xs opacity-80">{name}</p>
              </div>
              <span className="font-mono text-xs">0{index + 1}</span>
            </div>
            {name === "Frontend" && (
              <div className="mt-4 flex gap-2" aria-hidden>
                <span className="h-1 w-1/2 rounded-full bg-current opacity-20" />
                <span className="h-1 w-1/4 rounded-full bg-current opacity-20" />
              </div>
            )}
          </motion.div>
          {index < 2 && <div className="architecture-connector" aria-hidden />}
        </div>
      ))}
    </div>
  );
}
