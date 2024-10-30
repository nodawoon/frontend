import SurveyCard from "../../components/questions/SurveyCard";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="bg-light-gray">
      <p className="px-10 py-8 text-base font-bold">
        {" "}
        설문이 생성되었어요. 친구들에게 공유해보세요!{" "}
      </p>
      <SurveyCard />
      <footer className="text-center">
        <p>설문이 생성되었어요! 지인들에게 공유해보세요:{")"}</p>
        <div className="flex justify-center py-4">
          <div className="mr-2">
            <Image
              src="/share/kakao.svg"
              alt="카카오톡"
              width="50"
              height="50"
              className="border border-light-gray"
            />
            <p className="text-sm">카카오톡</p>
          </div>
          <div className="ml-2 mr-2">
            <div className="border-4 border-light-gray rounded-full bg-white flex p-2 w-[50px] h-[50px]">
              <Image src="/share/url.svg" alt="url" width={30} height={12} />
            </div>
            <p className="text-sm">링크복사</p>
          </div>
          <div className="ml-2">
            <div className="border-4 border-light-gray rounded-full bg-white flex p-2 w-[50px] h-[50px]">
              <Image
                src="/share/qr_code.svg"
                alt="url"
                width={20}
                height={12}
                className="ml-auto mr-auto"
              />
            </div>
            <p className="text-sm">QR</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
