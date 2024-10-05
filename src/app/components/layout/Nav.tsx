"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoIosLogIn,
  IoIosLogOut,
  IoMdCar,
  IoIosChatboxes,
  IoIosNotifications,
} from "react-icons/io";
import { isAuthenticated, logout, getUser } from "@/app/services/auth";
import { WebSocketHook } from "../Hook/wsHook";
import MessagesDropdown from "../ui/MessagesDropdown/messageDropdown";
import NotificationsDropdown from "../ui/notificationDropdown";
import { User } from "@/Utils/types/user";
export default function Nav() {
  const { push } = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);

  const {
    unreadCount,
    resetUnreadCount,
    unreadNotificationCount,
    resetUnreadNotificationCount,
  } = WebSocketHook();

  useEffect(() => {
    setIsClient(true);
    const auth = isAuthenticated();
    setAuthenticated(auth);
    if (auth) {
      setUser(getUser());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
    push("/pages/auth/login");
  };

  const handleOpenMessages = () => {
    setShowMessagesDropdown(true);
    resetUnreadCount();
  };

  const handleCloseMessages = () => {
    setShowMessagesDropdown(false);
  };

  const handleOpenNotifications = () => {
    setShowNotificationsDropdown(true);
    resetUnreadNotificationCount();
  };

  const handleCloseNotifications = () => {
    setShowNotificationsDropdown(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
      <div className="flex justify-between items-center py-6 px-10 bg-nav bg-opacity-60 rounded-md">
        <div>
          <Link
            href="/pages/home"
            className="text-primary text-xl font-extrabold font-merriweather"
          >
            WEEGOO
          </Link>
        </div>
        {isClient && (
          <ul className="flex space-x-4 font-merriweather font-medium">
            <li>
              <Link
                href="/user"
                className="text-primary font-bold hover:text-secondary"
              >
                About US
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-primary font-bold hover:text-secondary"
              >
                Contact Us
              </Link>
            </li>
            {authenticated ? (
              <>
                {user && !user.isVerifiedDriver && (
                  <li>
                    <Link
                      href="/pages/driver/register"
                      className="text-primary font-bold hover:text-secondary flex items-center"
                    >
                      <span>Become a Driver</span>
                      <IoMdCar className="text-primary ml-2" />
                    </Link>
                  </li>
                )}
                <li className="relative">
                  <button
                    onClick={handleOpenMessages}
                    className="flex items-center text-primary font-bold hover:text-secondary"
                  >
                    <IoIosChatboxes className="text-primary mr-2" />
                    Messages
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <div className="absolute right-0 top-full">
                    <MessagesDropdown
                      isOpen={showMessagesDropdown}
                      onClose={handleCloseMessages}
                      onNotificationClear={resetUnreadCount}
                    />
                  </div>
                </li>
                <li className="relative">
                  <button
                    onClick={handleOpenNotifications}
                    className="flex items-center text-primary font-bold hover:text-secondary"
                  >
                    <IoIosNotifications className="text-primary mr-2" />
                    Notifications
                    {unreadNotificationCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                  <div className="absolute right-0 top-full">
                    <NotificationsDropdown
                      isOpen={showNotificationsDropdown}
                      onClose={handleCloseNotifications}
                    />
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-primary font-bold hover:text-secondary flex items-center"
                  >
                    <span>Logout</span>
                    <IoIosLogOut className="text-primary ml-2" />
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/pages/auth/login"
                  className="text-primary font-bold hover:text-secondary flex items-center"
                >
                  <span>Login</span>
                  <IoIosLogIn className="text-bg ml-2" />
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
