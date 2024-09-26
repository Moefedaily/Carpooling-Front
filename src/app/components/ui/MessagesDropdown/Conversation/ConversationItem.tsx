import React from "react";
import { Conversation } from "@/Utils/types/conversation";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors ${
        conversation.unreadCount > 0
          ? "bg-blue-50 hover:bg-blue-100"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">
            {conversation.trip.departureLocation} to{" "}
            {conversation.trip.arrivalLocation}
          </p>
          <p className="text-sm text-gray-600">
            With: {conversation.passenger.firstName}{" "}
            {conversation.passenger.lastName}
          </p>
        </div>
        {conversation.unreadCount > 0 && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {conversation.unreadCount}
          </span>
        )}
      </div>
      {conversation.lastMessage && (
        <p className="text-sm text-gray-500 mt-1 truncate">
          {conversation.lastMessage.content}
        </p>
      )}
    </div>
  );
};

export default ConversationItem;
