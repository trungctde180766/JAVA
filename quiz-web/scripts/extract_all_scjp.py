import sys
import pypdf
import re
import json
import os

sys.stdout.reconfigure(encoding='utf-8')
import logging
logging.getLogger('pypdf').setLevel(logging.ERROR)

CHAPTERS = [
    {"num": 1, "file": "Ch01.pdf", "title": "Language Fundamentals", "st_p": 46, "sta_p": 54, "end_p": 57, "total": 20, "topic": "javacore"},
    {"num": 2, "file": "Ch02.pdf", "title": "Declarations and Access Control", "st_p": 76, "sta_p": 83, "end_p": 85, "total": 15, "topic": "modifier"},
    {"num": 3, "file": "Ch03.pdf", "title": "Operators and Assignments", "st_p": 51, "sta_p": 62, "end_p": 65, "total": 18, "topic": "javacore"},
    {"num": 4, "file": "Ch04.pdf", "title": "Flow Control, Exceptions, and Assertions", "st_p": 63, "sta_p": 75, "end_p": 80, "total": 20, "topic": "exception"},
    {"num": 5, "file": "Ch05.pdf", "title": "Object Orientation, Overloading, Overriding, Constructors", "st_p": 46, "sta_p": 57, "end_p": 59, "total": 21, "topic": "oop"},
    {"num": 6, "file": "Ch06.pdf", "title": "Java.lang – Math, Strings, and Wrappers", "st_p": 40, "sta_p": 50, "end_p": 53, "total": 19, "topic": "string"},
    {"num": 7, "file": "ch07.pdf", "title": "Objects and Collections", "st_p": 43, "sta_p": 48, "end_p": 50, "total": 15, "topic": "collection"},
    {"num": 8, "file": "ch08.pdf", "title": "Inner Classes", "st_p": 27, "sta_p": 33, "end_p": 35, "total": 12, "topic": "javacore"},
    {"num": 9, "file": "ch09.pdf", "title": "Threads", "st_p": 50, "sta_p": 60, "end_p": 65, "total": 21, "topic": "threads"},
]

PDF_DIR = r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\SCJP Chapter"
QUESTION_WORD = re.compile(r'^(?:Given|Which|What|How|When|Where|Select|Assume|In\b|Under|Consider|An?\b|The\b|Two\b|You\b|Suppose|If\s+(?!\()|Insert|According|With\b|True|State|Can\b)', re.IGNORECASE)

def clean_text(txt):
    txt = re.sub(r'CertPrs8\(SUN\)[^\n]*', '\n', txt)
    txt = re.sub(r'P:\\010Comp[^\n]*', '\n', txt)
    txt = re.sub(r'Color profile:[^\n]*', '\n', txt)
    txt = re.sub(r'Wednesday, [^\n]*', '\n', txt)
    txt = re.sub(r'Composite\s+Default screen', '\n', txt)
    txt = re.sub(r'Blind Folio[^\n]*', '\n', txt)
    txt = re.sub(r'Self Test Answers[ \t]+\d+', '\n', txt, flags=re.IGNORECASE)
    txt = re.sub(r'Self Test[ \t]+\d+', '\n', txt, flags=re.IGNORECASE)
    return txt

def extract_all():
    extracted = []
    
    for ch in CHAPTERS:
        fn = ch["file"]
        reader = pypdf.PdfReader(os.path.join(PDF_DIR, fn))
        
        # 1. Extract Question Text
        q_txt = ''
        for p in range(ch["st_p"] - 1, ch["sta_p"] - 1):
            q_txt += '\n' + clean_text(reader.pages[p].extract_text() or '')
        if 'SELF TEST ANSWERS' in q_txt:
            q_txt = q_txt[:q_txt.find('SELF TEST ANSWERS')]
            
        lines = q_txt.split('\n')
        questions = {}
        curr_q = 0
        curr_lines = []
        for line in lines:
            s = line.strip()
            next_q = curr_q + 1
            m = re.match(rf'^{next_q}\.\s+(.*)', s)
            if m and next_q <= ch["total"]:
                rest = m.group(1).strip()
                if QUESTION_WORD.match(rest) and not re.search(r'^\s*if\s*\(', rest, re.IGNORECASE):
                    if curr_q > 0:
                        questions[curr_q] = '\n'.join(curr_lines)
                    curr_q = next_q
                    curr_lines = [s]
                    continue
            if curr_q > 0:
                curr_lines.append(line)
        if curr_q > 0:
            questions[curr_q] = '\n'.join(curr_lines)
            
        # 2. Extract Answers Text
        ans_txt = ''
        for p in range(ch["sta_p"] - 1, ch["end_p"]):
            ans_txt += '\n' + clean_text(reader.pages[p].extract_text() or '')
        if 'SELF TEST ANSWERS' in ans_txt:
            ans_txt = ans_txt[ans_txt.find('SELF TEST ANSWERS'):]
            
        lines = ans_txt.split('\n')
        ans_map = {}
        curr_a = 0
        curr_lines = []
        for line in lines:
            s = line.strip()
            next_a = curr_a + 1
            m = re.match(rf'^{next_a}\.\s*(?:/c254)?\s*(.+)', s)
            if m and next_a <= ch["total"]:
                rest = m.group(1).strip()
                if not re.match(r'^(?:public|class|import|package|static|void|int|float|double|byte|short|char|boolean|String|final|try|catch|if|for|while|return)\b', rest):
                    if curr_a > 0:
                        ans_map[curr_a] = '\n'.join(curr_lines)
                    curr_a = next_a
                    curr_lines = [s]
                    continue
            if curr_a > 0:
                curr_lines.append(line)
        if curr_a > 0:
            ans_map[curr_a] = '\n'.join(curr_lines)
            
        # 3. Parse each question into structured data
        for q_idx in range(1, ch["total"] + 1):
            raw_q = questions.get(q_idx, '')
            raw_a = ans_map.get(q_idx, '')
            
            # Parse Answer
            ans_letters_match = re.search(r'(?:/c254)?\s*([A-H](?:\s*(?:,|and|&)\s*[A-H])*)[\.\s,;]', raw_a)
            correct_letters = []
            if ans_letters_match:
                correct_letters = [l.strip() for l in re.findall(r'[A-H]', ans_letters_match.group(1))]
            
            clean_expl = raw_a
            # Remove leading number like '1. /c254'
            clean_expl = re.sub(r'^\d+\.\s*(?:/c254)?\s*', '', clean_expl).strip()
            clean_expl = clean_expl.replace('/c254', '✓ ')
            clean_expl = clean_expl.replace('/c253', '✗ ')
            clean_expl = re.sub(r'\s+', ' ', clean_expl).strip()
            
            # Parse Question Text & Options
            q_lines = raw_q.split('\n')
            opt_start_idx = None
            for i, l in enumerate(q_lines):
                if re.match(r'^[A-H]\.\s+', l.strip()):
                    opt_start_idx = i
                    break
                    
            body_lines = q_lines[:opt_start_idx] if opt_start_idx is not None else q_lines
            opt_lines = q_lines[opt_start_idx:] if opt_start_idx is not None else []
            
            # Options dict
            options_dict = {}
            curr_opt = None
            curr_opt_buf = []
            for l in opt_lines:
                s = l.strip()
                om = re.match(r'^([A-H])\.\s*(.*)', s)
                if om:
                    if curr_opt:
                        options_dict[curr_opt] = ' '.join(curr_opt_buf).strip()
                    curr_opt = om.group(1).upper()
                    curr_opt_buf = [om.group(2).strip()]
                else:
                    if curr_opt and s:
                        curr_opt_buf.append(s)
            if curr_opt:
                options_dict[curr_opt] = ' '.join(curr_opt_buf).strip()
                
            # Question text and code
            first_body = re.sub(r'^\d+\.\s*', '', body_lines[0].strip()) if body_lines else ""
            remaining_body = [l.rstrip() for l in body_lines[1:]]
            all_body = [first_body] + remaining_body
            
            code_lines = []
            text_lines = []
            in_code = False
            for l in all_body:
                ls = l.strip()
                if not ls: continue
                # Check code indicator
                is_code = re.match(r'^\d+\.\s+(?:public|private|protected|class|interface|import|package|static|void|int|float|double|byte|short|char|boolean|String|final|try|catch|finally|if|for|while|do|switch|case|return|super|this|new|\{|\}|//|[a-zA-Z0-9_]+\s+[a-zA-Z0-9_]+|[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+|System\.out)', ls)
                if is_code:
                    in_code = True
                    code_lines.append(ls)
                elif in_code:
                    if re.match(r'^(?:what|which|how|when|where|select|and\b|assuming|at\s+what)\b', ls, re.IGNORECASE):
                        in_code = False
                        text_lines.append(ls)
                    else:
                        code_lines.append(ls)
                else:
                    text_lines.append(ls)
                    
            q_text = ' '.join(text_lines).strip()
            q_code = '\n'.join(code_lines).strip()
            
            extracted.append({
                "chapterNum": ch["num"],
                "chapterTitle": ch["title"],
                "questionNum": q_idx,
                "topic": ch["topic"],
                "text": q_text,
                "code": q_code,
                "options": options_dict,
                "correctLetters": correct_letters,
                "explanation": clean_expl
            })
            
    print(f"Extracted {len(extracted)} questions total across all 9 chapters.")
    out_path = r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\scripts\scjp_raw_extracted.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(extracted, f, ensure_ascii=False, indent=2)
    print(f"Saved to {out_path}")

if __name__ == "__main__":
    extract_all()
