import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import ConversationItem from "./ConversationItem";
import { FaComments } from "react-icons/fa";

interface ConversationListProps {
  conversations: Conversation[];
  onConversationClick: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onConversationClick,
}) => {
  return (
    <div className="w-1/3 border-r border-gray-200 bg-white shadow-md flex flex-col">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200 bg-white text-primary flex items-center">
        <FaComments className="mr-2" />
        Conversations
      </h2>
      {conversations.length > 0 ? (
        <div className="overflow-y-auto flex-grow">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              onClick={() => onConversationClick(conversation)}
            />
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center p-4 text-gray-500">
          No conversations yet
        </div>
      )}
    </div>
  );
};

export default ConversationList;
