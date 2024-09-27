import api from "./api";

export const conversationService = {
  getConversationsForUser: async () => {
    const response = await api.get("/conversations/user");
    return response.data;
  },
  // findConversation: async (tripId: number, userId: number) => {
  // const response = api.get(
  // `/conversations/trip/${tripId}/passenger/${userId}`
  //);
  //return response;
  //},
  createConversation: async (tripId: number, userId: number) => {
    const response = await api.post("/conversations", {
      tripId,
      userId,
    });
    return response.data;
  },
};
