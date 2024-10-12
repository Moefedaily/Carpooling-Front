"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/app/services/auth";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import { LoginCredentials } from "@/Utils/types/user";
import Form from "@/app/components/ui/form";
import Link from "next/link";

export default function Login() {
  const { push } = useRouter();

  const handleLogin = async (data: LoginCredentials) => {
    try {
      const res = await login(data);
      toast.success("Login Successful");
      setTimeout(() => {
        push("/pages/home");
      }, 900);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ];

  return (
    <div>
      <Header />
      <div className="container mx-auto py-28 p-8">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Sign in to your account
          </h2>
          <Form
            fields={fields}
            onSubmit={handleLogin}
            submitButtonText="Sign in"
          />
          <div className="mt-4 text-center">
            <Link
              href="/pages/auth/requestPassword"
              className="text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
