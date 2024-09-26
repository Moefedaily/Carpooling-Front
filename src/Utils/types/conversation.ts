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
  lastMessage: {
    content: string;
    sender: User;
  };
  lastMessageDate: string;
  unreadCount: number;
}
