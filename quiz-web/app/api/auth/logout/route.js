import { NextResponse } from "next/server";
import { clearSessionCookie, getSession } from "@/lib/auth";
import { getDb, toId } from "@/lib/db";
import { logActivity } from "@/lib/telemetry";

export async function POST(req) {
  try {
    const session = await getSession();
    if (session?.uid) {
      const db = await getDb();
      await db.collection("users").updateOne(
        { _id: toId(session.uid) },
        {
          $set: {
            isOnline: false,
            lastActiveAt: new Date(),
            currentAction: "Đã đăng xuất",
          },
        }
      );
      await logActivity(db, {
        userId: session.uid,
        username: session.username,
        action: "LOGOUT",
        req,
      });
    }
  } catch (e) {
    console.error("Lỗi telemetry khi logout:", e);
  }
  return clearSessionCookie(NextResponse.json({ ok: true }));
}
