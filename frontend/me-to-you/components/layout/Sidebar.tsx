"use client";
import React, { Dispatch, SetStateAction, Suspense, useContext, useEffect, useState } from "react";
import ContactUs from "@/components/layout/ContactUs";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setIsSideBarState, setQuestionState } from "@/slice/questionSlice";
import survey from "../../public/survey.json";
import chatbot from "../../public/chatbot-survey.json";
import Image from "next/image";
import { logout, removeUser } from "@/slice/userSlice";
import Swal from "sweetalert2";
import { ROUTES } from "@/constants/routes";
import { getUserNickname } from "@/services/share";
import { AuthContext } from "@/context/AuthContext";
import { setCategoryState } from "@/slice/chatbotQuestionSlice";

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
  const id = pathname?.split("self-survey/")[1];

  const questionNumber = useAppSelector(state => state.question.questionNumber);
  const responseList = useAppSelector(state => state.surveyResponse.surveyResponseRequestList);
  const chatbotResponseList = useAppSelector(state => state.chatbotResponse.responses);

  const { error } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const { isLoggedIn } = useContext(AuthContext);

  const handleChangeChatbotQuestion = (categoryId: number) => {
    console.info("여기여기");
    dispatch(setCategoryState(categoryId));
    dispatch(setIsSideBarState(false));
    setIsMenuOpen(false);
  };

  const handleChangeQuestion = (num: number) => {
    dispatch(setQuestionState(num));
    dispatch(setIsSideBarState(false));
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickHome = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const handleClickNavProfile = () => {
    router.push("/profile");
    setIsMenuOpen(false);
  };

  const handleClickDeleteAccount = async () => {
    Swal.fire({
      text: "정말로 탈퇴 하실거에요?😥 (가지마..)",
      showCancelButton: true,
      cancelButtonText: "닫기",
      confirmButtonText: "탈퇴하기",
      confirmButtonColor: "#5498FF",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(removeUser())
          .then(response => {
            if (response.meta.requestStatus === "fulfilled") {
              Swal.fire({
                icon: "error",
                text: `Error Message: ${error}`,
                confirmButtonColor: "#5498FF",
                confirmButtonText: "닫기",
              });
            }
            Swal.fire("다음에 또 오세요 :)", "", "success");
            router.push(ROUTES.LOGIN);
          })
          .catch(error => {
            Swal.fire(`Error: ${error}`, "", "error");
          });
      }
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
      if (pathname.startsWith("/survey/responses")) {
        const value = Array.isArray(param.value) ? param.value[0] : param.value;

        getUserNickname(value).then(res => {
          setNickname(res.data.data.nickname); // Nickname 인터페이스의 nickname 속성에 접근
          console.info(res.data.data.nickname);
        });
      }
    };
    getNickname();
  }, [param.value, pathname]);

  return isContactUsOpen ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUs />
    </Suspense>
  ) : pathname.startsWith("/survey/responses") ? (
    <div className="flex flex-col gap-4 w-full h-screen pl-5 pt-14 absolute bg-white z-50">
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
  ) : id && pathname.startsWith(`/self-survey/${id}`) ? (
    <div className="w-full h-[100%] overflow-y-auto scrollbar-hide px-2 pt-4 pb-20 bg-white z-50">
      {chatbot.map(category =>
        category.questions.map(question => {
          const isCompleted = chatbotResponseList.some(response => {
            if (
              question.question === "성격이 어떤 것 같아? (최소 3개~ 최대 12개)" &&
              response.question === question.question
            ) {
              return response.response.length >= 13;
            }

            if (
              question.question === "이성을 만날 때 제일 중요하게 생각하는 거 3개만 골라줘!" &&
              response.question === question.question
            ) {
              return response.response.length >= 10;
            }
            return response.question === question.question && response.response.length > 0;
          });

          return (
            <div
              key={question.id}
              className="flex text-center items-center cursor-pointer text-sm ml-6 mb-2"
              onClick={() => handleChangeChatbotQuestion(category.categoryId)}
            >
              <div className="w-[20px] h-[20px] mr-2">
                {isCompleted ? (
                  <Image
                    src="/check_circle.svg"
                    width={15}
                    height={15}
                    alt="check"
                    className="mt-0.5"
                  />
                ) : (
                  <span className="mr-2">{question.id}.</span>
                )}
              </div>
              <span className="truncate">{question.question}</span>
            </div>
          );
        })
      )}
    </div>
  ) : (
    <div className="absolute bg-white w-full h-screen pl-9 flex flex-col justify-center gap-5 z-10 max-w-[460px]">
      {isLoggedIn ? (
        <React.Fragment>
          <p className="text-xl font-medium text-button" onClick={handleClickHome}>
            너에게 난 🏡
          </p>
          <p className="text-xl font-medium text-button" onClick={handleClickNavProfile}>
            프로필 보기
          </p>
          <p className="text-xl font-medium text-button" onClick={handleClickLogout}>
            로그아웃
          </p>
          <p className="text-xl font-medium text-button" onClick={handleClickDeleteAccount}>
            회원탈퇴
          </p>
          <p className="text-xl font-medium text-button" onClick={() => setIsContactUsOpen(true)}>
            개발자 정보
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-xl font-medium text-button" onClick={handleClickNavProfile}>
            너에게 난 🏡
          </p>
          <p className="text-xl font-medium text-button" onClick={() => setIsContactUsOpen(true)}>
            개발자 정보
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default Sidebar;
