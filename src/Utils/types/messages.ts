import { Conversation } from "./conversation";
import { Trip } from "./trip";
import { User } from "./user";

export interface Message {
  id: number;
  content: string;
  sender: User;
  receiver: User;
  trip: Trip;
  sentAt: string;
  isRead: boolean;
  conversation: Conversation;
}
