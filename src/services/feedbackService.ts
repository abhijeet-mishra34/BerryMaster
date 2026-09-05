export type FeedbackCategory = 'bug' | 'feature' | 'ux' | 'general';

export interface FeedbackItem {
  id: string;
  category: FeedbackCategory;
  rating: number; // 1 - 5
  subject: string;
  message: string;
  ign?: string;
  email?: string;
  createdAt: string;
  status: 'submitted' | 'reviewed';
}

export interface FeedbackDraft {
  category: FeedbackCategory;
  rating: number;
  subject: string;
  message: string;
  ign?: string;
  email?: string;
}

const STORAGE_KEY = 'berrymaster_feedback_history';
const DRAFT_STORAGE_KEY = 'berrymaster_feedback_draft';

export function getFeedbackDraft(): FeedbackDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FeedbackDraft;
  } catch {
    return null;
  }
}

export function saveFeedbackDraft(draft: FeedbackDraft): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.error('Failed to save feedback draft:', error);
  }
}

export function clearFeedbackDraft(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear feedback draft:', error);
  }
}

export function getFeedbackHistory(): FeedbackItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FeedbackItem[];
  } catch (error) {
    console.error('Failed to load feedback history:', error);
    return [];
  }
}

export function submitFeedback(
  data: Omit<FeedbackItem, 'id' | 'createdAt' | 'status'>
): FeedbackItem {
  const newItem: FeedbackItem = {
    ...data,
    id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'submitted',
  };

  const current = getFeedbackHistory();
  const updated = [newItem, ...current];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save feedback:', error);
  }

  return newItem;
}

export function clearFeedbackHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear feedback history:', error);
  }
}
