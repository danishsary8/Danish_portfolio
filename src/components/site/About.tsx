import { Code2, LayoutGrid, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

// "How I work", each line drawn from the CV summary and experience.
const PRACTICES = [
  {
    icon: LayoutGrid,
    term: "Responsive interfaces",
    detail: "Layouts that adapt from phone to desktop, styled with Tailwind CSS.",
  },
  {
    icon: ShieldCheck,
    term: "Secure APIs",
    detail:
      "Token-based sessions, one-time-code checks, and Google sign-in, with role-based access when a product calls for it.",
  },
  {
    icon: Code2,
    term: "Maintainable code",
    detail: "Readable, scalable code, reviewed through branches and pull requests before it merges.",
  },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={SECTION}>
      <SectionHeader
        id="about-title"
        title="About"
        lede="Who I am, what I build, and where I’m heading next."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Pull quote: the one line that says how he thinks */}
        <Reveal as="figure" className="lg:sticky lg:top-32 lg:self-start">
          <blockquote className="text-balance text-[28px] font-medium leading-[1.2] tracking-[-0.03em] text-fg sm:text-[34px]">
            <span aria-hidden="true" className="text-gold">
              “
            </span>
            I enjoy turning real problems into working software.
            <span aria-hidden="true" className="text-gold">
              ”
            </span>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 text-[13.5px] text-fg-subtle">
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            {PROFILE.name} · Russey Keo, Phnom Penh
          </figcaption>
        </Reveal>

        <div>
          <div className="max-w-[62ch] space-y-5 text-[16px] leading-[1.7] text-fg-muted">
            <Reveal as="p" index={1}>
              I’m a fourth-year Software Development student at{" "}
              <span className="text-fg">Norton University</span>. On weekends I join a product team
              at <span className="text-fg">ETEC &amp; KruITSolution</span> as an intern, shipping
              screens for a travel-booking product.
            </Reveal>
            <Reveal as="p" index={2}>
              I build with <span className="text-fg">React, Laravel, Flask, and PostgreSQL</span>. My
              projects include an online bookstore, a habit planner, an offline driving-theory app,
              and a bilingual clinical expert system that won the{" "}
              <span className="text-gold-ink dark:text-gold">
                AI Expert System and Innovation 2026
              </span>{" "}
              award with my team.
            </Reveal>
            <Reveal as="p" index={3}>
              I’m looking for a Web Developer role where I can contribute to real products and grow
              with a collaborative team, on my way to becoming a skilled full-stack developer.
            </Reveal>
          </div>

          <Reveal index={4} className="mt-12">
            <h3 className="text-[15px] font-medium text-fg">How I work</h3>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {PRACTICES.map(({ icon: Icon, term, detail }) => (
                <div
                  key={term}
                  className="grid gap-x-8 gap-y-1.5 py-5 sm:grid-cols-[200px_minmax(0,1fr)]"
                >
                  <dt className="flex items-center gap-2.5 text-[14.5px] font-medium text-fg">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-fg-subtle" />
                    {term}
                  </dt>
                  <dd className="text-[14.5px] leading-[1.6] text-fg-muted">{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
