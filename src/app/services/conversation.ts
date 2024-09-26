import api from "./api";

export const conversationService = {
  getConversationsForUser: async () => {
    const response = await api.get("/conversations/user");
    return response.data;
  },
};
