import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processedPath = path.resolve(__dirname, "scjp_processed.json");
const list = JSON.parse(fs.readFileSync(processedPath, "utf-8"));

// 1. Fix scjp-ch01-014
const q14 = list.find((q) => q.id === "scjp-ch01-014");
if (q14) {
  q14.options[5] = "int myList[] = {4; 6; 5};";
  q14.optionsVi[5] = "int myList[] = {4; 6; 5};";
  console.log("Fixed scjp-ch01-014 option 5");
}

// 2. Fix scjp-ch01-017
const q17 = list.find((q) => q.id === "scjp-ch01-017");
if (q17) {
  q17.options[3] = "An exception is thrown at runtime";
  q17.optionsVi[3] = "Ném ngoại lệ tại thời điểm chạy (Runtime Exception)";
  console.log("Fixed scjp-ch01-017 option 3");
}

// 3. Fix scjp-ch07-015
const q15 = list.find((q) => q.id === "scjp-ch07-015");
if (q15) {
  q15.options = [
    "After line 15 runs",
    "After line 16 runs",
    "After line 17 runs",
    "The object is not eligible.",
    "It is not possible to know for sure."
  ];
  q15.optionsVi = [
    "Sau khi dòng 15 chạy xong",
    "Sau khi dòng 16 chạy xong",
    "Sau khi dòng 17 chạy xong",
    "Đối tượng không đủ điều kiện bị thu gom rác.",
    "Không thể biết chắc chắn được."
  ];
  q15.answer = 4;
  q15.correctLetters = ["E"];
  q15.isMultiple = false;
  console.log("Fixed scjp-ch07-015 options and answer");
}

fs.writeFileSync(processedPath, JSON.stringify(list, null, 2), "utf-8");
console.log("Saved updated scjp_processed.json");

