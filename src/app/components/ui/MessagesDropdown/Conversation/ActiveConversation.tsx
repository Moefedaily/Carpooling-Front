import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import { Message } from "@/Utils/types/messages";
import MessagesList from "../Messages/MessageList";
import MessageInput from "../Messages/MessagesInput";
import { getUser } from "@/app/services/auth";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

interface ActiveConversationProps {
  conversation: Conversation | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ActiveConversation: React.FC<ActiveConversationProps> = ({
  conversation,
  messages,
  onSendMessage,
}) => {
  if (!conversation) {
    return (
      <div className="w-2/3 flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-500 font-semibold">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  const currentUser = getUser();
  const isDriver = currentUser?.sub === conversation.trip.driver.id;
  const displayName = isDriver
    ? `${conversation.passenger.firstName} ${conversation.passenger.lastName}`
    : `${conversation.trip.driver.firstName} ${conversation.trip.driver.lastName}`;

  return (
    <div className="w-2/3 flex flex-col bg-white shadow-md">
      <div className="p-4 text-secondary">
        <p className="text-sm font-semibold text-primary">
          <FaUser className="inline-block mr-2" />
          Chatting with {displayName}
        </p>
      </div>
      <MessagesList messages={messages} conversation={conversation} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ActiveConversation;
