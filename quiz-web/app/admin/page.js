import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bảng Điều Khiển Quản Trị - JavaQuiz Pro",
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/");

  const db = await getDb();

  // Load all users
  const users = await db
    .collection("users")
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1 })
    .toArray();

  // Load all quizzes
  const quizzes = await db
    .collection("quizzes")
    .find({})
    .sort({ order: 1, createdAt: 1 })
    .toArray();

  // Load recent attempts
  const attempts = await db
    .collection("attempts")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  // Calculate stats
  const totalUsers = users.length;
  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0);
  const totalAttempts = await db.collection("attempts").countDocuments();

  const serializedUsers = users.map((u) => ({
    id: String(u._id),
    username: u.username,
    role: u.role || "user",
    banned: !!u.banned,
    mistakesCount: Object.keys(u.mistakes || {}).length,
    bookmarksCount: (u.bookmarks || []).length,
    createdAt: u.createdAt ? u.createdAt.toISOString() : null,
  }));

  const serializedQuizzes = quizzes.map((q) => ({
    slug: q.slug,
    title: q.title,
    icon: q.icon || "📘",
    color: q.color || "#7c5cff",
    description: q.description || "",
    hidden: !!q.hidden,
    order: q.order || 0,
    count: (q.questions || []).length,
    createdAt: q.createdAt ? q.createdAt.toISOString() : null,
  }));

  const serializedAttempts = attempts.map((a) => ({
    id: String(a._id),
    username: a.username,
    quizTitle: a.quizTitle || a.quizSlug,
    quizSlug: a.quizSlug,
    mode: a.mode,
    total: a.total,
    correct: a.correct,
    percent: a.percent,
    durationSec: a.durationSec,
    createdAt: a.createdAt ? a.createdAt.toISOString() : null,
  }));

  return (
    <AdminClient
      currentUser={{ id: String(user._id), username: user.username }}
      stats={{ totalUsers, totalQuizzes, totalQuestions, totalAttempts }}
      initialUsers={serializedUsers}
      initialQuizzes={serializedQuizzes}
      initialAttempts={serializedAttempts}
    />
  );
}
