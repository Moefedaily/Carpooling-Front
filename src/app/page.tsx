"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isAuthenticated, getUser } from "@/app/services/auth";
import { Oval } from "react-loader-spinner";

export default function Home() {
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
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
        </div>{" "}
      </main>
    </div>
  );
}
