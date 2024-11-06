"use client";
import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import ContactUs from "@/components/layout/ContactUs";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setIsSideBarState, setQuestionState } from "@/slice/questionSlice";
import survey from "../../public/survey.json";
import Image from "next/image";
import { logout, removeUser } from "@/slice/userSlice";
import Swal from "sweetalert2";
import { ROUTES } from "@/constants/routes";
import { getUserNickname } from "@/services/share";

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
  const router = useRouter();
  const param = useParams();

  const questionNumber = useAppSelector(state => state.question.questionNumber);
  const responseList = useAppSelector(state => state.surveyResponse.surveyResponseRequestList);

  const { error } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const handleChangeQuestion = (num: number) => {
    dispatch(setQuestionState(num));
    dispatch(setIsSideBarState(false));
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickNavProfile = () => {
    router.push("/profile");
    setIsMenuOpen(false);
  };

  const handleClickDeleteAccount = async () => {
    const result = await dispatch(removeUser());

    if (result.meta.requestStatus === "fulfilled") {
      await Swal.fire({
        icon: "success",
        text: "다음에 또 오세요 :)",
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
      router.push(ROUTES.LOGIN);
    } else
      await Swal.fire({
        icon: "error",
        text: `Error Message: ${error}`,
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
  };

  const handleClickLogout = async () => {
    const result = await dispatch(logout());

    if (result.meta.requestStatus === "fulfilled") {
      await Swal.fire({
        icon: "success",
        text: "다음에 또 오세요 :)",
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
      router.push(ROUTES.LOGIN);
    } else
      await Swal.fire({
        icon: "error",
        text: `Error Message: ${error}`,
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
  };

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getNickname = async () => {
      const value = Array.isArray(param.value) ? param.value[0] : param.value;

      if (typeof value === "string") {
        getUserNickname(value).then(res => {
          setNickname(res.data.data.nickname); // Nickname 인터페이스의 nickname 속성에 접근
          console.info(res.data.data.nickname);
        });
      }
    };

    getNickname();
  }, [param.value]);

  return isContactUsOpen ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUs />
    </Suspense>
  ) : pathname.startsWith("/survey/responses") ? (
    <div className="flex flex-col gap-4 w-full h-screen pl-9 pt-10 absolute bg-white z-50">
      {survey.questions.map(question => (
        <button
          key={question.id}
          onClick={() => handleChangeQuestion(question.id)}
          className={`text-lg ${questionNumber === question.id ? "font-bold" : ""} truncate-text mt-2 text-sm text-left`}
        >
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] flex-shrink-0">
              {(question.id === 2 && responseList[question.id - 1]?.response.length >= 3) ||
              (question.id !== 2 && responseList[question.id - 1]?.response.length > 0) ? (
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
                ? nickname + question.question
                : question.question}
            </span>
          </div>
        </button>
      ))}
    </div>
  ) : (
    <div className="absolute bg-white w-full h-screen pl-9 flex flex-col justify-center gap-28 z-10 max-w-[460px]">
      <div className="flex flex-col gap-5">
        <p className="text-xl font-medium text-button" onClick={handleClickNavProfile}>
          프로필 보기
        </p>
        <p className="text-xl font-medium text-button" onClick={handleClickLogout}>
          로그아웃
        </p>
        <p className="text-xl font-medium text-button" onClick={handleClickDeleteAccount}>
          회원탈퇴
        </p>
      </div>
      <p className="text-xl font-medium text-button" onClick={() => setIsContactUsOpen(true)}>
        개발자 정보
      </p>
    </div>
  );
};

export default Sidebar;
