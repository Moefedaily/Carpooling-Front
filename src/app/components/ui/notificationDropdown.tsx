import React, { useState, useEffect } from "react";
import { Notification } from "@/Utils/types/notifications";
import { format } from "date-fns";
import { WebSocketHook } from "../Hook/wsHook";

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, markNotificationAsRead, resetUnreadNotificationCount } = WebSocketHook();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(false);
      resetUnreadNotificationCount();
    }
  }, [isOpen]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
    }
    // Handle navigation or other actions based on notification type
    // For example:
    // if (notification.type === 'NEW_MESSAGE') {
    //   router.push(`/messages/${notification.relatedEntityId}`);
    // }
    
  };

  const renderNotification = (notification: Notification) => (
    <div
      key={notification.id}
      className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
        notification.isRead ? "bg-white" : "bg-blue-50"
      }`}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="font-semibold">{notification.content}</div>
      <div className="text-sm text-gray-500">
        {format(new Date(notification.createdAt), "MMM d, yyyy HH:mm")}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50">
      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">Loading notifications...</div>
        ) : notifications.length > 0 ? (
          notifications.map(renderNotification)
        ) : (
          <div className="p-4 text-center text-gray-500">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;