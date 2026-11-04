import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { rawQuestions } from "./raw_ebook_questions.js";
import { getDb } from "../lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to determine topic
function determineTopic(q) {
  const content = (q.text + " " + (q.code || "")).toLowerCase();
  const expl = (q.explanation || "").toLowerCase();
  const withoutMain = content.replace(/public\s+static\s+void\s+main/g, "");

  if (content.includes("thread") || content.includes("runnable") || content.includes("synchronized") || content.includes("wait(") || content.includes("notify") || expl.includes("thread") || expl.includes("đồng bộ")) {
    return "threads";
  }
  if (content.includes("try {") || content.includes("try{") || content.includes("catch") || content.includes("finally") || content.includes("throw new") || content.includes("throws ") || content.includes("assert") || expl.includes("try-catch") || expl.includes("ném ngoại lệ") || expl.includes("assertion")) {
    return "exception";
  }
  if (content.includes("stringbuffer") || content.includes("stringbuilder") || content.includes(".concat") || content.includes(".replace") || (expl.includes("string") && expl.includes("immutable"))) {
    return "string";
  }
  if (content.includes("override") || content.includes("overload") || content.includes("polymorph") || expl.includes("override") || expl.includes("overload")) {
    return "polymorphism";
  }
  if (content.includes("interface ") || content.includes("implements ") || expl.includes("interface")) {
    return "interface";
  }
  if (content.includes("super(") || content.includes("this(") || content.includes("constructor") || expl.includes("constructor")) {
    return "constructor";
  }
  if (withoutMain.includes("static ") || expl.includes("static")) {
    return "static";
  }
  if (content.includes("transient") || content.includes("volatile") || content.includes("strictfp") || content.includes("package ") || content.includes("import ") || expl.includes("modifier") || expl.includes("access") || expl.includes("private") || expl.includes("protected")) {
    return "modifier";
  }
  if (content.includes("encapsul") || content.includes("is-a") || content.includes("has-a") || content.includes("inherit") || expl.includes("kế thừa") || expl.includes("đóng gói") || expl.includes("đa hình")) {
    return "oop";
  }
  return "javacore";
}

// Custom handler for multi questions to produce single-choice 4 options
const MULTI_HANDLERS = {
  2: (q) => ({
    text: "Cho các khai báo sau, hai khai báo nào gây lỗi biên dịch? (Which two cause a compiler error?)",
    code: "1. float[] = new float(3);\n2. float f2[] = new float[];\n3. float[] f1 = new float[3];\n4. float f3[] = new float[3];\n5. float f5[] = {1.0f, 2.0f, 2.0f };\n6. float f4[] = new float[] {1.0f, 2.0f, 3.0f};",
    options: [
      "Dòng 1 và dòng 2 (float[] = new float(3); & float f2[] = new float[];)",
      "Dòng 2 và dòng 3",
      "Dòng 3 và dòng 4",
      "Dòng 5 và dòng 6"
    ],
    answer: 0
  }),
  7: (q) => ({
    text: "Cho đoạn mã sau, hai phát biểu nào sau đây là ĐÚNG về class B? (Which two statements are true?)",
    code: "1. class A {\n2.   A() { }\n3. }\n5. class B extends A {\n6. }",
    options: [
      "Constructor của B không có tham số và tự động gọi super()",
      "Constructor của B là public và tự động gọi this()",
      "Constructor của B là public và không có tham số",
      "Constructor của B gọi cả this() và super()"
    ],
    answer: 0
  }),
  13: (q) => ({
    text: "Cho interface Foo sau, ba khai báo nào tương đương với dòng 2 (int k = 4)? (Which three are equivalent to line 2?)",
    code: "1. public interface Foo {\n2.   int k = 4;\n3. }\n\nCác lựa chọn:\n[1] final int k = 4;\n[2] public int k = 4;\n[3] static int k = 4;\n[4] abstract int k = 4;\n[5] volatile int k = 4;\n[6] protected int k = 4;",
    options: [
      "[1], [2] và [3] (final, public, static)",
      "[2], [3] và [4] (public, static, abstract)",
      "[1], [3] và [5] (final, static, volatile)",
      "[2], [4] và [6] (public, abstract, protected)"
    ],
    answer: 0
  }),
  15: (q) => ({
    text: "Cho class A sau, hai phương thức nào hợp lệ trong lớp con kế thừa từ A? (Which two are valid in a class that extends class A?)",
    code: "1. class A {\n2.   protected int method(int a, int b) { return 0; }\n3. }\n\nCác phương thức con:\n[1] public int method(int a, int b) { return 0; }\n[2] private int method(int a, int b) { return 0; }\n[3] private int method(int a, long b) { return 0; }\n[4] public short method(int a, int b) { return 0; }\n[5] static protected int method(int a, int b) { return 0; }",
    options: [
      "[1] và [3] (Override mở rộng public & Overload đổi kiểu tham số long)",
      "[1] và [2]",
      "[2] và [4]",
      "[3] và [5]"
    ],
    answer: 0
  }),
  28: (q) => ({
    text: "Ba khai báo nào dưới đây là cú pháp khai báo mảng hợp lệ trong Java? (Which three form part of correct array declarations?)",
    code: "[1] public int a [ ]\n[2] static int [] a\n[3] public [] int a\n[4] private int a [3]\n[5] private int [3] a [ ]\n[6] public final int [] a",
    options: [
      "[1], [2] và [6]",
      "[1], [3] và [4]",
      "[2], [4] và [5]",
      "[3], [5] và [6]"
    ],
    answer: 0
  }),
  39: (q) => ({
    text: "Hai khai báo nào sau đây là hợp lệ bên trong một interface? (Which two are valid declarations within an interface definition?)",
    code: "[1] void methoda();\n[2] public double methoda();\n[3] public final double methoda();\n[4] static void methoda(double d1);\n[5] protected void methoda(double d1);",
    options: [
      "[1] và [2]",
      "[2] và [3]",
      "[3] và [4]",
      "[4] và [5]"
    ],
    answer: 0
  }),
  40: (q) => ({
    text: "Hai định nghĩa lớp nào cho phép khởi tạo đối tượng bằng `new Thing()`? (Choose two)",
    code: "[1] public class Thing { }\n[2] public class Thing { public Thing() { } }\n[3] public class Thing { public Thing(void) { } }\n[4] public class Thing { public Thing(String s) { } }\n[5] public class Thing { public void Thing() { } public Thing(String s) { } }",
    options: [
      "[1] và [2] (Không khai báo constructor & có no-arg constructor)",
      "[2] và [3]",
      "[1] và [4]",
      "[4] và [5]"
    ],
    answer: 0
  }),
  43: (q) => ({
    text: "Sau khi dòng 15 thực thi xong (trước khi main hoàn tất), hai phát biểu nào sau đây là ĐÚNG? (Which two statements are true?)",
    code: "1. class TestA {\n2.   TestB b;\n3.   TestA() { b = new TestB(this); }\n6. }\n7. class TestB {\n8.   TestA a;\n9.   TestB(TestA a) { this.a = a; }\n12. }\n13. class TestAll {\n14.   public static void main (String args[]) {\n15.     new TestAll().makeThings();\n17.   }\n18.   void makeThings() {\n19.     TestA test = new TestA();\n20.   }\n21. }",
    options: [
      "Cả đối tượng được tham chiếu bởi a và đối tượng được tham chiếu bởi b đều đủ điều kiện thu gom rác (Eligible for GC)",
      "Dòng 15 gây lỗi tràn bộ nhớ StackOverflowError",
      "Đối tượng a không bị GC, còn đối tượng b bị GC",
      "Một lỗi ngoại lệ RuntimeException xảy ra"
    ],
    answer: 0
  }),
  45: (q) => ({
    text: "Ba phát biểu nào sau đây là ĐÚNG về Constructor mặc định trong Java? (Which three statements are true?)",
    code: "[1] The default constructor initializes method variables.\n[2] The default constructor has the same access as its class.\n[3] The default constructor invoked the no-arg constructor of the superclass.\n[4] If a class lacks a no-arg constructor, the compiler always provides a default constructor.\n[5] The compiler provides a default constructor only when the class doesn't declare any constructors.",
    options: [
      "[2], [3] và [5]",
      "[1], [2] và [4]",
      "[1], [3] và [4]",
      "[2], [4] và [5]"
    ],
    answer: 0
  }),
  46: (q) => ({
    text: "Ba phát biểu nào sau đây là ĐÚNG về cơ chế Assertion trong Java? (Which three statements are true?)",
    code: "[1] Assertion checking is typically enabled when a program is deployed.\n[2] It is never appropriate to write code to handle failure of an assert statement.\n[3] Assertion checking is typically enabled during program development and testing.\n[4] Assertion checking can be selectively enabled or disabled on a per-package basis, but not on a per-class basis.\n[5] Assertion checking can be selectively enabled or disabled on both a per-package basis and a per-class basis.",
    options: [
      "[2], [3] và [5]",
      "[1], [2] và [3]",
      "[1], [3] và [4]",
      "[3], [4] và [5]"
    ],
    answer: 0
  }),
  51: (q) => ({
    text: "Hai dòng lệnh nào dưới đây tạo thành công một thực thể mảng (instance of an array)? (Choose two)",
    code: "[1] int[] ia = new int[15];\n[2] float fa = new float[20];\n[3] char[] ca = \"Some String\";\n[4] Object oa = new float[20];\n[5] int ia[][] = { 4, 5, 6 }, { 1, 2, 3 };",
    options: [
      "[1] và [4] (int[] ia = new int[15]; & Object oa = new float[20];)",
      "[1] và [2]",
      "[2] và [3]",
      "[4] và [5]"
    ],
    answer: 0
  }),
  55: (q) => ({
    text: "Cho đoạn mã sau, hai kiểu dữ liệu nào dưới đây có thể dùng cho biến x trong lệnh switch? (Choose two)",
    code: "11. switch(x) {\n12.   default:\n13.     System.out.println(\"Hello\");\n14. }\n\nKiểu dữ liệu lựa chọn:\n[1] byte\n[2] long\n[3] char\n[4] float\n[5] Short\n[6] Long",
    options: [
      "[1] và [3] (byte và char)",
      "[1] và [2] (byte và long)",
      "[3] và [4] (char và float)",
      "[5] và [6] (Short và Long)"
    ],
    answer: 0
  }),
  59: (q) => ({
    text: "Cho OuterClass sau, hai đoạn mã nào chèn vào dòng 3 sẽ biên dịch thành công? (Choose two)",
    code: "1. public class OuterClass {\n2.   private double d1 = 1.0;\n3.   // insert code here\n4. }\n\nCác lựa chọn:\n[1] static class InnerOne { public double methoda() { return d1; } }\n[2] static class InnerOne { static double methoda() { return d1; } }\n[3] private class InnerOne { public double methoda() { return d1; } }\n[4] protected class InnerOne { static double methoda() { return d1; } }\n[5] public abstract class InnerOne { public abstract double methoda(); }",
    options: [
      "[3] và [5] (Inner class truy cập d1 & Abstract inner class)",
      "[1] và [2]",
      "[2] và [3]",
      "[1] và [4]"
    ],
    answer: 0
  }),
  62: (q) => ({
    text: "Hai khai báo mảng nào dưới đây sẽ gây lỗi biên dịch? (Which two cause a compiler error?)",
    code: "[1] int[] scores = {3, 5, 7};\n[2] int [] [] scores = {2, 7, 6}, {9, 3, 45};\n[3] String cats[] = {\"Fluffy\", \"Spot\", \"Zeus\"};\n[4] boolean results[] = new boolean [3] {true, false, true};\n[5] Integer results[] = {new Integer(3), new Integer(5), new Integer(8)};\n[6] String[] dogs = new String[] {new String(\"Fido\"), new String(\"Spike\"), new String(\"Aiko\")};",
    options: [
      "[2] và [4] (Sai cú pháp mảng 2D & vừa cấp phát size vừa dùng initializer)",
      "[1] và [3]",
      "[3] và [5]",
      "[5] và [6]"
    ],
    answer: 0
  }),
  64: (q) => ({
    text: "Cho đoạn mã sau, hai thay đổi độc lập nào cho phép mã nguồn biên dịch thành công? (Choose two)",
    code: "1. public abstract class Test {\n2.   public abstract void methodA();\n4.   public abstract void methodB()\n5.   {\n6.     System.out.println(\"Hello\");\n7.   }\n8. }",
    options: [
      "Thay thế các dòng 5-7 bằng dấu chấm phẩy (;) HOẶC bỏ từ khóa abstract ở methodB()",
      "Thêm body cho methodA() HOẶC bỏ abstract ở Test",
      "Bỏ abstract ở Test HOẶC bỏ abstract ở methodA",
      "Thêm body cho methodA() HOẶC thay dòng 5-7 bằng dấu chấm phẩy (;)"
    ],
    answer: 0
  }),
  66: (q) => ({
    text: "Cho đoạn mã sau, hai phát biểu nào là ĐÚNG về việc thu gom rác? (Which two statements are correct?)",
    code: "1. class A { }\n3. class Alpha {\n4.   private A myA = new A();\n6.   void dolt(A a) {\n7.     a = null;\n8.   }\n9.   void tryIt() {\n10.    dolt(myA);\n11.  }\n12. }",
    options: [
      "Gán myA = null sẽ làm instance đó đủ điều kiện GC & Đối tượng private myA sẽ bị GC khi instance Alpha bị GC",
      "Không có instance nào của A bị GC & tryIt() đánh dấu myA bị GC",
      "Gọi dolt(myA) sẽ lập tức làm đối tượng myA bị GC",
      "Chỉ khi luồng kết thúc thì myA mới được GC, không phụ thuộc vào Alpha"
    ],
    answer: 0
  }),
  70: (q) => ({
    text: "Cho các lớp X và Y, hai phương thức nào có thể thêm vào định nghĩa của lớp Y? (Choose two)",
    code: "1. public class X {\n2.   public X aMethod() { return this; }\n3. }\n1. public class Y extends X {\n2. }\n\nCác lựa chọn:\n[1] public void aMethod() { }\n[2] private void aMethod() { }\n[3] public void aMethod(String s) { }\n[4] private Y aMethod() { return null; }\n[5] public X aMethod() { return new Y(); }",
    options: [
      "[3] và [5] (Overload với String s & Override trả về Y/X hợp lệ)",
      "[1] và [2]",
      "[2] và [4]",
      "[1] và [4]"
    ],
    answer: 0
  }),
  80: (q) => ({
    text: "Trong hai trường hợp nào dưới đây trình biên dịch sẽ tự động cung cấp default constructor cho class A? (Choose two)",
    code: "[1] class A { }\n[2] class A { public A() { } }\n[3] class A { public A(int x) { } }\n[4] class Z { } class A extends Z { void A() { } }",
    options: [
      "[1] và [4] (Không khai báo constructor & void A() chỉ là method)",
      "[1] và [2]",
      "[2] và [3]",
      "[3] và [4]"
    ],
    answer: 0
  }),
  93: (q) => ({
    text: "Bốn đối tượng / kiểu nào sau đây có thể được sử dụng trong câu lệnh `throw`? (Choose four)",
    code: "[1] Error\n[2] Event\n[3] Object\n[4] Throwable\n[5] Exception\n[6] RuntimeException",
    options: [
      "[1], [4], [5] và [6] (Error, Throwable, Exception, RuntimeException)",
      "[1], [2], [3] và [4]",
      "[2], [3], [4] và [5]",
      "[2], [3], [5] và [6]"
    ],
    answer: 0
  }),
  102: (q) => ({
    text: "Cho đoạn mã sau, ba biểu thức so sánh nào trả về giá trị true? (Choose three)",
    code: "11. public static void main( String[] args ) {\n12.   Integer a = new Integer(10);\n13.   Integer b = new Integer(10);\n14.   Integer c = a;\n15.   int d = 10;\n16.   double e = 10.0;\n17. }\n\nCác biểu thức:\n[1] (a == c)\n[2] (d == e)\n[3] (b == d)\n[4] (a == b)\n[5] (b == c)\n[6] (d == 10.0)",
    options: [
      "[1], [2] và [6] ((a == c), (d == e), (d == 10.0))",
      "[1], [3] và [4]",
      "[2], [4] và [5]",
      "[3], [4] và [6]"
    ],
    answer: 0
  }),
  104: (q) => ({
    text: "Giả sử b và c là các tham chiếu tới đối tượng của các lớp Wrapper (Integer, Float...), hai phát biểu nào là ĐÚNG theo tài liệu SCJP? (Choose two)",
    code: "[1] b.equals(b) returns true.\n[2] b.equals(c) returns the same result as b == c.\n[3] b.equals(c) can return false even if c.equals(b) returns true.\n[4] b.equals(c) throws an exception if b and c are different wrapper types.\n[5] b.equals(c) returns false if the type of wrapper objects being compared are different.",
    options: [
      "[2] và [3]",
      "[1] và [5]",
      "[3] và [4]",
      "[4] và [5]"
    ],
    answer: 0
  }),
  107: (q) => ({
    text: "Ba đoạn mã nào dưới đây thể hiện mối quan hệ 'is a' (Kế thừa)? (Choose three)",
    code: "[1] public class X { } public class Y extends X { }\n[2] public interface Shape { } public interface Rectangle extends Shape { }\n[3] public interface Color { } public class Shape { private Color color; }\n[4] public interface Species { } public class Animal { private Species species; }\n[5] public class Person { } public class Employee { public Employee(Person person) { } }\n[6] interface Component { } class Container implements Component { private Component[] children; }",
    options: [
      "[1], [2] và [6] (Kế thừa class, extends interface & implements interface)",
      "[1], [3] và [4]",
      "[2], [4] và [5]",
      "[3], [4] và [5]"
    ],
    answer: 0
  }),
  108: (q) => ({
    text: "Cho đoạn mã sau, hai khai báo nào tại dòng 7 là ví dụ hợp lệ về Ghi đè phương thức (method overriding)? (Choose two)",
    code: "1. class BaseClass {\n2.   private float x = 1.0f;\n3.   protected float getVar() { return x; }\n4. }\n5. class SubClass extends BaseClass {\n6.   private float x = 2.0f;\n7.   // insert code here\n8. }\n\nCác khai báo:\n[1] float getVar() { return x; }\n[2] public float getVar() { return x; }\n[3] public double getVar() { return x; }\n[4] protected float getVar() { return x; }\n[5] public float getVar(float f) { return f; }",
    options: [
      "[2] và [4] (public float getVar() & protected float getVar())",
      "[1] và [3]",
      "[2] và [5]",
      "[3] và [5]"
    ],
    answer: 0
  }),
  110: (q) => ({
    text: "Hai lợi ích cốt lõi của việc đóng gói hoàn toàn một lớp (fully encapsulating a class) là gì? (Choose two)",
    code: "[1] Performance of class methods is improved.\n[2] Implementation details of the class are hidden.\n[3] Access modifiers can be omitted on class data members.\n[4] Code that uses the encapsulation class can access data members directly.\n[5] Internal operation of the class can be modified without impacting clients of that class.",
    options: [
      "[2] và [5] (Ẩn chi tiết cài đặt & có thể sửa đổi bên trong mà không ảnh hưởng client)",
      "[1] và [3]",
      "[1] và [4]",
      "[3] và [4]"
    ],
    answer: 0
  }),
  121: (q) => ({
    text: "Cho đoạn mã sau, hai đoạn code nào thêm vào dòng 17 sẽ in các phần tử theo thứ tự bảng chữ cái? (Choose two)",
    code: "11. ArrayList a = new ArrayList();\n12. a.add(\"Alpha\");\n13. a.add(\"Bravo\");\n14. a.add(\"Charlie\");\n15. a.add(\"Delta\");\n16. Iterator iter = a.iterator();\n17. \n\nCác lựa chọn:\n[1] for (int i=0; i< a.size(); i++) System.out.println(a.get(i));\n[2] for (int i=0; i< a.size(); i++) System.out.println(a[i]);\n[3] while( iter.hasNext() ) System.out.println(iter.next());\n[4] for (int i=0; i< a.size(); i++) System.out.println(iter[i]);\n[5] for (int i=0; i< a.size(); i++) System.out.println(iter.get(i));",
    options: [
      "[1] và [3] (Duyệt theo a.get(i) và duyệt qua Iterator iter.hasNext()/next())",
      "[1] và [2]",
      "[2] và [4]",
      "[3] và [5]"
    ],
    answer: 0
  }),
  123: (q) => ({
    text: "Hai khai báo nào dưới đây là hợp lệ cho một biến kiểu float? (Choose two)",
    code: "[1] float f = 1F;\n[2] float f = 1.0.;\n[3] float f = '1';\n[4] float f = \"1\";\n[5] float f = 1.0d;",
    options: [
      "[1] và [3] (float f = 1F; & float f = '1';)",
      "[1] và [2]",
      "[2] và [5]",
      "[4] và [5]"
    ],
    answer: 0
  }),
  128: (q) => ({
    text: "Hai từ nào dưới đây là từ khóa bảo lưu (reserved words) trong Java? (Choose two)",
    code: "[1] run\n[2] import\n[3] default\n[4] implement",
    options: [
      "[2] và [3] (import & default)",
      "[1] và [2]",
      "[1] và [4]",
      "[3] và [4]"
    ],
    answer: 0
  }),
  129: (q) => ({
    text: "Hai phát biểu nào là ĐÚNG về giá trị trả về của các phương thức hashCode() và equals() được cài đặt chuẩn xác? (Choose two)",
    code: "[1] If the hashCode values are different, the objects might be equal.\n[2] If the hashCode values are the same, the object must be equal.\n[3] If the hashCode values are the same, the objects might be equal.\n[4] If the hashCode values are different, the objects must be unequal.",
    options: [
      "[3] và [4] (Nếu hashCode bằng nhau thì có thể equal; Nếu hashCode khác nhau thì chắc chắn không equal)",
      "[1] và [2]",
      "[1] và [4]",
      "[2] và [3]"
    ],
    answer: 0
  }),
  142: (q) => ({
    text: "Cho BaseClass sau, hai khai báo nào tại dòng 7 của SubClass là ví dụ hợp lệ về Ghi đè phương thức (method overriding)? (Choose two)",
    code: "1. class BaseClass{\n2.   private float x = 1.0f;\n3.   protected void setVar (float f) {x = f;}\n4. }\n5. class SubClass extends BaseClass {\n6.   private float x = 2.0f;\n7.   //insert code here\n8. }\n\nCác lựa chọn:\n[1] void setVar(float f) {x = f;}\n[2] public void setVar(int f) {x = f;}\n[3] public void setVar(float f) {x = f;}\n[4] public double setVar(float f) {x = f;}\n[5] public final void setVar(float f) {x = f;}\n[6] protected float setVar() {x = 3.0f; return 3.0f; }",
    options: [
      "[3] và [5] (public void setVar(float f) & public final void setVar(float f))",
      "[1] và [2]",
      "[2] và [4]",
      "[4] và [6]"
    ],
    answer: 0
  }),
  146: (q) => ({
    text: "Hai biểu thức nào dưới đây có giá trị tương đương nhau? (Choose two)",
    code: "[1] 3/2\n[2] 3<2\n[3] 3*4\n[4] 3<<2\n[5] 3*2*2\n[6] 3<<<2",
    options: [
      "[3] và [4] (3*4 = 12 và 3<<2 = 12)",
      "[1] và [2]",
      "[2] và [6]",
      "[4] và [5]"
    ],
    answer: 0
  })
};

// Custom handler for fill questions
const FILL_HANDLERS = {
  34: (q) => {
    const match = q.text.match(/^Given:?\s*\n+([\s\S]+?)\n\n([^\n]+(?:\n[^\n]+)?)$/i);
    return {
      text: "Cho đoạn mã sau, giá trị của biến output tại dòng 23 là gì? (What is the value of the variable output at line 23?)",
      code: match ? match[1].trim() : q.text,
      options: ["13423", "1342", "1343", "1234"],
      answer: 0
    };
  },
  137: (q) => {
    const match = q.text.match(/^Given:?\s*\n+([\s\S]+?)\n\n([^\n]+(?:\n[^\n]+)?)$/i);
    return {
      text: "Cho đoạn mã sau, kết quả in ra màn hình là gì? (What is the output?)",
      code: match ? match[1].trim() : q.text,
      options: ["javajavaC", "iavaiavaC", "javajava", "iavajavaC"],
      answer: 0
    };
  }
};

// Process all 146 questions
const normalizedQuestions = rawQuestions.map((q, index) => {
  const qId = `scjp-${String(index + 1).padStart(3, "0")}`;
  const topic = determineTopic(q);
  
  // Handle fill
  if (q.type === "fill" && FILL_HANDLERS[q.id]) {
    const custom = FILL_HANDLERS[q.id](q);
    return {
      id: qId,
      originalId: q.id,
      topic,
      text: custom.text,
      code: custom.code || "",
      options: custom.options,
      answer: custom.answer,
      explanation: q.explanation || ""
    };
  }

  // Handle multi
  if (q.type === "multi" && MULTI_HANDLERS[q.id]) {
    const custom = MULTI_HANDLERS[q.id](q);
    return {
      id: qId,
      originalId: q.id,
      topic,
      text: custom.text,
      code: custom.code || "",
      options: custom.options,
      answer: custom.answer,
      explanation: q.explanation || ""
    };
  }

  // Single choice questions
  const ansLetter = (q.answer && q.answer[0]) ? q.answer[0].toUpperCase() : "A";
  const answerIdx = Math.max(0, ansLetter.charCodeAt(0) - 65);

  let text = q.text;
  let code = "";

  // Try extracting code if starts with Given:
  const givenMatch = text.match(/^Given:?\s*\n+([\s\S]+?)\n\n([^\n]+(?:\n[^\n]+)?)$/i);
  if (givenMatch) {
    code = givenMatch[1].trim();
    text = givenMatch[2].trim();
  } else if (text.startsWith("ClassOne.java:")) {
    const lastPromptIdx = text.lastIndexOf("\n\nWhat is the result?");
    if (lastPromptIdx !== -1) {
      code = text.substring(0, lastPromptIdx).trim();
      text = text.substring(lastPromptIdx).trim();
    }
  }

  return {
    id: qId,
    originalId: q.id,
    topic,
    text,
    code,
    options: q.options,
    answer: answerIdx,
    explanation: q.explanation || ""
  };
});

console.log(`Processed ${normalizedQuestions.length} questions.`);

// Verify all questions have valid options and answer
let issues = 0;
normalizedQuestions.forEach((q, i) => {
  if (!q.options || q.options.length < 2) {
    console.error(`Issue at #${i + 1} (${q.id}): Not enough options`, q.options);
    issues++;
  }
  if (q.answer < 0 || q.answer >= q.options.length) {
    console.error(`Issue at #${i + 1} (${q.id}): Answer index out of bounds (${q.answer} / ${q.options.length})`);
    issues++;
  }
});

if (issues > 0) {
  console.error(`Found ${issues} validation issues! Halting.`);
  process.exit(1);
}

console.log("All 146 questions validated successfully!");

const quizObject = {
  slug: "scjp-310-035",
  title: "Java SCJP 310-035 – Section A (Ebook TestKing)",
  description: "146 câu hỏi ôn thi Java 310-035 (SCJP) trích từ Ebook TestKing 12.0 có đáp án và giải thích chi tiết.",
  color: "#2563eb",
  icon: "📕",
  order: 7,
  hidden: false,
  questions: normalizedQuestions
};

// 1. Write to lib/scjpData.js
const scjpDataPath = path.resolve(__dirname, "../lib/scjpData.js");
const fileContent = `// Java SCJP 310-035 Quiz Dataset (146 questions from TestKing Ebook Section A)
export const scjpQuiz = ${JSON.stringify(quizObject, null, 2)};
`;

fs.writeFileSync(scjpDataPath, fileContent, "utf8");
console.log(`Wrote dataset to ${scjpDataPath}`);

// 2. Upsert into MongoDB
async function syncToDb() {
  console.log("Connecting to MongoDB...");
  const db = await getDb();
  const res = await db.collection("quizzes").updateOne(
    { slug: quizObject.slug },
    {
      $set: {
        title: quizObject.title,
        description: quizObject.description,
        color: quizObject.color,
        icon: quizObject.icon,
        order: quizObject.order,
        hidden: quizObject.hidden,
        questions: quizObject.questions,
        updatedAt: new Date()
      },
      $setOnInsert: {
        slug: quizObject.slug,
        createdAt: new Date()
      }
    },
    { upsert: true }
  );

  console.log("MongoDB update result:", res);
  console.log(`Successfully upserted '${quizObject.slug}' with ${quizObject.questions.length} questions into MongoDB!`);
  process.exit(0);
}

syncToDb().catch(err => {
  console.error("Database sync failed:", err);
  process.exit(1);
});
