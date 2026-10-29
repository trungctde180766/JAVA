import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createToken, setSessionCookie, jsonError } from "@/lib/auth";

const USERNAME_RE = /^[a-z0-9_.]{3,24}$/;

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!USERNAME_RE.test(username))
      return jsonError("Tên đăng nhập 3–24 ký tự, chỉ gồm chữ thường, số, dấu _ hoặc .");
    if (password.length < 6) return jsonError("Mật khẩu tối thiểu 6 ký tự");

    const db = await getDb();
    const users = db.collection("users");
    if (await users.findOne({ username })) return jsonError("Tên đăng nhập đã tồn tại", 409);

    const doc = {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      role: "user",
      banned: false,
      bookmarks: [],
      mistakes: {},
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
    const { insertedId } = await users.insertOne(doc);
    const token = await createToken({ ...doc, _id: insertedId });
    return setSessionCookie(NextResponse.json({ ok: true, role: doc.role }), token);
  } catch (err) {
    if (err?.code === 11000) return jsonError("Tên đăng nhập đã tồn tại", 409);
    console.error(err);
    return jsonError("Lỗi máy chủ: " + err.message, 500);
  }
}
