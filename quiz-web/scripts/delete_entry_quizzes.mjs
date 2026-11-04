import { getDb } from "../lib/db.js";

async function main() {
  console.log("Connecting to MongoDB...");
  const db = await getDb();
  const col = db.collection("quizzes");

  const aiQuizzes = await col.find({ slug: { $regex: "^ai-" } }).toArray();
  console.log(`Found ${aiQuizzes.length} AI quizzes:`);
  aiQuizzes.forEach((q) => console.log(`  - [${q.slug}] ${q.title}`));

  if (aiQuizzes.length > 0) {
    const res = await col.deleteMany({ slug: { $regex: "^ai-" } });
    console.log(`Deleted ${res.deletedCount} AI quizzes from MongoDB!`);
    await db.collection("attempts").deleteMany({ slug: { $regex: "^ai-" } });
  }

  console.log("\nRemaining quizzes in Database:");
  const remaining = await col.find({}, { projection: { slug: 1, title: 1 } }).sort({ order: 1 }).toArray();
  remaining.forEach((q) => console.log(`  - [${q.slug}] ${q.title}`));

  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
