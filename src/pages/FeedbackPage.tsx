import { useState } from "react";
import {
  MessageSquare,
  Bug,
  Lightbulb,
  Sparkles,
  Star,
  CheckCircle2,
  ExternalLink,
  History,
  Copy,
  Check,
  Send,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  submitFeedback,
  getFeedbackHistory,
  clearFeedbackHistory,
  type FeedbackCategory,
  type FeedbackItem,
} from "../services/feedbackService";
import { sendFeedbackToDiscord } from "../services/discordService";

export default function FeedbackPage() {
  const [category, setCategory] = useState<FeedbackCategory>("general");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"submit" | "history">("submit");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [history, setHistory] = useState<FeedbackItem[]>(getFeedbackHistory());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Always save locally first — Discord is a bonus
    submitFeedback({
      category,
      rating,
      subject: subject.trim(),
      message: message.trim(),
      email: email.trim() || undefined,
    });

    // Fire Discord webhook (non-blocking failure)
    try {
      await sendFeedbackToDiscord({
        category,
        rating,
        subject: subject.trim(),
        message: message.trim(),
        email: email.trim() || undefined,
      });
    } catch (err) {
      console.warn("[BerryMaster] Discord webhook failed:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setHistory(getFeedbackHistory());

    // Reset fields
    setSubject("");
    setMessage("");
    setEmail("");
  }

  function handleOpenTally() {
    try {
      window.open("https://tally.so/r/NpQjLN", "_blank", "noopener,noreferrer");
    } catch {
      // Fallback
    }
  }

  function handleCopyTallyLink() {
    navigator.clipboard.writeText("https://tally.so/r/NpQjLN");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  function handleClearHistory() {
    clearFeedbackHistory();
    setHistory([]);
  }

  const categoryOptions: { id: FeedbackCategory; label: string; icon: typeof Bug; description: string }[] = [
    { id: "general", label: "General Feedback", icon: MessageSquare, description: "Overall impressions & thoughts" },
    { id: "bug", label: "Bug Report", icon: Bug, description: "Something broke or isn't working right" },
    { id: "feature", label: "Feature Idea", icon: Lightbulb, description: "New features you'd like to see" },
    { id: "ux", label: "UX Improvement", icon: Sparkles, description: "UI layout or usability tweaks" },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <MessageSquare className="h-5 w-5" />
              </span>
              Feedback & Suggestions
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
              BerryMaster is built for PokeMMO berry farmers. Share your thoughts, report issues, or suggest new capabilities to shape upcoming updates.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("submit")}
              className={`
                flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all
                ${activeTab === "submit" ? "bg-emerald-500 text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"}
              `}
            >
              <Send className="h-3.5 w-3.5" />
              Submit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`
                flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all
                ${activeTab === "history" ? "bg-emerald-500 text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"}
              `}
            >
              <History className="h-3.5 w-3.5" />
              History ({history.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === "submit" ? (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Feedback Form (2 cols) */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center backdrop-blur-md shadow-2xl flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">Thank You for Your Feedback!</h2>
                <p className="mt-2 text-sm text-slate-300 max-w-md">
                  Your response has been logged successfully. We review feedback regularly to prioritize feature development.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-6 py-2.5 text-xs font-bold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-slate-950"
                >
                  Send Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Feedback Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = category === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCategory(opt.id)}
                          className={`
                            flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all
                            ${
                              isSelected
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
                                : "border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-800/50 hover:text-slate-200"
                            }
                          `}
                        >
                          <span className={`p-2 rounded-xl border ${isSelected ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400" : "border-slate-800 bg-slate-950/60 text-slate-400"}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-200">{opt.label}</p>
                            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{opt.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    How is your experience with BerryMaster?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                              : "text-slate-700 hover:text-slate-500"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-xs font-semibold text-amber-400">
                      {rating === 5 ? "Excellent 🌟" : rating === 4 ? "Good 👍" : rating === 3 ? "Okay 😐" : rating === 2 ? "Needs Work 👎" : "Poor ⚠️"}
                    </span>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Subject / Summary <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Watering schedule timer suggestion, or bug in harvest count"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all hover:border-white/[0.12] focus:border-emerald-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Detailed Feedback <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what happened, what felt confusing, or what feature would make your PokeMMO farming better..."
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all hover:border-white/[0.12] focus:border-emerald-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none leading-relaxed"
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Email Contact <span className="text-slate-500 font-normal">(Optional for follow-up)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all hover:border-white/[0.12] focus:border-emerald-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending to Discord...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* External Form & Note Sidebar (1 col) */}
          <div className="flex flex-col gap-6">
            {/* Tally External Form Option */}
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <ExternalLink className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">External Survey Form</h3>
                  <p className="text-[11px] text-slate-400">Prefer Tally Form?</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                If you prefer submitting via external browser form, you can open our official Tally form directly:
              </p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleOpenTally}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-xs font-bold text-purple-300 transition-all hover:bg-purple-500 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open Tally Form
                </button>

                <button
                  type="button"
                  onClick={handleCopyTallyLink}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs font-medium text-slate-400 transition-all hover:border-slate-700 hover:text-white"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedLink ? "Link Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            {/* Privacy & Notes */}
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                What to keep in mind
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>All feedback is welcome:</strong> positive, criticism, feature requests, or UI ideas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Anonymous submission:</strong> Email is entirely optional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Local Log:</strong> Your submitted responses are saved safely in app storage.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Submitted Feedback Log</h2>
              <p className="text-xs text-slate-400">View past feedback submissions stored locally in your app.</p>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <History className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold">No feedback submissions found yet.</p>
              <p className="text-xs text-slate-600 mt-1">Submit a feedback form to record your entries here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-white">{item.subject}</h3>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-wrap">{item.message}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <div className="flex items-center gap-1">
                      <span>Rating:</span>
                      <span className="text-amber-400 font-semibold">{"★".repeat(item.rating)}</span>
                    </div>
                    {item.email && <span className="text-slate-400">Contact: {item.email}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}