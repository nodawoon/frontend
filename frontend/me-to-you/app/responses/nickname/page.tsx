import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="overflow-y-hidden w-[90%] ml-auto mr-auto">
      <div className="flex flex-col h-[100%] justify-center mt-[30%]">
        <p className="font-bold text-[24px] mb-3">닉네임</p>
        <TextInput width={100} placeholder="2~10자 이내로 입력" />

        <Link className="mt-[120%] text-center" href={"nickname"}>
          <Button size="lg">설문 입력하러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
