import { useRef, useState } from "react";
import { Award, BookOpen, FileBadge, GraduationCap, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CERTIFICATES, EDUCATION, type Certificate } from "@/content/portfolio";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

function CertificateRow({
  cert,
  index,
  onOpen,
}: {
  cert: Certificate;
  index: number;
  onOpen: (c: Certificate) => void;
}) {
  const isAward = cert.title.includes("Award");
  const Icon = isAward ? Award : FileBadge;
  const body = (
    <>
      <span
        aria-hidden="true"
        className={`squircle [--r:9px] grid h-9 w-9 shrink-0 place-items-center ${
          isAward ? "icon-tile-gold" : "icon-tile-light text-fg-muted"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-[1.4] text-fg">{cert.title}</span>
        <span
          className={`mt-1 block text-[13.5px] ${isAward ? "text-gold-ink dark:text-gold" : "text-fg-subtle"}`}
        >
          {cert.issuer}
        </span>
      </span>
      <span className="shrink-0 pt-0.5 font-mono text-[12px] tabular-nums text-fg-subtle">
        {cert.date}
      </span>
    </>
  );

  return (
    <Reveal as="li" index={index}>
      {cert.image ? (
        <button
          type="button"
          onClick={() => onOpen(cert)}
          aria-label={`View certificate: ${cert.title}`}
          className="group flex w-full items-start gap-4 bg-surface-2 px-5 py-5 text-left transition-colors duration-150 hover:bg-surface-1"
        >
          {body}
          <Maximize2
            aria-hidden="true"
            strokeWidth={1.5}
            className="mt-1 h-4 w-4 text-fg-subtle opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          />
        </button>
      ) : (
        <div className="flex items-start gap-4 bg-surface-2 px-5 py-5">{body}</div>
      )}
    </Reveal>
  );
}

export function Education() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [degree, ...studies] = EDUCATION;

  return (
    <section id="education" aria-labelledby="education-title" className={SECTION}>
      <SectionHeader
        id="education-title"
        title="Education"
        lede="University, language study, and focused frontend and backend courses."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Degree */}
        <Reveal className="tactile squircle [--r:20px] flex flex-col p-7 sm:p-8">
          <span
            aria-hidden="true"
            className="icon-tile squircle [--r:11px] grid h-12 w-12 place-items-center"
          >
            <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="mt-6 text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
            {degree.title}
          </h3>
          <p className="mt-2 text-[15px] text-fg-muted">{degree.org}</p>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[var(--edge)] bg-[var(--edge)] text-[13px] shadow-[var(--field-inset)]">
            <div className="bg-surface-1 px-4 py-3">
              <dt className="text-fg-subtle">Years</dt>
              <dd className="mt-0.5 font-mono tabular-nums text-fg">{degree.period}</dd>
            </div>
            <div className="bg-surface-1 px-4 py-3">
              <dt className="text-fg-subtle">Now</dt>
              <dd className="mt-0.5 text-fg">{degree.detail}</dd>
            </div>
          </dl>

          {studies.map((s) => (
            <div key={s.title} className="mt-8 flex items-start gap-3.5 border-t border-line pt-6">
              <BookOpen aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-4 w-4 text-fg-subtle" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-fg">{s.title}</p>
                <p className="mt-0.5 text-[13.5px] text-fg-muted">
                  {s.org} · {s.detail}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[12px] tabular-nums text-fg-subtle">
                {s.period}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Courses and awards */}
        <div>
          <Reveal>
            <h3 className="text-[15px] font-medium text-fg">Courses &amp; awards</h3>
          </Reveal>
          <ul className="tactile squircle [--r:20px] mt-4 grid gap-px overflow-hidden bg-[var(--edge)]">
            {CERTIFICATES.map((c, i) => (
              <CertificateRow
                key={c.title}
                cert={c}
                index={i + 1}
                onOpen={(cert) => {
                  triggerRef.current = document.activeElement as HTMLElement | null;
                  setSelected(cert);
                  setOpen(true);
                }}
              />
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="squircle [--r:24px] max-w-3xl border-[var(--edge)] bg-surface-2"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          {selected ? (
            <>
              <DialogHeader className="pr-10">
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.issuer} · {selected.date}
                </DialogDescription>
              </DialogHeader>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={`${selected.title} certificate`}
                  className="w-full rounded-[12px] border border-line"
                />
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
