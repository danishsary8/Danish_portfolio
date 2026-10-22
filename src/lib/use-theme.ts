import { useCallback, useSyncExternalStore } from "react";

// Single source of truth: the `dark` class on <html>. Every useTheme() caller
// subscribes to it, so a toggle anywhere updates every component at once.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
// Dark is the default theme, so server HTML renders dark-state props.
const getServerSnapshot = () => true;

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, []);

  return { dark, toggle };
}
