import React, { memo, useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import GlareHover from "@/components/ui/GlareHover";
import "./ProfileCard.css";

const THEMES = {
  dark: {
    "--pc-frame": "rgba(18, 18, 20, 0.82)",
    "--pc-frame-edge": "rgba(255, 255, 255, 0.08)",
    "--pc-frame-highlight": "rgba(255, 255, 255, 0.12)",
    "--pc-frame-shadow": "0 22px 44px -18px rgba(0, 0, 0, 0.8), 0 4px 12px -4px rgba(0, 0, 0, 0.5)",
    "--pc-tile": "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
    "--pc-tile-edge": "rgba(255, 255, 255, 0.08)",
    "--pc-tile-highlight": "rgba(255, 255, 255, 0.15)",
    "--pc-tile-shadow": "0 4px 10px -4px rgba(0, 0, 0, 0.6)",
    "--pc-ink": "#ededef",
    "--pc-muted": "rgba(237, 237, 239, 0.65)",
    "--pc-hover": "brightness(1.08)",
    "--pc-press": "brightness(0.85)",
    "--pc-shade": "rgba(0, 0, 0, 0.35)",
  },
  light: {
    "--pc-frame": "rgba(255, 255, 255, 0.92)",
    "--pc-frame-edge": "rgba(10, 10, 12, 0.08)",
    "--pc-frame-highlight": "rgba(255, 255, 255, 0.95)",
    "--pc-frame-shadow": "0 18px 36px -16px rgba(10, 10, 12, 0.1), 0 3px 10px -4px rgba(10, 10, 12, 0.05)",
    "--pc-tile": "linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)",
    "--pc-tile-edge": "rgba(10, 10, 12, 0.07)",
    "--pc-tile-highlight": "rgba(255, 255, 255, 1)",
    "--pc-tile-shadow": "0 4px 10px -5px rgba(10, 10, 12, 0.12)",
    "--pc-ink": "#111113",
    "--pc-muted": "rgba(17, 17, 19, 0.65)",
    "--pc-hover": "brightness(0.98)",
    "--pc-press": "brightness(0.93)",
    "--pc-shade": "rgba(10, 10, 12, 0.1)",
  },
};

const FOILS = {
  dark: {
    "--pc-blend": "color-dodge",
    "--pc-holo-filter": "hue-rotate(0deg)",
    "--pc-sheen": "rgba(255, 255, 255, 0.16)",
  },
  light: {
    "--pc-blend": "multiply",
    "--pc-holo-filter": "invert(1) hue-rotate(180deg)",
    "--pc-sheen": "rgba(255, 255, 255, 0)",
  },
};

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>",
)}")`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  statusColor?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  theme?: "dark" | "light";
  backdropColor?: string;
  radius?: number;
  holo?: number;
  glare?: number;
  enableTilt?: boolean;
  tiltStrength?: number;
  parallax?: number;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  intro?: boolean;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = memo(({
  avatarUrl = "",
  iconUrl,
  miniAvatarUrl,
  name = "Sary Danish",
  title = "Junior Software Developer",
  handle = "danishsary8",
  status = "Open to roles",
  statusColor = "#b0822d",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  theme = "dark",
  backdropColor,
  radius = 16,
  holo = 0.65,
  glare = 0.45,
  enableTilt = false,
  tiltStrength = 0,
  parallax = 0,
  enableMobileTilt = false,
  mobileTiltSensitivity = 0,
  intro = false,
  className = "",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const settings = { enableTilt, tiltStrength, parallax, mobileTiltSensitivity, intro };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const size = { width: root.offsetWidth || 320, height: root.offsetHeight || 420 };
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let raf = 0;
    let last = 0;
    let slowUntil = 0;
    let touchId: number | null = null;

    const write = () => {
      const { enableTilt: tiltOn, tiltStrength: strength, parallax: depth } = settingsRef.current;
      const angle = tiltOn && !reduced ? strength : 0;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const style = root.style;
      style.setProperty("--pc-light-x", `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
      style.setProperty("--pc-light-y", `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
      style.setProperty("--pc-pointer-x", `${((x.p + 1) * 50).toFixed(2)}%`);
      style.setProperty("--pc-pointer-y", `${((y.p + 1) * 50).toFixed(2)}%`);
      style.setProperty("--pc-band-x", `${(50 + x.p * 15).toFixed(2)}%`);
      style.setProperty("--pc-band-y", `${(50 + y.p * 15).toFixed(2)}%`);
      style.setProperty("--pc-rotate-x", `${(y.p * angle).toFixed(3)}deg`);
      style.setProperty("--pc-rotate-y", `${(-x.p * angle).toFixed(3)}deg`);
      style.setProperty("--pc-shift-x", `${(x.p * (reduced ? 0 : depth)).toFixed(2)}px`);
      style.setProperty("--pc-shift-y", `${(y.p * (reduced ? 0 : depth)).toFixed(2)}px`);
      style.setProperty("--pc-reach", tilt.toFixed(4));
      style.setProperty("--pc-tilt", (tilt * light.p).toFixed(4));
      style.setProperty("--pc-active", light.p.toFixed(4));
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h;
          axis.p += axis.v * h;
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002;
      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        x.p = x.target;
        y.p = y.target;
        light.p = light.target;
        write();
        raf = 0;
      }
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const aim = (nx: number, ny: number, on = true) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = on ? 1 : 0;
      slowUntil = 0;
      wake();
    };

    const aimAt = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      aim(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const release = () => aim(0, 0, false);

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") aimAt(event);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerId === touchId) aimAt(event);
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") release();
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      touchId = event.pointerId;
      aimAt(event);
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== touchId) return;
      touchId = null;
      release();
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    const observer = new ResizeObserver(() => {
      size.width = root.offsetWidth || 320;
      size.height = root.offsetHeight || 420;
      write();
    });
    observer.observe(root);

    engineRef.current = { aim, release, write };

    if (settingsRef.current.intro && !reduced) {
      x.p = 0.55;
      y.p = -0.45;
      light.p = 0.8;
      slowUntil = performance.now() + 1200;
      write();
      wake();
    } else {
      write();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.write();
  }, [enableTilt, tiltStrength, parallax]);

  const palette = theme === "light" ? "light" : "dark";
  const foil = palette;
  const backdrop = backdropColor || "var(--pc-tile)";

  return (
    <div
      ref={rootRef}
      className={`profile-card ${className}`.trim()}
      style={{
        ...THEMES[palette],
        ...FOILS[foil],
        "--pc-radius": `${Math.max(0, radius)}px`,
        "--pc-backdrop": backdrop,
        "--pc-holo": clamp(holo, 0, 1),
        "--pc-glare": clamp(glare, 0, 1),
        "--pc-parallax": `${Math.max(0, parallax)}px`,
        "--pc-status": statusColor,
        "--pc-grain": GRAIN,
        "--pc-pattern": iconUrl ? `url("${iconUrl}")` : "linear-gradient(#000, #000)",
        "--pc-pattern-size": iconUrl ? "180% auto" : "100% 100%",
        "--pc-holo-gain": iconUrl ? 1.25 : 0.75,
        "--pc-holo-detail": iconUrl && foil === "dark" ? 1 : 0,
      } as any}
    >
      <div className="profile-card__body">
        <div className="profile-card__tile">
          <span className="profile-card__sheen" />
          <span className="profile-card__holo">
            <span className="profile-card__holo-glow" />
            <span className="profile-card__holo-shift" />
          </span>
          {avatarUrl && (
            <GlareHover
              width="100%"
              height="100%"
              borderRadius="var(--pc-radius)"
              mode="hover"
              variant="streak"
              glareColor="#ffffff"
              glareOpacity={0.5}
              glareSize={30}
              softness={0.6}
              glareAngle={-45}
              blendMode="screen"
              rimGlint={true}
              transitionDuration={650}
              className="absolute inset-0 w-full h-full"
            >
              <img
                className="profile-card__photo"
                src={avatarUrl}
                alt={name || "Sary Danish"}
                loading="eager"
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith("/danish-photo.jpg")) {
                    target.src = "/danish-photo.jpg";
                  }
                }}
              />
            </GlareHover>
          )}
          {(name || title) && (
            <>
              <span className="profile-card__scrim" />
              <div className="profile-card__info">
                {name && <h3 className="profile-card__name">{name}</h3>}
                {title && <p className="profile-card__title">{title}</p>}
              </div>
            </>
          )}
          <span className="profile-card__tile-rim" />
        </div>

        {showUserInfo && (
          <div className="profile-card__footer">
            {miniAvatarUrl && (
              <span className="profile-card__avatar">
                <img src={miniAvatarUrl} alt="" loading="lazy" draggable={false} />
              </span>
            )}
            <div className="profile-card__meta">
              {handle && (
                /^\+?\d/.test(handle) ? (
                  <a
                    href={`tel:${handle.replace(/\s+/g, '')}`}
                    className="profile-card__handle font-mono hover:text-gold transition-colors duration-150 select-none inline-flex items-center gap-1"
                    title={`Call ${name || 'Sary Danish'}`}
                  >
                    {handle}
                  </a>
                ) : (
                  <span className="profile-card__handle">
                    {handle.startsWith('@') ? handle : `@${handle}`}
                  </span>
                )
              )}
              {status && <span className="profile-card__status">{status}</span>}
            </div>
            {contactText && (
              <button
                type="button"
                className="profile-card__contact"
                onClick={onContactClick}
                aria-label={name ? `${contactText} ${name}` : contactText}
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                {contactText}
              </button>
            )}
          </div>
        )}

        <span className="profile-card__glare" />
        <span className="profile-card__shade" />
        <span className="profile-card__rim" />
      </div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";
export default ProfileCard;
