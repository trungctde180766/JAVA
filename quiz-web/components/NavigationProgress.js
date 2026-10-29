"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When route finishes changing, complete progress bar
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on links to start progress bar with 0ms visual latency
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || target.target === "_blank") {
        return;
      }
      // If clicking current page without params change, ignore
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl || href === window.location.pathname) {
        return;
      }

      setLoading(true);
      setProgress(25);
      const step1 = setTimeout(() => setProgress(65), 80);
      const step2 = setTimeout(() => setProgress(85), 250);
      return () => {
        clearTimeout(step1);
        clearTimeout(step2);
      };
    };

    document.addEventListener("click", handleAnchorClick, { passive: true });
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 999999,
        pointerEvents: "none",
        background: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #6366f1, #06b6d4, #10b981)",
          boxShadow: "0 0 10px rgba(99, 102, 241, 0.7), 0 0 5px rgba(6, 182, 212, 0.5)",
          transition: progress === 100 ? "width 0.15s ease-out, opacity 0.2s ease" : "width 0.25s ease-out",
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
