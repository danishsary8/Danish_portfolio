import ace from "@/assets/logos/ace.webp";
import etec from "@/assets/logos/etec.webp";
import kru from "@/assets/logos/kru.webp";
import norton from "@/assets/logos/norton.webp";

// Owner-supplied logos, pre-fitted to 192px squares (2x for the largest tile).
const LOGOS = {
  norton: { src: norton, name: "Norton University" },
  etec: { src: etec, name: "ETEC Center" },
  kru: { src: kru, name: "KruITSolution" },
  ace: { src: ace, name: "Australian Centre for Education" },
} as const;

export type OrgId = keyof typeof LOGOS;

/**
 * An organisation's logo on a white app-icon tile (the logos are designed for white).
 * Decorative by default: the organisation's name is always written next to it.
 */
export function OrgLogo({
  org,
  size = 40,
  className = "",
}: {
  org: OrgId;
  size?: number;
  className?: string;
}) {
  const logo = LOGOS[org];
  return (
    <span
      aria-hidden="true"
      className={`logo-tile squircle relative inline-grid shrink-0 place-items-center overflow-hidden ${className}`}
      style={{ width: size, height: size, ["--r" as string]: `${Math.round(size * 0.26)}px` }}
    >
      <img
        src={logo.src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
