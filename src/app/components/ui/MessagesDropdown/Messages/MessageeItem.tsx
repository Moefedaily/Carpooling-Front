import React from "react";
import { Message } from "@/Utils/types/messages";
import { format, parseISO } from "date-fns";
import { getUserId } from "@/app/services/auth";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isCurrentUser = message.sender.id === getUserId();

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE d MMMM");
  };

  return (
    <div
      className={`mb-2 p-2 rounded-lg ${
        isCurrentUser ? "bg-blue-100 ml-auto" : "bg-gray-100"
      } max-w-[80%]`}
    >
      <p className="text-sm">{message.content}</p>
      <span className="text-xs text-gray-500">
        {formatDate(message.sentAt)}
      </span>
    </div>
  );
};

export default MessageItem;
