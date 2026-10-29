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
        "Đa hình (Polymorphism) = MỘT hành động được thực hiện theo NHIỀU cách khác nhau (overloading – đa hình lúc biên dịch, overriding – đa hình lúc chạy).\n• (a) là Inheritance (kế thừa)\n• (c) là Abstraction (trừu tượng)\n• (d) là Encapsulation (đóng gói)",
    },
    {
      id: "q02",
      topic: "oop",
      text: "A class in Java can contain",
      options: ["Fields", "Methods", "Constructors", "Nested class and interface", "All of the above are TRUE"],
      answer: 4,
      explanation:
        "Một class trong Java có thể chứa: field (thuộc tính), method, constructor, block khởi tạo, nested class và interface. Vì vậy chọn “All of the above”.",
    },
    {
      id: "q03",
      topic: "oop",
      text: "The ways to create an object in java are:",
      options: ["By new keyword", "By newInstance() method", "By clone() method", "All of the answers"],
      answer: 3,
      explanation:
        "Có nhiều cách tạo object: từ khóa new, newInstance() (Reflection), clone(), deserialization, factory method… nên cả 3 cách được liệt kê đều đúng.",
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
        "2 quy tắc của constructor: (A) tên trùng với tên class, (B) không có kiểu trả về (kể cả void). Constructor HOÀN TOÀN có thể có tham số (parameterized constructor) nên (C) sai → chọn “Only A and B”.",
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
        "Kế thừa thể hiện quan hệ IS-A (Dog IS-A Animal), còn gọi là quan hệ cha–con. HAS-A là quan hệ Aggregation/Composition. Kế thừa chính là cơ chế cho phép TẠO class mới dựa trên class có sẵn nên (c) sai.",
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
        "Overloading = nhiều method CÙNG TÊN nhưng KHÁC tham số (số lượng hoặc kiểu). Cùng tên + cùng tham số sẽ bị lỗi biên dịch; còn (b) thiếu điều kiện “cùng tên”.",
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
        "Có 2 cách overload: đổi số lượng tham số hoặc đổi kiểu dữ liệu tham số. Lưu ý: CHỈ đổi kiểu trả về thì KHÔNG phải overload (lỗi biên dịch).",
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
        "Overriding = class con khai báo lại method GIỐNG HỆT (tên + tham số) method của class cha để cung cấp cài đặt riêng. (a) là overloading. (d) sai vì override là cài đặt lại method ĐÃ CÓ ở class cha.",
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
        "3 quy tắc override: cùng tên, cùng danh sách tham số, và phải có quan hệ IS-A (kế thừa). (Trong đề gốc đáp án c bị in trùng với b.)",
    },
    {
      id: "q10",
      topic: "polymorphism",
      text: "Can we override static method?",
      options: ["Yes", "No", "Sometimes Yes, Sometimes No"],
      answer: 1,
      explanation:
        "Không. Method static thuộc về CLASS chứ không thuộc object, được liên kết lúc biên dịch. Nếu class con khai báo static method cùng chữ ký thì đó là method HIDING, không phải overriding.",
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
        "Phạm vi truy cập: private (trong class) < default (trong package) < protected (trong package + class con ngoài package) < public (mọi nơi).",
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
      explanation: "private chỉ truy cập được BÊN TRONG class khai báo nó. (a) là default, (c) là protected, (d) là public.",
    },
    {
      id: "q13",
      topic: "constructor",
      text: 'Do you agree with the following?: "Constructors in the class do not have the return type"',
      options: ["Right", "Wrong"],
      answer: 0,
      explanation:
        "Đúng. Constructor không có kiểu trả về (kể cả void). Nếu thêm void vào thì nó trở thành một method bình thường trùng tên class.",
    },
    {
      id: "q14",
      topic: "oop",
      text: "Do you agree with the following?: Object Class is the superclass of all of the classes in Java.",
      options: ["Right", "Wrong"],
      answer: 0,
      explanation:
        "Đúng. java.lang.Object là gốc của mọi class. Class nào không extends gì thì mặc định extends Object.",
    },
    {
      id: "q15",
      topic: "interface",
      text: "An abstract class can be declared with final modifier.",
      options: ["True", "False"],
      answer: 1,
      explanation:
        "Sai. abstract nghĩa là PHẢI được kế thừa để hoàn thiện, còn final nghĩa là KHÔNG được kế thừa → mâu thuẫn, lỗi biên dịch “illegal combination of modifiers”.",
    },
    {
      id: "q16",
      topic: "interface",
      text: "If a class does not want to implement all the methods of Interface, what is this class?",
      options: ["Interface", "Normal class", "Abstract class", "None of the above"],
      answer: 2,
      explanation:
        "Class implements interface mà không cài đặt hết method thì bắt buộc phải khai báo là abstract class; class con cụ thể sẽ cài đặt phần còn lại.",
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
        "• Abstract method CÓ THỂ override abstract method khác (vd. abstract class con khai báo lại).\n• Method cụ thể CÓ THỂ override abstract method (đó chính là cách cài đặt).\n• Abstract method CÓ THỂ có throws.\n→ Không câu nào đúng.",
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
        "print(String) gọi String.valueOf(s) → với null sẽ in ra chữ \"null\". NullPointerException chỉ xảy ra khi GỌI METHOD trên biến null, ví dụ s.length().",
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
        "Dòng 3: static method trong interface (Java 8+) BẮT BUỘC phải có thân { }. `static void m3();` không có thân → lỗi biên dịch. Các dòng 1, 2, 4 hợp lệ (method interface mặc định public abstract).",
    },
    {
      id: "q20",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a constructor?",
      options: ["private", "abstract", "final", "None of the above"],
      answer: 0,
      explanation:
        "Constructor chỉ dùng được access modifier: public, protected, default, private (private dùng trong Singleton). Không được abstract, final, static, synchronized.",
    },
    {
      id: "q21",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to the declaration of a field?",
      options: ["abstract", "final", "private", "static"],
      answer: 0,
      explanation: "abstract chỉ dùng cho class và method. Field có thể final, private, static, transient, volatile.",
    },
    {
      id: "q22",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to a method?",
      options: ["abstract", "private", "static", "None of the above"],
      answer: 3,
      explanation: "abstract, private, static đều dùng được cho method → không có đáp án nào sai → “None of the above”.",
    },
    {
      id: "q23",
      topic: "modifier",
      text: "Which of the following modifiers can not be applied to a constructor?",
      options: ["protected", "public", "private", "Static"],
      answer: 3,
      explanation:
        "Constructor gắn với việc tạo OBJECT nên không thể static. protected/public/private đều hợp lệ.",
    },
    {
      id: "q24",
      topic: "interface",
      text: "Which of the following modifiers can be used with the abstract modifier in a method declaration?",
      options: ["final", "private", "protected", "Static"],
      answer: 2,
      explanation:
        "abstract method cần được override nên KHÔNG đi với final (cấm override), private (không thấy để override), static (không override được). Chỉ protected (hoặc public/default) là hợp lệ.",
    },
    {
      id: "q25",
      topic: "interface",
      text: "Which of the following modifiers can be used with the abstract modifier in a method declaration?",
      options: ["Static", "final", "private", "public"],
      answer: 3,
      explanation: "Giống câu trước: abstract chỉ kết hợp được với public/protected/default. static, final, private đều xung đột.",
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
        "Dòng 3 lỗi vì static method trong interface phải có thân. Dòng 1, 2, 4 là abstract method hợp lệ (public abstract được ngầm định).",
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
        "• Dòng 1: private method trong interface (Java 9+) phải có thân → lỗi.\n• Dòng 2: hợp lệ.\n• Dòng 3: interface không cho phép protected → lỗi.\n• Dòng 4: thiếu kiểu trả về → lỗi.\n→ Chỉ dòng 2 không lỗi.",
    },
    {
      id: "q28",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      options: ["abstract", "const", "final", "Private"],
      answer: 2,
      explanation:
        "Field trong interface luôn ngầm định là public static final (hằng số). const là từ khóa dành riêng nhưng không dùng trong Java; abstract và private không hợp lệ.",
    },
    {
      id: "q29",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      options: ["abstract", "static", "private", "protected"],
      answer: 1,
      explanation: "Field interface = public static final → static hợp lệ. abstract, private, protected đều không được.",
    },
    {
      id: "q30",
      topic: "interface",
      text: "Which of the following are modifiers that can be applied to a field declaration within an interface?",
      options: ["public", "private", "protected", "No modifier"],
      answer: 0,
      explanation:
        "Trong số các MODIFIER được liệt kê, chỉ public hợp lệ (field interface = public static final). Ghi chú: không ghi modifier vẫn biên dịch được vì Java tự thêm public static final, nhưng “No modifier” không phải là một modifier.",
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
        "Cả 3 dòng đều hợp lệ vì field interface tự động là public static final; ghi thêm một phần hay toàn bộ các từ khóa này đều được.",
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
        "FIELD không có đa hình – Java chọn field theo KIỂU KHAI BÁO của biến (field hiding).\n• y.s1 → Y.s1 (Y che s1 của X)\n• y.s2 → X.s2 (kế thừa)\n• x.s1 → X.s1 (biến kiểu X)\n• x.s2 → X.s2",
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
        "Overloading được chọn lúc BIÊN DỊCH theo kiểu khai báo: m1(a) → m1(A), m1(b) → m1(B), m1(c) → m1(C). Trong mỗi method, x.s1 lấy field theo kiểu tham số (A, B, C) → in “ABC”.",
    },
    {
      id: "q34",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      options: ["private", "protected", "abstract", "static"],
      answer: 2,
      explanation:
        "Class cấp cao nhất (top-level) chỉ được dùng: public, default, abstract, final (và strictfp). private/protected/static chỉ dùng cho nested class.",
    },
    {
      id: "q35",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      options: ["private", "protected", "static", "final"],
      answer: 3,
      explanation: "Top-level class được phép final (không cho kế thừa, vd. String). private, protected, static thì không.",
    },
    {
      id: "q36",
      topic: "modifier",
      text: "Which of the following modifiers can be applied to a class that is not a nested class?",
      options: ["private", "protected", "default (no modifier)", "static"],
      answer: 2,
      explanation: "Top-level class chỉ có 2 mức truy cập: public hoặc default (không ghi gì – chỉ dùng trong package).",
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
        "• Abstract method CÓ THỂ bị override bởi abstract method.\n• Method thường CÓ THỂ bị override thành abstract trong abstract class con.\n• Abstract method CÓ THỂ có throws.\n→ Cả 3 đều sai → None of the above.",
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
        "private method KHÔNG được kế thừa nên không thể override → trong R, printS1() luôn gọi R.printS1. printS2() là protected và được S override → gọi theo object thật (S) → S.printS2.",
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
        "x.s1 → FIELD chọn theo kiểu khai báo D → \"D\". x.getS1() → METHOD được override, chọn theo object thật E → trả về s1 của E → \"E\". Kết quả “DE”.",
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

export const SEED_QUIZZES = [quiz1, quiz2, quiz3];
