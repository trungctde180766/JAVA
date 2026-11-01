import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getMistakesByQuiz } from "@/lib/quizzes";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sổ tay câu sai theo từng bộ đề | JavaQuiz Pro",
  description: "Ôn lại câu sai theo từng bộ đề riêng biệt hoặc ôn toàn bộ câu sai của tất cả bộ đề.",
};

export default async function MistakesHubPage() {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error("Error reading user session in MistakesHubPage:", err);
  }
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent("/mistakes")}&reason=required`);
  }

  const { groups, clean, total } = await getMistakesByQuiz(user);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
      {/* Top Banner */}
      <section className="card card-glass" style={{ textAlign: "center", padding: "2.25rem 1.5rem" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>🩹</div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
          Sổ Tay Ôn Câu Sai
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: 720, margin: "0 auto", fontSize: "0.98rem", lineHeight: 1.6 }}>
          Hệ thống phân loại câu sai theo <strong>từng bộ đề cụ thể</strong> để bạn tập trung khắc phục điểm yếu của từng đề.
          Bạn cũng có thể <strong>ôn toàn bộ câu sai</strong> của tất cả các đề cùng lúc!
          (Câu hỏi sẽ tự động rời khỏi sổ khi bạn làm đúng 2 lần liên tiếp).
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "1.5rem", fontSize: "0.92rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ color: "var(--text-dim)" }}>Tổng câu sai cần ôn: </span>
            <strong style={{ color: total > 0 ? "var(--danger)" : "var(--success)", fontSize: "1.05rem" }}>
              {total} câu
            </strong>
          </div>
          <div>
            <span style={{ color: "var(--text-dim)" }}>Số bộ đề có câu sai: </span>
            <strong style={{ color: groups.length > 0 ? "var(--warning)" : "var(--success)", fontSize: "1.05rem" }}>
              {groups.length} bộ đề
            </strong>
          </div>
        </div>
      </section>

      {total === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3.5rem 1.5rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--success)" }}>
            Tuyệt vời! Bạn không còn câu sai nào cần ôn!
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 520, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
            Bạn đã làm chủ toàn bộ các câu hỏi. Hãy tiếp tục luyện tập thêm các đề khác hoặc thử sức với chế độ thi thử bấm giờ!
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">
              &larr; Về danh sách bộ đề
            </Link>
            <Link href="/exam/mix" className="btn btn-secondary">
              ⏱️ Thi thử tổng hợp (SEB)
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Section 1: Nút Ôn toàn bộ câu sai (Tất cả bộ đề) */}
          <div
            className="card card-glass"
            style={{
              padding: "1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
              borderLeft: "6px solid #ff5c7a",
              background: "linear-gradient(90deg, rgba(255, 92, 122, 0.12) 0%, var(--bg-card) 60%)",
            }}
          >
            <div>
              <div style={{ display: "inline-flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <span className="badge badge-danger">Gộp chung toàn bộ</span>
                <span className="badge badge-primary">{total} câu sai</span>
              </div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.3rem" }}>
                📚 Ôn Toàn Bộ Câu Sai (Tất Cả Các Bộ Đề)
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", margin: 0 }}>
                Gom tất cả {total} câu bạn từng làm sai từ {groups.length} bộ đề vào chung 1 phiên luyện tập tổng lực.
              </p>
            </div>
            <Link
              href="/quiz/mistakes"
              id="btn-review-all-mistakes"
              className="btn btn-danger btn-lg"
              style={{ fontWeight: 700, padding: "0.85rem 1.75rem" }}
            >
              🚀 Ôn Toàn Bộ {total} Câu Sai &rarr;
            </Link>
          </div>

          {/* Section 2: Danh sách câu sai theo TỪNG BỘ ĐỀ */}
          <section>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "inline-flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <span className="badge badge-warning">🎯 Ôn Theo Từng Bộ Đề Riêng Biệt</span>
                <span className="badge badge-accent">{groups.length} bộ đề cần xử lý</span>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                Câu Sai Theo Từng Bộ Đề
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
                Chọn một bộ đề bên dưới để chỉ ôn luyện lại đúng những câu sai của bộ đề đó, không bị lẫn với các đề khác!
              </p>
            </div>

            <div className="grid-3">
              {groups.map((g) => {
                const ratioPct = Math.min(100, Math.round((g.count / Math.max(1, g.totalQuestions)) * 100));
                return (
                  <div
                    key={g.slug}
                    className="card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderTop: `4px solid ${g.color || "#ff5c7a"}`,
                      position: "relative",
                      transition: "var(--transition)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "2rem" }}>{g.icon}</span>
                      <span className="badge badge-danger" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                        {g.count} câu sai
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", flex: 1, lineHeight: 1.4 }}>
                      {g.title}
                    </h3>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.35rem" }}>
                        <span>Tỉ lệ câu sai:</span>
                        <strong style={{ color: "var(--danger)" }}>
                          {g.count}/{g.totalQuestions} câu ({ratioPct}%)
                        </strong>
                      </div>
                      <div className="progress-bar-bg" style={{ height: 6 }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${ratioPct}%`,
                            background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/quiz/mistakes-${g.slug}`}
                        id={`btn-mistakes-${g.slug}`}
                        className="btn btn-danger btn-sm"
                        style={{ flex: 1, fontWeight: 700 }}
                      >
                        🩹 Ôn câu sai đề này &rarr;
                      </Link>
                      <Link
                        href={`/quiz/${g.slug}`}
                        className="btn btn-secondary btn-sm"
                        title="Vào luyện lại đề gốc này đầy đủ từ đầu"
                      >
                        📖 Đề gốc
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Các bộ đề không có câu sai */}
          {clean.length > 0 && (
            <section style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.2rem" }}>✅</span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                  Bộ Đề Đã Sạch Câu Sai ({clean.length} bộ đề)
                </h3>
              </div>
              <div className="grid-4">
                {clean.map((c) => (
                  <div
                    key={c.slug}
                    className="card"
                    style={{
                      padding: "0.85rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      opacity: 0.85,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                      <span style={{ fontSize: "1.25rem" }}>{c.icon}</span>
                      <strong style={{ fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {c.title}
                      </strong>
                    </div>
                    <span className="badge badge-success" style={{ fontSize: "0.72rem" }}>
                      ✓ 0 câu sai
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
