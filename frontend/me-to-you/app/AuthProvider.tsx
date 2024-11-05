"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MESSAGES } from "@/constants/messages";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    const isPublicPath = pathname === "/login" || pathname === "/signup";

    if (!isLogin && !isPublicPath) {
      Swal.fire({
        icon: "info",
        text: "로그인부터 해주세요!",
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
      router.push("/login");
    }

    if (isLogin === "yes" && isPublicPath) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}
