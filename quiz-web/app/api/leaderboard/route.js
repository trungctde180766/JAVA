import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getQuizList } from "@/lib/quizzes";

export const dynamic = "force-dynamic";

function formatDuration(sec) {
  if (!sec || sec <= 0) return "0s";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}p`;
  return `${m}p ${s}s`;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "all";
    const mode = searchParams.get("mode") || "all"; // "all" | "exam" | "practice"
    const type = searchParams.get("type") || "best"; // "best" | "all"
    const limit = Math.min(100, Math.max(10, Number(searchParams.get("limit")) || 50));

    const currentUser = await getCurrentUser();
    const currentUsername = currentUser?.username || null;

    const db = await getDb();

    // Lấy danh sách toàn bộ bộ đề để đính kèm metadata và số lượt thi
    const rawQuizzes = await getQuizList();
    const attemptsCountsByQuiz = await db
      .collection("attempts")
      .aggregate([{ $group: { _id: "$quizSlug", count: { $sum: 1 } } }])
      .toArray();
    const countMap = Object.fromEntries(attemptsCountsByQuiz.map((c) => [c._id, c.count]));

    const quizOptions = [
      {
        slug: "all",
        title: "Toàn Hệ Thống (Tổng Hợp)",
        icon: "🌐",
        color: "#6366f1",
        count: rawQuizzes.reduce((s, q) => s + (q.count || 0), 0),
        attemptsCount: attemptsCountsByQuiz.reduce((s, c) => s + c.count, 0),
      },
      ...rawQuizzes.map((q) => ({
        slug: q.slug,
        title: q.title,
        icon: q.icon || "📝",
        color: q.color || "#2563eb",
        count: q.count || 0,
        attemptsCount: countMap[q.slug] || 0,
      })),
    ];

    // TRƯỜNG HỢP 1: BẢNG XẾP HẠNG TOÀN HỆ THỐNG (slug === "all")
    if (slug === "all") {
      const matchFilter = {};
      if (mode !== "all") matchFilter.mode = mode;

      const rawAttempts = await db.collection("attempts").find(matchFilter).toArray();

      const userStats = new Map();
      for (const a of rawAttempts) {
        const u = a.username || "Ẩn danh";
        if (!userStats.has(u)) {
          userStats.set(u, {
            username: u,
            userId: a.userId ? String(a.userId) : null,
            attemptsCount: 0,
            quizzesTaken: new Set(),
            totalCorrect: 0,
            totalQuestions: 0,
            totalDurationSec: 0,
            perfectCount: 0,
            bestPercent: 0,
            fastestPerfectSec: null,
            lastAttemptAt: a.createdAt,
          });
        }
        const st = userStats.get(u);
        st.attemptsCount += 1;
        if (a.quizSlug) st.quizzesTaken.add(a.quizSlug);
        st.totalCorrect += a.correct || 0;
        st.totalQuestions += a.total || 0;
        st.totalDurationSec += a.durationSec || 0;
        if (a.percent === 100) {
          st.perfectCount += 1;
          if (st.fastestPerfectSec === null || a.durationSec < st.fastestPerfectSec) {
            st.fastestPerfectSec = a.durationSec;
          }
        }
        if (a.percent > st.bestPercent) st.bestPercent = a.percent;
        if (!st.lastAttemptAt || new Date(a.createdAt) > new Date(st.lastAttemptAt)) {
          st.lastAttemptAt = a.createdAt;
        }
      }

      // Xếp hạng:
      // 1. Tổng câu trả lời đúng nhiều nhất (bảo đảm người học nhiều, đúng nhiều đứng đầu)
      // 2. Tỷ lệ chính xác tổng thể (Accuracy)
      // 3. Số bài đạt điểm tuyệt đối 100%
      // 4. Tổng thời gian hoàn thành (nhanh hơn xếp trên)
      const sortedUsers = Array.from(userStats.values())
        .map((st) => {
          const accuracy = st.totalQuestions > 0 ? Math.round((st.totalCorrect / st.totalQuestions) * 1000) / 10 : 0;
          return {
            ...st,
            quizzesCount: st.quizzesTaken.size,
            accuracy,
            formattedDuration: formatDuration(st.totalDurationSec),
            isCurrentUser: currentUsername ? st.username === currentUsername : false,
          };
        })
        .sort((a, b) => {
          if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
          if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
          if (b.perfectCount !== a.perfectCount) return b.perfectCount - a.perfectCount;
          return a.totalDurationSec - b.totalDurationSec;
        });

      let currentRank = 1;
      const rankings = sortedUsers.slice(0, limit).map((u, i) => {
        return {
          rank: i + 1,
          ...u,
          quizzesTaken: undefined, // remove Set for JSON serialization
        };
      });

      // Tìm vị trí của người dùng hiện tại
      let myRank = null;
      if (currentUsername) {
        const myIndex = sortedUsers.findIndex((u) => u.username === currentUsername);
        if (myIndex !== -1) {
          myRank = {
            rank: myIndex + 1,
            ...sortedUsers[myIndex],
            quizzesTaken: undefined,
          };
        }
      }

      const totalCorrectAll = sortedUsers.reduce((s, u) => s + u.totalCorrect, 0);
      const totalQuestionsAll = sortedUsers.reduce((s, u) => s + u.totalQuestions, 0);

      return NextResponse.json({
        ok: true,
        slug: "all",
        mode,
        type: "global",
        title: "Bảng Vàng Toàn Hệ Thống",
        quizzes: quizOptions,
        rankings,
        myRank,
        summary: {
          totalParticipants: sortedUsers.length,
          totalAttempts: rawAttempts.length,
          topParticipant: rankings[0] ? rankings[0].username : null,
          avgAccuracy: totalQuestionsAll > 0 ? Math.round((totalCorrectAll / totalQuestionsAll) * 100) / 10 : 0,
        },
      });
    }

    // TRƯỜNG HỢP 2: BẢNG XẾP HẠNG CỦA MỘT BỘ ĐỀ CỤ THỂ (slug !== "all")
    const matchFilter = { quizSlug: slug };
    if (mode !== "all") matchFilter.mode = mode;

    const rawAttempts = await db.collection("attempts").find(matchFilter).toArray();

    // Chọn tiêu đề bộ đề
    const matchedQuiz = rawQuizzes.find((q) => q.slug === slug);
    const quizTitle = matchedQuiz ? matchedQuiz.title : rawAttempts[0]?.quizTitle || slug;

    let candidateAttempts = [];

    if (type === "best") {
      // Mỗi người dùng chỉ lấy LƯỢT THI TỐT NHẤT:
      // Tiêu chí tốt nhất: percent cao nhất -> correct nhiều nhất -> durationSec ngắn nhất -> createdAt sớm nhất
      const userBests = new Map();
      for (const a of rawAttempts) {
        const u = a.username || "Ẩn danh";
        const existing = userBests.get(u);
        if (!existing) {
          userBests.set(u, a);
        } else {
          let replace = false;
          if (a.percent > existing.percent) replace = true;
          else if (a.percent === existing.percent) {
            if (a.correct > existing.correct) replace = true;
            else if (a.correct === existing.correct) {
              if (a.durationSec < existing.durationSec) replace = true;
              else if (a.durationSec === existing.durationSec && new Date(a.createdAt) < new Date(existing.createdAt)) {
                replace = true;
              }
            }
          }
          if (replace) userBests.set(u, a);
        }
      }
      candidateAttempts = Array.from(userBests.values());
    } else {
      // Lấy tất cả lượt thi
      candidateAttempts = [...rawAttempts];
    }

    // Sắp xếp bảng xếp hạng của bài test:
    // 1. Điểm phần trăm cao nhất (percent DESC)
    // 2. Số câu đúng nhiều nhất (correct DESC)
    // 3. Thời gian làm bài ngắn nhất (durationSec ASC)
    // 4. Thời điểm nộp bài sớm nhất (createdAt ASC)
    const sortedAttempts = candidateAttempts.sort((a, b) => {
      if (b.percent !== a.percent) return b.percent - a.percent;
      if (b.correct !== a.correct) return b.correct - a.correct;
      if (a.durationSec !== b.durationSec) return a.durationSec - b.durationSec;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    const rankings = sortedAttempts.slice(0, limit).map((a, i) => ({
      rank: i + 1,
      id: String(a._id),
      userId: a.userId ? String(a.userId) : null,
      username: a.username || "Ẩn danh",
      quizSlug: a.quizSlug,
      quizTitle: a.quizTitle || quizTitle,
      mode: a.mode,
      correct: a.correct,
      total: a.total,
      percent: a.percent,
      durationSec: a.durationSec,
      formattedDuration: formatDuration(a.durationSec),
      createdAt: a.createdAt,
      isCurrentUser: currentUsername ? a.username === currentUsername : false,
    }));

    let myRank = null;
    if (currentUsername) {
      const myIndex = sortedAttempts.findIndex((a) => a.username === currentUsername);
      if (myIndex !== -1) {
        const a = sortedAttempts[myIndex];
        myRank = {
          rank: myIndex + 1,
          id: String(a._id),
          username: a.username,
          percent: a.percent,
          correct: a.correct,
          total: a.total,
          mode: a.mode,
          durationSec: a.durationSec,
          formattedDuration: formatDuration(a.durationSec),
          createdAt: a.createdAt,
        };
      }
    }

    const uniqueUsers = new Set(rawAttempts.map((a) => a.username)).size;
    const topScore = sortedAttempts[0]?.percent ?? null;
    const fastestDuration = sortedAttempts.length > 0 ? Math.min(...sortedAttempts.map((a) => a.durationSec)) : null;

    return NextResponse.json({
      ok: true,
      slug,
      mode,
      type,
      title: quizTitle,
      quizzes: quizOptions,
      rankings,
      myRank,
      summary: {
        totalParticipants: uniqueUsers,
        totalAttempts: rawAttempts.length,
        topScore,
        fastestTime: fastestDuration !== null ? formatDuration(fastestDuration) : null,
        topParticipant: sortedAttempts[0]?.username || null,
      },
    });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return NextResponse.json({ ok: false, error: "Lỗi máy chủ: " + error.message }, { status: 500 });
  }
}

