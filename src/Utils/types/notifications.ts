export interface Notification {
  id: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  type: string;
  relatedEntityId?: number;
}
