import { useState, type CSSProperties } from "react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Props = {
  src: string;
  /** Natural size of the image, so the thumbnail keeps its paper shape. */
  width: number;
  height: number;
  title: string;
  caption: string;
  /** Rendered thumbnail width in px. */
  size: number;
  tilt?: number;
  className?: string;
};

/**
 * A real certificate shown as a small tilted sheet of paper. Hover straightens and lifts it;
 * clicking opens the full certificate in a dialog.
 */
export function CertificateThumb({ src, width, height, title, caption, size, tilt = 0, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const landscape = width > height;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View certificate: ${title}`}
        className={`cert-thumb group relative block shrink-0 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg ${className}`}
        style={{ width: size, aspectRatio: `${width} / ${height}`, "--tilt": `${tilt}deg` } as CSSProperties}
      >
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full rounded-[6px] object-cover"
        />
        <span
          aria-hidden="true"
          className="cert-thumb-zoom absolute inset-0 grid place-items-center rounded-[6px] bg-black/35 text-white"
        >
          <Maximize2 strokeWidth={2} className="h-4 w-4" />
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={landscape ? "max-w-[min(1000px,calc(100vw-4rem))]" : "max-w-[min(560px,calc(100vw-4rem))]"}>
          <div className="pr-10">
            <DialogTitle className="text-[17px] font-semibold tracking-[-0.015em] text-fg">{title}</DialogTitle>
            <DialogDescription className="mt-0.5 text-[13.5px] text-fg-muted">{caption}</DialogDescription>
          </div>
          <img
            src={src}
            alt={`${title} certificate`}
            width={width}
            height={height}
            className="max-h-[calc(100dvh-12rem)] w-full rounded-[10px] border border-line object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
