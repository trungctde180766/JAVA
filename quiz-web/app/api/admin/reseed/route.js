import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";
import { SEED_QUIZZES } from "@/lib/seedData";
import { clearQuizCache } from "@/lib/quizzes";

// mode = "missing": thêm lại bộ đề gốc nào đã bị xóa
// mode = "reset"  : ghi đè 3 bộ đề gốc về nội dung mặc định
export async function POST(req) {
  const [, err] = await requireAdmin();
  if (err) return err;
  const { mode } = await req.json().catch(() => ({}));
  if (!["missing", "reset"].includes(mode)) return jsonError("mode không hợp lệ");

  const db = await getDb();
  const col = db.collection("quizzes");
  const now = new Date();
  let changed = 0;
  for (const q of SEED_QUIZZES) {
    if (mode === "missing") {
      const r = await col.updateOne(
        { slug: q.slug },
        { $setOnInsert: { ...q, createdAt: now, updatedAt: now } },
        { upsert: true }
      );
      changed += r.upsertedCount;
    } else {
      const { slug, ...rest } = q;
      const r = await col.updateOne(
        { slug },
        { $set: { ...rest, hidden: false, updatedAt: now }, $setOnInsert: { slug, createdAt: now } },
        { upsert: true }
      );
      changed += r.modifiedCount + r.upsertedCount;
    }
  }
  clearQuizCache();
  return NextResponse.json({ ok: true, changed });
}
