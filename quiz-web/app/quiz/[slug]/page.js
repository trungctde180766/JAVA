import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { buildQuizSession } from "@/lib/quizzes";
import QuizClient from "./QuizClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  return {
    title: `Luyện thi Java - ${slug}`,
  };
}

export default async function QuizPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  if (sParams?.mode === "exam") {
    redirect(`/exam/${slug}`);
  }

  let user = null;
  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error("Error reading user session in QuizPage:", err);
  }

  // Bắt buộc phải đăng nhập mới được vào học / làm bài
  if (!user) {
    const targetUrl = `/quiz/${slug}${sParams?.mode ? `?mode=${sParams.mode}` : ""}`;
    redirect(`/login?redirect=${encodeURIComponent(targetUrl)}&reason=required`);
  }

  const session = await buildQuizSession(slug, user);
  if (!session) {
    notFound();
  }

  return (
    <QuizClient
      session={session}
      initialUser={{ username: user.username, bookmarks: user.bookmarks || [] }}
      defaultMode={defaultMode}
    />
  );
}
