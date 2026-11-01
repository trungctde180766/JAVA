// Tô màu cú pháp Java siêu nhẹ (không cần thư viện).
const KEYWORDS = new Set(
  "abstract class extends implements interface public private protected static final void int long double float boolean char byte short new return null true false this super throws throw try catch finally if else for while do switch case break continue import package instanceof".split(
    " "
  )
);
const TYPES = new Set("String StringBuffer StringBuilder Object Integer System".split(" "));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlightJava(code = "") {
  let out = "";
  let last = 0;
  code.replace(TOKEN, (m, comment, str, chr, word, num, idx) => {
    out += esc(code.slice(last, idx));
    if (comment) out += `<span class="tk-c">${esc(m)}</span>`;
    else if (str || chr) out += `<span class="tk-s">${esc(m)}</span>`;
    else if (word && KEYWORDS.has(word)) out += `<span class="tk-k">${m}</span>`;
    else if (word && TYPES.has(word)) out += `<span class="tk-t">${m}</span>`;
    else if (num) out += `<span class="tk-n">${m}</span>`;
    else out += esc(m);
    last = idx + m.length;
    return m;
  });
  out += esc(code.slice(last));
  return out;
}

export function formatJavaCode(code = "") {
  if (!code || typeof code !== "string") return "";

  const tokens = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    // Single-line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      let j = i + 2;
      while (j < len && code[j] !== "\n") j++;
      tokens.push({ type: "comment", val: code.slice(i, j) });
      i = j;
      continue;
    }
    // Multi-line comment
    if (code[i] === "/" && code[i + 1] === "*") {
      let j = i + 2;
      while (j < len && !(code[j] === "*" && code[j + 1] === "/")) j++;
      j = Math.min(len, j + 2);
      tokens.push({ type: "comment", val: code.slice(i, j) });
      i = j;
      continue;
    }
    // String literal
    if (code[i] === '"') {
      let j = i + 1;
      while (j < len && code[j] !== '"') {
        if (code[j] === "\\") j++;
        j++;
      }
      j = Math.min(len, j + 1);
      tokens.push({ type: "string", val: code.slice(i, j) });
      i = j;
      continue;
    }
    // Char literal
    if (code[i] === "'") {
      let j = i + 1;
      while (j < len && code[j] !== "'") {
        if (code[j] === "\\") j++;
        j++;
      }
      j = Math.min(len, j + 1);
      tokens.push({ type: "string", val: code.slice(i, j) });
      i = j;
      continue;
    }

    // Structural characters
    if ("{};()".includes(code[i])) {
      tokens.push({ type: "punct", val: code[i] });
      i++;
      continue;
    }

    // Words / symbols / whitespace
    let j = i;
    while (
      j < len &&
      !"\"'{};()".includes(code[j]) &&
      !(code[j] === "/" && (code[j + 1] === "/" || code[j + 1] === "*"))
    ) {
      j++;
    }
    tokens.push({ type: "text", val: code.slice(i, j) });
    i = j;
  }

  let result = "";
  let indent = 0;
  let inForParen = 0;
  let currentLine = "";

  const addLine = () => {
    const trimmed = currentLine.trim();
    if (trimmed) {
      result += (result ? "\n" : "") + "    ".repeat(indent) + trimmed;
    }
    currentLine = "";
  };

  for (let k = 0; k < tokens.length; k++) {
    const t = tokens[k];

    if (t.type === "punct") {
      if (t.val === "(") {
        if (/\bfor\s*$/.test(currentLine)) {
          inForParen++;
        }
        currentLine += "(";
      } else if (t.val === ")") {
        if (inForParen > 0) inForParen--;
        currentLine += ")";
      } else if (t.val === "{") {
        if (currentLine && !currentLine.endsWith(" ")) currentLine += " ";
        currentLine += "{";
        addLine();
        indent++;
      } else if (t.val === "}") {
        addLine();
        indent = Math.max(0, indent - 1);
        currentLine = "}";
        addLine();
      } else if (t.val === ";") {
        currentLine += ";";
        if (inForParen === 0) {
          addLine();
        } else {
          currentLine += " ";
        }
      }
    } else if (t.type === "comment") {
      if (t.val.startsWith("//")) {
        currentLine += t.val;
        addLine();
      } else {
        currentLine += t.val;
      }
    } else {
      if (t.type === "text") {
        const s = t.val.replace(/[\r\n\t]+/g, " ");
        if (currentLine.endsWith(" ") && s.startsWith(" ")) {
          currentLine += s.slice(1);
        } else {
          currentLine += s;
        }
      } else {
        currentLine += t.val;
      }
    }
  }

  addLine();

  const cleaned = result
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l, idx, arr) => {
      if (!l.trim() && (idx === 0 || !arr[idx - 1].trim())) return false;
      return true;
    })
    .join("\n");

  return cleaned || code;
}

