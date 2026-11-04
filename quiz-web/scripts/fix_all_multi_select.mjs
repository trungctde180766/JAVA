import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawPath = path.resolve(__dirname, "scjp_raw_extracted.json");
const processedPath = path.resolve(__dirname, "scjp_processed.json");

const rawList = JSON.parse(fs.readFileSync(rawPath, "utf-8"));
const processedList = JSON.parse(fs.readFileSync(processedPath, "utf-8"));

console.log(`Loaded ${rawList.length} raw, ${processedList.length} processed.`);

// Function to extract accurate correct letters from book explanation
function getAccurateLetters(rawQ) {
  const expl = rawQ.explanation || "";
  const dotIdx = expl.indexOf(".");
  if (dotIdx !== -1) {
    const header = expl.slice(0, dotIdx).replace(/\band\b/gi, ",");
    const letters = header.match(/\b[A-H]\b/g);
    if (letters && letters.length > 0) {
      return [...new Set(letters.map((l) => l.toUpperCase()))];
    }
  }
  return rawQ.correctLetters || [];
}

// Special case for Ch7 Q14
const CH07_Q14_OPTIONS = {
  A: "x3 = null;",
  B: "x4 = null;",
  C: "x5 = null;",
  D: "x3 = x4;",
  E: "x5 = x4;"
};

function cleanOptionText(text) {
  if (!text) return "";
  let clean = text;
  // Remove OCR metadata/headers attached to options
  clean = clean.replace(/;?\s*(?:Array Declaration.*|Literals and Ranges.*|Declarations and Access Control.*|Self Test.*|Sun\s+Objective.*|Exam\s+Objective.*|\d+\s+Chapter\s+\d+.*)$/i, ";");
  // Clean multiple semicolons or trailing spaces
  clean = clean.replace(/;+/g, ";").trim();
  // Format code spacing if it's squished like floatf1=-343 ;
  clean = clean.replace(/^(float|int|boolean|char|double|byte|short|long|String)([a-zA-Z0-9_]+)\s*=/i, "$1 $2 = ");
  clean = clean.replace(/=([^\s])/g, "= $1");
  clean = clean.replace(/\s+;/g, ";");
  return clean.trim();
}

const rawMap = new Map();
for (const r of rawList) {
  rawMap.set(`${r.chapterNum}_${r.questionNum}`, r);
}

let fixedCount = 0;

for (const p of processedList) {
  const raw = rawMap.get(`${p.chapterNum}_${p.originalId}`);
  if (!raw) continue;

  const accurateLetters = getAccurateLetters(raw);
  const isMulti = accurateLetters.length > 1;

  let optsDict = raw.options;
  if (p.chapterNum === 7 && p.originalId === 14) {
    optsDict = CH07_Q14_OPTIONS;
  }

  const sortedLetters = Object.keys(optsDict).sort();
  const cleanOptions = sortedLetters.map((l) => cleanOptionText(optsDict[l]));

  p.isMultiple = isMulti;
  p.correctLetters = accurateLetters;
  p.options = cleanOptions;
  p.optionsVi = cleanOptions;

  if (isMulti) {
    p.answer = accurateLetters
      .map((l) => sortedLetters.indexOf(l))
      .filter((i) => i >= 0)
      .sort((a, b) => a - b);

    // Update textVi
    const lettersVi = accurateLetters.join(", ").replace(/, ([^,]+)$/, " và $1");
    if (p.textVi) {
      p.textVi = p.textVi.replace(/\(Chọn (?:đáp án kết hợp đúng|\d+ đáp án)\)/g, "").trim();
      p.textVi = `${p.textVi} (Chọn ${accurateLetters.length} đáp án)`;
    }

    // Update explanation header
    p.explanation = p.explanation.replace(
      /✅ Vì sao đáp án "[^"]+" đúng:/,
      `✅ Vì sao đáp án "${lettersVi}" đúng:`
    );
  } else {
    const singleLetter = accurateLetters[0] || "A";
    p.answer = Math.max(0, sortedLetters.indexOf(singleLetter));
    if (p.textVi) {
      p.textVi = p.textVi.replace(/\(Chọn (?:đáp án kết hợp đúng|\d+ đáp án)\)/g, "").trim();
      p.textVi = `${p.textVi} (Chọn 1 đáp án)`;
    }
  }

  fixedCount++;
}

console.log(`Processed all ${fixedCount} questions.`);

// Inspect Question 9
const q9 = processedList.find((q) => q.chapterNum === 1 && q.originalId === 9);
console.log("\nInspecting Q9 after fix:");
console.log("text:", q9.text);
console.log("textVi:", q9.textVi);
console.log("correctLetters:", q9.correctLetters);
console.log("answer:", q9.answer);
console.log("options:", q9.options);

fs.writeFileSync(processedPath, JSON.stringify(processedList, null, 2), "utf-8");
console.log(`\nUpdated ${processedPath} successfully!`);

