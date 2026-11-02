import { useEffect, useState } from "react";
import { User, Cpu, FolderGit2, Briefcase, GraduationCap, Mail } from "lucide-react";

interface MobileBottomNavProps {
  activeSection?: string;
}

const ITEMS = [
  { id: "about", label: "About", href: "#about", icon: User },
  { id: "skills", label: "Skills", href: "#skills", icon: Cpu },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", href: "#experience", icon: Briefcase },
  { id: "education", label: "Education", href: "#education", icon: GraduationCap },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

export function MobileBottomNav({ activeSection }: MobileBottomNavProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show bottom capsule after scrolling down slightly from the very top of hero
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden transition-all duration-300 ease-[var(--ease-out)] mb-[env(safe-area-inset-bottom,0px)] ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full border border-[var(--edge)] bg-surface-1/90 backdrop-blur-2xl shadow-float ring-1 ring-black/5 dark:ring-white/5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 select-none active:scale-90 ${
                isActive
                  ? "bg-surface-3 text-fg shadow-2xs font-semibold ring-1 ring-line-strong/30"
                  : "text-fg-subtle hover:text-fg hover:bg-surface-2/60"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 h-1 w-1 rounded-full bg-gold shadow-[0_0_4px_var(--gold)]"
                />
              ) : null}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
