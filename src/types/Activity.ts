export type ActivityType =
  | "planted"
  | "watered"
  | "harvested"
  | "wilted"
  | "removed";

export type Activity = {
  id: string;

  type: ActivityType;

  message: string;

  timestamp: string;
};