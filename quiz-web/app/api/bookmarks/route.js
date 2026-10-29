import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireUser, jsonError } from "@/lib/auth";

// Bật/tắt đánh dấu 1 câu hỏi
export async function POST(req) {
  const [user, err] = await requireUser();
  if (err) return err;
  const { key } = await req.json().catch(() => ({}));
  if (!key || typeof key !== "string" || key.length > 120) return jsonError("Thiếu key câu hỏi");

  const has = (user.bookmarks || []).includes(key);
  const db = await getDb();
  await db
    .collection("users")
    .updateOne({ _id: user._id }, has ? { $pull: { bookmarks: key } } : { $addToSet: { bookmarks: key } });
  return NextResponse.json({ ok: true, bookmarked: !has });
}
