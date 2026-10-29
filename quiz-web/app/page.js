import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getQuizList } from "@/lib/quizzes";
import { ALL_TOPICS } from "@/lib/topics";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let user = null;
  let quizzes = [];
  let userAttempts = [];
  let totalMistakes = 0;
  let totalBookmarks = 0;

  try {
    user = await getCurrentUser();
    quizzes = await getQuizList();
    if (user) {
      const db = await getDb();
      userAttempts = await db
        .collection("attempts")
        .find({ userId: user._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();
      totalMistakes = Object.keys(user.mistakes || {}).length;
      totalBookmarks = (user.bookmarks || []).length;
    }
  } catch (err) {
    console.error("Error loading home page data:", err);
  }

  const totalQuestions = quizzes.reduce((sum, q) => sum + (q.count || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Hero Section */}
      <section
        className="card card-glass"
        style={{
          padding: "2.75rem 2rem",
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, rgba(24, 34, 60, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <span className="badge badge-primary">Java OOP &amp; JDBC</span>
          <span className="badge badge-accent">3 Bộ Đề Chuẩn</span>
          <span className="badge badge-success">Giải Thích Chi Tiết 100%</span>
        </div>

        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "0.85rem",
            lineHeight: 1.25,
          }}
        >
          Nền Tảng Ôn Thi Trắc Nghiệm Java
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: 720,
            margin: "0 auto 1.8rem",
          }}
        >
          Tổng hợp <strong>{totalQuestions || 80} câu hỏi</strong> thực chiến từ 3 bộ đề trắc nghiệm Java:
          OOP, Polymorphism, Access Modifiers, Interface, String, StringBuffer &amp; JDBC.
          Mỗi câu đều có lời giải thích cặn kẽ giúp bạn hiểu tận gốc bản chất!
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/quiz/quiz-1" className="btn btn-primary btn-lg">
            <span>🚀</span> Bắt đầu ngay (Quiz 1)
          </Link>
          <Link href="/quiz/mix?mode=exam" className="btn btn-secondary btn-lg">
            <span>⏱️</span> Thi thử 40 câu có bấm giờ
          </Link>
        </div>

        {/* User stats summary badge if logged in */}
        {user ? (
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              fontSize: "0.95rem",
            }}
          >
            <div>
              <span style={{ color: "var(--text-dim)" }}>Xin chào: </span>
              <strong style={{ color: "var(--text-main)" }}>{user.username}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-dim)" }}>Sổ câu sai cần ôn: </span>
              <strong style={{ color: totalMistakes > 0 ? "var(--danger)" : "var(--success)" }}>
                {totalMistakes} câu
              </strong>
            </div>
            <div>
              <span style={{ color: "var(--text-dim)" }}>Câu đã đánh dấu: </span>
              <strong style={{ color: "var(--warning)" }}>{totalBookmarks} câu</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-dim)" }}>Lượt thi đã làm: </span>
              <strong style={{ color: "var(--accent)" }}>{userAttempts.length} lượt</strong>
            </div>
          </div>
        ) : (
          <div
            style={{
              marginTop: "1.8rem",
              padding: "0.85rem 1.25rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px dashed rgba(99, 102, 241, 0.3)",
              display: "inline-block",
              fontSize: "0.92rem",
            }}
          >
            💡 <em>Mẹo:</em> <Link href="/register" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "underline" }}>Đăng ký tài khoản</Link> hoặc <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline" }}>Đăng nhập</Link> để hệ thống tự động ghi nhớ các câu bạn làm sai và theo dõi tiến độ học tập riêng của bạn!
          </div>
        )}
      </section>

      {/* 3 Main Quiz Sets */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              3 Bộ Đề Trắc Nghiệm Chính
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Chuyển thể nguyên vẹn từ đề thi chụp lại, 100% kèm code Java và giải thích.
            </p>
          </div>
        </div>

        <div className="grid-3">
          {quizzes.map((q) => (
            <div
              key={q.slug}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                borderTop: `4px solid ${q.color || "var(--primary)"}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "2rem" }}>{q.icon || "📘"}</span>
                <span className="badge badge-primary">{q.count || 0} câu hỏi</span>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {q.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", flex: 1, marginBottom: "1.25rem" }}>
                {q.description}
              </p>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                <Link
                  href={`/quiz/${q.slug}?mode=practice`}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  📖 Luyện tập
                </Link>
                <Link
                  href={`/quiz/${q.slug}?mode=exam`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  ⏱️ Thi thử
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Learning Modes */}
      <section>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          Chế Độ Học Thông Minh
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
          Hỗ trợ bạn học nhanh, nhớ lâu theo phương pháp lặp lại ngắt quãng (Spaced Repetition).
        </p>

        <div className="grid-3">
          {/* Mix */}
          <Link href="/quiz/mix" className="card" style={{ borderTop: "4px solid #f5b700" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎲</div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Đề Tổng Hợp Ngẫu Nhiên
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
              Trộn ngẫu nhiên câu hỏi từ tất cả 3 bộ đề, loại bỏ trùng lặp. Giúp bạn phản xạ nhanh như thi thật.
            </p>
            <span style={{ color: "#f5b700", fontWeight: 600, fontSize: "0.85rem" }}>Vào luyện ngay &rarr;</span>
          </Link>

          {/* Mistakes */}
          <Link href="/quiz/mistakes" className="card" style={{ borderTop: "4px solid #ff5c7a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "2rem" }}>🩹</span>
              {totalMistakes > 0 && <span className="badge badge-danger">{totalMistakes} câu sai</span>}
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Sổ Tay Ôn Câu Sai
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
              Tự động gom lại những câu bạn từng trả lời sai. Khi bạn trả lời đúng 2 lần liên tiếp, câu sẽ tự động được xóa.
            </p>
            <span style={{ color: "#ff5c7a", fontWeight: 600, fontSize: "0.85rem" }}>Ôn tập câu sai &rarr;</span>
          </Link>

          {/* Bookmarks */}
          <Link href="/quiz/bookmarks" className="card" style={{ borderTop: "4px solid #ffb020" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "2rem" }}>⭐</span>
              {totalBookmarks > 0 && <span className="badge badge-warning">{totalBookmarks} câu</span>}
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Câu Hỏi Đã Đánh Dấu
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
              Xem lại những câu hỏi quan trọng, mẹo bẫy hoặc câu khó mà bạn đã bấm dấu sao (⭐) khi làm bài.
            </p>
            <span style={{ color: "#ffb020", fontWeight: 600, fontSize: "0.85rem" }}>Xem danh sách đã lưu &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Practice by Topic */}
      <section>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          Luyện Tập Theo Chủ Đề
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
          Nếu bạn còn yếu phần nào, hãy chọn chuyên đề đó để cày nát từng dạng câu hỏi:
        </p>

        <div className="grid-4">
          {Object.entries(ALL_TOPICS).map(([key, name]) => (
            <Link
              key={key}
              href={`/quiz/topic-${key}`}
              className="card"
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>🏷️</span>
              <strong style={{ fontSize: "0.95rem" }}>{name}</strong>
              <span style={{ fontSize: "0.8rem", color: "var(--primary)" }}>Ôn chuyên đề &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent attempts if logged in */}
      {user && userAttempts.length > 0 && (
        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>Lịch Sử Làm Bài Gần Đây</h2>
            <Link href="/profile" style={{ fontSize: "0.88rem", color: "var(--primary)", fontWeight: 600 }}>
              Xem tất cả &rarr;
            </Link>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bộ đề</th>
                  <th>Chế độ</th>
                  <th>Điểm số</th>
                  <th>Thời gian</th>
                  <th>Ngày làm</th>
                </tr>
              </thead>
              <tbody>
                {userAttempts.map((a) => (
                  <tr key={String(a._id)}>
                    <td style={{ fontWeight: 600 }}>{a.quizTitle || a.quizSlug}</td>
                    <td>
                      <span className={`badge ${a.mode === "exam" ? "badge-danger" : "badge-accent"}`}>
                        {a.mode === "exam" ? "Thi thử" : "Luyện tập"}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: a.percent >= 80 ? "var(--success)" : a.percent >= 50 ? "var(--warning)" : "var(--danger)" }}>
                        {a.correct}/{a.total} ({a.percent}%)
                      </strong>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {Math.floor(a.durationSec / 60)}p {a.durationSec % 60}s
                    </td>
                    <td style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>
                      {new Date(a.createdAt).toLocaleDateString("vi-VN")} {new Date(a.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
