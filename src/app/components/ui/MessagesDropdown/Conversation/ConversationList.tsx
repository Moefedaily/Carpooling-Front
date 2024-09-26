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
    <div className="max-h-96 overflow-y-auto">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onClick={() => onConversationClick(conversation)}
        />
      ))}
    </div>
  );
};

export default ConversationList;
