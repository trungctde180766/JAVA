import { ALL_TOPICS } from "./topics";

export const SLUG_RE = /^[a-z0-9-]{2,60}$/;

export function slugify(str = "") {
  return (
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/gi, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "quiz"
  );
}

/** Chuẩn hoá & kiểm tra danh sách câu hỏi do admin gửi lên. Trả về [questions, error]. */
export function normalizeQuestions(input) {
  if (!Array.isArray(input)) return [null, "questions phải là mảng"];
  if (input.length > 300) return [null, "Tối đa 300 câu / bộ đề"];
  const validId = (id) => typeof id === "string" && /^[a-z0-9_-]{1,30}$/i.test(id);
  const reserved = new Set(input.map((x) => x?.id).filter(validId));
  const used = new Set();
  const out = [];
  for (let i = 0; i < input.length; i++) {
    const q = input[i] || {};
    const n = i + 1;
    const text = String(q.text || "").trim();
    if (!text) return [null, `Câu ${n}: chưa nhập nội dung câu hỏi`];
    const options = (Array.isArray(q.options) ? q.options : []).map((o) => String(o ?? "").trim());
    if (options.length < 2 || options.length > 6) return [null, `Câu ${n}: cần 2–6 đáp án`];
    if (options.some((o) => !o)) return [null, `Câu ${n}: có đáp án bị trống`];
    const answer = Number(q.answer);
    if (!Number.isInteger(answer) || answer < 0 || answer >= options.length)
      return [null, `Câu ${n}: chưa chọn đáp án đúng`];

    let id = /^[a-z0-9_-]{1,30}$/i.test(q.id || "") ? q.id : "";
    if (!id || used.has(id)) {
      let k = out.length + 1;
      do id = `q${String(k++).padStart(2, "0")}`;
      while (used.has(id) || input.some((x, j) => j > i && x?.id === id));
    }
    used.add(id);

    out.push({
      id,
      topic: ALL_TOPICS[q.topic] ? q.topic : "other",
      text: text.slice(0, 2000),
      ...(q.code && String(q.code).trim() ? { code: String(q.code).slice(0, 5000) } : {}),
      options: options.map((o) => o.slice(0, 500)),
      answer,
      explanation: String(q.explanation || "").slice(0, 4000),
    });
  }
  return [out, null];
}
