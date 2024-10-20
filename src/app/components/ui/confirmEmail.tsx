"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { confirmEmail } from "@/app/services/auth";

const ConfirmEmailClient = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const runConfirmEmail = async () => {
      if (!token) {
        setMessage("No confirmation token found.");
        return;
      }
      try {
        const response = await confirmEmail(token);
        setMessage(response.message || "Email confirmed successfully");
        toast.success(response.message || "Email confirmed successfully");
        setTimeout(() => router.push("/pages/auth/login"), 3000);
      } catch (err) {
        setMessage("Failed to confirm email. Please try again.");
        toast.error("Failed to confirm email. Please try again.");
      }
    };
    runConfirmEmail();
  }, [token, router]);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Email Confirmation
      </h2>
      <p className="text-center text-gray-600">
        {message || "Confirming your email..."}
      </p>
    </div>
  );
};

export default ConfirmEmailClient;
