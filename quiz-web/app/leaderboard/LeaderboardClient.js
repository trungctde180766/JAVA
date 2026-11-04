"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Hàm tạo màu gradient ngẫu nhiên cố định theo username
function getAvatarGradient(name = "") {
  const colors = [
    "linear-gradient(135deg, #6366f1, #a855f7)",
    "linear-gradient(135deg, #3b82f6, #06b6d4)",
    "linear-gradient(135deg, #10b981, #14b8a6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #ec4899, #8b5cf6)",
    "linear-gradient(135deg, #f97316, #eab308)",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function LeaderboardClient({ currentUser, quizOptions, initialSlug, initialMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSlug, setSelectedSlug] = useState(initialSlug || "all");
  const [mode, setMode] = useState(initialMode || "all"); // "all" | "exam" | "practice"
  const [rankType, setRankType] = useState("best"); // "best" | "all"
  const [userQuery, setUserQuery] = useState("");
  const [quizSearch, setQuizSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [boardData, setBoardData] = useState({
    rankings: [],
    summary: {},
    myRank: null,
    title: "",
  });

  const currentUserRowRef = useRef(null);

  // Fetch dữ liệu mỗi khi đổi filter
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const fetchLeaderboard = async () => {
      try {
        const query = new URLSearchParams({
          slug: selectedSlug,
          mode,
          type: rankType,
          limit: "100",
        });
        const res = await fetch(`/api/leaderboard?${query.toString()}`);
        if (!res.ok) throw new Error("Lỗi tải bảng xếp hạng");
        const json = await res.json();
        if (!isCancelled && json.ok) {
          setBoardData({
            rankings: json.rankings || [],
            summary: json.summary || {},
            myRank: json.myRank || null,
            title: json.title || "",
          });
        }
      } catch (err) {
        console.error("Fetch leaderboard error:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchLeaderboard();

    // Cập nhật URL mà không reload trang
    const newParams = new URLSearchParams(window.location.search);
    if (selectedSlug === "all") newParams.delete("quiz");
    else newParams.set("quiz", selectedSlug);
    if (mode === "all") newParams.delete("mode");
    else newParams.set("mode", mode);
    const newUrl = `${window.location.pathname}${newParams.toString() ? "?" + newParams.toString() : ""}`;
    window.history.replaceState(null, "", newUrl);

    return () => {
      isCancelled = true;
    };
  }, [selectedSlug, mode, rankType]);

  // Bộ đề được chọn hiện tại
  const currentQuizMeta = useMemo(() => {
    return quizOptions.find((q) => q.slug === selectedSlug) || quizOptions[0];
  }, [quizOptions, selectedSlug]);

  // Lọc bảng theo tên thí sinh tìm kiếm
  const filteredRankings = useMemo(() => {
    if (!userQuery.trim()) return boardData.rankings;
    const q = userQuery.toLowerCase().trim();
    return boardData.rankings.filter((item) => item.username?.toLowerCase().includes(q));
  }, [boardData.rankings, userQuery]);

  // Top 3 dành cho Podium
  const top1 = boardData.rankings[0] || null;
  const top2 = boardData.rankings[1] || null;
  const top3 = boardData.rankings[2] || null;

  const scrollToMyRank = () => {
    if (currentUserRowRef.current) {
      currentUserRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingBottom: "4rem" }}>
      {/* 1. Header Banner */}
      <section className="card card-glass hero-banner" style={{ padding: "2.2rem 1.5rem", position: "relative" }}>
        <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "0.85rem", justifyContent: "center" }}>
          <span className="badge badge-warning" style={{ fontSize: "0.82rem", padding: "0.3rem 0.75rem" }}>
            🏆 Bảng Vàng Vinh Danh
          </span>
          <span className="badge badge-primary" style={{ fontSize: "0.82rem", padding: "0.3rem 0.75rem" }}>
            ⚡ Xếp Hạng Điểm Cao &amp; Tốc Độ
          </span>
        </div>

        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
            lineHeight: 1.25,
          }}
        >
          Bảng Xếp Hạng Thành Tích JavaQuiz
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.02rem",
            maxWidth: 720,
            margin: "0 auto 1.5rem",
            lineHeight: 1.6,
          }}
        >
          Ghi nhận những thí sinh xuất sắc nhất: Đạt điểm số cao nhất, làm đúng nhiều câu nhất và thời gian hoàn thành nhanh nhất!
        </p>

        {/* KPI Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginTop: "1.2rem",
          }}
        >
          <div
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "1rem 1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.82rem", color: "#f59e0b", fontWeight: 700, textTransform: "uppercase" }}>
              🥇 Quán quân hiện tại
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-main)" }}>
              {boardData.summary.topParticipant ? boardData.summary.topParticipant : "Chưa có"}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {selectedSlug === "all" ? "Dẫn đầu hệ thống" : `Điểm cao nhất: ${boardData.summary.topScore ?? 0}%`}
            </div>
          </div>

          <div
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "1rem 1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.82rem", color: "#6366f1", fontWeight: 700, textTransform: "uppercase" }}>
              👥 Thí sinh tham gia
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-main)" }}>
              {boardData.summary.totalParticipants || 0}{" "}
              <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--text-muted)" }}>người</span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              Tổng {boardData.summary.totalAttempts || 0} lượt nộp bài
            </div>
          </div>

          <div
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "1rem 1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: 700, textTransform: "uppercase" }}>
              ⚡ Thời gian kỷ lục
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-main)" }}>
              {boardData.summary.fastestTime ? boardData.summary.fastestTime : "Chưa có"}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              Lượt nộp nhanh nhất
            </div>
          </div>

          <div
            style={{
              background: "rgba(236, 72, 153, 0.1)",
              border: "1px solid rgba(236, 72, 153, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "1rem 1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.82rem", color: "#ec4899", fontWeight: 700, textTransform: "uppercase" }}>
              🎯 Bộ đề đang xem
            </div>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                marginTop: "0.35rem",
                color: "var(--text-main)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={currentQuizMeta.title}
            >
              {currentQuizMeta.icon} {currentQuizMeta.title}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {currentQuizMeta.count} câu hỏi trắc nghiệm
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls & Quiz Selector */}
      <section className="card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.2rem" }}>
              Chọn Bộ Đề Cần Xem Bảng Xếp Hạng
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Bấm vào từng bộ đề bên dưới để xem chi tiết ai đang dẫn đầu:
            </p>
          </div>

          {/* Quick Select Dropdown for mobile or long list */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Chọn nhanh:</span>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="input-select"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.88rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-main)" }}
            >
              {quizOptions.map((q) => (
                <option key={q.slug} value={q.slug}>
                  {q.icon} {q.title} ({q.attemptsCount} lượt)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Pills bar */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "0.6rem",
            scrollbarWidth: "thin",
          }}
        >
          {quizOptions.map((q) => {
            const isSelected = selectedSlug === q.slug;
            return (
              <button
                key={q.slug}
                onClick={() => setSelectedSlug(q.slug)}
                className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.45rem 0.85rem",
                  fontSize: "0.85rem",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border)",
                  boxShadow: isSelected ? "0 0 10px rgba(99, 102, 241, 0.35)" : "none",
                }}
              >
                <span>{q.icon}</span>
                <span style={{ fontWeight: isSelected ? 700 : 500 }}>{q.title}</span>
                {q.attemptsCount > 0 && (
                  <span
                    style={{
                      background: isSelected ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.15)",
                      padding: "0.1rem 0.45rem",
                      borderRadius: "10px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                    }}
                  >
                    {q.attemptsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar: Mode & Type & Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.25rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Mode chips */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginRight: "0.2rem" }}>
              Hình thức:
            </span>
            <button
              onClick={() => setMode("all")}
              className={`btn btn-sm ${mode === "all" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem", fontSize: "0.82rem" }}
            >
              🌟 Tất cả
            </button>
            <button
              onClick={() => setMode("exam")}
              className={`btn btn-sm ${mode === "exam" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem", fontSize: "0.82rem" }}
            >
              ⏱️ Thi thử (SEB)
            </button>
            <button
              onClick={() => setMode("practice")}
              className={`btn btn-sm ${mode === "practice" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "0.3rem 0.75rem", fontSize: "0.82rem" }}
            >
              📖 Luyện tập
            </button>

            {selectedSlug !== "all" && (
              <>
                <span style={{ height: "1.2rem", width: "1px", background: "var(--border)", margin: "0 0.4rem" }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginRight: "0.2rem" }}>
                  Chế độ lọc:
                </span>
                <button
                  onClick={() => setRankType("best")}
                  className={`btn btn-sm ${rankType === "best" ? "btn-secondary" : "btn-ghost"}`}
                  style={{
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.82rem",
                    borderColor: rankType === "best" ? "#f59e0b" : "var(--border)",
                    color: rankType === "best" ? "#f59e0b" : "var(--text-main)",
                  }}
                  title="Mỗi thí sinh chỉ giữ 1 vị trí cao nhất (không bị trùng người)"
                >
                  👑 Kỷ lục mỗi người
                </button>
                <button
                  onClick={() => setRankType("all")}
                  className={`btn btn-sm ${rankType === "all" ? "btn-secondary" : "btn-ghost"}`}
                  style={{ padding: "0.3rem 0.75rem", fontSize: "0.82rem" }}
                  title="Hiển thị tất cả các lần nộp bài"
                >
                  📜 Mọi lượt nộp
                </button>
              </>
            )}
          </div>

          {/* User search */}
          <div style={{ position: "relative", minWidth: 220 }}>
            <input
              type="text"
              placeholder="🔍 Tìm tên thí sinh..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="input-text"
              style={{
                width: "100%",
                padding: "0.4rem 0.8rem",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-main)",
              }}
            />
            {userQuery && (
              <button
                onClick={() => setUserQuery("")}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. PODIUM (Top 3 Bục Vinh Quang - Khi có đủ thí sinh) */}
      {!loading && top1 && (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.2rem",
            alignItems: "end",
          }}
        >
          {/* Top 2: Bạc */}
          {top2 ? (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "1.75rem 1.25rem",
                border: "2px solid rgba(156, 163, 175, 0.4)",
                background: "rgba(156, 163, 175, 0.06)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                order: 1,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>🥈</div>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: getAvatarGradient(top2.username),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  margin: "0 auto 0.75rem",
                  boxShadow: "0 4px 12px rgba(156, 163, 175, 0.35)",
                }}
              >
                {top2.username?.[0]?.toUpperCase() || "U"}
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.2rem" }}>
                {top2.username}
                {top2.isCurrentUser && (
                  <span className="badge badge-primary" style={{ marginLeft: "0.4rem", fontSize: "0.7rem" }}>
                    Bạn
                  </span>
                )}
              </h3>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                Á Quân (Hạng #2)
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", fontSize: "0.9rem" }}>
                <span className="badge badge-success" style={{ fontSize: "0.85rem" }}>
                  🎯 {selectedSlug === "all" ? `${top2.totalCorrect} câu đúng` : `${top2.percent}% (${top2.correct}/${top2.total})`}
                </span>
                <span className="badge badge-secondary" style={{ fontSize: "0.85rem" }}>
                  ⚡ {top2.formattedDuration}
                </span>
              </div>
            </div>
          ) : <div style={{ order: 1 }} />}

          {/* Top 1: Vàng (Cao nhất, rực rỡ nhất) */}
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "2.2rem 1.25rem",
              border: "2px solid rgba(245, 158, 11, 0.6)",
              background: "linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.02) 100%)",
              boxShadow: "0 12px 32px rgba(245, 158, 11, 0.25)",
              transform: "scale(1.03)",
              zIndex: 2,
              order: 0,
            }}
          >
            <div style={{ fontSize: "2.6rem", marginBottom: "0.2rem" }}>👑 🥇</div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: getAvatarGradient(top1.username),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.7rem",
                fontWeight: 900,
                margin: "0 auto 0.75rem",
                boxShadow: "0 6px 18px rgba(245, 158, 11, 0.5)",
                border: "3px solid #f59e0b",
              }}
            >
              {top1.username?.[0]?.toUpperCase() || "U"}
            </div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.2rem" }}>
              {top1.username}
              {top1.isCurrentUser && (
                <span className="badge badge-primary" style={{ marginLeft: "0.4rem", fontSize: "0.75rem" }}>
                  Bạn
                </span>
              )}
            </h3>
            <div style={{ fontSize: "0.88rem", color: "#f59e0b", fontWeight: 700, marginBottom: "0.85rem" }}>
              🏆 Quán Quân Bảng Vàng (Hạng #1)
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
              <span
                className="badge"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#fff",
                  fontSize: "0.92rem",
                  padding: "0.35rem 0.75rem",
                }}
              >
                🎯 {selectedSlug === "all" ? `${top1.totalCorrect} câu đúng` : `${top1.percent}% (${top1.correct}/${top1.total})`}
              </span>
              <span className="badge badge-secondary" style={{ fontSize: "0.92rem", padding: "0.35rem 0.75rem" }}>
                ⚡ {top1.formattedDuration}
              </span>
            </div>
          </div>

          {/* Top 3: Đồng */}
          {top3 ? (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "1.75rem 1.25rem",
                border: "2px solid rgba(217, 119, 6, 0.35)",
                background: "rgba(217, 119, 6, 0.05)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                order: 2,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>🥉</div>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: getAvatarGradient(top3.username),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  margin: "0 auto 0.75rem",
                  boxShadow: "0 4px 12px rgba(217, 119, 6, 0.35)",
                }}
              >
                {top3.username?.[0]?.toUpperCase() || "U"}
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.2rem" }}>
                {top3.username}
                {top3.isCurrentUser && (
                  <span className="badge badge-primary" style={{ marginLeft: "0.4rem", fontSize: "0.7rem" }}>
                    Bạn
                  </span>
                )}
              </h3>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                Quý Quân (Hạng #3)
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", fontSize: "0.9rem" }}>
                <span className="badge badge-success" style={{ fontSize: "0.85rem" }}>
                  🎯 {selectedSlug === "all" ? `${top3.totalCorrect} câu đúng` : `${top3.percent}% (${top3.correct}/${top3.total})`}
                </span>
                <span className="badge badge-secondary" style={{ fontSize: "0.85rem" }}>
                  ⚡ {top3.formattedDuration}
                </span>
              </div>
            </div>
          ) : <div style={{ order: 2 }} />}
        </section>
      )}

      {/* 4. Leaderboard Table */}
      <section className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.2rem" }}>
              Danh Sách Bảng Xếp Hạng Chi Tiết ({filteredRankings.length} thí sinh)
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              {selectedSlug === "all"
                ? "Sắp xếp theo: Tổng số câu làm đúng ➔ Tỉ lệ chính xác ➔ Tổng thời gian học tập."
                : "Sắp xếp theo: Điểm số phần trăm (%) ➔ Số câu đúng ➔ Thời gian hoàn thành bài thi."}
            </p>
          </div>

          {selectedSlug !== "all" && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href={`/quiz/${selectedSlug}`} className="btn btn-secondary btn-sm">
                📖 Vào Luyện Tập
              </Link>
              <Link href={`/exam/${selectedSlug}`} className="btn btn-primary btn-sm">
                ⏱️ Vào Thi Thử (SEB)
              </Link>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Đang tải bảng xếp hạng...</div>
          </div>
        ) : filteredRankings.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1.5rem",
              background: "rgba(0, 0, 0, 0.05)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🏅</div>
            <h4 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Chưa có dữ liệu bài thi
            </h4>
            <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
              {selectedSlug === "all"
                ? "Chưa có lượt nộp bài nào phù hợp với bộ lọc hiện tại."
                : "Chưa có thí sinh nào hoàn thành bộ đề này. Hãy là người đầu tiên ghi danh trên bảng vàng!"}
            </p>
            {selectedSlug !== "all" && (
              <Link href={`/exam/${selectedSlug}`} className="btn btn-primary btn-lg">
                🚀 Vào Thi Ngay Để Ghi Danh
              </Link>
            )}
          </div>
        ) : (
          <div className="table-responsive" style={{ overflowX: "auto" }}>
            <table className="table" style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 0.4rem" }}>
              <thead>
                <tr style={{ background: "rgba(0, 0, 0, 0.08)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "center", width: 70 }}>Hạng</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left" }}>Thí sinh</th>
                  {selectedSlug === "all" ? (
                    <>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Số đề thi</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Tổng câu đúng</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Độ chính xác</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Điểm 100%</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Tổng thời gian</th>
                    </>
                  ) : (
                    <>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Hình thức</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Số câu đúng</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center", minWidth: 150 }}>Điểm số (%)</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Thời gian làm</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>Thời điểm nộp</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredRankings.map((item) => {
                  const isCurrent = item.isCurrentUser;
                  let rankBadge = null;

                  if (item.rank === 1) {
                    rankBadge = <span style={{ fontSize: "1.3rem" }}>🥇</span>;
                  } else if (item.rank === 2) {
                    rankBadge = <span style={{ fontSize: "1.3rem" }}>🥈</span>;
                  } else if (item.rank === 3) {
                    rankBadge = <span style={{ fontSize: "1.3rem" }}>🥉</span>;
                  } else {
                    rankBadge = (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: isCurrent ? "var(--primary)" : "rgba(0, 0, 0, 0.12)",
                          color: isCurrent ? "#fff" : "var(--text-main)",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.rank}
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={item.id || item.username + item.rank}
                      ref={isCurrent ? currentUserRowRef : null}
                      style={{
                        background: isCurrent ? "rgba(99, 102, 241, 0.12)" : "rgba(0, 0, 0, 0.02)",
                        border: isCurrent ? "2px solid #6366f1" : "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {/* Cột 1: Hạng */}
                      <td style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 700 }}>
                        {rankBadge}
                      </td>

                      {/* Cột 2: Thí sinh */}
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: getAvatarGradient(item.username),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              flexShrink: 0,
                            }}
                          >
                            {item.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <span>{item.username}</span>
                              {isCurrent && (
                                <span className="badge badge-primary" style={{ fontSize: "0.7rem", padding: "0.15rem 0.45rem" }}>
                                  ⭐ Bạn
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                              {item.userId ? "Thành viên chính thức" : "Thí sinh"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Render theo chế độ Toàn hệ thống hay Từng bài test */}
                      {selectedSlug === "all" ? (
                        <>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                            <span className="badge badge-secondary" style={{ fontSize: "0.82rem" }}>
                              📚 {item.quizzesCount} bộ đề
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 700, color: "var(--success)", fontSize: "1rem" }}>
                            {item.totalCorrect} câu
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
                              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.accuracy}%</span>
                              <div
                                style={{
                                  width: 80,
                                  height: 6,
                                  background: "rgba(0,0,0,0.15)",
                                  borderRadius: 4,
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${Math.min(100, item.accuracy)}%`,
                                    height: "100%",
                                    background: item.accuracy >= 80 ? "var(--success)" : item.accuracy >= 50 ? "#f59e0b" : "var(--danger)",
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                            {item.perfectCount > 0 ? (
                              <span className="badge badge-warning" style={{ fontWeight: 700 }}>
                                🌟 {item.perfectCount} lần
                              </span>
                            ) : (
                              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>-</span>
                            )}
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                            ⚡ {item.formattedDuration}
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                            <span
                              className={`badge ${item.mode === "exam" ? "badge-primary" : "badge-secondary"}`}
                              style={{ fontSize: "0.78rem" }}
                            >
                              {item.mode === "exam" ? "⏱️ Thi thử" : "📖 Luyện tập"}
                            </span>
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
                            {item.correct} / {item.total}
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                              <span
                                style={{
                                  fontWeight: 800,
                                  fontSize: "1.05rem",
                                  color: item.percent >= 80 ? "var(--success)" : item.percent >= 50 ? "#f59e0b" : "var(--danger)",
                                }}
                              >
                                {item.percent}%
                              </span>
                              <div
                                style={{
                                  width: 70,
                                  height: 6,
                                  background: "rgba(0,0,0,0.15)",
                                  borderRadius: 4,
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${Math.min(100, item.percent)}%`,
                                    height: "100%",
                                    background: item.percent >= 80 ? "var(--success)" : item.percent >= 50 ? "#f59e0b" : "var(--danger)",
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 600, fontSize: "0.92rem" }}>
                            ⚡ {item.formattedDuration}
                          </td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "-"}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 5. Sticky My Rank Bar (Floating at bottom if current user has a rank) */}
      {boardData.myRank && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(23, 23, 37, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(99, 102, 241, 0.5)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            borderRadius: "999px",
            padding: "0.6rem 1.4rem",
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            zIndex: 100,
            color: "#fff",
            maxWidth: "92vw",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>📍</span>
            <span style={{ fontSize: "0.92rem", fontWeight: 700 }}>
              Thứ hạng của bạn: <strong style={{ color: "#38bdf8", fontSize: "1.05rem" }}>#{boardData.myRank.rank}</strong>
            </span>
          </div>

          <div style={{ fontSize: "0.88rem", display: "flex", gap: "0.8rem", color: "rgba(255, 255, 255, 0.85)" }}>
            <span>
              🎯 {selectedSlug === "all" ? `${boardData.myRank.totalCorrect} câu đúng` : `${boardData.myRank.percent}% (${boardData.myRank.correct}/${boardData.myRank.total})`}
            </span>
            <span>⚡ {boardData.myRank.formattedDuration}</span>
          </div>

          <button
            onClick={scrollToMyRank}
            className="btn btn-sm btn-primary"
            style={{
              padding: "0.25rem 0.75rem",
              fontSize: "0.78rem",
              borderRadius: "999px",
            }}
          >
            Cuộn tới dòng của tôi ⬇️
          </button>
        </div>
      )}
    </div>
  );
}

