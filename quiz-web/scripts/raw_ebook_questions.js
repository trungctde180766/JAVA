export const rawQuestions = [
  {
    id: 1, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main(String args[]) {\n3.     class Foo {\n4.       public int i = 3;\n5.     }\n6.     Object o = (Object)new Foo();\n7.     Foo foo = (Foo)o;\n8.     System.out.println(\"i = \" + foo.i);\n9.   }\n10. }\n\nWhat is the result?",
    options: ["i = 3", "Compilation fails.", "A ClassCastException is thrown at line 6.", "A ClassCastException is thrown at line 7."],
    answer: ["A"],
    explanation: "Foo là local class, cast (Object) rồi cast ngược lại (Foo) hợp lệ. Kết quả in ra i = 3."
  },
  {
    id: 2, type: "multi",
    text: "Which two cause a compiler error? (Choose two)",
    options: [
      "float[] = new float(3);",
      "float f2[] = new float[];",
      "float[] f1 = new float[3];",
      "float f3[] = new float[3];",
      "float f5[] = {1.0f, 2.0f, 2.0f };",
      "float f4[] = new float[] {1.0f, 2.0f, 3.0f};"
    ],
    answer: ["A", "B"],
    explanation: "A sai cú pháp (thiếu tên biến, dùng ngoặc tròn). B sai vì new float[] không có kích thước và không có initializer. C, D, E, F đều hợp lệ."
  },
  {
    id: 3, type: "single",
    text: "Given:\n\n11. int i = 1, j = 10;\n12. do {\n13.   if(i++ > --j) {\n14.     continue;\n15.   }\n16. } while (i < 5);\n17. System.out.println(\"i = \" + i + \" and j = \" + j);\n\nWhat is the result?",
    options: ["i = 6 and j = 5", "i = 5 and j = 5", "i = 6 and j = 5", "i = 5 and j = 6", "i = 6 and j = 6"],
    answer: ["D"],
    explanation: "i++ so sánh trước rồi tăng, --j giảm trước rồi so sánh. Vòng lặp chạy đến khi i = 5, j = 6."
  },
  {
    id: 4, type: "single",
    text: "Given:\n\n1. class Test {\n2.   private Demo d;\n3.   void start() {\n4.     d = new Demo();\n5.     this.takeDemo(d);\n6.   }\n7.   void takeDemo(Demo demo) {\n8.     demo = null;\n9.     demo = new Demo();\n10.   }\n11. }\n\nWhen is the Demo object, created on line 3, eligible for garbage collection?",
    options: [
      "After line 5.",
      "After line 9.",
      "After the start() method completes.",
      "When the takeDemo() method completes.",
      "When the instance running this code is made eligible for garbage collection."
    ],
    answer: ["E"],
    explanation: "d vẫn giữ tham chiếu đến Demo sau khi start() kết thúc (biến instance). Chỉ khi object Test bị GC thì Demo mới eligible."
  },
  {
    id: 5, type: "single",
    text: "Given:\n\n1. interface Animal { void soundOff(); }\n5. class Elephant implements Animal {\n6.   public void soundOff() { System.out.println(\"Trumpet\"); }\n9. }\n11. class Lion implements Animal {\n12.   public void soundOff() { System.out.println(\"Roar\"); }\n15. }\n17. class Alpha {\n18.   static Animal get( String choice ) {\n19.     if ( choice.equalsIgnoreCase(\"meat eater\") ) {\n20.       return new Lion();\n21.     } else {\n22.       return new Elephant();\n23.     }\n24.   }\n25. }\n\nWhich compiles?",
    options: [
      "new Animal().soundOff();",
      "Elephant e = new Alpha();",
      "Lion l = Alpha.get(\"meat eater\");",
      "new Alpha().get(\"veggie\").soundOff();"
    ],
    answer: ["D"],
    explanation: "A sai vì Animal là interface. B sai vì Alpha không phải Elephant. C sai vì get() trả về Animal, không gán được cho Lion. D hợp lệ: gọi static method qua instance là legal, trả về Animal, gọi soundOff()."
  },
  {
    id: 6, type: "single",
    text: "Which statement is true?",
    options: [
      "Memory is reclaimed by calling Runtime.gc().",
      "Objects are not collected if they are accessible from live threads.",
      "Objects that have finalize() methods are never garbage collected.",
      "Objects that have finalize() methods always have their finalize() methods called before the program ends.",
      "An OutOfMemory error is only thrown if a single block of memory cannot be found that is large enough for a particular requirement."
    ],
    answer: ["B"],
    explanation: "Object còn reachable từ live thread thì không bị GC. Runtime.gc() chỉ gợi ý, không đảm bảo."
  },
  {
    id: 7, type: "multi",
    text: "Given:\n\n1. class A {\n2.   A() { }\n3. }\n5. class B extends A {\n6. }\n\nWhich two statements are true? (Choose two)",
    options: [
      "Class B's constructor is public.",
      "Class B's constructor has no arguments.",
      "Class B's constructor includes a call to this().",
      "Class B's constructor includes a call to super()."
    ],
    answer: ["B", "D"],
    explanation: "Default constructor của B không có tham số và tự động gọi super(). Access mặc định là package-private (không public)."
  },
  {
    id: 8, type: "single",
    text: "Given:\n\n11. int i = 1, j = 10;\n12. do {\n13.   if(i > j) { break; }\n16.   j--;\n17. } while (++i < 5);\n18. System.out.println(\"i = \" + i + \" and j = \" + j);\n\nWhat is the result?",
    options: ["i = 6 and j = 5", "i = 5 and j = 5", "i = 6 and j = 4", "i = 5 and j = 6", "i = 6 and j = 6"],
    answer: ["D"],
    explanation: "i tăng trước khi so sánh (++i). Khi i = 5, điều kiện sai, j = 6. Kết quả i = 5, j = 6."
  },
  {
    id: 9, type: "single",
    text: "Which statement is true?",
    options: [
      "Assertions can be enabled or disabled on a class-by-class basis.",
      "Conditional compilation is used to allow tested classes to run at full speed.",
      "Assertions are appropriate for checking the validity of arguments in a method.",
      "The programmer can choose to execute a return statement or to throw an exception if an assertion fails."
    ],
    answer: ["A"],
    explanation: "Assertion có thể enable/disable theo class hoặc package. Không dùng để kiểm tra argument public method."
  },
  {
    id: 10, type: "single",
    text: "You want a class to have access to members of another class in the same package. Which is the most restrictive access that accomplishes this objective?",
    options: ["public", "private", "protected", "transient", "default access"],
    answer: ["E"],
    explanation: "Default (package-private) cho phép truy cập trong cùng package, là mức hạn chế nhất đáp ứng yêu cầu."
  },
  {
    id: 11, type: "single",
    text: "Given:\n\n11. int x = 3;\n12. int y = 1;\n13. if (x = y) {\n14.   System.out.println(\"x = \" + x);\n15. }\n\nWhat is the result?",
    options: ["x = 1", "x = 3", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["C"],
    explanation: "if (x = y) dùng phép gán, không phải so sánh; trong Java điều kiện phải là boolean nên compile fail."
  },
  {
    id: 12, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void aMethod() throws Exception {\n3.     try {\n4.       throw new Exception();\n5.     } finally {\n6.       System.out.println(\"finally\");\n7.     }\n8.   }\n9.   public static void main(String args[]) {\n10.    try { aMethod(); }\n11.    catch (Exception e) { System.out.println(\"exception\"); }\n14.    System.out.println(\"finished\");\n16.  }\n17. }\n\nWhat is the result?",
    options: ["finally", "exception finished", "finally exception finished", "Compilation fails."],
    answer: ["C"],
    explanation: "finally chạy trước, sau đó exception được catch, rồi finished."
  },
  {
    id: 13, type: "multi",
    text: "Given:\n\n1. public interface Foo {\n2.   int k = 4;\n3. }\n\nWhich three are equivalent to line 2? (Choose three)",
    options: ["final int k = 4;", "public int k = 4;", "static int k = 4;", "abstract int k = 4;", "volatile int k = 4;", "protected int k = 4;"],
    answer: ["A", "B", "C"],
    explanation: "Biến trong interface mặc định là public static final. A, B, C tương đương."
  },
  {
    id: 14, type: "single",
    text: "Given:\n\n1. package test1;\n2. public class Test1 {\n3.   static int x = 42;\n4. }\n\n1. package test2;\n2. public class Test2 extends test1.Test1 {\n3.   public static void main(String[] args) {\n4.     System.out.println(\"x = \" + x);\n5.   }\n6. }\n\nWhat is the result?",
    options: ["x = 0", "x = 42", "Compilation fails because of an error in line 2 of class Test2.", "Compilation fails because of an error in line 3 of class Test1.", "Compilation fails because of an error in line 4 of class Test2."],
    answer: ["C"],
    explanation: "x có default access (package-private) trong test1, không truy cập được từ test2. Lỗi ở dòng 2 Test2 (extends không giúp truy cập static package-private)."
  },
  {
    id: 15, type: "multi",
    text: "Given:\n\n1. class A {\n2.   protected int method(int a, int b) { return 0; }\n3. }\n\nWhich two are valid in a class that extends class A? (Choose two)",
    options: [
      "public int method(int a, int b) { return 0; }",
      "private int method(int a, int b) { return 0; }",
      "private int method(int a, long b) { return 0; }",
      "public short method(int a, int b) { return 0; }",
      "static protected int method(int a, int b) { return 0; }"
    ],
    answer: ["A", "C"],
    explanation: "A: mở rộng access hợp lệ (overriding). C: khác tham số (long) nên là overload hợp lệ. B thu hẹp access sai. D sai return type. E static không override được instance method."
  },
  {
    id: 16, type: "single",
    text: "Given:\n\n1. public class Delta {\n2.   static boolean foo(char c) {\n3.     System.out.print(c);\n4.     return true;\n5.   }\n6.   public static void main( String[] argv ) {\n7.     int i = 0;\n8.     for ( foo('A'); foo('B') && (i < 2); foo('C') ) {\n9.       i++;\n10.      foo('D');\n12.    }\n13.  }\n14. }\n\nWhat is the result?",
    options: ["ABDCBDCB", "ABCDABCD", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "Thứ tự: A, B, D, C, B, D, C, B → ABDCBDCB."
  },
  {
    id: 17, type: "single",
    text: "Given:\n\n1. public class Test{\n2.   public static void main( String[] argv ){\n3.     // insert statement here\n4.   }\n5. }\n\nWhich statement, inserted at line 3, produces the following output?\nException in thread \"main\" java.lang.AssertionError: true at Test.main(Test.java:3)",
    options: ["assert true;", "assert false;", "assert false : true;", "assert false == true;", "assert false: false;"],
    answer: ["C"],
    explanation: "assert false : true → AssertionError với message \"true\"."
  },
  {
    id: 18, type: "single",
    text: "Given:\n\n1. public class ArrayTest {\n2.   public static void main(String[] args) {\n3.     float f1[], f2[];\n4.     f1 = new float[10];\n5.     f2 = f1;\n6.     System.out.println(\"f2[0] = \" + f2[0]);\n7.   }\n8. }\n\nWhat is the result?",
    options: ["It prints f2[0] = 0.0.", "It prints f2[0] = NaN.", "An error at line 5 causes compile to fail.", "An error at line 6 causes compile to fail.", "An error at line 6 causes an exception at runtime."],
    answer: ["A"],
    explanation: "Mảng float mặc định 0.0f. In ra f2[0] = 0.0."
  },
  {
    id: 19, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public int aMethod() {\n3.     static int i = 0;\n4.     i++;\n5.     return i;\n6.   }\n7.   public static void main (String args[]) {\n8.     Test test = new Test();\n9.     test.aMethod();\n10.    int j = test.aMethod();\n11.    System.out.println(j);\n12.  }\n13. }\n\nWhat is the result?",
    options: ["0", "1", "2", "Compilation fails."],
    answer: ["D"],
    explanation: "Không thể khai báo static local variable trong method. Compile fail."
  },
  {
    id: 20, type: "single",
    text: "Given:\n\n1. class Super {\n2.   public float getNum() { return 3.0f; }\n3. }\n5. public class Sub extends Super {\n6.   // line 6\n7. }\n\nWhich method, placed at line 6, causes compilation to fail?",
    options: [
      "public void getNum() { }",
      "public void getNum(double d) { }",
      "public float getNum() { return 4.0f; }",
      "public double getNum(float d) { return 4.0d; }"
    ],
    answer: ["A"],
    explanation: "A có cùng signature nhưng return type khác → không phải overload hợp lệ, compile fail."
  },
  {
    id: 21, type: "single",
    text: "Given:\n\n11. boolean bool = true;\n12. if(bool = false) {\n13.   System.out.println(\"a\");\n14. } else if (bool) {\n15.   System.out.println(\"b\");\n16. } else if (!bool) {\n17.   System.out.println(\"c\");\n18. } else {\n19.   System.out.println(\"d\");\n20. }\n\nWhat is the result?",
    options: ["a", "b", "c", "d", "Compilation fails."],
    answer: ["C"],
    explanation: "bool = false gán false. else if (!bool) đúng → in \"c\"."
  },
  {
    id: 22, type: "single",
    text: "Which statement is true?",
    options: [
      "catch(X x) can catch subclasses of X.",
      "The Error class is a RuntimeException.",
      "Any statement that can throw an Error must be enclosed in a try block.",
      "Any statement that can throw an Exception must be enclosed in a try block.",
      "Any statement that can throw a RuntimeException must be enclosed in a try block."
    ],
    answer: ["A"],
    explanation: "catch(X) bắt được X và subclass của X. Error không phải RuntimeException."
  },
  {
    id: 23, type: "single",
    text: "Which statement is true about assertion in the Java programming language?",
    options: [
      "Assertion expressions should not contain side effects.",
      "Assertion expression values can be any primitive type.",
      "Assertion should be used for enforcing preconditions on public methods.",
      "An AssertionError thrown as a result of a failed assertion should always be handled by the enclosing method."
    ],
    answer: ["A"],
    explanation: "Assertion không nên có side effect vì có thể bị disable. Không dùng cho public method precondition."
  },
  {
    id: 24, type: "single",
    text: "Given:\n\n1. package foo;\n3. import java.util.Vector;\n5. private class MyVector extends Vector {\n6.   int i = 1;\n7.   public MyVector() { i = 2; }\n10. }\n12. public class MyNewVector extends MyVector {\n13.   public MyNewVector() { i = 4; }\n16.   public static void main(String args[]) {\n17.     MyVector v = new MyNewVector();\n18.   }\n19. }\n\nWhat is the result?",
    options: ["Compilation succeeds.", "Compilation fails because of an error at line 5.", "Compilation fails because of an error at line 6.", "Compilation fails because of an error at line 14.", "Compilation fails because of an error at line 17."],
    answer: ["B"],
    explanation: "Top-level class không thể là private. Lỗi ở dòng 5."
  },
  {
    id: 25, type: "single",
    text: "Given:\n\n1. class TestSuper {\n2.   TestSuper(int i) { }\n3. }\n4. class TestSub extends TestSuper {\n5. }\n6. class TestAll {\n7.   public static void main (String [] args) {\n8.     new TestSub();\n9.   }\n10. }\n\nWhich is true?",
    options: ["Compilation fails.", "The code runs without exception.", "An exception is thrown at line 7.", "An exception is thrown at line 2."],
    answer: ["A"],
    explanation: "TestSuper không có constructor no-arg, TestSub không gọi super(int) → compile fail."
  },
  {
    id: 26, type: "single",
    text: "Given:\n\n10. int i = 0;\n11. for (; i < 4; i += 2) {\n12.   System.out.print(i + \" \");\n13. }\n14. System.out.println(i);\n\nWhat is the result?",
    options: ["0 2 4", "0 2 4 5", "0 1 2 3 4", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "In 0 2 rồi i = 4, in 4 → 0 2 4."
  },
  {
    id: 27, type: "single",
    text: "Given:\n\n1. public class SwitchTest {\n2.   public static void main(String[] args) {\n3.     System.out.println(\"value = \" + switchIt(4));\n4.   }\n5.   public static int switchIt(int x) {\n6.     int j = 1;\n7.     switch (x) {\n8.       case 1: j++;\n9.       case 2: j++;\n10.      case 3: j++;\n11.      case 4: j++;\n12.      case 5: j++;\n13.      default: j++;\n14.    }\n15.    return j + x;\n16.  }\n17. }\n\nWhat is the result?",
    options: ["value = 3", "value = 4", "value = 5", "value = 6", "value = 7", "value = 8"],
    answer: ["F"],
    explanation: "x = 4: j = 1 → case 4 j=2, case 5 j=3, default j=4. return 4+4=8."
  },
  {
    id: 28, type: "multi",
    text: "Which three form part of correct array declarations? (Choose three)",
    options: ["public int a [ ]", "static int [] a", "public [] int a", "private int a [3]", "private int [3] a [ ]", "public final int [] a"],
    answer: ["A", "B", "F"],
    explanation: "A, B, F đúng cú pháp. C sai thứ tự. D, E sai vì không được ghi kích thước trong khai báo."
  },
  {
    id: 29, type: "single",
    text: "Given:\n\n1. public class Foo {\n2.   public static void main(String[] args) {\n3.     try {\n4.       return;\n5.     } finally {\n6.       System.out.println(\"Finally\");\n7.     }\n8.   }\n9. }\n\nWhat is the result?",
    options: ["Finally", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "finally luôn chạy trước khi return. In \"Finally\"."
  },
  {
    id: 30, type: "single",
    text: "ClassOne.java:\n1. package com.abe.pkg1;\n2. public class ClassOne {\n3.   private char var = 'a';\n4.   char getVar() { return var; }\n5. }\n\nClassTest.java:\n1. package com.abe.pkg2;\n2. import com.abc.pkg1.ClassOne;\n3. public class ClassTest extends ClassOne {\n4.   public static void main(String[] args) {\n5.     char a = new ClassOne().getVar();\n6.     char b = new ClassTest().getVar();\n7.   }\n8. }\n\nWhat is the result?",
    options: ["Compilation fails.", "Compilation succeeds and no exceptions are thrown.", "An exception is thrown at line 5 in ClassTest.java.", "An exception is thrown at line 6 in ClassTest.java."],
    answer: ["A"],
    explanation: "getVar() có default access, không truy cập được từ package khác (pkg2). Compile fail."
  },
  {
    id: 31, type: "single",
    text: "Given:\n\n1. public class Alpha1 {\n2.   public static void main( String[] args ) {\n3.     boolean flag; int i = 0;\n5.     do {\n6.       flag = false;\n7.       System.out.println( i++ );\n8.       flag = i < 10;\n9.       continue;\n10.    } while ( (flag)? true:false );\n11.  }\n12. }\n\nWhat is the result?",
    options: ["000000000", "0123456789", "Compilation fails.", "The code runs with no output.", "The code enters an infinite loop.", "An exception is thrown at runtime."],
    answer: ["B"],
    explanation: "In 0..9, i lên 10 thì flag false, thoát. Kết quả 0123456789."
  },
  {
    id: 32, type: "single",
    text: "Given:\n\n1. package foo;\n3. import java.util.Vector;\n5. protected class MyVector extends Vector {\n6.   int i = 1;\n7.   public MyVector() { i = 2; }\n10. }\n12. public class MyNewVector extends MyVector {\n13.   public MyNewVector() { i = 4; }\n16.   public static void main(String args[]) {\n17.     MyVector v = new MyNewVector();\n18.   }\n19. }\n\nWhat is the result?",
    options: ["Compilation succeeds.", "Compilation fails because of an error at line 5.", "Compilation fails because of an error at line 6.", "Compilation fails because of an error at line 14.", "Compilation fails because of an error at line 17."],
    answer: ["B"],
    explanation: "Top-level class không thể protected. Lỗi dòng 5."
  },
  {
    id: 33, type: "single",
    text: "Given:\n\n1. class Super {\n2.   public Integer getLength() { return new Integer(4); }\n3. }\n5. public class Sub extends Super {\n6.   public Long getLength() { return new Long(5); }\n8.   public static void main(String[] args) {\n9.     Super sooper = new Super();\n10.    Sub sub = new Sub();\n11.    System.out.println(sooper.getLength().toString() + \",\" + sub.getLength().toString());\n14.  }\n15. }\n\nWhat is the output?",
    options: ["4,4", "4,5", "5,4", "5,5", "Compilation fails."],
    answer: ["A"],
    explanation: "Theo PDF đáp án A. Lưu ý: Long không phải subtype của Integer nên về lý thuyết Java hiện đại đây là lỗi compile (không thể overload chỉ khác return type). Đáp án gốc của đề là A."
  },
  {
    id: 34, type: "fill",
    text: "Given:\n\n1. public class Test {\n2.   public static String output = \"\";\n4.   public static void foo(int i) {\n5.     try {\n6.       if(i==1) { throw new Exception(); }\n9.       output += \"1\";\n10.    } catch(Exception e) {\n12.      output += \"2\";\n13.      return;\n14.    } finally {\n16.      output += \"3\";\n17.    }\n18.    output += \"4\";\n19.  }\n21.  public static void main(String args[]) {\n22.    foo(0);\n23.    foo(1);\n25.  }\n26. }\n\nWhat is the value of the variable output at line 23?",
    options: [],
    answer: ["13423"],
    explanation: "foo(0): 1,3,4 → \"134\". foo(1): catch 2, finally 3, return → \"23\". Tổng: 13423."
  },
  {
    id: 35, type: "single",
    text: "Given:\n\n10. public Object m() {\n11.   Object o = new Float(3.14F);\n12.   Object [] oa = new Object[1];\n13.   oa[0] = o;\n14.   o = null;\n15.   return oa[0];\n16. }\n\nWhen is the Float object, created in line 11, eligible for garbage collection?",
    options: [
      "Just after line 13.",
      "Just after line 14.",
      "Never in this method.",
      "Just after line 15 (that is, as the method returns)."
    ],
    answer: ["C"],
    explanation: "Object được return nên không eligible trong method này."
  },
  {
    id: 36, type: "single",
    text: "Given:\n\n1. class Base {\n2.   Base() { System.out.print(\"Base\"); }\n3. }\n4. public class Alpha extends Base {\n5.   public static void main( String[] args ) {\n6.     new Alpha();\n7.     new Base();\n8.   }\n9. }\n\nWhat is the result?",
    options: ["Base", "BaseBase", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["B"],
    explanation: "new Alpha() in Base (constructor Base), new Base() in Base → BaseBase."
  },
  {
    id: 37, type: "single",
    text: "Given:\n\n11. int i = 1, j = -1;\n12. switch (i) {\n13.   case 0, 1: j = 1;\n14.   case 2: j = 2;\n15.   default: j = 0;\n16. }\n17. System.out.println(\"j=\" + j);\n\nWhat is the result?",
    options: ["j=-1", "j=0", "j=1", "j=2", "Compilation fails."],
    answer: ["E"],
    explanation: "case 0, 1 không hợp lệ cú pháp Java. Compile fail."
  },
  {
    id: 38, type: "single",
    text: "Given:\n\n1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (Exception ex) {\n8.       System.out.print(\"B\");\n9.     } finally {\n11.      System.out.print(\"C\");\n12.    }\n13.    System.out.print(\"D\");\n14.  }\n15.  public static void badMethod() {\n17.  }\n18. }\n\nWhat is the result?",
    options: ["AC", "BCD", "ABCD", "Compilation fails."],
    answer: ["C"],
    explanation: "Theo PDF đáp án C. Thực tế badMethod() không ném exception nên in A, C, D → ACD. Đề gốc có thể có sai sót OCR."
  },
  {
    id: 39, type: "multi",
    text: "Which two are valid declarations within an interface definition? (Choose two)",
    options: ["void methoda();", "public double methoda();", "public final double methoda();", "static void methoda(double d1);", "protected void methoda(double d1);"],
    answer: ["A", "B"],
    explanation: "Interface method mặc định public abstract. A, B hợp lệ. C sai (final). D static không hợp lệ trong interface Java 1.4. E protected sai."
  },
  {
    id: 40, type: "multi",
    text: "Which two allow the class Thing to be instantiated using new Thing()? (Choose two)",
    options: [
      "public class Thing { }",
      "public class Thing { public Thing() { } }",
      "public class Thing { public Thing(void) { } }",
      "public class Thing { public Thing(String s) { } }",
      "public class Thing { public void Thing() { } public Thing(String s) { } }"
    ],
    answer: ["A", "B"],
    explanation: "A có default constructor. B có constructor no-arg. C sai void. D chỉ có constructor String. E Thing() là method void không phải constructor."
  },
  {
    id: 41, type: "single",
    text: "Given:\n\n11. Float f = new Float(\"12\");\n12. switch (f) {\n13.   case 12: System.out.println(\"Twelve\");\n14.   case 0: System.out.println(\"Zero\");\n15.   default: System.out.println(\"Default\");\n16. }\n\nWhat is the result?",
    options: ["Zero", "Twelve", "Default", "Twelve Zero Default", "Compilation fails."],
    answer: ["E"],
    explanation: "switch không nhận Float (wrapper). Compile fail."
  },
  {
    id: 42, type: "single",
    text: "Given:\n\n1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (Exception ex) {\n8.       System.out.print(\"B\");\n9.     } finally {\n11.      System.out.print(\"C\");\n12.    }\n13.    System.out.print(\"D\");\n14.  }\n15.  public static void badMethod() {\n16.    throw new RuntimeException();\n17.  }\n18. }\n\nWhat is the result?",
    options: ["AB", "BC", "ABC", "BCD", "Compilation fails."],
    answer: ["D"],
    explanation: "RuntimeException → catch B, finally C, rồi D → BCD."
  },
  {
    id: 43, type: "multi",
    text: "Given:\n\n1. class TestA {\n2.   TestB b;\n3.   TestA() { b = new TestB(this); }\n6. }\n7. class TestB {\n8.   TestA a;\n9.   TestB(TestA a) { this.a = a; }\n12. }\n13. class TestAll {\n14.   public static void main (String args[]) {\n15.     new TestAll().makeThings();\n17.   }\n18.   void makeThings() {\n19.     TestA test = new TestA();\n20.   }\n21. }\n\nWhich two statements are true after line 15, before main completes? (Choose two)",
    options: [
      "Line 15 causes a stack overflow.",
      "An exception is thrown at runtime.",
      "The object referenced by a is eligible for garbage collection.",
      "The object referenced by b is eligible for garbage collection.",
      "The object referenced by a is not eligible for garbage collection.",
      "The object referenced by b is not eligible for garbage collection."
    ],
    answer: ["C", "D"],
    explanation: "Sau line 15, test không còn tham chiếu, TestA và TestB tạo thành island of isolation → cả hai eligible."
  },
  {
    id: 44, type: "single",
    text: "Given:\n\n11. for (int i = 0; i < 3; i++) {\n12.   switch(i) {\n13.     case 0: break;\n14.     case 1: System.out.print(\"one \");\n15.     case 2: System.out.print(\"two \");\n16.     case 3: System.out.print(\"three \");\n17.   }\n18. }\n19. System.out.println(\"done\");\n\nWhat is the result?",
    options: ["done", "one two done", "one two three done", "one two three two three done", "Compilation fails."],
    answer: ["D"],
    explanation: "i=0 break; i=1 in one two three; i=2 in two three; rồi done → one two three two three done."
  },
  {
    id: 45, type: "multi",
    text: "Which three statements are true? (Choose three)",
    options: [
      "The default constructor initializes method variables.",
      "The default constructor has the same access as its class.",
      "The default constructor invoked the no-arg constructor of the superclass.",
      "If a class lacks a no-arg constructor, the compiler always creates a default constructor.",
      "The compiler creates a default constructor only when there are no other constructors for the class."
    ],
    answer: ["B", "C", "E"],
    explanation: "B, C, E đúng. A sai (không init method var). D sai (chỉ tạo khi không có constructor nào)."
  },
  {
    id: 46, type: "multi",
    text: "Which three statements are true? (Choose three)",
    options: [
      "Assertion checking is typically enabled when a program is deployed.",
      "It is never appropriate to write code to handle failure of an assert statement.",
      "Assertion checking is typically enabled during program development and testing.",
      "Assertion checking can be selectively enabled or disable an a per-package basis, but not on a per-class basis.",
      "Assertion checking can be selectively enabled or disabled on both a per-package basis and a per-class basis."
    ],
    answer: ["B", "C", "E"],
    explanation: "B, C, E đúng. A sai (deploy thường disable). D sai (có thể per-class)."
  },
  {
    id: 47, type: "single",
    text: "Which statement is true?",
    options: [
      "A try statement must have at least one corresponding catch block.",
      "Multiple catch statements can catch the same class of exception more than once.",
      "An Error that might be thrown in a method must be declared as thrown by that method, or be handled within that method.",
      "Except in case of VM shutdown, if a try block starts to execute, a corresponding finally block will always start to execute.",
      "Except in case of VM shutdown, if a try block starts to execute, a corresponding finally block must always run to completion."
    ],
    answer: ["E"],
    explanation: "finally luôn chạy hoàn tất trừ khi VM shutdown. A sai (try-finally không cần catch)."
  },
  {
    id: 48, type: "single",
    text: "Given:\n\n1. class A {\n2.   final public int method1(int a, int b) {return 0; }\n3. }\n4. class B extends A {\n5.   public int method1(int a, int b) {return 1; }\n6. }\n7. public class Test {\n8.   public static void main(String args[]) {\n9.     B b;\n10.    System.out.println(\"x = \" + b.method1(0, 1));\n11.  }\n12. }\n\nWhat is the result?",
    options: ["x = 0", "x = 1", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["C"],
    explanation: "Không thể override final method. Compile fail."
  },
  {
    id: 49, type: "single",
    text: "Given:\n\n10. public Object m() {\n11.   Object o = new Float(3.14F);\n12.   Object [] oa = new Object[1];\n13.   oa[0] = o;\n14.   o = null;\n15.   oa[0] = null;\n16.   return o;\n17. }\n\nWhen is the Float object, created in line 11, eligible for garbage collection?",
    options: ["Just after line 13.", "Just after line 14.", "Just after line 15.", "Just after line 16 (that is, as the method returns)."],
    answer: ["C"],
    explanation: "Sau line 15, cả o và oa[0] đều null → Float eligible."
  },
  {
    id: 50, type: "single",
    text: "Given:\n\n11. public void test(int x) {\n12.   int odd = x % 2;\n13.   if (odd) {\n14.     System.out.println(\"odd\");\n15.   } else {\n16.     System.out.println(\"even\");\n17.   }\n18. }\n\nWhich statement is true?",
    options: ["Compilation fails.", "\"odd\" will always be output.", "\"even\" will always be output.", "\"odd\" will be output for odd values of x, and \"even\" for even values.", "\"even\" will be output for odd values of x, and \"odd\" for even values."],
    answer: ["A"],
    explanation: "if (odd) với odd là int không hợp lệ trong Java. Compile fail."
  },
  {
    id: 51, type: "multi",
    text: "Which two create an instance of an array? (Choose two)",
    options: ["int[] ia = new int[15];", "float fa = new float[20];", "char[] ca = \"Some String\";", "Object oa = new float[20];", "int ia[][] = { 4, 5, 6 }, { 1, 2, 3 };"],
    answer: ["A", "D"],
    explanation: "A, D hợp lệ. B sai (float không phải mảng). C sai. E sai cú pháp."
  },
  {
    id: 52, type: "single",
    text: "Given:\n\n1. class Super {\n2.   public int getLength() { return 4; }\n3. }\n5. public class Sub extends Super {\n6.   public long getLength() { return 5; }\n8.   public static void main(String[] args) {\n9.     Super sooper = new Super();\n10.    Sub sub = new Sub();\n11.    System.out.println(sooper.getLength() + \",\" + sub.getLength());\n13.  }\n14. }\n\nWhat is the output?",
    options: ["4,4", "4,5", "5,4", "5,5", "Compilation fails."],
    answer: ["E"],
    explanation: "long không override int (return type khác) → compile fail."
  },
  {
    id: 53, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main(String[] args) {\n3.     int x = 0;\n4.     assert (x > 0) : \"assertion failed\";\n5.     System.out.println(\"finished\");\n6.   }\n7. }\n\nWhat is the result?",
    options: ["finished", "Compilation fails.", "An AssertionError is thrown.", "An AssertionError is thrown and finished is output."],
    answer: ["A"],
    explanation: "Mặc định assertion disabled → in finished."
  },
  {
    id: 54, type: "single",
    text: "You want to limit access to a method of a public class to members of the same class. Which access accomplishes this objective?",
    options: ["public", "private", "protected", "transient", "default access"],
    answer: ["B"],
    explanation: "private chỉ truy cập trong cùng class."
  },
  {
    id: 55, type: "multi",
    text: "Given:\n\n11. switch(x) {\n12.   default:\n13.     System.out.println(\"Hello\");\n14. }\n\nWhich two are acceptable types for x? (Choose two)",
    options: ["byte", "long", "char", "float", "Short", "Long"],
    answer: ["A", "C"],
    explanation: "switch nhận byte, char (và int, short). Không nhận long, float, wrapper."
  },
  {
    id: 56, type: "single",
    text: "Given:\n\n1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (RuntimeException ex) {\n8.       System.out.print(\"B\");\n9.     } catch (Exception ex1) {\n11.      System.out.print(\"C\");\n12.    } finally {\n14.      System.out.print(\"D\");\n15.    }\n16.    System.out.print(\"E\");\n17.  }\n18.  public static void badMethod() {\n19.    throw new RuntimeException();\n20.  }\n21. }\n\nWhat is the result?",
    options: ["BD", "BCD", "BDE", "BCDE", "ABCDE", "Compilation fails."],
    answer: ["C"],
    explanation: "RuntimeException → catch B, finally D, rồi E → BDE."
  },
  {
    id: 57, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main(String[] args) {\n3.     int x = 0;\n4.     assert (x > 0) ? \"assertion failed\" : \"assertion passed\";\n5.     System.out.println(\"Finished\");\n6.   }\n7. }\n\nWhat is the result?",
    options: ["finished", "Compilation fails.", "An AssertionError is thrown and finished is output.", "An AssertionError is thrown with the message \"assertion failed\".", "An AssertionError is thrown with the message \"assertion passed\"."],
    answer: ["B"],
    explanation: "assert phải có dạng assert expr : expr; không dùng ternary như vậy. Compile fail."
  },
  {
    id: 58, type: "single",
    text: "Given:\n\n1. public class ReturnIt {\n2.   returnType methodA(byte x, double y) {\n3.     return (long)x / y * 2;\n4.   }\n5. }\n\nWhat is the narrowest valid returnType for methodA in line2?",
    options: ["int", "byte", "long", "short", "float", "double"],
    answer: ["F"],
    explanation: "(long)x / y * 2 → double. Return type hẹp nhất hợp lệ là double."
  },
  {
    id: 59, type: "multi",
    text: "Given:\n\n1. public class OuterClass {\n2.   private double d1 = 1.0;\n3.   // insert code here\n4. }\n\nWhich two are valid if inserted at line 3? (Choose two)",
    options: [
      "static class InnerOne { public double methoda() { return d1; } }",
      "static class InnerOne { static double methoda() { return d1; } }",
      "private class InnerOne { public double methoda() { return d1; } }",
      "protected class InnerOne { static double methoda() { return d1; } }",
      "public abstract class InnerOne { public abstract double methoda(); }"
    ],
    answer: ["C", "E"],
    explanation: "C hợp lệ (inner class truy cập d1). E hợp lệ. A, B sai vì static class không truy cập được instance var d1. D sai tương tự."
  },
  {
    id: 60, type: "single",
    text: "Given:\n\n1. public class Foo {\n2.   public void main(String[] args) {\n3.     System.out.println(\"Hello\" + args[0] );\n4.   }\n5. }\n\nWhat is the result if this code is executed with the command line?\njava Foo world",
    options: ["Hello", "Hello Foo", "Hello world", "Compilation fails.", "The code does not run."],
    answer: ["E"],
    explanation: "main không static → JVM không tìm thấy entry point. Code không chạy."
  },
  {
    id: 61, type: "single",
    text: "Given:\n\n11. public void foo(boolean a, boolean b) {\n12.   if( a ) {\n13.     System.out.println(\"A\");\n14.   } else if ( a && b ) {\n15.     System.out.println(\"A&&B\");\n16.   } else {\n17.     if ( !b ) {\n18.       System.out.println(\"notB\");\n19.     } else {\n20.       System.out.println(\"ELSE\");\n21.     }\n22.   }\n23. }\n\nWhat is correct?",
    options: [
      "If a is true and b is true then the output is \"A&&B\".",
      "If a is true and b is false then the output is \"notB\".",
      "If a is false and b is true then the output is \"ELSE\".",
      "If a is false and b is false then the output is \"ELSE\"."
    ],
    answer: ["C"],
    explanation: "a=false, b=true → else, !b false → ELSE. Đúng."
  },
  {
    id: 62, type: "multi",
    text: "Which two cause a compiler error? (Choose two)",
    options: [
      "int[] scores = {3, 5, 7};",
      "int [] [] scores = {2, 7, 6}, {9, 3, 45};",
      "String cats[] = {\"Fluffy\", \"Spot\", \"Zeus\"};",
      "boolean results[] = new boolean [3] {true, false, true};",
      "Integer results[] = {new Integer(3), new Integer(5), new Integer(8)};",
      "String[] dogs = new String[] {new String(\"Fido\"), new String(\"Spike\"), new String(\"Aiko\")};"
    ],
    answer: ["B", "D"],
    explanation: "B sai cú pháp mảng 2 chiều. D sai vì không được ghi cả kích thước và initializer."
  },
  {
    id: 63, type: "single",
    text: "Given:\n\n11. int i = 0, j = 5;\n12. tp;\n13. for (;;) {\n14.   i++;\n15.   for (;;) {\n16.     if (i > --j) {\n17.       break tp;\n18.     }\n19.   }\n20. }\n21. System.out.println(\"i=\" + i + \",j =\" + j);\n\nWhat is the result?",
    options: ["i = 1, j = 0", "i = 1, j = 4", "i = 3, j = 4", "i = 3, j = 0", "Compilation fails."],
    answer: ["E"],
    explanation: "Thiếu nhãn tp: trước for. Compile fail."
  },
  {
    id: 64, type: "multi",
    text: "Given:\n\n1. public abstract class Test {\n2.   public abstract void methodA();\n4.   public abstract void methodB()\n5.   {\n6.     System.out.println(\"Hello\");\n7.   }\n8. }\n\nWhich two changes, independently applied, allow this code to compile? (Choose two)",
    options: [
      "Add a method body to methodA.",
      "Replace lines 5 - 7 with a semicolon (\";\").",
      "Remove the abstract qualifier from the declaration of Test.",
      "Remove the abstract qualifier from the declaration of methodA.",
      "Remove the abstract qualifier from the declaration of methodB."
    ],
    answer: ["B", "E"],
    explanation: "B: bỏ body methodB. E: bỏ abstract khỏi methodB. A sai vì methodA đã abstract không body là đúng. C sai vì class abstract vẫn cần method abstract không body."
  },
  {
    id: 65, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main(String Args[]) {\n3.     int i = 1, j = 0;\n4.     switch(i) {\n5.       case 2: j += 6;\n6.       case 4: j += 1;\n7.       default: j += 2;\n8.       case 0: j += 4;\n9.     }\n10.    System.out.println(\"j = \" + j);\n11.  }\n12. }\n\nWhat is the result?",
    options: ["0", "2", "4", "6", "9", "13"],
    answer: ["D"],
    explanation: "i=1 không khớp case nào → default j=2, case 0 j=6. Kết quả 6."
  },
  {
    id: 66, type: "multi",
    text: "Given:\n\n1. class A { }\n3. class Alpha {\n4.   private A myA = new A();\n6.   void dolt(A a) {\n7.     a = null;\n8.   }\n9.   void tryIt() {\n10.    dolt(myA);\n11.  }\n12. }\n\nWhich two statements are correct? (Choose two)",
    options: [
      "There are no instances of A that will become eligible for garbage collection.",
      "Explicitly setting myA to null marks that instance to be eligible for garbage collection.",
      "Any call on tryIt() causes the private instance of A to be marked for garbage collection.",
      "Private instances of A become eligible for garbage collection when instances of Alpha become eligible for garbage collection."
    ],
    answer: ["B", "D"],
    explanation: "B đúng. D đúng. A sai. C sai vì dolt chỉ set tham chiếu local."
  },
  {
    id: 67, type: "single",
    text: "Given:\n\n1. class Super {\n2.   public int i = 0;\n4.   public Super(String text) { i = 1; }\n7. }\n9. public class Sub extends Super {\n10.  public Sub(String text) { i = 2; }\n14.  public static void main(String args[]) {\n15.    Sub sub = new Sub(\"Hello\");\n16.    System.out.println(sub.i);\n17.  }\n18. }\n\nWhat is the result?",
    options: ["0", "1", "2", "Compilation fails."],
    answer: ["C"],
    explanation: "Theo PDF đáp án C. Lưu ý: Super không có constructor no-arg, Sub không gọi super(text) → về lý thuyết compile fail. Đáp án gốc của đề là C."
  },
  {
    id: 68, type: "single",
    text: "Given:\n\n11. int i = 1, j = 10;\n12. do {\n13.   if (i > j) { continue; }\n16.   j--;\n17. } while (++i < 6);\n18. System.out.println(\"i = \" + i + \" and j = \" + j);\n\nWhat is the result?",
    options: ["i = 6 and j = 5", "i = 5 and j = 5", "i = 6 and j = 4", "i = 5 and j = 6", "i = 6 and j = 6"],
    answer: ["A"],
    explanation: "i tăng đến 6, j giảm 5 lần → j=5. Kết quả i=6, j=5."
  },
  {
    id: 69, type: "single",
    text: "Which fragment is an example of inappropriate use of assertions?",
    options: [
      "assert (!(map.contains(x))) ; map.add(x);",
      "if (x > 0) { } else { assert (x == 0) ; }",
      "public void aMethod(int x) { assert (x > 0) ; }",
      "assert (invariantCondition()); return retval;",
      "switch (x) { case 1: break; case 2: break; default: assert (x == 0) ; }"
    ],
    answer: ["C"],
    explanation: "Assertion không dùng để kiểm tra precondition của public method."
  },
  {
    id: 70, type: "multi",
    text: "Given:\n\n1. public class X {\n2.   public X aMethod() { return this; }\n3. }\n1. public class Y extends X {\n2. }\n\nWhich two methods can be added to the definition of class Y? (Choose two)",
    options: [
      "public void aMethod() { }",
      "private void aMethod() { }",
      "public void aMethod(String s) { }",
      "private Y aMethod() { return null; }",
      "public X aMethod() { return new Y(); }"
    ],
    answer: ["C", "E"],
    explanation: "C overload hợp lệ. E override hợp lệ (covariant return). A, B, D sai."
  },
  {
    id: 71, type: "single",
    text: "Given:\n\n1. public class X {\n2.   public static void main(String [] args) {\n3.     try {\n4.       badMethod();\n5.       System.out.print(\"A\");\n6.     } catch (Exception ex) {\n8.       System.out.print(\"C\");\n9.     } finally {\n11.      System.out.print(\"B\");\n12.    }\n13.    System.out.print(\"D\");\n14.  }\n15.  public static void badMethod() {\n16.    throw new Error();\n17.  }\n18. }\n\nWhat is the result?",
    options: ["ABCD", "Compilation fails.", "C is printed before exiting with an error message.", "BC is printed before exiting with an error message.", "BCD is printed before exiting with an error message."],
    answer: ["B"],
    explanation: "Theo PDF đáp án B. Thực tế: Error không bị catch bởi Exception, finally in B, rồi Error thoát → in B rồi error message. Đáp án gốc của đề là B."
  },
  {
    id: 72, type: "single",
    text: "You want subclasses in any package to have access to members of a superclass. Which is the most restrictive access that accomplishes this objective?",
    options: ["public", "private", "protected", "transient", "default access"],
    answer: ["C"],
    explanation: "protected cho phép subclass ở package khác truy cập."
  },
  {
    id: 73, type: "single",
    text: "Given:\n\n1. class Exc0 extends Exception { }\n2. class Exc1 extends Exc0 { }\n3. public class Test {\n4.   public static void main(String args[]) {\n5.     try {\n6.       throw new Exc1();\n7.     } catch (Exc0 e0) {\n8.       System.out.println(\"Exc0 caught\");\n9.     } catch (Exception e) {\n10.      System.out.println(\"exception caught\");\n11.    }\n12.  }\n13. }\n\nWhat is the result?",
    options: ["Exc0 caught", "exception caught", "Compilation fails because of an error at line 2.", "Compilation fails because of an error at line 6."],
    answer: ["A"],
    explanation: "Exc1 là subclass của Exc0 → catch Exc0 bắt trước. In \"Exc0 caught\"."
  },
  {
    id: 74, type: "single",
    text: "Given:\n\n20. public float getSalary(Employee e) {\n21.   assert validEmployee(e);\n22.   float sal = lookupSalary(e);\n23.   assert (sal > 0);\n24.   return sal;\n25. }\n26. private int getAge(Employee e) {\n27.   assert validEmployee(e);\n28.   int age = lookupAge(e);\n29.   assert (age > 0);\n30.   return age;\n31. }\n\nWhich line is a violation of appropriate use of the assertion mechanism?",
    options: ["line 21", "line 23", "line 27", "line 29"],
    answer: ["A"],
    explanation: "getSalary là public method, assert validEmployee(e) là kiểm tra precondition public → không phù hợp."
  },
  {
    id: 75, type: "single",
    text: "Given:\n\n1. public class A {\n2.   void A() {\n3.     System.out.println(\"Class A\");\n4.   }\n5.   public static void main(String[] args) {\n6.     new A();\n7.   }\n8. }\n\nWhat is the result?",
    options: ["Class A", "Compilation fails.", "An exception is thrown at line 2.", "An exception is thrown at line 6.", "The code executes with no output."],
    answer: ["E"],
    explanation: "void A() là method, không phải constructor. new A() gọi default constructor → không in gì."
  },
  {
    id: 76, type: "single",
    text: "Given:\n\n1. class Bar { }\n1. class Test {\n2.   Bar doBar() {\n3.     Bar b = new Bar();\n4.     return b;\n5.   }\n6.   public static void main (String args[]) {\n7.     Test t = new Test();\n8.     Bar newBar = t.doBar();\n9.     System.out.println(\"newBar\");\n10.    newBar = new Bar();\n11.    System.out.println(\"finishing\");\n12.  }\n13. }\n\nAt what point is the Bar object, created on line 3, eligible for garbage collection?",
    options: ["After line 8.", "After line 10.", "After line 4, when doBar() completes.", "After line 11, when main() completes."],
    answer: ["B"],
    explanation: "Bar object từ doBar() được gán cho newBar, sau line 10 newBar trỏ object mới → object cũ eligible."
  },
  {
    id: 77, type: "single",
    text: "Given:\n\n1. interface Beta { }\n3. class Alpha implements Beta { }\n4. String testIt() {\n5.   return \"Tested\";\n6. }\n9. public class Main1 {\n10.  static Beta getIt() {\n11.    return new Alpha();\n12.  }\n13.  public static void main( String[] args ) {\n14.    Beta b = getIt();\n15.    System.out.println( b.testIt() );\n16.  }\n17. }\n\nWhat is the result?",
    options: ["Tested", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["B"],
    explanation: "Beta không có testIt(), biến b kiểu Beta không gọi được. Compile fail."
  },
  {
    id: 78, type: "single",
    text: "Given:\n\n11. public class Test {\n12.   public void foo() {\n13.     assert false;\n14.     assert false;\n15.   }\n16.   public void bar() {\n17.     while(true){\n18.       assert false;\n19.     }\n20.     assert false;\n21.   }\n22. }\n\nWhat causes compilation to fail?",
    options: ["Line 13", "Line 14", "Line 18", "Line 20"],
    answer: ["D"],
    explanation: "Dòng 20 là unreachable statement sau while(true) → compile fail."
  },
  {
    id: 79, type: "single",
    text: "Which statement is true?",
    options: [
      "Programs will not run out of memory.",
      "Objects that will never again be used are eligible for garbage collection.",
      "Objects that are referred to by other objects will never be garbage collected.",
      "Objects that can be reached from a live thread will never be garbage collected.",
      "Objects are garbage collected immediately after the system recognizes they are eligible."
    ],
    answer: ["D"],
    explanation: "Object reachable từ live thread không bị GC."
  },
  {
    id: 80, type: "multi",
    text: "In which two cases does the compiler supply a default constructor for class A? (Choose two)",
    options: [
      "class A { }",
      "class A { public A() { } }",
      "class A { public A(int x) { } }",
      "class Z { } class A extends Z { void A() { } }"
    ],
    answer: ["A", "D"],
    explanation: "A: không có constructor → có default. D: void A() là method, không phải constructor → có default. B, C đã có constructor."
  },
  {
    id: 81, type: "single",
    text: "Given:\n\n1. public class ReturnIt {\n2.   returnType methodA(byte x, double y) {\n3.     return (short)x / y * 2;\n4.   }\n5. }\n\nWhat is the narrowest valid returnType for methodA in line2?",
    options: ["int", "byte", "long", "short", "float", "double"],
    answer: ["F"],
    explanation: "(short)x / y * 2 → double. Return type hẹp nhất: double."
  },
  {
    id: 82, type: "single",
    text: "Given:\n\n1. public class Outer{\n2.   public void someOuterMethod() {\n3.     // Line 3\n4.   }\n5.   public class Inner{\n6.     public static void main( String[] argv ) {\n7.       Outer o = new Outer();\n8.       // Line 8\n9.     }\n10.  }\n11. }\n\nWhich instantiates an instance of Inner?",
    options: ["new Inner(); // At line 3", "new Inner(); // At line 8", "new o.Inner(); // At line 8", "new Outer.Inner(); // At line 8"],
    answer: ["A"],
    explanation: "Từ trong outer class, new Inner() hợp lệ. Ở line 8 (trong static main của Inner) cần o.new Inner()."
  },
  {
    id: 83, type: "single",
    text: "What allows the programmer to destroy an object x?",
    options: [
      "x.delete()",
      "x.finalize()",
      "Runtime.getRuntime().gc()",
      "Explicitly setting the object's reference to null.",
      "Ensuring there are no references to the object.",
      "Only the garbage collection system can destroy an object."
    ],
    answer: ["F"],
    explanation: "Chỉ GC mới destroy object. Các cách khác chỉ gợi ý hoặc set null."
  },
  {
    id: 84, type: "single",
    text: "Given:\n\n11. int x = 1, y = 6;\n12. while (y--) {\n13.   x++;\n14. }\n15. System.out.println(\"x = \" + x + \" y = \" + y);\n\nWhat is the result?",
    options: ["x = 6 y = 0", "x = 7 y = 0", "x = 6 y = -1", "x = 7 y = -1", "Compilation fails."],
    answer: ["E"],
    explanation: "while(y--) với y int không phải boolean → compile fail."
  },
  {
    id: 85, type: "single",
    text: "Given:\n\n12. float f[][][] = new float[3][][];\n13. float f0 = 1.0f;\n14. float[][][] farray = new float[1][1];\n\nWhat is valid?",
    options: ["f[0] = f0", "f[0] = farray", "f[0] = farray[0]", "f[0] = farray[0][0]"],
    answer: ["B"],
    explanation: "Theo PDF đáp án B. Lưu ý: f[0] kiểu float[][], farray kiểu float[][][] nên về lý thuyết không gán được. Đáp án gốc của đề là B."
  },
  {
    id: 86, type: "single",
    text: "Given:\n\n11. for (int i = 0; i < 4; i += 2) {\n12.   System.out.print(i + \" \") ;\n13. }\n14. System.out.println(i) ;\n\nWhat is the result?",
    options: ["0 2 4", "0 2 4 5", "0 1 2 3 4", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["D"],
    explanation: "i khai báo trong for, không truy cập được ở dòng 14. Compile fail."
  },
  {
    id: 87, type: "single",
    text: "Given:\n\n12. void start() {\n13.   A a = new A();\n14.   B b = new B();\n15.   a.s(b);\n16.   b = null;\n17.   a = null;\n18.   System.out.println(\"start completed\");\n19. }\n\nWhen is the B object, created in line 14, eligible for garbage collection?",
    options: ["After line 16.", "After line 17.", "After line 18 (when the methods ends).", "There is no way to be absolutely certain.", "The object is NOT eligible for garbage collection."],
    answer: ["D"],
    explanation: "Không biết method s() có lưu tham chiếu b hay không → không chắc chắn."
  },
  {
    id: 88, type: "single",
    text: "Given:\n\n1. public class ExceptionTest {\n2.   class TestException extends Exception { }\n3.   public void runTest() throws TestException {}\n4.   public void test() /* Point X */ {\n5.     runTest();\n6.   }\n7. }\n\nAt Point X on line 4, which code is necessary to make the code compile?",
    options: ["No code is necessary.", "throws Exception", "catch (Exception e)", "throws RuntimeException", "catch (TestException e)"],
    answer: ["B"],
    explanation: "test() gọi runTest() throws TestException → cần throws Exception hoặc catch. Đáp án B (throws Exception)."
  },
  {
    id: 89, type: "single",
    text: "Given:\n\n11. int i = 0;\n12. while (true) {\n13.   if(i==4) { break; }\n16.   ++i;\n17. }\n18. System.out.println(\"i=\"+i);\n\nWhat is the result?",
    options: ["i = 0", "i = 3", "i = 4", "i = 5", "Compilation fails."],
    answer: ["C"],
    explanation: "i tăng đến 4 thì break. In i=4."
  },
  {
    id: 90, type: "single",
    text: "Given:\n\n11. try {\n12.   int x = 0;\n13.   int y = 5 / x;\n14. } catch (Exception e) {\n15.   System.out.println(\"Exception\");\n16. } catch (ArithmeticException ae) {\n17.   System.out.println(\"Arithmetic Exception\");\n18. }\n19. System.out.println(\"finished\");\n\nWhat is the result?",
    options: ["finished", "Exception", "Compilation fails.", "Arithmetic Exception"],
    answer: ["D"],
    explanation: "Theo PDF đáp án D. Lưu ý: ArithmeticException là subclass của Exception → catch Exception trước là lỗi compile (unreachable). Đáp án gốc của đề là D."
  },
  {
    id: 91, type: "single",
    text: "Given:\n\n1. public class Test { }\n\nWhat is the prototype of the default constructor?",
    options: ["Test()", "Test(void)", "public Test()", "public Test(void)", "public void Test()"],
    answer: ["C"],
    explanation: "Default constructor có cùng access với class (public)."
  },
  {
    id: 92, type: "single",
    text: "Given:\n\n1. abstract class AbstractIt {\n2.   abstract float getFloat();\n3. }\n4. public class AbstractTest extends AbstractIt {\n5.   private float f1 = 1.0f;\n6.   private float getFloat() { return f1; }\n7. }\n\nWhat is the result?",
    options: ["Compilation succeeds.", "An exception is thrown.", "Compilation fails because of an error at line 2.", "Compilation fails because of an error at line 6."],
    answer: ["D"],
    explanation: "getFloat() trong AbstractTest là private, không thể override abstract method (cần public/protected). Compile fail."
  },
  {
    id: 93, type: "multi",
    text: "Which four can be thrown using the throw statement? (Choose four)",
    options: ["Error", "Event", "Object", "Throwable", "Exception", "RuntimeException"],
    answer: ["A", "D", "E", "F"],
    explanation: "Chỉ throw được Throwable và subclass: Error, Exception, RuntimeException."
  },
  {
    id: 94, type: "single",
    text: "What produces a compiler error?",
    options: [
      "class A { public A(int x) { } }",
      "class A { } class B extends A { B() { } }",
      "class A { A() { } } class B { public B() { } }",
      "class Z { public Z(int) { } class A extends Z { } }"
    ],
    answer: ["D"],
    explanation: "D: Z(int) thiếu tên tham số, và A không gọi super(int). Compile fail."
  },
  {
    id: 95, type: "single",
    text: "Given:\n\n11. for(int i = min; i < max; i++) {\n12.   System.out.println(i);\n13. }\n\nIf min and max are arbitrary integers, what gives the same result?",
    options: [
      "int i = min; while(i < max) { }",
      "int i = min; do System.out.println(i++) ; } while(i < max );",
      "for (int i=min; i<max; System.out.println(++i));",
      "for (int i=min; i++<max; System.out.println(i));"
    ],
    answer: ["B"],
    explanation: "B tương đương vòng for."
  },
  {
    id: 96, type: "single",
    text: "Given:\n\n11. double d = Math.random();\n\nWhich is true about d after line 11?",
    options: [
      "d >= 1.0",
      "0.0 <= d < 1.0",
      "0.0 <= d < Double.MAX_VALUE",
      "0.0 <= d <= Double.MAX_VALUE",
      "Double.MIN_VALUE <= d < Double.MAX_VALUE"
    ],
    answer: ["B"],
    explanation: "Math.random() trả về [0.0, 1.0)."
  },
  {
    id: 97, type: "single",
    text: "Given:\n\n1. public class Alpha{\n2.   private static Character() ids;\n4.   public static void main( String[] args){\n4.     ids = new Character[args.length];\n5.     for (int i = 0; i<ids.length; i++) {\n6.       ids[i] = new Character( args[i] );\n7.       System.out.print(ids[i]);\n8.     }\n9.   }\n10. }\n\nWhat is correct?",
    options: ["Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime.", "The code runs, outputting a concatenated list of the arguments passed to the program."],
    answer: ["A"],
    explanation: "Dòng 2 sai cú pháp: private static Character() ids; Compile fail."
  },
  {
    id: 98, type: "single",
    text: "Given:\n\n1. public class Alpha{\n2.   public static void main( String[] args ){\n3.     if ( args.length == 2 ) {\n4.       if ( args[0].equalsIgnoreCase(\"-b\") )\n5.         System.out.println( new Boolean( args[1] ));\n6.     }\n7.   }\n8. }\n\nAnd the code is invoked by using the command:\njava Alpha -b TRUE\n\nWhat is the result?",
    options: ["true", "null", "false", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "new Boolean(\"TRUE\") in ra true."
  },
  {
    id: 99, type: "single",
    text: "Given:\n\n11. int i = 0, j = 1;\n12. if ((i++ == 1) && (j++ == 2)) {\n13.   i = 42;\n14. }\n15. System.out.println(\"i = \" + i + \", j = \" + j);\n\nWhat is the result?",
    options: ["i = 1, j = 2", "i = 1, j = 1", "i = 42, j = 2", "i = 42, j = 1", "Compilation fails."],
    answer: ["B"],
    explanation: "i++ == 1 sai (i=0), short-circuit && không tăng j. Kết quả i=1, j=1."
  },
  {
    id: 100, type: "single",
    text: "Given:\n\n1. public class X {\n2.   private static int a;\n3.   public static void main(String [] args) {\n4.     modify(a);\n5.     System.out.println(a);\n6.   }\n7.   public static void modify(int a) {\n8.     a++;\n9.   }\n10. }\n\nWhat is the result?",
    options: ["0", "1", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "Truyền giá trị, a trong modify là local. In 0."
  },
  {
    id: 101, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void add3 (Integer i) {\n3.     int val = i.intValue();\n4.     val += 3;\n5.     i = new Integer(val);\n6.   }\n8.   public static void main(String args[]) {\n9.     Integer i = new Integer(0);\n10.    add3(i);\n11.    System.out.println(i.intValue());\n12.  }\n13. }\n\nWhat is the result?",
    options: ["0", "3", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "Integer immutable, tham chiếu local thay đổi. In 0."
  },
  {
    id: 102, type: "multi",
    text: "Given:\n\n11. public static void main( String[] args ) {\n12.   Integer a = new Integer(10);\n13.   Integer b = new Integer(10);\n14.   Integer c = a;\n15.   int d = 10;\n16.   double e = 10.0;\n17. }\n\nWhich three evaluate to true? (Choose three)",
    options: ["(a == c)", "(d == e)", "(b == d)", "(a == b)", "(b == c)", "(d == 10.0)"],
    answer: ["A", "B", "F"],
    explanation: "A: cùng tham chiếu. B, F: so sánh số 10 == 10.0 true. C, D, E sai."
  },
  {
    id: 103, type: "single",
    text: "Given:\n\n11. String a = null;\n12. a.concat(\"abc\");\n13. a.concat(\"def\");\n14. System.out.println(a);\n\nWhat is the result?",
    options: ["abc", "null", "abcdef", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["F"],
    explanation: "a null → NullPointerException."
  },
  {
    id: 104, type: "multi",
    text: "Given that b and c refer to instances of wrapper classes, which two statements are true? (Choose two)",
    options: [
      "b.equals(b) returns true.",
      "b.equals(c) returns the same result as b == c.",
      "b.equals(c) can return false even if c.equals(b) returns true.",
      "b.equals(c) throws an exception if b and c are different wrapper types.",
      "b.equals(c) returns false if the type of wrapper objects being compared are different."
    ],
    answer: ["B", "C"],
    explanation: "Theo PDF đáp án B, C. Lưu ý: thực tế equals so sánh giá trị, == so sánh tham chiếu. Đáp án gốc của đề là B, C."
  },
  {
    id: 105, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main(String [] args) {\n3.     System.out.println(args.length > 4 && args[4].equals(\"-d\"));\n5.   }\n6. }\n\nIf the program is invoked using the command line:\njava Test One Two Three -d\n\nWhat is the result?",
    options: ["true", "false", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["D"],
    explanation: "Theo PDF đáp án D. Lưu ý: args.length = 4, && short-circuit nên args[4] không được truy cập → thực tế in false. Đáp án gốc của đề là D."
  },
  {
    id: 106, type: "single",
    text: "Given:\n\n11. try {\n12.   if ((new Object()).equals((new Object()))) {\n13.     System.out.println(\"equal\");\n14.   }else{\n15.     System.out.println(\"not equal\");\n16.   }\n17. }catch (Exception e) {\n18.   System.out.println(\"exception\");\n19. }\n\nWhat is the result?",
    options: ["equal", "not equal", "exception", "Compilation fails."],
    answer: ["D"],
    explanation: "Theo PDF đáp án D. Lưu ý: code hợp lệ, thực tế in not equal. Đáp án gốc của đề là D."
  },
  {
    id: 107, type: "multi",
    text: "Which three demonstrate an \"is a\" relationship? (Choose three)",
    options: [
      "public class X { } public class Y extends X { }",
      "public interface Shape { } public interface Rectangle extends Shape { }",
      "public interface Color { } public class Shape { private Color color; }",
      "public interface Species { } public class Animal { private Species species; }",
      "public class Person { } public class Employee { public Employee(Person person) { } }",
      "interface Component { } class Container implements Component { private Component[] children; }"
    ],
    answer: ["A", "B", "F"],
    explanation: "A, B, F là is-a. C, D, E là has-a."
  },
  {
    id: 108, type: "multi",
    text: "Given:\n\n1. class BaseClass {\n2.   private float x = 1.0f;\n3.   protected float getVar() { return x; }\n4. }\n5. class SubClass extends BaseClass {\n6.   private float x = 2.0f;\n7.   // insert code here\n8. }\n\nWhich two are valid examples of method overriding when inserted at line 7? (Choose two)",
    options: [
      "float getVar() { return x; }",
      "public float getVar() { return x; }",
      "public double getVar() { return x; }",
      "protected float getVar() { return x; }",
      "public float getVar(float f) { return f; }"
    ],
    answer: ["B", "D"],
    explanation: "B, D override hợp lệ (cùng signature, access rộng hơn hoặc bằng)."
  },
  {
    id: 109, type: "single",
    text: "Given:\n\n1. class A {\n2.   public byte getNumber() { return 1; }\n5. }\n7. class B extends A {\n8.   public short getNumber() { return 2; }\n12.  public static void main(String args[]) {\n13.    B b = new B();\n14.    System.out.println(b.getNumber());\n15.  }\n16. }\n\nWhat is the result?",
    options: ["1", "2", "An exception is thrown at runtime.", "Compilation fails because of an error in line 8.", "Compilation fails because of an error in line 14."],
    answer: ["D"],
    explanation: "short không override byte → compile fail dòng 8."
  },
  {
    id: 110, type: "multi",
    text: "Which two are benefits of fully encapsulating a class? (Choose two)",
    options: [
      "Performance of class methods is improved.",
      "Implementation details of the class are hidden.",
      "Access modifiers can be omitted on class data members.",
      "Code that uses the encapsulation class can access data members directly.",
      "Internal operation of the class can be modified without impacting clients of that class."
    ],
    answer: ["B", "E"],
    explanation: "B, E là lợi ích encapsulation."
  },
  {
    id: 111, type: "single",
    text: "Given:\n\n1. class A {\n2.   public A() { System.out.println(\"hello from a\"); }\n5. }\n6. class B extends A {\n7.   public B () {\n8.     System.out.println(\"hello from b\");\n9.     super();\n10.  }\n11. }\n12. public class Test {\n13.   public static void main(String args[]) {\n14.     A a = new B();\n15.   }\n16. }\n\nWhat is the result when main is executed?",
    options: ["Compilation fails.", "hello from a", "hello from b", "hello from b hello from a", "hello from a hello from b"],
    answer: ["A"],
    explanation: "super() phải là statement đầu tiên trong constructor. Compile fail."
  },
  {
    id: 112, type: "single",
    text: "Given:\n\n1. package foo;\n2. public class Outer {\n3.   public static class Inner {\n4.   }\n5. }\n\nWhich statement is true?",
    options: [
      "Compilation fails.",
      "An instance of the Inner class can be constructed with \"new Outer.Inner()\".",
      "An instance of the Inner class cannot be constructed outside of package foo.",
      "An instance of the Inner class can be constructed only from within the Outer class.",
      "From within the package foo, an instance of the Inner class can be constructed with \"new Inner()\"."
    ],
    answer: ["B"],
    explanation: "Static inner class tạo bằng new Outer.Inner()."
  },
  {
    id: 113, type: "single",
    text: "Given:\n\n1. public class SyncTest {\n2.   private int x;\n3.   private int y;\n4.   private synchronized void setX( int i ) { x = i; }\n5.   private synchronized void setY( int i ) { y = i; }\n6.   public void setXY( int i ) { setX(i); setY(i); }\n7.   public synchronized boolean check() { return x != y; }\n8. }\n\nUnder which condition will check return true when called from a different class?",
    options: [
      "check can never return true.",
      "check can return true when setXY is called by multiple threads.",
      "check can return true when multiple threads call setX and setY separately.",
      "check can return true only if SyncTest is changed to allow x and y to be set separately."
    ],
    answer: ["B"],
    explanation: "setXY không synchronized → có thể bị interleave, check thấy x != y."
  },
  {
    id: 114, type: "single",
    text: "Thread Z holds the lock on object A. Thread X is blocked inside a wait call on ObjectA. What allows thread X to become runnable?",
    options: [
      "Thread X is interrupted.",
      "Thread X is interrupted.",
      "Thread X's wait() times out.",
      "Thread Z calls Thread.sleep(100);",
      "Thread Z releases the lock on A and calls the notify() method on thread X.",
      "Thread Z releases the lock on A and calls the notifyAll() method on objectA."
    ],
    answer: ["F"],
    explanation: "notifyAll() trên object A đánh thức tất cả thread đang wait trên A."
  },
  {
    id: 115, type: "single",
    text: "What happens when thread X executes a wait() method on object A, without owning object A's lock?",
    options: ["Compilation fails.", "An exception is thrown.", "The wait() method has no effect.", "Thread X receives the lock immediately.", "Object A moves the thread to the wait pool."],
    answer: ["B"],
    explanation: "wait() không có lock → IllegalMonitorStateException."
  },
  {
    id: 116, type: "single",
    text: "Given:\n\n1. class MyThread extends Thread {\n2.   public void run() { System.out.println(\"AAA\"); }\n3.   public void run(Runnable r) { System.out.println(\"BBB\"); }\n5.   public static void main(String[] args) {\n6.     new Thread(new MyThread()).start();\n7.   }\n8. }\n\nWhat is the result?",
    options: ["AAA", "BBB", "Compilation fails.", "The code runs with no output."],
    answer: ["A"],
    explanation: "start() gọi run() không tham số → in AAA."
  },
  {
    id: 117, type: "single",
    text: "Given:\n\n1. public class X implements Runnable {\n2.   private int x;\n3.   private int y;\n5.   public static void main(String [] args) {\n6.     X that = new X();\n7.     (new Thread( that )).start();\n8.     (new Thread( that )).start();\n9.   }\n11.  public void run() {\n12.    for (;;) {\n13.      synchronized (this) {\n14.        x++;\n15.        y++;\n16.      }\n17.      System.out.println(Thread.currentThread().getName() + \"x = \" + x + \", y = \" + y);\n19.    }\n20.  }\n21. }\n\nWhat is the result?",
    options: [
      "Compilation fails.",
      "The program prints pairs of values for x and y that might not always be the same on the same line (for example, \"x = 2, y = 1\").",
      "The program prints pairs of values for x and y that are always the same on the same line (for example, \"x = 1, y = 1\"). In addition, each value appears only once (for example, \"x = 1, y = 1\" followed by \"x = 2, y = 2\"). The thread name at the start of the line shows that both threads are executing concurrently.",
      "The program prints pairs of values for x and y that are always the same on the same line (for example, \"x = 1, y = 1\"). In addition, each value appears only once (for example, \"x = 1, y = 1\" followed by \"x = 2, y = 2\"). The thread name at the start of the line shows that only a single thread is actually executing."
    ],
    answer: ["D"],
    explanation: "synchronized(this) đảm bảo x, y luôn bằng nhau, mỗi giá trị in 1 lần do lock tuần tự."
  },
  {
    id: 118, type: "single",
    text: "Which statement is true?",
    options: [
      "To call the wait() method, a thread must own the lock of the current thread.",
      "To call the wait() method, a thread must own the lock of the object on which the call is to be made.",
      "To call the join() method, a thread must own the lock of the object on which the call is to be made.",
      "To call the sleep() method, a thread must own the lock of the object which the call is to be made.",
      "To call the yield() method, a thread must own the lock of the object on which the call is to be made."
    ],
    answer: ["B"],
    explanation: "wait() yêu cầu lock của object được gọi."
  },
  {
    id: 119, type: "single",
    text: "Given:\n\n1. public class A extends Thread {\n2.   A() { setDaemon(true); }\n6.   public void run() {\n7.     (new B()).start();\n8.     try {\n9.       Thread.sleep(60000);\n10.    } catch (InterruptedException x) {\n11.      System.out.println(\"A done\");\n12.    }\n13.  }\n14.  class B extends Thread {\n15.    public void run() {\n16.      try {\n17.        Thread.sleep(60000);\n18.      } catch (InterruptedException x) {\n19.        System.out.println(\"B done\");\n21.      }\n22.    }\n23.  }\n24.  public static void main(String[] args) {\n25.    (new A()).start();\n26.  }\n27. }\n\nWhat is the result?",
    options: ["A done", "B done", "A done B done", "B done A done", "There is no exception that the application will print anything.", "The application outputs \"A done\" and \"B done\", in no guaranteed order."],
    answer: ["E"],
    explanation: "A là daemon, main kết thúc → JVM thoát, không in gì."
  },
  {
    id: 120, type: "single",
    text: "What can cause a thread to become non-runnable?",
    options: ["Exiting from a synchronized block.", "Calling the wait method on an object.", "Calling the notify method on an object.", "Calling the notifyAll method on an object."],
    answer: ["B"],
    explanation: "wait() đưa thread vào wait pool (non-runnable)."
  },
  {
    id: 121, type: "multi",
    text: "Given:\n\n11. ArrayList a = new ArrayList();\n12. a.add(\"Alpha\");\n13. a.add(\"Bravo\");\n14. a.add(\"Charlie\");\n15. a.add(\"Delta\");\n16. Iterator iter = a.iterator();\n17. \n\nWhich two, added at line 17, print the names in the ArrayList in alphabetical order? (Choose two)",
    options: [
      "for (int i=0; i< a.size(); i++) System.out.println(a.get(i));",
      "for (int i=0; i< a.size(); i++) System.out.println(a[i]);",
      "while( iter.hasNext() ) System.out.println(iter.next());",
      "for (int i=0; i< a.size(); i++) System.out.println(iter[i]);",
      "for (int i=0; i< a.size(); i++) System.out.println(iter.get(i));"
    ],
    answer: ["A", "C"],
    explanation: "A và C hợp lệ và in theo thứ tự chèn (alphabet)."
  },
  {
    id: 122, type: "single",
    text: "Given:\n\n1. // Point X\n2. public class foo {\n3.   public static void main(String[] args) throws Exception {\n4.     java.io.PrintWriter out = new java.io.PrintWriter(\n5.       new java.io.OutputStreamWriter(System.out), true);\n6.     out.println(\"Hello\");\n7.   }\n8. }\n\nWhich statement at Point X on line 1 is required to allow this code to compile?",
    options: ["No statement is required.", "import java.io.*;", "include java.io.*;", "import java.io.PrintWriter;"],
    answer: ["A"],
    explanation: "Dùng fully qualified name nên không cần import."
  },
  {
    id: 123, type: "multi",
    text: "Which two are valid declarations of a float? (Choose two)",
    options: ["float f = 1F;", "float f = 1.0.;", "float f = '1';", "float f = \"1\";", "float f = 1.0d;"],
    answer: ["A", "C"],
    explanation: "A hợp lệ. C: char '1' chuyển thành float hợp lệ. B sai cú pháp. D sai. E double không gán trực tiếp float."
  },
  {
    id: 124, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   private static int[] x;\n3.   public static void main(String[] args) {\n4.     System.out.println(x[0]);\n5.   }\n6. }\n\nWhat is the result?",
    options: ["0", "null", "Compilation fails.", "A NullPointerException is thrown at runtime.", "An ArrayIndexOutOfBoundsException is thrown at runtime."],
    answer: ["D"],
    explanation: "x null → NullPointerException."
  },
  {
    id: 125, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main( String[] args) {\n3.     String foo = args[1];\n4.     String bar = args[2];\n5.     String baz = args[3];\n6.     System.out.println(\"baz = \" + baz);\n7.   }\n8. }\n\nAnd the command line invocation: java Test red green blue\n\nWhat is the result?",
    options: ["baz =", "baz = null", "baz = blue", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["E"],
    explanation: "args[1] = green, args[2] = blue, args[3] out of bounds → exception."
  },
  {
    id: 126, type: "single",
    text: "Which method must be defined by a class implementing the java.lang.Runnable interface?",
    options: ["void run()", "public void run()", "public void start()", "void run(int priority)", "public void run(int priority)", "public void start(int priority)"],
    answer: ["B"],
    explanation: "Runnable có public void run()."
  },
  {
    id: 127, type: "single",
    text: "Given:\n\n11. public static void main(String[] args) {\n12.   Object obj = new Object() {\n13.     public int hashCode() {\n14.       return 42;\n15.     }\n16.   };\n17.   System.out.println(obj.hashCode());\n18. }\n\nWhat is the result?",
    options: ["42", "An exception is thrown at runtime.", "Compilation fails because of an error on line 12.", "Compilation fails because of an error on line 16.", "Compilation fails because of an error on line 17."],
    answer: ["A"],
    explanation: "Anonymous class override hashCode → in 42."
  },
  {
    id: 128, type: "multi",
    text: "Which two are reserved words in the Java programming language? (Choose two)",
    options: ["run", "import", "default", "implement"],
    answer: ["B", "C"],
    explanation: "import, default là reserved. run, implement không."
  },
  {
    id: 129, type: "multi",
    text: "Which two statements are true regarding the return values of properly written hashCode and equals methods from two instances of the same class? (Choose two)",
    options: [
      "If the hashCode values are different, the objects might be equal.",
      "If the hashCode values are the same, the object must be equal.",
      "If the hashCode values are the same, the objects might be equal.",
      "If the hashCode values are different, the objects must be unequal."
    ],
    answer: ["C", "D"],
    explanation: "C, D đúng theo contract hashCode/equals."
  },
  {
    id: 130, type: "single",
    text: "What is the numerical range of a char?",
    options: ["0...32767", "0...65535", "-256 ... 255", "-32768 ... 32767", "Range is platform dependent."],
    answer: ["B"],
    explanation: "char là unsigned 16-bit: 0..65535."
  },
  {
    id: 131, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   private static float[] f = new float[2];\n3.   public static void main(String args[]) {\n4.     System.out.println(\"f[0] = \" + f[0]);\n5.   }\n6. }\n\nWhat is the result?",
    options: ["f[0] = 0", "f[0] = 0.0", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["B"],
    explanation: "float mặc định 0.0."
  },
  {
    id: 132, type: "single",
    text: "Given:\n\n1. public class Test {\n2.   public static void main(String[] args) {\n3.     String str = NULL;\n4.     System.out.println(str);\n5.   }\n6. }\n\nWhat is the result?",
    options: ["NULL", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: ["B"],
    explanation: "NULL không phải keyword, chưa khai báo → compile fail."
  },
  {
    id: 133, type: "single",
    text: "Which interface does java.util.Hashtable implement?",
    options: ["java.util.Map", "java.util.List", "java.util.Hashtable", "java.util.Collection"],
    answer: ["A"],
    explanation: "Hashtable implements Map."
  },
  {
    id: 134, type: "single",
    text: "Given:\n\n11. System.out.println(Math.sqrt(-4D));\n\nWhat is the result?",
    options: ["-2", "NaN", "Infinity", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["B"],
    explanation: "sqrt số âm → NaN."
  },
  {
    id: 135, type: "single",
    text: "Given:\n\n11. String a = \"ABCD\";\n12. String b = a.toLowerCase();\n13. b.replace('a', 'd');\n14. b.replace('b', 'c');\n15. System.out.println(b);\n\nWhat is the result?",
    options: ["abcd", "ABCD", "dccd", "dcba", "Compilation fails.", "An exception is thrown at runtime."],
    answer: ["A"],
    explanation: "String immutable, replace không đổi b. In abcd."
  },
  {
    id: 136, type: "single",
    text: "Given:\n\n1. public class Foo {\n2.   public static void main (String [] args) {\n3.     StringBuffer a = new StringBuffer (\"A\");\n4.     StringBuffer b = new StringBuffer (\"B\");\n5.     operate (a,b);\n6.     System.out.println(a + \", \" + b);\n7.   }\n8.   static void operate (StringBuffer x, StringBuffer y) {\n9.     x.append (y);\n10.    y = x;\n11.  }\n12. }\n\nWhat is the result?",
    options: ["A,B", "A,A", "B,B", "AB,B", "AB,AB", "The code does not compile because \"+\" cannot be overloaded for StringBuffer."],
    answer: ["D"],
    explanation: "x.append(y) đổi a thành AB. y = x chỉ đổi tham chiếu local. In AB,B."
  },
  {
    id: 137, type: "fill",
    text: "Given:\n\n1. public class Test {\n2.   public static void stringReplace (String text) {\n3.     text = text.replace ('j', 'i');\n4.   }\n6.   public static void bufferReplace (StringBuffer text) {\n7.     text = text.append (\"C\");\n8.   }\n10.  public static void main (String args[]) {\n11.    String textString = new String (\"java\");\n12.    StringBuffer textBuffer = new StringBuffer (\"java\");\n14.    stringReplace (textString);\n15.    bufferReplace (textBuffer);\n17.    System.out.println (textString + textBuffer);\n19.  }\n20. }\n\nWhat is the output?",
    options: [],
    answer: ["javajavaC"],
    explanation: "String immutable → textString vẫn java. StringBuffer append → javaC. Kết quả javajavaC."
  },
  {
    id: 138, type: "single",
    text: "Which method is an appropriate way to determine the cosine of 42 degrees?",
    options: [
      "Double d = Math.cos(42);",
      "Double d = Math.cosine(42);",
      "Double d = Math.cos(Math.toRadians(42));",
      "Double d = Math.cos(Math.toDegrees(42));",
      "Double d = Math.cosine(Math.toRadians(42));"
    ],
    answer: ["C"],
    explanation: "Math.cos nhận radian → cần toRadians(42)."
  },
  {
    id: 139, type: "single",
    text: "Given:\n\n1. class A implements Runnable {\n2.   int i;\n3.   public void run () {\n4.     try {\n5.       Thread.sleep(5000);\n6.       i=10;\n7.     } catch(InterruptedException e) { }\n9.   }\n11. }\n12. public class Test {\n13.   public static void main (String args[]) {\n14.     try {\n15.       A a = new A ();\n16.       Thread t = new Thread (a);\n17.       t.start();\n18.       int j= a.i;\n20.     } catch (Exception e) { }\n22.   }\n23. }\n\nWhich statement at line 17 will ensure that j = 10 at line 19?",
    options: ["a.wait();", "t.wait();", "t.join();", "t.yield();", "t.notify();", "a.notify();", "t.interrupt();"],
    answer: ["C"],
    explanation: "t.join() đợi thread t hoàn thành → i = 10."
  },
  {
    id: 140, type: "single",
    text: "Which code determines the int value foo closest to, but not greater than, a double value bar?",
    options: [
      "int foo = (int) Math.max(bar);",
      "int foo = (int) Math.min(bar);",
      "int foo = (int) Math.abs(bar);",
      "int foo = (int) Math.ceil(bar);",
      "int foo = (int) Math.floor(bar);",
      "int foo = (int) Math.round(bar);"
    ],
    answer: ["E"],
    explanation: "Math.floor cho giá trị ≤ bar."
  },
  {
    id: 142, type: "multi",
    text: "Given:\n\n1. class BaseClass{\n2.   private float x = 1.0f;\n3.   protected void setVar (float f) {x = f;}\n4. }\n5. class SubClass extends BaseClass {\n6.   private float x = 2.0f;\n7.   //insert code here\n8. }\n\nWhich two are valid examples of method overriding? (Choose Two)",
    options: [
      "void setVar(float f) {x = f;}",
      "public void setVar(int f) {x = f;}",
      "public void setVar(float f) {x = f;}",
      "public double setVar(float f) {x = f;}",
      "public final void setVar(float f) {x = f;}",
      "protected float setVar() {x = 3.0f; return 3.0f; }"
    ],
    answer: ["C", "E"],
    explanation: "C, E override hợp lệ (cùng signature, access rộng hơn hoặc bằng, return void)."
  },
  {
    id: 143, type: "single",
    text: "Given:\n\n1. public class Mycircle {\n2.   public double radius;\n3.   public double diameter;\n5.   public void setRadius(double radius) {\n6.     this.radius = radius;\n7.     this.diameter = radius * 2;\n8.   }\n10.  public double getRadius() {\n11.    return radius;\n12.  }\n13. }\n\nWhich statement is true?",
    options: [
      "The Mycircle class is fully encapsulated.",
      "The diameter of a given MyCircle is guaranteed to be twice its radius.",
      "Lines 6 and 7 should be in a synchronized block to ensure encapsulation.",
      "The radius of a MyCircle object can be set without affecting its diameter."
    ],
    answer: ["B"],
    explanation: "setRadius đảm bảo diameter = 2*radius. Nhưng radius public nên không fully encapsulated."
  },
  {
    id: 144, type: "single",
    text: "Which is a valid identifier?",
    options: ["false", "default", "_object", "a-class"],
    answer: ["C"],
    explanation: "_object hợp lệ. false, default là keyword. a-class có dấu -."
  },
  {
    id: 145, type: "single",
    text: "Given:\n\n1. public class X {\n2.   public static void main (String[] args) {\n3.     byte b = 127;\n4.     byte c = 126;\n5.     byte d = b + c;\n6.   }\n7. }\n\nWhich statement is true?",
    options: [
      "Compilation succeeds and d takes the value 253.",
      "Line 5 contains an error that prevents compilation.",
      "Line 5 throws an exception indicating \"Out of range\"",
      "Line 3 and 4 contain error that prevent compilation.",
      "The compilation succeeds and d takes the value of 1."
    ],
    answer: ["B"],
    explanation: "b + c là int, gán vào byte cần cast → compile fail."
  },
  {
    id: 146, type: "multi",
    text: "Which two are equivalent? (Choose Two)",
    options: ["3/2", "3<2", "3*4", "3<<2", "3*2*2", "3<<<2"],
    answer: ["C", "D"],
    explanation: "3*4 = 12, 3<<2 = 12."
  },
  {
    id: 147, type: "single",
    text: "What is the numerical range of a byte?",
    options: ["0..32767", "0...65535", "-128...127", "-256...255", "Range is platform dependent"],
    answer: ["C"],
    explanation: "byte là signed 8-bit: -128..127."
  }
];

