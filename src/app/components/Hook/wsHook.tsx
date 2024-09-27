import { useState, useEffect } from "react";
import { getSocket } from "@/app/services/ws";
import { MessageService } from "@/app/services/messages";
import { Message } from "@/Utils/types/messages";

export const WebSocketHook = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = getSocket();
    const fetchInitialData = async () => {
      try {
        const [messagesResponse, countResponse] = await Promise.all([
          MessageService.getRecentMessages(),
          MessageService.getUnreadMessageCount(),
        ]);
        setRecentMessages(messagesResponse.data);
        setUnreadCount(countResponse.data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    fetchInitialData();

    if (socket) {
      socket.on("newMessage", (message: Message) => {
        setRecentMessages((prevMessages) => [
          message,
          ...prevMessages.slice(0, 4),
        ]);
        setUnreadCount((prevCount) => prevCount + 1);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, []);

  const markAsRead = async (messageId: number) => {
    await MessageService.markMessageAsRead(messageId);
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const resetUnreadCount = () => {
    setUnreadCount(0);
  };

  return { unreadCount, recentMessages, markAsRead, resetUnreadCount };
};
