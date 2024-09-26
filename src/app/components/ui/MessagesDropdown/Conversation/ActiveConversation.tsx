import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import { Message } from "@/Utils/types/messages";
import MessageList from "../Messages/MessageList";
import MessageInput from "../Messages/Messages.input";


interface ActiveConversationProps {
  conversation: Conversation;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (content: string) => void;
}

const ActiveConversation: React.FC<ActiveConversationProps> = ({
  conversation,
  messages,
  onBack,
  onSendMessage,
}) => {
  return (
    <div className="flex flex-col h-96">
      <div className="bg-gray-50 px-4 py-2 flex items-center">
        <button onClick={onBack} className="mr-2 text-blue-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="font-medium">
          {conversation.trip.departureLocation} to{" "}
          {conversation.trip.arrivalLocation}
        </span>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ActiveConversation;
