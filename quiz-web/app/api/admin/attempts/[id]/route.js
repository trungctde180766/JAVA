import { NextResponse } from "next/server";
import { getDb, toId } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";

export async function DELETE(req, { params }) {
  const [, err] = await requireAdmin();
  if (err) return err;
  const { id } = await params;
  const _id = toId(id);
  if (!_id) return jsonError("ID không hợp lệ");
  const db = await getDb();
  const r = await db.collection("attempts").deleteOne({ _id });
  if (!r.deletedCount) return jsonError("Không tìm thấy lượt làm bài", 404);
  return NextResponse.json({ ok: true });
}
