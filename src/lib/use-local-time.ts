import { useEffect, useState } from "react";

// Renders a placeholder on the server and first client paint so hydration never mismatches.
export function useLocalTime(timeZone: string, options?: { seconds?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      ...(options?.seconds ? { second: "2-digit" } : {}),
      hour12: false,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const interval = options?.seconds ? 1_000 : 15_000;
    const id = window.setInterval(tick, interval);
    return () => window.clearInterval(id);
  }, [timeZone, options?.seconds]);

  return time;
}
