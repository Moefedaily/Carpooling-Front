import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import { format } from "date-fns";
import { getUser } from "@/app/services/auth";
import { FaMapMarkerAlt, FaUser, FaCalendar } from "react-icons/fa";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onClick,
}) => {
  const currentUser = getUser();
  const isDriver = currentUser?.sub === conversation.trip.driver.id;
  const displayName = isDriver
    ? `${conversation.passenger.firstName} ${conversation.passenger.lastName}`
    : `${conversation.trip.driver.firstName} ${conversation.trip.driver.lastName}`;

  return (
    <div
      className="p-4 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out border-b border-gray-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-secondary text-lg">
          <FaMapMarkerAlt className="inline-block mr-2 text-secondary" />
          {conversation.trip.departureLocation} to{" "}
          {conversation.trip.arrivalLocation}
        </h3>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>
          <FaUser className="inline-block mr-2 text-secondary" />
          {displayName}
        </p>
        <p>
          <FaCalendar className="inline-block mr-2 text-secondary" />
          {format(new Date(conversation.trip.departureDate), "MMM d, yyyy")}
        </p>
      </div>
    </div>
  );
};

export default ConversationItem;
