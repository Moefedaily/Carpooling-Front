import { Message } from "postcss";
import api from "./api";
import { getUserId } from "./auth";

export const MessageService = {
  createMessage: async (
    content: string,
    tripId: number,
    conversationId: number
  ) => {
    const senderId = getUserId();
    console.log(`sender id ${senderId}`);
    const response = await api.post("/messages", {
      content,
      tripId,
      conversationId,
      senderId,
    });
    return response.data;
  },

  getMessagesForConversation: async (conversationId: number) => {
    try {
      const response = await api.get(
        `/messages/conversation/${conversationId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        throw new Error("You don't have access to this conversation.");
      }
      throw error;
    }
  },

  markMessageAsRead: async (messageId: number) => {
    return api.put(`/messages/${messageId}/read`);
  },

  markAllMessagesAsRead: async () => {
    return api.put(`/messages/read-all`);
  },

  getUnreadMessageCount: async () => {
    return api.get("/messages/unread-count");
  },
  getRecentMessages: async () => {
    return api.get("/messages/recent");
  },
};
