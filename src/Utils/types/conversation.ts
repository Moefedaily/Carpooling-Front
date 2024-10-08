import { Message } from "./messages";
import { Trip } from "./trip";
import { User } from "./user";

export interface Conversation {
  id: number;
  trip: Trip;
  passenger: {
    id: number;
    firstName: string;
    lastName: string;
  };
  messages: Message[];
  lastMessageDate: string;
  unreadCount: number;
}
