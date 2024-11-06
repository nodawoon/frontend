"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MESSAGES } from "@/constants/messages";
import { ROUTES } from "@/constants/routes";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    const isPublicPath = pathname.startsWith(ROUTES.LOGIN);
    const isSurvey = pathname.startsWith("/survey/invitation");

    if (pathname === "/signup" && isLogin) {
      router.push("/");
      return;
    }

    if (pathname === "/signup") {
      return;
    }

    if (!isLogin && !isPublicPath && !isSurvey) {
      Swal.fire({
        icon: "info",
        text: MESSAGES.LOGIN_REQUIRED,
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
      router.push(ROUTES.LOGIN);
      return;
    }

    if (isLogin === "yes" && isPublicPath) {
      router.push(ROUTES.HOME);
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
}
