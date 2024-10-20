import React, { Suspense } from "react";
import { Oval } from "react-loader-spinner";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import Footer from "@/app/components/layout/Footer";
import dynamic from "next/dynamic";

const ConfirmEmailClient = dynamic(
  () => import("@/app/components/ui/confirmEmail"),
  {
    ssr: false,
    loading: () => (
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
    ),
  }
);

export default function ConfirmEmail() {
  return (
    <div>
      <Header />
      <Hero title="Confirm Email" image="/confirm-email.jpg" />
      <div className="container mx-auto py-12">
        <ConfirmEmailClient />
      </div>
      <Footer />
    </div>
  );
}
