"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getHumanAction(pathname) {
  if (!pathname || pathname === "/") return "Đang xem Danh sách bộ đề";
  if (pathname === "/exam/mix") return "🎲 Đang thi thử Mix ngẫu nhiên";
  if (pathname.startsWith("/exam/")) return "⏱️ Đang làm bài thi thử";
  if (pathname.includes("interview")) return "🎯 Luyện phỏng vấn 1-1";
  if (pathname === "/quiz/bookmarks") return "⭐ Đang xem câu hỏi đã lưu";
  if (pathname === "/mistakes" || pathname.startsWith("/quiz/mistakes")) return "🩹 Đang ôn sổ câu sai";
  if (pathname.startsWith("/admin/quiz/")) return "⚙️ Đang chỉnh sửa câu hỏi";
  if (pathname.startsWith("/admin")) return "⚙️ Bảng quản trị hệ thống";
  if (pathname === "/profile") return "👤 Đang xem hồ sơ cá nhân";
  if (pathname.startsWith("/quiz/")) {
    const slug = pathname.replace("/quiz/", "");
    return `📘 Đang ôn tập: ${slug}`;
  }
  return "Đang hoạt động trên web";
}

export default function ActivityTracker({ user }) {
  const pathname = usePathname();
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    if (!user) return;

    const sendHeartbeat = (isOffline = false, customAction = null) => {
      const currentPath = window.location.pathname || pathname;
      const actionText = customAction || getHumanAction(currentPath);

      const payload = {
        pathname: currentPath,
        action: actionText,
        isOffline,
      };

      if (isOffline && typeof navigator !== "undefined" && navigator.sendBeacon) {
        try {
          const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
          navigator.sendBeacon("/api/telemetry/heartbeat?offline=1", blob);
          return;
        } catch {
          // ignore
        }
      }

      fetch("/api/telemetry/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: isOffline,
      }).catch(() => {});
    };

    // Gửi ngay khi mount
    sendHeartbeat(false);

    // Gửi định kỳ mỗi 20 giây để giữ trạng thái Real-time Online
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        sendHeartbeat(false);
      }
    }, 20000);

    // Bắt sự kiện khi chuyển tab hoặc quay lại tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat(false);
      } else {
        sendHeartbeat(false, "Tạm dừng (Mở tab khác)");
      }
    };

    // Bắt sự kiện khi người dùng tắt tab hoặc đóng trình duyệt
    const handleBeforeUnload = () => {
      sendHeartbeat(true, "Rời khỏi trang");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, [user]);

  // Gửi heartbeat khi người dùng đổi trang (pathname change)
  useEffect(() => {
    if (!user) return;
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      fetch("/api/telemetry/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pathname,
          action: getHumanAction(pathname),
          isOffline: false,
        }),
      }).catch(() => {});
    }
  }, [pathname, user]);

  return null;
}

