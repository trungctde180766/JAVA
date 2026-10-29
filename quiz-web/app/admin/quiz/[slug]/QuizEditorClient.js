"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_TOPICS } from "@/lib/topics";
import { highlightJava } from "@/lib/highlight";

export default function QuizEditorClient({ initialQuiz }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState(initialQuiz);
  const [questions, setQuestions] = useState(initialQuiz.questions || []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [previewCode, setPreviewCode] = useState({});

  const handleQuizChange = (field, value) => {
    setQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const opts = [...copy[qIndex].options];
      opts[oIndex] = value;
      copy[qIndex] = { ...copy[qIndex], options: opts };
      return copy;
    });
  };

  const handleAddOption = (qIndex) => {
    setQuestions((prev) => {
      const copy = [...prev];
      if (copy[qIndex].options.length >= 6) return prev;
      copy[qIndex] = {
        ...copy[qIndex],
        options: [...copy[qIndex].options, `Đáp án mới`],
      };
      return copy;
    });
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    setQuestions((prev) => {
      const copy = [...prev];
      if (copy[qIndex].options.length <= 2) {
        alert("Một câu hỏi cần tối thiểu 2 đáp án");
        return prev;
      }
      const opts = copy[qIndex].options.filter((_, i) => i !== oIndex);
      let answer = copy[qIndex].answer;
      if (answer === oIndex) answer = 0;
      else if (answer > oIndex) answer -= 1;
      copy[qIndex] = { ...copy[qIndex], options: opts, answer };
      return copy;
    });
  };

  const handleAddQuestion = () => {
    const newId = `q${String(questions.length + 1).padStart(2, "0")}`;
    setQuestions((prev) => [
      ...prev,
      {
        id: newId,
        topic: "oop",
        text: "Nội dung câu hỏi mới...",
        code: "",
        options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        answer: 0,
        explanation: "Giải thích vì sao đáp án A đúng...",
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (!confirm(`Xóa câu hỏi số ${index + 1}?`)) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveQuestion = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;
    setQuestions((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch(`/api/admin/quizzes/${quiz.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quiz.title,
          description: quiz.description,
          icon: quiz.icon,
          color: quiz.color,
          order: quiz.order,
          hidden: quiz.hidden,
          questions,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: `Đã lưu thành công ${data.count} câu hỏi!`, type: "success" });
      } else {
        setMessage({ text: data.error || "Lỗi khi lưu bộ đề", type: "error" });
      }
    } catch {
      setMessage({ text: "Lỗi kết nối máy chủ", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuiz = async () => {
    if (!confirm(`CẢNH BÁO: XÓA VĨNH VIỄN bộ đề "${quiz.title}" (${questions.length} câu hỏi)?`)) return;
    try {
      const res = await fetch(`/api/admin/quizzes/${quiz.slug}`, { method: "DELETE" });
      if (res.ok) {
        alert("Đã xóa bộ đề");
        router.push("/admin");
      }
    } catch {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Header */}
      <div className="card card-glass" style={{ padding: "1.5rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link href="/admin" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                &larr; Bảng quản trị
              </Link>
              <span style={{ color: "var(--text-dim)" }}>/</span>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Chỉnh Sửa Bộ Đề &amp; Câu Hỏi</h1>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontFamily: "monospace", marginTop: "0.2rem" }}>
              slug: {quiz.slug} • {questions.length} câu hỏi
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button onClick={handleDeleteQuiz} className="btn btn-danger btn-sm">
              🗑️ Xóa bộ đề này
            </button>
            <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
              {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
            </button>
          </div>
        </div>

        {message.text && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              background: message.type === "success" ? "var(--success-light)" : "var(--danger-light)",
              color: message.type === "success" ? "#6ee7b7" : "#fca5a5",
              fontSize: "0.9rem",
            }}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Quiz metadata settings */}
      <div className="card">
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
          Thông Tin Chung Bộ Đề
        </h3>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Tên bộ đề</label>
            <input
              type="text"
              className="form-input"
              value={quiz.title}
              onChange={(e) => handleQuizChange("title", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mô tả ngắn</label>
            <input
              type="text"
              className="form-input"
              value={quiz.description}
              onChange={(e) => handleQuizChange("description", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Biểu tượng (Emoji)</label>
            <input
              type="text"
              maxLength={4}
              className="form-input"
              value={quiz.icon}
              onChange={(e) => handleQuizChange("icon", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mã màu nhận diện (Hex)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="color"
                value={quiz.color}
                onChange={(e) => handleQuizChange("color", e.target.value)}
                style={{ width: 45, height: 40, border: "none", background: "transparent", cursor: "pointer" }}
              />
              <input
                type="text"
                className="form-input"
                value={quiz.color}
                onChange={(e) => handleQuizChange("color", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions List Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>
          Danh Sách Câu Hỏi ({questions.length})
        </h2>
        <button onClick={handleAddQuestion} className="btn btn-primary btn-sm">
          ➕ Thêm câu hỏi
        </button>
      </div>

      {/* Questions List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {questions.map((q, qIdx) => (
          <div key={q.id || qIdx} className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="badge badge-primary">Câu {qIdx + 1}</span>
                <select
                  value={q.topic || "oop"}
                  onChange={(e) => handleQuestionChange(qIdx, "topic", e.target.value)}
                  className="form-select"
                  style={{ width: "auto", padding: "0.3rem 0.65rem", fontSize: "0.85rem" }}
                >
                  {Object.entries(ALL_TOPICS).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button
                  type="button"
                  onClick={() => handleMoveQuestion(qIdx, -1)}
                  disabled={qIdx === 0}
                  className="btn btn-secondary btn-sm"
                  title="Di chuyển lên trên"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveQuestion(qIdx, 1)}
                  disabled={qIdx === questions.length - 1}
                  className="btn btn-secondary btn-sm"
                  title="Di chuyển xuống dưới"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(qIdx)}
                  className="btn btn-danger btn-sm"
                  title="Xóa câu hỏi này"
                >
                  Xóa
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="form-group">
              <label className="form-label">Nội dung câu hỏi</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIdx, "text", e.target.value)}
              />
            </div>

            {/* Java Code Snippet */}
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="form-label">Đoạn mã Java (nếu có)</label>
                {q.code && (
                  <button
                    type="button"
                    onClick={() => setPreviewCode((p) => ({ ...p, [qIdx]: !p[qIdx] }))}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: "0.78rem" }}
                  >
                    {previewCode[qIdx] ? "Ẩn xem trước" : "Xem trước tô màu"}
                  </button>
                )}
              </div>
              <textarea
                rows={4}
                className="form-textarea"
                style={{ fontFamily: "monospace", fontSize: "0.9rem" }}
                placeholder="class Example { ... }"
                value={q.code || ""}
                onChange={(e) => handleQuestionChange(qIdx, "code", e.target.value)}
              />

              {previewCode[qIdx] && q.code && (
                <div
                  className="code-box"
                  dangerouslySetInnerHTML={{ __html: `<pre><code>${highlightJava(q.code)}</code></pre>` }}
                />
              )}
            </div>

            {/* Options */}
            <div style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label className="form-label">
                  Các lựa chọn đáp án (Tích chọn nút tròn vào đáp án ĐÚNG)
                </label>
                {q.options.length < 6 && (
                  <button
                    type="button"
                    onClick={() => handleAddOption(qIdx)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "0.78rem" }}
                  >
                    + Thêm đáp án
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {q.options.map((opt, oIdx) => {
                  const isAnswer = q.answer === oIdx;
                  return (
                    <div
                      key={oIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        background: isAnswer ? "rgba(16, 185, 129, 0.1)" : "var(--bg-input)",
                        border: "1px solid",
                        borderColor: isAnswer ? "var(--success)" : "var(--border)",
                      }}
                    >
                      <input
                        type="radio"
                        name={`answer-${qIdx}`}
                        checked={isAnswer}
                        onChange={() => handleQuestionChange(qIdx, "answer", oIdx)}
                        style={{ cursor: "pointer", width: 18, height: 18 }}
                        title="Đánh dấu đáp án đúng"
                      />
                      <span style={{ fontWeight: 700, width: 22, color: isAnswer ? "var(--success)" : "inherit" }}>
                        {String.fromCharCode(65 + oIdx)}.
                      </span>
                      <input
                        type="text"
                        className="form-input"
                        style={{ flex: 1, padding: "0.45rem 0.75rem" }}
                        value={opt}
                        onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                      />
                      {q.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(qIdx, oIdx)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: "var(--danger)" }}
                          title="Xóa lựa chọn này"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label className="form-label">💡 Lời giải thích chi tiết cho câu hỏi</label>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Giải thích tại sao đáp án đúng, phân tích các đáp án sai..."
                value={q.explanation || ""}
                onChange={(e) => handleQuestionChange(qIdx, "explanation", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating or Bottom Save Bar */}
      <div
        className="card card-glass"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          position: "sticky",
          bottom: "1rem",
          zIndex: 40,
        }}
      >
        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Tổng cộng: <strong>{questions.length}</strong> câu hỏi
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleAddQuestion} className="btn btn-secondary btn-sm">
            ➕ Thêm câu hỏi
          </button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            {saving ? "Đang lưu..." : "💾 Lưu toàn bộ bộ đề"}
          </button>
        </div>
      </div>
    </div>
  );
}
