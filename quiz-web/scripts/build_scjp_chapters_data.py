import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\scripts\scjp_raw_extracted.json", encoding="utf-8") as f:
    raw_data = json.load(f)

print(f"Loaded {len(raw_data)} raw questions.")

# Standard Vietnamese translation templates for common question phrases
TRANSLATION_MAP = {
    "what is the result? (choose one.)": "Kết quả khi chạy đoạn mã trên là gì? (Chọn 1 đáp án)",
    "what is the result?": "Kết quả khi chạy đoạn mã trên là gì?",
    "which statement is true?": "Phát biểu nào sau đây là ĐÚNG?",
    "which statement is true? (choose one.)": "Phát biểu nào sau đây là ĐÚNG? (Chọn 1 đáp án)",
    "which is a reserved word in the java programming language? (choose one.)": "Từ nào sau đây là từ khóa bảo lưu (reserved word) trong Java? (Chọn 1 đáp án)",
    "which one of these lists contains only java programming language keywords? (choose one.)": "Danh sách nào dưới đây CHỈ chứa các từ khóa của ngôn ngữ Java? (Chọn 1 đáp án)",
    "which two are keywords? (choose two.)": "Hai từ nào dưới đây là từ khóa trong Java? (Chọn 2 đáp án)",
    "which three are valid declarations of a char? (choose three.)": "Ba khai báo nào dưới đây là hợp lệ cho kiểu char? (Chọn 3 đáp án)",
    "which two are valid declarations of a string? (choose two.)": "Hai khai báo nào dưới đây là hợp lệ cho kiểu String? (Chọn 2 đáp án)",
    "which one is a valid declaration of a boolean? (choose one.)": "Khai báo nào dưới đây là hợp lệ cho kiểu boolean? (Chọn 1 đáp án)",
    "what is the numerical range of a char? (choose one.)": "Phạm vi giá trị số (numerical range) của kiểu char là gì? (Chọn 1 đáp án)",
    "which three are valid declarations of a float? (choose three.)": "Ba khai báo nào dưới đây là hợp lệ cho kiểu float? (Chọn 3 đáp án)",
    "which three are legal array declarations? (choose three.)": "Ba khai báo mảng nào dưới đây là hợp lệ? (Chọn 3 đáp án)",
    "how many lines of output will be produced? (choose one.)": "Đoạn mã trên sẽ in ra bao nhiêu dòng kết quả? (Chọn 1 đáp án)",
    "which two will declare an array and initialize it with five numbers? (choose two.)": "Hai khai báo nào sẽ tạo một mảng và khởi tạo mảng đó với 5 số? (Chọn 2 đáp án)",
    "which will legally declare, construct, and initialize an array? (choose one.)": "Khai báo nào dưới đây sẽ khai báo, khởi tạo đối tượng và gán giá trị mảng hợp lệ? (Chọn 1 đáp án)",
    "compilation fails": "Lỗi biên dịch (Compilation fails)",
    "compilation fails.": "Lỗi biên dịch (Compilation fails)",
    "an exception is thrown at runtime": "Ném ngoại lệ khi chạy runtime (An exception is thrown at runtime)",
    "an exception is thrown at runtime.": "Ném ngoại lệ khi chạy runtime (An exception is thrown at runtime)",
    "an exception occurs at runtime.": "Xảy ra ngoại lệ khi chạy runtime",
    "the code will not compile": "Code không thể biên dịch",
}

def translate_prompt(en_text):
    low = en_text.lower().strip()
    for k, v in TRANSLATION_MAP.items():
        if k in low:
            # replace or return
            pass
    # Basic translation helper
    vi = en_text
    vi = re.sub(r'Given the following,?\s*', 'Cho đoạn mã sau, ', vi, flags=re.IGNORECASE)
    vi = re.sub(r'What is the result\?\s*\(Choose one\.\)', 'Kết quả khi chạy đoạn mã trên là gì? (Chọn 1 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'What is the result\?', 'Kết quả khi chạy đoạn mã trên là gì?', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which statement is true\?\s*\(Choose one\.\)', 'Phát biểu nào sau đây là ĐÚNG? (Chọn 1 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which statement is true\?', 'Phát biểu nào sau đây là ĐÚNG?', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which two are keywords\?\s*\(Choose two\.\)', 'Hai từ nào dưới đây là từ khóa của Java? (Chọn 2 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which three are valid declarations of a char\?\s*\(Choose three\.\)', 'Ba khai báo nào hợp lệ cho kiểu char? (Chọn 3 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which two are valid declarations of a String\?\s*\(Choose two\.\)', 'Hai khai báo nào hợp lệ cho kiểu String? (Chọn 2 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which is a reserved word in the Java programming language\?\s*\(Choose one\.\)', 'Từ nào là từ khóa bảo lưu trong ngôn ngữ Java? (Chọn 1 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'What is the numerical range of a char\?\s*\(Choose one\.\)', 'Phạm vi giá trị số (range) của kiểu char là gì? (Chọn 1 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Which three are legal array declarations\?\s*\(Choose three\.\)', 'Ba khai báo mảng nào dưới đây là hợp lệ? (Chọn 3 đáp án)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'Compilation fails\.?', 'Lỗi biên dịch (Compilation fails)', vi, flags=re.IGNORECASE)
    vi = re.sub(r'An exception is thrown at runtime\.?', 'Ném ngoại lệ khi chạy runtime', vi, flags=re.IGNORECASE)
    return vi

def translate_option(en_opt):
    low = en_opt.strip().lower()
    if low in ["compilation fails", "compilation fails."]:
        return "Lỗi biên dịch (Compilation fails)"
    if low in ["an exception is thrown at runtime", "an exception is thrown at runtime.", "an exception occurs at runtime."]:
        return "Ném ngoại lệ tại thời điểm chạy (Runtime Exception)"
    if low == "none of the above.":
        return "Không có đáp án nào ở trên đúng"
    return en_opt

processed_questions = []

for q in raw_data:
    ch_num = q["chapterNum"]
    q_num = q["questionNum"]
    q_id = f"scjp-ch{ch_num:02d}-{q_num:03d}"
    
    opts_dict = q["options"]
    correct_letters = q["correctLetters"]
    
    # Determine single vs multi
    is_multi = len(correct_letters) > 1
    
    final_options = []
    final_options_vi = []
    final_answer_idx = 0
    
    if not is_multi:
        # Single choice
        # Keys in order: A, B, C, D...
        keys = sorted(opts_dict.keys())
        # If there are >= 4 keys, take keys; if correct letter is beyond D, ensure correct letter is included
        target_letter = correct_letters[0] if correct_letters else "A"
        
        # If keys has target_letter
        if target_letter in keys:
            final_answer_idx = keys.index(target_letter)
            final_options = [opts_dict[k] for k in keys]
            final_options_vi = [translate_option(opts_dict[k]) for k in keys]
        else:
            # Fallback
            keys = ["A", "B", "C", "D"]
            final_options = [opts_dict.get(k, k) for k in keys]
            final_options_vi = [translate_option(o) for o in final_options]
            final_answer_idx = 0
    else:
        # Multi choice: e.g. correct_letters = ['B', 'D']
        # We will format 4 combinations as single choices
        # Correct combination
        corr_str = " và ".join(correct_letters)
        corr_details = " & ".join([f"{l}: {opts_dict.get(l, '')}" for l in correct_letters])
        corr_opt = f"{corr_str} ({corr_details})"
        
        # Generate 3 realistic distractor combinations from available keys
        avail_keys = [k for k in sorted(opts_dict.keys()) if k not in correct_letters]
        if not avail_keys:
            avail_keys = [k for k in ["A", "B", "C", "D", "E", "F"] if k not in correct_letters]
            
        distractors = []
        # Distractor 1: take 1 correct and 1 wrong
        if len(correct_letters) >= 1 and len(avail_keys) >= 1:
            d1_keys = [correct_letters[0], avail_keys[0]]
            d1_keys.sort()
            distractors.append(" và ".join(d1_keys) + " (" + " & ".join([f"{l}: {opts_dict.get(l, '')}" for l in d1_keys]) + ")")
            
        # Distractor 2: take wrong keys
        if len(avail_keys) >= len(correct_letters):
            d2_keys = avail_keys[:len(correct_letters)]
            d2_keys.sort()
            distractors.append(" và ".join(d2_keys) + " (" + " & ".join([f"{l}: {opts_dict.get(l, '')}" for l in d2_keys]) + ")")
        elif len(avail_keys) >= 1:
            d2_keys = [avail_keys[-1]]
            distractors.append(f"{d2_keys[0]}: {opts_dict.get(d2_keys[0], '')}")
            
        # Distractor 3: another mix
        if len(correct_letters) >= 2 and len(avail_keys) >= 1:
            d3_keys = [correct_letters[1], avail_keys[-1]]
            d3_keys.sort()
            distractors.append(" và ".join(d3_keys) + " (" + " & ".join([f"{l}: {opts_dict.get(l, '')}" for l in d3_keys]) + ")")
        elif len(avail_keys) >= 2:
            d3_keys = avail_keys[1:1+len(correct_letters)]
            distractors.append(" và ".join(d3_keys) + " (" + " & ".join([f"{l}: {opts_dict.get(l, '')}" for l in d3_keys]) + ")")
            
        # Ensure we have 3 distractors
        fallback_letters = ["A, B", "C, D", "B, C", "A, D", "E, F"]
        f_idx = 0
        while len(distractors) < 3:
            cand = fallback_letters[f_idx % len(fallback_letters)]
            f_idx += 1
            if cand != corr_str and cand not in distractors:
                distractors.append(cand)
                
        # 4 options total
        all_4 = [corr_opt] + distractors[:3]
        final_options = all_4
        final_options_vi = [translate_option(o) for o in all_4]
        final_answer_idx = 0
        
    text_en = q["text"]
    text_vi = translate_prompt(text_en)
    
    processed_questions.append({
        "id": q_id,
        "originalId": q_num,
        "chapterNum": ch_num,
        "chapterTitle": q["chapterTitle"],
        "topic": q["topic"],
        "text": text_en,
        "textVi": text_vi,
        "code": q["code"],
        "options": final_options,
        "optionsVi": final_options_vi,
        "answer": final_answer_idx,
        "explanation": q["explanation"],
        "correctLetters": correct_letters
    })

print(f"Processed {len(processed_questions)} questions successfully.")
output_json_path = r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\scripts\scjp_processed.json"
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(processed_questions, f, ensure_ascii=False, indent=2)
print(f"Saved processed questions to {output_json_path}")
