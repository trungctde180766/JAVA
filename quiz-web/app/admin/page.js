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

  // Load recent activity logs
  const activityLogs = await db
    .collection("activity_logs")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  // Calculate stats
  const totalUsers = users.length;
  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0);
  const totalAttempts = await db.collection("attempts").countDocuments();
  const totalLogs = await db.collection("activity_logs").countDocuments();

  const mem = process.memoryUsage();
  const initialSystem = {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: Math.floor(process.uptime()),
    memory: {
      rss: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
      heapTotal: Math.round((mem.heapTotal / 1024 / 1024) * 10) / 10,
      heapUsed: Math.round((mem.heapUsed / 1024 / 1024) * 10) / 10,
    },
  };

  const serializedUsers = users.map((u) => ({
    id: String(u._id),
    username: u.username,
    role: u.role || "user",
    banned: !!u.banned,
    mistakesCount: Object.keys(u.mistakes || {}).length,
    bookmarksCount: (u.bookmarks || []).length,
    lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
    lastLoginIp: u.lastLoginIp || "Chưa có",
    lastDevice: u.lastDevice || "Desktop",
    lastOs: u.lastOs || "Khác",
    lastBrowser: u.lastBrowser || "Khác",
    lastCity: u.lastCity || "Việt Nam",
    lastCountry: u.lastCountry || "VN",
    knownIps: u.knownIps || [],
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

  const serializedLogs = activityLogs.map((l) => ({
    id: String(l._id),
    userId: l.userId ? String(l.userId) : null,
    username: l.username,
    action: l.action,
    details: l.details || {},
    ip: l.ip || "127.0.0.1",
    country: l.country || "VN",
    city: l.city || "Việt Nam",
    device: l.device || "Desktop",
    os: l.os || "Khác",
    browser: l.browser || "Khác",
    userAgent: l.userAgent || "",
    createdAt: l.createdAt ? l.createdAt.toISOString() : null,
  }));

  return (
    <AdminClient
      currentUser={{ id: String(user._id), username: user.username }}
      stats={{ totalUsers, totalQuizzes, totalQuestions, totalAttempts, totalLogs }}
      initialUsers={serializedUsers}
      initialQuizzes={serializedQuizzes}
      initialAttempts={serializedAttempts}
      initialLogs={serializedLogs}
      initialSystem={initialSystem}
    />
  );
}
