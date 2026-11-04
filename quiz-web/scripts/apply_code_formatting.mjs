import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicit dictionary for exact complex code options from OCR
const exactDict = {
  "publicstaticshortstop= 23;": "public static short stop = 23;",
  "protectedshortstop= 23;": "protected short stop = 23;",
  "transientshortstop= 23;": "transient short stop = 23;",
  "finalvoidmadness(shortstop);": "final void madness(short stop);",
  "publicBooleanmadness(longbow);": "public Boolean madness(long bow);",
  "staticcharmadness(doubleduty);": "static char madness(double duty);",
  "protectedinta;": "protected int a;",
  "transientintb= 3;": "transient int b = 3;",
  "publicstaticfinalintc;": "public static final int c;",
  "volatileintd;": "volatile int d;",
  "privatesynchronizedinte;": "private synchronized int e;",
  "classAllMathextendsDoMath{ doublegetArea(intr);}": "class AllMath extends DoMath { double getArea(int r); }",
  "interfaceAllMathimplementsMathPlus{ doublegetVol(intx,inty);}": "interface AllMath implements MathPlus { double getVol(int x, int y); }",
  "interfaceAllMathextendsDoMath{ floatgetAvg(inth,intl);}": "interface AllMath extends DoMath { float getAvg(int h, int l); }",
  "classAllMathimplementsMathPlus{ doublegetArea(intrad); }": "class AllMath implements MathPlus { double getArea(int rad); }",
  "abstractclassAllMathimplementsDoMath,MathPlus{ publicdoublegetArea(intrad){returnrad*rad*3.14;}}": "abstract class AllMath implements DoMath, MathPlus { public double getArea(int rad) { return rad * rad * 3.14; } }",
  "privateintgetArea();": "private int getArea();",
  "publicfloatgetVol(floatx);": "public float getVol(float x);",
  "publicvoidmain(String[]args);": "public void main(String[] args);",
  "publicstaticvoidmain(String[]args);": "public static void main(String[] args);",
  "booleansetFlag(Boolean[]test[]);": "boolean setFlag(Boolean[] test[]);",
  "interfaceBase2implementsBase{}": "interface Base2 implements Base {}",
  "abstractclassClass2extendsBase{ publicbooleanm1(){returntrue;}}": "abstract class Class2 extends Base { public boolean m1() { return true; } }",
  "abstractclassClass2implementsBase{}": "abstract class Class2 implements Base {}",
  "abstractclassClass2implementsBase{ publicbooleanm1(){return(7>4);}}": "abstract class Class2 implements Base { public boolean m1() { return (7 > 4); } }",
  "classClass2implementsBase{ booleanm1(){returnfalse;} bytem2(shorts){return42;}};": "class Class2 implements Base { boolean m1() { return false; } byte m2(short s) { return 42; } }",
  "finalabstractclassTest{}": "final abstract class Test {}",
  "publicstaticinterfaceTest{}": "public static interface Test {}",
  "finalpublicclassTest{}": "final public class Test {}",
  "protectedabstractclassTest{}": "protected abstract class Test {}",
  "protectedinterfaceTest{}": "protected interface Test {}",
  "abstractpublicclassTest{}": "abstract public class Test {}",
  "MyOuter.MyInnerm= newMyOuter.MyInner();": "MyOuter.MyInner m = new MyOuter.MyInner();",
  "MyOuter.MyInnermi= newMyInner();": "MyOuter.MyInner mi = new MyInner();",
  "MyOuterm= newMyOuter(); MyOuter.MyInnermi= m.newMyOuter.MyInner();": "MyOuter m = new MyOuter(); MyOuter.MyInner mi = m.new MyOuter.MyInner();",
  "MyInnermi= newMyOuter.MyInner();": "MyInner mi = new MyOuter.MyInner();",
  "Runnabler= newRunnable(){};": "Runnable r = new Runnable() {};",
  "Runnabler= newRunnable(publicvoidrun(){});": "Runnable r = new Runnable(public void run() {});",
  "Runnabler= newRunnable{publicvoidrun(){}};": "Runnable r = new Runnable { public void run() {} };",
  "Runnabler= newRunnable(){publicvoidrun{}};": "Runnable r = new Runnable() { public void run {} };",
  "System.out.println(newRunnable() {publicvoidrun(){}});": "System.out.println(new Runnable() { public void run() {} });",
  "System.out.println(newRunnable(publicvoidrun(){}));": "System.out.println(new Runnable(public void run() {}));",
  "Boof= newBoo(24){};": "Boo f = new Boo(24) {};",
  "Boof= newBar(){};": "Boo f = new Bar() {};",
  "Boof= newBoo(){Strings;};": "Boo f = new Boo() { String s; };",
  "Barf= newBoo(Strings){};": "Bar f = new Boo(String s) {};",
  "Boof= newBoo.Bar(Strings){};": "Boo f = new Boo.Bar(String s) {};",
  "Foo.Barb= newFoo.Bar();": "Foo.Bar b = new Foo.Bar();",
  "Foo.Barb= f.newBar();": "Foo.Bar b = f.new Bar();",
  "Barb= newf.Bar();": "Bar b = new f.Bar();",
  "Barb= f.newBar();": "Bar b = f.new Bar();",
  "Foo.Barb= newf.Bar();": "Foo.Bar b = new f.Bar();",
  "public class MyRunnable extends Runnable{public void run(){}}": "public class MyRunnable extends Runnable { public void run() {} }",
  "public class MyRunnable extends Object{public void run(){}}": "public class MyRunnable extends Object { public void run() {} }",
  "public class MyRunnable implements Runnable{public void run(){}}": "public class MyRunnable implements Runnable { public void run() {} }",
  "public class MyRunnable implements Runnable{void run(){}}": "public class MyRunnable implements Runnable { void run() {} }",
  "public class MyRunnable implements Runnable{public void start(){}}": "public class MyRunnable implements Runnable { public void start() {} }",
  "public int read(int a, int b){return a+b;} public void set(int a, int b){this.a= a;this.b= b;}": "public int read(int a, int b) { return a + b; } public void set(int a, int b) { this.a = a; this.b = b; }",
  "public synchronized int read(int a, int b){return a+b;} public synchronized void set(int a, int b){this.a= a;this.b= b;}": "public synchronized int read(int a, int b) { return a + b; } public synchronized void set(int a, int b) { this.a = a; this.b = b; }",
  "public int read(int a, int b){synchronized(a){return a+b;}} public void set(int a, int b){synchronized(a){this.a= a;this.b= b;}}": "public int read(int a, int b) { synchronized(a) { return a + b; } } public void set(int a, int b) { synchronized(a) { this.a = a; this.b = b; } }",
  "public int read(int a, int b){synchronized(a){return a+b;}} public void set(int a, int b){synchronized(b){this.a= a;this.b= b;}}": "public int read(int a, int b) { synchronized(a) { return a + b; } } public void set(int a, int b) { synchronized(b) { this.a = a; this.b = b; } }",
  "public synchronized(this) int read(int a, int b){return a+b;} public synchronized(this) void set(int a, int b){this.a= a;this.b= b;}": "public synchronized(this) int read(int a, int b) { return a + b; } public synchronized(this) void set(int a, int b) { this.a = a; this.b = b; }",
  "public int read(int a, int b){synchronized(this){return a+b;}} public void set(int a, int b){synchronized(this){this.a= a;this.b= b;}}": "public int read(int a, int b) { synchronized(this) { return a + b; } } public void set(int a, int b) { synchronized(this) { this.a = a; this.b = b; } }",
  "Wrap a synchronize(this) around the call tof.increase().;": "Wrap a synchronize(this) around the call to f.increase().",
  "The print order is not guaranteed.;": "The print order is not guaranteed.",
  "equals() can be true even if it’s comparing different objects.;": "equals() can be true even if it's comparing different objects.",
  "count= 11 Passing Variables into Methods (;": "count = 11",
  "1101 Flow Control (loops) (;": "1101",
  "None of the above Exceptions (;": "None of the above",
  "The first statement of every constructor is a legal call to thesuper() orthis()method. Return Types (;": "The first statement of every constructor is a legal call to the super() or this() method.",
  "An exception is thrown at runtime. Using the java.lang.Math Class (;": "An exception is thrown at runtime.",
  "None of the above Using Wrapper Classes (;": "None of the above",
  "java.util.TreeSet Garbage Collection (;": "java.util.TreeSet",
  "An exception is thrown at runtime. Declaration Rules (;": "An exception is thrown at runtime.",
  "array;": "array",
  "string;": "string"
};

export function cleanOptionText(text) {
  if (!text || typeof text !== "string") return text;
  let s = text.trim();

  // Check exact dictionary first
  if (exactDict[s]) return exactDict[s];

  // 1. Clean OCR section header remnants
  s = s.replace(/\s+Declaration Rules\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Passing Variables into Methods\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Flow Control \(loops\)\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Exceptions\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Return Types\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Using the java\.lang\.Math Class\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Using Wrapper Classes\s*\([;\)]*/gi, "");
  s = s.replace(/\s+Garbage Collection\s*\([;\)]*/gi, "");
  s = s.replace(/\s*;?\s*Array Declaration, Construction, and Initialization\s*\(Objective\s*1\.1\)/gi, ";");
  s = s.replace(/\s*\(\s*;\s*$/g, "");

  // 2. Standardize curly quotes
  s = s.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");

  // 3. Glued English words from OCR
  s = s.replace(/\btheequals\(\)/g, "the equals()");
  s = s.replace(/\bthehashCode\(\)/g, "the hashCode()");
  s = s.replace(/\bthefragment([a-zA-Z])/g, "the fragment $1");
  s = s.replace(/\breturnstrue\b/g, "returns true");
  s = s.replace(/\breturnsfalse\b/g, "returns false");
  s = s.replace(/\bbetrue\b/g, "be true");
  s = s.replace(/\bistrue\b/g, "is true");
  s = s.replace(/\bthesuper\(\)/g, "the super()");
  s = s.replace(/\borthis\(\)/g, "or this()");
  s = s.replace(/\bthepublicrun\(\)/g, "the public run()");
  s = s.replace(/\btheRunnable\b/g, "the Runnable");
  s = s.replace(/\busingnew([A-Za-z])/g, "using new $1");
  s = s.replace(/\btof\.increase\(\)/g, "to f.increase()");
  s = s.replace(/\bbetweennotify\(\)/g, "between notify()");
  s = s.replace(/\bandnotifyAll\(\)/g, "and notifyAll()");
  s = s.replace(/\bthatnotifyAll\(\)/g, "that notifyAll()");

  // 4. Glued instanceof
  s = s.replace(/([a-zA-Z0-9_]+)instanceof([a-zA-Z0-9_]+)/g, "$1 instanceof $2");

  // 5. Glued Java keywords and modifiers
  s = s.replace(/\b(final|static|public|protected|private|abstract)(void|int|float|double|char|boolean|byte|short|long|String|Boolean|Float|class|interface)/g, "$1 $2");
  s = s.replace(/\b(abstract|final|static|public|protected|private)(class|interface)/g, "$1 $2");
  s = s.replace(/\b(class|interface)([A-Z])/g, "$1 $2");
  s = s.replace(/([a-zA-Z0-9_\]\)])(extends|implements)/g, "$1 $2");
  s = s.replace(/(extends|implements)([A-Za-z_])/g, "$1 $2");
  s = s.replace(/\b(new)([A-Za-z_])/g, "$1 $2");
  s = s.replace(/\b(return)([A-Za-z0-9_])/g, "$1 $2");
  s = s.replace(/\b(import)([a-zA-Z_])/g, "$1 $2");

  // 6. Types glued to variable names: e.g. floatf1, intarray, charc1, DogmyDogs, inta
  const safeTypes = ["float", "int", "char", "boolean", "double", "byte", "short", "long", "String", "Array", "Dog"];
  for (const t of safeTypes) {
    const r = new RegExp(`\\b(${t})([a-z0-9_][a-zA-Z0-9_]*)\\b`, "g");
    s = s.replace(r, (m, p1, p2) => {
      // Guard safe words
      if (p1 === "char" && p2.startsWith("acter")) return m;
      if (p1 === "int" && (p2.startsWith("erface") || p2.startsWith("eger") || p2.startsWith("errupt") || p2.startsWith("ern") || p2.startsWith("erval"))) return m;
      if (p1 === "double" && p2.startsWith("duty")) return "double duty";
      return `${p1} ${p2}`;
    });
  }

  // 7. Array brackets glued to type or variable: int[]myScores -> int[] myScores
  s = s.replace(/(\])([a-zA-Z_])/g, "$1 $2");

  // 8. Equals and comparison operators spacing
  s = s.replace(/=\s*=\s*/g, " == ");
  s = s.replace(/!\s*=\s*/g, " != ");
  s = s.replace(/([a-zA-Z0-9_\]\)])\s*=\s*([a-zA-Z0-9_'"{(-])/g, "$1 = $2");
  s = s.replace(/;\s*([a-zA-Z0-9_])/g, "; $1");
  s = s.replace(/,\s*([a-zA-Z0-9_])/g, ", $1");

  // 9. Curly braces spacing
  s = s.replace(/\{([^\s}])/g, "{ $1");
  s = s.replace(/([^\s{])\}/g, "$1 }");

  // 10. Clean semicolon at end of code statements
  s = s.replace(/\s*;\s*$/g, ";");
  s = s.replace(/\.\s*;\s*$/g, ".");
  s = s.replace(/^(None of the above|Compilation fails|An exception is thrown at runtime)\s*;\s*$/i, "$1");

  // 11. Extra whitespace cleanup
  s = s.replace(/[ \t]+/g, " ").trim();

  return s;
}

const processedPath = path.resolve(__dirname, "scjp_processed.json");
const list = JSON.parse(fs.readFileSync(processedPath, "utf8"));
let qModified = 0;

for (const q of list) {
  let changed = false;
  if (q.options && Array.isArray(q.options)) {
    q.options = q.options.map((opt) => {
      const cleaned = cleanOptionText(opt);
      if (cleaned !== opt) changed = true;
      return cleaned;
    });
  }
  if (q.optionsVi && Array.isArray(q.optionsVi)) {
    q.optionsVi = q.optionsVi.map((opt) => {
      const cleaned = cleanOptionText(opt);
      if (cleaned !== opt) changed = true;
      return cleaned;
    });
  }
  if (changed) qModified++;
}

fs.writeFileSync(processedPath, JSON.stringify(list, null, 2), "utf8");
console.log(`Successfully updated ${qModified} questions in scjp_processed.json!`);

