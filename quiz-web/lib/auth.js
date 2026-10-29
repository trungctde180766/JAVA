import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDb, toId } from "./db";

export const COOKIE_NAME = "jq_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 ngày

function secretKey() {
  const s = process.env.JWT_SECRET || process.env.MONGODB_URI || "dev-only-secret";
  return new TextEncoder().encode(s);
}

export async function createToken(user) {
  return new SignJWT({ uid: String(user._id), username: user.username, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
}

export function setSessionCookie(res, token) {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}

export function clearSessionCookie(res) {
  res.cookies.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

/** Đọc session từ cookie (dùng trong Server Component & Route Handler). */
export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { uid: payload.uid, username: payload.username, role: payload.role };
  } catch {
    return null;
  }
}

/** Lấy user đầy đủ từ DB (kiểm tra bị khóa / bị xóa). */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  const db = await getDb();
  const user = await db.collection("users").findOne({ _id: toId(session.uid) }, { projection: { passwordHash: 0 } });
  if (!user || user.banned) return null;
  return user;
}

export function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Dùng trong API: trả về [user, null] hoặc [null, response lỗi]. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return [null, jsonError("Bạn cần đăng nhập", 401)];
  return [user, null];
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return [null, jsonError("Bạn cần đăng nhập", 401)];
  if (user.role !== "admin") return [null, jsonError("Chỉ admin mới được thực hiện", 403)];
  return [user, null];
}
