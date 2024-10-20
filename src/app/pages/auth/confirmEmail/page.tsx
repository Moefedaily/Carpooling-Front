import ConfirmEmailContent from "@/app/components/ui/confirmEmail";
import React, { Suspense } from "react";

export default function ConfirmEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailContent />
    </Suspense>
  );
}
