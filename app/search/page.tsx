"use client";

import { getUserId, getUserNickname } from "@/services/search";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchNickname } from "@/hooks/useSearchNickname";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Swal from "sweetalert2";
import { getChatState } from "@/services/chatHistory";

interface User {
  nickname: string;
}

const Page = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [text, setText] = useState("검색 결과가 없습니다.");
  const router = useRouter();
  const debounceSearchText = useSearchNickname(keyword, 300);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { exist } = useSelector((state: RootState) => state.chatHistory);

  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  const getUserName = async (keyword: string) => {
    if (!/^[가-힣a-zA-Z0-9\u318D·\s]*$/.test(keyword)) {
      setText("올바른 문자를 입력해주세요. (특수 문자 사용 불가)");
      return;
    }
    setText("검색 결과가 없습니다.");
    try {
      const response = await getUserNickname(keyword);
      const data = response.data;

      if (response.data.success) {
        setUserList(data.data.slice(0, 5));
      } else {
        setUserList([]);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
      setUserList([]);
    }
  };

  useEffect(() => {
    if (keyword !== "") {
      getUserName(keyword);
      setIsSearch(true);
    } else {
      setUserList([]);
      setIsSearch(false);
    }
  }, [debounceSearchText, keyword]);

  const handleMoveChatRoom = async (nickname: string) => {
    const response = await getUserId(nickname);
    const userId = response.data.data.userId;

    if (exist === undefined) {
      const res = await getChatState(userId);
      const updatedExist = res.data.data.exist;

      await delay(500);

      if (updatedExist) {
        router.push(`/chat/${userId}?nickname=${encodeURIComponent(nickname)}`);
      } else {
        await Swal.fire({
          icon: "warning",
          text: "아직 챗봇이 없는 사용자 입니다!",
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
      }
    }

    if (exist) {
      router.push(`/chat/${userId}?nickname=${encodeURIComponent(nickname)}`);
    }
  };

  return (
    <div className="bg-light-gray min-h-[92vh] w-full overflow-hidden">
      <div className="w-[90%] ml-auto mr-auto py-6">
        <input
          placeholder="친구의 닉네임을 입력해주세요."
          className="p-2 rounded-md w-full outline-0"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <div className="mt-6">
          {userList.length > 0 && keyword.length !== 0 ? (
            <ul>
              {userList.map((user, index) => (
                <li
                  key={index}
                  className="flex bg-white justify-between items-center rounded-md p-4 mt-2 cursor-pointer"
                  onClick={() => handleMoveChatRoom(user.nickname)}
                >
                  <div className="flex items-center">
                    <Image
                      src={"/images/character.svg"}
                      alt="로고"
                      width={15}
                      height={15}
                      className="border-2 border-light-gray rounded-full"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p className="ml-3 font-bold">{user.nickname}</p>
                  </div>
                  <p className="text-sm flex justify-center items-center">
                    채팅하기 <span className="material-symbols-rounded text-sm">forum</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : isSearch ? (
            <p className="ml-2">{text}</p>
          ) : (
            debounceSearchText.length > 0 && (
              <p className="text-sm w-full text-center mt-2">검색 결과가 없습니다.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
