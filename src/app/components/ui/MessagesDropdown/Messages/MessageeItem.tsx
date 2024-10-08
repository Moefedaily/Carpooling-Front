import React from "react";
import { Message } from "@/Utils/types/messages";
import { Conversation } from "@/Utils/types/conversation";
import { format } from "date-fns";

interface MessageItemProps {
  message: Message;
  conversation: Conversation;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, conversation }) => {
  const isOwnMessage = message.sender.id !== conversation.passenger.id;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          isOwnMessage ? "bg-primary text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <p>{message.content}</p>
        <p className="text-xs mt-1 text-gray-500">
          {format(new Date(message.sentAt), "HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
