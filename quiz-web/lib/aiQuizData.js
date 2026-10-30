// Bộ 3 đề trắc nghiệm chuyên sâu do AI tạo dựa trên cấu trúc các bộ đề gốc:
// - ai-quiz-1: AI Quiz 1 – OOP & Kế Thừa Mở Rộng
// - ai-quiz-2: AI Quiz 2 – String Pool, Static & Final Chuyên Sâu
// - ai-quiz-3: AI Quiz 3 – Exception, JDBC & Runtime Nâng Cao
// Toàn bộ câu hỏi đều có bản dịch Tiếng Việt song ngữ và giải thích chi tiết, không hàn lâm.

const RUN = "What is the result of attempting to compile and run the program?";
const RUN_VI = "Kết quả khi biên dịch và chạy chương trình sau là gì?";

export const aiQuiz1 = {
  slug: "ai-quiz-1",
  title: "AI Quiz 1 – OOP & Kế Thừa Mở Rộng",
  description:
    "Do AI tạo dựa trên Quiz 1: Kế thừa đa cấp, constructor chaining this()/super(), interface default & private methods, dynamic binding nâng cao.",
  color: "#8b5cf6",
  icon: "🤖",
  order: 4,
  isAiGenerated: true,
  questions: [
    {
      id: "ai1_q01",
      topic: "constructor",
      text: "Which of the following is TRUE about constructor chaining in Java?",
      textVi: "Phát biểu nào sau đây là ĐÚNG về chuỗi gọi hàm tạo (Constructor Chaining) trong Java?",
      options: [
        "A class can have both this() and super() in the same constructor body.",
        "Either this() or super() must be the first statement in a constructor, but never both.",
        "Constructor chaining only works between child and parent, not within the same class.",
        "super() is executed at the very end of the constructor body.",
      ],
      optionsVi: [
        "Một class có thể có cả this() và super() trong cùng một thân hàm constructor.",
        "Hoặc this() hoặc super() bắt buộc phải là câu lệnh ĐẦU TIÊN trong constructor, không bao giờ được có cả hai.",
        "Constructor chaining chỉ hoạt động giữa cha và con, không thể gọi lẫn nhau trong cùng một class.",
        "super() luôn luôn được thực thi ở dòng cuối cùng của thân constructor.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu:\nConstructor chaining là cơ chế gọi chuyền tay nhau giữa các constructor:\n• `this()`: Gọi sang constructor khác trong CÙNG class.\n• `super()`: Gọi sang constructor của lớp CHA.\nLuật sắt của Java: Bất kể là `this(...)` hay `super(...)`, chúng **BẮT BUỘC PHẢI LÀ DÒNG LỆNH ĐẦU TIÊN** trong thân constructor. Vì mỗi constructor chỉ có duy nhất 1 dòng đầu tiên, nên bạn **KHÔNG THỂ DÙNG CẢ HAI** trong cùng một constructor!\n\n✅ Đáp án 2 đúng: 'Either this() or super() must be the first statement, but never both'.\n❌ Vì sao các câu khác sai:\n• (A) Sai vì không thể có 2 câu lệnh cùng đứng ở dòng đầu tiên.\n• (C) Sai vì `this()` chính là gọi giữa các constructor trong cùng một class.\n• (D) Sai vì `super()` luôn chạy đầu tiên chứ không phải cuối cùng.",
    },
    {
      id: "ai1_q02",
      topic: "interface",
      text: RUN,
      textVi: RUN_VI,
      code: `interface A {
    default void print() { System.out.print("A"); }
}
interface B {
    default void print() { System.out.print("B"); }
}
class C implements A, B {
    public void print() {
        A.super.print();
        B.super.print();
    }
    public static void main(String[] args) {
        new C().print();
    }
}`,
      options: ["Prints: AB", "Prints: BA", "Compile-time error: duplicate default method", "Runtime error"],
      optionsVi: [
        "In ra: AB",
        "In ra: BA",
        "Lỗi biên dịch: trùng lặp default method (Diamond problem)",
        "Lỗi lúc chạy (Runtime error)",
      ],
      answer: 0,
      explanation:
        "💡 Giải quyết xung đột Default Method (Diamond Problem):\nTừ Java 8, Interface được phép có `default method` (phương thức có sẵn thân code).\n• Khi class C implements cả 2 interface A và B có cùng hàm `default void print()`, Java bắt buộc class C phải GHI ĐÈ (override) lại hàm `print()` để tự quyết định sẽ gọi ai, nếu không sẽ bị lỗi biên dịch.\n• Trong class C, cú pháp `A.super.print()` gọi hàm của interface A (in 'A'), tiếp theo `B.super.print()` gọi hàm của interface B (in 'B').\n✅ Kết quả in ra: `AB`.",
    },
    {
      id: "ai1_q03",
      topic: "interface",
      text: "From Java 9 onwards, private methods are allowed in interfaces. What is their primary purpose?",
      textVi: "Từ Java 9 trở đi, private method được phép xuất hiện trong Interface. Mục đích chính của chúng là gì?",
      options: [
        "To allow subclasses to override them privately.",
        "To share reusable code between multiple default or static methods within the interface.",
        "To define instance variables inside the interface.",
        "To replace abstract methods entirely.",
      ],
      optionsVi: [
        "Để cho phép lớp con ghi đè một cách riêng tư (private override).",
        "Để tái sử dụng chung mã nguồn giữa nhiều default method hoặc static method bên trong Interface đó.",
        "Để định nghĩa các biến instance bên trong Interface.",
        "Để thay thế hoàn toàn các abstract method.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu:\nTrước Java 9, khi 2 `default method` trong interface có chung một đoạn code xử lý dài dòng, bạn không có cách nào tách ra hàm phụ trợ nội bộ (helper method) mà không bị lộ hàm đó ra ngoài public.\nJava 9 bổ sung `private method` trong interface để giải quyết đúng vấn đề này: gom code dùng chung giữa các default/static method mà không làm lộ API ra cho bên ngoài thấy!\n\n✅ Đáp án 2 chuẩn xác: 'To share reusable code between multiple default or static methods within the interface'.\n❌ (A) sai vì `private` thì lớp con không bao giờ thấy được nên không thể override.",
    },
    {
      id: "ai1_q04",
      topic: "constructor",
      text: RUN,
      textVi: RUN_VI,
      code: `class Parent {
    Parent(String name) {
        System.out.print("P:" + name);
    }
}
class Child extends Parent {
    Child() {
        System.out.print("C");
    }
    public static void main(String[] args) {
        new Child();
    }
}`,
      options: [
        "Prints: P:nullC",
        "Prints: C",
        "Compile-time error in class Child",
        "Compile-time error in class Parent",
      ],
      optionsVi: [
        "In ra: P:nullC",
        "In ra: C",
        "Lỗi biên dịch trong class Child (Compile-time error)",
        "Lỗi biên dịch trong class Parent",
      ],
      answer: 2,
      explanation:
        "💡 Bẫy Constructor Kế Thừa Cực Kỳ Nguy Hiểm:\n1. Khi class `Parent` đã tự viết một constructor có tham số `Parent(String name)`, Java **SẼ KHÔNG TỰ ĐỘNG SINH CONSTRUCTOR MẶC ĐỊNH KHÔNG THAM SỐ** `Parent()` nữa!\n2. Trong class `Child`, hàm tạo `Child()` không viết gì ở dòng đầu nên Java ngầm gọi `super()` (gọi hàm tạo không tham số của Parent).\n3. Nhưng Parent làm gì có constructor không tham số `Parent()`? -> Trình biên dịch lập tức báo lỗi tại class `Child`: *'constructor Parent in class Parent cannot be applied to given types: required: String, found: no arguments'*.\n✅ Lỗi biên dịch xảy ra ở class `Child`.",
    },
    {
      id: "ai1_q05",
      topic: "polymorphism",
      text: "What is Covariant Return Type in Java Method Overriding?",
      textVi: "Kiểu trả về đồng biến (Covariant Return Type) trong Ghi đè phương thức (Method Overriding) là gì?",
      options: [
        "The overriding method can return any primitive type.",
        "The overriding method can return a subtype of the return type declared in the overridden method.",
        "The overriding method must return void regardless of parent return type.",
        "The overriding method can change return type to an entirely unrelated class.",
      ],
      optionsVi: [
        "Phương thức ghi đè có thể trả về bất kỳ kiểu nguyên thủy nào.",
        "Phương thức ghi đè ở lớp con có thể trả về kiểu dữ liệu CON của kiểu trả về đã khai báo ở lớp cha.",
        "Phương thức ghi đè bắt buộc phải trả về void bất kể cha trả về kiểu gì.",
        "Phương thức ghi đè có thể đổi kiểu trả về sang một class hoàn toàn không liên quan.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu (từ Java 5):\nTrước Java 5, phương thức override ở lớp con bắt buộc phải có kiểu trả về giống hệt 100% lớp cha.\nTừ Java 5 trở đi, Java cho phép **Covariant Return Type**: Lớp con có thể thu hẹp kiểu trả về thành một **LỚP CON** của kiểu ở lớp cha.\n• Ví dụ: Lớp cha `AnimalShelter` có method `Animal getPet()`. Lớp con `DogShelter` có thể override thành `Dog getPet()` (vì `Dog` là con của `Animal`). Điều này hoàn toàn hợp lệ và an toàn kiểu dữ liệu!\n✅ Đáp án 2 đúng.",
    },
    {
      id: "ai1_q06",
      topic: "modifier",
      text: "If a method in parent class is declared as 'protected', what access modifiers can the overriding method in child class have?",
      textVi: "Nếu phương thức ở lớp cha khai báo là 'protected', phương thức ghi đè ở lớp con có thể mang access modifier nào?",
      options: [
        "Only protected",
        "protected or public",
        "private or default",
        "Any modifier including private",
      ],
      optionsVi: [
        "Chỉ duy nhất protected",
        "protected hoặc public",
        "private hoặc default",
        "Bất kỳ modifier nào kể cả private",
      ],
      answer: 1,
      explanation:
        "💡 Quy tắc phạm vi truy cập khi Override:\n> **'Lớp con CẤM KHÔNG ĐƯỢC THU HẸP phạm vi truy cập so với lớp cha, chỉ được giữ nguyên hoặc MỞ RỘNG HƠN!'**\nThứ tự từ hẹp đến rộng: `private` < `default` < `protected` < `public`.\n• Lớp cha là `protected` -> Lớp con chỉ có thể chọn: giữ nguyên `protected` hoặc mở rộng hẳn thành `public`.\n• Nếu cố tình đặt `private` hoặc `default`, trình biên dịch báo lỗi ngay: *'attempting to assign weaker access privileges'*.\n✅ Đáp án: `protected or public`.",
    },
    {
      id: "ai1_q07",
      topic: "polymorphism",
      text: "When overriding a method that throws a checked exception, the overriding method in subclass:",
      textVi: "Khi ghi đè một method có ném checked exception ở lớp cha, method ở lớp con:",
      options: [
        "Must throw the exact same exception or a broader checked exception.",
        "Can throw the same exception, subclass exceptions, or no exception at all, but CANNOT throw broader checked exceptions.",
        "Cannot throw any runtime exceptions.",
        "Must always throw Exception class.",
      ],
      optionsVi: [
        "Bắt buộc phải ném đúng exception đó hoặc ném checked exception rộng hơn.",
        "Có thể ném cùng exception, ném exception con hẹp hơn, hoặc không ném ngoại lệ nào cả, nhưng CẤM ném checked exception rộng hơn.",
        "Không được phép ném bất kỳ runtime exception nào.",
        "Bắt buộc phải ném lớp Exception tổng quát.",
      ],
      answer: 1,
      explanation:
        "💡 Quy tắc ngoại lệ khi Override:\nLớp cha hứa hẹn thế nào thì lớp con không được làm khó khách hàng hơn:\n• Lớp con có thể: ném cùng checked exception, ném exception hẹp hơn (ví dụ cha ném `IOException`, con ném `FileNotFoundException`), hoặc không ném ngoại lệ nào cả (an toàn 100%).\n• Lớp con **CẤM TUYỆT ĐỐI** ném checked exception mới hoặc rộng hơn (ví dụ cha ném `FileNotFoundException`, con lại ném `Exception` tổng quát -> lỗi biên dịch ngay!).\n✅ Đáp án 2 phản ánh chuẩn xác quy tắc.",
    },
    {
      id: "ai1_q08",
      topic: "constructor",
      text: RUN,
      textVi: RUN_VI,
      code: `class Demo {
    {
        System.out.print("Block ");
    }
    Demo() {
        System.out.print("Constructor ");
    }
    public static void main(String[] args) {
        new Demo();
        new Demo();
    }
}`,
      options: [
        "Prints: Constructor Block Constructor Block ",
        "Prints: Block Constructor Block Constructor ",
        "Prints: Block Block Constructor Constructor ",
        "Compile-time error",
      ],
      optionsVi: [
        "In ra: Constructor Block Constructor Block ",
        "In ra: Block Constructor Block Constructor ",
        "In ra: Block Block Constructor Constructor ",
        "Lỗi biên dịch",
      ],
      answer: 1,
      explanation:
        "💡 Khối khởi tạo đối tượng (Instance Initialization Block `{}`):\n• Khối `{}` không có chữ static nằm trong class sẽ chạy **MỖI KHI CÓ MỘT ĐỐI TƯỢNG ĐƯỢC TẠO** (`new Demo()`).\n• Quy trình của JVM khi gọi `new Demo()`:\n  1. Chạy khối Instance Init Block `{}` trước.\n  2. Sau đó mới chạy đến thân hàm Constructor `Demo()`.\n• Lần 1 `new Demo()`: In `Block ` rồi in `Constructor `.\n• Lần 2 `new Demo()`: Lại in tiếp `Block ` rồi `Constructor `.\n✅ Ghép lại: `Block Constructor Block Constructor `.",
    },
    {
      id: "ai1_q09",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class A {
    void show() { System.out.print("A"); }
}
class B extends A {
    void show() { System.out.print("B"); }
}
class C extends B {
    void show() { System.out.print("C"); }
}
public class Test {
    public static void main(String[] args) {
        A obj = new C();
        obj.show();
    }
}`,
      options: ["Prints: A", "Prints: B", "Prints: C", "Compile-time error"],
      optionsVi: ["In ra: A", "In ra: B", "In ra: C", "Lỗi biên dịch"],
      answer: 2,
      explanation:
        "💡 Bản chất Đa hình động (Dynamic Method Dispatch):\n• Biến `obj` khai báo kiểu cha `A` (`A obj`).\n• Đối tượng thực tế nằm trong bộ nhớ Heap được tạo bởi lệnh `new C()`.\n• Vì phương thức `show()` được ghi đè (override) qua từng lớp kế thừa, lúc chạy (Runtime) máy ảo JVM luôn tìm đến phiên bản hàm của **ĐỐI TƯỢNG THỰC TẾ CUỐI CÙNG** trong Heap (lớp `C`) để chạy.\n✅ Kết quả in ra: `C`.",
    },
    {
      id: "ai1_q10",
      topic: "oop",
      text: RUN,
      textVi: RUN_VI,
      code: `class Animal {}
class Dog extends Animal {}
public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Dog d = (Dog) a;
    }
}`,
      options: [
        "Compiles and runs without error",
        "Compile-time error at line: Dog d = (Dog) a;",
        "Throws ClassCastException at runtime",
        "Throws NullPointerException at runtime",
      ],
      optionsVi: [
        "Biên dịch và chạy hoàn toàn bình thường không lỗi",
        "Lỗi biên dịch tại dòng: Dog d = (Dog) a;",
        "Ném ra ngoại lệ ClassCastException lúc chạy",
        "Ném ra ngoại lệ NullPointerException lúc chạy",
      ],
      answer: 2,
      explanation:
        "💡 Bẫy Ép Kiểu Xuống (Downcasting Trap):\n• Lúc biên dịch (Compile-time): Bạn viết `(Dog) a`, vì `Dog` là lớp con của `Animal` nên Compiler tin bạn, cho qua vòng biên dịch mà không báo lỗi.\n• Lúc chạy (Runtime): JVM kiểm tra đối tượng thực tế trong Heap. Biến `a` thực chất trỏ tới `new Animal()` (động vật nói chung, không phải chó). Không thể ép một con động vật chung chung thành con Chó được!\n✅ JVM lập tức quăng lỗi ngoại lệ: `java.lang.ClassCastException: Animal cannot be cast to Dog`.\n⚠️ Mẹo: Muốn ép kiểu xuống an toàn, luôn dùng `if (a instanceof Dog)` trước khi ép!",
    },
    {
      id: "ai1_q11",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class Calculator {
    static void calc(int x) { System.out.print("int "); }
    static void calc(double x) { System.out.print("double "); }
    public static void main(String[] args) {
        calc(10);
        calc(10.5);
    }
}`,
      options: ["Prints: int double ", "Prints: double double ", "Prints: int int ", "Compile-time error"],
      optionsVi: ["In ra: int double ", "In ra: double double ", "In ra: int int ", "Lỗi biên dịch"],
      answer: 0,
      explanation:
        "💡 Quy tắc Overloading với kiểu nguyên thủy (Primitive Widening):\n• `calc(10)`: Số nguyên `10` có kiểu mặc định là `int`, khớp chính xác 100% với hàm `calc(int)` -> In `int `.\n• `calc(10.5)`: Số thực `10.5` có kiểu mặc định là `double`, khớp chính xác với `calc(double)` -> In `double `.\n✅ Kết quả in ra: `int double `.",
    },
    {
      id: "ai1_q12",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class OverloadRule {
    static void test(Integer x) { System.out.print("Integer "); }
    static void test(long x) { System.out.print("long "); }
    public static void main(String[] args) {
        int a = 5;
        test(a);
    }
}`,
      options: ["Prints: Integer ", "Prints: long ", "Compile-time error: ambiguous call", "Prints: 5 "],
      optionsVi: [
        "In ra: Integer ",
        "In ra: long ",
        "Lỗi biên dịch do không xác định được hàm (ambiguous)",
        "In ra: 5 ",
      ],
      answer: 1,
      explanation:
        "💡 Thứ tự ưu tiên Overloading của Java (CỰC KỲ QUAN TRỌNG):\nKhi truyền biến `int` vào, Java sẽ tìm kiếm theo thứ tự ưu tiên sau:\n1. **Khớp chính xác (Exact Match)**: `int`\n2. **Mở rộng kiểu nguyên thủy (Widening)**: `int -> long -> float -> double`\n3. **Đóng hộp (Autoboxing)**: `int -> Integer`\n4. **Số lượng tham số tùy biến (Varargs)**: `int...`\nVì **Widening (mở rộng lên long)** luôn được ưu tiên hơn **Boxing (đóng hộp lên Integer)** (để giữ tương thích ngược với Java cũ), Java sẽ chọn `test(long)`!\n✅ Kết quả in ra: `long `.",
    },
    {
      id: "ai1_q13",
      topic: "interface",
      text: "Can an abstract class have a constructor? Can it be directly instantiated with 'new'?",
      textVi: "Một lớp trừu tượng (abstract class) có thể có constructor không? Và có thể dùng từ khóa 'new' để tạo trực tiếp đối tượng từ nó không?",
      options: [
        "No constructor, and cannot be instantiated.",
        "Yes it can have constructors, but CANNOT be directly instantiated with new.",
        "Yes it can have constructors, and CAN be directly instantiated with new.",
        "No constructor, but can be instantiated.",
      ],
      optionsVi: [
        "Không có constructor, và không thể tạo đối tượng.",
        "CÓ THỂ có constructor, nhưng CẤM KHÔNG ĐƯỢC tạo đối tượng trực tiếp bằng new.",
        "Có thể có constructor, và có thể tạo trực tiếp bằng new.",
        "Không có constructor, nhưng tạo trực tiếp được.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất Constructor của Abstract Class:\n• Abstract class **HOÀN TOÀN CÓ THỂ CÓ CONSTRUCTOR**! Constructor này dùng để khởi tạo các thuộc tính của lớp cha khi lớp con gọi `super(...)`.\n• Tuy nhiên, vì là lớp trừu tượng (chưa hoàn thiện), Java **CẤM TUYỆT ĐỐI** việc gọi trực tiếp `new MyAbstractClass()`. Bạn chỉ có thể tạo đối tượng thông qua các lớp con cụ thể kế thừa nó.\n✅ Đáp án 2 hoàn toàn chính xác.",
    },
    {
      id: "ai1_q14",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class Parent {
    static void greet() { System.out.print("Parent "); }
}
class Child extends Parent {
    static void greet() { System.out.print("Child "); }
}
public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.greet();
    }
}`,
      options: ["Prints: Parent ", "Prints: Child ", "Compile-time error", "Throws RuntimeException"],
      optionsVi: ["In ra: Parent ", "In ra: Child ", "Lỗi lúc biên dịch", "Ném ra ngoại lệ lúc chạy"],
      answer: 0,
      explanation:
        "💡 Phân biệt Method Hiding vs Method Overriding:\n• Hàm `greet()` là **STATIC METHOD**. Static method thuộc về Class chứ không thuộc về đối tượng, do đó nó **KHÔNG THỂ BỊ OVERRIDE**!\n• Việc lớp con viết một static method trùng tên được Java gọi là **METHOD HIDING** (che giấu).\n• Khi gọi phương thức static qua biến tham chiếu `p.greet()`, Java quyết định hàm nào ngay lúc BIÊN DỊCH dựa vào **KIỂU KHAI BÁO CỦA BIẾN** (`Parent p`).\n✅ Do đó hàm của lớp `Parent` được gọi -> In ra: `Parent `.\n(Mặc dù đối tượng là `new Child()`, static method vẫn không bị ảnh hưởng).",
    },
    {
      id: "ai1_q15",
      topic: "interface",
      text: "What is a Marker Interface in Java? Give a famous standard library example.",
      textVi: "Marker Interface (Giao diện đánh dấu) trong Java là gì? Nêu một ví dụ nổi tiếng trong thư viện chuẩn.",
      options: [
        "An interface with exactly one abstract method (e.g. Runnable).",
        "An interface with NO methods or fields at all, used to deliver type information to the JVM (e.g. Serializable, Cloneable).",
        "An interface that contains only static final constants.",
        "An interface marked with the @Deprecated annotation.",
      ],
      optionsVi: [
        "Là interface có đúng duy nhất 1 abstract method (ví dụ: Runnable).",
        "Là interface HOÀN TOÀN TRỐNG (không có method hay field nào), dùng để gắn nhãn/đánh dấu kiểu dữ liệu cho JVM biết (ví dụ: Serializable, Cloneable).",
        "Là interface chỉ chứa toàn hằng số static final.",
        "Là interface được gắn annotation @Deprecated.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất Marker Interface (Tagging Interface):\n• Marker interface là một interface trống rỗng, không chứa bất kỳ phương thức hay hằng số nào.\n• Mục đích: Giống như một cái 'tem dán bảo hành'. Khi một class `implements Serializable` hay `Cloneable`, JVM sẽ kiểm tra xem class đó có dán tem này không. Nếu có thì cho phép ghi ra luồng byte hoặc nhân bản đối tượng.\n• Chú ý: Interface có đúng 1 method trừu tượng (như `Runnable`, `Callable`) được gọi là **Functional Interface** chứ không phải Marker Interface.\n✅ Đáp án 2 đúng.",
    },
    {
      id: "ai1_q16",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class Parent {
    void process(int x) { System.out.print("P"); }
}
class Child extends Parent {
    void process(final int x) { System.out.print("C"); }
    public static void main(String[] args) {
        Parent p = new Child();
        p.process(10);
    }
}`,
      options: [
        "Prints: C",
        "Prints: P",
        "Compile-time error: parameter modifiers cannot be changed",
        "Prints: PC",
      ],
      optionsVi: [
        "In ra: C",
        "In ra: P",
        "Lỗi biên dịch: không được phép thêm modifier vào tham số",
        "In ra: PC",
      ],
      answer: 0,
      explanation:
        "💡 Chữ ký phương thức (Method Signature) và từ khóa `final` ở tham số:\n• Chữ ký phương thức (Method Signature) chỉ bao gồm: **Tên phương thức** và **Danh sách kiểu dữ liệu của tham số** (`process(int)`).\n• Việc bạn thêm từ khóa `final` vào tham số (`final int x`) chỉ có tác dụng nội bộ trong thân hàm (không cho phép gán lại biến `x`), nó **HOÀN TOÀN KHÔNG LÀM THAY ĐỔI CHỮ KÝ HÀM**!\n• Do đó, hàm ở lớp Child vẫn là một phương thức **GHI ĐÈ (OVERRIDE) HỢP LỆ** 100%.\n• Khi gọi `p.process(10)`, tính đa hình lúc chạy sẽ gọi hàm của đối tượng thực tế `Child` -> In ra `C`.\n✅ Đáp án: `C`.",
    },
    {
      id: "ai1_q17",
      topic: "interface",
      text: "Which of the following field declarations is ILLEGAL inside an Interface?",
      textVi: "Khai báo thuộc tính nào sau đây là KHÔNG HỢP LỆ (báo lỗi) bên trong một Interface?",
      options: [
        "int MAX = 100;",
        "public static final int MAX = 100;",
        "protected int MAX = 100;",
        "static int MAX = 100;",
      ],
      optionsVi: [
        "int MAX = 100;",
        "public static final int MAX = 100;",
        "protected int MAX = 100;",
        "static int MAX = 100;",
      ],
      answer: 2,
      explanation:
        "💡 Quy tắc thuộc tính trong Interface:\n• Mọi biến/thuộc tính trong Interface đều mặc định là **`public static final`**.\n• Vì Interface sinh ra là để phơi bày chuẩn kết nối ra ngoài công cộng, nên nó **CẤM TUYỆT ĐỐI** dùng từ khóa `protected` hoặc `private` cho thuộc tính.\n• Khai báo `protected int MAX = 100;` sẽ bị trình biên dịch quăng lỗi ngay: *'modifier protected not allowed here'*.\n✅ Đáp án 3 là khai báo bất hợp pháp.",
    },
    {
      id: "ai1_q18",
      topic: "oop",
      text: "Why does Java not support multiple inheritance with classes, but supports multiple inheritance with interfaces?",
      textVi: "Tại sao Java không hỗ trợ đa kế thừa với class, nhưng lại cho phép đa kế thừa với interface?",
      options: [
        "Because interfaces cannot be compiled into bytecode.",
        "To avoid the Diamond Problem (ambiguity in state/implementation inheritance) while allowing flexible contract implementation.",
        "Because interfaces consume more memory than classes.",
        "There is no technical reason, it was just an accidental design decision.",
      ],
      optionsVi: [
        "Vì interface không thể biên dịch thành mã bytecode.",
        "Để tránh vấn đề 'viên kim cương' (Diamond Problem - xung đột logic và trạng thái của nhiều class cha) nhưng vẫn cho phép linh hoạt ghép nối nhiều bản hợp đồng chức năng.",
        "Vì interface tiêu tốn nhiều bộ nhớ hơn class.",
        "Không có lý do kỹ thuật nào, chỉ là quyết định ngẫu nhiên.",
      ],
      answer: 1,
      explanation:
        "💡 Vấn đề Diamond Problem trong C++ vs Java:\n• Nếu một class con kế thừa từ 2 class cha A và B, và cả 2 cha đều có thuộc tính `int x` hay phương thức `run()` có phần thân code khác nhau, lớp con sẽ không biết thừa hưởng trạng thái của ai -> Gây xung đột và hỗn loạn bộ nhớ.\n• Interface (trước Java 8) chỉ chứa các phương thức trừu tượng (không chứa biến instance lưu trạng thái), nên dù có kế thừa nhiều interface thì con cũng chỉ cài đặt 1 lần duy nhất mà không sợ xung đột bộ nhớ.\n✅ Đáp án 2 giải thích trúng bản chất kiến trúc Java.",
    },
    {
      id: "ai1_q19",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class ArrayTrap {
    public static void main(String[] args) {
        Object[] arr = new String[3];
        arr[0] = "Hello";
        arr[1] = 100; // Integer
    }
}`,
      options: [
        "Compiles and runs without error",
        "Compile-time error at line: arr[1] = 100;",
        "Throws ArrayStoreException at runtime",
        "Throws ClassCastException at runtime",
      ],
      optionsVi: [
        "Biên dịch và chạy hoàn toàn bình thường không lỗi",
        "Lỗi lúc biên dịch tại dòng: arr[1] = 100;",
        "Ném ra ngoại lệ ArrayStoreException lúc chạy",
        "Ném ra ngoại lệ ClassCastException lúc chạy",
      ],
      answer: 2,
      explanation:
        "💡 Bẫy Mảng Đồng Biến (Array Covariance Trap):\n• Trong Java, mảng là covariant: `String[]` được coi là một `Object[]`. Vì vậy dòng `Object[] arr = new String[3];` hoàn toàn biên dịch được.\n• Khi gán `arr[1] = 100;` (số nguyên `Integer` được coi là `Object`), trình biên dịch kiểm tra kiểu của `arr` là `Object[]` nên cũng cho qua luôn!\n• Tuy nhiên, lúc CHẠY (Runtime), máy ảo JVM nhớ rõ đối tượng thực tế trong Heap là một mảng chuỗi `String[3]`. Khi bạn cố nhét số nguyên `Integer` vào mảng String, JVM phát hiện xung đột và ném ra ngay lỗi: **`java.lang.ArrayStoreException: java.lang.Integer`**!\n✅ Đáp án: `ArrayStoreException`.",
    },
    {
      id: "ai1_q20",
      topic: "oop",
      text: "What design principle is practiced when writing 'List<String> list = new ArrayList<>()' instead of 'ArrayList<String> list = new ArrayList<>()'?",
      textVi: "Nguyên lý thiết kế nào được áp dụng khi khai báo 'List<String> list = new ArrayList<>()' thay vì dùng trực tiếp 'ArrayList<String> list = new ArrayList<>()'?",
      options: [
        "Program to an interface, not an implementation (Loose Coupling).",
        "Multiple Inheritance principle.",
        "Encapsulation through private variables.",
        "Method Inlining optimization.",
      ],
      optionsVi: [
        "Lập trình hướng giao diện, không phụ thuộc cài đặt cụ thể (Giảm sự phụ thuộc - Loose Coupling).",
        "Nguyên lý đa kế thừa.",
        "Tính đóng gói thông qua biến private.",
        "Tối ưu hóa nội tuyến phương thức.",
      ],
      answer: 0,
      explanation:
        "💡 Nguyên lý 'Program to an Interface, not an Implementation':\n• Khai báo biến bằng kiểu Interface `List<String>` giúp code của bạn linh hoạt tối đa (Loose Coupling). Sau này nếu muốn đổi từ `ArrayList` sang `LinkedList` hay `CopyOnWriteArrayList` vì lý do hiệu năng, bạn chỉ cần sửa duy nhất 1 chỗ khởi tạo mà toàn bộ các hàm xử lý bên dưới không cần viết lại dòng nào!\n✅ Đáp án 1 là nguyên lý thiết kế kinh điển của mọi lập trình viên Java.",
    },
  ],
};

export const aiQuiz2 = {
  slug: "ai-quiz-2",
  title: "AI Quiz 2 – String Pool, Static & Final Chuyên Sâu",
  description:
    "Do AI tạo dựa trên Quiz 2: String Pool, intern(), StringBuilder vs StringBuffer đa luồng, static block vs init block, final reference.",
  color: "#06b6d4",
  icon: "⚡",
  order: 5,
  isAiGenerated: true,
  questions: [
    {
      id: "ai2_q01",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class TestString {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = new String("Hello");
        String s3 = s2.intern();
        System.out.print((s1 == s2) + " " + (s1 == s3));
    }
}`,
      options: ["Prints: false true", "Prints: true true", "Prints: false false", "Prints: true false"],
      optionsVi: [
        "In ra: false true",
        "In ra: true true",
        "In ra: false false",
        "In ra: true false",
      ],
      answer: 0,
      explanation:
        "💡 Bản chất String Pool và hàm `intern()`:\n• `s1 = \"Hello\"`: Chuỗi được lưu trong vùng nhớ đặc biệt **String Constant Pool**.\n• `s2 = new String(\"Hello\")`: Dùng từ khóa `new` ép Java tạo ra một đối tượng độc lập mới ngoài bộ nhớ Heap thông thường. Vì nằm ở 2 ô nhớ khác nhau -> `s1 == s2` trả về `false`.\n• `s3 = s2.intern()`: Phương thức `intern()` sẽ tìm xem trong String Pool đã có chữ \"Hello\" chưa. Nếu có rồi, nó trả về luôn địa chỉ ô nhớ trong String Pool (chính là địa chỉ của `s1`). Do đó `s1` và `s3` cùng trỏ vào 1 chỗ -> `s1 == s3` trả về `true`.\n✅ Kết quả: `false true`.",
    },
    {
      id: "ai2_q02",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class StringConcat {
    public static void main(String[] args) {
        final String a = "Java";
        final String b = "17";
        String c = a + b;
        String d = "Java" + "17";
        String e = "Java17";
        System.out.print((c == e) + " " + (d == e));
    }
}`,
      options: ["Prints: true true", "Prints: false true", "Prints: false false", "Prints: true false"],
      optionsVi: [
        "In ra: true true",
        "In ra: false true",
        "In ra: false false",
        "In ra: true false",
      ],
      answer: 0,
      explanation:
        "💡 Tối ưu hóa hằng số lúc biên dịch (Compile-time Constant Inlining):\n• Vì `a` và `b` đều được khai báo là `final String` (hằng số bất biến), trình biên dịch Java biết chắc chắn 100% giá trị của chúng không bao giờ thay đổi.\n• Do đó, phép cộng `a + b` được Compiler tính toán và gộp luôn thành `\"Java17\"` ngay từ thời điểm biên dịch, tương tự như `\"Java\" + \"17\"`!\n• Tất cả các chuỗi hằng số này đều được tái sử dụng chung một đối tượng trong **String Constant Pool**.\n✅ Cả `c == e` và `d == e` đều cho kết quả `true true`!\n⚠️ Lưu ý: Nếu bỏ chữ `final` ở biến `a` hoặc `b`, phép cộng sẽ diễn ra lúc runtime -> khi đó `c == e` sẽ thành `false`.",
    },
    {
      id: "ai2_q03",
      topic: "modifier",
      text: RUN,
      textVi: RUN_VI,
      code: `import java.util.ArrayList;
import java.util.List;

public class FinalList {
    public static void main(String[] args) {
        final List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Spring");
        System.out.print(list.size());
    }
}`,
      options: [
        "Prints: 2",
        "Compile-time error: cannot add elements to a final List",
        "Throws UnsupportedOperationException at runtime",
        "Prints: 0",
      ],
      optionsVi: [
        "In ra: 2",
        "Lỗi biên dịch: không thể thêm phần tử vào một List có từ khóa final",
        "Ném ra ngoại lệ UnsupportedOperationException lúc chạy",
        "In ra: 0",
      ],
      answer: 0,
      explanation:
        "💡 Bản chất Từ khóa `final` áp dụng cho Biến Tham Chiếu (Reference Variable):\n• Khi khai báo `final List<String> list`: Từ khóa `final` chỉ bảo vệ **BIẾN THAM CHIẾU** `list` không được gán trỏ sang một đối tượng khác (bạn không được viết `list = new ArrayList<>();` lần thứ hai).\n• Nó **HOÀN TOÀN KHÔNG LÀM ĐỐI TƯỢNG BỊ BẤT BIẾN**! Đối tượng `ArrayList` trong Heap vẫn hoạt động bình thường, bạn thêm bớt phần tử (`list.add(...)`, `list.remove(...)`) thoải mái.\n✅ Đoạn mã chạy hoàn toàn bình thường và in ra `2`.",
    },
    {
      id: "ai2_q04",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
      code: `class Order {
    static {
        System.out.print("S1 ");
    }
    {
        System.out.print("I1 ");
    }
    Order() {
        System.out.print("C1 ");
    }
    static {
        System.out.print("S2 ");
    }
    public static void main(String[] args) {
        System.out.print("M ");
        new Order();
    }
}`,
      options: [
        "Prints: S1 S2 M I1 C1 ",
        "Prints: M S1 S2 I1 C1 ",
        "Prints: S1 I1 C1 S2 M ",
        "Prints: S1 S2 I1 C1 M ",
      ],
      optionsVi: [
        "In ra: S1 S2 M I1 C1 ",
        "In ra: M S1 S2 I1 C1 ",
        "In ra: S1 I1 C1 S2 M ",
        "In ra: S1 S2 I1 C1 M ",
      ],
      answer: 0,
      explanation:
        "💡 Thứ tự khởi tạo kinh điển của Java (Lifecycle Initialization):\n1. **Khối static `{}`**: Chạy **duy nhất 1 lần đầu tiên** khi Class được nạp vào bộ nhớ JVM (trước cả khi hàm `main` bắt đầu chạy). Thứ tự chạy từ trên xuống dưới: `S1 ` rồi `S2 `.\n2. **Hàm `main` bắt đầu chạy**: In tiếp chữ `M `.\n3. **Gặp lệnh `new Order()`**: Khởi tạo đối tượng:\n   • Chạy khối Instance Init `{}` trước: In `I1 `.\n   • Chạy thân Constructor sau: In `C1 `.\n✅ Ghép toàn bộ lại: `S1 S2 M I1 C1 `.",
    },
    {
      id: "ai2_q05",
      topic: "string",
      text: "What is the key difference between StringBuffer and StringBuilder in Java?",
      textVi: "Điểm khác biệt cốt lõi nhất giữa StringBuffer và StringBuilder trong Java là gì?",
      options: [
        "StringBuffer is mutable while StringBuilder is immutable.",
        "StringBuffer is thread-safe (methods are synchronized) but slower; StringBuilder is not thread-safe but faster.",
        "StringBuilder cannot change capacity dynamically.",
        "There is no difference, StringBuilder was just renamed in newer Java versions.",
      ],
      optionsVi: [
        "StringBuffer là có thể thay đổi (mutable), còn StringBuilder là bất biến (immutable).",
        "StringBuffer an toàn trong môi trường đa luồng (thread-safe, các method có synchronized) nhưng chậm hơn; StringBuilder không thread-safe nhưng tốc độ xử lý nhanh hơn.",
        "StringBuilder không thể tự động mở rộng kích thước bộ đệm.",
        "Không có khác biệt gì cả, chỉ là đổi tên.",
      ],
      answer: 1,
      explanation:
        "💡 So sánh bộ đôi StringBuilder vs StringBuffer:\n• Cả hai đều là lớp chuỗi có thể chỉnh sửa trực tiếp (Mutable).\n• **`StringBuffer` (từ Java 1.0)**: Hầu hết các phương thức đều được bọc từ khóa `synchronized`. Nó an toàn khi nhiều luồng cùng gọi (Thread-safe), nhưng việc khóa/mở khóa luồng làm giảm hiệu năng.\n• **`StringBuilder` (từ Java 5)**: Bỏ hết các khóa `synchronized`, tối ưu tối đa cho môi trường đơn luồng -> Chạy nhanh hơn StringBuffer từ 2 đến 3 lần. Nếu không có đa luồng truy cập đồng thời, luôn ưu tiên dùng StringBuilder!\n✅ Đáp án 2 chính xác 100%.",
    },
    {
      id: "ai2_q06",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
      code: `class Counter {
    static int count = 0;
    int id = 0;
    Counter() {
        count++;
        id++;
    }
}
public class TestCounter {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.print(c1.id + " " + c1.count + " " + c2.count);
    }
}`,
      options: ["Prints: 1 2 2", "Prints: 1 1 2", "Prints: 2 2 2", "Prints: 1 1 1"],
      optionsVi: ["In ra: 1 2 2", "In ra: 1 1 2", "In ra: 2 2 2", "In ra: 1 1 1"],
      answer: 0,
      explanation:
        "💡 Bản chất Biến Static (Dùng chung) vs Biến Instance (Riêng):\n• Biến `id` (riêng): Mỗi đối tượng có 1 bản sao. Khi tạo `c1`, `c1.id` tăng từ 0 lên 1. Khi tạo `c2`, `c2.id` cũng tăng từ 0 lên 1. Biến `c1.id` vẫn là 1.\n• Biến `count` (static - chung): Chỉ có duy nhất 1 biến dùng chung cho toàn bộ Class. Lần 1 `new Counter()` làm `count` lên 1. Lần 2 `new Counter()` làm `count` lên 2. Dù hỏi qua `c1.count` hay `c2.count`, kết quả đều nhìn vào biến chung có giá trị là 2!\n✅ Ghép lại: `c1.id` (1) `c1.count` (2) `c2.count` (2) -> `1 2 2`.",
    },
    {
      id: "ai2_q07",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class RegexSplit {
    public static void main(String[] args) {
        String str = "192.168.1.1";
        String[] parts = str.split(".");
        System.out.print(parts.length);
    }
}`,
      options: ["Prints: 0", "Prints: 4", "Prints: 1", "Throws PatternSyntaxException"],
      optionsVi: ["In ra: 0", "In ra: 4", "In ra: 1", "Ném ra lỗi PatternSyntaxException"],
      answer: 0,
      explanation:
        "💡 Bẫy Biểu Thức Chính Quy (Regex Trap) Kinh Điển của hàm `split()`:\n• Hàm `str.split(regex)` nhận vào một **BIỂU THỨC CHÍNH QUY (Regular Expression)** chứ không phải chuỗi ký tự thông thường!\n• Trong cú pháp Regex, dấu chấm `.` đại diện cho **BẤT KỲ KÝ TỰ NÀO**!\n• Do đó, lệnh `str.split(\".\")` sẽ khớp và cắt bỏ tất cả mọi ký tự trong chuỗi, kết quả là không còn gì và mảng trả về có độ dài là `0`!\n✅ Muốn cắt theo dấu chấm thật sự, bạn bắt buộc phải escape: `str.split(\"\\\\.\")` thì mới ra độ dài là 4.\n⚠️ Đáp án chính xác của đoạn code trên là `0`.",
    },
    {
      id: "ai2_q08",
      topic: "static",
      text: "Which of the following statements about static methods is FALSE?",
      textVi: "Phát biểu nào sau đây về static method là SAI?",
      options: [
        "A static method can access other static methods and static variables directly.",
        "A static method can use the 'this' keyword to refer to the current object.",
        "A static method can be called without creating an instance of the class.",
        "A static method cannot be overridden to participate in runtime polymorphism.",
      ],
      optionsVi: [
        "Static method có thể truy cập trực tiếp các static method và static variable khác.",
        "Static method có thể dùng từ khóa 'this' để tham chiếu tới đối tượng hiện tại.",
        "Static method có thể được gọi mà không cần tạo đối tượng từ class.",
        "Static method không thể bị override để tham gia vào đa hình lúc chạy.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất Từ khóa `this` và `super`:\n• Từ khóa `this` đại diện cho 'đối tượng hiện tại đang thực thi'.\n• Nhưng phương thức `static` lại hoạt động ở cấp độ Class, nó có thể được gọi khi chưa có bất kỳ đối tượng nào sinh ra (`ClassName.method()`). Do đó, trong static method **TUYỆT ĐỐI KHÔNG TỒN TẠI TỪ KHÓA `this` HOẶC `super`**!\n• Viết `this` trong static method sẽ bị lỗi biên dịch ngay: *'non-static variable this cannot be referenced from a static context'*.\n✅ Phát biểu B là SAI (và là đáp án cần chọn).",
    },
    {
      id: "ai2_q09",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class TestSB {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java");
        sb.append(11).insert(4, "-");
        System.out.print(sb);
    }
}`,
      options: ["Prints: Java-11", "Prints: Java11-", "Prints: -Java11", "Compile-time error"],
      optionsVi: ["In ra: Java-11", "In ra: Java11-", "In ra: -Java11", "Lỗi biên dịch"],
      answer: 0,
      explanation:
        "💡 Thao tác với StringBuilder:\n1. Ban đầu `sb` chứa chuỗi `\"Java\"` (index từ 0 đến 3).\n2. `sb.append(11)`: Nối số 11 vào đuôi -> Chuỗi thành `\"Java11\"`.\n3. `sb.insert(4, \"-\")`: Chèn chuỗi `\"-\"` vào ngay vị trí chỉ số 4 (ngay sau chữ 'a' cuối cùng của Java, trước số 1) -> Đẩy số 11 lùi về sau.\n✅ Chuỗi kết quả trở thành: `Java-11`.",
    },
    {
      id: "ai2_q10",
      topic: "modifier",
      text: "What is a 'blank final' variable in Java, and where MUST it be initialized?",
      textVi: "'Blank final variable' (biến final để trống) trong Java là gì, và nó BẮT BUỘC phải được khởi tạo ở đâu?",
      options: [
        "A final variable without initial value; must be initialized in all constructors or instance initializer block.",
        "A final variable that is always set to null automatically.",
        "A final variable that can be reassigned multiple times.",
        "A static variable declared with private modifier.",
      ],
      optionsVi: [
        "Một biến final không gán giá trị lúc khai báo; bắt buộc phải được khởi tạo trong tất cả các constructor hoặc khối khởi tạo instance.",
        "Một biến final luôn luôn tự động nhận giá trị null.",
        "Một biến final có thể được gán lại nhiều lần tùy ý.",
        "Một biến static được khai báo với quyền truy cập private.",
      ],
      answer: 0,
      explanation:
        "💡 Khái niệm Blank Final Variable:\n• Là biến `final` nhưng khi khai báo bạn chưa gán giá trị ngay (ví dụ: `final int id;`).\n• Luật sắt của Java: Biến `final` không được để trôi nổi. Nếu bạn không gán ngay lúc khai báo, bạn **BẮT BUỘC PHẢI GÁN GIÁ TRỊ CHO NÓ TRONG TẤT CẢ CÁC CONSTRUCTOR** (hoặc khối khởi tạo `{}`) của class đó.\n• Nếu có bất kỳ constructor nào bỏ quên không gán, trình biên dịch sẽ quăng lỗi ngay: *'variable id might not have been initialized'*.\n✅ Đáp án 1 hoàn toàn chính xác.",
    },
    {
      id: "ai2_q11",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
      code: `public class IntegerCacheTest {
    public static void main(String[] args) {
        Integer a = 100;
        Integer b = 100;
        Integer c = 200;
        Integer d = 200;
        System.out.print((a == b) + " " + (c == d));
    }
}`,
      options: ["Prints: true false", "Prints: true true", "Prints: false false", "Prints: false true"],
      optionsVi: ["In ra: true false", "In ra: true true", "In ra: false false", "In ra: false true"],
      answer: 0,
      explanation:
        "💡 Bẫy Integer Cache (-128 đến 127) Cực Nổi Tiếng trong Java:\n• Khi dùng cơ chế Autoboxing (`Integer a = 100;`), Java sẽ gọi ngầm hàm `Integer.valueOf(100)`.\n• Để tối ưu bộ nhớ, Java có một bộ đệm **IntegerCache lưu sẵn các số từ -128 đến 127**.\n• Vì số `100` nằm trong khoảng [-128, 127], cả `a` và `b` đều được cấp chung 1 đối tượng từ Cache -> `a == b` so địa chỉ ra **`true`**!\n• Nhưng số `200` nằm ngoài khoảng Cache, Java buộc phải `new Integer(200)` tạo 2 đối tượng mới tại 2 ô nhớ khác nhau -> `c == d` so địa chỉ ra **`false`**!\n✅ Kết quả in ra: `true false`.\n⚠️ Mẹo phỏng vấn: Luôn dùng `.equals()` khi so sánh các đối tượng Wrapper (Integer, Long) để tránh bẫy này!",
    },
    {
      id: "ai2_q12",
      topic: "string",
      text: "Why is the String class in Java designed to be immutable and final?",
      textVi: "Tại sao lớp String trong Java lại được thiết kế là bất biến (immutable) và final?",
      options: [
        "For Security, Thread Safety, String Constant Pool caching, and HashCode caching.",
        "Because primitive strings are not supported by operating systems.",
        "To prevent developers from calling methods on string objects.",
        "Because Java compiler cannot compile mutable classes.",
      ],
      optionsVi: [
        "Vì lý do Bảo mật (Security), An toàn đa luồng (Thread Safety), Bộ nhớ đệm String Pool, và Lưu trữ trước mã băm (HashCode Caching).",
        "Vì hệ điều hành không hỗ trợ chuỗi nguyên thủy.",
        "Để ngăn lập trình viên gọi các phương thức trên đối tượng chuỗi.",
        "Vì trình biên dịch Java không thể biên dịch các lớp mutable.",
      ],
      answer: 0,
      explanation:
        "💡 4 lý do sống còn khiến String phải là Immutable và Final:\n1. **Bảo mật (Security)**: String dùng để lưu mật khẩu, đường dẫn file, URL kết nối DB. Nếu chuỗi bị thay đổi lén lút lúc đang kết nối, hacker có thể chiếm quyền.\n2. **String Pool Caching**: Nhờ bất biến nên hàng triệu chuỗi giống nhau chỉ cần lưu 1 bản duy nhất trong RAM, tiết kiệm bộ nhớ khổng lồ.\n3. **An toàn đa luồng (Thread-safety)**: Không thể sửa đổi nghĩa là nhiều thread đọc cùng lúc không bao giờ sợ xung đột dữ liệu.\n4. **HashCode Caching**: Mã hash của chuỗi chỉ cần tính 1 lần duy nhất rồi cache lại, giúp các cấu trúc như `HashMap`, `HashSet` tra cứu cực nhanh.\n✅ Đáp án 1 chuẩn xác 100%.",
    },
    {
      id: "ai2_q13",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class TestCapacity {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer();
        System.out.print(sb.length() + " " + sb.capacity());
    }
}`,
      options: ["Prints: 0 16", "Prints: 0 0", "Prints: 16 16", "Prints: 0 32"],
      optionsVi: ["In ra: 0 16", "In ra: 0 0", "In ra: 16 16", "In ra: 0 32"],
      answer: 0,
      explanation:
        "💡 Khái niệm `length()` vs `capacity()` trong StringBuffer/StringBuilder:\n• `length()`: Số lượng ký tự THỰC TẾ đang có trong chuỗi. Khi vừa khởi tạo rỗng `new StringBuffer()`, chưa có chữ nào nên `length() = 0`.\n• `capacity()`: SỨC CHỨA BỘ ĐỆM được cấp phát trước trong bộ nhớ để không phải liên tục cấp phát lại. Mặc định constructor không tham số sẽ cấp dung lượng đệm là **16 ký tự**!\n✅ Kết quả in ra: `0 16`.",
    },
    {
      id: "ai2_q14",
      topic: "static",
      text: "Can an outer (top-level) class be declared static in Java?",
      textVi: "Một lớp độc lập ngoài cùng (top-level class) có thể khai báo với từ khóa static trong Java được không?",
      options: [
        "Yes, any class can be static.",
        "No, only nested (inner) classes can be declared static.",
        "Yes, if the class contains only static methods.",
        "Yes, but it cannot have any variables.",
      ],
      optionsVi: [
        "Có thể, bất kỳ class nào cũng có thể là static.",
        "KHÔNG THỂ, chỉ có các lớp lồng bên trong (nested/inner class) mới được phép khai báo static.",
        "Có thể, nếu class đó chỉ chứa toàn phương thức static.",
        "Có thể, nhưng class đó không được chứa biến.",
      ],
      answer: 1,
      explanation:
        "💡 Quy tắc Static cho Class:\n• Từ khóa `static` chỉ có ý nghĩa khi một thành phần thuộc về một 'vỏ bọc' bên ngoài (enclosing class).\n• Do đó, **CHỈ CÓ LỚP NẰM TRONG LỚP KHÁC (Static Nested Class)** mới được phép có từ khóa `static`.\n• Lớp độc lập ngoài cùng (Top-level Class) **CẤM TUYỆT ĐỐI** dùng từ khóa `static` (chỉ được dùng `public` hoặc `default`).\n✅ Đáp án: 'No, only nested classes can be declared static'.",
    },
    {
      id: "ai2_q15",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class StringMethods {
    public static void main(String[] args) {
        String s = "  Java  ";
        System.out.print(s.trim().length() + " " + s.length());
    }
}`,
      options: ["Prints: 4 8", "Prints: 4 4", "Prints: 8 8", "Prints: 6 8"],
      optionsVi: ["In ra: 4 8", "In ra: 4 4", "In ra: 8 8", "In ra: 6 8"],
      answer: 0,
      explanation:
        "💡 Phân tích chuỗi và phương thức `trim()`:\n• Chuỗi gốc `\"  Java  \"` gồm: 2 dấu cách đầu + 4 chữ 'Java' + 2 dấu cách đuôi = tổng cộng **8 ký tự** (`s.length() = 8`).\n• Phương thức `s.trim()` cắt bỏ toàn bộ khoảng trắng ở hai đầu, trả về chuỗi mới là `\"Java\"` (có độ dài là 4).\n• Tuy nhiên, vì String là bất biến và không có dấu gán lại biến `s`, chuỗi `s` gốc vẫn giữ nguyên độ dài 8!\n✅ Ghép lại: `s.trim().length()` là 4 và `s.length()` là 8 -> `4 8`.",
    },
    {
      id: "ai2_q16",
      topic: "modifier",
      text: "Which of the following is TRUE about a 'final method'?",
      textVi: "Phát biểu nào sau đây là ĐÚNG về phương thức có từ khóa final (final method)?",
      options: [
        "It cannot be overloaded in the same class.",
        "It can be inherited by subclasses, but CANNOT be overridden.",
        "It cannot accept any arguments.",
        "It must return a primitive type.",
      ],
      optionsVi: [
        "Nó không thể bị nạp chồng (overload) trong cùng class.",
        "Nó ĐƯỢC kế thừa bởi lớp con, nhưng KHÔNG THỂ bị ghi đè (override).",
        "Nó không được phép nhận tham số nào.",
        "Nó bắt buộc phải trả về kiểu nguyên thủy.",
      ],
      answer: 1,
      explanation:
        "💡 Đặc tính của Final Method:\n• `final method` sinh ra để ngăn chặn việc lớp con thay đổi thuật toán cốt lõi (cấm override).\n• Tuy nhiên, lớp con vẫn **thừa hưởng (kế thừa)** và gọi sử dụng phương thức đó bình thường.\n• Ngoài ra, `final method` hoàn toàn có thể được nạp chồng (overload) thoải mái trong cùng một class.\n✅ Đáp án 2 chính xác.",
    },
    {
      id: "ai2_q17",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class StringEquality {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "he" + new String("llo");
        System.out.print(s1 == s2);
    }
}`,
      options: ["Prints: false", "Prints: true", "Compile-time error", "Runtime error"],
      optionsVi: ["In ra: false", "In ra: true", "Lỗi lúc biên dịch", "Lỗi lúc chạy"],
      answer: 0,
      explanation:
        "💡 Phép cộng chuỗi có dính `new String()`:\n• Dù biểu thức có chứa chữ `\"he\"` (literal), nhưng vế sau lại là `new String(\"llo\")` (đối tượng tạo lúc chạy trong Heap).\n• Khi có một vế là đối tượng tạo lúc chạy, phép cộng chuỗi `\"he\" + new String(\"llo\")` sẽ được JVM thực hiện tại thời điểm **Runtime** bằng StringBuilder và tạo ra một đối tượng String mới toanh trên Heap.\n• Trong khi đó `s1` nằm trong String Constant Pool. Hai đối tượng ở hai địa chỉ ô nhớ khác nhau so sánh `==` chắc chắn ra `false`!\n✅ Kết quả: `false` (Nếu dùng `.equals()` thì mới ra `true`).",
    },
    {
      id: "ai2_q18",
      topic: "static",
      text: "When is a static variable initialized in Java?",
      textVi: "Một biến static được khởi tạo vào thời điểm nào trong vòng đời chương trình Java?",
      options: [
        "Every time an instance of the class is created with 'new'.",
        "When the class is loaded into memory by the JVM ClassLoader, before any object is created.",
        "When the garbage collector runs.",
        "When a method using that variable is called for the second time.",
      ],
      optionsVi: [
        "Mỗi lần một đối tượng được tạo ra bằng từ khóa new.",
        "Khi lớp (class) được nạp vào bộ nhớ bởi JVM ClassLoader, trước khi bất kỳ đối tượng nào được sinh ra.",
        "Khi bộ thu gom rác Garbage Collector bắt đầu dọn dẹp.",
        "Khi phương thức sử dụng biến đó được gọi lần thứ hai.",
      ],
      answer: 1,
      explanation:
        "💡 Vòng đời của Biến Static:\n• Biến `static` (biến cấp độ lớp) chỉ được khởi tạo **DUY NHẤT 1 LẦN** khi class đó được JVM nạp vào bộ nhớ (Class Loading).\n• Nó tồn tại xuyên suốt suốt thời gian chương trình chạy và chia sẻ chung cho mọi đối tượng của lớp đó.\n✅ Đáp án 2 hoàn toàn chính xác.",
    },
    {
      id: "ai2_q19",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class CharAtTrap {
    public static void main(String[] args) {
        String s = "Java";
        System.out.print(s.charAt(4));
    }
}`,
      options: [
        "Prints: a",
        "Prints: null",
        "Throws StringIndexOutOfBoundsException at runtime",
        "Prints nothing",
      ],
      optionsVi: [
        "In ra: a",
        "In ra: null",
        "Ném ra ngoại lệ StringIndexOutOfBoundsException lúc chạy",
        "Không in ra gì",
      ],
      answer: 2,
      explanation:
        "💡 Chỉ số chuỗi trong Java:\n• Chuỗi `\"Java\"` có độ dài `s.length() = 4`.\n• Các chỉ số hợp lệ bắt đầu từ 0 đến 3:\n  - `s.charAt(0)` = 'J'\n  - `s.charAt(1)` = 'a'\n  - `s.charAt(2)` = 'v'\n  - `s.charAt(3)` = 'a'\n• Khi gọi `s.charAt(4)`, chỉ số 4 nằm ngoài phạm vi chuỗi -> JVM lập tức ném ra ngoại lệ: **`StringIndexOutOfBoundsException`**!\n✅ Đáp án: `StringIndexOutOfBoundsException`.",
    },
    {
      id: "ai2_q20",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
      code: `class TestThis {
    int x = 10;
    static void printX() {
        // Line 1
    }
}`,
      options: [
        "System.out.println(this.x); is valid at Line 1",
        "System.out.println(new TestThis().x); is valid at Line 1",
        "System.out.println(x); is valid at Line 1",
        "All of the above are valid",
      ],
      optionsVi: [
        "Dòng lệnh 'System.out.println(this.x);' là hợp lệ tại Line 1",
        "Dòng lệnh 'System.out.println(new TestThis().x);' là hợp lệ tại Line 1",
        "Dòng lệnh 'System.out.println(x);' là hợp lệ tại Line 1",
        "Tất cả các dòng lệnh trên đều hợp lệ",
      ],
      answer: 1,
      explanation:
        "💡 Truy cập biến non-static từ phương thức static:\n• Phương thức `printX()` là `static`, nó không có đối tượng ngầm định nên:\n  - Không được dùng `this.x` (Lỗi biên dịch).\n  - Không được gọi thẳng tên biến `x` (Lỗi biên dịch).\n• Cách duy nhất hợp lệ để truy cập biến instance `x` từ bên trong một static method là: **TỰ KHỞI TẠO MỘT ĐỐI TƯỢNG CỤ THỂ**: `new TestThis().x`!\n✅ Đáp án 2 là dòng lệnh hợp lệ duy nhất.",
    },
  ],
};

export const aiQuiz3 = {
  slug: "ai-quiz-3",
  title: "AI Quiz 3 – Exception, JDBC & Runtime Nâng Cao",
  description:
    "Do AI tạo dựa trên Quiz Day 3: Try-catch-finally return bẫy thi, PreparedStatement batch, checked vs unchecked exception, casting object.",
  color: "#f97316",
  icon: "🧠",
  order: 6,
  isAiGenerated: true,
  questions: [
    {
      id: "ai3_q01",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class FinallyReturn {
    static int calculate() {
        try {
            return 10;
        } finally {
            return 20;
        }
    }
    public static void main(String[] args) {
        System.out.print(calculate());
    }
}`,
      options: ["Prints: 10", "Prints: 20", "Prints: 30", "Compile-time error"],
      optionsVi: ["In ra: 10", "In ra: 20", "In ra: 30", "Lỗi lúc biên dịch"],
      answer: 1,
      explanation:
        "💡 Bẫy Lệnh `return` trong khối `finally`:\n• Quy tắc sắt của Java: Bất kể khối `try` hay `catch` có làm gì (dù đã gặp lệnh `return` hay ném Exception), khối `finally` **LUÔN LUÔN ĐƯỢC CHẠY** trước khi phương thức thực sự kết thúc.\n• Khi khối `finally` cũng chứa một lệnh `return 20;`, lệnh return này sẽ **GHI ĐÈ HOÀN TOÀN (chặn họng)** giá trị return của khối try trước đó!\n✅ Kết quả in ra: `20`.\n⚠️ Cảnh báo thực tế: Trong dự án thật không bao giờ nên đặt return trong finally vì nó sẽ làm nuốt mất ngoại lệ và kết quả mong muốn.",
    },
    {
      id: "ai3_q02",
      topic: "exception",
      text: "Which of the following is an UNCHECKED exception (RuntimeException) in Java?",
      textVi: "Ngoại lệ nào sau đây là UNCHECKED exception (kế thừa từ RuntimeException) trong Java?",
      options: [
        "java.io.IOException",
        "java.sql.SQLException",
        "java.lang.NullPointerException",
        "java.lang.ClassNotFoundException",
      ],
      optionsVi: [
        "java.io.IOException",
        "java.sql.SQLException",
        "java.lang.NullPointerException",
        "java.lang.ClassNotFoundException",
      ],
      answer: 2,
      explanation:
        "💡 Phân biệt Checked vs Unchecked Exception:\n• **Unchecked Exception**: Kế thừa từ `RuntimeException` (hoặc `Error`). Trình biên dịch KHÔNG BẮT BUỘC bạn phải try-catch. Chúng đại diện cho lỗi do lập trình cẩu thả: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException`.\n• **Checked Exception**: Kế thừa trực tiếp từ `Exception` nhưng không thuộc RuntimeException. Trình biên dịch BẮT BUỘC bạn phải xử lý (`try-catch` hoặc khai báo `throws`), ví dụ: `IOException`, `SQLException`, `ClassNotFoundException`.\n✅ `NullPointerException` là Unchecked Exception.",
    },
    {
      id: "ai3_q03",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class CatchOrder {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        } catch (Exception e) {
            System.out.print("Exception ");
        } catch (ArithmeticException e) {
            System.out.print("Arithmetic ");
        }
    }
}`,
      options: [
        "Prints: Arithmetic ",
        "Prints: Exception ",
        "Compile-time error: catch block for ArithmeticException is unreachable",
        "Runtime error",
      ],
      optionsVi: [
        "In ra: Arithmetic ",
        "In ra: Exception ",
        "Lỗi biên dịch: khối catch của ArithmeticException không bao giờ chạm tới được",
        "Lỗi lúc chạy",
      ],
      answer: 2,
      explanation:
        "💡 Quy tắc thứ tự các khối `catch`:\n• Trong Java, các khối `catch` được kiểm tra từ trên xuống dưới theo thứ tự xuất hiện.\n• Vì `Exception` là lớp cha của `ArithmeticException`, nên nếu đặt `catch (Exception e)` lên trước, nó sẽ nuốt chửng mọi lỗi, khiến khối `catch (ArithmeticException e)` bên dưới **KHÔNG BAO GIỜ CÓ CƠ HỘI ĐƯỢC CHẠY TỚI (Unreachable code)**!\n• Trình biên dịch Java phát hiện điều này và báo lỗi ngay lập tức lúc biên dịch.\n✅ Thứ tự đúng bắt buộc phải là: Bắt lớp con trước (`ArithmeticException`), rồi mới bắt lớp cha (`Exception`) sau cùng.",
    },
    {
      id: "ai3_q04",
      topic: "exception",
      text: "In Java 7's 'try-with-resources' statement, what interface must the resource implement to be automatically closed?",
      textVi: "Trong câu lệnh 'try-with-resources' từ Java 7, tài nguyên bắt buộc phải cài đặt (implement) interface nào để được tự động đóng lại?",
      options: [
        "java.lang.AutoCloseable or java.io.Closeable",
        "java.io.Serializable",
        "java.lang.Cloneable",
        "java.lang.Runnable",
      ],
      optionsVi: [
        "java.lang.AutoCloseable hoặc java.io.Closeable",
        "java.io.Serializable",
        "java.lang.Cloneable",
        "java.lang.Runnable",
      ],
      answer: 0,
      explanation:
        "💡 Cơ chế `try-with-resources`:\nCú pháp: `try (Connection conn = ...; Statement stmt = ...) { ... }`\n• Tự động gọi phương thức `.close()` giải phóng tài nguyên mà không cần phải viết khối `finally` thủ công.\n• Điều kiện duy nhất: Đối tượng khai báo trong ngoặc tròn `try(...)` bắt buộc phải là kiểu cài đặt interface **`java.lang.AutoCloseable`** (hoặc `java.io.Closeable`).\n✅ Đáp án 1 hoàn toàn chính xác.",
    },
    {
      id: "ai3_q05",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class SystemExitTest {
    public static void main(String[] args) {
        try {
            System.out.print("Try ");
            System.exit(0);
        } finally {
            System.out.print("Finally ");
        }
    }
}`,
      options: ["Prints: Try Finally ", "Prints: Try ", "Prints: Finally ", "Compile-time error"],
      optionsVi: ["In ra: Try Finally ", "In ra: Try ", "In ra: Finally ", "Lỗi biên dịch"],
      answer: 1,
      explanation:
        "💡 Trường hợp duy nhất khối `finally` BỊ ĐẦU HÀNG:\n• Mọi người thường nói 'khối finally luôn luôn chạy trong mọi hoàn cảnh'.\n• Tuy nhiên, có **DUY NHẤT 1 NGOẠI LỆ**: Khi trong khối try gọi lệnh `System.exit(0);` (hoặc JVM bị sập nguồn/crash).\n• Lệnh `System.exit(0)` ra lệnh cho hệ điều hành dừng ngay lập tức toàn bộ tiến trình Java Virtual Machine. Toàn bộ chương trình tắt ngúm ngay tại chỗ, khối `finally` không kịp chạy!\n✅ Kết quả chỉ in ra: `Try `.",
    },
    {
      id: "ai3_q06",
      topic: "jdbc",
      text: "Why is PreparedStatement safer against SQL Injection than a regular Statement?",
      textVi: "Tại sao PreparedStatement lại an toàn trước lỗ hổng SQL Injection hơn là Statement thông thường?",
      options: [
        "Because PreparedStatement automatically encrypts the database password.",
        "Because it treats user input strictly as parameters/data, pre-compiling the query structure before inserting values.",
        "Because it only works with read-only SELECT queries.",
        "Because it connects over HTTPS instead of TCP.",
      ],
      optionsVi: [
        "Vì PreparedStatement tự động mã hóa mật khẩu cơ sở dữ liệu.",
        "Vì nó coi dữ liệu người dùng nhập thuần túy là tham số (dữ liệu), biên dịch cố định cấu trúc câu lệnh SQL trước khi truyền giá trị vào.",
        "Vì nó chỉ hỗ trợ các câu truy vấn SELECT chỉ đọc.",
        "Vì nó kết nối qua giao thức HTTPS thay vì TCP.",
      ],
      answer: 1,
      explanation:
        "💡 Cơ chế chống SQL Injection của PreparedStatement:\n• Khi dùng `Statement` nối chuỗi: `\"SELECT * FROM users WHERE user = '\" + input + \"'\"` -> Hacker nhập `' OR '1'='1` sẽ làm thay đổi cấu trúc câu lệnh SQL của bạn.\n• Khi dùng `PreparedStatement` với dấu `?`: Câu lệnh SQL được Database phân tích cú pháp và biên dịch cấu trúc trước. Khi bạn truyền `setString(1, input)`, dù hacker có nhập bất kỳ ký tự đặc biệt nào thì Database vẫn coi đó là **MỘT CHUỖI VĂN BẢN ĐƠN THUẦN**, không bao giờ biến thành lệnh thực thi được!\n✅ Đáp án 2 chuẩn xác 100%.",
    },
    {
      id: "ai3_q07",
      topic: "jdbc",
      text: "What does the executeUpdate() method of Statement interface return?",
      textVi: "Phương thức executeUpdate() của interface Statement trả về giá trị gì?",
      options: [
        "A ResultSet containing the query results.",
        "An integer representing the number of rows affected by INSERT, UPDATE, or DELETE (or 0 for DDL statements).",
        "A boolean indicating whether the database connection is still open.",
        "void (no return value).",
      ],
      optionsVi: [
        "Một ResultSet chứa kết quả các dòng truy vấn.",
        "Một số nguyên biểu thị số dòng (rows) bị tác động bởi lệnh INSERT, UPDATE hoặc DELETE (hoặc 0 đối với các lệnh DDL).",
        "Một giá trị boolean cho biết kết nối CSDL còn mở hay không.",
        "void (không trả về giá trị gì).",
      ],
      answer: 1,
      explanation:
        "💡 Các phương thức thực thi trong JDBC:\n• `executeQuery(sql)`: Dùng cho lệnh `SELECT`, trả về đối tượng `ResultSet` chứa dữ liệu.\n• `executeUpdate(sql)`: Dùng cho các lệnh làm biến đổi dữ liệu (`INSERT`, `UPDATE`, `DELETE`), trả về kiểu **`int`** biểu thị số dòng bị thay đổi trong database (ví dụ cập nhật 5 bản ghi thì trả về 5).\n• `execute(sql)`: Dùng cho câu lệnh tổng quát, trả về boolean.\n✅ Đáp án 2 chính xác.",
    },
    {
      id: "ai3_q08",
      topic: "jdbc",
      text: "When a ResultSet is first returned by executeQuery(), where is the cursor initially positioned?",
      textVi: "Khi một ResultSet vừa được trả về từ executeQuery(), con trỏ (cursor) ban đầu nằm ở vị trí nào?",
      options: [
        "On the first row of data.",
        "Before the first row of data (requiring an initial call to rs.next()).",
        "On the last row of data.",
        "After the last row of data.",
      ],
      optionsVi: [
        "Ngay tại dòng đầu tiên của dữ liệu.",
        "Nằm ngay TRƯỚC dòng đầu tiên (bắt buộc phải gọi rs.next() lần đầu để trỏ vào dòng 1).",
        "Ngay tại dòng cuối cùng của dữ liệu.",
        "Nằm ngay sau dòng cuối cùng của dữ liệu.",
      ],
      answer: 1,
      explanation:
        "💡 Vị trí ban đầu của con trỏ ResultSet:\n• Khi ResultSet mới mở ra, con trỏ nằm ở vị trí đặc biệt gọi là **'Before First' (Trước dòng đầu tiên)**.\n• Lúc này nếu bạn cố tình gọi `rs.getString(1)` ngay sẽ bị lỗi `SQLException: Before start of result set`!\n• Đó là lý do vì sao trong JDBC, chúng ta luôn luôn phải viết vòng lặp: `while (rs.next()) { ... }` hoặc `if (rs.next()) { ... }` để di chuyển con trỏ vào dòng dữ liệu đầu tiên.\n✅ Đáp án: 'Before the first row of data'.",
    },
    {
      id: "ai3_q09",
      topic: "jdbc",
      text: "Which JDBC method is used to execute a batch of SQL queries simultaneously for high performance?",
      textVi: "Phương thức nào trong JDBC được dùng để thực thi một lô nhiều câu lệnh SQL cùng một lúc nhằm tăng hiệu năng?",
      options: [
        "executeBatch()",
        "executeAll()",
        "runBatchQueries()",
        "commitBatch()",
      ],
      optionsVi: [
        "executeBatch()",
        "executeAll()",
        "runBatchQueries()",
        "commitBatch()",
      ],
      answer: 0,
      explanation:
        "💡 Kỹ thuật Batch Processing trong JDBC:\nThay vì gửi 10.000 câu lệnh INSERT riêng lẻ qua mạng khiến database bị nghẽn:\n1. Dùng `stmt.addBatch()` để gom hàng loạt câu lệnh vào một thùng chứa.\n2. Gọi phương thức **`stmt.executeBatch()`** để gửi nguyên cả lô lệnh đi trong 1 lần duy nhất.\nPhương thức trả về một mảng số nguyên `int[]` chứa số dòng bị tác động của từng lệnh trong lô.\n✅ Phương thức chuẩn là `executeBatch()`.",
    },
    {
      id: "ai3_q10",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class UnboxingTrap {
    public static void main(String[] args) {
        Integer val = null;
        int x = val;
        System.out.print(x);
    }
}`,
      options: [
        "Prints: 0",
        "Prints: null",
        "Throws NullPointerException at runtime",
        "Compile-time error",
      ],
      optionsVi: [
        "In ra: 0",
        "In ra: null",
        "Ném ra ngoại lệ NullPointerException lúc chạy",
        "Lỗi lúc biên dịch",
      ],
      answer: 2,
      explanation:
        "💡 Bẫy Tự Động Mở Hộp (Auto-unboxing NullPointerException):\n• Dòng `int x = val;` cố tình gán một đối tượng Wrapper `Integer` cho biến nguyên thủy `int`.\n• Trình biên dịch Java sẽ tự động chuyển đổi lệnh này thành: `int x = val.intValue();`.\n• Nhưng vì biến `val` đang có giá trị là `null`, việc gọi phương thức `.intValue()` trên một tham chiếu null sẽ khiến JVM ném ra ngay lập tức lỗi: **`java.lang.NullPointerException`** tại thời điểm chạy!\n✅ Đáp án: `NullPointerException`.",
    },
    {
      id: "ai3_q11",
      topic: "jdbc",
      text: "In JDBC transaction management, what is a Savepoint used for?",
      textVi: "Trong quản lý giao dịch (Transaction) của JDBC, Savepoint được dùng để làm gì?",
      options: [
        "To save database credentials securely on disk.",
        "To mark an intermediate point within a transaction to allow partial rollback.",
        "To automatically commit queries after every 10 seconds.",
        "To backup database tables to an external file.",
      ],
      optionsVi: [
        "Để lưu thông tin đăng nhập database an toàn vào ổ cứng.",
        "Để đánh dấu một điểm mốc trung gian trong giao dịch, cho phép hoàn tác một phần (partial rollback) về điểm mốc đó.",
        "Để tự động commit các câu truy vấn sau mỗi 10 giây.",
        "Để sao lưu bảng dữ liệu ra file bên ngoài.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất Savepoint trong JDBC:\nThông thường lệnh `conn.rollback()` sẽ hủy sạch sành sanh 100% mọi thao tác từ đầu transaction.\nNếu bạn muốn: 'Bước 1 và 2 giữ lại, chỉ hủy bước 3 nếu bước 3 lỗi', bạn tạo một điểm mốc: `Savepoint sp1 = conn.setSavepoint();`.\nKhi xảy ra lỗi ở bước 3, bạn gọi: `conn.rollback(sp1);` -> Hệ thống sẽ hoàn tác về đúng mốc `sp1`, giữ nguyên kết quả của bước 1 và 2!\n✅ Đáp án 2 chính xác.",
    },
    {
      id: "ai3_q12",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class MultiCatch {
    public static void main(String[] args) {
        try {
            int a = Integer.parseInt("abc");
        } catch (NumberFormatException | ArithmeticException e) {
            System.out.print("Caught: " + e.getClass().getSimpleName());
        }
    }
}`,
      options: [
        "Prints: Caught: NumberFormatException",
        "Prints: Caught: ArithmeticException",
        "Compile-time error: multi-catch cannot catch these together",
        "Throws NumberFormatException unhandled",
      ],
      optionsVi: [
        "In ra: Caught: NumberFormatException",
        "In ra: Caught: ArithmeticException",
        "Lỗi biên dịch: cú pháp multi-catch không cho phép bắt 2 lỗi này cùng lúc",
        "Ngoại lệ NumberFormatException không được bắt",
      ],
      answer: 0,
      explanation:
        "💡 Khối Multi-Catch (từ Java 7):\n• Cú pháp `catch (Type1 | Type2 e)` cho phép bắt nhiều loại ngoại lệ trong cùng một khối catch bằng dấu gạch đứng `|`.\n• Lệnh `Integer.parseInt(\"abc\")` cố tình ép chữ 'abc' thành số nguyên -> Ném ra ngoại lệ `NumberFormatException`.\n• Khối multi-catch bắt được ngoại lệ này và in ra tên class ngoại lệ -> `Caught: NumberFormatException`.\n✅ Kết quả: `Caught: NumberFormatException`.",
    },
    {
      id: "ai3_q13",
      topic: "jdbc",
      text: "How do you retrieve the auto-generated primary key (e.g. AUTO_INCREMENT ID) after executing an INSERT statement in JDBC?",
      textVi: "Làm thế nào để lấy được khóa chính tự sinh (ví dụ ID AUTO_INCREMENT) sau khi thực thi câu lệnh INSERT trong JDBC?",
      options: [
        "Execute 'SELECT MAX(id) FROM table' immediately after.",
        "Use Statement.RETURN_GENERATED_KEYS flag and call stmt.getGeneratedKeys().",
        "Cast the Statement object to ResultSet.",
        "Check the return value of executeUpdate().",
      ],
      optionsVi: [
        "Chạy ngay một câu lệnh 'SELECT MAX(id) FROM table' ngay sau đó.",
        "Truyền cờ Statement.RETURN_GENERATED_KEYS khi tạo Statement và gọi stmt.getGeneratedKeys().",
        "Ép kiểu đối tượng Statement thành ResultSet.",
        "Kiểm tra giá trị số nguyên trả về từ executeUpdate().",
      ],
      answer: 1,
      explanation:
        "💡 Lấy khóa chính tự sinh an toàn trong JDBC:\nCách chuẩn mực và an toàn tuyệt đối trong môi trường nhiều người dùng (tránh bị trùng ID của người khác):\n1. Khởi tạo: `conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);`\n2. Chạy lệnh: `stmt.executeUpdate();`\n3. Lấy khóa vừa sinh: `ResultSet rs = stmt.getGeneratedKeys(); if (rs.next()) long newId = rs.getLong(1);`\n✅ Đáp án 2 là chuẩn kỹ thuật JDBC.",
    },
    {
      id: "ai3_q14",
      topic: "exception",
      text: "Which of the following is true regarding checked exception handling in a method?",
      textVi: "Phát biểu nào sau đây là ĐÚNG về việc xử lý checked exception trong một phương thức?",
      options: [
        "The method must either catch the exception with try-catch OR declare it with 'throws' in the method signature.",
        "The method can ignore checked exceptions completely without any syntax error.",
        "Checked exceptions can only be caught by RuntimeException catch blocks.",
        "The 'throws' keyword is used to throw an exception object inside the method body.",
      ],
      optionsVi: [
        "Phương thức bắt buộc phải hoặc là bắt ngoại lệ bằng try-catch HOẶC là khai báo 'throws' trên chữ ký phương thức.",
        "Phương thức có thể phớt lờ hoàn toàn checked exception mà không bị bất kỳ lỗi cú pháp nào.",
        "Checked exception chỉ có thể bị bắt bởi các khối catch của RuntimeException.",
        "Từ khóa 'throws' dùng để ném một đối tượng ngoại lệ bên trong thân hàm.",
      ],
      answer: 0,
      explanation:
        "💡 Quy tắc 'Bắt hoặc Khai báo' (Catch or Specify Requirement):\nVới mọi Checked Exception trong Java, trình biên dịch bắt buộc bạn phải chọn 1 trong 2 con đường:\n1. **Tự giải quyết tại chỗ**: Bọc code trong khối `try { ... } catch (CheckedException e) { ... }`.\n2. **Đùn đẩy trách nhiệm lên cấp trên**: Khai báo trên chữ ký hàm bằng từ khóa `throws CheckedException` để hàm nào gọi nó thì hàm đó tự lo.\nNếu không làm 1 trong 2, code sẽ bị lỗi biên dịch ngay lập tức!\n✅ Đáp án 1 hoàn toàn chính xác.",
    },
    {
      id: "ai3_q15",
      topic: "jdbc",
      text: "What is the primary benefit of using a Connection Pool (like HikariCP) in enterprise Java applications?",
      textVi: "Lợi ích lớn nhất của việc sử dụng Connection Pool (như HikariCP) trong các ứng dụng Java doanh nghiệp là gì?",
      options: [
        "It eliminates the need for SQL queries entirely.",
        "It reuses a pool of pre-established database connections, avoiding the expensive overhead of creating and closing physical TCP connections for every request.",
        "It automatically formats HTML responses.",
        "It converts MySQL queries into PostgreSQL queries.",
      ],
      optionsVi: [
        "Nó loại bỏ hoàn toàn sự cần thiết của các câu lệnh SQL.",
        "Nó tái sử dụng một nhóm kết nối CSDL đã được mở sẵn, tránh chi phí hao tổn tài nguyên rất lớn khi phải tạo mới và đóng kết nối TCP vật lý sau mỗi request.",
        "Nó tự động định dạng mã phản hồi HTML.",
        "Nó tự động chuyển đổi câu truy vấn MySQL sang PostgreSQL.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất Connection Pool (ví dụ HikariCP trong Spring Boot):\nViệc mở một kết nối vật lý tới Database rất tốn kém (bắt tay 3 bước TCP, xác thực tài khoản/mật khẩu, khởi tạo session tốn từ 50-200ms).\nConnection Pool duy trì sẵn ví dụ 10 kết nối mở sẵn. Khi có request tới, ứng dụng chỉ việc mượn 1 kết nối ra dùng, dùng xong trả lại vào hồ (pool) trong 0.1ms mà không hề đóng kết nối vật lý!\n✅ Đáp án 2 giải thích hoàn hảo lợi ích của Connection Pool.",
    },
    {
      id: "ai3_q16",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class TestCustom {
    static void checkAge(int age) {
        if (age < 18) {
            throw new ArithmeticException("Underage");
        }
        System.out.print("Valid ");
    }
    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (ArithmeticException e) {
            System.out.print(e.getMessage());
        }
    }
}`,
      options: ["Prints: Underage", "Prints: Valid Underage", "Prints: Valid ", "Compile-time error"],
      optionsVi: ["In ra: Underage", "In ra: Valid Underage", "In ra: Valid ", "Lỗi lúc biên dịch"],
      answer: 0,
      explanation:
        "💡 Luồng thực thi của lệnh `throw`:\n1. Gọi `checkAge(15)`: Vì `age < 18` là đúng, dòng lệnh `throw new ArithmeticException(\"Underage\");` được thực thi.\n2. Lệnh `throw` lập tức ngắt ngang luồng chạy của hàm `checkAge`, dòng lệnh `System.out.print(\"Valid \");` bên dưới KHÔNG BAO GIỜ ĐƯỢC CHẠY TỚI.\n3. Ngoại lệ được ném ra ngoài và rơi trúng khối `catch (ArithmeticException e)` trong main.\n4. Hàm `e.getMessage()` lấy ra chuỗi thông điệp truyền lúc khởi tạo -> in ra chữ `Underage`.\n✅ Kết quả: `Underage`.",
    },
    {
      id: "ai3_q17",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class Base {
    Number getNumber() { return 1; }
}
class Sub extends Base {
    Integer getNumber() { return 2; }
}
public class TestCovariant {
    public static void main(String[] args) {
        Base b = new Sub();
        System.out.print(b.getNumber());
    }
}`,
      options: ["Prints: 2", "Prints: 1", "Compile-time error: return type mismatch", "Runtime error"],
      optionsVi: ["In ra: 2", "In ra: 1", "Lỗi biên dịch: kiểu trả về không khớp", "Lỗi lúc chạy"],
      answer: 0,
      explanation:
        "💡 Covariant Return Type kết hợp Đa hình lúc chạy:\n• Lớp cha `Base` trả về `Number`. Lớp con `Sub` override và trả về `Integer` (vì `Integer` là lớp con của `Number`). Đây là Covariant Return Type hoàn toàn hợp lệ trong Java!\n• Khi thực thi lệnh `b.getNumber()` với `Base b = new Sub();`: Đa hình lúc chạy (Dynamic Method Dispatch) sẽ tìm và gọi phương thức override của đối tượng thực tế `Sub`.\n• Phương thức của `Sub` trả về số `2` và in ra màn hình.\n✅ Kết quả in ra: `2`.",
    },
    {
      id: "ai3_q18",
      topic: "jdbc",
      text: "Which JDBC interface represents the physical connection with a specific database?",
      textVi: "Interface nào trong JDBC đại diện cho kết nối vật lý thực tế với một cơ sở dữ liệu cụ thể?",
      options: ["java.sql.Connection", "java.sql.DriverManager", "java.sql.Statement", "java.sql.Driver"],
      optionsVi: ["java.sql.Connection", "java.sql.DriverManager", "java.sql.Statement", "java.sql.Driver"],
      answer: 0,
      explanation:
        "💡 `java.sql.Connection` đại diện cho một phiên làm việc (session) kết nối vật lý với Database. Từ đối tượng `Connection` này, bạn có thể tạo Statement, quản lý transaction (`commit`, `rollback`), hoặc lấy metadata của CSDL.",
    },
    {
      id: "ai3_q19",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `public class FinallyException {
    static void test() {
        try {
            throw new NullPointerException("First");
        } finally {
            throw new RuntimeException("Second");
        }
    }
    public static void main(String[] args) {
        try {
            test();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }
    }
}`,
      options: ["Prints: Second", "Prints: First", "Prints: First Second", "Compile-time error"],
      optionsVi: ["In ra: Second", "In ra: First", "In ra: First Second", "Lỗi lúc biên dịch"],
      answer: 0,
      explanation:
        "💡 Ngoại lệ bị che khuất (Exception Masking / Suppression) trong `finally`:\n• Trong khối `try`, một `NullPointerException(\"First\")` được ném ra.\n• Trước khi ngoại lệ đó bay ra ngoài, khối `finally` bắt buộc phải chạy.\n• Nhưng trong khối `finally`, một ngoại lệ mới `RuntimeException(\"Second\")` lại được ném ra tiếp!\n• Ngoại lệ mới này sẽ đè bẹp và nuốt mất hoàn toàn ngoại lệ cũ ban đầu (`First`). Kết quả ngoại lệ duy nhất bay ra ngoài cho hàm `main` bắt được là `Second`!\n✅ Kết quả: `Second`.",
    },
    {
      id: "ai3_q20",
      topic: "jdbc",
      text: "What happens if you do not close a ResultSet or Statement after finishing database operations?",
      textVi: "Điều gì sẽ xảy ra nếu bạn không đóng ResultSet hoặc Statement sau khi thực hiện xong thao tác với cơ sở dữ liệu?",
      options: [
        "Database cursor leak and connection pool resource exhaustion, potentially locking or crashing the database server.",
        "Nothing, Java Garbage Collector automatically closes database cursors immediately.",
        "The database automatically deletes the table.",
        "A compile-time error occurs.",
      ],
      optionsVi: [
        "Rò rỉ con trỏ (cursor leak) và cạn kiệt tài nguyên của connection pool, có thể dẫn đến treo hoặc sập máy chủ cơ sở dữ liệu.",
        "Không sao cả, bộ thu gom rác Garbage Collector của Java luôn tự động đóng con trỏ CSDL ngay lập tức.",
        "Cơ sở dữ liệu sẽ tự động xóa bảng đó đi.",
        "Sẽ bị lỗi lúc biên dịch.",
      ],
      answer: 0,
      explanation:
        "💡 Rò rỉ tài nguyên (Resource Leak) trong JDBC:\n• Mỗi đối tượng `Statement` và `ResultSet` khi mở ra đều chiếm một con trỏ (Cursor) và bộ đệm (Buffer) trên Database Server.\n• Bộ thu gom rác (Garbage Collector) của Java chỉ dọn dẹp bộ nhớ RAM trên máy tính của bạn, nó **KHÔNG THỂ tự động gửi lệnh qua mạng để đóng con trỏ trên Database Server**!\n• Nếu hàng triệu request không chịu đóng (`close()`), Database Server sẽ bị cạn kiệt Cursor (`ORA-01000: maximum open cursors exceeded`), dẫn tới từ chối phục vụ hoặc sập server!\n✅ Đáp án 1 là cảnh báo sống còn trong phát triển phần mềm.",
    },
  ],
};

export const ALL_AI_QUIZZES = [aiQuiz1, aiQuiz2, aiQuiz3];
