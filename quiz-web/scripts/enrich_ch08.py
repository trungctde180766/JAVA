# -*- coding: utf-8 -*-
import json
import os

enriched_ch08 = [
    {
        "id": "scjp-ch08-001",
        "originalId": 1,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\npublic class MyOuter {\n  public static class MyInner {\n    public static void foo() { }\n  }\n}\nwhich statement, if placed in a class other than MyOuter or MyInner, instantiates an instance of the nested class?",
        "textVi": "Cho đoạn mã sau:\npublic class MyOuter {\n  public static class MyInner {\n    public static void foo() { }\n  }\n}\nCâu lệnh nào sau đây, khi được đặt trong một lớp khác (ngoài MyOuter và MyInner), sẽ khởi tạo một đối tượng (instance) của lớp lồng tĩnh (nested class)?",
        "code": "public class MyOuter {\n  public static class MyInner {\n    public static void foo() { }\n  }\n}",
        "options": [
            "MyOuter.MyInner m = new MyOuter.MyInner();",
            "MyOuter.MyInner mi = new MyInner();",
            "MyOuter m = new MyOuter(); MyOuter.MyInner mi = m.new MyOuter.MyInner();",
            "MyInner mi = new MyOuter.MyInner();"
        ],
        "optionsVi": [
            "MyOuter.MyInner m = new MyOuter.MyInner();",
            "MyOuter.MyInner mi = new MyInner();",
            "MyOuter m = new MyOuter(); MyOuter.MyInner mi = m.new MyOuter.MyInner();",
            "MyInner mi = new MyOuter.MyInner();"
        ],
        "answer": 0,
        "correctLetters": ["A"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Bản chất của Static Nested Class (Lớp lồng tĩnh):
• Trong Java, từ khóa `static` đặt trước một lớp bên trong (`public static class MyInner`) biến nó thành một lớp tĩnh lồng nhau (Static Nested Class).
• Khác với Inner Class thông thường (non-static inner class), một `static nested class` KHÔNG gắn liền với bất kỳ đối tượng cụ thể nào của lớp bao bọc ngoài (`MyOuter`). Nó độc lập tương tự như một lớp top-level thông thường, nhưng được đặt bên trong không gian tên (namespace) của `MyOuter` để gom nhóm logic và bảo đảm tính đóng gói.

2. Cú pháp khởi tạo từ một lớp bên ngoài:
• Khai báo kiểu biến tham chiếu: Vì đứng ở lớp bên ngoài, trình biên dịch chưa biết `MyInner` là gì nếu không import, do đó ta phải dùng tên định danh đầy đủ có phạm vi bao bọc: `MyOuter.MyInner`.
• Khởi tạo đối tượng bằng toán tử `new`: Tương tự, ta phải chỉ rõ lớp ngoài làm tiền tố: `new MyOuter.MyInner()`. Không cần (và không thể) dùng đối tượng của `MyOuter` để `new`!
• Ghép lại thành câu lệnh chuẩn xác:
  `MyOuter.MyInner m = new MyOuter.MyInner();`

✅ Vì sao đáp án "MyOuter.MyInner m = new MyOuter.MyInner();" đúng:
Vì `MyInner` là static nested class, việc khai báo kiểu dữ liệu và gọi toán tử `new` từ lớp bên ngoài đều phải sử dụng tên định danh đầy đủ theo phạm vi `MyOuter.MyInner`.

❌ Vì sao các đáp án khác sai:
• "MyOuter.MyInner mi = new MyInner();": Sai vì sau từ khóa `new` không có tên lớp bao ngoài `MyOuter.`, trình biên dịch ở lớp khác sẽ không thể tìm thấy lớp `MyInner`.
• "MyOuter m = new MyOuter(); MyOuter.MyInner mi = m.new MyOuter.MyInner();": Sai vì cú pháp `m.new` chỉ dành cho Inner Class thông thường (non-static), không áp dụng cho static nested class.
• "MyInner mi = new MyOuter.MyInner();": Sai vì kiểu khai báo biến `MyInner mi` thiếu tên tiền tố `MyOuter.`, dẫn đến lỗi biên dịch \"cannot find symbol MyInner\".

⚠️ Mẹo nhớ / Lưu ý:
• Static nested class = Cứ coi như lớp bình thường, chỉ cần thêm `OuterClass.` ở trước tên lớp: `Outer.Nested obj = new Outer.Nested();`.
• Non-static inner class = Buộc phải có đối tượng ngoài để sinh ra đối tượng trong: `outerObj.new Inner();`."""
    },
    {
        "id": "scjp-ch08-002",
        "originalId": 2,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Which two are true about a static nested class? (Choose two.)",
        "textVi": "Hai phát biểu nào sau đây là ĐÚNG về một lớp lồng tĩnh (static nested class)? (Chọn 2 đáp án)",
        "code": "",
        "options": [
            "B và D (B: Nó không có quyền truy cập trực tiếp tới các thành viên phi tĩnh (non-static) của lớp bao bọc ngoài. & D: Nó có thể được khởi tạo bằng cú pháp new MyOuter.MyInner();.)",
            "A và B (A: Bạn bắt buộc phải có một tham chiếu tới đối tượng của lớp ngoài thì mới khởi tạo được nó. & B: Nó không có quyền truy cập trực tiếp tới các thành viên phi tĩnh của lớp bao bọc ngoài.)",
            "A và C (A: Bạn bắt buộc phải có một tham chiếu tới đối tượng của lớp ngoài thì mới khởi tạo được nó. & C: Tất cả biến và phương thức bên trong nó bắt buộc phải là static.)",
            "D và E (D: Nó có thể được khởi tạo bằng cú pháp new MyOuter.MyInner();. & E: Nó bắt buộc phải kế thừa (extend) lớp bao bọc ngoài.)"
        ],
        "optionsVi": [
            "B và D (B: Nó không có quyền truy cập trực tiếp tới các thành viên phi tĩnh (non-static) của lớp bao bọc ngoài. & D: Nó có thể được khởi tạo bằng cú pháp new MyOuter.MyInner();.)",
            "A và B (A: Bạn bắt buộc phải có một tham chiếu tới đối tượng của lớp ngoài thì mới khởi tạo được nó. & B: Nó không có quyền truy cập trực tiếp tới các thành viên phi tĩnh của lớp bao bọc ngoài.)",
            "A và C (A: Bạn bắt buộc phải có một tham chiếu tới đối tượng của lớp ngoài thì mới khởi tạo được nó. & C: Tất cả biến và phương thức bên trong nó bắt buộc phải là static.)",
            "D và E (D: Nó có thể được khởi tạo bằng cú pháp new MyOuter.MyInner();. & E: Nó bắt buộc phải kế thừa (extend) lớp bao bọc ngoài.)"
        ],
        "answer": 0,
        "correctLetters": ["B", "D"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Bản chất phát biểu B:
Một static nested class hoạt động giống hệt như một phương thức `static` trong lớp bao bọc (`MyOuter`).
Vì nó mang bản chất tĩnh (static context), nó KHÔNG sở hữu một con trỏ ngầm định `this` trỏ tới đối tượng lớp ngoài. Do đó, nó không thể truy cập trực tiếp các biến thực thể (instance variables) hoặc phương thức phi tĩnh (non-static methods) của lớp ngoài nếu không thông qua một đối tượng cụ thể. Do đó phát biểu B ĐÚNG.

2. Bản chất phát biểu D:
Bởi vì không phụ thuộc vào một đối tượng cụ thể của lớp ngoài, static nested class được khởi tạo độc lập bằng cú pháp trực tiếp thông qua tên lớp: `new MyOuter.MyInner();`. Do đó phát biểu D ĐÚNG.

3. Phân tích các phát biểu sai:
• Phát biểu A: \"Phải có tham chiếu tới đối tượng của lớp ngoài mới khởi tạo được\": SAI, đây là đặc trưng của non-static inner class (cần `outerRef.new Inner()`). Static nested class không cần đối tượng lớp ngoài.
• Phát biểu C: \"Các biến và phương thức của nó bắt buộc phải là static\": SAI hoàn toàn. Lớp mang từ khóa `static` không có nghĩa là mọi thành viên bên trong nó phải là `static`. Bạn hoàn toàn có thể khai báo các biến `int x;`, phương thức `void print() {}` bình thường bên trong static nested class và tạo nhiều đối tượng thực thể của nó.
• Phát biểu E: \"Nó bắt buộc phải kế thừa lớp ngoài\": SAI, không có quy tắc nào bắt buộc lớp lồng phải kế thừa lớp bao ngoài.

✅ Vì sao đáp án "B và D" đúng:
• B phản ánh đúng tính chất ngữ cảnh static (không truy cập trực tiếp non-static member của outer class).
• D phản ánh đúng cú pháp khởi tạo tiêu chuẩn của static nested class.

❌ Vì sao các đáp án khác sai:
• Các phương án chứa A sai vì nhầm lẫn với non-static inner class.
• Các phương án chứa C sai vì nhầm lẫn giữa việc bản thân class là static với việc các member bên trong phải là static.
• Các phương án chứa E sai vì đưa ra luật kế thừa vô căn cứ.

⚠️ Mẹo nhớ / Lưu ý:
• Static nested class KHÔNG PHẢI là Inner class thực thụ (về mặt thuật ngữ Java: Inner class là non-static; còn Static nested class là static).
• Nó giống hệt một class top-level bình thường, chỉ là được "nhét" vào bên trong thân của một class khác."""
    },
    {
        "id": "scjp-ch08-003",
        "originalId": 3,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Which constructs an anonymous inner class instance?",
        "textVi": "Cú pháp nào sau đây khởi tạo hợp lệ một đối tượng của lớp nội danh ẩn danh (anonymous inner class)?",
        "code": "",
        "options": [
            "Runnable r = new Runnable() {};",
            "Runnable r = new Runnable(public void run() {});",
            "Runnable r = new Runnable {public void run() {}};",
            "Runnable r = new Runnable() {public void run{}};",
            "System.out.println(new Runnable() {public void run() {}});"
        ],
        "optionsVi": [
            "Runnable r = new Runnable() {};",
            "Runnable r = new Runnable(public void run() {});",
            "Runnable r = new Runnable {public void run() {}};",
            "Runnable r = new Runnable() {public void run{}};",
            "System.out.println(new Runnable() {public void run() {}});"
        ],
        "answer": 4,
        "correctLetters": ["E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Quy tắc cú pháp của Anonymous Inner Class (Lớp ẩn danh):
Khi tạo một anonymous inner class cài đặt một interface (ở đây là `Runnable`):
• Bắt buộc phải có cặp ngoặc tròn gọi hàm khởi tạo: `new Runnable()`
• Ngay sau đó là cặp ngoặc nhọn `{ ... }` định nghĩa phần thân của lớp ẩn danh.
• Vì `Runnable` là một interface có phương thức trừu tượng `public void run()`, lớp con ẩn danh BẮT BUỘC phải ghi đè đầy đủ phương thức này: `public void run() { ... }`.
• Một biểu thức khởi tạo anonymous inner class có thể được gán vào một biến, hoặc truyền trực tiếp vào một phương thức như một đối số (ví dụ truyền vào `System.out.println(...)`).

2. So sánh từng phương án:
• Phương án A: `Runnable r = new Runnable() {};`
  -> SAI vì thân lớp `{}` không ghi đè phương thức `run()`. Lớp ẩn danh không thể là `abstract`, nên nếu không cài đặt đủ các phương thức của interface thì trình biên dịch sẽ báo lỗi.
• Phương án B: `new Runnable(public void run() {})`
  -> SAI cú pháp nghiêm trọng: Định nghĩa phương thức được nhét vào trong cặp ngoặc tròn truyền đối số constructor.
• Phương án C: `new Runnable { ... }`
  -> SAI cú pháp: Thiếu cặp ngoặc tròn `()` sau tên interface/class.
• Phương án D: `{public void run{}}`
  -> SAI cú pháp: Tên phương thức `run` bị thiếu cặp ngoặc tròn `()` của danh sách tham số.
• Phương án E: `System.out.println(new Runnable() {public void run() {}});`
  -> ĐÚNG 100%! Cú pháp `new Runnable() { public void run() {} }` hoàn toàn hợp lệ, triển khai đầy đủ `run()`, và đối tượng vừa tạo ra được truyền thẳng vào hàm `System.out.println(...)`.

✅ Vì sao đáp án "System.out.println(new Runnable() {public void run() {}});" đúng:
Đáp án này tuân thủ đầy đủ mọi quy tắc cú pháp của Java: có ngoặc tròn khởi tạo `new Runnable()`, mở ngoặc nhọn `{...}`, và ghi đè đầy đủ phương thức trừu tượng `public void run() {}` của interface `Runnable`.

❌ Vì sao các đáp án khác sai:
• "Runnable r = new Runnable() {};": Sai vì vi phạm hợp đồng interface (không override `run()`).
• "Runnable r = new Runnable(public void run() {});": Sai vì cú pháp Java không cho phép định nghĩa hàm trong ngoặc đơn đối số.
• "Runnable r = new Runnable {public void run() {}};": Sai vì thiếu ngoặc tròn `()` sau `Runnable`.
• "Runnable r = new Runnable() {public void run{}};": Sai vì `run` không có cặp ngoặc tròn `()` định nghĩa tham số.

⚠️ Mẹo nhớ / Lưu ý:
• Anonymous Inner Class cài đặt interface luôn luôn phải có dạng:
  `new InterfaceName() { // override all abstract methods }`
• Thiếu `()` là lỗi cú pháp, không override hết method trừu tượng là lỗi biên dịch!"""
    },
    {
        "id": "scjp-ch08-004",
        "originalId": 4,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\nclass Boo {\n  Boo(String s) { }\n  Boo() { }\n}\nclass Bar extends Boo {\n  Bar() { }\n  Bar(String s) { super(s); }\n  void zoo() {\n    // insert code here\n  }\n}\nwhich two create an anonymous inner class from within class Bar? (Choose two.)",
        "textVi": "Cho đoạn mã sau:\nclass Boo {\n  Boo(String s) { }\n  Boo() { }\n}\nclass Bar extends Boo {\n  Bar() { }\n  Bar(String s) { super(s); }\n  void zoo() {\n    // chèn mã tại đây\n  }\n}\nHai câu lệnh nào dưới đây sẽ tạo một lớp nội danh ẩn danh (anonymous inner class) hợp lệ từ bên trong lớp Bar? (Chọn 2 đáp án)",
        "code": "class Boo {\n  Boo(String s) { }\n  Boo() { }\n}\nclass Bar extends Boo {\n  Bar() { }\n  Bar(String s) { super(s); }\n  void zoo() {\n    // insert code here\n  }\n}",
        "options": [
            "B và C (B: Boo f = new Bar() {}; & C: Boo f = new Boo() { String s; };)",
            "A và B (A: Boo f = new Boo(24) {}; & B: Boo f = new Bar() {};)",
            "A và D (A: Boo f = new Boo(24) {}; & D: Bar f = new Boo(String s) {};)",
            "C và E (C: Boo f = new Boo() { String s; }; & E: Boo f = new Boo.Bar(String s) {};)"
        ],
        "optionsVi": [
            "B và C (B: Boo f = new Bar() {}; & C: Boo f = new Boo() { String s; };)",
            "A và B (A: Boo f = new Boo(24) {}; & B: Boo f = new Bar() {};)",
            "A và D (A: Boo f = new Boo(24) {}; & D: Bar f = new Boo(String s) {};)",
            "C và E (C: Boo f = new Boo() { String s; }; & E: Boo f = new Boo.Bar(String s) {};)"
        ],
        "answer": 0,
        "correctLetters": ["B", "C"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân tích quan hệ kế thừa và Constructor:
• Lớp `Boo` có 2 constructor: `Boo(String s)` và `Boo()`.
• Lớp `Bar` kế thừa `Boo` (`class Bar extends Boo`), có 2 constructor: `Bar()` và `Bar(String s)`.

2. Xem xét từng câu lệnh độc lập:
• Câu lệnh B: `Boo f = new Bar() {};`
  - `new Bar() {}`: Tạo một lớp con ẩn danh kế thừa từ `Bar`. Lớp này gọi constructor không đối số `Bar()`.
  - Đối tượng con của `Bar` được gán vào biến tham chiếu kiểu cha `Boo f`.
  - Tính đa hình (Polymorphism) hoàn toàn hợp lệ: Lớp con của `Bar` đương nhiên cũng là một kiểu `Boo`. Câu lệnh này ĐÚNG!
• Câu lệnh C: `Boo f = new Boo() { String s; };`
  - `new Boo() {}`: Tạo một lớp con ẩn danh kế thừa từ `Boo`, gọi constructor không đối số `Boo()`.
  - Trong thân lớp ẩn danh `{ String s; }`, khai báo thêm một trường dữ liệu `s`. Điều này hoàn toàn hợp lệ trong Java.
  - Đối tượng được gán vào biến `Boo f`. Câu lệnh này ĐÚNG!

3. Phân tích các câu lệnh sai:
• Câu lệnh A: `Boo f = new Boo(24) {};`
  -> SAI vì lớp `Boo` chỉ có constructor nhận `String` hoặc không tham số, không hề có constructor nhận số nguyên `int` 24. Trình biên dịch báo lỗi \"cannot find constructor Boo(int)\".
• Câu lệnh D: `Bar f = new Boo(\"hello\") {};`
  -> SAI vì vi phạm nguyên tắc đa hình: `new Boo(...)` tạo ra đối tượng lớp cha `Boo`, không thể gán ngược lại cho biến kiểu con `Bar f` mà không ép kiểu (upcasting vs downcasting).
• Câu lệnh E: `Boo f = new Boo.Bar(String s) {};`
  -> SAI vì `Bar` là lớp độc lập cùng package kế thừa `Boo`, không phải là inner class nằm bên trong `Boo` (`Boo.Bar` không tồn tại), và `String s` trong ngoặc tròn gọi hàm là sai cú pháp truyền đối số.

✅ Vì sao đáp án "B và C" đúng:
• B áp dụng đúng tính đa hình khi gán lớp con ẩn danh của `Bar` cho tham chiếu `Boo`.
• C sử dụng đúng constructor không đối số của `Boo` và thêm biến thành viên hợp lệ vào thân lớp ẩn danh.

❌ Vì sao các đáp án khác sai:
• Phương án chứa A sai vì gọi constructor `Boo(int)` không tồn tại.
• Phương án chứa D sai vì vi phạm quy tắc gán đa hình (lớp cha không thể gán trực tiếp cho tham chiếu lớp con).
• Phương án chứa E sai vì `Boo.Bar` không tồn tại.

⚠️ Mẹo nhớ / Lưu ý:
• Anonymous class khi `new ClassName(args) {}` BẮT BUỘC phải truyền đối số khớp với một constructor đang có sẵn của `ClassName`.
• Quy tắc đa hình áp dụng cho anonymous class giống hệt lớp thông thường."""
    },
    {
        "id": "scjp-ch08-005",
        "originalId": 5,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\n1. class Foo {\n2.   class Bar{ }\n3. }\n4. class Test {\n5.   public static void main (String [] args) {\n6.     Foo f = new Foo();\n7.     // Insert code here\n8.   }\n9. }\nwhich statement, inserted at line 7, creates an instance of Bar?",
        "textVi": "Cho đoạn mã sau:\n1. class Foo {\n2.   class Bar{ }\n3. }\n4. class Test {\n5.   public static void main (String [] args) {\n6.     Foo f = new Foo();\n7.     // Chèn mã tại đây\n8.   }\n9. }\nCâu lệnh nào sau đây, khi được chèn vào dòng 7, sẽ tạo một đối tượng thực thể của Bar?",
        "code": "1. class Foo {\n2.   class Bar{ }\n3. }\n4. class Test {\n5.   public static void main (String [] args) {\n6.     Foo f = new Foo();\n7.     // Insert code here\n8.   }\n9. }",
        "options": [
            "Foo.Bar b = new Foo.Bar();",
            "Foo.Bar b = f.new Bar();",
            "Bar b = new f.Bar();",
            "Bar b = f.new Bar();",
            "Foo.Bar b = new f.Bar();"
        ],
        "optionsVi": [
            "Foo.Bar b = new Foo.Bar();",
            "Foo.Bar b = f.new Bar();",
            "Bar b = new f.Bar();",
            "Bar b = f.new Bar();",
            "Foo.Bar b = new f.Bar();"
        ],
        "answer": 1,
        "correctLetters": ["B"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Bản chất của Non-static Inner Class (Lớp nội thông thường):
• Lớp `Bar` được khai báo bên trong `Foo` mà không có từ khóa `static`.
• Đây là một non-static inner class (thành viên thực thể của lớp `Foo`).
• Điều này đồng nghĩa với việc: Mọi đối tượng `Bar` sinh ra đều BẮT BUỘC phải gắn liền với một đối tượng cụ thể của `Foo` (sở hữu một tham chiếu ngầm định `Foo.this`).

2. Cú pháp khởi tạo từ lớp ngoài (`Test`):
• Khai báo kiểu dữ liệu của biến: Vì lớp `Test` nằm ngoài `Foo`, nó phải dùng cú pháp phân cấp: `Foo.Bar b`.
• Khởi tạo đối tượng: Vì `Bar` cần một đối tượng `Foo` bảo trợ, ta phải gọi toán tử `new` thông qua biến tham chiếu của đối tượng `Foo` đã tạo ở dòng 6 (`f`):
  `f.new Bar();`
  (Chú ý: Sau `f.new` chỉ là tên của chính inner class `Bar()`, KHÔNG lặp lại `Foo.Bar()`).
• Ghép lại câu lệnh chuẩn chỉ:
  `Foo.Bar b = f.new Bar();`

✅ Vì sao đáp án "Foo.Bar b = f.new Bar();" đúng:
Đây là cú pháp duy nhất chuẩn xác trong Java: kiểu biến tham chiếu là `Foo.Bar` và biểu thức khởi tạo là `f.new Bar()`.

❌ Vì sao các đáp án khác sai:
• "Foo.Bar b = new Foo.Bar();": Sai vì cú pháp này chỉ dành cho static nested class. Với non-static inner class, viết thế này sẽ báo lỗi biên dịch \"an enclosing instance that contains Foo.Bar is required\".
• "Bar b = new f.Bar();": Sai cả về kiểu biến (ở ngoài lớp Foo không thể gọi tắt `Bar b` nếu không import) lẫn cú pháp `new f.Bar()` hoàn toàn không hợp lệ trong Java.
• "Bar b = f.new Bar();": Sai ở phần khai báo kiểu `Bar b`, trình biên dịch không thể nhận diện được lớp `Bar` nằm ở đâu.
• "Foo.Bar b = new f.Bar();": Sai vì đặt từ khóa `new` trước biến tham chiếu `f` là sai ngữ pháp Java.

⚠️ Mẹo nhớ / Lưu ý:
• Cú pháp "kỳ quặc" chỉ có ở Java Inner Class:
  `biến_ngoài.new TênLớpTrong()` (Ví dụ: `f.new Bar()`).
• Nhớ thứ tự: [Đối tượng ngoài] . new [Lớp trong]()."""
    },
    {
        "id": "scjp-ch08-006",
        "originalId": 6,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Which two are true about a method-local inner class? (Choose two.)",
        "textVi": "Hai phát biểu nào sau đây là ĐÚNG về một lớp nội cục bộ trong phương thức (method-local inner class)? (Chọn 2 đáp án)",
        "code": "",
        "options": [
            "B và E (B: Nó có thể được khai báo với từ khóa abstract. & E: Nó có thể truy cập các thành viên private của lớp bao bọc ngoài.)",
            "A và B (A: Nó bắt buộc phải được khai báo với từ khóa final. & B: Nó có thể được khai báo với từ khóa abstract.)",
            "A và C (A: Nó bắt buộc phải được khai báo với từ khóa final. & C: Nó có thể được khai báo với từ khóa public.)",
            "D và E (D: Nó có thể được khai báo với từ khóa static. & E: Nó có thể truy cập các thành viên private của lớp bao bọc ngoài.)"
        ],
        "optionsVi": [
            "B và E (B: Nó có thể được khai báo với từ khóa abstract. & E: Nó có thể truy cập các thành viên private của lớp bao bọc ngoài.)",
            "A và B (A: Nó bắt buộc phải được khai báo với từ khóa final. & B: Nó có thể được khai báo với từ khóa abstract.)",
            "A và C (A: Nó bắt buộc phải được khai báo với từ khóa final. & C: Nó có thể được khai báo với từ khóa public.)",
            "D và E (D: Nó có thể được khai báo với từ khóa static. & E: Nó có thể truy cập các thành viên private của lớp bao bọc ngoài.)"
        ],
        "answer": 0,
        "correctLetters": ["B", "E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Bản chất của Method-Local Inner Class (Lớp định nghĩa bên trong một hàm):
• Là một lớp được khai báo trực tiếp bên trong thân của một phương thức.
• Phạm vi (scope) của nó hoàn toàn mang tính cục bộ giống như một biến cục bộ: nó chỉ tồn tại và chỉ có thể được sử dụng bên trong phương thức đó.

2. Phân tích các phát biểu đúng:
• Phát biểu B: "Nó có thể được đánh dấu là `abstract`" -> ĐÚNG. Một method-local inner class hoàn toàn có thể là `abstract` (sau đó bên dưới cùng phương thức đó, một lớp cục bộ khác kế thừa nó để cài đặt). Trình biên dịch chấp nhận hợp lệ.
• Phát biểu E: "Nó có thể truy cập các thành viên `private` của lớp ngoài" -> ĐÚNG. Giống như mọi inner class khác, nó có quan hệ mật thiết với lớp bao bọc và có toàn quyền đọc/ghi vào các biến thực thể, kể cả private member của enclosing class.

3. Phân tích các phát biểu sai:
• Phát biểu A: "Nó bắt buộc phải được đánh dấu là `final`" -> SAI. Nó CÓ THỂ đánh dấu là `final` (để không cho lớp cục bộ khác kế thừa), nhưng KHÔNG BẮT BUỘC.
• Phát biểu C: "Nó có thể được đánh dấu là `public`" -> SAI. Biến cục bộ và lớp cục bộ nằm bên trong phương thức TUYỆT ĐỐI KHÔNG ĐƯỢC có các modifier chỉ định quyền truy cập (`public`, `protected`, `private`).
• Phát biểu D: "Nó có thể được đánh dấu là `static`" -> SAI. Không có lớp cục bộ nào trong phương thức được phép khai báo là `static`.

✅ Vì sao đáp án "B và E" đúng:
• B đúng vì `abstract` (và `final`) là hai modifier duy nhất hợp lệ cho method-local inner class.
• E đúng vì đặc quyền truy cập của inner class cho phép chạm tới mọi thành viên private của lớp bao bọc.

❌ Vì sao các đáp án khác sai:
• Phương án chứa A sai vì từ khóa `final` là tùy chọn, không bắt buộc.
• Phương án chứa C và D sai vì `public`, `protected`, `private`, `static` đều bị cấm đối với lớp cục bộ bên trong hàm.

⚠️ Mẹo nhớ / Lưu ý:
• Modifier DUY NHẤT được phép dùng cho Method-Local Inner Class là: `abstract` hoặc `final` (tất nhiên không thể dùng cả 2 cùng lúc).
• TUYỆT ĐỐI KHÔNG DÙNG: `public`, `protected`, `private`, `static`."""
    },
    {
        "id": "scjp-ch08-007",
        "originalId": 7,
        "chapterNum": 7,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Which is true about an anonymous inner class?",
        "textVi": "Phát biểu nào sau đây là ĐÚNG về lớp nội danh ẩn danh (anonymous inner class)?",
        "code": "",
        "options": [
            "It can extend exactly one class and implement exactly one interface.",
            "It can extend exactly one class and can implement multiple interfaces.",
            "It can extend exactly one class or implement exactly one interface.",
            "It can implement multiple interfaces regardless of whether it also extends a class.",
            "It can implement multiple interfaces if it does not extend a class."
        ],
        "optionsVi": [
            "Nó có thể vừa kế thừa chính xác một lớp, vừa cài đặt chính xác một interface.",
            "Nó có thể kế thừa chính xác một lớp và có thể cài đặt nhiều interface.",
            "Nó có thể kế thừa chính xác một lớp HOẶC cài đặt chính xác một interface.",
            "Nó có thể cài đặt nhiều interface bất kể nó có kế thừa một lớp hay không.",
            "Nó có thể cài đặt nhiều interface nếu nó không kế thừa lớp nào."
        ],
        "answer": 2,
        "correctLetters": ["C"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Cú pháp định nghĩa Anonymous Inner Class:
Một anonymous inner class luôn được khởi tạo gắn liền với toán tử `new` theo một trong hai dạng cú pháp duy nhất:
• Dạng 1 (Kế thừa một class):
  `new SuperClass(arguments) { ... }`
  -> Lúc này lớp ẩn danh ngầm định kế thừa (extends) `SuperClass`.
• Dạng 2 (Cài đặt một interface):
  `new InterfaceName() { ... }`
  -> Lúc này lớp ẩn danh ngầm định cài đặt (implements) `InterfaceName` (và gián tiếp kế thừa `Object`).

2. Giới hạn cú pháp (The "OR" Rule):
Sau từ khóa `new`, cú pháp Java chỉ cho phép bạn ghi DUY NHẤT MỘT định danh kiểu:
• Bạn không thể viết `new MyClass, MyInterface() { ... }`.
• Bạn không thể viết `implements` hay `extends` trong thân anonymous inner class.
• Do đó, một anonymous inner class chỉ có thể: Hoặc là kế thừa duy nhất một lớp, HOẶC là cài đặt duy nhất một interface (either-or). Nó không bao giờ có thể làm cả hai, và không bao giờ có thể cài đặt nhiều hơn 1 interface.

Vì vậy, phát biểu C: \"It can extend exactly one class or implement exactly one interface\" là phát biểu duy nhất chính xác.

✅ Vì sao đáp án "It can extend exactly one class or implement exactly one interface." đúng:
Cú pháp của Java chỉ cho phép đặt đúng một tên class hoặc một tên interface sau từ khóa `new`, không có cách nào khai báo nhiều interface hay vừa extend vừa implement trong anonymous class.

❌ Vì sao các đáp án khác sai:
• "It can extend exactly one class and implement exactly one interface.": Sai vì không thể làm đồng thời cả hai.
• "It can extend exactly one class and can implement multiple interfaces.": Sai vì không thể cài đặt interface nào khi đã extend một lớp.
• "...implement multiple interfaces...": Cả D và E đều sai vì anonymous inner class không bao giờ có thể cài đặt từ 2 interface trở lên.

⚠️ Mẹo nhớ / Lưu ý:
• Anonymous class chỉ được chọn 1 trong 2: Hoặc 1 Class, HOẶC 1 Interface.
• Từ khóa chìa khóa: "OR" (hoặc cái này hoặc cái kia)."""
    },
    {
        "id": "scjp-ch08-008",
        "originalId": 8,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\npublic class Foo {\n  Foo() { System.out.print(\"foo\"); }\n  class Bar {\n    Bar() { System.out.print(\"bar\"); }\n    public void go() { System.out.print(\"hi\"); }\n  }\n  public static void main (String [] args) {\n    Foo f = new Foo();\n    f.makeBar();\n  }\n  void makeBar() {\n    (new Bar() {}).go();\n  }\n}\nwhat is the result?",
        "textVi": "Cho đoạn mã sau:\npublic class Foo {\n  Foo() { System.out.print(\"foo\"); }\n  class Bar {\n    Bar() { System.out.print(\"bar\"); }\n    public void go() { System.out.print(\"hi\"); }\n  }\n  public static void main (String [] args) {\n    Foo f = new Foo();\n    f.makeBar();\n  }\n  void makeBar() {\n    (new Bar() {}).go();\n  }\n}\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "public class Foo {\n  Foo() { System.out.print(\"foo\"); }\n  class Bar {\n    Bar() { System.out.print(\"bar\"); }\n    public void go() { System.out.print(\"hi\"); }\n  }\n  public static void main (String [] args) {\n    Foo f = new Foo();\n    f.makeBar();\n  }\n  void makeBar() {\n    (new Bar() {}).go();\n  }\n}",
        "options": [
            "Compilation fails.",
            "An error occurs at runtime.",
            "foobarhi",
            "barhi",
            "hi"
        ],
        "optionsVi": [
            "Lỗi biên dịch (Compilation fails).",
            "Xảy ra lỗi tại thời điểm chạy (Runtime Error).",
            "foobarhi",
            "barhi",
            "hi"
        ],
        "answer": 2,
        "correctLetters": ["C"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
Hãy lần theo luồng thực thi từng bước từ hàm `main`:
1. Bước 1: `Foo f = new Foo();`
   • Lệnh `new Foo()` gọi constructor `Foo()` của lớp bao ngoài.
   • Lệnh `System.out.print(\"foo\");` chạy -> Màn hình in ra chuỗi đầu tiên: `foo`.

2. Bước 2: `f.makeBar();`
   • Phương thức thực thể `makeBar()` của đối tượng `f` được gọi.
   • Bên trong `makeBar()`: Lệnh `(new Bar() {}).go();` được thực thi:
     - `new Bar() {}`: Đây là cú pháp tạo một lớp con ẩn danh (anonymous subclass) kế thừa từ lớp `Bar`.
     - Vì đang đứng trong phương thức non-static của `Foo`, đối tượng `Foo.this` ngầm định tồn tại, nên việc khởi tạo `Bar` là hoàn toàn hợp lệ.
     - Khi một đối tượng lớp con được tạo, constructor của lớp cha `Bar()` sẽ tự động chạy trước (`super()`).
     - Constructor `Bar()` thực hiện lệnh `System.out.print(\"bar\");` -> Màn hình in tiếp: `bar`.
     - Sau khi đối tượng con của `Bar` được khởi tạo xong, phương thức `.go()` được gọi trên đối tượng này.
     - Trong lớp con không ghi đè `go()`, nên phương thức `go()` kế thừa từ `Bar` chạy: `System.out.print(\"hi\");` -> Màn hình in tiếp: `hi`.

3. Ghép kết quả in từ đầu đến cuối:
`foo` + `bar` + `hi` = `foobarhi`.

✅ Vì sao đáp án "foobarhi" đúng:
Thứ tự thực thi diễn ra tuần tự và chuẩn xác: Constructor của Foo chạy trước (in \"foo\"), sau đó trong makeBar() constructor của Bar chạy (in \"bar\"), cuối cùng phương thức go() chạy (in \"hi\").

❌ Vì sao các đáp án khác sai:
• "Compilation fails.": Sai vì cú pháp tạo anonymous subclass của inner class `(new Bar() {}).go()` bên trong phương thức của `Foo` hoàn toàn hợp lệ.
• "An error occurs at runtime.": Sai vì chương trình chạy bình thường không có lỗi nào.
• "barhi": Sai vì thiếu kết quả in \"foo\" từ constructor `Foo()`.
• "hi": Sai vì thiếu cả constructor của `Foo` và `Bar`.

⚠️ Mẹo nhớ / Lưu ý:
• Khởi tạo đối tượng lớp con ẩn danh luôn gọi constructor của lớp cha trước (`super()`).
• Đang đứng trong phương thức non-static của lớp ngoài thì được phép `new InnerClass()` trực tiếp mà không cần chỉ định `outer.new`."""
    },
    {
        "id": "scjp-ch08-009",
        "originalId": 9,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\n1. public class TestObj {\n2.   public static void main (String [] args) {\n3.     Object o = new Object() {\n4.        public boolean equals(Object obj) {\n5.         return true;\n6.        }\n7.     }\n8.      System.out.println(o.equals(\"Fred\"));\n9.    }\n10. }\nwhat is the result?",
        "textVi": "Cho đoạn mã sau:\n1. public class TestObj {\n2.   public static void main (String [] args) {\n3.     Object o = new Object() {\n4.        public boolean equals(Object obj) {\n5.         return true;\n6.        }\n7.     }\n8.      System.out.println(o.equals(\"Fred\"));\n9.    }\n10. }\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "1. public class TestObj {\n2.   public static void main (String [] args) {\n3.     Object o = new Object() {\n4.        public boolean equals(Object obj) {\n5.         return true;\n6.        }\n7.     }\n8.      System.out.println(o.equals(\"Fred\"));\n9.    }\n10. }",
        "options": [
            "An exception occurs at runtime.",
            "true",
            "fred",
            "Compilation fails because of an error on line 3.",
            "Compilation fails because of an error on line 4.",
            "Compilation fails because of an error on line 8.",
            "Compilation fails because of an error on a line other than 3, 4, or 8."
        ],
        "optionsVi": [
            "Ném ngoại lệ tại thời điểm chạy (Runtime Exception).",
            "true",
            "fred",
            "Lỗi biên dịch do lỗi ở dòng 3.",
            "Lỗi biên dịch do lỗi ở dòng 4.",
            "Lỗi biên dịch do lỗi ở dòng 8.",
            "Lỗi biên dịch do lỗi ở một dòng khác ngoài 3, 4 hoặc 8."
        ],
        "answer": 6,
        "correctLetters": ["G"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Quan sát cấu trúc câu lệnh từ dòng 3 đến dòng 7:
• Dòng 3 bắt đầu một câu lệnh khai báo và gán biến:
  `Object o = new Object() { ...`
• Câu lệnh này khởi tạo một anonymous inner class ghi đè phương thức `equals`.
• Trong Java, một câu lệnh gán biến (assignment statement) BẮT BUỘC PHẢI kết thúc bằng dấu chấm phẩy (`;`).
• Hãy nhìn kỹ dòng 7:
  Dòng 7 chỉ có dấu đóng ngoặc nhọn: `}`
  HOÀN TOÀN THIẾU DẤU CHẤM PHẨY `;`!
• Đúng ra dòng 7 phải là: `};` để kết thúc câu lệnh gán khởi đầu từ dòng 3.

2. Phân tích lỗi biên dịch:
• Trình biên dịch Java phân tích cú pháp thấy câu lệnh ở dòng 3 chưa kết thúc và báo lỗi cú pháp: `';' expected` tại dòng 7.
• Vì dòng bị lỗi là dòng 7 (không phải dòng 3, 4 hay 8), nên phương án chính xác là: \"Compilation fails because of an error on a line other than 3, 4, or 8\".

Nếu có dấu `;` ở dòng 7, đoạn code sẽ hợp lệ 100% và in ra `true` vì phương thức `equals` đã bị ghi đè luôn luôn trả về `true`.

✅ Vì sao đáp án "Compilation fails because of an error on a line other than 3, 4, or 8." đúng:
Câu lệnh gán biến ở dòng 3 thiếu dấu chấm phẩy `;` kết thúc câu lệnh tại vị trí đóng ngoặc nhọn ở dòng 7.

❌ Vì sao các đáp án khác sai:
• "true": Sai vì mã nguồn không thể biên dịch thành công để chạy.
• "fred" & "An exception occurs at runtime.": Sai vì không thể chạy runtime.
• "Compilation fails because of an error on line 3 / 4 / 8": Dòng 3, dòng 4 và dòng 8 đều viết cú pháp hoàn toàn chuẩn xác, lỗi chỉ xảy ra ở dòng 7.

⚠️ Mẹo nhớ / Lưu ý:
• Bẫy kinh điển số 1 về Anonymous Inner Class: Đừng bao giờ quên dấu `;` sau dấu ngoặc nhọn đóng của biểu thức tạo lớp ẩn danh!
  Ví dụ: `Runnable r = new Runnable() { public void run() {} };` <- Luôn phải có dấu `;` ở cuối!"""
    },
    {
        "id": "scjp-ch08-010",
        "originalId": 10,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\n1. public class HorseTest {\n2.   public static void main (String [] args) {\n3.    class Horse {\n4.       public String name;\n5.       public Horse(String s) {\n6.         name = s;\n7.       }\n8.     }\n9.   Object obj = new Horse(\"Zippo\");\n10.    Horse h = (Horse) obj;\n11.    System.out.println(h.name);\n12.  }\n13. }\nwhat is the result?",
        "textVi": "Cho đoạn mã sau:\n1. public class HorseTest {\n2.   public static void main (String [] args) {\n3.    class Horse {\n4.       public String name;\n5.       public Horse(String s) {\n6.         name = s;\n7.       }\n8.     }\n9.   Object obj = new Horse(\"Zippo\");\n10.    Horse h = (Horse) obj;\n11.    System.out.println(h.name);\n12.  }\n13. }\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "1. public class HorseTest {\n2.   public static void main (String [] args) {\n3.    class Horse {\n4.       public String name;\n5.       public Horse(String s) {\n6.         name = s;\n7.       }\n8.     }\n9.   Object obj = new Horse(\"Zippo\");\n10.    Horse h = (Horse) obj;\n11.    System.out.println(h.name);\n12.  }\n13. }",
        "options": [
            "An exception occurs at runtime at line 10.",
            "Zippo",
            "Compilation fails because of an error on line 3.",
            "Compilation fails because of an error on line 9.",
            "Compilation fails because of an error on line 10.",
            "Compilation fails because of an error on line 11."
        ],
        "optionsVi": [
            "Ném ngoại lệ tại thời điểm chạy ở dòng 10.",
            "Zippo",
            "Lỗi biên dịch do lỗi ở dòng 3.",
            "Lỗi biên dịch do lỗi ở dòng 9.",
            "Lỗi biên dịch do lỗi ở dòng 10.",
            "Lỗi biên dịch do lỗi ở dòng 11."
        ],
        "answer": 1,
        "correctLetters": ["B"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân tích lớp nội cục bộ (Method-local inner class):
• Dòng 3-8: Lớp `Horse` được định nghĩa ngay bên trong phương thức `main`. Đây là một method-local inner class hợp lệ.
• Phạm vi nhìn thấy của lớp `Horse` là từ dòng 3 cho đến dấu đóng ngoặc nhọn của phương thức `main` ở dòng 12.

2. Luồng chạy qua từng dòng lệnh:
• Dòng 9: `Object obj = new Horse(\"Zippo\");`
  - Vì đang nằm trong `main`, lớp `Horse` hoàn toàn hiển thị. Constructor `Horse(\"Zippo\")` chạy và gán `name = \"Zippo\"`.
  - Tham chiếu được gán cho biến `obj` kiểu `Object` (đa hình bình thường).
• Dòng 10: `Horse h = (Horse) obj;`
  - Ép kiểu `obj` về kiểu `Horse`.
  - Vì kiểu `Horse` vẫn nằm trong phạm vi của `main`, trình biên dịch nhận diện được kiểu này.
  - Khi chạy runtime, đối tượng thực tế trên Heap đúng là một `Horse`, nên phép ép kiểu thành công tuyệt đối, không xảy ra `ClassCastException`.
• Dòng 11: `System.out.println(h.name);`
  - Biến `h` có kiểu tham chiếu là `Horse`, lớp `Horse` có trường `public String name`.
  - Giá trị `name` là `\"Zippo\"` được in ra màn hình.

Chương trình biên dịch hoàn toàn thành công và in ra `Zippo`.

✅ Vì sao đáp án "Zippo" đúng:
Toàn bộ mã nguồn nằm trọn trong phạm vi hợp lệ của lớp cục bộ `Horse`, phép ép kiểu sang `(Horse)` ở dòng 10 thành công và truy xuất thuộc tính `h.name` in ra chuỗi \"Zippo\".

❌ Vì sao các đáp án khác sai:
• "An exception occurs at runtime at line 10.": Sai vì đối tượng thực tế đích thực là instance của Horse, ép kiểu hoàn toàn an toàn.
• Các đáp án về lỗi biên dịch ở dòng 3, 9, 10, 11: Đều sai vì mọi cú pháp khai báo, khởi tạo, ép kiểu và truy cập thuộc tính đều chuẩn xác theo quy định của Java.

⚠️ Mẹo nhớ / Lưu ý:
• Method-local inner class có thể được sử dụng ở bất kỳ dòng nào bên dưới khai báo của nó trong cùng một phương thức.
• Ép kiểu về method-local class bên trong phương thức khai báo nó là hoàn toàn hợp lệ!"""
    },
    {
        "id": "scjp-ch08-011",
        "originalId": 11,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\n1. public class HorseTest {\n2.   public static void main (String [] args) {\n3.    class Horse {\n4.       public String name;\n5.       public Horse(String s) {\n6.         name = s;\n7.       }\n8.     }\n9.    Object obj = new Horse(\"Zippo\");\n10.    System.out.println(obj.name);\n11.  }\n12. }\nwhat is the result?",
        "textVi": "Cho đoạn mã sau:\n1. public class HorseTest {\n2.   public static void main (String [] args) {\n3.    class Horse {\n4.       public String name;\n5.       public Horse(String s) {\n6.         name = s;\n7.       }\n8.     }\n9.    Object obj = new Horse(\"Zippo\");\n10.    System.out.println(obj.name);\n11.  }\n12. }\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "1. public class HorseTest {\n2.   public static void main (String [] args) {\n3.    class Horse {\n4.       public String name;\n5.       public Horse(String s) {\n6.         name = s;\n7.       }\n8.     }\n9.    Object obj = new Horse(\"Zippo\");\n10.    System.out.println(obj.name);\n11.  }\n12. }",
        "options": [
            "An exception occurs at runtime at line 10.",
            "Zippo",
            "Compilation fails because of an error on line 3.",
            "Compilation fails because of an error on line 9.",
            "Compilation fails because of an error on line 10."
        ],
        "optionsVi": [
            "Ném ngoại lệ tại thời điểm chạy ở dòng 10.",
            "Zippo",
            "Lỗi biên dịch do lỗi ở dòng 3.",
            "Lỗi biên dịch do lỗi ở dòng 9.",
            "Lỗi biên dịch do lỗi ở dòng 10."
        ],
        "answer": 4,
        "correctLetters": ["E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. So sánh với câu hỏi 10:
Đoạn mã này gần như giống hệt câu hỏi 10 trước đó, CHỈ KHÁC DUY NHẤT một điểm chí mạng:
• Ở câu 10: Có dòng ép kiểu `Horse h = (Horse) obj;` và gọi `h.name`.
• Ở câu 11 này: Bỏ qua bước ép kiểu, gọi trực tiếp `obj.name` ở dòng 10!

2. Nguyên tắc kiểm tra kiểu tại thời điểm biên dịch (Compile-time Type Checking):
• Hãy nhìn vào kiểu khai báo của biến `obj` ở dòng 9:
  `Object obj = new Horse(\"Zippo\");`
  Kiểu tham chiếu của biến `obj` là `java.lang.Object`.
• Ở dòng 10: `System.out.println(obj.name);`
  Trình biên dịch (javac) sẽ kiểm tra xem lớp `java.lang.Object` có thuộc tính nào tên là `name` hay không.
• Rõ ràng, lớp `Object` của Java không hề có trường nào tên là `name`!
• Trình biên dịch không quan tâm đối tượng thực tế trên Heap lúc chạy là con ngựa hay cái gì, nó chỉ nhìn vào kiểu khai báo của biến (`Object`).
• Kết quả: Báo lỗi biên dịch ngay tại dòng 10: `cannot find symbol: variable name in class java.lang.Object`.

✅ Vì sao đáp án "Compilation fails because of an error on line 10." đúng:
Biến `obj` có kiểu tham chiếu là `Object`, mà lớp `Object` không chứa trường `name`, dẫn đến lỗi biên dịch ở dòng 10.

❌ Vì sao các đáp án khác sai:
• "Zippo": Sai vì mã nguồn không thể biên dịch.
• "An exception occurs at runtime at line 10.": Sai vì lỗi xảy ra ngay lúc biên dịch (compile-time), không thể đến được bước chạy (runtime).
• "Compilation fails because of an error on line 3 / 9": Sai vì định nghĩa lớp cục bộ ở dòng 3 và khởi tạo gán cho Object ở dòng 9 hoàn toàn hợp lệ.

⚠️ Mẹo nhớ / Lưu ý:
• Quy tắc vàng trong Java: "Kiểu của biến tham chiếu quyết định những phương thức/thuộc tính nào CÓ THỂ được gọi tại thời điểm biên dịch".
• Muốn gọi thuộc tính riêng của lớp con thông qua biến cha, bắt buộc phải ÉP KIỂU (casting)."""
    },
    {
        "id": "scjp-ch08-012",
        "originalId": 12,
        "chapterNum": 8,
        "chapterTitle": "Inner Classes",
        "topic": "javacore",
        "text": "Given the following:\npublic abstract class AbstractTest {\n  public int getNum() {\n    return 45;\n  }\n  public abstract class Bar {\n    public int getNum() {\n      return 38;\n    }\n  }\n  public static void main (String [] args) {\n    AbstractTest t = new AbstractTest() {\n      public int getNum() {\n        return 22;\n      }\n    };\n    AbstractTest.Bar f = t.new Bar() {\n      public int getNum() {\n        return 57;\n      }\n    };\n    System.out.println(f.getNum() + \" \" + t.getNum());\n  }\n}\nwhat is the result?",
        "textVi": "Cho đoạn mã sau:\npublic abstract class AbstractTest {\n  public int getNum() {\n    return 45;\n  }\n  public abstract class Bar {\n    public int getNum() {\n      return 38;\n    }\n  }\n  public static void main (String [] args) {\n    AbstractTest t = new AbstractTest() {\n      public int getNum() {\n        return 22;\n      }\n    };\n    AbstractTest.Bar f = t.new Bar() {\n      public int getNum() {\n        return 57;\n      }\n    };\n    System.out.println(f.getNum() + \" \" + t.getNum());\n  }\n}\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "public abstract class AbstractTest {\n  public int getNum() {\n    return 45;\n  }\n  public abstract class Bar {\n    public int getNum() {\n      return 38;\n    }\n  }\n  public static void main (String [] args) {\n    AbstractTest t = new AbstractTest() {\n      public int getNum() {\n        return 22;\n      }\n    };\n    AbstractTest.Bar f = t.new Bar() {\n      public int getNum() {\n        return 57;\n      }\n    };\n    System.out.println(f.getNum() + \" \" + t.getNum());\n  }\n}",
        "options": [
            "57 22",
            "45 38",
            "45 57",
            "An exception occurs at runtime.",
            "Compilation fails."
        ],
        "optionsVi": [
            "57 22",
            "45 38",
            "45 57",
            "Ném ngoại lệ tại thời điểm chạy (Runtime Exception).",
            "Lỗi biên dịch (Compilation fails)."
        ],
        "answer": 0,
        "correctLetters": ["A"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
Đây là câu hỏi kiểm tra sự kết hợp bậc thầy giữa Lớp trừu tượng (Abstract Class), Inner Class và Anonymous Inner Class:

1. Phân tích đối tượng `t`:
• `AbstractTest` là một lớp trừu tượng (không thể `new AbstractTest()` trực tiếp).
• Trong `main`, câu lệnh:
  `AbstractTest t = new AbstractTest() { public int getNum() { return 22; } };`
  tạo ra một đối tượng của lớp con ẩn danh cụ thể (concrete anonymous subclass) kế thừa từ `AbstractTest`.
• Lớp con này ghi đè phương thức `getNum()` trả về `22`.
• Do đó, khi gọi `t.getNum()`, kết quả trả về là `22`.

2. Phân tích đối tượng `f`:
• Lớp `Bar` là một inner class trừu tượng (`public abstract class Bar`) nằm trong `AbstractTest`.
• Để khởi tạo một inner class của `AbstractTest`, ta bắt buộc phải có một đối tượng của lớp bao bọc ngoài. Ở đây biến `t` chính là đối tượng đó!
• Câu lệnh:
  `AbstractTest.Bar f = t.new Bar() { public int getNum() { return 57; } };`
  - `t.new Bar() { ... }`: Tạo một lớp con ẩn danh cụ thể kế thừa từ lớp inner trừu tượng `Bar`, gắn liền với đối tượng ngoài `t`.
  - Lớp con ẩn danh này ghi đè phương thức `getNum()` của `Bar` trả về `57`.
• Do đó, khi gọi `f.getNum()`, kết quả trả về là `57`.

3. Kết quả in ra màn hình:
`System.out.println(f.getNum() + \" \" + t.getNum());`
• `f.getNum()` = 57
• `t.getNum()` = 22
=> In ra: `57 22`.

✅ Vì sao đáp án "57 22" đúng:
Cả hai lớp trừu tượng đều được hiện thực hóa hợp lệ thông qua các anonymous inner class ghi đè phương thức `getNum()`. Phương thức của `f` trả về 57 và phương thức của `t` trả về 22.

❌ Vì sao các đáp án khác sai:
• "45 38": Sai vì ngộ nhận gọi vào phương thức của lớp cha gốc (bị ghi đè bởi anonymous class).
• "45 57": Sai thứ tự và sai giá trị phương thức bị ghi đè.
• "Compilation fails.": Sai vì cú pháp `t.new Bar() { ... }` hoàn toàn hợp lệ trong Java khi tạo anonymous subclass của một abstract inner class.
• "An exception occurs at runtime.": Sai vì chương trình chạy mượt mà không phát sinh bất kỳ ngoại lệ nào.

⚠️ Mẹo nhớ / Lưu ý:
• Abstract class (kể cả abstract inner class) hoàn toàn có thể được khởi tạo bằng Anonymous Inner Class bằng cách cài đặt các phương thức còn thiếu.
• Luôn nhớ: Phương thức bị ghi đè trong anonymous class sẽ được ưu tiên chạy (đa hình runtime)."""
    }
]

out_dir = r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\scripts\enrichment"
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "ch08_enriched.json")

with open(out_file, "w", encoding="utf-8") as f:
    json.dump(enriched_ch08, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(enriched_ch08)} enriched questions to {out_file}")
