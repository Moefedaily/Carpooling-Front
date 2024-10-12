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
<<<<<<< HEAD
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
=======
      <div className="container mx-auto py-28 p-8">
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
>>>>>>> ed8981dd863ade234fbfcb4e351cebc4fc49b0e8
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
