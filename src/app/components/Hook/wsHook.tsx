import { useState, useEffect, useCallback } from "react";
import { getSocket, initializeSocket } from "@/app/services/ws";
import { MessageService } from "@/app/services/messages";
import { NotificationService } from "@/app/services/notification";
import { Message } from "@/Utils/types/messages";
import { Notification } from "@/Utils/types/notifications";

export const WebSocketHook = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const handleNewMessage = useCallback((message: Message) => {
    setRecentMessages((prevMessages) => [message, ...prevMessages.slice(0, 4)]);
    setUnreadCount((prevCount) => prevCount + 1);
  }, []);

  const handleNewNotification = useCallback((notification: Notification) => {
    setNotifications((prevNotifications) => [
      notification,
      ...prevNotifications.slice(0, 9),
    ]);
    setUnreadNotificationCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    const fetchInitialData = async () => {
      try {
        const [
          messagesResponse,
          messageCountResponse,
          notificationsResponse,
          notificationCountResponse,
        ] = await Promise.all([
          MessageService.getRecentMessages(),
          MessageService.getUnreadMessageCount(),
          NotificationService.getRecentNotifications(),
          NotificationService.getUnreadNotificationCount(),
        ]);
        setRecentMessages(messagesResponse.data);
        setUnreadCount(messageCountResponse.data);
        setNotifications(notificationsResponse.data);
        setUnreadNotificationCount(notificationCountResponse.data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchInitialData();
    if (socket) {
      socket.on("newMessage", handleNewMessage);
      socket.on("newNotification", handleNewNotification);
    }
    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
        socket.off("newNotification", handleNewNotification);
      }
    };
  }, [handleNewMessage, handleNewNotification]);

  const markAsRead = useCallback(async (messageId: number) => {
    await MessageService.markMessageAsRead(messageId);
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markNotificationAsRead = useCallback(async (notificationId: number) => {
    await NotificationService.markNotificationAsRead(notificationId);
    setUnreadNotificationCount((prev) => Math.max(0, prev - 1));
  }, []);

  const resetUnreadCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const resetUnreadNotificationCount = useCallback(() => {
    setUnreadNotificationCount(0);
  }, []);

  const markAllMessagesAsRead = useCallback(async () => {
    try {
      await MessageService.markAllMessagesAsRead();
      setRecentMessages((prevMessages) =>
        prevMessages.map((message) => ({ ...message, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all messages as read:", error);
    }
  }, []);

  const markAllNotificationsAsRead = useCallback(async () => {
    try {
      await NotificationService.markAllNotificationsAsRead();
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
      setUnreadNotificationCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  }, []);
  useEffect(() => {
    const checkConnection = setInterval(() => {
      const socket = getSocket();
      if (!socket || !socket.connected) {
        const token = localStorage.getItem("token");
        if (token) {
          initializeSocket(token);
        }
      }
    }, 2000);

    return () => clearInterval(checkConnection);
  }, []);

  return {
    unreadCount,
    recentMessages,
    markAsRead,
    resetUnreadCount,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    resetUnreadNotificationCount,
    markAllMessagesAsRead,
    markAllNotificationsAsRead,
  };
};
