import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { recordHeartbeat } from "@/lib/telemetry";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session?.uid) {
      return NextResponse.json({ ok: false, message: "Chưa đăng nhập" }, { status: 200 });
    }

    let body = {};
    const text = await req.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        // Fallback
      }
    }

    const { searchParams } = new URL(req.url);
    const isOffline = body.isOffline === true || searchParams.get("offline") === "1";
    const pathname = typeof body.pathname === "string" ? body.pathname.slice(0, 120) : "";
    const action = typeof body.action === "string" ? body.action.slice(0, 150) : "";

    const db = await getDb();
    await recordHeartbeat(db, {
      userId: session.uid,
      action,
      pathname,
      isOffline,
      req,
    });

    return NextResponse.json({ ok: true, now: Date.now() });
  } catch (err) {
    console.error("Lỗi API heartbeat POST:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function GET(req) {
  try {
    const session = await getSession();
    if (!session?.uid) {
      return NextResponse.json({ ok: false, message: "Chưa đăng nhập" });
    }

    const { searchParams } = new URL(req.url);
    const isOffline = searchParams.get("offline") === "1";
    const pathname = (searchParams.get("pathname") || "").slice(0, 120);
    const action = (searchParams.get("action") || "").slice(0, 150);

    const db = await getDb();
    await recordHeartbeat(db, {
      userId: session.uid,
      action,
      pathname,
      isOffline,
      req,
    });

    return NextResponse.json({ ok: true, now: Date.now() });
  } catch (err) {
    console.error("Lỗi API heartbeat GET:", err);
    return NextResponse.json({ ok: false });
  }
}

