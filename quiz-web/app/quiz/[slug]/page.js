import { notFound } from "next/navigation";
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
  const defaultMode = sParams?.mode === "exam" ? "exam" : "practice";

  let user = null;
  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error("Error reading user session in QuizPage:", err);
  }

  const session = await buildQuizSession(slug, user || {});
  if (!session) {
    notFound();
  }

  return (
    <QuizClient
      session={session}
      initialUser={user ? { username: user.username, bookmarks: user.bookmarks || [] } : null}
      defaultMode={defaultMode}
    />
  );
}
