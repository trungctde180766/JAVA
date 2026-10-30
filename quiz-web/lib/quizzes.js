import { getDb } from "./db";
import { TOPICS, ALL_TOPICS, topicName } from "./topics";
export { TOPICS, ALL_TOPICS, topicName };

const signature = (q) => `${q.text}|${q.code || ""}|${(q.options || []).join("|")}`;

// Cache in-memory: 3 phút (sub-millisecond navigation)
const CACHE_TTL_MS = 1000 * 60 * 3;
let cachedQuizzesRaw = null;
let lastCacheFetchTime = 0;

export function clearQuizCache() {
  cachedQuizzesRaw = null;
  lastCacheFetchTime = 0;
}

async function getCachedQuizzesRaw() {
  const now = Date.now();
  if (cachedQuizzesRaw && now - lastCacheFetchTime < CACHE_TTL_MS) {
    return cachedQuizzesRaw;
  }
  const db = await getDb();
  cachedQuizzesRaw = await db.collection("quizzes").find({}).sort({ order: 1, createdAt: 1 }).toArray();
  lastCacheFetchTime = now;
  return cachedQuizzesRaw;
}

/** Danh sách bộ đề (không kèm câu hỏi) + số câu. Phục vụ trong < 0.1ms từ RAM. */
export async function getQuizList() {
  const quizzes = await getCachedQuizzesRaw();
  return quizzes.map((q) => ({
    slug: q.slug,
    title: q.title,
    description: q.description,
    color: q.color,
    icon: q.icon,
    order: q.order || 99,
    hidden: !!q.hidden,
    isAiGenerated: !!q.isAiGenerated || q.slug.startsWith("ai-"),
    count: (q.questions || []).length,
  }));
}

/** Tất cả câu hỏi (dạng phẳng), mỗi câu có key duy nhất "slug:id". */
export async function getAllQuestions({ includeHidden = false } = {}) {
  const raw = await getCachedQuizzesRaw();
  const quizzes = includeHidden ? raw : raw.filter((q) => !q.hidden);
  const out = [];
  for (const quiz of quizzes) {
    for (const q of quiz.questions || []) {
      out.push({
        key: `${quiz.slug}:${q.id}`,
        quizSlug: quiz.slug,
        quizTitle: quiz.title,
        id: q.id,
        topic: q.topic || "other",
        text: q.text,
        textVi: q.textVi || "",
        textEn: q.textEn || "",
        code: q.code || "",
        options: q.options,
        optionsVi: q.optionsVi || [],
        optionsEn: q.optionsEn || [],
        answer: q.answer,
        explanation: q.explanation || "",
      });
    }
  }
  return out;
}

function dedupe(list) {
  const seen = new Set();
  return list.filter((q) => {
    const s = signature(q);
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  });
}

/**
 * Tạo "phiên làm bài" cho 1 slug:
 *  - slug bộ đề thật (quiz-1, ...)
 *  - mix        : đề tổng hợp ngẫu nhiên từ mọi bộ đề
 *  - mistakes   : các câu bạn hay làm sai
 *  - bookmarks  : các câu đã đánh dấu
 *  - topic-xxx  : luyện theo chủ đề
 */
export async function buildQuizSession(slug, user) {
  if (slug === "mix" || slug === "mistakes" || slug === "bookmarks" || slug.startsWith("topic-")) {
    const all = await getAllQuestions();
    if (slug === "mix") {
      return {
        slug,
        kind: "mix",
        title: "Đề tổng hợp ngẫu nhiên",
        icon: "🎲",
        color: "#f5b700",
        description: "Trộn câu hỏi từ tất cả bộ đề – giống thi thật.",
        questions: dedupe(all),
        pickCount: true,
      };
    }
    if (slug === "mistakes") {
      const keys = new Set(Object.keys(user.mistakes || {}));
      return {
        slug,
        kind: "mistakes",
        title: "Ôn lại câu sai",
        icon: "🩹",
        color: "#ff5c7a",
        description: "Câu sẽ rời khỏi danh sách khi bạn trả lời đúng 2 lần liên tiếp.",
        questions: all.filter((q) => keys.has(q.key)),
      };
    }
    if (slug === "bookmarks") {
      const keys = new Set(user.bookmarks || []);
      return {
        slug,
        kind: "bookmarks",
        title: "Câu đã đánh dấu",
        icon: "⭐",
        color: "#ffb020",
        description: "Những câu bạn đã lưu lại để xem kỹ hơn.",
        questions: all.filter((q) => keys.has(q.key)),
      };
    }
    const topic = slug.slice("topic-".length);
    if (!ALL_TOPICS[topic]) return null;
    return {
      slug,
      kind: "topic",
      title: `Chủ đề: ${ALL_TOPICS[topic]}`,
      icon: "🎯",
      color: "#3fa7ff",
      description: "Luyện tập tập trung vào một chủ đề.",
      questions: dedupe(all.filter((q) => q.topic === topic)),
      pickCount: true,
    };
  }

  const raw = await getCachedQuizzesRaw();
  const quiz = raw.find((q) => q.slug === slug);
  if (!quiz || (quiz.hidden && user.role !== "admin")) return null;
  return {
    slug,
    kind: "quiz",
    title: quiz.title,
    icon: quiz.icon || "📘",
    color: quiz.color || "#7c5cff",
    description: quiz.description || "",
    isAiGenerated: !!quiz.isAiGenerated || quiz.slug.startsWith("ai-"),
    questions: (quiz.questions || []).map((q) => ({
      key: `${quiz.slug}:${q.id}`,
      quizSlug: quiz.slug,
      quizTitle: quiz.title,
      id: q.id,
      topic: q.topic || "other",
      text: q.text,
      textVi: q.textVi || "",
      textEn: q.textEn || "",
      code: q.code || "",
      options: q.options,
      optionsVi: q.optionsVi || [],
      optionsEn: q.optionsEn || [],
      answer: q.answer,
      explanation: q.explanation || "",
    })),
  };
}

export function sessionTitle(slug, quizTitleMap = {}) {
  if (slug === "mix") return "Đề tổng hợp ngẫu nhiên";
  if (slug === "mistakes") return "Ôn lại câu sai";
  if (slug === "bookmarks") return "Câu đã đánh dấu";
  if (slug?.startsWith("topic-")) return `Chủ đề: ${topicName(slug.slice(6))}`;
  return quizTitleMap[slug] || slug;
}
