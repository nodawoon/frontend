import "./globals.css";
import Header from "@/components/layout/Header";
import Image from "next/image";

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
    <html lang="ko">
      <body className="desktop:flex desktop:items-start max-h-screen">
        <section className="desktop:w-full max-w-[460px] w-full mx-auto">
          <Header />
          <section>{children}</section>
        </section>
        <section className={`desktop:intro-section-desktop hidden`}>
          <div className="h-1/2"></div>
          <Image
            src="/logo.svg"
            alt="'너에게 난' 로고"
            width="350"
            height="80"
            priority={true}
            style={{ width: "350px", height: "80px" }}
          />
          <div>
            <p className="mt-5">‘너에게 난 어떤 사람일까?’ 라는 궁금증에 대한 해답을 담았습니다.</p>
            <p className="mb-40">
              메인 색상인 파란색은 신뢰를 나타내며 고양이 캐릭터는 무의식을 의미합니다.
            </p>
          </div>
          <Image src="/github.svg" alt="깃허브 로고" width="50" height="50" />
          <p className="text-sm font-light text-dark-gray mt-10">
            Copyright 2024. SSAFY. All rights reserved.
          </p>
        </section>
      </body>
    </html>
  );
}
