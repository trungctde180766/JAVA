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
      "explanation": "Foo là local class, cast (Object) rồi cast ngược lại (Foo) hợp lệ. Kết quả in ra i = 3."
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
      "explanation": "A sai cú pháp (thiếu tên biến, dùng ngoặc tròn). B sai vì new float[] không có kích thước và không có initializer. C, D, E, F đều hợp lệ."
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
      "explanation": "i++ so sánh trước rồi tăng, --j giảm trước rồi so sánh. Vòng lặp chạy đến khi i = 5, j = 6."
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
      "explanation": "d vẫn giữ tham chiếu đến Demo sau khi start() kết thúc (biến instance). Chỉ khi object Test bị GC thì Demo mới eligible."
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
      "explanation": "A sai vì Animal là interface. B sai vì Alpha không phải Elephant. C sai vì get() trả về Animal, không gán được cho Lion. D hợp lệ: gọi static method qua instance là legal, trả về Animal, gọi soundOff()."
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
      "explanation": "Object còn reachable từ live thread thì không bị GC. Runtime.gc() chỉ gợi ý, không đảm bảo."
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
      "explanation": "Default constructor của B không có tham số và tự động gọi super(). Access mặc định là package-private (không public)."
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
      "explanation": "i tăng trước khi so sánh (++i). Khi i = 5, điều kiện sai, j = 6. Kết quả i = 5, j = 6."
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
      "explanation": "Assertion có thể enable/disable theo class hoặc package. Không dùng để kiểm tra argument public method."
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
      "explanation": "Default (package-private) cho phép truy cập trong cùng package, là mức hạn chế nhất đáp ứng yêu cầu."
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
      "explanation": "if (x = y) dùng phép gán, không phải so sánh; trong Java điều kiện phải là boolean nên compile fail."
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
      "explanation": "finally chạy trước, sau đó exception được catch, rồi finished."
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
      "explanation": "Biến trong interface mặc định là public static final. A, B, C tương đương."
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
      "explanation": "x có default access (package-private) trong test1, không truy cập được từ test2. Lỗi ở dòng 2 Test2 (extends không giúp truy cập static package-private)."
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
      "explanation": "A: mở rộng access hợp lệ (overriding). C: khác tham số (long) nên là overload hợp lệ. B thu hẹp access sai. D sai return type. E static không override được instance method."
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
      "explanation": "Thứ tự: A, B, D, C, B, D, C, B → ABDCBDCB."
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
      "explanation": "assert false : true → AssertionError với message \"true\"."
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
      "explanation": "Mảng float mặc định 0.0f. In ra f2[0] = 0.0."
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
      "explanation": "Không thể khai báo static local variable trong method. Compile fail."
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
      "explanation": "A có cùng signature nhưng return type khác → không phải overload hợp lệ, compile fail."
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
      "explanation": "bool = false gán false. else if (!bool) đúng → in \"c\"."
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
      "explanation": "catch(X) bắt được X và subclass của X. Error không phải RuntimeException."
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
      "explanation": "Assertion không nên có side effect vì có thể bị disable. Không dùng cho public method precondition."
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
      "explanation": "Top-level class không thể là private. Lỗi ở dòng 5."
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
      "explanation": "TestSuper không có constructor no-arg, TestSub không gọi super(int) → compile fail."
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
      "explanation": "In 0 2 rồi i = 4, in 4 → 0 2 4."
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
      "explanation": "x = 4: j = 1 → case 4 j=2, case 5 j=3, default j=4. return 4+4=8."
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
      "explanation": "A, B, F đúng cú pháp. C sai thứ tự. D, E sai vì không được ghi kích thước trong khai báo."
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
      "explanation": "finally luôn chạy trước khi return. In \"Finally\"."
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
      "explanation": "getVar() có default access, không truy cập được từ package khác (pkg2). Compile fail."
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
      "explanation": "In 0..9, i lên 10 thì flag false, thoát. Kết quả 0123456789."
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
      "explanation": "Top-level class không thể protected. Lỗi dòng 5."
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
      "explanation": "Theo PDF đáp án A. Lưu ý: Long không phải subtype của Integer nên về lý thuyết Java hiện đại đây là lỗi compile (không thể overload chỉ khác return type). Đáp án gốc của đề là A."
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
      "explanation": "foo(0): 1,3,4 → \"134\". foo(1): catch 2, finally 3, return → \"23\". Tổng: 13423."
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
      "explanation": "Object được return nên không eligible trong method này."
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
      "explanation": "new Alpha() in Base (constructor Base), new Base() in Base → BaseBase."
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
      "explanation": "case 0, 1 không hợp lệ cú pháp Java. Compile fail."
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
      "explanation": "Theo PDF đáp án C. Thực tế badMethod() không ném exception nên in A, C, D → ACD. Đề gốc có thể có sai sót OCR."
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
      "explanation": "Interface method mặc định public abstract. A, B hợp lệ. C sai (final). D static không hợp lệ trong interface Java 1.4. E protected sai."
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
      "explanation": "A có default constructor. B có constructor no-arg. C sai void. D chỉ có constructor String. E Thing() là method void không phải constructor."
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
      "explanation": "switch không nhận Float (wrapper). Compile fail."
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
      "explanation": "RuntimeException → catch B, finally C, rồi D → BCD."
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
      "explanation": "Sau line 15, test không còn tham chiếu, TestA và TestB tạo thành island of isolation → cả hai eligible."
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
      "explanation": "i=0 break; i=1 in one two three; i=2 in two three; rồi done → one two three two three done."
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
      "explanation": "B, C, E đúng. A sai (không init method var). D sai (chỉ tạo khi không có constructor nào)."
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
      "explanation": "B, C, E đúng. A sai (deploy thường disable). D sai (có thể per-class)."
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
      "explanation": "finally luôn chạy hoàn tất trừ khi VM shutdown. A sai (try-finally không cần catch)."
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
      "explanation": "Không thể override final method. Compile fail."
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
      "explanation": "Sau line 15, cả o và oa[0] đều null → Float eligible."
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
      "explanation": "if (odd) với odd là int không hợp lệ trong Java. Compile fail."
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
      "explanation": "A, D hợp lệ. B sai (float không phải mảng). C sai. E sai cú pháp."
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
      "explanation": "long không override int (return type khác) → compile fail."
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
      "explanation": "Mặc định assertion disabled → in finished."
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
      "explanation": "private chỉ truy cập trong cùng class."
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
      "explanation": "switch nhận byte, char (và int, short). Không nhận long, float, wrapper."
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
      "explanation": "RuntimeException → catch B, finally D, rồi E → BDE."
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
      "explanation": "assert phải có dạng assert expr : expr; không dùng ternary như vậy. Compile fail."
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
      "explanation": "(long)x / y * 2 → double. Return type hẹp nhất hợp lệ là double."
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
      "explanation": "C hợp lệ (inner class truy cập d1). E hợp lệ. A, B sai vì static class không truy cập được instance var d1. D sai tương tự."
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
      "explanation": "main không static → JVM không tìm thấy entry point. Code không chạy."
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
      "explanation": "a=false, b=true → else, !b false → ELSE. Đúng."
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
      "explanation": "B sai cú pháp mảng 2 chiều. D sai vì không được ghi cả kích thước và initializer."
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
      "explanation": "Thiếu nhãn tp: trước for. Compile fail."
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
      "explanation": "B: bỏ body methodB. E: bỏ abstract khỏi methodB. A sai vì methodA đã abstract không body là đúng. C sai vì class abstract vẫn cần method abstract không body."
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
      "explanation": "i=1 không khớp case nào → default j=2, case 0 j=6. Kết quả 6."
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
      "explanation": "B đúng. D đúng. A sai. C sai vì dolt chỉ set tham chiếu local."
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
      "explanation": "Theo PDF đáp án C. Lưu ý: Super không có constructor no-arg, Sub không gọi super(text) → về lý thuyết compile fail. Đáp án gốc của đề là C."
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
      "explanation": "i tăng đến 6, j giảm 5 lần → j=5. Kết quả i=6, j=5."
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
      "explanation": "Assertion không dùng để kiểm tra precondition của public method."
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
      "explanation": "C overload hợp lệ. E override hợp lệ (covariant return). A, B, D sai."
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
      "explanation": "Theo PDF đáp án B. Thực tế: Error không bị catch bởi Exception, finally in B, rồi Error thoát → in B rồi error message. Đáp án gốc của đề là B."
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
      "explanation": "protected cho phép subclass ở package khác truy cập."
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
      "explanation": "Exc1 là subclass của Exc0 → catch Exc0 bắt trước. In \"Exc0 caught\"."
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
      "explanation": "getSalary là public method, assert validEmployee(e) là kiểm tra precondition public → không phù hợp."
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
      "explanation": "void A() là method, không phải constructor. new A() gọi default constructor → không in gì."
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
      "explanation": "Bar object từ doBar() được gán cho newBar, sau line 10 newBar trỏ object mới → object cũ eligible."
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
      "explanation": "Beta không có testIt(), biến b kiểu Beta không gọi được. Compile fail."
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
      "explanation": "Dòng 20 là unreachable statement sau while(true) → compile fail."
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
      "explanation": "Object reachable từ live thread không bị GC."
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
      "explanation": "A: không có constructor → có default. D: void A() là method, không phải constructor → có default. B, C đã có constructor."
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
      "explanation": "(short)x / y * 2 → double. Return type hẹp nhất: double."
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
      "explanation": "Từ trong outer class, new Inner() hợp lệ. Ở line 8 (trong static main của Inner) cần o.new Inner()."
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
      "explanation": "Chỉ GC mới destroy object. Các cách khác chỉ gợi ý hoặc set null."
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
      "explanation": "while(y--) với y int không phải boolean → compile fail."
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
      "explanation": "Theo PDF đáp án B. Lưu ý: f[0] kiểu float[][], farray kiểu float[][][] nên về lý thuyết không gán được. Đáp án gốc của đề là B."
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
      "explanation": "i khai báo trong for, không truy cập được ở dòng 14. Compile fail."
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
      "explanation": "Không biết method s() có lưu tham chiếu b hay không → không chắc chắn."
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
      "explanation": "test() gọi runTest() throws TestException → cần throws Exception hoặc catch. Đáp án B (throws Exception)."
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
      "explanation": "i tăng đến 4 thì break. In i=4."
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
      "explanation": "Theo PDF đáp án D. Lưu ý: ArithmeticException là subclass của Exception → catch Exception trước là lỗi compile (unreachable). Đáp án gốc của đề là D."
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
      "explanation": "Default constructor có cùng access với class (public)."
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
      "explanation": "getFloat() trong AbstractTest là private, không thể override abstract method (cần public/protected). Compile fail."
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
      "explanation": "Chỉ throw được Throwable và subclass: Error, Exception, RuntimeException."
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
      "explanation": "D: Z(int) thiếu tên tham số, và A không gọi super(int). Compile fail."
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
      "explanation": "B tương đương vòng for."
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
      "explanation": "Math.random() trả về [0.0, 1.0)."
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
      "explanation": "Dòng 2 sai cú pháp: private static Character() ids; Compile fail."
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
      "explanation": "new Boolean(\"TRUE\") in ra true."
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
      "explanation": "i++ == 1 sai (i=0), short-circuit && không tăng j. Kết quả i=1, j=1."
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
      "explanation": "Truyền giá trị, a trong modify là local. In 0."
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
      "explanation": "Integer immutable, tham chiếu local thay đổi. In 0."
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
      "explanation": "A: cùng tham chiếu. B, F: so sánh số 10 == 10.0 true. C, D, E sai."
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
      "explanation": "a null → NullPointerException."
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
      "explanation": "Theo PDF đáp án B, C. Lưu ý: thực tế equals so sánh giá trị, == so sánh tham chiếu. Đáp án gốc của đề là B, C."
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
      "explanation": "Theo PDF đáp án D. Lưu ý: args.length = 4, && short-circuit nên args[4] không được truy cập → thực tế in false. Đáp án gốc của đề là D."
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
      "explanation": "Theo PDF đáp án D. Lưu ý: code hợp lệ, thực tế in not equal. Đáp án gốc của đề là D."
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
      "explanation": "A, B, F là is-a. C, D, E là has-a."
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
      "explanation": "B, D override hợp lệ (cùng signature, access rộng hơn hoặc bằng)."
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
      "explanation": "short không override byte → compile fail dòng 8."
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
      "explanation": "B, E là lợi ích encapsulation."
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
      "explanation": "super() phải là statement đầu tiên trong constructor. Compile fail."
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
      "explanation": "Static inner class tạo bằng new Outer.Inner()."
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
      "explanation": "setXY không synchronized → có thể bị interleave, check thấy x != y."
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
      "explanation": "notifyAll() trên object A đánh thức tất cả thread đang wait trên A."
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
      "explanation": "wait() không có lock → IllegalMonitorStateException."
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
      "explanation": "start() gọi run() không tham số → in AAA."
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
      "explanation": "synchronized(this) đảm bảo x, y luôn bằng nhau, mỗi giá trị in 1 lần do lock tuần tự."
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
      "explanation": "wait() yêu cầu lock của object được gọi."
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
      "explanation": "A là daemon, main kết thúc → JVM thoát, không in gì."
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
      "explanation": "wait() đưa thread vào wait pool (non-runnable)."
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
      "explanation": "A và C hợp lệ và in theo thứ tự chèn (alphabet)."
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
      "explanation": "Dùng fully qualified name nên không cần import."
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
      "explanation": "A hợp lệ. C: char '1' chuyển thành float hợp lệ. B sai cú pháp. D sai. E double không gán trực tiếp float."
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
      "explanation": "x null → NullPointerException."
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
      "explanation": "args[1] = green, args[2] = blue, args[3] out of bounds → exception."
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
      "explanation": "Runnable có public void run()."
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
      "explanation": "Anonymous class override hashCode → in 42."
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
      "explanation": "import, default là reserved. run, implement không."
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
      "explanation": "C, D đúng theo contract hashCode/equals."
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
      "explanation": "char là unsigned 16-bit: 0..65535."
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
      "explanation": "float mặc định 0.0."
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
      "explanation": "NULL không phải keyword, chưa khai báo → compile fail."
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
      "explanation": "Hashtable implements Map."
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
      "explanation": "sqrt số âm → NaN."
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
      "explanation": "String immutable, replace không đổi b. In abcd."
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
      "explanation": "x.append(y) đổi a thành AB. y = x chỉ đổi tham chiếu local. In AB,B."
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
      "explanation": "String immutable → textString vẫn java. StringBuffer append → javaC. Kết quả javajavaC."
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
      "explanation": "Math.cos nhận radian → cần toRadians(42)."
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
      "explanation": "t.join() đợi thread t hoàn thành → i = 10."
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
      "explanation": "Math.floor cho giá trị ≤ bar."
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
      "explanation": "C, E override hợp lệ (cùng signature, access rộng hơn hoặc bằng, return void)."
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
      "explanation": "setRadius đảm bảo diameter = 2*radius. Nhưng radius public nên không fully encapsulated."
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
      "explanation": "_object hợp lệ. false, default là keyword. a-class có dấu -."
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
      "explanation": "b + c là int, gán vào byte cần cast → compile fail."
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
      "explanation": "3*4 = 12, 3<<2 = 12."
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
      "explanation": "byte là signed 8-bit: -128..127."
    }
  ]
};
