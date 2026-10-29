import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { SEED_QUIZZES } from "./seedData.js";

const DB_NAME = process.env.MONGODB_DB || "javaquiz";

// Cache kết nối trên globalThis để tái sử dụng giữa các request (quan trọng cho serverless/Vercel)
const g = globalThis;
if (!g.__jq) g.__jq = { clientPromise: null, setupPromise: null };

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Thiếu biến môi trường MONGODB_URI (xem file .env.example)");

  if (!g.__jq.clientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 10000 });
    g.__jq.clientPromise = client.connect().catch((err) => {
      g.__jq.clientPromise = null;
      throw err;
    });
  }
  const client = await g.__jq.clientPromise;
  const db = client.db(DB_NAME);

  if (!g.__jq.setupPromise) {
    g.__jq.setupPromise = setup(db).catch((err) => {
      g.__jq.setupPromise = null;
      throw err;
    });
  }
  await g.__jq.setupPromise;
  return db;
}

function ignoreDup(err) {
  if (err?.code === 11000 || err?.writeErrors) return;
  throw err;
}

// Chạy 1 lần mỗi instance: tạo index, seed 3 bộ đề, tạo tài khoản admin mặc định
async function setup(db) {
  await Promise.all([
    db.collection("users").createIndex({ username: 1 }, { unique: true }),
    db.collection("quizzes").createIndex({ slug: 1 }, { unique: true }),
    db.collection("attempts").createIndex({ userId: 1, createdAt: -1 }),
    db.collection("attempts").createIndex({ quizSlug: 1, mode: 1, percent: -1 }),
  ]);

  if ((await db.collection("quizzes").countDocuments()) === 0) {
    const now = new Date();
    await db
      .collection("quizzes")
      .insertMany(
        SEED_QUIZZES.map((q) => ({ ...q, createdAt: now, updatedAt: now })),
        { ordered: false }
      )
      .catch(ignoreDup);
  }

  const adminName = (process.env.ADMIN_USERNAME || "trungadmin").toLowerCase();
  const admin = await db.collection("users").findOne({ username: adminName });
  if (!admin) {
    const pw = process.env.ADMIN_PASSWORD || "trungadmin123";
    await db
      .collection("users")
      .insertOne({
        username: adminName,
        passwordHash: await bcrypt.hash(pw, 10),
        role: "admin",
        banned: false,
        bookmarks: [],
        mistakes: {},
        createdAt: new Date(),
      })
      .catch(ignoreDup);
  } else if (admin.role !== "admin") {
    await db.collection("users").updateOne({ _id: admin._id }, { $set: { role: "admin", banned: false } });
  }
}

export function toId(id) {
  try {
    return new ObjectId(String(id));
  } catch {
    return null;
  }
}

export { ObjectId };
