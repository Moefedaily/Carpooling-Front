import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import { format } from "date-fns";

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
      className="p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-gray-900">
          {conversation.trip.departureLocation} to{" "}
          {conversation.trip.arrivalLocation}
        </h3>
        <span className="text-sm text-gray-500">
          {format(new Date(conversation.trip.departureDate), "MMM d, yyyy")}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        With: {conversation.passenger.firstName}{" "}
        {conversation.passenger.lastName}
      </p>
    </div>
  );
};

export default ConversationItem;
