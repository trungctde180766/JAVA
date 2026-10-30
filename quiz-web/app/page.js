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
  const interviewQuizzes = quizzes.filter((q) => q.slug.startsWith("interview-"));
  const originalExamQuizzes = quizzes.filter((q) => !q.slug.startsWith("interview-") && !q.slug.startsWith("ai-"));
  const aiGeneratedQuizzes = quizzes.filter((q) => q.slug.startsWith("ai-"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Hero Section */}
      <section className="card card-glass hero-banner">
        <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span className="badge badge-primary">🏛️ 3 Bộ Đề Gốc Môn Học</span>
          <span className="badge badge-accent">🤖 3 Bộ Đề AI Mở Rộng</span>
          <span className="badge badge-warning">🎯 Ôn Phỏng Vấn 1-1</span>
          <span className="badge badge-success">🇻🇳 Song Ngữ &amp; Giải Thích Trực Quan</span>
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
          Nền Tảng Ôn Thi &amp; Phỏng Vấn Java Fullstack
        </h1>
        <p
          style={{
            fontSize: "1.08rem",
            color: "var(--text-muted)",
            maxWidth: 780,
            margin: "0 auto 1.8rem",
            lineHeight: 1.6,
          }}
        >
          Hệ thống gồm <strong>{totalQuestions} câu hỏi</strong>: 3 bộ đề thi trắc nghiệm môn học và trọn bộ 
          <strong> câu hỏi phỏng vấn 1-1 thực tế</strong> (SQL, Java Core, Spring Boot, Web Frontend, Git &amp; AI).
          Mỗi câu đều có lời giải thích cặn kẽ và mẹo trả lời phỏng vấn ghi điểm!
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/quiz/interview-all?mode=practice" className="btn btn-primary btn-lg">
            <span>🎯</span> Luyện Phỏng Vấn 1-1 (Tổng Hợp)
          </Link>
          <Link href="/quiz/quiz-1?mode=practice" className="btn btn-secondary btn-lg">
            <span>🚀</span> Đề Thi Môn Học (Quiz 1)
          </Link>
          <Link href="/quiz/mix?mode=exam" className="btn btn-ghost btn-lg" style={{ border: "1px solid var(--border)" }}>
            <span>⏱️</span> Thi Thử Bấm Giờ
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
            className="hero-tip-box"
            style={{
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              color: "#fcd34d",
              padding: "0.85rem 1.25rem",
              borderRadius: "var(--radius-sm)",
              marginTop: "1.5rem",
            }}
          >
            🔒 <strong>Bắt buộc đăng nhập:</strong> Vui lòng{" "}
            <Link href="/login" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>
              Đăng nhập
            </Link>{" "}
            hoặc{" "}
            <Link href="/register" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>
              Đăng ký tài khoản
            </Link>{" "}
            để bắt đầu làm bài thi trắc nghiệm và học toàn bộ các bộ câu hỏi!
          </div>
        )}
      </section>

      {/* SECTION 1: Bộ Câu Hỏi Phỏng Vấn 1-1 Theo Từng Dạng */}
      {interviewQuizzes.length > 0 && (
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <div style={{ display: "inline-flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <span className="badge badge-accent">🔥 Bộ Đề Mới Bổ Sung</span>
                <span className="badge badge-primary">Ôn Phỏng Vấn 1-1 Thực Chiến</span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                Bộ Câu Hỏi Ôn Tập Phỏng Vấn 1-1 (Theo Từng Dạng)
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Được chia tách thành từng dạng chuyên biệt: SQL, Java Core, Spring Boot, Web Frontend, Git &amp; AI giúp bạn cày nát từng phần!
              </p>
            </div>
            <Link href="/quiz/interview-all?mode=practice" className="btn btn-secondary btn-sm">
              <span>🎯</span> Ôn toàn bộ câu phỏng vấn &rarr;
            </Link>
          </div>

          <div className="grid-3">
            {interviewQuizzes.map((q) => (
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
                  <span style={{ fontSize: "2rem" }}>{q.icon || "🎯"}</span>
                  <span className="badge badge-primary">{q.count || 0} câu hỏi</span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {q.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", flex: 1, marginBottom: "1.25rem", lineHeight: 1.5 }}>
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
      )}

      {/* SECTION 2: 3 Bộ Đề Trắc Nghiệm Môn Học (Gốc) */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <div style={{ display: "inline-flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
              <span className="badge badge-primary">🏛️ Đề Thi Môn Học Gốc</span>
              <span className="badge badge-accent">Chuẩn Đề Thi Thật 80 Câu</span>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              3 Bộ Đề Trắc Nghiệm Môn Học (Bộ Đề Gốc)
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Chuyển thể nguyên vẹn từ 76 ảnh chụp màn hình đề thi môn học, 100% kèm code Java, bản dịch tiếng Việt và giải thích chi tiết.
            </p>
          </div>
        </div>

        <div className="grid-3">
          {originalExamQuizzes.map((q) => (
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
                <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                  <span className="badge badge-primary" style={{ fontSize: "0.74rem" }}>🏛️ Đề Gốc</span>
                  <span className="badge badge-accent">{q.count || 0} câu</span>
                </div>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {q.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", flex: 1, marginBottom: "1.25rem", lineHeight: 1.5 }}>
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

      {/* SECTION 3: 3 Bộ Đề Do AI Tạo Dựa Trên Bộ Đề Gốc */}
      {aiGeneratedQuizzes.length > 0 && (
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <div style={{ display: "inline-flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <span className="badge badge-accent">🤖 AI Generated</span>
                <span className="badge badge-warning">Mở Rộng Dựa Trên Đề Gốc</span>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                3 Bộ Đề Mở Rộng Do AI Tạo (Dựa Trên Bộ Gốc)
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Do AI phát triển dựa trên cấu trúc các bộ đề gốc: bổ sung các bẫy phòng thi chuyên sâu, cú pháp mới và tình huống biên dịch thực chiến giúp bạn nâng cao phản xạ!
              </p>
            </div>
          </div>

          <div className="grid-3">
            {aiGeneratedQuizzes.map((q) => (
              <div
                key={q.slug}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: `4px solid ${q.color || "var(--accent)"}`,
                  background: "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, var(--bg-card) 40%)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "2rem" }}>{q.icon || "🤖"}</span>
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    <span className="badge badge-warning" style={{ fontSize: "0.74rem" }}>🤖 Do AI Tạo</span>
                    <span className="badge badge-accent">{q.count || 0} câu</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.18rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {q.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", flex: 1, marginBottom: "1.25rem", lineHeight: 1.5 }}>
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
      )}

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
