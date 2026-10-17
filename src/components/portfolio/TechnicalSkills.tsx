import { useState } from "react";
import { Braces, PanelsTopLeft, Server, Database, Wrench, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "./SpotlightCard";
import { Reveal, RevealItem } from "./Reveal";
import { SkillsArchitecture, type SkillLayer } from "./SkillsArchitecture";

const groups = [
  {
    name: "Frontend",
    icon: PanelsTopLeft,
    skills: ["HTML", "CSS", "Bootstrap", "Tailwind CSS", "React"],
  },
  { name: "Backend", icon: Server, skills: ["Laravel", "Flask"] },
  { name: "Database", icon: Database, skills: ["PostgreSQL", "Supabase", "SQLite", "Oracle"] },
] as const;
const foundations = [
  { name: "Languages", icon: Braces, skills: ["JavaScript", "PHP", "Java", "Python"] },
  { name: "Tools", icon: Wrench, skills: ["Git", "GitHub", "Figma"] },
];

export function TechnicalSkills() {
  const [selected, setSelected] = useState<SkillLayer>("Frontend");
  return (
    <Reveal>
      <div className="skills-layout">
        <div className="skills-categories">
          {groups.map(({ name, icon: Icon, skills }, index) => (
            <RevealItem key={name}>
              <SpotlightCard
                className={`skill-category ${selected === name ? "skill-selected" : ""}`}
              >
                <div data-active={selected === name}>
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="skill-icon h-5 w-5" aria-hidden />
                    <h3 className="min-w-0 flex-1 text-xl font-semibold">{name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Select ${name} layer`}
                      aria-pressed={selected === name}
                      onClick={() => setSelected(name)}
                    >
                      <ArrowUpRight aria-hidden />
                    </Button>
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`${name} technologies`}>
                    {skills.map((skill) => (
                      <li key={skill} className="skill-chip">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </div>
        <SkillsArchitecture selected={selected} />
      </div>
      <div className="skill-foundations">
        {foundations.map(({ name, icon: Icon, skills }) => (
          <RevealItem key={name}>
            <div className="mb-4 flex items-center gap-3">
              <Icon className="skill-icon h-5 w-5" aria-hidden />
              <h3 className="text-lg font-semibold">{name}</h3>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label={`${name} technologies`}>
              {skills.map((skill) => (
                <li key={skill} className="skill-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </div>
    </Reveal>
  );
}
