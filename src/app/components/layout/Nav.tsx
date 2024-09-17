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
    <nav className="absolute top-0 left-0 right-0 z-20 ">
      <div className="flex justify-between items-center py-6 px-10 bg-nav bg-opacity-30 rounded-md">
        <div>
          <Link
            href="/"
            className="text-primary text-xl font-extrabold font-merriweather"
          >
            WEEGOO
          </Link>
        </div>
        <ul className="flex space-x-4 font-merriweather font-medium">
          <li>
            <Link
              href="/user"
              className="text-secondary font-bold hover:text-primary"
            >
              About US
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-secondary font-bold hover:text-primary"
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
                    className="text-secondary font-bold hover:text-primary flex items-center"
                  >
                    <span>Become a Driver</span>
                    <IoMdCar className="text-primary ml-2" />
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-secondary font-bold hover:text-primary flex items-center"
                >
                  <span>Logout</span>
                  <IoIosLogOut className="text-primary ml-2" />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="text-secondary font-bold hover:text-primary flex items-center"
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
