import React, { useRef, useEffect } from "react";
import { Message } from "@/Utils/types/messages";
import { Conversation } from "@/Utils/types/conversation";
import MessageItem from "./MessageeItem";

interface MessagesListProps {
  messages: Message[];
  conversation: Conversation;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  conversation,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          conversation={conversation}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
