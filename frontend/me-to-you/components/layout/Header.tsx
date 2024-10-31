"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSideBarState } from "@/store/questionSlice";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const sideBarState = useAppSelector(state => state.question.isSideBarOpen);
  const dispatch = useAppDispatch();

  const pathname = usePathname();

  useEffect(() => {
    const baseRoute = pathname.split("/")[1];
    setPageTitle(
      isContactUsOpen
        ? "개발자 정보"
        : isMenuOpen
          ? "설정"
          : baseRoute === ""
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
                          : "404 | Page Not Found"
    );
  }, [pathname, isMenuOpen, isContactUsOpen]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });

    if (scrollY > 10) setIsMenuOpen(false);

    return window.removeEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, [scrollY]);

  if (pathname === "/signup" || pathname === "/login") return <header></header>;

  return (
    <header
      className={`w-full ${isMenuOpen ? "absolute h-screen bg-white max-w-[460px]" : "relative h-14 bg-auto"}`}
    >
      <div className="flex justify-between items-center p-4">
        {!(pathname === "/responses/invitation") && (
          <span className="material-symbols-rounded" onClick={() => window.history.back()}>
            arrow_back_ios
          </span>
        )}
        <p className="text-base font-bold">{pageTitle}</p>
        <span
          className="material-symbols-rounded"
          onClick={() => {
            if (isContactUsOpen) {
              setIsContactUsOpen(false);
            } else {
              setIsMenuOpen(!isMenuOpen);
              dispatch(setIsSideBarState(!sideBarState));
            }
          }}
        >
          {isMenuOpen ? "close" : "menu"}
        </span>
      </div>
      {isMenuOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar
            isContactUsOpen={isContactUsOpen}
            setIsContactUsOpen={setIsContactUsOpen}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </Suspense>
      )}
    </header>
  );
};

export default Header;
