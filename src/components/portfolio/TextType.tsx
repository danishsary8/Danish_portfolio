import { useEffect, useState } from "react";

/** React Bits TextType adaptation: single pass, no deletion or looping.
 * https://reactbits.dev/text-animations/text-type
 * Keep the complete name readable during SSR and underneath the typed ink.
 */
export function TextType({ lines }: { lines: readonly string[] }) {
  const text = lines.join("");
  const [count, setCount] = useState(text.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      clearTimeout(timer);
      setCount(text.length);
      setTyping(false);
    };
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    if (!preference.matches) {
      timer = setTimeout(() => {
        setTyping(true);
        setCount(0);
        let next = 0;
        const type = () => {
          next += 1;
          setCount(next);
          if (next < text.length) timer = setTimeout(type, 85);
          else timer = setTimeout(finish, 350);
        };
        timer = setTimeout(type, 85);
      }, 180);
    }
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [text]);

  let offset = 0;
  return (
    <span className="text-type" aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => {
        const start = offset;
        offset += line.length;
        return (
          <span
            key={line}
            className={lineIndex ? "text-type-line text-primary-glow" : "text-type-line"}
            aria-hidden="true"
          >
            {Array.from(line).map((character, index) => (
              <span
                className="text-type-character"
                key={`${index}-${character}`}
                data-typed={start + index < count}
                data-cursor={typing && start + index === Math.max(0, count - 1)}
              >
                <span className="text-type-base">{character}</span>
                <span className="text-type-ink">{character}</span>
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
