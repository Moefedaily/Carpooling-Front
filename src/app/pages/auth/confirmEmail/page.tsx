import ConfirmEmailContent from "@/app/components/ui/confirmEmail";
import React, { Suspense } from "react";
import { Oval } from "react-loader-spinner";

export default function ConfirmEmail() {
  return (
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
      <ConfirmEmailContent />
    </Suspense>
  );
}
