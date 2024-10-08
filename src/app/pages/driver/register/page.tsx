"use client";
import React from "react";
import { toast } from "react-hot-toast";
import { registerAsDriver } from "@/app/services/auth";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import { licenseCredentials } from "@/Utils/types/license";
import Form from "@/app/components/ui/form";

export default function BecomeDriver() {
  const handleSubmit = async (data: licenseCredentials) => {
    try {
      await registerAsDriver(data);
      toast.success("Successfully registered as a driver");
    } catch (error) {
      toast.error("Failed to register as a driver");
    }
  };

  const fields = [
    {
      name: "licenseNumber",
      label: "License Number",
      type: "text",
      required: true,
    },
    {
      name: "expirationDate",
      label: "Expiration Date",
      type: "date",
      required: true,
      validate: (value: string) => {
        const date = new Date(value);
        return date > new Date() || "Expiration date must be in the future";
      },
    },
  ];

  return (
    <div>
      <Header />
      <Hero title="Become a Driver" image="/login.jpg" />
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Become a Driver
          </h2>
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Register"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
