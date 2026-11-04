import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processedJsonPath = path.resolve(__dirname, "scjp_processed.json");
const rawQuestions = JSON.parse(fs.readFileSync(processedJsonPath, "utf-8"));

console.log(`Read ${rawQuestions.length} questions from ${processedJsonPath}`);

const CHAPTER_TITLES = {
  1: "Ch1: Language Fundamentals",
  2: "Ch2: Declarations & Access Control",
  3: "Ch3: Operators & Assignments",
  4: "Ch4: Flow Control & Exceptions",
  5: "Ch5: OOP, Overloading & Constructors",
  6: "Ch6: Java.lang, Strings & Wrappers",
  7: "Ch7: Objects & Collections",
  8: "Ch8: Inner Classes",
  9: "Ch9: Threads & Synchronization"
};

const CHAPTER_ICONS = {
  1: "🔤",
  2: "🛡️",
  3: "➕",
  4: "🔀",
  5: "🧱",
  6: "🔤",
  7: "📦",
  8: "🪆",
  9: "🧵"
};

const CHAPTER_COLORS = {
  1: "#0284c7",
  2: "#7c3aed",
  3: "#059669",
  4: "#d97706",
  5: "#dc2626",
  6: "#2563eb",
  7: "#0891b2",
  8: "#9333ea",
  9: "#ea580c"
};

// 1. All questions array
const questionsClean = rawQuestions.map((q) => ({
  id: q.id,
  originalId: q.originalId,
  chapterNum: q.chapterNum,
  chapterTitle: q.chapterTitle,
  topic: q.topic,
  text: q.text,
  textVi: q.textVi,
  code: q.code || "",
  options: q.options,
  optionsVi: q.optionsVi,
  answer: q.answer,
  explanation: q.explanation
}));

// 2. Full 161 question quiz
const scjpChapterAllQuiz = {
  slug: "scjp-chapter-all",
  title: "SCJP Chapters – Trọn Bộ 161 Câu Hỏi (Ch01 - Ch09)",
  description: "Toàn bộ 161 câu hỏi trắc nghiệm Self Test từ 9 Chương của giáo trình Sun Certified Java Programmer (Kathy Sierra & Bert Bates) kèm giải thích chi tiết.",
  color: "#4f46e5",
  icon: "📚",
  order: 11,
  hidden: false,
  isScjpChapter: true,
  questions: questionsClean
};

// 3. Random 20 Quiz (Default 20 sampled, but dynamically sampled in session)
// Sample 20 balanced questions (around 2 from each chapter)
const sample20 = [];
for (let c = 1; c <= 9; c++) {
  const chQs = questionsClean.filter((q) => q.chapterNum === c);
  // Pick 2 from each, and 3 from ch1 and ch5
  const countToPick = (c === 1 || c === 5) ? 3 : 2;
  sample20.push(...chQs.slice(0, countToPick));
}

const scjpRandom20Quiz = {
  slug: "scjp-random-20",
  title: "SCJP Exam – Random 20 Câu (Tổng Hợp Các Chapter)",
  description: "Đề thi ngẫu nhiên 20 câu trích từ 161 câu hỏi trắc nghiệm của 9 Chapters SCJP (Kathy Sierra & Bert Bates). Mỗi lần vào thi hoặc bấm làm lại sẽ bốc ngẫu nhiên một đề mới hoàn toàn!",
  color: "#0284c7",
  icon: "🎲",
  order: 10,
  hidden: false,
  isRandom20: true,
  isScjpChapter: true,
  questions: sample20.slice(0, 20)
};

// 4. Nine individual chapter quizzes
const scjpChapterQuizzes = [];
for (let c = 1; c <= 9; c++) {
  const chQs = questionsClean.filter((q) => q.chapterNum === c);
  scjpChapterQuizzes.push({
    slug: `scjp-ch0${c}`,
    title: `SCJP ${CHAPTER_TITLES[c]}`,
    description: `${chQs.length} câu hỏi Self Test Chương ${c}: ${CHAPTER_TITLES[c]} (Kathy Sierra & Bert Bates).`,
    color: CHAPTER_COLORS[c],
    icon: CHAPTER_ICONS[c],
    order: 20 + c,
    hidden: false,
    isScjpChapter: true,
    chapterNum: c,
    questions: chQs
  });
}

// Write to lib/scjpChapterData.js
const targetFile = path.resolve(__dirname, "../lib/scjpChapterData.js");

const codeContent = `// SCJP Chapter Self Test Questions (Sierra & Bates - 9 Chapters)
// Extracted from original chapter PDFs in quiz-web/SCJP Chapter

export const scjpChapterQuestions = ${JSON.stringify(questionsClean, null, 2)};

export const scjpRandom20Quiz = ${JSON.stringify(scjpRandom20Quiz, null, 2)};

export const scjpChapterAllQuiz = ${JSON.stringify(scjpChapterAllQuiz, null, 2)};

export const scjpChapterQuizzes = ${JSON.stringify(scjpChapterQuizzes, null, 2)};

export const ALL_SCJP_CHAPTER_QUIZZES = [
  scjpRandom20Quiz,
  scjpChapterAllQuiz,
  ...scjpChapterQuizzes
];
`;

fs.writeFileSync(targetFile, codeContent, "utf-8");
console.log(`Generated ${targetFile} successfully!`);
