export default function FeedbackPage() {
  function openFeedbackForm() {
    window.open(
      "https://tally.so/r/NpQjLN",
      "_blank"
    );
  }

  return (
    <div className="flex flex-col gap-3">

      {/* =====================================
          Page Header
      ===================================== */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          💬 Feedback
        </h1>

        <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">
          I'm the sole developer behind BerryMaster, and I'm continuously working to improve the application.

Since I handle the UI, user experience, features, and overall direction of the project, I may occasionally overlook things that could be improved.

If you've used BerryMaster, I'd genuinely appreciate your honest feedback. Share anything you think could make the app better — positive experiences, criticism, confusing workflows, missing features, UI suggestions, bugs, or ideas for the future.

Your feedback, whatever form it takes, can help shape the future of BerryMaster.🔥
        </p>

        <p className="mt-5 max-w-3xl leading-relaxed text-slate-500">
          Whether you have discovered a bug, have an idea for a new feature,
          noticed something that feels confusing, or simply want to share your
          thoughts about the application, your input is genuinely valuable❤️
        </p>
      </div>


      {/* =====================================
          Share Your Thoughts
      ===================================== */}

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

        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-500/10
            text-4xl
          "
        >
          🍓
        </div>

        <h2 className="text-2xl font-bold text-white">
          Share your thoughts
        </h2>

        <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
          ✨Every stage of BerryMaster benefits from real feedback. You might
          notice a small usability issue that has gone unnoticed, have an idea
          that could make berry management more convenient, or simply have a
          different perspective on how a feature should work✨
        </p>

        <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
          There is no need to write a perfectly structured report or explain
          everything in technical terms. Just share what you think, what you
          experienced, or what you would like to see improved✅
        </p>

      </div>


      {/* =====================================
          Feedback Action
      ===================================== */}

      <div className="flex max-w-3xl justify-center">

        <button
          type="button"
          onClick={openFeedbackForm}
          className="
            w-full
            max-w-md
            border
            border-emerald-400
            bg-emerald-500
            px-8
            py-4
            text-center
            text-lg
            font-bold
            text-slate-950
            shadow-lg
            shadow-emerald-500/10
            transition-all
            duration-200
            hover:bg-emerald-400
            hover:shadow-xl
            hover:shadow-emerald-500/20
            active:scale-[0.98]
          "
        >
          🍓 Share Your Feedback
        </button>

      </div>


      {/* =====================================
          A Few Things to Keep in Mind
      ===================================== */}

      <div
        className="
          max-w-3xl
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/50
          p-8
        "
      >

        <h2 className="text-xl font-bold text-white">
          💡 A few things to keep in mind
        </h2>

        <div className="mt-5 space-y-4">

          <p className="leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-300">
              All feedback is welcome.
            </span>{" "}
            Positive, negative, detailed, brief, technical, or casual — every
            perspective can help improve BerryMaster.
          </p>

          <p className="leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-300">
              You do not need to categorize your feedback.
            </span>{" "}
            Whether you are reporting a bug, suggesting a feature, sharing an
            idea, or simply describing your experience, just tell us what is
            on your mind.
          </p>

          <p className="leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-300">
              You can submit feedback anonymously.
            </span>{" "}
            If you prefer not to share your identity, you are completely free
            to provide your feedback without identifying yourself.
          </p>

        </div>

      </div>

    </div>
  );
}