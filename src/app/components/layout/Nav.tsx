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
  IoMdAdd,
  IoMdPerson,
} from "react-icons/io";
import { isAuthenticated, logout, getUser } from "@/app/services/auth";
import { WebSocketHook } from "../Hook/wsHook";
import NotificationsDropdown from "../ui/notificationDropdown";
import { User } from "@/Utils/types/user";

export default function Nav() {
  const { push } = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);

  const { unreadCount, unreadNotificationCount, resetUnreadNotificationCount } =
    WebSocketHook();

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
                {user && user.isVerifiedDriver && (
                  <li>
                    <Link
                      href="/pages/driver/createTrip"
                      className="text-primary font-bold hover:text-secondary flex items-center"
                    >
                      <IoMdAdd className="text-primary mr-2" />
                      <span>Add Trip</span>
                    </Link>
                  </li>
                )}
                <li className="relative">
                  <button
                    onClick={() =>
                      setShowNotificationsDropdown(!showNotificationsDropdown)
                    }
                    className="flex items-center text-primary font-bold hover:text-secondary"
                  >
                    <IoIosNotifications className="text-primary mr-2" />
                    {unreadNotificationCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                  <NotificationsDropdown
                    isOpen={showNotificationsDropdown}
                    onClose={() => setShowNotificationsDropdown(false)}
                  />
                </li>
                <li className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center text-primary font-bold hover:text-secondary"
                  >
                    <IoMdPerson className="text-primary mr-2" />
                    {user?.firstName}
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link
                        href="/pages/messages"
                        className="block px-4 py-2 text-primary hover:text-secondary"
                      >
                        <IoIosChatboxes className="inline-block mr-2" />
                        Messages
                        {unreadCount > 0 && (
                          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                            {unreadCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-primary hover:text-secondary"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-primary hover:text-secondary"
                      >
                        Logout
                      </button>
                    </div>
                  )}
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
