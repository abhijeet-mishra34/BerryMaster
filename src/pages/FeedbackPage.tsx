export default function FeedbackPage() {
  function openFeedbackForm() {
    window.open(
      "https://tally.so/r/NpQjLN",
      "_blank"
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          💬 Feedback
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          BerryMaster is built with the help of its community.
          Whether you have a suggestion, found something that
          isn't working correctly, or simply want to share your
          thoughts, we'd love to hear from you.
        </p>
      </div>

      <div
        className="
          max-w-3xl
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-8
        "
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-4xl">
          🍓
        </div>

        <h2 className="text-2xl font-bold text-white">
          Share your thoughts
        </h2>

        <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
          All feedback is welcome — positive, negative, neutral,
          detailed, or brief. Whether you want to report a bug,
          suggest a feature, share an idea, or simply tell us what
          you think, your feedback helps shape the future of
          BerryMaster.
        </p>

        <button
          type="button"
          onClick={openFeedbackForm}
          className="
            mt-8
            rounded-xl
            bg-emerald-500
            px-6
            py-3
            font-semibold
            text-slate-950
            transition
            hover:bg-emerald-400
          "
        >
          🍓 Share Your Feedback
        </button>
      </div>

      <div
        className="
          max-w-3xl
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/50
          p-6
        "
      >
        <p className="text-sm leading-relaxed text-slate-400">
          💡 You don't need to categorize your feedback or answer
          any specific questions. Just tell us whatever is on your
          mind.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          You can also submit feedback anonymously if you prefer.
        </p>
      </div>

    </div>
  );
}