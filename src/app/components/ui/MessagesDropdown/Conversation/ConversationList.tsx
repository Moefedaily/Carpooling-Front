import React from "react";
import { Conversation } from "@/Utils/types/conversation";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: Conversation[];
  onConversationClick: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onConversationClick,
}) => {
  return (
    <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200">
        Conversations
      </h2>
      <div className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => onConversationClick(conversation)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
