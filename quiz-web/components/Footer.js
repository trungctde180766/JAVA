export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div>
          <strong>JavaQuiz Pro</strong> — Nền tảng ôn thi trắc nghiệm Java OOP &amp; JDBC
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--text-dim)" }}>
          <span>🍃 MongoDB Atlas Online</span>
          <span>▲ Vercel Ready</span>
          <span>⚡ Next.js 16</span>
        </div>
      </div>
    </footer>
  );
}
