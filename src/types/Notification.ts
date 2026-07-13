export type NotificationType =
  | "water"
  | "harvest"
  | "wilt";

export interface Notification {
  id: string;

  characterId: string;

  characterName: string;

  type: NotificationType;

  title: string;

  message: string;

  createdAt: string;

}