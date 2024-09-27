"use client";
import React, { useState, useEffect } from "react";
import { conversationService } from "@/app/services/conversation";
import { MessageService } from "@/app/services/messages";
import { Conversation } from "@/Utils/types/conversation";
import { Message } from "@/Utils/types/messages";
import { WebSocketHook } from "../Hook/wsHook";
import { getUserId } from "@/app/services/auth";
import { format, parseISO } from "date-fns";

interface MessagesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClear: () => void;
}

const MessagesDropdown: React.FC<MessagesDropdownProps> = ({
  isOpen,
  onClose,
  onNotificationClear,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { markAsRead, recentMessages } = WebSocketHook();
  const currentUserId = getUserId();

  useEffect(() => {
    if (isOpen) {
      fetchConversations();
      onNotificationClear();
    }
  }, [isOpen]);
  useEffect(() => {
    if (recentMessages.length > 0) {
      const newMessage = recentMessages[0];
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === newMessage.conversation.id
            ? { ...conv, unreadCount: conv.unreadCount + 1 }
            : conv
        )
      );

      if (
        activeConversation &&
        newMessage.conversation.id === activeConversation.id
      ) {
        setMessages((prev) => [...prev, newMessage]);
        markAsRead(newMessage.id);
      }
    }
  }, [recentMessages, activeConversation]);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const data = await conversationService.getConversationsForUser();
      setConversations(data);
    } catch (err) {
      setError("Failed to fetch conversations");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversationClick = async (conversation: Conversation) => {
    try {
      setActiveConversation(conversation);
      const messagesData = await MessageService.getMessagesForConversation(
        conversation.id
      );
      setMessages(messagesData);

      // Mark unread messages as read
      const unreadMessages = messagesData.filter(
        (msg: Message) => !msg.isRead && msg.receiver.id === currentUserId
      );
      for (const message of unreadMessages) {
        await markAsRead(message.id);
      }

      // Update local state to reflect read messages
      if (unreadMessages.length > 0) {
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
          )
        );
      }
    } catch (err) {
      setError("Failed to fetch messages");
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && activeConversation) {
      try {
        const sentMessage = await MessageService.createMessage(
          newMessage,
          activeConversation.trip.id,
          activeConversation.id
        );
        setMessages((prev) => [...prev, sentMessage]);
        setNewMessage("");
      } catch (err) {
        setError("Failed to send message");
        console.error(err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE d MMMM");
  };

  if (!isOpen) return null;
  if (isLoading) return <div className="p-4">Loading conversations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Dropdown header */}
      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Messages</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {activeConversation ? (
        // Active conversation view
        <div className="flex flex-col h-96">
          {/* Conversation header */}
          <div className="bg-gray-50 px-4 py-2 flex items-center">
            <button
              onClick={() => setActiveConversation(null)}
              className="mr-2 text-blue-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="font-medium">
              {activeConversation.trip.departureLocation} to{" "}
              {activeConversation.trip.arrivalLocation}
            </span>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 p-2 rounded-lg ${
                  message.sender.id === currentUserId
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-100"
                } max-w-[80%]`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-gray-500">
                  {formatDate(message.sentAt)}
                </span>
              </div>
            ))}
          </div>
          {/* Message input */}
          <div className="bg-gray-50 p-2">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Conversations list view
        <div className="max-h-96 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleConversationClick(conv)}
              className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors ${
                conv.unreadCount > 0
                  ? "bg-blue-50 hover:bg-blue-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {conv.trip.departureLocation} to {conv.trip.arrivalLocation}
                  </p>
                  <p className="text-sm text-gray-600">
                    With: {conv.passenger.firstName} {conv.passenger.lastName}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              {conv.lastMessage && (
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {conv.lastMessage.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesDropdown;
