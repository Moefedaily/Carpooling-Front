import React, { useState, useEffect } from "react";
import { conversationService } from "@/app/services/conversation";
import { MessageService } from "@/app/services/messages";
import { Conversation } from "@/Utils/types/conversation";
import { Message } from "@/Utils/types/messages";
import { WebSocketHook } from "../../Hook/wsHook";
import ActiveConversation from "./Conversation/ActiveConversation";
import ConversationList from "./Conversation/ConversationList";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { markAsRead, recentMessages } = WebSocketHook();

  useEffect(() => {
    if (activeConversation) {
      // When i received a new message (in recentMessages),
      // i check if it belongs to the active conversation if yes add it
      const newMessage = recentMessages[0];
      if (newMessage && newMessage.id === activeConversation.id) {
        console.debug(`new Message id  = ${newMessage.id}`);
        console.debug(`active conversation = ${activeConversation.id}`);
        setMessages((prev) => [...prev, newMessage]);
      }
    }
  }, [recentMessages, activeConversation]);

  useEffect(() => {
    if (isOpen) {
      fetchConversations();
      onNotificationClear();
    }
  }, [isOpen]);

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

      const unreadMessages = messagesData.filter((msg: Message) => !msg.isRead);
      for (const message of unreadMessages) {
        await markAsRead(message.id);
      }

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

  const handleSendMessage = async (content: string) => {
    if (content.trim() && activeConversation) {
      try {
        const sentMessage = await MessageService.createMessage(
          content,
          activeConversation.trip.id,
          activeConversation.id
        );
        setMessages((prev) => [...prev, sentMessage]);
      } catch (err) {
        setError("Failed to send message");
        console.error(err);
      }
    }
  };
  const handleClose = () => {
    setActiveConversation(null);
    onClose();
  };

  if (!isOpen) return null;
  if (isLoading) return <div className="p-4">Loading conversations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Messages</h3>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700"
        >
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
        <ActiveConversation
          conversation={activeConversation}
          messages={messages}
          onBack={() => setActiveConversation(null)}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <ConversationList
          conversations={conversations}
          onConversationClick={handleConversationClick}
        />
      )}
    </div>
  );
};

export default MessagesDropdown;
