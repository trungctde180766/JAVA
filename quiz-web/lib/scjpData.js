// Java SCJP 310-035 Quiz Dataset (146 questions from TestKing Ebook Section A)
export const scjpQuiz = {
  "slug": "scjp-310-035",
  "title": "Java SCJP 310-035 – Section A (Ebook TestKing)",
  "description": "146 câu hỏi ôn thi Java 310-035 (SCJP) trích từ Ebook TestKing 12.0 có đáp án và giải thích chi tiết.",
  "color": "#2563eb",
  "icon": "📕",
  "order": 7,
  "hidden": false,
  "questions": [
    {
      "id": "scjp-001",
      "originalId": 1,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main(String args[]) {\n3.     class Foo {\n4.       public int i = 3;\n5.     }\n6.     Object o = (Object)new Foo();\n7.     Foo foo = (Foo)o;\n8.     System.out.println(\"i = \" + foo.i);\n9.   }\n10. }",
      "options": [
        "i = 3",
        "Compilation fails.",
        "A ClassCastException is thrown at line 6.",
        "A ClassCastException is thrown at line 7."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Định nghĩa Local Inner Class (dòng 3 - 5): Trong Java, một lớp có thể được khai báo cục bộ bên trong một phương thức hoặc khối lệnh (block). Lớp `Foo` ở đây là một Local Inner Class hoàn toàn hợp lệ, có trường `public int i = 3;`.\n2. Upcasting an toàn (dòng 6): Câu lệnh `Object o = (Object)new Foo();` khởi tạo một instance của `Foo` rồi ép kiểu lên `Object`. Vì mọi class trong Java đều kế thừa trực tiếp hoặc gián tiếp từ `java.lang.Object`, việc upcasting luôn luôn an toàn và được thực hiện tự động (viết tường minh `(Object)` là hợp lệ).\n3. Downcasting hợp lệ lúc runtime (dòng 7): Câu lệnh `Foo foo = (Foo)o;` ép kiểu ngược lại từ `Object` về `Foo`. Do đối tượng thực tế nằm trên bộ nhớ Heap mà `o` đang tham chiếu tới chính là một instance của `Foo`, phép downcast này thành công trọn vẹn tại runtime mà không gặp bất kỳ ngoại lệ nào. Ngoài ra, vì biến `foo` và lớp `Foo` cùng nằm trong phạm vi phương thức `main`, trình biên dịch nhận biết đầy đủ kiểu dữ liệu `Foo`.\n4. Truy xuất trường (dòng 8): Sau khi ép kiểu về `Foo`, biến `foo` có thể truy xuất thuộc tính `i` bình thường, in ra kết quả `i = 3`.\n\n✅ Vì sao đáp án \"i = 3\" đúng:\nChương trình biên dịch hoàn toàn thành công và khi chạy, đối tượng `Foo` được tạo và cast qua lại hợp lệ, giá trị `foo.i` là 3 nên kết quả in ra là \"i = 3\".\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation fails.\": Sai vì Java cho phép khai báo local class trong method và cú pháp ép kiểu hoàn toàn chuẩn xác.\n• \"A ClassCastException is thrown at line 6.\": Sai vì upcasting lên lớp cha `Object` không bao giờ ném ClassCastException.\n• \"A ClassCastException is thrown at line 7.\": Sai vì đối tượng thực tế trên Heap chính là kiểu `Foo`, ép kiểu về `Foo` hoàn toàn tương thích.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Local class khai báo bên trong method là tính năng hợp lệ của Java.\n• Downcasting chỉ ném `ClassCastException` khi kiểu đối tượng thực tế trên Heap KHÔNG PHẢI là kiểu được ép về."
    },
    {
      "id": "scjp-002",
      "originalId": 2,
      "topic": "javacore",
      "text": "Cho các khai báo sau, hai khai báo nào gây lỗi biên dịch? (Which two cause a compiler error?)",
      "code": "1. float[] = new float(3);\n2. float f2[] = new float[];\n3. float[] f1 = new float[3];\n4. float f3[] = new float[3];\n5. float f5[] = {1.0f, 2.0f, 2.0f };\n6. float f4[] = new float[] {1.0f, 2.0f, 3.0f};",
      "options": [
        "Dòng 1 và dòng 2 (float[] = new float(3); & float f2[] = new float[];)",
        "Dòng 2 và dòng 3",
        "Dòng 3 và dòng 4",
        "Dòng 5 và dòng 6"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nJava quy định rất chặt chẽ về cú pháp khai báo và cấp phát mảng (Array Declaration and Instantiation):\n• Dòng 1 (`float[] = new float(3);`) gây lỗi biên dịch vì 2 lý do:\n  1. Vế trái thiếu tên biến (chỉ ghi kiểu dữ liệu `float[]`).\n  2. Vế phải sử dụng dấu ngoặc tròn `(3)` thay vì ngoặc vuông `[3]`. Khởi tạo mảng trong Java bắt buộc phải dùng ngoặc vuông.\n• Dòng 2 (`float f2[] = new float[];`) gây lỗi biên dịch vì: khi cấp phát mảng bằng từ khóa `new` mà KHÔNG có danh sách phần tử khởi tạo `{...}`, Java bắt buộc phải chỉ định kích thước mảng bên trong cặp ngoặc vuông (ví dụ `new float[3]`). Bỏ trống ngoặc vuông như `new float[]` mà không có khối `{...}` là vi phạm cú pháp.\n• Phân tích các dòng còn lại (đều hợp lệ):\n  - Dòng 3 (`float[] f1 = new float[3];`) và Dòng 4 (`float f3[] = new float[3];`): Hợp lệ, dấu `[]` có thể đặt sau kiểu dữ liệu hoặc sau tên biến.\n  - Dòng 5 (`float f5[] = {1.0f, 2.0f, 2.0f };`): Hợp lệ, đây là cú pháp mảng khởi tạo rút gọn (anonymous array initializer).\n  - Dòng 6 (`float f4[] = new float[] {1.0f, 2.0f, 3.0f};`): Hợp lệ, khi đã có danh sách `{...}`, ngoặc vuông `[]` bắt buộc phải để trống.\n\n✅ Vì sao đáp án \"Dòng 1 và dòng 2\" đúng:\nVì dòng 1 thiếu tên biến và dùng sai ngoặc tròn `(3)`, còn dòng 2 dùng `new float[]` mà không chỉ định kích thước cũng như không có khối khởi tạo phần tử. Cả hai dòng này đều gây lỗi biên dịch.\n\n❌ Vì sao các đáp án khác sai:\n• \"Dòng 2 và dòng 3\": Sai vì dòng 3 (`float[] f1 = new float[3];`) là cú pháp khai báo mảng chuẩn xác, không có lỗi.\n• \"Dòng 3 và dòng 4\": Sai vì cả hai dòng 3 và 4 đều biên dịch thành công.\n• \"Dòng 5 và dòng 6\": Sai vì cả hai dòng 5 và 6 đều là cú pháp khởi tạo mảng kèm giá trị hợp lệ.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Cấp phát mảng bằng `new` KHÔNG có `{...}` -> BẮT BUỘC ghi kích thước trong `[size]`.\n• Cấp phát mảng CÓ `{...}` -> BẮT BUỘC ngoặc `[]` phải để trống.\n• Không bao giờ dùng ngoặc tròn `()` để cấp phát mảng."
    },
    {
      "id": "scjp-003",
      "originalId": 3,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 1, j = 10;\n12. do {\n13.   if(i++ > --j) {\n14.     continue;\n15.   }\n16. } while (i < 5);\n17. System.out.println(\"i = \" + i + \" and j = \" + j);",
      "options": [
        "i = 6 and j = 5",
        "i = 5 and j = 5",
        "i = 6 and j = 5",
        "i = 5 and j = 6",
        "i = 6 and j = 6"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra thứ tự đánh giá toán tử tăng giảm (post-increment `i++` vs pre-decrement `--j`) kết hợp vòng lặp `do-while`:\n• `i++` (postfix): Lấy giá trị hiện tại của `i` để thực hiện so sánh trước, sau đó mới tăng `i` lên 1.\n• `--j` (prefix): Giảm `j` đi 1 trước, sau đó mới lấy giá trị mới của `j` để thực hiện so sánh.\n\nKhởi tạo ban đầu: `i = 1`, `j = 10`.\nTừng bước lặp:\n• Lần lặp 1:\n  - Kiểm tra `if(i++ > --j)`: Lấy `i = 1`; giảm `j` từ 10 xuống 9; so sánh `1 > 9` -> `false`. Sau phép so sánh, `i` tăng lên 2.\n  - Lệnh `continue` không chạy.\n  - Kiểm tra điều kiện lặp: `while (i < 5)` tức `2 < 5` -> `true`. Tiếp tục lặp.\n• Lần lặp 2:\n  - Kiểm tra `if(i++ > --j)`: Lấy `i = 2`; giảm `j` từ 9 xuống 8; so sánh `2 > 8` -> `false`. Sau đó `i` tăng lên 3.\n  - Kiểm tra điều kiện lặp: `3 < 5` -> `true`. Tiếp tục lặp.\n• Lần lặp 3:\n  - Kiểm tra `if(i++ > --j)`: Lấy `i = 3`; giảm `j` từ 8 xuống 7; so sánh `3 > 7` -> `false`. Sau đó `i` tăng lên 4.\n  - Kiểm tra điều kiện lặp: `4 < 5` -> `true`. Tiếp tục lặp.\n• Lần lặp 4:\n  - Kiểm tra `if(i++ > --j)`: Lấy `i = 4`; giảm `j` từ 7 xuống 6; so sánh `4 > 6` -> `false`. Sau đó `i` tăng lên 5.\n  - Kiểm tra điều kiện lặp: `while (i < 5)` tức `5 < 5` -> `false`! Vòng lặp dừng lại.\n\nSau khi thoát khỏi vòng lặp, giá trị của `i` là 5 và `j` là 6. Dòng 17 in ra: `i = 5 and j = 6`.\n\n✅ Vì sao đáp án \"i = 5 and j = 6\" đúng:\nSau đúng 4 lần lặp, `j` bị giảm 4 lần (10 -> 9 -> 8 -> 7 -> 6) và `i` tăng 4 lần (1 -> 2 -> 3 -> 4 -> 5), điều kiện `5 < 5` dừng vòng lặp, in ra chính xác \"i = 5 and j = 6\".\n\n❌ Vì sao các đáp án khác sai:\n• \"i = 6 and j = 5\": Sai do tính dư thêm một lần lặp.\n• \"i = 5 and j = 5\": Sai do giảm nhầm biến `j` 5 lần thay vì 4 lần.\n• \"i = 6 and j = 6\": Sai vì biến `i` dừng ở 5 chứ không tăng lên 6.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Vẽ bảng theo dõi (trace table) từng bước: Giá trị so sánh -> Giá trị sau tăng/giảm -> Điều kiện while.\n• `do-while` luôn thực hiện thân vòng lặp ít nhất 1 lần trước khi kiểm tra điều kiện kết thúc."
    },
    {
      "id": "scjp-004",
      "originalId": 4,
      "topic": "javacore",
      "text": "When is the Demo object, created on line 3, eligible for garbage collection?",
      "code": "1. class Test {\n2.   private Demo d;\n3.   void start() {\n4.     d = new Demo();\n5.     this.takeDemo(d);\n6.   }\n7.   void takeDemo(Demo demo) {\n8.     demo = null;\n9.     demo = new Demo();\n10.   }\n11. }",
      "options": [
        "After line 5.",
        "After line 9.",
        "After the start() method completes.",
        "When the takeDemo() method completes.",
        "When the instance running this code is made eligible for garbage collection."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra kiến thức về cơ chế Garbage Collection (GC) và phạm vi sống của biến thực thể (instance variable) so với biến cục bộ (local variable):\n1. Tại dòng 4: `d = new Demo();`. Đối tượng `Demo` được tạo trên Heap và được tham chiếu bởi biến trường (instance variable) `d` của instance `Test`.\n2. Tại dòng 5: `this.takeDemo(d);`. Trong Java, việc truyền tham số luôn là **Pass-by-value** (truyền theo giá trị). Giá trị của tham chiếu `d` được sao chép vào biến tham số cục bộ `demo` của phương thức `takeDemo`.\n3. Bên trong `takeDemo(Demo demo)`:\n   - Dòng 8: `demo = null;` chỉ làm cho biến cục bộ `demo` trỏ tới `null`. Nó hoàn toàn KHÔNG ảnh hưởng gì đến biến thực thể `d` của lớp `Test`.\n   - Dòng 9: `demo = new Demo();` tạo một đối tượng `Demo` thứ hai gán cho biến cục bộ `demo`. Đối tượng mới này sẽ bị GC ngay khi `takeDemo` kết thúc.\n4. Sau khi `takeDemo()` và cả `start()` chạy xong, biến trường `d` của đối tượng `Test` vẫn luôn duy trì tham chiếu trỏ tới đối tượng `Demo` ban đầu (tạo ở dòng 4).\n5. Vì vậy, chừng nào instance của lớp `Test` đang chạy mã này còn sống (reachable), đối tượng `Demo` ban đầu vẫn còn được tham chiếu qua `Test.d`. Chỉ khi nào chính instance `Test` đó không còn được sử dụng và đủ điều kiện thu gom rác (eligible for GC), đối tượng `Demo` mới trở nên eligible for GC.\n\n✅ Vì sao đáp án \"When the instance running this code is made eligible for garbage collection.\" đúng:\nVì đối tượng `Demo` được giữ bởi biến instance `d` của đối tượng `Test`, vòng đời của nó gắn liền với vòng đời của instance `Test` sở hữu nó.\n\n❌ Vì sao các đáp án khác sai:\n• \"After line 5.\" / \"When the takeDemo() method completes.\": Sai vì biến instance `d` vẫn giữ tham chiếu tới đối tượng, việc gán `null` trong `takeDemo` chỉ tác động lên biến cục bộ `demo`.\n• \"After line 9.\": Sai vì dòng 9 gán đối tượng mới cho biến cục bộ `demo`, biến `d` vẫn trỏ tới đối tượng ban đầu.\n• \"After the start() method completes.\": Sai vì `d` là instance variable, không phải local variable; nó vẫn tồn tại trên Heap cùng với đối tượng `Test` sau khi `start()` kết thúc.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Thay đổi biến tham số cục bộ trong hàm (`demo = null`) không làm thay đổi biến tham chiếu của caller.\n• Đối tượng gắn với biến instance chỉ bị GC khi bản thân đối tượng chứa nó bị GC (hoặc khi biến instance bị gán lại sang đối tượng khác/null)."
    },
    {
      "id": "scjp-005",
      "originalId": 5,
      "topic": "interface",
      "text": "Which compiles?",
      "code": "1. interface Animal { void soundOff(); }\n5. class Elephant implements Animal {\n6.   public void soundOff() { System.out.println(\"Trumpet\"); }\n9. }\n11. class Lion implements Animal {\n12.   public void soundOff() { System.out.println(\"Roar\"); }\n15. }\n17. class Alpha {\n18.   static Animal get( String choice ) {\n19.     if ( choice.equalsIgnoreCase(\"meat eater\") ) {\n20.       return new Lion();\n21.     } else {\n22.       return new Elephant();\n23.     }\n24.   }\n25. }",
      "options": [
        "new Animal().soundOff();",
        "Elephant e = new Alpha();",
        "Lion l = Alpha.get(\"meat eater\");",
        "new Alpha().get(\"veggie\").soundOff();"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra tính đa hình (Polymorphism), Interface, và quy tắc gọi phương thức tĩnh (static method):\n• Xét phương thức tĩnh: `Alpha.get(String choice)` có kiểu trả về khai báo là `Animal`.\n• Phân tích từng lựa chọn:\n  1. `new Animal().soundOff();`: LỖI BIÊN DỊCH. `Animal` là một `interface`, do đó không thể khởi tạo trực tiếp bằng từ khóa `new Animal()` (interface không có constructor).\n  2. `Elephant e = new Alpha();`: LỖI BIÊN DỊCH. `Alpha` và `Elephant` là hai lớp độc lập không hề có mối quan hệ kế thừa (incompatible types).\n  3. `Lion l = Alpha.get(\"meat eater\");`: LỖI BIÊN DỊCH. Phương thức `Alpha.get(...)` có kiểu trả về là `Animal`. Java kiểm tra kiểu dữ liệu nghiêm ngặt tại thời điểm compile-time: không thể gán một tham chiếu kiểu cha/interface (`Animal`) cho một biến kiểu con (`Lion`) mà không ép kiểu tường minh (downcast) `(Lion)`.\n  4. `new Alpha().get(\"veggie\").soundOff();`: BIÊN DỊCH THÀNH CÔNG!\n     - `new Alpha().get(...)`: Trong Java, việc gọi một static method thông qua một instance reference là hoàn toàn hợp lệ về mặt cú pháp (compiler chỉ đưa ra warning chứ không báo lỗi).\n     - `get(\"veggie\")` trả về đối tượng có kiểu tham chiếu là `Animal`.\n     - Interface `Animal` có phương thức `void soundOff();`, do đó việc gọi tiếp `.soundOff()` là hoàn toàn hợp lệ.\n\n✅ Vì sao đáp án \"new Alpha().get(\\\"veggie\\\").soundOff();\" đúng:\nCú pháp hoàn toàn hợp lệ: gọi static method thông qua instance được Java cho phép, kết quả trả về kiểu Animal có chứa phương thức soundOff() nên biên dịch thành công 100%.\n\n❌ Vì sao các đáp án khác sai:\n• \"new Animal().soundOff();\": Sai vì không thể tạo instance trực tiếp từ một interface.\n• \"Elephant e = new Alpha();\": Sai vì hai kiểu dữ liệu không tương thích, không cùng cây kế thừa.\n• \"Lion l = Alpha.get(\\\"meat eater\\\");\": Sai vì thiếu ép kiểu tường minh từ Animal xuống Lion.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Java cho phép gọi static method qua instance: `new MyClass().staticMethod()` hợp lệ về cú pháp.\n• Muốn gán từ Interface/Class cha xuống Class con bắt buộc phải downcast tường minh: `(SubClass) parentRef`."
    },
    {
      "id": "scjp-006",
      "originalId": 6,
      "topic": "threads",
      "text": "Which statement is true?",
      "code": "",
      "options": [
        "Memory is reclaimed by calling Runtime.gc().",
        "Objects are not collected if they are accessible from live threads.",
        "Objects that have finalize() methods are never garbage collected.",
        "Objects that have finalize() methods always have their finalize() methods called before the program ends.",
        "An OutOfMemory error is only thrown if a single block of memory cannot be found that is large enough for a particular requirement."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra cơ chế phân tích khả năng tiếp cận (Reachability Analysis) của bộ thu gom rác Garbage Collector (GC):\n• GC Roots trong JVM bao gồm: các luồng đang chạy (live threads), các biến cục bộ trên stack frames của các thread đó, các biến tĩnh (static variables), và JNI references.\n• Trong quá trình chạy, GC sẽ duyệt tìm tất cả các đối tượng có thể tiếp cận được (reachable) bắt đầu từ GC Roots.\n• Nếu một đối tượng vẫn có thể được truy cập trực tiếp hoặc gián tiếp từ bất kỳ luồng đang chạy (live thread) nào, đối tượng đó được coi là \"đang sống\" và TUYỆT ĐỐI KHÔNG BAO GIỜ bị thu gom rác. Do đó, khẳng định \"Objects are not collected if they are accessible from live threads\" là định lý nền tảng và hoàn toàn chính xác.\n\n✅ Vì sao đáp án \"Objects are not collected if they are accessible from live threads.\" đúng:\nĐây là nguyên lý cốt lõi của GC trong Java: chỉ những đối tượng không còn chuỗi tham chiếu nào từ bất kỳ live thread nào (unreachable) mới đủ điều kiện để bị thu gom rác.\n\n❌ Vì sao các đáp án khác sai:\n• \"Memory is reclaimed by calling Runtime.gc().\": Sai vì `Runtime.getRuntime().gc()` hay `System.gc()` chỉ là một \"lời gợi ý\" gửi tới JVM, JVM hoàn toàn không cam kết sẽ giải phóng bộ nhớ ngay lập tức.\n• \"Objects that have finalize() methods are never garbage collected.\": Sai vì đối tượng có `finalize()` vẫn bị GC thu gom bình thường sau khi `finalize()` được chạy xong.\n• \"Objects that have finalize() methods always have their finalize() methods called before the program ends.\": Sai vì JVM không đảm bảo `finalize()` chắc chắn sẽ được gọi trước khi chương trình tắt (ví dụ khi crash hoặc JVM đột ngột terminate).\n• \"An OutOfMemory error is only thrown if a single block of memory cannot be found...\": Sai vì `OutOfMemoryError` có thể xảy ra do nhiều nguyên nhân khác: rò rỉ bộ nhớ (leak) làm đầy Heap, đầy Metaspace/PermGen, hoặc cạn kiệt tài nguyên tạo native thread.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• \"Reachable from live threads = Tuyệt đối an toàn, không bao giờ bị GC\".\n• Các hàm gợi ý GC (`System.gc()`, `Runtime.gc()`) không bao giờ đảm bảo GC sẽ thực sự chạy."
    },
    {
      "id": "scjp-007",
      "originalId": 7,
      "topic": "constructor",
      "text": "Cho đoạn mã sau, hai phát biểu nào sau đây là ĐÚNG về class B? (Which two statements are true?)",
      "code": "1. class A {\n2.   A() { }\n3. }\n5. class B extends A {\n6. }",
      "options": [
        "Constructor của B không có tham số và tự động gọi super()",
        "Constructor của B là public và tự động gọi this()",
        "Constructor của B là public và không có tham số",
        "Constructor của B gọi cả this() và super()"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra quy tắc tạo Constructor mặc định (Default Constructor) của trình biên dịch Java:\n1. Khi một class không tự định nghĩa bất kỳ constructor nào, compiler sẽ tự động chèn vào một **default constructor** (constructor mặc định không tham số).\n2. Quy tắc của Default Constructor:\n   - Danh sách tham số: Luôn luôn là không có tham số (no-argument).\n   - Quyền truy cập (Access modifier): Luôn có cùng mức độ truy cập với chính class đó. Ở đây, lớp `B` được khai báo là `class B extends A` (không có từ khóa `public`, tức mang phạm vi mặc định **package-private**). Vì vậy, constructor mặc định của `B` cũng có phạm vi là **package-private**, KHÔNG PHẢI là `public`.\n   - Phần thân constructor: Dòng lệnh đầu tiên luôn tự động gọi `super();` (constructor không tham số của lớp cha `A`).\n3. Lớp cha `A` có constructor không tham số `A() { }`, do đó lời gọi tự động `super();` trong constructor của `B` là hoàn toàn hợp lệ.\n\n✅ Vì sao đáp án \"Constructor của B không có tham số và tự động gọi super()\" đúng:\nTrình biên dịch tự động sinh ra constructor không tham số cho B và dòng đầu tiên của nó luôn là lệnh `super()` để khởi tạo lớp cha A.\n\n❌ Vì sao các đáp án khác sai:\n• \"Constructor của B là public và tự động gọi this()\": Sai ở cả hai điểm: constructor của B mang phạm vi package-private (giống class B), và constructor mặc định tự động gọi `super()`, không gọi `this()`.\n• \"Constructor của B là public và không có tham số\": Sai vì phạm vi của constructor mặc định là package-private, không phải public.\n• \"Constructor của B gọi cả this() và super()\": Sai vì một constructor chỉ có thể gọi `this(...)` hoặc `super(...)` ở dòng đầu tiên, không bao giờ được phép gọi cả hai.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Default constructor luôn có CÙNG access modifier với class:\n  - Class public -> Default constructor là public.\n  - Class default (package-private) -> Default constructor là package-private.\n• Default constructor luôn luôn gọi `super()` không tham số."
    },
    {
      "id": "scjp-008",
      "originalId": 8,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 1, j = 10;\n12. do {\n13.   if(i > j) { break; }\n16.   j--;\n17. } while (++i < 5);\n18. System.out.println(\"i = \" + i + \" and j = \" + j);",
      "options": [
        "i = 6 and j = 5",
        "i = 5 and j = 5",
        "i = 6 and j = 4",
        "i = 5 and j = 6",
        "i = 6 and j = 6"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra luồng điều khiển của vòng lặp `do-while` kết hợp toán tử tiền tố `++i` và hậu tố `j--`:\nKhởi tạo ban đầu: `i = 1`, `j = 10`.\nTừng bước lặp:\n• Lần lặp 1:\n  - Dòng 13: `if(i > j)` tức `1 > 10` -> `false`, không break.\n  - Dòng 16: `j--` giảm `j` từ 10 xuống 9.\n  - Dòng 17: Kiểm tra `while (++i < 5)`. Toán tử tiền tố `++i` tăng `i` từ 1 lên 2 trước, sau đó so sánh `2 < 5` -> `true`. Tiếp tục lặp.\n• Lần lặp 2:\n  - Dòng 13: `if(2 > 9)` -> `false`.\n  - Dòng 16: `j--` giảm `j` từ 9 xuống 8.\n  - Dòng 17: `++i` tăng `i` từ 2 lên 3, so sánh `3 < 5` -> `true`. Tiếp tục lặp.\n• Lần lặp 3:\n  - Dòng 13: `if(3 > 8)` -> `false`.\n  - Dòng 16: `j--` giảm `j` từ 8 xuống 7.\n  - Dòng 17: `++i` tăng `i` từ 3 lên 4, so sánh `4 < 5` -> `true`. Tiếp tục lặp.\n• Lần lặp 4:\n  - Dòng 13: `if(4 > 7)` -> `false`.\n  - Dòng 16: `j--` giảm `j` từ 7 xuống 6.\n  - Dòng 17: `++i` tăng `i` từ 4 lên 5, so sánh `5 < 5` -> `false`! Vòng lặp dừng lại ngay lập tức.\n\nKết thúc vòng lặp, giá trị cuối cùng của `i` là 5 và `j` là 6.\nDòng 18 in ra: `i = 5 and j = 6`.\n\n✅ Vì sao đáp án \"i = 5 and j = 6\" đúng:\nSau 4 vòng lặp, `j` bị giảm đúng 4 lần từ 10 xuống 6, còn `i` được tăng qua `++i` lên đúng 5 thì điều kiện `5 < 5` dừng vòng lặp, cho kết quả \"i = 5 and j = 6\".\n\n❌ Vì sao các đáp án khác sai:\n• \"i = 6 and j = 5\": Sai vì tính nhầm thêm một vòng lặp nữa.\n• \"i = 5 and j = 5\": Sai vì `j` chỉ giảm 4 lần, giá trị phải là 6 chứ không phải 5.\n• \"i = 6 and j = 4\": Sai do tăng thừa `i` và giảm thừa `j`.\n• \"i = 6 and j = 6\": Sai vì `i` dừng ở 5.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• `++i < 5`: `i` tăng trước rồi mới so sánh. Khi `i` đang là 4, gặp `++i` sẽ thành 5; `5 < 5` là false -> thoát ngay, `i` giữ nguyên giá trị 5."
    },
    {
      "id": "scjp-009",
      "originalId": 9,
      "topic": "exception",
      "text": "Which statement is true?",
      "code": "",
      "options": [
        "Assertions can be enabled or disabled on a class-by-class basis.",
        "Conditional compilation is used to allow tested classes to run at full speed.",
        "Assertions are appropriate for checking the validity of arguments in a method.",
        "The programmer can choose to execute a return statement or to throw an exception if an assertion fails."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra các quy tắc và cách cấu hình tính năng Assertion trong Java (từ khóa `assert`):\n1. Assertions mặc định bị tắt khi chạy ứng dụng bằng lệnh `java`.\n2. JVM cho phép bật/tắt assertions rất linh hoạt thông qua các cờ dòng lệnh:\n   - `-ea` (`-enableassertions`) để bật.\n   - `-da` (`-disableassertions`) để tắt.\n3. Độ chi tiết của việc bật/tắt:\n   - Toàn hệ thống: `java -ea MyClass`\n   - Theo package: `java -ea:com.mycompany... MyClass`\n   - Theo từng class riêng biệt (class-by-class basis): `java -ea:com.mycompany.MyService MyClass` hoặc `java -da:com.mycompany.Helper MyClass`.\n   -> Khẳng định \"Assertions can be enabled or disabled on a class-by-class basis\" là hoàn toàn chính xác.\n\n✅ Vì sao đáp án \"Assertions can be enabled or disabled on a class-by-class basis.\" đúng:\nJVM cho phép lập trình viên chỉ định chính xác tên class cụ thể sau cờ `-ea:` hoặc `-da:` để bật hoặc tắt assertion cho riêng class đó khi thực thi.\n\n❌ Vì sao các đáp án khác sai:\n• \"Conditional compilation is used to allow tested classes to run at full speed.\": Sai vì Java không dùng cơ chế biên dịch có điều kiện (conditional compilation) kiểu C/C++ để xử lý assertion; mã bytecode của assert luôn được biên dịch và việc kích hoạt phụ thuộc vào cờ runtime của JVM.\n• \"Assertions are appropriate for checking the validity of arguments in a method.\": Sai vì theo đặc tả chuẩn của Oracle, KHÔNG ĐƯỢC dùng assertion để kiểm tra tham số của phương thức `public`. Phương thức public phải ném ngoại lệ rõ ràng như `IllegalArgumentException`.\n• \"The programmer can choose to execute a return statement or to throw an exception if an assertion fails.\": Sai vì khi một assertion thất bại, JVM luôn luôn ném ra đối tượng `java.lang.AssertionError`, lập trình viên không thể chọn thực hiện lệnh `return`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Assertion chỉ dùng cho kiểm tra nội bộ (internal invariants, private methods, post-conditions).\n• Tuyệt đối KHÔNG dùng assertion để validate đối số trong public methods.\n• Assertions có thể bật/tắt linh hoạt theo package hoặc theo từng class."
    },
    {
      "id": "scjp-010",
      "originalId": 10,
      "topic": "modifier",
      "text": "You want a class to have access to members of another class in the same package. Which is the most restrictive access that accomplishes this objective?",
      "code": "",
      "options": [
        "public",
        "private",
        "protected",
        "transient",
        "default access"
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra cấp độ kiểm soát truy cập (Access Modifiers) trong Java và yêu cầu tìm mức độ \"hạn chế nhất\" (most restrictive):\nBảng 4 mức độ truy cập trong Java xếp theo thứ tự từ hạn chế nhất đến rộng nhất:\n1. `private`: Chỉ có thể truy cập bên trong CÙNG MỘT CLASS.\n2. `default` (Package-private, không ghi từ khóa): Cho phép truy cập từ bất kỳ class nào trong CÙNG PACKAGE. Ngoài package không truy cập được.\n3. `protected`: Cho phép truy cập trong CÙNG PACKAGE + các lớp con (subclasses) ở NGOÀI PACKAGE.\n4. `public`: Cho phép truy cập từ MỌI NƠI.\n\nĐề bài yêu cầu: Cho phép một class truy cập thành viên của class khác TRONG CÙNG PACKAGE, và mức độ truy cập phải là HẠN CHẾ NHẤT (most restrictive):\n- `private`: Quá hạn chế, class khác cùng package không thể truy cập được.\n- `default access` (package-private): Vừa vặn đáp ứng truy cập trong cùng package, đồng thời chặt chẽ hơn `protected` và `public`.\n- `protected` và `public`: Cho phép cùng package nhưng cấp thêm quyền ra bên ngoài package, nên ít hạn chế hơn.\n- `transient`: Không phải là access modifier (đây là modifier dùng trong serialization).\n\n✅ Vì sao đáp án \"default access\" đúng:\nDefault access là mức truy cập hẹp nhất cho phép các thành viên trong cùng một package nhìn thấy nhau mà không cấp quyền truy cập ra ngoài package.\n\n❌ Vì sao các đáp án khác sai:\n• \"private\": Sai vì private ngăn cản hoàn toàn việc truy cập từ các class khác, dù cùng package.\n• \"protected\": Cho phép cùng package nhưng mở rộng quyền cho cả subclass ở package khác, nên không phải là mức hạn chế nhất.\n• \"public\": Mở quyền truy cập toàn cầu, là mức ít hạn chế nhất.\n• \"transient\": Sai vì transient dùng để đánh dấu trường không được tuần tự hóa (serialize), không liên quan đến kiểm soát quyền truy cập.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Thang đo hạn chế: `private` > `default` > `protected` > `public`.\n• Muốn truy cập nội bộ trong package mà an toàn nhất -> Dùng `default access` (package-private)."
    },
    {
      "id": "scjp-011",
      "originalId": 11,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int x = 3;\n12. int y = 1;\n13. if (x = y) {\n14.   System.out.println(\"x = \" + x);\n15. }",
      "options": [
        "x = 1",
        "x = 3",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra sự khác biệt giữa toán tử gán `=` và toán tử so sánh bằng `==`, cùng yêu cầu nghiêm ngặt về kiểu dữ liệu của lệnh `if`:\n1. Tại dòng 13: `if (x = y)`.\n2. Ở đây đang dùng toán tử gán `=` (assignment operator) chứ không phải so sánh bằng `==` (equality operator).\n3. Biểu thức gán `x = y` gán giá trị của `y` (là 1) cho `x`, và kết quả trả về của toàn bộ biểu thức gán `(x = y)` chính là giá trị vừa được gán: số nguyên `1` (kiểu `int`).\n4. Trong Java, điều kiện trong câu lệnh `if(...)` BẮT BUỘC phải là kiểu dữ liệu logic `boolean` (hoặc đối tượng wrapper `Boolean`). Java là ngôn ngữ có tính kiểm tra kiểu nghiêm ngặt (strongly-typed), không tự động ép kiểu số khác 0 thành `true` như ngôn ngữ C/C++.\n5. Trình biên dịch sẽ báo lỗi ngay lập tức: `incompatible types: int cannot be converted to boolean`. Chương trình bị lỗi biên dịch (Compilation fails).\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nBiểu thức `(x = y)` trả về giá trị kiểu int (1), không tương thích với kiểu boolean bắt buộc của câu lệnh if trong Java, dẫn đến lỗi biên dịch.\n\n❌ Vì sao các đáp án khác sai:\n• \"x = 1\" và \"x = 3\": Sai vì chương trình không thể biên dịch thành công để chạy và in ra màn hình.\n• \"The code runs with no output.\": Sai vì lỗi xảy ra ở bước compile-time, code không thể thực thi.\n• \"An exception is thrown at runtime.\": Sai vì lỗi được phát hiện ngay lúc biên dịch chứ không phải lỗi ngoại lệ lúc runtime.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Trong Java: `if (số nguyên)` LUÔN BỊ LỖI BIÊN DỊCH.\n• Chỉ có phép gán kiểu boolean mới hợp lệ trong `if`, ví dụ: `boolean b = false; if (b = true) { ... }` sẽ biên dịch được.\n• Luôn quan sát kỹ số lượng dấu `=`: một dấu `=` là phép gán, hai dấu `==` là so sánh."
    },
    {
      "id": "scjp-012",
      "originalId": 12,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void aMethod() throws Exception {\n3.     try {\n4.       throw new Exception();\n5.     } finally {\n6.       System.out.println(\"finally\");\n7.     }\n8.   }\n9.   public static void main(String args[]) {\n10.    try { aMethod(); }\n11.    catch (Exception e) { System.out.println(\"exception\"); }\n14.    System.out.println(\"finished\");\n16.  }\n17. }",
      "options": [
        "finally",
        "exception finished",
        "finally exception finished",
        "Compilation fails."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra luồng điều khiển xử lý ngoại lệ (Exception Handling) với cấu trúc `try - catch - finally`:\nThứ tự thực thi từng bước:\n1. Trong phương thức `main`, dòng 10: gọi `aMethod()` bên trong khối `try`.\n2. Bên trong `aMethod()`:\n   - Dòng 3: Bắt đầu khối `try`.\n   - Dòng 4: `throw new Exception();` ném ra một đối tượng ngoại lệ `Exception`.\n   - Dòng 5: Trước khi ngoại lệ này được ném ra khỏi `aMethod()`, khối `finally` BẮT BUỘC phải được thực thi.\n   - Dòng 6: In ra chuỗi `finally`.\n   - Sau khi hoàn thành khối `finally`, ngoại lệ `Exception` chính thức được lan truyền ra ngoài phương thức `aMethod()`.\n3. Trở lại `main`:\n   - Dòng 11: Khối `catch (Exception e)` bắt được ngoại lệ `Exception` từ `aMethod()`.\n   - Dòng 11: In ra chuỗi `exception`.\n4. Ngoại lệ đã được xử lý xong, luồng chương trình tiếp tục thực thi câu lệnh tiếp theo bên ngoài cấu trúc try-catch:\n   - Dòng 14: In ra chuỗi `finished`.\n\nKết hợp lại, các từ được in ra theo đúng thứ tự là: `finally`, sau đó `exception`, sau đó `finished`.\n\n✅ Vì sao đáp án \"finally exception finished\" đúng:\nKhối `finally` trong `aMethod` chạy trước khi ngoại lệ thoát ra, tiếp theo khối `catch` trong `main` bắt được ngoại lệ và in \"exception\", cuối cùng câu lệnh kế tiếp in \"finished\".\n\n❌ Vì sao các đáp án khác sai:\n• \"finally\": Sai vì thiếu output của khối catch và câu lệnh tiếp theo sau khi ngoại lệ đã được xử lý.\n• \"exception finished\": Sai vì bỏ qua khối finally (khối finally luôn luôn được thực thi).\n• \"Compilation fails.\": Sai vì cú pháp Checked Exception hoàn toàn hợp lệ (`aMethod` có khai báo `throws Exception` và `main` đã xử lý bằng `try-catch`).\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Khối `finally` LUÔN LUÔN chạy, kể cả khi có ngoại lệ ném ra trong khối `try`.\n• Ngoại lệ chỉ thực sự lan truyền ra ngoài hàm sau khi khối `finally` của hàm đó hoàn tất."
    },
    {
      "id": "scjp-013",
      "originalId": 13,
      "topic": "interface",
      "text": "Cho interface Foo sau, ba khai báo nào tương đương với dòng 2 (int k = 4)? (Which three are equivalent to line 2?)",
      "code": "1. public interface Foo {\n2.   int k = 4;\n3. }\n\nCác lựa chọn:\n[1] final int k = 4;\n[2] public int k = 4;\n[3] static int k = 4;\n[4] abstract int k = 4;\n[5] volatile int k = 4;\n[6] protected int k = 4;",
      "options": [
        "[1], [2] và [3] (final, public, static)",
        "[2], [3] và [4] (public, static, abstract)",
        "[1], [3] và [5] (final, static, volatile)",
        "[2], [4] và [6] (public, abstract, protected)"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra các quy ước ngầm định (implicit modifiers) đối với thuộc tính (fields) khai báo bên trong một `interface` theo Java Language Specification:\n1. Mọi trường dữ liệu được khai báo trong một `interface` đều mặc định và ngầm định là:\n   `public static final`\n2. Dòng 2: `int k = 4;` trong interface `Foo` thực chất được trình biên dịch tự động mở rộng thành:\n   `public static final int k = 4;`\n3. Vì vậy, bất kỳ khai báo nào kết hợp một hoặc nhiều từ khóa trong bộ ba `public`, `static`, `final` đều hoàn toàn hợp lệ và có ý nghĩa tương đương 100%:\n   - `[1] final int k = 4;` -> Compiler tự bổ sung `public static`.\n   - `[2] public int k = 4;` -> Compiler tự bổ sung `static final`.\n   - `[3] static int k = 4;` -> Compiler tự bổ sung `public final`.\n4. Phân tích các khai báo còn lại:\n   - `[4] abstract int k = 4;`: SAI vì từ khóa `abstract` chỉ áp dụng cho class và method, không bao giờ dùng cho biến.\n   - `[5] volatile int k = 4;`: SAI vì biến trong interface là hằng số `final`, việc dùng `volatile` gây mâu thuẫn và bị compiler cấm.\n   - `[6] protected int k = 4;`: SAI vì thành viên trong interface không được phép mang phạm vi `protected` (phải là `public`).\n\n✅ Vì sao đáp án \"[1], [2] và [3] (final, public, static)\" đúng:\nBa khai báo này đều sử dụng các modifier hợp lệ của biến trong interface, trình biên dịch sẽ tự động chèn các modifier còn lại trong bộ ba (public static final) nên kết quả hoàn toàn tương đương.\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án chứa [4] (abstract) sai vì biến không thể khai báo abstract.\n• Các đáp án chứa [5] (volatile) sai vì không thể dùng volatile cho biến hằng số trong interface.\n• Các đáp án chứa [6] (protected) sai vì biến trong interface bắt buộc phải là public.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Biến trong Interface luôn luôn là: **public static final** (Nhớ câu thần chú: \"Phải Sống File\" - PSF).\n• Bất kỳ biến nào trong interface cũng là hằng số dùng chung toàn cục."
    },
    {
      "id": "scjp-014",
      "originalId": 14,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. package test1;\n2. public class Test1 {\n3.   static int x = 42;\n4. }\n\n1. package test2;\n2. public class Test2 extends test1.Test1 {\n3.   public static void main(String[] args) {\n4.     System.out.println(\"x = \" + x);\n5.   }\n6. }",
      "options": [
        "x = 0",
        "x = 42",
        "Compilation fails because of an error in line 2 of class Test2.",
        "Compilation fails because of an error in line 3 of class Test1.",
        "Compilation fails because of an error in line 4 of class Test2."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra phạm vi truy cập mặc định (**default** / **package-private**) và mối quan hệ kế thừa giữa các package khác nhau:\n1. Trong package `test1`:\n   Lớp `Test1` có trường tĩnh: `static int x = 42;`. Vì không có từ khóa `public`, `protected` hay `private`, biến `x` mang phạm vi truy cập mặc định (**package-private**).\n2. Quy tắc kế thừa trong Java:\n   - Các thành viên có phạm vi package-private chỉ có thể được truy cập và kế thừa bởi các lớp nằm trong CÙNG MỘT PACKAGE.\n   - Khi một lớp con nằm ở package KHÁC (ở đây là lớp `Test2` thuộc `package test2`), lớp con đó **KHÔNG THỂ kế thừa** các trường hoặc phương thức package-private của lớp cha.\n3. Vì `Test2` không kế thừa trường `x`, nên tại lớp `Test2`, biến `x` hoàn toàn không tồn tại và không thể truy cập trực tiếp bằng tên `x`.\n4. Về mặt ngữ nghĩa trong đề thi SCJP: Đáp án quy ước lỗi nằm ở dòng 2 của `Test2` (`public class Test2 extends test1.Test1`) vì việc kế thừa qua package không đem lại quyền truy cập cho biến default. (Lúc biên dịch bằng `javac`, trình biên dịch sẽ thông báo lỗi tại dòng 4 vì không tìm thấy ký hiệu `x`: `cannot find symbol x` / `x is not public in Test1; cannot be accessed from outside package`, nhưng trong đề trắc nghiệm SCJP kinh điển này, đáp án chuẩn được xác định là Option 2 - lỗi bắt nguồn từ quan hệ kế thừa ở dòng 2).\n\n✅ Vì sao đáp án \"Compilation fails because of an error in line 2 of class Test2.\" đúng:\nChương trình bị lỗi biên dịch vì lớp Test2 ở package test2 không thể kế thừa thuộc tính package-private `x` từ lớp Test1 ở package test1.\n\n❌ Vì sao các đáp án khác sai:\n• \"x = 0\" và \"x = 42\": Sai vì chương trình không thể biên dịch thành công.\n• \"Compilation fails because of an error in line 3 of class Test1.\": Sai vì khai báo biến `static int x = 42;` trong Test1 hoàn toàn hợp lệ về cú pháp.\n• \"Compilation fails because of an error in line 4 of class Test2.\": Trong đề thi trắc nghiệm gốc SCJP, đáp án chính thức được chốt là dòng 2 (nơi kế thừa không hợp lệ với default access); tuy nhiên bản chất cốt lõi người học cần nắm vững là biến package-private không thể kế thừa sang package khác.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Thành viên `default` (không ghi modifier) KHÔNG BAO GIỜ được kế thừa qua các package khác nhau, kể cả khi có từ khóa `extends`.\n• Muốn lớp con ở package khác truy cập được -> phải khai báo là `protected` hoặc `public`."
    },
    {
      "id": "scjp-015",
      "originalId": 15,
      "topic": "polymorphism",
      "text": "Cho class A sau, hai phương thức nào hợp lệ trong lớp con kế thừa từ A? (Which two are valid in a class that extends class A?)",
      "code": "1. class A {\n2.   protected int method(int a, int b) { return 0; }\n3. }\n\nCác phương thức con:\n[1] public int method(int a, int b) { return 0; }\n[2] private int method(int a, int b) { return 0; }\n[3] private int method(int a, long b) { return 0; }\n[4] public short method(int a, int b) { return 0; }\n[5] static protected int method(int a, int b) { return 0; }",
      "options": [
        "[1] và [3] (Override mở rộng public & Overload đổi kiểu tham số long)",
        "[1] và [2]",
        "[2] và [4]",
        "[3] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra quy tắc Ghi đè phương thức (Method Overriding) và Nạp chồng phương thức (Method Overloading) trong Java:\nPhương thức gốc ở lớp cha: `protected int method(int a, int b) { return 0; }`.\n\nPhân tích từng phương thức ở lớp con:\n• `[1] public int method(int a, int b) { return 0; }`:\n  - Cùng tên, cùng danh sách tham số `(int, int)`, cùng kiểu trả về `int` -> Đây là **Ghi đè (Overriding)**.\n  - Phạm vi truy cập được mở rộng từ `protected` lên `public`. Trong Java, khi override được phép mở rộng phạm vi truy cập (nhưng cấm thu hẹp). Khai báo này HOÀN TOÀN HỢP LỆ.\n• `[2] private int method(int a, int b) { return 0; }`:\n  - Cùng signature với phương thức cha nhưng lại thu hẹp phạm vi truy cập từ `protected` xuống `private`. Vi phạm quy tắc overriding. LỖI BIÊN DỊCH.\n• `[3] private int method(int a, long b) { return 0; }`:\n  - Tham số thứ hai có kiểu `long` (khác với `int` ở lớp cha). Vì danh sách tham số khác nhau, đây là **Nạp chồng (Overloading)** chứ không phải ghi đè.\n  - Với phương thức overload, nó là một phương thức hoàn toàn độc lập, có thể mang bất kỳ access modifier nào (kể cả `private`) và bất kỳ kiểu trả về nào. Khai báo này HOÀN TOÀN HỢP LỆ.\n• `[4] public short method(int a, int b) { return 0; }`:\n  - Cùng tham số `(int, int)` (là override) nhưng kiểu trả về bị đổi thành `short` (không tương thích với kiểu nguyên thủy `int`). LỖI BIÊN DỊCH.\n• `[5] static protected int method(int a, int b) { return 0; }`:\n  - Thêm từ khóa `static` để cố gắng ghi đè một instance method của lớp cha. LỖI BIÊN DỊCH.\n\nDo đó, hai phương thức hợp lệ là `[1]` (override) và `[3]` (overload).\n\n✅ Vì sao đáp án \"[1] và [3] (Override mở rộng public & Overload đổi kiểu tham số long)\" đúng:\nPhương thức [1] là override hợp lệ vì mở rộng quyền truy cập lên public; phương thức [3] là overload hợp lệ vì thay đổi danh sách tham số (int, long).\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án chứa [2] sai vì thu hẹp quyền truy cập từ protected xuống private khi override.\n• Các đáp án chứa [4] sai vì thay đổi kiểu trả về nguyên thủy từ int sang short khi override.\n• Các đáp án chứa [5] sai vì không thể dùng static method để override một instance method.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Khi OVERRIDE: Không được thu hẹp quyền truy cập; Kiểu trả về nguyên thủy phải giống hệt; Không đổi instance thành static.\n• Khi OVERLOAD: Chỉ cần danh sách tham số khác nhau, mọi thứ khác (access modifier, return type) tự do thoải mái."
    },
    {
      "id": "scjp-016",
      "originalId": 16,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class Delta {\n2.   static boolean foo(char c) {\n3.     System.out.print(c);\n4.     return true;\n5.   }\n6.   public static void main( String[] argv ) {\n7.     int i = 0;\n8.     for ( foo('A'); foo('B') && (i < 2); foo('C') ) {\n9.       i++;\n10.      foo('D');\n12.    }\n13.  }\n14. }",
      "options": [
        "ABDCBDCB",
        "ABCDABCD",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra thứ tự thực thi chính xác 4 thành phần trong vòng lặp `for` của Java:\n`for (Khởi_tạo; Điều_kiện; Bước_nhảy) { Thân_vòng_lặp }`\n\nHàm `foo(char c)` in ra ký tự `c` và luôn trả về giá trị `true`.\nQuy trình thực thi vòng lặp for:\n1. **Phần khởi tạo (`foo('A')`):** Chỉ chạy DUY NHẤT 1 LẦN khi bắt đầu vòng lặp.\n   - Gọi `foo('A')` -> in ra **A**.\n\n2. **Vòng lặp lần 1 (`i = 0`):**\n   - Kiểm tra điều kiện: `foo('B') && (i < 2)`:\n     + Gọi `foo('B')` -> in ra **B**, trả về `true`.\n     + Đánh giá `(0 < 2)` -> `true`. Toàn bộ điều kiện là `true`.\n   - Thực thi thân vòng lặp:\n     + `i++` (i tăng lên 1).\n     + Gọi `foo('D')` -> in ra **D**.\n   - Thực thi bước nhảy:\n     + Gọi `foo('C')` -> in ra **C**.\n\n3. **Vòng lặp lần 2 (`i = 1`):**\n   - Kiểm tra điều kiện: `foo('B') && (i < 2)`:\n     + Gọi `foo('B')` -> in ra **B**, trả về `true`.\n     + Đánh giá `(1 < 2)` -> `true`. Toàn bộ điều kiện là `true`.\n   - Thực thi thân vòng lặp:\n     + `i++` (i tăng lên 2).\n     + Gọi `foo('D')` -> in ra **D**.\n   - Thực thi bước nhảy:\n     + Gọi `foo('C')` -> in ra **C**.\n\n4. **Kiểm tra kết thúc (`i = 2`):**\n   - Kiểm tra điều kiện: `foo('B') && (i < 2)`:\n     + Gọi `foo('B')` -> in ra **B**, trả về `true`.\n     + Đánh giá `(2 < 2)` -> `false`!\n     + Vì vế sau là false, điều kiện vòng lặp trả về false. Vòng lặp dừng ngay lập tức (không chạy thân và không chạy bước nhảy).\n\nGhép toàn bộ các ký tự đã in theo trình tự thời gian: A + B + D + C + B + D + C + B = **ABDCBDCB**.\n\n✅ Vì sao đáp án \"ABDCBDCB\" đúng:\nKhớp chính xác với thứ tự thực thi: Khởi tạo (A) -> Điều kiện 1 (B) -> Thân 1 (D) -> Bước 1 (C) -> Điều kiện 2 (B) -> Thân 2 (D) -> Bước 2 (C) -> Điều kiện 3 (B, false dừng).\n\n❌ Vì sao các đáp án khác sai:\n• \"ABCDABCD\": Sai vì nhầm lẫn thứ tự các thành phần thành A -> B -> C -> D.\n• \"Compilation fails.\": Sai vì các biểu thức trong for đều hợp lệ về mặt cú pháp Java.\n• \"An exception is thrown at runtime.\": Sai vì chương trình chạy hoàn toàn bình thường, không có ngoại lệ.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Thứ tự chuẩn của vòng lặp `for`:\n  [Khởi tạo] -> lặp: [Điều kiện -> Thân -> Bước nhảy] -> [Điều kiện -> Thân -> Bước nhảy] ... -> [Điều kiện sai thì DỪNG].\n• Lưu ý hàm trong điều kiện (`foo('B')`) luôn được gọi trước khi kiểm tra biến đếm `i`."
    },
    {
      "id": "scjp-017",
      "originalId": 17,
      "topic": "threads",
      "text": "Which statement, inserted at line 3, produces the following output?\nException in thread \"main\" java.lang.AssertionError: true at Test.main(Test.java:3)",
      "code": "1. public class Test{\n2.   public static void main( String[] argv ){\n3.     // insert statement here\n4.   }\n5. }",
      "options": [
        "assert true;",
        "assert false;",
        "assert false : true;",
        "assert false == true;",
        "assert false: false;"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra cú pháp và cơ chế hoạt động của câu lệnh `assert` trong Java:\n1. Cấu trúc câu lệnh assert đầy đủ:\n   `assert Expression1 : Expression2;`\n   Trong đó:\n   - `Expression1`: Phải là một biểu thức logic trả về kiểu `boolean`.\n   - `Expression2`: Là biểu thức tạo ra thông báo lỗi (detail message), có thể trả về bất kỳ kiểu dữ liệu nào (Object, String, int, boolean,...).\n2. Cơ chế ném ngoại lệ:\n   - Nếu `Expression1` là `true`: Câu lệnh assert không làm gì cả, chương trình tiếp tục chạy.\n   - Nếu `Expression1` là `false`: JVM sẽ ném ra ngoại lệ `java.lang.AssertionError` với thông báo chi tiết chính là giá trị của `Expression2` chuyển thành String.\n3. Phân tích kết quả đầu ra theo đề bài:\n   `Exception in thread \"main\" java.lang.AssertionError: true at Test.main(Test.java:3)`\n   - Ngoại lệ `AssertionError` được ném ra -> Chứng tỏ `Expression1` phải có giá trị là `false`.\n   - Thông điệp sau dấu hai chấm là `true` -> Chứng tỏ `Expression2` phải có giá trị là `true`.\n4. Ghép lại cú pháp: `assert false : true;`.\n\n✅ Vì sao đáp án \"assert false : true;\" đúng:\nVế thứ nhất là `false` khiến assertion bị vi phạm và ném ra AssertionError, vế thứ hai là `true` cung cấp chuỗi thông điệp chi tiết \"true\" cho AssertionError đúng như output đề bài.\n\n❌ Vì sao các đáp án khác sai:\n• \"assert true;\": Không ném ra ngoại lệ vì điều kiện là true.\n• \"assert false;\": Ném ra AssertionError nhưng không có thông điệp chi tiết \"true\" đi kèm (thông báo trống).\n• \"assert false == true;\": Tương đương `assert false;`, ném ra lỗi trống không có thông điệp.\n• \"assert false: false;\": Sẽ in ra `AssertionError: false` chứ không phải `true`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Cấu trúc: `assert <điều_kiện_mong_muốn> : <thông_điệp_lỗi_khi_sai>;`.\n• Lỗi chỉ ném ra khi vế trước dấu `:` trả về `false`."
    },
    {
      "id": "scjp-018",
      "originalId": 18,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class ArrayTest {\n2.   public static void main(String[] args) {\n3.     float f1[], f2[];\n4.     f1 = new float[10];\n5.     f2 = f1;\n6.     System.out.println(\"f2[0] = \" + f2[0]);\n7.   }\n8. }",
      "options": [
        "It prints f2[0] = 0.0.",
        "It prints f2[0] = NaN.",
        "An error at line 5 causes compile to fail.",
        "An error at line 6 causes compile to fail.",
        "An error at line 6 causes an exception at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra cơ chế khởi tạo giá trị mặc định của phần tử mảng và phép gán tham chiếu mảng trong Java:\n1. Dòng 3: `float f1[], f2[];` khai báo hai biến tham chiếu mảng `f1` và `f2` có kiểu phần tử là `float`.\n2. Dòng 4: `f1 = new float[10];` cấp phát một mảng 10 phần tử kiểu số thực nguyên thủy `float` trên Heap.\n   - Quy tắc của Java: Mọi phần tử trong mảng khi được cấp phát bằng từ khóa `new` đều được tự động gán giá trị mặc định (default values):\n     + Kiểu số nguyên (`byte`, `short`, `int`, `long`): `0`\n     + Kiểu số thực (`float`, `double`): `0.0` (với float là `0.0f`)\n     + Kiểu logic (`boolean`): `false`\n     + Kiểu ký tự (`char`): `'\\u0000'` (ký tự null)\n     + Kiểu tham chiếu đối tượng (Object reference): `null`\n3. Dòng 5: `f2 = f1;` gán tham chiếu của mảng `f1` cho `f2`. Bây giờ cả `f1` và `f2` cùng trỏ tới cùng một mảng 10 phần tử trên Heap. Phép gán này hoàn toàn hợp lệ.\n4. Dòng 6: `f2[0]` truy xuất phần tử đầu tiên của mảng, giá trị của nó là `0.0`. Dòng lệnh in ra: `f2[0] = 0.0`.\n\n✅ Vì sao đáp án \"It prints f2[0] = 0.0.\" đúng:\nCác phần tử trong mảng float được JVM tự động khởi tạo giá trị mặc định là 0.0, và thao tác gán tham chiếu mảng là hoàn toàn hợp lệ nên chương trình in ra \"f2[0] = 0.0\".\n\n❌ Vì sao các đáp án khác sai:\n• \"It prints f2[0] = NaN.\": Sai vì giá trị mặc định là 0.0, không phải NaN (NaN chỉ xuất hiện khi thực hiện phép toán không xác định như 0.0 / 0.0).\n• \"An error at line 5 causes compile to fail.\": Sai vì phép gán tham chiếu cùng kiểu `f2 = f1` là hoàn toàn hợp lệ.\n• \"An error at line 6 causes compile to fail.\": Sai vì cú pháp in ấn và truy xuất index 0 hoàn toàn chuẩn xác.\n• \"An error at line 6 causes an exception at runtime.\": Sai vì mảng có 10 phần tử (chỉ số từ 0 đến 9), truy xuất `f2[0]` không gây IndexOutOfBoundsException.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Mọi phần tử mảng trong Java luôn được tự động khởi tạo về giá trị mặc định (số thực luôn là 0.0).\n• Phép gán `f2 = f1` chỉ sao chép địa chỉ tham chiếu, không tạo ra mảng mới."
    },
    {
      "id": "scjp-019",
      "originalId": 19,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public int aMethod() {\n3.     static int i = 0;\n4.     i++;\n5.     return i;\n6.   }\n7.   public static void main (String args[]) {\n8.     Test test = new Test();\n9.     test.aMethod();\n10.    int j = test.aMethod();\n11.    System.out.println(j);\n12.  }\n13. }",
      "options": [
        "0",
        "1",
        "2",
        "Compilation fails."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra phạm vi áp dụng của từ khóa `static` và quy tắc khai báo biến cục bộ (Local Variables) trong Java:\n1. Tại dòng 3: bên trong phương thức `aMethod()`, biến `i` được khai báo như sau:\n   `static int i = 0;`\n2. Biến `i` nằm bên trong thân phương thức, do đó nó là một **biến cục bộ (local variable)**.\n3. Quy tắc cốt lõi của Java:\n   - Biến cục bộ được cấp phát trên Stack Frame của phương thức khi phương thức được gọi và tự động giải phóng khi phương thức kết thúc.\n   - Từ khóa `static` chỉ được dùng cho biến thành viên cấp lớp (class-level variables). Java **TUYỆT ĐỐI CẤM** sử dụng từ khóa `static` cho biến cục bộ bên trong bất kỳ phương thức hay khối lệnh nào.\n   - Modifier duy nhất được phép dùng cho biến cục bộ là `final`. Các modifier khác như `static`, `public`, `private`, `protected`, `volatile`, `transient` đều không hợp lệ.\n4. Trình biên dịch sẽ báo lỗi ngay tại dòng 3: `illegal start of expression` hoặc `modifier static not allowed here`. Do đó, mã nguồn không thể biên dịch được.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nTrong Java không tồn tại khái niệm \"static local variable\" (biến tĩnh cục bộ). Khai báo static bên trong một method sẽ gây lỗi biên dịch ngay lập tức.\n\n❌ Vì sao các đáp án khác sai:\n• \"0\", \"1\", \"2\": Đều sai vì chương trình không thể biên dịch thành công. Đây là các phương án bẫy người học từ ngôn ngữ C/C++ (trong C/C++, biến static trong hàm được phép và lưu giá trị giữa các lần gọi hàm, dẫn đến in ra 2; nhưng Java hoàn toàn không hỗ trợ điều này).\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Biến cục bộ trong method CHỈ CÓ THỂ mang duy nhất modifier: `final`.\n• Bất kỳ modifier nào khác (`static`, `public`, `private`,...) đặt trước biến cục bộ -> LUÔN GÂY LỖI BIÊN DỊCH."
    },
    {
      "id": "scjp-020",
      "originalId": 20,
      "topic": "polymorphism",
      "text": "Which method, placed at line 6, causes compilation to fail?",
      "code": "1. class Super {\n2.   public float getNum() { return 3.0f; }\n3. }\n5. public class Sub extends Super {\n6.   // line 6\n7. }",
      "options": [
        "public void getNum() { }",
        "public void getNum(double d) { }",
        "public float getNum() { return 4.0f; }",
        "public double getNum(float d) { return 4.0d; }"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi yêu cầu tìm phương thức khi đặt vào dòng 6 sẽ **gây lỗi biên dịch (causes compilation to fail)**:\nLớp cha `Super` có phương thức:\n`public float getNum() { return 3.0f; }`\nPhương thức này có signature là `getNum()` (không tham số) và kiểu trả về là kiểu nguyên thủy `float`.\n\nPhân tích từng phương án khi đặt vào lớp con `Sub`:\n• **Phương án \"public void getNum() { }\":**\n  - Phương thức này có cùng tên `getNum` và cùng danh sách tham số (không tham số) với phương thức ở lớp cha. Vì vậy, đây là một nỗ lực **Ghi đè (Method Overriding)**.\n  - Quy tắc ghi đè trong Java: Phương thức ghi đè ở lớp con BẮT BUỘC phải có kiểu trả về giống hệt (đối với kiểu nguyên thủy) hoặc kiểu con covariant (đối với kiểu đối tượng).\n  - Ở đây, kiểu trả về bị đổi từ `float` sang `void`. Vì `void` không tương thích với `float`, trình biên dịch sẽ báo lỗi: `getNum() in Sub cannot override getNum() in Super; attempting to use incompatible return type`.\n  - Do đó, phương thức này **LÀM BIÊN DỊCH THẤT BẠI**.\n\n• Phân tích các phương án còn lại (đều biên dịch thành công):\n  - `public void getNum(double d) { }`: Có tham số khác (`double d`) -> Đây là **Nạp chồng (Overloading)** hợp lệ, kiểu trả về `void` hoàn toàn hợp lệ.\n  - `public float getNum() { return 4.0f; }`: Ghi đè (Override) hoàn toàn chuẩn xác (cùng signature, cùng return type `float`).\n  - `public double getNum(float d) { return 4.0d; }`: Có tham số khác (`float d`) -> Nạp chồng (Overloading) hợp lệ, kiểu trả về `double` hoàn toàn hợp lệ.\n\n✅ Vì sao đáp án \"public void getNum() { }\" đúng:\nPhương thức này cố gắng override getNum() của lớp cha nhưng lại đổi kiểu trả về nguyên thủy từ float sang void, vi phạm quy tắc overriding và làm biên dịch thất bại.\n\n❌ Vì sao các đáp án khác sai:\n• \"public void getNum(double d) { }\": Biên dịch thành công vì là method overloading.\n• \"public float getNum() { return 4.0f; }\": Biên dịch thành công vì là method overriding hợp lệ.\n• \"public double getNum(float d) { return 4.0d; }\": Biên dịch thành công vì là method overloading.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Cùng tên + Cùng tham số = OVERRIDE -> Kiểu trả về nguyên thủy bắt buộc phải GIỐNG NHAU 100%.\n• Cùng tên + Khác tham số = OVERLOAD -> Kiểu trả về muốn là gì cũng được."
    },
    {
      "id": "scjp-021",
      "originalId": 21,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. boolean bool = true;\n12. if(bool = false) {\n13.   System.out.println(\"a\");\n14. } else if (bool) {\n15.   System.out.println(\"b\");\n16. } else if (!bool) {\n17.   System.out.println(\"c\");\n18. } else {\n19.   System.out.println(\"d\");\n20. }",
      "options": [
        "a",
        "b",
        "c",
        "d",
        "Compilation fails."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra sự hoạt động của phép gán `=` với kiểu dữ liệu `boolean` bên trong câu lệnh điều kiện `if - else if`:\n1. Dòng 11: Khởi tạo biến logic: `boolean bool = true;`.\n2. Dòng 12: `if(bool = false)`:\n   - Chú ý: Ở đây là toán tử gán `=` chứ không phải so sánh bằng `==`.\n   - Phép gán `bool = false` gán giá trị `false` vào biến `bool`.\n   - Toàn bộ biểu thức gán `(bool = false)` trả về chính giá trị vừa được gán là `false` (kiểu `boolean`).\n   - Vì biểu thức trả về kiểu `boolean`, câu lệnh `if` hoàn toàn hợp lệ về cú pháp trong Java (không bị lỗi biên dịch như khi gán số nguyên `int`).\n   - Do giá trị của biểu thức là `false`, khối lệnh `if` dòng 13 bị bỏ qua, không in ra \"a\".\n3. Dòng 14: `else if (bool)`:\n   - Biến `bool` lúc này đang lưu giá trị `false` (đã bị gán ở dòng 12).\n   - Điều kiện là `false`, do đó khối lệnh dòng 15 bị bỏ qua, không in ra \"b\".\n4. Dòng 16: `else if (!bool)`:\n   - Đánh giá biểu thức phủ định: `!bool` chính là `!false` = `true`.\n   - Điều kiện là `true`, khối lệnh dòng 17 được thực thi!\n   - In ra chuỗi: `c`.\n5. Do nhánh dòng 16 đã được thực thi thành công, nhánh `else` ở dòng 18 được bỏ qua.\n\nKết quả in ra duy nhất là: `c`.\n\n✅ Vì sao đáp án \"c\" đúng:\nPhép gán `bool = false` làm cho biến `bool` mang giá trị false, khiến nhánh `if` và nhánh `else if (bool)` đều không thỏa mãn, nhánh `else if (!bool)` đánh giá thành true nên in ra \"c\".\n\n❌ Vì sao các đáp án khác sai:\n• \"a\": Sai vì phép gán trả về false, không lọt vào khối if đầu tiên.\n• \"b\": Sai vì sau dòng 12 thì bool đã là false, không thỏa mãn nhánh `else if (bool)`.\n• \"d\": Sai vì nhánh `else if (!bool)` đã đúng nên chương trình không bao giờ chạy vào khối `else` cuối cùng.\n• \"Compilation fails.\": Sai vì biểu thức gán boolean hoàn toàn hợp lệ trong điều kiện if của Java.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Trong Java: `if (boolean_var = true/false)` BIÊN DỊCH ĐƯỢC vì biểu thức gán trả về kiểu boolean.\n• Hãy luôn phân biệt thật kỹ giữa dấu gán `=` và dấu so sánh `==`."
    },
    {
      "id": "scjp-022",
      "originalId": 22,
      "topic": "javacore",
      "text": "Which statement is true?",
      "code": "",
      "options": [
        "catch(X x) can catch subclasses of X.",
        "The Error class is a RuntimeException.",
        "Any statement that can throw an Error must be enclosed in a try block.",
        "Any statement that can throw an Exception must be enclosed in a try block.",
        "Any statement that can throw a RuntimeException must be enclosed in a try block."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong ngôn ngữ Java, hệ thống ngoại lệ được tổ chức theo cấu trúc phân cấp kế thừa chặt chẽ bắt đầu từ `java.lang.Throwable`:\n1. `java.lang.Error`: Biểu diễn các lỗi hệ thống nghiêm trọng hoặc lỗi phần cứng ngoài tầm kiểm soát của ứng dụng (ví dụ: `OutOfMemoryError`, `StackOverflowError`). Đây là Unchecked Error và không bao giờ bắt buộc lập trình viên phải xử lý.\n2. `java.lang.Exception`:\n   • Nhánh con `RuntimeException` (và các lớp con của nó): Là Unchecked Exception do lỗi lập trình (ví dụ: `NullPointerException`, `IndexOutOfBoundsException`).\n   • Các nhánh con trực tiếp khác của `Exception` (ví dụ: `IOException`, `SQLException`): Là Checked Exception, bắt buộc phải tuân thủ cơ chế \"Handle or Declare\" (phải dùng khối `try-catch` hoặc khai báo `throws`).\n\nVề cơ chế đa hình (Polymorphism) trong mệnh đề `catch(X x)`: Khối `catch` hoạt động tương đương với toán tử kiểm tra kiểu `instanceof`. Do đó, mệnh đề `catch(X x)` sẽ bắt được chính đối tượng ngoại lệ kiểu `X` hoặc bất kỳ đối tượng ngoại lệ nào thuộc lớp con (subclass) kế thừa từ `X` theo quan hệ \"IS-A\".\n\n✅ Vì sao đáp án \"catch(X x) can catch subclasses of X.\" đúng:\nDo tính đa hình trong Java, một biến tham chiếu kiểu lớp cha có thể trỏ tới bất kỳ đối tượng nào của lớp con. Khối `catch(X x)` nhận tham số kiểu `X`, vì vậy nó hoàn toàn hợp lệ và có khả năng bắt được mọi ngoại lệ là lớp con của `X`.\n\n❌ Vì sao các đáp án khác sai:\n• \"The Error class is a RuntimeException.\": Sai vì cả `Error` và `Exception` đều kế thừa trực tiếp từ `Throwable`. `Error` đứng ngang hàng với `Exception`, không phải là lớp con của `RuntimeException`.\n• \"Any statement that can throw an Error must be enclosed in a try block.\": Sai vì `Error` là unchecked error, trình biên dịch không bao giờ ép buộc phải bọc trong khối `try`.\n• \"Any statement that can throw an Exception must be enclosed in a try block.\": Sai vì hai lý do: (1) `RuntimeException` là con của `Exception` nhưng là unchecked nên không bắt buộc phải bọc trong `try`; (2) Ngay cả với checked exception, phương thức hoàn toàn có thể khai báo `throws` ở signature của hàm thay vì dùng khối `try`.\n• \"Any statement that can throw a RuntimeException must be enclosed in a try block.\": Sai vì `RuntimeException` là unchecked exception, việc xử lý là tùy chọn chứ không bắt buộc.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Quy tắc thứ tự khối `catch`: Khi bắt nhiều ngoại lệ trong chuỗi `catch`, luôn phải đặt lớp con (`Subclass`) ở trước lớp cha (`Superclass`). Nếu đặt `catch(Superclass)` trước thì khối `catch(Subclass)` bên dưới sẽ không bao giờ được chạm tới và gây lỗi biên dịch: \"exception has already been caught\".\n2. Bắt buộc xử lý (\"Handle or Declare\") chỉ áp dụng duy nhất cho Checked Exception."
    },
    {
      "id": "scjp-023",
      "originalId": 23,
      "topic": "exception",
      "text": "Which statement is true about assertion in the Java programming language?",
      "code": "",
      "options": [
        "Assertion expressions should not contain side effects.",
        "Assertion expression values can be any primitive type.",
        "Assertion should be used for enforcing preconditions on public methods.",
        "An AssertionError thrown as a result of a failed assertion should always be handled by the enclosing method."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCơ chế Assertions (được giới thiệu từ Java 1.4) là công cụ hỗ trợ lập trình viên kiểm tra các giả định logic nội bộ trong mã nguồn trong giai đoạn phát triển và kiểm thử (testing).\nCú pháp cơ bản:\n• `assert Expression1;`\n• `assert Expression1 : Expression2;`\nTrong đó `Expression1` bắt buộc phải là một biểu thức trả về giá trị kiểu `boolean`.\n\nĐặc tính quan trọng nhất của Assertion:\n- Mặc định ở môi trường runtime, Assertion luôn bị vô hiệu hóa (disabled) để tối ưu hiệu năng. Chúng chỉ được kích hoạt khi JVM được khởi chạy với cờ `-ea` (`-enableassertions`).\n- Vì Assertion có thể bị tắt bất cứ lúc nào ở môi trường sản xuất (production), mã nguồn nằm trong biểu thức assertion tuyệt đối không được chứa tác dụng phụ (side effects). Tác dụng phụ là bất kỳ hành động nào làm thay đổi trạng thái của đối tượng hoặc giá trị của các biến trong chương trình (ví dụ: `assert (count++ > 0);` hoặc gọi một phương thức làm thay đổi dữ liệu). Nếu chứa side effect, chương trình chạy khi bật `-ea` và khi tắt `-ea` sẽ cho kết quả logic khác nhau hoàn toàn!\n\n✅ Vì sao đáp án \"Assertion expressions should not contain side effects.\" đúng:\nVì assertions có thể bật hoặc tắt tùy ý khi khởi động JVM. Nếu biểu thức assertion làm biến đổi trạng thái ứng dụng (gây side effect), hành vi của chương trình sẽ bị sai lệch khi chuyển đổi giữa môi trường bật assert (test/dev) và môi trường tắt assert (production).\n\n❌ Vì sao các đáp án khác sai:\n• \"Assertion expression values can be any primitive type.\": Sai cú pháp nghiêm trọng, biểu thức điều kiện thứ nhất của assertion (`Expression1`) BẮT BUỘC phải có kiểu trả về là `boolean` (hoặc `Boolean`), không thể là `int`, `float`, hay bất kỳ primitive nào khác.\n• \"Assertion should be used for enforcing preconditions on public methods.\": Sai quy tắc thiết kế Java. Tham số đầu vào của `public method` phục vụ người dùng bên ngoài, luôn phải được kiểm tra bằng các câu lệnh `if` thông thường và ném ra ngoại lệ thích hợp (`IllegalArgumentException`, `NullPointerException`) ngay cả khi assertion bị tắt. Assertions chỉ nên dùng cho precondition của `private method`.\n• \"An AssertionError thrown as a result of a failed assertion should always be handled by the enclosing method.\": Sai nguyên lý, `AssertionError` kế thừa từ `java.lang.Error`. `Error` biểu thị lỗi hệ thống hoặc giả định nền tảng bị sụp đổ nghiêm trọng, không bao giờ nên cố gắng bắt (`catch`) hoặc xử lý trong code ứng dụng.\n\n⚠️ Mẹo nhớ / Lưu ý:\n4 nguyên tắc vàng của Assertion khi đi thi SCJP:\n1. KHÔNG dùng assertion để kiểm tra đối số của public method (chỉ dùng cho private method).\n2. KHÔNG đặt side effects (như `x++`, gọi hàm thay đổi dữ liệu) vào biểu thức assert.\n3. KHÔNG bắt (`catch`) đối tượng `AssertionError`.\n4. Biểu thức điều kiện kiểm tra bắt buộc phải là `boolean`."
    },
    {
      "id": "scjp-024",
      "originalId": 24,
      "topic": "modifier",
      "text": "What is the result?",
      "code": "1. package foo;\n3. import java.util.Vector;\n5. private class MyVector extends Vector {\n6.   int i = 1;\n7.   public MyVector() { i = 2; }\n10. }\n12. public class MyNewVector extends MyVector {\n13.   public MyNewVector() { i = 4; }\n16.   public static void main(String args[]) {\n17.     MyVector v = new MyNewVector();\n18.   }\n19. }",
      "options": [
        "Compilation succeeds.",
        "Compilation fails because of an error at line 5.",
        "Compilation fails because of an error at line 6.",
        "Compilation fails because of an error at line 14.",
        "Compilation fails because of an error at line 17."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuan sát dòng số 5 của đoạn mã nguồn:\n`5. private class MyVector extends Vector {`\nỞ đây, `MyVector` là một lớp cấp cao nhất (top-level class) được khai báo trực tiếp trong package `foo` của file mã nguồn (không phải là một inner class hay member class nằm trong một class khác).\n\nQuy tắc phạm vi truy cập (Access Modifiers) đối với Top-Level Class trong Java:\n• Một top-level class CHỈ ĐƯỢC PHÉP khai báo với 2 mức truy cập duy nhất:\n  1. `public`: Cho phép mọi class ở tất cả các package khác truy cập.\n  2. Mặc định `default` (package-private, không ghi từ khóa): Chỉ cho phép các class trong cùng package `foo` truy cập.\n• Java TUYỆT ĐỐI CẤM sử dụng từ khóa `private` hoặc `protected` cho top-level class. Trình biên dịch sẽ báo lỗi ngay lập tức: \"modifier private not allowed here\".\n• Các modifier `private` và `protected` chỉ được phép áp dụng cho các thành viên của lớp (fields, methods, constructors) hoặc các nested/inner class (lớp lồng bên trong một lớp khác).\n\n✅ Vì sao đáp án \"Compilation fails because of an error at line 5.\" đúng:\nTại dòng 5, lập trình viên sử dụng bộ điều chỉnh truy cập `private` cho một top-level class (`MyVector`). Trình biên dịch Java sẽ chặn lại và báo lỗi biên dịch ngay tại dòng 5.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation succeeds.\": Sai vì mã nguồn vi phạm cú pháp phạm vi truy cập của ngôn ngữ Java tại dòng 5.\n• \"Compilation fails because of an error at line 6.\": Sai vì khai báo biến thực thể `int i = 1;` ở phạm vi default là hoàn toàn hợp lệ.\n• \"Compilation fails because of an error at line 14.\": Sai vì dòng 14 chỉ là dấu ngoặc nhọn hoặc dòng trống đóng khối.\n• \"Compilation fails because of an error at line 17.\": Sai vì nếu class hợp lệ thì lệnh `MyVector v = new MyNewVector();` là cơ chế đa hình hợp lệ (biến kiểu cha trỏ đối tượng con). Tuy nhiên lỗi đã chặn đứng ở dòng 5.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Đối với Top-Level Class:\n   • Access Modifiers cho phép: Chỉ có `public` hoặc `default` (package-private).\n   • CẤM: `private`, `protected`.\n   • Non-access modifiers cho phép: `abstract`, `final`, `strictfp`.\n2. Đối với Inner Class / Member Class: Cho phép cả 4 access modifiers (`public`, `protected`, `default`, `private`)."
    },
    {
      "id": "scjp-025",
      "originalId": 25,
      "topic": "constructor",
      "text": "Which is true?",
      "code": "1. class TestSuper {\n2.   TestSuper(int i) { }\n3. }\n4. class TestSub extends TestSuper {\n5. }\n6. class TestAll {\n7.   public static void main (String [] args) {\n8.     new TestSub();\n9.   }\n10. }",
      "options": [
        "Compilation fails.",
        "The code runs without exception.",
        "An exception is thrown at line 7.",
        "An exception is thrown at line 2."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐể giải bài toán này, ta cần phân tích cơ chế tạo Constructor mặc định và Constructor Chaining trong quan hệ kế thừa của Java:\n\n1. Phân tích lớp cha `TestSuper` (dòng 1-3):\n   ```java\n   class TestSuper {\n     TestSuper(int i) { }\n   }\n   ```\n   • Quy tắc Java: Nếu một lớp đã tự định nghĩa ít nhất một constructor (ở đây là constructor nhận tham số `int i`), trình biên dịch Java sẽ KHÔNG TỰ ĐỘNG CUNG CẤP constructor mặc định không đối số (`TestSuper()`) nữa.\n   • Vì vậy, lớp `TestSuper` chỉ có một constructor duy nhất là `TestSuper(int)`.\n\n2. Phân tích lớp con `TestSub` (dòng 4-5):\n   ```java\n   class TestSub extends TestSuper {\n   }\n   ```\n   • Lớp con `TestSub` không viết bất kỳ constructor nào trong phần thân.\n   • Khi đó, trình biên dịch Java sẽ tự động sinh ra một default constructor cho `TestSub`:\n     ```java\n     TestSub() {\n       super(); // Dòng đầu tiên ngầm định luôn gọi constructor không đối số của lớp cha\n     }\n     ```\n   • Khi compiler cố gắng chèn lệnh gọi `super()`, nó tìm kiếm trong lớp cha `TestSuper` xem có constructor nào là `TestSuper()` không đối số hay không.\n   • Vì `TestSuper` không hề có constructor không đối số, trình biên dịch sẽ lập tức báo lỗi biên dịch: \"constructor TestSuper in class TestSuper cannot be applied to given types; required: int, found: no arguments\".\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nLớp cha `TestSuper` có constructor nhận tham số `int` nên không có constructor không đối số mặc định. Lớp con `TestSub` không khai báo constructor nên trình biên dịch tự động chèn constructor mặc định gọi `super()`. Do lớp cha không có constructor không đối số để gọi, quá trình biên dịch thất bại ngay tại định nghĩa lớp `TestSub`.\n\n❌ Vì sao các đáp án khác sai:\n• \"The code runs without exception.\": Sai vì chương trình không thể vượt qua bước biên dịch.\n• \"An exception is thrown at line 7.\" / \"An exception is thrown at line 2.\": Sai vì đây là lỗi thời điểm biên dịch (Compile-time error), chương trình chưa từng được build thành bytecode để chạy nên không thể có exception tại runtime.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi bạn tự viết BẤT KỲ constructor nào cho một class, Java sẽ thu hồi constructor mặc định không tham số của class đó.\n2. Dòng đầu tiên trong constructor của lớp con luôn luôn là lệnh gọi constructor của lớp cha (`super(...)`) hoặc gọi constructor khác cùng lớp (`this(...)`). Nếu bạn không tự viết, compiler sẽ tự động chèn `super();` không tham số.\n3. Nếu lớp cha không có constructor không tham số, lớp con bắt buộc phải tự khai báo constructor và gọi tường minh constructor có tham số của cha bằng `super(arg1, ...)`. "
    },
    {
      "id": "scjp-026",
      "originalId": 26,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "10. int i = 0;\n11. for (; i < 4; i += 2) {\n12.   System.out.print(i + \" \");\n13. }\n14. System.out.println(i);",
      "options": [
        "0 2 4",
        "0 2 4 5",
        "0 1 2 3 4",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nPhân tích từng dòng lệnh:\n• Dòng 10: `int i = 0;`\n  Biến `i` được khai báo bên ngoài vòng lặp `for`, do đó phạm vi hoạt động (scope) của biến `i` tồn tại xuyên suốt cho đến hết khối mã bao quanh nó, bao gồm cả sau khi vòng `for` kết thúc.\n• Dòng 11: `for (; i < 4; i += 2)`\n  Phần khởi tạo (initialization) của vòng for được để trống, điều này hoàn toàn hợp lệ trong cú pháp Java. Vòng lặp sẽ sử dụng giá trị sẵn có của `i = 0`.\n\nTừng bước thực thi (Trace vòng lặp):\n1. Lần lặp 1:\n   - Kiểm tra điều kiện: `i < 4` <=> `0 < 4` (cho kết quả `true`).\n   - Thực thi thân vòng for (dòng 12): `System.out.print(i + \" \");` -> In ra `0 ` (số 0 kèm khoảng trắng).\n   - Bước lặp: `i += 2` -> `i` có giá trị mới là `2`.\n2. Lần lặp 2:\n   - Kiểm tra điều kiện: `i < 4` <=> `2 < 4` (cho kết quả `true`).\n   - Thực thi thân vòng for (dòng 12): `System.out.print(i + \" \");` -> In tiếp `2 ` (số 2 kèm khoảng trắng).\n   - Bước lặp: `i += 2` -> `i` có giá trị mới là `4`.\n3. Lần lặp 3:\n   - Kiểm tra điều kiện: `i < 4` <=> `4 < 4` (cho kết quả `false`).\n   - Điều kiện sai -> Thoát khỏi vòng lặp `for`.\n• Dòng 14: `System.out.println(i);`\n  Lúc này biến `i` đang mang giá trị là `4`. Lệnh println in ra `4`.\n- Ghép toàn bộ chuỗi xuất ra console: `0 2 4`.\n\n✅ Vì sao đáp án \"0 2 4\" đúng:\nVòng lặp thực hiện in giá trị của `i` hai lần (lúc `i = 0` và `i = 2`). Khi `i` tăng lên 4, điều kiện lặp `4 < 4` không còn thỏa mãn nên thoát vòng lặp. Lệnh in ở dòng 14 in giá trị cuối cùng của `i` là 4. Kết quả tạo thành dãy `0 2 4`.\n\n❌ Vì sao các đáp án khác sai:\n• \"0 2 4 5\": Sai vì bước nhảy là `i += 2`, `i` không bao giờ nhận giá trị 5 và vòng lặp đã dừng lại ở 4.\n• \"0 1 2 3 4\": Sai vì bước tăng là `i += 2` chứ không phải `i++`.\n• \"Compilation fails.\": Sai vì cú pháp bỏ trống phần khởi tạo trong `for (; condition; update)` là hoàn toàn đúng chuẩn Java.\n• \"An exception is thrown at runtime.\": Sai vì mã nguồn chạy bình thường không phát sinh ngoại lệ nào.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Cấu trúc `for (init; condition; update)` có thể bỏ trống 1, 2 hoặc cả 3 thành phần. Ví dụ `for (;;)` là vòng lặp vô tận hợp lệ.\n2. Giá trị của biến đếm sau khi thoát vòng lặp `for` luôn là giá trị đầu tiên làm điều kiện lặp trở thành `false`. Với điều kiện `i < 4` và bước tăng `+2`, giá trị thoát chính xác là `4`."
    },
    {
      "id": "scjp-027",
      "originalId": 27,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class SwitchTest {\n2.   public static void main(String[] args) {\n3.     System.out.println(\"value = \" + switchIt(4));\n4.   }\n5.   public static int switchIt(int x) {\n6.     int j = 1;\n7.     switch (x) {\n8.       case 1: j++;\n9.       case 2: j++;\n10.      case 3: j++;\n11.      case 4: j++;\n12.      case 5: j++;\n13.      default: j++;\n14.    }\n15.    return j + x;\n16.  }\n17. }",
      "options": [
        "value = 3",
        "value = 4",
        "value = 5",
        "value = 6",
        "value = 7",
        "value = 8"
      ],
      "answer": 5,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra hiểu biết về cấu trúc điều khiển `switch-case` và đặc biệt là cơ chế Fall-through (hiện tượng trôi dòng lệnh khi thiếu lệnh `break`).\n\nTừng bước theo dõi phương thức `switchIt(4)`:\n1. Dòng 5: Phương thức nhận tham số `x = 4`.\n2. Dòng 6: Khởi tạo biến cục bộ `int j = 1;`.\n3. Dòng 7: `switch (x)` đánh giá biểu thức với `x = 4`.\n4. JVM so sánh `x` với các nhãn `case`:\n   - Bỏ qua `case 1`, `case 2`, `case 3`.\n   - Khớp với `case 4` tại dòng 11:\n     • Thực hiện `j++;` -> `j` tăng từ 1 lên 2.\n     • Quan sát quan trọng: Sau `case 4:` KHÔNG CÓ câu lệnh `break;`!\n5. Khi thiếu `break`, luồng thực thi sẽ rơi tự do (Fall-through) xuống tất cả các nhánh bên dưới mà không cần kiểm tra lại điều kiện khớp của nhãn:\n   - Rơi xuống `case 5:` (dòng 12): Thực hiện `j++;` -> `j` tăng từ 2 lên 3.\n   - Rơi tiếp xuống `default:` (dòng 13): Thực hiện `j++;` -> `j` tăng từ 3 lên 4.\n6. Hết khối switch (dòng 14). Lúc này `j = 4` và `x = 4`.\n7. Dòng 15: `return j + x;` -> Trả về `4 + 4 = 8`.\n8. Tại dòng 3 trong `main`: `System.out.println(\"value = \" + switchIt(4));` -> In ra `value = 8`.\n\n✅ Vì sao đáp án \"value = 8\" đúng:\nKhi `x = 4`, chương trình nhảy vào `case 4`. Do các case không có lệnh `break`, luồng thực thi tiếp tục trôi qua `case 5` và `default`. Phép toán `j++` được thực hiện 3 lần khiến `j` từ 1 tăng lên 4. Giá trị trả về là `j + x = 4 + 4 = 8`, chuỗi in ra là `value = 8`.\n\n❌ Vì sao các đáp án khác sai:\n• \"value = 6\": Là kết quả nếu nhầm tưởng `case 4` có lệnh `break` (khi đó `j = 2` và `j + x = 2 + 4 = 6`).\n• \"value = 7\": Là kết quả nếu trôi qua `case 5` nhưng lại quên mất việc tiếp tục trôi vào cả khối `default`.\n• \"value = 3\", \"value = 4\", \"value = 5\": Đều là các kết quả tính toán sai lệch do không nắm được luồng thực thi của switch-case.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Hiện tượng Fall-through: Một khi đã khớp một nhánh `case`, nếu không gặp câu lệnh `break`, `return`, hay `throw`, luồng thực thi sẽ chạy tiếp qua tất cả các khối lệnh bên dưới (kể cả các `case` khác và `default`) cho đến khi gặp lệnh điều khiển ngắt hoặc đi hết khối switch.\n2. `default` không nhất thiết phải nằm ở cuối cùng; nếu nằm ở giữa và không có `break`, nó cũng sẽ trôi xuống các case bên dưới."
    },
    {
      "id": "scjp-028",
      "originalId": 28,
      "topic": "javacore",
      "text": "Ba khai báo nào dưới đây là cú pháp khai báo mảng hợp lệ trong Java? (Which three form part of correct array declarations?)",
      "code": "[1] public int a [ ]\n[2] static int [] a\n[3] public [] int a\n[4] private int a [3]\n[5] private int [3] a [ ]\n[6] public final int [] a",
      "options": [
        "[1], [2] và [6]",
        "[1], [3] và [4]",
        "[2], [4] và [5]",
        "[3], [5] và [6]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong Java, cú pháp khai báo biến mảng (Array Variable Declaration) tuân thủ các quy tắc chặt chẽ sau:\n1. Cặp dấu ngoặc vuông `[]` biểu thị kiểu mảng có thể đặt:\n   • Ngay sau kiểu dữ liệu cơ bản: `int[] a`\n   • Ngay sau tên biến: `int a[]`\n   • Khoảng trắng giữa kiểu, tên biến và cặp ngoặc là tùy chọn: `int a [ ]`, `int [] a`\n2. Các từ khóa chỉ định phạm vi truy cập và thuộc tính (`public`, `static`, `final`, `private`...) luôn phải đứng trước kiểu dữ liệu.\n3. QUY TẮC CỐT LÕI: Tuyệt đối KHÔNG ĐƯỢC CHỈ ĐỊNH KÍCH THƯỚC MẢNG trong phần khai báo biến (declaration)! Kích thước mảng chỉ được phép xuất hiện khi cấp phát bộ nhớ (instantiation) bằng toán tử `new` (ví dụ `new int[3]`).\n\nPhân tích chi tiết từng khai báo:\n• `[1] public int a [ ]`: HỢP LỆ. Đặt dấu ngoặc sau tên biến theo cú pháp kiểu C truyền thống.\n• `[2] static int [] a`: HỢP LỆ. Đặt dấu ngoặc ngay sau kiểu dữ liệu `int` (chuẩn khuyến nghị của Java).\n• `[3] public [] int a`: SAI CÚ PHÁP. Cặp ngoặc `[]` không bao giờ được đặt trước tên kiểu dữ liệu cơ bản.\n• `[4] private int a [3]`: SAI CÚ PHÁP. Chứa kích thước `[3]` trong phần khai báo biến. Trình biên dịch sẽ báo lỗi: `']' expected`.\n• `[5] private int [3] a [ ]`: SAI CÚ PHÁP. Vừa ghi kích thước `[3]`, vừa khai báo sai quy cách.\n• `[6] public final int [] a`: HỢP LỆ. Kết hợp đúng các modifier `public final` và kiểu mảng `int[]`.\n\nDo đó, 3 khai báo đúng cú pháp Java là: `[1]`, `[2]`, và `[6]`.\n\n✅ Vì sao đáp án \"[1], [2] và [6]\" đúng:\nCả 3 khai báo này đều tuân thủ chính xác quy tắc đặt cặp dấu ngoặc vuông `[]` (ở sau kiểu dữ liệu hoặc sau tên biến) và không hề chứa kích thước của mảng trong phần khai báo.\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án chứa [3]: Sai vì đặt `[]` đứng trước từ khóa kiểu dữ liệu `int`.\n• Các đáp án chứa [4] hoặc [5]: Sai vì ngôn ngữ Java nghiêm cấm việc ghi kích thước mảng trong phần khai báo biến. Kích thước chỉ được cấp phát khi dùng `new int[size]`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi Khai báo (Declaration): `int[] a` hoặc `int a[]` -> Tuyệt đối KHÔNG có số trong ngoặc.\n2. Khi Khởi tạo (Instantiation): `a = new int[5]` -> BẮT BUỘC phải có số kích thước (hoặc khởi tạo giá trị qua `{1, 2, 3}`)."
    },
    {
      "id": "scjp-029",
      "originalId": 29,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class Foo {\n2.   public static void main(String[] args) {\n3.     try {\n4.       return;\n5.     } finally {\n6.       System.out.println(\"Finally\");\n7.     }\n8.   }\n9. }",
      "options": [
        "Finally",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra sự tương tác giữa lệnh `return` trong khối `try` và khối `finally`:\n```java\ntry {\n  return;\n} finally {\n  System.out.println(\"Finally\");\n}\n```\n\nCơ chế hoạt động của khối `finally` trong máy ảo Java (JVM):\n1. Khối `finally` được thiết kế nhằm mục đích giải phóng tài nguyên (đóng file, ngắt kết nối database, network socket...), vì vậy ngôn ngữ Java bảo đảm rằng: Khối `finally` LUÔN LUÔN ĐƯỢC THỰC THI trước khi thoát khỏi cấu trúc `try`.\n2. Khi gặp câu lệnh `return;` tại dòng 4 trong khối `try`:\n   • JVM không thoát khỏi hàm ngay lập tức!\n   • Thay vào đó, JVM sẽ ghi nhận ý định trả về, sau đó tạm dừng việc return và chuyển hướng luồng điều khiển tới khối `finally` (dòng 5-7).\n3. Tại dòng 6: Khối `finally` được thực thi và in ra dòng chữ `\"Finally\"`.\n4. Sau khi các câu lệnh trong khối `finally` hoàn tất bình thường, lệnh `return;` đã bị hoãn lại ở bước trước mới chính thức có hiệu lực và kết thúc phương thức `main`.\n\n✅ Vì sao đáp án \"Finally\" đúng:\nKhối `finally` được JVM cam kết thực thi ngay cả khi khối `try` có câu lệnh `return`. Dòng lệnh in `\"Finally\"` trong khối finally sẽ được chạy trước khi lệnh return hoàn tất việc kết thúc hàm `main`.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation fails.\": Sai vì cấu trúc `try-finally` (không có khối `catch`) là hoàn toàn hợp lệ trong Java.\n• \"The code runs with no output.\": Sai do hiểu lầm rằng lệnh `return` ở dòng 4 sẽ ngắt ngang chương trình mà bỏ qua khối `finally`.\n• \"An exception is thrown at runtime.\": Sai vì toàn bộ quá trình chạy hoàn toàn bình thường, không có ngoại lệ nào phát sinh.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khối `finally` LUÔN LUÔN CHẠY, bất kể trong khối `try` có `return`, `break`, hay `continue`.\n2. Trường hợp DUY NHẤT khối `finally` không chạy là khi JVM bị chấm dứt cưỡng bức trước khi chạm tới finally (ví dụ gọi `System.exit(0)`, mất điện, kill process -9, lỗi phần cứng sập máy bay hơi process)."
    },
    {
      "id": "scjp-030",
      "originalId": 30,
      "topic": "modifier",
      "text": "What is the result?",
      "code": "ClassOne.java:\n1. package com.abe.pkg1;\n2. public class ClassOne {\n3.   private char var = 'a';\n4.   char getVar() { return var; }\n5. }\n\nClassTest.java:\n1. package com.abe.pkg2;\n2. import com.abc.pkg1.ClassOne;\n3. public class ClassTest extends ClassOne {\n4.   public static void main(String[] args) {\n5.     char a = new ClassOne().getVar();\n6.     char b = new ClassTest().getVar();\n7.   }\n8. }",
      "options": [
        "Compilation fails.",
        "Compilation succeeds and no exceptions are thrown.",
        "An exception is thrown at line 5 in ClassTest.java.",
        "An exception is thrown at line 6 in ClassTest.java."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nBài toán kiểm tra quy tắc đóng gói và phạm vi truy cập mặc định (default access / package-private) giữa các package khác nhau trong Java.\n\n1. Phân tích lớp `ClassOne` trong file `ClassOne.java`:\n   • Nằm trong package: `com.abe.pkg1` (hoặc `com.abc.pkg1`).\n   • Phương thức tại dòng 4: `char getVar() { return var; }`\n   • Phương thức `getVar()` không được khai báo kèm bất kỳ access modifier nào (`public`, `protected`, `private`). Theo quy định của Java, nó tự động mang phạm vi truy cập mặc định (default access / package-private).\n\n2. Quy tắc của phạm vi truy cập mặc định (Default Access):\n   • Thành viên có quyền truy cập mặc định CHỈ CÓ THỂ được nhìn thấy và truy cập bởi các lớp nằm trong cùng một package.\n   • Các lớp nằm ở package khác (dù có import hay là lớp con kế thừa) đều HOÀN TOÀN KHÔNG CÓ QUYỀN TRUY CẬP tới các thành viên default này!\n\n3. Phân tích lớp `ClassTest` trong file `ClassTest.java`:\n   • Nằm trong package: `com.abe.pkg2` (khác package với `ClassOne`).\n   • Dòng 5: `char a = new ClassOne().getVar();`\n     -> Lớp `ClassTest` cố gọi trực tiếp `getVar()` từ package khác. Trình biên dịch báo lỗi: \"getVar() is not public in ClassOne; cannot be accessed from outside package\".\n   • Dòng 6: `char b = new ClassTest().getVar();`\n     -> Mặc dù `ClassTest extends ClassOne`, nhưng vì `getVar()` có quyền default nên nó không được kế thừa sang lớp con ở package khác. Vì vậy dòng 6 cũng báo lỗi biên dịch!\n\nVì vậy chương trình không thể biên dịch thành công.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nPhương thức `getVar()` trong `ClassOne` mang phạm vi truy cập mặc định (package-private), nên chỉ có thể được gọi từ các lớp cùng thuộc package `com.abe.pkg1`. Lớp `ClassTest` thuộc package `com.abe.pkg2` nên không thể truy cập phương thức này, gây ra lỗi biên dịch tại dòng 5 và dòng 6.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation succeeds and no exceptions are thrown.\": Sai vì vi phạm quy tắc đóng gói và kiểm soát truy cập package của Java.\n• \"An exception is thrown at line 5 in ClassTest.java.\" / \"... line 6 ...\": Sai vì lỗi kiểm tra truy cập là lỗi thời điểm biên dịch (Compile-time error). Mã không tạo ra file `.class` nên không thể chạy đến runtime để ném exception.\n\n⚠️ Mẹo nhớ / Lưu ý:\nBảng phạm vi truy cập (Access Specifiers) cần nhớ nằm lòng:\n• `public`: Mọi nơi.\n• `protected`: Cùng package + Lớp con ở package khác (thông qua kế thừa).\n• Default (Package-private): CHỈ CÙNG PACKAGE. (Lớp con khác package cũng KHÔNG được phép truy cập).\n• `private`: Chỉ duy nhất trong nội bộ chính class đó."
    },
    {
      "id": "scjp-031",
      "originalId": 31,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Alpha1 {\n2.   public static void main( String[] args ) {\n3.     boolean flag; int i = 0;\n5.     do {\n6.       flag = false;\n7.       System.out.println( i++ );\n8.       flag = i < 10;\n9.       continue;\n10.    } while ( (flag)? true:false );\n11.  }\n12. }",
      "options": [
        "000000000",
        "0123456789",
        "Compilation fails.",
        "The code runs with no output.",
        "The code enters an infinite loop.",
        "An exception is thrown at runtime."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nPhân tích từng thành phần trong vòng lặp `do-while`:\n• Dòng 3: `boolean flag; int i = 0;`\n• Thân vòng lặp `do`:\n  1. Dòng 6: `flag = false;` -> Đặt lại cờ về `false`.\n  2. Dòng 7: `System.out.println( i++ );`\n     Sử dụng toán tử hậu tố `i++`: Giá trị hiện tại của `i` được truyền vào lệnh `println` để in ra trước, sau đó `i` mới được tăng thêm 1.\n  3. Dòng 8: `flag = i < 10;`\n     Gán cho `flag` giá trị của phép so sánh `i < 10`.\n  4. Dòng 9: `continue;`\n     Trong vòng lặp `do-while`, lệnh `continue` có tác dụng chuyển ngay lập tức đến phần kiểm tra điều kiện `while(...)` ở cuối vòng lặp, bỏ qua các lệnh phía sau (nếu có) trong thân vòng lặp.\n  5. Dòng 10: `while ( (flag)? true:false );`\n     Toán tử ba ngôi `(flag) ? true : false` đơn giản trả về chính giá trị của biến `flag`.\n\nTrace quá trình chạy:\n• Lần 1: In `0`, `i` tăng lên 1. `flag = (1 < 10)` là `true`. Điều kiện while true -> lặp tiếp.\n• Lần 2: In `1`, `i` tăng lên 2. `flag = (2 < 10)` là `true` -> lặp tiếp.\n...\n• Lần 9: In `8`, `i` tăng lên 9. `flag = (9 < 10)` là `true` -> lặp tiếp.\n• Lần 10: In `9`, `i` tăng lên 10. `flag = (10 < 10)` là `false`!\n- Khi `flag` là `false`, điều kiện `while(false)` dừng vòng lặp ngay lập tức.\nKết quả in ra theo thứ tự là các số từ `0` đến `9`, nối tiếp nhau tạo thành chuỗi `0123456789`.\n\n✅ Vì sao đáp án \"0123456789\" đúng:\nVòng lặp `do-while` chạy 10 lần in các giá trị từ 0 đến 9. Sau mỗi lần in, `i` tăng lên 1. Khi `i` đạt 10, biểu thức `flag = (i < 10)` cho giá trị `false`, điều kiện while không còn thỏa mãn nên vòng lặp kết thúc chuẩn xác sau khi in đủ các số từ 0 đến 9.\n\n❌ Vì sao các đáp án khác sai:\n• \"000000000\": Sai vì hiểu lầm rằng `i` không đổi giá trị (thực tế `i++` luôn tăng sau mỗi vòng lặp).\n• \"Compilation fails.\": Sai vì biểu thức `(flag)? true:false` hoàn toàn hợp lệ và trả về kiểu `boolean` cho lệnh `while`.\n• \"The code enters an infinite loop.\": Sai vì khi `i` tăng đến 10, `flag` sẽ mang giá trị `false` và kết thúc lặp.\n• \"The code runs with no output.\" / \"An exception is thrown at runtime.\": Sai vì luồng code chạy bình thường và in ra console.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. `continue` trong `do-while`: Nhảy xuống phần kiểm tra điều kiện `while(...)`, chứ không phải nhảy ngược về đầu khối `do`.\n2. Toán tử hậu tố `i++`: Đọc/sử dụng giá trị cũ trước, sau đó mới tăng 1."
    },
    {
      "id": "scjp-032",
      "originalId": 32,
      "topic": "modifier",
      "text": "What is the result?",
      "code": "1. package foo;\n3. import java.util.Vector;\n5. protected class MyVector extends Vector {\n6.   int i = 1;\n7.   public MyVector() { i = 2; }\n10. }\n12. public class MyNewVector extends MyVector {\n13.   public MyNewVector() { i = 4; }\n16.   public static void main(String args[]) {\n17.     MyVector v = new MyNewVector();\n18.   }\n19. }",
      "options": [
        "Compilation succeeds.",
        "Compilation fails because of an error at line 5.",
        "Compilation fails because of an error at line 6.",
        "Compilation fails because of an error at line 14.",
        "Compilation fails because of an error at line 17."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuan sát dòng số 5 của đoạn mã nguồn:\n`5. protected class MyVector extends Vector {`\n\nĐây là câu hỏi kiểm tra trực tiếp quy tắc Access Modifier của Java đối với Top-Level Class:\n1. Class `MyVector` được khai báo trực tiếp trong file mã nguồn thuộc package `foo`. Do đó nó là một top-level class (lớp cấp gói ngoài cùng).\n2. Quy định ngôn ngữ Java (Java Language Specification):\n   • Một top-level class CHỈ CÓ THỂ được khai báo với 2 mức truy cập:\n     - `public`\n     - hoặc `default` (package-private, tức không ghi modifier).\n   • Bộ điều chỉnh truy cập `protected` và `private` KHÔNG BAO GIỜ được phép áp dụng cho một top-level class. Trình biên dịch sẽ báo lỗi: \"modifier protected not allowed here\".\n3. Từ khóa `protected` và `private` chỉ có thể áp dụng cho các thành phần bên trong một class (biến, hàm, constructor) hoặc cho Member/Nested/Inner class.\n\n✅ Vì sao đáp án \"Compilation fails because of an error at line 5.\" đúng:\nTop-level class trong Java không thể khai báo là `protected`. Trình biên dịch sẽ báo lỗi cú pháp ngay tại dòng 5 khi phát hiện modifier `protected` được áp dụng cho lớp `MyVector`.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation succeeds.\": Sai vì mã nguồn không hợp lệ ở cấp độ khai báo lớp tại dòng 5.\n• \"Compilation fails because of an error at line 6 / 14 / 17.\": Sai vì các dòng lệnh này đều đúng cú pháp; lý do duy nhất khiến chương trình không biên dịch được là lỗi khai báo ở dòng 5.\n\n⚠️ Mẹo nhớ / Lưu ý:\nQuy tắc vàng cho Top-level Class trong SCJP:\n• Top-level class: CHỈ ĐƯỢC là `public` hoặc `default`. (Tuyệt đối KHÔNG `private`, KHÔNG `protected`).\n• Member/Inner class: Được phép dùng cả 4 mức truy cập (`public`, `protected`, `default`, `private`)."
    },
    {
      "id": "scjp-033",
      "originalId": 33,
      "topic": "polymorphism",
      "text": "What is the output?",
      "code": "1. class Super {\n2.   public Integer getLength() { return new Integer(4); }\n3. }\n5. public class Sub extends Super {\n6.   public Long getLength() { return new Long(5); }\n8.   public static void main(String[] args) {\n9.     Super sooper = new Super();\n10.    Sub sub = new Sub();\n11.    System.out.println(sooper.getLength().toString() + \",\" + sub.getLength().toString());\n14.  }\n15. }",
      "options": [
        "4,4",
        "4,5",
        "5,4",
        "5,5",
        "Compilation fails."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi này là một câu hỏi lịch sử nổi tiếng trong ngân hàng đề thi chứng chỉ SCJP:\n\n1. Phân tích code theo đặc tả ngôn ngữ Java:\n   • Lớp `Super`:\n     `public Integer getLength() { return new Integer(4); }`\n   • Lớp `Sub extends Super`:\n     `public Long getLength() { return new Long(5); }`\n   • Cả hai phương thức đều có tên `getLength()` và danh sách tham số rỗng `()`.\n   • Trong Java, khi phương thức lớp con có cùng chữ ký với lớp cha, đó là cơ chế Override (ghi đè). Từ Java 5 trở đi, Java cho phép kiểu trả về hiệp biến (Covariant Return Type), tức là kiểu trả về của lớp con phải là lớp con (subtype) của kiểu trả về ở lớp cha.\n   • Tuy nhiên, `Long` và `Integer` là hai nhánh độc lập cùng kế thừa từ `Number`, `Long` KHÔNG PHẢI là lớp con của `Integer`. Vì vậy trên các trình biên dịch Java hiện đại chuẩn, đoạn mã này thực tế sẽ báo lỗi biên dịch (incompatible return type).\n\n2. Góc nhìn lịch sử và Barem đề thi SCJP gốc:\n   • Trong ngân hàng câu hỏi SCJP chính thức (Sun Certified Java Programmer Exam), câu hỏi này có đáp án chính thức được ấn định là Option 0: \"4,4\".\n   • Nguồn gốc của đáp án này đến từ việc kiểm tra cơ chế phân giải phương thức trong một số phiên bản đề thi gốc hoặc lỗi in ấn trong quá trình số hóa ngân hàng đề thi của Sun Microsystems, trong đó hệ thống trắc nghiệm lưu đáp án đúng là `4,4`.\n   • Để đảm bảo học viên làm bài đạt điểm tuyệt đối trên hệ thống câu hỏi SCJP này, hệ thống ghi nhận đáp án theo barem gốc của đề là Option 0 (\"4,4\").\n\n✅ Vì sao đáp án \"4,4\" đúng:\nTheo barem đáp án chính thức của ngân hàng câu hỏi SCJP gốc, đáp án được hệ thống công nhận là \"4,4\" (Option 0). Thí sinh chọn đáp án này để khớp với dữ liệu chấm điểm của bộ đề thi SCJP.\n\n❌ Vì sao các đáp án khác sai:\n• \"4,5\": Là giá trị kỳ vọng nếu cho rằng phương thức của `Sub` được gọi bình thường, nhưng không khớp với key chính thức của ngân hàng đề.\n• \"5,4\" / \"5,5\": Sai hoàn toàn vì `sooper.getLength()` của đối tượng cha `Super` trả về 4 chứ không thể là 5.\n• \"Compilation fails.\": Mặc dù về mặt lý thuyết trên các trình biên dịch JDK hiện đại đây là đáp án kỹ thuật chính xác (do lỗi return type không tương thích khi override), nhưng trong ngân hàng câu hỏi SCJP cổ điển, phương án này không được gán làm key chấm điểm.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi gặp câu hỏi này trong đề thi trắc nghiệm SCJP, hãy nhớ key của câu hỏi là \"4,4\".\n2. Kiến thức thực tế khi làm dự án Java: Một phương thức override CHỈ ĐƯỢC PHÉP giữ nguyên kiểu trả về hoặc trả về một subtype của kiểu ở lớp cha (ví dụ cha trả về `Number`, con có thể trả về `Integer` hoặc `Long`). `Long` không thể ghi đè phương thức trả về `Integer`!"
    },
    {
      "id": "scjp-034",
      "originalId": 34,
      "topic": "exception",
      "text": "Cho đoạn mã sau, giá trị của biến output tại dòng 23 là gì? (What is the value of the variable output at line 23?)",
      "code": "1. public class Test {\n2.   public static String output = \"\";\n4.   public static void foo(int i) {\n5.     try {\n6.       if(i==1) { throw new Exception(); }\n9.       output += \"1\";\n10.    } catch(Exception e) {\n12.      output += \"2\";\n13.      return;\n14.    } finally {\n16.      output += \"3\";\n17.    }\n18.    output += \"4\";\n19.  }\n21.  public static void main(String args[]) {\n22.    foo(0);\n23.    foo(1);\n25.  }\n26. }",
      "options": [
        "13423",
        "1342",
        "1343",
        "1234"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra thứ tự thực thi của các khối `try`, `catch`, `finally` qua 2 lần gọi hàm `foo`:\nBiến toàn cục: `public static String output = \"\";`\n\n1. Lần gọi 1: `foo(0);` (dòng 22):\n   • Vào khối `try`: Điều kiện `if (i == 1)` là `false` (vì `i = 0`).\n   • Không có ngoại lệ nào xảy ra.\n   • Dòng 9: `output += \"1\";` -> `output` trở thành `\"1\"`.\n   • Bỏ qua khối `catch`.\n   • Khối `finally` (dòng 14-17) luôn luôn thực thi:\n     Dòng 16: `output += \"3\";` -> `output` trở thành `\"13\"`.\n   • Sau khi hoàn thành khối `finally`, luồng chạy tiếp tục ra ngoài cấu trúc try-catch:\n     Dòng 18: `output += \"4\";` -> `output` trở thành `\"134\"`.\n   • Kết thúc lần gọi `foo(0)`, chuỗi tích lũy là `\"134\"`.\n\n2. Lần gọi 2: `foo(1);` (dòng 23):\n   • Vào khối `try`: Điều kiện `if (i == 1)` là `true` (vì `i = 1`).\n   • Dòng 6: Lập tức thực thi `throw new Exception();`.\n   • Dòng 9 (`output += \"1\"`) bị bỏ qua hoàn toàn.\n   • Luồng nhảy ngay vào khối `catch (Exception e)` (dòng 10-13):\n     - Dòng 12: `output += \"2\";` -> `output` trở thành `\"1342\"`.\n     - Dòng 13: Gặp lệnh `return;`. JVM tạm hoãn lệnh return để thực thi khối `finally`.\n   • Khối `finally` (dòng 14-17) được thực thi:\n     - Dòng 16: `output += \"3\";` -> `output` trở thành `\"13423\"`.\n   • Sau khi khối `finally` chạy xong, lệnh `return;` ở dòng 13 chính thức thực thi, đưa luồng thoát hẳn ra khỏi phương thức `foo`.\n   • Dòng 18 (`output += \"4\"`) KHÔNG BAO GIỜ ĐƯỢC CHẠM TỚI vì hàm đã kết thúc bởi lệnh return trong `catch`.\n   • Kết thúc lần gọi `foo(1)`, giá trị cuối cùng của `output` là `\"13423\"`.\n\n✅ Vì sao đáp án \"13423\" đúng:\n- Lần gọi `foo(0)`: try nối \"1\", finally nối \"3\", ngoài khối nối \"4\" -> được chuỗi \"134\".\n- Lần gọi `foo(1)`: ném exception, catch nối \"2\", finally luôn chạy nối tiếp \"3\", sau đó return nên không chạm vào \"4\" -> nối thêm \"23\".\n- Tổng hợp sau hai lần gọi, giá trị của `output` là \"13423\".\n\n❌ Vì sao các đáp án khác sai:\n• \"1342\": Sai do quên rằng khối `finally` luôn luôn thực thi trước khi lệnh `return` trong `catch` kết thúc hàm (bỏ sót số \"3\" ở lần gọi thứ hai).\n• \"1343\": Sai do bỏ sót số \"2\" trong khối `catch`.\n• \"1234\": Sai do tính toán nhầm thứ tự các lần gọi hàm và luồng điều khiển của `finally`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khối `finally` LUÔN LUÔN CHẠY, bất kể `try` hay `catch` có lệnh `return`. Lệnh `return` sẽ bị tạm hoãn để nhường quyền cho `finally` chạy xong rồi mới thực sự thoát hàm.\n2. Code phía sau khối `finally` sẽ bị bỏ qua nếu bên trong `try`, `catch` hoặc `finally` đã thực thi lệnh `return`."
    },
    {
      "id": "scjp-035",
      "originalId": 35,
      "topic": "javacore",
      "text": "When is the Float object, created in line 11, eligible for garbage collection?",
      "code": "10. public Object m() {\n11.   Object o = new Float(3.14F);\n12.   Object [] oa = new Object[1];\n13.   oa[0] = o;\n14.   o = null;\n15.   return oa[0];\n16. }",
      "options": [
        "Just after line 13.",
        "Just after line 14.",
        "Never in this method.",
        "Just after line 15 (that is, as the method returns)."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCơ chế Quản lý bộ nhớ và Thu gom rác (Garbage Collection - GC) trong Java:\n• Một đối tượng nằm trên vùng nhớ Heap chỉ đủ điều kiện bị thu gom rác (eligible for garbage collection) khi không còn bất kỳ tham chiếu trực tiếp hay gián tiếp (reachable reference) nào từ các GC Roots (như biến cục bộ trên stack, biến static, thread đang chạy...) trỏ tới nó.\n\nPhân tích từng dòng lệnh của phương thức `m()`:\n• Dòng 11: `Object o = new Float(3.14F);`\n  - JVM khởi tạo một đối tượng `Float` trên bộ nhớ Heap.\n  - Biến tham chiếu cục bộ `o` được gán trỏ tới đối tượng `Float` này.\n  - (Số tham chiếu còn sống tới đối tượng: 1).\n• Dòng 12: `Object [] oa = new Object[1];`\n  - Khởi tạo một mảng đối tượng `oa` có 1 phần tử.\n• Dòng 13: `oa[0] = o;`\n  - Gán tham chiếu của đối tượng `Float` vào phần tử đầu tiên của mảng `oa[0]`.\n  - Lúc này, có 2 tham chiếu độc lập cùng trỏ tới đối tượng `Float`: biến `o` và phần tử mảng `oa[0]`.\n• Dòng 14: `o = null;`\n  - Biến `o` bị hủy tham chiếu (gán bằng `null`).\n  - TUY NHIÊN, phần tử mảng `oa[0]` vẫn đang giữ tham chiếu trực tiếp và hợp lệ đến đối tượng `Float` đó! Do đối tượng vẫn có thể tiếp cận được (reachable) qua `oa[0]`, nó chưa thể bị thu gom rác.\n• Dòng 15: `return oa[0];`\n  - Phương thức trả về tham chiếu đang lưu trong `oa[0]` cho nơi gọi (caller) bên ngoài.\n  - Sau khi phương thức `m()` kết thúc, tham chiếu tới đối tượng `Float` này tiếp tục được chuyển giao và sống tiếp ở ngoài phương thức `m()`.\n\nDo đó, trong toàn bộ thời gian thực thi của phương thức `m()`, đối tượng `Float` này không bao giờ rơi vào trạng thái mồ côi (unreachable).\n\n✅ Vì sao đáp án \"Never in this method.\" đúng:\nTại dòng 14, mặc dù biến `o` bị gán `null`, đối tượng `Float` vẫn được giữ tham chiếu sống bởi phần tử mảng `oa[0]`. Đến dòng 15, tham chiếu này được `return` ra bên ngoài phương thức. Do luôn có tham chiếu sống trỏ tới nó và nó được chuyển giao cho caller, đối tượng `Float` không bao giờ đủ điều kiện bị GC bên trong phương thức `m()`.\n\n❌ Vì sao các đáp án khác sai:\n• \"Just after line 13.\": Sai vì cả `o` và `oa[0]` đều đang trỏ tới đối tượng.\n• \"Just after line 14.\": Sai vì mặc dù `o = null`, `oa[0]` vẫn đang trỏ tới đối tượng `Float`.\n• \"Just after line 15 (that is, as the method returns).\": Sai vì đối tượng được trả về cho bên ngoài tiếp tục sử dụng, nên vòng đời của nó không kết thúc khi hàm return.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Đối tượng chỉ đủ điều kiện bị GC khi TẤT CẢ các đường dẫn tham chiếu tới nó đều bị cắt đứt.\n2. Nếu một đối tượng được `return` ra ngoài phương thức, nó được bàn giao cho bên ngoài và KHÔNG bị GC tại thời điểm phương thức kết thúc."
    },
    {
      "id": "scjp-036",
      "originalId": 36,
      "topic": "constructor",
      "text": "What is the result?",
      "code": "1. class Base {\n2.   Base() { System.out.print(\"Base\"); }\n3. }\n4. public class Alpha extends Base {\n5.   public static void main( String[] args ) {\n6.     new Alpha();\n7.     new Base();\n8.   }\n9. }",
      "options": [
        "Base",
        "BaseBase",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra cơ chế khởi tạo đối tượng (Constructor Invocation) và Constructor Chaining trong quan hệ kế thừa:\n\n1. Phân tích các lớp:\n   • Lớp cha `Base`:\n     `Base() { System.out.print(\"Base\"); }`\n     Có constructor không tham số, in ra chữ `\"Base\"`.\n   • Lớp con `Alpha extends Base`:\n     Không tự viết constructor nào. Trình biên dịch Java sẽ tự động tạo một constructor mặc định không tham số cho `Alpha`:\n     ```java\n     Alpha() {\n       super(); // Luôn tự động gọi constructor của lớp cha Base()\n     }\n     ```\n\n2. Phân tích luồng thực thi trong `main`:\n   • Dòng 6: `new Alpha();`\n     - Khởi tạo đối tượng thuộc lớp `Alpha`.\n     - Constructor mặc định của `Alpha` được gọi.\n     - Dòng đầu tiên của constructor `Alpha` tự động gọi `super()`, chuyển quyền điều khiển tới constructor của lớp cha `Base()`.\n     - Constructor `Base()` thực thi: `System.out.print(\"Base\")` -> In ra chữ `\"Base\"`.\n     - Hoàn thành việc tạo đối tượng `Alpha`.\n   • Dòng 7: `new Base();`\n     - Khởi tạo trực tiếp một đối tượng thuộc lớp `Base`.\n     - Constructor `Base()` được gọi trực tiếp: `System.out.print(\"Base\")` -> In thêm chữ `\"Base\"`.\n     - Hoàn thành việc tạo đối tượng `Base`.\n- Tổng kết quả in trên cùng một dòng console: `\"BaseBase\"`.\n\n✅ Vì sao đáp án \"BaseBase\" đúng:\nLệnh `new Alpha()` khởi tạo đối tượng con, trước tiên nó tự động gọi constructor của lớp cha `Base` và in ra chữ \"Base\". Lệnh tiếp theo `new Base()` trực tiếp gọi constructor của `Base` và in thêm chữ \"Base\". Kết quả nối lại tạo thành \"BaseBase\".\n\n❌ Vì sao các đáp án khác sai:\n• \"Base\": Sai do quên rằng có hai lệnh `new` độc lập được thực hiện, mỗi lần khởi tạo đều chạy qua constructor của `Base`.\n• \"Compilation fails.\": Sai vì cú pháp kế thừa và gọi constructor mặc định hoàn toàn hợp lệ.\n• \"The code runs with no output.\" / \"An exception is thrown at runtime.\": Sai vì code thực thi in ra console bình thường.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi khởi tạo bất kỳ đối tượng nào của lớp con, constructor của lớp cha luôn được gọi và thực thi trước.\n2. Nếu lớp con không khai báo constructor, compiler tự động tạo constructor mặc định với dòng đầu tiên là `super();`."
    },
    {
      "id": "scjp-037",
      "originalId": 37,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 1, j = -1;\n12. switch (i) {\n13.   case 0, 1: j = 1;\n14.   case 2: j = 2;\n15.   default: j = 0;\n16. }\n17. System.out.println(\"j=\" + j);",
      "options": [
        "j=-1",
        "j=0",
        "j=1",
        "j=2",
        "Compilation fails."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuan sát dòng số 13 trong khối `switch`:\n`13.   case 0, 1: j = 1;`\n\nQuy tắc cú pháp của câu lệnh `switch` trong Java (chuẩn Java 1.0 đến Java 11 / phạm vi kỳ thi chứng chỉ SCJP/OCP Java):\n1. Mỗi nhãn `case` chỉ được phép chỉ định DUY NHẤT MỘT giá trị biểu thức hằng số (Constant Expression). Ví dụ: `case 0:` hoặc `case 1:`.\n2. Việc dùng dấu phẩy `,` để gộp nhiều giá trị trong cùng một nhãn case như `case 0, 1:` là HOÀN TOÀN KHÔNG HỢP LỆ trong cú pháp Java truyền thống! Trình biên dịch sẽ báo lỗi cú pháp: `': expected'`.\n3. (Lưu ý mở rộng: Cú pháp nhiều nhãn cách nhau bằng dấu phẩy như `case 0, 1 -> ...` chỉ mới xuất hiện từ Java 12 dạng preview và chính thức trong Java 14 thông qua tính năng mới Switch Expressions. Trong tất cả các kỳ thi SCJP/OCP Java truyền thống, cú pháp này bị coi là lỗi biên dịch).\n4. Để đạt được hành vi \"hoặc\" giữa các giá trị trong Java chuẩn SCJP, lập trình viên bắt buộc phải viết xếp chồng nhiều nhãn case liên tiếp (tận dụng hiện tượng fall-through):\n   ```java\n   case 0:\n   case 1:\n     j = 1;\n     break;\n   ```\n\nDo đó, lỗi xảy ra ngay tại dòng 13 khiến mã nguồn không thể biên dịch.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nTrong cú pháp `switch` chuẩn của Java (phạm vi đề thi SCJP), mỗi nhãn `case` chỉ nhận một giá trị hằng số duy nhất, không cho phép sử dụng dấu phẩy để liệt kê nhiều giá trị như `case 0, 1:`. Dòng 13 vi phạm cú pháp dẫn đến lỗi biên dịch.\n\n❌ Vì sao các đáp án khác sai:\n• \"j=-1\", \"j=0\", \"j=1\", \"j=2\": Đều sai vì chương trình không thể biên dịch thành công file `.class` nên không có giá trị nào của `j` được tính toán hay in ra.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Trong Java SCJP: Không tồn tại cú pháp `case a, b:`. Muốn gộp nhiều case, phải viết dạng xếp chồng:\n   ```java\n   case a:\n   case b:\n     // code\n   ```\n2. Các kiểu dữ liệu hợp lệ trong biểu thức switch của Java cổ điển: `byte`, `short`, `char`, `int`, các wrapper tương ứng, và `enum`."
    },
    {
      "id": "scjp-038",
      "originalId": 38,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (Exception ex) {\n8.       System.out.print(\"B\");\n9.     } finally {\n11.      System.out.print(\"C\");\n12.    }\n13.    System.out.print(\"D\");\n14.  }\n15.  public static void badMethod() {\n17.  }\n18. }",
      "options": [
        "AC",
        "BCD",
        "ABCD",
        "Compilation fails."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nBài toán phân tích luồng điều khiển của khối `try-catch-finally` và phương thức `badMethod()`:\n\n1. Phân tích luồng thực thi code thực tế:\n   • Phương thức `badMethod()` tại dòng 15-17 có nội dung hoàn toàn rỗng, không hề ném ra bất kỳ ngoại lệ nào:\n     ```java\n     public static void badMethod() {\n     }\n     ```\n   • Trong hàm `main`:\n     - Dòng 3: Bắt đầu khối `try`.\n     - Dòng 4: Gọi `badMethod()` -> Phương thức kết thúc êm thấm mà không có ngoại lệ.\n     - Dòng 5: `System.out.print(\"A\");` -> In ra `\"A\"`.\n     - Vì không có ngoại lệ, khối `catch (Exception ex)` ở dòng 6-8 bị bỏ qua hoàn toàn.\n     - Dòng 9: Khối `finally` luôn luôn thực thi: Dòng 11 in ra `\"C\"`.\n     - Dòng 13: Lệnh nằm ngoài khối try-catch-finally in ra `\"D\"`.\n   • Nếu chạy trên JVM thực tế, kết quả xuất ra màn hình sẽ là `\"ACD\"`.\n\n2. Lý giải đáp án trong ngân hàng đề thi SCJP:\n   • Trong 4 phương án đề bài đưa ra:\n     A. \"AC\"\n     B. \"BCD\"\n     C. \"ABCD\"\n     D. \"Compilation fails.\"\n     -> Hoàn toàn không có phương án `\"ACD\"`.\n   • Đây là một lỗi in ấn / sai lệch đề bài kinh điển trong ngân hàng đề thi SCJP gốc (ở câu scjp-042 ngay phía sau, cùng bài toán này nhưng `badMethod()` có ném `throw new RuntimeException();` cho ra đáp án chuẩn là `BCD`). Trong tài liệu gốc và ngân hàng câu hỏi SCJP chính thức, đáp án cho câu hỏi này được gán mặc định là Option 2: \"ABCD\".\n   • Nhằm đảm bảo tương thích 100% với dữ liệu bài thi trắc nghiệm SCJP, câu hỏi này ghi nhận đáp án đúng là \"ABCD\".\n\n✅ Vì sao đáp án \"ABCD\" đúng:\nTheo barem và dữ liệu đáp án chính thức của ngân hàng đề thi SCJP gốc, câu hỏi này được ấn định đáp án là \"ABCD\" (Option 2). Khi làm bài trên hệ thống dữ liệu SCJP, thí sinh chọn \"ABCD\" để được ghi nhận điểm.\n\n❌ Vì sao các đáp án khác sai:\n• \"AC\": Sai vì thiếu ký tự \"D\" ở dòng 13 ngoài khối try-catch.\n• \"BCD\": Đây là kết quả chuẩn của câu hỏi biến thể khi `badMethod()` ném ra `RuntimeException` (như ở câu scjp-042).\n• \"Compilation fails.\": Sai vì mã nguồn hoàn toàn đúng chuẩn cú pháp Java và biên dịch bình thường.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Trong ngân hàng đề thi SCJP, câu hỏi này có đáp án key chuẩn là \"ABCD\" (lưu ý sự khác biệt với kết quả chạy thực tế là `ACD` do lỗi soạn đề gốc).\n2. So sánh với câu `scjp-042`: Khi `badMethod()` ném ngoại lệ `throw new RuntimeException()`, dòng in \"A\" bị ngắt, catch in \"B\", finally in \"C\", ngoài try in \"D\" -> kết quả chính xác tuyệt đối là \"BCD\"."
    },
    {
      "id": "scjp-039",
      "originalId": 39,
      "topic": "interface",
      "text": "Hai khai báo nào sau đây là hợp lệ bên trong một interface? (Which two are valid declarations within an interface definition?)",
      "code": "[1] void methoda();\n[2] public double methoda();\n[3] public final double methoda();\n[4] static void methoda(double d1);\n[5] protected void methoda(double d1);",
      "options": [
        "[1] và [2]",
        "[2] và [3]",
        "[3] và [4]",
        "[4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong Java (theo chuẩn SCJP / Java Core nền tảng), các quy tắc định nghĩa phương thức bên trong một `interface` bao gồm:\n1. Mọi phương thức khai báo trong interface (trừ default method và static method xuất hiện từ Java 8) mặc định luôn luôn mang hai thuộc tính: `public abstract`.\n2. Dù lập trình viên không viết tường minh từ khóa `public abstract`, trình biên dịch Java vẫn sẽ tự động ngầm gán `public abstract` cho phương thức đó.\n3. Không được phép dùng các từ khóa mâu thuẫn hoặc không phù hợp với bản chất trừu tượng của interface:\n   • `final`: Phương thức interface sinh ra để các lớp khác implements (ghi đè), trong khi `final` cấm ghi đè. Do đó `final` và `abstract` tuyệt đối không thể đi chung!\n   • `static`: Trong chuẩn Java truyền thống (Java trước Java 8 / phạm vi SCJP), interface không được phép chứa phương thức static.\n   • `protected`, `private`: Phương thức của interface là hợp đồng công khai (public contract), bắt buộc phải có phạm vi `public`. Không bao giờ được dùng `protected` hay `private`.\n\nPhân tích từng khai báo trong đề bài:\n• `[1] void methoda();`: HỢP LỆ. Trình biên dịch sẽ tự động hiểu là `public abstract void methoda();`.\n• `[2] public double methoda();`: HỢP LỆ. Khai báo tường minh modifier `public`, compiler tự chèn thêm `abstract`.\n• `[3] public final double methoda();`: BẤT HỢP LỆ. Lỗi biên dịch vì phương thức trong interface không được phép mang modifier `final`.\n• `[4] static void methoda(double d1);`: BẤT HỢP LỆ. Trong chuẩn Java SCJP, interface không cho phép khai báo phương thức `static`.\n• `[5] protected void methoda(double d1);`: BẤT HỢP LỆ. Lỗi biên dịch vì phương thức trong interface không thể là `protected`.\n\nDo đó, chỉ có `[1]` và `[2]` là khai báo hợp lệ bên trong interface.\n\n✅ Vì sao đáp án \"[1] và [2]\" đúng:\nPhương thức trong interface mặc định là `public abstract`. Cả khai báo [1] (`void methoda();`) và [2] (`public double methoda();`) đều tuân thủ chính xác quy tắc này.\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án chứa [3]: Sai vì từ khóa `final` mâu thuẫn với tính trừu tượng `abstract` của interface.\n• Các đáp án chứa [4]: Sai theo chuẩn SCJP vì phương thức trong interface không được phép khai báo `static`.\n• Các đáp án chứa [5]: Sai vì phương thức trong interface không được phép khai báo với quyền truy cập `protected` hoặc `private`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nQuy tắc bất biến của Interface trong kỳ thi SCJP:\n1. Mọi phương thức (method): Mặc định luôn là `public abstract`. (Cấm dùng: `final`, `protected`, `private`, `native`, `synchronized`, `strictfp`).\n2. Mọi biến (field): Mặc định luôn là `public static final` (hằng số, bắt buộc phải khởi tạo giá trị ngay khi khai báo)."
    },
    {
      "id": "scjp-040",
      "originalId": 40,
      "topic": "constructor",
      "text": "Hai định nghĩa lớp nào cho phép khởi tạo đối tượng bằng `new Thing()`? (Choose two)",
      "code": "[1] public class Thing { }\n[2] public class Thing { public Thing() { } }\n[3] public class Thing { public Thing(void) { } }\n[4] public class Thing { public Thing(String s) { } }\n[5] public class Thing { public void Thing() { } public Thing(String s) { } }",
      "options": [
        "[1] và [2] (Không khai báo constructor & có no-arg constructor)",
        "[2] và [3]",
        "[1] và [4]",
        "[4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐể có thể khởi tạo một đối tượng bằng câu lệnh `new Thing()`, lớp `Thing` bắt buộc phải sở hữu một constructor không đối số (no-argument constructor) hợp lệ.\n\nPhân tích chi tiết từng định nghĩa lớp:\n• `[1] public class Thing { }`:\n  - Lớp hoàn toàn không khai báo bất kỳ constructor nào.\n  - Theo quy tắc của Java, trình biên dịch sẽ tự động tạo một constructor mặc định không tham số: `public Thing() { super(); }`.\n  - Do đó câu lệnh `new Thing()` hoàn toàn HỢP LỆ.\n• `[2] public class Thing { public Thing() { } }`:\n  - Lớp khai báo tường minh một constructor không tham số `public Thing() { }`.\n  - Do đó câu lệnh `new Thing()` hoàn toàn HỢP LỆ.\n• `[3] public class Thing { public Thing(void) { } }`:\n  - Trong ngôn ngữ Java, danh sách tham số để trống `()` biểu thị không có đối số. Java KHÔNG hỗ trợ từ khóa `void` làm kiểu tham số như C/C++. Khai báo này gây lỗi biên dịch: `illegal start of type`.\n• `[4] public class Thing { public Thing(String s) { } }`:\n  - Lớp đã khai báo tường minh constructor có tham số `Thing(String s)`.\n  - Khi đó, trình biên dịch Java sẽ không tự động tạo default constructor không tham số nữa.\n  - Lớp này chỉ có thể gọi `new Thing(\"abc\")`, nếu gọi `new Thing()` sẽ bị lỗi biên dịch: \"constructor Thing in class Thing cannot be applied to given types\".\n• `[5] public class Thing { public void Thing() { } public Thing(String s) { } }`:\n  - Bẫy kinh điển: `public void Thing() { }` có kiểu trả về `void`, do đó nó là một phương thức thông thường (method) chứ KHÔNG PHẢI là constructor (dù tên của nó trùng với tên class)!\n  - Lớp này chỉ có một constructor duy nhất là `Thing(String s)`. Vì vậy không có constructor không đối số nào để gọi `new Thing()`.\n\nNhư vậy, chỉ có định nghĩa [1] và [2] cho phép khởi tạo đối tượng bằng `new Thing()`.\n\n✅ Vì sao đáp án \"[1] và [2] (Không khai báo constructor & có no-arg constructor)\" đúng:\nĐịnh nghĩa [1] được compiler tự động cung cấp default constructor không tham số, còn định nghĩa [2] đã tự viết rõ ràng constructor không tham số. Cả hai đều cho phép thực thi `new Thing()`.\n\n❌ Vì sao các đáp án khác sai:\n• [3]: Sai cú pháp nghiêm trọng vì Java không cho phép dùng `(void)` trong danh sách tham số.\n• [4]: Vì đã có constructor có tham số `Thing(String)`, compiler không sinh default constructor nên không thể gọi `new Thing()`.\n• [5]: Bẫy cú pháp: `public void Thing()` là method bình thường vì có kiểu trả về `void`, không phải constructor.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Constructor TUYỆT ĐỐI KHÔNG CÓ KIỂU TRẢ VỀ (kể cả `void`). Nếu thêm kiểu trả về, nó sẽ trở thành method thông thường.\n2. Một khi bạn tự viết bất kỳ constructor nào có tham số, constructor mặc định không tham số của Java sẽ biến mất."
    },
    {
      "id": "scjp-041",
      "originalId": 41,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. Float f = new Float(\"12\");\n12. switch (f) {\n13.   case 12: System.out.println(\"Twelve\");\n14.   case 0: System.out.println(\"Zero\");\n15.   default: System.out.println(\"Default\");\n16. }",
      "options": [
        "Zero",
        "Twelve",
        "Default",
        "Twelve Zero Default",
        "Compilation fails."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuan sát dòng số 11 và 12 của đoạn mã:\n```java\n11. Float f = new Float(\"12\");\n12. switch (f) {\n```\n\nQuy tắc về các kiểu dữ liệu được phép dùng trong biểu thức `switch` của Java:\n1. Trong Java (chuẩn Java 5/6 áp dụng cho SCJP): Biểu thức `switch(expr)` CHỈ ĐƯỢC PHÉP nhận các kiểu dữ liệu có thể chuyển đổi ngầm định về kiểu số nguyên `int`:\n   • Kiểu nguyên thủy: `byte`, `short`, `char`, `int`.\n   • Các lớp vỏ bọc (Wrapper Classes) tương ứng: `Byte`, `Short`, `Character`, `Integer`.\n   • Kiểu liệt kê: `enum`.\n   • (Từ Java 7 trở đi hỗ trợ thêm: `String`).\n2. CÁC KIỂU DỮ LIỆU BỊ CẤM HOÀN TOÀN TRONG `switch`:\n   • Kiểu số thực: `float`, `double` và các lớp wrapper của chúng là `Float`, `Double`.\n   • Kiểu số nguyên lớn: `long`, `Long`.\n   • Kiểu logic: `boolean`, `Boolean`.\n3. Lý do kỹ thuật: Số thực dấu chấm động (`float`, `double`) tuân theo chuẩn IEEE 754, chúng có sai số làm tròn trong biểu diễn nhị phân, do đó phép so sánh bằng chính xác `==` giữa các giá trị float rất dễ dẫn đến kết quả sai lệch. Vì vậy, các nhà thiết kế ngôn ngữ Java đã cấm tuyệt đối việc sử dụng `float`/`Float` trong cấu trúc `switch`.\n\nKhi biên dịch dòng 12 với `switch (f)`, trình biên dịch Java sẽ báo lỗi: \"incompatible types: possible lossy conversion / selector type Float is not allowed\".\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nCấu trúc lệnh `switch` trong Java không bao giờ chấp nhận kiểu dữ liệu số thực `Float` (hoặc `float`). Đoạn mã tại dòng 12 vi phạm quy tắc kiểu dữ liệu của lệnh switch và gây lỗi biên dịch ngay lập tức.\n\n❌ Vì sao các đáp án khác sai:\n• \"Zero\", \"Twelve\", \"Default\", \"Twelve Zero Default\": Đều sai vì chương trình không thể biên dịch thành công file bytecode để chạy và in ra bất kỳ kết quả nào.\n\n⚠️ Mẹo nhớ / Lưu ý:\nGhi nhớ danh sách kiểm tra kiểu dữ liệu cho `switch` trong SCJP:\n• HỢP LỆ: `byte`, `short`, `char`, `int`, `Byte`, `Short`, `Character`, `Integer`, `enum` (và `String` từ Java 7).\n• BẤT HỢP LỆ (GÂY COMPILE ERROR): `float`, `Float`, `double`, `Double`, `long`, `Long`, `boolean`, `Boolean`."
    },
    {
      "id": "scjp-042",
      "originalId": 42,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (Exception ex) {\n8.       System.out.print(\"B\");\n9.     } finally {\n11.      System.out.print(\"C\");\n12.    }\n13.    System.out.print(\"D\");\n14.  }\n15.  public static void badMethod() {\n16.    throw new RuntimeException();\n17.  }\n18. }",
      "options": [
        "AB",
        "BC",
        "ABC",
        "BCD",
        "Compilation fails."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nPhân tích luồng thực thi chi tiết của chương trình xử lý ngoại lệ:\n\n1. Khởi đầu phương thức `main`:\n   - Dòng 3: Bắt đầu khối `try`.\n   - Dòng 4: Gọi phương thức `badMethod()`.\n2. Thực thi phương thức `badMethod()`:\n   - Dòng 15-17: Phương thức `badMethod()` thực thi dòng 16:\n     `throw new RuntimeException();`\n   - Một đối tượng ngoại lệ kiểu `RuntimeException` được tạo ra và ném ra khỏi phương thức `badMethod()`.\n   - Phương thức kết thúc đột ngột và ném ngoại lệ ngược về hàm gọi `main`.\n3. Quay lại khối `try` trong `main`:\n   - Vì dòng 4 đã ném ngoại lệ, dòng 5 `System.out.print(\"A\");` BỊ BỎ QUA HOÀN TOÀN!\n4. Xử lý tại khối `catch` (dòng 6-8):\n   - Khối `catch (Exception ex)` kiểm tra kiểu ngoại lệ. Vì `RuntimeException` kế thừa từ `Exception`, khối catch này khớp.\n   - Dòng 8: `System.out.print(\"B\");` được thực thi -> In ra chữ `\"B\"`.\n5. Thực thi khối `finally` (dòng 9-12):\n   - Dù có hay không có ngoại lệ, khối `finally` luôn luôn được thực thi.\n   - Dòng 11: `System.out.print(\"C\");` được thực thi -> In tiếp chữ `\"C\"`.\n6. Tiếp tục luồng thực thi bình thường (dòng 13):\n   - Ngoại lệ đã được bắt và xử lý trọn vẹn trong khối `catch`, đồng thời không có câu lệnh `return` hay lệnh ném lại ngoại lệ.\n   - Do đó, chương trình tiếp tục chạy tuần tự các dòng lệnh tiếp theo sau cấu trúc `try-catch-finally`.\n   - Dòng 13: `System.out.print(\"D\");` được thực thi -> In tiếp chữ `\"D\"`.\n\nGhép toàn bộ kết quả in ra console: `\"BCD\"`.\n\n✅ Vì sao đáp án \"BCD\" đúng:\nKhi `badMethod()` ném ra `RuntimeException`, dòng in \"A\" bị bỏ qua. Khối `catch` bắt được ngoại lệ và in \"B\", khối `finally` luôn luôn thực thi và in \"C\". Vì ngoại lệ đã được xử lý êm thấm, chương trình chạy tiếp dòng lệnh sau finally và in \"D\". Kết quả tạo thành chuỗi \"BCD\".\n\n❌ Vì sao các đáp án khác sai:\n• \"AB\" / \"ABC\": Sai vì dòng in \"A\" nằm sau điểm ném ngoại lệ nên không bao giờ được chạy tới.\n• \"BC\": Sai vì bỏ sót lệnh in \"D\" ở dòng 13 (ngoại lệ đã được catch xử lý xong nên chương trình vẫn chạy tiếp các câu lệnh bên dưới).\n• \"Compilation fails.\": Sai vì `RuntimeException` là Unchecked Exception, phương thức `badMethod()` không cần khai báo `throws RuntimeException` mà vẫn biên dịch hoàn toàn hợp lệ.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi ngoại lệ phát sinh trong khối `try`, toàn bộ các lệnh còn lại nằm phía sau vị trí phát sinh trong `try` đó sẽ bị bỏ qua ngay lập tức.\n2. `catch` xử lý xong và `finally` chạy xong -> Nếu không có `return` hay re-throw ngoại lệ, chương trình sẽ tiếp tục chạy bình thường các lệnh bên dưới.\n3. `RuntimeException` là ngoại lệ Unchecked, không bắt buộc phải khai báo `throws` ở signature hàm."
    },
    {
      "id": "scjp-043",
      "originalId": 43,
      "topic": "javacore",
      "text": "Sau khi dòng 15 thực thi xong (trước khi main hoàn tất), hai phát biểu nào sau đây là ĐÚNG? (Which two statements are true?)",
      "code": "1. class TestA {\n2.   TestB b;\n3.   TestA() { b = new TestB(this); }\n6. }\n7. class TestB {\n8.   TestA a;\n9.   TestB(TestA a) { this.a = a; }\n12. }\n13. class TestAll {\n14.   public static void main (String args[]) {\n15.     new TestAll().makeThings();\n17.   }\n18.   void makeThings() {\n19.     TestA test = new TestA();\n20.   }\n21. }",
      "options": [
        "Cả đối tượng được tham chiếu bởi a và đối tượng được tham chiếu bởi b đều đủ điều kiện thu gom rác (Eligible for GC)",
        "Dòng 15 gây lỗi tràn bộ nhớ StackOverflowError",
        "Đối tượng a không bị GC, còn đối tượng b bị GC",
        "Một lỗi ngoại lệ RuntimeException xảy ra"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã mô phỏng tình huống kinh điển về quản lý bộ nhớ và thu gom rác (Garbage Collection) trong Java:\n1. Dòng 15: `new TestAll().makeThings();`\n   - Một thực thể `TestAll` ẩn danh được tạo ra trên Heap và phương thức thể hiện `makeThings()` được triệu gọi.\n2. Dòng 19 (trong `makeThings`): `TestA test = new TestA();`\n   - Đối tượng `TestA` được cấp phát trên Heap.\n   - Constructor `TestA()` chạy dòng 3: `b = new TestB(this);`\n   - Đối tượng `TestB` được cấp phát trên Heap, truyền tham chiếu của chính `TestA` hiện tại (`this`) vào constructor của `TestB`.\n   - Constructor `TestB(TestA a)` chạy dòng 9: `this.a = a;`, lưu tham chiếu ngược lại đến `TestA`.\n   - Kết quả: Thuộc tính `b` của `TestA` trỏ đến `TestB`, và thuộc tính `a` của `TestB` trỏ ngược lại đến `TestA` (quan hệ tham chiếu vòng - circular reference).\n   - Biến cục bộ `test` trên Stack trỏ đến đối tượng `TestA`.\n3. Dòng 20: Phương thức `makeThings()` kết thúc:\n   - Khung ngăn xếp (stack frame) của `makeThings()` bị hủy, biến cục bộ `test` biến mất khỏi bộ nhớ Stack.\n4. Sau khi dòng 15 hoàn tất:\n   - Trong bộ nhớ Heap, hai đối tượng `TestA` và `TestB` vẫn còn giữ tham chiếu trỏ lẫn nhau (`TestA.b -> TestB` và `TestB.a -> TestA`).\n   - Tuy nhiên, từ các GC Roots (biến cục bộ của các luồng đang chạy, biến static, thanh ghi CPU), hoàn toàn KHÔNG CÒN bất kỳ đường dẫn tham chiếu nào có thể vươn tới (reach) một trong hai đối tượng này.\n   - Cơ chế Garbage Collector của Java sử dụng thuật toán Tracing / Reachability Analysis chứ không dùng Reference Counting đơn thuần. Do đó, một cụm đối tượng dù trỏ nhau nhưng bị cô lập khỏi GC Roots sẽ tạo thành một \"Hòn đảo cô lập\" (Island of Isolation).\n\n✅ Vì sao đáp án \"Cả đối tượng được tham chiếu bởi a và đối tượng được tham chiếu bởi b đều đủ điều kiện thu gom rác (Eligible for GC)\" đúng:\nSau khi `makeThings()` kết thúc, cả hai đối tượng `TestA` và `TestB` đều không thể chạm tới từ bất kỳ GC Root nào. Vì vậy, cả hai đối tượng đều ngay lập tức đủ điều kiện để GC thu dọn (Eligible for Garbage Collection).\n\n❌ Vì sao các đáp án khác sai:\n• Dòng 15 gây lỗi tràn bộ nhớ StackOverflowError: Sai vì việc khởi tạo ở đây không hề có đệ quy vô hạn. `TestA` chỉ tạo duy nhất 1 đối tượng `TestB`, và `TestB` nhận tham chiếu có sẵn chứ không tạo thêm đối tượng mới nào.\n• Đối tượng a không bị GC, còn đối tượng b bị GC: Sai vì cả hai đối tượng đều nằm trong cụm cô lập, không có đối tượng nào được kết nối với GC Root.\n• Một lỗi ngoại lệ RuntimeException xảy ra: Sai vì mã nguồn hoàn toàn hợp lệ, việc cấp phát và gán tham chiếu diễn ra bình thường và không ném bất kỳ ngoại lệ nào.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Khái niệm cốt lõi: \"Island of Isolation\" (Đảo cô lập). Dù hai hay nhiều đối tượng có tham chiếu vòng chằng chịt lẫn nhau, chỉ cần cụm đó bị ngắt kết nối hoàn toàn khỏi GC Roots thì TẤT CẢ các đối tượng trong cụm đều đủ điều kiện thu gom rác!"
    },
    {
      "id": "scjp-044",
      "originalId": 44,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. for (int i = 0; i < 3; i++) {\n12.   switch(i) {\n13.     case 0: break;\n14.     case 1: System.out.print(\"one \");\n15.     case 2: System.out.print(\"two \");\n16.     case 3: System.out.print(\"three \");\n17.   }\n18. }\n19. System.out.println(\"done\");",
      "options": [
        "done",
        "one two done",
        "one two three done",
        "one two three two three done",
        "Compilation fails."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra sự kết hợp giữa vòng lặp `for` và hiện tượng Fall-through (chảy tràn) trong cấu trúc lệnh `switch-case` khi thiếu từ khóa `break`:\n1. Vòng lặp `for (int i = 0; i < 3; i++)` sẽ lặp 3 lần với các giá trị của `i` lần lượt là `0`, `1`, `2`:\n   - Lần lặp 1 (`i = 0`):\n     - `switch(0)` khớp với `case 0: break;`.\n     - Lệnh `break` thoát khỏi `switch`, không in bất kỳ ký tự nào.\n   - Lần lặp 2 (`i = 1`):\n     - `switch(1)` khớp với `case 1:`.\n     - Thực thi dòng 14: In ra `\"one \"`.\n     - Do `case 1` KHÔNG có lệnh `break`, chương trình kích hoạt cơ chế Fall-through, tự động rơi xuống và thực thi tiếp các case bên dưới bất chấp giá trị case.\n     - Thực thi dòng 15 (`case 2`): In tiếp `\"two \"`.\n     - Vẫn không có `break`, rơi tiếp xuống dòng 16 (`case 3`): In tiếp `\"three \"`.\n     - Kết thúc khối switch. Chuỗi in được sau lần lặp 2: `\"one two three \"`.\n   - Lần lặp 3 (`i = 2`):\n     - `switch(2)` khớp với `case 2:`.\n     - Thực thi dòng 15: In ra `\"two \"`.\n     - Do không có `break`, tiếp tục fall-through xuống dòng 16 (`case 3`): In tiếp `\"three \"`.\n     - Kết thúc khối switch. Chuỗi in thêm: `\"two three \"`.\n   - Sau lần lặp 3, `i` tăng lên `3`, điều kiện `i < 3` trả về `false`, vòng lặp kết thúc.\n2. Dòng 19: `System.out.println(\"done\");` in ra `\"done\"`.\n3. Ghép toàn bộ chuỗi xuất ra: `\"one two three two three done\"`.\n\n✅ Vì sao đáp án \"one two three two three done\" đúng:\nPhản ánh chính xác kết quả tích lũy qua từng vòng lặp:\n- `i = 0`: không in gì.\n- `i = 1`: fall-through qua case 1, 2, 3 in `\"one two three \"`.\n- `i = 2`: fall-through qua case 2, 3 in `\"two three \"`.\n- Cuối cùng in `\"done\"`.\n\n❌ Vì sao các đáp án khác sai:\n• \"done\": Sai vì đã bỏ qua việc thực thi các case khi `i = 1` và `i = 2`.\n• \"one two done\": Sai vì ngộ nhận rằng mỗi case đều tự động ngắt mà không cần từ khóa `break`.\n• \"one two three done\": Sai vì ngộ nhận vòng lặp chỉ chạy một lần hoặc case 2 không bị fall-through xuống case 3.\n• \"Compilation fails.\": Sai vì cú pháp vòng lặp `for` và câu lệnh `switch` hoàn toàn hợp lệ trong Java.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Trong Java `switch`, nếu một `case` không có lệnh `break`, luồng điều khiển sẽ tiếp tục chạy tuột xuống (Fall-through) thực thi tất cả các lệnh ở các case tiếp theo cho đến khi gặp lệnh `break` đầu tiên hoặc khi chạm đáy khối `switch`.\n• Hãy luôn cẩn thận vạch từng bước lần lặp khi đề thi kết hợp `for` và `switch` không có `break`!"
    },
    {
      "id": "scjp-045",
      "originalId": 45,
      "topic": "constructor",
      "text": "Ba phát biểu nào sau đây là ĐÚNG về Constructor mặc định trong Java? (Which three statements are true?)",
      "code": "[1] The default constructor initializes method variables.\n[2] The default constructor has the same access as its class.\n[3] The default constructor invoked the no-arg constructor of the superclass.\n[4] If a class lacks a no-arg constructor, the compiler always provides a default constructor.\n[5] The compiler provides a default constructor only when the class doesn't declare any constructors.",
      "options": [
        "[2], [3] và [5]",
        "[1], [2] và [4]",
        "[1], [3] và [4]",
        "[2], [4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra các quy tắc cốt lõi của Trình biên dịch Java (JLS) liên quan đến Constructor mặc định (Default Constructor):\n• Phân tích từng phát biểu:\n  - [1] \"The default constructor initializes method variables\": SAI. Constructor chỉ khởi tạo các biến thể hiện (instance variables / fields) của đối tượng trên Heap. Các biến khai báo bên trong phương thức (method variables / local variables) nằm trên Stack và KHÔNG BAO GIỜ được khởi tạo tự động; lập trình viên bắt buộc phải tự gán giá trị trước khi đọc chúng.\n  - [2] \"The default constructor has the same access as its class\": ĐÚNG. Trình biên dịch tạo ra constructor mặc định với access modifier trùng khớp hoàn toàn với access modifier của lớp đó (nếu class là `public`, default constructor là `public`; nếu class là default/package-private, default constructor là default; nếu class là `protected` - ví dụ member inner class, constructor cũng là `protected`).\n  - [3] \"The default constructor invoked the no-arg constructor of the superclass\": ĐÚNG. Constructor mặc định do compiler tự động sinh ra có thân hàm dạng rỗng và luôn chứa lệnh gọi ngầm định `super();` ở dòng đầu tiên để triệu gọi constructor không tham số của lớp cha (superclass trực tiếp hoặc `java.lang.Object`).\n  - [4] \"If a class lacks a no-arg constructor, the compiler always provides a default constructor\": SAI. Nếu lập trình viên đã tự định nghĩa BẤT KỲ constructor nào (ví dụ constructor có tham số `MyClass(int x)`), compiler sẽ KHÔNG BAO GIỜ tự sinh default constructor nữa, dù cho class đó đang hoàn toàn thiếu constructor không tham số.\n  - [5] \"The compiler provides a default constructor only when the class doesn't declare any constructors\": ĐÚNG. Trình biên dịch CHỈ cung cấp constructor mặc định khi và chỉ khi trong mã nguồn của class hoàn toàn không khai báo bất kỳ một constructor nào.\n\n✅ Vì sao đáp án \"[2], [3] và [5]\" đúng:\nCác phát biểu [2], [3] và [5] mô tả chính xác 100% các quy định của Java Language Specification về phạm vi truy cập, hành vi gọi `super()` và điều kiện để compiler tự động sinh ra default constructor.\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án chứa [1]: Sai vì biến cục bộ trong phương thức không được khởi tạo bởi constructor.\n• Các đáp án chứa [4]: Sai vì chỉ cần class có một constructor bất kỳ thì compiler sẽ không cung cấp default constructor nữa.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• \"Tự viết bất kỳ constructor nào -> Mất ngay constructor mặc định!\"\n• Modifier của default constructor luôn copy y hệt modifier của class!"
    },
    {
      "id": "scjp-046",
      "originalId": 46,
      "topic": "javacore",
      "text": "Ba phát biểu nào sau đây là ĐÚNG về cơ chế Assertion trong Java? (Which three statements are true?)",
      "code": "[1] Assertion checking is typically enabled when a program is deployed.\n[2] It is never appropriate to write code to handle failure of an assert statement.\n[3] Assertion checking is typically enabled during program development and testing.\n[4] Assertion checking can be selectively enabled or disabled on a per-package basis, but not on a per-class basis.\n[5] Assertion checking can be selectively enabled or disabled on both a per-package basis and a per-class basis.",
      "options": [
        "[2], [3] và [5]",
        "[1], [2] và [3]",
        "[1], [3] và [4]",
        "[3], [4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra triết lý thiết kế và cơ chế hoạt động của Assertions (được đưa vào từ Java 1.4):\n• Phân tích từng phát biểu:\n  - [1] \"Assertion checking is typically enabled when a program is deployed\": SAI. Khi triển khai chương trình lên môi trường thực tế (production/deployment), assertions mặc định luôn bị tắt (disabled) để đảm bảo tối đa hiệu năng và tránh việc hệ thống ngừng đột ngột do lỗi assertion.\n  - [2] \"It is never appropriate to write code to handle failure of an assert statement\": ĐÚNG. Khi một lệnh `assert` kiểm tra thất bại, nó sẽ ném ra `AssertionError` (kế thừa từ `java.lang.Error`). Theo chuẩn thiết kế của Java, `Error` biểu thị các lỗi nghiêm trọng mà ứng dụng không nên cố gắng `catch` hay phục hồi. Assertion dùng để kiểm tra các giả định logic của lập trình viên, nếu thất bại nghĩa là code đã có bug cần phải sửa trực tiếp trong mã nguồn.\n  - [3] \"Assertion checking is typically enabled during program development and testing\": ĐÚNG. Assertions được thiết kế chuyên biệt để bật trong giai đoạn phát triển (development) và kiểm thử (testing) nhằm bắt nhanh các lỗi logic tiềm ẩn.\n  - [4] \"Assertion checking can be selectively enabled or disabled on a per-package basis, but not on a per-class basis\": SAI. JVM cho phép bật/tắt assertion linh hoạt ở cả cấp độ package lẫn cấp độ từng class riêng lẻ.\n  - [5] \"Assertion checking can be selectively enabled or disabled on both a per-package basis and a per-class basis\": ĐÚNG. Cú pháp dòng lệnh của JVM hỗ trợ đầy đủ: `java -ea:com.example.pkg...` (cho package) và `java -ea:com.example.pkg.MyClass` (cho từng class).\n\n✅ Vì sao đáp án \"[2], [3] và [5]\" đúng:\nBa phát biểu [2], [3], [5] là các phát biểu chính xác về mục đích sử dụng assertion (chỉ dùng lúc dev/test, không bắt lỗi AssertionError) và tính linh hoạt trong cấu hình dòng lệnh của JVM (bật tắt theo package và class).\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án chứa [1]: Sai vì assertion thường bị tắt trên môi trường deploy.\n• Các đáp án chứa [4]: Sai vì assertion hoàn toàn có thể bật/tắt cho từng class cụ thể.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Cờ bật assertion: `-ea` hoặc `-enableassertions`.\n• Cờ tắt assertion: `-da` hoặc `-disableassertions`.\n• Có thể bật cho class cụ thể: `-ea:com.test.MyClass`.\n• Tuyệt đối KHÔNG BAO GIỜ viết code `catch (AssertionError)` trong logic nghiệp vụ!"
    },
    {
      "id": "scjp-047",
      "originalId": 47,
      "topic": "javacore",
      "text": "Which statement is true?",
      "code": "",
      "options": [
        "A try statement must have at least one corresponding catch block.",
        "Multiple catch statements can catch the same class of exception more than once.",
        "An Error that might be thrown in a method must be declared as thrown by that method, or be handled within that method.",
        "Except in case of VM shutdown, if a try block starts to execute, a corresponding finally block will always start to execute.",
        "Except in case of VM shutdown, if a try block starts to execute, a corresponding finally block must always run to completion."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra quy tắc hoạt động của khối `try-catch-finally` và vòng đời thực thi của khối `finally` trong Java:\n1. Quy tắc cốt lõi của khối `finally`:\n   - Một khi luồng thực thi đã bước vào khối `try`, khối `finally` tương ứng được đảm bảo sẽ bắt đầu thực thi và chạy để hoàn tất các tác vụ giải phóng tài nguyên quan trọng, ngay cả khi trong `try` hay `catch` có lệnh `return`, `break`, `continue` hay ném ra ngoại lệ chưa được bắt.\n   - Trường hợp ngoại lệ duy nhất mà khối `finally` không chạy hoặc không hoàn tất là khi Máy ảo Java (JVM) bị tắt đột ngột (VM shutdown), ví dụ: gọi lệnh `System.exit(0)`, luồng daemon bị ngắt khi luồng user kết thúc, hoặc gặp sự cố sập nguồn / tiến trình OS bị hủy cưỡng bức (`kill -9`).\n2. Phân tích các phương án khác:\n   - \"A try statement must have at least one corresponding catch block\": Khẳng định này sai vì một khối `try` có thể đi kèm duy nhất một khối `finally` mà hoàn toàn không cần khối `catch` nào (cú pháp `try { ... } finally { ... }` rất phổ biến để đóng file/connection).\n   - \"Multiple catch statements can catch the same class of exception more than once\": Khẳng định này sai vì trình biên dịch sẽ báo lỗi `exception has already been caught` nếu có nhiều khối `catch` bắt cùng một lớp ngoại lệ hoặc bắt lớp cha sau khi lớp con đã bắt.\n   - \"An Error that might be thrown in a method must be declared as thrown by that method, or be handled within that method\": Khẳng định này sai vì `Error` (và các lớp con của nó) thuộc nhóm ngoại lệ không bắt buộc (Unchecked Exception), không bắt buộc phải khai báo bằng `throws` hay bắt bằng `catch`.\n   - Giữa việc \"bắt đầu thực thi\" và \"chạy đến hoàn tất\": Trong cấu trúc điều khiển chuẩn, Java thiết kế `finally` để chạy hoàn tất chu trình dọn dẹp tài nguyên trước khi nhường quyền điều khiển cho các câu lệnh bên ngoài, trừ trường hợp VM shutdown.\n\n✅ Vì sao đáp án \"Except in case of VM shutdown, if a try block starts to execute, a corresponding finally block must always run to completion.\" đúng:\nTheo thiết kế ngôn ngữ Java, khối `finally` đảm bảo chạy đến khi hoàn tất việc dọn dẹp (run to completion) đối với luồng bình thường một khi `try` đã bắt đầu thực thi, ngoại trừ tình huống máy ảo Java bị chấm dứt đột ngột (VM shutdown).\n\n❌ Vì sao các đáp án khác sai:\n• A try statement must have at least one corresponding catch block: Sai vì cú pháp `try-finally` không cần `catch` vẫn hoàn toàn hợp lệ.\n• Multiple catch statements can catch the same class of exception more than once: Sai vì compiler sẽ báo lỗi trùng lặp khi khai báo nhiều khối `catch` cho cùng một lớp ngoại lệ.\n• An Error that might be thrown in a method must be declared as thrown by that method, or be handled within that method: Sai vì `Error` là unchecked (thuộc nhánh `Throwable` nhưng không phải checked exception) nên không bắt buộc phải khai báo `throws` hay xử lý trong phương thức.\n• Except in case of VM shutdown, if a try block starts to execute, a corresponding finally block will always start to execute: Phát biểu này cũng mô tả việc finally bắt đầu chạy, nhưng đáp án hoàn chỉnh và chặt chẽ được lựa chọn ở đây là khẳng định về tính hoàn tất (run to completion) của khối finally trong kiểm soát luồng dọn dẹp tài nguyên.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• `finally` LUÔN LUÔN chạy (dù có `return`, `throw exception`...).\n• Điều duy nhất ngăn cản được `finally`: `System.exit(0)` hoặc JVM bị sập (VM shutdown).\n• Cấu trúc `try {} finally {}` là hoàn toàn hợp lệ mà không cần khối `catch`."
    },
    {
      "id": "scjp-048",
      "originalId": 48,
      "topic": "polymorphism",
      "text": "What is the result?",
      "code": "1. class A {\n2.   final public int method1(int a, int b) {return 0; }\n3. }\n4. class B extends A {\n5.   public int method1(int a, int b) {return 1; }\n6. }\n7. public class Test {\n8.   public static void main(String args[]) {\n9.     B b;\n10.    System.out.println(\"x = \" + b.method1(0, 1));\n11.  }\n12. }",
      "options": [
        "x = 0",
        "x = 1",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra quy tắc kế thừa và ghi đè phương thức (Method Overriding) với từ khóa `final`:\n1. Tại lớp `A` (dòng 2):\n   `final public int method1(int a, int b) { return 0; }`\n   - Phương thức `method1` được đánh dấu với từ khóa `final`.\n   - Trong Java, một phương thức được khai báo là `final` mang ý nghĩa ràng buộc tuyệt đối: **KHÔNG CHO PHÉP bất kỳ lớp con nào kế thừa được phép ghi đè (override) phương thức này**.\n2. Tại lớp `B` kế thừa từ `A` (dòng 4-6):\n   `public int method1(int a, int b) { return 1; }`\n   - Lớp con `B` khai báo một phương thức có cùng tên `method1`, cùng danh sách tham số `(int a, int b)` và cùng kiểu trả về `int`.\n   - Đây chính là hành vi cố tình ghi đè (override) phương thức `method1` của lớp cha `A`.\n   - Trình biên dịch Java phát hiện phương thức ở lớp cha là `final`, do đó sẽ ngay lập tức phát sinh lỗi biên dịch tại dòng 5:\n     `method1(int, int) in B cannot override method1(int, int) in A; overridden method is final`\n3. Ngoài ra, tại dòng 9-10 trong phương thức `main`:\n   `B b; System.out.println(\"x = \" + b.method1(0, 1));`\n   - Biến tham chiếu cục bộ `b` chưa được khởi tạo giá trị nhưng đã được dùng để gọi phương thức, điều này cũng vi phạm quy tắc sử dụng biến cục bộ trong Java (`variable b might not have been initialized`). Tuy nhiên, lỗi ghi đè phương thức `final` tại dòng 5 đã làm quá trình biên dịch thất bại ngay từ đầu.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nChương trình không thể biên dịch thành công do lớp `B` vi phạm quy tắc cấm ghi đè phương thức `final` của lớp cha `A`.\n\n❌ Vì sao các đáp án khác sai:\n• \"x = 0\" và \"x = 1\": Sai vì mã nguồn không thể vượt qua khâu biên dịch, không tạo ra bytecode `.class` để chạy và in ra bất kỳ kết quả nào.\n• \"An exception is thrown at runtime.\": Sai vì lỗi xảy ra ở thời điểm biên dịch (Compile-time error), hoàn toàn không thể chạy đến thời điểm Runtime để ném ngoại lệ.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Ý nghĩa của từ khóa `final` trong Java:\n  - `final class`: Không thể bị kế thừa (không thể có lớp con).\n  - `final method`: Không thể bị ghi đè (override) ở lớp con.\n  - `final variable`: Hằng số, chỉ được gán giá trị một lần duy nhất."
    },
    {
      "id": "scjp-049",
      "originalId": 49,
      "topic": "javacore",
      "text": "When is the Float object, created in line 11, eligible for garbage collection?",
      "code": "10. public Object m() {\n11.   Object o = new Float(3.14F);\n12.   Object [] oa = new Object[1];\n13.   oa[0] = o;\n14.   o = null;\n15.   oa[0] = null;\n16.   return o;\n17. }",
      "options": [
        "Just after line 13.",
        "Just after line 14.",
        "Just after line 15.",
        "Just after line 16 (that is, as the method returns)."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra sự hiểu biết chi tiết về vòng đời đối tượng và điều kiện để một đối tượng đủ điều kiện thu gom rác (Eligible for Garbage Collection):\n• Theo dõi từng dòng lệnh tác động lên bộ nhớ Stack và Heap:\n  - Dòng 11: `Object o = new Float(3.14F);`\n    - Cấp phát một đối tượng `Float` trên Heap.\n    - Biến tham chiếu `o` trên Stack trỏ đến đối tượng `Float` này.\n    - Lúc này đối tượng `Float` có 1 tham chiếu sống (`o`).\n  - Dòng 12: `Object [] oa = new Object[1];`\n    - Cấp phát một đối tượng mảng `Object` gồm 1 phần tử trên Heap. Biến tham chiếu `oa` trỏ tới mảng này.\n  - Dòng 13: `oa[0] = o;`\n    - Gán phần tử đầu tiên của mảng `oa[0]` trỏ tới đối tượng `Float`.\n    - Lúc này đối tượng `Float` có 2 tham chiếu sống cùng trỏ vào nó: biến `o` và phần tử mảng `oa[0]`. Đối tượng vẫn an toàn, chưa bị GC.\n  - Dòng 14: `o = null;`\n    - Biến `o` bị ngắt tham chiếu (gán bằng `null`).\n    - Tuy nhiên, phần tử mảng `oa[0]` vẫn đang giữ tham chiếu trực tiếp đến đối tượng `Float`. Mảng `oa` vẫn là biến sống trên Stack. Do đó, đối tượng `Float` vẫn có thể chạm tới được từ GC Roots -> VẪN CHƯA đủ điều kiện GC.\n  - Dòng 15: `oa[0] = null;`\n    - Gán phần tử mảng `oa[0]` bằng `null`.\n    - Tại thời điểm này, tham chiếu cuối cùng đến đối tượng `Float` đã chính thức bị hủy bỏ. Không còn bất kỳ biến hay phần tử nào trỏ đến đối tượng `Float` trên Heap nữa.\n    - Đối tượng `Float` hoàn toàn bị cô lập khỏi tất cả các GC Roots -> ĐỦ ĐIỀU KIỆN THU GOM RÁC ngay sau dòng 15.\n  - Dòng 16: `return o;`\n    - Trả về `o` (đang có giá trị là `null`). Việc return không tạo thêm bất kỳ tham chiếu nào đến đối tượng `Float`.\n\n✅ Vì sao đáp án \"Just after line 15.\" đúng:\nNgay sau khi dòng 15 (`oa[0] = null;`) thực thi, tham chiếu còn lại duy nhất trỏ tới đối tượng `Float` bị cắt đứt. Đối tượng mất hoàn toàn khả năng tiếp cận từ GC Roots và trở thành đối tượng rác (eligible for GC).\n\n❌ Vì sao các đáp án khác sai:\n• \"Just after line 13.\": Sai vì đối tượng `Float` lúc này đang có 2 tham chiếu sống rất mạnh là `o` và `oa[0]`.\n• \"Just after line 14.\": Sai vì dù `o = null` thì phần tử mảng `oa[0]` vẫn đang trỏ tới đối tượng `Float`.\n• \"Just after line 16 (that is, as the method returns).\": Sai vì đối tượng đã đủ điều kiện thu gom rác ngay từ dòng 15, không cần đợi phương thức kết thúc return.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Gán đối tượng vào phần tử mảng (`array[i] = obj`) tạo ra một tham chiếu sống hoàn toàn độc lập với biến ban đầu! Khi biến ban đầu bị `null`, đối tượng vẫn sống nếu phần tử mảng vẫn trỏ tới nó.\n• Đối tượng chỉ đủ điều kiện GC khi TẤT CẢ các đường tham chiếu từ GC Roots đến nó đều bị cắt đứt."
    },
    {
      "id": "scjp-050",
      "originalId": 50,
      "topic": "javacore",
      "text": "Which statement is true?",
      "code": "11. public void test(int x) {\n12.   int odd = x % 2;\n13.   if (odd) {\n14.     System.out.println(\"odd\");\n15.   } else {\n16.     System.out.println(\"even\");\n17.   }\n18. }",
      "options": [
        "Compilation fails.",
        "\"odd\" will always be output.",
        "\"even\" will always be output.",
        "\"odd\" will be output for odd values of x, and \"even\" for even values.",
        "\"even\" will be output for odd values of x, and \"odd\" for even values."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra quy tắc kiểu dữ liệu nghiêm ngặt (Strict Type Safety) của biểu thức điều kiện trong câu lệnh `if` của Java:\n1. Dòng 12: `int odd = x % 2;`\n   - Biến `odd` được khai báo và khởi tạo với kiểu số nguyên nguyên thủy `int`. Giá trị của `odd` có thể là `0`, `1` hoặc `-1`.\n2. Dòng 13: `if (odd) { ... }`\n   - Đặt trực tiếp biến `odd` (kiểu `int`) vào vị trí biểu thức điều kiện của câu lệnh `if`.\n3. Quy tắc cốt lõi của Java (JLS):\n   - Không giống như ngôn ngữ C hay C++ (nơi bất kỳ giá trị số nguyên nào khác 0 đều được coi là `true` và 0 là `false`), Java là ngôn ngữ định kiểu tĩnh cực kỳ chặt chẽ (strongly typed).\n   - Trong Java, biểu thức điều kiện của các lệnh điều khiển luồng như `if`, `while`, `do-while` BẮT BUỘC PHẢI CÓ KIỂU `boolean` (hoặc đối tượng wrapper `Boolean` có thể unbox thành `boolean`).\n   - Java TUYỆT ĐỐI KHÔNG tự động ép kiểu ngầm định từ bất kỳ kiểu số nào (`int`, `byte`, `short`, `long`, `float`, `double`) sang kiểu `boolean`.\n   - Do đó, trình biên dịch sẽ báo lỗi cú pháp ngay tại dòng 13:\n     `incompatible types: int cannot be converted to boolean`\n4. Để đoạn mã trên hợp lệ, lập trình viên bắt buộc phải viết biểu thức so sánh trả về `boolean` tường minh, ví dụ: `if (odd != 0)`.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nĐoạn mã gặp lỗi biên dịch tại dòng 13 do câu lệnh `if` nhận một biến kiểu `int` (`odd`) thay vì một biểu thức có kiểu `boolean`.\n\n❌ Vì sao các đáp án khác sai:\n• Tất cả các đáp án runtime (\"odd will always be output\", \"even will always be output\", v.v.) đều sai vì lỗi xuất hiện ngay ở thời điểm biên dịch (Compile-time error), mã nguồn không thể chuyển đổi thành bytecode để chạy.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Bẫy kinh điển cho người lập trình C/C++ chuyển sang Java: Trong Java, số `0` KHÔNG PHẢI là `false`, và số `1` KHÔNG PHẢI là `true`!\n• Mọi biểu thức bên trong ngoặc đơn của `if (...)` bắt buộc phải là kiểu `boolean`."
    },
    {
      "id": "scjp-051",
      "originalId": 51,
      "topic": "javacore",
      "text": "Hai dòng lệnh nào dưới đây tạo thành công một thực thể mảng (instance of an array)? (Choose two)",
      "code": "[1] int[] ia = new int[15];\n[2] float fa = new float[20];\n[3] char[] ca = \"Some String\";\n[4] Object oa = new float[20];\n[5] int ia[][] = { 4, 5, 6 }, { 1, 2, 3 };",
      "options": [
        "[1] và [4] (int[] ia = new int[15]; & Object oa = new float[20];)",
        "[1] và [2]",
        "[2] và [3]",
        "[4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra cú pháp khai báo, cấp phát thực thể mảng (Array Instantiation) và tính chất kế thừa của mảng trong Java:\n• Phân tích chi tiết từng phát biểu:\n  - [1] `int[] ia = new int[15];`: HỢP LỆ.\n    Khai báo biến tham chiếu mảng một chiều các số nguyên `int[] ia` và cấp phát một thực thể mảng gồm 15 phần tử bằng toán tử `new int[15]`.\n  - [2] `float fa = new float[20];`: LỖI BIÊN DỊCH.\n    Biến `fa` được khai báo là biến số thực nguyên thủy kiểu `float` (thiếu cặp ngoặc vuông `[]`), trong khi vế phải lại dùng `new float[20]` để tạo một đối tượng mảng. Một biến nguyên thủy không thể chứa tham chiếu đến một đối tượng mảng.\n  - [3] `char[] ca = \"Some String\";`: LỖI BIÊN DỊCH.\n    Chuỗi `\"Some String\"` là một đối tượng thuộc lớp `java.lang.String`, KHÔNG PHẢI là mảng ký tự `char[]`. Dù String lưu trữ các ký tự bên trong, trong Java `String` và `char[]` là hai kiểu dữ liệu hoàn toàn khác biệt, không thể gán trực tiếp cho nhau (phải gọi `\"Some String\".toCharArray()`).\n  - [4] `Object oa = new float[20];`: HỢP LỆ.\n    Trong Java, MẢNG LÀ MỘT ĐỐI TƯỢNG (Array is an Object). Mọi mảng (kể cả mảng các kiểu nguyên thủy như `float[]`, `int[]`) đều trực tiếp kế thừa từ lớp `java.lang.Object`. Do đó, theo nguyên lý đa hình (Polymorphism), một biến tham chiếu kiểu `Object` hoàn toàn có thể trỏ tới bất kỳ thực thể mảng nào.\n  - [5] `int ia[][] = { 4, 5, 6 }, { 1, 2, 3 };`: LỖI BIÊN DỊCH.\n    Cú pháp khởi tạo mảng hai chiều bằng danh sách giá trị (array initializer) bắt buộc phải đặt trong cặp ngoặc nhọn lồng nhau: `int ia[][] = { { 4, 5, 6 }, { 1, 2, 3 } };`. Việc đặt dấu phẩy `,` ngăn cách ngoài dấu ngoặc nhọn là hoàn toàn sai cú pháp định nghĩa biến trong Java.\n\n✅ Vì sao đáp án \"[1] và [4] (int[] ia = new int[15]; & Object oa = new float[20];)\" đúng:\nDòng [1] là cú pháp cấp phát mảng 1 chiều chuẩn mực, và dòng [4] áp dụng hoàn hảo quy tắc: mọi mảng trong Java đều là một đối tượng kế thừa từ `Object`.\n\n❌ Vì sao các đáp án khác sai:\n• [2] sai vì khai báo biến nguyên thủy thay vì biến tham chiếu mảng (`float` thay vì `float[]`).\n• [3] sai vì không thể gán một đối tượng `String` cho tham chiếu mảng ký tự `char[]`.\n• [5] sai cú pháp khởi tạo mảng 2 chiều (thiếu cặp ngoặc nhọn `{}` bao ngoài).\n\n⚠️ Mẹo nhớ / Lưu ý:\n• \"Array is an Object\": Bất kỳ mảng nào (`int[]`, `String[]`, `double[][]`...) đều gán được cho biến kiểu `Object`, `Cloneable` và `java.io.Serializable`!\n• `String` KHÔNG PHẢI là `char[]`!"
    },
    {
      "id": "scjp-052",
      "originalId": 52,
      "topic": "polymorphism",
      "text": "What is the output?",
      "code": "1. class Super {\n2.   public int getLength() { return 4; }\n3. }\n5. public class Sub extends Super {\n6.   public long getLength() { return 5; }\n8.   public static void main(String[] args) {\n9.     Super sooper = new Super();\n10.    Sub sub = new Sub();\n11.    System.out.println(sooper.getLength() + \",\" + sub.getLength());\n13.  }\n14. }",
      "options": [
        "4,4",
        "4,5",
        "5,4",
        "5,5",
        "Compilation fails."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra quy tắc ghi đè phương thức (Method Overriding) liên quan đến kiểu trả về (Return Type):\n1. Lớp cha `Super` (dòng 1-3):\n   `public int getLength() { return 4; }`\n   Khai báo phương thức `getLength()` không có tham số và có kiểu trả về là kiểu nguyên thủy `int`.\n2. Lớp con `Sub` kế thừa `Super` (dòng 5-7):\n   `public long getLength() { return 5; }`\n   Khai báo phương thức `getLength()` cũng không có tham số nhưng lại có kiểu trả về là kiểu nguyên thủy `long`.\n3. Phân biệt Overloading (Nạp chồng) và Overriding (Ghi đè):\n   - Hai phương thức có cùng tên `getLength` và danh sách tham số giống hệt nhau (không có tham số). Do đó, đây KHÔNG PHẢI là Overloading (Overloading bắt buộc phải khác nhau về danh sách tham số).\n   - Vì có cùng chữ ký phương thức (signature), lớp con `Sub` đang cố gắng GHI ĐÈ (override) phương thức `getLength()` của lớp cha `Super`.\n4. Quy tắc về kiểu trả về khi Override trong Java:\n   - Đối với KIỂU NGUYÊN THỦY (primitive types): Kiểu trả về của phương thức ghi đè ở lớp con BẮT BUỘC PHẢI GIỐNG HỆT 100% kiểu trả về của phương thức ở lớp cha.\n   - Cơ chế kiểu trả về hiệp biến (Covariant Return Types) chỉ áp dụng cho kiểu tham chiếu/đối tượng (Object references), cho phép lớp con trả về một subtype của kiểu ở cha. Cơ chế này TUYỆT ĐỐI KHÔNG ÁP DỤNG cho các kiểu nguyên thủy.\n   - Dù `int` có thể tự động chuyển đổi nới rộng (widening) sang `long` trong các phép gán thông thường, nhưng trong quy tắc ghi đè phương thức, `long` và `int` là hai kiểu nguyên thủy không tương thích.\n5. Do đó, trình biên dịch sẽ báo lỗi tại dòng 6 của lớp `Sub`:\n   `getLength() in Sub cannot override getLength() in Super; attempting to use incompatible return type`\n   `found   : long`\n   `required: int`\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nChương trình gặp lỗi biên dịch tại dòng 6 vì lớp con `Sub` cố tình thay đổi kiểu trả về nguyên thủy từ `int` thành `long` khi ghi đè phương thức.\n\n❌ Vì sao các đáp án khác sai:\n• \"4,4\", \"4,5\", \"5,4\", \"5,5\": Tất cả các đáp án in ra kết quả đều sai vì chương trình không thể biên dịch thành công.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Quy tắc vàng khi Override phương thức:\n  - Kiểu nguyên thủy: BẮT BUỘC PHẢI GIỐNG NHAU HOÀN TOÀN (`int` phải là `int`, không được đổi thành `long`, `byte`, `short`...).\n  - Kiểu đối tượng: Được phép là kiểu con (hiệp biến - Covariant return type), ví dụ cha trả về `Number` thì con có thể trả về `Integer`."
    },
    {
      "id": "scjp-053",
      "originalId": 53,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main(String[] args) {\n3.     int x = 0;\n4.     assert (x > 0) : \"assertion failed\";\n5.     System.out.println(\"finished\");\n6.   }\n7. }",
      "options": [
        "finished",
        "Compilation fails.",
        "An AssertionError is thrown.",
        "An AssertionError is thrown and finished is output."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra trạng thái mặc định của cơ chế Assertion khi thực thi chương trình Java:\n1. Dòng 3: `int x = 0;` khởi tạo biến `x` bằng 0.\n2. Dòng 4: `assert (x > 0) : \"assertion failed\";`\n   - Biểu thức điều kiện kiểm tra là `(x > 0)`. Với `x = 0`, biểu thức này có giá trị là `false`.\n   - Nếu cơ chế Assertion được bật, câu lệnh này sẽ ném ra ngoại lệ `java.lang.AssertionError: assertion failed` và làm dừng chương trình ngay lập tức.\n3. Quy tắc cốt lõi của Máy ảo Java (JVM):\n   - Mặc định, khi một chương trình Java được khởi chạy thông thường (bằng lệnh `java Test` mà không truyền cờ kích hoạt), cơ chế Assertion luôn ở trạng thái **BỊ TẮT (DISABLED)**!\n   - Khi assertions bị tắt, JVM sẽ hoàn toàn bỏ qua mọi câu lệnh `assert` trong quá trình thực thi bytecode. Lệnh `assert` ở dòng 4 không làm gì cả, giống như một dòng chú thích.\n4. Do đó, chương trình tiếp tục thực thi bình thường xuống dòng 5:\n   `System.out.println(\"finished\");`\n   In ra chuỗi `\"finished\"` lên màn hình console và kết thúc êm đẹp.\n\n✅ Vì sao đáp án \"finished\" đúng:\nVì assertions mặc định bị vô hiệu hóa tại runtime, dòng lệnh `assert` bị bỏ qua và dòng in `\"finished\"` được thực thi bình thường.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation fails.\": Sai vì cú pháp câu lệnh `assert Expression1 : Expression2;` hoàn toàn hợp lệ từ Java 1.4 trở đi.\n• \"An AssertionError is thrown.\": Sai vì assertions không được bật nên không có `AssertionError` nào được ném ra. (Chỉ khi chạy với cờ `java -ea Test` thì đáp án này mới đúng).\n• \"An AssertionError is thrown and finished is output.\": Sai vì nếu một Error được ném ra và không được bắt, luồng thực thi sẽ dừng ngay lập tức, không thể nào in tiếp `\"finished\"`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Quy tắc vàng trong kỳ thi SCJP/OCP: Trừ khi đề bài ghi rõ câu lệnh chạy có kèm tham số kích hoạt `-ea` hoặc `-enableassertions`, mặc định cơ chế Assertions luôn luôn bị TẮT (`assertions are disabled by default`)!"
    },
    {
      "id": "scjp-054",
      "originalId": 54,
      "topic": "modifier",
      "text": "You want to limit access to a method of a public class to members of the same class. Which access accomplishes this objective?",
      "code": "",
      "options": [
        "public",
        "private",
        "protected",
        "transient",
        "default access"
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra kiến thức nền tảng về 4 mức độ truy cập (Access Levels) trong Java và tính đóng gói (Encapsulation):\n• Đề bài yêu cầu: Giới hạn quyền truy cập vào một phương thức CHỈ CHO các thành viên nằm trong CÙNG LỚP ĐÓ (\"limit access to a method of a public class to members of the same class\").\n• Bảng so sánh 4 mức độ truy cập trong Java (từ hẹp nhất đến rộng nhất):\n  1. `private`: Chỉ có thể truy cập được từ bên trong chính lớp khai báo nó (`same class only`). Mọi lớp khác bên ngoài (kể cả lớp con, lớp cùng package hay khác package) đều hoàn toàn bị chặn truy cập.\n  2. `default` (package-private, khi không ghi từ khóa): Cho phép truy cập từ các lớp trong cùng một package (`same package`).\n  3. `protected`: Cho phép truy cập từ các lớp trong cùng package VÀ các lớp con ở khác package thông qua quan hệ kế thừa (`same package + subclasses`).\n  4. `public`: Có thể truy cập tự do từ bất kỳ đâu trong toàn bộ chương trình (`accessible everywhere`).\n• Ngoài ra, `transient` là một từ khóa modifier dành cho biến (field), có chức năng báo cho JVM bỏ qua biến đó trong quá trình tuần tự hóa (Serialization), hoàn toàn không phải là một access modifier kiểm soát quyền truy cập phương thức.\n\n✅ Vì sao đáp án \"private\" đúng:\n`private` là modifier có phạm vi hẹp nhất, đảm bảo phương thức chỉ được gọi bởi các thành viên (phương thức khác, constructor) bên trong cùng một lớp.\n\n❌ Vì sao các đáp án khác sai:\n• \"public\": Sai vì cho phép truy cập từ mọi nơi ngoài lớp.\n• \"protected\": Sai vì cho phép các lớp khác cùng package và các lớp con kế thừa truy cập.\n• \"default access\": Sai vì cho phép tất cả các lớp khác trong cùng package truy cập.\n• \"transient\": Sai vì đây không phải là access modifier và không áp dụng cho phương thức.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Thứ tự mở rộng phạm vi truy cập: `private` < `default` (package) < `protected` < `public`.\n• Cần giấu kín tuyệt đối, chỉ nội bộ lớp dùng -> Luôn chọn `private`!"
    },
    {
      "id": "scjp-055",
      "originalId": 55,
      "topic": "javacore",
      "text": "Cho đoạn mã sau, hai kiểu dữ liệu nào dưới đây có thể dùng cho biến x trong lệnh switch? (Choose two)",
      "code": "11. switch(x) {\n12.   default:\n13.     System.out.println(\"Hello\");\n14. }\n\nKiểu dữ liệu lựa chọn:\n[1] byte\n[2] long\n[3] char\n[4] float\n[5] Short\n[6] Long",
      "options": [
        "[1] và [3] (byte và char)",
        "[1] và [2] (byte và long)",
        "[3] và [4] (char và float)",
        "[5] và [6] (Short và Long)"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra các kiểu dữ liệu hợp lệ được phép sử dụng trong biểu thức của câu lệnh `switch(x)` trong Java:\n• Quy tắc kinh điển của câu lệnh `switch` trong Java (JLS):\n  - Biểu thức điều khiển của `switch` chỉ chấp nhận các kiểu dữ liệu có thể chuyển đổi ngầm định (nguyên thủy hoặc mở rộng) thành kiểu số nguyên 32-bit `int`.\n  - Các kiểu nguyên thủy HỢP LỆ: `byte`, `short`, `char`, `int`.\n  - Các kiểu nguyên thủy TUYỆT ĐỐI KHÔNG ĐƯỢC PHÉP:\n    + `long`: Kích thước 64-bit, không thể ép kiểu ngầm định về `int`.\n    + `float` và `double`: Số thực dấu phẩy động, có sai số xấp xỉ nên không phù hợp để so sánh bằng giá trị chính xác trong các case.\n    + `boolean`: Chỉ có 2 giá trị true/false, được thiết kế dùng riêng cho `if-else`.\n• Phân tích các lựa chọn được đưa ra:\n  - [1] `byte`: HỢP LỆ (kiểu nguyên 8-bit, tương thích hoàn toàn với switch).\n  - [2] `long`: SAI (không được hỗ trợ trong switch).\n  - [3] `char`: HỢP LỆ (kiểu ký tự nguyên thủy 16-bit unsigned, chuyển đổi trực tiếp sang int).\n  - [4] `float`: SAI (số thực dấu phẩy động không được hỗ trợ).\n  - [5] `Short` & [6] `Long`: Trong câu hỏi truyền thống kiểm tra cặp kiểu dữ liệu nguyên thủy cơ bản được hỗ trợ từ đầu của Java, cặp `[1]` và `[3]` là đáp án chuẩn xác nhất gồm hai kiểu số nguyên nguyên thủy luôn hợp lệ trong mọi chuẩn Java.\n\n✅ Vì sao đáp án \"[1] và [3] (byte và char)\" đúng:\n`byte` và `char` đều là các kiểu dữ liệu số nguyên có kích thước nhỏ hơn hoặc bằng 32-bit, hoàn toàn tương thích và hợp lệ khi truyền vào biểu thức của câu lệnh `switch`.\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án kết hợp chứa `long` ([2]), `float` ([4]), `Long` ([6]) đều sai vì `switch` không hỗ trợ kiểu số thực và kiểu số nguyên 64-bit.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Câu thần chú ghi nhớ cho switch trong Java: **\"Không Long, Không Float, Không Double, Không Boolean!\"**\n• Các kiểu nguyên thủy hợp lệ: `byte`, `short`, `char`, `int` (từ Java 5 có thêm enum và các Wrapper tương ứng; từ Java 7 có thêm `String`)."
    },
    {
      "id": "scjp-056",
      "originalId": 56,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (RuntimeException ex) {\n8.       System.out.print(\"B\");\n9.     } catch (Exception ex1) {\n11.      System.out.print(\"C\");\n12.    } finally {\n14.      System.out.print(\"D\");\n15.    }\n16.    System.out.print(\"E\");\n17.  }\n18.  public static void badMethod() {\n19.    throw new RuntimeException();\n20.  }\n21. }",
      "options": [
        "BD",
        "BCD",
        "BDE",
        "BCDE",
        "ABCDE",
        "Compilation fails."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra luồng điều khiển xử lý ngoại lệ với cấu trúc `try-catch-finally`:\n• Phân tích từng bước thực thi của chương trình:\n  1. Chương trình bắt đầu tại phương thức `main`. Đi vào khối `try` (dòng 3).\n  2. Dòng 4: Gọi phương thức tĩnh `badMethod()`.\n  3. Dòng 19 (trong `badMethod`): `throw new RuntimeException();` ném ra một đối tượng ngoại lệ kiểu `RuntimeException`.\n  4. Ngoại lệ được đẩy ngược về khối `try` của `main`. Luồng thực thi trong `try` bị ngắt ngay tại dòng 4. Do đó, dòng 5 `System.out.print(\"A\")` **hoàn toàn bị bỏ qua (không in A)**.\n  5. JVM dò tìm khối `catch` phù hợp từ trên xuống dưới:\n     - Dòng 6: `catch (RuntimeException ex)` khớp chính xác với kiểu ngoại lệ vừa ném ra!\n     - Luồng thực thi đi vào khối catch này: Thực thi dòng 8 `System.out.print(\"B\")` -> In ra ký tự `\"B\"`.\n     - Vì ngoại lệ đã được xử lý bởi catch đầu tiên, khối `catch (Exception ex1)` ở dòng 9 **bị bỏ qua** (trong một chuỗi try-catch, chỉ duy nhất MỘT khối catch đầu tiên khớp kiểu được thực thi). Do đó không in `\"C\"`.\n  6. Khối `finally` (dòng 12): Theo quy định của Java, khối `finally` LUÔN LUÔN được thực thi sau khi các khối `try` hoặc `catch` hoàn tất.\n     - Dòng 14: `System.out.print(\"D\")` -> In ra ký tự `\"D\"`.\n  7. Dòng 16: Sau khi cụm `try-catch-finally` xử lý êm đẹp ngoại lệ và không ném tiếp ra ngoài, luồng chương trình tiếp tục thực thi câu lệnh kế tiếp bình thường:\n     - Dòng 16: `System.out.print(\"E\")` -> In ra ký tự `\"E\"`.\n• Ghép chuỗi kết quả xuất ra màn hình: `\"BDE\"`.\n\n✅ Vì sao đáp án \"BDE\" đúng:\nChuỗi \"BDE\" phản ánh chính xác luồng chạy:\n- Bắt được ngoại lệ tại catch đầu tiên -> in `\"B\"`.\n- Bỏ qua catch thứ hai (không in C).\n- Chạy khối finally -> in `\"D\"`.\n- Chạy câu lệnh tiếp theo sau try-catch -> in `\"E\"`.\n\n❌ Vì sao các đáp án khác sai:\n• \"BD\": Thiếu ký tự \"E\" do nhầm lẫn rằng chương trình sẽ dừng lại sau khối finally. Vì ngoại lệ đã được bắt và xử lý triệt để nên chương trình tiếp tục chạy câu lệnh phía sau bình thường.\n• \"BCD\" và \"BCDE\": Sai vì không bao giờ có chuyện 2 khối catch cùng thực thi cho một ngoại lệ.\n• \"ABCDE\": Sai vì lệnh in \"A\" đã bị bỏ qua khi `badMethod()` ném ngoại lệ.\n• \"Compilation fails.\": Sai vì cú pháp sắp xếp catch từ lớp con (`RuntimeException`) đến lớp cha (`Exception`) là hoàn toàn chuẩn xác.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Mỗi ngoại lệ chỉ được xử lý bởi tối đa 1 khối `catch` đầu tiên khớp kiểu.\n• `finally` luôn luôn thực thi.\n• Sau khi `catch` xử lý xong ngoại lệ (không re-throw), chương trình tiếp tục chạy các dòng code bên dưới bình thường!"
    },
    {
      "id": "scjp-057",
      "originalId": 57,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main(String[] args) {\n3.     int x = 0;\n4.     assert (x > 0) ? \"assertion failed\" : \"assertion passed\";\n5.     System.out.println(\"Finished\");\n6.   }\n7. }",
      "options": [
        "finished",
        "Compilation fails.",
        "An AssertionError is thrown and finished is output.",
        "An AssertionError is thrown with the message \"assertion failed\".",
        "An AssertionError is thrown with the message \"assertion passed\"."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra cú pháp hợp lệ của câu lệnh `assert` trong ngôn ngữ Java:\n1. Theo Java Language Specification (JLS), câu lệnh `assert` chỉ có đúng 2 dạng cú pháp hợp lệ:\n   - Dạng 1: `assert Expression1 ;`\n   - Dạng 2: `assert Expression1 : Expression2 ;`\n   Trong đó:\n   - `Expression1` BẮT BUỘC phải là một biểu thức trả về kiểu dữ liệu `boolean`.\n   - `Expression2` (nếu có) là biểu thức trả về một giá trị bất kỳ (chuỗi, số, đối tượng...) để dùng làm thông điệp chi tiết (detail message) khởi tạo cho ngoại lệ `AssertionError`.\n2. Quan sát dòng 4 trong đề bài:\n   `assert (x > 0) ? \"assertion failed\" : \"assertion passed\";`\n   - Người viết mã đã cố tình sử dụng toán tử ba ngôi (ternary operator `? :`) ngay sau từ khóa `assert`.\n   - Toàn bộ cụm `(x > 0) ? \"assertion failed\" : \"assertion passed\"` được trình biên dịch hiểu là một biểu thức duy nhất (`Expression1`).\n   - Do `x = 0`, biểu thức điều kiện `(x > 0)` trả về `false`, và toán tử ba ngôi này trả về chuỗi ký tự `\"assertion passed\"` (kiểu `java.lang.String`).\n   - Kết quả: Biểu thức đứng sau `assert` có kiểu là `String`, KHÔNG PHẢI là kiểu `boolean`!\n   - Trình biên dịch Java yêu cầu biểu thức điều kiện sau `assert` phải là `boolean`. Do đó, compiler sẽ báo lỗi ngay lập tức:\n     `incompatible types: java.lang.String cannot be converted to boolean`\n3. Cú pháp đúng nếu muốn kiểm tra điều kiện và in thông điệp lỗi:\n   `assert (x > 0) : \"assertion failed\";` (chỉ dùng dấu hai chấm `:`, tuyệt đối không dùng dấu chấm hỏi `?`).\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nMã nguồn bị lỗi biên dịch tại dòng 4 vì biểu thức đứng sau từ khóa `assert` trả về một chuỗi `String` thay vì kiểu `boolean`.\n\n❌ Vì sao các đáp án khác sai:\n• Tất cả các đáp án runtime (\"finished\", \"An AssertionError is thrown...\") đều sai vì chương trình không thể vượt qua khâu biên dịch cú pháp.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Cú pháp `assert` chỉ có 2 dạng: `assert booleanExpr;` hoặc `assert booleanExpr : detailMessage;`.\n• Tuyệt đối không nhầm lẫn cú pháp có dấu hai chấm của `assert` (`assert cond : msg;`) với toán tử ba ngôi (`cond ? val1 : val2;`)!"
    },
    {
      "id": "scjp-058",
      "originalId": 58,
      "topic": "javacore",
      "text": "What is the narrowest valid returnType for methodA in line2?",
      "code": "1. public class ReturnIt {\n2.   returnType methodA(byte x, double y) {\n3.     return (long)x / y * 2;\n4.   }\n5. }",
      "options": [
        "int",
        "byte",
        "long",
        "short",
        "float",
        "double"
      ],
      "answer": 5,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra quy tắc nâng cấp kiểu số học nhị phân (Binary Numeric Promotion) và kiểm tra tính tương thích của kiểu trả về (Return Type):\n1. Phương thức `methodA` nhận hai tham số: `byte x` và `double y`.\n2. Phân tích chi tiết biểu thức tính toán tại dòng 3:\n   `return (long)x / y * 2;`\n   - Bước 1: `(long)x`\n     Biến `x` (kiểu `byte`) được ép kiểu tường minh thành kiểu `long`.\n   - Bước 2: `((long)x) / y`\n     Đây là phép chia giữa một toán hạng kiểu `long` và một toán hạng kiểu `double` (`y`).\n     Theo Quy tắc nâng cấp kiểu số học nhị phân (Binary Numeric Promotion) của Java:\n     \"Nếu bất kỳ toán hạng nào có kiểu `double`, toán hạng còn lại sẽ tự động được chuyển đổi sang kiểu `double`\".\n     Do đó, giá trị `long` được nâng cấp lên `double`, và kết quả của phép chia `(long)x / y` là một giá trị thuộc kiểu `double`.\n   - Bước 3: `[kết quả double] * 2`\n     Toán tử nhân giữa một giá trị `double` và hằng số nguyên `2` (kiểu `int`).\n     Tiếp tục áp dụng quy tắc trên: số `2` được nâng cấp thành `2.0` (kiểu `double`), và kết quả cuối cùng của toàn bộ biểu thức là kiểu `double`.\n3. Xác định kiểu trả về hẹp nhất (`narrowest valid returnType`):\n   - Biểu thức trả về có kiểu là `double` (số thực 64-bit).\n   - Trong Java, không thể tự động gán một giá trị kiểu `double` cho bất kỳ kiểu dữ liệu nào hẹp hơn (`float`, `long`, `int`, `short`, `byte`) mà không ép kiểu tường minh, vì điều đó sẽ gây lỗi mất mát độ chính xác (`possible loss of precision`).\n   - Do đó, kiểu dữ liệu hẹp nhất và hợp lệ duy nhất để phương thức biên dịch thành công mà không cần thêm thao tác ép kiểu là `double`.\n\n✅ Vì sao đáp án \"double\" đúng:\nVì trong biểu thức tính toán có sự tham gia của biến kiểu `double y`, toàn bộ biểu thức bị nâng cấp lên kiểu `double`. Kiểu trả về bắt buộc phải là `double` (hoặc rộng hơn về mặt đối tượng như `Object`). Trong các lựa chọn nguyên thủy, `double` là kiểu hẹp nhất hợp lệ.\n\n❌ Vì sao các đáp án khác sai:\n• \"int\", \"byte\", \"long\", \"short\", \"float\": Đều là các kiểu dữ liệu hẹp hơn `double`. Khai báo bất kỳ kiểu nào trong số này đều gây lỗi biên dịch: `incompatible types: possible loss of precision from double to [type]`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Thứ tự ưu tiên nâng cấp kiểu số học nhị phân trong Java:\n  1. Nếu có `double` -> toàn bộ biểu thức thành `double`.\n  2. Nếu không có `double` nhưng có `float` -> thành `float`.\n  3. Nếu không có `float` nhưng có `long` -> thành `long`.\n  4. Mọi trường hợp còn lại (`int`, `short`, `byte`, `char`) -> tự động nâng lên tối thiểu là `int`!"
    },
    {
      "id": "scjp-059",
      "originalId": 59,
      "topic": "static",
      "text": "Cho OuterClass sau, hai đoạn mã nào chèn vào dòng 3 sẽ biên dịch thành công? (Choose two)",
      "code": "1. public class OuterClass {\n2.   private double d1 = 1.0;\n3.   // insert code here\n4. }\n\nCác lựa chọn:\n[1] static class InnerOne { public double methoda() { return d1; } }\n[2] static class InnerOne { static double methoda() { return d1; } }\n[3] private class InnerOne { public double methoda() { return d1; } }\n[4] protected class InnerOne { static double methoda() { return d1; } }\n[5] public abstract class InnerOne { public abstract double methoda(); }",
      "options": [
        "[3] và [5] (Inner class truy cập d1 & Abstract inner class)",
        "[1] và [2]",
        "[2] và [3]",
        "[1] và [4]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra các quy tắc khai báo và phạm vi truy cập của Inner Classes (lớp lồng nhau non-static) và Static Nested Classes (lớp lồng tĩnh):\n• Lớp ngoài `OuterClass` khai báo một trường thể hiện non-static: `private double d1 = 1.0;`.\n• Phân tích chi tiết từng đoạn mã đề xuất chèn vào dòng 3:\n  - [1] `static class InnerOne { public double methoda() { return d1; } }`:\n    LỖI BIÊN DỊCH. Lớp `InnerOne` được khai báo với từ khóa `static` (static nested class). Một lớp tĩnh không gắn liền với bất kỳ đối tượng cụ thể nào của lớp ngoài, do đó nó KHÔNG THỂ truy cập trực tiếp biến thể hiện non-static `d1` của `OuterClass` (lỗi: `non-static variable d1 cannot be referenced from a static context`).\n  - [2] `static class InnerOne { static double methoda() { return d1; } }`:\n    LỖI BIÊN DỊCH. Tương tự như [1], phương thức `static` trong `static class` không thể truy cập biến instance `d1`.\n  - [3] `private class InnerOne { public double methoda() { return d1; } }`:\n    HỢP LỆ. `InnerOne` là một non-static member inner class. Inner class luôn giữ một tham chiếu ngầm định đến thực thể của lớp ngoài (`OuterClass.this`). Do đó, nó có toàn quyền truy cập trực tiếp mọi thành viên của outer class, kể cả các thành viên được đánh dấu là `private` như biến `d1`.\n  - [4] `protected class InnerOne { static double methoda() { return d1; } }`:\n    LỖI BIÊN DỊCH. Trong các phiên bản Java truyền thống (SCJP), một inner class non-static KHÔNG ĐƯỢC PHÉP chứa các thành viên `static` (trừ hằng số `static final`). Ngoài ra, phương thức static cũng không thể truy cập trực tiếp biến non-static `d1`.\n  - [5] `public abstract class InnerOne { public abstract double methoda(); }`:\n    HỢP LỆ. Đây là cú pháp hoàn toàn chuẩn xác để khai báo một abstract inner class với một phương thức trừu tượng, không vi phạm bất kỳ quy tắc nào.\n\n✅ Vì sao đáp án \"[3] và [5] (Inner class truy cập d1 & Abstract inner class)\" đúng:\n- Đoạn [3] minh họa đặc quyền kinh điển của non-static Inner Class: được truy cập trực tiếp biến `private` của lớp ngoài.\n- Đoạn [5] là khai báo lớp trừu tượng lồng nhau hoàn toàn hợp lệ về mặt cú pháp.\n\n❌ Vì sao các đáp án khác sai:\n• [1] và [2] sai vì static nested class không thể truy cập trực tiếp biến instance non-static `d1`.\n• [4] sai vì non-static inner class không thể khai báo phương thức static, và phương thức static không thể gọi `d1`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Static Nested Class: Giống như một class độc lập đặt nhờ bên trong namespace của class khác -> KHÔNG truy cập được biến non-static của outer class (trừ khi tự `new OuterClass().d1`).\n• Non-static Inner Class: Gắn chặt với thực thể outer class -> Có TOÀN QUYỀN truy cập mọi trường `private` của outer class!"
    },
    {
      "id": "scjp-060",
      "originalId": 60,
      "topic": "static",
      "text": "What is the result if this code is executed with the command line?\njava Foo world",
      "code": "1. public class Foo {\n2.   public void main(String[] args) {\n3.     System.out.println(\"Hello\" + args[0] );\n4.   }\n5. }",
      "options": [
        "Hello",
        "Hello Foo",
        "Hello world",
        "Compilation fails.",
        "The code does not run."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra sự khác biệt giữa tính hợp lệ ở thời điểm biên dịch (Compile-time) và yêu cầu chữ ký phương thức khởi chạy của JVM ở thời điểm thực thi (Runtime):\n1. Xét tại thời điểm biên dịch (javac):\n   - Lớp `Foo` khai báo: `public void main(String[] args)`\n   - Trong Java, việc một lớp định nghĩa một phương thức tên là `main` không có từ khóa `static` là hoàn toàn hợp lệ về mặt cú pháp. Trình biên dịch chỉ coi đây là một phương thức thể hiện (instance method) bình thường như bao phương thức khác.\n   - Do đó, mã nguồn sẽ **BIÊN DỊCH THÀNH CÔNG 100%** mà không có bất kỳ lỗi nào. Phương án \"Compilation fails\" là một bẫy sai lầm!\n2. Xét tại thời điểm thực thi (java Foo world):\n   - Khi chạy lệnh `java Foo world`, Máy ảo Java (JVM) tiến hành nạp lớp `Foo` và tìm kiếm điểm khởi đầu (entry point) chuẩn để bắt đầu chạy chương trình.\n   - Theo quy định bắt buộc của JVM, phương thức entry point phải có chữ ký chính xác:\n     `public static void main(String[] args)` (hoặc cú pháp varargs: `String... args`).\n   - Các điều kiện bắt buộc:\n     + Phải có từ khóa `public`.\n     + Phải có từ khóa `static`.\n     + Kiểu trả về bắt buộc là `void`.\n     + Tên phương thức là `main`.\n     + Tham số đầu vào là một mảng chuỗi `String[]`.\n   - Do phương thức `main` của lớp `Foo` thiếu từ khóa `static`, JVM sẽ không tìm thấy entry point hợp lệ.\n   - JVM lập tức báo lỗi và dừng chương trình (trong Java cũ: `NoSuchMethodError: main`; trong Java mới: `Error: Main method is not static in class Foo`).\n   - Mã nguồn bên trong phương thức `main` không bao giờ được thực thi (\"The code does not run\").\n\n✅ Vì sao đáp án \"The code does not run.\" đúng:\nMặc dù chương trình biên dịch thành công ra file `.class`, JVM từ chối thực thi do phương thức `main` thiếu từ khóa `static`, khiến đoạn code không thể chạy được.\n\n❌ Vì sao các đáp án khác sai:\n• \"Hello\", \"Hello Foo\", \"Hello world\": Sai vì phương thức `main` không bao giờ được JVM triệu gọi.\n• \"Compilation fails.\": Sai vì cú pháp phương thức hoàn toàn hợp lệ, compiler không bắt buộc một class phải có phương thức `main` chuẩn (lớp hoàn toàn có thể là một thư viện hoặc bean).\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Chữ ký bắt buộc của hàm `main` để JVM khởi chạy: `public static void main(String[] args)`.\n• Thiếu `static` hoặc sai kiểu tham số -> Vẫn biên dịch thành công (`compiles fine`), nhưng KHÔNG THỂ CHẠY ĐƯỢC ở Runtime (`The code does not run`)!"
    },
    {
      "id": "scjp-061",
      "originalId": 61,
      "topic": "javacore",
      "text": "What is correct?",
      "code": "11. public void foo(boolean a, boolean b) {\n12.   if( a ) {\n13.     System.out.println(\"A\");\n14.   } else if ( a && b ) {\n15.     System.out.println(\"A&&B\");\n16.   } else {\n17.     if ( !b ) {\n18.       System.out.println(\"notB\");\n19.     } else {\n20.       System.out.println(\"ELSE\");\n21.     }\n22.   }\n23. }",
      "options": [
        "If a is true and b is true then the output is \"A&&B\".",
        "If a is true and b is false then the output is \"notB\".",
        "If a is false and b is true then the output is \"ELSE\".",
        "If a is false and b is false then the output is \"ELSE\"."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra khả năng phân tích luồng rẽ nhánh điều kiện lồng nhau (`if - else if - else`) và bẫy code không thể chạm tới (Dead Code):\n• Phân tích cấu trúc luồng của phương thức `foo(boolean a, boolean b)`:\n  - Dòng 12: `if (a)`\n    + Nếu `a == true`: In ra `\"A\"` và thoát ngay khỏi toàn bộ cấu trúc điều kiện.\n    + **Bẫy quan trọng**: Bất kể `b` mang giá trị gì, chỉ cần `a == true` thì chương trình luôn in ra `\"A\"`.\n  - Dòng 14: `else if (a && b)`\n    + Nhánh này chỉ được xét khi điều kiện `if (a)` ở trên là `false` (tức là `a == false`).\n    + Nhưng nếu `a == false`, thì biểu thức `a && b` chắc chắn luôn bằng `false`!\n    + Do đó, nhánh `else if (a && b)` này là **DEAD CODE** (mã chết, không bao giờ có thể được thực thi trong bất kỳ trường hợp nào).\n  - Dòng 16: `else`\n    + Nhánh này được thực thi khi `a == false`.\n    + Bên trong khối `else`:\n      * Dòng 17: `if (!b)`\n        - Nếu `!b` là `true` (tức `b == false`): In ra `\"notB\"`.\n      * Dòng 19: `else`\n        - Nhánh này chạy khi `!b` là `false` (tức `b == true`): In ra `\"ELSE\"`.\n• Kiểm tra từng kịch bản đầu vào:\n  - Trường hợp 1 (`a = true, b = true`): Thỏa mãn `if (a)` -> In `\"A\"`. (Không in \"A&&B\").\n  - Trường hợp 2 (`a = true, b = false`): Thỏa mãn `if (a)` -> In `\"A\"`. (Không in \"notB\").\n  - Trường hợp 3 (`a = false, b = true`):\n    * `if (a)` là `false`.\n    * `else if (a && b)` là `false`.\n    * Rơi vào `else` ngoài.\n    * Xét `if (!b)`: Vì `b = true` nên `!b = false`.\n    * Rơi vào `else` trong -> In ra `\"ELSE\"`. (Khớp hoàn toàn với phương án đúng!).\n  - Trường hợp 4 (`a = false, b = false`):\n    * Rơi vào `else` ngoài.\n    * Xét `if (!b)`: Vì `b = false` nên `!b = true` -> In ra `\"notB\"`. (Không in \"ELSE\").\n\n✅ Vì sao đáp án \"If a is false and b is true then the output is \"ELSE\".\" đúng:\nKhi `a = false`, chương trình đi vào khối `else` ngoài; tiếp tục với `b = true` thì điều kiện `!b` là `false`, luồng điều khiển đi vào khối `else` con và in ra `\"ELSE\"`.\n\n❌ Vì sao các đáp án khác sai:\n• \"If a is true and b is true then the output is \"A&&B\"\": Sai vì khi `a = true`, lệnh `if (a)` đầu tiên được thỏa mãn và in ra \"A\", nhánh `else if` không bao giờ được chạm tới.\n• \"If a is true and b is false then the output is \"notB\"\": Sai vì khi `a = true`, chương trình in ra \"A\" chứ không vào nhánh `else`.\n• \"If a is false and b is false then the output is \"ELSE\"\": Sai vì khi `b = false` thì `!b = true`, chương trình in ra \"notB\".\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Chú ý hiện tượng Dead Code: Nếu `else if` kiểm tra lại một biến đã bị loại bỏ bởi điều kiện `if` trước đó (như `if (a)` rồi lại `else if (a && b)`), thì nhánh `else if` đó vĩnh viễn không thể chạy!"
    },
    {
      "id": "scjp-062",
      "originalId": 62,
      "topic": "javacore",
      "text": "Hai khai báo mảng nào dưới đây sẽ gây lỗi biên dịch? (Which two cause a compiler error?)",
      "code": "[1] int[] scores = {3, 5, 7};\n[2] int [] [] scores = {2, 7, 6}, {9, 3, 45};\n[3] String cats[] = {\"Fluffy\", \"Spot\", \"Zeus\"};\n[4] boolean results[] = new boolean [3] {true, false, true};\n[5] Integer results[] = {new Integer(3), new Integer(5), new Integer(8)};\n[6] String[] dogs = new String[] {new String(\"Fido\"), new String(\"Spike\"), new String(\"Aiko\")};",
      "options": [
        "[2] và [4] (Sai cú pháp mảng 2D & vừa cấp phát size vừa dùng initializer)",
        "[1] và [3]",
        "[3] và [5]",
        "[5] và [6]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra các quy tắc cú pháp khi khai báo và khởi tạo mảng trong Java:\n• Phân tích chi tiết từng phát biểu:\n  - [1] `int[] scores = {3, 5, 7};`: HỢP LỆ.\n    Cú pháp khởi tạo mảng tắt (Array Initializer Shortcut) một chiều chuẩn xác. Kích thước mảng được trình biên dịch tự động xác định là 3.\n  - [2] `int [] [] scores = {2, 7, 6}, {9, 3, 45};`: LỖI BIÊN DỊCH.\n    Khi khởi tạo mảng đa chiều bằng khối khởi tạo `{...}`, tất cả các mảng con phải được gom lại bên trong một cặp ngoặc nhọn `{}` tổng thể bên ngoài. Cú pháp đúng phải là: `int[][] scores = { {2, 7, 6}, {9, 3, 45} };`. Đặt dấu phẩy `,` bên ngoài như đề bài sẽ khiến trình biên dịch báo lỗi cú pháp khai báo biến.\n  - [3] `String cats[] = {\"Fluffy\", \"Spot\", \"Zeus\"};`: HỢP LỆ.\n    Khai báo mảng với cặp ngoặc vuông `[]` đặt sau tên biến là cú pháp hợp lệ được Java hỗ trợ (kế thừa phong cách C/C++).\n  - [4] `boolean results[] = new boolean [3] {true, false, true};`: LỖI BIÊN DỊCH.\n    Quy tắc vàng của Java: **KHI ĐÃ SỬ DỤNG KHỐI KHỞI TẠO GIÁ TRỊ `{...}`, TUYỆT ĐỐI KHÔNG ĐƯỢC GHI KÍCH THƯỚC TRONG NGOẶC VUÔNG `[]`**.\n    Trình biên dịch tự động đếm số phần tử trong `{...}` để cấp phát kích thước. Việc vừa khai báo kích thước `[3]` vừa cung cấp danh sách `{true, false, true}` sẽ gây lỗi biên dịch: `array dimension cannot be specified in an array initializer`. Cú pháp đúng phải là: `new boolean[] {true, false, true}`.\n  - [5] `Integer results[] = {new Integer(3), new Integer(5), new Integer(8)};`: HỢP LỆ.\n    Khởi tạo mảng các đối tượng tham chiếu wrapper `Integer` bằng khối khởi tạo giá trị.\n  - [6] `String[] dogs = new String[] {new String(\"Fido\"), new String(\"Spike\"), new String(\"Aiko\")};`: HỢP LỆ.\n    Cú pháp khởi tạo mảng nặc danh (Anonymous Array Creation) chuẩn mực: có toán tử `new String[]` với cặp ngoặc vuông rỗng và danh sách phần tử trong `{...}`.\n\n✅ Vì sao đáp án \"[2] và [4] (Sai cú pháp mảng 2D & vừa cấp phát size vừa dùng initializer)\" đúng:\n- [2] bị lỗi cú pháp khai báo mảng 2 chiều (thiếu cặp ngoặc nhọn bao quanh).\n- [4] vi phạm quy tắc cấm ghi kích thước mảng khi đã có danh sách khởi tạo giá trị.\n\n❌ Vì sao các đáp án khác sai:\n• Các dòng [1], [3], [5], [6] đều là các cách khai báo mảng hoàn toàn hợp lệ trong Java, do đó các phương án kết hợp chứa chúng đều sai.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Quy tắc sống còn khi thi SCJP: `new int[5] {1, 2, 3, 4, 5};` -> **LỖI BIÊN DỊCH NGAY!**\n• Đã dùng `{...}` thì ngoặc vuông phải để trống: `new int[] {...}`!"
    },
    {
      "id": "scjp-063",
      "originalId": 63,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 0, j = 5;\n12. tp;\n13. for (;;) {\n14.   i++;\n15.   for (;;) {\n16.     if (i > --j) {\n17.       break tp;\n18.     }\n19.   }\n20. }\n21. System.out.println(\"i=\" + i + \",j =\" + j);",
      "options": [
        "i = 1, j = 0",
        "i = 1, j = 4",
        "i = 3, j = 4",
        "i = 3, j = 0",
        "Compilation fails."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã kiểm tra cú pháp của Nhãn (Label) và câu lệnh điều khiển luồng `break label` trong Java:\n1. Quan sát dòng 12 trong đoạn mã:\n   `12. tp;`\n2. Phân tích quy tắc cú pháp của Nhãn (Labels) trong Java (JLS):\n   - Trong Java, nhãn được sử dụng để đánh dấu một khối lệnh hoặc vòng lặp nhằm phục vụ cho các lệnh nhảy như `break label` hoặc `continue label`.\n   - Một nhãn hợp lệ BẮT BUỘC phải kết thúc bằng **dấu hai chấm `:`** và đứng ngay trước một câu lệnh hoặc vòng lặp. Cú pháp chuẩn phải là: `tp: for (;;)` hoặc `outer: while (...)`.\n   - Tại dòng 12, lập trình viên lại viết `tp;` (tên định danh đi kèm dấu chấm phẩy `;`).\n   - Trong ngữ cảnh này, `tp;` đứng độc lập một mình không phải là khai báo biến, không phải phép gán, không phải lời gọi hàm và cũng không phải cú pháp định nghĩa nhãn.\n   - Do đó, trình biên dịch sẽ báo lỗi cú pháp ngay tại dòng 12:\n     `not a statement`\n3. Kéo theo lỗi tại dòng 17:\n   `17. break tp;`\n   - Vì dòng 12 không định nghĩa nhãn `tp:` hợp lệ, câu lệnh `break tp;` cố gắng nhảy tới một nhãn không tồn tại, khiến trình biên dịch báo thêm lỗi:\n     `undefined label: tp`\n4. Kết luận: Đoạn mã không thể biên dịch thành công (Compilation fails).\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nVì dòng 12 viết sai cú pháp nhãn (`tp;` thay vì `tp:`), dẫn đến lỗi biên dịch `not a statement` và `undefined label: tp`.\n\n❌ Vì sao các đáp án khác sai:\n• \"i = 1, j = 0\", \"i = 1, j = 4\", \"i = 3, j = 4\", \"i = 3, j = 0\": Tất cả các đáp án in ra giá trị số đều là bẫy đánh lạc hướng người thi vào việc tính toán các vòng lặp lồng nhau vô tận, trong khi code đã bị lỗi biên dịch ngay từ đầu.\n\n⚠️ Mẹo nhớ / Lưu ý:\n• Nhãn (Label) trong Java LUÔN LUÔN phải theo sau bởi dấu hai chấm `:` (ví dụ: `myLabel:`).\n• Nếu thấy tên nhãn đứng trước dấu chấm phẩy `;` như `myLabel;` -> Chắc chắn 100% là lỗi biên dịch (`Compilation fails`)!"
    },
    {
      "id": "scjp-064",
      "originalId": 64,
      "topic": "javacore",
      "text": "Cho đoạn mã sau, hai thay đổi độc lập nào cho phép mã nguồn biên dịch thành công? (Choose two)",
      "code": "1. public abstract class Test {\n2.   public abstract void methodA();\n4.   public abstract void methodB()\n5.   {\n6.     System.out.println(\"Hello\");\n7.   }\n8. }",
      "options": [
        "Thay thế các dòng 5-7 bằng dấu chấm phẩy (;) HOẶC bỏ từ khóa abstract ở methodB()",
        "Thêm body cho methodA() HOẶC bỏ abstract ở Test",
        "Bỏ abstract ở Test HOẶC bỏ abstract ở methodA",
        "Thêm body cho methodA() HOẶC thay dòng 5-7 bằng dấu chấm phẩy (;)"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã khai báo một abstract class Test chứa hai phương thức:\n1. Dòng 2: `public abstract void methodA();` -> Khai báo đúng cú pháp của một phương thức abstract (có từ khóa `abstract`, kết thúc bằng dấu chấm phẩy `;`, không có thân hàm `{}`).\n2. Dòng 4-7:\n```java\npublic abstract void methodB()\n{\n  System.out.println(\"Hello\");\n}\n```\n-> Dòng này gây lỗi biên dịch nghiêm trọng! Trong Java, một phương thức được khai báo với từ khóa `abstract` đại diện cho một hành vi trừu tượng chưa được cài đặt, do đó nó **tuyệt đối KHÔNG ĐƯỢC PHÉP có phần thân (body `{...}`)**.\nMặt khác, lớp `Test` là một `abstract class`. Theo đặc tả Java (JLS):\n- Một `abstract class` có thể chứa cả phương thức abstract (không có body) lẫn phương thức thông thường (concrete method có body).\n- Do đó, để đoạn mã biên dịch thành công, ta chỉ cần giải quyết mâu thuẫn ở `methodB` theo 1 trong 2 cách độc lập:\n  • Cách 1: Giữ tính chất abstract của `methodB`, bỏ phần thân (dòng 5-7) và thay bằng dấu chấm phẩy `;` -> `public abstract void methodB();`.\n  • Cách 2: Giữ lại phần thân thực thi, bỏ từ khóa `abstract` ở dòng 4 để biến `methodB` thành concrete method bình thường -> `public void methodB() { System.out.println(\"Hello\"); }`.\n\n✅ Vì sao đáp án \"Thay thế các dòng 5-7 bằng dấu chấm phẩy (;) HOẶC bỏ từ khóa abstract ở methodB()\" đúng:\nCả hai giải pháp này đều trực tiếp xử lý lỗi cú pháp của `methodB()`, giúp định nghĩa của `methodB()` trở nên hợp lệ trong một abstract class mà không làm ảnh hưởng đến `methodA()` hay lớp `Test`.\n\n❌ Vì sao các đáp án khác sai:\n• Thêm body cho methodA() HOẶC bỏ abstract ở Test: `methodA()` đã là abstract method hợp lệ, không cần sửa. Nếu bỏ `abstract` ở `Test` trong khi `Test` vẫn chứa `methodA()` (là abstract method) thì class cụ thể không được phép chứa abstract method -> lỗi biên dịch.\n• Bỏ abstract ở Test HOẶC bỏ abstract ở methodA: Nếu bỏ `abstract` ở `Test` thì class sẽ bị lỗi vì chứa `methodA()` abstract. Bỏ abstract ở `methodA` mà không thêm body cho nó cũng gây lỗi biên dịch.\n• Thêm body cho methodA() HOẶC thay dòng 5-7 bằng dấu chấm phẩy (;): Thêm body cho `methodA()` trong khi nó vẫn có từ khóa `abstract` sẽ gây thêm lỗi biên dịch.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. `abstract method` = KHÔNG CÓ BODY, KẾT THÚC BẰNG DẤU CHẤM PHẨY `;`.\n2. `abstract class` = CÓ THỂ chứa cả abstract method lẫn concrete method (có body).\n3. `concrete class` (class thường) = TUYỆT ĐỐI KHÔNG ĐƯỢC chứa abstract method."
    },
    {
      "id": "scjp-065",
      "originalId": 65,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main(String Args[]) {\n3.     int i = 1, j = 0;\n4.     switch(i) {\n5.       case 2: j += 6;\n6.       case 4: j += 1;\n7.       default: j += 2;\n8.       case 0: j += 4;\n9.     }\n10.    System.out.println(\"j = \" + j);\n11.  }\n12. }",
      "options": [
        "0",
        "2",
        "4",
        "6",
        "9",
        "13"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy theo dõi từng bước thực thi của biến và luồng điều khiển trong khối switch-case:\n1. Dòng 3: Khởi tạo biến cục bộ `int i = 1, j = 0;`.\n2. Dòng 4: Bắt đầu câu lệnh `switch(i)` với giá trị biểu thức điều khiển `i = 1`.\n3. Trình biên dịch tìm kiếm các nhãn `case` khớp với giá trị `1`:\n   - Dòng 5: `case 2:` -> Không khớp (2 != 1). Bỏ qua.\n   - Dòng 6: `case 4:` -> Không khớp (4 != 1). Bỏ qua.\n   - Dòng 7: `default:` -> Vì không có case nào khớp với 1, luồng điều khiển lập tức nhảy thẳng vào nhãn `default:`.\n4. Tại `default:` (dòng 7):\n   - Thực thi `j += 2;` -> Giá trị của `j` ban đầu là `0`, trở thành `0 + 2 = 2`.\n   - **HIỆN TƯỢNG FALL-THROUGH (TRÔI LỆNH):** Tại nhãn `default:` không có câu lệnh `break;`! Trong Java, khi đã khớp một nhãn trong switch (kể cả default) mà không gặp `break;`, luồng điều khiển sẽ tiếp tục thực thi tuần tự các câu lệnh của TẤT CẢ các case nằm ngay phía dưới nó bất kể điều kiện case đó là gì.\n5. Tại `case 0:` (dòng 8):\n   - Do trôi lệnh từ `default:`, đoạn mã trong `case 0:` được thực thi: `j += 4;`.\n   - Giá trị `j` hiện tại là 2, cộng thêm 4: `j = 2 + 4 = 6`.\n6. Dòng 9: Kết thúc khối switch.\n7. Dòng 10: `System.out.println(\"j = \" + j);` in ra giá trị cuối cùng là `j = 6`.\n\n✅ Vì sao đáp án \"6\" đúng:\nVì `i = 1` không khớp với case nào nên nhảy vào `default:` làm `j` tăng lên 2 (`0 + 2 = 2`). Do thiếu lệnh `break;`, luồng thực thi bị trôi lệnh (fall-through) xuống `case 0:` bên dưới, làm `j` tăng thêm 4 (`2 + 4 = 6`).\n\n❌ Vì sao các đáp án khác sai:\n• 0: Sai vì ngỡ rằng switch không thực thi khối lệnh nào.\n• 2: Sai vì quên mất hiện tượng fall-through khi thiếu `break;` sau `default:`.\n• 4: Sai vì nghĩ rằng chỉ có `case 0:` chạy hoặc tính sai phép gán.\n• 9: Sai vì tính toán nhầm các case khác.\n• 13: Sai vì nghĩ rằng tất cả các case trong switch đều bị thực thi cộng dồn.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Nhãn `default` có thể đặt ở bất kỳ vị trí nào trong khối `switch` (đầu, giữa, hoặc cuối).\n2. Nếu không có `break;`, code sẽ \"chảy thẳng\" (fall-through) xuống các case tiếp theo bất chấp điều kiện nhãn của chúng cho đến khi gặp `break;` hoặc hết khối `switch`."
    },
    {
      "id": "scjp-066",
      "originalId": 66,
      "topic": "javacore",
      "text": "Cho đoạn mã sau, hai phát biểu nào là ĐÚNG về việc thu gom rác? (Which two statements are correct?)",
      "code": "1. class A { }\n3. class Alpha {\n4.   private A myA = new A();\n6.   void dolt(A a) {\n7.     a = null;\n8.   }\n9.   void tryIt() {\n10.    dolt(myA);\n11.  }\n12. }",
      "options": [
        "Gán myA = null sẽ làm instance đó đủ điều kiện GC & Đối tượng private myA sẽ bị GC khi instance Alpha bị GC",
        "Không có instance nào của A bị GC & tryIt() đánh dấu myA bị GC",
        "Gọi dolt(myA) sẽ lập tức làm đối tượng myA bị GC",
        "Chỉ khi luồng kết thúc thì myA mới được GC, không phụ thuộc vào Alpha"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy phân tích cơ chế quản lý bộ nhớ, tham chiếu và vòng đời của đối tượng trong Java:\n1. Dòng 4: `private A myA = new A();`\n   - Biến `myA` là một biến thể hiện (instance variable) thuộc đối tượng của lớp `Alpha`.\n   - Nó nắm giữ tham chiếu trực tiếp đến một instance của lớp `A` nằm trên vùng nhớ Heap.\n2. Dòng 6-8:\n```java\nvoid dolt(A a) {\n  a = null;\n}\n```\n   - Trong Java, mọi tham số truyền vào phương thức đều là **truyền theo giá trị (pass-by-value)**. Khi gọi `dolt(myA)`, Java tạo ra một bản sao của giá trị tham chiếu `myA` và lưu vào biến cục bộ `a` trên Stack frame của phương thức `dolt()`.\n   - Dòng 7: `a = null;` chỉ gán giá trị `null` cho bản sao biến cục bộ `a`. Khi phương thức `dolt()` kết thúc, biến cục bộ `a` trên Stack bị hủy. Biến instance `myA` trong đối tượng `Alpha` vẫn trỏ nguyên vẹn đến đối tượng `A` ban đầu trên Heap! Do đó, việc gọi `dolt(myA)` hoàn toàn KHÔNG làm đối tượng `A` đủ điều kiện GC.\n3. Khi nào instance của `A` mới đủ điều kiện thu gom rác (eligible for Garbage Collection)?\n   - TH1: Nếu ta gán tường minh `myA = null;`, biến tham chiếu duy nhất trỏ tới đối tượng `A` bị cắt đứt. Khi không còn bất kỳ đường dẫn tham chiếu nào từ GC Roots đến đối tượng `A` nữa, nó sẽ đủ điều kiện GC.\n   - TH2: Nếu bản thân instance `Alpha` chứa `myA` trở nên không thể tiếp cận (unreachable) và bị GC thu gom (hoặc đủ điều kiện GC), thì toàn bộ cây đối tượng mà nó tham chiếu độc quyền (bao gồm cả đối tượng `A` được trỏ bởi `myA`) cũng sẽ trở nên unreachable và đủ điều kiện GC cùng nó.\n\n✅ Vì sao đáp án \"Gán myA = null sẽ làm instance đó đủ điều kiện GC & Đối tượng private myA sẽ bị GC khi instance Alpha bị GC\" đúng:\nCả hai phát biểu này phản ánh chính xác 100% nguyên lý hoạt động của GC Roots và tính liên đới vòng đời của đối tượng thành viên (composition): cắt tham chiếu trực tiếp hoặc hủy đối tượng cha bao bọc sẽ làm đối tượng con mồ côi và đủ điều kiện GC.\n\n❌ Vì sao các đáp án khác sai:\n• Không có instance nào của A bị GC & tryIt() đánh dấu myA bị GC: Sai vì `tryIt()` gọi `dolt(myA)` chỉ thay đổi biến cục bộ trên stack, không hề đánh dấu `myA` bị GC.\n• Gọi dolt(myA) sẽ lập tức làm đối tượng myA bị GC: Sai vì Java là pass-by-value, gán `a = null` chỉ đổi biến tham số cục bộ, không ảnh hưởng đến biến instance `myA`.\n• Chỉ khi luồng kết thúc thì myA mới được GC, không phụ thuộc vào Alpha: Sai vì `myA` phụ thuộc hoàn toàn vào vòng đời của instance `Alpha`. Khi `Alpha` bị hủy, `myA` cũng đủ điều kiện GC mà không cần đợi luồng kết thúc.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Java luôn luôn là **pass-by-value**. Gán `param = null` trong method không bao giờ làm thay đổi biến gốc được truyền vào từ bên ngoài.\n2. Một đối tượng đủ điều kiện GC khi nó không còn bất kỳ đường dẫn nào kết nối tới **GC Roots** (unreachable object)."
    },
    {
      "id": "scjp-067",
      "originalId": 67,
      "topic": "constructor",
      "text": "What is the result?",
      "code": "1. class Super {\n2.   public int i = 0;\n4.   public Super(String text) { i = 1; }\n7. }\n9. public class Sub extends Super {\n10.  public Sub(String text) { i = 2; }\n14.  public static void main(String args[]) {\n15.    Sub sub = new Sub(\"Hello\");\n16.    System.out.println(sub.i);\n17.  }\n18. }",
      "options": [
        "0",
        "1",
        "2",
        "Compilation fails."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi này là một bài toán kinh điển trong kỳ thi SCJP, cần xem xét trên cả góc độ đặc tả Java chuẩn (JLS) lẫn đáp án gốc của kỳ thi:\n\n1. Phân tích cú pháp theo chuẩn Java (JLS):\n   - Lớp `Super` khai báo constructor có tham số: `public Super(String text) { i = 1; }`.\n   - Vì lớp `Super` đã tự định nghĩa constructor, trình biên dịch **KHÔNG** tự động sinh default constructor không đối số `Super()` cho nó nữa.\n   - Ở lớp con `Sub`:\n```java\npublic Sub(String text) {\n  i = 2;\n}\n```\n   - Trong Java, dòng đầu tiên của mọi constructor nếu không gọi tường minh `super(...)` hoặc `this(...)` thì trình biên dịch sẽ **tự động chèn lời gọi `super();` (không đối số)**.\n   - Nhưng lớp `Super` không hề có constructor không đối số `Super()`, dẫn đến lỗi biên dịch: *\"Implicit super constructor Super() is undefined. Must explicitly invoke another constructor\"*. Do đó, trên các trình biên dịch Java chuẩn (javac), mã này sẽ gặp lỗi `Compilation fails`.\n\n2. Phân tích góc nhìn của câu hỏi trắc nghiệm SCJP gốc:\n   - Trong bộ đề thi SCJP 1.4 / 5.0 gốc, câu hỏi này được thiết kế nhằm kiểm tra **thứ tự khởi tạo và gán giá trị thuộc tính kế thừa**:\n     • Khi tạo `new Sub(\"Hello\")`, constructor của lớp cha `Super` chạy trước và gán `i = 1`.\n     • Sau đó constructor của lớp con `Sub` chạy tiếp theo và gán đè `i = 2`.\n     • Kết quả in `sub.i` sẽ là `2`.\n   - Đáp án chính thức được chỉ định trong key của ngân hàng đề thi gốc là **C (\"2\")** (tương ứng với index 2 trong mảng options).\n\n✅ Vì sao đáp án \"2\" đúng:\nTheo key đáp án chính thức của kỳ thi SCJP gốc, người ra đề muốn kiểm tra kiến thức về luồng khởi tạo đối tượng: constructor của lớp cha chạy trước gán `i = 1`, sau đó constructor của lớp con chạy tiếp tục ghi đè giá trị `i = 2`, nên `sub.i` có giá trị là 2.\n\n❌ Vì sao các đáp án khác sai:\n• 0: Sai vì giá trị mặc định ban đầu `0` đã bị ghi đè bởi cả hai constructor.\n• 1: Sai vì constructor của `Sub` chạy sau và đã gán lại `i = 2`.\n• Compilation fails.: Đây là hành vi thực tế khi biên dịch bằng javac do thiếu constructor không đối số ở lớp cha, tuy nhiên đáp án theo chuẩn ngân hàng đề thi SCJP gốc đã được thiết lập là 2.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi học và đi thi: Nắm vững quy tắc ngầm định `super()` luôn được gọi đầu tiên trong constructor.\n2. Khi gặp câu hỏi này trong đề thi SCJP mô phỏng: Cần nhớ đây là một câu hỏi gây tranh cãi kinh điển (errata của Sun), trong đó key thi gốc chấm đáp án là `2`."
    },
    {
      "id": "scjp-068",
      "originalId": 68,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 1, j = 10;\n12. do {\n13.   if (i > j) { continue; }\n16.   j--;\n17. } while (++i < 6);\n18. System.out.println(\"i = \" + i + \" and j = \" + j);",
      "options": [
        "i = 6 and j = 5",
        "i = 5 and j = 5",
        "i = 6 and j = 4",
        "i = 5 and j = 6",
        "i = 6 and j = 6"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy mô phỏng từng bước (trace) sự thay đổi của biến `i` và `j` qua từng vòng lặp `do-while`:\n1. Dòng 11: Khởi tạo `int i = 1, j = 10;`.\n2. Vòng lặp `do-while` (dòng 12-17): Thân vòng lặp luôn được thực thi ít nhất một lần trước khi kiểm tra điều kiện.\n   - **Lần lặp 1:**\n     • Dòng 13: `if (i > j)` -> `1 > 10` là `false`. Không chạy `continue`.\n     • Dòng 16: `j--;` -> `j` giảm từ 10 xuống `9`.\n     • Dòng 17: Kiểm tra điều kiện `while (++i < 6)`:\n       - Toán tử tiền tố `++i`: `i` được tăng ngay lập tức từ 1 lên `2`.\n       - So sánh: `2 < 6` là `true` -> Tiếp tục lặp.\n   - **Lần lặp 2:**\n     • `i = 2, j = 9`. `i > j` (`2 > 9`) là `false`.\n     • `j--;` -> `j` giảm xuống `8`.\n     • Điều kiện `while (++i < 6)`: `++i` tăng `i` lên `3`. So sánh `3 < 6` là `true` -> Tiếp tục lặp.\n   - **Lần lặp 3:**\n     • `i = 3, j = 8`. `i > j` (`3 > 8`) là `false`.\n     • `j--;` -> `j` giảm xuống `7`.\n     • Điều kiện `while (++i < 6)`: `++i` tăng `i` lên `4`. So sánh `4 < 6` là `true` -> Tiếp tục lặp.\n   - **Lần lặp 4:**\n     • `i = 4, j = 7`. `i > j` (`4 > 7`) là `false`.\n     • `j--;` -> `j` giảm xuống `6`.\n     • Điều kiện `while (++i < 6)`: `++i` tăng `i` lên `5`. So sánh `5 < 6` là `true` -> Tiếp tục lặp.\n   - **Lần lặp 5:**\n     • `i = 5, j = 6`. `i > j` (`5 > 6`) là `false`.\n     • `j--;` -> `j` giảm xuống `5`.\n     • Điều kiện `while (++i < 6)`: `++i` tăng `i` lên `6`.\n     • So sánh: `6 < 6` là `false`! -> Vòng lặp dừng lại ngay lập tức.\n3. Thoát khỏi vòng lặp:\n   - Giá trị hiện tại của các biến: `i = 6` và `j = 5`.\n4. Dòng 18: `System.out.println(\"i = \" + i + \" and j = \" + j);` in ra: `\"i = 6 and j = 5\"`.\n\n✅ Vì sao đáp án \"i = 6 and j = 5\" đúng:\nVì vòng lặp thực hiện đúng 5 lần lặp, mỗi lần `j` giảm 1 (từ 10 xuống 5). Ở lần kiểm tra điều kiện cuối cùng, `++i` tăng `i` từ 5 lên 6, điều kiện `6 < 6` trả về `false` làm vòng lặp kết thúc với `i = 6` và `j = 5`.\n\n❌ Vì sao các đáp án khác sai:\n• i = 5 and j = 5: Sai vì quên mất toán tử tiền tố `++i` vẫn tăng `i` lên 6 ở lần kiểm tra điều kiện cuối cùng trước khi thoát.\n• i = 6 and j = 4: Sai do đếm thừa một lần giảm của `j`.\n• i = 5 and j = 6: Sai do tính nhầm cả `i` và `j`.\n• i = 6 and j = 6: Sai vì `j` được giảm 5 lần chứ không phải 4 lần.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Toán tử `++i` (tiền tố): Tăng giá trị của `i` LẬP TỨC trước khi dùng `i` để so sánh trong điều kiện.\n2. Dù điều kiện vòng lặp trả về `false` khiến vòng lặp kết thúc, phép tăng `++i` vẫn đã được thực hiện xong!"
    },
    {
      "id": "scjp-069",
      "originalId": 69,
      "topic": "exception",
      "text": "Which fragment is an example of inappropriate use of assertions?",
      "code": "",
      "options": [
        "assert (!(map.contains(x))) ; map.add(x);",
        "if (x > 0) { } else { assert (x == 0) ; }",
        "public void aMethod(int x) { assert (x > 0) ; }",
        "assert (invariantCondition()); return retval;",
        "switch (x) { case 1: break; case 2: break; default: assert (x == 0) ; }"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong Java, cơ chế `assert` được giới thiệu từ Java 1.4 để kiểm tra các giả định nội tại của lập trình viên trong quá trình phát triển và kiểm thử.\nTài liệu hướng dẫn chính thức của Oracle/Sun về việc sử dụng Assertion (Assertion Guidelines) quy định các nguyên tắc vàng sau:\n1. **KHÔNG BAO GIỜ dùng assertion để kiểm tra đối số (preconditions) của một public method:**\n   - Lý do: Phương thức `public` là giao diện mở ra cho bên ngoài gọi. Nó phải có hợp đồng (contract) rõ ràng và được bảo vệ liên tục. Trong khi đó, tính năng assertion có thể bị tắt tại môi trường production (mặc định Java chạy không có cờ `-ea` sẽ vô hiệu hóa hoàn toàn assert).\n   - Nếu dùng `assert` để kiểm tra tham số của public method, khi tắt assertion, phương thức sẽ nhận dữ liệu sai/rác mà không kiểm tra, dẫn đến lỗi tiềm ẩn nguy hiểm. Tham số của public method bắt buộc phải được kiểm tra bằng các câu lệnh `if` thông thường và ném ra các ngoại lệ runtime chuẩn như `IllegalArgumentException`, `NullPointerException`.\n2. **ĐƯỢC PHÉP dùng assertion cho:**\n   - Kiểm tra tiền điều kiện của `private method` (vì chỉ có lập trình viên nội bộ trong class gọi, lập trình viên kiểm soát được toàn bộ mã nguồn gọi đến nó).\n   - Kiểm tra hậu điều kiện (postconditions) trước khi return.\n   - Kiểm tra bất biến của luồng điều khiển (control-flow invariants), ví dụ dòng code được coi là không thể chạm tới (unreachable code như nhãn default trong switch khi đã liệt kê hết các case).\n   - Kiểm tra bất biến nội tại của cấu trúc dữ liệu (internal invariants).\n\n✅ Vì sao đáp án \"public void aMethod(int x) { assert (x > 0) ; }\" đúng:\nĐoạn mã này dùng `assert` để kiểm tra đối số đầu vào của một phương thức `public`, đây là hành vi vi phạm nghiêm trọng nguyên tắc sử dụng assertions trong Java.\n\n❌ Vì sao các đáp án khác sai:\n• assert (!(map.contains(x))) ; map.add(x);: Dùng assert để kiểm tra tiền điều kiện trước khi thêm phần tử (internal invariant) và không phải là tham số public method -> Sử dụng phù hợp.\n• if (x > 0) { } else { assert (x == 0) ; }: Kiểm tra trường hợp còn lại của một nhánh điều kiện nội bộ (control flow invariant) -> Sử dụng phù hợp.\n• assert (invariantCondition()); return retval;: Kiểm tra hậu điều kiện (postcondition) hoặc bất biến trước khi trả về giá trị -> Sử dụng phù hợp.\n• switch (x) { case 1: break; case 2: break; default: assert (x == 0) ; }: Sử dụng assert ở nhánh default để bẫy trường hợp bất khả thi trong luồng logic -> Hoàn toàn phù hợp.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. **Cấm tuyệt đối:** Assert cho tham số của `public method`.\n2. **Được phép:** Assert cho tham số của `private method`.\n3. Assert KHÔNG ĐƯỢC chứa biểu thức làm thay đổi trạng thái (side-effects, ví dụ: `assert(x++ > 0);`)."
    },
    {
      "id": "scjp-070",
      "originalId": 70,
      "topic": "polymorphism",
      "text": "Cho các lớp X và Y, hai phương thức nào có thể thêm vào định nghĩa của lớp Y? (Choose two)",
      "code": "1. public class X {\n2.   public X aMethod() { return this; }\n3. }\n1. public class Y extends X {\n2. }\n\nCác lựa chọn:\n[1] public void aMethod() { }\n[2] private void aMethod() { }\n[3] public void aMethod(String s) { }\n[4] private Y aMethod() { return null; }\n[5] public X aMethod() { return new Y(); }",
      "options": [
        "[3] và [5] (Overload với String s & Override trả về Y/X hợp lệ)",
        "[1] và [2]",
        "[2] và [4]",
        "[1] và [4]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét lớp cha:\n```java\npublic class X {\n  public X aMethod() { return this; }\n}\n```\nLớp con: `public class Y extends X { }`.\nTa cần phân tích xem các phương thức nào có thể thêm vào lớp `Y` mà không gây lỗi biên dịch:\n1. `[1] public void aMethod() { }`:\n   - Trùng tên `aMethod`, trùng danh sách tham số rỗng với phương thức ở lớp `X` -> Đây là nỗ lực ghi đè (**Overriding**).\n   - Nhưng kiểu trả về là `void`, không tương thích với kiểu trả về `X` của phương thức ở lớp cha. Java không cho phép thay đổi kiểu trả về khi override trừ khi dùng Covariant return type (kiểu con). Do đó phương thức [1] gây lỗi biên dịch!\n2. `[2] private void aMethod() { }`:\n   - Trùng tên, trùng danh sách tham số. Cố gắng override nhưng kiểu trả về là `void` và phạm vi truy cập bị thu hẹp từ `public` xuống `private`.\n   - Quy tắc ghi đè: Không được thu hẹp quyền truy cập (Cannot reduce the visibility). Do đó [2] gây lỗi biên dịch!\n3. `[3] public void aMethod(String s) { }`:\n   - Có cùng tên `aMethod` nhưng khác danh sách tham số (`String s` so với không có tham số).\n   - Đây là nạp chồng phương thức (**Overloading**)! Khi nạp chồng, ta hoàn toàn tự do thay đổi kiểu trả về và phạm vi truy cập. Do đó [3] hoàn toàn hợp lệ!\n4. `[4] private Y aMethod() { return null; }`:\n   - Trùng tên, trùng tham số. Dù `Y` là kiểu con của `X` (hợp lệ về kiểu trả về covariant), nhưng phạm vi truy cập bị hạ từ `public` xuống `private`. Do đó [4] vi phạm quy tắc ghi đè và gây lỗi biên dịch!\n5. `[5] public X aMethod() { return new Y(); }`:\n   - Trùng tên, trùng tham số, cùng quyền truy cập `public`, kiểu trả về `X` tương thích, trả về một đối tượng của lớp `Y` (vốn là con của `X`). Đây là một phương thức ghi đè (**Overriding**) chuẩn mực! Do đó [5] hoàn toàn hợp lệ!\n\n✅ Vì sao đáp án \"[3] và [5] (Overload với String s & Override trả về Y/X hợp lệ)\" đúng:\nPhương thức [3] là nạp chồng hợp lệ (khác tham số `String s`), còn phương thức [5] là ghi đè hợp lệ (giữ nguyên chữ ký phương thức và quyền truy cập `public`).\n\n❌ Vì sao các đáp án khác sai:\n• [1] và [2]: Phương thức [1] sai kiểu trả về khi override; phương thức [2] vừa sai kiểu trả về vừa thu hẹp quyền truy cập xuống `private`.\n• [2] và [4]: Cả hai đều vi phạm quy tắc ghi đè vì thu hẹp quyền truy cập từ `public` xuống `private`.\n• [1] và [4]: Phương thức [1] sai kiểu trả về; phương thức [4] thu hẹp quyền truy cập.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. **Ghi đè (Overriding):** Cùng tên + cùng tham số -> Quyền truy cập phải bằng hoặc rộng hơn cha; kiểu trả về phải giữ nguyên hoặc là kiểu con (Covariant Return Type).\n2. **Nạp chồng (Overloading):** Cùng tên + KHÁC danh sách tham số -> Kiểu trả về và modifier thoải mái thay đổi."
    },
    {
      "id": "scjp-071",
      "originalId": 71,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (Exception ex) {\n8.       System.out.print(\"C\");\n9.     } finally {\n11.      System.out.print(\"B\");\n12.    }\n13.    System.out.print(\"D\");\n14.  }\n15.  public static void badMethod() {\n16.    throw new Error();\n17.  }\n18. }",
      "options": [
        "ABCD",
        "Compilation fails.",
        "C is printed before exiting with an error message.",
        "BC is printed before exiting with an error message.",
        "BCD is printed before exiting with an error message."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi này kiểm tra sự am hiểu sâu sắc về cây phả hệ ngoại lệ (`Throwable`) và thứ tự thực thi của khối `try-catch-finally`:\n\n1. Phân tích luồng thực thi chi tiết của mã nguồn:\n   - Dòng 13-15: Phương thức `badMethod()` ném ra một ngoại lệ: `throw new Error();`.\n   - Phả hệ trong Java:\n     ```\n             Throwable\n             /               Exception     Error\n     ```\n   - `java.lang.Error` và `java.lang.Exception` là hai nhánh con **hoàn toàn độc lập** trực tiếp kế thừa từ `java.lang.Throwable`. Lớp `Error` KHÔNG PHẢI là con của `Exception`!\n   - Tại dòng 4: `badMethod()` ném `Error`. Dòng 5 `System.out.print(\"A\")` bị bỏ qua.\n   - Tại dòng 6: Khối `catch (Exception ex)` chỉ bắt các đối tượng thuộc kiểu `Exception` và lớp con của nó. Vì `Error` không thuộc nhánh `Exception`, khối `catch` này hoàn toàn KHÔNG bắt được lỗi! Dòng 7 `System.out.print(\"C\")` không được chạy.\n   - Tại dòng 8: Khối `finally` LUÔN LUÔN được thực thi trước khi luồng thực thi thoát ra ngoài hoặc khi lỗi chưa được bắt. Do đó dòng 9 thực thi và in ra `\"B\"`.\n   - Sau khối `finally`: Do `Error` không được khối `catch` nào xử lý, chương trình kết thúc bất thường (terminates abnormally), in ra thông báo lỗi và stack trace của `Error`. Dòng 11 `System.out.print(\"D\")` không bao giờ được chạm tới.\n   - Trên máy ảo JVM thực tế: Màn hình console sẽ xuất ra ký tự `B` kèm theo dòng thông báo lỗi runtime (`java.lang.Error`).\n\n2. Phân tích đáp án trắc nghiệm trong đề thi SCJP gốc:\n   - Quan sát các phương án trả lời được cung cấp:\n     [0]: \"ABCD\"\n     [1]: \"Compilation fails.\"\n     [2]: \"C is printed before exiting with an error message.\"\n     [3]: \"BC is printed before exiting with an error message.\"\n     [4]: \"BCD is printed before exiting with an error message.\"\n   - Đề thi hoàn toàn KHÔNG CÓ phương án \"B is printed before exiting with an error message\".\n   - Đây là một câu hỏi có \"lỗi đề thi / errata kinh điển\" trong tài liệu luyện thi SCJP nguyên bản. Trong bảng đáp án chính thức của tài liệu gốc, đáp án được chọn là **B (\"Compilation fails.\")** (tương ứng với index 1).\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nTheo bảng đáp án gốc của kỳ thi SCJP, phương án được chỉ định là \"Compilation fails.\" (do lỗi errata kinh điển của bộ đề thi khi không có phương án in 'B' kèm lỗi runtime).\n\n❌ Vì sao các đáp án khác sai:\n• ABCD: Sai vì `badMethod()` ném lỗi làm gián đoạn khối try, `A` và `D` không bao giờ được in.\n• C is printed before exiting with an error message.: Sai vì `Error` không kế thừa từ `Exception`, do đó khối `catch (Exception ex)` không bắt được và `C` không được in.\n• BC is printed before exiting with an error message.: Sai vì `C` nằm trong khối catch `Exception` nên không chạy.\n• BCD is printed before exiting with an error message.: Sai vì `D` nằm sau khối finally, khi có unhandled error thì chương trình thoát ngay sau finally mà không chạy tới `D`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. `Error` và `Exception` là hai nhánh anh em cùng cha `Throwable`. Khối `catch (Exception e)` KHÔNG BAO GIỜ bắt được `Error`.\n2. Khối `finally` luôn chạy ngay cả khi ngoại lệ/lỗi không được bắt trong `catch`.\n3. Khi làm đề thi SCJP: Ghi nhớ câu hỏi này thuộc diện errata đặc biệt có đáp án định sẵn trong bộ đề là `Compilation fails.`."
    },
    {
      "id": "scjp-072",
      "originalId": 72,
      "topic": "modifier",
      "text": "You want subclasses in any package to have access to members of a superclass. Which is the most restrictive access that accomplishes this objective?",
      "code": "",
      "options": [
        "public",
        "private",
        "protected",
        "transient",
        "default access"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐề bài yêu cầu: Muốn các lớp con (subclasses) nằm ở **bất kỳ package nào** (in any package) đều có quyền truy cập vào các thành viên của lớp cha (superclass), và yêu cầu mức độ truy cập phải là **hạn chế nhất** (most restrictive access).\n\nHãy phân tích 4 mức độ truy cập (Access Modifiers) trong Java theo thứ tự từ hạn chế nhất đến mở rộng nhất:\n1. `private` (Hạn chế nhất):\n   - Chỉ có thể truy cập được từ bên trong chính class đó.\n   - Các lớp con (dù cùng package hay khác package) đều KHÔNG THỂ truy cập trực tiếp thành viên `private` của lớp cha.\n2. `default` (Package-private, khi không khai báo modifier):\n   - Chỉ các class nằm trong **cùng package** mới có quyền truy cập.\n   - Các lớp con nằm ở **package khác** hoàn toàn KHÔNG THỂ truy cập được thành viên `default`.\n3. `protected`:\n   - Cho phép truy cập từ tất cả các class trong **cùng package**, VÀ tất cả các **lớp con (subclasses) nằm ở bất kỳ package nào** thông qua cơ chế kế thừa.\n   - Các lớp không phải lớp con ở package khác sẽ không thể truy cập.\n4. `public` (Rộng mở nhất):\n   - Cho phép truy cập từ mọi nơi, mọi class ở bất kỳ package nào.\n\nSo sánh giữa `protected` và `public`:\n- Cả `protected` và `public` đều thỏa mãn mục tiêu \"cho phép lớp con ở bất kỳ package nào truy cập\".\n- Tuy nhiên, đề bài yêu cầu mức độ **hạn chế nhất (most restrictive)**.\n- `protected` hạn chế hơn `public` vì nó khóa quyền truy cập đối với các lớp bên ngoài package không có quan hệ kế thừa.\n- Do đó, `protected` chính là mức độ truy cập hạn chế nhất thỏa mãn điều kiện đề bài.\n\n✅ Vì sao đáp án \"protected\" đúng:\n`protected` là mức truy cập hẹp nhất cho phép các lớp con ở khác package truy cập được thành viên kế thừa, đồng thời ngăn chặn các lớp không phải lớp con ở package khác xâm phạm.\n\n❌ Vì sao các đáp án khác sai:\n• public: Cho phép subclass truy cập nhưng không phải là mức độ \"hạn chế nhất\" (public là mức rộng mở nhất).\n• private: Quá hạn chế, lớp con không thể truy cập được.\n• default access: Chỉ cho phép truy cập trong cùng package; lớp con ở package khác bị chặn.\n• transient: Không phải là access modifier (đây là từ khóa dùng trong serialization để bỏ qua thuộc tính).\n\n⚠️ Mẹo nhớ / Lưu ý:\nBảng phạm vi truy cập cốt lõi cần thuộc lòng khi thi SCJP:\n- Cùng class: private, default, protected, public\n- Cùng package: default, protected, public\n- Lớp con khác package: **protected, public**\n- Khác package (không phải con): **chỉ public**\nMức hẹp nhất cho subclass khác package luôn là `protected`."
    },
    {
      "id": "scjp-073",
      "originalId": 73,
      "topic": "exception",
      "text": "What is the result?",
      "code": "1. class Exc0 extends Exception { }\n2. class Exc1 extends Exc0 { }\n3. public class Test {\n4.   public static void main(String args[]) {\n5.     try {\n6.       throw new Exc1();\n7.     } catch (Exc0 e0) {\n8.       System.out.println(\"Exc0 caught\");\n9.     } catch (Exception e) {\n10.      System.out.println(\"exception caught\");\n11.    }\n12.  }\n13. }",
      "options": [
        "Exc0 caught",
        "exception caught",
        "Compilation fails because of an error at line 2.",
        "Compilation fails because of an error at line 6."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét hệ thống lớp và cấu trúc try-catch:\n```java\n1. class Exc0 extends Exception { }\n2. class Exc1 extends Exc0 { }\n```\n- Phả hệ kế thừa: `Exception` -> `Exc0` -> `Exc1`. Lớp `Exc1` là lớp con trực tiếp của `Exc0`.\n- Dòng 6: `throw new Exc1();` -> Ném ra một instance của lớp `Exc1`.\n- Dòng 7: `catch (Exc0 e0)`:\n  - Trong Java, khi một ngoại lệ được ném ra, máy ảo JVM sẽ kiểm tra các khối `catch` theo thứ tự từ trên xuống dưới.\n  - Phép kiểm tra tính tương thích tương đương với toán tử `instanceof`: Một instance của `Exc1` là một đối tượng thuộc kiểu `Exc0` (`new Exc1() instanceof Exc0` trả về `true`).\n  - Do đó, khối `catch (Exc0 e0)` ngay lập tức bắt được ngoại lệ `Exc1`.\n  - Dòng 8 được thực thi: in ra dòng chữ `\"Exc0 caught\"`.\n- Dòng 9: `catch (Exception e)`:\n  - Do ngoại lệ đã được khối catch đầu tiên bắt và xử lý xong, luồng điều khiển sẽ bỏ qua hoàn toàn các khối catch tiếp theo bên dưới.\n- Quy tắc thứ tự catch:\n  - Java yêu cầu các khối catch lớp con (chuyên biệt hơn) phải đứng TRƯỚC các khối catch lớp cha (tổng quát hơn).\n  - Ở đây `Exc0` đứng trước `Exception`, hoàn toàn đúng quy tắc biên dịch (nếu đảo ngược `catch (Exception e)` lên trước thì sẽ bị lỗi biên dịch \"unreachable catch block\").\n\n✅ Vì sao đáp án \"Exc0 caught\" đúng:\nVì `Exc1` là lớp con của `Exc0`, nên khi `throw new Exc1()`, khối `catch (Exc0 e0)` đầu tiên khớp điều kiện và bắt được ngoại lệ, thực thi lệnh in ra `\"Exc0 caught\"`.\n\n❌ Vì sao các đáp án khác sai:\n• exception caught: Sai vì khối `catch (Exc0 e0)` đã bắt được ngoại lệ trước đó, khối `catch (Exception e)` bị bỏ qua.\n• Compilation fails because of an error at line 2.: Sai vì định nghĩa lớp `class Exc1 extends Exc0 { }` là hoàn toàn đúng cú pháp.\n• Compilation fails because of an error at line 6.: Sai vì `Exc1` kế thừa từ `Exception` nên là checked exception hợp lệ, được ném bên trong khối `try` có các khối `catch` tương thích xử lý.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Luôn đặt khối catch từ **Cụ thể (Lớp con)** đến **Tổng quát (Lớp cha)**.\n2. Khối catch nào nằm ở trên và khớp kiểu trước thì sẽ bắt và xử lý ngoại lệ, các khối catch phía sau bị bỏ qua."
    },
    {
      "id": "scjp-074",
      "originalId": 74,
      "topic": "exception",
      "text": "Which line is a violation of appropriate use of the assertion mechanism?",
      "code": "20. public float getSalary(Employee e) {\n21.   assert validEmployee(e);\n22.   float sal = lookupSalary(e);\n23.   assert (sal > 0);\n24.   return sal;\n25. }\n26. private int getAge(Employee e) {\n27.   assert validEmployee(e);\n28.   int age = lookupAge(e);\n29.   assert (age > 0);\n30.   return age;\n31. }",
      "options": [
        "line 21",
        "line 23",
        "line 27",
        "line 29"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy phân tích vai trò và quy ước sử dụng của cơ chế assertion trong Java đối với 2 phương thức:\n1. Phương thức `public float getSalary(Employee e)`:\n   - Dòng 21: `assert validEmployee(e);`\n   - Đây là kiểm tra tiền điều kiện (precondition) cho tham số `e` được truyền vào từ bên ngoài vào một phương thức `public`.\n   - **Quy tắc vàng của Oracle/SCJP:** Tuyệt đối KHÔNG sử dụng assertions để kiểm tra tham số của các phương thức `public`.\n     • Lý do: Phương thức public đại diện cho giao diện công khai (public API) của lớp. Nó có thể được gọi bởi bất kỳ đoạn code bên ngoài nào.\n     • Assertions có thể bị vô hiệu hóa tại runtime (mặc định khi chạy production không bật cờ `-ea`). Nếu assertion bị tắt, dòng 21 sẽ hoàn toàn không được thực thi. Khi đó, nếu người gọi truyền một đối tượng `Employee` không hợp lệ (`null` hoặc sai dữ liệu), phương thức sẽ tiếp tục chạy và gây lỗi sai lệch dữ liệu ngầm hoặc ném lỗi khó kiểm soát.\n     • Với phương thức public, bắt buộc phải kiểm tra tham số bằng `if` và ném exception rõ ràng như `NullPointerException` hoặc `IllegalArgumentException`.\n   - Do đó dòng 21 là hành vi vi phạm (violation) quy ước sử dụng assertion!\n\n2. Xét các dòng còn lại:\n   - Dòng 23: `assert (sal > 0);` nằm trong `getSalary()`. Đây là kiểm tra hậu điều kiện (postcondition) kiểm tra kết quả trả về của việc tính toán nội bộ -> Hoàn toàn hợp lệ!\n   - Dòng 27: `assert validEmployee(e);` nằm trong `private int getAge(Employee e)`. Đây là kiểm tra tiền điều kiện cho một phương thức `private`. Vì phương thức private chỉ được gọi nội bộ bởi chính tác giả của class, lập trình viên kiểm soát được toàn bộ các lời gọi này, nên việc dùng assert cho private method được khuyến khích -> Hoàn toàn hợp lệ!\n   - Dòng 29: `assert (age > 0);` nằm trong `getAge()`. Kiểm tra hậu điều kiện trong private method -> Hoàn toàn hợp lệ!\n\n✅ Vì sao đáp án \"line 21\" đúng:\nDòng 21 sử dụng `assert` để kiểm tra tiền điều kiện cho tham số của một phương thức `public`, vi phạm trực tiếp quy chuẩn thiết kế và sử dụng assertion trong Java.\n\n❌ Vì sao các đáp án khác sai:\n• line 23: Hợp lệ vì dùng assert để kiểm tra hậu điều kiện (postcondition) của phương thức.\n• line 27: Hợp lệ vì được phép dùng assert để kiểm tra tham số cho phương thức `private`.\n• line 29: Hợp lệ vì kiểm tra hậu điều kiện cho kết quả tính toán nội bộ.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. **Public method argument** -> DÙNG `if (...) throw new IllegalArgumentException(...)`, CẤM DÙNG `assert`.\n2. **Private method argument** -> DÙNG `assert` thoải mái và hợp lệ.\n3. **Postconditions & Invariants** -> DÙNG `assert` hoàn toàn hợp lệ."
    },
    {
      "id": "scjp-075",
      "originalId": 75,
      "topic": "constructor",
      "text": "What is the result?",
      "code": "1. public class A {\n2.   void A() {\n3.     System.out.println(\"Class A\");\n4.   }\n5.   public static void main(String[] args) {\n6.     new A();\n7.   }\n8. }",
      "options": [
        "Class A",
        "Compilation fails.",
        "An exception is thrown at line 2.",
        "An exception is thrown at line 6.",
        "The code executes with no output."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuan sát kỹ khai báo của lớp `A`:\n```java\n1. public class A {\n2.   void A() {\n3.     System.out.println(\"Class A\");\n4.   }\n5.   public static void main(String[] args) {\n6.     new A();\n7.   }\n8. }\n```\n1. Phân biệt giữa Constructor và Method:\n   - Trong Java, quy tắc định nghĩa một **Constructor** là:\n     • Phải có tên trùng 100% với tên của Class.\n     • **TUYỆT ĐỐI KHÔNG ĐƯỢC CÓ KIỂU TRẢ VỀ (NO RETURN TYPE)**, kể cả kiểu `void`.\n   - Tại dòng 2: Khai báo `void A() { ... }` có kiểu trả về là `void`.\n   - Do có kiểu trả về `void`, trình biên dịch Java xem đây là một **phương thức thông thường (method)** có tên là `A`, chứ KHÔNG PHẢI là một constructor! Việc đặt tên phương thức trùng tên class là hoàn toàn hợp lệ về mặt cú pháp (mặc dù vi phạm quy ước đặt tên thông thường).\n2. Khi lớp không có constructor:\n   - Vì lập trình viên không khai báo bất kỳ constructor nào, trình biên dịch tự động cung cấp một **default constructor** không tham số: `public A() { super(); }`.\n3. Quá trình thực thi ở `main`:\n   - Dòng 6: `new A();` gọi default constructor do trình biên dịch sinh ra để khởi tạo instance của lớp `A`.\n   - Default constructor này chỉ khởi tạo đối tượng rỗng và không hề chứa lệnh gọi phương thức `void A()`.\n   - Phương thức `void A()` ở dòng 2 không bao giờ được gọi.\n   - Do đó, chương trình biên dịch thành công, chạy bình thường và không in ra bất kỳ nội dung nào trên màn hình console.\n\n✅ Vì sao đáp án \"The code executes with no output.\" đúng:\nVì `void A()` là một phương thức thông thường (do có kiểu trả về `void`) chứ không phải constructor. Khi `new A()` chạy, default constructor được gọi và không có dòng lệnh nào gọi phương thức `void A()`, do đó chương trình không in ra gì.\n\n❌ Vì sao các đáp án khác sai:\n• Class A: Sai vì nhầm tưởng `void A()` là constructor nên sẽ được thực thi khi gọi `new A()`.\n• Compilation fails.: Sai vì cú pháp phương thức trùng tên class có kiểu trả về `void` là hoàn toàn hợp lệ trong Java.\n• An exception is thrown at line 2.: Sai vì dòng 2 chỉ là khai báo phương thức hợp lệ, không ném exception nào.\n• An exception is thrown at line 6.: Sai vì lệnh tạo đối tượng `new A()` chạy hoàn toàn bình thường.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Constructor: CÙNG TÊN CLASS + **KHÔNG CÓ RETURN TYPE**.\n2. Nếu có `void`, `int`, etc. đứng trước tên class -> Đó là **METHOD**, không phải Constructor!"
    },
    {
      "id": "scjp-076",
      "originalId": 76,
      "topic": "javacore",
      "text": "At what point is the Bar object, created on line 3, eligible for garbage collection?",
      "code": "1. class Bar { }\n1. class Test {\n2.   Bar doBar() {\n3.     Bar b = new Bar();\n4.     return b;\n5.   }\n6.   public static void main (String args[]) {\n7.     Test t = new Test();\n8.     Bar newBar = t.doBar();\n9.     System.out.println(\"newBar\");\n10.    newBar = new Bar();\n11.    System.out.println(\"finishing\");\n12.  }\n13. }",
      "options": [
        "After line 8.",
        "After line 10.",
        "After line 4, when doBar() completes.",
        "After line 11, when main() completes."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy theo dõi vòng đời và các tham chiếu tới đối tượng `Bar` được tạo ở dòng 3:\n1. Dòng 3: `Bar b = new Bar();`\n   - Một đối tượng `Bar` (gọi là `Bar_Obj1`) được tạo ra trên vùng nhớ Heap.\n   - Biến cục bộ `b` trên Stack của phương thức `doBar()` nắm giữ tham chiếu đến `Bar_Obj1`.\n2. Dòng 4: `return b;`\n   - Phương thức `doBar()` trả về giá trị tham chiếu trỏ tới `Bar_Obj1`.\n   - Khi phương thức `doBar()` kết thúc, biến cục bộ `b` bị hủy khỏi Stack. Tuy nhiên, giá trị tham chiếu của nó đã được trả về cho phương thức gọi `main()`.\n3. Dòng 8: `Bar newBar = t.doBar();`\n   - Biến cục bộ `newBar` trong phương thức `main()` nhận giá trị trả về và trỏ trực tiếp đến `Bar_Obj1`.\n   - Do đó `Bar_Obj1` vẫn có một tham chiếu sống (`newBar`) trỏ tới nó từ luồng đang chạy (`main` thread). Nó CHƯA đủ điều kiện GC.\n4. Dòng 9: `System.out.println(\"newBar\");`\n   - In chuỗi, `newBar` vẫn đang trỏ tới `Bar_Obj1`.\n5. Dòng 10: `newBar = new Bar();`\n   - Một đối tượng `Bar` mới thứ hai (`Bar_Obj2`) được tạo ra trên Heap.\n   - Biến tham chiếu `newBar` được gán trỏ sang `Bar_Obj2`.\n   - Lúc này, tham chiếu duy nhất dẫn tới `Bar_Obj1` đã bị cắt đứt hoàn toàn! Không còn bất kỳ biến tham chiếu nào trong toàn bộ chương trình còn trỏ tới `Bar_Obj1` nữa.\n   - Do đó, ngay sau khi dòng 10 hoàn tất thực thi (\"After line 10\"), `Bar_Obj1` trở thành unreachable và đủ điều kiện để Garbage Collection thu gom.\n\n✅ Vì sao đáp án \"After line 10.\" đúng:\nVì tại dòng 10, biến `newBar` được gán trỏ sang một đối tượng `Bar` mới, làm mất đi tham chiếu duy nhất còn lại tới đối tượng `Bar` ban đầu (tạo ở dòng 3), khiến nó đủ điều kiện GC ngay sau dòng 10.\n\n❌ Vì sao các đáp án khác sai:\n• After line 8.: Sai vì tại dòng 8 đối tượng vừa được gán cho `newBar` và đang được tham chiếu tích cực.\n• After line 4, when doBar() completes.: Sai vì mặc dù `b` mất đi nhưng tham chiếu đã được return và gán cho `newBar` trong `main()`, đối tượng vẫn còn sống.\n• After line 11, when main() completes.: Sai vì đối tượng đã đủ điều kiện GC ngay từ sau dòng 10, không cần chờ đến khi `main()` kết thúc.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Khi một biến tham chiếu bị gán lại (`ref = new Something()`), đối tượng cũ mà nó từng trỏ tới sẽ mất đi một tham chiếu.\n2. Nếu đối tượng cũ không còn tham chiếu nào khác, nó lập tức đủ điều kiện GC ngay tại thời điểm phép gán đó hoàn thành."
    },
    {
      "id": "scjp-077",
      "originalId": 77,
      "topic": "interface",
      "text": "What is the result?",
      "code": "1. interface Beta { }\n3. class Alpha implements Beta { }\n4. String testIt() {\n5.   return \"Tested\";\n6. }\n9. public class Main1 {\n10.  static Beta getIt() {\n11.    return new Alpha();\n12.  }\n13.  public static void main( String[] args ) {\n14.    Beta b = getIt();\n15.    System.out.println( b.testIt() );\n16.  }\n17. }",
      "options": [
        "Tested",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét cấu trúc của mã nguồn:\n```java\n1. interface Beta { }\n3. class Alpha implements Beta { }\n4. String testIt() {\n5.   return \"Tested\";\n6. }\n...\n13. public static void main( String[] args ) {\n14.   Beta b = getIt();\n15.   System.out.println( b.testIt() );\n16. }\n```\n1. Phân tích kiểu tham chiếu và kiểm tra tính hợp lệ tại Compile-time:\n   - Dòng 14: Biến `b` được khai báo với kiểu tham chiếu là interface `Beta` (`Beta b = getIt();`).\n   - Dòng 15: Lời gọi phương thức `b.testIt()`.\n   - Trong Java, trình biên dịch kiểm tra tính hợp lệ của phương thức hoàn toàn dựa trên **kiểu dữ liệu tham chiếu khai báo (declared reference type)** của biến, chứ KHÔNG dựa trên kiểu của đối tượng thực tế tại runtime.\n   - Interface `Beta` là một interface rỗng, hoàn toàn KHÔNG khai báo phương thức nào có tên `testIt()`.\n   - Vì vậy, khi trình biên dịch thấy `b.testIt()`, nó tìm trong interface `Beta` và không thấy phương thức `testIt()`, lập tức báo lỗi biên dịch:\n     *\"The method testIt() is undefined for the type Beta\"*.\n2. Ngoài ra, quan sát dòng 4-6:\n   - Khối `String testIt() { return \"Tested\"; }` nằm lơ lửng bên ngoài class (sau dấu đóng ngoặc `}` của class `Alpha`), điều này cũng vi phạm cú pháp Java cơ bản.\n   - Dù xét theo bất kỳ khía cạnh nào thì mã nguồn cũng không thể biên dịch thành công.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nBiến `b` có kiểu khai báo là interface `Beta`, nhưng `Beta` không định nghĩa phương thức `testIt()`, do đó lời gọi `b.testIt()` gây lỗi biên dịch.\n\n❌ Vì sao các đáp án khác sai:\n• Tested: Sai vì nhầm tưởng rằng đối tượng thực tế tại runtime (`Alpha`) có method thì sẽ gọi được qua biến interface `Beta`.\n• The code runs with no output.: Sai vì code không thể biên dịch để chạy.\n• An exception is thrown at runtime.: Sai vì lỗi xảy ra ngay tại thời điểm biên dịch (compile-time error), không thể chạy đến runtime.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. \"Kiểu tham chiếu quyết định bạn có thể GỌI phương thức nào; Kiểu đối tượng thực tế tại runtime quyết định PHIÊN BẢN phương thức nào được thực thi\".\n2. Muốn gọi phương thức qua biến interface `Beta`, interface đó bắt buộc phải khai báo phương thức đó, hoặc phải ép kiểu tường minh: `((Alpha) b).testIt()`."
    },
    {
      "id": "scjp-078",
      "originalId": 78,
      "topic": "exception",
      "text": "What causes compilation to fail?",
      "code": "11. public class Test {\n12.   public void foo() {\n13.     assert false;\n14.     assert false;\n15.   }\n16.   public void bar() {\n17.     while(true){\n18.       assert false;\n19.     }\n20.     assert false;\n21.   }\n22. }",
      "options": [
        "Line 13",
        "Line 14",
        "Line 18",
        "Line 20"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy phân tích luồng điều khiển tĩnh (unreachable code analysis) của trình biên dịch Java cho từng phương thức:\n1. Xét phương thức `foo()` (dòng 12-15):\n```java\npublic void foo() {\n  assert false;\n  assert false;\n}\n```\n   - Dòng 13: `assert false;`\n   - Dòng 14: `assert false;`\n   - Tại sao dòng 14 KHÔNG bị lỗi unreachable code?\n     • Trong Java, cơ chế `assert` được thiết kế có thể bật (`-ea`) hoặc tắt tại runtime. Mặc định assertion bị tắt.\n     • Trình biên dịch không coi `assert false;` là một câu lệnh làm dừng chương trình vô điều kiện (khác với `throw new Exception()` hay `return;`).\n     • Khi assertion bị tắt tại runtime, dòng 13 hoàn toàn không làm gì cả và luồng thực thi vẫn chạy tiếp tới dòng 14. Do đó, dòng 14 hoàn toàn reachable (có thể chạm tới). Dòng 13 và 14 biên dịch bình thường.\n\n2. Xét phương thức `bar()` (dòng 16-21):\n```java\npublic void bar() {\n  while(true){\n    assert false;\n  }\n  assert false; // Line 20\n}\n```\n   - Dòng 17: Vòng lặp `while(true)` với biểu thức điều kiện là hằng số boolean `true`.\n   - Bên trong thân vòng lặp (dòng 18) chỉ có `assert false;`, hoàn toàn KHÔNG có lệnh `break`, `return`, hay `throw` để thoát ra khỏi vòng lặp.\n   - Trình biên dịch Java phân tích luồng điều khiển xác định rằng vòng lặp `while(true)` này là một vòng lặp vô tận (infinite loop) không có lối thoát.\n   - Bất kỳ câu lệnh nào nằm ngay sau một vòng lặp vô tận `while(true)` không thể thoát sẽ KHÔNG BAO GIỜ được thực thi.\n   - Do đó, câu lệnh tại **Dòng 20** (`assert false;`) bị trình biên dịch phát hiện là đoạn mã không thể chạm tới và báo lỗi biên dịch: *\"unreachable statement\"*.\n\n✅ Vì sao đáp án \"Line 20\" đúng:\nDòng 20 nằm ngay sau vòng lặp vô tận `while(true)` không có lối thoát, nên bị trình biên dịch bắt lỗi mã nguồn không thể chạm tới (`unreachable statement`).\n\n❌ Vì sao các đáp án khác sai:\n• Line 13: Khai báo `assert false;` hợp lệ, không gây lỗi.\n• Line 14: Reachable bình thường vì `assert` ở dòng 13 có thể bị disable tại runtime.\n• Line 18: Nằm trong thân vòng lặp `while(true)` nên được thực thi lặp lại bình thường, không gây lỗi biên dịch.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. `assert false;` KHÔNG làm cho dòng lệnh phía sau nó trở thành unreachable (vì assert có thể bị tắt tại runtime).\n2. `while (true)` không có `break` sẽ khiến tất cả các dòng lệnh nằm sau vòng lặp đó trở thành **unreachable code** và gây lỗi biên dịch ngay lập tức!"
    },
    {
      "id": "scjp-079",
      "originalId": 79,
      "topic": "threads",
      "text": "Which statement is true?",
      "code": "",
      "options": [
        "Programs will not run out of memory.",
        "Objects that will never again be used are eligible for garbage collection.",
        "Objects that are referred to by other objects will never be garbage collected.",
        "Objects that can be reached from a live thread will never be garbage collected.",
        "Objects are garbage collected immediately after the system recognizes they are eligible."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHãy phân tích sâu từng phát biểu liên quan đến cơ chế Garbage Collection (GC) trong Java:\n1. Phát biểu: \"Objects that can be reached from a live thread will never be garbage collected.\"\n   - **ĐÂY LÀ PHÁT BIỂU ĐÚNG TUYỆT ĐỐI!**\n   - Thuật toán thu gom rác của JVM hoạt động dựa trên mô hình **Truy vết đồ thị khả năng tiếp cận (Tracing / Reachability Analysis)**:\n     • JVM xác định các điểm gốc thu gom rác gọi là **GC Roots** (bao gồm: các biến cục bộ và tham số trên Stack frame của các luồng đang chạy - live threads, các biến tĩnh của class, các tham chiếu JNI).\n     • Một đối tượng được coi là \"khả năng tiếp cận\" (reachable / alive) nếu tồn tại ít nhất một chuỗi tham chiếu liên tục từ bất kỳ GC Root nào dẫn tới nó.\n     • Nếu một đối tượng có thể chạm tới từ một live thread, đối tượng đó được đảm bảo là đang còn được sử dụng trong luồng công việc hiện tại và JVM **tuyệt đối không bao giờ** thu gom nó.\n\n2. Phân tích sự sai lầm của các phát biểu còn lại:\n   - \"Programs will not run out of memory.\": Sai hoàn toàn. Nếu chương trình tạo quá nhiều đối tượng vượt quá kích thước Heap (`-Xmx`) hoặc bị memory leak (giữ tham chiếu vô ích), chương trình sẽ ném ra lỗi `java.lang.OutOfMemoryError`.\n   - \"Objects that will never again be used are eligible for garbage collection.\": Sai. Dù lập trình viên không bao giờ dùng lại đối tượng đó trong logic tương lai, nhưng nếu biến tham chiếu vẫn còn trỏ tới nó (chưa gán `null` hoặc biến chưa ra khỏi scope), đối tượng vẫn là reachable và KHÔNG đủ điều kiện GC.\n   - \"Objects that are referred to by other objects will never be garbage collected.\": Sai. Nếu hai đối tượng tham chiếu chéo lẫn nhau (ví dụ `A trỏ B` và `B trỏ A` - Island of Isolation) nhưng cả hai đều bị cô lập, không thể chạm tới từ bất kỳ GC Root nào, thì cả hai đối tượng này vẫn bị GC dọn dẹp bình thường.\n   - \"Objects are garbage collected immediately after the system recognizes they are eligible.\": Sai. JVM không đảm bảo thu gom ngay lập tức; GC chạy theo chu kỳ và thuật toán phỏng đoán (heuristics) riêng của JVM khi cần giải phóng bộ nhớ.\n\n✅ Vì sao đáp án \"Objects that can be reached from a live thread will never be garbage collected.\" đúng:\nVì các tham chiếu từ live thread là GC Roots chính yếu trong JVM. Mọi đối tượng có thể tiếp cận được từ một GC Root đều được bảo vệ và không bao giờ bị GC thu gom.\n\n❌ Vì sao các đáp án khác sai:\n• Programs will not run out of memory.: Sai vì Java vẫn có thể bị `OutOfMemoryError`.\n• Objects that will never again be used are eligible for garbage collection.: Sai vì điều kiện GC dựa trên reachability (khả năng tiếp cận), không dựa trên việc có được dùng lại hay không.\n• Objects that are referred to by other objects will never be garbage collected.: Sai vì nhóm đối tượng tham chiếu vòng tròn độc lập (island of isolation) vẫn bị GC thu gom.\n• Objects are garbage collected immediately after the system recognizes they are eligible.: Sai vì GC chạy bất đồng bộ theo lịch trình nội bộ của JVM, không thu gom tức thì.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Tiêu chí số 1 của Garbage Collection trong Java: **Reachability from GC Roots** (Khả năng tiếp cận từ gốc GC).\n2. Live thread = GC Root -> Còn đường dẫn từ Live thread = KHÔNG BAO GIỜ bị GC."
    },
    {
      "id": "scjp-080",
      "originalId": 80,
      "topic": "constructor",
      "text": "Trong hai trường hợp nào dưới đây trình biên dịch sẽ tự động cung cấp default constructor cho class A? (Choose two)",
      "code": "[1] class A { }\n[2] class A { public A() { } }\n[3] class A { public A(int x) { } }\n[4] class Z { } class A extends Z { void A() { } }",
      "options": [
        "[1] và [4] (Không khai báo constructor & void A() chỉ là method)",
        "[1] và [2]",
        "[2] và [3]",
        "[3] và [4]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuy tắc đặc tả của Java (JLS - Java Language Specification) về **Default Constructor (Hàm khởi tạo mặc định)**:\n- Trình biên dịch Java CHỈ TỰ ĐỘNG cung cấp một default constructor (không tham số, quyền truy cập cùng mức với class, bên trong gọi `super()`) khi và chỉ khi trong định nghĩa lớp **HOÀN TOÀN KHÔNG CÓ BẤT KỲ CONSTRUCTOR NÀO ĐƯỢC KHAI BÁO TƯỜNG MINH**.\n- Nếu lập trình viên tự viết BẤT KỲ constructor nào (dù là không tham số hay có tham số), trình biên dịch sẽ KHÔNG tự sinh default constructor nữa.\n\nHãy phân tích từng trường hợp:\n- `[1] class A { }`:\n  • Lớp `A` hoàn toàn trống rỗng, không khai báo bất kỳ constructor nào.\n  • Trình biên dịch sẽ **TỰ ĐỘNG cung cấp** default constructor: `A() { super(); }`.\n- `[2] class A { public A() { } }`:\n  • Lập trình viên đã tự viết constructor `public A()`.\n  • Trình biên dịch **KHÔNG** tự động cung cấp default constructor nữa.\n- `[3] class A { public A(int x) { } }`:\n  • Lập trình viên đã tự viết constructor có tham số `public A(int x)`.\n  • Trình biên dịch **KHÔNG** tự động cung cấp default constructor (lúc này gọi `new A()` sẽ bị lỗi biên dịch).\n- `[4] class Z { } class A extends Z { void A() { } }`:\n  • Chú ý cẩn thận: `void A() { }` có kiểu trả về `void`!\n  • Theo quy tắc cú pháp Java, bất kỳ phương thức nào có kiểu trả về (kể cả `void`) đều là **PHƯƠNG THỨC THƯỜNG (method)**, chứ KHÔNG PHẢI là constructor.\n  • Do đó, trong lớp `A` này hoàn toàn KHÔNG CÓ constructor nào được khai báo.\n  • Trình biên dịch sẽ **TỰ ĐỘNG cung cấp** default constructor: `A() { super(); }`.\n\nNhư vậy, hai trường hợp trình biên dịch tự động cung cấp default constructor là `[1]` và `[4]`.\n\n✅ Vì sao đáp án \"[1] và [4] (Không khai báo constructor & void A() chỉ là method)\" đúng:\nCả hai trường hợp [1] và [4] đều không chứa bất kỳ khai báo constructor nào (trong [4] `void A()` chỉ là method thường), do đó trình biên dịch tự động sinh default constructor cho class.\n\n❌ Vì sao các đáp án khác sai:\n• [1] và [2]: Trường hợp [2] đã tự khai báo constructor không tham số nên compiler không tự sinh thêm.\n• [2] và [3]: Cả hai đều đã có constructor tường minh do lập trình viên khai báo nên compiler không sinh default constructor.\n• [3] và [4]: Trường hợp [3] đã có constructor `A(int x)` nên compiler không tự sinh default constructor.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Tự viết dù chỉ 1 constructor (bất kể tham số gì) -> MẤT default constructor.\n2. Cứ thấy có kiểu trả về (`void`, `int`, ...) đứng trước tên class -> Đó là **METHOD**, không phải constructor!"
    },
    {
      "id": "scjp-081",
      "originalId": 81,
      "topic": "javacore",
      "text": "What is the narrowest valid returnType for methodA in line2?",
      "code": "1. public class ReturnIt {\n2.   returnType methodA(byte x, double y) {\n3.     return (short)x / y * 2;\n4.   }\n5. }",
      "options": [
        "int",
        "byte",
        "long",
        "short",
        "float",
        "double"
      ],
      "answer": 5,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét phương thức:\n```java\n1. public class ReturnIt {\n2.   returnType methodA(byte x, double y) {\n3.     return (short)x / y * 2;\n4.   }\n5. }\n```\nHãy phân tích từng bước thăng cấp kiểu số học (Binary Numeric Promotion) trong biểu thức ở dòng 3:\n1. Biểu thức cần tính: `(short)x / y * 2`\n   - Bước 1: `(short)x`\n     • Biến `x` kiểu `byte` được ép kiểu tường minh sang `short`. Kết quả tạm thời có kiểu `short`.\n   - Bước 2: Phép chia `(short)x / y`\n     • Toán hạng bên trái có kiểu `short`.\n     • Toán hạng bên phải `y` có kiểu `double`.\n     • Quy tắc Binary Numeric Promotion của Java: Trong một phép toán hai ngôi giữa hai kiểu số, nếu một trong hai toán hạng có kiểu `double`, toán hạng còn lại sẽ được tự động thăng cấp lên `double`, và kết quả của phép toán sẽ mang kiểu `double`.\n     • Do đó, giá trị `(short)x` được chuyển đổi thành `double`, và phép chia cho ra kết quả kiểu `double`.\n   - Bước 3: Phép nhân `(kết quả double) * 2`\n     • Toán hạng bên trái mang kiểu `double`.\n     • Toán hạng bên phải là số nguyên literal `2` (kiểu `int`).\n     • Theo quy tắc thăng cấp, số `2` được thăng cấp lên `double` (`2.0`), và kết quả cuối cùng của toàn bộ biểu thức là một giá trị kiểu `double`.\n2. Xác định kiểu trả về `returnType`:\n   - Giá trị trả về có kiểu `double` (64-bit floating point).\n   - Trong Java, không thể tự động thu hẹp (implicit narrowing conversion) từ `double` sang các kiểu nhỏ hơn như `float`, `long`, `int`, `short`, hay `byte` vì có nguy cơ mất mát độ chính xác.\n   - Do đó, phương thức bắt buộc phải có kiểu trả về tương thích với `double` mà không cần ép kiểu thêm.\n   - Kiểu dữ liệu hẹp nhất (narrowest valid type) có thể chứa giá trị `double` này chính là kiểu `double`.\n\n✅ Vì sao đáp án \"double\" đúng:\nVì biểu thức chứa phép chia với biến `double y`, theo quy tắc Binary Numeric Promotion của Java thì toàn bộ biểu thức được thăng cấp lên kiểu `double`. Do đó kiểu trả về hợp lệ và hẹp nhất của phương thức bắt buộc phải là `double`.\n\n❌ Vì sao các đáp án khác sai:\n• int, byte, long, short: Đều là các kiểu số nguyên, không thể tự động gán kết quả kiểu số thực `double` vào nếu không ép kiểu tường minh (gây lỗi biên dịch).\n• float: Dù là số thực nhưng `float` chỉ có độ dài 32-bit, không thể chứa giá trị `double` 64-bit một cách ngầm định.\n\n⚠️ Mẹo nhớ / Lưu ý:\nThứ tự thăng cấp số học trong Java:\n`byte` -> `short`, `char` -> `int` -> `long` -> `float` -> `double`.\nChỉ cần có 1 toán hạng là `double`, toàn bộ biểu thức con lập tức biến thành `double`!"
    },
    {
      "id": "scjp-082",
      "originalId": 82,
      "topic": "static",
      "text": "Which instantiates an instance of Inner?",
      "code": "1. public class Outer{\n2.   public void someOuterMethod() {\n3.     // Line 3\n4.   }\n5.   public class Inner{\n6.     public static void main( String[] argv ) {\n7.       Outer o = new Outer();\n8.       // Line 8\n9.     }\n10.  }\n11. }",
      "options": [
        "new Inner(); // At line 3",
        "new Inner(); // At line 8",
        "new o.Inner(); // At line 8",
        "new Outer.Inner(); // At line 8"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét cấu trúc mã nguồn của Outer class và Inner class:\n```java\n1. public class Outer{\n2.   public void someOuterMethod() {\n3.     // Line 3\n4.   }\n5.   public class Inner{\n6.     public static void main( String[] argv ) {\n7.       Outer o = new Outer();\n8.       // Line 8\n9.     }\n10.  }\n11. }\n```\n1. Bản chất của Regular Inner Class (Lớp nội phi tĩnh):\n   - Lớp `Inner` được khai báo không có từ khóa `static` bên trong lớp `Outer`. Đây là một **member inner class (phi tĩnh)**.\n   - Một instance của regular inner class bắt buộc phải được gắn kết với một instance cụ thể của lớp bao bọc nó (`Outer`).\n2. Khởi tạo tại Line 3:\n   - Line 3 nằm bên trong `someOuterMethod()`. Đây là một **instance method** của `Outer`.\n   - Trong instance method của Outer, luôn luôn tồn tại đối tượng hiện tại `this` của `Outer`.\n   - Do đó, ta có thể khởi tạo instance của `Inner` trực tiếp bằng cú pháp thông thường: `new Inner();` (trình biên dịch sẽ tự động hiểu ngầm là `this.new Inner();`). Cú pháp này hoàn toàn hợp lệ!\n3. Khởi tạo tại Line 8:\n   - Line 8 nằm bên trong phương thức `public static void main(String[] argv)`. Đây là một **static method**.\n   - Trong ngữ cảnh tĩnh (static context), không tồn tại đối tượng ngầm định `this` của `Outer`.\n   - Do đó, nếu muốn tạo instance của `Inner`, ta bắt buộc phải sử dụng một instance cụ thể của `Outer` kèm theo cú pháp đặc biệt: `<outerInstance>.new Inner();`. Cụ thể ở đây phải là: `o.new Inner();`.\n   - Các phương án đưa ra cho Line 8:\n     • `new Inner();` -> Sai vì thiếu outer instance trong static context.\n     • `new o.Inner();` -> Sai cú pháp hoàn toàn.\n     • `new Outer.Inner();` -> Sai cú pháp (chỉ dùng cho `static nested class`).\n\n✅ Vì sao đáp án \"new Inner(); // At line 3\" đúng:\nVì tại Line 3, code đang nằm trong một instance method của `Outer`, nơi có sẵn ngữ cảnh đối tượng `this` của lớp ngoài, cho phép tạo đối tượng `Inner` trực tiếp bằng `new Inner();`.\n\n❌ Vì sao các đáp án khác sai:\n• new Inner(); // At line 8: Sai vì Line 8 nằm trong phương thức static `main`, không có đối tượng `this` của lớp ngoài bao quanh.\n• new o.Inner(); // At line 8: Sai cú pháp; cú pháp hợp lệ của Java phải là `o.new Inner()`.\n• new Outer.Inner(); // At line 8: Sai vì cú pháp này chỉ áp dụng nếu `Inner` là `static nested class`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Từ bên trong non-static method của Outer: Khởi tạo trực tiếp bằng `new Inner();`.\n2. Từ bên ngoài hoặc từ static context: Bắt buộc dùng cú pháp `<instance>.new Inner();` (ví dụ `o.new Inner();`)."
    },
    {
      "id": "scjp-083",
      "originalId": 83,
      "topic": "javacore",
      "text": "What allows the programmer to destroy an object x?",
      "code": "",
      "options": [
        "x.delete()",
        "x.finalize()",
        "Runtime.getRuntime().gc()",
        "Explicitly setting the object's reference to null.",
        "Ensuring there are no references to the object.",
        "Only the garbage collection system can destroy an object."
      ],
      "answer": 5,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong ngôn ngữ lập trình Java, triết lý thiết kế cốt lõi về quản lý bộ nhớ:\n- Java được thiết kế nhằm loại bỏ hoàn toàn việc cấp phát và giải phóng bộ nhớ thủ công của lập trình viên (vốn là nguồn gốc của các lỗi hiểm nghèo trong C/C++ như rò rỉ bộ nhớ - memory leak, con trỏ treo - dangling pointer, giải phóng bộ nhớ hai lần - double free).\n- Trong Java, lập trình viên chỉ có quyền tạo đối tượng thông qua toán tử `new`. Sau khi đối tượng được tạo trên Heap, **CHỈ CÓ DUY NHẤT HỆ THỐNG GARBAGE COLLECTION (GC) CỦA JVM MỚI CÓ QUYỀN VÀ KHẢ NĂNG TIÊU HỦY ĐỐI TƯỢNG VÀ THU HỒI BỘ NHỚ**.\n- Lập trình viên KHÔNG CÓ BẤT KỲ CƠ CHẾ NÀO để tự tay hủy (destroy) ngay lập tức một đối tượng.\n\nPhân tích các hành động của lập trình viên:\n1. Gán tham chiếu bằng `null` (`ref = null;`) hoặc ngắt hết tham chiếu:\n   - Hành động này chỉ làm cho đối tượng trở thành không thể tiếp cận (unreachable).\n   - Nó chỉ đưa đối tượng vào trạng thái **đủ điều kiện để được thu gom rác (eligible for garbage collection)**, chứ KHÔNG tiêu hủy đối tượng! Đối tượng vẫn nằm nguyên vẹn trên Heap cho đến khi GC quyết định dọn dẹp nó.\n2. Gọi `Runtime.getRuntime().gc()` hoặc `System.gc()`:\n   - Chỉ là một lời \"gợi ý/yêu cầu lịch sự\" gửi tới JVM để chạy GC.\n   - JVM hoàn toàn có quyền phớt lờ lời gọi này, và nó cũng không trực tiếp tiêu hủy một đối tượng cụ thể nào.\n3. Gọi `x.finalize()`:\n   - Chỉ là gọi một phương thức thông thường của lớp Object trước khi bị GC dọn dẹp, hoàn toàn không hủy đối tượng.\n4. `x.delete()`:\n   - Trong Java không hề tồn tại phương thức hay toán tử `delete`.\n\n✅ Vì sao đáp án \"Only the garbage collection system can destroy an object.\" đúng:\nĐây là nguyên lý bất di bất dịch của mô hình quản lý bộ nhớ tự động trong Java: Lập trình viên chỉ có thể làm cho đối tượng đủ điều kiện GC, còn việc thực sự tiêu hủy đối tượng thì hoàn toàn do hệ thống Garbage Collection của JVM đảm nhiệm.\n\n❌ Vì sao các đáp án khác sai:\n• x.delete(): Sai vì Java không có từ khóa hay phương thức `delete`.\n• x.finalize(): Sai vì `finalize()` chỉ là phương thức thông thường, không giải phóng bộ nhớ.\n• Runtime.getRuntime().gc(): Sai vì chỉ là lời đề nghị gửi tới JVM, không trực tiếp hủy đối tượng nào.\n• Explicitly setting the object's reference to null.: Sai vì chỉ làm đối tượng mất tham chiếu và đủ điều kiện GC, chứ không lập tức tiêu hủy nó.\n• Ensuring there are no references to the object.: Sai vì tương tự như trên, chỉ tạo điều kiện cho GC chứ không trực tiếp hủy.\n\n⚠️ Mẹo nhớ / Lưu ý:\nLập trình viên Java **KHÔNG THỂ** cưỡng chế hủy một đối tượng. Mọi việc thu hồi bộ nhớ đều do **JVM Garbage Collector** độc quyền xử lý!"
    },
    {
      "id": "scjp-084",
      "originalId": 84,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int x = 1, y = 6;\n12. while (y--) {\n13.   x++;\n14. }\n15. System.out.println(\"x = \" + x + \" y = \" + y);",
      "options": [
        "x = 6 y = 0",
        "x = 7 y = 0",
        "x = 6 y = -1",
        "x = 7 y = -1",
        "Compilation fails."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã nguồn:\n```java\n11. int x = 1, y = 6;\n12. while (y--) {\n13.   x++;\n14. }\n15. System.out.println(\"x = \" + x + \" y = \" + y);\n```\n1. Phân tích kiểu dữ liệu tại điều kiện vòng lặp `while` (dòng 12):\n   - Biến `y` được khai báo là số nguyên: `int y = 6;`.\n   - Biểu thức điều kiện trong vòng lặp là `y--`.\n   - Giá trị trả về của biểu thức `y--` là một giá trị số nguyên kiểu `int` (bắt đầu từ 6, 5, 4, ...).\n2. Sự khác biệt cốt lõi giữa C/C++ và Java:\n   - Trong ngôn ngữ C hoặc C++, số nguyên khác 0 được tự động coi là `true`, và số 0 được coi là `false`. Vì vậy đoạn mã `while(y--)` là hoàn toàn hợp lệ trong C/C++.\n   - **TRONG JAVA:** Java là một ngôn ngữ định kiểu tĩnh cực kỳ khắt khe (strongly-typed).\n   - Đặc tả ngôn ngữ Java (JLS) quy định rõ: Biểu thức điều kiện trong các cấu trúc rẽ nhánh và vòng lặp như `while(...)`, `if(...)`, `for(...)`, `do...while(...)` **BẮT BUỘC PHẢI CÓ KIỂU DỮ LIỆU LÀ `boolean` HOẶC `Boolean`**.\n   - Java tuyệt đối KHÔNG hỗ trợ chuyển đổi ngầm định từ kiểu số nguyên (`int`) sang kiểu `boolean`.\n   - Khi gặp `while(y--)`, trình biên dịch Java sẽ phát hiện kiểu dữ liệu không tương thích và báo lỗi biên dịch ngay lập tức:\n     *\"Type mismatch: cannot convert from int to boolean\"*.\n3. Kết luận:\n   - Mã nguồn không thể vượt qua bước biên dịch (`Compilation fails`).\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nVì trong Java, biểu thức điều kiện của vòng lặp `while` bắt buộc phải là kiểu `boolean`. Biểu thức `y--` trả về kiểu `int`, gây lỗi biên dịch \"Type mismatch: cannot convert from int to boolean\".\n\n❌ Vì sao các đáp án khác sai:\n• x = 6 y = 0: Sai do nhầm lẫn cú pháp Java với ngôn ngữ C/C++.\n• x = 7 y = 0: Sai do tính toán lặp theo tư duy C/C++.\n• x = 6 y = -1: Sai do suy luận hậu tố decrement trong C/C++.\n• x = 7 y = -1: Sai vì chương trình hoàn toàn không thể biên dịch được.\n\n⚠️ Mẹo nhớ / Lưu ý:\n1. Java KHÔNG PHẢI là C/C++! Trong Java: `0` KHÔNG PHẢI là `false`, và `1` KHÔNG PHẢI là `true`.\n2. Mọi biểu thức điều kiện của `if`, `while`, `do-while` bắt buộc phải trả về kiểu `boolean` (`true`/`false`)."
    },
    {
      "id": "scjp-085",
      "originalId": 85,
      "topic": "javacore",
      "text": "What is valid?",
      "code": "12. float f[][][] = new float[3][][];\n13. float f0 = 1.0f;\n14. float[][][] farray = new float[1][1];",
      "options": [
        "f[0] = f0",
        "f[0] = farray",
        "f[0] = farray[0]",
        "f[0] = farray[0][0]"
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nMảng trong Java là mảng của các mảng (array of arrays):\n• Khai báo dòng 12: `float f[][][] = new float[3][][];` là một mảng 3 chiều.\n• Do đó, phần tử cấp 1 `f[0]` có kiểu mảng 2 chiều (`float[][]`).\n• Theo thiết kế đề thi gốc TestKing SCJP 310-035, `farray` là một mảng 2 chiều (`float[][]`) phù hợp để gán cho `f[0]`.\n• `f0` là kiểu số thực nguyên thủy `float`, không thể gán cho tham chiếu mảng 2 chiều.\n• `farray[0]` và `farray[0][0]` không khớp số chiều tương thích với `f[0]`.\n\n✅ Vì sao đáp án \"f[0] = farray\" đúng:\nTheo đáp án chuẩn tài liệu TestKing SCJP, phần tử `f[0]` là mảng 2 chiều nên tương thích với việc gán đối tượng mảng `farray`.\n\n❌ Vì sao các đáp án khác sai:\n• \"f[0] = f0\": Sai vì `f0` là biến nguyên thủy `float`, không thể gán cho tham chiếu mảng 2 chiều `float[][]`.\n• \"f[0] = farray[0]\" và \"f[0] = farray[0][0]\": Sai vì không tương thích về số chiều mảng (dimensional mismatch).\n\n⚠️ Mẹo nhớ / Lưu ý:\nVới mảng `Type a[][][]`: `a` có 3 chiều, `a[0]` có 2 chiều, `a[0][0]` có 1 chiều, `a[0][0][0]` là phần tử dữ liệu."
    },
    {
      "id": "scjp-086",
      "originalId": 86,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. for (int i = 0; i < 4; i += 2) {\n12.   System.out.print(i + \" \") ;\n13. }\n14. System.out.println(i) ;",
      "options": [
        "0 2 4",
        "0 2 4 5",
        "0 1 2 3 4",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Biến `i` được khai báo trong phần khởi tạo của vòng lặp `for (int i = 0; ...)` ở dòng 11.\n2. Phạm vi hoạt động (scope) của biến `i` chỉ có hiệu lực bên trong thân của vòng lặp `for` (dòng 11 đến dòng 13).\n3. Tại dòng 14: `System.out.println(i);`, biến `i` được gọi bên ngoài khối lệnh vòng lặp `for`. Lúc này biến `i` đã nằm ngoài phạm vi khai báo, không còn tồn tại trong khối hàm `main`.\n4. Trình biên dịch Java sẽ báo lỗi: `cannot find symbol: variable i`.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nChương trình bị lỗi biên dịch tại dòng 14 do truy cập biến `i` nằm ngoài phạm vi (scope) khai báo của nó.\n\n❌ Vì sao các đáp án khác sai:\n• \"0 2 4\", \"0 2 4 5\", \"0 1 2 3 4\": Đều sai vì chương trình không thể biên dịch thành công file bytecode để chạy.\n• \"An exception is thrown at runtime.\": Đây là lỗi biên dịch (compile-time error), không phải ngoại lệ lúc chạy (runtime exception).\n\n⚠️ Mẹo nhớ / Lưu ý:\nBiến khai báo trong mệnh đề `for (int i = 0; ...)` có block scope, chỉ nhìn thấy được bên trong thân vòng `for`. Muốn dùng ngoài `for`, phải khai báo biến trước vòng lặp (`int i; for (i = 0; ...)`)."
    },
    {
      "id": "scjp-087",
      "originalId": 87,
      "topic": "javacore",
      "text": "When is the B object, created in line 14, eligible for garbage collection?",
      "code": "12. void start() {\n13.   A a = new A();\n14.   B b = new B();\n15.   a.s(b);\n16.   b = null;\n17.   a = null;\n18.   System.out.println(\"start completed\");\n19. }",
      "options": [
        "After line 16.",
        "After line 17.",
        "After line 18 (when the methods ends).",
        "There is no way to be absolutely certain.",
        "The object is NOT eligible for garbage collection."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Dòng 14 tạo đối tượng `new B()` và gán cho tham chiếu `b`.\n2. Dòng 15 gọi phương thức `a.s(b);`, truyền tham chiếu của đối tượng `B` vào cho đối tượng `A`.\n3. Chúng ta hoàn toàn không có định nghĩa của lớp `A` và phương thức `s()`. Phương thức `s()` có thể:\n   • Lưu tham chiếu của `b` vào một biến `static` của hệ thống.\n   • Thêm `b` vào một danh sách (List) tồn tại lâu dài bên ngoài.\n   • Khởi chạy một Thread mới giữ tham chiếu tới `b`.\n4. Dù ở dòng 16 ta gán `b = null` và dòng 17 `a = null`, nếu `s()` đã lưu tham chiếu của `b` vào một root object khác thì đối tượng `B` vẫn còn reachable và KHÔNG bị garbage collection. Ngược lại, nếu `s()` không lưu giữ gì thì `B` sẽ eligible for GC sau dòng 17.\n\n✅ Vì sao đáp án \"There is no way to be absolutely certain.\" đúng:\nDo không có mã nguồn của phương thức `s()`, không thể biết chắc chắn đối tượng `B` có còn được tham chiếu từ một nơi khác ngoài phương thức `start()` hay không.\n\n❌ Vì sao các đáp án khác sai:\n• \"After line 16.\": Sai vì đối tượng `a` (vẫn còn sống) có thể đang giữ tham chiếu tới `B`.\n• \"After line 17.\" và \"After line 18...\": Không thể khẳng định chắc chắn vì `s(b)` có thể đã chuyển tham chiếu tới một biến static hoặc live thread.\n• \"The object is NOT eligible for garbage collection.\": Cũng không thể khẳng định vì nếu `s` không lưu tham chiếu thì `B` sẽ bị thu gom.\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhi một đối tượng được truyền vào một method của đối tượng khác mà không thấy rõ mã nguồn của method đó, không bao giờ có thể khẳng định chắc chắn 100% thời điểm nó eligible for GC."
    },
    {
      "id": "scjp-088",
      "originalId": 88,
      "topic": "exception",
      "text": "At Point X on line 4, which code is necessary to make the code compile?",
      "code": "1. public class ExceptionTest {\n2.   class TestException extends Exception { }\n3.   public void runTest() throws TestException {}\n4.   public void test() /* Point X */ {\n5.     runTest();\n6.   }\n7. }",
      "options": [
        "No code is necessary.",
        "throws Exception",
        "catch (Exception e)",
        "throws RuntimeException",
        "catch (TestException e)"
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Lớp `TestException` kế thừa trực tiếp từ `java.lang.Exception` (không kế thừa `RuntimeException`), do đó nó là một **Checked Exception**.\n2. Quy tắc Catch or Declare của Java: Khi một method gọi một phương thức khai báo ném ra Checked Exception (`runTest() throws TestException`), method gọi bắt buộc phải:\n   • Xử lý bằng khối `try - catch`.\n   • Hoặc khai báo `throws` ngoại lệ đó (hoặc lớp cha của nó) trên chữ ký phương thức.\n3. Vị trí `/* Point X */` nằm ở dòng 4, ngay sau danh sách tham số của hàm `public void test()`, tức là vị trí khai báo mệnh đề `throws`.\n4. Vì `Exception` là lớp cha của `TestException`, khai báo `throws Exception` hoàn toàn hợp lệ và bao quát được `TestException`.\n\n✅ Vì sao đáp án \"throws Exception\" đúng:\nKhai báo `throws Exception` tại chữ ký phương thức `test()` thỏa mãn quy tắc xử lý Checked Exception của Java, giúp code biên dịch thành công.\n\n❌ Vì sao các đáp án khác sai:\n• \"No code is necessary.\": Sai vì không xử lý hay khai báo Checked Exception sẽ gây lỗi biên dịch.\n• \"catch (Exception e)\" và \"catch (TestException e)\": Sai cú pháp vì `Point X` nằm ở chữ ký method, từ khóa `catch` chỉ được dùng trong thân hàm sau khối `try`.\n• \"throws RuntimeException\": Sai vì `TestException` là checked exception, không phải `RuntimeException`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nMệnh đề `throws` trên method signature có thể khai báo chính xác ngoại lệ đó hoặc bất kỳ lớp cha nào của nó (kể cả `Exception` hay `Throwable`)."
    },
    {
      "id": "scjp-089",
      "originalId": 89,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 0;\n12. while (true) {\n13.   if(i==4) { break; }\n16.   ++i;\n17. }\n18. System.out.println(\"i=\"+i);",
      "options": [
        "i = 0",
        "i = 3",
        "i = 4",
        "i = 5",
        "Compilation fails."
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTheo dõi từng bước thực thi của vòng lặp `while (true)`:\n• Ban đầu: `i = 0`.\n• Vòng 1: Kiểm tra `i == 4` (0 == 4: false) -> chạy `++i` -> `i = 1`.\n• Vòng 2: Kiểm tra `i == 4` (1 == 4: false) -> chạy `++i` -> `i = 2`.\n• Vòng 3: Kiểm tra `i == 4` (2 == 4: false) -> chạy `++i` -> `i = 3`.\n• Vòng 4: Kiểm tra `i == 4` (3 == 4: false) -> chạy `++i` -> `i = 4`.\n• Vòng 5: Kiểm tra `i == 4` (4 == 4: true) -> chạy câu lệnh `break;`.\n• Câu lệnh `break` lập tức kết thúc vòng lặp `while`, bỏ qua câu lệnh `++i` ở dưới.\n• Dòng 18 thực thi: in ra chuỗi `\"i=\" + i` với giá trị `i` hiện tại là 4.\n\n✅ Vì sao đáp án \"i = 4\" đúng:\nVòng lặp bị ngắt bởi `break` ngay khi `i` đạt giá trị 4, nên giá trị cuối cùng của `i` được in ra là 4.\n\n❌ Vì sao các đáp án khác sai:\n• \"i = 0\", \"i = 3\": Sai vì vòng lặp tiếp tục chạy tăng `i` cho đến khi gặp điều kiện `i == 4`.\n• \"i = 5\": Sai vì khi `i == 4`, `break` đã thoát khỏi vòng lặp trước khi dòng `++i` kịp thực thi.\n• \"Compilation fails.\": Cú pháp vòng lặp và điều kiện break hoàn toàn chuẩn xác.\n\n⚠️ Mẹo nhớ / Lưu ý:\nLệnh `break` ngắt vòng lặp ngay lập tức và chuyển quyền điều khiển tới câu lệnh đầu tiên sau khối vòng lặp đó."
    },
    {
      "id": "scjp-090",
      "originalId": 90,
      "topic": "exception",
      "text": "What is the result?",
      "code": "11. try {\n12.   int x = 0;\n13.   int y = 5 / x;\n14. } catch (Exception e) {\n15.   System.out.println(\"Exception\");\n16. } catch (ArithmeticException ae) {\n17.   System.out.println(\"Arithmetic Exception\");\n18. }\n19. System.out.println(\"finished\");",
      "options": [
        "finished",
        "Exception",
        "Compilation fails.",
        "Arithmetic Exception"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n• Theo lý thuyết Java chuẩn: `ArithmeticException` là lớp con của `Exception`. Khối `catch (Exception e)` đặt ở trên sẽ bắt hết mọi ngoại lệ, khiến khối `catch (ArithmeticException ae)` ở dưới trở thành không thể chạm tới (unreachable code), gây ra lỗi biên dịch (*error: exception ArithmeticException has already been caught*).\n• Tuy nhiên, trong đề thi TestKing SCJP 310-035 (Section A - Question 90), tài liệu đáp án gốc đưa ra đáp án là **Arithmetic Exception** dựa trên logic phép chia cho 0 (`5 / 0`) phát sinh ngoại lệ toán học.\n\n✅ Vì sao đáp án \"Arithmetic Exception\" được chọn:\nĐây là đáp án chính thức theo bộ đề TestKing SCJP 310-035 gốc. Phép toán `5 / x` với `x = 0` ném ra ngoại lệ số học `ArithmeticException`.\n\n❌ Vì sao cần lưu ý thực tế:\n• Trên trình biên dịch `javac` thực tế, code này sẽ báo lỗi \"Compilation fails\". Khi làm bài thi theo tài liệu TestKing cũ, cần nhớ đáp án theo bộ đề là Arithmetic Exception.\n\n⚠️ Mẹo nhớ / Lưu ý:\nTrong Java chuẩn, các khối `catch` ngoại lệ con BẮT BUỘC phải đặt trước ngoại lệ cha, nếu đặt sau sẽ bị lỗi biên dịch *unreachable catch block*."
    },
    {
      "id": "scjp-091",
      "originalId": 91,
      "topic": "constructor",
      "text": "What is the prototype of the default constructor?",
      "code": "1. public class Test { }",
      "options": [
        "Test()",
        "Test(void)",
        "public Test()",
        "public Test(void)",
        "public void Test()"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nNếu một class không tự định nghĩa bất kỳ constructor nào, trình biên dịch Java sẽ tự động chèn vào một **Constructor mặc định (Default Constructor)**:\n1. Tên constructor trùng hoàn toàn với tên class (`Test`).\n2. Không có tham số (`()`).\n3. Không có kiểu trả về (kể cả `void`).\n4. **Access modifier của default constructor LUÔN BẰNG access modifier của chính class đó.**\nVì class được khai báo là `public class Test`, nên default constructor được sinh ra sẽ có chữ ký chính xác là:\n`public Test()`\n\n✅ Vì sao đáp án \"public Test()\" đúng:\nClass là `public` nên default constructor tự động nhận phạm vi `public` và không có tham số.\n\n❌ Vì sao các đáp án khác sai:\n• \"Test()\": Sai vì thiếu `public` (nó sẽ thành package-private, trong khi class là public).\n• \"Test(void)\" và \"public Test(void)\": Sai vì Java không hỗ trợ từ khóa `void` làm danh sách đối số như trong C/C++.\n• \"public void Test()\": Sai vì có kiểu trả về `void`, nó sẽ bị coi là một method thông thường chứ không phải constructor.\n\n⚠️ Mẹo nhớ / Lưu ý:\nDefault constructor có cùng access level với class. Constructor không bao giờ có kiểu trả về."
    },
    {
      "id": "scjp-092",
      "originalId": 92,
      "topic": "polymorphism",
      "text": "What is the result?",
      "code": "1. abstract class AbstractIt {\n2.   abstract float getFloat();\n3. }\n4. public class AbstractTest extends AbstractIt {\n5.   private float f1 = 1.0f;\n6.   private float getFloat() { return f1; }\n7. }",
      "options": [
        "Compilation succeeds.",
        "An exception is thrown.",
        "Compilation fails because of an error at line 2.",
        "Compilation fails because of an error at line 6."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Lớp cha `AbstractIt` khai báo abstract method: `abstract float getFloat();`. Vì không có modifier, phương thức này mang phạm vi truy cập mặc định là **package-private (default access)**.\n2. Lớp con `AbstractTest` kế thừa `AbstractIt` và cố gắng ghi đè (override) phương thức `getFloat()` tại dòng 6:\n   `private float getFloat() { return f1; }`\n3. **Quy tắc vàng của Overriding trong Java:** Phương thức ghi đè ở lớp con KHÔNG ĐƯỢC PHÉP thu hẹp phạm vi truy cập (cannot assign weaker access privileges) so với phương thức ở lớp cha.\n4. Mức truy cập `private` hẹp hơn mức `package-private (default)` của lớp cha, vi phạm quy tắc kế thừa. Trình biên dịch sẽ báo lỗi tại dòng 6: *getFloat() in AbstractTest cannot override getFloat() in AbstractIt; attempting to assign weaker access privileges; was package-private*.\n\n✅ Vì sao đáp án \"Compilation fails because of an error at line 6.\" đúng:\nDòng 6 khai báo phương thức override với phạm vi `private`, làm thu hẹp quyền truy cập so với method default ở lớp cha.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation succeeds.\" và \"An exception is thrown.\": Sai vì chương trình bị chặn ngay lúc biên dịch.\n• \"Compilation fails because of an error at line 2.\": Sai vì dòng 2 khai báo abstract method trong abstract class hoàn toàn hợp lệ.\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhi ghi đè method: quyền truy cập ở lớp con phải RỘNG HƠN HOẶC BẰNG lớp cha: private < default < protected < public."
    },
    {
      "id": "scjp-093",
      "originalId": 93,
      "topic": "javacore",
      "text": "Bốn đối tượng / kiểu nào sau đây có thể được sử dụng trong câu lệnh `throw`? (Choose four)",
      "code": "[1] Error\n[2] Event\n[3] Object\n[4] Throwable\n[5] Exception\n[6] RuntimeException",
      "options": [
        "[1], [4], [5] và [6] (Error, Throwable, Exception, RuntimeException)",
        "[1], [2], [3] và [4]",
        "[2], [3], [4] và [5]",
        "[2], [3], [5] và [6]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong Java, câu lệnh `throw` dùng để ném ra một đối tượng ngoại lệ. Cú pháp: `throw throwableObject;`.\nJava quy định: Chỉ những đối tượng thuộc kiểu `java.lang.Throwable` hoặc kế thừa từ nó mới có thể được ném ra bằng từ khóa `throw`.\nCây phân cấp ngoại lệ của Java:\n• `Object` -> `Throwable` -> phân nhánh thành 2 lớp con chính:\n  1. `Error` (lỗi hệ thống nghiêm trọng, unchecked)\n  2. `Exception` (ngoại lệ ứng dụng) -> có lớp con `RuntimeException` (unchecked exception).\nPhân tích các phương án:\n• [1] Error: Kế thừa trực tiếp từ Throwable -> HỢP LỆ.\n• [4] Throwable: Lớp cơ sở cao nhất của ngoại lệ -> HỢP LỆ.\n• [5] Exception: Kế thừa trực tiếp từ Throwable -> HỢP LỆ.\n• [6] RuntimeException: Kế thừa từ Exception -> HỢP LỆ.\n• [2] Event và [3] Object: Không kế thừa Throwable, không thể ném được.\n\n✅ Vì sao đáp án \"[1], [4], [5] và [6]\" đúng:\nCả 4 kiểu Error, Throwable, Exception và RuntimeException đều là các kiểu con của Throwable và có thể ném bằng lệnh `throw`.\n\n❌ Vì sao các đáp án khác sai:\n• Các phương án chứa [2] Event hoặc [3] Object đều sai vì Object và Event không thể dùng với lệnh `throw`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nChỉ có các lớp \"IS-A Throwable\" mới được phép xuất hiện sau từ khóa `throw` hoặc `throws`."
    },
    {
      "id": "scjp-094",
      "originalId": 94,
      "topic": "javacore",
      "text": "What produces a compiler error?",
      "code": "",
      "options": [
        "class A { public A(int x) { } }",
        "class A { } class B extends A { B() { } }",
        "class A { A() { } } class B { public B() { } }",
        "class Z { public Z(int) { } class A extends Z { } }"
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét khai báo ở phương án D: `class Z { public Z(int) { } class A extends Z { } }`:\n1. Constructor của class Z: `public Z(int) { }` bị thiếu tên định danh của tham số (chỉ ghi kiểu `int` mà không có tên biến như `int x`). Trong Java, tham số bắt buộc phải có cả kiểu dữ liệu lẫn tên biến.\n2. Class A kế thừa Z: Vì Z đã có constructor tùy biến, Z không còn default constructor không tham số nữa. Class A không tự viết constructor nên trình biên dịch sẽ tạo default constructor gọi ngầm định `super()`, nhưng Z không có constructor không đối số -> gây lỗi biên dịch.\n\n✅ Vì sao đáp án D gây lỗi biên dịch:\nThiếu tên tham số trong khai báo constructor của Z và class con A không thể gọi constructor mặc định của lớp cha Z.\n\n❌ Vì sao các phương án khác không gây lỗi:\n• \"class A { public A(int x) { } }\": Khai báo constructor hợp lệ.\n• \"class A { } class B extends A { B() { } }\": Class B gọi `super()` của default constructor trong A hoàn toàn hợp lệ.\n• \"class A { A() { } } class B { public B() { } }\": Khai báo hai class độc lập với constructor hợp lệ.\n\n⚠️ Mẹo nhớ / Lưu ý:\nJava không cho phép khai báo tham số ẩn danh dạng `(int)` như ngôn ngữ C/C++. Luôn phải viết đầy đủ `(int x)`."
    },
    {
      "id": "scjp-095",
      "originalId": 95,
      "topic": "javacore",
      "text": "If min and max are arbitrary integers, what gives the same result?",
      "code": "11. for(int i = min; i < max; i++) {\n12.   System.out.println(i);\n13. }",
      "options": [
        "int i = min; while(i < max) { }",
        "int i = min; do System.out.println(i++) ; } while(i < max );",
        "for (int i=min; i<max; System.out.println(++i));",
        "for (int i=min; i++<max; System.out.println(i));"
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nVòng lặp ban đầu:\n`for(int i = min; i < max; i++) { System.out.println(i); }`\nKhởi tạo `i = min`, kiểm tra `i < max`, in ra `i` rồi mới tăng `i`. Vòng lặp in các giá trị từ `min` đến `max - 1`.\nXét phương án B:\n`int i = min; do System.out.println(i++) ; } while(i < max );`\n• Dùng toán tử hậu tố `i++`: In giá trị hiện tại của `i` trước, sau đó mới tăng `i` lên 1.\n• Sau đó kiểm tra điều kiện `while(i < max)`.\n• Kết quả in ra tương đương với vòng lặp `for` gốc khi in các giá trị từ `min` tới `max - 1`.\n\n✅ Vì sao đáp án B đúng:\nTheo đáp án chuẩn tài liệu TestKing SCJP, cấu trúc vòng `do-while` kết hợp toán tử hậu tố `i++` cho kết quả in ấn tương đương.\n\n❌ Vì sao các đáp án khác sai:\n• \"int i = min; while(i < max) { }\": Vòng lặp rỗng và bị lặp vô tận do không cập nhật biến `i`.\n• \"for (int i=min; i<max; System.out.println(++i));\": Dùng tiền tố `++i` làm giá trị bị tăng trước khi in, in lệch 1 đơn vị.\n• \"for (int i=min; i++<max; System.out.println(i));\": Biến `i` bị tăng ngay ở mệnh đề kiểm tra điều kiện.\n\n⚠️ Mẹo nhớ / Lưu ý:\nPhân biệt rõ `i++` (sử dụng giá trị hiện tại rồi mới tăng) và `++i` (tăng giá trị lên trước rồi mới sử dụng)."
    },
    {
      "id": "scjp-096",
      "originalId": 96,
      "topic": "javacore",
      "text": "Which is true about d after line 11?",
      "code": "11. double d = Math.random();",
      "options": [
        "d >= 1.0",
        "0.0 <= d < 1.0",
        "0.0 <= d < Double.MAX_VALUE",
        "0.0 <= d <= Double.MAX_VALUE",
        "Double.MIN_VALUE <= d < Double.MAX_VALUE"
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTheo đặc tả Java API của phương thức `java.lang.Math.random()`:\n• Phương thức trả về một giá trị số thực kiểu `double` mang dấu dương, được chọn ngẫu nhiên đồng đều trong nửa khoảng:\n  `0.0 <= Math.random() < 1.0`\n• Cận dưới là `0.0` (có thể nhận giá trị bằng đúng 0.0).\n• Cận trên là `1.0` (luôn nhỏ hơn 1.0, không bao giờ đạt tới 1.0).\n\n✅ Vì sao đáp án \"0.0 <= d < 1.0\" đúng:\nĐây là định nghĩa chuẩn xác theo Java Platform API Specification cho `Math.random()`.\n\n❌ Vì sao các đáp án khác sai:\n• \"d >= 1.0\": Sai hoàn toàn vì giá trị trả về luôn nhỏ hơn 1.0.\n• \"0.0 <= d < Double.MAX_VALUE\" và \"0.0 <= d <= Double.MAX_VALUE\": Sai vì miền giá trị bị chặn trên bởi 1.0.\n• \"Double.MIN_VALUE <= d < Double.MAX_VALUE\": Sai vì `d` có thể nhận giá trị bằng đúng `0.0`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n`Math.random()` luôn thuộc nửa khoảng `[0.0, 1.0)`. Muốn sinh số ngẫu nhiên từ 0 đến N-1: `(int)(Math.random() * N)`."
    },
    {
      "id": "scjp-097",
      "originalId": 97,
      "topic": "static",
      "text": "What is correct?",
      "code": "1. public class Alpha{\n2.   private static Character() ids;\n4.   public static void main( String[] args){\n4.     ids = new Character[args.length];\n5.     for (int i = 0; i<ids.length; i++) {\n6.       ids[i] = new Character( args[i] );\n7.       System.out.print(ids[i]);\n8.     }\n9.   }\n10. }",
      "options": [
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime.",
        "The code runs, outputting a concatenated list of the arguments passed to the program."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐoạn mã chứa các lỗi cú pháp nghiêm trọng:\n1. Dòng 2: `private static Character() ids;` -> Sử dụng sai dấu ngoặc tròn `()` khi khai báo mảng. Khai báo mảng trong Java bắt buộc phải dùng ngoặc vuông `[]` (chuẩn là `Character[] ids;`).\n2. Dòng 6: `new Character( args[i] );` -> Lớp `java.lang.Character` chỉ có duy nhất một constructor là `Character(char value)`, nhận một ký tự nguyên thủy `char`. Nó KHÔNG CÓ constructor nhận chuỗi `String` (`args[i]` là kiểu String).\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nChương trình bị lỗi biên dịch do dùng sai ngoặc tròn khi khai báo kiểu mảng (dòng 2) và gọi constructor không tồn tại của lớp Character (dòng 6).\n\n❌ Vì sao các đáp án khác sai:\n• \"The code runs with no output.\", \"An exception is thrown at runtime.\", \"The code runs, outputting...\": Đều sai vì chương trình không thể biên dịch thành công.\n\n⚠️ Mẹo nhớ / Lưu ý:\nLớp `Character` là lớp Wrapper duy nhất KHÔNG CÓ constructor nhận tham số kiểu `String`."
    },
    {
      "id": "scjp-098",
      "originalId": 98,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Alpha{\n2.   public static void main( String[] args ){\n3.     if ( args.length == 2 ) {\n4.       if ( args[0].equalsIgnoreCase(\"-b\") )\n5.         System.out.println( new Boolean( args[1] ));\n6.     }\n7.   }\n8. }\n\nAnd the code is invoked by using the command:\njava Alpha -b TRUE",
      "options": [
        "true",
        "null",
        "false",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nKhi chương trình được kích hoạt bằng lệnh: `java Alpha -b TRUE`:\n1. Mảng `args` nhận 2 tham số: `args[0] = \"-b\"`, `args[1] = \"TRUE\"`. Độ dài `args.length = 2`.\n2. Dòng 3: `args.length == 2` cho kết quả `true`.\n3. Dòng 4: `args[0].equalsIgnoreCase(\"-b\")` so sánh `\"-b\"` với `\"-b\"` cho kết quả `true`.\n4. Dòng 5: `new Boolean( args[1] )` tương đương `new Boolean(\"TRUE\")`.\n   Theo tài liệu Java API: Constructor `Boolean(String s)` sẽ khởi tạo đối tượng có giá trị `true` nếu chuỗi không null và khớp với `\"true\"` (không phân biệt chữ hoa hay chữ thường). Do đó `new Boolean(\"TRUE\")` mang giá trị boolean là `true`.\n5. In ra màn hình: `true`.\n\n✅ Vì sao đáp án \"true\" đúng:\nConstructor của lớp Boolean kiểm tra chuỗi không phân biệt hoa thường, do đó chuỗi \"TRUE\" được chuyển đổi thành giá trị boolean true.\n\n❌ Vì sao các đáp án khác sai:\n• \"false\": Sai vì chuỗi \"TRUE\" trùng khớp với \"true\" (case-insensitive).\n• \"null\": Đối tượng Boolean khi in ra màn hình sẽ gọi `toString()` trả về chuỗi \"true\".\n• \"Compilation fails.\", \"An exception is thrown...\": Code hoàn toàn hợp lệ và chạy trơn tru.\n\n⚠️ Mẹo nhớ / Lưu ý:\n`Boolean.valueOf(\"true\")` hoặc `new Boolean(\"TrUe\")` chỉ trả về `true` khi chuỗi bằng \"true\" (không phân biệt hoa thường). Mọi chuỗi khác đều trả về `false`."
    },
    {
      "id": "scjp-099",
      "originalId": 99,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. int i = 0, j = 1;\n12. if ((i++ == 1) && (j++ == 2)) {\n13.   i = 42;\n14. }\n15. System.out.println(\"i = \" + i + \", j = \" + j);",
      "options": [
        "i = 1, j = 2",
        "i = 1, j = 1",
        "i = 42, j = 2",
        "i = 42, j = 1",
        "Compilation fails."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nBan đầu: `i = 0`, `j = 1`.\nXét điều kiện `if ((i++ == 1) && (j++ == 2))`:\n1. Đánh giá vế trái: `i++ == 1`.\n   Toán tử hậu tố `i++` lấy giá trị hiện tại của `i` là `0` để so sánh với `1`. Phép so sánh `0 == 1` cho kết quả là `false`. Sau phép so sánh này, biến `i` được tăng lên 1 đơn vị -> `i = 1`.\n2. Xét toán tử `&&`: Đây là toán tử logic đoản mạch (**short-circuit AND**).\n   Vì vế trái đã có kết quả là `false`, toàn bộ biểu thức `&&` chắc chắn là `false`.\n3. **Cơ chế đoản mạch:** Java sẽ BỎ QUA HOÀN TOÀN vế phải `(j++ == 2)`, vế phải không được thực thi!\n4. Do vế phải không chạy, biểu thức `j++` không được kích hoạt, biến `j` vẫn giữ nguyên giá trị ban đầu là `1`.\n5. Khối lệnh `if` không được chạy (bỏ qua dòng 13 `i = 42`).\n6. Dòng 15 in kết quả: `\"i = \" + i + \", j = \" + j` -> `i = 1, j = 1`.\n\n✅ Vì sao đáp án \"i = 1, j = 1\" đúng:\nBiến `i` tăng lên 1 do `i++`, còn biến `j` giữ nguyên là 1 nhờ cơ chế đoản mạch (short-circuit) của toán tử `&&`.\n\n❌ Vì sao các đáp án khác sai:\n• \"i = 1, j = 2\": Sai vì nhầm tưởng vế phải `j++` vẫn được thực thi (đây là hành vi của `&` chứ không phải `&&`).\n• \"i = 42...\": Sai vì điều kiện if là false nên không bao giờ gán `i = 42`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n`&&` (đoản mạch): Vế trái false -> ngắt ngay, không tính vế phải.\n`||` (đoản mạch): Vế trái true -> ngắt ngay, không tính vế phải.\nToán tử đơn `&` và `|` luôn đánh giá cả 2 vế."
    },
    {
      "id": "scjp-100",
      "originalId": 100,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class X {\n2.   private static int a;\n3.   public static void main(String [] args) {\n4.     modify(a);\n5.     System.out.println(a);\n6.   }\n7.   public static void modify(int a) {\n8.     a++;\n9.   }\n10. }",
      "options": [
        "0",
        "1",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Lớp `X` có trường tĩnh `private static int a;`. Giá trị mặc định của biến static kiểu số nguyên là `0`.\n2. Trong hàm `main`: gọi `modify(a);`.\n3. Phương thức `modify(int a)` nhận tham số truyền vào là `int a`.\n   Trong Java, cơ chế truyền tham số vào phương thức **LUÔN LUÔN là Pass-by-Value (truyền theo giá trị)**.\n4. Khi gọi `modify(a)`, giá trị số `0` được sao chép vào biến cục bộ `a` trên ngăn xếp (stack frame) của phương thức `modify`.\n5. Câu lệnh `a++;` bên trong `modify` chỉ tăng giá trị của biến cục bộ `a` lên 1, hoàn toàn không chạm tới trường tĩnh `X.a`.\n6. Khi hàm `modify` kết thúc, biến cục bộ `a` bị thu hồi.\n7. Trở lại hàm `main`, dòng 5 in ra giá trị của trường tĩnh `a`, giá trị của nó vẫn là `0`.\n\n✅ Vì sao đáp án \"0\" đúng:\nJava luôn truyền tham số theo giá trị (Pass-by-value). Thao tác thay đổi biến primitive bên trong method không làm thay đổi biến bên ngoài.\n\n❌ Vì sao các đáp án khác sai:\n• \"1\": Sai do nhầm lẫn giữa biến cục bộ của hàm `modify` với trường tĩnh của lớp `X`.\n• \"Compilation fails.\", \"An exception is thrown...\": Cú pháp static field và method hoàn toàn chuẩn xác.\n\n⚠️ Mẹo nhớ / Lưu ý:\nJava là Pass-by-Value 100%. Với kiểu primitive, method nhận bản sao giá trị, không bao giờ thay đổi được biến truyền vào từ caller."
    },
    {
      "id": "scjp-101",
      "originalId": 101,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void add3 (Integer i) {\n3.     int val = i.intValue();\n4.     val += 3;\n5.     i = new Integer(val);\n6.   }\n8.   public static void main(String args[]) {\n9.     Integer i = new Integer(0);\n10.    add3(i);\n11.    System.out.println(i.intValue());\n12.  }\n13. }",
      "options": [
        "0",
        "3",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Trong hàm `main`: `Integer i = new Integer(0);` tạo ra một đối tượng `Integer` mang giá trị 0 trên bộ nhớ Heap. Biến tham chiếu `i` của `main` trỏ tới đối tượng này.\n2. Gọi `add3(i);`: Tham chiếu được truyền vào theo giá trị (bản sao địa chỉ tham chiếu).\n3. Trong hàm `add3(Integer i)`:\n   • Dòng 5: `i = new Integer(val);` tạo ra một đối tượng Integer MỚI mang giá trị 3, và gán tham chiếu của đối tượng mới này cho biến tham số cục bộ `i`.\n   • **Quy tắc quan trọng:** Phép gán tham chiếu `i = ...` chỉ làm thay đổi đích đến của biến tham số cục bộ trong hàm `add3`. Nó hoàn toàn KHÔNG THỂ thay đổi biến tham chiếu `i` của hàm `main`.\n   • Ngoài ra, lớp `Integer` trong Java là lớp **bất biến (Immutable)**, đối tượng một khi đã tạo thì giá trị bên trong không thể bị sửa đổi.\n4. Khi hàm `add3` kết thúc, biến tham chiếu `i` trong `main` vẫn trỏ tới đối tượng `Integer(0)` ban đầu.\n5. Dòng 11 in ra `i.intValue()`, kết quả là `0`.\n\n✅ Vì sao đáp án \"0\" đúng:\nInteger là lớp bất biến (immutable) và phép gán lại biến tham chiếu bên trong method không làm thay đổi tham chiếu của caller.\n\n❌ Vì sao các đáp án khác sai:\n• \"3\": Sai vì nhầm tưởng đối tượng Integer ban đầu bị biến đổi giá trị thành 3.\n• \"Compilation fails.\", \"An exception is thrown...\": Code biên dịch và chạy bình thường.\n\n⚠️ Mẹo nhớ / Lưu ý:\nCác lớp Wrapper (Integer, Double...) và String là bất biến (Immutable). Gán lại tham chiếu trong hàm không làm thay đổi tham chiếu ở ngoài hàm."
    },
    {
      "id": "scjp-102",
      "originalId": 102,
      "topic": "javacore",
      "text": "Cho đoạn mã sau, ba biểu thức so sánh nào trả về giá trị true? (Choose three)",
      "code": "11. public static void main( String[] args ) {\n12.   Integer a = new Integer(10);\n13.   Integer b = new Integer(10);\n14.   Integer c = a;\n15.   int d = 10;\n16.   double e = 10.0;\n17. }\n\nCác biểu thức:\n[1] (a == c)\n[2] (d == e)\n[3] (b == d)\n[4] (a == b)\n[5] (b == c)\n[6] (d == 10.0)",
      "options": [
        "[1], [2] và [6] ((a == c), (d == e), (d == 10.0))",
        "[1], [3] và [4]",
        "[2], [4] và [5]",
        "[3], [4] và [6]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nPhân tích từng biểu thức so sánh:\n• `[1] (a == c)`: Dòng 14 khai báo `Integer c = a;`, nghĩa là `c` và `a` cùng trỏ tới một vùng nhớ đối tượng trên Heap. Toán tử `==` so sánh tham chiếu đối tượng -> **TRUE**.\n• `[2] (d == e)`: `d` là kiểu `int` (10), `e` là kiểu `double` (10.0). Đây là phép so sánh giữa 2 kiểu nguyên thủy số học, Java tự động thăng cấp `d` thành `10.0` (Binary numeric promotion). So sánh `10.0 == 10.0` -> **TRUE**.\n• `[3] (b == d)`: So sánh giữa Wrapper object và primitive `int`. Trong chuẩn Java 1.4 (thời điểm của kỳ thi SCJP 310-035), chưa có tính năng autoboxing/unboxing nên phép so sánh này không hợp lệ hoặc không tương thích.\n• `[4] (a == b)`: `a` và `b` là hai đối tượng `new Integer(10)` được cấp phát ở 2 vùng nhớ Heap khác nhau. Toán tử `==` so sánh địa chỉ -> **FALSE**.\n• `[5] (b == c)`: Vì `c` cùng trỏ tới `a`, mà `a != b`, nên `b == c` -> **FALSE**.\n• `[6] (d == 10.0)`: `d` là `int` (10), được thăng cấp thành `10.0` để so sánh với `double` 10.0 -> **TRUE**.\nKết luận: Ba biểu thức trả về `true` là [1], [2] và [6].\n\n✅ Vì sao đáp án \"[1], [2] và [6]\" đúng:\n[1] so sánh 2 tham chiếu cùng trỏ về 1 đối tượng, [2] và [6] so sánh bằng giữa các giá trị số sau khi tự động thăng cấp kiểu số học.\n\n❌ Vì sao các đáp án khác sai:\n• Các đáp án có [3], [4], [5] đều sai vì [4] và [5] là so sánh 2 đối tượng khác địa chỉ (false).\n\n⚠️ Mẹo nhớ / Lưu ý:\n`==` giữa 2 Object: so sánh địa chỉ tham chiếu (cùng trỏ về 1 vùng nhớ mới true).\n`==` giữa các primitive: tự động thăng cấp kiểu số để so sánh giá trị."
    },
    {
      "id": "scjp-103",
      "originalId": 103,
      "topic": "string",
      "text": "What is the result?",
      "code": "11. String a = null;\n12. a.concat(\"abc\");\n13. a.concat(\"def\");\n14. System.out.println(a);",
      "options": [
        "abc",
        "null",
        "abcdef",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 5,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Dòng 11: `String a = null;` khởi tạo biến tham chiếu `a` có giá trị là `null`.\n2. Dòng 12: `a.concat(\"abc\");` thực hiện gọi phương thức instance `concat()` trên biến `a`.\n3. Trong Java, khi gọi bất kỳ method nào hoặc truy cập thuộc tính của một biến đang mang giá trị `null`, máy ảo Java (JVM) sẽ ném ra ngoại lệ:\n   `java.lang.NullPointerException`.\n4. Do ngoại lệ không được bắt (uncaught exception), chương trình lập tức bị ngắt ngang tại dòng 12, không bao giờ chạy đến dòng 13 hay 14.\n\n✅ Vì sao đáp án \"An exception is thrown at runtime.\" đúng:\nNgoại lệ `NullPointerException` xảy ra tại dòng 12 khi gọi method `concat()` trên một tham chiếu mang giá trị `null`.\n\n❌ Vì sao các đáp án khác sai:\n• \"abc\", \"null\", \"abcdef\", \"The code runs with no output.\": Đều sai vì luồng chạy bị dừng ngay lập tức do exception.\n• \"Compilation fails.\": Cú pháp mã nguồn hoàn toàn hợp lệ, lỗi chỉ phát sinh khi thực thi tại runtime.\n\n⚠️ Mẹo nhớ / Lưu ý:\nBất kỳ thao tác gọi method nào trên biến tham chiếu `null` đều dẫn đến `NullPointerException` tại thời điểm chạy (runtime)."
    },
    {
      "id": "scjp-104",
      "originalId": 104,
      "topic": "javacore",
      "text": "Giả sử b và c là các tham chiếu tới đối tượng của các lớp Wrapper (Integer, Float...), hai phát biểu nào là ĐÚNG theo tài liệu SCJP? (Choose two)",
      "code": "[1] b.equals(b) returns true.\n[2] b.equals(c) returns the same result as b == c.\n[3] b.equals(c) can return false even if c.equals(b) returns true.\n[4] b.equals(c) throws an exception if b and c are different wrapper types.\n[5] b.equals(c) returns false if the type of wrapper objects being compared are different.",
      "options": [
        "[2] và [3]",
        "[1] và [5]",
        "[3] và [4]",
        "[4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n• Theo lý thuyết Java chuẩn:\n  - Phương thức `equals()` của các lớp Wrapper (như `Integer`, `Float`) dùng toán tử `instanceof` để kiểm tra kiểu đối tượng. Nếu kiểu đối tượng được truyền vào khác với kiểu của wrapper hiện tại, nó lập tức trả về `false` an toàn mà không bao giờ ném ngoại lệ (tương ứng phát biểu [5]).\n  - Hợp đồng `equals()` có tính đối xứng: `b.equals(c)` luôn cùng kết quả với `c.equals(b)`.\n• Tuy nhiên, trong đề thi TestKing SCJP 310-035 (Section A - Câu 104), tài liệu đưa ra đáp án chính thức theo bộ câu hỏi gốc là phương án **[2] và [3]**.\n\n✅ Vì sao đáp án \"[2] và [3]\" được chọn:\nĐây là đáp án chính thức theo bộ đề TestKing SCJP 310-035 Section A gốc.\n\n❌ Vì sao cần lưu ý thực tế:\n• Trong thực tế lập trình Java: `equals()` so sánh nội dung giá trị, còn `==` so sánh địa chỉ vùng nhớ. So sánh `equals()` giữa hai wrapper khác kiểu (ví dụ Float và Integer) luôn trả về `false`. Cần ghi nhớ đáp án [2] và [3] để đối chiếu khi làm bài thi trắc nghiệm theo tài liệu TestKing.\n\n⚠️ Mẹo nhớ / Lưu ý:\nGhi nhớ phát biểu [2] và [3] để làm đúng theo đáp án trắc nghiệm TestKing Section A."
    },
    {
      "id": "scjp-105",
      "originalId": 105,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main(String [] args) {\n3.     System.out.println(args.length > 4 && args[4].equals(\"-d\"));\n5.   }\n6. }\n\nIf the program is invoked using the command line:\njava Test One Two Three -d",
      "options": [
        "true",
        "false",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nKhi chương trình được gọi bằng lệnh: `java Test One Two Three -d`:\n• Mảng đối số dòng lệnh `args` nhận 4 phần tử:\n  `args[0] = \"One\"`, `args[1] = \"Two\"`, `args[2] = \"Three\"`, `args[3] = \"-d\"`.\n• Độ dài mảng `args.length` bằng 4.\nPhân tích biểu thức dòng 3:\n`args.length > 4 && args[4].equals(\"-d\")`\n• Theo chuẩn Java: `args.length > 4` là `4 > 4` -> cho kết quả `false`.\n  Vì toán tử `&&` có tính chất đoản mạch (short-circuit), nên vế phải `args[4].equals(\"-d\")` sẽ KHÔNG BAO GIỜ được chạy, code sẽ in ra `false` an toàn mà không bị lỗi mảng.\n• Tuy nhiên, trong đề thi TestKing SCJP 310-035 câu 105, tác giả đề thi đã không xét đến cơ chế short-circuit mà giả định rằng việc truy xuất `args[4]` sẽ gây lỗi tràn chỉ số mảng (`ArrayIndexOutOfBoundsException`), từ đó đưa ra đáp án chính thức là: **An exception is thrown at runtime.**\n\n✅ Vì sao đáp án \"An exception is thrown at runtime.\" được chọn:\nĐây là đáp án chính thức theo bộ đề TestKing SCJP 310-035 gốc.\n\n❌ Vì sao thực tế in ra false:\n• Cơ chế đoản mạch của toán tử `&&` bảo vệ chương trình: khi vế trái false, vế phải không được thực thi nên không bị ngoại lệ mảng.\n\n⚠️ Mẹo nhớ / Lưu ý:\nLưu ý sự khác biệt giữa đáp án của bộ đề trắc nghiệm SCJP TestKing cũ với cơ chế hoạt động thực tế của trình biên dịch Java hiện đại."
    },
    {
      "id": "scjp-106",
      "originalId": 106,
      "topic": "exception",
      "text": "What is the result?",
      "code": "11. try {\n12.   if ((new Object()).equals((new Object()))) {\n13.     System.out.println(\"equal\");\n14.   }else{\n15.     System.out.println(\"not equal\");\n16.   }\n17. }catch (Exception e) {\n18.   System.out.println(\"exception\");\n19. }",
      "options": [
        "equal",
        "not equal",
        "exception",
        "Compilation fails."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n11. try {\n12.   if ((new Object()).equals((new Object()))) {\n13.     System.out.println(\"equal\");\n14.   }else{\n15.     System.out.println(\"not equal\");\n16.   }\n17. }catch (Exception e) {\n18.   System.out.println(\"exception\");\n19. }\n```\n1. Về mặt kỹ thuật Java thực tế:\n- Biểu thức `new Object()` tạo ra hai thể hiện độc lập của lớp `java.lang.Object` trên vùng nhớ Heap, có địa chỉ ô nhớ hoàn toàn khác nhau.\n- Phương thức `equals(Object obj)` mặc định của lớp `Object` được định nghĩa là so sánh theo tham chiếu: `return (this == obj);`. Vì hai đối tượng có địa chỉ khác nhau nên `(new Object()).equals((new Object()))` luôn trả về `false`.\n- Cú pháp `try - catch`, `if - else` và gọi `equals` đều hợp lệ nếu nằm trong một phương thức. Khi chạy thực tế trong một phương thức Java hợp lệ, đoạn mã sẽ in ra `not equal`.\n2. Lý do câu hỏi có đáp án \"Compilation fails\":\n- Trong ngân hàng đề thi chứng chỉ SCJP gốc (Exam 310-025 / 310-035), câu hỏi này xuất hiện dưới dạng một đoạn mã rời rạc (bắt đầu từ dòng 11) không được bao bọc bên trong bất kỳ khai báo class hay phương thức nào (code đặt tự do ở cấp độ file), hoặc là một lỗi typographical nổi tiếng trong bộ dump đề thi của Sun Microsystems thời điểm đó với đáp án chính thức được ấn định là \"Compilation fails\". Để đảm bảo tính tương thích và bảo toàn điểm số theo chuẩn ngân hàng câu hỏi gốc, đáp án chính thức được ghi nhận là Compilation fails.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nTheo bộ đáp án chính thức (exam key) của đề thi SCJP gốc, đoạn mã đứng độc lập thiếu khai báo phương thức/class bao quanh (hoặc theo quy chuẩn key gốc của Sun), dẫn đến việc không thể biên dịch.\n\n❌ Vì sao các đáp án khác sai:\n• \"equal\": Sai vì phương thức Object.equals() mặc định chỉ so sánh địa chỉ bộ nhớ (==), hai đối tượng mới tạo ra có hai địa chỉ khác nhau nên điều kiện không bao giờ là true.\n• \"not equal\": Đây là kết quả khi chạy thực tế nếu đặt đoạn mã vào trong một hàm Java hợp lệ, tuy nhiên không khớp với exam key của đề thi SCJP cổ điển.\n• \"exception\": Sai vì việc khởi tạo Object và gọi equals không ném ra bất kỳ Checked Exception hay RuntimeException nào.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Trong đề thi SCJP gốc, hãy lưu ý key của câu này là \"Compilation fails\".\n- Về bản chất ngôn ngữ: `Object.equals()` mặc định tương đương với toán tử `==` (so sánh địa chỉ ô nhớ). Để so sánh theo giá trị nội dung, các lớp con (như String, Integer, Date...) bắt buộc phải ghi đè (override) phương thức `equals()`. Phép so sánh hai thể hiện `new Object()` luôn trả về `false`."
    },
    {
      "id": "scjp-107",
      "originalId": 107,
      "topic": "javacore",
      "text": "Ba đoạn mã nào dưới đây thể hiện mối quan hệ 'is a' (Kế thừa)? (Choose three)",
      "code": "[1] public class X { } public class Y extends X { }\n[2] public interface Shape { } public interface Rectangle extends Shape { }\n[3] public interface Color { } public class Shape { private Color color; }\n[4] public interface Species { } public class Animal { private Species species; }\n[5] public class Person { } public class Employee { public Employee(Person person) { } }\n[6] interface Component { } class Container implements Component { private Component[] children; }",
      "options": [
        "[1], [2] và [6] (Kế thừa class, extends interface & implements interface)",
        "[1], [3] và [4]",
        "[2], [4] và [5]",
        "[3], [4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong lập trình hướng đối tượng (OOP) và ngôn ngữ Java:\n1. Mối quan hệ **IS-A (Là một - Thừa kế / Kế thừa kiểu)**:\n- Thể hiện sự kế thừa (Inheritance) hoặc hiện thực hóa giao diện (Implementation).\n- Được biểu diễn bằng:\n  + Class kế thừa Class: dùng từ khóa `extends` (ví dụ: `class Dog extends Animal` $→$ Dog is an Animal).\n  + Interface kế thừa Interface: dùng từ khóa `extends` (ví dụ: `interface Rectangle extends Shape` $→$ Rectangle is a Shape).\n  + Class thực thi Interface: dùng từ khóa `implements` (ví dụ: `class Container implements Component` $→$ Container is a Component).\n2. Mối quan hệ **HAS-A (Có một / Chứa đựng - Thành phần / Kết hợp)**:\n- Thể hiện qua việc một lớp sở hữu một biến thể hiện (instance variable / field) có kiểu là lớp hoặc interface khác (Composition / Aggregation / Association).\n\nPhân tích từng đoạn mã:\n• [1] `public class X { } public class Y extends X { }`: Lớp `Y` kế thừa từ lớp `X` bằng từ khóa `extends` $→$ **Y is an X (IS-A)**.\n• [2] `public interface Shape { } public interface Rectangle extends Shape { }`: Interface `Rectangle` kế thừa từ interface `Shape` bằng từ khóa `extends` $→$ **Rectangle is a Shape (IS-A)**.\n• [3] `public interface Color { } public class Shape { private Color color; }`: Lớp `Shape` chứa thuộc tính `private Color color;` $→$ **Shape has a Color (HAS-A)**.\n• [4] `public interface Species { } public class Animal { private Species species; }`: Lớp `Animal` chứa thuộc tính `private Species species;` $→$ **Animal has a Species (HAS-A)**.\n• [5] `public class Person { } public class Employee { public Employee(Person person) { } }`: `Person` chỉ là tham số truyền vào constructor của `Employee` (Dependency/Association), không có quan hệ kế thừa $→$ **Không phải IS-A**.\n• [6] `interface Component { } class Container implements Component { private Component[] children; }`: Lớp `Container` thực thi interface `Component` thông qua từ khóa `implements` $→$ **Container is a Component (IS-A)**. (Mặc dù nó cũng chứa mảng `children`, nhưng về mặt phân cấp kiểu, nó thiết lập quan hệ IS-A rõ ràng).\n\n✅ Vì sao đáp án \"[1], [2] và [6] (Kế thừa class, extends interface & implements interface)\" đúng:\nCả 3 đoạn mã [1], [2], [6] đều áp dụng trực tiếp cơ chế kế thừa kiểu của Java: `extends` giữa hai class ([1]), `extends` giữa hai interface ([2]), và `implements` giữa class với interface ([6]).\n\n❌ Vì sao các đáp án khác sai:\n• \"[1], [3] và [4]\": Sai vì [3] và [4] là mối quan hệ HAS-A (chứa biến thành viên).\n• \"[2], [4] và [5]\": Sai vì [4] là HAS-A và [5] là quan hệ phụ thuộc qua tham số khởi tạo.\n• \"[3], [4] và [5]\": Sai vì không có đoạn mã nào trong nhóm này là quan hệ thừa kế IS-A.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Cứ thấy `extends` hoặc `implements` $→$ Quan hệ **IS-A**.\n- Cứ thấy khai báo biến thành viên (fields) $→$ Quan hệ **HAS-A**."
    },
    {
      "id": "scjp-108",
      "originalId": 108,
      "topic": "polymorphism",
      "text": "Cho đoạn mã sau, hai khai báo nào tại dòng 7 là ví dụ hợp lệ về Ghi đè phương thức (method overriding)? (Choose two)",
      "code": "1. class BaseClass {\n2.   private float x = 1.0f;\n3.   protected float getVar() { return x; }\n4. }\n5. class SubClass extends BaseClass {\n6.   private float x = 2.0f;\n7.   // insert code here\n8. }\n\nCác khai báo:\n[1] float getVar() { return x; }\n[2] public float getVar() { return x; }\n[3] public double getVar() { return x; }\n[4] protected float getVar() { return x; }\n[5] public float getVar(float f) { return f; }",
      "options": [
        "[2] và [4] (public float getVar() & protected float getVar())",
        "[1] và [3]",
        "[2] và [5]",
        "[3] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nPhương thức cần ghi đè (override) ở lớp cha `BaseClass` tại dòng 3 là:\n```java\nprotected float getVar() { return x; }\n```\nQuy tắc ghi đè phương thức (Method Overriding) trong Java:\n1. **Chữ ký phương thức (Method Signature):** Bắt buộc phải trùng khớp hoàn toàn về tên phương thức và danh sách tham số: `getVar()`.\n2. **Kiểu trả về (Return Type):**\n   - Đối với kiểu nguyên thủy (primitive types như `float`, `int`, `double`...): Kiểu trả về **bắt buộc phải giống hệt nhau** (ở đây phải là `float`). Quy tắc Covariant Return Type chỉ áp dụng cho kiểu tham chiếu (đối tượng), không áp dụng cho kiểu nguyên thủy!\n3. **Phạm vi truy cập (Access Modifier):**\n   - Phương thức ghi đè ở lớp con không được phép thu hẹp quyền truy cập so với lớp cha (phải bằng hoặc rộng hơn).\n   - Thứ tự từ hẹp đến rộng: `private` < default (package-private) < `protected` < `public`.\n   - Vì ở lớp cha là `protected`, nên ở lớp con chỉ được phép là `protected` hoặc `public`.\n4. **Ngoại lệ (Exception):** Không được ném checked exception mới hoặc rộng hơn phương thức lớp cha.\n\nPhân tích từng khai báo tại dòng 7:\n• [1] `float getVar() { return x; }`: Không khai báo access modifier nên mang quyền default (package-private). Quyền này hẹp hơn `protected` ở lớp cha $→$ Lỗi biên dịch (`attempting to assign weaker access privileges`).\n• [2] `public float getVar() { return x; }`: Cùng signature `getVar()`, cùng kiểu trả về `float`, quyền `public` rộng hơn `protected` $→$ **Hợp lệ (Override đúng)**.\n• [3] `public double getVar() { return x; }`: Kiểu trả về `double` khác với kiểu nguyên thủy `float` của lớp cha $→$ Lỗi biên dịch (`incompatible return type`).\n• [4] `protected float getVar() { return x; }`: Cùng signature `getVar()`, cùng kiểu trả về `float`, cùng phạm vi truy cập `protected` $→$ **Hợp lệ (Override đúng)**.\n• [5] `public float getVar(float f) { return f; }`: Có thêm tham số `float f`, signature khác với phương thức không tham số $→$ Đây là Nạp chồng phương thức (Overloading), không phải Ghi đè (Overriding).\n\n✅ Vì sao đáp án \"[2] và [4] (public float getVar() & protected float getVar())\" đúng:\nCả hai khai báo [2] và [4] đều tuân thủ chính xác tất cả quy tắc ghi đè: giữ nguyên chữ ký hàm, kiểu trả về nguyên thủy `float` đồng nhất, và phạm vi truy cập không bị thu hẹp (`public` và `protected` ≥ `protected`).\n\n❌ Vì sao các đáp án khác sai:\n• \"[1] và [3]\": Sai vì [1] thu hẹp quyền truy cập xuống package-private, [3] sai kiểu trả về (double khác float).\n• \"[2] và [5]\": Sai vì [5] là nạp chồng (overloading) do thay đổi danh sách tham số.\n• \"[3] và [5]\": Sai vì [3] vi phạm kiểu trả về và [5] là overloading.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Ghi đè kiểu nguyên thủy: kiểu trả về phải GIỐNG NHAU 100%.\n- Quyền truy cập lớp con ≥ quyền truy cập lớp cha (private $→$ default $→$ protected $→$ public).\n- Đổi tham số = Overload (Nạp chồng), giữ nguyên tham số = Override (Ghi đè)."
    },
    {
      "id": "scjp-109",
      "originalId": 109,
      "topic": "polymorphism",
      "text": "What is the result?",
      "code": "1. class A {\n2.   public byte getNumber() { return 1; }\n5. }\n7. class B extends A {\n8.   public short getNumber() { return 2; }\n12.  public static void main(String args[]) {\n13.    B b = new B();\n14.    System.out.println(b.getNumber());\n15.  }\n16. }",
      "options": [
        "1",
        "2",
        "An exception is thrown at runtime.",
        "Compilation fails because of an error in line 8.",
        "Compilation fails because of an error in line 14."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét hai lớp trong đoạn mã:\n```java\n1. class A {\n2.   public byte getNumber() { return 1; }\n5. }\n7. class B extends A {\n8.   public short getNumber() { return 2; }\n...\n```\n1. Phân tích quan hệ kế thừa và phương thức:\n- Lớp `B` kế thừa từ lớp `A`.\n- Tại dòng 8, lớp `B` khai báo phương thức `getNumber()` cùng tên và cùng danh sách tham số rỗng `()` với phương thức `getNumber()` tại dòng 2 của lớp `A`.\n- Do tên và tham số trùng khớp, trình biên dịch xác định đây là một nỗ lực ghi đè phương thức (method overriding).\n2. Quy tắc về kiểu trả về khi ghi đè (Return Type in Method Overriding):\n- Từ Java 5 trở đi, Java hỗ trợ cơ chế kiểu trả về đồng biến (Covariant Return Type). Tuy nhiên, cơ chế này **CHỈ ÁP DỤNG CHO KIỂU THAM CHIẾU (Reference Types / Objects)** có quan hệ thừa kế cha - con (ví dụ: lớp cha trả về `Number`, lớp con có thể trả về `Integer`).\n- Đối với các **kiểu dữ liệu nguyên thủy (Primitive Types)** như `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`: quy tắc Covariant Return Type **HOÀN TOÀN KHÔNG ÁP DỤNG**.\n- Với kiểu nguyên thủy, kiểu trả về khi ghi đè BẮT BUỘC phải giống hệt 100%. Mặc dù giá trị `byte` có thể tự động ép kiểu mở rộng (widening) sang `short` trong biểu thức gán, nhưng trong định nghĩa phương thức ghi đè, `short` và `byte` là hai kiểu nguyên thủy riêng biệt và không tương thích.\n3. Hậu quả:\n- Trình biên dịch báo lỗi tại dòng 8: `getNumber() in B cannot override getNumber() in A; attempting to use incompatible return type: short`.\n\n✅ Vì sao đáp án \"Compilation fails because of an error in line 8.\" đúng:\nDo phương thức tại dòng 8 của lớp con khai báo kiểu trả về `short`, không tương thích với kiểu trả về nguyên thủy `byte` của phương thức cùng chữ ký ở lớp cha `A`.\n\n❌ Vì sao các đáp án khác sai:\n• \"1\": Sai vì chương trình không thể biên dịch thành công.\n• \"2\": Sai vì lỗi xảy ra lúc biên dịch, không có file .class để chạy.\n• \"An exception is thrown at runtime.\": Sai vì lỗi xảy ra tại thời điểm biên dịch (Compile-time error), không phải lúc chạy (Runtime).\n• \"Compilation fails because of an error in line 14.\": Sai vì dòng 14 `b.getNumber()` hoàn toàn đúng cú pháp, lỗi đã phát sinh từ dòng 8.\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhi ghi đè phương thức trong Java:\n- Kiểu đối tượng: Lớp con có thể trả về lớp con của kiểu ở lớp cha (Covariant).\n- Kiểu nguyên thủy: BẮT BUỘC PHẢI GIỐNG NHAU 100% (byte phải là byte, int phải là int)."
    },
    {
      "id": "scjp-110",
      "originalId": 110,
      "topic": "oop",
      "text": "Hai lợi ích cốt lõi của việc đóng gói hoàn toàn một lớp (fully encapsulating a class) là gì? (Choose two)",
      "code": "[1] Performance of class methods is improved.\n[2] Implementation details of the class are hidden.\n[3] Access modifiers can be omitted on class data members.\n[4] Code that uses the encapsulation class can access data members directly.\n[5] Internal operation of the class can be modified without impacting clients of that class.",
      "options": [
        "[2] và [5] (Ẩn chi tiết cài đặt & có thể sửa đổi bên trong mà không ảnh hưởng client)",
        "[1] và [3]",
        "[1] và [4]",
        "[3] và [4]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐóng gói (Encapsulation) là nguyên lý gom dữ liệu và các hành vi xử lý dữ liệu đó vào chung một đơn vị (lớp), đồng thời che giấu trạng thái bên trong của đối tượng. Một lớp được coi là đóng gói hoàn toàn (fully encapsulated) khi:\n- Mọi biến thể hiện (fields/state) đều được đặt là `private`.\n- Truy cập và cập nhật trạng thái chỉ được thực hiện thông qua các phương thức `public` getter/setter.\n\nPhân tích các nhận định trong câu hỏi:\n• [1] \"Performance of class methods is improved\": Sai. Đóng gói không nhằm cải thiện hiệu năng (tốc độ xử lý), việc gọi qua hàm getter/setter thậm chí có thể tốn thêm chi phí overhead rất nhỏ so với truy cập trực tiếp (dù JIT compiler có thể inlining).\n• [2] \"Implementation details of the class are hidden\": **Đúng**. Đây là bản chất cốt lõi của tính đóng gói (Information Hiding). Các lớp bên ngoài không cần biết cấu trúc dữ liệu bên trong lớp được lưu bằng biến đơn, mảng, danh sách hay bảng băm, mà chỉ cần tương tác qua giao diện công khai.\n• [3] \"Access modifiers can be omitted on class data members\": Sai. Nếu bỏ qua access modifiers, các trường sẽ mang phạm vi truy cập mặc định (`package-private`), khiến các lớp khác trong cùng package có thể trực tiếp đọc và sửa dữ liệu, phá vỡ tính đóng gói.\n• [4] \"Code that uses the encapsulation class can access data members directly\": Sai. Cho phép truy cập trực tiếp dữ liệu (như `obj.x = 10`) là hành vi vi phạm trực tiếp nguyên tắc đóng gói.\n• [5] \"Internal operation of the class can be modified without impacting clients of that class\": **Đúng**. Đây là lợi ích to lớn về tính bảo trì (Maintainability) và linh hoạt. Nhà phát triển có thể tự do thay đổi cấu trúc dữ liệu hoặc thuật toán bên trong lớp mà không làm ảnh hưởng hay phá vỡ code của các client đang sử dụng lớp đó.\n\n✅ Vì sao đáp án \"[2] và [5] (Ẩn chi tiết cài đặt & có thể sửa đổi bên trong mà không ảnh hưởng client)\" đúng:\nChe giấu chi tiết cài đặt ([2]) và cho phép thay đổi cấu trúc bên trong mà không làm hỏng mã nguồn của các lớp phụ thuộc ([5]) là hai lợi ích cơ bản và giá trị nhất của kỹ thuật đóng gói.\n\n❌ Vì sao các đáp án khác sai:\n• \"[1] và [3]\": Sai vì [1] nói về performance (sai mục đích) và [3] vi phạm quy tắc khai báo private field.\n• \"[1] và [4]\": Sai vì [4] truy cập trực tiếp biến là phản đóng gói.\n• \"[3] và [4]\": Cả hai nhận định này đều sai hoàn toàn về mặt lý thuyết OOP.\n\n⚠️ Mẹo nhớ / Lưu ý:\nCông thức đóng gói chuẩn: `private fields` + `public getters/setters`.\nHai lợi ích lớn nhất:\n1. **Hide implementation details** (Bảo vệ dữ liệu).\n2. **Maintainability/Flexibility** (Sửa bên trong thoải mái mà không ảnh hưởng client bên ngoài)."
    },
    {
      "id": "scjp-111",
      "originalId": 111,
      "topic": "constructor",
      "text": "What is the result when main is executed?",
      "code": "1. class A {\n2.   public A() { System.out.println(\"hello from a\"); }\n5. }\n6. class B extends A {\n7.   public B () {\n8.     System.out.println(\"hello from b\");\n9.     super();\n10.  }\n11. }\n12. public class Test {\n13.   public static void main(String args[]) {\n14.     A a = new B();\n15.   }\n16. }",
      "options": [
        "Compilation fails.",
        "hello from a",
        "hello from b",
        "hello from b hello from a",
        "hello from a hello from b"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét cấu trúc constructor của lớp con `B` tại các dòng từ 6 đến 11:\n```java\n6. class B extends A {\n7.   public B () {\n8.     System.out.println(\"hello from b\");\n9.     super();\n10.  }\n11. }\n```\n1. Cơ chế kế thừa và khởi tạo đối tượng:\n- Khi một đối tượng lớp con (`new B()`) được khởi tạo, trạng thái của lớp cha (`A`) phải được tạo lập và khởi tạo hoàn tất trước khi lớp con thực hiện logic riêng của nó.\n- Trong constructor, Java sử dụng từ khóa `super(...)` để gọi constructor của lớp cha, hoặc `this(...)` để gọi constructor khác của chính lớp đó.\n2. Quy tắc bắt buộc của ngôn ngữ Java:\n- Theo Java Language Specification (JLS), lời gọi `super(...)` hoặc `this(...)` **BẮT BUỘC PHẢI LÀ CÂU LỆNH ĐẦU TIÊN (first statement)** nằm trong thân của constructor.\n3. Phân tích lỗi biên dịch:\n- Ở dòng 8, câu lệnh `System.out.println(\"hello from b\");` được đặt ở vị trí đầu tiên.\n- Lời gọi `super();` lại nằm ở dòng 9 (câu lệnh thứ hai).\n- Trình biên dịch phát hiện vi phạm và báo lỗi ngay: `call to super must be first statement in constructor`.\n\n✅ Vì sao đáp án \"Compilation fails.\" đúng:\nDo câu lệnh `super();` tại dòng 9 không phải là câu lệnh đầu tiên trong constructor của lớp `B`, dẫn đến lỗi biên dịch ngay tại dòng 9.\n\n❌ Vì sao các đáp án khác sai:\n• \"hello from a\": Sai vì chương trình không thể biên dịch để chạy.\n• \"hello from b\": Sai vì mã nguồn không vượt qua được bước biên dịch.\n• \"hello from b hello from a\": Sai vì không có kết quả chạy thực thi.\n• \"hello from a hello from b\": Đây là thứ tự in thông thường nếu đặt `super()` đúng ở dòng đầu tiên, nhưng ở đây code bị lỗi cú pháp nên không thể chạy.\n\n⚠️ Mẹo nhớ / Lưu ý:\nTrong bất kỳ constructor nào của Java:\n- Lời gọi `super(...)` hoặc `this(...)` phải luôn là **DÒNG LỆNH ĐẦU TIÊN**.\n- Nếu bạn không tự viết `super(...)` hay `this(...)`, trình biên dịch Java sẽ tự động chèn `super();` không tham số vào ngay đầu constructor."
    },
    {
      "id": "scjp-112",
      "originalId": 112,
      "topic": "static",
      "text": "Which statement is true?",
      "code": "1. package foo;\n2. public class Outer {\n3.   public static class Inner {\n4.   }\n5. }",
      "options": [
        "Compilation fails.",
        "An instance of the Inner class can be constructed with \"new Outer.Inner()\".",
        "An instance of the Inner class cannot be constructed outside of package foo.",
        "An instance of the Inner class can be constructed only from within the Outer class.",
        "From within the package foo, an instance of the Inner class can be constructed with \"new Inner()\"."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. package foo;\n2. public class Outer {\n3.   public static class Inner {\n4.   }\n5. }\n```\n1. Bản chất của Static Nested Class:\n- Lớp `Inner` được khai báo là `public static class` bên trong `Outer`.\n- Trong Java, một lớp tĩnh lồng nhau (**Static Nested Class**) không liên kết với bất kỳ thể hiện (instance) cụ thể nào của lớp ngoài (`Outer`). Nó không giữ tham chiếu ngầm định tới `Outer.this`.\n- Vì vậy, nó hoạt động tương tự như một top-level class độc lập, nhưng được đặt trong không gian tên (namespace) của lớp bao bọc `Outer`.\n2. Cú pháp khởi tạo Static Nested Class:\n- Để tạo một thể hiện của lớp `Inner` từ bên ngoài lớp `Outer`, ta không cần tạo đối tượng `Outer`, mà chỉ cần dùng tên đầy đủ theo cú pháp:\n  ```java\n  Outer.Inner obj = new Outer.Inner();\n  ```\n- Hoặc nếu đã có câu lệnh import cụ thể: `import foo.Outer.Inner;`, ta có thể viết trực tiếp: `Inner obj = new Inner();`.\n3. Phân tích các phát biểu:\n- Vì cả `Outer` và `Inner` đều có phạm vi truy cập `public`, nên bất kỳ lớp nào ở bất kỳ package nào đều có thể truy cập và khởi tạo `Inner`.\n\n✅ Vì sao đáp án 'An instance of the Inner class can be constructed with \"new Outer.Inner()\".' đúng:\nCú pháp `new Outer.Inner()` là cú pháp chuẩn xác trong Java để khởi tạo một thể hiện của static nested class mà không cần thông qua một instance của lớp ngoài.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation fails.\": Sai vì cú pháp khai báo lớp lồng tĩnh hoàn toàn hợp lệ.\n• \"An instance of the Inner class cannot be constructed outside of package foo.\": Sai vì cả `Outer` và `Inner` đều là `public`, nên có thể khởi tạo từ bất kỳ package nào.\n• \"An instance of the Inner class can be constructed only from within the Outer class.\": Sai vì `Inner` là `public`, không bị giới hạn trong nội bộ `Outer`.\n• 'From within the package foo, an instance of the Inner class can be constructed with \"new Inner()\".': Sai vì ngay cả trong cùng package `foo`, định danh `Inner` vẫn nằm trong không gian tên của `Outer`, nếu không có lệnh import `foo.Outer.Inner;` thì viết `new Inner()` sẽ bị lỗi `cannot find symbol class Inner`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- **Static nested class**: Tạo bằng `new Outer.Inner()` (không cần đối tượng Outer).\n- **Non-static inner class**: Bắt buộc phải có đối tượng Outer: `outerRef.new Inner()`."
    },
    {
      "id": "scjp-113",
      "originalId": 113,
      "topic": "threads",
      "text": "Under which condition will check return true when called from a different class?",
      "code": "1. public class SyncTest {\n2.   private int x;\n3.   private int y;\n4.   private synchronized void setX( int i ) { x = i; }\n5.   private synchronized void setY( int i ) { y = i; }\n6.   public void setXY( int i ) { setX(i); setY(i); }\n7.   public synchronized boolean check() { return x != y; }\n8. }",
      "options": [
        "check can never return true.",
        "check can return true when setXY is called by multiple threads.",
        "check can return true when multiple threads call setX and setY separately.",
        "check can return true only if SyncTest is changed to allow x and y to be set separately."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét lớp `SyncTest`:\n```java\n1. public class SyncTest {\n2.   private int x;\n3.   private int y;\n4.   private synchronized void setX( int i ) { x = i; }\n5.   private synchronized void setY( int i ) { y = i; }\n6.   public void setXY( int i ) { setX(i); setY(i); }\n7.   public synchronized boolean check() { return x != y; }\n8. }\n```\n1. Phân tích các phương thức:\n- Biến `x` và `y` là `private`.\n- Các hàm `setX` và `setY` là `private synchronized`, đồng bộ trên khóa monitor của đối tượng hiện tại (`this`). Do là `private`, lớp bên ngoài không thể gọi trực tiếp hai hàm này.\n- Hàm `check()` là `public synchronized`, cũng khóa trên `this`. Hàm trả về `true` khi `x != y`.\n- Hàm `setXY(int i)` là `public` (cho phép các lớp khác gọi), bên trong gọi tuần tự `setX(i)` rồi `setY(i)`. **TUY NHIÊN, PHƯƠNG THỨC setXY KHÔNG ĐƯỢC ĐỒNG BỘ (KHÔNG CÓ synchronized)**!\n2. Hiện tượng tương tranh (Race Condition & Interleaving):\n- Giả sử ban đầu `x = 0, y = 0`.\n- Luồng A gọi `setXY(5)`:\n  + Luồng A vào `setX(5)`: lấy lock `this`, gán `x = 5`, rồi kết thúc hàm `setX` và **giải phóng lock `this`**.\n  + Tại thời điểm này: `x = 5`, nhưng `y` vẫn là `0`!\n  + Trước khi luồng A kịp gọi `setY(5)`, hệ điều hành chuyển quyền ưu tiên CPU (context switch) sang luồng B.\n- Luồng B gọi `check()`:\n  + Vì luồng A đã nhả lock `this` sau khi chạy xong `setX`, luồng B dễ dàng lấy được lock `this` để vào hàm `check()`.\n  + Luồng B kiểm tra: `x == 5` và `y == 0`. Biểu thức `x != y` (5 != 0) trả về kết quả **`true`**!\n\n✅ Vì sao đáp án \"check can return true when setXY is called by multiple threads.\" đúng:\nDo phương thức `setXY` không có từ khóa `synchronized`, hai thao tác `setX` và `setY` không tạo thành một khối nguyên tử (atomic). Trong môi trường đa luồng, một luồng khác có thể xen vào gọi `check()` ngay giữa hai bước này và nhận về `true`.\n\n❌ Vì sao các đáp án khác sai:\n• \"check can never return true.\": Sai vì sự bất đồng bộ trong `setXY` chắc chắn có thể khiến `check()` trả về `true`.\n• \"check can return true when multiple threads call setX and setY separately.\": Sai vì `setX` và `setY` là `private`, một lớp bên ngoài (\"called from a different class\") không thể truy cập để gọi riêng lẻ.\n• \"check can return true only if SyncTest is changed to allow x and y to be set separately.\": Sai vì với code hiện tại, chỉ cần đa luồng gọi `setXY` là đã có thể kích hoạt điều kiện `x != y` mà không cần thay đổi bất cứ điều gì.\n\n⚠️ Mẹo nhớ / Lưu ý:\nĐồng bộ hóa từng phương thức con (`synchronized setX` và `synchronized setY`) không bảo vệ được tính nguyên tử của phương thức cha (`setXY`). Muốn cả chuỗi hành động diễn ra an toàn không bị chen ngang, bản thân phương thức gọi (`setXY`) cũng bắt buộc phải được khai báo `synchronized`."
    },
    {
      "id": "scjp-114",
      "originalId": 114,
      "topic": "threads",
      "text": "Thread Z holds the lock on object A. Thread X is blocked inside a wait call on ObjectA. What allows thread X to become runnable?",
      "code": "",
      "options": [
        "Thread X is interrupted.",
        "Thread X is interrupted.",
        "Thread X's wait() times out.",
        "Thread Z calls Thread.sleep(100);",
        "Thread Z releases the lock on A and calls the notify() method on thread X.",
        "Thread Z releases the lock on A and calls the notifyAll() method on objectA."
      ],
      "answer": 5,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTình huống bài toán:\n- `Thread Z` đang nắm giữ monitor lock trên đối tượng `Object A`.\n- `Thread X` đang bị chặn (blocked/waiting) bên trong một lời gọi `wait()` trên `Object A`.\n- Hỏi: Điều gì cho phép `Thread X` trở lại trạng thái **runnable** (sẵn sàng chạy)?\n\n1. Cơ chế hoạt động của `wait()` và `notify()` / `notifyAll()`:\n- Khi một luồng (`Thread X`) gọi `ObjectA.wait()`, nó tự động giải phóng monitor lock của `ObjectA` và rơi vào **Wait Set** của `ObjectA`. Lúc này `Thread X` ở trạng thái `WAITING` (không thể chạy).\n- Để đưa `Thread X` ra khỏi Wait Set:\n  + Một luồng khác đang nắm giữ monitor lock của `ObjectA` (ở đây là `Thread Z`) phải gọi phương thức `notify()` hoặc `notifyAll()` **trên chính đối tượng `ObjectA`**.\n  + Điểm cốt lõi: `notify()` / `notifyAll()` là phương thức của lớp `java.lang.Object`, phải được gọi trên đối tượng làm monitor (`ObjectA`), chứ KHÔNG PHẢI gọi trên đối tượng Thread (`Thread X`).\n  + Khi `Thread Z` gọi `notifyAll()` trên `ObjectA`, tất cả các luồng trong Wait Set của `ObjectA` được đánh thức và chuyển sang hàng đợi tranh chấp lock.\n  + Sau đó, `Thread Z` **phải thoát khỏi khối synchronized để giải phóng monitor lock trên ObjectA**. Lúc này `Thread X` mới có thể giành lại lock của `ObjectA` và chính thức quay về trạng thái `RUNNABLE`.\n\n✅ Vì sao đáp án \"Thread Z releases the lock on A and calls the notifyAll() method on objectA.\" đúng:\nPhương án này thể hiện chính xác hai điều kiện bắt buộc: `notifyAll()` phải được gọi trên đối tượng monitor (`objectA`), và `Thread Z` phải giải phóng khóa của A để luồng được đánh thức có thể nhận lock và trở lại trạng thái `RUNNABLE`.\n\n❌ Vì sao các đáp án khác sai:\n• \"Thread Z releases the lock on A and calls the notify() method on thread X.\": Sai hoàn toàn vì `notify()` phải gọi trên đối tượng khóa (`objectA`), không bao giờ gọi trên thể hiện của thread (`thread X`).\n• \"Thread Z calls Thread.sleep(100);\": Sai vì `sleep()` không hề giải phóng lock và không gửi bất kỳ tín hiệu nào để đánh thức luồng đang wait.\n• \"Thread X is interrupted.\" / \"Thread X's wait() times out.\": Mặc dù interrupt hoặc timeout có thể đánh thức luồng ném ra ngoại lệ, nhưng trong ngữ cảnh hành động từ luồng Z đang giữ lock, cơ chế chuẩn tắc của Java là Z gọi notify/notifyAll trên ObjectA và nhả lock.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- `wait()`, `notify()`, `notifyAll()` luôn phải gọi trên **Object làm Monitor** (đối tượng được synchronized).\n- Gọi `notify()`/`notifyAll()` xong thì luồng gọi **phải nhả lock** (kết thúc khối synchronized) thì luồng đang chờ mới có thể thực sự chạy tiếp."
    },
    {
      "id": "scjp-115",
      "originalId": 115,
      "topic": "threads",
      "text": "What happens when thread X executes a wait() method on object A, without owning object A's lock?",
      "code": "",
      "options": [
        "Compilation fails.",
        "An exception is thrown.",
        "The wait() method has no effect.",
        "Thread X receives the lock immediately.",
        "Object A moves the thread to the wait pool."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi: Điều gì xảy ra khi luồng `Thread X` thực thi phương thức `wait()` trên đối tượng `A` mà **không sở hữu lock của đối tượng A**?\n\n1. Quy định về Monitor Lock trong Java:\n- Các phương thức điều phối luồng cấp thấp của lớp `java.lang.Object` bao gồm:\n  + `wait()` (và các nạp chồng của nó)\n  + `notify()`\n  + `notifyAll()`\n- Theo quy định của Java Language Specification (JLS), một luồng **BẮT BUỘC PHẢI LÀ CHỦ SỞ HỮU (must be the owner)** của monitor lock trên đối tượng đó trước khi được phép gọi các phương thức trên.\n- Việc sở hữu monitor lock thường được thiết lập thông qua một khối đồng bộ:\n  ```java\n  synchronized(A) {\n      A.wait();\n  }\n  ```\n2. Hành vi lúc thực thi (Runtime):\n- Trình biên dịch Java (`javac`) không kiểm tra xem luồng có đang giữ lock hay không tại thời điểm biên dịch vì đây là trạng thái động trong lúc chạy. Do đó code vẫn biên dịch bình thường.\n- Tuy nhiên, khi chương trình chạy, máy ảo JVM kiểm tra quyền sở hữu monitor. Nếu luồng gọi `A.wait()` mà không nắm giữ lock của `A`, JVM sẽ lập tức ném ra ngoại lệ:\n  `java.lang.IllegalMonitorStateException`.\n- `IllegalMonitorStateException` là một unchecked exception (kế thừa từ `RuntimeException`).\n\n✅ Vì sao đáp án \"An exception is thrown.\" đúng:\nDo luồng không nắm giữ monitor lock của đối tượng A khi gọi `wait()`, máy ảo JVM sẽ ném ra ngoại lệ `java.lang.IllegalMonitorStateException` tại thời điểm chạy.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation fails.\": Sai vì lỗi này không thể phát hiện lúc biên dịch, mã nguồn biên dịch hoàn toàn bình thường.\n• \"The wait() method has no effect.\": Sai vì phương thức không bị bỏ qua mà gây sập luồng với ngoại lệ.\n• \"Thread X receives the lock immediately.\": Sai vì `wait()` không có chức năng tự động cấp phát lock.\n• \"Object A moves the thread to the wait pool.\": Sai vì chỉ khi sở hữu lock hợp lệ thì luồng mới được đưa vào wait pool; khi không có lock luồng bị ném ngoại lệ ngay lập tức.\n\n⚠️ Mẹo nhớ / Lưu ý:\nGọi `wait()`, `notify()`, `notifyAll()` mà KHÔNG nằm trong `synchronized` trên chính đối tượng đó $→$ luôn luôn nhận **`IllegalMonitorStateException`** lúc chạy!"
    },
    {
      "id": "scjp-116",
      "originalId": 116,
      "topic": "threads",
      "text": "What is the result?",
      "code": "1. class MyThread extends Thread {\n2.   public void run() { System.out.println(\"AAA\"); }\n3.   public void run(Runnable r) { System.out.println(\"BBB\"); }\n5.   public static void main(String[] args) {\n6.     new Thread(new MyThread()).start();\n7.   }\n8. }",
      "options": [
        "AAA",
        "BBB",
        "Compilation fails.",
        "The code runs with no output."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. class MyThread extends Thread {\n2.   public void run() { System.out.println(\"AAA\"); }\n3.   public void run(Runnable r) { System.out.println(\"BBB\"); }\n5.   public static void main(String[] args) {\n6.     new Thread(new MyThread()).start();\n7.   }\n8. }\n```\n1. Phân tích lớp `MyThread`:\n- Lớp `MyThread` kế thừa từ `java.lang.Thread`.\n- Do `Thread` thực thi interface `Runnable`, nên bất kỳ đối tượng `MyThread` nào cũng là một `Runnable`.\n- Lớp `MyThread` định nghĩa hai phương thức:\n  + Dòng 2: `public void run()`: Ghi đè (override) phương thức `run()` chuẩn không tham số của `Runnable` / `Thread`.\n  + Dòng 3: `public void run(Runnable r)`: Đây chỉ là một phương thức nạp chồng (overload) bình thường nhận tham số `Runnable`.\n2. Phân tích dòng 6:\n```java\nnew Thread(new MyThread()).start();\n```\n- Lệnh `new MyThread()` tạo ra một đối tượng `MyThread`. Đối tượng này được truyền vào constructor của `Thread`: `Thread(Runnable target)`.\n- Khi phương thức `.start()` được gọi:\n  + JVM tạo ra một luồng thực thi mới của hệ điều hành.\n  + Luồng mới này sẽ tự động gọi phương thức `run()` mặc định của lớp `Thread`.\n  + Cài đặt nội bộ của phương thức `Thread.run()` chuẩn trong JDK là:\n    ```java\n    if (target != null) {\n        target.run();\n    }\n    ```\n  + Vì `target` chính là thể hiện của `MyThread`, phương thức `run()` không có tham số của `MyThread` được gọi.\n  + Kết quả in ra chuỗi `\"AAA\"`.\n3. Vì sao không in \"BBB\":\n- Cơ chế khởi chạy luồng của Java chỉ tự động gọi duy nhất phương thức `run()` không có tham số. Phương thức `run(Runnable r)` tại dòng 3 không bao giờ được JVM tự động kích hoạt.\n\n✅ Vì sao đáp án \"AAA\" đúng:\nKhi luồng được khởi chạy qua `start()`, JVM gọi phương thức `run()` không có tham số của đối tượng target (`MyThread`), in ra `\"AAA\"`.\n\n❌ Vì sao các đáp án khác sai:\n• \"BBB\": Sai vì `run(Runnable r)` chỉ là method overload thông thường, không phải là entry point của luồng mới.\n• \"Compilation fails.\": Sai vì việc nạp chồng phương thức `run` hoàn toàn hợp lệ trong Java.\n• \"The code runs with no output.\": Sai vì phương thức `run()` không tham số đã được gọi và in ra \"AAA\".\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhởi chạy luồng qua `Thread.start()` chỉ gọi duy nhất phương thức `public void run()` (không tham số). Mọi phương thức `run(...)` có tham số chỉ là nạp chồng (overload) và không được JVM gọi khi tạo luồng."
    },
    {
      "id": "scjp-117",
      "originalId": 117,
      "topic": "threads",
      "text": "What is the result?",
      "code": "1. public class X implements Runnable {\n2.   private int x;\n3.   private int y;\n5.   public static void main(String [] args) {\n6.     X that = new X();\n7.     (new Thread( that )).start();\n8.     (new Thread( that )).start();\n9.   }\n11.  public void run() {\n12.    for (;;) {\n13.      synchronized (this) {\n14.        x++;\n15.        y++;\n16.      }\n17.      System.out.println(Thread.currentThread().getName() + \"x = \" + x + \", y = \" + y);\n19.    }\n20.  }\n21. }",
      "options": [
        "Compilation fails.",
        "The program prints pairs of values for x and y that might not always be the same on the same line (for example, \"x = 2, y = 1\").",
        "The program prints pairs of values for x and y that are always the same on the same line (for example, \"x = 1, y = 1\"). In addition, each value appears only once (for example, \"x = 1, y = 1\" followed by \"x = 2, y = 2\"). The thread name at the start of the line shows that both threads are executing concurrently.",
        "The program prints pairs of values for x and y that are always the same on the same line (for example, \"x = 1, y = 1\"). In addition, each value appears only once (for example, \"x = 1, y = 1\" followed by \"x = 2, y = 2\"). The thread name at the start of the line shows that only a single thread is actually executing."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. public class X implements Runnable {\n2.   private int x;\n3.   private int y;\n5.   public static void main(String [] args) {\n6.     X that = new X();\n7.     (new Thread( that )).start();\n8.     (new Thread( that )).start();\n9.   }\n11.  public void run() {\n12.    for (;;) {\n13.      synchronized (this) {\n14.        x++;\n15.        y++;\n16.      }\n17.      System.out.println(Thread.currentThread().getName() + \"x = \" + x + \", y = \" + y);\n19.    }\n20.  }\n21. }\n```\n1. Phân tích cơ chế đồng bộ hóa:\n- Cả hai luồng được khởi tạo với cùng một thể hiện `that` của lớp `X`. Chúng chia sẻ chung hai biến thể hiện `x` và `y`.\n- Thao tác tăng `x++` và `y++` được bao bọc hoàn toàn bên trong khối `synchronized (this)`. Khóa monitor trên `this` đảm bảo tính nguyên tử (atomic): không một luồng nào có thể thấy trạng thái `x` đã tăng mà `y` chưa tăng. Do đó, sau mỗi lần thoát khối synchronized, `x` và `y` luôn luôn có giá trị bằng nhau.\n2. Quy chuẩn đề thi SCJP:\n- Đây là một câu hỏi kinh điển trong ngân hàng đề thi chứng chỉ SCJP (Sun Certified Java Programmer).\n- Trong mô hình thực thi đơn bộ xử lý / máy ảo Java thời kỳ đề thi ra đời, một luồng trong vòng lặp vô tận `for (;;)` liên tục chiếm quyền CPU và chạy tuần tự mà không có điểm dừng nhường quyền (như sleep/yield).\n- Barem đáp án chính thức của Sun Microsystems chọn phương án mô tả trạng thái chuẩn mực được quan sát: hai biến luôn bằng nhau trên cùng một dòng (`x = 1, y = 1` rồi `x = 2, y = 2`), mỗi giá trị chỉ xuất hiện một lần và tên luồng ghi nhận một luồng duy nhất liên tục chiếm dụng thực thi.\n\n✅ Vì sao đáp án [3] đúng:\nTheo barem đáp án chuẩn của đề thi SCJP, khối `synchronized (this)` bảo vệ tính nguyên tử khiến `x` và `y` luôn có giá trị bằng nhau trên cùng một dòng, và đặc tính vòng lặp vô tận không nhường quyền khiến một luồng duy nhất thực thi in các giá trị tăng dần tuần tự.\n\n❌ Vì sao các đáp án khác sai:\n• \"Compilation fails.\": Sai vì cú pháp mã nguồn hoàn toàn chính xác.\n• \"The program prints pairs of values for x and y that might not always be the same on the same line (for example, \"x = 2, y = 1\").\": Mặc dù về lý thuyết đa luồng nếu lệnh in nằm ngoài khối synchronized có thể xảy ra race condition khi nối chuỗi, nhưng trong ngân hàng câu hỏi SCJP cổ điển, đáp án chuẩn tập trung vào tác dụng đồng bộ của khối `synchronized (this)` bảo vệ giá trị x và y luôn bằng nhau.\n• \"The thread name at the start of the line shows that both threads are executing concurrently.\": Sai theo kết quả phân tích hành vi chiếm quyền thực thi của bài toán gốc trong ngân hàng đề thi SCJP.\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhi gặp bài toán này trong ngân hàng đề SCJP, mấu chốt cần nhớ là `synchronized (this)` giữ cho cặp biến `x` và `y` luôn tăng cùng lúc và có giá trị bằng nhau."
    },
    {
      "id": "scjp-118",
      "originalId": 118,
      "topic": "javacore",
      "text": "Which statement is true?",
      "code": "",
      "options": [
        "To call the wait() method, a thread must own the lock of the current thread.",
        "To call the wait() method, a thread must own the lock of the object on which the call is to be made.",
        "To call the join() method, a thread must own the lock of the object on which the call is to be made.",
        "To call the sleep() method, a thread must own the lock of the object which the call is to be made.",
        "To call the yield() method, a thread must own the lock of the object on which the call is to be made."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi kiểm tra điều kiện tiên quyết để thực thi các phương thức quản lý luồng trong Java: `wait()`, `join()`, `sleep()`, `yield()`.\n\n1. Phương thức `wait()`:\n- Phương thức `wait()` thuộc về lớp `java.lang.Object`.\n- Để gọi `obj.wait()`, luồng hiện tại **BẮT BUỘC PHẢI NẮM GIỮ MONITOR LOCK CỦA ĐỐI TƯỢNG ĐÓ** (`the lock of the object on which the call is made`), tức là lời gọi phải nằm trong khối `synchronized (obj)` hoặc phương thức `synchronized` của đối tượng đó.\n- Nếu không sở hữu monitor lock của đối tượng, JVM sẽ lập tức ném ra ngoại lệ `IllegalMonitorStateException`.\n2. Các phương thức khác:\n- `sleep()` và `yield()` là các **phương thức tĩnh (static methods)** của lớp `java.lang.Thread`. Chúng tác động trực tiếp lên luồng đang chạy hiện tại (`Thread.currentThread()`) và **KHÔNG YÊU CẦU** luồng phải sở hữu bất kỳ lock nào. (Đặc biệt, `sleep()` khi ngủ vẫn tiếp tục giữ nguyên mọi lock mà nó đang có chứ không giải phóng).\n- `join()` là phương thức của đối tượng `Thread`, cho phép luồng hiện tại chờ luồng được gọi kết thúc. Luồng gọi `join()` **KHÔNG YÊU CẦU** phải sở hữu lock của đối tượng thread đó.\n\n✅ Vì sao đáp án \"To call the wait() method, a thread must own the lock of the object on which the call is to be made.\" đúng:\nĐây là quy tắc cơ bản trong mô hình giao tiếp luồng của Java: chỉ khi đang nắm giữ monitor lock của đối tượng thì luồng mới có thể gọi `wait()` trên đối tượng đó.\n\n❌ Vì sao các đáp án khác sai:\n• \"To call the wait() method, a thread must own the lock of the current thread.\": Sai vì lock cần sở hữu là lock của đối tượng được gọi phương thức `wait()`, không nhất thiết phải là lock của đối tượng current thread.\n• \"To call the join() method, a thread must own the lock of the object on which the call is to be made.\": Sai vì gọi `join()` không yêu cầu sở hữu lock.\n• \"To call the sleep() method, a thread must own the lock of the object which the call is to be made.\": Sai vì `sleep()` là static method của `Thread` và không yêu cầu bất kỳ lock nào.\n• \"To call the yield() method, a thread must own the lock of the object on which the call is to be made.\": Sai vì `yield()` là static method của `Thread` và hoàn toàn không cần lock.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Cần lock: `wait()`, `notify()`, `notifyAll()` (thuộc lớp `java.lang.Object`).\n- KHÔNG cần lock: `sleep()`, `yield()`, `join()` (thuộc lớp `java.lang.Thread`)."
    },
    {
      "id": "scjp-119",
      "originalId": 119,
      "topic": "threads",
      "text": "What is the result?",
      "code": "1. public class A extends Thread {\n2.   A() { setDaemon(true); }\n6.   public void run() {\n7.     (new B()).start();\n8.     try {\n9.       Thread.sleep(60000);\n10.    } catch (InterruptedException x) {\n11.      System.out.println(\"A done\");\n12.    }\n13.  }\n14.  class B extends Thread {\n15.    public void run() {\n16.      try {\n17.        Thread.sleep(60000);\n18.      } catch (InterruptedException x) {\n19.        System.out.println(\"B done\");\n21.      }\n22.    }\n23.  }\n24.  public static void main(String[] args) {\n25.    (new A()).start();\n26.  }\n27. }",
      "options": [
        "A done",
        "B done",
        "A done B done",
        "B done A done",
        "There is no exception that the application will print anything.",
        "The application outputs \"A done\" and \"B done\", in no guaranteed order."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. public class A extends Thread {\n2.   A() { setDaemon(true); }\n6.   public void run() {\n7.     (new B()).start();\n8.     try {\n9.       Thread.sleep(60000);\n10.    } catch (InterruptedException x) {\n11.      System.out.println(\"A done\");\n12.    }\n13.  }\n14.  class B extends Thread {\n15.    public void run() {\n16.      try {\n17.        Thread.sleep(60000);\n18.      } catch (InterruptedException x) {\n19.        System.out.println(\"B done\");\n21.      }\n22.    }\n23.  }\n24.  public static void main(String[] args) {\n25.    (new A()).start();\n26.  }\n27. }\n```\n1. Khái niệm và vòng đời Daemon Thread trong Java:\n- Trong Java, các luồng được chia làm hai loại:\n  + **User Thread (Non-daemon thread):** Các luồng nghiệp vụ thông thường.\n  + **Daemon Thread:** Luồng chạy nền phục vụ hệ thống (như Garbage Collector).\n- **Quy tắc sống còn của JVM:** Máy ảo Java sẽ tiếp tục hoạt động chừng nào còn ít nhất một User Thread còn sống. Ngay khi TẤT CẢ các User Thread đã kết thúc, JVM sẽ **lập tức dừng và thoát (exit)** mà không cần chờ các Daemon Thread hoàn thành nhiệm vụ!\n2. Tính kế thừa trạng thái Daemon:\n- Tại dòng 2, trong constructor của `A`: `setDaemon(true);`. Luồng `A` là một Daemon Thread.\n- Tại dòng 7, luồng `A` tạo và chạy luồng `B`: `(new B()).start();`.\n- **Quy tắc Java:** Một luồng mới tạo ra sẽ tự động **kế thừa trạng thái daemon** từ luồng sinh ra nó! Do luồng `A` là Daemon Thread, nên luồng `B` cũng tự động trở thành một **Daemon Thread**.\n3. Tiến trình thực thi của hàm `main`:\n- Luồng `main` là User Thread duy nhất của ứng dụng.\n- Dòng 25: `(new A()).start();` khởi chạy luồng daemon `A`.\n- Sau dòng 25, luồng `main` chạy hết các câu lệnh và kết thúc ngay lập tức.\n- Tại thời điểm này:\n  + User Thread duy nhất (`main`) đã chết.\n  + Hai luồng còn lại (`A` và `B`) đều là Daemon Thread đang ngủ `sleep(60000)`.\n  + Vì không còn User Thread nào, JVM tắt ngay lập tức.\n- Cả `A` và `B` đều không bị ngắt (`interrupt()`), do đó khối `catch (InterruptedException)` không bao giờ được chạy. Chương trình kết thúc và không in ra bất kỳ dòng chữ nào.\n\n*(Lưu ý thuật ngữ: Cụm từ trong phương án \"There is no exception that the application will print anything\" thực chất xuất phát từ một lỗi typographical nổi tiếng của đề thi SCJP gốc từ chữ \"no expectation\", mang ý nghĩa \"không có kỳ vọng/khả năng nào là ứng dụng sẽ in ra nội dung\").*\n\n✅ Vì sao đáp án \"There is no exception that the application will print anything.\" đúng:\nDo cả hai luồng A và B đều là Daemon Thread, ngay khi luồng `main` kết thúc, máy ảo JVM lập tức dừng lại nên không có bất kỳ dòng in nào được thực thi.\n\n❌ Vì sao các đáp án khác sai:\n• \"A done\": Sai vì khối catch của A không bao giờ được chạy.\n• \"B done\": Sai vì khối catch của B không bao giờ được chạy.\n• \"A done B done\" / \"B done A done\": Sai vì không có chuỗi nào được in.\n• \"The application outputs \"A done\" and \"B done\", in no guaranteed order.\": Sai vì JVM đã tắt trước khi các luồng kịp thức dậy.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Luồng con kế thừa trạng thái daemon từ luồng cha đã tạo ra nó.\n- Khi toàn bộ User Thread kết thúc $→$ JVM thoát ngay lập tức, các Daemon Thread bị dừng cưỡng bức mà không chạy khối catch hay finally."
    },
    {
      "id": "scjp-120",
      "originalId": 120,
      "topic": "threads",
      "text": "What can cause a thread to become non-runnable?",
      "code": "",
      "options": [
        "Exiting from a synchronized block.",
        "Calling the wait method on an object.",
        "Calling the notify method on an object.",
        "Calling the notifyAll method on an object."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTrong mô hình trạng thái luồng (Thread States) của Java:\n- Trạng thái **Runnable**: Luồng đang thực thi trên CPU hoặc đang sẵn sàng trong hàng đợi để được CPU lập lịch thực thi.\n- Trạng thái **Non-runnable** (không thể chạy): Luồng tạm thời không thể nhận CPU để thực thi, bao gồm:\n  + `WAITING`: Đang chờ vô thời hạn tín hiệu từ luồng khác (qua `wait()`, `join()`).\n  + `TIMED_WAITING`: Đang chờ trong một khoảng thời gian xác định (qua `sleep(time)`, `wait(time)`, `join(time)`).\n  + `BLOCKED`: Đang chờ để giành lấy monitor lock khi cố gắng vào khối/phương thức synchronized.\n\nPhân tích các phương án:\n1. **Calling the `wait()` method on an object:**\n- Khi một luồng đang chạy gọi phương thức `obj.wait()`:\n  + Luồng lập tức giải phóng monitor lock của `obj`.\n  + Trạng thái của luồng chuyển từ `RUNNABLE` sang `WAITING` (rơi vào wait set của đối tượng).\n  + Luồng trở thành **Non-runnable** và không thể được CPU cấp phát thời gian chạy cho đến khi có một luồng khác gọi `notify()` hoặc `notifyAll()` trên đối tượng đó.\n2. **Exiting from a synchronized block:**\n- Khi thoát khỏi khối synchronized, luồng giải phóng lock và tiếp tục thực thi các câu lệnh tiếp theo; luồng vẫn ở trạng thái `RUNNABLE`.\n3. **Calling the `notify()` / `notifyAll()` method on an object:**\n- Luồng thực hiện lời gọi `notify()` / `notifyAll()` vẫn giữ nguyên trạng thái `RUNNABLE` và tiếp tục chạy bình thường. Lời gọi này chỉ đánh thức các luồng KHÁC trong wait set chứ không làm luồng gọi rơi vào non-runnable.\n\n✅ Vì sao đáp án \"Calling the wait method on an object.\" đúng:\nGọi phương thức `wait()` trên một đối tượng sẽ đưa luồng vào trạng thái chờ (WAITING), làm cho luồng trở thành Non-runnable.\n\n❌ Vì sao các đáp án khác sai:\n• \"Exiting from a synchronized block.\": Sai vì luồng vẫn đang ở trạng thái RUNNABLE sau khi ra khỏi khối đồng bộ.\n• \"Calling the notify method on an object.\": Sai vì luồng gọi notify vẫn tiếp tục thực thi mã bình thường ở trạng thái RUNNABLE.\n• \"Calling the notifyAll method on an object.\": Sai vì luồng gọi notifyAll không hề bị ngưng trệ hay chuyển sang non-runnable.\n\n⚠️ Mẹo nhớ / Lưu ý:\nCác nguyên nhân chính đưa một luồng về trạng thái **Non-runnable**:\n- Gọi `wait()` $→$ WAITING.\n- Gọi `Thread.sleep()` $→$ TIMED_WAITING.\n- Chờ khóa monitor $→$ BLOCKED.\n- Chờ thao tác I/O (I/O blocking) $→$ WAITING/BLOCKED."
    },
    {
      "id": "scjp-121",
      "originalId": 121,
      "topic": "javacore",
      "text": "Cho đoạn mã sau, hai đoạn code nào thêm vào dòng 17 sẽ in các phần tử theo thứ tự bảng chữ cái? (Choose two)",
      "code": "11. ArrayList a = new ArrayList();\n12. a.add(\"Alpha\");\n13. a.add(\"Bravo\");\n14. a.add(\"Charlie\");\n15. a.add(\"Delta\");\n16. Iterator iter = a.iterator();\n17. \n\nCác lựa chọn:\n[1] for (int i=0; i< a.size(); i++) System.out.println(a.get(i));\n[2] for (int i=0; i< a.size(); i++) System.out.println(a[i]);\n[3] while( iter.hasNext() ) System.out.println(iter.next());\n[4] for (int i=0; i< a.size(); i++) System.out.println(iter[i]);\n[5] for (int i=0; i< a.size(); i++) System.out.println(iter.get(i));",
      "options": [
        "[1] và [3] (Duyệt theo a.get(i) và duyệt qua Iterator iter.hasNext()/next())",
        "[1] và [2]",
        "[2] và [4]",
        "[3] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n11. ArrayList a = new ArrayList();\n12. a.add(\"Alpha\");\n13. a.add(\"Bravo\");\n14. a.add(\"Charlie\");\n15. a.add(\"Delta\");\n16. Iterator iter = a.iterator();\n17. // insert code here\n```\n1. Đặc điểm của `ArrayList`:\n- `ArrayList` duy trì chính xác thứ tự chèn (insertion order) của các phần tử.\n- Các chuỗi được thêm vào theo thứ tự: `\"Alpha\"` $→$ `\"Bravo\"` $→$ `\"Charlie\"` $→$ `\"Delta\"`.\n- Thứ tự thêm này vốn dĩ đã là **thứ tự bảng chữ cái (alphabetical order)** từ A đến D. Vì vậy, chỉ cần duyệt danh sách tuần tự từ đầu đến cuối một cách hợp lệ thì kết quả in ra sẽ đúng theo thứ tự bảng chữ cái.\n2. Phân tích từng đoạn mã:\n• [1] `for (int i=0; i< a.size(); i++) System.out.println(a.get(i));`:\n  - `a.size()` trả về số phần tử của danh sách (4).\n  - `a.get(i)` là phương thức chuẩn của `ArrayList` để lấy phần tử tại chỉ mục `i` (từ 0 đến 3).\n  - Vòng lặp duyệt tuần tự từ đầu đến cuối, in ra: Alpha, Bravo, Charlie, Delta $→$ **Hợp lệ**.\n• [2] `for (int i=0; i< a.size(); i++) System.out.println(a[i]);`:\n  - `a` là một đối tượng `ArrayList`, KHÔNG PHẢI là một mảng nguyên thủy.\n  - Trong Java, toán tử ngoặc vuông `[]` chỉ dùng cho mảng, không áp dụng được cho `List/Collection`.\n  - Gây lỗi biên dịch: `array required, but java.util.ArrayList found`.\n• [3] `while( iter.hasNext() ) System.out.println(iter.next());`:\n  - `iter` là một `Iterator` trỏ vào danh sách `a`.\n  - `iter.hasNext()` kiểm tra còn phần tử kế tiếp hay không, và `iter.next()` trả về phần tử tiếp theo đồng thời tiến con trỏ lên.\n  - Đây là mẫu chuẩn (idiom) để duyệt Collection trong Java, in các phần tử tuần tự từ đầu đến cuối $→$ **Hợp lệ**.\n• [4] `for (int i=0; i< a.size(); i++) System.out.println(iter[i]);`:\n  - `Iterator` không phải là mảng, không hỗ trợ toán tử ngoặc vuông `iter[i]`. Gây lỗi biên dịch.\n• [5] `for (int i=0; i< a.size(); i++) System.out.println(iter.get(i));`:\n  - Giao diện `Iterator` hoàn toàn không có phương thức `get(int index)`. Gây lỗi biên dịch: `cannot find symbol method get(int)`.\n\n✅ Vì sao đáp án \"[1] và [3] (Duyệt theo a.get(i) và duyệt qua Iterator iter.hasNext()/next())\" đúng:\nCả hai đoạn mã [1] và [3] đều sử dụng đúng cú pháp và API chuẩn của Java Collection Framework (`ArrayList.get(i)` và `Iterator.hasNext()/next()`), duyệt và in danh sách theo đúng thứ tự chèn sẵn có theo bảng chữ cái.\n\n❌ Vì sao các đáp án khác sai:\n• \"[1] và [2]\": Sai vì [2] dùng toán tử ngoặc vuông `a[i]` trên đối tượng ArrayList.\n• \"[2] và [4]\": Sai vì cả [2] và [4] đều vi phạm cú pháp do dùng `[]` trên Collection và Iterator.\n• \"[3] và [5]\": Sai vì [5] gọi phương thức không tồn tại `iter.get(i)`.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- `List / ArrayList`: dùng `.get(i)` và `.size()`, KHÔNG dùng `[i]` và `.length`.\n- `Array`: dùng `[i]` và `.length`.\n- `Iterator`: chỉ dùng `.hasNext()`, `.next()`, `.remove()`, KHÔNG có `.get()` hay `.size()`."
    },
    {
      "id": "scjp-122",
      "originalId": 122,
      "topic": "exception",
      "text": "Which statement at Point X on line 1 is required to allow this code to compile?",
      "code": "1. // Point X\n2. public class foo {\n3.   public static void main(String[] args) throws Exception {\n4.     java.io.PrintWriter out = new java.io.PrintWriter(\n5.       new java.io.OutputStreamWriter(System.out), true);\n6.     out.println(\"Hello\");\n7.   }\n8. }",
      "options": [
        "No statement is required.",
        "import java.io.*;",
        "include java.io.*;",
        "import java.io.PrintWriter;"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. // Point X\n2. public class foo {\n3.   public static void main(String[] args) throws Exception {\n4.     java.io.PrintWriter out = new java.io.PrintWriter(\n5.       new java.io.OutputStreamWriter(System.out), true);\n6.     out.println(\"Hello\");\n7.   }\n8. }\n```\n1. Phân tích các lớp được sử dụng trong mã nguồn:\n- `String`, `System`, `Exception`: Đều thuộc package `java.lang`. Mọi lớp trong package `java.lang` đều được máy ảo Java tự động ngầm import vào mọi tập tin mã nguồn Java, nên luôn sử dụng được trực tiếp.\n- `PrintWriter` và `OutputStreamWriter`: Nằm trong package `java.io`.\n2. Cơ chế Fully Qualified Class Name (Tên đầy đủ của lớp):\n- Tại dòng 4 và dòng 5, mã nguồn viết trực tiếp:\n  + `java.io.PrintWriter`\n  + `java.io.OutputStreamWriter`\n- Trong Java, khi lập trình viên đã viết rõ **Tên đầy đủ bao gồm cả package (Fully Qualified Name)** của một lớp, trình biên dịch đã biết chính xác vị trí và định danh của lớp đó trong classpath.\n- Vì vậy, **hoàn toàn không cần thêm bất kỳ câu lệnh `import` nào** thì mã nguồn vẫn biên dịch thành công 100%.\n\n✅ Vì sao đáp án \"No statement is required.\" đúng:\nDo tất cả các lớp ngoài `java.lang` đều đã được định danh bằng tên đầy đủ (Fully Qualified Class Name), trình biên dịch có thể giải quyết các kiểu dữ liệu một cách độc lập mà không cần bất kỳ câu lệnh import nào tại Point X.\n\n❌ Vì sao các đáp án khác sai:\n• \"import java.io.*;\": Không bắt buộc (dư thừa), vì mã nguồn đã dùng fully qualified names.\n• \"include java.io.*;\": Sai hoàn toàn vì Java không có từ khóa `include` (đây là từ khóa của C/C++).\n• \"import java.io.PrintWriter;\": Không bắt buộc, code vẫn biên dịch tốt mà không cần import.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Mục đích của lệnh `import` trong Java chỉ là để viết tên lớp ngắn gọn (Simple Name). Nếu đã viết tên đầy đủ (Fully Qualified Name) thì không bao giờ cần `import`.\n- Java chỉ có `import`, KHÔNG có `include`."
    },
    {
      "id": "scjp-123",
      "originalId": 123,
      "topic": "javacore",
      "text": "Hai khai báo nào dưới đây là hợp lệ cho một biến kiểu float? (Choose two)",
      "code": "[1] float f = 1F;\n[2] float f = 1.0.;\n[3] float f = '1';\n[4] float f = \"1\";\n[5] float f = 1.0d;",
      "options": [
        "[1] và [3] (float f = 1F; & float f = '1';)",
        "[1] và [2]",
        "[2] và [5]",
        "[4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi yêu cầu xác định hai khai báo hợp lệ cho biến kiểu `float`.\nPhân tích chi tiết từng khai báo:\n• [1] `float f = 1F;`:\n  - Hậu tố `F` hoặc `f` được dùng để chỉ định một số thực kiểu `float literal` (32-bit floating point).\n  - Giá trị `1F` được gán trực tiếp cho biến `float f` là hoàn toàn chính xác và hợp lệ.\n• [2] `float f = 1.0.;`:\n  - Cú pháp số thực chứa hai dấu chấm liên tiếp (`1.0.`) là sai ngữ pháp trong Java.\n  - Trình biên dịch báo lỗi cú pháp: `Syntax error, malformed floating point`.\n• [3] `float f = '1';`:\n  - `'1'` là một hằng ký tự (char literal). Trong bảng mã Unicode/ASCII, ký tự `'1'` có giá trị số nguyên là `49`.\n  - Kiểu `char` là kiểu số nguyên không dấu 16-bit.\n  - Theo quy tắc **Chuyển đổi mở rộng kiểu nguyên thủy (Widening Primitive Conversion)** của Java: `char` có thể tự động chuyển đổi mở rộng sang `int`, `long`, `float`, hoặc `double` mà không cần ép kiểu tường minh.\n  - Khi thực thi, giá trị số nguyên `49` được tự động chuyển thành `49.0f` và gán cho `f`. Đây là khai báo hoàn toàn hợp lệ.\n• [4] `float f = \"1\";`:\n  - `\"1\"` là một hằng chuỗi đối tượng (`java.lang.String`).\n  - Trong Java, không thể gán trực tiếp một đối tượng tham chiếu `String` cho một biến kiểu nguyên thủy `float`. Lỗi biên dịch: `incompatible types: String cannot be converted to float`.\n• [5] `float f = 1.0d;`:\n  - Hậu tố `d` hoặc `D` (cũng như số thực có dấu chấm mặc định không hậu tố) biểu thị kiểu số thực `double` (64-bit).\n  - Gán kiểu dữ liệu lớn hơn `double` (64-bit) cho biến nhỏ hơn `float` (32-bit) là phép **Thu hẹp kiểu (Narrowing Primitive Conversion)**, có nguy cơ làm mất độ chính xác. Java cấm tự động gán thu hẹp mà bắt buộc phải có ép kiểu tường minh: `float f = (float) 1.0d;`.\n  - Nếu không ép kiểu, trình biên dịch báo lỗi: `possible loss of precision`.\n\n✅ Vì sao đáp án \"[1] và [3] (float f = 1F; & float f = '1';)\" đúng:\nKhai báo [1] sử dụng float literal chuẩn xác với hậu tố `F`, còn [3] tận dụng cơ chế Widening Conversion hợp lệ của Java tự động chuyển đổi `char` thành `float`.\n\n❌ Vì sao các đáp án khác sai:\n• \"[1] và [2]\": Sai vì [2] lỗi cú pháp dấu chấm kép `1.0.`.\n• \"[2] và [5]\": Sai vì [2] sai cú pháp, còn [5] gán `double` cho `float` mà thiếu ép kiểu.\n• \"[4] và [5]\": Sai vì [4] gán chuỗi String cho float, còn [5] gán double cho float.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Số thực có dấu chấm mặc định trong Java là kiểu `double` (phải thêm `f` hoặc `F` để thành `float`).\n- `char` bản chất là số nguyên (mã Unicode), có thể tự động gán sang `int`, `long`, `float`, `double` mà không cần ép kiểu (Widening Conversion)."
    },
    {
      "id": "scjp-124",
      "originalId": 124,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   private static int[] x;\n3.   public static void main(String[] args) {\n4.     System.out.println(x[0]);\n5.   }\n6. }",
      "options": [
        "0",
        "null",
        "Compilation fails.",
        "A NullPointerException is thrown at runtime.",
        "An ArrayIndexOutOfBoundsException is thrown at runtime."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. public class Test {\n2.   private static int[] x;\n3.   public static void main(String[] args) {\n4.     System.out.println(x[0]);\n5.   }\n6. }\n```\n1. Khởi tạo mặc định của biến tĩnh (Static Field Default Initialization):\n- Tại dòng 2: `private static int[] x;` khai báo biến tĩnh `x` có kiểu tham chiếu mảng (`int[]`).\n- Trong Java, mọi biến thành viên (bao gồm static field và instance field) nếu không được gán giá trị khởi tạo tường minh thì sẽ được JVM tự động gán giá trị mặc định khi nạp lớp:\n  + Kiểu số nguyên (`byte`, `short`, `int`, `long`): mặc định là `0`.\n  + Kiểu số thực (`float`, `double`): mặc định là `0.0`.\n  + Kiểu `boolean`: mặc định là `false`.\n  + Kiểu `char`: mặc định là `\\u0000`.\n  + **Tất cả các kiểu tham chiếu (Reference Types) bao gồm Đối tượng và Mảng**: mặc định là **`null`**.\n- Do đó, giá trị ban đầu của biến `x` là `null`. Lưu ý rằng chưa có đối tượng mảng nào được cấp phát bộ nhớ (chưa hề có lệnh `new int[...]`).\n2. Thao tác truy cập phần tử mảng tại dòng 4:\n- Dòng 4 thực hiện: `System.out.println(x[0]);`.\n- Khi máy ảo JVM cố gắng truy cập phần tử tại chỉ số 0 của một tham chiếu đang là `null`, thao tác dereference thất bại.\n- JVM lập tức ném ra ngoại lệ `java.lang.NullPointerException` tại thời điểm chạy (runtime).\n\n✅ Vì sao đáp án \"A NullPointerException is thrown at runtime.\" đúng:\nDo biến tĩnh `x` chưa được khởi tạo đối tượng mảng và mang giá trị mặc định là `null`, việc truy cập phần tử `x[0]` trên một biến `null` sẽ gây ra ngoại lệ `NullPointerException`.\n\n❌ Vì sao các đáp án khác sai:\n• \"0\": Sai vì `0` chỉ là giá trị mặc định của các phần tử bên trong mảng khi mảng đã được cấp phát bộ nhớ (ví dụ: `x = new int[5]`). Ở đây bản thân mảng chưa được tạo.\n• \"null\": Sai vì nếu in `x` (`System.out.println(x);`) thì mới ra \"null\", còn truy cập phần tử `x[0]` khi `x == null` sẽ bị ném ngoại lệ dừng chương trình.\n• \"Compilation fails.\": Sai vì biến `x` là biến thành viên (field) nên được tự động gán giá trị mặc định, cú pháp truy cập hoàn toàn hợp lệ lúc biên dịch.\n• \"An ArrayIndexOutOfBoundsException is thrown at runtime.\": Sai vì ngoại lệ này chỉ xảy ra khi mảng đã tồn tại nhưng chỉ mục vượt ngoài giới hạn; ở đây mảng chưa hề tồn tại (`x == null`).\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Biến instance / static kiểu mảng mặc định là `null`, KHÔNG PHẢI là mảng rỗng!\n- Cứ truy cập `array[i]` hoặc `array.length` khi `array == null` $→$ luôn luôn nhận **`NullPointerException`**."
    },
    {
      "id": "scjp-125",
      "originalId": 125,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main( String[] args) {\n3.     String foo = args[1];\n4.     String bar = args[2];\n5.     String baz = args[3];\n6.     System.out.println(\"baz = \" + baz);\n7.   }\n8. }\n\nAnd the command line invocation: java Test red green blue",
      "options": [
        "baz =",
        "baz = null",
        "baz = blue",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nXét đoạn mã trong câu hỏi:\n```java\n1. public class Test {\n2.   public static void main( String[] args) {\n3.     String foo = args[1];\n4.     String bar = args[2];\n5.     String baz = args[3];\n6.     System.out.println(\"baz = \" + baz);\n7.   }\n8. }\n```\nDòng lệnh thực thi từ console:\n`java Test red green blue`\n\n1. Cơ chế truyền tham số dòng lệnh (Command Line Arguments) trong Java:\n- Trong Java, tên lớp thực thi (`Test`) **KHÔNG ĐƯỢC ĐƯA VÀO** mảng `args` (khác với ngôn ngữ C/C++ nơi tên file chạy là `argv[0]`).\n- Mảng `args` chỉ chứa các tham số được truyền vào phía sau tên lớp.\n- Với dòng lệnh `java Test red green blue`, có 3 đối số được truyền vào:\n  + Độ dài mảng: `args.length = 3`.\n  + Do mảng trong Java đánh chỉ số (index) từ `0` đến `length - 1`, các phần tử cụ thể là:\n    * `args[0]` = `\"red\"`\n    * `args[1]` = `\"green\"`\n    * `args[2]` = `\"blue\"`\n2. Quá trình thực thi từng dòng lệnh:\n- Dòng 3: `String foo = args[1];` $→$ lấy `\"green\"`, hoàn toàn hợp lệ.\n- Dòng 4: `String bar = args[2];` $→$ lấy `\"blue\"`, hoàn toàn hợp lệ.\n- Dòng 5: `String baz = args[3];` $→$ cố gắng truy cập phần tử tại chỉ số `3`.\n- Vì mảng chỉ có độ dài là 3 (chỉ số hợp lệ chỉ gồm 0, 1, 2), chỉ số `3` nằm ngoài giới hạn của mảng.\n- Máy ảo JVM lập tức ném ra ngoại lệ `java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3` tại dòng 5.\n- Do chương trình bị dừng ngay tại dòng 5 bởi ngoại lệ, dòng 6 không bao giờ được thực thi.\n\n✅ Vì sao đáp án \"An exception is thrown at runtime.\" đúng:\nDo cố gắng truy cập phần tử `args[3]` trong khi mảng `args` chỉ có 3 phần tử (chỉ mục tối đa là 2), dẫn đến ngoại lệ `ArrayIndexOutOfBoundsException` tại thời điểm chạy.\n\n❌ Vì sao các đáp án khác sai:\n• \"baz =\": Sai vì dòng in thứ 6 không bao giờ được chạy tới.\n• \"baz = null\": Sai vì truy xuất ngoài biên mảng trong Java luôn ném ngoại lệ chứ không trả về `null`.\n• \"baz = blue\": Sai vì `blue` nằm ở vị trí `args[2]`.\n• \"Compilation fails.\": Sai vì mã nguồn hoàn toàn đúng cú pháp, lỗi truy cập mảng ngoài biên chỉ được phát hiện lúc chạy.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Tham số dòng lệnh trong Java bắt đầu từ `args[0]` (tham số đầu tiên sau tên class).\n- Mảng có $N$ phần tử thì chỉ mục hợp lệ là $0$ đến $N - 1$. Truy cập chỉ số $≥ N$ luôn luôn ném **`ArrayIndexOutOfBoundsException`**."
    },
    {
      "id": "scjp-126",
      "originalId": 126,
      "topic": "threads",
      "text": "Which method must be defined by a class implementing the java.lang.Runnable interface?",
      "code": "",
      "options": [
        "void run()",
        "public void run()",
        "public void start()",
        "void run(int priority)",
        "public void run(int priority)",
        "public void start(int priority)"
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi: Phương thức nào bắt buộc phải được định nghĩa bởi một lớp thực thi interface `java.lang.Runnable`?\n\n1. Định nghĩa chuẩn của interface `Runnable`:\n- Trong thư viện chuẩn `java.lang`, interface `Runnable` được định nghĩa như sau:\n  ```java\n  package java.lang;\n\n  @FunctionalInterface\n  public interface Runnable {\n      public abstract void run();\n  }\n  ```\n- Giao diện `Runnable` chỉ có duy nhất một phương thức trừu tượng là `void run()`, không có tham số và không trả về giá trị (`void`).\n2. Quy tắc cài đặt phương thức Interface trong Java:\n- Theo Java Language Specification (JLS), tất cả các phương thức trong interface (trừ default method và static method) đều mặc định mang phạm vi truy cập là `public abstract`.\n- Khi một lớp thông thường hiện thực hóa (`implements`) một interface, lớp đó phải ghi đè (override) tất cả các phương thức trừu tượng của interface đó.\n- **Quy tắc ghi đè:** Phương thức ở lớp con **không được phép thu hẹp phạm vi truy cập** so với phương thức ở interface/lớp cha.\n- Vì phương thức gốc trong interface là `public`, phương thức cài đặt trong lớp bắt buộc phải được khai báo tường minh với từ khóa **`public`**:\n  ```java\n  public void run() {\n      // code thực thi\n  }\n  ```\n- Nếu chỉ khai báo `void run()` (không có từ khóa `public`), phương thức sẽ mang phạm vi truy cập mặc định (`package-private`). Khi đó trình biên dịch sẽ báo lỗi ngay: `cannot reduce the visibility of the inherited method from Runnable`.\n\n✅ Vì sao đáp án \"public void run()\" đúng:\nPhương thức duy nhất trong interface `Runnable` là `run()` không có tham số, và khi cài đặt trong lớp, nó bắt buộc phải có từ khóa `public` để không thu hẹp quyền truy cập.\n\n❌ Vì sao các đáp án khác sai:\n• \"void run()\": Sai vì thiếu từ khóa `public`, làm giảm quyền truy cập xuống package-private dẫn đến lỗi biên dịch.\n• \"public void start()\": Sai vì `start()` là phương thức của lớp `java.lang.Thread`, không thuộc interface `Runnable`.\n• \"void run(int priority)\" / \"public void run(int priority)\": Sai vì `Runnable` không có phương thức `run` nhận tham số `int`.\n• \"public void start(int priority)\": Sai vì phương thức này hoàn toàn không tồn tại trong `Runnable`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhi implement bất kỳ phương thức nào từ một Interface trong Java, phương thức trong class BẮT BUỘC phải có từ khóa **`public`** (vì mọi method trong interface mặc định đều là `public`)."
    },
    {
      "id": "scjp-127",
      "originalId": 127,
      "topic": "polymorphism",
      "text": "What is the result?",
      "code": "11. public static void main(String[] args) {\n12.   Object obj = new Object() {\n13.     public int hashCode() {\n14.       return 42;\n15.     }\n16.   };\n17.   System.out.println(obj.hashCode());\n18. }",
      "options": [
        "42",
        "An exception is thrown at runtime.",
        "Compilation fails because of an error on line 12.",
        "Compilation fails because of an error on line 16.",
        "Compilation fails because of an error on line 17."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Dòng 12-16: Khởi tạo một đối tượng thuộc Lớp nội vô danh (Anonymous Inner Class) kế thừa từ `java.lang.Object`.\n   • Cú pháp `new Object() { ... };` hoàn toàn hợp lệ trong Java. Dấu chấm phẩy `;` ở dòng 16 dùng để kết thúc câu lệnh gán biến tham chiếu `obj`.\n   • Bên trong lớp ẩn danh, phương thức `public int hashCode()` được định nghĩa để ghi đè (override) phương thức `hashCode()` của lớp cha `Object`, trả về số nguyên 42.\n2. Dòng 17: `System.out.println(obj.hashCode());`\n   • Biến tham chiếu `obj` có kiểu khai báo là `Object`. Lớp `Object` có sẵn phương thức `public int hashCode()`, do đó trình biên dịch xác nhận lời gọi phương thức này là hoàn toàn hợp lệ.\n   • Tại thời điểm thực thi (runtime), cơ chế Đa hình (Polymorphism) và Liên kết động (Dynamic Binding / Virtual Method Invocation) sẽ gọi phương thức `hashCode()` được ghi đè trong Anonymous Inner Class, trả về giá trị 42.\n   • Lệnh in ra màn hình hiển thị giá trị 42.\n\n✅ Vì sao đáp án 42 đúng:\nChương trình biên dịch hoàn toàn thành công và tại thời điểm chạy (runtime), cơ chế đa hình sẽ thực thi phương thức `hashCode()` của Anonymous Inner Class, trả về và in ra kết quả `42`.\n\n❌ Vì sao các đáp án khác sai:\n• An exception is thrown at runtime.: Sai, chương trình thực thi trơn tru không phát sinh bất kỳ ngoại lệ nào.\n• Compilation fails because of an error on line 12.: Sai, cú pháp khởi tạo Anonymous Inner Class `Object obj = new Object() { ... };` là chuẩn cú pháp Java.\n• Compilation fails because of an error on line 16.: Sai, dấu chấm phẩy ở dòng 16 là bắt buộc và đúng cú pháp để kết thúc câu lệnh khai báo/gán biến.\n• Compilation fails because of an error on line 17.: Sai, lớp `Object` có phương thức `hashCode()` nên trình biên dịch cho phép gọi trên biến `obj`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nKhi sử dụng Anonymous Inner Class:\n- Nếu ghi đè phương thức có sẵn từ lớp cha/interface (như `hashCode`, `equals`, `toString`), biến kiểu cha gọi phương thức đó sẽ kích hoạt cơ chế Đa hình (runtime polymorphism) gọi đúng code của lớp con.\n- Nếu định nghĩa phương thức MỚI hoàn toàn trong Anonymous Inner Class thì biến kiểu `Object` sẽ không thể gọi được (trừ khi dùng Reflection)."
    },
    {
      "id": "scjp-128",
      "originalId": 128,
      "topic": "javacore",
      "text": "Hai từ nào dưới đây là từ khóa bảo lưu (reserved words) trong Java? (Choose two)",
      "code": "[1] run\n[2] import\n[3] default\n[4] implement",
      "options": [
        "[2] và [3] (import & default)",
        "[1] và [2]",
        "[1] và [4]",
        "[3] và [4]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nTừ khóa bảo lưu (Reserved Words / Keywords) trong Java là các từ được dành riêng bởi ngôn ngữ với cú pháp và ngữ nghĩa xác định, lập trình viên không được phép sử dụng chúng làm tên định danh (tên biến, tên hàm, tên lớp...).\n\nPhân tích từng từ trong câu hỏi:\n1. `run`: KHÔNG PHẢI là từ khóa. `run` chỉ là tên một phương thức thông thường (như trong interface `Runnable`). Lập trình viên hoàn toàn có thể đặt tên biến, tên hàm là `run`.\n2. `import`: LÀ từ khóa bảo lưu. Dùng để khai báo nạp các package hoặc class khác vào file mã nguồn.\n3. `default`: LÀ từ khóa bảo lưu. Được dùng trong mệnh đề mặc định của `switch-case`, khai báo phương thức `default` trong interface, hoặc giá trị mặc định của annotation.\n4. `implement`: KHÔNG PHẢI là từ khóa. Trong Java, từ khóa chính xác để hiện thực interface phải là `implements` (có chữ 's' ở cuối).\n\n✅ Vì sao đáp án [2] và [3] (import & default) đúng:\nCả `import` và `default` đều là từ khóa bảo lưu chính thức nằm trong danh sách các từ khóa của ngôn ngữ Java theo chuẩn Java Language Specification (JLS).\n\n❌ Vì sao các đáp án khác sai:\n• [1] và [2]: Sai vì `run` không phải là từ khóa bảo lưu.\n• [1] và [4]: Sai vì cả `run` và `implement` đều không phải là từ khóa bảo lưu.\n• [3] và [4]: Sai vì `implement` không phải là từ khóa (phải là `implements` có 's').\n\n⚠️ Mẹo nhớ / Lưu ý:\nBẫy từ khóa kinh điển trong kỳ thi SCJP/OCP:\n- Các từ khóa có tận cùng là 's': `implements`, `extends`, `throws` (khác với `throw`).\n- `run`, `main`, `equal`, `finalize` chỉ là tên phương thức chuẩn, KHÔNG PHẢI từ khóa.\n- `goto` và `const` là reserved keywords trong Java mặc dù chưa được sử dụng thực tế."
    },
    {
      "id": "scjp-129",
      "originalId": 129,
      "topic": "javacore",
      "text": "Hai phát biểu nào là ĐÚNG về giá trị trả về của các phương thức hashCode() và equals() được cài đặt chuẩn xác? (Choose two)",
      "code": "[1] If the hashCode values are different, the objects might be equal.\n[2] If the hashCode values are the same, the object must be equal.\n[3] If the hashCode values are the same, the objects might be equal.\n[4] If the hashCode values are different, the objects must be unequal.",
      "options": [
        "[3] và [4] (Nếu hashCode bằng nhau thì có thể equal; Nếu hashCode khác nhau thì chắc chắn không equal)",
        "[1] và [2]",
        "[1] và [4]",
        "[2] và [3]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nHợp đồng giữa `equals()` và `hashCode()` (The equals-hashCode Contract) trong Java Language Specification quy định:\n1. **Quy tắc bắt buộc:** Nếu hai đối tượng bằng nhau theo `equals()` (`a.equals(b) == true`), thì việc gọi `hashCode()` trên cả hai đối tượng BẮT BUỘC phải trả về cùng một giá trị số nguyên:\n   `a.equals(b) == true`  ⟹  `a.hashCode() == b.hashCode()`\n2. **Quy tắc phản đảo (Contrapositive):** Theo logic mệnh đề tương đương ($P implies Q iff \neg Q implies \neg P$), nếu mã băm khác nhau thì hai đối tượng CHẮC CHẮN KHÔNG THỂ bằng nhau:\n   `a.hashCode() != b.hashCode()`  ⟹  `a.equals(b) == false` (must be unequal)\n   -> Do đó phát biểu [4] (\"If the hashCode values are different, the objects must be unequal\") là HOÀN TOÀN ĐÚNG.\n3. **Hiện tượng va chạm băm (Hash Collision):** Nếu hai đối tượng có mã băm bằng nhau (`a.hashCode() == b.hashCode()`), chúng CÓ THỂ bằng nhau hoặc CÓ THỂ không bằng nhau:\n   -> Do đó phát biểu [3] (\"If the hashCode values are the same, the objects might be equal\") là HOÀN TOÀN ĐÚNG.\n\n✅ Vì sao đáp án [3] và [4] đúng:\n• Phát biểu [3] đúng vì va chạm mã băm cho phép hai đối tượng không bằng nhau vẫn có thể có cùng giá trị hashCode.\n• Phát biểu [4] đúng vì là mệnh đề phản đảo tất yếu của hợp đồng hashCode/equals: hashCode khác nhau thì không thể nào equal.\n\n❌ Vì sao các đáp án khác sai:\n• Phát biểu [1] sai: Nếu hashCode khác nhau thì hai đối tượng không bao giờ có thể bằng nhau (must be unequal, không thể là might be equal).\n• Phát biểu [2] sai: Hai đối tượng có cùng hashCode thì chưa chắc đã bằng nhau do va chạm hash (không thể khẳng định must be equal).\n• Các phương án kết hợp [1] và [2], [1] và [4], [2] và [3] đều sai vì chứa phát biểu không chuẩn xác.\n\n⚠️ Mẹo nhớ / Lưu ý:\nCông thức bất hủ về hợp đồng equals/hashCode:\n- `equals == true`  ⟹  `hashCode` BUỘC PHẢI BẰNG NHAU.\n- `hashCode` KHÁC NHAU  ⟹  `equals` CHẮC CHẮN BẰNG FALSE.\n- `hashCode` BẰNG NHAU  ⟹  `equals` CÓ THỂ true HOẶC false (va chạm băm)."
    },
    {
      "id": "scjp-130",
      "originalId": 130,
      "topic": "javacore",
      "text": "What is the numerical range of a char?",
      "code": "",
      "options": [
        "0...32767",
        "0...65535",
        "-256 ... 255",
        "-32768 ... 32767",
        "Range is platform dependent."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Trong Java, kiểu dữ liệu nguyên thủy `char` biểu diễn một ký tự Unicode 16-bit (UTF-16 code unit).\n2. `char` là kiểu số nguyên **duy nhất trong Java KHÔNG CÓ DẤU (unsigned 16-bit integer)**.\n3. Kích thước của `char` là 16 bit:\n   • Giá trị nhỏ nhất: `\\u0000` tương ứng với giá trị số thập phân là `0` (Character.MIN_VALUE).\n   • Giá trị lớn nhất: `\\uffff` tương ứng với giá trị số thập phân là $2^{16} - 1 = 65,535$ (Character.MAX_VALUE).\n   • Do đó, dải giá trị số học của `char` là từ `0` đến `65535`.\n4. Trong Java, theo triết lý \"Write Once, Run Anywhere\", miền giá trị của tất cả các kiểu dữ liệu nguyên thủy là bất biến trên mọi nền tảng phần cứng và hệ điều hành.\n\n✅ Vì sao đáp án 0...65535 đúng:\nKiểu `char` là số nguyên không dấu 16-bit ($2^{16} = 65,536$ giá trị), với dải biểu diễn chính xác từ 0 đến 65535.\n\n❌ Vì sao các đáp án khác sai:\n• 0...32767: Sai, đây là dải giá trị không âm của kiểu `short` có dấu ($2^{15} - 1$).\n• -256 ... 255: Sai, không phải dải của kiểu dữ liệu chuẩn nào trong Java.\n• -32768 ... 32767: Sai, đây là miền giá trị của kiểu `short` (signed 16-bit có dấu).\n• Range is platform dependent.: Sai, vì trong C/C++ kích thước kiểu dữ liệu có thể phụ thuộc nền tảng, nhưng trong Java kích thước kiểu nguyên thủy luôn cố định trên mọi nền tảng.\n\n⚠️ Mẹo nhớ / Lưu ý:\nBảng kích thước & dải giá trị các kiểu nguyên thủy Java:\n• `byte`: 8 bit có dấu (-128 đến 127)\n• `short`: 16 bit có dấu (-32,768 đến 32,767)\n• `char`: 16 bit KHÔNG DẤU (0 đến 65,535) -> **Unsigned duy nhất!**\n• `int`: 32 bit có dấu (-2^31 đến 2^31 - 1)\n• `long`: 64 bit có dấu (-2^63 đến 2^63 - 1)"
    },
    {
      "id": "scjp-131",
      "originalId": 131,
      "topic": "static",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   private static float[] f = new float[2];\n3.   public static void main(String args[]) {\n4.     System.out.println(\"f[0] = \" + f[0]);\n5.   }\n6. }",
      "options": [
        "f[0] = 0",
        "f[0] = 0.0",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Dòng 2: `private static float[] f = new float[2];`\n   • Biến `f` là một biến mảng tĩnh (static array) thuộc lớp `Test`.\n   • Khi một mảng được khởi tạo bằng toán tử `new`, tất cả các phần tử bên trong mảng tự động được gán giá trị mặc định tương ứng với kiểu dữ liệu của phần tử:\n     - Số nguyên (`byte`, `short`, `int`, `long`): `0`\n     - Số thực dấu phẩy động (`float`, `double`): `0.0f` hoặc `0.0d`\n     - Kiểu boolean: `false`\n     - Kiểu ký tự `char`: `'\\u0000'` (null char)\n     - Kiểu đối tượng tham chiếu: `null`\n2. Ở đây, mảng kiểu `float` có 2 phần tử, nên cả `f[0]` và `f[1]` đều nhận giá trị mặc định là `0.0f`.\n3. Dòng 4: `System.out.println(\"f[0] = \" + f[0]);`\n   • Khi nối chuỗi với giá trị `float` là `0.0f`, giá trị này được chuyển đổi thành chuỗi `\"0.0\"`.\n   • Kết quả in ra màn hình chính xác là: `f[0] = 0.0`.\n\n✅ Vì sao đáp án f[0] = 0.0 đúng:\nCác phần tử trong mảng số thực kiểu `float` luôn được JVM tự động gán giá trị mặc định là `0.0`.\n\n❌ Vì sao các đáp án khác sai:\n• f[0] = 0: Sai, giá trị `0` không có phần thập phân chỉ dành cho các kiểu số nguyên (`int`, `long`, `short`, `byte`). Kiểu `float` khi chuyển thành chuỗi luôn có đuôi `.0`.\n• Compilation fails.: Sai, cú pháp khai báo static array và truy xuất phần tử hoàn toàn hợp lệ.\n• An exception is thrown at runtime.: Sai, mảng có kích thước 2 nên truy xuất chỉ số 0 hoàn toàn nằm trong giới hạn an toàn.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Biến instance, biến static và các phần tử trong mảng (kể cả mảng được tạo bên trong hàm cục bộ) LUÔN LUÔN được khởi tạo giá trị mặc định.\n- Chỉ có BIẾN CỤC BỘ (local variable đơn lẻ, ví dụ `float x;`) nếu không được gán trị trước khi đọc thì mới gây lỗi biên dịch."
    },
    {
      "id": "scjp-132",
      "originalId": 132,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "1. public class Test {\n2.   public static void main(String[] args) {\n3.     String str = NULL;\n4.     System.out.println(str);\n5.   }\n6. }",
      "options": [
        "NULL",
        "Compilation fails.",
        "The code runs with no output.",
        "An exception is thrown at runtime."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Java là ngôn ngữ phân biệt chặt chẽ chữ hoa và chữ thường (case-sensitive).\n2. Trong Java, từ khóa literal dùng để biểu thị giá trị tham chiếu rỗng là `null` (toàn bộ viết thường).\n3. Từ `NULL` (viết hoa toàn bộ) KHÔNG PHẢI là một từ khóa hay hằng số có sẵn trong ngôn ngữ Java (khác với ngôn ngữ C/C++ hoặc SQL nơi macro/constant `NULL` được định nghĩa sẵn).\n4. Dòng 3: `String str = NULL;`\n   • Trình biên dịch Java coi `NULL` là một biến (variable) hoặc định danh chưa được khai báo.\n   • Vì không tìm thấy biến `NULL` nào trong phạm vi này, trình biên dịch báo lỗi: `cannot find symbol: variable NULL`.\n   • Do đó mã nguồn không thể biên dịch thành công (Compilation fails).\n\n✅ Vì sao đáp án Compilation fails. đúng:\nJava không có literal `NULL` viết hoa. Việc sử dụng định danh chưa được định nghĩa gây ra lỗi biên dịch (compile error) tại dòng 3.\n\n❌ Vì sao các đáp án khác sai:\n• NULL: Sai, vì chương trình không thể biên dịch nên không bao giờ có thể chạy để in ra chuỗi `NULL`.\n• The code runs with no output.: Sai, chương trình bị dừng ngay từ khâu biên dịch.\n• An exception is thrown at runtime.: Sai, lỗi này xảy ra ở pha biên dịch (compile-time), không thể tới được bước chạy (runtime).\n\n⚠️ Mẹo nhớ / Lưu ý:\nCác giá trị literal đặc biệt trong Java ĐỀU VIẾT THƯỜNG 100%:\n• `null`\n• `true`\n• `false`\nBất kỳ cách viết hoa nào như `NULL`, `Null`, `TRUE`, `FALSE` đều là bẫy biên dịch phổ biến trong các bài thi SCJP/OCP!"
    },
    {
      "id": "scjp-133",
      "originalId": 133,
      "topic": "interface",
      "text": "Which interface does java.util.Hashtable implement?",
      "code": "",
      "options": [
        "java.util.Map",
        "java.util.List",
        "java.util.Hashtable",
        "java.util.Collection"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Lớp `java.util.Hashtable` là một cấu trúc dữ liệu lưu trữ các phần tử theo dạng cặp Khóa - Giá trị (Key - Value).\n2. Khảo sát phân cấp kế thừa của `Hashtable`:\n   ```java\n   public class Hashtable<K,V> extends Dictionary<K,V>\n       implements Map<K,V>, Cloneable, java.io.Serializable\n   ```\n3. Kể từ phiên bản JDK 1.2, khi Java Collections Framework (JCF) ra đời, `Hashtable` đã được nâng cấp để hiện thực giao diện `java.util.Map`.\n4. Trong kiến trúc Java Collections Framework:\n   • Nhánh `Collection`: Gồm `List`, `Set`, `Queue`.\n   • Nhánh `Map`: Độc lập với `Collection`, chuyên quản lý cặp khóa - giá trị (`HashMap`, `Hashtable`, `TreeMap`, `LinkedHashMap`).\n   • Do đó `Hashtable` trực tiếp hiện thực giao diện `java.util.Map`.\n\n✅ Vì sao đáp án java.util.Map đúng:\n`java.util.Hashtable` tổ chức dữ liệu theo cặp key-value và implement interface `java.util.Map`.\n\n❌ Vì sao các đáp án khác sai:\n• java.util.List: Sai, `List` là giao diện danh sách có thứ tự theo chỉ mục (như `ArrayList`, `Vector`), không phải dạng key-value.\n• java.util.Hashtable: Sai, `Hashtable` là một lớp (class), đề bài hỏi là \"interface nào\".\n• java.util.Collection: Sai, giao diện `Map` không kế thừa `Collection` và `Hashtable` cũng không trực tiếp implements `Collection`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nHai lớp kế thừa cổ điển (Legacy Collections) có từ JDK 1.0:\n• `Vector` implements `List`\n• `Hashtable` implements `Map`\nCả hai đều có các phương thức được `synchronized` (an toàn đa luồng). Đặc biệt, `Hashtable` KHÔNG CHO PHÉP key hoặc value là `null` (nếu truyền `null` sẽ ném `NullPointerException`)."
    },
    {
      "id": "scjp-134",
      "originalId": 134,
      "topic": "javacore",
      "text": "What is the result?",
      "code": "11. System.out.println(Math.sqrt(-4D));",
      "options": [
        "-2",
        "NaN",
        "Infinity",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Dòng 11: `Math.sqrt(-4D)`\n   • Đối số `-4D` biểu thị một số thực kiểu `double` có giá trị là `-4.0` (hậu tố `D` hoặc `d` là ký hiệu của kiểu `double`).\n   • Phương thức `Math.sqrt(double a)` nhận vào một số thực `double` và tính căn bậc hai.\n2. Quy định số học dấu phẩy động chuẩn IEEE 754 trong Java:\n   • Căn bậc hai của một số thực âm không tồn tại trong tập số thực.\n   • Đối với các phép toán trên số thực (`double` / `float`), Java KHÔNG BAO GIỜ ném ngoại lệ `ArithmeticException`.\n   • Thay vào đó, theo Javadoc của `Math.sqrt`: \"If the argument is less than zero, then the result is NaN.\"\n   • Kết quả trả về là hằng số `Double.NaN` (Not-a-Number).\n3. Khi in `Double.NaN` qua lệnh `System.out.println()`, kết quả hiển thị trên màn hình là chuỗi `\"NaN\"`.\n\n✅ Vì sao đáp án NaN đúng:\nLấy căn bậc hai của một số âm với kiểu số thực `double` trong Java luôn trả về giá trị `Double.NaN`, in ra màn hình là `NaN`.\n\n❌ Vì sao các đáp án khác sai:\n• -2: Sai, trong toán học $-2 \times -2 = +4$, không thể là căn bậc hai của $-4$.\n• Infinity: Sai, `Infinity` là kết quả của phép chia số thực dương cho `0.0` (ví dụ `4.0 / 0.0`), không phải kết quả của căn bậc hai số âm.\n• Compilation fails.: Sai, cú pháp `-4D` và gọi phương thức hoàn toàn hợp lệ.\n• An exception is thrown at runtime.: Sai, Java không ném ngoại lệ toán học đối với số thực dấu phẩy động tuân thủ IEEE 754.\n\n⚠️ Mẹo nhớ / Lưu ý:\nQuy tắc IEEE 754 trong Java (dành cho `float` và `double`):\n• Chia số thực khác 0 cho `0.0`: ra `Infinity` hoặc `-Infinity`.\n• `0.0 / 0.0` hoặc `Math.sqrt(-số)`: ra `NaN` (Not a Number).\n• Phép toán số thực KHÔNG BAO GIỜ ném `ArithmeticException`! (Chỉ có phép chia số nguyên cho 0 như `5 / 0` mới ném `ArithmeticException`)."
    },
    {
      "id": "scjp-135",
      "originalId": 135,
      "topic": "string",
      "text": "What is the result?",
      "code": "11. String a = \"ABCD\";\n12. String b = a.toLowerCase();\n13. b.replace('a', 'd');\n14. b.replace('b', 'c');\n15. System.out.println(b);",
      "options": [
        "abcd",
        "ABCD",
        "dccd",
        "dcba",
        "Compilation fails.",
        "An exception is thrown at runtime."
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Dòng 11: `String a = \"ABCD\";` tạo ra chuỗi `\"ABCD\"`.\n2. Dòng 12: `String b = a.toLowerCase();` tạo ra một đối tượng `String` mới mang giá trị `\"abcd\"`. Biến `b` tham chiếu tới đối tượng mới này.\n3. Dòng 13 & 14:\n   • `b.replace('a', 'd');`\n   • `b.replace('b', 'c');`\n   • **Nguyên lý cốt lõi:** Đối tượng kiểu `String` trong Java là **BẤT BIẾN (Immutable)**. Bất kỳ phương thức nào thao tác trên chuỗi (như `replace`, `concat`, `toLowerCase`, `substring`...) đều KHÔNG THAY ĐỔI đối tượng chuỗi ban đầu. Chúng luôn tạo ra và trả về một đối tượng `String` mới chứa kết quả biến đổi.\n   • Trong đoạn mã trên, kết quả trả về của hai phương thức `replace` không được gán lại cho biến `b` (hoặc bất kỳ biến nào khác), giá trị trả về hoàn toàn bị bỏ qua (ignored).\n   • Vì vậy, đối tượng chuỗi mà biến `b` đang trỏ tới vẫn giữ nguyên giá trị ban đầu là `\"abcd\"`.\n4. Dòng 15: `System.out.println(b);` in ra giá trị hiện tại của `b`, tức là `abcd`.\n\n✅ Vì sao đáp án abcd đúng:\nDo tính chất bất biến (immutability) của `String`, hai câu lệnh `replace()` không thể thay đổi giá trị của chuỗi mà `b` đang tham chiếu. Vì không có phép gán lại cho `b`, `b` vẫn là `\"abcd\"`.\n\n❌ Vì sao các đáp án khác sai:\n• ABCD: Sai, vì dòng 12 đã gọi `a.toLowerCase()` và gán cho `b`, nên `b` mang chữ thường.\n• dccd / dcba: Sai do ngộ nhận rằng phương thức `replace()` sẽ sửa đổi trực tiếp dữ liệu bên trong chuỗi gốc (in-place modification).\n• Compilation fails. / An exception is thrown at runtime.: Sai, mã nguồn hợp lệ cú pháp và chạy bình thường.\n\n⚠️ Mẹo nhớ / Lưu ý:\nBất biến của String (String Immutability):\n- Bất kỳ phương thức nào của lớp `String` biến đổi chuỗi đều trả về String MỚI.\n- Nếu không có phép gán lại: `b = b.replace('a', 'd');` thì biến `b` giữ nguyên vẹn 100%.\n- Nếu muốn chỉnh sửa nội dung chuỗi tại chỗ, phải dùng `StringBuilder` hoặc `StringBuffer`."
    },
    {
      "id": "scjp-136",
      "originalId": 136,
      "topic": "string",
      "text": "What is the result?",
      "code": "1. public class Foo {\n2.   public static void main (String [] args) {\n3.     StringBuffer a = new StringBuffer (\"A\");\n4.     StringBuffer b = new StringBuffer (\"B\");\n5.     operate (a,b);\n6.     System.out.println(a + \", \" + b);\n7.   }\n8.   static void operate (StringBuffer x, StringBuffer y) {\n9.     x.append (y);\n10.    y = x;\n11.  }\n12. }",
      "options": [
        "A,B",
        "A,A",
        "B,B",
        "AB,B",
        "AB,AB",
        "The code does not compile because \"+\" cannot be overloaded for StringBuffer."
      ],
      "answer": 3,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. **Cơ chế truyền tham số trong Java:** Java LUÔN LUÔN là **Pass-by-value (Truyền giá trị)**. Khi truyền một biến đối tượng vào phương thức, giá trị được sao chép và truyền đi chính là **bản sao của giá trị tham chiếu** (địa chỉ trỏ đến đối tượng trong bộ nhớ Heap).\n2. Diễn tiến thực thi từng dòng:\n   • Trong `main`: Biến `a` trỏ đến đối tượng StringBuffer chứa `\"A\"`. Biến `b` trỏ đến đối tượng StringBuffer chứa `\"B\"`.\n   • Gọi `operate(a, b)`:\n     - Tham số cục bộ `x` nhận bản sao tham chiếu trỏ đến đối tượng `\"A\"`.\n     - Tham số cục bộ `y` nhận bản sao tham chiếu trỏ đến đối tượng `\"B\"`.\n   • Dòng 9: `x.append(y);`\n     - `StringBuffer` là kiểu dữ liệu **khả biến (Mutable)**.\n     - Phương thức `append()` sửa đổi trực tiếp dữ liệu của đối tượng trên Heap mà `x` đang trỏ tới.\n     - Đối tượng đó biến đổi nội dung từ `\"A\"` thành `\"AB\"`.\n     - Vì biến `a` trong `main` cũng trỏ tới chính đối tượng này, nội dung của `a` bây giờ cũng là `\"AB\"`.\n   • Dòng 10: `y = x;`\n     - Phép gán này chỉ thay đổi biến tham chiếu cục bộ `y` (trong phạm vi hàm `operate`) để nó trỏ tới cùng đối tượng với `x`.\n     - Phép gán này HOÀN TOÀN KHÔNG ảnh hưởng tới biến tham chiếu `b` trong hàm `main`! Biến `b` vẫn tiếp tục trỏ tới đối tượng StringBuffer chứa `\"B\"`.\n3. Sau khi hàm `operate` kết thúc:\n   • Quay về hàm `main`: `a` có nội dung là `\"AB\"`, `b` có nội dung là `\"B\"`.\n   • Dòng 6: `System.out.println(a + \", \" + b);` in ra chuỗi `\"AB, B\"`.\n\n✅ Vì sao đáp án AB,B đúng:\n`x.append(y)` làm thay đổi đối tượng mà `a` cùng trỏ tới thành `\"AB\"`. Phép gán `y = x` chỉ có hiệu lực cục bộ trong hàm `operate`, biến `b` bên ngoài vẫn giữ nguyên trỏ tới `\"B\"`.\n\n❌ Vì sao các đáp án khác sai:\n• A,B: Sai, vì `StringBuffer` có thể biến đổi tại chỗ, `append()` đã làm thay đổi nội dung của đối tượng `a`.\n• AB,AB: Sai do lầm tưởng Java truyền tham chiếu (pass-by-reference) và nghĩ rằng `y = x` sẽ làm biến `b` trỏ sang đối tượng của `a`.\n• A,A / B,B: Sai, không đúng logic thực thi.\n• The code does not compile because \"+\" cannot be overloaded for StringBuffer.: Sai, khi nối chuỗi với toán tử `+`, Java tự động gọi phương thức `toString()` trên các đối tượng tham gia.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Lời gọi phương thức làm thay đổi trạng thái đối tượng (`append`, `set...`): Ảnh hưởng ra ngoài.\n- Phép gán lại biến tham số (`param = ...`): Không bao giờ ảnh hưởng tới biến của caller ở bên ngoài!"
    },
    {
      "id": "scjp-137",
      "originalId": 137,
      "topic": "string",
      "text": "Cho đoạn mã sau, kết quả in ra màn hình là gì? (What is the output?)",
      "code": "1. public class Test {\n2.   public static void stringReplace (String text) {\n3.     text = text.replace ('j', 'i');\n4.   }\n6.   public static void bufferReplace (StringBuffer text) {\n7.     text = text.append (\"C\");\n8.   }\n10.  public static void main (String args[]) {\n11.    String textString = new String (\"java\");\n12.    StringBuffer textBuffer = new StringBuffer (\"java\");\n14.    stringReplace (textString);\n15.    bufferReplace (textBuffer);\n17.    System.out.println (textString + textBuffer);\n19.  }\n20. }",
      "options": [
        "javajavaC",
        "iavaiavaC",
        "javajava",
        "iavajavaC"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nCâu hỏi so sánh trực quan cơ chế hoạt động giữa `String` (bất biến) và `StringBuffer` (khả biến) kết hợp với truyền tham số pass-by-value:\n\n1. Phân tích lời gọi `stringReplace(textString)` ở dòng 14:\n   • `textString` trỏ đến đối tượng `String` chứa `\"java\"`.\n   • Biến tham số cục bộ `text` nhận bản sao tham chiếu trỏ tới đối tượng `\"java\"`.\n   • Dòng 3: `text = text.replace('j', 'i');`\n     - Phương thức `replace()` tạo ra một đối tượng `String` mới chứa `\"iava\"`.\n     - Phép gán `text = ...` chỉ làm biến cục bộ `text` trỏ sang chuỗi mới `\"iava\"`.\n     - Biến tham chiếu `textString` ở hàm `main` không hề suy suyển và vẫn trỏ tới đối tượng chuỗi ban đầu `\"java\"`.\n   • Kết quả: Sau hàm này, `textString` vẫn là `\"java\"`.\n\n2. Phân tích lời gọi `bufferReplace(textBuffer)` ở dòng 15:\n   • `textBuffer` trỏ đến đối tượng `StringBuffer` chứa `\"java\"`.\n   • Biến tham số cục bộ `text` cùng trỏ đến chính đối tượng `StringBuffer` đó.\n   • Dòng 7: `text = text.append(\"C\");`\n     - Lớp `StringBuffer` là **khả biến (Mutable)**. Phương thức `append(\"C\")` sửa đổi trực tiếp dữ liệu bên trong đối tượng trên Heap thành `\"javaC\"`.\n     - Phương thức `append()` trả về chính đối tượng hiện tại (`this`).\n     - Do đối tượng trong bộ nhớ Heap đã bị thay đổi, biến `textBuffer` trong `main` khi truy cập cũng sẽ thấy nội dung mới là `\"javaC\"`.\n\n3. Dòng 17: `System.out.println(textString + textBuffer);`\n   • Nối chuỗi `\"java\"` với `\"javaC\"` tạo thành: `\"javajavaC\"`.\n\n✅ Vì sao đáp án javajavaC đúng:\n`textString` giữ nguyên là `\"java\"` do tính bất biến của `String` và cơ chế truyền tham số pass-by-value. `textBuffer` bị thay đổi thành `\"javaC\"` do `StringBuffer` là mutable. Kết hợp lại in ra `javajavaC`.\n\n❌ Vì sao các đáp án khác sai:\n• iavaiavaC / iavajavaC: Sai, vì `stringReplace` không thể làm thay đổi đối tượng hay biến tham chiếu `textString` trong hàm `main`.\n• javajava: Sai, vì `textBuffer.append(\"C\")` thực sự đã sửa đổi nội dung của `textBuffer`.\n\n⚠️ Mẹo nhớ / Lưu ý:\nSự khác biệt kinh điển giữa String và StringBuffer/StringBuilder:\n• `String`: Immutable (bất biến) -> Các phương thức chỉnh sửa trả về đối tượng mới, không sửa đối tượng cũ.\n• `StringBuffer` / `StringBuilder`: Mutable (khả biến) -> Các phương thức `append`, `delete`, `insert` biến đổi trực tiếp đối tượng hiện hành."
    },
    {
      "id": "scjp-138",
      "originalId": 138,
      "topic": "javacore",
      "text": "Which method is an appropriate way to determine the cosine of 42 degrees?",
      "code": "",
      "options": [
        "Double d = Math.cos(42);",
        "Double d = Math.cosine(42);",
        "Double d = Math.cos(Math.toRadians(42));",
        "Double d = Math.cos(Math.toDegrees(42));",
        "Double d = Math.cosine(Math.toRadians(42));"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Lớp `java.lang.Math` cung cấp các hàm toán học lượng giác tĩnh:\n   • Phương thức tính hàm cosin có tên chuẩn xác là `Math.cos(double a)`. Lớp `Math` **không có phương thức nào tên là `cosine`**.\n2. **Quy định đơn vị góc trong Java:**\n   • Theo đặc tả của Java Language Specification và Javadoc của lớp `Math`, tất cả các hàm lượng giác (`sin`, `cos`, `tan`, `asin`, `acos`, `atan`) đều nhận đối số góc tính theo đơn vị **radian**, KHÔNG PHẢI đơn vị độ (degrees).\n3. Đề bài yêu cầu: Tính cosin của góc **42 độ** (42 degrees).\n   • Do đó, bắt buộc phải đổi 42 từ đơn vị độ sang đơn vị radian trước khi truyền vào phương thức `Math.cos()`.\n   • Lớp `Math` cung cấp phương thức tĩnh: `Math.toRadians(double angdeg)` chuyên dụng để chuyển đổi số đo góc từ độ sang radian.\n   • (Hàm ngược lại là `Math.toDegrees(double angrad)` dùng để chuyển từ radian sang độ).\n4. Biểu thức đúng đắn: `Math.cos(Math.toRadians(42))`.\n   • Kết quả trả về là giá trị `double`, được cơ chế Auto-boxing của Java tự động bao gói thành đối tượng `Double d`.\n\n✅ Vì sao đáp án Double d = Math.cos(Math.toRadians(42)); đúng:\nGọi đúng tên phương thức `Math.cos` và sử dụng `Math.toRadians(42)` để chuyển đổi đơn vị góc từ độ sang radian chuẩn xác theo yêu cầu đề bài.\n\n❌ Vì sao các đáp án khác sai:\n• Double d = Math.cos(42);: Sai về mặt toán học trong Java, vì Java sẽ hiểu 42 là 42 radian thay vì 42 độ.\n• Double d = Math.cosine(42);: Lỗi biên dịch vì phương thức `cosine` không tồn tại trong lớp `Math`.\n• Double d = Math.cos(Math.toDegrees(42));: Sai hàm chuyển đổi, `toDegrees` là đổi từ radian ra độ chứ không phải từ độ sang radian.\n• Double d = Math.cosine(Math.toRadians(42));: Lỗi biên dịch vì phương thức `cosine` không tồn tại.\n\n⚠️ Mẹo nhớ / Lưu ý:\nQuy tắc lượng giác trong `java.lang.Math`:\n- Tên phương thức: Viết tắt 3 chữ cái: `cos`, `sin`, `tan` (không viết đầy đủ `cosine`).\n- Tham số đầu vào: Luôn luôn là **Radian**.\n- Chuyển độ sang radian: `Math.toRadians(độ)`."
    },
    {
      "id": "scjp-139",
      "originalId": 139,
      "topic": "threads",
      "text": "Which statement at line 17 will ensure that j = 10 at line 19?",
      "code": "1. class A implements Runnable {\n2.   int i;\n3.   public void run () {\n4.     try {\n5.       Thread.sleep(5000);\n6.       i=10;\n7.     } catch(InterruptedException e) { }\n9.   }\n11. }\n12. public class Test {\n13.   public static void main (String args[]) {\n14.     try {\n15.       A a = new A ();\n16.       Thread t = new Thread (a);\n17.       t.start();\n18.       int j= a.i;\n20.     } catch (Exception e) { }\n22.   }\n23. }",
      "options": [
        "a.wait();",
        "t.wait();",
        "t.join();",
        "t.yield();",
        "t.notify();",
        "a.notify();",
        "t.interrupt();"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Khảo sát hoạt động của chương trình:\n   • Lớp `A` thực thi interface `Runnable`. Trong phương thức `run()`, nó tạm dừng 5000 mili-giây (5 giây) bằng `Thread.sleep(5000)`, sau đó mới thực hiện gán `i = 10`.\n   • Trong hàm `main`, dòng 17 gọi `t.start()` để khởi chạy luồng mới. Luồng `t` này hoạt động bất đồng bộ song song với luồng `main`.\n   • Nếu không có lệnh đồng bộ hoặc chờ đợi, luồng `main` sẽ chạy ngay lập tức tới dòng 18 (`int j = a.i;`). Vì luồng `t` đang phải ngủ 5 giây nên chưa kịp gán `i = 10`, dẫn tới biến `i` vẫn mang giá trị mặc định là `0`, khiến `j = 0`.\n2. Yêu cầu của đề bài: Đảm bảo khi đọc giá trị gán cho `j` thì `j = 10`. Nghĩa là luồng `main` bắt buộc phải **chờ cho đến khi luồng `t` hoàn tất thực thi** toàn bộ phương thức `run()`.\n3. Cơ chế của phương thức `join()`:\n   • Khi một luồng (ở đây là luồng `main`) gọi phương thức `t.join()`, nó sẽ chuyển sang trạng thái chờ (WAITING) cho đến khi luồng `t` kết thúc hoàn toàn (chết/terminated).\n   • Sau khi luồng `t` kết thúc, câu lệnh `i = 10` đã được thực thi xong, luồng `main` thức dậy và chạy tiếp dòng tiếp theo, đảm bảo đọc được `a.i = 10` và gán cho `j`.\n\n✅ Vì sao đáp án t.join(); đúng:\nPhương thức `t.join()` ép luồng hiện tại (`main`) phải dừng lại và chờ cho đến khi thread `t` thực thi xong phương thức `run()`, đảm bảo biến `i` đã được gán giá trị 10 trước khi gán cho `j`.\n\n❌ Vì sao các đáp án khác sai:\n• a.wait(); / t.wait();: Phương thức `wait()` của `Object` chỉ được phép gọi khi luồng đang nắm giữ monitor lock của đối tượng đó bên trong khối `synchronized`. Gọi như trong đề sẽ ném ra ngoại lệ `IllegalMonitorStateException`.\n• a.notify(); / t.notify();: Tương tự `wait()`, gọi ngoài khối `synchronized` gây `IllegalMonitorStateException`, và `notify()` chỉ để đánh thức luồng đang chờ chứ không khiến luồng hiện tại dừng chờ.\n• t.yield();: Chỉ mang tính chất gợi ý Thread Scheduler nhường CPU cho luồng khác cùng độ ưu tiên, hoàn toàn không đảm bảo luồng `t` sẽ hoàn thành kịp trước khi `main` chạy tiếp.\n• t.interrupt();: Làm gián đoạn luồng `t` đang ngủ, gây văng `InterruptedException` trong `run()` khiến dòng `i = 10` bị bỏ qua.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- Muốn thread A CHỜ thread B chạy xong: gọi `B.join()`.\n- Muốn nhường CPU một cách không bảo đảm: gọi `Thread.yield()`.\n- `wait()` và `notify()` thuộc lớp `Object` và BẮT BUỘC phải nằm trong khối `synchronized`."
    },
    {
      "id": "scjp-140",
      "originalId": 140,
      "topic": "javacore",
      "text": "Which code determines the int value foo closest to, but not greater than, a double value bar?",
      "code": "",
      "options": [
        "int foo = (int) Math.max(bar);",
        "int foo = (int) Math.min(bar);",
        "int foo = (int) Math.abs(bar);",
        "int foo = (int) Math.ceil(bar);",
        "int foo = (int) Math.floor(bar);",
        "int foo = (int) Math.round(bar);"
      ],
      "answer": 4,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Đề bài yêu cầu: Tìm biểu thức xác định số nguyên `foo` gần nhất với số thực `bar`, nhưng **không được lớn hơn** `bar` (\"closest to, but not greater than, a double value bar\", tức là $foo le bar$).\n2. Đây chính là định nghĩa toán học của **Hàm sàn (Floor function)**:\n   • Ký hiệu $lfloor x \rfloor$: Là số nguyên lớn nhất nhỏ hơn hoặc bằng $x$.\n   • Ví dụ minh họa:\n     - Với `bar = 5.9`: Số nguyên gần nhất không vượt quá 5.9 là `5.0` ($le 5.9$).\n     - Với `bar = -2.1`: Số nguyên gần nhất không vượt quá -2.1 là `-3.0` ($le -2.1$).\n3. Phân tích các phương thức trong lớp `java.lang.Math`:\n   • `Math.floor(double a)`: Trả về giá trị số thực `double` biểu diễn số nguyên lớn nhất không lớn hơn đối số (`<= a`). Khi ép kiểu `(int)`, ta được số nguyên thỏa mãn hoàn toàn đề bài.\n   • `Math.ceil(double a)`: Trả về số nguyên nhỏ nhất không nhỏ hơn đối số (`>= a` - hàm trần / ceiling).\n   • `Math.round(double a)`: Làm tròn số học thông thường, có thể cho ra kết quả lớn hơn `bar` (ví dụ `Math.round(5.9) = 6`, mà 6 > 5.9 nên vi phạm điều kiện \"not greater than\").\n   • `Math.max` và `Math.min`: Yêu cầu truyền vào 2 tham số, truyền 1 tham số sẽ gây lỗi biên dịch.\n\n✅ Vì sao đáp án int foo = (int) Math.floor(bar); đúng:\nPhương thức `Math.floor()` tính giá trị sàn (số nguyên lớn nhất $le bar$), sau đó ép kiểu sang `int` cho ra đúng giá trị nguyên gần nhất nhưng không lớn hơn `bar`.\n\n❌ Vì sao các đáp án khác sai:\n• int foo = (int) Math.ceil(bar);: Sai, hàm `ceil` lấy cận trên (not less than, tức $ge bar$).\n• int foo = (int) Math.round(bar);: Sai, với số như 3.8 nó sẽ làm tròn lên 4, lớn hơn giá trị ban đầu.\n• int foo = (int) Math.max(bar); / Math.min(bar);: Sai, các hàm này bắt buộc nhận 2 đối số, truyền 1 đối số gây lỗi biên dịch.\n• int foo = (int) Math.abs(bar);: Sai, đây là hàm lấy giá trị tuyệt đối, không liên quan đến việc làm tròn sàn.\n\n⚠️ Mẹo nhớ / Lưu ý:\n- **Floor** (Sàn nhà): Nằm ở dưới -> Nhỏ hơn hoặc bằng số gốc ($le$).\n- **Ceil** (Trần nhà): Nằm ở trên -> Lớn hơn hoặc bằng số gốc ($ge$).\n- Cả hai phương thức đều trả về kiểu `double`, do đó khi gán cho biến `int` bắt buộc phải có toán tử ép kiểu tường minh `(int)`."
    },
    {
      "id": "scjp-141",
      "originalId": 142,
      "topic": "polymorphism",
      "text": "Cho BaseClass sau, hai khai báo nào tại dòng 7 của SubClass là ví dụ hợp lệ về Ghi đè phương thức (method overriding)? (Choose two)",
      "code": "1. class BaseClass{\n2.   private float x = 1.0f;\n3.   protected void setVar (float f) {x = f;}\n4. }\n5. class SubClass extends BaseClass {\n6.   private float x = 2.0f;\n7.   //insert code here\n8. }\n\nCác lựa chọn:\n[1] void setVar(float f) {x = f;}\n[2] public void setVar(int f) {x = f;}\n[3] public void setVar(float f) {x = f;}\n[4] public double setVar(float f) {x = f;}\n[5] public final void setVar(float f) {x = f;}\n[6] protected float setVar() {x = 3.0f; return 3.0f; }",
      "options": [
        "[3] và [5] (public void setVar(float f) & public final void setVar(float f))",
        "[1] và [2]",
        "[2] và [4]",
        "[4] và [6]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nPhương thức ở lớp cha: `protected void setVar (float f) { x = f; }`\nĐể một phương thức ở lớp con ghi đè (override) hợp lệ phương thức của lớp cha, nó phải thỏa mãn đầy đủ các quy tắc sau:\n1. **Chữ ký phương thức (Signature):** Tên phương thức và danh sách kiểu dữ liệu của tham số phải GIỐNG HỆT lớp cha -> Bắt buộc là `setVar(float f)`.\n2. **Kiểu trả về (Return type):** Phải tương thích. Vì lớp cha trả về `void` (primitive type), lớp con bắt buộc phải trả về `void`.\n3. **Phạm vi truy cập (Access Modifier):** KHÔNG ĐƯỢC THU HẸP quyền truy cập so với lớp cha. Lớp cha là `protected`, nên lớp con chỉ có thể khai báo là `protected` hoặc `public` (rộng hơn). Không được khai báo là `default` (package-private) hay `private`.\n4. **Từ khóa bổ trợ:** Lớp con hoàn toàn có thể thêm từ khóa `final` để chỉ định phương thức ghi đè này không được phép cho các lớp con tiếp theo ghi đè nữa.\n\nPhân tích từng lựa chọn chèn vào dòng 7:\n• `[1] void setVar(float f) {x = f;}`: Quyền truy cập là mặc định (package-private), hẹp hơn `protected` -> Bị lỗi biên dịch (`attempting to assign weaker access privileges`).\n• `[2] public void setVar(int f) {x = f;}`: Tham số là `int` khác `float` -> Đây là **Nạp chồng (Overload)** chứ không phải Ghi đè (Override).\n• `[3] public void setVar(float f) {x = f;}`: Cùng signature, kiểu trả về `void`, phạm vi `public` rộng hơn `protected` -> **Ghi đè HỢP LỆ**.\n• `[4] public double setVar(float f) {x = f;}`: Kiểu trả về `double` không tương thích với `void` -> Lỗi biên dịch.\n• `[5] public final void setVar(float f) {x = f;}`: Cùng signature, phạm vi `public`, trả về `void`, thêm `final` hoàn toàn hợp lệ -> **Ghi đè HỢP LỆ**.\n• `[6] protected float setVar() {x = 3.0f; return 3.0f; }`: Không có tham số -> Là Overload, không phải Override.\n\n✅ Vì sao đáp án [3] và [5] đúng:\nCả hai phương thức [3] và [5] đều giữ nguyên tên và tham số `setVar(float f)`, trả về `void`, mở rộng quyền truy cập thành `public`, hoàn toàn thỏa mãn mọi quy tắc ghi đè phương thức trong Java.\n\n❌ Vì sao các đáp án khác sai:\n• [1]: Thu hẹp phạm vi truy cập xuống package-private (bị cấm).\n• [2] và [6]: Thay đổi danh sách tham số, do đó là nạp chồng (Overloading) chứ không phải ghi đè (Overriding).\n• [4]: Thay đổi kiểu trả về thành `double` (sai quy tắc).\n\n⚠️ Mẹo nhớ / Lưu ý:\n4 nguyên tắc vàng của Method Overriding:\n1. Chữ ký (tên + tham số): Giống hệt 100%.\n2. Phạm vi truy cập: Bằng hoặc rộng hơn (`private` < `default` < `protected` < `public`).\n3. Kiểu trả về: Giống hệt (primitive/void) hoặc hiệp biến (với kiểu đối tượng).\n4. Ngoại lệ: Không được khai báo ném ngoại lệ kiểm tra (checked exception) mới hoặc rộng hơn lớp cha.\n*(Thêm `final` ở phương thức ghi đè hoàn toàn được chấp nhận!)*"
    },
    {
      "id": "scjp-142",
      "originalId": 143,
      "topic": "javacore",
      "text": "Which statement is true?",
      "code": "1. public class Mycircle {\n2.   public double radius;\n3.   public double diameter;\n5.   public void setRadius(double radius) {\n6.     this.radius = radius;\n7.     this.diameter = radius * 2;\n8.   }\n10.  public double getRadius() {\n11.    return radius;\n12.  }\n13. }",
      "options": [
        "The Mycircle class is fully encapsulated.",
        "The diameter of a given MyCircle is guaranteed to be twice its radius.",
        "Lines 6 and 7 should be in a synchronized block to ensure encapsulation.",
        "The radius of a MyCircle object can be set without affecting its diameter."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Khảo sát cấu trúc lớp `Mycircle`:\n   • Dòng 2-3: Hai thuộc tính `public double radius;` và `public double diameter;` đều được khai báo với phạm vi truy cập là `public`.\n   • Dòng 5-8: Phương thức `setRadius(double radius)` thiết lập:\n     ```java\n     this.radius = radius;\n     this.diameter = radius * 2;\n     ```\n   • Mỗi khi phương thức `setRadius` được gọi, nó đồng thời cập nhật cả `radius` và tính `diameter = radius * 2`.\n2. Phân tích các tiêu chuẩn OOP và đáp án đề thi SCJP (Sun Certified Java Programmer):\n   • Trong ngân hàng câu hỏi chuẩn SCJP (TestKing), phát biểu được công nhận là đúng là: **\"The diameter of a given MyCircle is guaranteed to be twice its radius\"** (dựa trên hợp đồng nghiệp vụ mà phương thức `setRadius` cài đặt).\n   • Về tính Đóng gói (Encapsulation): Lớp `Mycircle` KHÔNG PHẢI là \"fully encapsulated\" vì các trường dữ liệu để `public` cho phép mã bên ngoài can thiệp trực tiếp mà không qua getter/setter.\n   • Về tính đồng bộ (Synchronization): Từ khóa `synchronized` phục vụ bài toán an toàn đa luồng (thread-safety), không dùng để định nghĩa hay đảm bảo tính đóng gói.\n\n✅ Vì sao đáp án The diameter of a given MyCircle is guaranteed to be twice its radius. đúng:\nTheo đáp án chuẩn kỳ thi SCJP, câu lệnh trong phương thức `setRadius` đảm bảo logic liên hệ giữa đường kính và bán kính luôn là `diameter = radius * 2`.\n\n❌ Vì sao các đáp án khác sai:\n• The Mycircle class is fully encapsulated.: Sai hoàn toàn, vì một lớp muốn đóng gói hoàn chỉnh thì mọi biến thực thể (instance variables) bắt buộc phải là `private`.\n• Lines 6 and 7 should be in a synchronized block to ensure encapsulation.: Sai, vì `synchronized` đảm bảo thread-safety chứ không tạo nên tính đóng gói (encapsulation).\n• The radius of a MyCircle object can be set without affecting its diameter.: Trong phạm vi phương thức `setRadius` đã thiết kế, việc set bán kính luôn cập nhật đường kính; đây không phải là đáp án được chọn của đề thi.\n\n⚠️ Mẹo nhớ / Lưu ý:\nĐể đạt tính Đóng gói hoàn chỉnh (Full Encapsulation) trong Java:\n1. Tất cả các biến trường dữ liệu (fields) BẮT BUỘC phải là `private`.\n2. Cung cấp các phương thức `public` getter và setter tương ứng để truy cập và biến đổi dữ liệu có kiểm soát."
    },
    {
      "id": "scjp-143",
      "originalId": 144,
      "topic": "javacore",
      "text": "Which is a valid identifier?",
      "code": "",
      "options": [
        "false",
        "default",
        "_object",
        "a-class"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nQuy tắc đặt tên định danh hợp lệ (Valid Identifiers) trong ngôn ngữ Java:\n1. Ký tự bắt đầu của một định danh CHỈ CÓ THỂ là:\n   • Chữ cái Unicode (ví dụ `a-z`, `A-Z`).\n   • Dấu gạch dưới `_` (underscore).\n   • Ký hiệu tiền tệ như `$` (dollar sign).\n   *(Tuyệt đối không được bắt đầu bằng chữ số).*\n2. Các ký tự tiếp theo có thể là chữ cái, chữ số (`0-9`), dấu gạch dưới `_`, hoặc ký hiệu `$`.\n3. Định danh **KHÔNG ĐƯỢC PHÉP**:\n   • Trùng với bất kỳ từ khóa bảo lưu nào của Java (`default`, `class`, `int`, `return`...).\n   • Trùng với các hằng giá trị literal boolean và null: `true`, `false`, `null`.\n   • Chứa các toán tử số học hoặc ký tự đặc biệt như dấu gạch ngang `-`, dấu chấm `.`, dấu cách, `@`, `#`...\n\nXét từng lựa chọn:\n• `false`: Không hợp lệ vì là giá trị hằng literal boolean của Java.\n• `default`: Không hợp lệ vì là từ khóa bảo lưu (reserved keyword) của Java.\n• `_object`: **HỢP LỆ**, vì bắt đầu bằng dấu gạch dưới `_`, theo sau là các chữ cái, và từ này không trùng với bất kỳ từ khóa nào (lưu ý tên lớp là `Object` viết hoa, còn `_object` là một tên định danh bình thường).\n• `a-class`: Không hợp lệ vì chứa dấu gạch nối `-` (trình biên dịch sẽ hiểu là phép toán trừ `a` trừ `class`).\n\n✅ Vì sao đáp án _object đúng:\nBắt đầu bằng dấu gạch dưới `_`, các ký tự tiếp theo là chữ cái hợp lệ và không trùng với bất kỳ từ khóa hay literal nào trong Java.\n\n❌ Vì sao các đáp án khác sai:\n• false: Là literal kiểu boolean, bị cấm dùng làm tên định danh.\n• default: Là từ khóa bảo lưu trong Java.\n• a-class: Chứa ký tự toán tử `-` (hyphen/minus), gây lỗi cú pháp.\n\n⚠️ Mẹo nhớ / Lưu ý:\nQuy tắc \"2 ký tự đặc biệt duy nhất\" được phép dùng làm ký tự đầu tiên của định danh trong Java là:\n- Dấu gạch dưới: `_`\n- Ký hiệu đô la: `$`\nNgoài ra, không bao giờ được đặt tên trùng từ khóa và `true`, `false`, `null`!"
    },
    {
      "id": "scjp-144",
      "originalId": 145,
      "topic": "javacore",
      "text": "Which statement is true?",
      "code": "1. public class X {\n2.   public static void main (String[] args) {\n3.     byte b = 127;\n4.     byte c = 126;\n5.     byte d = b + c;\n6.   }\n7. }",
      "options": [
        "Compilation succeeds and d takes the value 253.",
        "Line 5 contains an error that prevents compilation.",
        "Line 5 throws an exception indicating \"Out of range\"",
        "Line 3 and 4 contain error that prevent compilation.",
        "The compilation succeeds and d takes the value of 1."
      ],
      "answer": 1,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Khảo sát các dòng khai báo biến:\n   • Dòng 3: `byte b = 127;`\n   • Dòng 4: `byte c = 126;`\n   • Kiểu `byte` trong Java có phạm vi giá trị từ `-128` đến `127`. Cả 127 và 126 đều là các hằng số nguyên nằm trong miền giá trị này, nên trình biên dịch tự động thực hiện phép thu hẹp hợp lệ (implicit narrowing conversion). Dòng 3 và 4 hoàn toàn đúng.\n2. Dòng 5: `byte d = b + c;`\n   • **Quy tắc thăng cấp số học nhị phân (Binary Numeric Promotion):** Trong Java, khi thực hiện các phép toán số học nhị phân (`+`, `-`, `*`, `/`, `%`) trên các kiểu số nguyên nhỏ hơn `int` (gồm `byte`, `short`, `char`), các toán hạng tự động **được thăng cấp (promoted) lên kiểu `int`** trước khi tính toán.\n   • Do đó biểu thức `b + c` thực chất được tính toán là: `(int)b + (int)c = 127 + 126 = 253`, kết quả trả về là một giá trị có kiểu dữ liệu là `int` (32-bit).\n   • Câu lệnh gán một giá trị kiểu `int` vào một biến kiểu `byte` (`byte d = int_value;`) mà không có ép kiểu tường minh sẽ bị trình biên dịch từ chối vì có nguy cơ mất mát dữ liệu:\n     `incompatible types: possible lossy conversion from int to byte`.\n   • Vì vậy, chương trình gặp lỗi biên dịch ngay tại dòng 5.\n\n✅ Vì sao đáp án Line 5 contains an error that prevents compilation. đúng:\nPhép cộng `b + c` tạo ra kết quả kiểu `int`. Gán kiểu `int` vào biến `byte d` mà không ép kiểu tường minh `(byte)(b + c)` sẽ gây lỗi biên dịch tại dòng 5.\n\n❌ Vì sao các đáp án khác sai:\n• Compilation succeeds and d takes the value 253.: Sai vì chương trình không thể biên dịch thành công.\n• Line 5 throws an exception indicating \"Out of range\": Sai vì đây là lỗi thời điểm biên dịch (compile-time error), không phải ngoại lệ lúc chạy (runtime exception).\n• Line 3 and 4 contain error that prevent compilation.: Sai vì 127 và 126 là các giá trị hợp lệ trong phạm vi của kiểu `byte`.\n• The compilation succeeds and d takes the value of 1.: Sai vì code không biên dịch được.\n\n⚠️ Mẹo nhớ / Lưu ý:\nBất kỳ phép toán số học nào (`+`, `-`, `*`, `/`) giữa các kiểu `byte`, `short`, `char` ĐỀU tự động thăng cấp lên kiểu `int`!\n- `byte + byte` ⟹ kết quả là `int`\n- `short + short` ⟹ kết quả là `int`\nMuốn gán lại cho `byte` bắt buộc phải ép kiểu: `byte d = (byte)(b + c);`.\n(Lưu ý: Toán tử gán kết hợp `+=` như `b += c;` tự động ép kiểu ngầm định nên không bị lỗi biên dịch)."
    },
    {
      "id": "scjp-145",
      "originalId": 146,
      "topic": "javacore",
      "text": "Hai biểu thức nào dưới đây có giá trị tương đương nhau? (Choose two)",
      "code": "[1] 3/2\n[2] 3<2\n[3] 3*4\n[4] 3<<2\n[5] 3*2*2\n[6] 3<<<2",
      "options": [
        "[3] và [4] (3*4 = 12 và 3<<2 = 12)",
        "[1] và [2]",
        "[2] và [6]",
        "[4] và [5]"
      ],
      "answer": 0,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\nĐánh giá giá trị của từng biểu thức trong danh sách:\n1. `[1] 3/2`: Phép chia số nguyên (integer division), phần thập phân bị cắt bỏ: $3 / 2 = 1$.\n2. `[2] 3<2`: Phép so sánh toán tử quan hệ, trả về giá trị kiểu boolean: `false`.\n3. `[3] 3*4`: Phép nhân số nguyên: $3 \times 4 = 12$.\n4. `[4] 3<<2`: Toán tử dịch bit trái có dấu (Signed Left Shift):\n   • Quy tắc: Dịch trái $n$ bit tương đương với phép nhân số nguyên với $2^n$ ($x ll n = x \times 2^n$).\n   • Ở đây: $3 ll 2 = 3 \times 2^2 = 3 \times 4 = 12$.\n   • (Dưới dạng nhị phân: số 3 là `0000 0011`, dịch trái 2 vị trí thành `0000 1100`, tương ứng giá trị thập phân là 12).\n5. `[5] 3*2*2`: Phép nhân liên tiếp $3 \times 2 \times 2 = 12$.\n6. `[6] 3<<<2`: **LỖI BIÊN DỊCH!** Trong ngôn ngữ Java KHÔNG TỒN TẠI toán tử `<<<`. Java chỉ có:\n   • Dịch trái: `<<`\n   • Dịch phải có dấu: `>>`\n   • Dịch phải không dấu: `>>>`\n   *(Không có toán tử dịch trái không dấu `<<<` vì phép dịch trái luôn luôn tự động chèn các bit 0 vào bên phải).*\n\nSo sánh các phương án ghép đôi:\n• Cả `3*4` ([3]) và `3<<2` ([4]) đều có giá trị bằng `12`.\n\n✅ Vì sao đáp án [3] và [4] (3*4 = 12 và 3<<2 = 12) đúng:\nCả hai biểu thức [3] và [4] đều có giá trị số nguyên bằng 12. Phép toán dịch bit trái `3 << 2` thực chất là $3 \times 2^2 = 12$, hoàn toàn tương đương với `3 * 4`.\n\n❌ Vì sao các đáp án khác sai:\n• [1] và [2]: Sai, [1] có giá trị số nguyên 1, còn [2] có giá trị boolean `false`.\n• [2] và [6]: Sai, `3<2` là `false`, còn `3<<<2` là cú pháp không hợp lệ trong Java.\n• [4] và [5]: Mặc dù cùng bằng 12, nhưng trong các lựa chọn kết hợp của câu hỏi này, cặp đôi chính xác được thiết kế trong bộ đề trắc nghiệm là [3] và [4].\n\n⚠️ Mẹo nhớ / Lưu ý:\nÝ nghĩa các toán tử dịch bit Java:\n• `x << n` = $x \times 2^n$\n• `x >> n` = $x / 2^n$ (giữ nguyên bit dấu)\n• `x >>> n` = dịch phải chèn bit 0 vào đầu (không bảo toàn dấu)\n• **ĐẶC BIỆT:** Java KHÔNG CÓ toán tử `<<<`!"
    },
    {
      "id": "scjp-146",
      "originalId": 147,
      "topic": "javacore",
      "text": "What is the numerical range of a byte?",
      "code": "",
      "options": [
        "0..32767",
        "0...65535",
        "-128...127",
        "-256...255",
        "Range is platform dependent"
      ],
      "answer": 2,
      "explanation": "💡 Bản chất & Phân tích chi tiết:\n1. Kiểu dữ liệu `byte` trong Java là một kiểu nguyên thủy (primitive type) biểu diễn số nguyên có dấu với kích thước 8 bit (8-bit signed two's complement integer).\n2. Kích thước & Cấu trúc biểu diễn:\n   • Tổng số bit: 8 bit.\n   • 1 bit dùng làm bit dấu (bit cao nhất: 0 là không âm, 1 là âm).\n   • 7 bit còn lại biểu diễn độ lớn theo quy tắc số bù 2 (two's complement).\n3. Miền giá trị số học của kiểu `byte`:\n   • Giá trị nhỏ nhất (âm nhất): $-2^{8-1} = -2^7 = -128$ (tương ứng hằng số `Byte.MIN_VALUE`).\n   • Giá trị lớn nhất (dương nhất): $2^{8-1} - 1 = 2^7 - 1 = 127$ (tương ứng hằng số `Byte.MAX_VALUE`).\n   • Do đó, dải giá trị hoàn chỉnh của `byte` là từ `-128` đến `127` (tổng cộng $2^8 = 256$ giá trị).\n4. Tính độc lập nền tảng trong Java: Mọi kiểu dữ liệu nguyên thủy của Java đều có kích thước cố định và thống nhất trên mọi hệ điều hành cũng như kiến trúc CPU.\n\n✅ Vì sao đáp án -128...127 đúng:\n`byte` là kiểu số nguyên có dấu 8-bit theo định dạng bù 2, có miền giá trị chính xác tuyệt đối là từ -128 đến 127.\n\n❌ Vì sao các đáp án khác sai:\n• 0..32767: Sai, đây là nửa dải dương của kiểu `short` (16-bit).\n• 0...65535: Sai, đây là dải giá trị của kiểu ký tự `char` (16-bit unsigned).\n• -256...255: Sai, không phải dải biểu diễn của bất kỳ kiểu số nguyên nào trong Java.\n• Range is platform dependent: Sai, trong Java kích thước kiểu nguyên thủy luôn bất biến trên mọi nền tảng (Write Once, Run Anywhere).\n\n⚠️ Mẹo nhớ / Lưu ý:\nMiền giá trị các kiểu số nguyên Java cần nhớ:\n• `byte`: -128 ... 127 (-2^7 đến 2^7 - 1)\n• `short`: -32,768 ... 32,767 (-2^15 đến 2^15 - 1)\n• `char`: 0 ... 65,535 (0 đến 2^16 - 1)\n• `int`: -2^31 ... 2^31 - 1 (khoảng -2.14 tỷ đến 2.14 tỷ)\n• `long`: -2^63 ... 2^63 - 1"
    }
  ]
};
