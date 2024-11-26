export const initailizeKakao = (appKey: string): void => {
  if (!window.Kakao) {
    console.error("Kakao SDK 없음");
    return;
  }

  if (window.Kakao.isInitialized()) {
    window.Kakao.init(appKey);
  }
};

export const shareOnKakao = (url: string): void => {
  if (!window.Kakao) {
    console.error("Kakao SDK 없음");
    return;
  }

  window.Kakao.Share.sendDefault({
    objectType: "text",
    text: "(너에게 난) 친구의 설문이 도착했어요! 답변하러 가볼까요?",
    link: {
      mobileWebUrl: url,
      webUrl: url,
    },
  });
};
