import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "JavaQuiz Pro - 3 Bộ Đề Ôn Thi Java Trắc Nghiệm Có Giải Thích Chi Tiết",
  description:
    "Web ôn thi 3 bộ đề trắc nghiệm Java: OOP, Overloading/Overriding, Access Modifiers, Interface, String, StringBuffer, JDBC. Có giải thích chi tiết từng câu, chế độ thi thử và lưu câu sai.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error("Error reading current user in RootLayout:", err.message);
  }

  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="bg-glow" />
        <Navbar user={user} />
        <main className="main-wrapper">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
