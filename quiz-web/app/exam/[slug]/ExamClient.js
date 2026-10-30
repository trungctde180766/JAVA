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
const MAX_VIOLATIONS = 3; // Tối đa 3 lần vi phạm là thu bài

export default function ExamClient({ session, user }) {
  const router = useRouter();

  // Exam phase: "gate" (chưa bắt đầu) | "in_progress" (đang thi) | "submitted" (đã nộp)
  const [phase, setPhase] = useState("gate");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qKey]: chosenShuffledIndex }
  const [flagged, setFlagged] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [filterReview, setFilterReview] = useState("all");

  // SEB Anti-Cheat state
  const [violations, setViolations] = useState(0);
  const [violationAlert, setViolationAlert] = useState(null); // string message
  const [disqualifiedReason, setDisqualifiedReason] = useState(null);

  // Timer
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SEC);
  const [elapsedSec, setElapsedSec] = useState(0);
  const timerRef = useRef(null);

  // Translation toggle in review
  const [showTranslation, setShowTranslation] = useState(false);

  // Initialize questions
  useEffect(() => {
    const raw = [...(session.questions || [])];
    const randomized = shuffleArray(raw).map(shuffleQuestionOptions);
    setQuestions(randomized);
  }, [session]);

  // Start exam handler with Fullscreen
  const handleStartExam = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      }
    } catch (e) {
      console.warn("Fullscreen request error (safe to proceed):", e);
    }
    setPhase("in_progress");
    setTimeLeft(EXAM_DURATION_SEC);
    setElapsedSec(0);
  };

  // Re-enter Fullscreen after warning
  const handleResumeFullscreen = async () => {
    setViolationAlert(null);
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      }
    } catch (e) {}
  };

  // Record a violation
  const recordViolation = (reason) => {
    if (phase !== "in_progress" || submitting) return;

    setViolations((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= MAX_VIOLATIONS) {
        setDisqualifiedReason(
          `Bạn đã vi phạm quy chế phòng thi quá ${MAX_VIOLATIONS} lần (${reason}). Hệ thống tự động thu bài thi của bạn!`
        );
        handleSubmitExam(true, true);
      } else {
        setViolationAlert(
          `⚠️ CẢNH BÁO VI PHẠM (${nextCount}/${MAX_VIOLATIONS}): ${reason}! Vui lòng giữ chế độ toàn màn hình và không chuyển cửa sổ. Vi phạm quá ${MAX_VIOLATIONS} lần hệ thống sẽ tự động nộp bài!`
        );
      }
      return nextCount;
    });
  };

  // SEB Event Listeners (Full Screen, Visibility, Keys, Context Menu, Unload)
  useEffect(() => {
    if (phase !== "in_progress") return;

    // 1. Fullscreen change detection (e.g. User presses ESC or F11)
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        recordViolation("Đã thoát chế độ Toàn Màn Hình (Fullscreen)");
      }
    };

    // 2. Tab switching or minimizing detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation("Đã chuyển tab hoặc ẩn trình duyệt");
      }
    };

    // 3. Window blur detection (switching to another app or clicking outside)
    const handleWindowBlur = () => {
      recordViolation("Cửa sổ thi bị mất tiêu điểm (rời khỏi giao diện làm bài)");
    };

    // 4. Keyboard trap prevention (ESC, F12, F5, Ctrl+R, Ctrl+W, Ctrl+C/V, Ctrl+Shift+I)
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();

      // Intercept ESC
      if (e.key === "Escape" || e.keyCode === 27) {
        e.preventDefault();
        recordViolation("Bấm phím ESC để thoát phòng thi");
        return;
      }

      // F12 or Inspect shortcuts
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k)) ||
        (e.ctrlKey && k === "u")
      ) {
        e.preventDefault();
        recordViolation("Cố gắng mở công cụ phát triển (DevTools)");
        return;
      }

      // Reload shortcuts
      if (e.key === "F5" || (e.ctrlKey && k === "r")) {
        e.preventDefault();
        return;
      }

      // Copy / Paste
      if (e.ctrlKey && (k === "c" || k === "v")) {
        e.preventDefault();
        recordViolation("Cố gắng sao chép hoặc dán nội dung");
        return;
      }

      // Option keyboard shortcuts 1, 2, 3, 4 / a, b, c, d
      if (["1", "a"].includes(k)) handleSelectOption(0);
      else if (["2", "b"].includes(k)) handleSelectOption(1);
      else if (["3", "c"].includes(k)) handleSelectOption(2);
      else if (["4", "d"].includes(k)) handleSelectOption(3);
      else if (k === "arrowleft") setCurrentIndex((p) => Math.max(0, p - 1));
      else if (k === "arrowright") setCurrentIndex((p) => Math.min(questions.length - 1, p + 1));
      else if (k === "f") toggleFlag();
    };

    // 5. Disable Right Click (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 6. Beforeunload warning
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Bạn đang trong phòng thi! Thoát ra sẽ bị mất kết quả thi.";
      return e.returnValue;
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [phase, submitting, questions, answers]);

  // Exam timer tick
  useEffect(() => {
    if (phase !== "in_progress") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSec((prev) => prev + 1);
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmitExam(true, false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, questions, answers]);

  const q = questions && questions.length > 0 ? questions[currentIndex] : null;
  const qKey = q?.key;
  const chosen = qKey ? answers[qKey] : undefined;
  const isFlagged = qKey ? flagged.has(qKey) : false;

  const handleSelectOption = (idx) => {
    if (phase !== "in_progress" || !qKey) return;
    setAnswers((prev) => ({ ...prev, [qKey]: idx }));
  };

  const toggleFlag = () => {
    if (!qKey) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(qKey)) next.delete(qKey);
      else next.add(qKey);
      return next;
    });
  };

  // Submit exam
  const handleSubmitExam = async (auto = false, disqualified = false) => {
    if (submitting || phase === "submitted") return;
    setSubmitting(true);
    setShowConfirmModal(false);

    // Release fullscreen
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {}

    // Map answers back to original index
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
          mode: "exam",
          durationSec: elapsedSec,
          timeLimitSec: EXAM_DURATION_SEC,
          answers: payloadAnswers,
          disqualified,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setPhase("submitted");
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

  // 1. GATE SCREEN (Trước khi vào thi)
  if (phase === "gate") {
    return (
      <div style={{ maxWidth: 840, margin: "2rem auto" }}>
        <div className="card card-glass" style={{ padding: "2.5rem 2.25rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="badge badge-warning">🛡️ Safe Exam Browser Mode</span>
            <span className="badge badge-primary">⏱️ Thời Gian: 1 Tiếng (60:00)</span>
            <span className="badge badge-accent">🎲 Xáo Đề &amp; Đáp Án</span>
          </div>

          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Phòng Thi Thử: {session.title}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: 650, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
            Bạn đang chuẩn bị bước vào phòng thi chuẩn hoá. Hệ thống sẽ mô phỏng môi trường phòng thi nghiêm ngặt giống như Safe Exam Browser để bạn trải nghiệm áp lực thi thật 100%!
          </p>

          <div
            style={{
              textAlign: "left",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--warning)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>⚠️</span> Quy Chế Phòng Thi Bắt Buộc (Anti-Cheat):
            </h3>
            <ul style={{ margin: 0, paddingLeft: "1.4rem", lineHeight: 1.8, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <li>
                <strong>Toàn màn hình bắt buộc:</strong> Khi bấm bắt đầu, trình duyệt sẽ tự động chuyển sang chế độ Fullscreen.
              </li>
              <li>
                <strong>Khóa phím tắt &amp; Thoát:</strong> Chặn phím <code>ESC</code>, <code>F12</code>, <code>F5</code>, <code>Ctrl+C/V</code>, chuột phải.
              </li>
              <li>
                <strong>Chống chuyển Tab:</strong> Hệ thống tự động ghi nhận vi phạm nếu bạn chuyển sang tab khác hoặc click sang ứng dụng khác.
              </li>
              <li>
                <strong>Giới hạn vi phạm:</strong> Vi phạm quá <strong>{MAX_VIOLATIONS} lần</strong> sẽ bị <strong>hệ thống tự động thu bài và chấm điểm ngay lập tức</strong>!
              </li>
              <li>
                <strong>Xáo trộn 100%:</strong> Thứ tự câu hỏi và thứ tự các đáp án A, B, C, D đều được đảo ngẫu nhiên hoàn toàn.
              </li>
              <li>
                <strong>Không lộ đáp án:</strong> Trong lúc thi không hiển thị giải thích. Kết quả và bài giải chi tiết chỉ hiển thị sau khi nộp bài.
              </li>
            </ul>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-secondary btn-lg">
              &larr; Quay về danh sách bộ đề
            </Link>
            <Link href={`/quiz/${session.slug}`} className="btn btn-ghost btn-lg" style={{ border: "1px solid var(--border)" }}>
              📖 Sang phòng Luyện Tập tự do
            </Link>
            <button
              onClick={handleStartExam}
              className="btn btn-primary btn-lg"
              style={{ padding: "0.85rem 2rem", fontSize: "1.05rem", fontWeight: 700 }}
            >
              🚀 BẬT TOÀN MÀN HÌNH &amp; BẮT ĐẦU THI NGAY
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. SUBMITTED RESULT VIEW
  if (phase === "submitted" && result) {
    const answeredCount = Object.keys(answers).length;
    const isPassed = result.percent >= 75;

    const filteredQuestions = questions.filter((item) => {
      const userChoice = answers[item.key];
      const isRight = userChoice === item.answer;
      if (filterReview === "wrong") return !isRight;
      if (filterReview === "correct") return isRight;
      return true;
    });

    return (
      <div style={{ maxWidth: 960, margin: "2rem auto", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {disqualifiedReason && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              color: "#fca5a5",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            ⛔ {disqualifiedReason}
          </div>
        )}

        <div className="card card-glass" style={{ padding: "2.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>{isPassed ? "🎉" : "💪"}</div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, marginBottom: "0.35rem" }}>
            {isPassed ? "Chúc Mừng! Bạn Đã Vượt Qua Bài Thi" : "Chưa Đạt! Cần Ôn Luyện Thêm"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            Đề thi: <strong>{session.title}</strong> • Thí sinh: <strong>{user?.username}</strong>
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1rem",
              maxWidth: 650,
              margin: "0 auto 1.5rem",
            }}
          >
            <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Kết Quả</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: isPassed ? "var(--success)" : "var(--danger)" }}>
                {result.percent}%
              </div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Số Câu Đúng</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)" }}>
                {result.correct}/{result.total}
              </div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Thời Gian Làm</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)" }}>
                {formatTime(elapsedSec)}
              </div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Số Lần Vi Phạm</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: violations > 0 ? "var(--warning)" : "var(--success)" }}>
                {violations}/{MAX_VIOLATIONS}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-secondary">
              &larr; Về danh sách bộ đề
            </Link>
            <Link href={`/quiz/${session.slug}`} className="btn btn-ghost" style={{ border: "1px solid var(--border)" }}>
              📖 Sang phòng Luyện Tập
            </Link>
            <button
              onClick={() => {
                const randomized = shuffleArray([...(session.questions || [])]).map(shuffleQuestionOptions);
                setQuestions(randomized);
                setAnswers({});
                setViolations(0);
                setViolationAlert(null);
                setDisqualifiedReason(null);
                setPhase("gate");
              }}
              className="btn btn-primary"
            >
              🔄 Thi Lại Đề Này
            </button>
          </div>
        </div>

        {/* Review list */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Xem Lại Đề Thi &amp; Lời Giải Chi Tiết</h3>
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

  // 3. IN PROGRESS EXAM ROOM (Safe Exam Browser Interface)
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div
      className="exam-room-root"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        userSelect: "none",
        minHeight: "100vh",
      }}
    >
      {/* Violation Alert Modal Overlay */}
      {violationAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.88)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: 520,
              padding: "2rem",
              textAlign: "center",
              background: "#18181b",
              border: "2px solid #ef4444",
              boxShadow: "0 0 50px rgba(239, 68, 68, 0.4)",
            }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>🚨</div>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#f87171", marginBottom: "0.75rem" }}>
              CẢNH BÁO VI PHẠM QUY CHẾ THI!
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#e4e4e7", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {violationAlert}
            </p>
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                marginBottom: "1.5rem",
                fontSize: "0.9rem",
                color: "#fca5a5",
                fontWeight: 600,
              }}
            >
              ⚠️ Số lần vi phạm hiện tại: {violations}/{MAX_VIOLATIONS}
            </div>
            <button
              onClick={handleResumeFullscreen}
              className="btn btn-primary btn-lg"
              style={{ width: "100%", fontWeight: 700, padding: "0.85rem" }}
            >
              Quay lại tiếp tục làm bài thi (Toàn màn hình)
            </button>
          </div>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.75)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div className="card" style={{ maxWidth: 450, padding: "1.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📝</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Xác Nhận Nộp Bài Thi</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
              Bạn đã hoàn thành <strong>{answeredCount}/{questions.length} câu</strong>.
              {answeredCount < questions.length && (
                <span style={{ color: "var(--warning)", display: "block", marginTop: "0.35rem" }}>
                  ⚠️ Vẫn còn {questions.length - answeredCount} câu chưa trả lời!
                </span>
              )}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button onClick={() => setShowConfirmModal(false)} className="btn btn-secondary">
                Làm tiếp
              </button>
              <button
                onClick={() => handleSubmitExam(false, false)}
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? "Đang nộp..." : "Đồng ý nộp bài"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Exam Header */}
      <div
        className="card"
        style={{
          padding: "0.85rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderTop: "3px solid #6366f1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <span className="badge badge-warning" style={{ fontSize: "0.78rem" }}>
            🛡️ Safe Exam Browser
          </span>
          <strong style={{ fontSize: "1.05rem" }}>{session.title}</strong>
          <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>
            • Câu {currentIndex + 1}/{questions.length} (Đã làm {answeredCount})
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Violation Badge */}
          <div
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: violations > 0 ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.15)",
              color: violations > 0 ? "#f87171" : "#34d399",
              border: `1px solid ${violations > 0 ? "rgba(239, 68, 68, 0.4)" : "rgba(16, 185, 129, 0.3)"}`,
            }}
          >
            🛡️ Vi phạm: {violations}/{MAX_VIOLATIONS}
          </div>

          {/* Countdown Clock */}
          <div
            style={{
              fontFamily: "monospace",
              fontWeight: 800,
              fontSize: "1.2rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              background: timeLeft < 300 ? "rgba(239, 68, 68, 0.25)" : "rgba(99, 102, 241, 0.15)",
              color: timeLeft < 300 ? "#ef4444" : "var(--primary)",
              border: `1px solid ${timeLeft < 300 ? "#ef4444" : "var(--primary)"}`,
            }}
          >
            ⏳ {formatTime(timeLeft)}
          </div>

          <button onClick={() => setShowConfirmModal(true)} className="btn btn-primary btn-sm">
            Nộp bài thi
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      {/* Main Exam Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.5rem", alignItems: "start" }}>
        {/* Left: Active Question Card */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span className="badge badge-primary">Câu {currentIndex + 1} / {questions.length}</span>
              <span className="badge badge-accent">{q.topic || "Java"}</span>
              {isFlagged && <span className="badge badge-warning">🚩 Xem lại sau</span>}
            </div>

            <button
              type="button"
              onClick={toggleFlag}
              className="btn btn-secondary btn-sm"
              title="Đánh dấu câu này để xem lại"
              style={{ padding: "0.25rem 0.6rem", fontSize: "0.82rem" }}
            >
              🚩 {isFlagged ? "Bỏ cờ" : "Cờ xem lại"}
            </button>
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: "1.18rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.5 }}>
            {q.text}
          </h3>

          {/* Code snippet if any */}
          {q.code && (
            <div
              className="code-box"
              dangerouslySetInnerHTML={{ __html: `<pre><code>${highlightJava(q.code)}</code></pre>` }}
            />
          )}

          {/* Options (shuffled) */}
          <div style={{ marginTop: "1.25rem" }}>
            {q.options.map((opt, idx) => {
              const isSelected = chosen === idx;
              let optClass = "option-btn";
              if (isSelected) optClass += " selected";

              return (
                <div key={idx} style={{ marginBottom: "0.6rem" }}>
                  <button
                    onClick={() => handleSelectOption(idx)}
                    className={optClass}
                    style={{ width: "100%", marginBottom: 0, fontSize: "0.96rem" }}
                  >
                    <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div>{opt}</div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              className="btn btn-secondary"
            >
              &larr; Câu trước
            </button>

            <span style={{ fontSize: "0.88rem", color: "var(--text-dim)", alignSelf: "center" }}>
              Câu {currentIndex + 1} / {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((p) => Math.min(questions.length - 1, p + 1))}
                className="btn btn-primary"
              >
                Câu tiếp &rarr;
              </button>
            ) : (
              <button onClick={() => setShowConfirmModal(true)} className="btn btn-primary">
                Hoàn thành &amp; Nộp bài
              </button>
            )}
          </div>
        </div>

        {/* Right: Question Palette Grid */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.85rem" }}>
            Danh Sách Câu Hỏi ({questions.length})
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0.45rem",
              maxHeight: 450,
              overflowY: "auto",
              paddingRight: "0.2rem",
            }}
          >
            {questions.map((item, idx) => {
              const isAnswered = answers[item.key] !== undefined;
              const isCurrent = idx === currentIndex;
              const hasFlag = flagged.has(item.key);

              let bg = "var(--bg-input)";
              let color = "var(--text-muted)";
              let border = "1px solid var(--border)";

              if (isCurrent) {
                border = "2px solid var(--primary)";
                color = "var(--primary)";
              }
              if (isAnswered) {
                bg = "rgba(99, 102, 241, 0.2)";
                color = "var(--text-main)";
              }
              if (hasFlag) {
                border = "2px solid var(--warning)";
              }

              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    padding: "0.45rem 0",
                    borderRadius: "var(--radius-sm)",
                    background: bg,
                    color,
                    border,
                    fontWeight: isCurrent ? 700 : 500,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {idx + 1}
                  {hasFlag && (
                    <span style={{ position: "absolute", top: 1, right: 2, fontSize: "0.6rem" }}>🚩</span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "1.25rem", paddingTop: "0.85rem", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-dim)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(99, 102, 241, 0.2)", border: "1px solid var(--border)" }} />
              <span>Đã trả lời ({answeredCount})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, border: "2px solid var(--warning)" }} />
              <span>Có cờ xem lại ({flagged.size})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--bg-input)", border: "1px solid var(--border)" }} />
              <span>Chưa trả lời ({questions.length - answeredCount})</span>
            </div>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1.25rem" }}
          >
            Nộp bài thi
          </button>
        </div>
      </div>
    </div>
  );
}
