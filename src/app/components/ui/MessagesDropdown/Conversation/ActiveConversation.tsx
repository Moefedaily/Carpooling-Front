import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import { Message } from "@/Utils/types/messages";
import MessagesList from "../Messages/MessageList";
import MessageInput from "../Messages/MessagesInput";

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
      <div className="w-2/3 flex items-center justify-center">
        <p className="text-xl text-gray-500">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col">
      <div className="p-4 bg-white border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          {conversation.trip.departureLocation} to{" "}
          {conversation.trip.arrivalLocation}
        </h2>
        <p className="text-sm text-gray-600">
          With: {conversation.passenger.firstName}{" "}
          {conversation.passenger.lastName}
        </p>
      </div>
      <MessagesList messages={messages} conversation={conversation} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ActiveConversation;
