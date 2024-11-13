"use client";

import { getUserId, getUserNickname } from "@/services/search";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchNickname } from "@/hooks/useSearchNickname";

interface User {
  nickname: string;
}

const Page = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const debounceSearchText = useSearchNickname(keyword, 300);

  const getUserName = async (keyword: string) => {
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
    } else {
      setUserList([]);
    }
  }, [debounceSearchText]);

  const handleMoveChatRoom = async (nickname: string) => {
    const response = await getUserId(nickname);
    const userId = response.data.data.userId;

    router.push(`/chat/${userId}?nickname=${encodeURIComponent(nickname)}`);
  };

  return (
    <div className="bg-light-gray h-[92vh] w-full overflow-hidden">
      <div className="w-[90%] ml-auto mr-auto pt-6 pb-6">
        <input
          placeholder="친구의 닉네임을 입력해주세요."
          className="p-2 rounded-md w-full"
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
          ) : (
            <p className="bg-white rounded-md p-4 mt-2">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
