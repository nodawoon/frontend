import React, { Dispatch, SetStateAction, Suspense } from "react";
import Link from "next/link";
import ContactUs from "@/components/layout/ContactUs";

interface SidebarProps {
  isContactUsOpen: boolean;
  setIsContactUsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isContactUsOpen, setIsContactUsOpen }) => {
  return isContactUsOpen ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUs />
    </Suspense>
  ) : (
    <div className="w-full h-screen bg-auto pl-9 flex flex-col justify-center gap-28">
      <div className="flex flex-col gap-5">
        <Link href="/profile" className="text-xl font-medium">
          프로필 보기
        </Link>
        <p className="text-xl font-medium text-button">로그아웃</p>
        <p className="text-xl font-medium text-button">회원탈퇴</p>
      </div>
      <p className="text-xl font-medium text-button" onClick={() => setIsContactUsOpen(true)}>
        개발자 정보
      </p>
    </div>
  );
};

export default Sidebar;
