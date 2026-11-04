import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'scjp_processed.json');
const list = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const fixes = [
  // Exact words/phrases
  { regex: /\banabstract\b/gi, replacement: 'an abstract' },
  { regex: /\bmethodm1\(\)/g, replacement: 'method m1()' },
  { regex: /\bmethodm2\(\)/g, replacement: 'method m2()' },
  { regex: /\bcalledrun\(\)/gi, replacement: 'called run()' },
  { regex: /\bnamedrun\(\)/gi, replacement: 'named run()' },
  { regex: /\bnamedrunnable\(\)/gi, replacement: 'named runnable()' },
  { regex: /\bemptypublicvoid\b/gi, replacement: 'empty public void' },
  { regex: /\bapublicvoid\b/gi, replacement: 'a public void' },
  { regex: /\bbepublic\b/gi, replacement: 'be public' },
  { regex: /\bofvoid\b/gi, replacement: 'of void' },
  { regex: /\boutputthis420parent420\s*\./gi, replacement: 'output this 420 parent 420.' },
  { regex: /\boutputthis420parent420\b/gi, replacement: 'output this 420 parent 420' },
  { regex: /\bfragmentx\.equals\(y\)/g, replacement: 'fragment x.equals(y)' },
  { regex: /\bandx\.equals\(y\)/g, replacement: 'and x.equals(y)' },
  { regex: /\bthenz\.equals\(x\)/g, replacement: 'then z.equals(x)' },
  { regex: /\btheny\.equals\(x\)/g, replacement: 'then y.equals(x)' },
  { regex: /\bprintHello world\b/g, replacement: 'print Hello world' },
  { regex: /\bprintDone with\b/g, replacement: 'print Done with' },
  { regex: /\bprintFinally executing\b/g, replacement: 'print Finally executing' },
  { regex: /\baRuntimeException\b/g, replacement: 'a RuntimeException' },
  { regex: /\bnocatch clauses\b/gi, replacement: 'no catch clauses' },
  { regex: /\bacatch clause\b/gi, replacement: 'a catch clause' },
  { regex: /\batry-catch\b/gi, replacement: 'a try-catch' },
  { regex: /\bthefinally\b/gi, replacement: 'the finally' },
  { regex: /\bTest1hashCode\(\)/g, replacement: 'Test1 hashCode()' },
  { regex: /\bTest2hashCode\(\)/g, replacement: 'Test2 hashCode()' },
  { regex: /\bifequals\(\)/g, replacement: 'if equals()' },
  { regex: /\bifhashCode\(\)/g, replacement: 'if hashCode()' },
  { regex: /\binvokehashCode\(\)/g, replacement: 'invoke hashCode()' },
  { regex: /\bthenhashCode\(\)/g, replacement: 'then hashCode()' },
  { regex: /\bCallingRuntime\.gc\(\)/g, replacement: 'Calling Runtime.gc()' },
  { regex: /\bbecausecurrentThread\(\)/g, replacement: 'because currentThread()' },
  { regex: /\binvokeswait\(\)/g, replacement: 'invokes wait()' },
  { regex: /\bofwait\(\)/g, replacement: 'of wait()' },
  { regex: /\bThenotifyAll\(\)/g, replacement: 'The notifyAll()' },
  { regex: /\bcallwait\(\)/g, replacement: 'call wait()' },
  { regex: /\bThenotify\(\)/g, replacement: 'The notify()' },
  { regex: /\bifwait\(\)/g, replacement: 'if wait()' },
  { regex: /\bThewait\(\)/g, replacement: 'The wait()' },
  { regex: /\bBothwait\(\)/g, replacement: 'Both wait()' },
  { regex: /\bandnotify\(\)/g, replacement: 'and notify()' },
  { regex: /\bawait\(\) call\b/g, replacement: 'a wait() call' },
  { regex: /\btheincrease\(\) method\b/gi, replacement: 'the increase() method' },
  { regex: /with'class B extends A\{\s*'\s*/g, replacement: "with 'class B extends A {' " },
  { regex: /'class B extends A\{\s*'/g, replacement: "'class B extends A {'" },
  { regex: /\bclass B extends A\{/g, replacement: 'class B extends A {' }
];

function applyFixes(text) {
  if (!text) return text;
  let res = text;
  for (const { regex, replacement } of fixes) {
    res = res.replace(regex, replacement);
  }
  return res;
}

let changedOptionsCount = 0;
let changedExplanationsCount = 0;

list.forEach(q => {
  // Fix options
  q.options = q.options.map((opt, idx) => {
    const fixed = applyFixes(opt);
    if (fixed !== opt) {
      console.log(`[${q.id}][${String.fromCharCode(65 + idx)}]:\n  BEFORE: ${opt}\n  AFTER:  ${fixed}`);
      changedOptionsCount++;
    }
    return fixed;
  });

  // Fix explanation
  if (q.explanation) {
    const fixedExp = applyFixes(q.explanation);
    if (fixedExp !== q.explanation) {
      console.log(`[${q.id}] Explanation updated`);
      changedExplanationsCount++;
      q.explanation = fixedExp;
    }
  }
});

console.log(`\nSummary: Fixed ${changedOptionsCount} options, ${changedExplanationsCount} explanations.`);

fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
console.log('Saved updated scjp_processed.json');
