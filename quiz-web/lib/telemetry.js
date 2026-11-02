import { toId } from "./db.js";

export function parseUserAgent(ua = "") {
  const str = String(ua || "");
  let device = "Desktop";
  let os = "Khác";
  let browser = "Khác";

  // Device detection
  if (/iPad|Tablet/i.test(str)) {
    device = "Tablet";
  } else if (/Mobile|Android|iPhone|iPod/i.test(str)) {
    device = "Mobile";
  }

  // OS detection
  if (/Windows NT 10.0/i.test(str)) os = "Windows 10/11";
  else if (/Windows NT 6.3/i.test(str)) os = "Windows 8.1";
  else if (/Windows NT 6.1/i.test(str)) os = "Windows 7";
  else if (/Windows NT/i.test(str)) os = "Windows";
  else if (/iPhone|iPad|iPod/i.test(str)) os = "iOS";
  else if (/Mac OS X/i.test(str)) os = "macOS";
  else if (/Android/i.test(str)) os = "Android";
  else if (/Linux/i.test(str)) os = "Linux";

  // Browser detection (order matters because Chrome UA includes Safari)
  if (/Edg\//i.test(str)) browser = "Microsoft Edge";
  else if (/OPR\/|Opera\//i.test(str)) browser = "Opera";
  else if (/Chrome\//i.test(str) && !/Chromium\//i.test(str)) browser = "Google Chrome";
  else if (/Safari\//i.test(str) && !/Chrome\//i.test(str)) browser = "Apple Safari";
  else if (/Firefox\//i.test(str)) browser = "Mozilla Firefox";

  return { device, os, browser };
}

export function getClientInfo(req) {
  if (!req || !req.headers) {
    return {
      ip: "127.0.0.1",
      country: "VN",
      city: "Local",
      device: "Desktop",
      os: "Windows",
      browser: "Chrome",
      userAgent: "",
    };
  }

  // Extract IP
  const forwarded = req.headers.get("x-forwarded-for");
  let ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";
  if (ip === "::1") ip = "127.0.0.1";

  // Geo info from Vercel edge headers
  const country = req.headers.get("x-vercel-ip-country") || "VN";
  const city = req.headers.get("x-vercel-ip-city") ? decodeURIComponent(req.headers.get("x-vercel-ip-city")) : "Việt Nam";

  // User-Agent info
  const userAgent = req.headers.get("user-agent") || "";
  const { device, os, browser } = parseUserAgent(userAgent);

  return { ip, country, city, userAgent, device, os, browser };
}

export async function logActivity(db, { userId, username, action, details = {}, req }) {
  try {
    const client = getClientInfo(req);
    const entry = {
      userId: userId ? toId(userId) : null,
      username: username || "Khách",
      action, // LOGIN, REGISTER, SUBMIT_QUIZ, BOOKMARK, ADMIN_BAN, ADMIN_ROLE, ADMIN_RESET_PWD
      details,
      ip: client.ip,
      country: client.country,
      city: client.city,
      device: client.device,
      os: client.os,
      browser: client.browser,
      userAgent: client.userAgent,
      createdAt: new Date(),
    };

    await db.collection("activity_logs").insertOne(entry);

    if (userId) {
      const uId = toId(userId);
      if (uId) {
        const updateDoc = {
          lastLoginAt: new Date(),
          lastActiveAt: new Date(),
          isOnline: action !== "LOGOUT",
          lastLoginIp: client.ip,
          lastDevice: client.device,
          lastOs: client.os,
          lastBrowser: client.browser,
          lastCity: client.city,
          lastCountry: client.country,
        };

        if (action === "LOGIN") {
          updateDoc.currentAction = "Đăng nhập hệ thống";
        } else if (action === "REGISTER") {
          updateDoc.currentAction = "Đăng ký tài khoản";
        } else if (action === "SUBMIT_QUIZ") {
          updateDoc.currentAction = `Nộp bài: ${details.quizTitle || details.quizSlug || "Thi thử"} (${details.score || ""})`;
        } else if (action === "BOOKMARK") {
          updateDoc.currentAction = "Lưu câu hỏi";
        } else if (action === "LOGOUT") {
          updateDoc.currentAction = "Đã đăng xuất";
        }

        await db.collection("users").updateOne(
          { _id: uId },
          {
            $set: updateDoc,
            $addToSet: {
              knownIps: client.ip,
            },
          }
        );
      }
    }
  } catch (err) {
    console.error("Lỗi khi ghi nhật ký hoạt động (Telemetry):", err);
  }
}

export async function recordHeartbeat(db, { userId, action, pathname, isOffline = false, req }) {
  if (!userId) return null;
  const uId = toId(userId);
  if (!uId) return null;

  try {
    const client = getClientInfo(req);
    const now = new Date();

    const setFields = {
      lastActiveAt: now,
      isOnline: !isOffline,
    };

    if (client.ip && client.ip !== "127.0.0.1") {
      setFields.lastLoginIp = client.ip;
    }
    if (client.device) setFields.lastDevice = client.device;
    if (client.os) setFields.lastOs = client.os;
    if (client.browser) setFields.lastBrowser = client.browser;
    if (client.city) setFields.lastCity = client.city;
    if (client.country) setFields.lastCountry = client.country;

    if (action) setFields.currentAction = action;
    if (pathname) setFields.currentPath = pathname;

    const updateOps = { $set: setFields };
    if (client.ip && client.ip !== "127.0.0.1") {
      updateOps.$addToSet = { knownIps: client.ip };
    }

    await db.collection("users").updateOne({ _id: uId }, updateOps);
    return setFields;
  } catch (err) {
    console.error("Lỗi khi cập nhật Heartbeat:", err);
    return null;
  }
}
