import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageService } from "@/app/services/messages";
import { Message } from "@/Utils/types/messages";
import { Conversation } from "@/Utils/types/conversation";
import { WebSocketHook } from "@/app/components/Hook/wsHook";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation | null;
  tripId: number;
  currentUserId: number;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  conversation,
  tripId,
  currentUserId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { recentMessages } = WebSocketHook();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    if (!conversation) return;
    try {
      const fetchedMessages = await MessageService.getMessagesForConversation(
        conversation.id
      );
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, [conversation]);

  useEffect(() => {
    if (conversation) {
      fetchMessages();
    }
  }, [conversation, fetchMessages]);

  useEffect(() => {
    if (recentMessages.length > 0) {
      const newMessage = recentMessages[0];
      if (newMessage.conversation.id === conversation?.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }
  }, [recentMessages, conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && conversation) {
      try {
        const sentMessage = await MessageService.createMessage(
          newMessage,
          tripId,
          conversation.id
        );
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  if (!isOpen || !conversation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Message Driver</h2>
        <div className="h-64 overflow-y-auto mb-4 border rounded p-2">
          {messages.map((message, index) => (
            <div
              key={`${message.id}-${index}`}
              className={`mb-2 ${
                message.sender.id === currentUserId ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.sender.id === currentUserId
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow border rounded-l px-3 py-2"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
