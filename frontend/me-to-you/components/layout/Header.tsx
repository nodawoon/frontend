"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState("");

  const pathname = usePathname();

  useEffect(() => {
    const baseRoute = pathname.split("/")[1];

    setPageTitle(
      baseRoute === ""
        ? "너에게 난"
        : baseRoute === "login"
          ? "로그인"
          : baseRoute === "signup"
            ? "회원가입"
            : baseRoute === "profile"
              ? "프로필"
              : baseRoute === "questions"
                ? "설문 생성"
                : baseRoute === "results"
                  ? "결과 확인"
                  : baseRoute === "responses"
                    ? "설문 응답"
                    : baseRoute === "chatbot"
                      ? "챗봇 생성"
                      : ""
    );
  }, [pathname]);

  if (pathname === "/" || pathname === "/login") {
    return <header></header>;
  }

  return (
    <header className="w-full h-14 bg-auto flex justify-between items-center p-4">
      {!(pathname === "/responses/invitation") ? (
        <span
          className="material-symbols-rounded"
          onClick={() => {
            window.history.back();
          }}
        >
          arrow_back_ios
        </span>
      ) : (
        <span></span>
      )}
      <p className="text-base font-bold">{pageTitle}</p>
      {isMenuOpen ? (
        <span
          className="material-symbols-rounded"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          close
        </span>
      ) : (
        <span
          className="material-symbols-rounded"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          menu
        </span>
      )}
    </header>
  );
};

export default Header;
