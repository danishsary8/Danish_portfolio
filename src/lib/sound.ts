import { useCallback, useEffect, useState } from "react";

// Web Audio API micro-synthesizer for tactile feedback
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = localStorage.getItem("portfolio_sound_fx") === "true";
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_sound_fx", String(this.enabled));
    }
    if (this.enabled) {
      this.initContext();
      this.playTone(880, 0.04, 0.06);
    }
    return this.enabled;
  }

  public playTone(freq = 600, duration = 0.05, peakGain = 0.05) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + duration);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Gracefully silent if audio context is blocked
    }
  }

  public playClick() {
    this.playTone(1100, 0.035, 0.04);
  }

  public playHover() {
    this.playTone(750, 0.02, 0.015);
  }
}

export const soundManager = new SoundManager();

export function useSoundEffect() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(soundManager.isEnabled());
  }, []);

  const toggle = useCallback(() => {
    const next = soundManager.toggle();
    setEnabled(next);
  }, []);

  const playClick = useCallback(() => {
    soundManager.playClick();
  }, []);

  const playHover = useCallback(() => {
    soundManager.playHover();
  }, []);

  return { soundEnabled: enabled, toggleSound: toggle, playClick, playHover };
}
