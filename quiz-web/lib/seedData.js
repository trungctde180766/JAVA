// Dữ liệu gốc của 3 bộ đề (chép lại từ ảnh chụp).
// - Quiz 2 và Quiz Day 3 đã đối chiếu với Answer Key trong ảnh.
// - Quiz 1: đáp án lấy từ ảnh thống kê (câu 12-17) + tự giải.
// Dữ liệu này chỉ dùng để seed DB lần đầu; sau đó admin có thể sửa trong trang quản trị.

export const TOPICS = {
  oop: "OOP cơ bản",
  constructor: "Constructor & Kế thừa",
  polymorphism: "Overloading / Overriding",
  modifier: "Access & Non-access Modifier",
  interface: "Interface & Abstract",
  static: "Static & Biến",
  string: "String & StringBuffer",
  jdbc: "JDBC",
  exception: "Exception & Runtime",
};

const RUN = "What is the result of attempting to compile and run the program?";

const quiz1 = {
  slug: "quiz-1",
  title: "Quiz 1 – OOP & Modifiers",
  description:
    "Polymorphism, Inheritance, Overloading/Overriding, Access modifier, Interface, Abstract class.",
  color: "#7c5cff",
  icon: "🧩",
  order: 1,
  questions: [
    {
      id: "q01",
      topic: "oop",
      text: "In OOP, Polymorphism appears:",
      options: [
        "When one object acquires all the properties and behaviours of parent object",
        "When one task is performed by different ways",
        "When hiding internal details and showing functionality",
        "When binding (or wrapping) code and data together into a single unit",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất kiến thức:\nĐa hình (Polymorphism) bắt nguồn từ tiếng Hy Lạp (Poly = nhiều, Morph = hình thái), thể hiện nguyên lý: 'Một thông điệp / hành động nhưng được thực hiện theo nhiều cách khác nhau tùy theo đối tượng tiếp nhận'.\nTrong Java có 2 cơ chế đa hình:\n1. Compile-time Polymorphism (Đa hình lúc biên dịch): Thực hiện qua Method Overloading (cùng tên, khác tham số).\n2. Runtime Polymorphism (Đa hình lúc chạy): Thực hiện qua Method Overriding (lớp con định nghĩa lại phương thức của lớp cha, JVM quyết định method nào dựa trên đối tượng thực tế trong Heap thông qua Dynamic Method Dispatch).\n\n❌ Phân tích các đáp án còn lại:\n• (A) 'When one object acquires all the properties...': Đây là Tính Kế Thừa (Inheritance - quan hệ IS-A).\n• (C) 'When hiding internal details and showing functionality': Đây là Tính Trừu Tượng (Abstraction - ẩn giấu logic phức tạp qua Interface / Abstract class).\n• (D) 'When binding code and data together': Đây là Tính Đóng Gói (Encapsulation - gom thuộc tính private và cấp getter/setter).\n\n⚠️ Lưu ý thi & phỏng vấn: Thuộc tính (field/variable) trong Java KHÔNG có tính đa hình, chỉ có phương thức mới có tính đa hình.",
    },
    {
      id: "q02",
      topic: "oop",
      text: "A class in Java can contain",
      options: ["Fields", "Methods", "Constructors", "Nested class and interface", "All of the above are TRUE"],
      answer: 4,
      explanation:
        "💡 Bản chất kiến thức:\nTheo chuẩn Java Language Specification (JLS), một Class trong Java là một bản thiết kế (blueprint) toàn diện và có thể chứa đầy đủ các thành phần sau:\n1. Fields (Thuộc tính / biến thành viên): Biến static hoặc biến instance.\n2. Methods (Phương thức): Chứa logic xử lý, gồm static và instance methods.\n3. Constructors (Hàm khởi tạo): Dùng để khởi tạo đối tượng khi gọi từ khóa `new`.\n4. Initialization Blocks: Khối static initialization `{}` hoặc instance initialization `{}`.\n5. Nested types: Gồm Nested class (static nested class, inner class, anonymous class) và Nested interface.\n\n❌ Vì tất cả 4 thành phần trên đều hoàn toàn hợp lệ trong cú pháp Java, đáp án chính xác là 'All of the above are TRUE'.",
    },
    {
      id: "q03",
      topic: "oop",
      text: "The ways to create an object in java are:",
      options: ["By new keyword", "By newInstance() method", "By clone() method", "All of the answers"],
      answer: 3,
      explanation:
        "💡 Bản chất kiến thức:\nTrong Java có tới 5 cách phổ biến để tạo một đối tượng (Object) trong bộ nhớ Heap:\n1. Từ khóa `new`: Cách phổ biến nhất (`Dog d = new Dog();`), gọi trực tiếp constructor.\n2. Reflection qua `newInstance()`: `Class.forName(\"Dog\").getDeclaredConstructor().newInstance();` (dùng nhiều trong các framework như Spring, Hibernate để tạo Bean động).\n3. Phương thức `clone()`: Tạo bản sao của một đối tượng hiện có mà không cần gọi constructor (yêu cầu class implement `Cloneable`).\n4. Deserialization: Tái tạo đối tượng từ luồng byte (`ObjectInputStream.readObject()`).\n5. Factory Methods / Builder Pattern.\n\n❌ Cả 3 cách liệt kê trong câu hỏi đều là chuẩn cú pháp Java, vì vậy chọn 'All of the answers'.",
    },
    {
      id: "q04",
      topic: "constructor",
      text: "Rules for creating java constructor:",
      options: [
        "A. Constructor name must be same as its class name",
        "B. Constructor must have no explicit return type",
        "C. Constructor must have no parameter",
        "D. All of the answers",
        "E. Only A and B are TRUE",
      ],
      answer: 4,
      explanation:
        "💡 Hai quy tắc bắt buộc của Constructor trong Java:\n1. Tên của constructor BẮT BUỘC phải trùng khớp 100% với tên class (phân biệt chữ hoa/thường).\n2. Constructor KHÔNG ĐƯỢC CÓ KIỂU TRẢ VỀ rõ ràng (kể cả từ khóa `void`).\n\n❌ Vì sao (C) sai:\n• Constructor HOÀN TOÀN CÓ THỂ CÓ THAM SỐ (gọi là Parameterized Constructor), ví dụ: `public Student(String name, int age) {}`. Việc có tham số giúp truyền dữ liệu khởi tạo ngay khi tạo object.\n\n⚠️ Bẫy thi trắc nghiệm: Nếu bạn vô tình viết kiểu trả về `public void Student() {}`, Java sẽ KHÔNG báo lỗi biên dịch mà nó sẽ biến hàm này thành một METHOD THÔNG THƯỜNG trùng tên với class. Khi bạn gọi `new Student()`, hàm `void Student()` sẽ không được thực thi!",
    },
    {
      id: "q05",
      topic: "constructor",
      text: "Inheritance in Java:",
      options: [
        "Represents the IS-A relationship, also known as parent-child relationship.",
        "Represents the HAS-A relationship, also known as parent-child relationship",
        "Is a mechanism in which you can not create new classes that are built upon existing classes.",
      ],
      answer: 0,
      explanation:
        "💡 Bản chất Kế thừa (Inheritance):\n• Kế thừa thể hiện quan hệ IS-A (Là một loại...): Ví dụ `Dog IS-A Animal`, `Car IS-A Vehicle`. Class con kế thừa các thuộc tính và hành vi có phạm vi truy cập thích hợp từ class cha.\n\n❌ Phân tích các đáp án sai:\n• 'Represents the HAS-A relationship': SAI. Quan hệ HAS-A (Có một...) là quan hệ Chứa (Composition / Aggregation), ví dụ: `Car HAS-A Engine` (Class Car chứa 1 trường thuộc tính kiểu Engine).\n• 'Is a mechanism in which you can not create new classes...': SAI HOÀN TOÀN về mặt định nghĩa, vì kế thừa chính là cơ chế CHO PHÉP tạo ra lớp mới dựa trên các lớp hiện có để tái sử dụng mã nguồn.",
    },
    {
      id: "q06",
      topic: "polymorphism",
      text: "Method Overloading in Java is known as",
      options: [
        "If a class has multiple methods having same name and same parameters",
        "If a class has multiple methods having different in parameters",
        "If a class has multiple methods having same name but different in parameters",
      ],
      answer: 2,
      explanation:
        "💡 Bản chất Nạp chồng phương thức (Method Overloading):\n• Method Overloading là hiện tượng trong cùng một class (hoặc thông qua kế thừa) có nhiều phương thức CÙNG TÊN nhưng KHÁC NHAU VỀ DANH SÁCH THAM SỐ (Method Signature khác nhau).\n• Khác nhau về tham số bao gồm:\n  1. Khác số lượng tham số: `sum(int, int)` vs `sum(int, int, int)`\n  2. Khác kiểu dữ liệu: `sum(int, int)` vs `sum(double, double)`\n  3. Khác thứ tự kiểu dữ liệu: `log(int, String)` vs `log(String, int)`\n\n❌ Phân tích các đáp án sai:\n• 'same name and same parameters': Nếu cùng tên và cùng tham số, compiler sẽ báo lỗi `method already defined in class`.\n• 'different in parameters': Thiếu điều kiện quan trọng nhất là phải CÙNG TÊN.",
    },
    {
      id: "q07",
      topic: "polymorphism",
      text: "The ways to overload the method in java:",
      options: [
        "By changing number of arguments",
        "By changing the data type of arguments",
        "All of the above",
        "None of the above",
      ],
      answer: 2,
      explanation:
        "💡 Hai cách hợp lệ để Overload method trong Java:\n1. Thay đổi số lượng tham số (Number of arguments).\n2. Thay đổi kiểu dữ liệu của tham số (Data type of arguments) hoặc thứ tự kiểu tham số.\n\n⚠️ Bẫy thi trắc nghiệm & phỏng vấn CỰC KỲ QUAN TRỌNG:\nCHỈ thay đổi kiểu trả về (Return Type) thì KHÔNG ĐƯỢC coi là Overloading. Trình biên dịch sẽ báo lỗi trùng lặp phương thức ngay lập tức! Ví dụ:\n`int get()` và `double get()` trong cùng class sẽ gây COMPILE ERROR vì khi gọi `get()`, compiler không biết bạn muốn nhận về kiểu gì.",
    },
    {
      id: "q08",
      topic: "polymorphism",
      text: "Method Overriding in Java is known as:",
      options: [
        "If a class has multiple methods having same name but different in parameters",
        "If subclass (child class) has the same method as declared in the parent class",
        "Represents HAS-A relationship",
        "Subclass provides the specific implementation of the method that has not been provided by one of its parent class",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất Ghi đè phương thức (Method Overriding):\n• Xảy ra giữa hai class có quan hệ kế thừa (cha - con).\n• Lớp con (subclass) định nghĩa lại phương thức ĐÃ ĐƯỢC KHAI BÁO ở lớp cha với CÙNG TÊN, CÙNG DANH SÁCH THAM SỐ và kiểu trả về tương thích (Covariant return type) nhằm thay đổi hoặc mở rộng hành vi của lớp cha.\n\n❌ Phân tích các đáp án sai:\n• (A) 'same name but different in parameters': Đây là Overloading.\n• (C) 'Represents HAS-A relationship': Overriding bắt buộc phải là quan hệ IS-A (Kế thừa).\n• (D) 'that has not been provided by one of its parent class': Sai vì method đó ĐÃ ĐƯỢC cung cấp ở lớp cha rồi.",
    },
    {
      id: "q09",
      topic: "polymorphism",
      text: "Rules for Java Method Overriding:",
      options: [
        "method must have same name as in the parent class",
        "method must have same parameter as in the parent class.",
        "There must be an IS-A relationship (inheritance).",
        "All of the above",
      ],
      answer: 3,
      explanation:
        "💡 Toàn bộ các quy tắc bắt buộc của Method Overriding:\n1. Tên phương thức ở lớp con phải trùng khớp với lớp cha.\n2. Danh sách tham số phải trùng khớp hoàn toàn (số lượng, kiểu, thứ tự).\n3. Bắt buộc phải có quan hệ kế thừa IS-A (`extends` hoặc `implements`).\n4. Access modifier của phương thức ở lớp con KHÔNG ĐƯỢC HẸP HƠN lớp cha (ví dụ cha là `protected` thì con phải là `protected` hoặc `public`, không thể là `private` hay `default`).\n5. Không được ném checked exception rộng hơn checked exception của phương thức lớp cha.\n\nDo cả 3 mệnh đề A, B, C đều là quy tắc chuẩn, ta chọn 'All of the above'.",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: "Can we override static method?",
      options: ["Yes", "No", "Sometimes Yes, Sometimes No"],
      answer: 1,
      explanation:
        "💡 Bản chất chuyên sâu về Static Method:\n• KHÔNG THỂ override phương thức `static` trong Java!\n• Lý do: Phương thức `static` thuộc về CLASS chứ không thuộc về đối tượng (object/instance). Nó được liên kết tĩnh ngay tại thời điểm biên dịch (Compile-time / Early Binding).\n• Trong khi đó, Overriding là đa hình lúc chạy (Runtime Polymorphism), đòi hỏi cơ chế Dynamic Method Dispatch dựa trên đối tượng thực tế trong bộ nhớ Heap.\n\n⚠️ Bẫy thi trắc nghiệm & phỏng vấn (Method Hiding):\nNếu lớp con viết một static method có tên và tham số giống hệt static method ở lớp cha, code VẪN BIÊN DỊCH ĐƯỢC, nhưng Java gọi đây là **METHOD HIDING** (che giấu phương thức), hoàn toàn không phải Overriding! Khi bạn gọi qua kiểu tham chiếu của lớp cha `Parent p = new Child(); p.staticMethod();`, phương thức của LỚP CHA vẫn sẽ chạy!",
    },
    {
      id: "q11",
      topic: "modifier",
      text: "The public access modifier is accessible:",
      options: [
        "within package and outside the package but through inheritance only.",
        "within package only.",
        "outside the package but through inheritance only.",
        "everywhere.",
      ],
      answer: 3,
      explanation:
        "💡 Bảng phân cấp phạm vi truy cập (Access Modifiers) trong Java:\n1. `private`: Chỉ truy cập được bên trong class khai báo (`within class only`).\n2. `default` (package-private): Trong cùng class và cùng package (`within package only`).\n3. `protected`: Trong cùng package + lớp con ở package khác thông qua kế thừa (`within package and outside the package through inheritance only`).\n4. `public`: Có phạm vi rộng nhất, truy cập được ở MỌI NƠI trong toàn bộ project (`everywhere`).",
    },
    {
      id: "q12",
      topic: "modifier",
      text: "The private access modifier is accessible:",
      options: [
        "within package only.",
        "within class only.",
        "outside the package but through inheritance only.",
        "everywhere.",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất của `private`:\n• `private` là mức độ bảo mật cao nhất trong Java, dùng để thực hiện Tính Đóng Gói (Encapsulation).\n• Các trường hoặc phương thức `private` CHỈ có thể được truy cập trực tiếp từ BÊN TRONG CÙNG MỘT CLASS (`within class only`).\n• Các lớp bên ngoài (kể cả lớp con kế thừa hay các lớp trong cùng package) đều không thể truy cập trực tiếp được mà phải thông qua các phương thức public/protected (getter/setter).",
    },
    {
      id: "q13",
      topic: "constructor",
      text: 'Do you agree with the following?: "Constructors in the class do not have the return type"',
      options: ["Right", "Wrong"],
      answer: 0,
      explanation:
        "💡 Bản chất:\n• ĐÚNG (Right). Constructor KHÔNG BAO GIỜ có kiểu trả về (kể cả `void`).\n• Cú pháp hợp lệ duy nhất: `[AccessModifier] ClassName([params]) { ... }`\n• Nếu bạn viết `public void MyClass()`, Java sẽ hiểu đây là một phương thức bình thường, làm mất đi tính chất của constructor.",
    },
    {
      id: "q14",
      topic: "oop",
      text: "Do you agree with the following?: Object Class is the superclass of all of the classes in Java.",
      options: ["Right", "Wrong"],
      answer: 0,
      explanation:
        "💡 Bản chất cây phả hệ trong Java:\n• ĐÚNG (Right). Lớp `java.lang.Object` là tổ tiên gốc (Root Class / Superclass tối cao) của mọi class trong Java.\n• Nếu một class không khai báo từ khóa `extends`, trình biên dịch sẽ tự động ngầm thêm `extends java.lang.Object`.\n• Ngay cả mảng (arrays) cũng kế thừa từ `Object`. Nhờ đó, mọi đối tượng trong Java đều mặc định có các phương thức cơ bản như: `toString()`, `equals()`, `hashCode()`, `getClass()`, `clone()`, `wait()`, `notify()`.",
    },
    {
      id: "q15",
      topic: "interface",
      text: "An abstract class can be declared with final modifier.",
      options: ["True", "False"],
      answer: 1,
      explanation:
        "💡 Mâu thuẫn logic triệt để giữa `abstract` và `final`:\n• `abstract` (trừu tượng): Là lớp chưa hoàn thiện, BẮT BUỘC PHẢI ĐƯỢC KẾ THỪA để lớp con cài đặt các phương thức trừu tượng.\n• `final`: Là lớp đóng, CẤM KHÔNG ĐƯỢC PHÉP KẾ THỪA (ví dụ: `String`, `Integer` là final class).\n→ Vì 2 từ khóa này mang ý nghĩa hoàn toàn triệt tiêu nhau, Java cấm kết hợp chúng. Khai báo `final abstract class A {}` sẽ bị lỗi biên dịch: `illegal combination of modifiers: abstract and final`.",
    },
    {
      id: "q16",
      topic: "interface",
      text: "If a class does not want to implement all the methods of Interface, what is this class?",
      options: ["Interface", "Normal class", "Abstract class", "None of the above"],
      answer: 2,
      explanation:
        "💡 Quy tắc cài đặt Interface:\n• Một class thông thường (concrete class) khi `implements` một interface thì BẮT BUỘC phải cài đặt (override và cung cấp thân code) cho 100% các abstract method của interface đó.\n• Nếu class đó KHÔNG MUỐN hoặc CHƯA THỂ cài đặt hết các phương thức, class đó BẮT BUỘC PHẢI ĐƯỢC KHAI BÁO LÀ `abstract class`.\n• Các phương thức còn thiếu sẽ được trì hoãn để các class con cụ thể kế thừa sau này cài đặt.",
    },
    {
      id: "q17",
      topic: "interface",
      text: "Which of the following is true?",
      options: [
        "An abstract method can not override an another abstract method.",
        "A specific method can not override an another abstract method.",
        "An abstract method can not be declared with the keyword throws.",
        "No sentences above are true",
      ],
      answer: 3,
      explanation:
        "💡 Phân tích tính đúng sai của từng câu:\n1. 'An abstract method can not override an another abstract method': SAI. Một abstract method HOÀN TOÀN CÓ THỂ override một abstract method khác (ví dụ: interface con ghi đè method của interface cha để đổi kiểu trả về Covariant return type hoặc thu hẹp throws clause).\n2. 'A specific method can not override an another abstract method': SAI. Đây chính là cách hoạt động cơ bản của OOP: một method cụ thể (concrete method) cài đặt và ghi đè abstract method.\n3. 'An abstract method can not be declared with the keyword throws': SAI. Abstract method hoàn toàn có thể khai báo `throws Exception` để quy định ngoại lệ mà lớp con được phép ném ra.\n→ Do cả 3 câu đều sai, đáp án đúng là 'No sentences above are true'.",
    },
    {
      id: "q18",
      topic: "exception",
      text: RUN,
      code: `class M {
    public static void main(String[] args) {
        String s = null;
        System.out.print(s);
    }
}`,
      options: ["Prints nothing.", "Prints: null", "Compile-time error", "Throw a NullPointerException"],
      answer: 1,
      explanation:
        "💡 Trace code & Phân tích cơ chế JVM:\n• Dòng 1: Biến chuỗi `s` được gán giá trị `null` (không trỏ tới đối tượng nào trên Heap).\n• Dòng 2: `System.out.print(s)` được gọi.\n• Bên trong phương thức `PrintStream.print(String s)`, nó gọi `String.valueOf(s)`.\n• Mã nguồn của `String.valueOf(Object obj)`:\n  `return (obj == null) ? \"null\" : obj.toString();`\n• Do đó, khi đối số là `null`, nó trả về chuỗi ký tự `\"null\"` và in ra màn hình chuỗi `null`.\n\n⚠️ Bẫy thường gặp: `NullPointerException` CHỈ xảy ra khi bạn gọi một phương thức hoặc thuộc tính trên biến null (ví dụ: `s.length()`, `s.toUpperCase()`, `s.charAt(0)`). Còn truyền biến null vào lệnh in thì hoàn toàn an toàn!",
    },
    {
      id: "q19",
      topic: "interface",
      text: RUN,
      code: `interface A {
    void m1();          // 1
    public void m2();   // 2
    static void m3();   // 3
    abstract void m4(); // 4
}`,
      options: ["Prints nothing.", "Prints: null", "Compile-time error", "Throw a NullPointerException"],
      answer: 2,
      explanation:
        "💡 Quy tắc về phương thức trong Interface (từ Java 8 trở đi):\n• Dòng 1 (`void m1();`): Hợp lệ (mặc định ngầm hiểu là `public abstract`).\n• Dòng 2 (`public void m2();`): Hợp lệ (khai báo rõ `public abstract`).\n• Dòng 3 (`static void m3();`): LỖI BIÊN DỊCH (Compile-time error)! Từ Java 8, interface cho phép static method nhưng BẮT BUỘC PHẢI CÓ THÂN HÀM `{ }` (implementation). Bạn không thể khai báo một static method mà không có thân hàm trong interface!\n• Dòng 4 (`abstract void m4();`): Hợp lệ.",
    },
    {
      id: "q20",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a constructor?",
      options: ["private", "abstract", "final", "None of the above"],
      answer: 0,
      explanation:
        "💡 Các Modifier dùng được cho Constructor:\n• Constructor CHỈ CÓ THỂ sử dụng 4 Access Modifier: `public`, `protected`, `default` (không ghi gì), và `private`.\n• `private constructor` được sử dụng rất phổ biến trong mẫu thiết kế Singleton Pattern hoặc trong Utility class (như `java.lang.Math`, `java.util.Collections`) để ngăn chặn việc khởi tạo đối tượng từ bên ngoài.\n\n❌ Các từ khóa KHÔNG BAO GIỜ được dùng cho constructor: `abstract`, `final`, `static`, `synchronized`, `native`.",
    },
    {
      id: "q21",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to the declaration of a field?",
      options: ["abstract", "final", "private", "static"],
      answer: 0,
      explanation:
        "💡 Phân tích Modifier cho Field (Thuộc tính):\n• `abstract` CHỈ DÀNH CHO Class và Method. Thuộc tính (field) đại diện cho dữ liệu cụ thể trong bộ nhớ, không có khái niệm 'thuộc tính trừu tượng' nên `abstract` KHÔNG THỂ áp dụng cho field.\n• Các modifier hợp lệ cho field: `private`, `protected`, `public`, `static`, `final`, `transient` (không serialize), `volatile` (đảm bảo visibility giữa các thread).",
    },
    {
      id: "q22",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to a method?",
      options: ["abstract", "private", "static", "None of the above"],
      answer: 3,
      explanation:
        "💡 Cả 3 modifier `abstract`, `private`, `static` đều có thể áp dụng cho method một cách hợp lệ trong ngữ cảnh thích hợp:\n• `abstract`: Dùng trong abstract class hoặc interface để khai báo phương thức trừu tượng.\n• `private`: Dùng cho phương thức nội bộ chỉ gọi trong class.\n• `static`: Dùng cho phương thức ở cấp độ lớp (Class method).\n→ Do không có modifier nào bị cấm áp dụng cho method trong số các đáp án trên, ta chọn 'None of the above'.",
    },
    {
      id: "q23",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to a constructor?",
      options: ["protected", "public", "private", "Static"],
      answer: 3,
      explanation:
        "💡 Constructor và từ khóa Static:\n• Constructor được gọi khi tạo một ĐỐI TƯỢNG CỤ THỂ (Instance) trong bộ nhớ Heap (`new ClassName()`).\n• Trong khi đó, `static` có nghĩa là thuộc về CLASS nói chung, tồn tại độc lập không cần đối tượng.\n• Do đó, Constructor KHÔNG THỂ LÀ STATIC! Nếu khai báo `static MyClass() {}`, trình biên dịch sẽ báo lỗi `modifier static not allowed here`.",
    },
    {
      id: "q24",
      topic: "interface",
      text: "Which of the following modifiers can be used with the abstract modifier in a method declaration?",
      options: ["final", "private", "protected", "Static"],
      answer: 2,
      explanation:
        "💡 Quy tắc tương thích với từ khóa `abstract`:\n• Bản chất của `abstract method` là CHƯA CÓ THÂN HÀM, bắt buộc phải được một lớp con nhìn thấy và Override lại.\n• `final`: Cấm override → Xung đột với abstract (Lỗi biên dịch).\n• `private`: Lớp con không nhìn thấy được để override → Xung đột với abstract (Lỗi biên dịch).\n• `static`: Không thể override bằng đa hình động → Xung đột với abstract (Lỗi biên dịch).\n• `protected`: Hoàn toàn hợp lệ! Cho phép các lớp con (kể cả ở package khác) nhìn thấy để override.",
    },
    {
      id: "q25",
      topic: "interface",
      text: "Which of the following modifiers can be used with the abstract modifier in a method declaration?",
      options: ["Static", "final", "private", "public"],
      answer: 3,
      explanation:
        "💡 Tương tự câu trên: `abstract method` chỉ có thể kết hợp với các mức truy cập cho phép lớp con kế thừa và override lại, cụ thể là `public`, `protected` hoặc `default` (package-private).\nCác từ khóa `static`, `final`, `private` đều mâu thuẫn hoàn toàn với nguyên lý hoạt động của `abstract`.",
    },
    {
      id: "q26",
      topic: "interface",
      text: "Compile-time errors are generated at which lines?",
      code: `interface A {
    void m1();          // 1
    public void m2();   // 2
    static void m3();   // 3
    abstract void m4(); // 4
}`,
      options: ["1", "2", "3", "4"],
      answer: 2,
      explanation:
        "💡 Phân tích từng dòng trong interface `A`:\n• Dòng 1 (`void m1();`): Hợp lệ (ngầm hiểu `public abstract`).\n• Dòng 2 (`public void m2();`): Hợp lệ.\n• Dòng 3 (`static void m3();`): LỖI BIÊN DỊCH. Trong Interface, `static method` bắt buộc phải có thân hàm `{ ... }`. Không được khai báo static method dạng abstract (thiếu thân hàm).\n• Dòng 4 (`abstract void m4();`): Hợp lệ.\n→ Lỗi biên dịch xảy ra tại dòng 3.",
    },
    {
      id: "q27",
      topic: "interface",
      text: "Compile-time errors are NOT generated at which lines?",
      code: `interface C {
    private void m1();    // 1
    public void m2();     // 2
    protected void m3();  // 3
    m4();                 // 4
}`,
      options: ["1", "2", "3", "None of the above"],
      answer: 1,
      explanation:
        "💡 Phân tích từng dòng của interface `C`:\n• Dòng 1 (`private void m1();`): LỖI BIÊN DỊCH. Từ Java 9, interface cho phép `private method`, nhưng BẮT BUỘC PHẢI CÓ THÂN HÀM `{}` để chia sẻ code giữa các default method. `private` không có thân hàm sẽ báo lỗi.\n• Dòng 2 (`public void m2();`): HOÀN TOÀN HỢP LỆ (Abstract method chuẩn của interface).\n• Dòng 3 (`protected void m3();`): LỖI BIÊN DỊCH. Mọi thành viên trong interface nhằm cung cấp giao tiếp bên ngoài nên KHÔNG ĐƯỢC PHÉP dùng `protected` (`modifier protected not allowed here`).\n• Dòng 4 (`m4();`): LỖI BIÊN DỊCH vì thiếu kiểu trả về (return type).\n→ Dòng duy nhất KHÔNG bị lỗi biên dịch là dòng 2.",
    },
    {
      id: "q28",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      options: ["abstract", "const", "final", "Private"],
      answer: 2,
      explanation:
        "💡 Bản chất Thuộc tính trong Interface:\n• Mọi biến/thuộc tính (field) khai báo trong một Interface trong Java ĐỀU MẶC ĐỊNH LÀ `public static final` (hằng số).\n• Dù bạn có viết các từ khóa này ra hay không, compiler sẽ tự động thêm vào.\n• Vì vậy, `final` là modifier hoàn toàn hợp lệ.\n• `abstract`: Thuộc tính không thể abstract.\n• `const`: Là từ khóa dành riêng (reserved keyword) nhưng không được dùng trong Java.\n• `private`: Thuộc tính trong interface không được phép private.",
    },
    {
      id: "q29",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      options: ["abstract", "static", "private", "protected"],
      answer: 1,
      explanation:
        "💡 Thuộc tính trong Interface luôn ngầm định là `public static final`.\nDo đó trong 4 lựa chọn, chỉ có `static` là hợp lệ. Các từ khóa `abstract`, `private`, `protected` đều bị trình biên dịch từ chối khi khai báo field trong interface.",
    },
    {
      id: "q30",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      options: ["public", "private", "protected", "No modifier"],
      answer: 0,
      explanation:
        "💡 Trong số các MODIFIER được liệt kê, chỉ có `public` là hợp lệ vì thuộc tính trong interface luôn là `public static final`.\nLưu ý: Mặc dù bạn có thể không ghi từ khóa nào (Java sẽ tự ngầm hiểu), nhưng 'No modifier' là trạng thái không khai báo, chứ bản thân nó không phải là một modifier cụ thể.",
    },
    {
      id: "q31",
      topic: "interface",
      text: "Which field declaration results in a compile-time error?",
      code: `interface A {
    int a = 1;                     // 1
    public static int c = 3;       // 2
    public static final int d = 4; // 3
}`,
      options: ["1", "2", "3", "None of the above"],
      answer: 3,
      explanation:
        "💡 Phân tích tính hợp lệ của cả 3 dòng:\n• Dòng 1 (`int a = 1;`): Trình biên dịch tự động chèn `public static final` → Hợp lệ.\n• Dòng 2 (`public static int c = 3;`): Khai báo rõ `public static`, compiler tự chèn thêm `final` → Hợp lệ.\n• Dòng 3 (`public static final int d = 4;`): Khai báo đầy đủ cả 3 từ khóa chuẩn → Hợp lệ.\n→ Cả 3 dòng đều biên dịch hoàn toàn thành công. Không có dòng nào bị lỗi → Chọn 'None of the above'.",
    },
    {
      id: "q32",
      topic: "polymorphism",
      text: RUN,
      code: `class X { String s1 = "X.s1"; String s2 = "X.s2"; }
public class Y extends X {
    String s1 = "Y.s1";
    public static void main(String[] args) {
        Y y = new Y();
        X x = (X) y;
        System.out.println(y.s1 + " " + y.s2 + " " + x.s1 + " " + x.s2);
    }
}`,
      options: [
        "Prints: Y.s1 X.s2 Y.s1 X.s2",
        "Prints: Y.s1 X.s2 X.s1 X.s2",
        "Prints: X.s1 X.s2 Y.s1 Y.s2",
        "Prints: X.s1 X.s2 X.s1 X.s2",
      ],
      answer: 1,
      explanation:
        "💡 NGUYÊN LÝ CỐT LÕI: FIELD HIDING (CHE GIẤU THUỘC TÍNH):\n• Trong Java, **THUỘC TÍNH (FIELDS) KHÔNG CÓ TÍNH ĐA HÌNH** (Variables are NOT polymorphic).\n• Thuộc tính được liên kết tại thời điểm BIÊN DỊCH dựa vào **KIỂU KHAI BÁO CỦA BIẾN (Reference Type)**, chứ không phụ thuộc vào đối tượng thực tế trong Heap!\n\n🔍 Trace từng biến:\n1. `y.s1`: Biến `y` khai báo kiểu `Y` → Lấy thuộc tính `s1` của lớp `Y` → in `\"Y.s1\"`.\n2. `y.s2`: Lớp `Y` không khai báo `s2`, nên kế thừa `s2` từ `X` → in `\"X.s2\"`.\n3. `x.s1`: Biến `x` khai báo kiểu `X` (`X x = (X) y;`) → Mặc dù đối tượng là `Y`, nhưng vì truy cập qua biến kiểu `X`, Java lấy thuộc tính `s1` của lớp `X` → in `\"X.s1\"`.\n4. `x.s2`: Biến `x` khai báo kiểu `X` → Lấy `s2` của lớp `X` → in `\"X.s2\"`.\n→ Kết quả ghép lại: `Y.s1 X.s2 X.s1 X.s2`.",
    },
    {
      id: "q33",
      topic: "polymorphism",
      text: RUN,
      code: `class A { String s1 = "A"; }
class B extends A { String s1 = "B"; }
class C extends B { String s1 = "C"; }
class D {
    static void m1(A x) { System.out.print(x.s1); }
    static void m1(B x) { System.out.print(x.s1); }
    static void m1(C x) { System.out.print(x.s1); }
    public static void main(String[] args) {
        A a; B b; C c;
        a = b = c = new C();
        m1(a); m1(b); m1(c);
    }
}`,
      options: ["Prints: AAA", "Prints: ABC", "Prints: CBA", "Prints: CCC"],
      answer: 1,
      explanation:
        "💡 Phân tích luồng thực thi (Trace code):\n1. Trong `main`, cả 3 biến `a`, `b`, `c` đều tham chiếu tới cùng một đối tượng `new C()` trong bộ nhớ Heap:\n   • Biến `a` có kiểu khai báo là `A`.\n   • Biến `b` có kiểu khai báo là `B`.\n   • Biến `c` có kiểu khai báo là `C`.\n2. Phương thức `m1` bị nạp chồng (Overloading). Việc chọn phiên bản `m1` nào được JVM/Compiler quyết định tại thời điểm BIÊN DỊCH dựa trên **KIỂU KHAI BÁO CỦA THAM SỐ TRUYỀN VÀO**:\n   • `m1(a)` → Gọi `m1(A x)` → In `x.s1` của A → In `\"A\"`.\n   • `m1(b)` → Gọi `m1(B x)` → In `x.s1` của B → In `\"B\"`.\n   • `m1(c)` → Gọi `m1(C x)` → In `x.s1` của C → In `\"C\"`.\n→ Kết quả in liên tiếp trên màn hình là: `ABC`.",
    },
    {
      id: "q34",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      options: ["private", "protected", "abstract", "static"],
      answer: 2,
      explanation:
        "💡 Quy tắc đối với Top-level Class (Lớp độc lập bên ngoài, không phải lồng trong class khác):\n• Chỉ được phép dùng 2 Access Modifier: `public` hoặc `default` (package-private, không ghi modifier).\n• Chỉ được phép dùng 2 Non-access Modifier: `abstract` (lớp trừu tượng) hoặc `final` (lớp không thể kế thừa).\n• `private`, `protected`, `static`: TUYỆT ĐỐI KHÔNG ĐƯỢC DÙNG cho top-level class! Chúng chỉ dùng được cho Inner class / Nested class.\n→ Trong 4 đáp án trên, chỉ có `abstract` là hợp lệ.",
    },
    {
      id: "q35",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      options: ["private", "protected", "static", "final"],
      answer: 3,
      explanation:
        "💡 Tương tự câu trên: Top-level class chỉ có thể sử dụng `public`, `default`, `abstract` hoặc `final`.\nVí dụ kinh điển trong thư viện chuẩn Java: `public final class String` hay `public final class Math` đều là các top-level final class (ngăn không cho bất kỳ ai kế thừa để đảm bảo tính bất biến và bảo mật).\nCác từ khóa `private`, `protected`, `static` bị cấm hoàn toàn.",
    },
    {
      id: "q36",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      options: ["private", "protected", "default (no modifier)", "static"],
      answer: 2,
      explanation:
        "💡 Top-level class chỉ có 2 mức độ truy cập:\n1. `public`: Cho phép mọi class ở mọi package truy cập.\n2. `default` (Package-private - không ghi từ khóa modifier nào trước class): Chỉ các class nằm trong CÙNG MỘT PACKAGE mới có thể thấy và sử dụng.\nCác từ khóa `private`, `protected`, `static` đều không được phép áp dụng cho top-level class.",
    },
    {
      id: "q37",
      topic: "interface",
      text: "Which of the following statements is true?",
      options: [
        "An abstract method can not be overridden by an abstract method.",
        "An instance method that is not abstract can not be overridden by an abstract method.",
        "An abstract method declaration can not include a throws clause.",
        "None of the above.",
      ],
      answer: 3,
      explanation:
        "💡 Phân tích kỹ từng mệnh đề:\n• (A) SAI: Một abstract method HOÀN TOÀN có thể bị override bởi một abstract method khác trong lớp con trừu tượng.\n• (B) SAI: Một method bình thường (concrete instance method) VẪN CÓ THỂ bị một lớp con abstract ghi đè và biến thành abstract method (ép các lớp cháu phải cài đặt lại theo cách khác).\n• (C) SAI: Abstract method hoàn toàn được phép có mệnh đề `throws`.\n→ Vì cả 3 câu trên đều sai sự thật, đáp án chính xác là 'None of the above.'",
    },
    {
      id: "q38",
      topic: "polymorphism",
      text: RUN,
      code: `class R {
    private void printS1() { System.out.print("R.printS1 "); }
    protected void printS2() { System.out.print("R.printS2 "); }
    protected void printS1S2() { printS1(); printS2(); }
}
class S extends R {
    private void printS1() { System.out.print("S.printS1 "); }
    protected void printS2() { System.out.print("S.printS2 "); }
    public static void main(String[] args) {
        new S().printS1S2();
    }
}`,
      options: [
        "Prints: R.printS1 R.printS2",
        "Prints: R.printS1 S.printS2",
        "Prints: S.printS1 R.printS2",
        "Prints: S.printS1 S.printS2",
      ],
      answer: 1,
      explanation:
        "💡 BẪY KINH ĐIỂN VỀ OVERRIDING VÀ PRIVATE METHOD:\n1. `printS1()` trong lớp `R` là `private`: Phương thức private KHÔNG ĐƯỢC KẾ THỪA bởi lớp con. Do đó, phương thức `printS1()` trong lớp `S` chỉ là một phương thức trùng tên hoàn toàn độc lập, KHÔNG PHẢI LÀ OVERRIDE!\n2. Khi gọi `new S().printS1S2()`:\n   • Phương thức `printS1S2()` được định nghĩa trong lớp `R`.\n   • Lệnh đầu tiên trong `printS1S2()` gọi `printS1()`. Vì `printS1()` là private trong `R`, trình biên dịch liên kết tĩnh ngay tại compile-time tới `R.printS1()` → In `\"R.printS1 \"`.\n3. Lệnh thứ hai trong `printS1S2()` gọi `printS2()`:\n   • `printS2()` là `protected` nên ĐƯỢC KẾ THỪA và ĐƯỢC LỚP S OVERRIDE.\n   • Tại thời điểm chạy (Runtime), đối tượng thực tế là `new S()`. Dynamic Method Dispatch sẽ gọi phương thức đã override của lớp `S` → In `\"S.printS2\"`.\n→ Kết quả cuối cùng in ra: `R.printS1 S.printS2`.",
    },
    {
      id: "q39",
      topic: "polymorphism",
      text: RUN,
      code: `abstract class D { String s1 = "D"; String getS1() { return s1; } }
class E extends D { String s1 = "E"; String getS1() { return s1; } }
class F {
    public static void main(String[] s) {
        D x = new E();
        System.out.print(x.s1 + x.getS1());
    }
}`,
      options: ["Prints: DD", "Prints: DE", "Prints: ED", "Prints: EE"],
      answer: 1,
      explanation:
        "💡 PHÂN BIỆT ĐA HÌNH GIỮA THUỘC TÍNH (FIELD) VÀ PHƯƠNG THỨC (METHOD):\n1. `D x = new E();`: Biến `x` có kiểu khai báo là `D`, nhưng trỏ tới đối tượng thực tế `new E()` trong Heap.\n2. `x.s1` (Thuộc tính):\n   • Thuộc tính KHÔNG CÓ ĐA HÌNH (Field Hiding). Java luôn chọn thuộc tính theo KIỂU KHAI BÁO CỦA BIẾN (`D x`).\n   • Do đó `x.s1` lấy giá trị từ lớp `D` → trả về `\"D\"`.\n3. `x.getS1()` (Phương thức):\n   • Phương thức có tính đa hình lúc chạy (Dynamic Binding).\n   • Java gọi phương thức override của ĐỐI TƯỢNG THỰC TẾ (`E`), phương thức `getS1()` của lớp `E` trả về `s1` của lớp `E` → trả về `\"E\"`.\n→ Ghép lại: `x.s1 + x.getS1()` in ra `\"DE\"`.",
    },
  ],
};

const quiz2 = {
  slug: "quiz-2",
  title: "Quiz 2 – final, static & String",
  description: "Constructor chaining, final, static, overloading resolution, String/StringBuffer.",
  color: "#00c2a8",
  icon: "⚡",
  order: 2,
  questions: [
    {
      id: "q01",
      topic: "constructor",
      text: "What is the output of these statements?",
      code: `class Animal {
    Animal() { System.out.print("Animal is created. "); }
}
class Dog extends Animal {
    Dog() { System.out.print("Dog is created. "); }
}
class TestSuper4 {
    public static void main(String[] args) {
        Dog d = new Dog();
    }
}`,
      options: [
        "Animal is created. Dog is created.",
        "Dog is created. Animal is created.",
        "Animal is created. Animal is created.",
        "Dog is created. Dog is created.",
      ],
      answer: 0,
      explanation:
        "Constructor class con luôn ngầm gọi super() ở dòng ĐẦU TIÊN → constructor Animal chạy trước, sau đó mới tới thân constructor Dog.",
    },
    {
      id: "q02",
      topic: "modifier",
      text: "The java final keyword can be used in many context. Final can be:",
      options: ["A. variable", "B. method", "C. class", "A and B only", "A, B and C"],
      answer: 4,
      explanation:
        "final dùng cho: biến (không gán lại), method (không override), class (không kế thừa) → cả A, B, C.",
    },
    {
      id: "q03",
      topic: "modifier",
      text: "Which of the following opinion is TRUE?",
      options: [
        "final method cannot be inherited and you cannot override it",
        "final method is inherited and you can override it",
        "final method is inherited but you cannot override it",
        "None of the above",
      ],
      answer: 2,
      explanation: "final method VẪN được kế thừa (class con gọi được) nhưng KHÔNG được override.",
    },
    {
      id: "q04",
      topic: "constructor",
      text: "Can we declare a constructor final?",
      options: [
        "No, because constructor is never inherited.",
        "Yes, because constructor is never inherited.",
        "Sometimes Yes, sometimes No",
      ],
      answer: 0,
      explanation:
        "Không. final dùng để chặn override, mà constructor vốn không được kế thừa nên không thể override → final vô nghĩa và bị lỗi biên dịch.",
    },
    {
      id: "q05",
      topic: "string",
      text: "In java, string objects are immutable. Immutable simply means:",
      options: [
        "String objects unmodifiable or unchangeable.",
        "Once string object is created its data or state can't be changed but a new string object is created.",
        "All of the above.",
        "None of the above.",
      ],
      answer: 2,
      explanation:
        "Immutable = không thể thay đổi. Mọi method như concat, replace, toUpperCase… đều trả về String MỚI, object cũ giữ nguyên → cả (a) và (b) đều đúng.",
    },
    {
      id: "q06",
      topic: "static",
      text: RUN,
      code: `class A {
    static int x;
    public static void main(String[] args) { // 1
        int y;                                // 2
        System.out.println("x=" + x);         // 3
        System.out.println("y=" + y);         // 4
    }
}`,
      options: [
        "Compile-time error at line 1",
        "Compile-time error at line 2",
        "Compile-time error at line 3",
        "Compile-time error at line 4",
      ],
      answer: 3,
      explanation:
        "Biến static/instance có giá trị mặc định (x = 0) nhưng BIẾN CỤC BỘ thì không. y chưa được gán mà đã dùng ở dòng 4 → lỗi “variable y might not have been initialized”.",
    },
    {
      id: "q07",
      topic: "static",
      text: RUN,
      code: `class M {
    int x;
    public static void main(String[] args) {
        int y = 0;                  // 1
        System.out.print(x + ",");  // 2
        System.out.print(y);        // 3
    }
}`,
      options: [
        "Prints: 0,0",
        "Compile-time error at line 1.",
        "Compile-time error at line 2.",
        "Compile-time error at line 3.",
      ],
      answer: 2,
      explanation:
        "x là biến instance (non-static), không thể truy cập trực tiếp trong method static main → lỗi ở dòng 2 “non-static variable x cannot be referenced from a static context”.",
    },
    {
      id: "q08",
      topic: "polymorphism",
      text: RUN,
      code: `class A { void m1() { System.out.print("A.m1"); } }
class B extends A {
    void m1() { System.out.print("B.m1"); }
    static void m1(String s) { System.out.print(s + ","); }
}
class C {
    public static void main(String[] args) {
        B.m1("main");
        new B().m1();
    }
}`,
      options: ["Prints: main,B.m1", "Prints: main, A.m1", "Compile-time error", "None of the above"],
      answer: 0,
      explanation:
        "m1(String) là static và khác chữ ký với m1() → đây là overload hợp lệ. B.m1(\"main\") in “main,”; new B().m1() gọi bản override của B → “B.m1”.",
    },
    {
      id: "q09",
      topic: "polymorphism",
      text: RUN,
      code: `class X { void m1(X x) { System.out.print("X"); } }
class Y extends X { void m1(Y y) { System.out.print("Y"); } }
class Z extends Y { void m1(Z z) { System.out.print("Z"); } }
public class W extends Z {
    void m1(W w) { System.out.print("W"); }
    public static void main(String[] args) {
        X x1 = new X(); Y y1 = new Y(); Z z1 = new Z(); W w1 = new W();
        w1.m1(x1); w1.m1(y1); w1.m1(z1);
    }
}`,
      options: ["Prints: XXX", "Prints: XYZ", "Prints: WWW", "Prints: XYZW"],
      answer: 1,
      explanation:
        "Mỗi m1 có tham số KHÁC nhau nên là overload (không phải override). W có đủ 4 bản m1(X), m1(Y), m1(Z), m1(W). Compiler chọn bản khớp nhất với kiểu đối số: x1→X, y1→Y, z1→Z → “XYZ”.",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: RUN,
      code: `class A { void m1(A a) { System.out.print("A"); } }
class B extends A { void m1(B b) { System.out.print("B"); } }
class C extends B { void m1(C c) { System.out.print("C"); } }
class D {
    public static void main(String[] args) {
        A c1 = new C(); B c2 = new C(); C c3 = new C(); C c4 = new C();
        c4.m1(c1); c4.m1(c2); c4.m1(c3);
    }
}`,
      options: ["Prints: AAA", "Prints: ABC", "Prints: CCC", "None of the above"],
      answer: 1,
      explanation:
        "c4 kiểu C nên thấy cả m1(A), m1(B), m1(C). Overload chọn theo KIỂU KHAI BÁO của đối số: c1 (A) → m1(A), c2 (B) → m1(B), c3 (C) → m1(C) → “ABC”.",
    },
    {
      id: "q11",
      topic: "polymorphism",
      text: RUN,
      code: `class G {
    static void m(Object x) { System.out.print("Object"); }
    static void m(String x) { System.out.print("String"); }
    public static void main(String[] args) { m(null); }
}`,
      options: ["Prints: Object", "Prints: String", "Compile-time error", "Run-time error"],
      answer: 1,
      explanation:
        "null hợp với cả Object và String; Java chọn method CỤ THỂ NHẤT. String là con của Object → gọi m(String). (Nếu có 2 overload ngang hàng như m(String) và m(Integer) thì sẽ lỗi ambiguous.)",
    },
    {
      id: "q12",
      topic: "string",
      text: RUN,
      code: `class F1 {
    static void m1(StringBuffer s1) {
        s1 = s1.append("B");
        System.out.print(s1);
    }
    static void m2(StringBuffer s1) {
        s1.append("C");
        System.out.print(s1);
    }
    public static void main(String[] s) {
        StringBuffer s1 = new StringBuffer("A");
        m1(s1); m2(s1);
        System.out.print(s1);
    }
}`,
      options: ["Prints: ABACA", "Prints: ABABAB", "Prints: ABABCAB", "Prints: ABABCABC"],
      answer: 3,
      explanation:
        "StringBuffer là MUTABLE, append sửa trực tiếp object.\n• m1: \"A\" → \"AB\", in AB\n• m2: \"AB\" → \"ABC\", in ABC\n• main: cùng object → in ABC\n→ AB + ABC + ABC = “ABABCABC”.",
    },
    {
      id: "q13",
      topic: "string",
      text: RUN,
      code: `class F {
    public static void main(String[] s) {
        String s1 = "A", s2 = " B ", s3 = "C";
        s2.trim();
        s3.concat("D");
        System.out.print(s1 + s2 + s3);
    }
}`,
      options: ["Prints: ABC", "Prints: A B C", "Prints: ABCD", "Prints: ABDC"],
      answer: 1,
      explanation:
        "String immutable: trim() và concat() trả về String MỚI nhưng không gán lại → s2 vẫn là \" B \", s3 vẫn là \"C\" → in “A B C”.",
    },
    {
      id: "q14",
      topic: "string",
      text: RUN,
      code: `public class F1 {
    public static void main(String[] s) {
        String s1 = new String("ABCD1234"), s2 = new String("1234EF");
        String s3 = s1.substring(4, 8), s4 = s2.substring(0, 4);
        System.out.println((s3 == s4) + "," + (s3 + s4).equals(s4 + s3));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      answer: 1,
      explanation:
        "s3 = \"1234\", s4 = \"1234\" nhưng là 2 object khác nhau tạo lúc runtime → == so sánh tham chiếu → false. s3+s4 = \"12341234\" = s4+s3 → equals → true.",
    },
    {
      id: "q15",
      topic: "string",
      text: RUN,
      code: `class F2 {
    public static void main(String[] args) {
        String s1 = "A", s2 = "a", s3 = "b";
        s1.toLowerCase();
        s3.replace('b', 'a');
        System.out.print((s1.equals(s2)) + "," + (s2.equals(s3)));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      answer: 0,
      explanation:
        "toLowerCase() và replace() không gán lại kết quả → s1 vẫn \"A\", s3 vẫn \"b\". \"A\".equals(\"a\") = false, \"a\".equals(\"b\") = false.",
    },
    {
      id: "q16",
      topic: "string",
      text: RUN,
      code: `class F3 {
    public static void main(String[] args) {
        String s1 = "XYZ";
        StringBuffer s2 = new StringBuffer(s1);
        System.out.print(s2.equals(s1) + "," + s1.equals(s2));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      answer: 0,
      explanation:
        "StringBuffer KHÔNG override equals (so sánh tham chiếu) → false. String.equals chỉ trả true khi đối số cũng là String → StringBuffer → false. (Muốn so nội dung dùng s1.contentEquals(s2).)",
    },
    {
      id: "q17",
      topic: "string",
      text: RUN,
      code: `class M {
    public static void main(String[] args) {
        StringBuffer sb1 = new StringBuffer("XYZ");
        StringBuffer sb2 = new StringBuffer("XYZ");
        System.out.print((sb1 == sb2) + "," + sb1.equals(sb2));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      answer: 0,
      explanation:
        "2 object khác nhau → == false. StringBuffer dùng equals của Object (so tham chiếu) → cũng false.",
    },
    {
      id: "q18",
      topic: "static",
      text: RUN,
      code: `class F {
    public int a;
    public static int b;
    public static void main(String[] in) {
        F f1 = new F(); F f2 = new F();
        f1.a++; f1.b++;
        System.out.print(f1.a + ", " + f1.b + ", " + f2.a + ", " + f2.b);
    }
}`,
      options: ["Prints: 0, 0, 0, 0", "Prints: 0, 1, 1, 1", "Prints: 1, 1, 1, 0", "Prints: 1, 1, 0, 1"],
      answer: 3,
      explanation:
        "a là biến instance → mỗi object 1 bản: f1.a = 1, f2.a = 0. b là static → DÙNG CHUNG cho mọi object: f1.b = f2.b = 1 → “1, 1, 0, 1”.",
    },
    {
      id: "q19",
      topic: "static",
      text: RUN,
      code: `class B {
    int x = 1, y = 2;
    public static void main(String[] args) {
        System.out.println(x + y);
    }
}`,
      options: ["Prints: x+y", "Prints: 12", "Prints: 3", "Compile-time error"],
      answer: 3,
      explanation: "x, y là biến instance, không dùng trực tiếp được trong static main → lỗi biên dịch.",
    },
    {
      id: "q20",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to the declaration of a field?",
      options: ["abstract", "final", "private", "Protected"],
      answer: 0,
      explanation: "abstract không áp dụng cho field (chỉ cho class/method).",
    },
  ],
};

const quiz3 = {
  slug: "quiz-day-3",
  title: "Quiz Day 3 – String, Overload & JDBC",
  description: "String immutable, overload resolution, ép kiểu, JDBC (Statement, ResultSet, Connection).",
  color: "#ff7a59",
  icon: "🚀",
  order: 3,
  questions: [
    {
      id: "q01",
      topic: "string",
      text: RUN,
      code: `class F {
    static void m1(String s1) {
        s1.replace('A', 'Y');
        System.out.print(s1);
    }
    static void m2(String s1) {
        s1 = s1.replace('A', 'Z');
        System.out.print(s1);
    }
    public static void main(String[] s) {
        String s1 = "A";
        m1(s1); m2(s1);
        System.out.print(s1);
    }
}`,
      options: ["Prints: AZZ", "Prints: YZA", "Prints: YAA", "Prints: AZA"],
      answer: 3,
      explanation:
        "• m1: replace không gán lại → in \"A\".\n• m2: gán s1 (biến cục bộ) = \"Z\" → in \"Z\".\n• main: s1 của main không đổi (Java truyền tham trị bản sao tham chiếu, String immutable) → in \"A\".\n→ “AZA”.",
    },
    {
      id: "q02",
      topic: "string",
      text: RUN,
      code: `class F {
    public static void main(String[] args) {
        String s1 = "X", s2 = "x", s3 = "y";
        s1.toLowerCase();
        s3.replace('y', 'x');
        System.out.print((s1.equals(s2)) + "," + (s2.equals(s3)));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      answer: 0,
      explanation: "Kết quả của toLowerCase/replace bị bỏ đi → s1 = \"X\", s3 = \"y\" → cả hai equals đều false.",
    },
    {
      id: "q03",
      topic: "string",
      text: RUN,
      code: `class F {
    public static void main(String[] args) {
        String s1 = "ABCDE";
        System.out.print(s1.substring(1, 2) + s1.substring(3));
    }
}`,
      options: ["Prints: AABC", "Prints: ACDE", "Prints: ABABC", "Prints: BDE"],
      answer: 3,
      explanation:
        "Index bắt đầu từ 0: A0 B1 C2 D3 E4. substring(1,2) lấy [1,2) = \"B\". substring(3) lấy từ 3 tới hết = \"DE\" → “BDE”.",
    },
    {
      id: "q04",
      topic: "string",
      text: RUN,
      code: `class F {
    public static void main(String[] args) {
        String a = "X", b = "Y", c = a + b, d = a + b;
        System.out.print(((a + b) == (a + b)) + ",");
        System.out.print((c == d) + ",");
        System.out.print(c.equals(d));
    }
}`,
      options: [
        "Prints: false,false,false",
        "Prints: false,false,true",
        "Prints: false,true,false",
        "Prints: false,true,true",
      ],
      answer: 1,
      explanation:
        "a, b là biến (không final) nên a + b được nối lúc RUNTIME, mỗi lần tạo object mới → == false, c == d false. Nội dung giống nhau → equals true.",
    },
    {
      id: "q05",
      topic: "string",
      text: RUN,
      code: `class M {
    public static void main(String[] args) {
        System.out.print(String.valueOf(1) + String.valueOf(2));
        String s1 = "S1";
        String s2 = s1.toString();
        System.out.print("," + (s1 == s2));
    }
}`,
      options: ["Prints: 3,false", "Prints: 3,true", "Prints: 12,false", "Prints: 12,true"],
      answer: 3,
      explanation:
        "String.valueOf(1) = \"1\", nối chuỗi với \"2\" → \"12\" (không phải cộng số). String.toString() trả về CHÍNH NÓ (return this) → s1 == s2 true.",
    },
    {
      id: "q06",
      topic: "string",
      text: "Which method of string class in java Returns a new string that is a substring of this string?",
      options: [
        "A. public String substring(int beginIndex, int endIndex)",
        "B. public String substring(int beginIndex)",
        "C. public boolean equalsIgnoreCase(String another)",
        "D. Both A & B",
      ],
      answer: 3,
      explanation: "Cả 2 overload substring(begin) và substring(begin, end) đều trả về chuỗi con mới. equalsIgnoreCase trả boolean.",
    },
    {
      id: "q07",
      topic: "string",
      text: RUN,
      code: `class F {
    public static void main(String[] args) {
        String s1 = "ABC";
        StringBuffer s2 = new StringBuffer(s1);
        System.out.print(s2.equals(s1) + "," + s1.equals(s2));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      answer: 0,
      explanation: "String và StringBuffer khác kiểu: StringBuffer.equals so tham chiếu, String.equals yêu cầu đối số là String → false,false.",
    },
    {
      id: "q08",
      topic: "polymorphism",
      text: RUN,
      code: `class A {} class B extends A {} class C extends B {}
class D {
    void m1(A a) { System.out.print("A"); }
    void m1(B b) { System.out.print("B"); }
    void m1(C c) { System.out.print("C"); }
    public static void main(String[] args) {
        A c1 = new C(); B c2 = new C(); C c3 = new C(); D d1 = new D();
        d1.m1(c1); d1.m1(c2); d1.m1(c3);
    }
}`,
      options: ["Prints: AAA", "Prints: ABC", "Prints: CCC", "None of the above"],
      answer: 1,
      explanation:
        "Overload được chọn lúc biên dịch theo KIỂU KHAI BÁO, không phải object thật: c1 khai báo A → m1(A), c2 → m1(B), c3 → m1(C) → “ABC”.",
    },
    {
      id: "q09",
      topic: "polymorphism",
      text: RUN,
      code: `class A { void m1(A a) { System.out.print("A"); } }
class B extends A { void m1(B b) { System.out.print("B"); } }
class C extends B { void m1(C c) { System.out.print("C"); } }
class D {
    public static void main(String[] args) {
        A c1 = new C(); C c2 = new C();
        c1.m1(c2);
    }
}`,
      options: ["Prints: A", "Prints: B", "Prints: C", "None of the above"],
      answer: 0,
      explanation:
        "c1 khai báo kiểu A → compiler chỉ thấy m1(A a). m1(B), m1(C) là overload mới (khác tham số) chứ không override m1(A) → lúc chạy vẫn gọi m1(A) → in “A”.",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: RUN,
      code: `class A { void m1(A a) { System.out.print("A"); } }
class B extends A { void m1(B b) { System.out.print("B"); } }
class C extends B { void m1(C c) { System.out.print("C"); } }
class D {
    public static void main(String[] args) {
        A a1 = new A(); A b1 = new B(); A c1 = new C(); C c4 = new C();
        a1.m1(c4); b1.m1(c4); c1.m1(c4);
    }
}`,
      options: ["Prints: AAA", "Prints: ABC", "Prints: CCC", "Compile-time error"],
      answer: 0,
      explanation:
        "a1, b1, c1 đều KHAI BÁO kiểu A → chỉ thấy m1(A). Không class nào override m1(A) (B, C chỉ overload) → cả 3 lần đều in “A” → “AAA”.",
    },
    {
      id: "q11",
      topic: "polymorphism",
      text: RUN,
      code: `class A { void m1(A a) { System.out.print("A"); } }
class B extends A { void m1(B b) { System.out.print("B"); } }
class C extends B { void m1(C c) { System.out.print("C"); } }
class D {
    public static void main(String[] args) {
        A a1 = new A(); B b1 = new A(); C c1 = new A(); C c2 = new C();
        c2.m1(a1); c2.m1(b1); c2.m1(c1);
    }
}`,
      options: ["Prints: AAA", "Prints: ABC", "Prints: CCC", "Compile-time error"],
      answer: 3,
      explanation:
        "B b1 = new A(); và C c1 = new A(); là gán object CHA cho biến kiểu CON → không ép kiểu ngầm được → lỗi biên dịch “incompatible types”.",
    },
    {
      id: "q12",
      topic: "jdbc",
      text: "The performance of the application will be faster if you use PreparedStatement because query is compiled only once",
      options: ["True", "False"],
      answer: 0,
      explanation:
        "Đúng. PreparedStatement được biên dịch trước (precompiled) 1 lần, chạy lại nhiều lần chỉ cần đổi tham số → nhanh hơn và còn chống SQL Injection.",
    },
    {
      id: "q13",
      topic: "jdbc",
      text: "Which Indicates a result set that cannot be updated programmatically in concurrency?",
      options: ["CONCUR_UPDATABLE", "CONCUR_READ_ONLY", "All of the above", "None of the above"],
      answer: 1,
      explanation: "ResultSet.CONCUR_READ_ONLY = chỉ đọc, không cập nhật được. CONCUR_UPDATABLE thì cho phép updateXXX().",
    },
    {
      id: "q14",
      topic: "jdbc",
      text: "Which is used to call the stored procedures and functions?",
      options: ["CallableStatement Interface", "PreparedStatement Interface", "All the above", "None of the above"],
      answer: 0,
      explanation: "CallableStatement (conn.prepareCall(\"{call proc(?)}\")) dùng để gọi stored procedure/function.",
    },
    {
      id: "q15",
      topic: "jdbc",
      text: "Which is a type of Resultset?",
      options: ["TYPE_FORWARD_ONLY", "TYPE_SCROLL_INSENSITIVE", "TYPE_SCROLL_SENSITIVE", "ALL ABOVE"],
      answer: 3,
      explanation:
        "ResultSet có 3 type: FORWARD_ONLY (chỉ đi tới, mặc định), SCROLL_INSENSITIVE (cuộn được, không thấy thay đổi DB), SCROLL_SENSITIVE (cuộn được, thấy thay đổi).",
    },
    {
      id: "q16",
      topic: "jdbc",
      text: "Which method of Class class is used to register and load the driver class.",
      options: ["forName()", "getConnection()", "createStatement()", "executeQuery()"],
      answer: 0,
      explanation:
        "Class.forName(\"com.mysql.cj.jdbc.Driver\") nạp và đăng ký driver. getConnection thuộc DriverManager, createStatement thuộc Connection, executeQuery thuộc Statement.",
    },
    {
      id: "q17",
      topic: "jdbc",
      text: "In Connection interface which method Drops all changes made since the previous commit?",
      options: ["public void rollback()", "public void commit()", "public void close()", "public Statement createStatement()"],
      answer: 0,
      explanation: "rollback() hủy mọi thay đổi kể từ lần commit gần nhất. commit() thì lưu vĩnh viễn.",
    },
    {
      id: "q18",
      topic: "jdbc",
      text: "Which interface provides methods to execute queries with the database?",
      options: ["Connection", "Statement", "ResultSet", "None of the above"],
      answer: 1,
      explanation:
        "Statement cung cấp executeQuery(), executeUpdate(), execute(). Connection dùng để tạo Statement, ResultSet chứa kết quả trả về.",
    },
    {
      id: "q19",
      topic: "exception",
      text: "What will be the output of the program? (Command line: java StringTest red green blue)",
      code: `public class StringTest {
    public static void main(String[] args) {
        String str1 = args[1];
        String str2 = args[2];
        String str3 = args[3];
        System.out.println("str3 = " + str3);
    }
}
// Command line invocation:
// > java StringTest red green blue`,
      options: ["str3 =", "str3 = null", "str3 = blue", "Runtime Exception"],
      answer: 3,
      explanation:
        "args = {\"red\", \"green\", \"blue\"} → chỉ có index 0..2. args[3] vượt chỉ số → ArrayIndexOutOfBoundsException lúc chạy.",
    },
    {
      id: "q20",
      topic: "polymorphism",
      text: RUN,
      code: `abstract class D { String s1 = "D"; String getS1() { return s1; } }
class E extends D { String s1 = "E"; String getS1() { return s1; } }
class F {
    public static void main(String[] s) {
        D x = new E();
        System.out.print(x.s1 + x.getS1());
    }
}`,
      options: ["Prints: DD", "Prints: DE", "Prints: ED", "Prints: EE"],
      answer: 1,
      explanation:
        "Field chọn theo kiểu khai báo (D) → \"D\"; method override chọn theo object thật (E) → \"E\" → “DE”.",
    },
    {
      id: "q21",
      topic: "polymorphism",
      text: RUN,
      code: `class A { String s1 = "A"; }
class B extends A { String s1 = "B"; }
class C extends B { String s1 = "C"; }
class D {
    static void m1(A x) { System.out.print(x.s1); }
    static void m1(B x) { System.out.print(x.s1); }
    static void m1(C x) { System.out.print(x.s1); }
    public static void main(String[] args) {
        A a; B b; C c;
        a = b = c = new C();
        m1(a); m1(b); m1(c);
    }
}`,
      options: ["Prints: AAA", "Prints: ABC", "Prints: CBA", "Prints: CCC"],
      answer: 1,
      explanation:
        "Overload chọn theo kiểu khai báo của a, b, c → m1(A), m1(B), m1(C). Field x.s1 chọn theo kiểu tham số → “ABC”.",
    },
  ],
};

import { ALL_INTERVIEW_QUIZZES } from "./interviewData.js";

export const SEED_QUIZZES = [quiz1, quiz2, quiz3, ...ALL_INTERVIEW_QUIZZES];
