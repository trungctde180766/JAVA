import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { requireUser, jsonError } from "@/lib/auth";

// Đổi mật khẩu
export async function PATCH(req) {
  const [user, err] = await requireUser();
  if (err) return err;
  const { currentPassword, newPassword } = await req.json().catch(() => ({}));
  if (!newPassword || String(newPassword).length < 6) return jsonError("Mật khẩu mới tối thiểu 6 ký tự");

  const db = await getDb();
  const full = await db.collection("users").findOne({ _id: user._id });
  if (!(await bcrypt.compare(String(currentPassword || ""), full.passwordHash)))
    return jsonError("Mật khẩu hiện tại không đúng", 401);

  await db
    .collection("users")
    .updateOne({ _id: user._id }, { $set: { passwordHash: await bcrypt.hash(String(newPassword), 10) } });
  return NextResponse.json({ ok: true });
}

// Xóa dữ liệu học tập của chính mình: ?what=mistakes | bookmarks | history
export async function DELETE(req) {
  const [user, err] = await requireUser();
  if (err) return err;
  const what = new URL(req.url).searchParams.get("what");
  const db = await getDb();
  if (what === "mistakes") await db.collection("users").updateOne({ _id: user._id }, { $set: { mistakes: {} } });
  else if (what === "bookmarks") await db.collection("users").updateOne({ _id: user._id }, { $set: { bookmarks: [] } });
  else if (what === "history") await db.collection("attempts").deleteMany({ userId: user._id });
  else return jsonError("Tham số không hợp lệ");
  return NextResponse.json({ ok: true });
}
