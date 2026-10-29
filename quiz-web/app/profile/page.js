import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import ProfileClient from "./ProfileClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hồ Sơ Cá Nhân & Tiến Độ Học Tập - JavaQuiz Pro",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const db = await getDb();
  const attempts = await db
    .collection("attempts")
    .find({ userId: user._id })
    .sort({ createdAt: -1 })
    .toArray();

  const serializedAttempts = attempts.map((a) => ({
    id: String(a._id),
    quizTitle: a.quizTitle || a.quizSlug,
    quizSlug: a.quizSlug,
    mode: a.mode,
    total: a.total,
    correct: a.correct,
    percent: a.percent,
    durationSec: a.durationSec,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <ProfileClient
      user={{
        username: user.username,
        role: user.role,
        createdAt: user.createdAt ? user.createdAt.toISOString() : null,
        mistakesCount: Object.keys(user.mistakes || {}).length,
        bookmarksCount: (user.bookmarks || []).length,
      }}
      initialAttempts={serializedAttempts}
    />
  );
}
