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
  { id: 0,  left: "12%",  top: "18%", delay: "0s",    duration: "3.2s", size: "5px" },
  { id: 1,  left: "27%",  top: "62%", delay: "0.7s",  duration: "4.1s", size: "4px" },
  { id: 2,  left: "45%",  top: "30%", delay: "1.4s",  duration: "3.6s", size: "6px" },
  { id: 3,  left: "61%",  top: "75%", delay: "0.3s",  duration: "5.0s", size: "4px" },
  { id: 4,  left: "78%",  top: "22%", delay: "2.1s",  duration: "3.8s", size: "5px" },
  { id: 5,  left: "88%",  top: "55%", delay: "0.9s",  duration: "4.5s", size: "4px" },
  { id: 6,  left: "35%",  top: "85%", delay: "1.8s",  duration: "3.3s", size: "5px" },
  { id: 7,  left: "55%",  top: "10%", delay: "0.5s",  duration: "4.8s", size: "6px" },
  { id: 8,  left: "70%",  top: "40%", delay: "2.6s",  duration: "3.1s", size: "4px" },
  { id: 9,  left: "20%",  top: "48%", delay: "1.2s",  duration: "4.2s", size: "5px" },
  { id: 10, left: "92%",  top: "80%", delay: "3.0s",  duration: "3.7s", size: "4px" },
  { id: 11, left: "5%",   top: "70%", delay: "0.2s",  duration: "5.2s", size: "6px" },
  { id: 12, left: "50%",  top: "50%", delay: "1.6s",  duration: "3.9s", size: "4px" },
  { id: 13, left: "83%",  top: "12%", delay: "2.4s",  duration: "4.4s", size: "5px" },
  { id: 14, left: "40%",  top: "95%", delay: "0.8s",  duration: "3.5s", size: "4px" },
];