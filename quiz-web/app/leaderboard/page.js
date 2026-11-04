import { getCurrentUser } from "@/lib/auth";
import { getQuizList } from "@/lib/quizzes";
import { getDb } from "@/lib/db";
import LeaderboardClient from "./LeaderboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bảng Xếp Hạng Thi Đua & Vinh Danh Thí Sinh - JavaQuiz Pro",
  description: "Bảng xếp hạng thành tích làm bài thi trắc nghiệm Java. Tra cứu điểm số cao nhất, thời gian nhanh nhất theo từng bài test và toàn hệ thống.",
};

export default async function LeaderboardPage({ searchParams }) {
  const params = await searchParams;
  const initialSlug = params?.quiz || params?.slug || "all";
  const initialMode = params?.mode || "all";

  const currentUser = await getCurrentUser();
  const rawQuizzes = await getQuizList();

  const db = await getDb();
  const attemptsCountsByQuiz = await db
    .collection("attempts")
    .aggregate([{ $group: { _id: "$quizSlug", count: { $sum: 1 } } }])
    .toArray();
  const countMap = Object.fromEntries(attemptsCountsByQuiz.map((c) => [c._id, c.count]));

  const quizOptions = [
    {
      slug: "all",
      title: "Toàn Hệ Thống (Tổng Hợp)",
      icon: "🌐",
      color: "#6366f1",
      count: rawQuizzes.reduce((s, q) => s + (q.count || 0), 0),
      attemptsCount: attemptsCountsByQuiz.reduce((s, c) => s + c.count, 0),
    },
    ...rawQuizzes.map((q) => ({
      slug: q.slug,
      title: q.title,
      icon: q.icon || "📝",
      color: q.color || "#2563eb",
      count: q.count || 0,
      attemptsCount: countMap[q.slug] || 0,
    })),
  ];

  return (
    <LeaderboardClient
      currentUser={currentUser ? { id: String(currentUser._id), username: currentUser.username, role: currentUser.role } : null}
      quizOptions={quizOptions}
      initialSlug={initialSlug}
      initialMode={initialMode}
    />
  );
}
