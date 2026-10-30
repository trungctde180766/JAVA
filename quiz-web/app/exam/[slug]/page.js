import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { buildQuizSession } from "@/lib/quizzes";
import ExamClient from "./ExamClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Phòng Thi Thử (Safe Exam) - ${slug}`,
  };
}

export default async function ExamPage({ params }) {
  const { slug } = await params;

  let user = null;
  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error("Error reading user in ExamPage:", err);
  }

  // Bắt buộc đăng nhập để vào phòng thi
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(`/exam/${slug}`)}&reason=required`);
  }

  const session = await buildQuizSession(slug, user);
  if (!session) {
    notFound();
  }

  return (
    <ExamClient
      session={session}
      user={{ username: user.username, role: user.role }}
    />
  );
}
