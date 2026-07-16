export type ActivityType =
  | "planted"
  | "watered"
  | "harvested"
  | "wilted";

export type Activity = {
  id: string;

  type: ActivityType;

  message: string;

  timestamp: string;
};