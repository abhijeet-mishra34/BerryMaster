import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, X, Sparkles } from "lucide-react";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const STORAGE_KEY = "berrymaster_last_feedback_prompt";

export default function FeedbackPromptBot() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Don't show if already on feedback page
    if (location.pathname === "/feedback") {
      setIsVisible(false);
      return;
    }

    const lastPrompt = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (!lastPrompt || now - parseInt(lastPrompt, 10) > SIX_HOURS_MS) {
      // Delay prompt appearance by 3 seconds for smooth experience
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem(STORAGE_KEY, now.toString());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (!isVisible) return null;

  const handleOpenFeedback = () => {
    setIsVisible(false);
    navigate("/feedback");
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="fixed z-40 max-w-sm animate-bounce-subtle bottom-20 right-4 sm:bottom-6 sm:right-6"
      style={{
        bottom: "calc(5.25rem + max(env(safe-area-inset-bottom, 0px), 8px))",
      }}
    >
      <div className="theme-card relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-slate-900/90 p-4 shadow-2xl shadow-emerald-500/15 backdrop-blur-2xl">
        {/* Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />

        <div className="flex items-start gap-3.5">
          {/* Bot Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black shadow-md shadow-emerald-500/30">
              <span className="text-xl select-none">🤖</span>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 border-2 border-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400">
              <Sparkles className="h-3 w-3" />
              <span>BerryMaster Bot</span>
            </div>

            <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-200">
              If you can please share your experience or feedback with us! 🍓
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenFeedback}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-black text-slate-950 shadow-md shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Share Feedback</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Later
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5"
            aria-label="Dismiss feedback prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
