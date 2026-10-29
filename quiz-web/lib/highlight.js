// Tô màu cú pháp Java siêu nhẹ (không cần thư viện).
const KEYWORDS = new Set(
  "abstract class extends implements interface public private protected static final void int long double float boolean char byte short new return null true false this super throws throw try catch finally if else for while do switch case break continue import package instanceof".split(
    " "
  )
);
const TYPES = new Set("String StringBuffer StringBuilder Object Integer System".split(" "));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TOKEN = /(\/\/[^\n]*)|("(?:\\.|[^"\\\n])*")|('(?:\\.|[^'\\\n])')|(\b[A-Za-z_]\w*\b)|(\b\d+\b)/g;

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
