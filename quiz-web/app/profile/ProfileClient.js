"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileClient({ user, initialAttempts }) {
  const router = useRouter();
  const [attempts, setAttempts] = useState(initialAttempts);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwMessage, setPwMessage] = useState({ text: "", type: "" });
  const [changingPw, setChangingPw] = useState(false);

  const totalAttempts = attempts.length;
  const avgScore = totalAttempts > 0
    ? Math.round(attempts.reduce((s, a) => s + a.percent, 0) / totalAttempts)
    : 0;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMessage({ text: "", type: "" });
    setChangingPw(true);

    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMessage({ text: "Đổi mật khẩu thành công!", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setPwMessage({ text: data.error || "Không thể đổi mật khẩu", type: "error" });
      }
    } catch {
      setPwMessage({ text: "Lỗi kết nối máy chủ", type: "error" });
    } finally {
      setChangingPw(false);
    }
  };

  const handleResetData = async (what, label) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa toàn bộ ${label}?`)) return;
    try {
      const res = await fetch(`/api/me?what=${what}`, { method: "DELETE" });
      if (res.ok) {
        if (what === "history") setAttempts([]);
        router.refresh();
        alert(`Đã xóa thành công ${label}`);
      }
    } catch {
      alert("Lỗi khi xóa dữ liệu");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Info Card */}
      <div className="card card-glass" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.75rem",
              }}
            >
              👤
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{user.username}</h1>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.2rem" }}>
                <span className={`badge ${user.role === "admin" ? "badge-warning" : "badge-primary"}`}>
                  {user.role === "admin" ? "Quản trị viên (Admin)" : "Học viên"}
                </span>
                {user.createdAt && (
                  <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>
                    Tham gia: {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            {user.role === "admin" && (
              <Link href="/admin" className="btn btn-primary btn-sm">
                ⚙️ Mở Bảng Quản Trị
              </Link>
            )}
            <Link href="/" className="btn btn-secondary btn-sm">
              &larr; Về trang chủ
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginTop: "1.75rem" }}>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Tổng lượt làm bài</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>{totalAttempts}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Điểm trung bình</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: avgScore >= 75 ? "var(--success)" : "var(--warning)" }}>
              {avgScore}%
            </div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Câu sai cần ôn</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: user.mistakesCount > 0 ? "var(--danger)" : "var(--success)" }}>
              {user.mistakesCount}
            </div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>Câu đã đánh dấu ⭐</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--warning)" }}>{user.bookmarksCount}</div>
          </div>
        </div>
      </div>

      {/* Account Settings & Quick Cleanups */}
      <div className="grid-2">
        {/* Change password */}
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
            Đổi Mật Khẩu
          </h3>

          {pwMessage.text && (
            <div
              style={{
                padding: "0.6rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                background: pwMessage.type === "success" ? "var(--success-light)" : "var(--danger-light)",
                color: pwMessage.type === "success" ? "#6ee7b7" : "#fca5a5",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              {pwMessage.text}
            </div>
          )}

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">Mật khẩu hiện tại</label>
              <input
                type="password"
                required
                className="form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mật khẩu mới (tối thiểu 6 ký tự)</label>
              <input
                type="password"
                required
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={changingPw} className="btn btn-primary btn-sm">
              {changingPw ? "Đang lưu..." : "Cập nhật mật khẩu"}
            </button>
          </form>
        </div>

        {/* Data Management */}
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Quản Lý Dữ Liệu Học Tập
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
            Bạn có thể chủ động reset dữ liệu học tập cá nhân bất kỳ lúc nào để bắt đầu ôn lại từ đầu.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "0.92rem" }}>Sổ tay câu sai</strong>
                <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Đang có {user.mistakesCount} câu</div>
              </div>
              <button
                onClick={() => handleResetData("mistakes", "sổ câu sai")}
                className="btn btn-secondary btn-sm"
              >
                Xóa sổ câu sai
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
              <div>
                <strong style={{ fontSize: "0.92rem" }}>Danh sách đánh dấu ⭐</strong>
                <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Đang có {user.bookmarksCount} câu</div>
              </div>
              <button
                onClick={() => handleResetData("bookmarks", "câu đã đánh dấu")}
                className="btn btn-secondary btn-sm"
              >
                Xóa đánh dấu
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
              <div>
                <strong style={{ fontSize: "0.92rem" }}>Lịch sử làm bài</strong>
                <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Đang lưu {totalAttempts} lượt</div>
              </div>
              <button
                onClick={() => handleResetData("history", "lịch sử thi")}
                className="btn btn-danger btn-sm"
              >
                Xóa toàn bộ lịch sử
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attempts History */}
      <div className="card">
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
          Toàn Bộ Lịch Sử Bài Làm ({attempts.length})
        </h3>

        {attempts.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
            Bạn chưa làm bài thi nào. Hãy bắt đầu với một bộ đề nhé!
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bộ đề</th>
                  <th>Chế độ</th>
                  <th>Điểm số</th>
                  <th>Tỉ lệ</th>
                  <th>Thời gian</th>
                  <th>Thời điểm nộp</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600 }}>{a.quizTitle}</td>
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
                    <td style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
                      {new Date(a.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
