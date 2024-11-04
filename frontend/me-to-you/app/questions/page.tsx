"use client";

import ShareLink from "@/components/questions/ShareLink";
import SurveyCard from "../../components/questions/SurveyCard";
import React, { useEffect, useState } from "react";
import { fetchShareUrl } from "@/services/share";

const Page = () => {
  const [shareUrl, setShareUrl] = useState<Promise<string>>();

  // TODO: 로그인 되면, Axios 통신을 통해 링크 공유 생성하기
  // useEffect(() => {
  //   const url = fetchShareUrl();
  //   setShareUrl(url);
  // }, []);

  const handleKakaoShare = () => {
    console.info(shareUrl);
  };

  const handleUrlShare = () => {
    console.info(shareUrl);
  };

  const handleQRShare = () => {
    console.info(shareUrl);
  };

  return (
    <div className="bg-light-gray text-center">
      <p className="px-10 py-8 text-base font-bold">
        {" "}
        설문이 생성되었어요. 친구들에게 공유해보세요!{" "}
      </p>
      <SurveyCard />
      <ShareLink
        handleKakaoShare={handleKakaoShare}
        handleUrlShare={handleUrlShare}
        handleQRShare={handleQRShare}
      />
    </div>
  );
};

export default Page;
