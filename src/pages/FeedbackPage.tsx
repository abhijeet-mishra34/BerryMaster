import { useState } from "react";
import {
  MessageSquare,
  Bug,
  Lightbulb,
  Sparkles,
  Star,
  CheckCircle2,
  ExternalLink,
  History as HistoryIcon,
  Copy,
  Check,
  Send,
  Trash2,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import {
  submitFeedback,
  getFeedbackHistory,
  clearFeedbackHistory,
  type FeedbackCategory,
  type FeedbackItem,
} from "../services/feedbackService";
import { sendFeedbackToDiscord } from "../services/discordService";
import { openExternalUrl } from "../utils/urlHelper";

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
    openExternalUrl("https://tally.so/r/NpQjLN");
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

  const categoryOptions: {
    id: FeedbackCategory;
    label: string;
    icon: LucideIcon;
    description: string;
  }[] = [
    {
      id: "general",
      label: "General Feedback",
      icon: MessageSquare,
      description: "Overall impressions & thoughts",
    },
    {
      id: "bug",
      label: "Bug Report",
      icon: Bug,
      description: "Something broke or isn't working right",
    },
    {
      id: "feature",
      label: "Feature Idea",
      icon: Lightbulb,
      description: "New features you'd like to see",
    },
    {
      id: "ux",
      label: "UX Improvement",
      icon: Sparkles,
      description: "UI layout or usability tweaks",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-16">
      {/* Header Banner */}
      <div
        className="
          theme-hero
          relative
          overflow-hidden
          rounded-xl
          p-4
          sm:p-8
          md:p-10
          backdrop-blur-xl
          shadow-xl
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10">
              <MessageSquare className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-slate-900">
                Feedback & Suggestions
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 light:text-slate-600 max-w-xl leading-relaxed">
                BerryMaster is built for PokeMMO berry farmers. Share your thoughts, report issues, or suggest new capabilities to shape upcoming updates.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-950/70 light:bg-white p-1.5 self-start sm:self-auto shrink-0 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("submit")}
              className={`
                flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer
                ${
                  activeTab === "submit"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
                    : "text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900"
                }
              `}
            >
              <Send className="h-4 w-4" />
              <span>Submit</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`
                flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer
                ${
                  activeTab === "history"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
                    : "text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900"
                }
              `}
            >
              <HistoryIcon className="h-4 w-4" />
              <span>History ({history.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === "submit" ? (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Feedback Form (2 cols) */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="theme-card rounded-xl border border-emerald-500/30 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50/60 p-10 sm:p-12 text-center backdrop-blur-xl shadow-2xl flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/20 light:bg-emerald-100 text-emerald-400 light:text-emerald-700 mb-5 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900">
                  Thank You for Your Feedback!
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-700 max-w-md leading-relaxed">
                  Your response has been logged successfully. We review feedback regularly to prioritize future improvements.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-400 hover:to-teal-400 cursor-pointer"
                >
                  Send Another Response
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="theme-card rounded-xl p-8 sm:p-10 backdrop-blur-xl shadow-xl flex flex-col gap-7"
              >
                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700">
                    Feedback Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {categoryOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = category === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCategory(opt.id)}
                          className={`
                            flex items-start gap-4 rounded-xl border p-4.5 text-left transition-all duration-200 cursor-pointer
                            ${
                              isSelected
                                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300 light:text-emerald-800 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/30"
                                : "border-slate-800 light:border-slate-200 bg-slate-950/50 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-slate-700 light:hover:border-slate-300 hover:bg-slate-950/80 light:hover:bg-slate-100 hover:text-slate-200 light:hover:text-slate-900 shadow-xs"
                            }
                          `}
                        >
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 ${
                              isSelected
                                ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300 light:text-emerald-800"
                                : "border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white text-slate-400 light:text-slate-600"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-white light:text-slate-900">
                              {opt.label}
                            </p>
                            <p className="text-xs text-slate-400 light:text-slate-500 leading-snug mt-1">
                              {opt.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700">
                    How is your experience with BerryMaster?
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              star <= (hoverRating || rating)
                                ? "fill-amber-400 text-amber-400 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                                : "text-slate-700 light:text-slate-300 hover:text-slate-500"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="ml-2 rounded-lg bg-amber-500/10 border border-amber-500/25 px-3 py-1 text-xs font-bold text-amber-400 light:text-amber-700">
                      {rating === 5
                        ? "Excellent 🌟"
                        : rating === 4
                        ? "Good 👍"
                        : rating === 3
                        ? "Okay 😐"
                        : rating === 2
                        ? "Needs Work 👎"
                        : "Poor ⚠️"}
                    </span>
                  </div>
                </div>

                {/* Subject Input Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700 flex items-center gap-2">
                      <span>Subject / Summary</span>
                      <span className="text-[10px] font-bold text-emerald-400 light:text-emerald-700 uppercase tracking-widest bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/30 light:border-emerald-200 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Watering schedule timer suggestion, or bug in harvest count"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-800
                      light:border-slate-300
                      bg-slate-950/80
                      light:bg-white
                      px-5
                      py-4
                      text-base
                      font-semibold
                      text-white
                      light:text-slate-900
                      placeholder:text-slate-500
                      light:placeholder:text-slate-400
                      outline-none
                      transition-all
                      duration-200
                      focus:border-emerald-400/80
                      focus:bg-slate-950
                      light:focus:bg-white
                      focus:ring-4
                      focus:ring-emerald-500/15
                    "
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700 flex items-center gap-2">
                      <span>Detailed Feedback</span>
                      <span className="text-[10px] font-bold text-emerald-400 light:text-emerald-700 uppercase tracking-widest bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/30 light:border-emerald-200 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </label>
                  </div>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what happened, what felt confusing, or what feature would make your PokeMMO farming better..."
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-800
                      light:border-slate-300
                      bg-slate-950/80
                      light:bg-white
                      px-5
                      py-4
                      text-base
                      text-white
                      light:text-slate-900
                      placeholder:text-slate-500
                      light:placeholder:text-slate-400
                      outline-none
                      transition-all
                      duration-200
                      focus:border-emerald-400/80
                      focus:bg-slate-950
                      light:focus:bg-white
                      focus:ring-4
                      focus:ring-emerald-500/15
                      resize-none
                      leading-relaxed
                    "
                  />
                </div>

                {/* Email (Optional) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700">
                    Email Contact{" "}
                    <span className="text-slate-500 font-normal">
                      (Optional for follow-up)
                    </span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-800
                      light:border-slate-300
                      bg-slate-950/80
                      light:bg-white
                      px-5
                      py-4
                      text-base
                      font-semibold
                      text-white
                      light:text-slate-900
                      placeholder:text-slate-500
                      light:placeholder:text-slate-400
                      outline-none
                      transition-all
                      duration-200
                      focus:border-emerald-400/80
                      focus:bg-slate-950
                      light:focus:bg-white
                      focus:ring-4
                      focus:ring-emerald-500/15
                    "
                  />
                </div>

                {/* Main Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    border
                    border-emerald-400/40
                    bg-gradient-to-r
                    from-emerald-500
                    to-teal-500
                    px-8
                    py-4.5
                    text-base
                    font-bold
                    text-slate-950
                    shadow-xl
                    shadow-emerald-500/25
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:from-emerald-400
                    hover:to-teal-400
                    hover:shadow-emerald-500/40
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    cursor-pointer
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending to Discord...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* External Form & Notes Sidebar (1 col) */}
          <div className="flex flex-col gap-6">
            {/* Tally External Form Option */}
            <div className="theme-card rounded-xl p-7 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col gap-5">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 light:bg-purple-50 text-purple-400 light:text-purple-600 border border-purple-500/25 light:border-purple-200">
                  <ExternalLink className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white light:text-slate-900">
                    External Survey Form
                  </h3>
                  <p className="text-xs text-slate-400 light:text-slate-500">
                    Prefer Tally Form?
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                If you prefer submitting via an external browser window, you can open our official Tally form directly:
              </p>

              <div className="flex flex-col gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleOpenTally}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 light:border-purple-200 bg-purple-500/15 light:bg-purple-50 px-5 py-3.5 text-xs sm:text-sm font-bold text-purple-300 light:text-purple-700 transition-all hover:bg-purple-500 hover:text-white cursor-pointer active:scale-98"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Tally Form</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyTallyLink}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-slate-50 px-5 py-3 text-xs font-bold text-slate-300 light:text-slate-700 transition-all hover:border-slate-700 light:hover:border-slate-300 hover:text-white light:hover:text-slate-900 cursor-pointer active:scale-98 shadow-xs"
                >
                  {copiedLink ? (
                    <Check className="h-4 w-4 text-emerald-400 light:text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copiedLink ? "Link Copied!" : "Copy Form Link"}</span>
                </button>
              </div>
            </div>

            {/* Privacy & Notes */}
            <div className="theme-card rounded-xl p-7 sm:p-8 backdrop-blur-xl flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 light:text-emerald-600" />
                <span>What to keep in mind</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-white light:text-slate-900">All feedback is welcome:</strong> bugs, feature requests, UI ideas, or general impressions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-white light:text-slate-900">Anonymous submission:</strong> Email contact is entirely optional.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600 mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-white light:text-slate-900">Local Log:</strong> Your submitted responses are saved safely in your app history.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="theme-card rounded-xl p-8 sm:p-10 backdrop-blur-xl shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white light:text-slate-900">
                Submitted Feedback Log
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 light:text-slate-500 mt-0.5">
                View past feedback submissions stored locally in your app.
              </p>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 light:border-red-200 bg-red-500/10 light:bg-red-50 px-4 py-2 text-xs font-bold text-red-300 light:text-red-700 transition-all hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-14 text-center text-slate-500">
              <HistoryIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-base font-semibold text-slate-400 light:text-slate-600">
                No feedback submissions found yet.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Submit a feedback form to record your entries here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-slate-50 p-5 flex flex-col gap-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-lg border border-emerald-500/30 light:border-emerald-200 bg-emerald-500/10 light:bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 light:text-emerald-700 uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white light:text-slate-900">
                        {item.subject}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 light:text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {item.message}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 light:text-slate-500 pt-2 border-t border-slate-800 light:border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span>Rating:</span>
                      <span className="text-amber-400 font-semibold">
                        {"★".repeat(item.rating)}
                      </span>
                    </div>
                    {item.email && (
                      <span className="text-slate-400 light:text-slate-500 font-mono">
                        Contact: {item.email}
                      </span>
                    )}
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