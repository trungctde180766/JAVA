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
  const scjpQuizzes = quizzes.filter((q) => q.slug.startsWith("scjp-"));
  const scjpRandom20 = scjpQuizzes.find((q) => q.slug === "scjp-random-20");
  const scjpAll = scjpQuizzes.find((q) => q.slug === "scjp-chapter-all");
  const scjpChapters = scjpQuizzes.filter((q) => q.slug.startsWith("scjp-ch0"));
  const interviewQuizzes = quizzes.filter((q) => q.slug.startsWith("interview-"));
  const originalExamQuizzes = quizzes.filter(
    (q) => !q.slug.startsWith("interview-") && !q.slug.startsWith("ai-") && !q.slug.startsWith("scjp-")
  );
  const aiGeneratedQuizzes = quizzes.filter((q) => q.slug.startsWith("ai-"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Hero Section */}
      <section className="card card-glass hero-banner">
        <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span className="badge badge-accent" style={{ background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "#fff" }}>🎲 SCJP Random 20 Câu</span>
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
          Hệ thống gồm <strong>{totalQuestions} câu hỏi</strong>: Bộ đề SCJP 9 Chapters (161 câu - bốc ngẫu nhiên 20 câu), 3 bộ đề thi trắc nghiệm môn học và trọn bộ 
          <strong> câu hỏi phỏng vấn 1-1 thực tế</strong> (SQL, Java Core, Spring Boot, Web Frontend, Git &amp; AI).
          Mỗi câu đều có lời giải thích cặn kẽ và mẹo làm bài ghi điểm!
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/exam/scjp-random-20" className="btn btn-primary btn-lg" style={{ background: "linear-gradient(135deg, #0284c7, #0369a1)", border: "none" }}>
            <span>🎲</span> Thi SCJP Random 20 Câu
          </Link>
          <Link href="/quiz/interview-all" className="btn btn-secondary btn-lg">
            <span>🎯</span> Luyện Phỏng Vấn 1-1
          </Link>
          <Link href="/quiz/quiz-1" className="btn btn-secondary btn-lg">
            <span>🚀</span> Luyện Đề Môn Học (Quiz 1)
          </Link>
          <Link href="/exam/mix" className="btn btn-ghost btn-lg" style={{ border: "1px solid var(--border)" }}>
            <span>⏱️</span> Thi Thử Bấm Giờ (SEB)
          </Link>
          <Link href="/leaderboard" className="btn btn-warning btn-lg" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff", border: "none" }}>
            <span>🏆</span> Bảng Xếp Hạng
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
              <Link href="/mistakes" title="Xem sổ tay câu sai theo từng bộ đề">
                <strong style={{ color: totalMistakes > 0 ? "var(--danger)" : "var(--success)" }}>
                  {totalMistakes} câu &rarr;
                </strong>
              </Link>
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

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    href={`/quiz/${q.slug}`}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    📖 Luyện tập
                  </Link>
                  <Link
                    href={`/exam/${q.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    title="Vào phòng thi thử chuẩn Safe Exam Browser (1 tiếng, xáo câu hỏi & đáp án, toàn màn hình)"
                  >
                    ⏱️ Thi thử (SEB)
                  </Link>
                  <Link
                    href={`/leaderboard?quiz=${q.slug}`}
                    className="btn btn-ghost btn-sm"
                    style={{ border: "1px solid var(--border)", padding: "0.35rem 0.65rem" }}
                    title="Xem bảng xếp hạng bộ đề này"
                  >
                    🏆
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: BỘ ĐỀ CHỨNG CHỈ SCJP CHAPTERS (KATHY SIERRA) - RANDOM 20 CÂU */}
      {scjpQuizzes.length > 0 && (
        <section style={{ scrollMarginTop: "2rem" }} id="scjp-chapters-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <div style={{ display: "inline-flex", gap: "0.4rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                <span className="badge badge-accent" style={{ background: "linear-gradient(135deg, #0284c7, #0369a1)", color: "#fff" }}>
                  🎲 Bốc Ngẫu Nhiên 20 Câu / Lần Thi
                </span>
                <span className="badge badge-primary">☕ SCJP 310-035 (Sierra &amp; Bates)</span>
                <span className="badge badge-warning">📚 Trọn Bộ 9 Chapters</span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                Bộ Đề Chứng Chỉ SCJP Chapters (Kathy Sierra &amp; Bert Bates)
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Trích xuất trực tiếp từ 9 Chapters tài liệu SCJP kinh điển: Đề thi ngẫu nhiên 20 câu giúp rèn luyện phản xạ phòng thi cấp tốc hoặc cày nát từng Chapter!
              </p>
            </div>
            {scjpRandom20 && (
              <Link href="/exam/scjp-random-20" className="btn btn-primary btn-sm" style={{ background: "linear-gradient(135deg, #0284c7, #0369a1)", border: "none" }}>
                <span>🎲</span> Vào Thi Thử 20 Câu Ngay &rarr;
              </Link>
            )}
          </div>

          {/* Hai card lớn nổi bật: Random 20 Câu & Toàn Bộ 161 Câu */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
            {/* Card Random 20 */}
            {scjpRandom20 && (
              <div
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "2px solid #0284c7",
                  background: "linear-gradient(180deg, rgba(2, 132, 199, 0.08) 0%, var(--bg-card) 60%)",
                  boxShadow: "0 8px 24px rgba(2, 132, 199, 0.12)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 12, right: -30, background: "#0284c7", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "3px 35px", transform: "rotate(45deg)", letterSpacing: "0.05em" }}>
                  HOT
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "2.3rem" }}>🎲</span>
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    <span className="badge badge-primary" style={{ background: "#0284c7", color: "#fff" }}>🎲 Random 20 Câu</span>
                    <span className="badge badge-accent">Từ 161 Câu 9 Chaps</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#38bdf8" }}>
                  {scjpRandom20.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", flex: 1, marginBottom: "1.25rem", lineHeight: 1.55 }}>
                  {scjpRandom20.description}
                </p>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    href="/exam/scjp-random-20"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1.2, background: "linear-gradient(135deg, #0284c7, #0369a1)", border: "none", fontWeight: 600 }}
                    title="Vào phòng thi thử chuẩn Safe Exam Browser (Bốc 20 câu ngẫu nhiên)"
                  >
                    ⏱️ Thi Thử SEB (20 Câu)
                  </Link>
                  <Link
                    href="/quiz/scjp-random-20"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    📖 Luyện Tập (20 Câu)
                  </Link>
                  <Link
                    href="/leaderboard?quiz=scjp-random-20"
                    className="btn btn-ghost btn-sm"
                    style={{ border: "1px solid var(--border)", padding: "0.35rem 0.65rem" }}
                    title="Xem bảng xếp hạng đề Random 20 câu"
                  >
                    🏆
                  </Link>
                </div>
              </div>
            )}

            {/* Card Trọn Bộ 161 Câu */}
            {scjpAll && (
              <div
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "4px solid #4f46e5",
                  background: "linear-gradient(180deg, rgba(79, 70, 229, 0.05) 0%, var(--bg-card) 60%)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "2.3rem" }}>📚</span>
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    <span className="badge badge-primary" style={{ background: "#4f46e5", color: "#fff" }}>Toàn Bộ Kho Đề</span>
                    <span className="badge badge-accent">{scjpAll.count || 161} câu hỏi</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {scjpAll.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", flex: 1, marginBottom: "1.25rem", lineHeight: 1.55 }}>
                  {scjpAll.description}
                </p>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    href="/quiz/scjp-chapter-all"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    📖 Luyện Tập Toàn Bộ (161 Câu)
                  </Link>
                  <Link
                    href="/exam/scjp-chapter-all"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, background: "linear-gradient(135deg, #4f46e5, #4338ca)", border: "none" }}
                    title="Vào phòng thi thử chuẩn Safe Exam Browser cho toàn bộ 161 câu"
                  >
                    ⏱️ Thi Thử (161 Câu)
                  </Link>
                  <Link
                    href="/leaderboard?quiz=scjp-chapter-all"
                    className="btn btn-ghost btn-sm"
                    style={{ border: "1px solid var(--border)", padding: "0.35rem 0.65rem" }}
                    title="Xem bảng xếp hạng toàn bộ câu"
                  >
                    🏆
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Danh sách từng Chapter 1 đến 9 */}
          {scjpChapters.length > 0 && (
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>🗂️</span> Luyện Tập Chuyên Sâu Từng Chương (Chapters 1 – 9)
              </h3>
              <div className="grid-3">
                {scjpChapters.map((q) => (
                  <div
                    key={q.slug}
                    className="card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderTop: `4px solid ${q.color || "var(--primary)"}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                      <span style={{ fontSize: "1.8rem" }}>{q.icon || "📘"}</span>
                      <span className="badge badge-accent">{q.count || 0} câu</span>
                    </div>

                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {q.title}
                    </h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.84rem", flex: 1, marginBottom: "1rem", lineHeight: 1.45 }}>
                      {q.description}
                    </p>

                    <div style={{ display: "flex", gap: "0.45rem" }}>
                      <Link
                        href={`/quiz/${q.slug}`}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                      >
                        📖 Luyện tập
                      </Link>
                      <Link
                        href={`/exam/${q.slug}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        title="Vào phòng thi thử chuẩn Safe Exam Browser"
                      >
                        ⏱️ Thi thử
                      </Link>
                      <Link
                        href={`/leaderboard?quiz=${q.slug}`}
                        className="btn btn-ghost btn-sm"
                        style={{ border: "1px solid var(--border)", padding: "0.35rem 0.65rem" }}
                        title="Xem bảng xếp hạng chương này"
                      >
                        🏆
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                  href={`/quiz/${q.slug}`}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  📖 Luyện tập
                </Link>
                <Link
                  href={`/exam/${q.slug}`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  title="Vào phòng thi thử chuẩn Safe Exam Browser (1 tiếng, xáo câu hỏi & đáp án, toàn màn hình)"
                >
                  ⏱️ Thi thử (SEB)
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

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    href={`/quiz/${q.slug}`}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    📖 Luyện tập
                  </Link>
                  <Link
                    href={`/exam/${q.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    title="Vào phòng thi thử chuẩn Safe Exam Browser (1 tiếng, xáo câu hỏi & đáp án, toàn màn hình)"
                  >
                    ⏱️ Thi thử (SEB)
                  </Link>
                  <Link
                    href={`/leaderboard?quiz=${q.slug}`}
                    className="btn btn-ghost btn-sm"
                    style={{ border: "1px solid var(--border)", padding: "0.35rem 0.65rem" }}
                    title="Xem bảng xếp hạng bộ đề này"
                  >
                    🏆
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
          <Link href="/mistakes" className="card" style={{ borderTop: "4px solid #ff5c7a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "2rem" }}>🩹</span>
              {totalMistakes > 0 && <span className="badge badge-danger">{totalMistakes} câu sai</span>}
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>
              Sổ Tay Ôn Câu Sai
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
              Phân loại câu sai theo từng bộ đề để ôn riêng, hoặc ôn toàn bộ cùng lúc. Câu sẽ tự rời sổ khi bạn đúng 2 lần liên tiếp.
            </p>
            <span style={{ color: "#ff5c7a", fontWeight: 600, fontSize: "0.85rem" }}>Xem sổ câu sai &rarr;</span>
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
