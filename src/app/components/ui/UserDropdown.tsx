import React from "react";
import Link from "next/link";
import { IoIosChatboxes, IoMdPerson, IoIosLogOut } from "react-icons/io";

interface UserDropdownProps {
  onLogout: () => void;
  unreadCount: number;
  resetUnreadCount: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  onLogout,
  unreadCount,
  resetUnreadCount,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
      <Link
        href="/messages"
        className="flex items-center px-4 py-2 text-sm text-primary hover:bg-gray-100"
        onClick={resetUnreadCount}
      >
        <IoIosChatboxes className="mr-3" />
        Messages
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
            {unreadCount}
          </span>
        )}
      </Link>
      <Link
        href="/profile"
        className="flex items-center px-4 py-2 text-sm text-primary hover:bg-gray-100"
      >
        <IoMdPerson className="mr-3" />
        Profile
      </Link>
      <button
        onClick={onLogout}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-100"
      >
        <IoIosLogOut className="mr-3" />
        Logout
      </button>
    </div>
  );
};

export default UserDropdown;
