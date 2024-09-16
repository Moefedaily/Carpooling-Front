"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/app/services/auth";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import { RegisterData } from "@/Utils/types/user";
import Form from "@/app/components/ui/form";

export default function Register() {
  const { push } = useRouter();

  const handleRegister = async (data: RegisterData) => {
    try {
      const res = await register(data);
      toast.success("Registration Successful");
      setTimeout(() => {
        push("/login");
      }, 900);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "birthDate", label: "Birth Date", type: "date", required: true },
    { name: "phoneNumber", label: "Telephone Number", type: "tel", required: true },
    { name: "paymentMethod", label: "Payment Method Preferred", type: "text", required: true },
  ];

  return (
    <div>
      <Header />
      <Hero title="Register" image="/register.jpg" />
      <div className="container mx-auto py-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Create an account
          </h2>
          <Form 
            fields={fields} 
            onSubmit={handleRegister} 
            submitButtonText="Register"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}