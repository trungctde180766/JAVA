import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";

export async function GET() {
  const [, err] = await requireAdmin();
  if (err) return err;

  try {
    const db = await getDb();

    // 1. Measure DB ping latency
    const pingStart = Date.now();
    await db.command({ ping: 1 });
    const dbLatencyMs = Date.now() - pingStart;

    // 2. System memory & runtime
    const mem = process.memoryUsage();
    const memory = {
      rss: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
      heapTotal: Math.round((mem.heapTotal / 1024 / 1024) * 10) / 10,
      heapUsed: Math.round((mem.heapUsed / 1024 / 1024) * 10) / 10,
      external: Math.round((mem.external / 1024 / 1024) * 10) / 10,
    };

    const uptime = Math.floor(process.uptime());

    // 3. User & Activity counts
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [totalUsers, activeUsers24h, totalAttempts, totalLogs, totalQuizzes] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("users").countDocuments({ lastLoginAt: { $gte: dayAgo } }),
      db.collection("attempts").countDocuments(),
      db.collection("activity_logs").countDocuments(),
      db.collection("quizzes").countDocuments(),
    ]);

    // 4. Fetch latest 100 activity logs
    const rawLogs = await db
      .collection("activity_logs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    const logs = rawLogs.map((l) => ({
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

    return NextResponse.json({
      ok: true,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime,
        memory,
        dbLatencyMs,
        environment: process.env.NODE_ENV || "production",
      },
      stats: {
        totalUsers,
        activeUsers24h,
        totalAttempts,
        totalLogs,
        totalQuizzes,
      },
      logs,
    });
  } catch (e) {
    console.error("Lỗi lấy thông tin server stats:", e);
    return jsonError("Lỗi hệ thống: " + e.message, 500);
  }
}

// DELETE: Dọn dẹp log cũ
export async function DELETE(req) {
  const [, err] = await requireAdmin();
  if (err) return err;

  try {
    const { olderThanDays = 30 } = await req.json().catch(() => ({}));
    const cutoff = new Date(Date.now() - Number(olderThanDays) * 24 * 60 * 60 * 1000);

    const db = await getDb();
    const result = await db.collection("activity_logs").deleteMany({
      createdAt: { $lt: cutoff },
    });

    return NextResponse.json({ ok: true, deletedCount: result.deletedCount });
  } catch (e) {
    return jsonError("Không thể xóa log: " + e.message, 500);
  }
}
