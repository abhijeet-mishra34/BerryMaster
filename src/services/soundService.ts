import { hapticService } from "./hapticService";

// Procedural Web Audio API sound generator for BerryMaster
// No external MP3 files required — works offline, in Tauri, and in browsers.

class SoundService {
  private ctx: AudioContext | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    const saved = localStorage.getItem("berrymaster_sound_enabled");
    return saved !== null ? saved === "true" : true;
  }

  public setEnabled(enabled: boolean): void {
    localStorage.setItem("berrymaster_sound_enabled", String(enabled));
  }

  public getVolume(): number {
    const saved = localStorage.getItem("berrymaster_sound_volume");
    return saved !== null ? Number(saved) : 0.6;
  }

  public setVolume(volume: number): void {
    localStorage.setItem("berrymaster_sound_volume", String(Math.max(0, Math.min(1, volume))));
  }

  /**
   * Fresh, ascending crystal droplet chime for watering berries
   */
  public playWaterSound(): void {
    hapticService.water();
    if (!this.isEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const volume = this.getVolume();
    const now = ctx.currentTime;

    // Frequencies: C6, E6, G6 (Ascending water drops)
    const notes = [1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.3 * volume, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  }

  /**
   * Rewarding major triad fanfare chime for harvesting ripe berries
   */
  public playHarvestSound(): void {
    hapticService.harvest();
    if (!this.isEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const volume = this.getVolume();
    const now = ctx.currentTime;

    // Frequencies: G5, C6, E6, G6 fanfare
    const notes = [783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.35 * volume, now + idx * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.46);
    });
  }

  /**
   * Gentle dual-ping notification chime for timers or needs attention
   */
  public playAlertSound(): void {
    hapticService.alert();
    if (!this.isEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const volume = this.getVolume();
    const now = ctx.currentTime;

    const pings = [880, 1174.66]; // A5 -> D6
    pings.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.25 * volume, now + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.36);
    });
  }

  /**
   * Subtle tactile glass tap for button feedback
   */
  public playClickSound(): void {
    hapticService.tap();
    if (!this.isEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const volume = this.getVolume();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.12 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Warm up and resume AudioContext upon first touch gesture on mobile WebViews
   */
  public unlockAudio(): void {
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }
}

export const soundService = new SoundService();

// Auto-warmup Web Audio on first user interaction for Android WebView
if (typeof window !== "undefined") {
  const handleFirstInteraction = () => {
    soundService.unlockAudio();
    window.removeEventListener("touchstart", handleFirstInteraction);
    window.removeEventListener("pointerdown", handleFirstInteraction);
    window.removeEventListener("click", handleFirstInteraction);
  };
  window.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
  window.addEventListener("pointerdown", handleFirstInteraction, { passive: true, once: true });
  window.addEventListener("click", handleFirstInteraction, { passive: true, once: true });
}
