import { useState, useEffect, useRef, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Lock, Maximize2, X } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { GlareHover } from "@/components/ui/GlareHover";

const host = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  // Aggregate all available images for this project
  const images = (project.images && project.images.length > 0)
    ? project.images
    : project.image
      ? [project.image]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const hasMultiple = images.length > 1;

  // Reset current index when project changes
  useEffect(() => {
    setCurrentIndex(0);
    setLightboxOpen(false);
  }, [project.id]);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.currentSrc && el.naturalWidth === 0) {
      setFailed((prev) => ({ ...prev, [currentIndex]: true }));
    }
  }, [currentIndex, images]);

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
        return;
      }
      if (!hasMultiple) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasMultiple, images.length, lightboxOpen]);

  // Touch swipe handling
  const minSwipeDistance = 45;
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <>
      <div className="tactile squircle [--r:20px] w-full overflow-hidden select-none bg-surface-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        {/* Safari Window Chrome */}
        <div className="flex h-10 items-center gap-3 border-b border-[var(--edge)] bg-surface-1/95 px-4 shadow-[inset_0_-1px_0_var(--specular)]">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="icon-tile-light mx-auto flex h-6 min-w-0 max-w-[65%] items-center gap-1.5 rounded-[7px] px-2.5 font-mono text-[11.5px] text-fg-subtle">
            <Lock aria-hidden="true" strokeWidth={1.75} className="h-3 w-3 shrink-0" />
            <span className="truncate">{host(project.liveUrl)}</span>
          </span>
          <div className="flex w-[42px] items-center justify-end gap-1.5">
            {hasMultiple ? (
              <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-mono text-fg-subtle">
                {currentIndex + 1}/{images.length}
              </span>
            ) : null}
          </div>
        </div>

        {/* Slide Viewport with GlareHover */}
        <GlareHover
          glareColor="#ffffff"
          glareOpacity={0.14}
          variant="sheen"
          borderRadius="0px"
          transitionDuration={800}
          width="100%"
          className="relative aspect-[16/10] w-full overflow-hidden bg-surface-1"
        >
          <div
            className="relative h-full w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {images.length > 0 && !failed[currentIndex] ? (
              <div
                key={currentIndex}
                className={`relative h-full w-full cursor-zoom-in animate-in fade-in duration-300 ${
                  direction === "next" ? "slide-in-from-right-3" : "slide-in-from-left-3"
                }`}
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  ref={imgRef}
                  src={images[currentIndex]}
                  alt={project.imageAlt ?? `${project.title} screenshot ${currentIndex + 1}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((prev) => ({ ...prev, [currentIndex]: true }))}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                  aria-label="Expand image"
                  className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/75 active:scale-95 shadow-md"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : project.id === "diabetes" ? (
              /* Bilingual clinical expert assistant view */
              <div className="relative grid h-full w-full place-items-center overflow-hidden bg-surface-1 p-6 text-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_65%_at_50%_45%,var(--glow),transparent_75%)]"
                />
                <div className="relative">
                  <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[12px] font-medium text-gold-ink dark:text-gold mb-3">
                    Bilingual Clinical Assistant
                  </span>
                  <p className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-fg">
                    EN <span className="text-fg-subtle">/</span>{" "}
                    <span lang="km" className="font-khmer">
                      ខ្មែរ
                    </span>
                  </p>
                  <p className="mt-2 text-[14px] text-fg-muted max-w-sm mx-auto">
                    Rule-based clinical decision support engine & early diabetes screening
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid h-full w-full place-items-center bg-surface-1 p-6 text-center">
                <span className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-[-0.04em] text-fg-subtle">
                  {project.title}
                </span>
              </div>
            )}

            {/* Previous / Next Chevron Buttons */}
            {hasMultiple ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md transition-all active:scale-90 shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md transition-all active:scale-90 shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            {/* Bottom Pagination Dots */}
            {hasMultiple ? (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md shadow-md">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(i > currentIndex ? "next" : "prev");
                      setCurrentIndex(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "w-5 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </GlareHover>

        {/* Thumbnail Bar if multiple images */}
        {hasMultiple ? (
          <div className="flex gap-2 p-2.5 bg-surface-2 border-t border-[var(--edge)] overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? "next" : "prev");
                  setCurrentIndex(idx);
                }}
                className={`relative aspect-[16/10] h-12 shrink-0 overflow-hidden rounded-md border transition-all ${
                  idx === currentIndex
                    ? "border-gold ring-1 ring-gold opacity-100 scale-[1.03]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && images[currentIndex] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded screenshot preview"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            className="relative max-h-[92vh] max-w-[96vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-surface-1"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={project.imageAlt ?? `${project.title} screenshot`}
              className="max-h-[85vh] max-w-[92vw] object-contain"
            />
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close expanded view"
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/85 transition-all active:scale-95"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default ProjectGallery;
