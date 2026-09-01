# BerryMaster — UI Design & Glassmorphism Guidelines

This project strictly follows the **Glassmorphism Design Language** demonstrated in `Glass.png`. All UI development must maintain this aesthetic unless explicitly requested by the user.

---

## 🎨 Core Design Principles

### 1. Canvas & Atmosphere
- **Base Background**: Deep navy-black `#080e1a` (`--bg-app`) with soft ambient radial gradients (`--bg-app-gradient`).
- **Ambient Lighting**: Animated soft radial glows (`.glow-pulse`) and floating firefly sparkles (`.sparkle` / `FloatingLeaves`) layered beneath the UI.
- **Root Shell**: Floating container layout with translucent borders (`border-white/[0.08]`) and backdrop blur (`backdrop-blur-md`).

### 2. Cards & Containers (`.theme-card`, `<Section />`, `<StatCard />`)
- **Surface**: Frosted translucent dark surface (`rgba(15, 23, 42, 0.45)` to `0.55`).
- **Blur**: `backdrop-blur-2xl` to `backdrop-blur-3xl` for a frosted glass depth effect.
- **Borders**: Crisp, subtle semi-transparent borders (`1px solid rgba(255, 255, 255, 0.08)`).
- **Inner Rim Light**: Subtle top inset highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`).
- **Rounding**: Smooth corners (`rounded-xl` for sections/modals, `rounded-2xl` for stat cards).
- **Card Shine / Hover Effect**: Subtle light gleam animation on hover (`.card-shine`).

### 3. Section Headers & Typography
- **Section Indicator**: Vertical emerald accent pill (`h-5 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]`).
- **Headings**: High-contrast crisp white (`#ffffff` / `#f8fafc`).
- **Subtitles / Labels**: Muted slate (`#94a3b8` / `#64748b`), uppercase tracked labels for metadata (`tracking-[0.18em] text-[10px] sm:text-[11px] font-bold`).

### 4. Stat & Metric Cards
- Top accent colored line with glowing top border (`bg-gradient-to-r`).
- Rounded icon pill with themed translucent background and matching border (`bg-emerald-500/15 border-emerald-400/30`).
- Prominent glowing metric counter (`drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]`).
- Pulsing status indicator dot with "UPDATED" label at bottom.

### 5. Color Accents & Semantic Hierarchy
- **Primary / Active / Ready**: Emerald (`#10b981` / `#34d399`) & Teal.
- **Water / Schedule / Info**: Sky / Cyan (`#0ea5e9` / `#38bdf8`).
- **Warning / Harvest / Attention**: Amber (`#f59e0b` / `#fbbf24`).
- **Danger / Wilted**: Rose / Red (`#ef4444` / `#f87171`).

---

> **Rule for Agent Operations:** Any new UI components, pages, modals, widgets, or redesigns must adhere to these tokens and CSS classes (`theme-card`, `theme-hero`, `theme-modal`, `theme-input`, `theme-chip`) to preserve visual continuity with `Glass.png`.
