"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // Cất toàn bộ Header khi vào thi Safe Exam Browser (/exam/...) để chống bấm qua trang khác
  if (pathname?.startsWith("/exam")) {
    return null;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Left: Brand logo */}
        <div className="nav-left">
          <Link href="/" className="nav-brand">
            <span>☕</span>
            <span>JavaQuiz Pro</span>
          </Link>
        </div>

        {/* Center: Main navigation pills centered on the page */}
        <nav className="nav-center">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            <span>📚</span>
            <span>Bộ đề</span>
          </Link>
          <Link href="/quiz/interview-all?mode=practice" className={`nav-link ${pathname.includes("interview") ? "active" : ""}`}>
            <span>🎯</span>
            <span>Phỏng vấn 1-1</span>
          </Link>
          <Link href="/exam/mix" className={`nav-link ${pathname.startsWith("/exam") ? "active" : ""}`}>
            <span>🎲</span>
            <span>Thi thử Mix</span>
          </Link>
          <Link href="/quiz/mistakes" className={`nav-link ${pathname === "/quiz/mistakes" ? "active" : ""}`}>
            <span>🩹</span>
            <span>Ôn câu sai</span>
          </Link>
          <Link href="/quiz/bookmarks" className={`nav-link ${pathname === "/quiz/bookmarks" ? "active" : ""}`}>
            <span>⭐</span>
            <span>Đã lưu</span>
          </Link>

          {user?.role === "admin" && (
            <Link href="/admin" className={`nav-link ${pathname.startsWith("/admin") ? "active" : ""}`}>
              <span>⚙️</span>
              <span>Quản trị</span>
              <span className="nav-badge-admin">Admin</span>
            </Link>
          )}
        </nav>

        {/* Right: Theme toggle & Auth actions */}
        <div className="nav-right">
          <ThemeToggle />

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Link href="/profile" className={`nav-link ${pathname === "/profile" ? "active" : ""}`}>
                <span>👤</span>
                <span style={{ fontWeight: 600 }}>{user.username}</span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="btn btn-ghost btn-sm"
                title="Đăng xuất"
                style={{ padding: "0.35rem 0.65rem" }}
              >
                {loggingOut ? "..." : "Thoát"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <Link href="/login" className="btn btn-secondary btn-sm">
                Đăng nhập
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
