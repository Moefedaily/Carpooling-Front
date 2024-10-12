"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  IoMdMenu,
  IoMdClose,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    unreadCount,
    resetUnreadCount,
    unreadNotificationCount,
    resetUnreadNotificationCount,
    markAllNotificationsAsRead,
    markAllMessagesAsRead,
  } = WebSocketHook();

  useEffect(() => {
    setIsClient(true);
    const auth = isAuthenticated();
    setAuthenticated(auth);
    if (auth) {
      setUser(getUser());
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setAuthenticated(false);
    setUser(null);
    push("/pages/auth/login");
  }, [push]);

  const toggleUserDropdown = useCallback(() => {
    setShowUserDropdown((prev) => !prev);
  }, []);

  const toggleNotificationsDropdown = useCallback(() => {
    if (!showNotificationsDropdown) {
      markAllNotificationsAsRead();
      resetUnreadNotificationCount();
    }
    setShowNotificationsDropdown((prev) => !prev);
  }, [
    showNotificationsDropdown,
    markAllNotificationsAsRead,
    resetUnreadNotificationCount,
  ]);

  const handleMessagesClick = useCallback(() => {
    markAllMessagesAsRead();
    resetUnreadCount();
    push("/pages/messages");
  }, [markAllMessagesAsRead, resetUnreadCount, push]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  interface NavLinkProps {
    href: string;
    onClick?: () => void;
    children: React.ReactNode;
  }
  const NavLink = ({ href, onClick, children }: NavLinkProps) => (
    <Link
      href={href}
      className="block px-4 py-2 text-gray-600 hover:text-primary"
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/pages/home" className="flex items-center">
            <span className="text-2xl font-bold text-primary ml-2">WEEGOO</span>
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <IoMdClose size={24} />
              ) : (
                <IoMdMenu size={24} />
              )}
            </button>
          </div>

          {isClient && (
            <div className="hidden md:flex items-center space-x-4">
              {authenticated ? (
                <>
                  <NavLink href="/pages/searchResult">Find a Ride</NavLink>
                  {user && user.isVerifiedDriver ? (
                    <NavLink href="/pages/driver/createTrip">
                      <IoMdAdd className="inline mr-2" />
                      Add Trip
                    </NavLink>
                  ) : (
                    <NavLink href="/pages/driver/register">
                      <IoMdCar className="inline mr-2" />
                      Become a Driver
                    </NavLink>
                  )}
                  <div className="relative">
                    <button
                      onClick={toggleNotificationsDropdown}
                      className="text-gray-600 hover:text-primary p-2"
                    >
                      <IoIosNotifications />
                      {unreadNotificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                          {unreadNotificationCount}
                        </span>
                      )}
                    </button>
                    <NotificationsDropdown
                      isOpen={showNotificationsDropdown}
                      onClose={() => setShowNotificationsDropdown(false)}
                    />
                  </div>
                  <div className="relative">
                    <button
                      onClick={toggleUserDropdown}
                      className="text-gray-600 hover:text-primary flex items-center"
                    >
                      <IoMdPerson className="mr-2" />
                      {user?.firstName}
                    </button>
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        <button
                          onClick={handleMessagesClick}
                          className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary"
                        >
                          <IoIosChatboxes className="inline-block mr-2" />
                          Messages
                          {unreadCount > 0 && (
                            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                              {unreadCount}
                            </span>
                          )}
                        </button>
                        <NavLink href="/pages/profile">Profile</NavLink>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <NavLink href="/pages/auth/login">
                    Login
                    <IoIosLogIn className="inline ml-2" />
                  </NavLink>
                  <Link
                    href="/pages/auth/register"
                    className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {isClient && isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {authenticated ? (
                <>
                  <NavLink href="/pages/searchResult">Find a Ride</NavLink>
                  {user && user.isVerifiedDriver ? (
                    <NavLink href="/pages/driver/createTrip">
                      <IoMdAdd className="inline mr-2" />
                      Add Trip
                    </NavLink>
                  ) : (
                    <NavLink href="/pages/driver/register">
                      <IoMdCar className="inline mr-2" />
                      Become a Driver
                    </NavLink>
                  )}
                  <button
                    onClick={toggleNotificationsDropdown}
                    className="text-gray-600 hover:text-primary py-2 px-4 block w-full text-left"
                  >
                    <IoIosNotifications className="inline mr-2" />
                    Notifications
                    {unreadNotificationCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleMessagesClick}
                    className="text-gray-600 hover:text-primary py-2 px-4 block w-full text-left"
                  >
                    <IoIosChatboxes className="inline mr-2" />
                    Messages
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <NavLink href="/pages/profile">Profile</NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-primary py-2 px-4 block w-full text-left"
                  >
                    <IoIosLogOut className="inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink href="/pages/auth/login">
                    <IoIosLogIn className="inline mr-2" />
                    Login
                  </NavLink>
                  <NavLink href="/pages/auth/register">Sign Up</NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
