import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin, jsonError } from "@/lib/auth";
import { slugify } from "@/lib/validate";
import { clearQuizCache } from "@/lib/quizzes";

// Tạo bộ đề mới (rỗng), sau đó admin thêm câu hỏi trong trang chỉnh sửa
export async function POST(req) {
  const [, err] = await requireAdmin();
  if (err) return err;
  const body = await req.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  if (!title) return jsonError("Vui lòng nhập tên bộ đề");

  const db = await getDb();
  const col = db.collection("quizzes");
  const base = slugify(body.slug || title);
  let slug = base;
  for (let i = 2; await col.findOne({ slug }); i++) slug = `${base}-${i}`;
  if (["mix", "mistakes", "bookmarks"].includes(slug) || slug.startsWith("topic-")) slug = `quiz-${slug}`;

  const last = await col.find().sort({ order: -1 }).limit(1).toArray();
  const now = new Date();
  await col.insertOne({
    slug,
    title: title.slice(0, 120),
    description: String(body.description || "").slice(0, 300),
    icon: String(body.icon || "📘").slice(0, 4),
    color: /^#[0-9a-f]{6}$/i.test(body.color || "") ? body.color : "#7c5cff",
    order: (last[0]?.order || 0) + 1,
    hidden: false,
    questions: [],
    createdAt: now,
    updatedAt: now,
  });
  clearQuizCache();
  return NextResponse.json({ ok: true, slug });
}
