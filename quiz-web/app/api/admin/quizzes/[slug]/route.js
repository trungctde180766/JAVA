import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";
import { normalizeQuestions } from "@/lib/validate";
import { clearQuizCache } from "@/lib/quizzes";

// Cập nhật toàn bộ bộ đề (thông tin + danh sách câu hỏi)
export async function PUT(req, { params }) {
  const [, err] = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const body = await req.json().catch(() => ({}));

  const title = String(body.title || "").trim();
  if (!title) return jsonError("Tên bộ đề không được trống");
  const [questions, qErr] = normalizeQuestions(body.questions);
  if (qErr) return jsonError(qErr);

  const db = await getDb();
  const r = await db.collection("quizzes").updateOne(
    { slug },
    {
      $set: {
        title: title.slice(0, 120),
        description: String(body.description || "").slice(0, 300),
        icon: String(body.icon || "📘").slice(0, 4),
        color: /^#[0-9a-f]{6}$/i.test(body.color || "") ? body.color : "#7c5cff",
        order: Number.isFinite(Number(body.order)) ? Number(body.order) : 99,
        hidden: !!body.hidden,
        questions,
        updatedAt: new Date(),
      },
    }
  );
  if (!r.matchedCount) return jsonError("Không tìm thấy bộ đề", 404);
  clearQuizCache();
  return NextResponse.json({ ok: true, count: questions.length });
}

export async function DELETE(req, { params }) {
  const [, err] = await requireAdmin();
  if (err) return err;
  const { slug } = await params;
  const db = await getDb();
  const r = await db.collection("quizzes").deleteOne({ slug });
  if (!r.deletedCount) return jsonError("Không tìm thấy bộ đề", 404);
  clearQuizCache();
  return NextResponse.json({ ok: true });
}
