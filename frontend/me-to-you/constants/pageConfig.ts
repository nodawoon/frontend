export interface PageConfig {
  title: string;
  hideBackButton?: boolean;
  background?: string;
  hideHeader?: boolean;
}

export const PAGE_CONFIG: { [key: string]: PageConfig } = {
  "/": {
    title: "너에게 난",
    hideBackButton: true,
    background: "bg-light-gray",
  },
  "/signin": {
    title: "로그인",
    hideHeader: true,
  },
  "/signup": {
    title: "회원가입",
    hideHeader: true,
  },
  "/profile": {
    title: "프로필",
    background: "bg-white",
  },
  "/questions": {
    title: "설문 생성",
    background: "bg-light-gray",
  },
  "/results/questions": {
    title: "결과 확인",
    background: "bg-white",
  },
  "/results/respondents/": {
    title: "결과 확인",
    background: "bg-white",
  },
  "/results/respondents": {
    title: "결과 확인",
    background: "bg-light-gray",
  },
  "/results": {
    title: "결과 확인",
    background: "bg-white",
  },
  "/responses": {
    title: "설문 응답",
    background: "bg-white",
  },
  "/chatbot": {
    title: "챗봇 생성",
    background: "bg-white",
  },
  "/survey/invitation": {
    title: "설문 초대",
    hideBackButton: true,
    background: "bg-white",
  },
  "/survey/result": {
    title: "",
    hideBackButton: true,
    background: "bg-white",
  },
  "/chat": {
    title: "너에게 난 챗봇",
    background: "bg-light-gray",
  },
};
