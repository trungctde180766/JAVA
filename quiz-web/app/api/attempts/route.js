import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireUser, jsonError } from "@/lib/auth";
import { getAllQuestions, getQuizList, sessionTitle } from "@/lib/quizzes";
import { logActivity } from "@/lib/telemetry";

// Nộp bài: chấm điểm phía server (không tin điểm từ client), lưu lịch sử, cập nhật "câu sai".
export async function POST(req) {
  const [user, err] = await requireUser();
  if (err) return err;
  try {
    const body = await req.json().catch(() => ({}));
    const slug = String(body.slug || "").slice(0, 80);
    const mode = body.mode === "exam" ? "exam" : "practice";
    const answers = Array.isArray(body.answers) ? body.answers.slice(0, 500) : [];
    if (!slug || answers.length === 0) return jsonError("Bài làm trống");

    const all = await getAllQuestions({ includeHidden: true });
    const byKey = new Map(all.map((q) => [q.key, q]));

    const items = [];
    for (const a of answers) {
      const q = byKey.get(String(a?.key));
      if (!q) continue;
      let chosen = null;
      if (typeof a?.chosenText === "string" && q.options.includes(a.chosenText)) {
        chosen = q.options.indexOf(a.chosenText);
      } else if (Number.isInteger(a?.chosen) && a.chosen >= 0 && a.chosen < q.options.length) {
        chosen = a.chosen;
      }
      items.push({ key: q.key, topic: q.topic, chosen, answer: q.answer, correct: chosen === q.answer });
    }
    if (items.length === 0) return jsonError("Không tìm thấy câu hỏi hợp lệ");

    const correct = items.filter((i) => i.correct).length;
    const total = items.length;
    const percent = Math.round((correct / total) * 1000) / 10;
    const durationSec = Math.max(0, Math.min(Number(body.durationSec) || 0, 6 * 3600));
    const timeLimitSec = mode === "exam" ? Math.max(0, Number(body.timeLimitSec) || 0) : 0;

    const quizList = await getQuizList();
    const titleMap = Object.fromEntries(quizList.map((q) => [q.slug, q.title]));

    const db = await getDb();
    const { insertedId } = await db.collection("attempts").insertOne({
      userId: user._id,
      username: user.username,
      quizSlug: slug,
      quizTitle: sessionTitle(slug, titleMap),
      mode,
      total,
      correct,
      percent,
      durationSec,
      timeLimitSec,
      items,
      createdAt: new Date(),
    });

    // Cập nhật sổ "câu sai": sai → +1; đúng 2 lần liên tiếp → coi như đã thuộc, xóa khỏi sổ.
    const mistakes = { ...(user.mistakes || {}) };
    let removed = 0;
    for (const it of items) {
      const m = mistakes[it.key];
      if (!it.correct) {
        mistakes[it.key] = { wrong: (m?.wrong || 0) + 1, streak: 0, last: new Date() };
      } else if (m) {
        const streak = (m.streak || 0) + 1;
        if (streak >= 2) {
          delete mistakes[it.key];
          removed++;
        } else mistakes[it.key] = { ...m, streak };
      }
    }
    await db.collection("users").updateOne({ _id: user._id }, { $set: { mistakes } });

    await logActivity(db, {
      userId: user._id,
      username: user.username,
      action: "SUBMIT_QUIZ",
      details: {
        quizSlug: slug,
        quizTitle: sessionTitle(slug, titleMap),
        mode,
        percent,
        score: `${correct}/${total}`,
        durationSec,
      },
      req,
    });

    return NextResponse.json({ ok: true, id: String(insertedId), correct, total, percent, mastered: removed });
  } catch (e) {
    console.error(e);
    return jsonError("Lỗi máy chủ: " + e.message, 500);
  }
}
