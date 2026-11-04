# -*- coding: utf-8 -*-
import json
import os

enriched_ch09 = [
    {
        "id": "scjp-ch09-001",
        "originalId": 1,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following, what is the result?",
        "textVi": "Cho đoạn mã sau, kết quả khi chạy đoạn mã trên là gì?",
        "code": "1.  class MyThread extends Thread {\n2.\n3.     public static void main(String [] args) {\n4.        MyThread t = new MyThread();\n5.        t.run();\n6.     }\n7.\n8.     public void run() {\n9.        for(int i=1; i<3; ++i) {\n10.          System.out.print(i + \"..\");\n11.       }\n12.    }\n13. }",
        "options": [
            "This code will not compile due to line 4.",
            "This code will not compile due to line 5.",
            "1..2..",
            "1..2..3..",
            "An exception is thrown at runtime."
        ],
        "optionsVi": [
            "Đoạn mã không biên dịch được do lỗi ở dòng 4.",
            "Đoạn mã không biên dịch được do lỗi ở dòng 5.",
            "1..2..",
            "1..2..3..",
            "Ném ngoại lệ tại thời điểm chạy (Runtime Exception)."
        ],
        "answer": 2,
        "correctLetters": ["C"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân biệt then chốt giữa t.run() và t.start():
• `t.start()`: Yêu cầu JVM cấp phát và khởi chạy một luồng độc lập mới của hệ điều hành. Khi luồng mới được cấp phát CPU, nó sẽ tự động gọi phương thức `run()` trong luồng mới đó (bất đồng bộ).
• `t.run()`: Chỉ đơn thuần là một lời gọi phương thức bình thường giống như mọi hàm `void` khác trong Java! Nó KHÔNG TẠO RA bất kỳ luồng mới nào cả. Toàn bộ mã nguồn bên trong `run()` sẽ chạy trực tiếp trên luồng hiện tại đang gọi nó (ở đây là luồng `main`).

2. Luồng thực thi của chương trình:
• Dòng 4: Khởi tạo đối tượng `MyThread t = new MyThread();`. Cú pháp hoàn toàn hợp lệ.
• Dòng 5: Gọi trực tiếp `t.run();`. Luồng `main` tạm dừng để nhảy vào thực thi thân hàm `run()`.
• Dòng 9: Vòng lặp `for (int i=1; i<3; ++i)`:
  - Khi `i = 1`: `1 < 3` là đúng -> in ra `1..`
  - Khi `i = 2`: `2 < 3` là đúng -> in ra `2..`
  - Khi `i = 3`: `3 < 3` là sai -> thoát vòng lặp.
• Kết quả in ra trên màn hình là: `1..2..`.

✅ Vì sao đáp án "1..2.." đúng:
Gọi `t.run()` là hợp lệ và hoạt động như một phương thức thông thường trên luồng `main`. Vòng lặp chạy 2 lần với `i = 1` và `i = 2`, in ra chính xác chuỗi `1..2..`.

❌ Vì sao các đáp án khác sai:
• "This code will not compile due to line 4 / line 5": Sai vì cú pháp tạo đối tượng và gọi phương thức `run()` hoàn toàn hợp lệ trong Java.
• "1..2..3..": Sai vì điều kiện vòng lặp là `i < 3` (dấu nhỏ hơn nghiêm ngặt), nên khi `i = 3` vòng lặp đã dừng lại, không in `3..`.
• "An exception is thrown at runtime.": Sai vì không có bất kỳ ngoại lệ nào xảy ra trong quá trình chạy.

⚠️ Mẹo nhớ / Lưu ý:
• Bẫy thi phổ biến nhất về Thread: Muốn tạo luồng mới chạy song song bắt buộc phải gọi `.start()`.
• Nếu gọi `.run()` thì chỉ là chạy tuần tự (single thread) như hàm bình thường!"""
    },
    {
        "id": "scjp-ch09-002",
        "originalId": 2,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which two of the following methods are defined in class Thread?",
        "textVi": "Hai phương thức nào sau đây được định nghĩa trực tiếp trong lớp java.lang.Thread?",
        "code": "",
        "options": [
            "A và D (A: start() & D: run())",
            "A và B (A: start() & B: wait())",
            "B và C (B: wait() & C: notify())",
            "D và E (D: run() & E: terminate())"
        ],
        "optionsVi": [
            "A và D (A: start() & D: run())",
            "A và B (A: start() & B: wait())",
            "B và C (B: wait() & C: notify())",
            "D và E (D: run() & E: terminate())"
        ],
        "answer": 0,
        "correctLetters": ["A", "D"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân loại phương thức thuộc Thread vs Object:
Rất nhiều lập trình viên mới học thường nhầm lẫn các phương thức điều khiển luồng:
• Lớp `java.lang.Thread`:
  - `start()`: Bắt đầu thực thi một luồng mới.
  - `run()`: Thân hàm chứa mã nguồn của luồng (triển khai từ interface `Runnable`).
  - `sleep(long millis)`: Cho luồng hiện tại ngủ tạm thời (static).
  - `yield()`: Nhường CPU cho luồng khác có cùng độ ưu tiên (static).
  - `join()`: Chờ đợi một luồng khác kết thúc.
  - `currentThread()`: Lấy tham chiếu tới luồng đang chạy (static).

• Lớp `java.lang.Object`:
  - `wait()`: Đưa luồng vào trạng thái chờ trên monitor lock của đối tượng.
  - `notify()`: Đánh thức một luồng đang chờ trên monitor của đối tượng.
  - `notifyAll()`: Đánh thức tất cả các luồng đang chờ trên monitor của đối tượng.
  *Lý do:* Vì trong Java, mỗi một đối tượng bất kỳ đều có một khóa (intrinsic lock / monitor), nên `wait()` và `notify()` thuộc về `Object`, KHÔNG PHẢI `Thread`!

• Phương thức `terminate()`:
  - Hoàn toàn KHÔNG TỒN TẠI trong Java! Không có phương thức nào tên là `terminate()` trong lớp `Thread`.

✅ Vì sao đáp án "A và D" đúng:
Cả `start()` và `run()` đều là các phương thức chính thức được định nghĩa trong lớp `java.lang.Thread`.

❌ Vì sao các đáp án khác sai:
• Các phương án chứa B (`wait()`) hoặc C (`notify()`): Sai vì hai phương thức này thuộc lớp `java.lang.Object`.
• Các phương án chứa E (`terminate()`): Sai vì phương thức này không tồn tại trong thư viện chuẩn Java.

⚠️ Mẹo nhớ / Lưu ý:
• Nhớ quy tắc: Các phương thức giao tiếp liên quan đến khóa Monitor (`wait`, `notify`, `notifyAll`) nằm trong `Object`.
• Các phương thức điều khiển vòng đời luồng (`start`, `sleep`, `join`, `yield`) nằm trong `Thread`."""
    },
    {
        "id": "scjp-ch09-003",
        "originalId": 3,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "The following block of code creates a Thread using a Runnable target:\nRunnable target = new MyRunnable();\nThread myThread = new Thread(target);\nWhich of the following classes can be used to create the target, so that the preceding code compiles correctly?",
        "textVi": "Đoạn mã sau tạo một Thread sử dụng một mục tiêu (target) kiểu Runnable:\nRunnable target = new MyRunnable();\nThread myThread = new Thread(target);\nLớp nào dưới đây có thể dùng để tạo target trên, giúp đoạn mã biên dịch thành công?",
        "code": "Runnable target = new MyRunnable();\nThread myThread = new Thread(target);",
        "options": [
            "public class MyRunnable extends Runnable { public void run() {} }",
            "public class MyRunnable extends Object { public void run() {} }",
            "public class MyRunnable implements Runnable { public void run() {} }",
            "public class MyRunnable implements Runnable { void run() {} }",
            "public class MyRunnable implements Runnable { public void start() {} }"
        ],
        "optionsVi": [
            "public class MyRunnable extends Runnable { public void run() {} }",
            "public class MyRunnable extends Object { public void run() {} }",
            "public class MyRunnable implements Runnable { public void run() {} }",
            "public class MyRunnable implements Runnable { void run() {} }",
            "public class MyRunnable implements Runnable { public void start() {} }"
        ],
        "answer": 2,
        "correctLetters": ["C"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
Để dòng code `Runnable target = new MyRunnable();` biên dịch hợp lệ:
1. Kiểu quan hệ: `Runnable` là một Interface trong gói `java.lang`.
   • Một class muốn hiện thực hóa một interface thì phải dùng từ khóa `implements`, KHÔNG ĐƯỢC dùng `extends`. (Loại A).
2. Tính đa hình: Lớp `MyRunnable` bắt buộc phải là một kiểu con của `Runnable` (nghĩa là có `implements Runnable`). Nếu chỉ `extends Object` thông thường thì không thể gán vào biến kiểu `Runnable`. (Loại B).
3. Hợp đồng Interface: Interface `Runnable` chỉ định nghĩa duy nhất một phương thức trừu tượng: `public abstract void run();`.
   • Lớp cài đặt bắt buộc phải ghi đè chính xác phương thức `run()`. Nếu ghi đè `start()` thay vì `run()` thì vi phạm hợp đồng interface. (Loại E).
   • Quy tắc ghi đè (Override Access Modifier): Tất cả các phương thức trong interface mặc định đều là `public`. Khi một class ghi đè phương thức đó, nó KHÔNG ĐƯỢC PHÉP thu hẹp phạm vi truy cập (không được giảm xuống default `void run()` hay `protected`). Bắt buộc phải giữ nguyên `public void run() {}`. (Loại D).

Do đó, chỉ có khai báo C là hoàn toàn chuẩn xác.

✅ Vì sao đáp án "public class MyRunnable implements Runnable { public void run() {} }" đúng:
Lớp sử dụng đúng từ khóa `implements Runnable` và ghi đè phương thức với đầy đủ từ khóa truy cập `public void run() {}`.

❌ Vì sao các đáp án khác sai:
• "...extends Runnable...": Sai vì `Runnable` là interface, lớp phải `implements`, không được `extends`.
• "...extends Object...": Sai vì không `implements Runnable`, biến `target` kiểu `Runnable` không thể tham chiếu tới đối tượng này.
• "...void run() {}": Sai vì phương thức trong interface mặc định là `public`, nếu bỏ `public` thì phạm vi bị hạ xuống package-private (default), gây lỗi biên dịch \"attempting to assign weaker access privileges\".
• "...public void start() {}": Sai vì interface `Runnable` yêu cầu triển khai `run()`, không phải `start()`.

⚠️ Mẹo nhớ / Lưu ý:
• Ghi đè phương thức của interface thì BẮT BUỘC PHẢI CÓ từ khóa `public` ở đầu phương thức.
• Lớp cài đặt interface dùng `implements`, lớp kế thừa lớp dùng `extends`."""
    },
    {
        "id": "scjp-ch09-004",
        "originalId": 4,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following, what is the result of this code?",
        "textVi": "Cho đoạn mã sau, kết quả khi thực thi đoạn mã trên là gì?",
        "code": "1.  class MyThread extends Thread {\n2.\n3.     public static void main(String [] args) {\n4.        MyThread t = new MyThread();\n5.        t.start();\n6.        System.out.print(\"one. \");\n7.        t.start();\n8.        System.out.print(\"two. \");\n9.     }\n10.\n11.    public void run() {\n12.       System.out.print(\"Thread \");\n13.    }\n14. }",
        "options": [
            "Compilation fails",
            "An exception occurs at runtime.",
            "Thread one. Thread two.",
            "The output cannot be determined."
        ],
        "optionsVi": [
            "Lỗi biên dịch (Compilation fails)",
            "Ném ngoại lệ tại thời điểm chạy (Runtime Exception).",
            "Thread one. Thread two.",
            "Không thể xác định trước kết quả in ra."
        ],
        "answer": 1,
        "correctLetters": ["B"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Vòng đời của một Thread (Thread Lifecycle):
Một đối tượng `Thread` trong Java trải qua các trạng thái: `NEW` -> `RUNNABLE` -> `BLOCKED/WAITING` -> `TERMINATED` (hoặc `DEAD`).
• Khi vừa tạo bằng toán tử `new`: Luồng ở trạng thái `NEW`.
• Khi gọi `t.start()` lần đầu tiên: Luồng chuyển sang trạng thái `RUNNABLE` và bắt đầu chạy.
• Khi phương thức `run()` kết thúc: Luồng chuyển sang trạng thái chết (`TERMINATED`).

2. Quy tắc khởi động luồng trong Java:
• Một đối tượng Thread CHỈ ĐƯỢC PHÉP KHỞI ĐỘNG MỘT LẦN DUY NHẤT trong toàn bộ vòng đời của nó!
• Sau khi đã gọi `start()`, bất kể luồng đó đang chạy hay đã hoàn thành và chết, việc gọi lại `t.start()` lần thứ hai trên cùng một đối tượng `Thread` đó là BẤT HỢP PHÁP.
• Khi gọi lại `t.start()` ở dòng 7, JVM sẽ ngay lập tức ném ra ngoại lệ unchecked: `java.lang.IllegalThreadStateException` tại thời điểm chạy (runtime)!

3. Lưu ý về việc biên dịch:
Trình biên dịch Java chỉ kiểm tra tính hợp lệ về mặt ngữ pháp (cú pháp gọi hàm hợp lệ trên đối tượng Thread). Trình biên dịch không theo dõi trạng thái runtime của đối tượng luồng, do đó code biên dịch hoàn toàn bình thường và chỉ phát nổ ngoại lệ khi chạy tới dòng 7.

✅ Vì sao đáp án "An exception occurs at runtime." đúng:
Gọi phương thức `start()` lần thứ hai trên cùng một đối tượng `Thread` sẽ ném ngoại lệ `java.lang.IllegalThreadStateException`.

❌ Vì sao các đáp án khác sai:
• "Compilation fails": Sai vì về mặt cú pháp mã nguồn hoàn toàn hợp lệ, không có lỗi lúc biên dịch.
• "Thread one. Thread two.": Sai vì không thể khởi động lại một luồng đã start, ngoại lệ runtime sẽ làm dừng chương trình.
• "The output cannot be determined.": Sai vì chắc chắn ngoại lệ sẽ xảy ra khi thực thi dòng 7.

⚠️ Mẹo nhớ / Lưu ý:
• Quy tắc bất di bất dịch: "Một Thread chỉ có một đời để sống - Không bao giờ được gọi `start()` hai lần trên cùng một instance Thread!"
• Bất kể luồng đã chết hay chưa, gọi `start()` lần 2 = `IllegalThreadStateException`."""
    },
    {
        "id": "scjp-ch09-005",
        "originalId": 5,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following:\npublic class MyRunnable implements Runnable {\n  public void run() {\n    // some code here\n  }\n}\nwhich of these will create and start this thread?",
        "textVi": "Cho đoạn mã sau:\npublic class MyRunnable implements Runnable {\n  public void run() {\n    // mã xử lý tại đây\n  }\n}\nCâu lệnh nào dưới đây sẽ tạo và khởi chạy luồng này một cách hợp lệ?",
        "code": "public class MyRunnable implements Runnable {\n  public void run() {\n    // some code here\n  }\n}",
        "options": [
            "new Runnable(MyRunnable).start();",
            "new Thread(MyRunnable).run();",
            "new Thread(new MyRunnable()).start();",
            "new MyRunnable().start();"
        ],
        "optionsVi": [
            "new Runnable(MyRunnable).start();",
            "new Thread(MyRunnable).run();",
            "new Thread(new MyRunnable()).start();",
            "new MyRunnable().start();"
        ],
        "answer": 2,
        "correctLetters": ["C"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Cơ chế thực thi luồng qua Runnable:
• Lớp `MyRunnable` chỉ là một mục tiêu thực thi (Execution Target) cài đặt interface `Runnable`. Nó chỉ chứa công việc cần làm trong phương thức `run()`, bản thân nó KHÔNG PHẢI là một luồng (nó không kế thừa từ `Thread`).
• Do đó, `MyRunnable` không có phương thức `start()`! Muốn một luồng mới được tạo và chạy công việc này, ta phải tạo một đối tượng thực tế của `java.lang.Thread` và giao việc (`MyRunnable`) cho nó.

2. Phân tích từng bước chuẩn xác:
• Bước 1: Khởi tạo đối tượng công việc: `new MyRunnable()`
• Bước 2: Khởi tạo đối tượng luồng và truyền công việc vào constructor: `new Thread(new MyRunnable())`
• Bước 3: Ra lệnh cho luồng bắt đầu chạy: `.start()`
• Ghép lại thành câu lệnh hoàn hảo: `new Thread(new MyRunnable()).start();`

3. Phân tích các câu lệnh sai:
• `new Runnable(MyRunnable).start();`: SAI vì `Runnable` là interface (không thể `new` trực tiếp qua constructor), và không thể truyền tên class vào constructor mà không có `new`.
• `new Thread(MyRunnable).run();`: SAI vì truyền tên class `MyRunnable` thay vì một đối tượng `new MyRunnable()`, đồng thời gọi `.run()` sẽ không tạo luồng mới.
• `new MyRunnable().start();`: SAI vì lớp `MyRunnable` không có phương thức `start()`.

✅ Vì sao đáp án "new Thread(new MyRunnable()).start();" đúng:
Đây là mẫu thiết kế chuẩn của Java Concurrency: Truyền một đối tượng `Runnable` vào constructor của `Thread` và gọi `start()` để bắt đầu thực thi trên luồng mới.

❌ Vì sao các đáp án khác sai:
• Đáp án A và B sai cú pháp nghiêm trọng (truyền trực tiếp định danh class vào constructor mà không khởi tạo).
• Đáp án D sai vì `MyRunnable` không kế thừa lớp `Thread`, do đó không sở hữu phương thức `start()`.

⚠️ Mẹo nhớ / Lưu ý:
• Muốn chạy `Runnable` thì phải "nhờ" `Thread`:
  `new Thread(runnableInstance).start();`
• `Runnable` = Công việc cần làm; `Thread` = Công nhân thực hiện."""
    },
    {
        "id": "scjp-ch09-006",
        "originalId": 6,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following, what is the result of this code?",
        "textVi": "Cho đoạn mã sau, kết quả khi thực thi đoạn mã trên là gì?",
        "code": "1.  class MyThread extends Thread {\n2.\n3.     public static void main(String [] args) {\n4.        MyThread t = new MyThread();\n5.        Thread x = new Thread(t);\n6.        x.start();\n7.     }\n8.\n9.     public void run() {\n10.       for(int i=0; i<3; ++i) {\n11.          System.out.print(i + \"..\");\n12.       }\n13.    }\n14. }",
        "options": [
            "Compilation fails.",
            "1..2..3..",
            "0..1..2..3..",
            "0..1..2..",
            "An exception occurs at runtime."
        ],
        "optionsVi": [
            "Lỗi biên dịch (Compilation fails).",
            "1..2..3..",
            "0..1..2..3..",
            "0..1..2..",
            "Ném ngoại lệ tại thời điểm chạy (Runtime Exception)."
        ],
        "answer": 3,
        "correctLetters": ["D"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân tích tính hợp lệ ở dòng 4 và 5 (Bẫy đề thi):
• Dòng 4: `MyThread t = new MyThread();` tạo một đối tượng của `MyThread`.
• Dòng 5: `Thread x = new Thread(t);`
  - Constructor `Thread(Runnable target)` nhận một đối tượng cài đặt interface `Runnable`.
  - Bản thân lớp `java.lang.Thread` ĐÃ CÀI ĐẶT interface `Runnable` (`public class Thread implements Runnable`).
  - Lớp `MyThread` kế thừa `Thread`, do đó `t` cũng ĐỒNG THỜI là một `Runnable` hợp lệ!
  - Việc truyền một đối tượng `Thread` (ở đây là `t`) vào constructor của một `Thread` khác (`x`) là HOÀN TOÀN HỢP LỆ VÀ ĐÚNG CHUẨN ĐA HÌNH trong Java. Mã nguồn biên dịch không lỗi!

2. Luồng thực thi khi gọi x.start():
• Dòng 6: `x.start();` khởi chạy luồng `x`. Luồng `x` sẽ gọi phương thức `run()` của đối tượng mục tiêu `t`.
• Phương thức `run()` ở dòng 9-13 được kích hoạt:
  - Vòng lặp: `for (int i=0; i<3; ++i)`
  - Lần lặp 1: `i = 0`, in `0..`
  - Lần lặp 2: `i = 1`, in `1..`
  - Lần lặp 3: `i = 2`, in `2..`
  - Khi `i = 3`: điều kiện `3 < 3` sai, vòng lặp kết thúc.
• Chuỗi in ra màn hình: `0..1..2..`.

✅ Vì sao đáp án "0..1..2.." đúng:
Constructor `Thread(Runnable)` chấp nhận bất kỳ đối tượng nào là `Runnable`. Vì `Thread` implements `Runnable`, việc truyền `t` vào `Thread(t)` là hoàn toàn hợp lệ, và vòng lặp chạy từ 0 đến 2 in ra `0..1..2..`.

❌ Vì sao các đáp án khác sai:
• "Compilation fails.": Sai vì nhiều người tưởng lầm `Thread` không thể truyền vào `Thread`, nhưng thực tế `Thread` chính là một `Runnable`.
• "1..2..3..": Sai vì biến `i` khởi tạo từ `0`, không phải `1`.
• "0..1..2..3..": Sai vì điều kiện là `i < 3`, không bao gồm số 3.
• "An exception occurs at runtime.": Sai vì chương trình chạy bình thường không phát sinh lỗi.

⚠️ Mẹo nhớ / Lưu ý:
• Nhớ gia phả: `Thread implements Runnable`. Bất kỳ đối tượng `Thread` nào cũng có thể đóng vai trò là một `Runnable target` cho một Thread khác!
• Luôn quan sát kỹ giá trị khởi đầu (`int i=0`) và điều kiện dừng (`i<3`) của vòng lặp `for`."""
    },
    {
        "id": "scjp-ch09-007",
        "originalId": 7,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following:\n1.  class Test {\n2.\n3.     public static void main(String [] args) {\n4.        printAll(args);\n5.     }\n6.\n7.     public static void printAll(String[] lines) {\n8.        for(int i=0; i<lines.length; i++){\n9.           System.out.println(lines[i]);\n10.          Thread.currentThread().sleep(1000);\n11.       }\n12.    }\n13. }\nthe static method Thread.currentThread() returns a reference to the currently executing Thread object. What is the result of this code?",
        "textVi": "Cho đoạn mã sau (biết rằng phương thức tĩnh Thread.currentThread() trả về tham chiếu tới luồng đang thực thi):\n1.  class Test {\n2.\n3.     public static void main(String [] args) {\n4.        printAll(args);\n5.     }\n6.\n7.     public static void printAll(String[] lines) {\n8.        for(int i=0; i<lines.length; i++){\n9.           System.out.println(lines[i]);\n10.          Thread.currentThread().sleep(1000);\n11.       }\n12.    }\n13. }\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "1.  class Test {\n2.\n3.     public static void main(String [] args) {\n4.        printAll(args);\n5.     }\n6.\n7.     public static void printAll(String[] lines) {\n8.        for(int i=0; i<lines.length; i++){\n9.           System.out.println(lines[i]);\n10.          Thread.currentThread().sleep(1000);\n11.       }\n12.    }\n13. }",
        "options": [
            "Each String in the array lines will output, with a 1-second pause.",
            "Each String in the array lines will output, with no pause in between because this method is not executed in a Thread.",
            "Each String in the array lines will output, and there is no guarantee there will be a pause because currentThread() may not retrieve this thread.",
            "This code will not compile."
        ],
        "optionsVi": [
            "Mỗi phần tử String trong mảng lines sẽ được in ra, cách nhau 1 giây tạm dừng.",
            "Mỗi phần tử String trong mảng lines sẽ được in ra không có khoảng dừng, vì phương thức này không chạy trong một Thread.",
            "Mỗi phần tử String trong mảng lines sẽ được in ra, và không chắc chắn có khoảng dừng vì currentThread() có thể không lấy được luồng này.",
            "Đoạn mã này sẽ không biên dịch được (This code will not compile)."
        ],
        "answer": 3,
        "correctLetters": ["D"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Bản chất phương thức Thread.sleep():
Phương thức `Thread.sleep(long millis)` trong Java được khai báo với đặc tả ngoại lệ kiểm tra (checked exception):
`public static void sleep(long millis) throws InterruptedException`

2. Quy tắc xử lý Checked Exception trong Java:
• Bất kỳ khi nào một phương thức gọi một hàm ném ra Checked Exception (như `InterruptedException`), lập trình viên BẮT BUỘC PHẢI làm một trong hai việc:
  - Cách 1: Đặt lời gọi hàm đó vào trong khối `try-catch` để bắt và xử lý ngoại lệ:
    `try { Thread.sleep(1000); } catch (InterruptedException e) { ... }`
  - Cách 2: Khai báo từ khóa `throws` ở phần chữ ký của phương thức:
    `public static void printAll(String[] lines) throws InterruptedException`
• Nhìn vào đoạn mã ở dòng 7-12: Phương thức `printAll` gọi `sleep(1000)` nhưng KHÔNG dùng `try-catch`, và cũng KHÔNG khai báo `throws InterruptedException`!
• Kết quả: Trình biên dịch Java sẽ báo lỗi biên dịch ngay tại dòng 10:
  `unreported exception java.lang.InterruptedException; must be caught or declared to be thrown`.

3. Một điểm lưu ý về Thread.currentThread().sleep():
`sleep()` là một phương thức tĩnh (`static`). Dù bạn gọi thông qua `Thread.currentThread().sleep(...)` hay gọi trên bất kỳ biến instance Thread nào, nó cũng luôn luôn chỉ làm cho LUỒNG HIỆN TẠI ĐANG CHẠY bị ngủ. Nhưng do thiếu xử lý ngoại lệ checked nên code không thể biên dịch.

✅ Vì sao đáp án "This code will not compile." đúng:
Phương thức `Thread.sleep()` ném ra `InterruptedException` (một checked exception), do không được bắt trong `try-catch` hoặc khai báo `throws`, trình biên dịch sẽ từ chối biên dịch đoạn mã này.

❌ Vì sao các đáp án khác sai:
• "Each String in the array lines will output, with a 1-second pause.": Sai vì mã nguồn không vượt qua được bước biên dịch (nếu có try-catch thì đáp án này mới đúng).
• "...because this method is not executed in a Thread.": Sai về mặt kiến trúc Java: MỌI mã nguồn Java (kể cả hàm `main`) LUÔN LUÔN được thực thi bên trong ít nhất một luồng (luồng chính `main thread`).
• "...currentThread() may not retrieve this thread.": Sai vì `Thread.currentThread()` luôn đảm bảo 100% trả về tham chiếu của luồng đang gọi nó.

⚠️ Mẹo nhớ / Lưu ý:
• Hễ thấy `Thread.sleep()` hoặc `wait()` hoặc `join()` trong đề thi Java -> Ngay lập tức kiểm tra xem nó ĐÃ ĐƯỢC BỌC TRONG `try-catch` hoặc có `throws InterruptedException` hay chưa! Nếu chưa có, 99% đáp án là "Compilation fails"!"""
    },
    {
        "id": "scjp-ch09-008",
        "originalId": 8,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Assume you have a class that holds two private variables: a and b. Which of the following pairs can prevent concurrent access problems in that class? (Choose all that apply.)",
        "textVi": "Giả sử bạn có một lớp lưu trữ hai biến thành viên private: a và b. Cặp phương thức nào dưới đây có thể ngăn chặn sự cố tranh chấp truy cập đồng thời (concurrent access / race condition) trong lớp đó? (Chọn đáp án kết hợp đúng)",
        "code": "",
        "options": [
            "B và F (B: dùng synchronized method & F: dùng synchronized(this) block)",
            "A và B (A: không đồng bộ & B: dùng synchronized method)",
            "A và C (A: không đồng bộ & C: synchronized(a) trên biến nguyên thủy)",
            "E và F (E: synchronized(this) ở khai báo hàm sai cú pháp & F: dùng synchronized(this) block)"
        ],
        "optionsVi": [
            "B và F (B: dùng synchronized method & F: dùng synchronized(this) block)",
            "A và B (A: không đồng bộ & B: dùng synchronized method)",
            "A và C (A: không đồng bộ & C: synchronized(a) trên biến nguyên thủy)",
            "E và F (E: synchronized(this) ở khai báo hàm sai cú pháp & F: dùng synchronized(this) block)"
        ],
        "answer": 0,
        "correctLetters": ["B", "F"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Vấn đề tranh chấp đồng thời (Race Condition):
Nếu một luồng đang gọi `set()` để cập nhật `a` và `b`, đồng thời một luồng khác gọi `read()` để lấy `a + b`, luồng đọc có thể đọc được trạng thái không nhất quán (ví dụ `a` mới nhưng `b` cũ). Để đảm bảo tính nguyên tử (atomic), cả 2 phương thức `read` và `set` phải dùng CHUNG MỘT KHÓA (lock monitor) để tại một thời điểm chỉ có 1 luồng được đọc hoặc ghi.

2. Phân tích các cặp phương thức:
• Cặp B:
  `public synchronized int read(int a, int b) { return a+b; }`
  `public synchronized void set(int a, int b) { this.a=a; this.b=b; }`
  -> Khi đánh dấu `synchronized` trên phương thức thực thể (instance method), luồng tự động chiếm lấy khóa monitor của đối tượng hiện tại (`this`). Vì cả `read` và `set` cùng đồng bộ trên `this`, chúng loại trừ lẫn nhau an toàn tuyệt đối. Cặp B ĐÚNG!

• Cặp F:
  `public int read(int a, int b) { synchronized(this) { return a+b; } }`
  `public void set(int a, int b) { synchronized(this) { this.a=a; this.b=b; } }`
  -> Sử dụng khối đồng bộ `synchronized(this)` bên trong thân hàm. Về mặt bản chất và cơ chế hoạt động, nó hoàn toàn tương đương với việc khai báo `synchronized` ở cấp phương thức của cặp B, cùng khóa trên đối tượng `this`. Cặp F ĐÚNG!

3. Vì sao các cặp khác sai:
• Cặp A: Các phương thức không có `synchronized` nên không thể bảo vệ khỏi việc truy cập đồng thời.
• Cặp C: `synchronized(a)` -> `a` là kiểu dữ liệu nguyên thủy `int`. Trong Java, từ khóa `synchronized` CHỈ ĐƯỢC PHÉP khóa trên một đối tượng (Object), tuyệt đối KHÔNG ĐƯỢC khóa trên biến nguyên thủy (primitive type như `int`, `boolean`). Báo lỗi biên dịch ngay lập tức!
• Cặp E: `public synchronized(this) int read(...)` -> Sai cú pháp nghiêm trọng. Từ khóa `synchronized` trên chữ ký hàm không chấp nhận tham số `(this)`.

✅ Vì sao đáp án "B và F" đúng:
Cả phương thức `synchronized` (cặp B) và khối lệnh `synchronized(this)` (cặp F) đều sử dụng cùng một khóa monitor của đối tượng `this` để bảo vệ tài nguyên chia sẻ, đảm bảo an toàn luồng (thread-safe).

❌ Vì sao các đáp án khác sai:
• Phương án chứa A sai vì không hề có cơ chế đồng bộ nào.
• Phương án chứa C sai vì `synchronized(int)` trên biến nguyên thủy là lỗi biên dịch.
• Phương án chứa E sai vì cú pháp `synchronized(this)` ở chữ ký hàm là sai ngữ pháp Java.

⚠️ Mẹo nhớ / Lưu ý:
• Đồng bộ hóa ở phương thức: `public synchronized void foo()` = tương đương = `public void foo() { synchronized(this) { ... } }`.
• Chỉ có thể synchronize trên OBJECT, không bao giờ synchronize trên biến nguyên thủy (primitive)!"""
    },
    {
        "id": "scjp-ch09-009",
        "originalId": 9,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which class or interface defines the wait(), notify(), and notifyAll() methods?",
        "textVi": "Lớp hoặc interface nào định nghĩa các phương thức wait(), notify(), và notifyAll()?",
        "code": "",
        "options": [
            "Object",
            "Thread",
            "Runnable",
            "Class"
        ],
        "optionsVi": [
            "Object",
            "Thread",
            "Runnable",
            "Class"
        ],
        "answer": 0,
        "correctLetters": ["A"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Triết lý thiết kế cơ chế khóa Monitor trong Java:
Nhiều người lầm tưởng rằng vì `wait()` và `notify()` điều khiển trạng thái tạm dừng của luồng, nên chúng phải nằm trong lớp `Thread`. Nhưng trong thiết kế hướng đối tượng của Java:
• Khóa nội tại (Intrinsic Lock / Monitor) được gắn liền với TỪNG ĐỐI TƯỢNG (Object), chứ không gắn liền với bản thân luồng!
• Mọi đối tượng bất kỳ trong Java (từ `String`, mảng, `List` cho tới bất kỳ lớp do người dùng tự viết) đều có một vùng nhớ Monitor riêng và một hàng đợi các luồng đang chờ (Wait Set).
• Khi một luồng gọi `obj.wait()`, nghĩa là luồng đó đang yêu cầu: "Tôi muốn nhả khóa của đối tượng `obj` này ra và đi vào danh sách chờ trên đối tượng `obj` này cho đến khi có ai gọi `obj.notify()`".
• Vì bất kỳ đối tượng nào trong Java cũng có thể đóng vai trò làm khóa, nên các phương thức `wait()`, `notify()`, `notifyAll()` được định nghĩa ở lớp gốc cao nhất: `java.lang.Object`.

Do đó, mọi lớp trong Java đều tự động thừa hưởng các phương thức này từ `Object`.

✅ Vì sao đáp án "Object" đúng:
Lớp `java.lang.Object` là nơi định nghĩa các phương thức `wait()`, `notify()`, và `notifyAll()` vì cơ chế khóa và hàng đợi chờ đợi thuộc về từng đối tượng cụ thể trong bộ nhớ.

❌ Vì sao các đáp án khác sai:
• "Thread": Sai vì `Thread` chỉ quản lý bản thân tiến trình thực thi của luồng, không định nghĩa `wait()` hay `notify()`.
• "Runnable": Sai vì `Runnable` là interface trừu tượng chỉ có đúng một phương thức duy nhất là `void run()`.
• "Class": Sai vì dù `java.lang.Class` đại diện cho metadata của lớp, nó cũng chỉ kế thừa các phương thức này từ `Object`.

⚠️ Mẹo nhớ / Lưu ý:
• Câu hỏi kiểm tra kiến thức nền tảng hay gặp nhất: `wait()`, `notify()`, `notifyAll()` nằm trong `java.lang.Object`, KHÔNG PHẢI trong `java.lang.Thread`!"""
    },
    {
        "id": "scjp-ch09-010",
        "originalId": 10,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which two are true? (Choose two.)",
        "textVi": "Hai phát biểu nào sau đây là ĐÚNG? (Chọn 2 đáp án)",
        "code": "",
        "options": [
            "B và E (B: Nếu một lớp có chứa code synchronized, các luồng khác vẫn có thể truy cập vào phần code không synchronized. & E: Khi một luồng gọi wait(), nó sẽ giải phóng (nhả) các khóa mà nó đang nắm giữ.)",
            "A và B (A: Một phương thức static không thể được synchronized. & B: Nếu một lớp có chứa code synchronized, các luồng khác vẫn có thể truy cập vào phần code không synchronized.)",
            "A và C (A: Một phương thức static không thể được synchronized. & C: Các biến có thể được bảo vệ khỏi sự cố tranh chấp bằng cách đánh dấu chúng với từ khóa synchronized.)",
            "D và E (D: Khi một luồng gọi sleep(), nó sẽ giải phóng các khóa mà nó đang nắm giữ. & E: Khi một luồng gọi wait(), nó sẽ giải phóng các khóa mà nó đang nắm giữ.)"
        ],
        "optionsVi": [
            "B và E (B: Nếu một lớp có chứa code synchronized, các luồng khác vẫn có thể truy cập vào phần code không synchronized. & E: Khi một luồng gọi wait(), nó sẽ giải phóng (nhả) các khóa mà nó đang nắm giữ.)",
            "A và B (A: Một phương thức static không thể được synchronized. & B: Nếu một lớp có chứa code synchronized, các luồng khác vẫn có thể truy cập vào phần code không synchronized.)",
            "A và C (A: Một phương thức static không thể được synchronized. & C: Các biến có thể được bảo vệ khỏi sự cố tranh chấp bằng cách đánh dấu chúng với từ khóa synchronized.)",
            "D và E (D: Khi một luồng gọi sleep(), nó sẽ giải phóng các khóa mà nó đang nắm giữ. & E: Khi một luồng gọi wait(), nó sẽ giải phóng các khóa mà nó đang nắm giữ.)"
        ],
        "answer": 0,
        "correctLetters": ["B", "E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân tích phát biểu B:
Khóa `synchronized` chỉ bảo vệ các phương thức hoặc khối lệnh ĐƯỢC ĐÁNH DẤU `synchronized`.
Khi Luồng 1 đang thực thi trong một phương thức `synchronized` của đối tượng (và đang giữ khóa của đối tượng đó), Luồng 2 vẫn hoàn toàn có quyền truy cập và thực thi các phương thức bình thường KHÔNG CÓ `synchronized` trên cùng đối tượng đó! Trình thông dịch Java không ngăn cản việc vào code unsynchronized. Do đó phát biểu B ĐÚNG.

2. Phân tích phát biểu E:
Phương thức `wait()` được thiết kế để phối hợp giữa các luồng: Khi một luồng gọi `wait()`, nó BẮT BUỘC PHẢI NHẢ KHÓA (releases its locks) của đối tượng mà nó đang chờ. Nhờ đó, các luồng khác mới có cơ hội giành lấy khóa để nhảy vào thực thi các xử lý khác và cuối cùng gọi `notify()` đánh thức luồng đang chờ dậy. Do đó phát biểu E ĐÚNG.

3. Phân tích các phát biểu sai:
• Phát biểu A: \"Phương thức static không thể được synchronized\" -> SAI. Phương thức `static synchronized` hoàn toàn hợp lệ, khi đó nó sẽ khóa trên đối tượng `Class` (ví dụ `MyClass.class`).
• Phát biểu C: \"Có thể bảo vệ biến bằng cách đánh dấu biến là synchronized\" -> SAI. Từ khóa `synchronized` CHỈ DÙNG CHO PHƯƠNG THỨC VÀ KHỐI LỆNH (blocks), tuyệt đối không áp dụng cho biến (muốn bảo vệ biến thì dùng `volatile` hoặc `Atomic` classes).
• Phát biểu D: \"Khi luồng gọi sleep(), nó sẽ giải phóng khóa\" -> SAI NGHIÊM TRỌNG! Đây là bẫy thi phổ biến nhất: `sleep()` đi ngủ nhưng VẪN ÔM KHÓA KHÔNG NHẢ (holds its locks), khiến các luồng khác cần khóa đó phải đứng chờ đến khi nó thức dậy và ra khỏi khối synchronized.

✅ Vì sao đáp án "B và E" đúng:
• B phản ánh đúng cơ chế: chỉ code có synchronized mới bị chặn bởi khóa.
• E phản ánh đúng bản chất của `wait()`: luôn nhả khóa để tránh deadlock và chờ thông báo.

❌ Vì sao các đáp án khác sai:
• Phương án chứa A sai vì phương thức static hoàn toàn có thể synchronized.
• Phương án chứa C sai vì `synchronized` không dùng cho biến.
• Phương án chứa D sai vì `Thread.sleep()` KHÔNG BAO GIỜ nhả khóa!

⚠️ Mẹo nhớ / Lưu ý:
• Quy tắc vàng:
  - `wait()` = ĐI NGỦ CÓ NHẢ KHÓA (release lock).
  - `sleep()` = ĐI NGỦ NHƯNG ÔM KHÓA KHÔNG NHẢ (holds lock)!"""
    },
    {
        "id": "scjp-ch09-011",
        "originalId": 11,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which three are methods of the Object class? (Choose three.)",
        "textVi": "Ba phương thức nào sau đây là phương thức của lớp java.lang.Object? (Chọn phương án kết hợp đúng)",
        "code": "",
        "options": [
            "A và B (A: notify(); & B: notifyAll();)",
            "A và C (A: notify(); & C: isInterrupted();)",
            "C và D (C: isInterrupted(); & D: synchronized();)",
            "B và H (B: notifyAll(); & H: yield();)"
        ],
        "optionsVi": [
            "A và B (A: notify(); & B: notifyAll();)",
            "A và C (A: notify(); & C: isInterrupted();)",
            "C và D (C: isInterrupted(); & D: synchronized();)",
            "B và H (B: notifyAll(); & H: yield();)"
        ],
        "answer": 0,
        "correctLetters": ["A", "B"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Danh sách các phương thức liên quan đến luồng trong Java:
• Thuộc lớp `java.lang.Object`:
  1. `wait()` (gồm các phiên bản nạp chồng có tham số timeout)
  2. `notify()`
  3. `notifyAll()`
• Thuộc lớp `java.lang.Thread`:
  1. `isInterrupted()`: Phương thức thực thể kiểm tra cờ ngắt của luồng.
  2. `interrupt()`: Gửi tín hiệu ngắt tới luồng.
  3. `sleep()`: Phương thức tĩnh tạm dừng luồng.
  4. `yield()`: Phương thức tĩnh nhường CPU.
  5. `join()`: Chờ luồng kết thúc.
• Từ khóa của ngôn ngữ Java:
  - `synchronized`: Là một TỪ KHÓA BẢO LƯU (keyword), không phải là một phương thức! Cú pháp `synchronized()` là một cấu trúc cú pháp của ngôn ngữ.

2. Đánh giá các phương án:
Trong các lựa chọn được ghép đôi ở câu hỏi trắc nghiệm này, phương án chứa `A: notify()` và `B: notifyAll()` (hai phương thức chính thức của `Object`) là đáp án chính xác nhất.

✅ Vì sao đáp án "A và B" đúng:
Cả `notify()` và `notifyAll()` (cùng với `wait()`) đều là các phương thức nguyên bản được định nghĩa trong lớp `java.lang.Object`.

❌ Vì sao các đáp án khác sai:
• "C: isInterrupted()": Sai vì đây là phương thức của lớp `java.lang.Thread`.
• "D: synchronized()": Sai vì `synchronized` là từ khóa cú pháp của Java, không phải phương thức.
• "H: yield()": Sai vì `yield()` là phương thức tĩnh của lớp `java.lang.Thread`.

⚠️ Mẹo nhớ / Lưu ý:
• Chỉ có 3 cái tên thuộc `Object`: `wait`, `notify`, `notifyAll`.
• Tất cả những cái tên còn lại (`sleep`, `yield`, `join`, `interrupt`, `isInterrupted`, `start`, `run`) đều thuộc về `Thread` hoặc `Runnable`."""
    },
    {
        "id": "scjp-ch09-012",
        "originalId": 12,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following, what is the result of trying to compile and run this program?",
        "textVi": "Cho đoạn mã sau, kết quả khi cố gắng biên dịch và chạy chương trình này là gì?",
        "code": "1.  public class WaitTest {\n2.     public static void main(String [] args) {\n3.        System.out.print(\"1 \");\n4.        synchronized(args){\n5.           System.out.print(\"2 \");\n6.           try {\n7.              args.wait();\n8.           }\n9.           catch(InterruptedException e){}\n10.       }\n11.       System.out.print(\"3 \");\n12.    }\n13. }",
        "options": [
            "It fails to compile because the IllegalMonitorStateException of wait() is not dealt with in line 7.",
            "1 2 3",
            "1 3",
            "1 2",
            "At runtime, it throws an IllegalMonitorStateException when trying to wait.",
            "It will fail to compile because it has to be synchronized on the this object."
        ],
        "optionsVi": [
            "Lỗi biên dịch do ngoại lệ IllegalMonitorStateException của wait() không được xử lý ở dòng 7.",
            "1 2 3",
            "1 3",
            "1 2",
            "Ném ngoại lệ IllegalMonitorStateException tại thời điểm chạy khi cố gắng gọi wait().",
            "Lỗi biên dịch vì bắt buộc phải đồng bộ hóa trên đối tượng this."
        ],
        "answer": 3,
        "correctLetters": ["D"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Kiểm tra tính hợp lệ khi biên dịch:
• Dòng 4: `synchronized(args)`: Trong Java, mảng `args` (`String[]`) là một đối tượng (Object) hợp lệ trên Heap, do đó việc dùng `args` làm monitor lock là hoàn toàn đúng cú pháp.
• Dòng 7: `args.wait()` ném ra checked exception `InterruptedException`. Đoạn code đã bọc trong khối `try-catch (InterruptedException e)` ở dòng 6-9. Do đó mã nguồn biên dịch hoàn toàn thành công, không có lỗi compile!

2. Luồng thực thi khi chạy chương trình:
• Dòng 3: In ra `1 `.
• Dòng 4: Luồng `main` bước vào khối `synchronized(args)`. Luồng `main` chiếm giữ thành công khóa monitor của đối tượng `args`.
• Dòng 5: In ra `2 `.
• Dòng 7: Luồng `main` gọi `args.wait()`.
  - Vì luồng `main` ĐANG NẮM GIỮ khóa của `args`, việc gọi `wait()` trên `args` là hoàn toàn hợp pháp -> TUYỆT ĐỐI KHÔNG BỊ ném ngoại lệ `IllegalMonitorStateException`!
  - Phương thức `wait()` làm luồng `main` nhả khóa của `args` ra và rơi vào trạng thái chờ (WAITING) vô thời hạn, chờ có ai đó gọi `args.notify()` hoặc `args.notifyAll()`.
• Tuy nhiên, trong toàn bộ chương trình này chỉ có duy nhất một luồng `main`, không hề có luồng thứ hai nào khác tồn tại để gọi `notify()`!
• Hậu quả: Luồng `main` sẽ bị treo và chờ mãi mãi ở dòng 7. Dòng 11 (`System.out.print(\"3 \")`) sẽ KHÔNG BAO GIỜ được chạm tới!

Chương trình in ra `1 2 ` và đứng yên mãi mãi (hangs/freezes).

✅ Vì sao đáp án "1 2" đúng:
Số 1 và 2 được in ra bình thường, sau đó luồng `main` rơi vào trạng thái `wait()` mãi mãi do không có luồng nào đánh thức, khiến số 3 không bao giờ được in ra.

❌ Vì sao các đáp án khác sai:
• "It fails to compile...": Sai vì `IllegalMonitorStateException` là một Unchecked Exception (kế thừa từ `RuntimeException`), không bắt buộc phải try-catch.
• "1 2 3": Sai vì lệnh in số 3 không bao giờ được thực thi.
• "1 3": Sai vì số 2 chắc chắn đã được in trước khi lệnh `wait()` chạy.
• "At runtime, it throws an IllegalMonitorStateException...": Sai vì luồng đang nằm bên trong khối `synchronized(args)`, nó đã sở hữu khóa của `args` nên không thể ném ngoại lệ này.
• "...fail to compile because it has to be synchronized on the this object": Sai vì bất kỳ đối tượng nào cũng có thể làm khóa đồng bộ hóa, hơn nữa trong phương thức `static` thì không hề có từ khóa `this`.

⚠️ Mẹo nhớ / Lưu ý:
• Gọi `wait()` trong `synchronized(lock)` mà không có luồng nào khác gọi `notify()` thì chương trình sẽ bị treo vĩnh viễn (wait forever).
• `IllegalMonitorStateException` là unchecked exception, chỉ xảy ra khi gọi `wait()` mà KHÔNG nắm giữ lock của đối tượng đó."""
    },
    {
        "id": "scjp-ch09-013",
        "originalId": 13,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Assume the following method is properly synchronized and called from a thread A on an object B:\nwait(2000);\nAfter calling this method, when will the thread A become a candidate to get another turn at the CPU?",
        "textVi": "Giả sử phương thức sau đã được đồng bộ hóa đúng cách và được gọi từ luồng A trên đối tượng B:\nwait(2000);\nSau khi gọi phương thức này, khi nào thì luồng A sẽ trở thành ứng viên sẵn sàng được cấp phát CPU để chạy tiếp?",
        "code": "wait(2000);",
        "options": [
            "After thread A is notified, or after two seconds.",
            "After the lock on B is released, or after two seconds.",
            "Two seconds after thread A is notified.",
            "Two seconds after lock B is released."
        ],
        "optionsVi": [
            "Sau khi luồng A được thông báo (notified), HOẶC sau khi hết thời gian 2 giây.",
            "Sau khi khóa trên B được giải phóng, HOẶC sau khi hết 2 giây.",
            "Hai giây sau khi luồng A được thông báo.",
            "Hai giây sau khi khóa trên B được giải phóng."
        ],
        "answer": 0,
        "correctLetters": ["A"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Cơ chế hoạt động của wait(long timeout):
Phương thức `wait(long timeout)` là phiên bản nạp chồng có thiết lập thời gian chờ tối đa (timeout) tính bằng mili-giây (ở đây `2000` ms = 2 giây):
• Khi luồng A gọi `B.wait(2000)`, luồng A sẽ nhả khóa của đối tượng B và rơi vào trạng thái `TIMED_WAITING`.
• Luồng A sẽ thức dậy và chuyển sang trạng thái sẵn sàng chạy (`RUNNABLE` - ứng viên tranh CPU) khi một trong hai điều kiện sau xảy ra ĐẦU TIÊN:
  1. Điều kiện 1: Có một luồng khác gọi `B.notify()` hoặc `B.notifyAll()` trên cùng đối tượng B TRƯỚC KHI hết 2 giây.
  2. Điều kiện 2: Thời hạn 2 giây (2000 ms) đã trôi qua mà không có luồng nào gọi `notify()`.

2. Phân tích các đáp án sai:
• "After the lock on B is released...": Việc một luồng khác nhả khóa của B không hề làm luồng A thức dậy. Luồng A chỉ thức dậy khi có tín hiệu `notify()` hoặc hết thời gian timeout.
• "Two seconds after thread A is notified": Sai hoàn toàn. Ngay khi được `notify()`, luồng A lập tức được đánh thức để tranh chấp lại khóa, không phải chờ thêm 2 giây nữa.
• "Two seconds after lock B is released": Sai vì không có cơ chế hẹn giờ nào dựa trên việc nhả khóa.

✅ Vì sao đáp án "After thread A is notified, or after two seconds." đúng:
Phương thức `wait(2000)` kết thúc thời gian chờ và đưa luồng quay trở lại hàng đợi sẵn sàng khi được thông báo (`notify`) HOẶC khi hết khoảng thời gian timeout 2 giây.

❌ Vì sao các đáp án khác sai:
• Các đáp án đề cập đến việc \"khóa được nhả\" (lock released) đều sai vì nhả khóa không đánh thức luồng trong wait set nếu không có thông báo `notify`.
• Các đáp án cộng dồn \"2 giây sau khi...\" sai logic hẹn giờ của Java.

⚠️ Mẹo nhớ / Lưu ý:
• `wait(timeout)` = Thức dậy khi có ai gọi `notify()` HOẶC khi chuông báo thức hết giờ (`timeout`), cái nào đến trước thì xử lý trước!"""
    },
    {
        "id": "scjp-ch09-014",
        "originalId": 14,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which two are true? (Choose two.)",
        "textVi": "Hai phát biểu nào sau đây là ĐÚNG? (Chọn 2 đáp án)",
        "code": "",
        "options": [
            "A và D (A: Phương thức notifyAll() bắt buộc phải được gọi từ một ngữ cảnh synchronized. & D: Khi một luồng đang chờ do gọi wait(), nó sẽ giải phóng các khóa của nó.)",
            "A và B (A: Phương thức notifyAll() bắt buộc phải được gọi từ một ngữ cảnh synchronized. & B: Để gọi wait(), đối tượng phải sở hữu khóa trên luồng.)",
            "B và C (B: Để gọi wait(), đối tượng phải sở hữu khóa trên luồng. & C: Phương thức notify() được định nghĩa trong lớp java.lang.Thread.)",
            "D và F (D: Khi một luồng đang chờ do gọi wait(), nó sẽ giải phóng các khóa của nó. & F: Điểm khác biệt giữa notify() và notifyAll() là notifyAll() thông báo cho tất cả các luồng đang chờ, bất kể chúng đang chờ trên đối tượng nào.)"
        ],
        "optionsVi": [
            "A và D (A: Phương thức notifyAll() bắt buộc phải được gọi từ một ngữ cảnh synchronized. & D: Khi một luồng đang chờ do gọi wait(), nó sẽ giải phóng các khóa của nó.)",
            "A và B (A: Phương thức notifyAll() bắt buộc phải được gọi từ một ngữ cảnh synchronized. & B: Để gọi wait(), đối tượng phải sở hữu khóa trên luồng.)",
            "B và C (B: Để gọi wait(), đối tượng phải sở hữu khóa trên luồng. & C: Phương thức notify() được định nghĩa trong lớp java.lang.Thread.)",
            "D và F (D: Khi một luồng đang chờ do gọi wait(), nó sẽ giải phóng các khóa của nó. & F: Điểm khác biệt giữa notify() và notifyAll() là notifyAll() thông báo cho tất cả các luồng đang chờ, bất kể chúng đang chờ trên đối tượng nào.)"
        ],
        "answer": 0,
        "correctLetters": ["A", "D"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân tích phát biểu A:
Bộ ba phương thức `wait()`, `notify()`, `notifyAll()` chỉ có ý nghĩa khi làm việc với khóa Monitor.
Trong Java quy định: Cả 3 phương thức này BẮT BUỘC PHẢI ĐƯỢC GỌI BÊN TRONG MỘT NGỮ CẢNH ĐỒNG BỘ (`synchronized context` - phương thức `synchronized` hoặc khối `synchronized(obj)`). Nếu một luồng gọi các hàm này mà không sở hữu khóa monitor của đối tượng, JVM sẽ ném ngay ngoại lệ `IllegalMonitorStateException`. Do đó phát biểu A ĐÚNG.

2. Phân tích phát biểu D:
Khi một luồng gọi `wait()`, nó sẽ nhả khóa của đối tượng mà nó đang sở hữu. Điều này cho phép các luồng khác có thể giành lấy khóa đó để bước vào khối `synchronized` và thực hiện công việc, sau đó gọi `notify()` hoặc `notifyAll()` để đánh thức luồng chờ. Do đó phát biểu D ĐÚNG.

3. Phân tích các phát biểu sai:
• Phát biểu B: \"Đối tượng phải sở hữu khóa trên luồng\": SAI về mặt chủ ngữ - vị ngữ. Đúng ra phải là \"Luồng phải sở hữu khóa trên đối tượng\" (The thread must own the lock on the object). Luồng là thực thể sở hữu khóa, không phải đối tượng sở hữu luồng.
• Phát biểu C: \"notify() định nghĩa trong lớp Thread\": SAI vì `notify()` nằm trong lớp `java.lang.Object`.
• Phát biểu F: \"notifyAll() đánh thức tất cả các luồng bất kể chúng đang chờ trên đối tượng nào\": SAI HOÀN TOÀN. `obj.notifyAll()` CHỈ ĐÁNH THỨC những luồng đang chờ TRÊN CHÍNH ĐỐI TƯỢNG `obj` ĐÓ, nó không ảnh hưởng gì đến các luồng đang chờ trên các đối tượng khóa khác.

✅ Vì sao đáp án "A và D" đúng:
• A đúng vì `notifyAll()` bắt buộc phải chạy trong ngữ cảnh synchronized.
• D đúng vì `wait()` luôn giải phóng khóa monitor.

❌ Vì sao các đáp án khác sai:
• B sai vì đảo ngược quan hệ sở hữu khóa.
• C sai vì `notify()` nằm trong `Object`.
• F sai vì `notifyAll()` chỉ đánh thức các luồng trên cùng 1 monitor cụ thể.

⚠️ Mẹo nhớ / Lưu ý:
• Không sở hữu khóa mà gọi `wait()`/`notify()`/`notifyAll()` = `IllegalMonitorStateException` ngay lập tức!
• `notifyAll()` chỉ gọi những người đang đứng chờ ở đúng cửa của nó, không gọi người ở cửa khác."""
    },
    {
        "id": "scjp-ch09-015",
        "originalId": 15,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Assume you create a program and one of your threads (called backgroundThread) does some lengthy numerical processing. What would be the proper way of setting its priority to try to get the rest of the system to be very responsive while the thread is running? (Choose all that apply.)",
        "textVi": "Giả sử bạn tạo một chương trình và một trong các luồng (tên là backgroundThread) phải thực hiện tính toán số học rất nặng và tốn thời gian. Cách nào dưới đây là chuẩn xác để thiết lập độ ưu tiên của nó nhằm giúp toàn bộ phần còn lại của hệ thống phản hồi nhanh và mượt mà trong khi luồng này đang chạy? (Chọn phương án kết hợp đúng)",
        "code": "",
        "options": [
            "C và E (C: backgroundThread.setPriority(1); & E: backgroundThread.setPriority(Thread.MIN_PRIORITY);)",
            "A và C (A: backgroundThread.setPriority(Thread.LOW_PRIORITY); & C: backgroundThread.setPriority(1);)",
            "A và B (A: backgroundThread.setPriority(Thread.LOW_PRIORITY); & B: backgroundThread.setPriority(Thread.MAX_PRIORITY);)",
            "E và G (E: backgroundThread.setPriority(Thread.MIN_PRIORITY); & G: backgroundThread.setPriority(10);)"
        ],
        "optionsVi": [
            "C và E (C: backgroundThread.setPriority(1); & E: backgroundThread.setPriority(Thread.MIN_PRIORITY);)",
            "A và C (A: backgroundThread.setPriority(Thread.LOW_PRIORITY); & C: backgroundThread.setPriority(1);)",
            "A và B (A: backgroundThread.setPriority(Thread.LOW_PRIORITY); & B: backgroundThread.setPriority(Thread.MAX_PRIORITY);)",
            "E và G (E: backgroundThread.setPriority(Thread.MIN_PRIORITY); & G: backgroundThread.setPriority(10);)"
        ],
        "answer": 0,
        "correctLetters": ["C", "E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Thang đo độ ưu tiên của Thread trong Java:
• Java quy định độ ưu tiên của Thread bằng một số nguyên nằm trong thang từ 1 đến 10:
  - Giá trị nhỏ nhất là `1`: Mức ưu tiên thấp nhất.
  - Giá trị mặc định là `5`: Mức ưu tiên bình thường.
  - Giá trị lớn nhất là `10`: Mức ưu tiên cao nhất.
• Lớp `Thread` định nghĩa sẵn 3 hằng số chuẩn:
  - `Thread.MIN_PRIORITY = 1`
  - `Thread.NORM_PRIORITY = 5`
  - `Thread.MAX_PRIORITY = 10`

2. Phân tích yêu cầu bài toán:
Luồng `backgroundThread` chạy tác vụ tính toán nặng kéo dài. Để hệ thống và giao diện người dùng không bị đơ giật (luôn responsive), ta cần hạ độ ưu tiên của luồng này xuống mức THẤP NHẤT để nhường CPU cho các luồng xử lý giao diện và tương tác người dùng:
• Cách 1 (Dùng số nguyên): `backgroundThread.setPriority(1);` (Lệnh C)
• Cách 2 (Dùng hằng số chuẩn): `backgroundThread.setPriority(Thread.MIN_PRIORITY);` (Lệnh E)

3. Phân tích các lệnh sai:
• Lệnh A: `Thread.LOW_PRIORITY` -> KHÔNG TỒN TẠI hằng số này trong lớp `Thread` (chỉ có `MIN_PRIORITY`).
• Lệnh B: `Thread.MAX_PRIORITY` -> Thiết lập ưu tiên cao nhất (10) sẽ khiến luồng này chiếm trọn CPU, làm treo luôn hệ thống.
• Lệnh G: `setPriority(10)` -> Tương đương `MAX_PRIORITY`, hoàn toàn trái ngược với yêu cầu.

Do đó, hai lệnh chuẩn xác là C và E.

✅ Vì sao đáp án "C và E" đúng:
Cả `1` và `Thread.MIN_PRIORITY` đều đại diện cho mức ưu tiên thấp nhất của một Thread trong Java, giúp luồng nền không chiếm dụng CPU của các tiến trình tương tác quan trọng khác.

❌ Vì sao các đáp án khác sai:
• Các phương án chứa A sai vì trong Java không có hằng số `LOW_PRIORITY`.
• Các phương án chứa B hoặc G sai vì mức ưu tiên tối đa (10 / `MAX_PRIORITY`) sẽ bóp nghẹt hệ thống thay vì làm hệ thống phản hồi nhanh.

⚠️ Mẹo nhớ / Lưu ý:
• Chỉ có 3 hằng số ưu tiên trong Java: `MIN_PRIORITY` (1), `NORM_PRIORITY` (5), `MAX_PRIORITY` (10). Không có `LOW_PRIORITY` hay `HIGH_PRIORITY`!"""
    },
    {
        "id": "scjp-ch09-016",
        "originalId": 16,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which three guarantee that a thread will leave the running state? (Choose three.)",
        "textVi": "Ba hành động nào dưới đây ĐẢM BẢO CHẮC CHẮN rằng một luồng sẽ rời khỏi trạng thái đang chạy (running state)? (Chọn phương án kết hợp đúng)",
        "code": "",
        "options": [
            "B và E (B: wait() & E: sleep(1000))",
            "A và B (A: yield() & B: wait())",
            "A và C (A: yield() & C: notify())",
            "E và G (E: sleep(1000) & G: Thread.killThread())"
        ],
        "optionsVi": [
            "B và E (B: wait() & E: sleep(1000))",
            "A và B (A: yield() & B: wait())",
            "A và C (A: yield() & C: notify())",
            "E và G (E: sleep(1000) & G: Thread.killThread())"
        ],
        "answer": 0,
        "correctLetters": ["B", "E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Các trạng thái khiến luồng RỜI KHỎI trạng thái Running (Đang chạy):
Để đảm bảo chắc chắn (guarantee) luồng không còn ở trạng thái `Running`:
• `wait()` (Hành động B): Chắc chắn 100% đẩy luồng ra khỏi trạng thái `Running` để đi vào hàng đợi `Waiting` của đối tượng.
• `sleep(long millis)` (Hành động E): Chắc chắn 100% đẩy luồng ra khỏi trạng thái `Running` để đi vào trạng thái `Timed Waiting` trong ít nhất khoảng thời gian chỉ định.
• `join()`: Chắc chắn 100% bắt luồng hiện tại dừng chạy và đợi cho tới khi luồng mục tiêu kết thúc.

2. Vì sao `yield()` KHÔNG ĐẢM BẢO (Bẫy đề thi số 1):
• `Thread.yield()` (Hành động A): Chỉ là một lời "nhắn nhủ / gợi ý" (hint) gửi tới bộ lập lịch CPU (thread scheduler) rằng: "Tôi sẵn sàng nhường lượt chạy cho luồng khác có cùng mức ưu tiên".
• TUY NHIÊN, bộ lập lịch có toàn quyền quyết định! Nếu không có luồng nào khác sẵn sàng hoặc bộ lập lịch quyết định tiếp tục, luồng vừa gọi `yield()` có thể NGAY LẬP TỨC ĐƯỢC CHỌN ĐỂ CHẠY TIẾP mà không hề rời khỏi trạng thái `Running` một mili-giây nào!
• Do đó, `yield()` KHÔNG BAO GIỜ có sự đảm bảo (no guarantee).

3. Phân tích các hành động sai khác:
• `notify()` (Hành động C): Chỉ gửi tín hiệu đánh thức một luồng khác, bản thân luồng đang gọi `notify()` vẫn tiếp tục chạy bình thường, không hề bị dừng lại.
• `Thread.killThread()` (Hành động G): Phương thức này hoàn toàn KHÔNG TỒN TẠI trong Java.

Do đó, các hành động đảm bảo luồng rời khỏi Running là B (`wait()`) và E (`sleep()`).

✅ Vì sao đáp án "B và E" đúng:
Cả `wait()` và `sleep(1000)` đều đảm bảo 100% ngắt quãng trạng thái `Running` của luồng hiện tại và đưa nó sang trạng thái chờ.

❌ Vì sao các đáp án khác sai:
• Phương án chứa A sai vì `yield()` không có bất kỳ sự bảo đảm nào về việc luồng sẽ rời khỏi trạng thái running.
• Phương án chứa C sai vì `notify()` không làm luồng gọi nó rời khỏi running.
• Phương án chứa G sai vì `killThread()` là hàm bịa đặt không có thật.

⚠️ Mẹo nhớ / Lưu ý:
• Nhớ từ khóa vàng: `yield()` = "Không có gì đảm bảo" (NO GUARANTEE).
• `sleep()`, `wait()`, `join()` = "Chắc chắn rời khỏi Running" (GUARANTEED)."""
    },
    {
        "id": "scjp-ch09-017",
        "originalId": 17,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which two are true? (Choose two.)",
        "textVi": "Hai phát biểu nào sau đây là ĐÚNG? (Chọn 2 đáp án)",
        "code": "",
        "options": [
            "D và F (D: Phương thức wait() có các phiên bản nạp chồng chấp nhận tham số thời gian chờ. & F: Cả wait() và notify() đều bắt buộc phải được gọi từ trong một ngữ cảnh synchronized.)",
            "A và D (A: Deadlock sẽ không bao giờ xảy ra nếu sử dụng wait()/notify(). & D: Phương thức wait() có các phiên bản nạp chồng chấp nhận tham số thời gian chờ.)",
            "A và B (A: Deadlock sẽ không bao giờ xảy ra nếu sử dụng wait()/notify(). & B: Một luồng sẽ lập tức tiếp tục thực thi ngay khi khoảng thời gian sleep kết thúc.)",
            "F và H (F: Cả wait() và notify() đều bắt buộc phải được gọi từ trong một ngữ cảnh synchronized. & H: sleep() có thể ném ra một runtime exception.)"
        ],
        "optionsVi": [
            "D và F (D: Phương thức wait() có các phiên bản nạp chồng chấp nhận tham số thời gian chờ. & F: Cả wait() và notify() đều bắt buộc phải được gọi từ trong một ngữ cảnh synchronized.)",
            "A và D (A: Deadlock sẽ không bao giờ xảy ra nếu sử dụng wait()/notify(). & D: Phương thức wait() có các phiên bản nạp chồng chấp nhận tham số thời gian chờ.)",
            "A và B (A: Deadlock sẽ không bao giờ xảy ra nếu sử dụng wait()/notify(). & B: Một luồng sẽ lập tức tiếp tục thực thi ngay khi khoảng thời gian sleep kết thúc.)",
            "F và H (F: Cả wait() và notify() đều bắt buộc phải được gọi từ trong một ngữ cảnh synchronized. & H: sleep() có thể ném ra một runtime exception.)"
        ],
        "answer": 0,
        "correctLetters": ["D", "F"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Phân tích phát biểu D:
Trong lớp `java.lang.Object`, phương thức `wait()` được nạp chồng (overloaded) thành 3 phiên bản:
• `wait()`: Chờ vô thời hạn cho đến khi có `notify()`.
• `wait(long timeout)`: Chờ tối đa số mili-giây quy định.
• `wait(long timeout, int nanos)`: Chờ tối đa số mili-giây và nano-giây quy định.
Do đó phát biểu D ĐÚNG.

2. Phân tích phát biểu F:
Cả `wait()` và `notify()` đều thao tác trên khóa Monitor của đối tượng, do đó chúng BẮT BUỘC PHẢI ĐƯỢC GỌI TỪ MỘT NGỮ CẢNH ĐỒNG BỘ (`synchronized context`). Luồng gọi chúng phải là chủ sở hữu hiện tại của khóa monitor, nếu không sẽ bị ném ngoại lệ `IllegalMonitorStateException`. Do đó phát biểu F ĐÚNG.

3. Phân tích các phát biểu sai:
• Phát biểu A: \"Deadlock sẽ không xảy ra nếu dùng wait/notify\" -> SAI. Deadlock (khóa chết) hoàn toàn có thể xảy ra nếu các luồng chờ đợi lẫn nhau mà không phát tín hiệu notify đúng cách, hoặc chờ các khóa lồng nhau theo thứ tự vòng tròn.
• Phát biểu B: \"Luồng sẽ tiếp tục chạy ngay khi hết giờ sleep\" -> SAI. Khi hết giờ ngủ, luồng chỉ chuyển từ trạng thái `Timed Waiting` về trạng thái `Runnable` (sẵn sàng). Nó phải chờ bộ lập lịch của hệ điều hành cấp phát CPU thì mới thực sự chạy tiếp (`Running`).
• Phát biểu H: \"sleep() có thể ném ra runtime exception\" -> SAI vì ngoại lệ chính của `sleep()` là `InterruptedException`, đây là một Checked Exception (kế thừa từ `Exception`), không phải Runtime Exception.

✅ Vì sao đáp án "D và F" đúng:
• D đúng vì `wait()` có các phiên bản nhận timeout.
• F đúng vì cả hai phương thức bắt buộc phải nằm trong khối/phương thức `synchronized`.

❌ Vì sao các đáp án khác sai:
• Phương án chứa A sai vì `wait()`/`notify()` không giải quyết được vấn đề Deadlock nếu thiết kế sai.
• Phương án chứa B sai vì luồng sau khi ngủ chỉ về trạng thái Runnable, không chắc chắn chạy ngay.
• Phương án chứa H sai vì `InterruptedException` là checked exception.

⚠️ Mẹo nhớ / Lưu ý:
• Hết giờ sleep thì luồng đi vào phòng chờ `Runnable`, không phải nhảy thẳng lên sân khấu `Running` ngay!
• `wait()` có timeout; nhưng `notify()` thì KHÔNG BAO GIỜ có tham số timeout!"""
    },
    {
        "id": "scjp-ch09-018",
        "originalId": 18,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Which two are valid constructors for Thread? (Choose two.)",
        "textVi": "Hai hàm khởi tạo (constructor) nào dưới đây là hợp lệ của lớp java.lang.Thread? (Chọn phương án kết hợp đúng)",
        "code": "",
        "options": [
            "A và B (A: Thread(Runnable r, String name) & B: Thread())",
            "A và C (A: Thread(Runnable r, String name) & C: Thread(int priority))",
            "C và D (C: Thread(int priority) & D: Thread(Runnable r, ThreadGroup g))",
            "B và E (B: Thread() & E: Thread(Runnable r, int priority))"
        ],
        "optionsVi": [
            "A và B (A: Thread(Runnable r, String name) & B: Thread())",
            "A và C (A: Thread(Runnable r, String name) & C: Thread(int priority))",
            "C và D (C: Thread(int priority) & D: Thread(Runnable r, ThreadGroup g))",
            "B và E (B: Thread() & E: Thread(Runnable r, int priority))"
        ],
        "answer": 0,
        "correctLetters": ["A", "B"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Danh sách các Constructor phổ biến của java.lang.Thread:
Lớp `Thread` cung cấp 8 hàm khởi tạo chính thức trong thư viện chuẩn:
• `Thread()`: Khởi tạo luồng mặc định không đối số. (Phương án B)
• `Thread(Runnable target)`: Khởi tạo luồng với một mục tiêu Runnable.
• `Thread(String name)`: Khởi tạo luồng với tên đặt trước.
• `Thread(Runnable target, String name)`: Khởi tạo luồng với mục tiêu Runnable và tên định danh. (Phương án A)
• `Thread(ThreadGroup group, Runnable target)`: Chú ý: `ThreadGroup` đứng trước, `Runnable` đứng sau!
• `Thread(ThreadGroup group, String name)`
• `Thread(ThreadGroup group, Runnable target, String name)`
• `Thread(ThreadGroup group, Runnable target, String name, long stackSize)`

2. Phân tích các constructor giả mạo:
• `Thread(int priority)` (Phương án C): KHÔNG TỒN TẠI. Muốn đặt độ ưu tiên cho luồng, bạn phải gọi phương thức `.setPriority(int)`, không thể truyền vào constructor.
• `Thread(Runnable r, ThreadGroup g)` (Phương án D): SAI THỨ TỰ THAM SỐ. Thứ tự đúng trong Java API phải là `Thread(ThreadGroup group, Runnable target)`.
• `Thread(Runnable r, int priority)` (Phương án E): KHÔNG TỒN TẠI.

Do đó, hai constructor hợp lệ là A và B.

✅ Vì sao đáp án "A và B" đúng:
`Thread()` và `Thread(Runnable, String)` là hai constructor chính thống được định nghĩa trong tài liệu chính thức của Java API.

❌ Vì sao các đáp án khác sai:
• Constructor nhận `priority` (C và E) không tồn tại trong Java.
• Constructor D bị đảo ngược thứ tự tham số (Java định nghĩa `(ThreadGroup, Runnable)`, không phải `(Runnable, ThreadGroup)`).

⚠️ Mẹo nhớ / Lưu ý:
• Không có constructor nào của Thread cho phép set `priority`.
• Nếu có `ThreadGroup`, nó LUÔN LUÔN đứng ở vị trí tham số ĐẦU TIÊN!"""
    },
    {
        "id": "scjp-ch09-019",
        "originalId": 19,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following:\nclass MyThread extends Thread {\n  MyThread() { System.out.print(\" MyThread\"); }\n  public void run() { System.out.print(\" bar\"); }\n  public void run(String s) { System.out.println(\" baz\"); }\n}\npublic class TestThreads {\n  public static void main (String [] args) {\n    Thread t = new MyThread() {\n      public void run() {\n        System.out.println(\" foo\");\n      }\n    };\n    t.start();\n  }\n}\nwhat is the result?",
        "textVi": "Cho đoạn mã sau:\nclass MyThread extends Thread {\n  MyThread() { System.out.print(\" MyThread\"); }\n  public void run() { System.out.print(\" bar\"); }\n  public void run(String s) { System.out.println(\" baz\"); }\n}\npublic class TestThreads {\n  public static void main (String [] args) {\n    Thread t = new MyThread() {\n      public void run() {\n        System.out.println(\" foo\");\n      }\n    };\n    t.start();\n  }\n}\nKết quả khi chạy đoạn mã trên là gì?",
        "code": "class MyThread extends Thread {\n  MyThread() { System.out.print(\" MyThread\"); }\n  public void run() { System.out.print(\" bar\"); }\n  public void run(String s) { System.out.println(\" baz\"); }\n}\npublic class TestThreads {\n  public static void main (String [] args) {\n    Thread t = new MyThread() {\n      public void run() {\n        System.out.println(\" foo\");\n      }\n    };\n    t.start();\n  }\n}",
        "options": [
            "foo",
            "MyThread foo",
            "MyThread bar",
            "foo bar",
            "foo bar baz",
            "bar foo",
            "Compilation fails."
        ],
        "optionsVi": [
            "foo",
            "MyThread foo",
            "MyThread bar",
            "foo bar",
            "foo bar baz",
            "bar foo",
            "Lỗi biên dịch (Compilation fails)."
        ],
        "answer": 1,
        "correctLetters": ["B"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
Hãy theo dõi tuần tự luồng thực thi của chương trình:
1. Bước 1: Khởi tạo đối tượng (Constructor Call):
• Trong hàm `main`:
  `Thread t = new MyThread() { public void run() { System.out.println(\" foo\"); } };`
• Biểu thức này tạo ra một đối tượng của lớp con ẩn danh (anonymous subclass) kế thừa từ `MyThread`.
• Khi khởi tạo một lớp con, constructor của lớp cha `MyThread()` sẽ được gọi thực thi đầu tiên.
• Constructor `MyThread()` thực hiện lệnh:
  `System.out.print(\" MyThread\");`
  -> Màn hình in ra chuỗi đầu tiên: ` MyThread`.

2. Bước 2: Bắt đầu chạy luồng (Thread Execution):
• Câu lệnh tiếp theo: `t.start();`
• Luồng mới được khởi chạy và gọi tới phương thức `public void run()`.
• Nhờ tính đa hình (Polymorphism):
  - Lớp con ẩn danh ĐÃ GHI ĐÈ phương thức `public void run()` thành: `System.out.println(\" foo\");`.
  - Phương thức `run()` trong lớp cha `MyThread` (in ra \" bar\") đã bị lớp con ghi đè, do đó nó KHÔNG ĐƯỢC CHẠY.
  - Phương thức `run(String s)` (in ra \" baz\") là một hàm nạp chồng (overload) có tham số, Thread không bao giờ tự động gọi hàm này.
  - Kết quả là phương thức `run()` của lớp con ẩn danh chạy -> Màn hình in tiếp: ` foo`.

3. Kết quả tổng hợp:
Chuỗi in ra lần lượt là: ` MyThread foo`.

✅ Vì sao đáp án "MyThread foo" đúng:
Constructor của `MyThread` in ra \" MyThread\" trong quá trình khởi tạo đối tượng, sau đó khi luồng khởi động bằng `start()`, phương thức `run()` bị ghi đè bởi anonymous class sẽ thực thi và in ra \" foo\".

❌ Vì sao các đáp án khác sai:
• "foo": Sai vì bỏ quên việc constructor của lớp cha `MyThread()` luôn tự động chạy khi khởi tạo đối tượng.
• "MyThread bar": Sai vì ngộ nhận phương thức `run()` của lớp cha được gọi, trong khi thực tế nó đã bị lớp con ghi đè.
• "foo bar baz": Sai vì phương thức nạp chồng `run(String s)` không bao giờ được gọi bởi Thread runtime.
• "Compilation fails.": Sai vì cú pháp tạo anonymous subclass kế thừa `MyThread` hoàn toàn hợp lệ.

⚠️ Mẹo nhớ / Lưu ý:
• Anonymous class kế thừa class cha thì constructor cha VẪN CHẠY BÌNH THƯỜNG!
• Tính đa hình Runtime luôn ưu tiên phương thức ghi đè của lớp con (lớp ẩn danh)."""
    },
    {
        "id": "scjp-ch09-020",
        "originalId": 20,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following:\npublic class SyncTest {\n  public static void main (String [] args) {\n    Thread t = new Thread() {\n      Foo f = new Foo();\n      public void run() {\n        f.increase(20);\n      }\n    };\n    t.start();\n  }\n}\nclass Foo {\n  private int data = 23;\n  public void increase(int amt) {\n    int x = data;\n    data = x + amt;\n  }\n}\nand assuming that data must be protected from corruption, what—if anything—can you add to the preceding code to ensure the integrity of data?",
        "textVi": "Cho đoạn mã sau:\npublic class SyncTest {\n  public static void main (String [] args) {\n    Thread t = new Thread() {\n      Foo f = new Foo();\n      public void run() {\n        f.increase(20);\n      }\n    };\n    t.start();\n  }\n}\nclass Foo {\n  private int data = 23;\n  public void increase(int amt) {\n    int x = data;\n    data = x + amt;\n  }\n}\nGiả sử biến data bắt buộc phải được bảo vệ khỏi sự sai lệch dữ liệu, bạn có thể thêm điều gì vào đoạn mã trên để đảm bảo tính toàn vẹn của data?",
        "code": "public class SyncTest {\n  public static void main (String [] args) {\n    Thread t = new Thread() {\n      Foo f = new Foo();\n      public void run() {\n        f.increase(20);\n      }\n    };\n    t.start();\n  }\n}\nclass Foo {\n  private int data = 23;\n  public void increase(int amt) {\n    int x = data;\n    data = x + amt;\n  }\n}",
        "options": [
            "Synchronize the run method.",
            "Wrap a synchronize(this) around the call to f.increase().",
            "The existing code will not compile.",
            "The existing code will cause a runtime exception.",
            "Put in a wait() call prior to invoking the increase() method.",
            "Synchronize the increase() method"
        ],
        "optionsVi": [
            "Đồng bộ hóa phương thức run() (Synchronize the run method).",
            "Bọc một khối synchronize(this) xung quanh lời gọi f.increase().",
            "Mã hiện tại không thể biên dịch.",
            "Mã hiện tại sẽ gây ra ngoại lệ thời điểm chạy.",
            "Đặt một lời gọi wait() trước khi gọi phương thức increase().",
            "Đồng bộ hóa phương thức increase() (Synchronize the increase() method)."
        ],
        "answer": 5,
        "correctLetters": ["F"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Nhận diện tài nguyên xung đột (Critical Section):
• Trong lớp `Foo`, biến `data` là dữ liệu trạng thái nhạy cảm.
• Phương thức `increase(int amt)` thực hiện thao tác Đọc - Sửa - Ghi (Read-Modify-Write):
  `int x = data;` -> Đọc giá trị
  `data = x + amt;` -> Ghi giá trị mới
• Nếu có nhiều luồng cùng gọi `f.increase(...)` đồng thời trên cùng một đối tượng `Foo`, hai luồng có thể đọc cùng một giá trị ban đầu của `data` và ghi đè lên nhau, dẫn đến mất mát cập nhật (Race Condition / Data Corruption).

2. Cách bảo vệ đúng đắn (Encapsulation & Thread-Safety):
• Để bảo vệ biến `data` một cách triệt để, nguyên tắc đóng gói hướng đối tượng chỉ ra rằng: BẢN THÂN PHƯƠNG THỨC THAO TÁC TRÊN DỮ LIỆU PHẢI ĐƯỢC ĐỒNG BỘ HÓA.
• Bằng cách khai báo: `public synchronized void increase(int amt)` trong lớp `Foo`:
  - Mỗi khi một luồng gọi `increase()`, nó bắt buộc phải giành được khóa monitor của đối tượng `Foo` (`this`).
  - Mọi luồng khác cố gắng gọi `increase()` trên cùng đối tượng `Foo` đó sẽ bị chặn lại cho đến khi luồng đầu tiên cập nhật xong.
  - Bất kể luồng nào, từ bất kỳ đâu gọi tới `increase()`, dữ liệu `data` đều được bảo vệ toàn vẹn 100%.

3. Vì sao các phương án khác không bảo vệ được:
• "Synchronize the run method": Đồng bộ hóa hàm `run()` của Thread `t` chỉ khóa trên đối tượng luồng `t`. Nếu có một luồng khác chạy một `Runnable` khác gọi `f.increase()`, nó hoàn toàn không bị ảnh hưởng và vẫn gây xung đột dữ liệu như thường!
• "Wrap synchronize(this) around call to f.increase()": Khối `synchronized(this)` trong `run()` khóa trên đối tượng `Thread`, chứ không khóa trên đối tượng `Foo` (`f`), nên hoàn toàn vô hiệu trong việc bảo vệ `f`.
• "Put in a wait() call...": Gọi `wait()` ngoài khối synchronized sẽ ném ngoại lệ `IllegalMonitorStateException`, và nếu có chạy được thì nó chỉ làm luồng dừng lại không làm gì cả.

✅ Vì sao đáp án "Synchronize the increase() method" đúng:
Đồng bộ hóa trực tiếp phương thức `increase()` của lớp `Foo` đảm bảo mọi luồng muốn truy cập hoặc sửa đổi `data` đều phải xếp hàng tuần tự qua khóa của `Foo`, ngăn chặn hoàn toàn hiện tượng race condition.

❌ Vì sao các đáp án khác sai:
• "Synchronize the run method": Sai vì khóa trên Thread instance không bảo vệ được đối tượng Foo khỏi các luồng khác ngoài luồng t.
• "Wrap synchronize(this)...": Sai vì khóa sai đối tượng (khóa trên Thread thay vì khóa trên Foo).
• "The existing code will not compile / runtime exception": Sai vì code hiện tại biên dịch và chạy bình thường.
• "Put in a wait() call...": Sai vì làm tắc nghẽn luồng và không giải quyết được bài toán đồng bộ dữ liệu.

⚠️ Mẹo nhớ / Lưu ý:
• Nguyên tắc vàng của Thread Safety: "Bảo vệ dữ liệu ở đâu thì đặt synchronized ở chính phương thức thao tác lên dữ liệu đó!"
• Khóa sai đối tượng (lock on wrong object) là lỗi phổ biến nhất khiến việc đồng bộ hóa trở nên vô nghĩa."""
    },
    {
        "id": "scjp-ch09-021",
        "originalId": 21,
        "chapterNum": 9,
        "chapterTitle": "Threads",
        "topic": "thread",
        "text": "Given the following, what is the result?",
        "textVi": "Cho đoạn mã sau, kết quả khi thực thi đoạn mã trên là gì?",
        "code": "1. public class Test {\n2.   public static void main (String [] args) {\n3.     final Foo f = new Foo();\n4.     Thread t = new Thread(new Runnable() {\n5.        public void run() {\n6.           f.doStuff();\n7.        }\n8.     });\n9.     Thread g = new Thread() {\n10.       public void run() {\n11.          f.doStuff();\n12.       }\n13.    };\n14.    t.start();\n15.    g.start();\n16.  }\n17. }\n1. class Foo {\n2.   int x = 5;\n3.   public void doStuff() {\n4.     if (x < 10) {\n5.        // nothing to do\n6.        try {\n7.           wait();\n8.        } catch(InterruptedException ex) { }\n9.     } else {\n10.       System.out.println(\"x is \" + x++);\n11.       if (x >= 10) {\n12.          notify();\n13.       }\n14.    }\n15.  }\n16. }",
        "options": [
            "The code will not compile because of an error on line 12 of class Foo.",
            "The code will not compile because of an error on line 7 of class Foo.",
            "The code will not compile because of an error on line 4 of class Test.",
            "The code will not compile because of some other error in class Test.",
            "An exception occurs at runtime.",
            "x is 5 x is 6"
        ],
        "optionsVi": [
            "Đoạn mã không biên dịch được do lỗi ở dòng 12 của lớp Foo.",
            "Đoạn mã không biên dịch được do lỗi ở dòng 7 của lớp Foo.",
            "Đoạn mã không biên dịch được do lỗi ở dòng 4 của lớp Test.",
            "Đoạn mã không biên dịch được do một lỗi khác trong lớp Test.",
            "Ném ngoại lệ tại thời điểm chạy (Runtime Exception).",
            "x is 5 x is 6"
        ],
        "answer": 4,
        "correctLetters": ["E"],
        "explanation": """💡 Bản chất & Phân tích chi tiết:
1. Kiểm tra tính hợp lệ khi biên dịch:
• Trong lớp `Test`: Biến `f` được khai báo `final`, do đó cả anonymous `Runnable` (dòng 4) và anonymous `Thread` (dòng 9) đều có thể truy cập `f` hợp lệ.
• Trong lớp `Foo`:
  - Dòng 7: `wait();` được bao bọc trong khối `try-catch (InterruptedException ex)` hợp lệ.
  - Dòng 12: `notify();` là phương thức hợp lệ kế thừa từ `java.lang.Object`.
• Toàn bộ mã nguồn hoàn toàn đúng ngữ pháp Java -> Biên dịch thành công 100%, KHÔNG CÓ LỖI BIÊN DỊCH!

2. Luồng thực thi và bẫy Runtime Exception:
• Dòng 14-15: Hai luồng `t` và `g` được khởi chạy, cả hai đều gọi tới phương thức `f.doStuff()`.
• Hãy nhìn kỹ phương thức `doStuff()` ở dòng 3:
  `public void doStuff() {`
  PHƯƠNG THỨC NÀY HOÀN TOÀN KHÔNG CÓ TỪ KHÓA `synchronized`!
• Khi một luồng bước vào `doStuff()`:
  - Biến `x = 5 < 10` là đúng.
  - Luồng nhảy vào dòng 7 và thực hiện lệnh: `wait();`.
  - Nhưng luồng này KHÔNG HỀ NẮM GIỮ khóa monitor của đối tượng `Foo` (`this`)!
• Quy tắc của Java Virtual Machine:
  Khi gọi `wait()`, `notify()`, hoặc `notifyAll()` trên một đối tượng mà luồng hiện tại KHÔNG SỞ HỮU KHÓA MONITOR của đối tượng đó, JVM sẽ ngay lập tức ném ra ngoại lệ unchecked:
  `java.lang.IllegalMonitorStateException` tại thời điểm chạy (runtime)!

Kết quả: Chương trình bị dừng lại do ném ra ngoại lệ `IllegalMonitorStateException` ngay tại dòng 7 của lớp `Foo`.

✅ Vì sao đáp án "An exception occurs at runtime." đúng:
Phương thức `doStuff()` không được khai báo `synchronized`. Do đó, khi gọi `wait()` mà không sở hữu khóa monitor của đối tượng, JVM sẽ lập tức ném ngoại lệ `java.lang.IllegalMonitorStateException`.

❌ Vì sao các đáp án khác sai:
• Các đáp án A, B, C, D về lỗi biên dịch: Sai hoàn toàn vì mã nguồn không hề có bất kỳ lỗi cú pháp nào lúc compile.
• "x is 5 x is 6": Sai vì nhánh `else` chưa bao giờ được chạy; ngoại lệ runtime đã ném ra ngay ở nhánh `if` dòng 7.

⚠️ Mẹo nhớ / Lưu ý:
• Nhớ như in quy tắc số 1 của wait/notify: "Muốn gọi wait() hoặc notify() thì phương thức chứa nó BẮT BUỘC PHẢI LÀ `synchronized`!"
• Nếu không có `synchronized` mà dám gọi `wait()` -> Lãnh ngay `IllegalMonitorStateException` lúc runtime!"""
    }
]

out_dir = r"c:\Users\THANH TRUNG\Desktop\JAVA\quiz-web\scripts\enrichment"
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "ch09_enriched.json")

with open(out_file, "w", encoding="utf-8") as f:
    json.dump(enriched_ch09, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(enriched_ch09)} enriched questions to {out_file}")
