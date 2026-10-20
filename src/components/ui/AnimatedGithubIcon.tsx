import { useEffect, useState, useMemo, type ComponentType } from "react";
import { SiGithub } from "react-icons/si";
import githubLottieData from "@/assets/github-lottie.json";
import { useTheme } from "@/lib/use-theme";

interface AnimatedGithubIconProps {
  className?: string;
  dark?: boolean;
  "aria-hidden"?: boolean | "true" | "false";
}

export function AnimatedGithubIcon({
  className,
  dark: propDark,
  "aria-hidden": ariaHidden = true,
}: AnimatedGithubIconProps) {
  const [LottieComponent, setLottieComponent] = useState<ComponentType<any> | null>(null);
  const { dark: contextDark } = useTheme();
  const isDark = propDark !== undefined ? propDark : contextDark;

  useEffect(() => {
    let active = true;
    import("lottie-react")
      .then((mod) => {
        if (active) {
          setLottieComponent(() => mod.Lottie);
        }
      })
      .catch(() => {
        /* Fallback remains active */
      });
    return () => {
      active = false;
    };
  }, []);

  // Adapt the Lottie fill color according to theme
  // In dark theme: bright white [1, 1, 1, 1]
  // In light theme: rich dark [0.07, 0.07, 0.07, 1]
  const animationData = useMemo(() => {
    try {
      const cloned = JSON.parse(JSON.stringify(githubLottieData));
      const targetColor = isDark ? [1, 1, 1, 1] : [0.07, 0.07, 0.07, 1];
      if (
        cloned?.layers?.[0]?.shapes?.[0]?.it?.[1]?.c?.k &&
        Array.isArray(cloned.layers[0].shapes[0].it[1].c.k)
      ) {
        cloned.layers[0].shapes[0].it[1].c.k = targetColor;
      }
      return cloned;
    } catch {
      return githubLottieData;
    }
  }, [isDark]);

  if (!LottieComponent) {
    return <SiGithub className={className} aria-hidden={ariaHidden} />;
  }

  const Lottie = LottieComponent;

  return (
    <span
      className={`inline-flex items-center justify-center animated-github-lottie pointer-events-none ${
        className || "h-5 w-5"
      }`}
      aria-hidden={ariaHidden}
    >
      <Lottie
        src={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </span>
  );
}
