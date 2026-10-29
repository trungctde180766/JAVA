"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { highlightJava } from "@/lib/highlight";

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

  // Exam timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const timerRef = useRef(null);

  // Initialize questions
  useEffect(() => {
    let list = [...(session.questions || [])];
    if (session.kind === "mix") {
      // Shuffle for mix
      list.sort(() => Math.random() - 0.5);
    }
    setQuestions(list);
    const duration = Math.max(10, list.length * 60); // 1 minute per question
    setTimeLeft(duration);
  }, [session]);

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

  const q = questions[currentIndex];
  const qKey = q.key;
  const chosen = answers[qKey];
  const isBookmarked = bookmarks.has(qKey);
  const isFlagged = flagged.has(qKey);

  const handleSelectOption = (idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qKey]: idx }));
    if (mode === "practice") {
      setShowExplanation((prev) => ({ ...prev, [qKey]: true }));
    }
  };

  const toggleBookmark = async () => {
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
    const next = new Set(flagged);
    if (next.has(qKey)) next.delete(qKey);
    else next.add(qKey);
    setFlagged(next);
  };

  const handleSubmit = async (auto = false) => {
    if (submitting || submitted) return;
    setSubmitting(true);
    setShowConfirmModal(false);

    const payloadAnswers = questions.map((item) => ({
      key: item.key,
      chosen: answers[item.key] ?? null,
    }));

    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: session.slug,
          mode,
          durationSec: elapsedSec,
          timeLimitSec: questions.length * 60,
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
    const m = Math.floor(sec / 60);
    const s = sec % 60;
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

        {/* Review Questions List with Explanations */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Xem Lại Toàn Bộ Câu Hỏi &amp; Lời Giải</h3>
            <div style={{ display: "flex", gap: "0.4rem" }}>
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

                  <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.75rem" }}>
                    {item.text}
                  </p>

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
                          <span style={{ flex: 1, fontSize: "0.92rem" }}>{opt}</span>
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
              &larr; Bộ đề
            </Link>
            <span style={{ color: "var(--text-dim)" }}>/</span>
            <strong style={{ fontSize: "1.05rem" }}>{session.title}</strong>
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
            Tiến độ: {currentIndex + 1}/{questions.length} câu (Đã làm {answeredCount} câu)
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Mode Switcher */}
          <div style={{ display: "flex", background: "var(--bg-input)", borderRadius: "var(--radius-sm)", padding: "0.2rem" }}>
            <button
              onClick={() => setMode("practice")}
              className={`btn btn-sm ${mode === "practice" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem" }}
            >
              📖 Luyện tập
            </button>
            <button
              onClick={() => setMode("exam")}
              className={`btn btn-sm ${mode === "exam" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem" }}
            >
              ⏱️ Thi thử
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span className="badge badge-primary">Câu {currentIndex + 1} / {questions.length}</span>
              <span className="badge badge-accent">{q.topic || "Java"}</span>
              {isFlagged && <span className="badge badge-warning">🚩 Xem lại sau</span>}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={toggleFlag}
                className="btn btn-secondary btn-sm"
                title="Đánh dấu cần xem lại"
              >
                🚩 {isFlagged ? "Bỏ cờ" : "Cờ"}
              </button>
              <button
                onClick={toggleBookmark}
                className="btn btn-secondary btn-sm"
                title="Lưu câu hỏi"
                style={{ color: isBookmarked ? "var(--warning)" : "var(--text-muted)" }}
              >
                ⭐ {isBookmarked ? "Đã lưu" : "Lưu"}
              </button>
            </div>
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.5 }}>
            {q.text}
          </h3>

          {/* Code snippet if any */}
          {q.code && (
            <div
              className="code-box"
              dangerouslySetInnerHTML={{ __html: `<pre><code>${highlightJava(q.code)}</code></pre>` }}
            />
          )}

          {/* Options */}
          <div style={{ marginTop: "1.25rem" }}>
            {q.options.map((opt, idx) => {
              let optClass = "option-btn";
              if (chosen === idx) optClass += " selected";

              // If practice mode and option selected, reveal result immediately!
              if (mode === "practice" && chosen !== undefined) {
                if (idx === q.answer) optClass += " correct";
                else if (chosen === idx) optClass += " wrong";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={optClass}
                >
                  <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                  <span style={{ flex: 1, fontSize: "0.95rem" }}>{opt}</span>
                  {mode === "practice" && chosen !== undefined && idx === q.answer && (
                    <span style={{ color: "var(--success)", fontWeight: 700 }}>✓ Đúng</span>
                  )}
                  {mode === "practice" && chosen === idx && idx !== q.answer && (
                    <span style={{ color: "var(--danger)", fontWeight: 700 }}>✗ Sai</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation in Practice Mode */}
          {mode === "practice" && (showExplanation[qKey] || chosen !== undefined) && q.explanation && (
            <div className="explanation-box">
              <div className="explanation-title">💡 Giải thích chi tiết:</div>
              <div className="explanation-text">{q.explanation}</div>
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
    </div>
  );
}
