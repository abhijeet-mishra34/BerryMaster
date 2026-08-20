import type { FeedbackCategory } from "./feedbackService";
import { CURRENT_APP_VERSION } from "./updateService";

// ── Webhook ────────────────────────────────────────────────────────────────

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1537713052663943200/W3Nj69-QPG5Z4Lba-pamhG3KOtZk4cTHKmAS_Hd8ATjPUUZRGYyGGoKBgWX4jivm8ixX";

// ── Visual config per category ─────────────────────────────────────────────

const CATEGORY_COLORS: Record<FeedbackCategory, number> = {
  general: 0x10b981, // emerald
  bug: 0xef4444,     // red
  feature: 0xf59e0b, // amber
  ux: 0x8b5cf6,      // violet
};

const CATEGORY_EMOJIS: Record<FeedbackCategory, string> = {
  general: "💬",
  bug: "🐛",
  feature: "💡",
  ux: "✨",
};

const CATEGORY_LABELS: Record<FeedbackCategory, string> = {
  general: "General Feedback",
  bug: "Bug Report",
  feature: "Feature Request",
  ux: "UX Improvement",
};

const RATING_LABELS: Record<number, string> = {
  1: "Poor ⚠️",
  2: "Needs Work 👎",
  3: "Okay 😐",
  4: "Good 👍",
  5: "Excellent 🌟",
};

// ── Types ──────────────────────────────────────────────────────────────────

export interface DiscordFeedbackPayload {
  category: FeedbackCategory;
  rating: number;
  subject: string;
  message: string;
  email?: string;
}

// ── Send ───────────────────────────────────────────────────────────────────

let lastSubmittedAt = 0;
const SUBMISSION_COOLDOWN_MS = 5000;

export async function sendFeedbackToDiscord(
  payload: DiscordFeedbackPayload
): Promise<void> {
  const now = Date.now();
  if (now - lastSubmittedAt < SUBMISSION_COOLDOWN_MS) {
    throw new Error("Please wait a few seconds before submitting more feedback.");
  }
  lastSubmittedAt = now;

  const emoji = CATEGORY_EMOJIS[payload.category];
  const color = CATEGORY_COLORS[payload.category];
  const stars =
    "⭐".repeat(payload.rating) + "☆".repeat(5 - payload.rating);
  const ratingLabel = RATING_LABELS[payload.rating] ?? `${payload.rating}/5`;
  const categoryLabel = CATEGORY_LABELS[payload.category];

  // Truncate fields to safe Discord limits
  const safeSubject = payload.subject.slice(0, 250);
  const safeMessage = payload.message.slice(0, 1900);
  const safeEmail = payload.email ? payload.email.slice(0, 200) : "*Anonymous*";

  const body = {
    username: "BerryMaster Feedback",
    embeds: [
      {
        author: {
          name: `${emoji} New ${categoryLabel}`,
        },
        title: safeSubject,
        description: safeMessage,
        color,
        fields: [
          {
            name: "📂 Category",
            value: categoryLabel,
            inline: true,
          },
          {
            name: "⭐ Rating",
            value: `${stars}  —  ${ratingLabel}`,
            inline: true,
          },
          {
            name: "📧 Contact",
            value: safeEmail,
            inline: true,
          },
        ],
        footer: {
          text: `BerryMaster v${CURRENT_APP_VERSION} • PokeMMO Berry Tracker`,
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Discord webhook returned status ${response.status}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
