import { getDb } from "../lib/db.js";
import { SEED_QUIZZES } from "../lib/seedData.js";

async function main() {
  console.log("Connecting to MongoDB Atlas...");
  const db = await getDb();
  const col = db.collection("quizzes");
  const now = new Date();

  console.log(`Syncing ${SEED_QUIZZES.length} quizzes to MongoDB...`);
  let updated = 0;
  let inserted = 0;

  for (const q of SEED_QUIZZES) {
    const { slug, ...rest } = q;
    const res = await col.updateOne(
      { slug },
      {
        $set: { ...rest, hidden: false, updatedAt: now },
        $setOnInsert: { slug, createdAt: now }
      },
      { upsert: true }
    );
    if (res.upsertedCount > 0) inserted++;
    else if (res.modifiedCount > 0) updated++;
  }

  console.log(`Sync complete! Updated: ${updated}, Inserted: ${inserted}`);

  const quizzes = await col.find({}, { projection: { slug: 1, title: 1, count: { $size: "$questions" } } }).sort({ order: 1 }).toArray();
  console.log("\nQuizzes currently in Database:");
  quizzes.forEach(q => console.log(`  - [${q.slug}] ${q.title}: ${q.count} câu hỏi`));

  process.exit(0);
}

main().catch(err => {
  console.error("Sync error:", err);
  process.exit(1);
});
