"use client";
import React, { Dispatch, SetStateAction, Suspense } from "react";
import Link from "next/link";
import ContactUs from "@/components/layout/ContactUs";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setIsSideBarState, setQuestionState } from "@/slice/questionSlice";
import survey from "../../public/survey.json";
import Image from "next/image";

const userName = "김싸피";

interface SidebarProps {
  isContactUsOpen: boolean;
  setIsContactUsOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isContactUsOpen,
  setIsContactUsOpen,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const pathname = usePathname();
  const questionNumber = useAppSelector(state => state.question.questionNumber);
  const responseList = useAppSelector(state => state.surveyResponse.surveyResponseRequestList);
  const dispatch = useAppDispatch();

  const handleChangeQuestion = (num: number) => {
    dispatch(setQuestionState(num));
    dispatch(setIsSideBarState(false));
    setIsMenuOpen(!isMenuOpen);
  };

  return isContactUsOpen ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUs />
    </Suspense>
  ) : pathname.startsWith("/survey/responses") ? (
    <div className="flex flex-col gap-4 w-[80%] ml-8 mt-10">
      {survey.questions.map(question => (
        <button
          key={question.id}
          onClick={() => handleChangeQuestion(question.id)}
          className={`text-lg ${questionNumber === question.id ? "font-bold" : ""} truncate-text mt-2 text-sm text-left`}
        >
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] flex-shrink-0">
              {responseList[question.id - 1]?.response ? (
                <Image src="/check_circle.svg" width={20} height={20} alt="check" />
              ) : (
                <span className="invisible">
                  <Image src="/check_circle.svg" width={20} height={20} alt="placeholder" />
                </span>
              )}
            </div>
            <span className="truncate">
              {question.id}.{" "}
              {question.question.startsWith("님")
                ? userName + question.question
                : question.question}
            </span>
          </div>
        </button>
      ))}
    </div>
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
