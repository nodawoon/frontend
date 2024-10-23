import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
