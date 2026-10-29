import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createToken, setSessionCookie, jsonError } from "@/lib/auth";
import { logActivity } from "@/lib/telemetry";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!username || !password) return jsonError("Vui lòng nhập tên đăng nhập và mật khẩu");

    const db = await getDb();
    const user = await db.collection("users").findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      return jsonError("Sai tên đăng nhập hoặc mật khẩu", 401);
    if (user.banned) return jsonError("Tài khoản đã bị khóa. Liên hệ admin.", 403);

    await logActivity(db, {
      userId: user._id,
      username: user.username,
      action: "LOGIN",
      details: { role: user.role },
      req,
    });

    const token = await createToken(user);
    return setSessionCookie(NextResponse.json({ ok: true, role: user.role }), token);
  } catch (err) {
    console.error(err);
    return jsonError("Lỗi máy chủ: " + err.message, 500);
  }
}
