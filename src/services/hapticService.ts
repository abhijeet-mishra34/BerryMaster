// Haptic vibration feedback service for Android and mobile devices
// Uses the standard Web Vibration API (navigator.vibrate)

class HapticService {
  private isSupported(): boolean {
    return typeof window !== "undefined" && typeof navigator !== "undefined" && "vibrate" in navigator;
  }

  public isEnabled(): boolean {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("berrymaster_haptic_enabled");
    return saved !== null ? saved === "true" : true;
  }

  public setEnabled(enabled: boolean): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("berrymaster_haptic_enabled", String(enabled));
  }

  private trigger(pattern: number | number[]): void {
    if (!this.isSupported() || !this.isEnabled()) return;
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration errors on unsupported runtimes
    }
  }

  /**
   * Subtle micro-tap for button clicks, tabs, and filters (12ms)
   */
  public tap(): void {
    this.trigger(12);
  }

  /**
   * Crisp double-tap for successful actions or toggles
   */
  public success(): void {
    this.trigger([15, 40, 20]);
  }

  /**
   * Fluid water droplet vibration pulse for watering crops
   */
  public water(): void {
    this.trigger([20, 30, 25]);
  }

  /**
   * Rewarding fanfare vibration burst for harvesting ready berries
   */
  public harvest(): void {
    this.trigger([35, 45, 30, 45, 60]);
  }

  /**
   * Gentle dual-pulse alert for wilt warnings or timer alerts
   */
  public alert(): void {
    this.trigger([45, 60, 45]);
  }

  /**
   * Warning vibration for deletions or resets
   */
  public warning(): void {
    this.trigger([60, 80, 70]);
  }
}

export const hapticService = new HapticService();
