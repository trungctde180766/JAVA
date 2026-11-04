"use client";

import React from "react";

export function isEntirelyCode(str) {
  if (!str || typeof str !== "string") return false;
  const s = str.trim();
  // Filter out pure English prose/outcomes
  if (/^(None of the above|Compilation fails|An exception is thrown)/i.test(s)) return false;
  if (/^(The |If |When |Which |Because |This |Constructors |Objects |Methods |Wrap a |Tightly encapsulated|You can extend)/i.test(s)) return false;

  // Code indicators
  if (/;\s*$/.test(s)) return true;
  if (/^(\w+(\.\w+)*)\s*\([^\)]*\)\s*;?$/.test(s)) return true;
  if (/^\{.*\}$/.test(s)) return true;
  if (/^[a-zA-Z0-9_\[\]\.]+\s*(=|==|!=|>|<|\+|-)\s*.+/.test(s)) return true;
  if (/^\b(abstract|final|static|public|protected|private|void|int|float|double|char|boolean|byte|short|long|String|class|interface|new|return|import|package|try|catch|finally|throw|throws|strictfp|transient|volatile|goto|super|this|native)\b/.test(s)) return true;
  if (/^(java\.lang|java\.util)\.[A-Za-z0-9_]+$/.test(s)) return true;
  if (/^[\d\s\+\-\*\/\%\(\)\<\>\&\|\^]+;?$/.test(s)) return true;
  if (s.includes(",") && !s.includes(" ") && /[a-zA-Z]/.test(s)) return true;
  return false;
}

export default function OptionFormattedText({ text, style }) {
  if (!text || typeof text !== "string") return text;

  // Check if string is entirely code
  if (isEntirelyCode(text)) {
    return (
      <code className="option-code-text" style={style}>
        {text}
      </code>
    );
  }

  // Check if text has quoted code parts or backticks, e.g. 'class B extends A {' or `code`
  if ((text.includes("'") || text.includes('"') || text.includes("`")) && /[a-zA-Z0-9_{}]/.test(text)) {
    const parts = text.split(/(['"`][^'"`]+['"`])/g);
    if (parts.length > 1) {
      return (
        <span style={style}>
          {parts.map((part, pIdx) => {
            if (/^['"`].+['"`]$/.test(part)) {
              const inner = part.slice(1, -1);
              return (
                <code key={pIdx} className="option-code-inline">
                  {inner}
                </code>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </span>
      );
    }
  }

  return <span style={style}>{text}</span>;
}
