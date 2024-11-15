import "./globals.css";
import Header from "@/components/layout/Header";
import Image from "next/image";
import ReduxProvider from "./ReduxProvider";
import { AuthProvider } from "@/context/AuthContext";
// import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: { description: string; title: string } = {
  title: "너에게 난",
  description: "다른 사람에게 나는 어떤 사람일까?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-[100%]">
      {/*<GoogleTagManager gtmId="G-DJ3DYN2Y7M" />*/}
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-DJ3DYN2Y7M`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DJ3DYN2Y7M');
            `,
          }}
        />
        <title>{metadata.title}</title>
      </head>
      <body className="h-[100%] desktop:flex overflow-y-hidden">
        <ReduxProvider>
          <AuthProvider>
            <section className="desktop:w-full max-w-[460px] w-full mx-auto h-[100%] overflow-y-scroll scrollbar-none">
              <Header />
              <section>{children}</section>
            </section>

            <section className="desktop:intro-section-desktop hidden">
              <div className="h-1/2"></div>
              <Image
                src="/images/logo.svg"
                alt="'너에게 난' 로고"
                width="350"
                height="80"
                priority={true}
                style={{ width: "350px", height: "80px" }}
              />
              <div>
                <p className="mt-5">
                  ‘너에게 난 어떤 사람일까?’ 라는 궁금증에 대한 해답을 담았습니다.
                </p>
                <p className="mb-40">
                  메인 색상인 파란색은 신뢰를 나타내며 고양이 캐릭터는 무의식을 의미합니다.
                </p>
              </div>
              <p className="text-sm font-light text-dark-gray mt-10">
                Copyright 2024. SSAFY. All rights reserved.
              </p>
            </section>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
