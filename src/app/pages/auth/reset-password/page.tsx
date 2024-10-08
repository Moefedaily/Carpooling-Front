"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import Form from "@/app/components/ui/form";
import { resetPassword } from "@/app/services/auth";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await resetPassword(token, data.newPassword);
      toast.success(response.message || "Password reset successfully");
      setTimeout(() => router.push("/pages/auth/login"), 5000);
    } catch (err) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const fields = [
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      required: true,
    },
  ];

  return (
    <div>
      <Header />
      <Hero title="Reset Password" image="/reset-password.jpg" />
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Set New Password
          </h2>
          {token ? (
            <Form
              fields={fields}
              onSubmit={handleSubmit}
              submitButtonText="Reset Password"
            />
          ) : (
            <p className="text-center text-red-500">
              Invalid or missing reset token.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
