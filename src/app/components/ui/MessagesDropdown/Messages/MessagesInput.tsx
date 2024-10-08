import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 focus:outline-none transition duration-150 ease-in-out"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
