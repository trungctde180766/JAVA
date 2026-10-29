"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      // Default to dark
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  if (!mounted) {
    return (
      <button className="btn btn-ghost btn-sm" aria-label="Toggle theme" style={{ padding: "0.4rem 0.6rem" }}>
        <span>🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm"
      title={theme === "dark" ? "Chuyển sang Chế độ Sáng (Light Mode)" : "Chuyển sang Chế độ Tối (Dark Mode)"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.4rem 0.65rem",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bg-input)",
        color: "var(--text-main)",
        cursor: "pointer",
        fontSize: "0.85rem",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <span>{theme === "dark" ? "☀️" : "🌙"}</span>
      <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>
        {theme === "dark" ? "Sáng" : "Tối"}
      </span>
    </button>
  );
}
