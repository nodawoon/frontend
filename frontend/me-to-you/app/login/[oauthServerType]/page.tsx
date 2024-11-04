"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/slice/userSlice";
import Swal from "sweetalert2";

const AuthPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { error, isLogin, isFirst } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const provider = location.pathname.split("/")[2];

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) return;

    dispatch(
      login({
        oauthServerType: provider.toUpperCase(),
        code,
      })
    ).then(response => {
      if (response.meta.requestStatus === "rejected") {
        Swal.fire({
          icon: "error",
          text: `로그인에 실패 했습니다. 에러 메세지: ${error}`,
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
      }
    });
  }, [provider, searchParams, dispatch, error]);

  useEffect(() => {
    if (!isLogin) return;

    router.push(isFirst ? "/signup" : "/");
  }, [isLogin, isFirst, router]);

  return <Loading />;
};

export default AuthPage;
