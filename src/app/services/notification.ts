import { Notification } from "@/Utils/types/notifications";
import api from "./api";

export const NotificationService = {
  getRecentNotifications: async () => {
    return api.get("/notifications/recent");
  },

  getUnreadNotificationCount: async () => {
    return api.get("/notifications/unread-count");
  },

  markNotificationAsRead: async (notificationId: number) => {
    return api.post(`/notifications/${notificationId}/read`);
  },
  markAllNotificationsAsRead: async () => {
    return api.post(`/notifications/read-all`);
  },
};
