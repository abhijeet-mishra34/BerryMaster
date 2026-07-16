import { useState } from "react";

type FeedbackType =
  | "bug"
  | "feature"
  | "ui"
  | "general";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] =
    useState<FeedbackType>("general");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [contact, setContact] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Temporary submission behavior.
    // We will connect this to a real feedback system later.

    console.log({
      feedbackType,
      subject,
      message,
      contact,
    });

    setSubmitted(true);

    setFeedbackType("general");
    setSubject("");
    setMessage("");
    setContact("");
  }

  return (
    <div className="space-y-8">

      {/* =====================================
          Header
      ===================================== */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          💬 Feedback
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Help us make BerryMaster better. Every bug report,
          suggestion, and idea helps shape the future of the app.
        </p>

      </div>


      {/* =====================================
          Success Message
      ===================================== */}

      {submitted && (

        <div
          className="
            rounded-2xl
            border
            border-emerald-500/30
            bg-emerald-500/10
            p-5
          "
        >

          <p className="font-semibold text-emerald-400">
            ✅ Thank you for your feedback!
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Your feedback has been recorded successfully.
          </p>

        </div>

      )}


      {/* =====================================
          Feedback Form
      ===================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          max-w-3xl
          space-y-6
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-6
        "
      >

        {/* Feedback Type */}

        <div>

          <label
            htmlFor="feedback-type"
            className="mb-2 block text-sm font-semibold text-slate-300"
          >
            Feedback Type
          </label>

          <select
            id="feedback-type"
            value={feedbackType}
            onChange={(event) =>
              setFeedbackType(
                event.target.value as FeedbackType
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-emerald-500
            "
          >
            <option value="general">
              💬 General Feedback
            </option>

            <option value="bug">
              🐛 Bug Report
            </option>

            <option value="feature">
              💡 Feature Request
            </option>

            <option value="ui">
              🎨 UI / UX Feedback
            </option>

          </select>

        </div>


        {/* Subject */}

        <div>

          <label
            htmlFor="feedback-subject"
            className="mb-2 block text-sm font-semibold text-slate-300"
          >
            Subject
          </label>

          <input
            id="feedback-subject"
            type="text"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            placeholder="What would you like to tell us about?"
            required
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              placeholder:text-slate-500
              transition
              focus:border-emerald-500
            "
          />

        </div>


        {/* Message */}

        <div>

          <label
            htmlFor="feedback-message"
            className="mb-2 block text-sm font-semibold text-slate-300"
          >
            Your Feedback
          </label>

          <textarea
            id="feedback-message"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Tell us what you think..."
            required
            rows={7}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              placeholder:text-slate-500
              transition
              focus:border-emerald-500
            "
          />

        </div>


        {/* Contact */}

        <div>

          <label
            htmlFor="feedback-contact"
            className="mb-2 block text-sm font-semibold text-slate-300"
          >
            Contact Information
            <span className="ml-2 font-normal text-slate-500">
              Optional
            </span>
          </label>

          <input
            id="feedback-contact"
            type="text"
            value={contact}
            onChange={(event) =>
              setContact(event.target.value)
            }
            placeholder="Discord username, email, or other contact method"
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              placeholder:text-slate-500
              transition
              focus:border-emerald-500
            "
          />

          <p className="mt-2 text-xs text-slate-500">
            Leave this blank if you would like to submit feedback anonymously.
          </p>

        </div>


        {/* Submit */}

        <button
          type="submit"
          className="
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
          📤 Submit Feedback
        </button>

      </form>

    </div>
  );
}