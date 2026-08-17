export default function FarmingBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary pulsing glow — centre-bottom */}
      <div className="glow-pulse glow-primary" />

      {/* Secondary glow — offset top-left for depth */}
      <div className="glow-pulse glow-secondary" />

      {/* Sparkle dots */}
      {SPARKLES.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            animationDuration: s.duration,
            width: s.size,
            height: s.size,
          }}
        />
      ))}
    </div>
  );
}

/* ── Stable sparkle data (no random on every render) ── */
const SPARKLES = [
  { id: 0,  left: "8%",   top: "14%", delay: "0s",    duration: "3.4s", size: "5px" },
  { id: 1,  left: "22%",  top: "68%", delay: "0.7s",  duration: "4.2s", size: "4px" },
  { id: 2,  left: "42%",  top: "28%", delay: "1.4s",  duration: "3.6s", size: "6px" },
  { id: 3,  left: "64%",  top: "76%", delay: "0.3s",  duration: "4.8s", size: "4px" },
  { id: 4,  left: "76%",  top: "18%", delay: "2.1s",  duration: "3.8s", size: "5px" },
  { id: 5,  left: "89%",  top: "52%", delay: "0.9s",  duration: "4.5s", size: "4px" },
  { id: 6,  left: "32%",  top: "84%", delay: "1.8s",  duration: "3.3s", size: "5px" },
  { id: 7,  left: "53%",  top: "8%",  delay: "0.5s",  duration: "4.6s", size: "6px" },
  { id: 8,  left: "72%",  top: "38%", delay: "2.6s",  duration: "3.2s", size: "4px" },
  { id: 9,  left: "18%",  top: "46%", delay: "1.2s",  duration: "4.1s", size: "5px" },
  { id: 10, left: "94%",  top: "78%", delay: "3.0s",  duration: "3.7s", size: "4px" },
  { id: 11, left: "4%",   top: "62%", delay: "0.2s",  duration: "5.1s", size: "5px" },
  { id: 12, left: "48%",  top: "48%", delay: "1.6s",  duration: "3.9s", size: "4px" },
  { id: 13, left: "84%",  top: "10%", delay: "2.4s",  duration: "4.3s", size: "5px" },
  { id: 14, left: "38%",  top: "94%", delay: "0.8s",  duration: "3.5s", size: "4px" },
  { id: 15, left: "14%",  top: "88%", delay: "2.8s",  duration: "4.0s", size: "4px" },
  { id: 16, left: "29%",  top: "12%", delay: "1.1s",  duration: "4.7s", size: "5px" },
  { id: 17, left: "58%",  top: "62%", delay: "3.3s",  duration: "3.5s", size: "4px" },
  { id: 18, left: "68%",  top: "90%", delay: "1.5s",  duration: "4.4s", size: "5px" },
  { id: 19, left: "82%",  top: "66%", delay: "0.4s",  duration: "3.8s", size: "6px" },
  { id: 20, left: "91%",  top: "32%", delay: "2.2s",  duration: "4.6s", size: "4px" },
  { id: 21, left: "11%",  top: "34%", delay: "3.6s",  duration: "3.3s", size: "4px" },
  { id: 22, left: "25%",  top: "82%", delay: "1.9s",  duration: "4.9s", size: "5px" },
  { id: 23, left: "37%",  top: "42%", delay: "2.5s",  duration: "3.7s", size: "4px" },
  { id: 24, left: "62%",  top: "22%", delay: "1.7s",  duration: "4.3s", size: "5px" },
  { id: 25, left: "75%",  top: "54%", delay: "3.1s",  duration: "3.4s", size: "4px" },
  { id: 26, left: "86%",  top: "86%", delay: "0.6s",  duration: "4.8s", size: "5px" },
  { id: 27, left: "46%",  top: "70%", delay: "2.9s",  duration: "3.6s", size: "5px" },
  { id: 28, left: "6%",   top: "92%", delay: "1.3s",  duration: "4.5s", size: "4px" },
  { id: 29, left: "52%",  top: "88%", delay: "2.0s",  duration: "3.9s", size: "4px" },
  { id: 30, left: "96%",  top: "16%", delay: "1.0s",  duration: "4.1s", size: "5px" },
  { id: 31, left: "33%",  top: "58%", delay: "3.5s",  duration: "4.0s", size: "5px" },
];