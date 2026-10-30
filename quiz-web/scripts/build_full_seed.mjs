import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDb } from "../lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RUN = "What is the result of attempting to compile and run the program?";
const RUN_VI = "Kết quả khi biên dịch và chạy chương trình sau là gì?";

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

export const quiz1 = {
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
      textVi: "Trong lập trình hướng đối tượng (OOP), Tính Đa hình (Polymorphism) thể hiện khi:",
      options: [
        "When one object acquires all the properties and behaviours of parent object",
        "When one task is performed by different ways",
        "When hiding internal details and showing functionality",
        "When binding (or wrapping) code and data together into a single unit",
      ],
      optionsVi: [
        "Một đối tượng nhận được tất cả các thuộc tính và hành vi của đối tượng cha",
        "Một nhiệm vụ/hành động được thực hiện theo nhiều cách khác nhau",
        "Ẩn giấu chi tiết cài đặt bên trong và chỉ hiển thị tính năng ra ngoài",
        "Ràng buộc (đóng gói) mã nguồn và dữ liệu vào cùng một đơn vị duy nhất",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu:\nĐa hình (Poly = nhiều, Morph = hình dạng): 'Cùng một hành động nhưng mỗi đối tượng lại làm theo một cách khác nhau'.\nVí dụ: Cùng lệnh 'Kêu lên': Chó thì 'Gâu gâu', Mèo thì 'Meo meo'.\nTrong Java có 2 kiểu đa hình:\n1. Lúc biên dịch (Compile-time): Nạp chồng hàm (Overloading - cùng tên, khác tham số).\n2. Lúc chạy (Runtime): Ghi đè phương thức (Overriding - con viết lại method của cha).\n\n✅ Vì sao đáp án B đúng:\n'When one task is performed by different ways' (Một nhiệm vụ được làm theo nhiều cách) là định nghĩa chuẩn xác nhất của Đa hình.\n\n❌ Vì sao các đáp án khác sai:\n• (A) 'acquires all properties...': Đây là Tính Kế Thừa (Inheritance).\n• (C) 'hiding internal details...': Đây là Tính Trừu Tượng (Abstraction).\n• (D) 'binding code and data together...': Đây là Tính Đóng Gói (Encapsulation).\n\n⚠️ Mẹo nhớ: Cứ thấy 'many forms' hoặc 'different ways' thì chọn ngay Polymorphism!",
    },
    {
      id: "q02",
      topic: "oop",
      text: "A class in Java can contain",
      textVi: "Một lớp (Class) trong Java có thể chứa những thành phần nào?",
      options: ["Fields", "Methods", "Constructors", "Nested class and interface", "All of the above are TRUE"],
      optionsVi: [
        "Các trường / thuộc tính (Fields)",
        "Các phương thức / hàm (Methods)",
        "Hàm khởi tạo (Constructors)",
        "Lớp lồng nhau và Interface lồng nhau (Nested class and interface)",
        "Tất cả các thành phần trên đều ĐÚNG",
      ],
      answer: 4,
      explanation:
        "💡 Bản chất dễ hiểu:\nMột Class trong Java giống như một bản thiết kế ngôi nhà hoàn chỉnh, nó có thể chứa tất cả mọi thứ phục vụ cho việc tạo và vận hành đối tượng:\n1. Fields: Các biến lưu trữ dữ liệu (thuộc tính).\n2. Methods: Các hàm xử lý logic (hành vi).\n3. Constructors: Hàm tạo để sinh đối tượng khi dùng `new`.\n4. Nested class / interface: Lớp hoặc interface con nằm lồng bên trong để gom nhóm logic tiện lợi.\n\n✅ Vì sao đáp án 'All of the above are TRUE' đúng: Cả 4 thành phần trên đều hoàn toàn hợp lệ trong chuẩn cú pháp Java.\n❌ Các đáp án còn lại đều đúng nhưng chưa đủ.",
    },
    {
      id: "q03",
      topic: "oop",
      text: "The ways to create an object in java are:",
      textVi: "Các cách để tạo một đối tượng (Object) trong Java là:",
      options: ["By new keyword", "By newInstance() method", "By clone() method", "All of the answers"],
      optionsVi: [
        "Dùng từ khóa new",
        "Dùng phương thức newInstance() (Reflection)",
        "Dùng phương thức clone()",
        "Tất cả các cách trên",
      ],
      answer: 3,
      explanation:
        "💡 Bản chất dễ hiểu:\nĐể 'đẻ' ra một đối tượng trong bộ nhớ Heap, Java hỗ trợ nhiều cách khác nhau tùy nhu cầu:\n1. Từ khóa `new`: Cách cơ bản và phổ biến nhất (`Person p = new Person();`).\n2. Reflection qua `newInstance()`: Tạo đối tượng động từ tên class dạng chuỗi (thường dùng trong Spring Boot, Hibernate).\n3. Phương thức `clone()`: Tạo một bản photocopy từ một object đã có (class phải implement `Cloneable`).\n4. Ngoài ra còn có Deserialization (đọc byte từ file/network ra object).\n\n✅ Do cả 3 cách đều là chuẩn Java, ta chọn 'All of the answers'.",
    },
    {
      id: "q04",
      topic: "constructor",
      text: "Rules for creating java constructor:",
      textVi: "Các quy tắc bắt buộc khi tạo Constructor (hàm khởi tạo) trong Java:",
      options: [
        "A. Constructor name must be same as its class name",
        "B. Constructor must have no explicit return type",
        "C. Constructor must have no parameter",
        "D. All of the answers",
        "E. Only A and B are TRUE",
      ],
      optionsVi: [
        "A. Tên constructor bắt buộc phải trùng khớp với tên class",
        "B. Constructor không được có kiểu trả về rõ ràng (kể cả void)",
        "C. Constructor bắt buộc không được có tham số",
        "D. Tất cả các câu trên",
        "E. Chỉ A và B là ĐÚNG",
      ],
      answer: 4,
      explanation:
        "💡 Bản chất dễ hiểu:\nConstructor là hàm đặc biệt dùng để 'sinh nở' đối tượng, có 2 luật sắt:\n1. Tên hàm = Tên class (phân biệt hoa thường 100%).\n2. Không có kiểu trả về (không int, không String, và CẤM TUYỆT ĐỐI cả từ khóa `void`).\n\n❌ Vì sao (C) sai:\nConstructor hoàn toàn có thể có tham số (ví dụ: `public Student(String name, int age) {}`) để nạp sẵn dữ liệu khi vừa tạo object!\n\n⚠️ Bẫy phòng thi: Nếu bạn viết `public void Student() {}`, Java sẽ KHÔNG báo lỗi biên dịch mà nó biến hàm đó thành một METHOD THÔNG THƯỜNG! Khi gọi `new Student()`, hàm `void Student()` đó sẽ không tự chạy đâu nhé!",
    },
    {
      id: "q05",
      topic: "constructor",
      text: "Inheritance in Java:",
      textVi: "Tính kế thừa (Inheritance) trong Java:",
      options: [
        "Represents the IS-A relationship, also known as parent-child relationship.",
        "Represents the HAS-A relationship, also known as parent-child relationship",
        "Is a mechanism in which you can not create new classes that are built upon existing classes.",
      ],
      optionsVi: [
        "Đại diện cho mối quan hệ IS-A (Là một...), còn được gọi là mối quan hệ cha - con.",
        "Đại diện cho mối quan hệ HAS-A (Có một...), còn được gọi là mối quan hệ cha - con.",
        "Là cơ chế không cho phép bạn tạo ra các lớp mới dựa trên lớp có sẵn.",
      ],
      answer: 0,
      explanation:
        "💡 Bản chất dễ hiểu:\nKế thừa là quan hệ cha - con, phản ánh bản chất 'LÀ MỘT...' (IS-A):\n• Chó LÀ MỘT loài Động vật (`Dog IS-A Animal`).\n• Xe con LÀ MỘT loại Phương tiện (`Car IS-A Vehicle`).\n\n❌ Vì sao các câu khác sai:\n• 'Represents the HAS-A...': SAI. Quan hệ HAS-A (Có một...) là quan hệ Chứa (Composition/Aggregation), ví dụ: Xe hơi CÓ MỘT Động cơ (`Car HAS-A Engine`).\n• 'can not create new classes...': SAI HOÀN TOÀN vì kế thừa chính là cho phép tái sử dụng lớp cũ để tạo lớp mới.",
    },
    {
      id: "q06",
      topic: "polymorphism",
      text: "Method Overloading in Java is known as",
      textVi: "Nạp chồng phương thức (Method Overloading) trong Java được hiểu là:",
      options: [
        "If a class has multiple methods having same name and same parameters",
        "If a class has multiple methods having different in parameters",
        "If a class has multiple methods having same name but different in parameters",
      ],
      optionsVi: [
        "Nếu một class có nhiều phương thức cùng tên và cùng tham số",
        "Nếu một class có nhiều phương thức khác nhau về tham số",
        "Nếu một class có nhiều phương thức CÙNG TÊN nhưng KHÁC NHAU VỀ THAM SỐ",
      ],
      answer: 2,
      explanation:
        "💡 Bản chất dễ hiểu:\nOverloading giống như 1 từ tiếng Việt có nhiều ngữ cảnh dùng:\nVí dụ hàm `tinhTien()`: Nếu đưa 1 món thì tính tiền 1 món, nếu đưa thêm mã giảm giá thì tính kiểu khác.\n-> Bắt buộc phải: CÙNG TÊN nhưng KHÁC DANH SÁCH THAM SỐ (khác số lượng, khác kiểu dữ liệu, hoặc khác thứ tự kiểu).\n\n❌ Vì sao các câu khác sai:\n• 'same name and same parameters': Nếu cùng tên mà tham số giống hệt nhau thì Java báo lỗi trùng lặp phương thức ngay lập tức.\n• 'different in parameters': Thiếu điều kiện cốt lõi là phải CÙNG TÊN.",
    },
    {
      id: "q07",
      topic: "polymorphism",
      text: "The ways to overload the method in java:",
      textVi: "Các cách hợp lệ để Nạp chồng phương thức (Overload) trong Java là:",
      options: [
        "By changing number of arguments",
        "By changing the data type of arguments",
        "All of the above",
        "None of the above",
      ],
      optionsVi: [
        "Bằng cách thay đổi số lượng tham số",
        "Bằng cách thay đổi kiểu dữ liệu của tham số",
        "Tất cả các cách trên",
        "Không có cách nào đúng",
      ],
      answer: 2,
      explanation:
        "💡 Bản chất dễ hiểu:\nĐể Compiler phân biệt được bạn đang gọi phiên bản hàm nào, danh sách tham số phải khác nhau:\n1. Khác số lượng: `add(int, int)` vs `add(int, int, int)`.\n2. Khác kiểu dữ liệu: `add(int, int)` vs `add(double, double)`.\n\n⚠️ Bẫy thi cực kỳ phổ biến: CHỈ THAY ĐỔI KIỂU TRẢ VỀ (Return Type) thì KHÔNG PHẢI là Overloading! Ví dụ `int get()` và `double get()` trong cùng class sẽ bị lỗi biên dịch ngay vì khi gọi `get()`, máy tính không biết bạn muốn lấy kiểu nào!",
    },
    {
      id: "q08",
      topic: "polymorphism",
      text: "Method Overriding in Java is known as:",
      textVi: "Ghi đè phương thức (Method Overriding) trong Java được hiểu là:",
      options: [
        "If a class has multiple methods having same name but different in parameters",
        "If subclass (child class) has the same method as declared in the parent class",
        "Represents HAS-A relationship",
        "Subclass provides the specific implementation of the method that has not been provided by one of its parent class",
      ],
      optionsVi: [
        "Nếu một class có nhiều method cùng tên nhưng khác tham số (Overloading)",
        "Nếu lớp con (subclass) có cùng phương thức như đã được khai báo ở lớp cha",
        "Đại diện cho mối quan hệ HAS-A",
        "Lớp con cung cấp cài đặt cho phương thức mà lớp cha chưa từng cung cấp",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu:\nOverriding là con 'độ lại' hành vi của cha:\nLớp cha `Animal` có hàm `sound()` (kêu lên). Lớp con `Dog` viết lại hàm `sound()` in ra 'Gâu gâu'.\n-> Lớp con có method CÙNG TÊN, CÙNG THAM SỐ, CÙNG KIỂU TRẢ VỀ với lớp cha để thay đổi hành vi lúc chạy.\n\n❌ Vì sao các câu khác sai:\n• (A) Cùng tên khác tham số: Đây là Overloading.\n• (C) HAS-A: Overriding bắt buộc phải là quan hệ kế thừa IS-A.\n• (D) 'has not been provided...': Sai vì phương thức đó ĐÃ CÓ ở lớp cha rồi, con chỉ đè lại thôi.",
    },
    {
      id: "q09",
      topic: "polymorphism",
      text: "Rules for Java Method Overriding:",
      textVi: "Các quy tắc bắt buộc khi Ghi đè phương thức (Method Overriding):",
      options: [
        "method must have same name as in the parent class",
        "method must have same parameter as in the parent class.",
        "There must be an IS-A relationship (inheritance).",
        "All of the above",
      ],
      optionsVi: [
        "Phương thức phải có cùng tên như ở lớp cha",
        "Phương thức phải có cùng tham số như ở lớp cha",
        "Bắt buộc phải có mối quan hệ kế thừa IS-A (extends hoặc implements)",
        "Tất cả các quy tắc trên",
      ],
      answer: 3,
      explanation:
        "💡 3 nguyên tắc vàng của Overriding:\n1. Tên hàm phải giống hệt lớp cha.\n2. Danh sách tham số phải giống hệt lớp cha (cả số lượng, thứ tự, kiểu dữ liệu).\n3. Bắt buộc phải có quan hệ kế thừa IS-A.\nNgoài ra: Quyền truy cập ở lớp con không được hẹp hơn lớp cha (cha là `protected` thì con phải là `protected` hoặc `public`, cấm `private`).\n\n✅ Cả 3 ý đều đúng nên chọn 'All of the above'.",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: "Can we override static method?",
      textVi: "Chúng ta có thể ghi đè (override) một static method không?",
      options: ["Yes", "No", "Sometimes Yes, Sometimes No"],
      optionsVi: ["Có thể", "Không thể", "Đôi khi có, đôi khi không"],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu:\n• KHÔNG THỂ override static method!\n• Lý do bình dị: Từ khóa `static` thuộc về CLASS (tập thể), nó được chốt cứng ngay từ lúc biên dịch (Compile-time). Trong khi Overriding là tính năng động lúc chạy (Runtime) dành cho TỪNG ĐỐI TƯỢNG (Object) trong Heap.\n\n⚠️ Bẫy phỏng vấn cực hay: Nếu lớp con viết một static method giống hệt lớp cha, code VẪN CHẠY ĐƯỢC nhưng Java gọi đó là **METHOD HIDING** (che giấu phương thức), hoàn toàn KHÔNG PHẢI là Overriding!",
    },
    {
      id: "q11",
      topic: "modifier",
      text: "The public access modifier is accessible:",
      textVi: "Phạm vi truy cập public cho phép truy cập ở đâu?",
      options: [
        "within package and outside the package but through inheritance only.",
        "within package only.",
        "outside the package but through inheritance only.",
        "everywhere.",
      ],
      optionsVi: [
        "Trong cùng package và ngoài package nhưng chỉ qua kế thừa",
        "Chỉ trong cùng một package",
        "Ngoài package nhưng chỉ thông qua kế thừa",
        "Mọi nơi (everywhere).",
      ],
      answer: 3,
      explanation:
        "💡 Thứ tự phạm vi truy cập từ hẹp đến rộng:\n1. `private`: Chỉ dùng trong class đó (nội bộ).\n2. `default` (không ghi gì): Dùng trong cùng package (hàng xóm cùng khu phố).\n3. `protected`: Cùng package + lớp con ở package khác (người trong gia đình dù ở xa).\n4. `public`: Công cộng, ai ở đâu cũng truy cập được (`everywhere`).\n\n✅ `public` có phạm vi rộng nhất -> 'everywhere'.",
    },
    {
      id: "q12",
      topic: "modifier",
      text: "The private access modifier is accessible:",
      textVi: "Phạm vi truy cập private cho phép truy cập ở đâu?",
      options: [
        "within package only.",
        "within class only.",
        "outside the package but through inheritance only.",
        "everywhere.",
      ],
      optionsVi: [
        "Chỉ trong cùng một package",
        "Chỉ trong cùng một class (within class only)",
        "Ngoài package nhưng chỉ qua kế thừa",
        "Mọi nơi",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất dễ hiểu:\n`private` nghĩa là bí mật riêng tư cá nhân. Chỉ có code nằm bên trong class đó mới được sờ vào trực tiếp (`within class only`).\nNgay cả lớp con kế thừa hay các class hàng xóm cùng package cũng bị cấm cửa hoàn toàn!",
    },
    {
      id: "q13",
      topic: "constructor",
      text: 'Do you agree with the following?: "Constructors in the class do not have the return type"',
      textVi: 'Bạn có đồng ý với nhận định: "Constructor trong class không có kiểu trả về"?',
      options: ["Right", "Wrong"],
      optionsVi: ["Đúng (Right)", "Sai (Wrong)"],
      answer: 0,
      explanation:
        "💡 Bản chất:\nĐúng 100% (Right). Constructor KHÔNG BAO GIỜ có kiểu trả về, kể cả từ khóa `void`.\nCú pháp chuẩn duy nhất: `public ClassName() { ... }`",
    },
    {
      id: "q14",
      topic: "oop",
      text: "Do you agree with the following?: Object Class is the superclass of all of the classes in Java.",
      textVi: 'Bạn có đồng ý với nhận định: "Lớp Object là lớp cha cao nhất (superclass) của mọi class trong Java"?',
      options: ["Right", "Wrong"],
      optionsVi: ["Đúng (Right)", "Sai (Wrong)"],
      answer: 0,
      explanation:
        "💡 Bản chất cây phả hệ Java:\nĐÚNG (Right). Class `java.lang.Object` là cụ tổ tối cao của toàn bộ thế giới Java.\nMọi class bạn tự tạo (dù không viết `extends`) đều được Java ngầm hiểu là kế thừa từ `Object`. Nhờ đó mọi object đều có sẵn các hàm cơ bản như `toString()`, `equals()`, `hashCode()`, `getClass()`.",
    },
    {
      id: "q15",
      topic: "interface",
      text: "An abstract class can be declared with final modifier.",
      textVi: "Một lớp trừu tượng (abstract class) có thể được khai báo kèm từ khóa final không?",
      options: ["True", "False"],
      optionsVi: ["Đúng (True)", "Sai (False)"],
      answer: 1,
      explanation:
        "💡 Mâu thuẫn logic triệt để:\n• `abstract`: Là dở dang, bắt buộc người khác phải KẾ THỪA để hoàn thiện.\n• `final`: Là chốt hạ, CẤM người khác kế thừa.\n-> Hai từ khóa này đá nhau chan chát! Bạn viết `final abstract class A` là Java báo lỗi biên dịch ngay lập tức.",
    },
    {
      id: "q16",
      topic: "interface",
      text: "If a class does not want to implement all the methods of Interface, what is this class?",
      textVi: "Nếu một class không muốn (hoặc chưa thể) cài đặt toàn bộ method của Interface, thì class đó phải là gì?",
      options: ["Interface", "Normal class", "Abstract class", "None of the above"],
      optionsVi: ["Interface", "Class bình thường (Normal class)", "Lớp trừu tượng (Abstract class)", "Không có đáp án nào"],
      answer: 2,
      explanation:
        "💡 Bản chất dễ hiểu:\nKhi `implements` một Interface, bạn giống như ký một bản hợp đồng. Bạn phải làm hết tất cả method abstract trong đó.\nNếu bạn lười hoặc chưa làm hết, bạn chưa thể trở thành một class hoàn chỉnh (concrete class) mà BẮT BUỘC PHẢI KHAI BÁO LÀ `abstract class` để dồn việc còn lại cho các class con sau này làm nốt!",
    },
    {
      id: "q17",
      topic: "interface",
      text: "Which of the following is true?",
      textVi: "Phát biểu nào sau đây là ĐÚNG?",
      options: [
        "An abstract method can not override an another abstract method.",
        "A specific method can not override an another abstract method.",
        "An abstract method can not be declared with the keyword throws.",
        "No sentences above are true",
      ],
      optionsVi: [
        "Một abstract method không thể override một abstract method khác",
        "Một method cụ thể không thể override một abstract method khác",
        "Một abstract method không được phép khai báo với từ khóa throws",
        "Không có câu nào ở trên là đúng (No sentences above are true)",
      ],
      answer: 3,
      explanation:
        "💡 Vạch trần sự sai trái của 3 câu đầu:\n1. 'abstract method cannot override...': SAI, abstract method hoàn toàn có thể override abstract method khác để đổi kiểu trả về con hoặc thu hẹp exception.\n2. 'specific method cannot override...': SAI, đây chính là cách hoạt động cơ bản nhất của lập trình: class con viết method cụ thể để override abstract method của cha.\n3. 'cannot be declared with throws': SAI, abstract method hoàn toàn có thể khai báo `throws Exception` bình thường.\n-> Cả 3 câu đều sai sự thật, do đó chọn 'No sentences above are true'.",
    },
    {
      id: "q18",
      topic: "exception",
      text: RUN,
      textVi: RUN_VI,
      code: `class M {
    public static void main(String[] args) {
        String s = null;
        System.out.print(s);
    }
}`,
      options: ["Prints nothing.", "Prints: null", "Compile-time error", "Throw a NullPointerException"],
      optionsVi: ["Không in ra gì cả", "In ra chữ: null", "Lỗi lúc biên dịch", "Bị lỗi NullPointerException lúc chạy"],
      answer: 1,
      explanation:
        "💡 Trace code & Phân tích cơ chế JVM:\n• Lệnh `System.out.print(s)` bên trong nó sẽ gọi `String.valueOf(s)`.\n• Mã nguồn của Java viết rõ: `return (obj == null) ? \"null\" : obj.toString();`.\n• Vì thế khi truyền `null`, nó sẽ in ra chuỗi chữ `null` bình thường!\n\n⚠️ Bẫy nhớ đời: `NullPointerException` CHỈ xảy ra khi bạn dùng dấu chấm `.` trên biến null (ví dụ: `s.length()`, `s.trim()`). Còn truyền biến null vào lệnh in thì hoàn toàn an toàn!",
    },
    {
      id: "q19",
      topic: "interface",
      text: RUN,
      textVi: RUN_VI,
      code: `interface A {
    void m1();          // 1
    public void m2();   // 2
    static void m3();   // 3
    abstract void m4(); // 4
}`,
      options: ["Prints nothing.", "Prints: null", "Compile-time error", "Throw a NullPointerException"],
      optionsVi: ["Không in ra gì", "In ra: null", "Lỗi lúc biên dịch (Compile-time error)", "Ném ra NullPointerException"],
      answer: 2,
      explanation:
        "💡 Quy tắc sắt của Interface từ Java 8 trở đi:\n• Dòng 1, 2, 4: Đều là abstract method hợp lệ.\n• Dòng 3 (`static void m3();`): LỖI BIÊN DỊCH NGAY! Trong Interface, phương thức `static` BẮT BUỘC PHẢI CÓ THÂN HÀM `{ ... }`. Không bao giờ được phép khai báo static method dạng trừu tượng cộc lốc không thân hàm như vậy!",
    },
    {
      id: "q20",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a constructor?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng cho hàm tạo (constructor)?",
      options: ["private", "abstract", "final", "None of the above"],
      optionsVi: ["private", "abstract", "final", "Không có từ khóa nào"],
      answer: 0,
      explanation:
        "💡 Bản chất dễ hiểu:\nConstructor chỉ chấp nhận 4 mức truy cập: `public`, `protected`, `default`, và `private`.\n• `private constructor` cực kỳ nổi tiếng, dùng trong mẫu thiết kế Singleton Pattern (chỉ cho phép tạo đúng 1 object duy nhất) hoặc trong class tiện ích như `Math` để cấm người ngoài `new Math()`.\n• `abstract`, `final`, `static` tuyệt đối không được dùng cho constructor.",
    },
    {
      id: "q21",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to the declaration of a field?",
      textVi: "Modifier nào sau đây KHÔNG THỂ áp dụng cho khai báo một thuộc tính (field)?",
      options: ["abstract", "final", "private", "static"],
      optionsVi: ["abstract", "final", "private", "static"],
      answer: 0,
      explanation:
        "💡 Thuộc tính (field) là vùng chứa dữ liệu thực tế trong bộ nhớ, nó không có thân hàm nên không có khái niệm 'thuộc tính trừu tượng'. Từ khóa `abstract` chỉ dùng cho Class và Method, cấm dùng cho Field.",
    },
    {
      id: "q22",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to a method?",
      textVi: "Modifier nào sau đây KHÔNG THỂ áp dụng cho một phương thức (method)?",
      options: ["abstract", "private", "static", "None of the above"],
      optionsVi: ["abstract", "private", "static", "Không có từ khóa nào bị cấm (None of the above)"],
      answer: 3,
      explanation:
        "💡 Cả 3 từ khóa `abstract`, `private`, `static` đều có thể gắn vào method một cách hoàn toàn hợp lệ:\n• `abstract void run();`: Hợp lệ trong abstract class/interface.\n• `private void run() {}`: Hợp lệ (method nội bộ).\n• `static void run() {}`: Hợp lệ (method cấp độ class).\n-> Không có từ nào bị cấm, chọn 'None of the above'.",
    },
    {
      id: "q23",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to a constructor?",
      textVi: "Modifier nào sau đây KHÔNG THỂ áp dụng cho một hàm tạo (constructor)?",
      options: ["protected", "public", "private", "Static"],
      optionsVi: ["protected", "public", "private", "Static"],
      answer: 3,
      explanation:
        "💡 Constructor sinh ra là để tạo từng đối tượng riêng biệt (instance), còn `static` lại đại diện cho cả tập thể class. Hai khái niệm ngược nhau hoàn toàn nên Constructor KHÔNG THỂ là static!",
    },
    {
      id: "q24",
      topic: "interface",
      text: "Which of the following modifiers can be used with the abstract modifier in a method declaration?",
      textVi: "Modifier nào sau đây CÓ THỂ kết hợp cùng với từ khóa abstract khi khai báo method?",
      options: ["final", "private", "protected", "Static"],
      optionsVi: ["final", "private", "protected", "Static"],
      answer: 2,
      explanation:
        "💡 Bản chất abstract là bắt buộc lớp con phải nhìn thấy để Override:\n• `final`: Cấm override -> Xung đột.\n• `private`: Lớp con không thấy được -> Xung đột.\n• `static`: Không có tính đa hình động -> Xung đột.\n• `protected`: Hoàn toàn hợp lệ! Cho phép các lớp con ở mọi nơi thấy để override.",
    },
    {
      id: "q25",
      topic: "interface",
      text: "Which of the following modifiers can be used with the abstract modifier in a method declaration?",
      textVi: "Modifier nào sau đây CÓ THỂ kết hợp cùng với từ khóa abstract khi khai báo method?",
      options: ["Static", "final", "private", "public"],
      optionsVi: ["Static", "final", "private", "public"],
      answer: 3,
      explanation:
        "💡 Tương tự câu trên: `abstract` cần được lớp con nhìn thấy để viết lại code. `public` mở toang cửa cho tất cả lớp con kế thừa -> Hoàn toàn hợp lệ và là trường hợp phổ biến nhất.",
    },
    {
      id: "q26",
      topic: "interface",
      text: "Compile-time errors are generated at which lines?",
      textVi: "Lỗi biên dịch (Compile-time error) xảy ra tại dòng nào?",
      code: `interface A {
    void m1();          // 1
    public void m2();   // 2
    static void m3();   // 3
    abstract void m4(); // 4
}`,
      options: ["1", "2", "3", "4"],
      optionsVi: ["Dòng 1", "Dòng 2", "Dòng 3", "Dòng 4"],
      answer: 2,
      explanation:
        "💡 Trong Interface, static method bắt buộc phải có thân hàm `{ ... }`. Dòng 3 khai báo `static void m3();` không thân hàm sẽ bị lỗi biên dịch ngay lập tức.",
    },
    {
      id: "q27",
      topic: "interface",
      text: "Compile-time errors are NOT generated at which lines?",
      textVi: "Lỗi biên dịch KHÔNG xảy ra tại dòng nào (dòng nào hợp lệ)?",
      code: `interface C {
    private void m1();    // 1
    public void m2();     // 2
    protected void m3();  // 3
    m4();                 // 4
}`,
      options: ["1", "2", "3", "None of the above"],
      optionsVi: ["Dòng 1", "Dòng 2", "Dòng 3", "Không dòng nào đúng"],
      answer: 1,
      explanation:
        "💡 Soi từng dòng:\n• Dòng 1: `private` trong interface phải có thân hàm `{}` (từ Java 9) -> Lỗi.\n• Dòng 2: `public void m2();` là method chuẩn mực của interface -> HOÀN TOÀN HỢP LỆ.\n• Dòng 3: Interface không bao giờ cho phép `protected` -> Lỗi.\n• Dòng 4: `m4();` thiếu kiểu trả về -> Lỗi.\n-> Dòng duy nhất không bị lỗi là Dòng 2.",
    },
    {
      id: "q28",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng khi khai báo một thuộc tính trong Interface?",
      options: ["abstract", "const", "final", "Private"],
      optionsVi: ["abstract", "const", "final", "Private"],
      answer: 2,
      explanation:
        "💡 Mọi thuộc tính trong Interface luôn ngầm định là `public static final` (hằng số). Do đó từ khóa `final` là hoàn toàn hợp lệ.",
    },
    {
      id: "q29",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng khi khai báo một thuộc tính trong Interface?",
      options: ["abstract", "static", "private", "protected"],
      optionsVi: ["abstract", "static", "private", "protected"],
      answer: 1,
      explanation:
        "💡 Thuộc tính trong interface luôn là `public static final`. Trong 4 phương án, chỉ có `static` là hợp lệ.",
    },
    {
      id: "q30",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng khi khai báo một thuộc tính trong Interface?",
      options: ["public", "private", "protected", "No modifier"],
      optionsVi: ["public", "private", "protected", "No modifier (không dùng modifier)"],
      answer: 0,
      explanation:
        "💡 Trong số các modifier chính thức được liệt kê, chỉ có `public` là hợp lệ vì thuộc tính interface luôn là `public static final`.",
    },
    {
      id: "q31",
      topic: "interface",
      text: "Which field declaration results in a compile-time error?",
      textVi: "Khai báo thuộc tính nào sau đây sẽ bị lỗi lúc biên dịch?",
      code: `interface A {
    int a = 1;                     // 1
    public static int c = 3;       // 2
    public static final int d = 4; // 3
}`,
      options: ["1", "2", "3", "None of the above"],
      optionsVi: ["Dòng 1", "Dòng 2", "Dòng 3", "Không dòng nào bị lỗi (None of the above)"],
      answer: 3,
      explanation:
        "💡 Cả 3 dòng đều hợp lệ:\n• Dòng 1: Java tự thêm `public static final`.\n• Dòng 2: Java tự thêm `final`.\n• Dòng 3: Khai báo đủ cả 3 từ khóa chuẩn.\n-> Không có dòng nào bị lỗi, chọn 'None of the above'.",
    },
    {
      id: "q32",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: [
        "In ra: Y.s1 X.s2 Y.s1 X.s2",
        "In ra: Y.s1 X.s2 X.s1 X.s2",
        "In ra: X.s1 X.s2 Y.s1 Y.s2",
        "In ra: X.s1 X.s2 X.s1 X.s2",
      ],
      answer: 1,
      explanation:
        "💡 QUY TẮC CỐT LÕI: THUỘC TÍNH KHÔNG CÓ ĐA HÌNH!\nThuộc tính được chọn theo KIỂU KHAI BÁO CỦA BIẾN:\n1. `y.s1`: Biến `y` kiểu Y -> lấy s1 của Y -> \"Y.s1\".\n2. `y.s2`: Y không có s2, lấy kế thừa từ X -> \"X.s2\".\n3. `x.s1`: Biến `x` kiểu X (`X x = (X) y;`) -> lấy s1 của X -> \"X.s1\".\n4. `x.s2`: Biến `x` kiểu X -> lấy s2 của X -> \"X.s2\".\n✅ Kết quả: `Y.s1 X.s2 X.s1 X.s2`.",
    },
    {
      id: "q33",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AAA", "In ra: ABC", "In ra: CBA", "In ra: CCC"],
      answer: 1,
      explanation:
        "💡 Overloading chọn theo KIỂU KHAI BÁO của tham số:\n• `m1(a)`: `a` kiểu A -> gọi `m1(A)` -> in x.s1 của A -> \"A\".\n• `m1(b)`: `b` kiểu B -> gọi `m1(B)` -> in x.s1 của B -> \"B\".\n• `m1(c)`: `c` kiểu C -> gọi `m1(C)` -> in x.s1 của C -> \"C\".\n✅ Kết quả: `ABC`.",
    },
    {
      id: "q34",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng cho một lớp độc lập ngoài cùng (không phải nested class)?",
      options: ["private", "protected", "abstract", "static"],
      optionsVi: ["private", "protected", "abstract", "static"],
      answer: 2,
      explanation:
        "💡 Top-level Class (Lớp độc lập bên ngoài) chỉ có thể dùng:\n• Access modifier: `public` hoặc `default` (không ghi gì).\n• Non-access modifier: `abstract` hoặc `final`.\nCác từ khóa `private`, `protected`, `static` chỉ dùng được cho lớp con lồng bên trong (nested class).",
    },
    {
      id: "q35",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng cho một lớp độc lập ngoài cùng (không phải nested class)?",
      options: ["private", "protected", "static", "final"],
      optionsVi: ["private", "protected", "static", "final"],
      answer: 3,
      explanation:
        "💡 Tương tự câu trên: Top-level class chỉ có thể dùng `public`, `default`, `abstract` hoặc `final`. Trong 4 đáp án, chỉ có `final` là hợp lệ (ví dụ: `public final class String`).",
    },
    {
      id: "q36",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      textVi: "Modifier nào sau đây CÓ THỂ áp dụng cho một lớp độc lập ngoài cùng (không phải nested class)?",
      options: ["private", "protected", "default (no modifier)", "static"],
      optionsVi: ["private", "protected", "default (không ghi modifier)", "static"],
      answer: 2,
      explanation:
        "💡 Top-level class chỉ cho phép 2 mức truy cập: `public` hoặc `default (no modifier)`. `private` và `protected` bị cấm hoàn toàn.",
    },
    {
      id: "q37",
      topic: "interface",
      text: "Which of the following statements is true?",
      textVi: "Phát biểu nào sau đây là ĐÚNG?",
      options: [
        "An abstract method can not be overridden by an abstract method.",
        "An instance method that is not abstract can not be overridden by an abstract method.",
        "An abstract method declaration can not include a throws clause.",
        "None of the above.",
      ],
      optionsVi: [
        "Một abstract method không thể bị override bởi một abstract method khác",
        "Một instance method bình thường không thể bị override bởi một abstract method",
        "Khai báo abstract method không được phép chứa mệnh đề throws",
        "Không có câu nào ở trên là đúng (None of the above)",
      ],
      answer: 3,
      explanation:
        "💡 Cả 3 phát biểu đều sai:\n• (A) SAI: Abstract method hoàn toàn có thể bị một abstract method khác override.\n• (B) SAI: Một method bình thường vẫn có thể bị lớp con abstract biến thành abstract method.\n• (C) SAI: Abstract method có thể ném throws Exception bình thường.\n-> Do cả 3 câu đều sai, ta chọn 'None of the above'.",
    },
    {
      id: "q38",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: [
        "In ra: R.printS1 R.printS2",
        "In ra: R.printS1 S.printS2",
        "In ra: S.printS1 R.printS2",
        "In ra: S.printS1 S.printS2",
      ],
      answer: 1,
      explanation:
        "💡 Bẫy Private Method và Overriding:\n1. `printS1()` trong lớp R là `private`: Phương thức private KHÔNG ĐƯỢC KẾ THỪA nên lớp con S không thể override nó. Khi hàm `printS1S2()` gọi `printS1()`, Java liên kết tĩnh thẳng vào `R.printS1` -> In \"R.printS1 \".\n2. `printS2()` là `protected`: Phương thức này ĐƯỢC KẾ THỪA và được lớp S override. Lúc chạy, Java gọi bản của đối tượng thật `new S()` -> In \"S.printS2\".\n✅ Kết quả in ra: `R.printS1 S.printS2`.",
    },
    {
      id: "q39",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `abstract class D { String s1 = "D"; String getS1() { return s1; } }
class E extends D { String s1 = "E"; String getS1() { return s1; } }
class F {
    public static void main(String[] s) {
        D x = new E();
        System.out.print(x.s1 + x.getS1());
    }
}`,
      options: ["Prints: DD", "Prints: DE", "Prints: ED", "Prints: EE"],
      optionsVi: ["In ra: DD", "In ra: DE", "In ra: ED", "In ra: EE"],
      answer: 1,
      explanation:
        "💡 THUỘC TÍNH (FIELD) vs PHƯƠNG THỨC (METHOD):\n• `x.s1`: Thuộc tính KHÔNG CÓ ĐA HÌNH -> Chọn theo kiểu khai báo của `x` (kiểu D) -> Cho ra \"D\".\n• `x.getS1()`: Phương thức CÓ ĐA HÌNH LÚC CHẠY -> Gọi method của đối tượng thật trong Heap (lớp E) -> Cho ra \"E\".\n✅ Ghép lại: `x.s1 + x.getS1()` in ra \"DE\".",
    },
  ],
};

export const quiz2 = {
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
      textVi: "Kết quả xuất ra màn hình của đoạn mã sau là gì?",
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
      optionsVi: [
        "Animal is created. Dog is created.",
        "Dog is created. Animal is created.",
        "Animal is created. Animal is created.",
        "Dog is created. Dog is created.",
      ],
      answer: 0,
      explanation:
        "💡 Bản chất dễ hiểu:\nQuy tắc gia đình: 'Có cha trước rồi mới có con'. Trong Java, hàm tạo (constructor) của lớp con luôn tự động gọi ngầm `super()` (hàm tạo của lớp cha) ở dòng ĐẦU TIÊN.\n\n✅ Vì sao đáp án đúng:\nKhi `new Dog()` được gọi, nó nhảy sang constructor của `Animal` chạy trước -> in ra 'Animal is created. '. Sau đó con mới chạy nốt -> in tiếp 'Dog is created. '.\n\n❌ Vì sao các câu khác sai:\n• 'Dog is created. Animal is created.': Sai vì con không thể sinh trước cha.\n• Các câu lặp lại: Mỗi constructor chỉ chạy 1 lần duy nhất ứng với 1 lệnh `new`.",
    },
    {
      id: "q02",
      topic: "modifier",
      text: "The java final keyword can be used in many context. Final can be:",
      textVi: "Từ khóa final trong Java có thể dùng trong nhiều ngữ cảnh. Final có thể áp dụng cho:",
      options: ["A. variable", "B. method", "C. class", "A and B only", "A, B and C"],
      optionsVi: [
        "A. Biến (variable)",
        "B. Phương thức (method)",
        "C. Lớp (class)",
        "Chỉ A và B",
        "Cả A, B và C (A, B and C)",
      ],
      answer: 4,
      explanation:
        "💡 Bản chất dễ hiểu:\nTừ khóa `final` mang ý nghĩa 'chốt hạ / không thể sửa đổi':\n1. Biến final: Thành hằng số, không thể gán lại giá trị.\n2. Phương thức final: Không cho lớp con ghi đè (override).\n3. Lớp final: Không cho lớp khác kế thừa (extends) - ví dụ class `String`.\n\n✅ Vì final áp dụng được cho cả 3 vị trí trên, đáp án chính xác là 'A, B and C'.",
    },
    {
      id: "q03",
      topic: "modifier",
      text: "Which of the following opinion is TRUE?",
      textVi: "Ý kiến nào sau đây là ĐÚNG về phương thức final (final method)?",
      options: [
        "final method cannot be inherited and you cannot override it",
        "final method is inherited and you can override it",
        "final method is inherited but you cannot override it",
        "None of the above",
      ],
      optionsVi: [
        "Phương thức final không được kế thừa và không thể override",
        "Phương thức final được kế thừa và bạn có thể override nó",
        "Phương thức final ĐƯỢC kế thừa nhưng bạn KHÔNG THỂ override nó",
        "Không có câu nào đúng",
      ],
      answer: 2,
      explanation:
        "💡 Bản chất dễ hiểu:\nLớp con vẫn được thừa hưởng (kế thừa) toàn bộ tài sản của cha, kể cả `final method`. Lớp con vẫn gọi và xài thoải mái (`child.finalMethod()`). Nhưng vì cha đã chốt hạ (final), con CẤM KHÔNG ĐƯỢC PHÉP ĐẬP ĐI VIẾT LẠI (không được override).\n\n✅ Đáp án chuẩn: 'final method is inherited but you cannot override it'.\n❌ 'cannot be inherited': Sai vì con vẫn kế thừa và gọi dùng bình thường.\n❌ 'and you can override it': Sai hoàn toàn vì mục đích của final method là cấm override.",
    },
    {
      id: "q04",
      topic: "constructor",
      text: "Can we declare a constructor final?",
      textVi: "Chúng ta có thể khai báo một constructor là final được không?",
      options: [
        "No, because constructor is never inherited.",
        "Yes, because constructor is never inherited.",
        "Sometimes Yes, sometimes No",
      ],
      optionsVi: [
        "Không thể, vì constructor vốn dĩ không bao giờ được kế thừa.",
        "Có thể, vì constructor vốn dĩ không bao giờ được kế thừa.",
        "Đôi khi có, đôi khi không.",
      ],
      answer: 0,
      explanation:
        "💡 Bản chất dễ hiểu:\nTừ khóa `final` gắn vào method là để 'chặn không cho lớp con override'. Nhưng constructor mang tên của chính lớp đó, lớp con có tên khác nên constructor KHÔNG BAO GIỜ được kế thừa -> Đã không kế thừa thì lấy đâu ra chuyện override? Việc gắn `final` vào constructor là hoàn toàn thừa thãi và vô nghĩa!\n\n✅ Trình biên dịch sẽ quăng lỗi ngay: `modifier final not allowed here`. Lý do kỹ thuật: constructor is never inherited.",
    },
    {
      id: "q05",
      topic: "string",
      text: "In java, string objects are immutable. Immutable simply means:",
      textVi: "Trong Java, đối tượng chuỗi String là bất biến (immutable). Bất biến hiểu đơn giản nghĩa là:",
      options: [
        "String objects unmodifiable or unchangeable.",
        "Once string object is created its data or state can't be changed but a new string object is created.",
        "All of the above.",
        "None of the above.",
      ],
      optionsVi: [
        "Đối tượng chuỗi không thể sửa đổi hoặc không thể thay đổi.",
        "Một khi chuỗi đã được tạo ra, dữ liệu của nó không thể bị thay đổi, mọi biến đổi đều tạo ra một đối tượng chuỗi mới.",
        "Tất cả các câu trên (All of the above).",
        "Không có câu nào đúng.",
      ],
      answer: 2,
      explanation:
        "💡 Bản chất dễ hiểu:\n'Immutable' giống như tờ tiền đã in số seri, bạn không thể tẩy xóa hay sửa trực tiếp trên tờ tiền đó. Mọi hàm của String như `.concat()`, `.replace()`, `.trim()` đều không sửa chuỗi cũ mà in ra một tờ tiền mới (đối tượng String mới) trong bộ nhớ Heap!\n\n✅ Cả câu 1 và câu 2 đều mô tả chính xác bản chất, do đó chọn 'All of the above'.",
    },
    {
      id: "q06",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: [
        "Lỗi biên dịch tại dòng 1",
        "Lỗi biên dịch tại dòng 2",
        "Lỗi biên dịch tại dòng 3",
        "Lỗi biên dịch tại dòng 4",
      ],
      answer: 3,
      explanation:
        "💡 Bản chất giá trị mặc định trong Java:\n• Biến `static int x`: Là biến toàn cục của class, Java tự động cho giá trị mặc định là 0. Dòng 3 in `x` ngon lành ra `x=0`.\n• Biến `int y` (dòng 2): Là BIẾN CỤC BỘ nằm trong hàm main. Java KHÔNG cấp giá trị mặc định cho biến cục bộ! Bắt buộc bạn phải gán giá trị trước khi đem đi dùng.\n\n✅ Dòng 4 cố tình lôi biến `y` chưa có giá trị ra in -> Compiler chặn đứng ngay: `variable y might not have been initialized`.\n❌ Dòng 1, 2, 3 không lỗi vì khai báo đúng cú pháp.",
    },
    {
      id: "q07",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: [
        "In ra: 0,0",
        "Lỗi biên dịch tại dòng 1.",
        "Lỗi biên dịch tại dòng 2.",
        "Lỗi biên dịch tại dòng 3.",
      ],
      answer: 2,
      explanation:
        "💡 Nguyên tắc Static Context:\nHàm `static main` đại diện cho cả tập thể Class, tồn tại trước khi có bất kỳ đối tượng cụ thể nào sinh ra. Trong khi `int x;` là biến non-static (instance), chỉ tồn tại khi có đối tượng cụ thể (`new M()`).\n\n✅ Tại dòng 2, đứng trong static main mà gọi trực tiếp biến `x` non-static -> Bị lỗi biên dịch ngay: `non-static variable x cannot be referenced from a static context`.\n❌ Các dòng khác không có lỗi nhưng chương trình đã gãy tại dòng 2.",
    },
    {
      id: "q08",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: main,B.m1", "In ra: main, A.m1", "Lỗi biên dịch", "Không có đáp án nào"],
      answer: 0,
      explanation:
        "💡 Phân tích từng lệnh:\n1. `static void m1(String s)` có tham số String, khác chữ ký với `void m1()` không tham số -> Đây là Overloading hợp lệ, không hề xung đột!\n2. Lệnh `B.m1(\"main\")`: Gọi static method -> In \"main,\".\n3. Lệnh `new B().m1()`: Tạo đối tượng B và gọi `m1()`. Vì lớp B đã override `m1()` của cha A -> Chạy bản của B -> In \"B.m1\".\n✅ Kết quả ghép lại: `main,B.m1`.",
    },
    {
      id: "q09",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: XXX", "In ra: XYZ", "In ra: WWW", "In ra: XYZW"],
      answer: 1,
      explanation:
        "💡 Bản chất Overloading:\nCác hàm `m1` có tham số khác nhau (`m1(X)`, `m1(Y)`, `m1(Z)`, `m1(W)`) nên đây là Nạp chồng (Overload). Đối tượng `w1` kiểu W sở hữu cả 4 hàm này.\nKhi gọi hàm, Compiler sẽ chọn bản khớp nhất với KIỂU KHAI BÁO của tham số truyền vào:\n• `w1.m1(x1)`: `x1` kiểu X -> gọi `m1(X)` -> In \"X\".\n• `w1.m1(y1)`: `y1` kiểu Y -> gọi `m1(Y)` -> In \"Y\".\n• `w1.m1(z1)`: `z1` kiểu Z -> gọi `m1(Z)` -> In \"Z\".\n✅ Kết quả in ra: `XYZ`.",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AAA", "In ra: ABC", "In ra: CCC", "Không có đáp án nào"],
      answer: 1,
      explanation:
        "💡 Bẫy Overloading kinh điển:\nLớp C kế thừa nên có cả 3 phiên bản overload: `m1(A)`, `m1(B)`, `m1(C)`.\nQuy tắc: Việc chọn phiên bản Overload nào được quyết định lúc BIÊN DỊCH dựa trên **KIỂU KHAI BÁO CỦA THAM SỐ**, hoàn toàn không phụ thuộc vào đối tượng thực tế `new C()` trong Heap!\n• `c1` khai báo kiểu A -> gọi `m1(A)` -> In \"A\".\n• `c2` khai báo kiểu B -> gọi `m1(B)` -> In \"B\".\n• `c3` khai báo kiểu C -> gọi `m1(C)` -> In \"C\".\n✅ Kết quả in ra: `ABC`.\n❌ 'CCC' là sai lầm phổ biến nhất do nhầm Overload với Override.",
    },
    {
      id: "q11",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `class G {
    static void m(Object x) { System.out.print("Object"); }
    static void m(String x) { System.out.print("String"); }
    public static void main(String[] args) { m(null); }
}`,
      options: ["Prints: Object", "Prints: String", "Compile-time error", "Run-time error"],
      optionsVi: ["In ra: Object", "In ra: String", "Lỗi lúc biên dịch", "Lỗi lúc chạy"],
      answer: 1,
      explanation:
        "💡 Quy tắc 'Chọn phương thức cụ thể nhất' (Most Specific Method):\nGiá trị `null` hợp lệ với cả kiểu `Object` lẫn kiểu `String`.\nTrong Java, nếu có 2 phương thức nạp chồng cùng nhận được `null`, trình biên dịch sẽ ưu tiên chọn phương thức có kiểu dữ liệu CON, HẸP HƠN và CỤ THỂ HƠN.\nVì `String` là lớp con của `Object`, Java lập tức chọn `m(String)` -> In ra `String`.\n\n⚠️ Chú ý: Nếu có 2 lớp con ngang hàng nhau (ví dụ `m(String)` và `m(Integer)`), lúc này Java không biết chọn ai mới quăng lỗi 'ambiguous'.",
    },
    {
      id: "q12",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: ABACA", "In ra: ABABAB", "In ra: ABABCAB", "In ra: ABABCABC"],
      answer: 3,
      explanation:
        "💡 Trái ngược với String, StringBuffer là MUTABLE (có thể thay đổi trực tiếp):\n• Ban đầu `s1` tạo ra chuỗi \"A\".\n• `m1(s1)`: `append(\"B\")` sửa trực tiếp đối tượng thành \"AB\" -> In \"AB\".\n• `m2(s1)`: `append(\"C\")` sửa tiếp đối tượng thành \"ABC\" -> In \"ABC\".\n• Về `main`: Biến `s1` trỏ đúng vào đối tượng đó (giờ là \"ABC\") -> In \"ABC\".\n✅ Ghép 3 lần in liên tiếp lại: AB + ABC + ABC = `ABABCABC`.",
    },
    {
      id: "q13",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class F {
    public static void main(String[] s) {
        String s1 = "A", s2 = " B ", s3 = "C";
        s2.trim();
        s3.concat("D");
        System.out.print(s1 + s2 + s3);
    }
}`,
      options: ["Prints: ABC", "Prints: A B C", "Prints: ABCD", "Prints: ABDC"],
      optionsVi: ["In ra: ABC", "In ra: A B C", "In ra: ABCD", "In ra: ABDC"],
      answer: 1,
      explanation:
        "💡 Bẫy String Immutable kinh điển:\nString là bất biến. Các phương thức `trim()` (cắt khoảng trắng) hay `concat()` (nối chuỗi) KHÔNG BAO GIỜ sửa trực tiếp chuỗi ban đầu mà chỉ tạo ra chuỗi mới.\nVì code viết `s2.trim();` và `s3.concat(\"D\");` mà KHÔNG GÁN LẠI vào biến (ví dụ `s2 = s2.trim()`), kết quả mới bị vứt đi!\n• `s1` = \"A\"\n• `s2` vẫn nguyên vẹn = \" B \"\n• `s3` vẫn nguyên vẹn = \"C\"\n✅ Ghép lại: \"A\" + \" B \" + \"C\" = `A B C`.",
    },
    {
      id: "q14",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `public class F1 {
    public static void main(String[] s) {
        String s1 = new String("ABCD1234"), s2 = new String("1234EF");
        String s3 = s1.substring(4, 8), s4 = s2.substring(0, 4);
        System.out.println((s3 == s4) + "," + (s3 + s4).equals(s4 + s3));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      optionsVi: ["In ra: false,false", "In ra: false,true", "In ra: true,false", "In ra: true,true"],
      answer: 1,
      explanation:
        "💡 Phân biệt toán tử == và phương thức .equals():\n1. `s3 == s4`: Cả hai đều có nội dung là \"1234\", nhưng vì được tạo lúc chạy (Runtime) qua `substring`, chúng nằm ở 2 ô nhớ độc lập trong Heap -> Toán tử `==` so sánh địa chỉ ô nhớ nên trả về `false`.\n2. `(s3 + s4).equals(s4 + s3)`: Cả hai vế nối lại đều là chuỗi \"12341234\". Phương thức `.equals()` của String so sánh từng ký tự nội dung -> Trả về `true`.\n✅ Kết quả: `false,true`.",
    },
    {
      id: "q15",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class F2 {
    public static void main(String[] args) {
        String s1 = "A", s2 = "a", s3 = "b";
        s1.toLowerCase();
        s3.replace('b', 'a');
        System.out.print((s1.equals(s2)) + "," + (s2.equals(s3)));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      optionsVi: ["In ra: false,false", "In ra: false,true", "In ra: true,false", "In ra: true,true"],
      answer: 0,
      explanation:
        "💡 Lại là bẫy String Immutable:\n`s1.toLowerCase()` và `s3.replace('b', 'a')` không gán lại kết quả vào biến!\n• `s1` vẫn là \"A\" (chữ hoa).\n• `s2` là \"a\" (chữ thường).\n• `s3` vẫn là \"b\".\n-> `\"A\".equals(\"a\")` là `false`.\n-> `\"a\".equals(\"b\")` là `false`.\n✅ Kết quả: `false,false`.",
    },
    {
      id: "q16",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class F3 {
    public static void main(String[] args) {
        String s1 = "XYZ";
        StringBuffer s2 = new StringBuffer(s1);
        System.out.print(s2.equals(s1) + "," + s1.equals(s2));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      optionsVi: ["In ra: false,false", "In ra: false,true", "In ra: true,false", "In ra: true,true"],
      answer: 0,
      explanation:
        "💡 Điểm chết cực kỳ quan trọng về StringBuffer.equals():\n1. `s2.equals(s1)`: Lớp `StringBuffer` KHÔNG HỀ GHI ĐÈ (override) hàm `equals()` của Object! Nó dùng nguyên bản so sánh địa chỉ ô nhớ `==`. Vì `s2` và `s1` là 2 đối tượng khác nhau -> `false`.\n2. `s1.equals(s2)`: Hàm `equals` của String kiểm tra `instanceof String`. Vì `s2` là `StringBuffer` (khác kiểu) -> Lập tức trả về `false` ngay!\n✅ Kết quả: `false,false`.\n(Muốn so sánh nội dung giữa String và StringBuffer phải dùng `s1.contentEquals(s2)`).",
    },
    {
      id: "q17",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class M {
    public static void main(String[] args) {
        StringBuffer sb1 = new StringBuffer("XYZ");
        StringBuffer sb2 = new StringBuffer("XYZ");
        System.out.print((sb1 == sb2) + "," + sb1.equals(sb2));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      optionsVi: ["In ra: false,false", "In ra: false,true", "In ra: true,false", "In ra: true,true"],
      answer: 0,
      explanation:
        "💡 Tương tự câu trên:\n• `sb1 == sb2`: Hai lệnh `new` tạo ra hai ô nhớ khác nhau -> `false`.\n• `sb1.equals(sb2)`: `StringBuffer` không override hàm `.equals()`, nên hàm `.equals()` của nó hoạt động y hệt như toán tử `==` (chỉ so địa chỉ ô nhớ) -> cũng là `false` luôn!\n✅ Kết quả: `false,false`.",
    },
    {
      id: "q18",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: 0, 0, 0, 0", "In ra: 0, 1, 1, 1", "In ra: 1, 1, 1, 0", "In ra: 1, 1, 0, 1"],
      answer: 3,
      explanation:
        "💡 Phân biệt biến Instance (riêng) và biến Static (chung):\n• Biến `a` (non-static): Mỗi object có một bản sao riêng biệt trong Heap.\n  `f1.a++` chỉ làm tăng `a` của riêng `f1` lên 1. `f2.a` vẫn là 0!\n• Biến `b` (static): DÙNG CHUNG cho cả lớp F.\n  `f1.b++` làm biến chung `b` tăng lên 1. Khi hỏi `f2.b`, nó cũng nhìn thấy số 1!\n✅ Ghép lại: `f1.a` (1), `f1.b` (1), `f2.a` (0), `f2.b` (1) -> `1, 1, 0, 1`.",
    },
    {
      id: "q19",
      topic: "static",
      text: RUN,
      textVi: RUN_VI,
      code: `class B {
    int x = 1, y = 2;
    public static void main(String[] args) {
        System.out.println(x + y);
    }
}`,
      options: ["Prints: x+y", "Prints: 12", "Prints: 3", "Compile-time error"],
      optionsVi: ["In ra: x+y", "In ra: 12", "In ra: 3", "Lỗi lúc biên dịch (Compile-time error)"],
      answer: 3,
      explanation:
        "💡 `x` và `y` là biến instance (non-static). Phương thức `static main` không thể truy cập trực tiếp các biến này nếu không có đối tượng (`new B()`).\n✅ Trình biên dịch báo lỗi ngay: `non-static variable x cannot be referenced from a static context`.",
    },
    {
      id: "q20",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to the declaration of a field?",
      textVi: "Modifier nào sau đây KHÔNG THỂ áp dụng cho khai báo một thuộc tính (field)?",
      options: ["abstract", "final", "private", "Protected"],
      optionsVi: ["abstract", "final", "private", "Protected"],
      answer: 0,
      explanation:
        "💡 Thuộc tính (field) chỉ có giá trị dữ liệu, không có thân hàm nên không thể 'trừu tượng' (abstract). Từ khóa `abstract` chỉ dùng cho Class và Method.",
    },
  ],
};

export const quiz3 = {
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
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AZZ", "In ra: YZA", "In ra: YAA", "In ra: AZA"],
      answer: 3,
      explanation:
        "💡 Trace code chi tiết:\n1. `m1(s1)`: `replace('A', 'Y')` không gán lại vào biến -> biến `s1` trong `m1` vẫn là \"A\" -> In \"A\".\n2. `m2(s1)`: `s1 = s1.replace('A', 'Z')` có gán lại vào biến cục bộ `s1` của `m2` -> In \"Z\".\n3. Trở về `main`: Java truyền tham số theo dạng tham trị (pass-by-value bản sao tham chiếu). Biến `s1` của hàm `main` không hề bị thay đổi bởi hàm `m2` -> In \"A\".\n✅ Ghép 3 lần in: A + Z + A = `AZA`.",
    },
    {
      id: "q02",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class F {
    public static void main(String[] args) {
        String s1 = "X", s2 = "x", s3 = "y";
        s1.toLowerCase();
        s3.replace('y', 'x');
        System.out.print((s1.equals(s2)) + "," + (s2.equals(s3)));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      optionsVi: ["In ra: false,false", "In ra: false,true", "In ra: true,false", "In ra: true,true"],
      answer: 0,
      explanation:
        "💡 Vì kết quả của `toLowerCase()` và `replace()` không được gán lại vào biến:\n• `s1` vẫn là \"X\" (chữ hoa).\n• `s2` là \"x\" (chữ thường).\n• `s3` vẫn là \"y\".\n-> `\"X\".equals(\"x\")` là `false`.\n-> `\"x\".equals(\"y\")` là `false`.\n✅ Kết quả in ra: `false,false`.",
    },
    {
      id: "q03",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class F {
    public static void main(String[] args) {
        String s1 = "ABCDE";
        System.out.print(s1.substring(1, 2) + s1.substring(3));
    }
}`,
      options: ["Prints: AABC", "Prints: ACDE", "Prints: ABABC", "Prints: BDE"],
      optionsVi: ["In ra: AABC", "In ra: ACDE", "In ra: ABABC", "In ra: BDE"],
      answer: 3,
      explanation:
        "💡 Quy tắc chỉ số (Index) chuỗi trong Java (bắt đầu từ 0):\nChuỗi \"ABCDE\": index 0='A', 1='B', 2='C', 3='D', 4='E'.\n• `substring(1, 2)`: Lấy từ index 1 đến trước 2 -> Lấy đúng ký tự tại vị trí 1 -> Được chuỗi \"B\".\n• `substring(3)`: Lấy từ index 3 đến hết chuỗi -> Được chuỗi \"DE\".\n✅ Ghép lại: \"B\" + \"DE\" = `BDE`.",
    },
    {
      id: "q04",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: [
        "In ra: false,false,false",
        "In ra: false,false,true",
        "In ra: false,true,false",
        "In ra: false,true,true",
      ],
      answer: 1,
      explanation:
        "💡 Bản chất String nối bằng biến lúc Runtime:\nVì `a` và `b` là các BIẾN (không có từ khóa final), mỗi lần thực hiện phép cộng chuỗi `a + b`, Java lại tạo ra một đối tượng String mới toanh trên Heap:\n1. `(a + b) == (a + b)`: Hai object khác nhau -> `false`.\n2. `c == d`: `c` và `d` trỏ 2 ô nhớ độc lập -> `false`.\n3. `c.equals(d)`: Đều chứa nội dung \"XY\" -> `.equals()` so nội dung -> `true`.\n✅ Kết quả: `false,false,true`.",
    },
    {
      id: "q05",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class M {
    public static void main(String[] args) {
        System.out.print(String.valueOf(1) + String.valueOf(2));
        String s1 = "S1";
        String s2 = s1.toString();
        System.out.print("," + (s1 == s2));
    }
}`,
      options: ["Prints: 3,false", "Prints: 3,true", "Prints: 12,false", "Prints: 12,true"],
      optionsVi: ["In ra: 3,false", "In ra: 3,true", "In ra: 12,false", "In ra: 12,true"],
      answer: 3,
      explanation:
        "💡 Phân tích 2 phần:\n1. `String.valueOf(1) + String.valueOf(2)`: Chuyển số 1 thành chuỗi \"1\", số 2 thành chuỗi \"2\". Nối chuỗi lại thành \"12\" (chứ không phải cộng số ra 3).\n2. Trong class String, hàm `toString()` trả về chính nó (`return this`). Biến `s2` và `s1` cùng trỏ vào 1 đối tượng -> `s1 == s2` là `true`.\n✅ Kết quả: `12,true`.",
    },
    {
      id: "q06",
      topic: "string",
      text: "Which method of string class in java Returns a new string that is a substring of this string?",
      textVi: "Phương thức nào của lớp String trong Java trả về một chuỗi mới là chuỗi con của chuỗi hiện tại?",
      options: [
        "A. public String substring(int beginIndex, int endIndex)",
        "B. public String substring(int beginIndex)",
        "C. public boolean equalsIgnoreCase(String another)",
        "D. Both A & B",
      ],
      optionsVi: [
        "A. public String substring(int beginIndex, int endIndex)",
        "B. public String substring(int beginIndex)",
        "C. public boolean equalsIgnoreCase(String another)",
        "D. Cả A & B (Both A & B)",
      ],
      answer: 3,
      explanation:
        "💡 Class String có 2 phương thức cắt chuỗi con (overload):\n• `substring(beginIndex)`: Cắt từ vị trí bắt đầu đến hết chuỗi.\n• `substring(beginIndex, endIndex)`: Cắt từ vị trí bắt đầu đến trước vị trí kết thúc.\nCả 2 đều trả về chuỗi con mới -> Chọn 'Both A & B'.\n(Hàm C `equalsIgnoreCase` trả về boolean kiểm tra bằng nhau không phân biệt hoa thường).",
    },
    {
      id: "q07",
      topic: "string",
      text: RUN,
      textVi: RUN_VI,
      code: `class F {
    public static void main(String[] args) {
        String s1 = "ABC";
        StringBuffer s2 = new StringBuffer(s1);
        System.out.print(s2.equals(s1) + "," + s1.equals(s2));
    }
}`,
      options: ["Prints: false,false", "Prints: false,true", "Prints: true,false", "Prints: true,true"],
      optionsVi: ["In ra: false,false", "In ra: false,true", "In ra: true,false", "In ra: true,true"],
      answer: 0,
      explanation:
        "💡 So sánh giữa String và StringBuffer:\n• `s2.equals(s1)`: `StringBuffer` không override hàm `equals()` của Object (so sánh địa chỉ ô nhớ `==`). Vì `s1` và `s2` là 2 đối tượng khác nhau -> `false`.\n• `s1.equals(s2)`: Hàm `equals` của String đòi hỏi đối số truyền vào phải là String (`instanceof String`). Vì `s2` là `StringBuffer` -> Lập tức trả về `false`.\n✅ Kết quả: `false,false`.",
    },
    {
      id: "q08",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AAA", "In ra: ABC", "In ra: CCC", "Không có đáp án nào"],
      answer: 1,
      explanation:
        "💡 Overloading chọn method theo KIỂU KHAI BÁO CỦA BIẾN THAM SỐ:\n• `c1` khai báo kiểu A -> khớp `m1(A)` -> in \"A\".\n• `c2` khai báo kiểu B -> khớp `m1(B)` -> in \"B\".\n• `c3` khai báo kiểu C -> khớp `m1(C)` -> in \"C\".\n✅ Kết quả: `ABC`.",
    },
    {
      id: "q09",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: A", "In ra: B", "In ra: C", "Không có đáp án nào"],
      answer: 0,
      explanation:
        "💡 Bẫy Overloading vs Overriding đỉnh cao:\n1. Kiểm tra Override: Lớp A có `m1(A a)`. Lớp B có `m1(B b)`. Lớp C có `m1(C c)`. Tham số khác nhau nên B và C KHÔNG HỀ OVERRIDE `m1(A a)` của cha! Chúng chỉ đang nạp chồng (overload) thêm method mới.\n2. Biến `c1` khai báo kiểu A -> Đứng từ kiểu A, Compiler chỉ thấy duy nhất phương thức `m1(A a)`.\n3. Khi truyền `c2` (kiểu C) vào, vì C là con của A nên hợp lệ.\n4. Lúc chạy, do lớp C không hề override `m1(A a)`, phương thức của lớp A được gọi -> In ra \"A\".\n✅ Kết quả: in ra `A`.",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AAA", "In ra: ABC", "In ra: CCC", "Lỗi biên dịch"],
      answer: 0,
      explanation:
        "💡 Tương tự câu trên:\nCả 3 biến `a1`, `b1`, `c1` đều KHAI BÁO KIỂU A.\nỞ góc nhìn kiểu A, chỉ có duy nhất phương thức `m1(A a)`.\nCác lớp B và C không hề override `m1(A a)` mà chỉ overload. Do đó cả 3 lệnh gọi đều thực thi phương thức `m1(A a)` của lớp A.\n✅ Cả 3 lần đều in chữ \"A\" -> Kết quả: `AAA`.",
    },
    {
      id: "q11",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AAA", "In ra: ABC", "In ra: CCC", "Lỗi lúc biên dịch (Compile-time error)"],
      answer: 3,
      explanation:
        "💡 Quy tắc Kế thừa & Ép kiểu:\nLớp cha là A, lớp con là B và C.\nTrong Java, bạn không thể gán một đối tượng CHA cho biến kiểu CON:\n`B b1 = new A();` -> LỖI BIÊN DỊCH!\n`C c1 = new A();` -> LỖI BIÊN DỊCH!\n(Ví dụ đời thường: Mọi con Chó đều là Động vật, nhưng không thể nói mọi Động vật đều là con Chó).\n✅ Trình biên dịch báo lỗi ngay tại dòng khai báo: `incompatible types` -> Compile-time error.",
    },
    {
      id: "q12",
      topic: "jdbc",
      text: "The performance of the application will be faster if you use PreparedStatement because query is compiled only once",
      textVi: "Hiệu năng của ứng dụng sẽ nhanh hơn nếu bạn dùng PreparedStatement vì câu truy vấn chỉ được biên dịch một lần duy nhất?",
      options: ["True", "False"],
      optionsVi: ["Đúng (True)", "Sai (False)"],
      answer: 0,
      explanation:
        "💡 Bản chất JDBC PreparedStatement:\nĐÚNG (True). `PreparedStatement` được Database phân tích cú pháp và biên dịch trước (Precompiled) 1 lần duy nhất.\nKhi bạn thực thi nhiều lần với các tham số khác nhau (dấu `?`), Database tái sử dụng luôn kế hoạch thực thi sẵn có mà không cần biên dịch lại -> Chạy nhanh hơn và còn chống được lỗi bảo mật SQL Injection.",
    },
    {
      id: "q13",
      topic: "jdbc",
      text: "Which Indicates a result set that cannot be updated programmatically in concurrency?",
      textVi: "Hằng số nào chỉ định một ResultSet không thể được cập nhật bằng code trong quá trình xử lý đồng thời?",
      options: ["CONCUR_UPDATABLE", "CONCUR_READ_ONLY", "All of the above", "None of the above"],
      optionsVi: ["CONCUR_UPDATABLE", "CONCUR_READ_ONLY", "Tất cả các câu trên", "Không có câu nào đúng"],
      answer: 1,
      explanation:
        "💡 Trong JDBC ResultSet Concurrency:\n• `ResultSet.CONCUR_READ_ONLY`: Chế độ chỉ đọc (Read-only), bạn không thể cập nhật dữ liệu thông qua ResultSet này.\n• `ResultSet.CONCUR_UPDATABLE`: Cho phép dùng code để cập nhật dữ liệu (`updateRow()`).\n✅ Câu hỏi hỏi về chế độ 'không thể cập nhật' (cannot be updated) -> Chọn `CONCUR_READ_ONLY`.",
    },
    {
      id: "q14",
      topic: "jdbc",
      text: "Which is used to call the stored procedures and functions?",
      textVi: "Interface nào trong JDBC được dùng để gọi các Stored Procedure và Function trong cơ sở dữ liệu?",
      options: ["CallableStatement Interface", "PreparedStatement Interface", "All the above", "None of the above"],
      optionsVi: [
        "CallableStatement Interface",
        "PreparedStatement Interface",
        "Tất cả các câu trên",
        "Không có câu nào đúng",
      ],
      answer: 0,
      explanation:
        "💡 Phân biệt 3 loại Statement trong JDBC:\n1. `Statement`: Thực thi SQL tĩnh đơn giản.\n2. `PreparedStatement`: Thực thi SQL có tham số (`?`).\n3. `CallableStatement`: Chuyên dụng để gọi các Stored Procedure và Function lưu trong CSDL (`conn.prepareCall(\"{call my_procedure(?)}\")`).\n✅ Đáp án đúng: `CallableStatement Interface`.",
    },
    {
      id: "q15",
      topic: "jdbc",
      text: "Which is a type of Resultset?",
      textVi: "Hằng số nào sau đây là kiểu duyệt (type) hợp lệ của ResultSet?",
      options: ["TYPE_FORWARD_ONLY", "TYPE_SCROLL_INSENSITIVE", "TYPE_SCROLL_SENSITIVE", "ALL ABOVE"],
      optionsVi: [
        "TYPE_FORWARD_ONLY",
        "TYPE_SCROLL_INSENSITIVE",
        "TYPE_SCROLL_SENSITIVE",
        "TẤT CẢ CÁC CÂU TRÊN (ALL ABOVE)",
      ],
      answer: 3,
      explanation:
        "💡 3 Kiểu duyệt ResultSet chuẩn trong JDBC:\n1. `TYPE_FORWARD_ONLY`: Chỉ duyệt tiến từ trên xuống dưới bằng `next()` (tiết kiệm bộ nhớ nhất, mặc định).\n2. `TYPE_SCROLL_INSENSITIVE`: Có thể cuộn tiến/lùi tự do, không bị ảnh hưởng nếu DB thay đổi.\n3. `TYPE_SCROLL_SENSITIVE`: Có thể cuộn tiến/lùi tự do, và cập nhật ngay nếu DB bị thay đổi lúc ResultSet đang mở.\n✅ Cả 3 loại đều đúng -> Chọn 'ALL ABOVE'.",
    },
    {
      id: "q16",
      topic: "jdbc",
      text: "Which method of Class class is used to register and load the driver class.",
      textVi: "Phương thức nào của lớp Class được dùng để đăng ký và nạp lớp Driver cơ sở dữ liệu vào bộ nhớ?",
      options: ["forName()", "getConnection()", "createStatement()", "executeQuery()"],
      optionsVi: ["forName()", "getConnection()", "createStatement()", "executeQuery()"],
      answer: 0,
      explanation:
        "💡 Để nạp Driver JDBC vào bộ nhớ, ta dùng:\n`Class.forName(\"com.mysql.cj.jdbc.Driver\");`\nPhương thức `forName()` của lớp `Class` sẽ tải bytecode của class Driver vào JVM và kích hoạt khối static để tự đăng ký với DriverManager.\n(Các hàm `getConnection` thuộc DriverManager, `createStatement` thuộc Connection, `executeQuery` thuộc Statement).",
    },
    {
      id: "q17",
      topic: "jdbc",
      text: "In Connection interface which method Drops all changes made since the previous commit?",
      textVi: "Trong interface Connection, phương thức nào hủy bỏ (hoàn tác) tất cả các thay đổi kể từ lần commit trước đó?",
      options: [
        "public void rollback()",
        "public void commit()",
        "public void close()",
        "public Statement createStatement()",
      ],
      optionsVi: [
        "public void rollback()",
        "public void commit()",
        "public void close()",
        "public Statement createStatement()",
      ],
      answer: 0,
      explanation:
        "💡 Quản lý giao dịch (Transaction):\n• `commit()`: Lưu vĩnh viễn các thay đổi vào CSDL.\n• `rollback()`: Hủy bỏ, hoàn tác tất cả các thay đổi nếu gặp sự cố hoặc lỗi để đưa CSDL về trạng thái an toàn ban đầu.\n✅ Phương thức hủy bỏ thay đổi là `rollback()`.",
    },
    {
      id: "q18",
      topic: "jdbc",
      text: "Which interface provides methods to execute queries with the database?",
      textVi: "Interface nào cung cấp các phương thức để thực thi câu truy vấn trực tiếp với cơ sở dữ liệu?",
      options: ["Connection", "Statement", "ResultSet", "None of the above"],
      optionsVi: ["Connection", "Statement", "ResultSet", "Không có câu nào đúng"],
      answer: 1,
      explanation:
        "💡 Phân công nhiệm vụ:\n• `Connection`: Mở và quản lý kết nối vật lý với Database.\n• `Statement`: Là công cụ THỰC THI câu truy vấn, cung cấp các hàm cốt lõi như `executeQuery()`, `executeUpdate()`, `execute()`.\n• `ResultSet`: Bảng chứa kết quả trả về sau lệnh SELECT.\n✅ Interface thực thi truy vấn chính là `Statement`.",
    },
    {
      id: "q19",
      topic: "exception",
      text: "What will be the output of the program? (Command line: java StringTest red green blue)",
      textVi: "Kết quả xuất ra màn hình là gì khi chạy lệnh: java StringTest red green blue?",
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
      optionsVi: ["str3 =", "str3 = null", "str3 = blue", "Lỗi ngoại lệ lúc chạy (Runtime Exception)"],
      answer: 3,
      explanation:
        "💡 Tham số dòng lệnh trong Java:\nKhi gõ `java StringTest red green blue`, mảng `args` nhận được:\n• `args[0]` = \"red\"\n• `args[1]` = \"green\"\n• `args[2]` = \"blue\"\nMảng chỉ có 3 phần tử (độ dài 3), chỉ số hợp lệ là 0, 1, 2.\nDòng code `String str3 = args[3];` cố tình truy cập vào chỉ số 3 (vượt quá độ dài mảng) -> JVM sẽ lập tức ném ra ngoại lệ `ArrayIndexOutOfBoundsException` tại thời điểm chạy (Runtime Exception)!\n✅ Chọn 'Runtime Exception'.",
    },
    {
      id: "q20",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
      code: `abstract class D { String s1 = "D"; String getS1() { return s1; } }
class E extends D { String s1 = "E"; String getS1() { return s1; } }
class F {
    public static void main(String[] s) {
        D x = new E();
        System.out.print(x.s1 + x.getS1());
    }
}`,
      options: ["Prints: DD", "Prints: DE", "Prints: ED", "Prints: EE"],
      optionsVi: ["In ra: DD", "In ra: DE", "In ra: ED", "In ra: EE"],
      answer: 1,
      explanation:
        "💡 THUỘC TÍNH (FIELD) vs PHƯƠNG THỨC (METHOD):\n• `x.s1`: Thuộc tính KHÔNG CÓ ĐA HÌNH -> Lấy theo kiểu khai báo của biến `x` (kiểu D) -> Cho ra \"D\".\n• `x.getS1()`: Phương thức CÓ ĐA HÌNH LÚC CHẠY -> Gọi method của đối tượng thật trong Heap (lớp E) -> Cho ra \"E\".\n✅ Ghép lại: `x.s1 + x.getS1()` in ra \"DE\".",
    },
    {
      id: "q21",
      topic: "polymorphism",
      text: RUN,
      textVi: RUN_VI,
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
      optionsVi: ["In ra: AAA", "In ra: ABC", "In ra: CBA", "In ra: CCC"],
      answer: 1,
      explanation:
        "💡 Phân tích luồng thực thi:\n1. Ba biến `a`, `b`, `c` cùng trỏ vào một đối tượng `new C()`, nhưng:\n   • `a` khai báo kiểu A.\n   • `b` khai báo kiểu B.\n   • `c` khai báo kiểu C.\n2. Các hàm `m1` là static overloading. Trình biên dịch chọn hàm lúc BIÊN DỊCH theo kiểu khai báo của tham số:\n   • `m1(a)` -> Tham số kiểu A -> Gọi `m1(A x)` -> In x.s1 của A -> In \"A\".\n   • `m1(b)` -> Tham số kiểu B -> Gọi `m1(B x)` -> In x.s1 của B -> In \"B\".\n   • `m1(c)` -> Tham số kiểu C -> Gọi `m1(C x)` -> In x.s1 của C -> In \"C\".\n✅ Kết quả in liên tiếp: `ABC`.",
    },
  ],
};

async function main() {
  console.log("Saving enriched seedData.js with bilingual support and intuitive explanations...");

  const seedDataPath = path.resolve(__dirname, "../lib/seedData.js");
  const interviewDataPath = path.resolve(__dirname, "../lib/interviewData.js");

  // Read existing interview export
  let fileContent = `// Dữ liệu gốc của 3 bộ đề (kèm bản dịch tiếng Việt và giải thích chi tiết, trực quan, không hàn lâm).
// Tự động đồng bộ và nạp vào MongoDB Atlas.

export const TOPICS = ${JSON.stringify(TOPICS, null, 2)};

const RUN = "What is the result of attempting to compile and run the program?";
const RUN_VI = "Kết quả khi biên dịch và chạy chương trình sau là gì?";

const quiz1 = ${JSON.stringify(quiz1, null, 2)};

const quiz2 = ${JSON.stringify(quiz2, null, 2)};

const quiz3 = ${JSON.stringify(quiz3, null, 2)};

import { ALL_INTERVIEW_QUIZZES } from "./interviewData.js";
import { ALL_AI_QUIZZES } from "./aiQuizData.js";

export const SEED_QUIZZES = [quiz1, quiz2, quiz3, ...ALL_AI_QUIZZES, ...ALL_INTERVIEW_QUIZZES];
`;

  fs.writeFileSync(seedDataPath, fileContent, "utf8");
  console.log("Successfully wrote updated seedData.js!");

  // Now connect to MongoDB Atlas and sync the enriched questions into MongoDB collection!
  console.log("Syncing updated quizzes into MongoDB Atlas...");
  const db = await getDb();
  const col = db.collection("quizzes");
  const now = new Date();

  const { ALL_AI_QUIZZES } = await import("../lib/aiQuizData.js");

  for (const q of [quiz1, quiz2, quiz3, ...ALL_AI_QUIZZES]) {
    const res = await col.updateOne(
      { slug: q.slug },
      {
        $set: {
          title: q.title,
          description: q.description,
          color: q.color,
          icon: q.icon,
          order: q.order,
          isAiGenerated: !!q.isAiGenerated,
          questions: q.questions,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    console.log(`Updated ${q.slug}: matched=${res.matchedCount}, modified=${res.modifiedCount}, upserted=${res.upsertedCount}`);
  }

  console.log("All 6 Quizzes (3 original + 3 AI-generated, total 140 questions) successfully enriched and synced to MongoDB Atlas!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error running build_full_seed:", err);
  process.exit(1);
});
