import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawPath = path.resolve(__dirname, "scjp_raw_extracted.json");
const processedPath = path.resolve(__dirname, "scjp_processed.json");

const rawList = JSON.parse(fs.readFileSync(rawPath, "utf-8"));
const processedList = JSON.parse(fs.readFileSync(processedPath, "utf-8"));

console.log(`Loaded ${rawList.length} raw questions, ${processedList.length} processed questions.`);

// Map raw by chapterNum and questionNum
const rawMap = new Map();
for (const r of rawList) {
  rawMap.set(`${r.chapterNum}_${r.questionNum}`, r);
}

// Special case for Ch7 Q14 which was missing options in raw:
const CH07_Q14_OPTIONS = {
  A: "x3 = null;",
  B: "x4 = null;",
  C: "x5 = null;",
  D: "x3 = x4;",
  E: "x5 = x4;"
};

let multiCount = 0;

for (const p of processedList) {
  const key = `${p.chapterNum}_${p.originalId}`;
  const raw = rawMap.get(key);
  if (!raw) continue;

  const correctLetters = raw.correctLetters || [];
  if (correctLetters.length > 1) {
    multiCount++;
    p.isMultiple = true;

    // Get raw options dict
    let optsDict = raw.options;
    if (p.chapterNum === 7 && p.originalId === 14) {
      optsDict = CH07_Q14_OPTIONS;
    }

    const sortedLetters = Object.keys(optsDict).sort();
    
    // Clean each option
    const cleanOptions = sortedLetters.map((letter) => {
      let optText = optsDict[letter] || "";
      // Remove trailing chapter / objective headers if any
      optText = optText.replace(/\s+(?:Literals and Ranges of All Primitive Data Types.*|\d+\s+Chapter\s+\d+.*|Sun\s+Objective.*|Exam\s+Objective.*)/i, "").trim();
      return optText;
    });

    // Determine correct answer indices
    const answerIndices = correctLetters
      .map((letter) => sortedLetters.indexOf(letter))
      .filter((idx) => idx >= 0)
      .sort((a, b) => a - b);

    p.options = cleanOptions;
    p.optionsVi = cleanOptions; // keep same code expressions / terms
    p.answer = answerIndices;
    p.correctLetters = correctLetters;

    // Format explanation "Vì sao đáp án đúng" nicely if it mentioned the old paired string
    const lettersStr = correctLetters.join(" và ");
    p.explanation = p.explanation.replace(
      /✅ Vì sao đáp án "[^"]+" đúng:/,
      `✅ Vì sao đáp án "${lettersStr}" đúng:`
    );
  } else {
    p.isMultiple = false;
  }
}

console.log(`Updated ${multiCount} questions to real multi-select!`);

// Save updated scjp_processed.json
fs.writeFileSync(processedPath, JSON.stringify(processedList, null, 2), "utf-8");
console.log(`Saved updated ${processedPath}`);

