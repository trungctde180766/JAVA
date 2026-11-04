import { getDb } from "../lib/db.js";

async function main() {
  console.log("Connecting to MongoDB...");
  const db = await getDb();
  const col = db.collection("quizzes");

  const entryQuizzes = await col.find({ slug: { $regex: "^entry-" } }).toArray();
  console.log(`Found ${entryQuizzes.length} entry quizzes:`);
  entryQuizzes.forEach((q) => console.log(`  - [${q.slug}] ${q.title}`));

  if (entryQuizzes.length > 0) {
    const res = await col.deleteMany({ slug: { $regex: "^entry-" } });
    console.log(`Deleted ${res.deletedCount} entry quizzes from MongoDB!`);
  } else {
    console.log("No entry quizzes found in MongoDB.");
  }

  // Also check attempts for these quizzes
  const attRes = await db.collection("attempts").deleteMany({ slug: { $regex: "^entry-" } });
  console.log(`Deleted ${attRes.deletedCount} attempts for entry quizzes.`);

  console.log("\nRemaining quizzes in Database:");
  const remaining = await col.find({}, { projection: { slug: 1, title: 1 } }).sort({ order: 1 }).toArray();
  remaining.forEach((q) => console.log(`  - [${q.slug}] ${q.title}`));

  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
