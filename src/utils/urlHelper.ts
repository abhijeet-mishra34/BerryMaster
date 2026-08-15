/**
 * Safely opens an external URL in the system's default browser or new tab.
 */
export function openExternalUrl(url: string): void {
  if (!url) return;

  try {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w || w.closed || typeof w.closed === "undefined") {
      // If popup/new window was blocked or inside embedded webview
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (err) {
    console.warn("Failed to open URL via window.open, falling back to location.assign:", err);
    window.location.assign(url);
  }
}
