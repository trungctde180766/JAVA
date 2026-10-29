import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb, toId } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";

// PATCH { action: "role"|"ban"|"password"|"clear", ... }
export async function PATCH(req, { params }) {
  const [admin, err] = await requireAdmin();
  if (err) return err;
  const { id } = await params;
  const _id = toId(id);
  if (!_id) return jsonError("ID không hợp lệ");

  const body = await req.json().catch(() => ({}));
  const db = await getDb();
  const users = db.collection("users");
  const target = await users.findOne({ _id });
  if (!target) return jsonError("Không tìm thấy người dùng", 404);
  const isSelf = String(target._id) === String(admin._id);

  switch (body.action) {
    case "role": {
      if (isSelf) return jsonError("Không thể tự đổi quyền của chính mình");
      const role = body.role === "admin" ? "admin" : "user";
      await users.updateOne({ _id }, { $set: { role } });
      return NextResponse.json({ ok: true, role });
    }
    case "ban": {
      if (isSelf) return jsonError("Không thể tự khóa chính mình");
      const banned = !!body.banned;
      await users.updateOne({ _id }, { $set: { banned } });
      return NextResponse.json({ ok: true, banned });
    }
    case "password": {
      const pw = String(body.password || "");
      if (pw.length < 6) return jsonError("Mật khẩu tối thiểu 6 ký tự");
      await users.updateOne({ _id }, { $set: { passwordHash: await bcrypt.hash(pw, 10) } });
      return NextResponse.json({ ok: true });
    }
    case "clear": {
      await users.updateOne({ _id }, { $set: { mistakes: {}, bookmarks: [] } });
      await db.collection("attempts").deleteMany({ userId: _id });
      return NextResponse.json({ ok: true });
    }
    default:
      return jsonError("Hành động không hợp lệ");
  }
}

export async function DELETE(req, { params }) {
  const [admin, err] = await requireAdmin();
  if (err) return err;
  const { id } = await params;
  const _id = toId(id);
  if (!_id) return jsonError("ID không hợp lệ");
  if (String(_id) === String(admin._id)) return jsonError("Không thể tự xóa chính mình");

  const db = await getDb();
  await db.collection("attempts").deleteMany({ userId: _id });
  const r = await db.collection("users").deleteOne({ _id });
  if (!r.deletedCount) return jsonError("Không tìm thấy người dùng", 404);
  return NextResponse.json({ ok: true });
}
