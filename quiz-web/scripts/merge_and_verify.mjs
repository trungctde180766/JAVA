import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enrichmentDir = path.resolve(__dirname, "enrichment");
const expectedCounts = {
  1: 20, 2: 15, 3: 18, 4: 20, 5: 21, 6: 19, 7: 15, 8: 12, 9: 21
};

let allQuestions = [];
let totalErrors = 0;

for (let ch = 1; ch <= 9; ch++) {
  const filePath = path.join(enrichmentDir, `ch0${ch}_enriched.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    totalErrors++;
    continue;
  }
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  console.log(`Chapter ${ch}: ${content.length} questions (expected ${expectedCounts[ch]})`);
  if (content.length !== expectedCounts[ch]) {
    console.error(`Mismatch in Chapter ${ch}! Expected ${expectedCounts[ch]}, got ${content.length}`);
    totalErrors++;
  }

  content.forEach(q => {
    if (!q.explanation || !q.explanation.includes("💡") || !q.explanation.includes("✅") || !q.explanation.includes("❌")) {
      console.error(`Question ${q.id} missing explanation parts!`);
      totalErrors++;
    }
    allQuestions.push(q);
  });
}

console.log(`\nTotal merged questions: ${allQuestions.length}/161`);
if (totalErrors === 0 && allQuestions.length === 161) {
  const targetPath = path.resolve(__dirname, "scjp_processed.json");
  fs.writeFileSync(targetPath, JSON.stringify(allQuestions, null, 2), "utf-8");
  console.log(`SUCCESS: Updated ${targetPath} with 161 enriched questions!`);
} else {
  console.error(`Found ${totalErrors} errors! Aborting merge.`);
  process.exit(1);
}
