"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "@/app/services/auth";

export default function ClientRedirect() {
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      const user = getUser();
      if (user) {
        push("/pages/home");
      } else {
        push("/pages/auth/login");
      }
    } else {
      push("/pages/auth/login");
    }
  }, [push]);

  return null;
}
