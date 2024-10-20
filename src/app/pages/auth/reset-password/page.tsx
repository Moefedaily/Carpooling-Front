import React, { Suspense } from "react";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import ResetPassword from "@/app/components/ui/UserProfile/resetPassword";
import { Oval } from "react-loader-spinner";

const ResetPasswordPage = () => {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Oval
              height={40}
              width={40}
              color="#4E2B63"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#595959"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        }
      >
        <ResetPassword />
      </Suspense>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
