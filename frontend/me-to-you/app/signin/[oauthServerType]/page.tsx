"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/slice/userSlice";
import Swal from "sweetalert2";
import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";

const AuthPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { error, isFirst } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const provider = pathname.split("/")[2];

  useEffect(() => {
    (async () => {
      const code = searchParams.get("code");

      if (!code) return;

      const result = await dispatch(
        login({
          oauthServerType: provider.toUpperCase(),
          code,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        router.push(ROUTES.SIGNUP);
      } else {
        await Swal.fire({
          icon: "error",
          text: MESSAGES.LOGIN_FAILED(error || "알 수 없는 오류가 발생했습니다"),
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
        router.push(ROUTES.LOGIN);
      }
    })();
  }, [provider, searchParams, dispatch, error, router]);

  return <Loading />;
};

export default AuthPage;
