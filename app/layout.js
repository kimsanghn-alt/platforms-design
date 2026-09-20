import "./globals.css";

export const metadata = {
  title: "홍보물 맛집",
  description: "홍보 제작물 디자인을 나누는 게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
