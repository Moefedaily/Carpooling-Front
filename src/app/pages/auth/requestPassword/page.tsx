"use client";
import React from 'react';
import toast from "react-hot-toast";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import Form from "@/app/components/ui/form";
import { requestPasswordReset } from "@/app/services/auth";

const RequestPasswordResetPage = () => {
  const handleSubmit = async (data: { email: string }) => {
    try {
      const response = await requestPasswordReset(data.email);
      toast.success(response.message || "Password reset email sent successfully");
    } catch (err) {
      toast.error('Failed to send password reset email. Please try again.');
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
  ];

  return (
    <div>
      <Header />
      <Hero title="Reset Password" image="/reset-password.jpg" />
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Request Password Reset
          </h2>
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Send Reset Link"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestPasswordResetPage;