"use client";
import React, { useState, useEffect, useCallback } from "react";
import { WebSocketHook } from "@/app/components/Hook/wsHook";
import ConversationList from "@/app/components/ui/MessagesDropdown/Conversation/ConversationList";
import ActiveConversation from "@/app/components/ui/MessagesDropdown/Conversation/ActiveConversation";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { conversationService } from "@/app/services/conversation";
import { MessageService } from "@/app/services/messages";
import { Conversation } from "@/Utils/types/conversation";
import { Message } from "@/Utils/types/messages";
import { Oval } from "react-loader-spinner";

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { markAsRead, recentMessages } = WebSocketHook();

  const fetchConversations = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (activeConversation && recentMessages.length > 0) {
      const newMessage = recentMessages[0];
      if (newMessage.conversation.id === activeConversation.id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    }
  }, [recentMessages, activeConversation]);

  const handleConversationClick = useCallback(
    async (conversation: Conversation) => {
      try {
        setActiveConversation(conversation);
        const messagesData = await MessageService.getMessagesForConversation(
          conversation.id
        );
        setMessages(messagesData);
        const unreadMessages = messagesData.filter(
          (msg: Message) => !msg.isRead
        );
        for (const message of unreadMessages) {
          await markAsRead(message.id);
        }
      } catch (err) {
        setError("Failed to fetch messages");
        console.error(err);
      }
    },
    [markAsRead]
  );

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (content.trim() && activeConversation) {
        try {
          const sentMessage = await MessageService.createMessage(
            content,
            activeConversation.trip.id,
            activeConversation.id
          );
          setMessages((prev) => [...prev, sentMessage]);
          // Update the conversation
          setConversations((prevConversations) =>
            prevConversations.map((conv) =>
              conv.id === activeConversation.id
                ? { ...conv, lastMessage: sentMessage }
                : conv
            )
          );
        } catch (err) {
          setError("Failed to send message");
          console.error(err);
        }
      }
    },
    [activeConversation]
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center pt-24 pb-8">
        <div
          className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ height: "500px" }}
        >
          <div className="flex h-full">
            <ConversationList
              conversations={conversations}
              onConversationClick={handleConversationClick}
            />
            <ActiveConversation
              conversation={activeConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MessagesPage;
