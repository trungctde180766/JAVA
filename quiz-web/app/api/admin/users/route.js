import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const [, err] = await requireAdmin();
  if (err) return err;

  try {
    const db = await getDb();
    const users = await db
      .collection("users")
      .find({}, { projection: { passwordHash: 0 } })
      .sort({ lastActiveAt: -1, lastLoginAt: -1, createdAt: -1 })
      .toArray();

    const now = Date.now();
    let onlineCount = 0;
    let awayCount = 0;
    let offlineCount = 0;
    let bannedCount = 0;

    const serializedUsers = users.map((u) => {
      if (u.banned) bannedCount++;

      const activeTime = u.lastActiveAt ? new Date(u.lastActiveAt).getTime() : 0;
      const loginTime = u.lastLoginAt ? new Date(u.lastLoginAt).getTime() : 0;
      const lastTime = Math.max(activeTime, loginTime);
      const diffSec = lastTime ? Math.floor((now - lastTime) / 1000) : 999999;

      let status = "offline";
      let isLiveOnline = false;

      // Trong vòng 70 giây & không bị đánh dấu offline rõ ràng -> Online
      if (u.isOnline !== false && diffSec <= 70) {
        status = "online";
        isLiveOnline = true;
        onlineCount++;
      } else if (u.isOnline !== false && diffSec <= 300) {
        status = "away";
        awayCount++;
      } else {
        status = "offline";
        offlineCount++;
      }

      return {
        id: String(u._id),
        username: u.username,
        role: u.role || "user",
        banned: !!u.banned,
        mistakesCount: Object.keys(u.mistakes || {}).length,
        bookmarksCount: (u.bookmarks || []).length,
        lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        lastActiveAt: u.lastActiveAt ? u.lastActiveAt.toISOString() : null,
        currentAction: u.currentAction || null,
        currentPath: u.currentPath || null,
        isOnline: isLiveOnline,
        status, // "online" | "away" | "offline"
        diffSec,
        lastLoginIp: u.lastLoginIp || "Chưa có",
        lastDevice: u.lastDevice || "Desktop",
        lastOs: u.lastOs || "Khác",
        lastBrowser: u.lastBrowser || "Khác",
        lastCity: u.lastCity || "Việt Nam",
        lastCountry: u.lastCountry || "VN",
        knownIps: u.knownIps || [],
        createdAt: u.createdAt ? u.createdAt.toISOString() : null,
      };
    });

    return NextResponse.json({
      ok: true,
      users: serializedUsers,
      stats: {
        totalUsers: users.length,
        onlineCount,
        awayCount,
        offlineCount,
        bannedCount,
      },
      timestamp: now,
    });
  } catch (e) {
    console.error("Lỗi khi tải danh sách users real-time:", e);
    return jsonError("Lỗi hệ thống: " + e.message, 500);
  }
}

