"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSideBarState } from "@/slice/questionSlice";
import { PAGE_CONFIG, PageConfig } from "@/constants/pageConfig";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const sideBarState = useAppSelector(state => state.question.isSideBarOpen);
  const dispatch = useAppDispatch();

  const pathname = usePathname();

  const getPageConfig = (path: string): PageConfig => {
    if (PAGE_CONFIG[path]) return PAGE_CONFIG[path];

    const matchingPath = Object.keys(PAGE_CONFIG).find(
      configPath => path.startsWith(configPath) && configPath !== "/"
    );

    return matchingPath
      ? PAGE_CONFIG[matchingPath]
      : { title: "404 | Page Not Found", background: "bg-white" };
  };

  const currentPageConfig = getPageConfig(pathname);

  useEffect(() => {
    if (isContactUsOpen) {
      setPageTitle("개발자 정보");
    } else if (isMenuOpen) {
      setPageTitle("설정");
    } else {
      setPageTitle(currentPageConfig.title);
    }
  }, [pathname, isMenuOpen, isContactUsOpen, currentPageConfig.title]);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      if (newScrollY > 10) setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  if (pathname === "/login" || pathname === "/signup") return <header />;

  const handleMenuClick = () => {
    if (isContactUsOpen) {
      setIsContactUsOpen(false);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <header
      className={`w-full text-black ${
        isMenuOpen ? "absolute h-screen bg-white max-w-[460px]" : "relative h-14"
      } ${currentPageConfig.background}`}
    >
      <div className="flex justify-between items-center p-4">
        {!currentPageConfig.hideBackButton && (
          <span className="material-symbols-rounded" onClick={() => window.history.back()}>
            arrow_back_ios
          </span>
        )}
        {currentPageConfig.hideBackButton && <span />}
        <p className="text-base font-bold">{pageTitle}</p>
        <span className="material-symbols-rounded" onClick={handleMenuClick}>
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
