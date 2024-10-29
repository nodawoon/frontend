"use client";

import React from "react";
import { redirect, useParams, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";

const AuthPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // TODO: 나중에 사용
  const params = useParams();
  const searchParams = useSearchParams();

  if (searchParams.get("code")) {
    // TODO: serverType, code 상태 저장하기
    redirect("/signup");
  }

  return <Loading />;
};

export default AuthPage;
