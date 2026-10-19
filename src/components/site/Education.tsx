import { useRef, useState } from "react";
import { Award, FileBadge, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CERTIFICATES, EDUCATION, type Certificate } from "@/content/portfolio";
import { Reveal, SectionHeader } from "./Reveal";
import { TimelineRow } from "./Experience";

function CertificateCard({
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
  const meta = (
    <>
      <p className="text-[14.5px] font-medium leading-[1.4] text-fg">{cert.title}</p>
      <p className="mt-1 text-[13px] text-fg-subtle">
        {cert.issuer} · <span className="font-mono text-[12px] tabular-nums">{cert.date}</span>
      </p>
    </>
  );

  if (!cert.image) {
    return (
      <Reveal as="li" index={index}>
        <div className="flex h-full gap-4 rounded-brand border border-line bg-bg p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control border border-line bg-surface">
            <Icon
              className={`h-[18px] w-[18px] ${isAward ? "text-gold-ink" : "text-fg-subtle"}`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">{meta}</div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal as="li" index={index}>
      <button
        type="button"
        onClick={() => onOpen(cert)}
        aria-label={`View certificate: ${cert.title}`}
        className="press group block h-full w-full overflow-hidden rounded-brand border border-line bg-bg text-left transition-[border-color,transform] duration-150 hover:border-line-strong"
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface">
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.02]"
          />
          <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-[7px] border border-line bg-raised text-fg-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
        <div className="p-4">{meta}</div>
      </button>
    </Reveal>
  );
}
export function Education() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="mx-auto max-w-[1120px] px-5 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="education-title"
        title="Education & certificates"
        lede="University, language study, and focused frontend and backend courses."
      />
      <ol>
        {EDUCATION.map((ed, i) => (
          <TimelineRow
            key={ed.title}
            index={i}
            period={ed.period}
            title={ed.title}
            org={ed.org}
            detail={ed.detail}
          />
        ))}
      </ol>

      <h3 className="mb-5 mt-14 text-[13px] font-medium text-fg-muted">Certificates</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES.map((c, i) => (
          <CertificateCard
            key={c.title}
            cert={c}
            index={i}
            onOpen={(cert) => {
              triggerRef.current = document.activeElement as HTMLElement | null;
              setSelected(cert);
              setOpen(true);
            }}
          />
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-3xl"
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
                  className="w-full rounded-[10px] border border-line"
                />
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
