import React, { Suspense } from "react";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import ResetPassword from "@/app/components/ui/UserProfile/resetPassword";

const ResetPasswordPage = () => {
  return (
    <div>
      <Header />
      <Hero title="Reset Password" image="/reset-password.jpg" />
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
