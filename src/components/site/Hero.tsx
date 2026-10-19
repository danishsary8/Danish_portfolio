import { useEffect, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Award, FileText, Github, GraduationCap } from "lucide-react";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { SPRING_ENTRANCE } from "@/lib/motion";
import { useLocalTime } from "@/lib/use-local-time";

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

function Portrait() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const tiltEnabled = fine && !reduce;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 24 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 24 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[300px] [perspective:1100px] sm:max-w-[380px] lg:max-w-[420px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        style={tiltEnabled ? { rotateX: rx, rotateY: ry } : {}}
        className="glass-panel glass-elevated relative p-2.5 [transform-style:preserve-3d]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-[var(--glass-surface-strong)]">
          <img
            src={ASSETS.profile.photo}
            alt="Portrait of Sary Danish"
            width={816}
            height={816}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </motion.div>

      <div className="glass-panel glass-elevated absolute -bottom-5 -left-4 flex w-max max-w-[calc(100vw-2rem)] items-center gap-3 px-3.5 py-3 sm:-left-10">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-gold text-[#0A0A0A]">
          <Award className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="text-[13px] leading-[1.3]">
          <span className="block font-semibold text-primaryText">Award Winner 2026</span>
          <span className="block whitespace-nowrap text-mutedText">
            AI Expert System &amp; Innovation
          </span>
        </span>
      </div>

      <div className="glass-panel glass-elevated absolute -right-4 top-6 flex items-center gap-2.5 px-3 py-2.5 sm:-right-8">
        <GraduationCap
          className="h-[18px] w-[18px] text-gold-ink"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="text-[13px] font-medium text-primaryText">Norton University · Year 4</span>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const time = useLocalTime(PROFILE.timezone);

  // Server render has no reduced-motion signal, so always resolve to the resting position.
  const item = (i: number) =>
    reduce
      ? { initial: false as const, animate: { y: 0 } }
      : {
          initial: { y: 24 },
          animate: { y: 0 },
          transition: { ...SPRING_ENTRANCE, delay: 0.05 + i * 0.07 },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:grid-cols-[1.45fr_1fr] lg:gap-10 lg:pb-32 lg:pt-44"
    >
      <div>
        <motion.div
          {...item(0)}
          className="glass-panel mb-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-control px-3.5 py-2 text-[13px]"
        >
          <span className="inline-flex items-center gap-2 font-medium text-primaryText">
            <span aria-hidden="true" className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-gold motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
              <span className="relative h-2 w-2 rounded-full bg-gold" />
            </span>
            Open to web developer roles
          </span>
          <span className="text-mutedText">
            {PROFILE.location.split(",")[0]} ·{" "}
            <span className="font-mono tabular-nums">{time ?? "--:--"}</span>{" "}
            {PROFILE.timezoneLabel}
          </span>
        </motion.div>

        <motion.h1
          {...item(1)}
          id="hero-title"
          className="font-display text-[clamp(3.6rem,13vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-primaryText"
        >
          Sary
          <br />
          Danish
        </motion.h1>

        <motion.p
          {...item(2)}
          className="mt-7 font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold tracking-[-0.02em] text-primaryText"
        >
          {PROFILE.role}
        </motion.p>

        <motion.p
          {...item(3)}
          className="mt-3 max-w-[46ch] text-[17px] leading-[1.6] text-mutedText sm:text-[18px]"
        >
          {PROFILE.pitch}
        </motion.p>

        <motion.div {...item(4)} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex h-12 items-center gap-2 rounded-control bg-primaryText px-5 text-[15px] font-semibold text-[var(--bg-base)] transition-[background-color,color,transform] duration-150 hover:bg-gold hover:text-[#0A0A0A] active:scale-[0.98]"
          >
            View selected work
            <ArrowDown
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="glass-panel inline-flex h-12 items-center gap-2 rounded-control px-5 text-[15px] font-medium text-primaryText transition-[border-color,transform] duration-150 hover:border-gold active:scale-[0.98]"
          >
            <Github className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            GitHub
            <ArrowUpRight className="h-4 w-4 text-mutedText" strokeWidth={1.5} aria-hidden="true" />
          </a>
          {CV_HREF !== "#" && CV_HREF !== "" ? (
            <a
              {...getCvLinkProps()}
              className="inline-flex h-12 items-center gap-2 rounded-control px-4 text-[15px] font-medium text-primaryText underline-offset-4 transition-colors hover:text-gold-ink hover:underline"
            >
              <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Download CV
            </a>
          ) : null}
        </motion.div>
      </div>

      <motion.div
        {...(reduce
          ? { initial: false as const, animate: { y: 0, scale: 1 } }
          : {
              initial: { y: 32, scale: 0.97 },
              animate: { y: 0, scale: 1 },
              transition: { ...SPRING_ENTRANCE, delay: 0.2 },
            })}
        className="pb-6"
      >
        <Portrait />
      </motion.div>
    </section>
  );
}
