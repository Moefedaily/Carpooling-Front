"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoIosLogIn,
  IoIosLogOut,
  IoMdCar,
  IoIosChatboxes,
} from "react-icons/io";
import { isAuthenticated, logout, getUser } from "@/app/services/auth";
import { WebSocketHook } from "../Hook/wsHook";
import MessagesDropdown from "../ui/MessagesDropdown/messageDropdown";

export default function Nav() {
  const { push } = useRouter();
  const authenticated = isAuthenticated();
  const user = authenticated ? getUser() : null;
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const { unreadCount } = WebSocketHook();

  const handleLogout = () => {
    logout();
    push("/pages/auth/login");
  };

  const handleNotificationClear = () => {
    setHasUnreadMessages(false);
  };
  useEffect(() => {
    setHasUnreadMessages(unreadCount > 0);
  }, [unreadCount]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 ">
      <div className="flex justify-between items-center py-6 px-10 bg-nav bg-opacity-60 rounded-md">
        <div>
          <Link
            href="/pages/home"
            className="text-primary text-xl font-extrabold font-merriweather"
          >
            WEEGOO
          </Link>
        </div>
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
                  onClick={() => setShowMessagesDropdown(!showMessagesDropdown)}
                  className="flex items-center"
                >
                  <IoIosChatboxes className="text-primary mr-2" />
                  Messages
                  {hasUnreadMessages && !showMessagesDropdown && (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <div className="absolute right-0 top-full">
                  <MessagesDropdown
                    isOpen={showMessagesDropdown}
                    onClose={() => setShowMessagesDropdown(false)}
                    onNotificationClear={handleNotificationClear}
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
      </div>
    </nav>
  );
}
