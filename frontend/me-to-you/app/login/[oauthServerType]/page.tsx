"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/slice/userSlice";
import Swal from "sweetalert2";
import { ROUTES } from "@/constants/routes";

const AuthPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { error, isLogin, isFirst } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const provider = location?.pathname.split("/")[2];

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

      if (result.meta.requestStatus === "rejected") {
        await Swal.fire({
          icon: "error",
          text: MESSAGES.LOGIN_FAILED(error || "알 수 없는 오류가 발생했습니다"),
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
        router.push("/login");
      }
    })();
  }, [provider, searchParams, dispatch, error, router]);

  useEffect(() => {
    if (!isLogin) return;

    router.push(isFirst ? ROUTES.SIGNUP : ROUTES.HOME);
  }, [isLogin, isFirst, router]);

  return <Loading />;
};

export default AuthPage;
