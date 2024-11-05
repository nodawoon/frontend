export type Size = "sm" | "md" | "lg";

interface ShareUrl {
  shareUrl: string;
}

interface Kakao {
  isInitialized(): boolean;
  init(appKey: string): void;
  Share: {
    sendDefault: (options: {
      objectType: string;
      text: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    }) => void;
  };
}

declare global {
  interface Window {
    Kakao: Kakao;
  }
}
