import sys
import pypdf
import re
import json
import os

sys.stdout.reconfigure(encoding='utf-8')
import logging
logging.getLogger('pypdf').setLevel(logging.ERROR)

CHAPTER_METADATA = [
    {"num": 1, "file": "Ch01.pdf", "title": "Language Fundamentals", "st_p": 46, "ans_p": 54, "end_p": 57, "topic": "javacore"},
    {"num": 2, "file": "Ch02.pdf", "title": "Declarations and Access Control", "st_p": 76, "ans_p": 83, "end_p": 85, "topic": "modifier"},
    {"num": 3, "file": "Ch03.pdf", "title": "Operators and Assignments", "st_p": 51, "ans_p": 62, "end_p": 65, "topic": "javacore"},
    {"num": 4, "file": "Ch04.pdf", "title": "Flow Control, Exceptions, and Assertions", "st_p": 63, "ans_p": 75, "end_p": 80, "topic": "exception"},
    {"num": 5, "file": "Ch05.pdf", "title": "Object Orientation, Overloading, Overriding, Constructors", "st_p": 46, "ans_p": 57, "end_p": 59, "topic": "oop"},
    {"num": 6, "file": "Ch06.pdf", "title": "Java.lang – Math, Strings, and Wrappers", "st_p": 40, "ans_p": 50, "end_p": 53, "topic": "string"},
    {"num": 7, "file": "ch07.pdf", "title": "Objects and Collections", "st_p": 43, "ans_p": 48, "end_p": 50, "topic": "collection"},
    {"num": 8, "file": "ch08.pdf", "title": "Inner Classes", "st_p": 27, "ans_p": 33, "end_p": 35, "topic": "javacore"},
    {"num": 9, "file": "ch09.pdf", "title": "Threads", "st_p": 50, "ans_p": 60, "end_p": 65, "topic": "threads"},
]

def clean_text(txt):
    # Normalize headers/footers
    txt = re.sub(r'CertPrs8\(SUN\)[^\n]*', '\n', txt)
    txt = re.sub(r'P:\\010Comp[^\n]*', '\n', txt)
    txt = re.sub(r'Color profile:[^\n]*', '\n', txt)
    txt = re.sub(r'Wednesday, [^\n]*', '\n', txt)
    txt = re.sub(r'Composite\s+Default screen', '\n', txt)
    txt = re.sub(r'Blind Folio[^\n]*', '\n', txt)
    txt = re.sub(r'Self Test Answers\s+\d+', '\n', txt, flags=re.IGNORECASE)
    txt = re.sub(r'\d+\s+Chapter\s+\d+:[^\n]*', '\n', txt, flags=re.IGNORECASE)
    txt = re.sub(r'Chapter\s+\d+:\s+.*?\s+\d+$', '\n', txt, flags=re.IGNORECASE | re.MULTILINE)
    return txt

def extract_answers_for_chapter(ch_meta, reader):
    ans_txt = ''
    for p in range(ch_meta["ans_p"] - 1, ch_meta["end_p"]):
        ans_txt += '\n' + clean_text(reader.pages[p].extract_text() or '')
    
    # We want to match:
    # <num>. [/c254] <answer_letters> ... <explanation>
    # Note that <num> should be 1 to ~30
    pattern = r'(?:^|\n)\s*(\d{1,2})\.\s*(?:/c254)?\s*([A-Za-z0-9,\s&]+?(?:[\.;]|(?=\s+is\s+|\s+are\s+|\s+will\s+|\s+uses\s+|\s+defines\s+)))\s*([\s\S]*?)(?=(?:\n\s*\d{1,2}\.\s*(?:/c254)?\s*[A-Z]|\Z))'
    
    # Also remove exam objective headings like "Java Programming Language Keywords (Objective 4.4)"
    lines = ans_txt.split('\n')
    cleaned_lines = []
    for l in lines:
        if re.search(r'^\s*SELF TEST ANSWERS\s*$', l, re.IGNORECASE): continue
        if re.search(r'^\s*.*?\(\s*(?:Exam\s+)?Objective[s]?\s+[\d\.,\s]+\)\s*$', l, re.IGNORECASE): continue
        cleaned_lines.append(l)
    clean_ans_txt = '\n'.join(cleaned_lines)
    
    # Let's split by regex where line starts with a number dot: ^\s*(\d{1,2})\.\s*
    blocks = re.split(r'(?:^|\n)\s*(\d{1,2})\.\s*', clean_ans_txt)
    # blocks[0] is intro before question 1
    # blocks[1] is '1', blocks[2] is content of 1
    # blocks[3] is '2', blocks[4] is content of 2, etc.
    answers_map = {}
    for i in range(1, len(blocks), 2):
        q_num = int(blocks[i])
        content = blocks[i+1].strip()
        
        # Remove leading checkmark glyph if any
        content = re.sub(r'^/c254\s*', '', content).strip()
        
        # Find correct answer letters (e.g. "C.", "B and D.", "A, C, and F.", "E is correct.", "E will not compile")
        ans_letters_match = re.match(r'^([A-H](?:\s*(?:,|and|&)\s*[A-H])*)[\.\s,;]', content, re.IGNORECASE)
        letters = []
        if ans_letters_match:
            raw_letters = ans_letters_match.group(1).upper()
            letters = [l.strip() for l in re.findall(r'[A-H]', raw_letters)]
        else:
            # fallback: look for first capital letter
            m = re.match(r'^([A-H])', content)
            if m:
                letters = [m.group(1).upper()]
        
        # Clean explanation: remove "/c253", "/c254", format nicely
        expl = content
        expl = expl.replace('/c254', '✓ ')
        expl = expl.replace('/c253', '✗ ')
        expl = re.sub(r'\s+', ' ', expl).strip()
        
        answers_map[q_num] = {
            "letters": letters,
            "raw": content,
            "explanation": expl
        }
    return answers_map

def test():
    pdf_dir = r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\SCJP Chapter"
    for meta in CHAPTER_METADATA:
        reader = pypdf.PdfReader(os.path.join(pdf_dir, meta["file"]))
        ans = extract_answers_for_chapter(meta, reader)
        nums = sorted(ans.keys())
        print(f"Ch{meta['num']} ({meta['file']}): {len(nums)} answers extracted: {nums}")
        # print sample of answer 1
        if 1 in ans:
            print(f"   Q1 letters: {ans[1]['letters']} | Expl: {ans[1]['explanation'][:100]}...")

if __name__ == "__main__":
    test()
