"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const reason = searchParams.get("reason");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
      } else {
        const target = redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : "/";
        if (data.role === "admin" && target === "/") {
          router.push("/admin");
        } else {
          router.push(target);
        }
        router.refresh();
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-glass" style={{ padding: "2.25rem 2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>🔐</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Đăng Nhập</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Đăng nhập để vào phòng thi, làm bài luyện tập và lưu tiến độ
        </p>
      </div>

      {reason === "required" && (
        <div
          style={{
            padding: "0.85rem 1rem",
            borderRadius: "var(--radius-sm)",
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            color: "#fcd34d",
            fontSize: "0.88rem",
            marginBottom: "1.25rem",
            lineHeight: 1.5,
          }}
        >
          🔒 <strong>Yêu cầu đăng nhập:</strong> Bạn bắt buộc phải đăng nhập tài khoản trước khi vào học hoặc làm bài thi!
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-sm)",
            background: "var(--danger-light)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#fca5a5",
            fontSize: "0.88rem",
            marginBottom: "1.25rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            required
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập..."
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "0.5rem" }}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập ngay"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        Chưa có tài khoản?{" "}
        <Link
          href={`/register${redirectUrl && redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          style={{ color: "var(--primary)", fontWeight: 600 }}
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 420, margin: "3rem auto" }}>
      <Suspense fallback={<div className="card" style={{ padding: "2rem", textAlign: "center" }}>Đang tải...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
