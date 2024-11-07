"use client";

import ShareLink from "@/components/questions/ShareLink";
import SurveyCard from "../../components/questions/SurveyCard";
import React, { useEffect, useState } from "react";
import { getShareUrl } from "@/services/share";
import Script from "next/script";
import { QRCodeCanvas } from "qrcode.react";

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

const Page = () => {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);

  useEffect(() => {
    const fetchShareurl = async () => {
      await getShareUrl()
        .then(response => {
          const data = response.data.shareUrl;
          const parts = data.split("/");
          const id = parts[parts.length - 1];
          setShareUrl(id);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchShareurl();
  }, []);

  const handleKakaoInit = () => {
    if (API_KEY && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(API_KEY);
    }
  };

  const handleKakaoShare = () => {
    const invitationUrl = `${CLIENT_URL}/survey/invitation/${shareUrl}`;

    if (window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: "text",
        text: "(너에게 난) 친구의 설문이 도착했어요! 답변하러 가볼까요?",
        link: {
          mobileWebUrl: invitationUrl,
          webUrl: invitationUrl,
        },
      });
    }
  };

  const handleUrlShare = () => {
    const copyText = `${CLIENT_URL}/survey/invitation/${shareUrl}`;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch(() => {
        console.error("복사 실패");
      });
  };

  const handleQRShare = () => {
    setShowQR(true);
  };

  const closeQR = () => {
    setShowQR(false);
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas ? canvas.toDataURL("image/png") : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr.png";
    link.click();
  };

  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
        onLoad={handleKakaoInit}
      />
      <div className="bg-light-gray text-center relative">
        <p className="px-10 py-8 text-sm font-bold">
          설문이 생성되었어요. 친구들에게 공유해보세요!
        </p>
        <SurveyCard />
        <ShareLink
          handleKakaoShare={handleKakaoShare}
          handleUrlShare={handleUrlShare}
          handleQRShare={handleQRShare}
        />
        {isCopied && (
          <div className="absolute w-[80%] bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black font-bold w-[100%] py-4 px-8 rounded-lg shadow-lg animate-clipboard-fade-out">
              복사 되었습니다!
            </div>
          </div>
        )}
        {showQR && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 animate-qrcode-fade-in">
            <div className="bg-white p-4 flex flex-col justify-center items-center rounded-lg shadow-lg text-center">
              <div onClick={() => handleDownloadQR()} className="cursor-pointer">
                <QRCodeCanvas value={`${CLIENT_URL}/survey/invitation/${shareUrl}`} />
                <p className="text-sm mt-2 text-gray"> 클릭 시 다운로드 </p>
              </div>
              <div className="mt-3 font-regular">
                <p>
                  <span className="text-primary">QR 코드 </span>생성 완료!
                </p>
                <p>친구들에게 공유해보세요</p>
              </div>
              <button
                onClick={closeQR}
                className="mt-4 bg-gray-700 text-black px-2 py-2 rounded-full material-symbols-rounded border border-gray"
              >
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
