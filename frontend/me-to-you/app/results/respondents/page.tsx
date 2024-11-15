"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loadRespondentList } from "@/slice/respondentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Page: React.FC = () => {
  const router = useRouter();
  const { list } = useAppSelector(state => state.respondents);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadRespondentList());
    })();
  }, [dispatch]);
  const combinedClassName: string = "h-auto rounded-xl p-1 bg-white hover:bg-gray w-full";

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-[92vh] bg-light-gray">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full">내 질문에 응답한 사람들</p>
        <div className="relative flex flex-wrap gap-3">
          {list[0]?.respondentNickname === undefined ? (
            <div className="text-gray mb-5">아직 응답자가 없어요...</div>
          ) : (
            list.map((e: { respondentId: number; respondentNickname: string }, index: number) => {
              if (e.respondentNickname === undefined) return;
              return (
                <div key={index} className="flex flex-col grow max-w-[30%]">
                  <Image
                    src="/images/character.svg"
                    alt="로고이미지"
                    width="100"
                    height="100"
                    className={combinedClassName}
                    onClick={() => router.push("respondents/" + e.respondentId)}
                    priority
                  />
                  <span className="text-center w-full">
                    {e.respondentNickname !== "" ? e.respondentNickname : "익명"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
