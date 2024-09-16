"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosLogIn, IoIosLogOut, IoMdCar } from "react-icons/io";
import { isAuthenticated, logout, getUser } from "@/app/services/auth";

export default function Nav() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const user = authenticated ? getUser() : null;

  const handleLogout = () => {
    logout();
    router.push("/pages/login");
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 mt-4">
      <div className="container mx-auto flex justify-between items-center py-4 px-8 bg-teratery bg-opacity-20 rounded-full">
        <div>
          <Link
            href="/"
            className="text-bg text-xl font-extrabold font-merriweather"
          >
            WeeGoo
          </Link>
        </div>
        <ul className="flex space-x-4 font-merriweather font-medium">
          <li>
            <Link
              href="/user"
              className="text-bg font-bold hover:text-button-end"
            >
              About US
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-bg font-bold hover:text-button-end"
            >
              Contact Us
            </Link>
          </li>
          {authenticated ? (
            <>
              {user && !user.isVerifiedDriver && (
                <li>
                  <Link
                    href="/pages/driver"
                    className="text-bg font-bold hover:text-button-end flex items-center"
                  >
                    <span>Become a Driver</span>
                    <IoMdCar className="text-bg ml-2" />
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-bg font-bold hover:text-button-end flex items-center"
                >
                  <span>Logout</span>
                  <IoIosLogOut className="text-bg ml-2" />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="text-bg font-bold hover:text-button-end flex items-center"
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
