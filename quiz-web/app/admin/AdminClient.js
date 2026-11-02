"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminClient({
  currentUser,
  stats: initialStats,
  initialUsers,
  initialQuizzes,
  initialAttempts,
  initialLogs,
  initialSystem,
}) {
  const router = useRouter();
  const [tab, setTab] = useState("server"); // "server" | "logs" | "users" | "quizzes" | "attempts"

  const [stats, setStats] = useState(initialStats);
  const [users, setUsers] = useState(initialUsers);
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [logs, setLogs] = useState(initialLogs || []);
  const [systemInfo, setSystemInfo] = useState(initialSystem || {});

  const [dbLatency, setDbLatency] = useState(null);
  const [pinging, setPinging] = useState(false);
  const [purging, setPurging] = useState(false);

  const [searchUser, setSearchUser] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("all"); // "all" | "online" | "away" | "offline" | "banned"
  const [autoRefreshUsers, setAutoRefreshUsers] = useState(true);
  const [isRefreshingUsers, setIsRefreshingUsers] = useState(false);
  const [lastUsersRefresh, setLastUsersRefresh] = useState(new Date());

  const [searchQuiz, setSearchQuiz] = useState("");
  const [logSearch, setLogSearch] = useState("");
  const [logFilterAction, setLogFilterAction] = useState("all");

  // Inspect User Modal
  const [inspectUser, setInspectUser] = useState(null);

  // Modal for new quiz
  const [showNewQuizModal, setShowNewQuizModal] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDesc, setNewQuizDesc] = useState("");
  const [newQuizIcon, setNewQuizIcon] = useState("📚");
  const [creatingQuiz, setCreatingQuiz] = useState(false);

  // Modal for reset password
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState("");

  // Reseed state
  const [reseeding, setReseeding] = useState(false);

  // Tải danh sách user theo thời gian thực (Real-time live users)
  const fetchLiveUsers = async (notify = false) => {
    setIsRefreshingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok && data.ok) {
        setUsers(data.users);
        if (data.stats) {
          setStats((prev) => ({
            ...prev,
            totalUsers: data.stats.totalUsers,
            onlineUsersNow: data.stats.onlineCount,
          }));
        }
        setLastUsersRefresh(new Date());
        if (inspectUser) {
          const updated = data.users.find((u) => u.id === inspectUser.id);
          if (updated) setInspectUser(updated);
        }
        if (notify) alert("Đã cập nhật trạng thái người dùng thành công!");
      }
    } catch (err) {
      console.error("Lỗi cập nhật users live:", err);
    } finally {
      setIsRefreshingUsers(false);
    }
  };

  // Real-time polling timer: tự động quét mỗi 5s
  useEffect(() => {
    if (!autoRefreshUsers) return;
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchLiveUsers(false);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefreshUsers, inspectUser?.id]);

  // Test DB ping on mount
  useEffect(() => {
    handlePingDb(false);
  }, []);

  const handlePingDb = async (notify = true) => {
    setPinging(true);
    try {
      const res = await fetch("/api/admin/server-stats");
      const data = await res.json();
      if (res.ok && data.ok) {
        setDbLatency(data.system.dbLatencyMs);
        setSystemInfo(data.system);
        setStats((prev) => ({ ...prev, ...data.stats }));
        if (data.logs) setLogs(data.logs);
        if (notify) alert(`Kết nối MongoDB Atlas cực tốt: ${data.system.dbLatencyMs} ms!`);
      }
    } catch {
      if (notify) alert("Lỗi khi kiểm tra kết nối Database");
    } finally {
      setPinging(false);
    }
  };

  const handlePurgeLogs = async (days = 30) => {
    if (!confirm(`Bạn có chắc muốn xóa tất cả nhật ký hoạt động cũ hơn ${days} ngày?`)) return;
    setPurging(true);
    try {
      const res = await fetch("/api/admin/server-stats", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ olderThanDays: days }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Đã dọn dẹp ${data.deletedCount} bản ghi nhật ký thành công!`);
        handlePingDb(false);
      } else {
        alert(data.error || "Không thể xóa log");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setPurging(false);
    }
  };

  const formatUptime = (sec) => {
    if (!sec && sec !== 0) return "—";
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (d > 0) return `${d} ngày ${h}h ${m}m`;
    if (h > 0) return `${h} giờ ${m} phút ${s}s`;
    return `${m} phút ${s} giây`;
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "—";
    const past = new Date(dateStr).getTime();
    const diff = Math.floor((Date.now() - past) / 1000);
    if (diff < 15) return "Vừa xong";
    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  };

  // User actions
  const handleToggleRole = async (u) => {
    if (u.id === currentUser.id) return alert("Không thể đổi quyền của chính bạn");
    const nextRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Đổi quyền của ${u.username} thành "${nextRole}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "role", role: nextRole }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: nextRole } : x)));
        if (inspectUser && inspectUser.id === u.id) {
          setInspectUser((prev) => ({ ...prev, role: nextRole }));
        }
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleToggleBan = async (u) => {
    if (u.id === currentUser.id) return alert("Không thể tự khóa tài khoản của chính bạn");
    const nextBan = !u.banned;
    if (!confirm(`${nextBan ? "Khóa" : "Mở khóa"} tài khoản ${u.username}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ban", banned: nextBan }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, banned: nextBan } : x)));
        if (inspectUser && inspectUser.id === u.id) {
          setInspectUser((prev) => ({ ...prev, banned: nextBan }));
        }
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!resetTargetUser || !newPasswordVal) return;

    try {
      const res = await fetch(`/api/admin/users/${resetTargetUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "password", password: newPasswordVal }),
      });
      if (res.ok) {
        alert(`Đã đổi mật khẩu cho ${resetTargetUser.username} thành công!`);
        setResetTargetUser(null);
        setNewPasswordVal("");
      } else {
        const d = await res.json();
        alert(d.error || "Không thể đổi mật khẩu");
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleDeleteUser = async (u) => {
    if (u.id === currentUser.id) return alert("Không thể xóa tài khoản của chính bạn");
    if (!confirm(`XÓA VĨNH VIỄN tài khoản ${u.username} cùng toàn bộ lịch sử thi?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((x) => x.id !== u.id));
        if (inspectUser && inspectUser.id === u.id) setInspectUser(null);
      }
    } catch {
      alert("Lỗi kết nối");
    }
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) return;
    setCreatingQuiz(true);

    try {
      const res = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newQuizTitle,
          description: newQuizDesc,
          icon: newQuizIcon,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowNewQuizModal(false);
        router.push(`/admin/quiz/${data.slug}`);
      } else {
        alert(data.error || "Không thể tạo bộ đề");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setCreatingQuiz(false);
    }
  };

  const handleReseed = async (mode = "missing") => {
    const text =
      mode === "reset"
        ? "BẠN CÓ CHẮC CHẮN MUỐN RESET? Toàn bộ các bộ đề gốc sẽ được ghi đè về nội dung mặc định!"
        : "Khôi phục lại các bộ đề gốc (nếu có bộ đề nào bị xóa)?";
    if (!confirm(text)) return;

    setReseeding(true);
    try {
      const res = await fetch("/api/admin/reseed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Đã cập nhật ${data.changed} bộ đề thành công!`);
        router.refresh();
      } else {
        alert(data.error || "Lỗi khi khôi phục dữ liệu");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setReseeding(false);
    }
  };

  const handleDeleteAttempt = async (attId) => {
    if (!confirm("Xóa kết quả làm bài này khỏi hệ thống?")) return;
    try {
      const res = await fetch(`/api/admin/attempts/${attId}`, { method: "DELETE" });
      if (res.ok) {
        setAttempts((prev) => prev.filter((x) => x.id !== attId));
      }
    } catch {
      alert("Lỗi khi xóa");
    }
  };

  const onlineUsers = users.filter((u) => u.status === "online");
  const awayUsers = users.filter((u) => u.status === "away");
  const offlineUsers = users.filter((u) => u.status === "offline" || !u.status);
  const bannedUsers = users.filter((u) => u.banned);

  const filteredUsers = users.filter((u) => {
    const q = searchUser.trim().toLowerCase();
    const matchSearch =
      !q ||
      u.username.toLowerCase().includes(q) ||
      (u.lastLoginIp && u.lastLoginIp.includes(q)) ||
      (u.lastOs && u.lastOs.toLowerCase().includes(q)) ||
      (u.lastBrowser && u.lastBrowser.toLowerCase().includes(q)) ||
      (u.currentAction && u.currentAction.toLowerCase().includes(q)) ||
      (u.currentPath && u.currentPath.toLowerCase().includes(q)) ||
      (u.lastCity && u.lastCity.toLowerCase().includes(q));

    if (!matchSearch) return false;

    if (userStatusFilter === "online") return u.status === "online";
    if (userStatusFilter === "away") return u.status === "away";
    if (userStatusFilter === "offline") return u.status === "offline" || !u.status;
    if (userStatusFilter === "banned") return !!u.banned;
    return true;
  });

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchQuiz.toLowerCase())
  );

  const filteredLogs = logs.filter((l) => {
    const matchSearch =
      l.username.toLowerCase().includes(logSearch.toLowerCase()) ||
      (l.ip && l.ip.includes(logSearch)) ||
      (l.os && l.os.toLowerCase().includes(logSearch.toLowerCase())) ||
      (l.browser && l.browser.toLowerCase().includes(logSearch.toLowerCase()));

    if (logFilterAction === "all") return matchSearch;
    return matchSearch && l.action === logFilterAction;
  });

  const getActionBadge = (action) => {
    switch (action) {
      case "LOGIN":
        return <span className="badge badge-success">🔑 Đăng nhập</span>;
      case "REGISTER":
        return <span className="badge badge-primary">✨ Đăng ký</span>;
      case "SUBMIT_QUIZ":
        return <span className="badge badge-accent">⏱️ Nộp bài thi</span>;
      case "BOOKMARK":
        return <span className="badge badge-warning">⭐ Lưu câu hỏi</span>;
      case "ADMIN_BAN_USER":
        return <span className="badge badge-danger">🚫 Khóa tài khoản</span>;
      case "ADMIN_UNBAN_USER":
        return <span className="badge badge-success">🔓 Mở khóa</span>;
      case "ADMIN_ROLE_CHANGE":
        return <span className="badge badge-warning">🛡️ Đổi quyền</span>;
      case "ADMIN_RESET_PASSWORD":
        return <span className="badge badge-warning">🔑 Đổi mật khẩu</span>;
      default:
        return <span className="badge badge-secondary">{action}</span>;
    }
  };

  return (
    <div className="admin-dashboard-root" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner */}
      <div className="card card-glass" style={{ padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>🛡️</span>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Trung Tâm Quản Trị & Giám Sát Server</h1>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginTop: "0.25rem" }}>
              Quản trị viên: <strong>{currentUser.username}</strong> • Trạng thái:{" "}
              <span style={{ color: "var(--success)", fontWeight: 700 }}>● Trực tuyến</span>
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button
              onClick={() => handlePingDb(true)}
              className="btn btn-secondary btn-sm"
              disabled={pinging}
            >
              ⚡ {pinging ? "Đang ping..." : "Ping MongoDB"}
            </button>
            <Link href="/" className="btn btn-secondary btn-sm">
              &larr; Giao diện học viên
            </Link>
          </div>
        </div>

        {/* Stats 5 blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Tổng người dùng</div>
              <span className="badge badge-live-online" style={{ fontSize: "0.72rem", padding: "0.15rem 0.45rem" }}>
                <span className="live-status-dot online" /> {onlineUsers.length} online
              </span>
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--accent)" }}>{stats.totalUsers}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Bộ đề trắc nghiệm</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>{stats.totalQuizzes}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Tổng số câu hỏi</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--success)" }}>{stats.totalQuestions}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Lượt nộp bài</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--warning)" }}>{stats.totalAttempts}</div>
          </div>
          <div className="card" style={{ padding: "1rem", background: "var(--bg-input)" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Độ trễ Database</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: dbLatency !== null ? (dbLatency < 100 ? "var(--success)" : "var(--warning)") : "var(--text-muted)" }}>
              {dbLatency !== null ? `${dbLatency} ms` : "Đang đo..."}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setTab("server")}
          className={`btn btn-sm ${tab === "server" ? "btn-primary" : "btn-ghost"}`}
        >
          🖥️ Giám Sát Server & DB
        </button>
        <button
          onClick={() => setTab("logs")}
          className={`btn btn-sm ${tab === "logs" ? "btn-primary" : "btn-ghost"}`}
        >
          🕵️ Nhật Ký Hoạt Động & Thiết Bị ({logs.length})
        </button>
        <button
          onClick={() => setTab("users")}
          className={`btn btn-sm ${tab === "users" ? "btn-primary" : "btn-ghost"}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
        >
          <span>👥 Quản lý Người dùng ({users.length})</span>
          {onlineUsers.length > 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "rgba(16, 185, 129, 0.15)",
                padding: "0.1rem 0.4rem",
                borderRadius: "999px",
              }}
            >
              <span className="live-status-dot online" style={{ width: 6, height: 6 }} />
              {onlineUsers.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("quizzes")}
          className={`btn btn-sm ${tab === "quizzes" ? "btn-primary" : "btn-ghost"}`}
        >
          📚 Quản lý Bộ đề ({quizzes.length})
        </button>
        <button
          onClick={() => setTab("attempts")}
          className={`btn btn-sm ${tab === "attempts" ? "btn-primary" : "btn-ghost"}`}
        >
          📊 Lịch sử Làm bài ({attempts.length})
        </button>
      </div>

      {/* Tab: Giám Sát Server & DB */}
      {tab === "server" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Server Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {/* Database Health Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🗄️</span> MongoDB Atlas Health
                </h3>
                <span className="badge badge-success">Connected</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Ping Latency:</span>
                  <strong style={{ color: dbLatency < 100 ? "var(--success)" : "var(--warning)" }}>
                    {dbLatency !== null ? `${dbLatency} ms` : "Chưa kiểm tra"}
                  </strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Tên Database:</span>
                  <span>javaquiz</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Cụm Server (Cluster):</span>
                  <span>Cluster0 (AWS us-east-1)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Trạng thái xác thực:</span>
                  <span style={{ color: "var(--success)" }}>TLS/SSL Active</span>
                </div>
              </div>
              <div style={{ marginTop: "1.25rem" }}>
                <button
                  onClick={() => handlePingDb(true)}
                  disabled={pinging}
                  className="btn btn-secondary btn-sm"
                  style={{ width: "100%" }}
                >
                  ⚡ {pinging ? "Đang gửi ping..." : "Kiểm tra phản hồi Database ngay"}
                </button>
              </div>
            </div>

            {/* RAM Memory Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>💾</span> Bộ Nhớ RAM Node.js
                </h3>
                <span className="badge badge-primary">RAM Metrics</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Heap Used / Total:</span>
                    <strong>{systemInfo.memory?.heapUsed || 0} MB / {systemInfo.memory?.heapTotal || 0} MB</strong>
                  </div>
                  <div className="progress-bar-bg" style={{ height: 6 }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${Math.min(100, Math.round(((systemInfo.memory?.heapUsed || 1) / (systemInfo.memory?.heapTotal || 1)) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>RSS (Resident Set Size):</span>
                  <strong>{systemInfo.memory?.rss || 0} MB</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Thời gian chạy (Uptime):</span>
                  <strong style={{ color: "var(--primary)" }}>{formatUptime(systemInfo.uptime)}</strong>
                </div>
              </div>
            </div>

            {/* Runtime & Platform Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⚙️</span> Nền Tảng & Môi Trường
                </h3>
                <span className="badge badge-accent">{systemInfo.environment || "Production"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Phiên bản Node.js:</span>
                  <strong>{systemInfo.nodeVersion || process.version}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Hệ điều hành Server:</span>
                  <strong>{systemInfo.platform || "linux"} ({systemInfo.arch || "x64"})</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Framework:</span>
                  <strong>Next.js 16 (App Router / Turbopack)</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Đang phục vụ:</span>
                  <span>Vercel Edge Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Tools Card */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              🛠️ Hộp Công Cụ Bảo Trì & Tối Ưu Hệ Thống
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
              Các tác vụ quản trị khẩn cấp và dọn dẹp tài nguyên cơ sở dữ liệu.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                onClick={() => handlePurgeLogs(30)}
                disabled={purging}
                className="btn btn-secondary btn-sm"
              >
                🧹 {purging ? "Đang xóa..." : "Dọn dẹp nhật ký cũ (> 30 ngày)"}
              </button>
              <button
                onClick={() => handleReseed("missing")}
                disabled={reseeding}
                className="btn btn-secondary btn-sm"
              >
                📥 Khôi phục bộ đề thiếu
              </button>
              <button
                onClick={() => handleReseed("reset")}
                disabled={reseeding}
                className="btn btn-danger btn-sm"
              >
                ⚠️ Reset toàn bộ câu hỏi gốc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Nhật Ký Hoạt Động & Thiết Bị (Live Audit Logs) */}
      {tab === "logs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Controls Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flex: 1, minWidth: 260 }}>
              <input
                type="text"
                placeholder="Tìm theo user, IP, thiết bị, hệ điều hành..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="form-input"
                style={{ maxWidth: 350 }}
              />
              <select
                value={logFilterAction}
                onChange={(e) => setLogFilterAction(e.target.value)}
                className="form-input"
                style={{ width: "auto" }}
              >
                <option value="all">Mọi hành động</option>
                <option value="LOGIN">Chỉ Đăng nhập (LOGIN)</option>
                <option value="SUBMIT_QUIZ">Chỉ Nộp bài thi (SUBMIT_QUIZ)</option>
                <option value="REGISTER">Chỉ Đăng ký mới (REGISTER)</option>
                <option value="BOOKMARK">Chỉ Lưu câu hỏi (BOOKMARK)</option>
                <option value="ADMIN_BAN_USER">Khóa tài khoản</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handlePingDb(true)} className="btn btn-secondary btn-sm">
                🔄 Làm mới logs
              </button>
              <button onClick={() => handlePurgeLogs(30)} className="btn btn-secondary btn-sm">
                🧹 Xóa log &gt; 30 ngày
              </button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="card" style={{ padding: 0, overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Học viên</th>
                  <th>Hành động</th>
                  <th>Thiết bị &amp; Hệ điều hành</th>
                  <th>Trình duyệt</th>
                  <th>Địa chỉ IP &amp; Vị trí</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                      Chưa có bản ghi hoạt động nào phù hợp với bộ lọc
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                        <div style={{ fontWeight: 600 }}>{timeAgo(log.createdAt)}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                          {log.createdAt ? new Date(log.createdAt).toLocaleTimeString("vi-VN") : ""}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        <span>👤 {log.username}</span>
                      </td>
                      <td>{getActionBadge(log.action)}</td>
                      <td>
                        <span style={{ fontSize: "0.85rem" }}>
                          {log.device === "Mobile" ? "📱" : log.device === "Tablet" ? "📟" : "💻"}{" "}
                          <strong>{log.os}</strong>
                        </span>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{log.device}</div>
                      </td>
                      <td style={{ fontSize: "0.85rem" }}>{log.browser}</td>
                      <td>
                        <div style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{log.ip}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                          📍 {log.city}, {log.country}
                        </div>
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        {log.action === "SUBMIT_QUIZ" && (
                          <span>
                            Đề: <strong>{log.details?.quizSlug}</strong> ({log.details?.score} câu •{" "}
                            <strong style={{ color: "var(--success)" }}>{log.details?.percent}%</strong>)
                          </span>
                        )}
                        {log.action === "BOOKMARK" && <span>Lưu câu: <code>{log.details?.questionKey}</code></span>}
                        {log.action === "LOGIN" && <span>Đăng nhập quyền: {log.details?.role || "user"}</span>}
                        {log.action?.startsWith("ADMIN_") && (
                          <span>Tác động tới: <strong>{log.details?.targetUser}</strong></span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Quản lý Người dùng (Real-Time Live Presence & Device Management) */}
      {tab === "users" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Quick Real-Time Status Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem" }}>
            <div
              className="card"
              onClick={() => setUserStatusFilter("all")}
              style={{
                padding: "0.85rem 1.1rem",
                background: userStatusFilter === "all" ? "var(--bg-card-hover)" : "var(--bg-input)",
                border: userStatusFilter === "all" ? "1px solid var(--primary)" : "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Tổng người dùng</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.2rem" }}>
                {users.length}
              </div>
            </div>

            <div
              className="card"
              onClick={() => setUserStatusFilter(userStatusFilter === "online" ? "all" : "online")}
              style={{
                padding: "0.85rem 1.1rem",
                background: userStatusFilter === "online" ? "rgba(16, 185, 129, 0.18)" : "var(--bg-input)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 700 }}>
                  🟢 Đang online
                </span>
                <span className="live-status-dot online" />
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--success)", marginTop: "0.2rem" }}>
                {onlineUsers.length}
              </div>
            </div>

            <div
              className="card"
              onClick={() => setUserStatusFilter(userStatusFilter === "away" ? "all" : "away")}
              style={{
                padding: "0.85rem 1.1rem",
                background: userStatusFilter === "away" ? "rgba(245, 158, 11, 0.18)" : "var(--bg-input)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--warning)", fontWeight: 700 }}>
                  🟡 Vừa rời đi (&lt; 5p)
                </span>
                <span className="live-status-dot away" />
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--warning)", marginTop: "0.2rem" }}>
                {awayUsers.length}
              </div>
            </div>

            <div
              className="card"
              onClick={() => setUserStatusFilter(userStatusFilter === "offline" ? "all" : "offline")}
              style={{
                padding: "0.85rem 1.1rem",
                background: userStatusFilter === "offline" ? "rgba(148, 163, 184, 0.18)" : "var(--bg-input)",
                border: userStatusFilter === "offline" ? "1px solid var(--text-dim)" : "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>⚪ Ngoại tuyến</span>
                <span className="live-status-dot offline" />
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-muted)", marginTop: "0.2rem" }}>
                {offlineUsers.length}
              </div>
            </div>

            <div
              className="card"
              onClick={() => setUserStatusFilter(userStatusFilter === "banned" ? "all" : "banned")}
              style={{
                padding: "0.85rem 1.1rem",
                background: userStatusFilter === "banned" ? "rgba(239, 68, 68, 0.18)" : "var(--bg-input)",
                border: userStatusFilter === "banned" ? "1px solid var(--danger)" : "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "var(--danger)" }}>🚫 Bị khóa</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--danger)", marginTop: "0.2rem" }}>
                {bannedUsers.length}
              </div>
            </div>
          </div>

          {/* Search, Status Filters & Real-Time Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", flex: 1 }}>
              <input
                type="text"
                placeholder="Tìm theo tên, IP, hệ điều hành, hành động..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="form-input"
                style={{ maxWidth: 320 }}
              />

              {/* Status Filter Pills */}
              <div style={{ display: "inline-flex", gap: "0.35rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setUserStatusFilter("all")}
                  className={`btn btn-sm ${userStatusFilter === "all" ? "btn-primary" : "btn-ghost"}`}
                >
                  Tất cả ({users.length})
                </button>
                <button
                  onClick={() => setUserStatusFilter("online")}
                  className={`btn btn-sm ${userStatusFilter === "online" ? "btn-success" : "btn-ghost"}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                >
                  <span className="live-status-dot online" />
                  <span>Online ({onlineUsers.length})</span>
                </button>
                <button
                  onClick={() => setUserStatusFilter("away")}
                  className={`btn btn-sm ${userStatusFilter === "away" ? "btn-secondary" : "btn-ghost"}`}
                >
                  🟡 Vừa rời ({awayUsers.length})
                </button>
                <button
                  onClick={() => setUserStatusFilter("offline")}
                  className={`btn btn-sm ${userStatusFilter === "offline" ? "btn-secondary" : "btn-ghost"}`}
                >
                  ⚪ Ngoại tuyến ({offlineUsers.length})
                </button>
                {bannedUsers.length > 0 && (
                  <button
                    onClick={() => setUserStatusFilter("banned")}
                    className={`btn btn-sm ${userStatusFilter === "banned" ? "btn-danger" : "btn-ghost"}`}
                  >
                    🚫 Khóa ({bannedUsers.length})
                  </button>
                )}
              </div>
            </div>

            {/* Auto-Refresh Toggle & Manual Trigger */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <button
                onClick={() => setAutoRefreshUsers(!autoRefreshUsers)}
                className={`btn btn-sm ${autoRefreshUsers ? "btn-secondary" : "btn-ghost"}`}
                title={autoRefreshUsers ? "Bấm để tạm dừng tự động làm mới real-time" : "Bấm để bật tự động làm mới real-time mỗi 5 giây"}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
              >
                {autoRefreshUsers ? (
                  <>
                    <span className="live-status-dot online" style={{ width: 8, height: 8 }} />
                    <span style={{ fontWeight: 600 }}>Real-time: Bật (5s)</span>
                  </>
                ) : (
                  <>
                    <span className="live-status-dot offline" style={{ width: 8, height: 8 }} />
                    <span>Real-time: Tắt</span>
                  </>
                )}
              </button>

              <button
                onClick={() => fetchLiveUsers(true)}
                disabled={isRefreshingUsers}
                className="btn btn-secondary btn-sm"
                title="Làm mới danh sách ngay lập tức"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <span className={isRefreshingUsers ? "spinning-icon" : ""}>🔄</span>
                <span>Làm mới</span>
              </button>

              <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", whiteSpace: "nowrap" }}>
                {lastUsersRefresh ? `${lastUsersRefresh.toLocaleTimeString("vi-VN")}` : ""}
              </span>
            </div>
          </div>

          {/* User Presence Table - Đảm bảo vừa khít 100% trang, không bị cuộn ngang */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="data-table admin-users-table" style={{ width: "100%", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Người dùng</th>
                  <th style={{ width: "25%" }}>Hoạt động Real-time</th>
                  <th style={{ width: "25%" }}>Thiết bị &amp; IP (Vị trí)</th>
                  <th style={{ width: "12%" }}>Học tập &amp; Lần cuối</th>
                  <th style={{ width: "18%", textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                      Không tìm thấy người dùng nào phù hợp với bộ lọc hiện tại.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isMe = u.id === currentUser.id;
                    const isOnline = u.status === "online";
                    const isAway = u.status === "away";
                    return (
                      <tr
                        key={u.id}
                        style={{
                          background: isOnline ? "rgba(16, 185, 129, 0.04)" : undefined,
                          transition: "background 0.3s ease",
                        }}
                      >
                        {/* 1. Người dùng & Vai trò */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span
                              className={`live-status-dot ${u.status || "offline"}`}
                              title={isOnline ? "🟢 Đang trực tuyến" : isAway ? "🟡 Vừa rời đi (< 5 phút)" : "⚪ Ngoại tuyến"}
                            />
                            <span style={{ fontWeight: 700, fontSize: "0.92rem", wordBreak: "break-all" }}>{u.username}</span>
                            {isMe && <span style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: 600 }}>(bạn)</span>}
                          </div>
                          <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.25rem", alignItems: "center", flexWrap: "wrap" }}>
                            <span className={`badge ${u.role === "admin" ? "badge-warning" : "badge-primary"}`} style={{ fontSize: "0.72rem", padding: "0.1rem 0.45rem" }}>
                              {u.role === "admin" ? "🛡️ admin" : "user"}
                            </span>
                            {u.banned && (
                              <span className="badge badge-danger" style={{ fontSize: "0.72rem", padding: "0.1rem 0.45rem" }}>
                                🚫 Bị khóa
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 2. Hoạt động Real-time */}
                        <td>
                          {isOnline ? (
                            <div>
                              <div className="badge badge-live-online" style={{ fontSize: "0.76rem", padding: "0.12rem 0.48rem", marginBottom: "0.2rem" }}>
                                <span className="live-status-dot online" />
                                <span>Đang trực tuyến</span>
                              </div>
                              <div
                                style={{
                                  fontSize: "0.82rem",
                                  fontWeight: 600,
                                  color: "var(--text-main)",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={u.currentAction || "Đang duyệt web"}
                              >
                                {u.currentAction || "Đang duyệt bài"}
                              </div>
                              <div style={{ fontSize: "0.74rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>
                                ⏱️ {u.diffSec < 15 ? "Vừa xong" : `${u.diffSec}s trước`} {u.currentPath ? `• ${u.currentPath}` : ""}
                              </div>
                            </div>
                          ) : isAway ? (
                            <div>
                              <div className="badge badge-live-away" style={{ fontSize: "0.76rem", padding: "0.12rem 0.48rem", marginBottom: "0.2rem" }}>
                                <span className="live-status-dot away" />
                                <span>Vừa rời đi</span>
                              </div>
                              <div
                                style={{
                                  fontSize: "0.8rem",
                                  color: "var(--text-muted)",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={u.currentAction || "Không thao tác"}
                              >
                                {u.currentAction || "Không thao tác"}
                              </div>
                              <div style={{ fontSize: "0.74rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>
                                ⏱️ {timeAgo(u.lastActiveAt || u.lastLoginAt)}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="badge badge-live-offline" style={{ fontSize: "0.76rem", padding: "0.12rem 0.48rem", marginBottom: "0.2rem" }}>
                                <span className="live-status-dot offline" />
                                <span>Ngoại tuyến</span>
                              </div>
                              <div style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>
                                Lần cuối: {timeAgo(u.lastActiveAt || u.lastLoginAt || u.createdAt)}
                              </div>
                            </div>
                          )}
                        </td>

                        {/* 3. Thiết bị, IP & Vị trí */}
                        <td>
                          <div style={{ fontSize: "0.84rem", fontWeight: 600 }}>
                            {u.lastDevice === "Mobile" ? "📱" : "💻"} {u.lastOs}{" "}
                            <span style={{ fontWeight: 400, color: "var(--text-dim)", fontSize: "0.78rem" }}>
                              ({u.lastBrowser})
                            </span>
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.2rem", display: "flex", gap: "0.35rem", alignItems: "center", flexWrap: "wrap" }}>
                            <code style={{ fontSize: "0.76rem" }}>{u.lastLoginIp}</code>
                            <span>•</span>
                            <span title={`${u.lastCity}, ${u.lastCountry}`}>
                              📍 {u.lastCity ? `${u.lastCity}, ${u.lastCountry}` : "Việt Nam"}
                            </span>
                          </div>
                        </td>

                        {/* 4. Tiến độ học tập & Lần đăng nhập */}
                        <td>
                          <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                            {u.mistakesCount > 0 ? (
                              <span style={{ color: "var(--warning)" }}>{u.mistakesCount} câu sai</span>
                            ) : (
                              <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>0 câu sai</span>
                            )}
                          </div>
                          <div style={{ fontSize: "0.74rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                            {timeAgo(u.lastLoginAt || u.createdAt)}
                          </div>
                        </td>

                        {/* 5. Thao tác gọn gàng, không bị tràn màn hình */}
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.25rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                            <button
                              onClick={() => setInspectUser(u)}
                              className="btn btn-secondary btn-sm"
                              title="Soi máy & Chi tiết hoạt động"
                              style={{ padding: "0.25rem 0.5rem", fontSize: "0.78rem" }}
                            >
                              🔍 Soi
                            </button>
                            <button
                              onClick={() => handleToggleRole(u)}
                              disabled={isMe}
                              className="btn btn-secondary btn-sm"
                              title={u.role === "admin" ? "Hạ quyền xuống User" : "Cấp quyền Admin"}
                              style={{ padding: "0.25rem 0.45rem", fontSize: "0.78rem" }}
                            >
                              {u.role === "admin" ? "Hạ quyền" : "Cấp Admin"}
                            </button>
                            <button
                              onClick={() => handleToggleBan(u)}
                              disabled={isMe}
                              className={`btn btn-sm ${u.banned ? "btn-success" : "btn-secondary"}`}
                              title={u.banned ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                              style={{ padding: "0.25rem 0.45rem", fontSize: "0.78rem" }}
                            >
                              {u.banned ? "Mở" : "Khóa"}
                            </button>
                            <button
                              onClick={() => {
                                setResetTargetUser(u);
                                setNewPasswordVal("");
                              }}
                              className="btn btn-secondary btn-sm"
                              title="Đặt lại mật khẩu mới"
                              style={{ padding: "0.25rem 0.45rem", fontSize: "0.78rem" }}
                            >
                              Đổi MK
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u)}
                              disabled={isMe}
                              className="btn btn-danger btn-sm"
                              title="Xóa tài khoản"
                              style={{ padding: "0.25rem 0.45rem", fontSize: "0.78rem" }}
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Quản lý Bộ đề */}
      {tab === "quizzes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <input
              type="text"
              placeholder="Tìm kiếm bộ đề..."
              value={searchQuiz}
              onChange={(e) => setSearchQuiz(e.target.value)}
              className="form-input"
              style={{ maxWidth: 300 }}
            />

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                onClick={() => handleReseed("reset")}
                disabled={reseeding}
                className="btn btn-secondary btn-sm"
                title="Khôi phục lại toàn bộ bộ đề gốc nếu bạn lỡ xóa hoặc sửa sai"
              >
                🔄 {reseeding ? "Đang xử lý..." : "Reset bộ đề gốc"}
              </button>
              <button
                onClick={() => setShowNewQuizModal(true)}
                className="btn btn-primary btn-sm"
              >
                ➕ Thêm bộ đề mới
              </button>
            </div>
          </div>

          <div className="grid-3">
            {filteredQuizzes.map((q) => (
              <div
                key={q.slug}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: `4px solid ${q.color || "var(--primary)"}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "2rem" }}>{q.icon || "📘"}</span>
                  <span className="badge badge-primary">{q.count} câu hỏi</span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {q.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", flex: 1, marginBottom: "1rem" }}>
                  {q.description || "Chưa có mô tả"}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                    Mã: <code>{q.slug}</code>
                  </span>
                  <Link href={`/admin/quiz/${q.slug}`} className="btn btn-primary btn-sm">
                    Sửa câu hỏi &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Lịch sử nộp bài */}
      {tab === "attempts" && (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Bộ đề</th>
                <th>Chế độ</th>
                <th>Kết quả</th>
                <th>Tỉ lệ</th>
                <th>Thời gian</th>
                <th>Thời điểm nộp</th>
                <th style={{ textAlign: "right" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.username}</td>
                  <td>{a.quizTitle}</td>
                  <td>
                    <span className={`badge ${a.mode === "exam" ? "badge-danger" : "badge-accent"}`}>
                      {a.mode === "exam" ? "Thi thử" : "Luyện tập"}
                    </span>
                  </td>
                  <td>
                    {a.correct} / {a.total}
                  </td>
                  <td>
                    <strong style={{ color: a.percent >= 75 ? "var(--success)" : a.percent >= 50 ? "var(--warning)" : "var(--danger)" }}>
                      {a.percent}%
                    </strong>
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>
                    {Math.floor(a.durationSec / 60)}p {a.durationSec % 60}s
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                    {a.createdAt ? new Date(a.createdAt).toLocaleString("vi-VN") : "—"}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleDeleteAttempt(a.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Soi máy & Thông tin thiết bị người dùng (User Inspector Modal) */}
      {inspectUser && (
        <div className="modal-overlay" onClick={() => setInspectUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>🔍</span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Thông Tin Thiết Bị: {inspectUser.username}
                </h3>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setInspectUser(null)}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Real-Time Live Presence Card */}
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  background:
                    inspectUser.status === "online"
                      ? "rgba(16, 185, 129, 0.12)"
                      : inspectUser.status === "away"
                      ? "rgba(245, 158, 11, 0.12)"
                      : "rgba(148, 163, 184, 0.1)",
                  border: `1px solid ${
                    inspectUser.status === "online"
                      ? "rgba(16, 185, 129, 0.35)"
                      : inspectUser.status === "away"
                      ? "rgba(245, 158, 11, 0.35)"
                      : "rgba(148, 163, 184, 0.25)"
                  }`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    className={`live-status-dot ${inspectUser.status || "offline"}`}
                    style={{ width: 12, height: 12 }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1rem",
                        color:
                          inspectUser.status === "online"
                            ? "var(--success)"
                            : inspectUser.status === "away"
                            ? "var(--warning)"
                            : "var(--text-muted)",
                      }}
                    >
                      {inspectUser.status === "online"
                        ? "🟢 ĐANG TRỰC TUYẾN (Real-time Online)"
                        : inspectUser.status === "away"
                        ? "🟡 VỪA RỜI ĐI / CHỜ"
                        : "⚪ NGOẠI TUYẾN (Offline)"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-main)", marginTop: "0.2rem" }}>
                      <strong>Hoạt động:</strong> {inspectUser.currentAction || "Không có thao tác cụ thể"}
                      {inspectUser.currentPath && (
                        <code style={{ marginLeft: "0.4rem", color: "var(--accent)" }}>{inspectUser.currentPath}</code>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right", fontSize: "0.8rem", color: "var(--text-dim)" }}>
                  <div>Phản hồi: <strong>{timeAgo(inspectUser.lastActiveAt || inspectUser.lastLoginAt)}</strong></div>
                  {inspectUser.diffSec !== undefined && inspectUser.diffSec < 300 && (
                    <div style={{ fontSize: "0.74rem", color: "var(--accent)" }}>{inspectUser.diffSec}s trước</div>
                  )}
                </div>
              </div>

              {/* Device Box */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-input)", border: "1px solid var(--border)" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--accent)" }}>
                  💻 Cấu Hình Thiết Bị &amp; Trình Duyệt Gần Nhất
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.88rem" }}>
                  <div>Loại máy: <strong>{inspectUser.lastDevice || "Desktop"}</strong></div>
                  <div>Hệ điều hành: <strong>{inspectUser.lastOs || "Khác"}</strong></div>
                  <div>Trình duyệt: <strong>{inspectUser.lastBrowser || "Khác"}</strong></div>
                  <div>Vị trí: <strong>{inspectUser.lastCity || "Việt Nam"}, {inspectUser.lastCountry || "VN"}</strong></div>
                </div>
              </div>

              {/* IP Box */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-input)", border: "1px solid var(--border)" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>
                  🌐 Lịch Sử Địa Chỉ IP Đã Dùng
                </h4>
                <div style={{ fontSize: "0.88rem", marginBottom: "0.4rem" }}>
                  IP gần nhất: <code style={{ color: "var(--success)", fontWeight: 700 }}>{inspectUser.lastLoginIp}</code>
                </div>
                {inspectUser.knownIps && inspectUser.knownIps.length > 0 && (
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    {inspectUser.knownIps.map((ip) => (
                      <span key={ip} className="kbd-badge">{ip}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* User Stats Box */}
              <div style={{ padding: "1rem", borderRadius: "var(--radius-sm)", background: "var(--bg-input)", border: "1px solid var(--border)" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  📊 Hoạt Động &amp; Tiến Độ
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.88rem" }}>
                  <div>Vai trò: <span className="badge badge-primary">{inspectUser.role}</span></div>
                  <div>Trạng thái: <span className={`badge ${inspectUser.banned ? "badge-danger" : "badge-success"}`}>{inspectUser.banned ? "Bị khóa" : "Bình thường"}</span></div>
                  <div>Sổ câu sai: <strong>{inspectUser.mistakesCount} câu</strong></div>
                  <div>Đã lưu: <strong>{inspectUser.bookmarksCount} câu</strong></div>
                  <div>Ngày tham gia: <strong>{inspectUser.createdAt ? new Date(inspectUser.createdAt).toLocaleDateString("vi-VN") : "—"}</strong></div>
                  <div>Lần cuối trực tuyến: <strong>{timeAgo(inspectUser.lastLoginAt)}</strong></div>
                </div>
              </div>

              {/* Action Buttons in Inspect */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => handleToggleBan(inspectUser)}
                  className={`btn btn-sm ${inspectUser.banned ? "btn-success" : "btn-danger"}`}
                >
                  {inspectUser.banned ? "Mở khóa tài khoản" : "Khóa tài khoản này"}
                </button>
                <button
                  onClick={() => {
                    setResetTargetUser(inspectUser);
                    setNewPasswordVal("");
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Đổi mật khẩu
                </button>
                <button
                  onClick={() => setInspectUser(null)}
                  className="btn btn-primary btn-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Tạo bộ đề mới */}
      {showNewQuizModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>
              Tạo Bộ Đề Mới
            </h3>
            <form onSubmit={handleCreateQuiz}>
              <div className="form-group">
                <label className="form-label">Tên bộ đề</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Quiz 4 - Java Collections & Streams"
                  className="form-input"
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mô tả ngắn</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ôn tập List, Set, Map, Stream API..."
                  className="form-input"
                  value={newQuizDesc}
                  onChange={(e) => setNewQuizDesc(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Icon biểu tượng (emoji)</label>
                <input
                  type="text"
                  maxLength={4}
                  className="form-input"
                  value={newQuizIcon}
                  onChange={(e) => setNewQuizIcon(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowNewQuizModal(false)}
                  className="btn btn-secondary"
                  disabled={creatingQuiz}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={creatingQuiz}
                >
                  {creatingQuiz ? "Đang tạo..." : "Tạo & Chỉnh sửa câu hỏi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Đổi mật khẩu học viên */}
      {resetTargetUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Đổi Mật Khẩu Cho {resetTargetUser.username}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
              Nhập mật khẩu mới cho tài khoản này (tối thiểu 6 ký tự).
            </p>
            <form onSubmit={handleSetPassword}>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Mật khẩu mới..."
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  autoFocus
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button
                  type="button"
                  onClick={() => setResetTargetUser(null)}
                  className="btn btn-secondary"
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
