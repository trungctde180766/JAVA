import { getDb } from "./db";
import { TOPICS, ALL_TOPICS, topicName } from "./topics";
export { TOPICS, ALL_TOPICS, topicName };

const signature = (q) => `${q.text}|${q.code || ""}|${(q.options || []).join("|")}`;

/** Danh sách bộ đề (không kèm câu hỏi) + số câu. */
export async function getQuizList() {
  const db = await getDb();
  return db
    .collection("quizzes")
    .aggregate([
      { $sort: { order: 1, createdAt: 1 } },
      {
        $project: {
          _id: 0,
          slug: 1,
          title: 1,
          description: 1,
          color: 1,
          icon: 1,
          order: 1,
          hidden: 1,
          count: { $size: { $ifNull: ["$questions", []] } },
        },
      },
    ])
    .toArray();
}

/** Tất cả câu hỏi (dạng phẳng), mỗi câu có key duy nhất "slug:id". */
export async function getAllQuestions({ includeHidden = false } = {}) {
  const db = await getDb();
  const filter = includeHidden ? {} : { hidden: { $ne: true } };
  const quizzes = await db.collection("quizzes").find(filter).sort({ order: 1 }).toArray();
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
        code: q.code || "",
        options: q.options,
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

  const db = await getDb();
  const quiz = await db.collection("quizzes").findOne({ slug });
  if (!quiz || (quiz.hidden && user.role !== "admin")) return null;
  return {
    slug,
    kind: "quiz",
    title: quiz.title,
    icon: quiz.icon || "📘",
    color: quiz.color || "#7c5cff",
    description: quiz.description || "",
    questions: (quiz.questions || []).map((q) => ({
      key: `${quiz.slug}:${q.id}`,
      quizSlug: quiz.slug,
      quizTitle: quiz.title,
      id: q.id,
      topic: q.topic || "other",
      text: q.text,
      code: q.code || "",
      options: q.options,
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
