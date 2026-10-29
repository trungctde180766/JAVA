import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import QuizEditorClient from "./QuizEditorClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quản Lý Câu Hỏi Bộ Đề - JavaQuiz Pro Admin",
};

export default async function QuizEditorPage({ params }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/");

  const { slug } = await params;
  const db = await getDb();
  const quiz = await db.collection("quizzes").findOne({ slug });

  if (!quiz) {
    notFound();
  }

  const serializedQuiz = {
    slug: quiz.slug,
    title: quiz.title,
    description: quiz.description || "",
    icon: quiz.icon || "📘",
    color: quiz.color || "#7c5cff",
    order: quiz.order || 0,
    hidden: !!quiz.hidden,
    questions: quiz.questions || [],
  };

  return <QuizEditorClient initialQuiz={serializedQuiz} />;
}
