"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminClient({ currentUser, stats, initialUsers, initialQuizzes, initialAttempts }) {
  const router = useRouter();
  const [tab, setTab] = useState("quizzes"); // "quizzes" | "users" | "attempts"

  const [users, setUsers] = useState(initialUsers);
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [attempts, setAttempts] = useState(initialAttempts);

  const [searchUser, setSearchUser] = useState("");
  const [searchQuiz, setSearchQuiz] = useState("");

  // Modal for new quiz
  const [showNewQuizModal, setShowNewQuizModal] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDesc, setNewQuizDesc] = useState("");
  const [newQuizIcon, setNewQuizIcon] = useState("📚");
  const [creatingQuiz, setCreatingQuiz] = useState(false);

  // Modal for reset password
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState("");

  // Reseed state
  const [reseeding, setReseeding] = useState(false);

  // User actions
  const handleToggleRole = async (u) => {
    if (u.id === currentUser.id) return alert("Không thể đổi quyền của chính bạn");
    const nextRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Đổi quyền của ${u.username} thành "${nextRole}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "role", role: nextRole }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: nextRole } : x)));
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleToggleBan = async (u) => {
    if (u.id === currentUser.id) return alert("Không thể tự khóa tài khoản của chính bạn");
    const nextBan = !u.banned;
    if (!confirm(`${nextBan ? "Khóa" : "Mở khóa"} tài khoản ${u.username}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ban", banned: nextBan }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, banned: nextBan } : x)));
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!resetTargetUser || !newPasswordVal) return;

    try {
      const res = await fetch(`/api/admin/users/${resetTargetUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "password", password: newPasswordVal }),
      });
      if (res.ok) {
        alert(`Đã đổi mật khẩu cho ${resetTargetUser.username} thành công!`);
        setResetTargetUser(null);
        setNewPasswordVal("");
      } else {
        const d = await res.json();
        alert(d.error || "Không thể đổi mật khẩu");
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleDeleteUser = async (u) => {
    if (u.id === currentUser.id) return alert("Không thể xóa tài khoản của chính bạn");
    if (!confirm(`XÓA VĨNH VIỄN tài khoản ${u.username} cùng toàn bộ lịch sử thi?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((x) => x.id !== u.id));
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  // Create new Quiz
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) return;
    setCreatingQuiz(true);

    try {
      const res = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newQuizTitle,
          description: newQuizDesc,
          icon: newQuizIcon,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowNewQuizModal(false);
        router.push(`/admin/quiz/${data.slug}`);
      } else {
        alert(data.error || "Không thể tạo bộ đề");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setCreatingQuiz(false);
    }
  };

  // Reseed 3 default quizzes
  const handleReseed = async (mode = "missing") => {
    const text =
      mode === "reset"
        ? "BẠN CÓ CHẮC CHẮN MUỐN RESET? Toàn bộ 3 bộ đề gốc sẽ được ghi đè về nội dung mặc định ban đầu!"
        : "Khôi phục lại các bộ đề gốc (nếu có bộ đề nào bị xóa)?";
    if (!confirm(text)) return;

    setReseeding(true);
    try {
      const res = await fetch("/api/admin/reseed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Đã cập nhật ${data.changed} bộ đề thành công!`);
        router.refresh();
      } else {
        alert(data.error || "Lỗi khi khôi phục dữ liệu");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setReseeding(false);
    }
  };

  // Delete attempt
  const handleDeleteAttempt = async (attId) => {
    if (!confirm("Xóa kết quả làm bài này khỏi hệ thống?")) return;
    try {
      const res = await fetch(`/api/admin/attempts/${attId}`, { method: "DELETE" });
      if (res.ok) {
        setAttempts((prev) => prev.filter((x) => x.id !== attId));
      }
    } catch {
      alert("Lỗi khi xóa");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchQuiz.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner */}
      <div className="card card-glass" style={{ padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>⚙️</span>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Bảng Quản Trị Hệ Thống</h1>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginTop: "0.25rem" }}>
              Đăng nhập với quyền quản trị viên: <strong>{currentUser.username}</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Link href="/" className="btn btn-secondary btn-sm">
              &larr; Xem giao diện học viên
            </Link>
          </div>
        </div>

        {/* Stats 4 blocks */}
        <div className="grid-4" style={{ marginTop: "1.5rem" }}>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Tổng người dùng</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--accent)" }}>{stats.totalUsers}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Tổng số bộ đề</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>{stats.totalQuizzes}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Tổng số câu hỏi</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--success)" }}>{stats.totalQuestions}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Lượt thi đã nộp</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--warning)" }}>{stats.totalAttempts}</div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
        <button
          onClick={() => setTab("quizzes")}
          className={`btn btn-sm ${tab === "quizzes" ? "btn-primary" : "btn-ghost"}`}
        >
          📚 Quản lý Bộ đề ({quizzes.length})
        </button>
        <button
          onClick={() => setTab("users")}
          className={`btn btn-sm ${tab === "users" ? "btn-primary" : "btn-ghost"}`}
        >
          👥 Quản lý Người dùng ({users.length})
        </button>
        <button
          onClick={() => setTab("attempts")}
          className={`btn btn-sm ${tab === "attempts" ? "btn-primary" : "btn-ghost"}`}
        >
          📊 Lịch sử Làm bài ({attempts.length})
        </button>
      </div>

      {/* Tab 1: Quản lý Bộ đề */}
      {tab === "quizzes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <input
              type="text"
              placeholder="Tìm kiếm bộ đề..."
              value={searchQuiz}
              onChange={(e) => setSearchQuiz(e.target.value)}
              className="form-input"
              style={{ maxWidth: 300 }}
            />

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                onClick={() => handleReseed("reset")}
                disabled={reseeding}
                className="btn btn-secondary btn-sm"
                title="Khôi phục lại 3 bộ đề gốc từ ảnh chụp nếu bạn lỡ xóa hoặc sửa sai"
              >
                🔄 {reseeding ? "Đang xử lý..." : "Reset 3 bộ đề gốc"}
              </button>
              <button
                onClick={() => setShowNewQuizModal(true)}
                className="btn btn-primary btn-sm"
              >
                ➕ Thêm bộ đề mới
              </button>
            </div>
          </div>

          <div className="grid-3">
            {filteredQuizzes.map((q) => (
              <div
                key={q.slug}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: `4px solid ${q.color || "var(--primary)"}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "2rem" }}>{q.icon || "📘"}</span>
                  <span className="badge badge-primary">{q.count} câu hỏi</span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {q.title}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", fontFamily: "monospace", marginBottom: "0.75rem" }}>
                  slug: {q.slug}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", flex: 1, marginBottom: "1.25rem" }}>
                  {q.description}
                </p>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    href={`/admin/quiz/${q.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    ✏️ Quản lý câu hỏi
                  </Link>
                  <Link
                    href={`/quiz/${q.slug}`}
                    className="btn btn-secondary btn-sm"
                    target="_blank"
                    title="Mở xem thử"
                  >
                    👁️ Xem
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Quản lý Người dùng */}
      {tab === "users" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Tìm theo tên đăng nhập..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="form-input"
              style={{ maxWidth: 300 }}
            />
          </div>

          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tên người dùng</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Sổ câu sai</th>
                  <th>Đánh dấu ⭐</th>
                  <th>Ngày tạo</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isMe = u.id === currentUser.id;
                  return (
                    <tr key={u.id}>
                      <td style={{ fontWeight: 600 }}>
                        {u.username} {isMe && <span style={{ color: "var(--primary)", fontSize: "0.8rem" }}>(bạn)</span>}
                      </td>
                      <td>
                        <span className={`badge ${u.role === "admin" ? "badge-warning" : "badge-primary"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${u.banned ? "badge-danger" : "badge-success"}`}>
                          {u.banned ? "Bị khóa" : "Hoạt động"}
                        </span>
                      </td>
                      <td>{u.mistakesCount} câu</td>
                      <td>{u.bookmarksCount} câu</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString("vi-VN") : "—"}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                          <button
                            onClick={() => handleToggleRole(u)}
                            disabled={isMe}
                            className="btn btn-secondary btn-sm"
                            title="Đổi quyền Admin / User"
                          >
                            {u.role === "admin" ? "Hạ quyền" : "Cấp Admin"}
                          </button>
                          <button
                            onClick={() => handleToggleBan(u)}
                            disabled={isMe}
                            className={`btn btn-sm ${u.banned ? "btn-success" : "btn-secondary"}`}
                          >
                            {u.banned ? "Mở khóa" : "Khóa"}
                          </button>
                          <button
                            onClick={() => {
                              setResetTargetUser(u);
                              setNewPasswordVal("");
                            }}
                            className="btn btn-secondary btn-sm"
                          >
                            Đổi MK
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={isMe}
                            className="btn btn-danger btn-sm"
                            title="Xóa tài khoản"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Lịch sử nộp bài */}
      {tab === "attempts" && (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Bộ đề</th>
                <th>Chế độ</th>
                <th>Kết quả</th>
                <th>Tỉ lệ</th>
                <th>Thời gian</th>
                <th>Thời điểm nộp</th>
                <th style={{ textAlign: "right" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.username}</td>
                  <td>{a.quizTitle}</td>
                  <td>
                    <span className={`badge ${a.mode === "exam" ? "badge-danger" : "badge-accent"}`}>
                      {a.mode === "exam" ? "Thi thử" : "Luyện tập"}
                    </span>
                  </td>
                  <td>
                    {a.correct} / {a.total}
                  </td>
                  <td>
                    <strong style={{ color: a.percent >= 75 ? "var(--success)" : a.percent >= 50 ? "var(--warning)" : "var(--danger)" }}>
                      {a.percent}%
                    </strong>
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>
                    {Math.floor(a.durationSec / 60)}p {a.durationSec % 60}s
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                    {a.createdAt ? new Date(a.createdAt).toLocaleString("vi-VN") : "—"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleDeleteAttempt(a.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Tạo bộ đề mới */}
      {showNewQuizModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
              Tạo Bộ Đề Mới
            </h3>
            <form onSubmit={handleCreateQuiz}>
              <div className="form-group">
                <label className="form-label">Tên bộ đề</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Quiz 4 - Java Collections & Streams"
                  className="form-input"
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mô tả ngắn</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ôn tập List, Set, Map, Stream API..."
                  className="form-input"
                  value={newQuizDesc}
                  onChange={(e) => setNewQuizDesc(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Icon biểu tượng (emoji)</label>
                <input
                  type="text"
                  maxLength={4}
                  className="form-input"
                  value={newQuizIcon}
                  onChange={(e) => setNewQuizIcon(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowNewQuizModal(false)}
                  className="btn btn-secondary"
                  disabled={creatingQuiz}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={creatingQuiz}
                >
                  {creatingQuiz ? "Đang tạo..." : "Tạo & Chỉnh sửa câu hỏi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Đổi mật khẩu học viên */}
      {resetTargetUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Đổi Mật Khẩu Cho {resetTargetUser.username}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
              Nhập mật khẩu mới cho tài khoản này (tối thiểu 6 ký tự).
            </p>
            <form onSubmit={handleSetPassword}>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Mật khẩu mới..."
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  autoFocus
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={() => setResetTargetUser(null)}
                  className="btn btn-secondary"
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
