import { getDb } from "../lib/db.js";

async function main() {
  console.log("Connecting and checking/seeding database...");
  const db = await getDb();
  console.log("Database initialized successfully!");
  
  const quizzes = await db.collection("quizzes").find({}, { projection: { slug: 1, title: 1, count: { $size: "$questions" } } }).toArray();
  console.log("Quizzes in database:");
  quizzes.forEach(q => console.log(`  - ${q.title} (${q.slug}): ${q.count} câu hỏi`));

  const users = await db.collection("users").find({}, { projection: { username: 1, role: 1 } }).toArray();
  console.log("Users in database:");
  users.forEach(u => console.log(`  - ${u.username} (${u.role})`));
  
  process.exit(0);
}

main().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
