"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { highlightJava } from "@/lib/highlight";

function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleQuestionOptions(q) {
  if (!q || !Array.isArray(q.options) || q.options.length <= 1) return q;
  const indices = q.options.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);

  const newOptions = shuffledIndices.map((i) => q.options[i]);
  const newOptionsVi =
    Array.isArray(q.optionsVi) && q.optionsVi.length > 0
      ? shuffledIndices.map((i) => q.optionsVi[i] || "")
      : q.optionsVi;
  const newOptionsEn =
    Array.isArray(q.optionsEn) && q.optionsEn.length > 0
      ? shuffledIndices.map((i) => q.optionsEn[i] || "")
      : q.optionsEn;

  const newAnswer = shuffledIndices.indexOf(q.answer);

  return {
    ...q,
    options: newOptions,
    optionsVi: newOptionsVi,
    optionsEn: newOptionsEn,
    answer: newAnswer >= 0 ? newAnswer : q.answer,
    shuffledOptionIndices: shuffledIndices, // maps shuffledIndex -> originalIndex
    originalAnswer: q.answer,
  };
}

const EXAM_DURATION_SEC = 3600; // 1 tiếng = 60 phút

export default function QuizClient({ session, initialUser, defaultMode = "practice" }) {
  const router = useRouter();
  const [mode, setMode] = useState(defaultMode); // "practice" | "exam"
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionKey]: chosenIndex }
  const [bookmarks, setBookmarks] = useState(new Set(initialUser?.bookmarks || []));
  const [flagged, setFlagged] = useState(new Set()); // for exam mode review
  const [showExplanation, setShowExplanation] = useState({}); // in practice mode
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [filterReview, setFilterReview] = useState("all"); // "all" | "wrong" | "correct"

  // Assistive features state
  const [confidence, setConfidence] = useState({}); // { [qKey]: "high" | "med" | "low" }
  const [eliminated, setEliminated] = useState({}); // { [qKey]: [optIdx, ...] }
  const [notes, setNotes] = useState({}); // { [qKey]: string }
  const [showNotesBox, setShowNotesBox] = useState(false);
  const [fontScale, setFontScale] = useState(1); // 1 = 100%, 1.15 = 115%, 1.3 = 130%
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false); // Default off: đề tiếng Anh mặc định tiếng Anh, đề tiếng Việt mặc định tiếng Việt

  // Exam timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const timerRef = useRef(null);

  // Initialize questions
  useEffect(() => {
    let list = [...(session.questions || [])];
    if (defaultMode === "exam") {
      // Chế độ thi thử: xáo cả thứ tự câu hỏi và xáo thứ tự các phương án lựa chọn
      list = shuffleArray(list).map(shuffleQuestionOptions);
      setTimeLeft(EXAM_DURATION_SEC);
    } else {
      if (session.kind === "mix") {
        list = shuffleArray(list);
      }
      setTimeLeft(EXAM_DURATION_SEC);
    }
    setQuestions(list);
  }, [session, defaultMode]);

  const handleSwitchMode = (newMode) => {
    if (newMode === mode) return;
    if (newMode === "exam") {
      // Bắt đầu thi thử: xáo câu hỏi và xáo đáp án, bấm giờ 1 tiếng
      const shuffledList = shuffleArray([...(session.questions || [])]).map(shuffleQuestionOptions);
      setQuestions(shuffledList);
      setMode("exam");
      setTimeLeft(EXAM_DURATION_SEC);
      setElapsedSec(0);
      setCurrentIndex(0);
      setAnswers({});
      setShowExplanation({});
    } else {
      // Về luyện tập: trả lại đề theo thứ tự gốc
      setQuestions([...(session.questions || [])]);
      setMode("practice");
      setCurrentIndex(0);
      setAnswers({});
      setShowExplanation({});
    }
  };

  // Load personal notes from localStorage
  useEffect(() => {
    try {
      const saved = {};
      questions.forEach((item) => {
        const val = localStorage.getItem(`jq_note_${item.key}`);
        if (val) saved[item.key] = val;
      });
      setNotes(saved);
    } catch {}
  }, [questions]);

  // Timer tick for exam mode
  useEffect(() => {
    if (submitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
      if (mode === "exam") {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [mode, submitted, questions, answers]);

  const q = questions && questions.length > 0 ? questions[currentIndex] : null;
  const qKey = q?.key;
  const chosen = qKey ? answers[qKey] : undefined;
  const isBookmarked = qKey ? bookmarks.has(qKey) : false;
  const isFlagged = qKey ? flagged.has(qKey) : false;
  const isNativeVi = Boolean(
    q && !q.textVi && (q.textEn || /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(q.text || ""))
  );

  const handleSelectOption = (idx) => {
    if (submitted || !qKey) return;
    setAnswers((prev) => ({ ...prev, [qKey]: idx }));
    if (mode === "practice") {
      setShowExplanation((prev) => ({ ...prev, [qKey]: true }));
    }
  };

  const toggleBookmark = async () => {
    if (!qKey) return;
    const next = new Set(bookmarks);
    if (next.has(qKey)) next.delete(qKey);
    else next.add(qKey);
    setBookmarks(next);

    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: qKey }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFlag = () => {
    if (!qKey) return;
    const next = new Set(flagged);
    if (next.has(qKey)) next.delete(qKey);
    else next.add(qKey);
    setFlagged(next);
  };

  const handleSetConfidence = (level) => {
    if (!qKey) return;
    setConfidence((prev) => ({
      ...prev,
      [qKey]: prev[qKey] === level ? undefined : level,
    }));
  };

  const toggleEliminate = (e, optIdx) => {
    e.stopPropagation();
    if (!qKey) return;
    setEliminated((prev) => {
      const current = new Set(prev[qKey] || []);
      if (current.has(optIdx)) current.delete(optIdx);
      else current.add(optIdx);
      return { ...prev, [qKey]: Array.from(current) };
    });
  };

  const handleSaveNote = (text) => {
    if (!qKey) return;
    setNotes((prev) => ({ ...prev, [qKey]: text }));
    try {
      if (text.trim()) localStorage.setItem(`jq_note_${qKey}`, text);
      else localStorage.removeItem(`jq_note_${qKey}`);
    } catch {}
  };

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;
      if (!questions || questions.length === 0 || submitted) return;
      const k = e.key.toLowerCase();
      if (k === "1" || k === "a") handleSelectOption(0);
      else if (k === "2" || k === "b") handleSelectOption(1);
      else if (k === "3" || k === "c") handleSelectOption(2);
      else if (k === "4" || k === "d") handleSelectOption(3);
      else if (k === "arrowleft" || k === "j") setCurrentIndex((p) => Math.max(0, p - 1));
      else if (k === "arrowright" || k === "k") setCurrentIndex((p) => Math.min(questions.length - 1, p + 1));
      else if (k === "f") toggleFlag();
      else if (k === "s") toggleBookmark();
      else if (k === "t") setShowTranslation((p) => !p);
      else if (k === "?") setShowShortcuts((p) => !p);
      else if (k === "n") setShowNotesBox((p) => !p);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, questions, qKey, submitted, bookmarks, flagged, showTranslation]);

  if (!questions || questions.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{session.icon || "📂"}</div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Chưa có câu hỏi nào</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          {session.kind === "mistakes"
            ? "Tuyệt vời! Bạn không còn câu hỏi nào trong sổ tay câu sai. Hãy tiếp tục luyện các đề khác!"
            : session.kind === "bookmarks"
            ? "Bạn chưa đánh dấu câu hỏi nào. Khi làm bài, bấm vào biểu tượng ⭐ để lưu câu hỏi khó vào đây."
            : "Bộ đề này hiện chưa có câu hỏi hoặc đang cập nhật."}
        </p>
        <Link href="/" className="btn btn-primary">
          &larr; Quay về danh sách bộ đề
        </Link>
      </div>
    );
  }

  const handleSubmit = async (auto = false) => {
    if (submitting || submitted) return;
    setSubmitting(true);
    setShowConfirmModal(false);

    const payloadAnswers = questions.map((item) => {
      const chosenIdx = answers[item.key] ?? null;
      const originalChosen =
        chosenIdx !== null && item.shuffledOptionIndices
          ? item.shuffledOptionIndices[chosenIdx]
          : chosenIdx;
      const chosenText = chosenIdx !== null ? item.options[chosenIdx] : null;
      return {
        key: item.key,
        chosen: originalChosen,
        chosenText,
      };
    });

    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: session.slug,
          mode,
          durationSec: elapsedSec,
          timeLimitSec: EXAM_DURATION_SEC,
          answers: payloadAnswers,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setSubmitted(true);
      } else {
        alert(data.error || "Có lỗi xảy ra khi nộp bài");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (sec) => {
    const sVal = Math.max(0, sec);
    const h = Math.floor(sVal / 3600);
    const m = Math.floor((sVal % 3600) / 60);
    const s = sVal % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // If submitted, show result view
  if (submitted && result) {
    const answeredCount = Object.keys(answers).length;
    const isPassed = result.percent >= 75;

    const topicStats = {};
    questions.forEach((item) => {
      const t = item.topic || "Khác";
      if (!topicStats[t]) topicStats[t] = { total: 0, correct: 0 };
      topicStats[t].total += 1;
      if (answers[item.key] === item.answer) {
        topicStats[t].correct += 1;
      }
    });

    const filteredQuestions = questions.filter((item) => {
      const isCorrect = answers[item.key] === item.answer;
      if (filterReview === "wrong") return !isCorrect;
      if (filterReview === "correct") return isCorrect;
      return true;
    });

    // Compute Confidence Matrix
    let confHighCorrect = 0, confHighWrong = 0;
    let confMedCorrect = 0, confMedWrong = 0;
    let confLowCorrect = 0, confLowWrong = 0;
    let hasConfidenceData = false;

    questions.forEach((item) => {
      const c = confidence[item.key];
      const isCorrect = answers[item.key] === item.answer;
      if (c) hasConfidenceData = true;
      if (c === "high") {
        if (isCorrect) confHighCorrect++;
        else confHighWrong++;
      } else if (c === "med") {
        if (isCorrect) confMedCorrect++;
        else confMedWrong++;
      } else if (c === "low") {
        if (isCorrect) confLowCorrect++;
        else confLowWrong++;
      }
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Score Card */}
        <div
          className="card card-glass"
          style={{
            textAlign: "center",
            padding: "2.5rem 1.5rem",
            borderTop: `5px solid ${isPassed ? "var(--success)" : "var(--danger)"}`,
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{isPassed ? "🎉" : "📚"}</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.35rem" }}>
            {isPassed ? "Chúc Mừng! Bạn Đã Đạt" : "Cần Ôn Luyện Thêm!"}
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Bộ đề: <strong>{session.title}</strong> • Chế độ: {mode === "exam" ? "Thi thử" : "Luyện tập"}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: "0.5rem",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "1rem 2rem",
              borderRadius: "var(--radius)",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "3.5rem",
                fontWeight: 800,
                color: isPassed ? "var(--success)" : "var(--danger)",
                lineHeight: 1,
              }}
            >
              {result.correct}/{result.total}
            </span>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-muted)" }}>
              ({result.percent}%)
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", fontSize: "0.95rem" }}>
            <div>
              <span style={{ color: "var(--text-dim)" }}>Thời gian làm: </span>
              <strong>{formatTime(elapsedSec)}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-dim)" }}>Đã trả lời: </span>
              <strong>{answeredCount}/{result.total} câu</strong>
            </div>
            {result.mastered > 0 && (
              <div>
                <span style={{ color: "var(--text-dim)" }}>Đã thành thạo câu sai: </span>
                <strong style={{ color: "var(--success)" }}>+{result.mastered} câu</strong>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setFlagged(new Set());
                setShowExplanation({});
                setCurrentIndex(0);
                setElapsedSec(0);
                setTimeLeft(questions.length * 60);
              }}
              className="btn btn-primary"
            >
              🔄 Làm lại bài thi
            </button>
            <Link href="/quiz/mistakes" className="btn btn-secondary">
              🩹 Ôn lại các câu sai
            </Link>
            <Link href="/" className="btn btn-ghost">
              &larr; Về trang chủ
            </Link>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
            Phân Tích Kết Quả Theo Chuyên Đề
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {Object.entries(topicStats).map(([topic, stat]) => {
              const pct = Math.round((stat.correct / stat.total) * 100);
              return (
                <div key={topic}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: 600 }}>{topic}</span>
                    <span>
                      {stat.correct}/{stat.total} ({pct}%)
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 80 ? "var(--success)" : pct >= 50 ? "var(--warning)" : "var(--danger)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confidence Matrix Card */}
        {hasConfidenceData && (
          <div className="card" style={{ borderTop: "4px solid var(--accent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.2rem" }}>
                  🎯 Ma Trận Độ Tự Tin &amp; Phân Tích Điểm Mù
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Đối chiếu giữa cảm nhận chủ quan và kết quả làm bài thực tế giúp bạn nhận ra những lỗ hổng kiến thức tiềm ẩn.
                </p>
              </div>
              <span className="badge badge-accent">AI Analysis</span>
            </div>

            <div className="grid-2" style={{ marginTop: "1rem" }}>
              {/* Confident & Correct */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--success)", marginBottom: "0.35rem" }}>
                  <span>⭐ Tự Tin &amp; Trả Lời Đúng:</span>
                  <span style={{ fontSize: "1.1rem" }}>{confHighCorrect} câu</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Kiến thức vững chắc! Bạn hoàn toàn làm chủ các câu hỏi này và không bị bẫy.
                </p>
              </div>

              {/* Confident & Wrong - DANGER ALERT! */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--danger)", marginBottom: "0.35rem" }}>
                  <span>⚠️ Tự Tin nhưng Chọn SAI (BẪY!):</span>
                  <span style={{ fontSize: "1.1rem" }}>{confHighWrong} câu</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {confHighWrong > 0
                    ? `CẢNH BÁO ĐIỂM MÙ: Có ${confHighWrong} câu bạn nghĩ mình làm đúng 100% nhưng thực tế lại sập bẫy! Hãy kéo xuống đọc kỹ giải thích chi tiết.`
                    : "Tuyệt vời! Bạn không bị ảo tưởng kiến thức ở bất kỳ câu nào."}
                </p>
              </div>

              {/* Guess/Med & Correct */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--warning)", marginBottom: "0.35rem" }}>
                  <span>🎲 Phân Vân / Đoán Mò mà Đúng:</span>
                  <span style={{ fontSize: "1.1rem" }}>{confMedCorrect + confLowCorrect} câu</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  May mắn đoán trúng! Bạn nên đọc lại lý thuyết để nắm chắc bản chất, tránh bị bối rối khi đi thi thực tế.
                </p>
              </div>

              {/* Guess/Med & Wrong */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-input)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--text-main)", marginBottom: "0.35rem" }}>
                  <span>📖 Chưa Vững &amp; Chọn Sai:</span>
                  <span style={{ fontSize: "1.1rem" }}>{confMedWrong + confLowWrong} câu</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Chủ đề này còn mới với bạn. Hãy bấm lưu (⭐) để học lại trong mục Câu đã đánh dấu.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review Questions List with Explanations */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Xem Lại Toàn Bộ Câu Hỏi &amp; Lời Giải</h3>
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setFilterReview("all")}
                className={`btn btn-sm ${filterReview === "all" ? "btn-primary" : "btn-secondary"}`}
              >
                Tất cả ({questions.length})
              </button>
              <button
                onClick={() => setFilterReview("wrong")}
                className={`btn btn-sm ${filterReview === "wrong" ? "btn-danger" : "btn-secondary"}`}
              >
                Câu sai ({result.total - result.correct})
              </button>
              <button
                onClick={() => setFilterReview("correct")}
                className={`btn btn-sm ${filterReview === "correct" ? "btn-success" : "btn-secondary"}`}
              >
                Câu đúng ({result.correct})
              </button>
              <button
                onClick={() => setShowTranslation((p) => !p)}
                className={`btn btn-sm ${showTranslation ? "btn-primary" : "btn-secondary"}`}
                style={{ marginLeft: "0.25rem" }}
                title="Bật/Tắt hiển thị bản dịch cho toàn bộ danh sách câu hỏi"
              >
                {showTranslation ? "🌐 Ẩn bản dịch" : "🌐 Hiện bản dịch"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filteredQuestions.map((item, idx) => {
              const userChoice = answers[item.key];
              const isRight = userChoice === item.answer;

              return (
                <div
                  key={item.key}
                  className="card"
                  style={{
                    borderLeft: `4px solid ${isRight ? "var(--success)" : "var(--danger)"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span className="badge badge-primary">Câu {idx + 1}</span>
                      <span className="badge badge-accent">{item.topic}</span>
                    </div>
                    <span className={`badge ${isRight ? "badge-success" : "badge-danger"}`}>
                      {isRight ? "✓ Đúng" : userChoice !== undefined ? "✗ Sai" : "Chưa trả lời"}
                    </span>
                  </div>

                  <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem" }}>
                    {item.text}
                  </p>

                  {showTranslation && item.textVi && (
                    <div className="translation-card" style={{ marginBottom: "0.75rem", marginTop: "0.25rem" }}>
                      <span className="badge badge-accent" style={{ fontSize: "0.72rem", marginRight: "0.5rem" }}>🇻🇳 Dịch nghĩa:</span>
                      <span style={{ fontSize: "0.92rem", color: "var(--text-main)" }}>{item.textVi}</span>
                    </div>
                  )}

                  {showTranslation && item.textEn && (
                    <div className="translation-card" style={{ marginBottom: "0.75rem", marginTop: "0.25rem", borderColor: "rgba(99, 102, 241, 0.4)", background: "rgba(99, 102, 241, 0.08)" }}>
                      <span className="badge badge-primary" style={{ fontSize: "0.72rem", marginRight: "0.5rem" }}>🇬🇧 English Translation:</span>
                      <span style={{ fontSize: "0.92rem", color: "var(--text-main)" }}>{item.textEn}</span>
                    </div>
                  )}

                  {item.code && (
                    <div
                      className="code-box"
                      dangerouslySetInnerHTML={{ __html: `<pre><code>${highlightJava(item.code)}</code></pre>` }}
                    />
                  )}

                  <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {item.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === item.answer;
                      const isOptionChosen = oIdx === userChoice;
                      let optClass = "option-btn";
                      if (isOptionCorrect) optClass += " correct";
                      else if (isOptionChosen) optClass += " wrong";

                      return (
                        <div key={oIdx} className={optClass} style={{ cursor: "default", margin: 0, padding: "0.75rem 1rem" }}>
                          <span className="option-label">{String.fromCharCode(65 + oIdx)}</span>
                          <div style={{ flex: 1, textAlign: "left" }}>
                            <div style={{ fontSize: "0.92rem" }}>{opt}</div>
                            {showTranslation && item.optionsVi && item.optionsVi[oIdx] && (
                              <div className="option-translation-text">↳ {item.optionsVi[oIdx]}</div>
                            )}
                            {showTranslation && item.optionsEn && item.optionsEn[oIdx] && (
                              <div className="option-translation-text" style={{ color: "#a5b4fc" }}>↳ {item.optionsEn[oIdx]}</div>
                            )}
                          </div>
                          {isOptionCorrect && <strong style={{ color: "var(--success)", fontSize: "0.85rem" }}>✓ Đáp án đúng</strong>}
                          {isOptionChosen && !isOptionCorrect && <strong style={{ color: "var(--danger)", fontSize: "0.85rem" }}>✗ Bạn chọn</strong>}
                        </div>
                      );
                    })}
                  </div>

                  {item.explanation && (
                    <div className="explanation-box" style={{ marginTop: "1rem" }}>
                      <div className="explanation-title">💡 Giải thích chi tiết:</div>
                      <div className="explanation-text">{item.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active quiz screen
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Header Bar */}
      <div
        className="card"
        style={{
          padding: "0.85rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
              &larr; Bộ đề
            </Link>
            <span style={{ color: "var(--text-dim)" }}>/</span>
            <strong style={{ fontSize: "1.05rem" }}>{session.title}</strong>
            {session.isAiGenerated ? (
              <span className="badge badge-accent" style={{ fontSize: "0.75rem" }}>
                🤖 Do AI Tạo (Mở Rộng Dựa Trên Đề Gốc)
              </span>
            ) : session.slug.startsWith("quiz-") ? (
              <span className="badge badge-primary" style={{ fontSize: "0.75rem" }}>
                🏛️ Bộ Đề Gốc
              </span>
            ) : null}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
            Tiến độ: {currentIndex + 1}/{questions.length} câu (Đã làm {answeredCount} câu)
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Mode Switcher */}
          <div style={{ display: "flex", background: "var(--bg-input)", borderRadius: "var(--radius-sm)", padding: "0.2rem" }}>
            <button
              onClick={() => handleSwitchMode("practice")}
              className={`btn btn-sm ${mode === "practice" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem" }}
            >
              📖 Luyện tập
            </button>
            <button
              onClick={() => handleSwitchMode("exam")}
              className={`btn btn-sm ${mode === "exam" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem" }}
              title="Thi thử 1 tiếng: xáo ngẫu nhiên cả thứ tự câu hỏi và các phương án A, B, C, D"
            >
              ⏱️ Thi thử (1 tiếng)
            </button>
          </div>

          {/* Timer Display */}
          {mode === "exam" ? (
            <div
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1.1rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                background: timeLeft < 300 ? "rgba(239, 68, 68, 0.2)" : "rgba(99, 102, 241, 0.15)",
                color: timeLeft < 300 ? "var(--danger)" : "var(--primary)",
                border: "1px solid",
                borderColor: timeLeft < 300 ? "var(--danger)" : "var(--primary)",
              }}
            >
              ⏳ {formatTime(timeLeft)}
            </div>
          ) : (
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              ⏱️ {formatTime(elapsedSec)}
            </div>
          )}

          <button
            onClick={() => setShowConfirmModal(true)}
            className="btn btn-primary btn-sm"
          >
            {mode === "exam" ? "Nộp bài thi" : "Lưu kết quả"}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Main Question & Side Palette Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.5rem", alignItems: "start" }}>
        {/* Left: Active Question Card */}
        <div className="card" style={{ padding: "1.75rem" }}>
          {/* Question Meta Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span className="badge badge-primary">Câu {currentIndex + 1} / {questions.length}</span>
              <span className="badge badge-accent">{q.topic || "Java"}</span>
              {isFlagged && <span className="badge badge-warning">🚩 Xem lại sau</span>}
            </div>

            {/* Assistive Controls Bar */}
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
              {/* Font Size Adjuster */}
              <div style={{ display: "inline-flex", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", overflow: "hidden" }}>
                <button
                  type="button"
                  onClick={() => setFontScale((p) => Math.max(0.85, +(p - 0.1).toFixed(2)))}
                  className="btn btn-ghost btn-sm"
                  title="Giảm cỡ chữ"
                  style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale((p) => Math.min(1.35, +(p + 0.1).toFixed(2)))}
                  className="btn btn-ghost btn-sm"
                  title="Tăng cỡ chữ"
                  style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem", borderLeft: "1px solid var(--border)" }}
                >
                  A+
                </button>
              </div>

              {/* Personal Notes Toggle */}
              <button
                type="button"
                onClick={() => setShowNotesBox((p) => !p)}
                className={`btn btn-sm ${notes[qKey] ? "btn-primary" : "btn-secondary"}`}
                title="Ghi chú cá nhân cho câu hỏi này"
                style={{ padding: "0.25rem 0.6rem", fontSize: "0.82rem" }}
              >
                📝 {notes[qKey] ? "Ghi chú (Có)" : "Ghi chú"}
              </button>

              {/* Keyboard Shortcuts Helper */}
              <button
                type="button"
                onClick={() => setShowShortcuts(true)}
                className="btn btn-secondary btn-sm"
                title="Xem phím tắt bàn phím"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.82rem" }}
              >
                ⌨️
              </button>

              {/* Flag Toggle */}
              <button
                type="button"
                onClick={toggleFlag}
                className="btn btn-secondary btn-sm"
                title="Đánh dấu cần xem lại"
                style={{ padding: "0.25rem 0.6rem", fontSize: "0.82rem" }}
              >
                🚩 {isFlagged ? "Bỏ cờ" : "Cờ"}
              </button>

              {/* Bookmark Toggle */}
              <button
                type="button"
                onClick={toggleBookmark}
                className="btn btn-secondary btn-sm"
                title="Lưu câu hỏi khó"
                style={{
                  padding: "0.25rem 0.6rem",
                  fontSize: "0.82rem",
                  color: isBookmarked ? "var(--warning)" : "var(--text-muted)",
                }}
              >
                ⭐ {isBookmarked ? "Đã lưu" : "Lưu"}
              </button>

              {/* Language Translation Toggle (Dynamic for English vs Vietnamese questions) */}
              <button
                type="button"
                onClick={() => setShowTranslation((p) => !p)}
                className={`btn btn-sm ${showTranslation ? "btn-primary" : "btn-secondary"}`}
                title={
                  isNativeVi
                    ? "Chuyển sang bản dịch tiếng Anh cho câu hỏi và đáp án (Phím tắt: T)"
                    : "Bật/Tắt bản dịch tiếng Việt cho câu hỏi và đáp án (Phím tắt: T)"
                }
                style={{ padding: "0.25rem 0.6rem", fontSize: "0.82rem" }}
              >
                {isNativeVi
                  ? showTranslation
                    ? "🇬🇧 Bản tiếng Anh (Bật)"
                    : "🇬🇧 Chuyển tiếng Anh"
                  : showTranslation
                  ? "🇻🇳 Dịch TV (Bật)"
                  : "🇻🇳 Dịch TV"}
              </button>
            </div>
          </div>

          {/* Question Text */}
          <h3
            style={{
              fontSize: `${1.15 * fontScale}rem`,
              fontWeight: 600,
              marginBottom: showTranslation && (q.textVi || q.textEn) ? "0.6rem" : "1rem",
              lineHeight: 1.5,
              transition: "font-size 0.15s ease",
            }}
          >
            {q.text}
          </h3>

          {/* Translation Card if enabled */}
          {showTranslation && (
            <>
              {q.textVi && (
                <div className="translation-card">
                  <div className="translation-header">
                    <span className="badge badge-accent" style={{ fontSize: "0.72rem" }}>🇻🇳 Bản dịch tiếng Việt</span>
                  </div>
                  <div className="translation-content">{q.textVi}</div>
                </div>
              )}

              {isNativeVi && q.textEn && (
                <div className="translation-card" style={{ borderColor: "rgba(99, 102, 241, 0.4)", background: "rgba(99, 102, 241, 0.08)" }}>
                  <div className="translation-header">
                    <span className="badge badge-primary" style={{ fontSize: "0.72rem" }}>🇬🇧 English Translation</span>
                  </div>
                  <div className="translation-content">{q.textEn}</div>
                </div>
              )}
            </>
          )}

          {/* Code snippet if any */}
          {q.code && (
            <div
              className="code-box"
              style={{ fontSize: `${0.9 * fontScale}rem` }}
              dangerouslySetInnerHTML={{ __html: `<pre><code>${highlightJava(q.code)}</code></pre>` }}
            />
          )}

          {/* Options */}
          <div style={{ marginTop: "1.25rem" }}>
            {q.options.map((opt, idx) => {
              const isElim = (eliminated[qKey] || []).includes(idx);
              let optClass = "option-btn";
              if (chosen === idx) optClass += " selected";
              if (isElim) optClass += " eliminated";

              // If practice mode and option selected, reveal result immediately!
              if (mode === "practice" && chosen !== undefined) {
                if (idx === q.answer) optClass += " correct";
                else if (chosen === idx) optClass += " wrong";
              }

              return (
                <div key={idx} style={{ position: "relative", marginBottom: "0.6rem" }}>
                  <button
                    onClick={() => handleSelectOption(idx)}
                    className={optClass}
                    style={{
                      width: "100%",
                      marginBottom: 0,
                      paddingRight: "4.5rem",
                      fontSize: `${0.95 * fontScale}rem`,
                    }}
                  >
                    <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div>{opt}</div>
                      {showTranslation && q.optionsVi && q.optionsVi[idx] && (
                        <div className="option-translation-text">
                          ↳ {q.optionsVi[idx]}
                        </div>
                      )}
                      {showTranslation && isNativeVi && q.optionsEn && q.optionsEn[idx] && (
                        <div className="option-translation-text" style={{ color: "#a5b4fc" }}>
                          ↳ {q.optionsEn[idx]}
                        </div>
                      )}
                    </div>
                    {mode === "practice" && chosen !== undefined && idx === q.answer && (
                      <span style={{ color: "var(--success)", fontWeight: 700 }}>✓ Đúng</span>
                    )}
                    {mode === "practice" && chosen === idx && idx !== q.answer && (
                      <span style={{ color: "var(--danger)", fontWeight: 700 }}>✗ Sai</span>
                    )}
                  </button>

                  {/* Strike-through / Option eliminator button */}
                  <button
                    type="button"
                    onClick={(e) => toggleEliminate(e, idx)}
                    className="strike-btn"
                    title={isElim ? "Bỏ gạch đáp án" : "Gạch bỏ loại trừ đáp án này"}
                  >
                    {isElim ? "↩️ Bỏ gạch" : "✂️ Gạch"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Confidence Selector (Đánh giá độ tự tin) */}
          <div className="confidence-box">
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>🎯 Độ tự tin của bạn:</span>
            </div>
            <div className="confidence-pills">
              <button
                type="button"
                className={`confidence-pill pill-high ${confidence[qKey] === "high" ? "active" : ""}`}
                onClick={() => handleSetConfidence("high")}
                title="Chắc chắn 100% đúng kiến thức"
              >
                🟢 Chắc chắn 100%
              </button>
              <button
                type="button"
                className={`confidence-pill pill-med ${confidence[qKey] === "med" ? "active" : ""}`}
                onClick={() => handleSetConfidence("med")}
                title="Phân vân giữa 2 đáp án hoặc chưa chắc lắm"
              >
                🟡 50/50 Phân vân
              </button>
              <button
                type="button"
                className={`confidence-pill pill-low ${confidence[qKey] === "low" ? "active" : ""}`}
                onClick={() => handleSetConfidence("low")}
                title="Đoán mò hoặc chưa biết câu này"
              >
                🔴 Đoán mò
              </button>
            </div>
          </div>

          {/* Personal Notes Box (Ghi chú cá nhân) */}
          {showNotesBox && (
            <div className="notes-container">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>📝 Ghi chú cá nhân (Câu {currentIndex + 1}):</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Tự động lưu vào máy</span>
              </div>
              <textarea
                className="notes-textarea"
                placeholder="Ghi chú kiến thức cần nhớ, lý do bẫy hoặc phương pháp nhớ cho câu này..."
                value={notes[qKey] || ""}
                onChange={(e) => handleSaveNote(e.target.value)}
              />
            </div>
          )}

          {/* Detailed Explanation in Practice Mode */}
          {mode === "practice" && (showExplanation[qKey] || chosen !== undefined) && q.explanation && (
            <div className="explanation-box">
              <div className="explanation-title">💡 Giải thích chi tiết:</div>
              <div className="explanation-text" style={{ fontSize: `${0.92 * fontScale}rem` }}>{q.explanation}</div>
            </div>
          )}

          {/* Pager controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn btn-secondary btn-sm"
            >
              &larr; Câu trước
            </button>

            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
              Dùng phím mũi tên hoặc bảng bên phải để chuyển câu
            </span>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="btn btn-primary btn-sm"
            >
              Câu tiếp &rarr;
            </button>
          </div>
        </div>

        {/* Right: Question Palette & Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card" style={{ padding: "1.25rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Danh Sách Câu Hỏi ({questions.length})
            </h4>

            <div className="palette-grid">
              {questions.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[item.key] !== undefined;
                const hasFlag = flagged.has(item.key);

                let cls = "palette-btn";
                if (isCurrent) cls += " current";
                else if (hasFlag) cls += " marked";
                else if (isAnswered) cls += " answered";

                return (
                  <button
                    key={item.key}
                    onClick={() => setCurrentIndex(idx)}
                    className={cls}
                    title={`Câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-dim)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--primary-light)", border: "1px solid var(--primary)", display: "inline-block" }} />
                <span>Đã trả lời ({answeredCount})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--warning-light)", border: "1px solid var(--warning)", display: "inline-block" }} />
                <span>Có cờ xem lại ({flagged.size})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--bg-input)", border: "1px solid var(--border)", display: "inline-block" }} />
                <span>Chưa trả lời ({questions.length - answeredCount})</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1.25rem" }}
            >
              {mode === "exam" ? "Nộp bài thi" : "Lưu kết quả"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Xác Nhận Nộp Bài
            </h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
              Bạn đã hoàn thành <strong>{answeredCount}</strong> / <strong>{questions.length}</strong> câu hỏi.
              {questions.length - answeredCount > 0 && (
                <span style={{ color: "var(--warning)", display: "block", marginTop: "0.4rem" }}>
                  ⚠️ Còn {questions.length - answeredCount} câu bạn chưa trả lời!
                </span>
              )}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary"
                disabled={submitting}
              >
                Làm tiếp
              </button>
              <button
                onClick={() => handleSubmit(false)}
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Đang chấm điểm..." : "Nộp bài ngay"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="modal-overlay" onClick={() => setShowShortcuts(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>⌨️ Phím Tắt Tiện Ích</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowShortcuts(false)}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Chọn đáp án A, B, C, D</span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <span className="kbd-badge">1-4</span>
                  <span className="kbd-badge">A-D</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Câu trước</span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <span className="kbd-badge">←</span>
                  <span className="kbd-badge">J</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Câu tiếp theo</span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <span className="kbd-badge">→</span>
                  <span className="kbd-badge">K</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Gắn / Bỏ cờ xem lại</span>
                <span className="kbd-badge">F</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Lưu câu hỏi (Bookmark)</span>
                <span className="kbd-badge">S</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Mở / Đóng ghi chú cá nhân</span>
                <span className="kbd-badge">N</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                <span>Bật / Tắt bản dịch tiếng Việt</span>
                <span className="kbd-badge">T</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Hiện / Tắt bảng phím tắt</span>
                <span className="kbd-badge">?</span>
              </div>
            </div>
            <div style={{ marginTop: "1.25rem", textAlign: "right" }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowShortcuts(false)}>
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
