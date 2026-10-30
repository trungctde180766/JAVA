import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const existingData = await import("../lib/interviewData.js");

// 1. SQL (Retain 16 + add 3 new = 19)
const newSqlQuestions = [
  {
    id: "isql17",
    topic: "sql",
    text: "Trong công nghệ JDBC của Java, phân biệt 3 loại đối tượng thực thi câu lệnh: Statement, PreparedStatement và CallableStatement?",
    options: [
      "Statement dùng cho câu lệnh SELECT; PreparedStatement dùng cho INSERT/UPDATE; CallableStatement dùng cho DELETE",
      "Statement thực thi câu lệnh SQL tĩnh không có tham số; PreparedStatement biên dịch trước (pre-compiled) câu lệnh có tham số (?) giúp chống SQL Injection và tăng tốc độ; CallableStatement dùng để gọi các Stored Procedure / Function được lưu sẵn trong Database",
      "CallableStatement chỉ dùng được với hệ quản trị CSDL Oracle, các CSDL khác không hỗ trợ",
      "PreparedStatement chạy chậm hơn Statement vì phải qua bước kiểm tra kiểu dữ liệu"
    ],
    answer: 1,
    explanation: "• Statement: Tạo câu lệnh SQL tĩnh bằng phép nối chuỗi (dễ bị SQL Injection và DB phải parse lại mỗi lần chạy).\n• PreparedStatement: Câu lệnh được biên dịch trước, tham số được truyền qua dấu `?`, tự động escape ký tự nguy hiểm và được DB cache Execution Plan.\n• CallableStatement: Dùng để thực thi Stored Procedure có tham số IN/OUT.\n💡 Mẹo phỏng vấn: Luôn khẳng định trong dự án thực tế luôn dùng PreparedStatement (hoặc qua ORM như JPA/Hibernate) để đảm bảo 100% bảo mật chống SQL Injection.",
    textEn: "In Java JDBC, what are the differences between Statement, PreparedStatement, and CallableStatement?",
    optionsEn: [
      "Statement is used for SELECT; PreparedStatement is used for INSERT/UPDATE; CallableStatement is used for DELETE",
      "Statement executes static SQL strings without parameters; PreparedStatement executes pre-compiled SQL queries with placeholders (?) to prevent SQL Injection and optimize speed; CallableStatement is used to execute Stored Procedures and Functions stored in the database",
      "CallableStatement is only supported in Oracle database systems",
      "PreparedStatement is slower than Statement due to type-checking overhead"
    ]
  },
  {
    id: "isql18",
    topic: "sql",
    text: "Ngoài khả năng chống tấn công SQL Injection, PreparedStatement còn có ưu điểm vượt trội nào về mặt hiệu năng so với Statement thường?",
    options: [
      "PreparedStatement tự động nén dữ liệu truyền qua mạng",
      "RDBMS phân tích cú pháp (Parse), biên dịch (Compile) và lưu trữ kế hoạch thực thi (Query Execution Plan Cache) cho câu lệnh mẫu 1 lần duy nhất; các lần gọi sau chỉ cần truyền giá trị tham số mới vào thực thi ngay mà không cần biên dịch lại",
      "PreparedStatement bỏ qua bước kiểm tra quyền hạn của người dùng",
      "PreparedStatement ghi đè dữ liệu trực tiếp vào ổ cứng không qua bộ đệm RAM"
    ],
    answer: 1,
    explanation: "💡 Giải thích chuyên sâu cho câu hỏi phỏng vấn hay gặp:\nKhi gửi 1 câu SQL, RDBMS phải trải qua: Syntax Checking -> Semantic Checking -> Query Optimization -> Compile Execution Plan. Với `PreparedStatement`, các bước tốn CPU này chỉ chạy 1 lần. Khi chạy vòng lặp 1.000 lần thêm dữ liệu, PreparedStatement giúp giảm tải 80-90% thời gian xử lý của Database Server so với Statement thường.",
    textEn: "Besides preventing SQL Injection, what major performance advantage does PreparedStatement offer over standard Statement?",
    optionsEn: [
      "PreparedStatement automatically compresses data transmitted over the network",
      "The database engine parses, optimizes, and compiles the query execution plan once (Query Plan Caching); subsequent executions only bind new parameter values without re-compiling",
      "PreparedStatement bypasses database permission checks",
      "PreparedStatement writes directly to disk without using RAM buffers"
    ]
  },
  {
    id: "isql19",
    topic: "sql",
    text: "Mục đích cốt lõi của việc thiết kế Sơ đồ Quan hệ Thực thể (ERD) và quá trình Chuẩn hóa dữ liệu (Normalization - 1NF, 2NF, 3NF) là gì?",
    options: [
      "Tăng kích thước lưu trữ của database để bán thêm dung lượng ổ cứng",
      "Loại bỏ hiện tượng dư thừa dữ liệu (Data Redundancy), ngăn chặn các dị thường khi Thêm/Sửa/Xóa dữ liệu (Insertion/Update/Deletion Anomalies) và đảm bảo tính toàn vẹn dữ liệu (Data Integrity)",
      "Làm cho các câu truy vấn SELECT có tốc độ nhanh nhất có thể trong mọi tình huống mà không cần đánh index",
      "Ép buộc mọi bảng chỉ được có duy nhất 1 cột khóa chính là kiểu số nguyên"
    ],
    answer: 1,
    explanation: "• 1NF: Mỗi cột chứa giá trị nguyên tố (Atomic values), không có cột lặp lại.\n• 2NF: Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hoàn toàn vào toàn bộ khóa chính (loại bỏ phụ thuộc một phần vào Composite Key).\n• 3NF: Đạt 2NF và không có phụ thuộc bắc cầu giữa các thuộc tính không khóa.\n💡 Mẹo phỏng vấn: Chuẩn hóa cao (3NF) giúp dữ liệu nhất quán, không bị trùng lặp khi update; tuy nhiên trong hệ thống Big Data/Data Warehouse hoặc báo cáo, người ta có thể 'Khử chuẩn hóa' (Denormalization) có chủ đích để giảm JOIN tăng tốc độ đọc.",
    textEn: "What is the primary purpose of Entity Relationship Diagram (ERD) design and Database Normalization (1NF, 2NF, 3NF)?",
    optionsEn: [
      "To increase database storage size to utilize excess disk space",
      "To eliminate data redundancy, prevent insertion/update/deletion anomalies, and ensure data integrity",
      "To ensure SELECT queries run at maximum speed under all circumstances without indexes",
      "To force all database tables to only contain integer primary keys"
    ]
  }
];

const interviewSql = {
  ...existingData.interviewSql,
  title: "Phỏng Vấn: SQL, Database & JDBC",
  description: "Inner/Left Join, Group By & Having, Performance, Indexing, Execution Order, DML vs DDL, JDBC Statements.",
  questions: [...existingData.interviewSql.questions, ...newSqlQuestions]
};

// 2. Java Core (Retain 11 + add 9 new = 20)
const newJavaCoreQuestions = [
  {
    id: "ijc12",
    topic: "javacore",
    text: "Bốn tính chất cốt lõi của Lập trình Hướng đối tượng (OOP) trong ngôn ngữ Java là gì?",
    options: [
      "Biên dịch (Compilation), Thực thi (Execution), Quản lý bộ nhớ (Garbage Collection), Đa luồng (Multithreading)",
      "Đóng gói (Encapsulation), Kế thừa (Inheritance), Đa hình (Polymorphism) và Trừu tượng (Abstraction)",
      "Static, Final, Abstract, Interface",
      "Public, Protected, Default, Private"
    ],
    answer: 1,
    explanation: "💡 Tóm tắt phỏng vấn ngắn gọn và sắc sảo:\n1. Đóng gói (Encapsulation): Che giấu dữ liệu nội bộ bằng private và cung cấp getter/setter.\n2. Kế thừa (Inheritance): Tái sử dụng và mở rộng thuộc tính/phương thức từ class cha qua từ khóa `extends`.\n3. Đa hình (Polymorphism): Một hành vi có thể thể hiện dưới nhiều hình thái khác nhau (Overloading & Overriding).\n4. Trừu tượng (Abstraction): Tập trung vào đối tượng làm ĐƯỢC GÌ thay vì làm NHƯ THẾ NÀO (qua abstract class và interface).",
    textEn: "What are the four fundamental pillars of Object-Oriented Programming (OOP) in Java?",
    optionsEn: [
      "Compilation, Execution, Garbage Collection, Multithreading",
      "Encapsulation, Inheritance, Polymorphism, Abstraction",
      "Static, Final, Abstract, Interface",
      "Public, Protected, Default, Private"
    ]
  },
  {
    id: "ijc13",
    topic: "javacore",
    text: "Trong Java, sự khác biệt giữa Đa hình lúc biên dịch (Compile-time Polymorphism) và Đa hình lúc chạy (Runtime Polymorphism) là gì?",
    options: [
      "Compile-time là dùng interface; Runtime là dùng abstract class",
      "Compile-time thể hiện qua Nạp chồng phương thức (Method Overloading - cùng tên khác tham số, quyết định lúc compile); Runtime thể hiện qua Ghi đè phương thức (Method Overriding - lớp con viết lại method lớp cha, quyết định lúc chạy thông qua Dynamic Method Dispatch)",
      "Compile-time chỉ áp dụng cho biến static; Runtime chỉ áp dụng cho biến final",
      "Cả hai đều xảy ra lúc chạy và không có gì khác biệt"
    ],
    answer: 1,
    explanation: "• Method Overloading (Đa hình tĩnh / Compile-time): Trình biên dịch dựa vào số lượng và kiểu tham số để biết chính xác hàm nào được gọi.\n• Method Overriding (Đa hình động / Runtime): Biến tham chiếu kiểu cha trỏ đến đối tượng con (`Animal a = new Dog(); a.makeSound()`), JVM phải đợi đến lúc chạy mới biết đối tượng thực tế là `Dog` để gọi `Dog.makeSound()`.",
    textEn: "In Java, what is the difference between Compile-time Polymorphism and Runtime Polymorphism?",
    optionsEn: [
      "Compile-time uses interfaces; Runtime uses abstract classes",
      "Compile-time is achieved via Method Overloading (resolved at compilation time based on parameter signatures); Runtime is achieved via Method Overriding (resolved at runtime via Dynamic Method Dispatch based on actual object instance)",
      "Compile-time only applies to static variables; Runtime only applies to final variables",
      "Both occur at runtime with no practical differences"
    ]
  },
  {
    id: "ijc14",
    topic: "javacore",
    text: "Sắp xếp phạm vi truy cập (Scope) của 4 Access Modifier trong Java từ hẹp nhất đến rộng nhất?",
    options: [
      "default < private < protected < public",
      "private < default (package-private) < protected < public",
      "private < protected < default < public",
      "protected < private < default < public"
    ],
    answer: 1,
    explanation: "1. `private`: Chỉ truy cập được bên trong chính class đó.\n2. `default` (không khai báo gì): Truy cập được bởi tất cả class trong CÙNG package.\n3. `protected`: Truy cập được trong cùng package + các lớp con (subclass) kể cả ở package khác.\n4. `public`: Truy cập tự do từ mọi nơi trong toàn bộ project.",
    textEn: "Order Java's 4 Access Modifiers from narrowest to widest accessibility scope?",
    optionsEn: [
      "default < private < protected < public",
      "private < default (package-private) < protected < public",
      "private < protected < default < public",
      "protected < private < default < public"
    ]
  },
  {
    id: "ijc15",
    topic: "javacore",
    text: "Tác dụng của từ khóa final trong Java khi áp dụng cho Biến, Phương thức (Method) và Lớp (Class) là gì?",
    options: [
      "Biến thành hằng số không đổi; Phương thức không thể bị Ghi đè (Override); Lớp không thể bị Kế thừa (Inheritance)",
      "Biến được lưu vào bộ nhớ cache; Phương thức chạy nhanh hơn; Lớp tự động chuyển thành singleton",
      "Biến chỉ đọc lúc biên dịch; Phương thức chỉ được gọi 1 lần; Lớp không thể tạo object bằng từ khóa new",
      "Biến tự động giải phóng vùng nhớ; Phương thức chạy đa luồng; Lớp không có constructor"
    ],
    answer: 0,
    explanation: "• `final variable`: Giá trị chỉ được gán một lần duy nhất (hằng số).\n• `final method`: Lớp con không được phép override phương thức này (bảo toàn logic cốt lõi).\n• `final class`: Không class nào có thể kế thừa class này (ví dụ: `java.lang.String` là final class để đảm bảo tính bất biến Immutable và bảo mật).",
    textEn: "What is the effect of the final keyword when applied to Variables, Methods, and Classes in Java?",
    optionsEn: [
      "Variable becomes constant (cannot be reassigned); Method cannot be overridden by subclasses; Class cannot be extended (inherited)",
      "Variable is stored in cache; Method runs faster; Class becomes a singleton",
      "Variable is compile-time only; Method can only be called once; Class cannot be instantiated with new",
      "Variable is auto-garbage-collected; Method is multi-threaded; Class has no constructor"
    ]
  },
  {
    id: "ijc16",
    topic: "javacore",
    text: "Khi gọi hàm super() để kích hoạt Constructor của lớp cha trong Constructor của lớp con, quy tắc bắt buộc là gì?",
    options: [
      "super() phải được đặt ở dòng cuối cùng của Constructor lớp con",
      "Lệnh gọi super(...) bắt buộc phải là câu lệnh đầu tiên trong Constructor của lớp con",
      "super() chỉ được gọi nếu phương thức đó có gắn từ khóa static",
      "Không được truyền tham số vào super()"
    ],
    answer: 1,
    explanation: "• Trong Java, khi khởi tạo một đối tượng lớp con, trạng thái của lớp cha phải được khởi tạo TRƯỚC TIÊN. Do đó lệnh gọi `super(...)` (hoặc `this(...)`) bắt buộc phải là dòng lệnh đầu tiên trong Constructor.\n• Nếu lập trình viên không viết `super(...)`, trình biên dịch Java sẽ tự động chèn `super()` không tham số vào dòng đầu tiên.",
    textEn: "What is the mandatory rule when calling super() in a subclass constructor in Java?",
    optionsEn: [
      "super() must be placed as the last statement in the subclass constructor",
      "The call to super(...) must be the very first statement in the subclass constructor",
      "super() can only be called if the constructor is marked static",
      "super() cannot take any parameters"
    ]
  },
  {
    id: "ijc17",
    topic: "javacore",
    text: "Cơ chế String Constant Pool trong Java hoạt động thế nào và tại sao so sánh chuỗi bằng toán tử == có thể cho kết quả sai?",
    options: [
      "String Pool lưu chuỗi vào ổ cứng để tiết kiệm RAM",
      "String Pool là vùng nhớ đặc biệt trong Heap lưu trữ các chuỗi literal để tái sử dụng; toán tử == so sánh địa chỉ tham chiếu vùng nhớ (reference), trong khi chuỗi tạo bằng new String(...) sẽ tạo object mới ngoài Pool khiến == trả về false dù nội dung giống nhau",
      "Toán tử == chỉ so sánh được chuỗi có độ dài dưới 10 ký tự",
      "String Pool tự động xóa chuỗi sau 5 giây nếu không ai dùng"
    ],
    answer: 1,
    explanation: "• Khi khai báo `String s1 = \"Java\"; String s2 = \"Java\";` -> Cả hai trỏ cùng 1 địa chỉ trong String Pool nên `s1 == s2` là `true`.\n• Khi khai báo `String s3 = new String(\"Java\");` -> Tạo đối tượng mới trên Heap nên `s1 == s3` là `false`!\n💡 Quy tắc bất biến: Luôn dùng `s1.equals(s3)` để so sánh nội dung chuỗi trong Java.",
    textEn: "How does the String Constant Pool work in Java, and why can comparing strings with == yield incorrect results?",
    optionsEn: [
      "String Pool saves strings to disk to conserve RAM",
      "String Pool is a special storage area in Heap that reuses string literals; operator == checks reference equality (memory addresses), whereas new String(...) allocates a distinct object outside the pool, causing == to evaluate to false even with identical contents",
      "Operator == only compares strings with fewer than 10 characters",
      "String Pool automatically expires strings after 5 seconds"
    ]
  },
  {
    id: "ijc18",
    topic: "javacore",
    text: "Trong ngôn ngữ Java, phương thức truyền tham số vào hàm (Argument Passing) là Pass-by-value hay Pass-by-reference?",
    options: [
      "Java truyền kiểu nguyên thủy bằng Pass-by-value, truyền Object bằng Pass-by-reference",
      "Java là 100% Pass-by-value: Khi truyền biến nguyên thủy là truyền bản sao của giá trị; khi truyền Object là truyền bản sao của địa chỉ tham chiếu (reference pointer)",
      "Java là 100% Pass-by-reference giống con trỏ C++",
      "Phụ thuộc vào việc hàm đó có gắn từ khóa static hay không"
    ],
    answer: 1,
    explanation: "💡 Câu hỏi bẫy kinh điển trong phỏng vấn Java:\nJava KHÔNG CÓ Pass-by-reference. Java luôn là Pass-by-value.\nKhi truyền 1 object `Person p` vào hàm `change(Person person)`:\n- Nếu bạn gọi `person.setName(\"Nam\")`: Thuộc tính của object bị thay đổi vì cả 2 con trỏ cùng trỏ đến 1 vùng nhớ Heap.\n- Nhưng nếu bạn gán `person = new Person(\"Lan\")`: Object `p` ở ngoài hàm hoàn toàn KHÔNG THAY ĐỔI vì `person` chỉ là bản sao của địa chỉ tham chiếu!",
    textEn: "In Java, is argument passing Pass-by-value or Pass-by-reference?",
    optionsEn: [
      "Java uses Pass-by-value for primitives and Pass-by-reference for Objects",
      "Java is strictly 100% Pass-by-value: For primitives it passes a copy of the literal value; for objects it passes a copy of the reference address (pointer value)",
      "Java is strictly 100% Pass-by-reference similar to C++ pointers",
      "It depends on whether the method has the static modifier"
    ]
  },
  {
    id: "ijc19",
    topic: "javacore",
    text: "Phân biệt 3 Interface cốt lõi trong Java Collections Framework: List, Set và Map?",
    options: [
      "List là danh sách liên kết; Set là mảng 1 chiều; Map là mảng 2 chiều",
      "List lưu trữ có thứ tự và cho phép phần tử trùng lặp; Set lưu trữ các phần tử duy nhất không trùng lặp; Map lưu trữ dữ liệu theo cặp Khóa - Giá trị (Key-Value) với các Key là duy nhất",
      "Set cho phép nhiều key trùng nhau; Map không lưu được chuỗi ký tự",
      "List và Set không thể chứa phần tử null"
    ],
    answer: 1,
    explanation: "• `List` (ArrayList, LinkedList): Có chỉ số (Index), duy trì thứ tự chèn, cho phép trùng lặp.\n• `Set` (HashSet, TreeSet): Không cho phép trùng lặp phần tử (dựa vào `hashCode` và `equals`).\n• `Map` (HashMap, TreeMap): Lưu theo cặp `Key - Value`. Key là duy nhất (nếu put trùng key sẽ ghi đè value cũ).",
    textEn: "What are the distinctions among the 3 core interfaces in Java Collections Framework: List, Set, and Map?",
    optionsEn: [
      "List is a linked list; Set is a 1D array; Map is a 2D array",
      "List maintains insertion order and allows duplicate elements; Set stores unique elements without duplicates; Map stores Key-Value pairs where each Key must be unique",
      "Set allows duplicate keys; Map cannot store string values",
      "List and Set cannot contain null elements"
    ]
  },
  {
    id: "ijc20",
    topic: "javacore",
    text: "Trong máy ảo Java (JVM), Garbage Collector (GC) quyết định một đối tượng đủ điều kiện bị thu gom rác dựa trên nguyên lý nào?",
    options: [
      "Khi đối tượng đã được tạo quá 10 phút mà không được gọi",
      "Khi đối tượng trở nên 'Không thể tiếp cận' (Unreachable) - tức không còn bất kỳ đường dẫn tham chiếu nào xuất phát từ các GC Roots (như biến cục bộ trên Stack, luồng đang chạy, biến static)",
      "Khi lập trình viên gọi lệnh System.gc() thì đối tượng lập tức bị xóa ngay",
      "Khi dung lượng RAM của máy tính bị đầy 100%"
    ],
    answer: 1,
    explanation: "• JVM dùng thuật toán Reachability Analysis (Truy vết khả năng tiếp cận) bắt đầu từ các GC Roots.\n• Nếu một object trong Heap không có đường dẫn nào kết nối tới GC Root, nó được coi là rác (Garbage) và đủ điều kiện bị thu dọn.\n💡 Mẹo phỏng vấn: Lệnh `System.gc()` chỉ là lời 'gợi ý' (suggestion) cho JVM chứ không hề cam kết JVM sẽ chạy GC ngay lập tức.",
    textEn: "In JVM, what principle determines that an object is eligible for Garbage Collection (GC)?",
    optionsEn: [
      "When the object has existed for more than 10 minutes without being accessed",
      "When the object becomes Unreachable - meaning there are no valid reference chains connecting it to any GC Roots (such as stack local variables, active threads, static references)",
      "When the developer explicitly executes System.gc(), the object is immediately destroyed",
      "When computer RAM utilization reaches 100%"
    ]
  }
];

const interviewJavaCore = {
  ...existingData.interviewJavaCore,
  title: "Phỏng Vấn: Java Core, OOP & Collections",
  description: "OOP 4 tính chất, final/static, String Pool, Collections List/Set/Map, Exception, Memory Stack/Heap, GC, Stream API.",
  questions: [...existingData.interviewJavaCore.questions, ...newJavaCoreQuestions]
};

// 3. Spring Boot (Retain 6 + add 7 new = 13)
const newSpringQuestions = [
  {
    id: "isp07",
    topic: "spring",
    text: "Trong Spring Framework, Bean Scope là gì và phân biệt giữa hai phạm vi phổ biến nhất: singleton và prototype?",
    options: [
      "singleton chỉ dùng cho Database; prototype chỉ dùng cho Web Controller",
      "singleton (mặc định) chỉ tạo duy nhất 1 instance của Bean trên toàn bộ Spring IoC Container; prototype tạo một instance mới mỗi khi Bean được yêu cầu inject hoặc gọi qua getBean()",
      "prototype lưu Bean vào Session của người dùng; singleton lưu vào Cookie",
      "singleton chỉ sống trong 1 request; prototype sống vĩnh viễn"
    ],
    answer: 1,
    explanation: "• `singleton` (default scope): Spring IoC Container chỉ khởi tạo 1 instance duy nhất và chia sẻ cho tất cả các class inject nó (vô cùng tối ưu bộ nhớ, tuy nhiên phải thiết kế Stateless - không lưu trạng thái mutable để tránh Race Condition).\n• `prototype`: Mỗi lần inject (@Autowired) sẽ sinh ra 1 object hoàn toàn mới.\n• Các web scopes khác: `request`, `session`, `application`.",
    textEn: "In Spring Framework, what is Bean Scope and how do singleton and prototype scopes differ?",
    optionsEn: [
      "singleton is only for databases; prototype is only for Web Controllers",
      "singleton (default) creates a single shared instance per Spring IoC Container; prototype creates a new distinct instance each time the bean is requested or injected",
      "prototype stores beans in user Session; singleton stores in Cookies",
      "singleton lives only for 1 HTTP request; prototype lives permanently"
    ]
  },
  {
    id: "isp08",
    topic: "spring",
    text: "Sự khác biệt cốt lõi giữa hai Annotation @Controller và @RestController trong Spring Boot là gì?",
    options: [
      "@Controller chỉ dùng cho microservices; @RestController dùng cho monolith",
      "@Controller trả về tên View (như HTML, JSP, Thymeleaf) để ViewResolver phân giải giao diện; @RestController là sự kết hợp của @Controller + @ResponseBody, tự động serialize kết quả trả về thành JSON/XML trong HTTP Response Body (dành cho REST API)",
      "@RestController bắt buộc phải kết hợp với Servlet; @Controller không cần",
      "Cả hai giống hệt nhau, @RestController chỉ là tên viết tắt"
    ],
    answer: 1,
    explanation: "• `@Controller`: Dành cho ứng dụng MVC truyền thống (Server-Side Rendering). Return string `\"index\"` -> tìm file `index.html`.\n• `@RestController` = `@Controller` + `@ResponseBody`: Dành cho RESTful Web Services. Return object `User` -> Jackson ObjectMapper tự động parse sang chuỗi JSON `{\"id\": 1, \"name\": \"Trung\"}` và trả thẳng về client.",
    textEn: "What is the core difference between @Controller and @RestController in Spring Boot?",
    optionsEn: [
      "@Controller is for microservices; @RestController is for monoliths",
      "@Controller returns a view template name resolved by ViewResolver; @RestController is a convenience annotation combining @Controller and @ResponseBody, automatically serializing return values directly into JSON/XML HTTP response bodies (for REST APIs)",
      "@RestController strictly requires Servlets; @Controller does not",
      "Both are completely identical; @RestController is merely an alias"
    ]
  },
  {
    id: "isp09",
    topic: "spring",
    text: "Phân biệt các Annotation Stereotype: @Component, @Service, @Repository và @Bean trong Spring Boot?",
    options: [
      "@Component chỉ dùng cho cấu hình mạng; @Bean dùng cho cơ sở dữ liệu",
      "@Component là annotation cha tổng quát; @Service dùng cho tầng Business Logic; @Repository dùng cho tầng DAO/Truy xuất dữ liệu (hỗ trợ dịch Exception); @Bean được đặt trên method trong class @Configuration để đăng ký bean của thư viện bên thứ 3",
      "@Bean tự động xóa dữ liệu sau khi chạy; @Service chạy ngầm vô hạn",
      "@Repository không thể inject vào Service"
    ],
    answer: 1,
    explanation: "• `@Component`: Đánh dấu class là một Spring-managed Bean để Component Scanning tự động phát hiện.\n• `@Service`: Chuyên biệt hóa của `@Component` ở tầng nghiệp vụ.\n• `@Repository`: Chuyên biệt hóa ở tầng dữ liệu, tự động kích hoạt cơ chế dịch lỗi database (PersistenceExceptionTranslationPostProcessor) sang Spring's DataAccessException.\n• `@Bean`: Áp dụng ở cấp độ Method, dùng khi bạn muốn tạo Bean từ class của thư viện bên ngoài mà bạn không thể chỉnh sửa source code để thêm `@Component`.",
    textEn: "Distinguish between Spring's stereotype annotations: @Component, @Service, @Repository, and @Bean?",
    optionsEn: [
      "@Component is only for networking; @Bean is only for databases",
      "@Component is the generic stereotype; @Service marks the business logic layer; @Repository marks the DAO/data access layer (with exception translation); @Bean is method-level in @Configuration classes to instantiate 3rd-party library beans",
      "@Bean deletes data automatically after execution; @Service runs indefinitely in the background",
      "@Repository cannot be injected into Service classes"
    ]
  },
  {
    id: "isp10",
    topic: "spring",
    text: "Trong Spring Boot REST API, cơ chế Validation dữ liệu đầu vào hoạt động như thế nào và sự khác nhau giữa @Valid và @Validated là gì?",
    options: [
      "@Valid chỉ kiểm tra số chẵn; @Validated kiểm tra số lẻ",
      "Khai báo các ràng buộc (@NotNull, @NotBlank, @Size, @Email...) trên thuộc tính DTO; @Valid là chuẩn tiêu chuẩn của Jakarta/JSR-380; @Validated là annotation của Spring, hỗ trợ thêm tính năng Validation theo nhóm (Validation Groups)",
      "@Validated chỉ chạy được trên môi trường Linux",
      "Không cần thư viện validation, Spring Boot tự động đoán đúng dữ liệu"
    ],
    answer: 1,
    explanation: "• Dùng `spring-boot-starter-validation`.\n• `@NotBlank`: Áp dụng cho String (không null, độ dài > 0 sau khi trim).\n• `@NotNull`: Không được null (thường dùng cho ID, Số, Date).\n• `@Valid`: Chuẩn Java/Jakarta Specification, kích hoạt validation lồng nhau.\n• `@Validated`: Do Spring cung cấp, hỗ trợ kiểm tra trên method parameter và phân nhóm (`groups = {OnCreate.class, OnUpdate.class}`).",
    textEn: "In Spring Boot, how does input validation work and what is the difference between @Valid and @Validated?",
    optionsEn: [
      "@Valid only validates even numbers; @Validated validates odd numbers",
      "Validation constraints (@NotNull, @NotBlank, @Size, @Email) are defined on DTO fields; @Valid is standard Jakarta/JSR-380; @Validated is Spring-specific and supports Validation Groups",
      "@Validated only runs on Linux operating systems",
      "Spring Boot automatically infers validation rules without any annotations"
    ]
  },
  {
    id: "isp11",
    topic: "spring",
    text: "Mối quan hệ giữa JPA, Hibernate và Spring Data JPA là gì? Phân biệt CrudRepository và JpaRepository?",
    options: [
      "JPA là cơ sở dữ liệu NoSQL; Hibernate là công cụ vẽ biểu đồ",
      "JPA là bộ đặc tả tiêu chuẩn (Specification); Hibernate là thư viện hiện thực (Implementation); Spring Data JPA là framework trừu tượng hóa tầng Repository; JpaRepository kế thừa CrudRepository và PagingAndSortingRepository, bổ sung thêm các phương thức flush(), batch delete và trả về List thay vì Iterable",
      "JpaRepository không hỗ trợ phân trang dữ liệu; CrudRepository hỗ trợ phân trang",
      "Bắt buộc phải gắn @Repository lên interface JpaRepository thì project mới chạy được"
    ],
    answer: 1,
    explanation: "💡 Mẹo phỏng vấn cực hay:\n1. JPA là hợp đồng (Interface/Spec), Hibernate là người thực thi hợp đồng.\n2. Interface extends `JpaRepository` KHÔNG CẦN gắn `@Repository` vì Spring Data JPA tự động tạo Proxy bean cho mọi interface extends Repository.\n3. `JpaRepository` tiện hơn `CrudRepository` vì các hàm như `findAll()` trả về thẳng `List<T>` (thay vì `Iterable<T>`), và có sẵn các hàm `saveAndFlush()`, `deleteInBatch()`.",
    textEn: "What is the relationship among JPA, Hibernate, and Spring Data JPA? How do CrudRepository and JpaRepository differ?",
    optionsEn: [
      "JPA is a NoSQL database; Hibernate is a diagramming library",
      "JPA is the official Java ORM specification; Hibernate is the concrete implementation; Spring Data JPA is an abstraction framework over data repositories; JpaRepository extends CrudRepository and PagingAndSortingRepository, adding flush(), batch deletion, and returning List<T> instead of Iterable<T>",
      "JpaRepository does not support pagination; CrudRepository does",
      "Adding @Repository on a JpaRepository interface is strictly required for the application to compile"
    ]
  },
  {
    id: "isp12",
    topic: "spring",
    text: "Trong Spring Data JPA, có những cách chính nào để định nghĩa câu truy vấn dữ liệu từ Database trong interface Repository?",
    options: [
      "Chỉ có thể viết code Java thuần kết nối JDBC",
      "1. Query Creation from Method Names (Derived Query như findByEmailAndStatus); 2. Annotation @Query với JPQL (hướng đối tượng); 3. Annotation @Query(nativeQuery = true) viết SQL thuần của DBMS; 4. Criteria API / Specification cho truy vấn động phức tạp",
      "Bắt buộc phải dùng XML mapping",
      "JPA chỉ hỗ trợ tìm kiếm theo ID, không hỗ trợ các điều kiện khác"
    ],
    answer: 1,
    explanation: "• Derived Queries: Tiện lợi cho câu ngắn (`findByAgeGreaterThan(int age)`).\n• JPQL (`@Query(\"SELECT u FROM User u WHERE u.email = :email\")`): Truy vấn dựa trên Tên Entity và Thuộc tính Java, độc lập với hệ quản trị CSDL.\n• Native Query (`@Query(value = \"SELECT * FROM users WHERE ...\", nativeQuery = true)`): Khi cần tận dụng tính năng riêng biệt của DBMS (như JSON operator, window functions).\n• Spring Data Specifications: Dùng khi form tìm kiếm có nhiều điều kiện lọc động (Dynamic Search).",
    textEn: "In Spring Data JPA, what are the primary ways to define database queries in a Repository interface?",
    optionsEn: [
      "Only by writing manual raw JDBC code",
      "1. Query Creation from Method Names (Derived queries like findByEmailAndStatus); 2. @Query with JPQL (Object-oriented); 3. @Query(nativeQuery = true) for raw DBMS SQL; 4. Criteria API / Specifications for dynamic criteria filtering",
      "XML mapping files are strictly mandatory",
      "JPA only supports queries by primary key ID and cannot filter by other columns"
    ]
  },
  {
    id: "isp13",
    topic: "spring",
    text: "Spring Boot cấu hình kết nối Database như thế nào và tại sao nó chọn HikariCP làm Connection Pool mặc định?",
    options: [
      "Cấu hình trong file HTML; HikariCP là CSDL chạy trên RAM",
      "Cấu hình qua file application.properties / application.yml (spring.datasource.url, username, password, driver-class-name); HikariCP được chọn vì là Connection Pool mã nguồn mở nhẹ nhất, nhanh nhất và tiêu thụ ít CPU nhất hiện nay, giúp duy trì sẵn các kết nối TCP để tái sử dụng mà không mất công tạo mới mỗi request",
      "HikariCP tự động sao lưu dữ liệu sang Google Drive mỗi 10 phút",
      "Spring Boot không hỗ trợ Connection Pool, mỗi request tạo 1 kết nối mới rồi đóng lại"
    ],
    answer: 1,
    explanation: "💡 Kiến trúc kết nối DB:\nKhởi tạo kết nối TCP và xác thực với Database Server tốn hàng chục đến hàng trăm mili-giây. Connection Pool (như HikariCP) duy trì sẵn một nhóm (pool) kết nối mở. Khi Service cần query, nó 'mượn' 1 connection từ pool, thực thi xong thì 'trả lại' cho pool thay vì đóng kết nối thật, giúp ứng dụng chịu tải hàng nghìn request/giây mà không làm nghẽn DB.",
    textEn: "How does Spring Boot configure database connectivity and why does it use HikariCP as the default Connection Pool?",
    optionsEn: [
      "Configured in HTML files; HikariCP is an in-memory database",
      "Configured via application.properties / application.yml (spring.datasource.url, username, password, driver-class-name); HikariCP is chosen because it is the fastest, lightest, and most CPU-efficient open-source connection pool, maintaining reusable TCP connections to eliminate per-request connection overhead",
      "HikariCP automatically backs up databases to Google Drive every 10 minutes",
      "Spring Boot does not support connection pooling; it opens and closes a new connection on every request"
    ]
  }
];

const interviewSpring = {
  ...existingData.interviewSpring,
  title: "Phỏng Vấn: Spring Boot, JPA & Hibernate",
  description: "IoC & DI, Bean Scope & Lifecycle, @RestController vs @Controller, JPA/Hibernate, Validation, Global Exception, CORS.",
  questions: [...existingData.interviewSpring.questions, ...newSpringQuestions]
};

// 4. React & Next.js (Brand new dedicated category - 9 questions!)
const reactQuestions = [
  {
    id: "ir01",
    topic: "react",
    text: "Virtual DOM trong thư viện React là gì và cơ chế hoạt động của thuật toán Reconciliation (Diffing) diễn ra như thế nào?",
    options: [
      "Virtual DOM là bản sao lưu dưới database của giao diện web",
      "Virtual DOM là một bản biểu diễn trừu tượng của Real DOM dưới dạng JavaScript Object nằm trong bộ nhớ RAM; khi state thay đổi, React so sánh Virtual DOM mới và cũ (thuật toán Diffing) rồi chỉ cập nhật phần tử thực sự thay đổi lên Real DOM (Reconciliation / Batching) giúp tăng hiệu năng render",
      "Virtual DOM thao tác trực tiếp với phần cứng màn hình nên nhanh hơn Real DOM hàng nghìn lần",
      "Virtual DOM làm ứng dụng tốn bộ nhớ hơn và không có lợi ích gì đáng kể"
    ],
    answer: 1,
    explanation: "• Thao tác trực tiếp với Real DOM của trình duyệt rất tốn kém tài nguyên vì kích hoạt quá trình tính toán lại layout (Reflow) và vẽ lại pixel (Repaint).\n• React tạo Virtual DOM trên RAM (nhẹ hơn DOM thật rất nhiều), khi state thay đổi nó dùng thuật toán Diffing tìm ra phần khác biệt nhỏ nhất và cập nhật hàng loạt (Batching) lên Real DOM.",
    textEn: "What is the Virtual DOM in React and how does the Reconciliation (Diffing) algorithm optimize UI performance?",
    optionsEn: [
      "A database backup of the user interface stored on the backend",
      "A lightweight virtual in-memory copy of the real DOM. When state changes, React updates Virtual DOM, computes differences (Diffing Algorithm / Reconciliation), and updates only the modified nodes in the Real DOM in batches",
      "A hardware-accelerated direct screen renderer",
      "A plugin that increases memory usage without practical benefits"
    ]
  },
  {
    id: "ir02",
    topic: "react",
    text: "Virtual DOM có luôn luôn nhanh hơn Real DOM thật trong mọi tình huống không? Vì sao?",
    options: [
      "Có, Virtual DOM luôn nhanh hơn 100% trong mọi trường hợp bất kể kích thước ứng dụng",
      "Không. Với các ứng dụng đơn giản hoặc thao tác DOM tĩnh nhỏ lẻ, việc thao tác trực tiếp Real DOM thực tế nhanh hơn vì không mất chi phí RAM tạo Virtual DOM và thời gian chạy thuật toán so sánh Diffing; lợi thế lớn nhất của React là trải nghiệm lập trình (DX) và cập nhật tối ưu hàng loạt (Batching) cho ứng dụng lớn phức tạp",
      "Virtual DOM chỉ chạy nhanh hơn khi người dùng sử dụng trình duyệt Google Chrome",
      "Virtual DOM chỉ nhanh hơn khi có kết nối Internet tốc độ cao"
    ],
    answer: 1,
    explanation: "💡 Câu hỏi phỏng vấn xuất sắc phân loại ứng viên:\nVirtual DOM KHÔNG PHẢI sinh ra để nhanh hơn Real DOM thuần túy (viết Vanilla JS tối ưu tay cho 1 element luôn nhanh hơn bất kỳ framework nào). Virtual DOM sinh ra để lập trình viên có thể viết code dạng Declarative (khai báo: 'giao diện trông như thế này dựa trên state'), và React đảm bảo hiệu năng ở mức 'đủ tốt' (good enough performance) trên các ứng dụng quy mô khổng lồ.",
    textEn: "Is the Virtual DOM always faster than the Real DOM under all circumstances? Why?",
    optionsEn: [
      "Yes, Virtual DOM is 100% faster in every single case regardless of application complexity",
      "No. For simple websites or localized DOM modifications, direct Real DOM manipulation is faster because it avoids in-memory VDOM allocation and diffing algorithm overhead; React's primary strengths are developer experience (DX), declarative UI, and batched updates for complex applications",
      "Virtual DOM is only faster when running specifically on Google Chrome",
      "Virtual DOM is only faster with high-speed broadband connections"
    ]
  },
  {
    id: "ir03",
    topic: "react",
    text: "Trong React, phân biệt giữa State và Props?",
    options: [
      "State truyền từ cha xuống con; Props lưu dữ liệu nội bộ",
      "Props (Properties) là dữ liệu truyền từ component cha xuống component con, component con chỉ đọc (Read-only / Immutable); State là dữ liệu trạng thái nội tại do chính component đó quản lý và khi thay đổi (qua setState / useState) sẽ kích hoạt component re-render",
      "Props có thể thay đổi trực tiếp bằng lệnh gán this.props = ...",
      "Chỉ có Class Component mới có State, Functional Component không thể có State"
    ],
    answer: 1,
    explanation: "• `Props`: Do component cha truyền xuống con. Component con không được phép thay đổi props của chính mình (đảm bảo luồng dữ liệu 1 chiều One-Way Data Flow).\n• `State`: Biến trạng thái nội tại. Khi gọi `setCount(newVal)`, React lên lịch re-render lại component để cập nhật UI tương ứng.",
    textEn: "In React, what is the fundamental difference between State and Props?",
    optionsEn: [
      "State is passed from parent to child; Props is private local data",
      "Props (Properties) are inputs passed down from a parent component (read-only and immutable for the child); State represents internal component state managed locally that triggers re-rendering when updated via setState/useState",
      "Props can be modified directly via assignment",
      "Only Class Components can have State; Functional Components cannot hold state"
    ]
  },
  {
    id: "ir04",
    topic: "react",
    text: "Phân biệt vai trò và cơ chế hoạt động giữa hai React Hook cơ bản: useState và useEffect?",
    options: [
      "useState dùng để gọi API; useEffect dùng để lưu giá trị ô input",
      "useState dùng để khai báo và quản lý biến trạng thái (re-render UI khi giá trị đổi); useEffect dùng để thực thi các tác vụ phụ (Side Effects như gọi API, đăng ký event listener, thao tác DOM, timers) sau khi component đã render lên màn hình",
      "useEffect chỉ chạy duy nhất 1 lần khi tắt trình duyệt",
      "Cả hai hook này có thể đặt bên trong vòng lặp for hoặc câu lệnh if tùy ý"
    ],
    answer: 1,
    explanation: "• `useState`: Quản lý state cục bộ. Mỗi lần gọi hàm setter (`setCount`), React xếp lịch re-render component.\n• `useEffect(callback, deps)`: Xử lý Side Effects.\n  - `deps = undefined`: Chạy sau mỗi lần render.\n  - `deps = []`: Chỉ chạy 1 lần duy nhất sau mount (tương đương `componentDidMount`).\n  - `deps = [a, b]`: Chạy lại khi `a` hoặc `b` thay đổi giá trị.\n  - Return cleanup function: Chạy trước khi unmount để tránh rò rỉ bộ nhớ (Memory Leak).",
    textEn: "What are the distinct roles and mechanisms of the fundamental React Hooks: useState and useEffect?",
    optionsEn: [
      "useState is used to call APIs; useEffect is used to store input values",
      "useState declares and manages local component state (triggering UI re-renders on change); useEffect executes Side Effects (such as data fetching, event listeners, subscriptions, timers) after the component renders",
      "useEffect only runs when closing the browser tab",
      "Both hooks can be freely placed inside for loops and if statements"
    ]
  },
  {
    id: "ir05",
    topic: "react",
    text: "Khi nào nên sử dụng hai hook useMemo và useCallback trong React để tối ưu hiệu năng?",
    options: [
      "Bắt buộc phải bọc tất cả mọi biến và hàm trong useMemo và useCallback để ứng dụng chạy nhanh nhất",
      "useMemo dùng để ghi nhớ kết quả của một phép tính toán tốn kém (expensive calculation); useCallback dùng để ghi nhớ định nghĩa hàm (function reference) tránh tạo con trỏ hàm mới mỗi lần re-render khi truyền xuống component con bọc React.memo",
      "useMemo dùng để gọi API; useCallback dùng để kết nối Database",
      "Hai hook này chỉ dùng được trong môi trường React Native"
    ],
    answer: 1,
    explanation: "💡 Lưu ý phỏng vấn về việc tối ưu hiệu năng (Performance Optimization):\nKhông nên lạm dụng `useMemo`/`useCallback` bừa bãi vì bản thân việc khởi tạo hook và mảng dependencies cũng tốn RAM và chi phí so sánh.\n- Dùng `useMemo`: Khi có phép tính lặp phức tạp (sort/filter mảng hàng nghìn phần tử).\n- Dùng `useCallback`: Khi truyền callback function xuống component con (được bọc bởi `React.memo`) để tránh component con bị re-render vô ích.",
    textEn: "When should useMemo and useCallback be used in React for performance optimization?",
    optionsEn: [
      "All variables and functions must be wrapped in useMemo and useCallback to maximize application speed",
      "useMemo memoizes the computed result of an expensive calculation; useCallback memoizes a function reference to prevent creating a new function instance on every render when passing callbacks to memoized child components (React.memo)",
      "useMemo is for fetching APIs; useCallback is for connecting to databases",
      "These two hooks can only be used in React Native applications"
    ]
  },
  {
    id: "ir06",
    topic: "react",
    text: "Next.js hỗ trợ những phương thức Rendering (kết xuất trang) nào và điểm khác biệt chính giữa chúng là gì?",
    options: [
      "Next.js chỉ hỗ trợ Client Side Rendering giống hệt Create-React-App",
      "1. CSR (Client-Side Rendering): Render hoàn toàn trên trình duyệt; 2. SSR (Server-Side Rendering): Render HTML trên Server cho mỗi request; 3. SSG (Static Site Generation): Tạo sẵn file HTML lúc build time; 4. ISR (Incremental Static Regeneration): Cập nhật ngầm trang tĩnh sau khoảng thời gian định sẵn mà không cần build lại toàn bộ web",
      "Next.js chỉ render được ảnh và video, không render được văn bản",
      "SSR chạy chậm hơn CSR 100 lần trong mọi tình huống"
    ],
    answer: 1,
    explanation: "• `CSR`: Nhẹ server nhưng chậm lần đầu (FCP) và kém SEO.\n• `SSR` (`getServerSideProps` hoặc dynamic fetch): Luôn có dữ liệu mới nhất, tốt cho trang Dashboard cá nhân hóa theo từng user.\n• `SSG` (`generateStaticParams` / static export): Tốc độ cực nhanh vì phân phối qua CDN, hoàn hảo cho blog, tài liệu, landing page.\n• `ISR`: Lấy ưu điểm của cả SSG và SSR (trang tĩnh nhưng có thể tự động revalidate sau X giây khi có dữ liệu mới).",
    textEn: "What rendering strategies does Next.js support, and what are their key distinctions?",
    optionsEn: [
      "Next.js only supports standard Client-Side Rendering identical to Create-React-App",
      "1. CSR (Client-Side Rendering): Executed in browser; 2. SSR (Server-Side Rendering): HTML generated on server per request; 3. SSG (Static Site Generation): HTML pre-rendered at build time; 4. ISR (Incremental Static Regeneration): Re-generates static pages in background on-demand without full site rebuilds",
      "Next.js only renders media files and cannot render text",
      "SSR is always 100 times slower than CSR in every scenario"
    ]
  },
  {
    id: "ir07",
    topic: "react",
    text: "Trong Next.js App Router (React Server Components), chỉ thị \"use client\" đặt ở đầu file có ý nghĩa gì và khi nào bắt buộc phải dùng?",
    options: [
      "Bắt buộc đặt trên 100% tất cả các file trong project Next.js",
      "Đánh dấu ranh giới chuyển đổi từ Server Component sang Client Component; bắt buộc phải dùng khi component có sử dụng React State/Hooks (useState, useEffect), Event Listeners (onClick, onChange) hoặc truy cập Web API trình duyệt (window, localStorage)",
      "Báo hiệu rằng file này là file CSS",
      "Cho phép kết nối trực tiếp đến cơ sở dữ liệu MongoDB mà không cần bảo mật"
    ],
    answer: 1,
    explanation: "• Trong Next.js App Router, mặc định tất cả component đều là React Server Components (RSC) - được render hoàn toàn trên server và không kèm JavaScript bundle xuống client, giúp web siêu nhẹ.\n• Khi bạn cần tính tương tác (Interactive): form input, click button, dùng `useState`, `useEffect`, `useRouter`,... thì BẮT BUỘC phải thêm `\"use client\";` ở dòng đầu tiên.",
    textEn: "In Next.js App Router (React Server Components), what does the \"use client\" directive signify and when is it required?",
    optionsEn: [
      "It must be added at the top of 100% of files in a Next.js project",
      "It marks the boundary between Server Components and Client Components; it is mandatory when a component uses React State/Hooks (useState, useEffect), DOM Event Listeners (onClick, onChange), or browser Web APIs (window, localStorage)",
      "It signals that the file contains CSS stylesheets",
      "It enables direct insecure client connections to MongoDB databases"
    ]
  },
  {
    id: "ir08",
    topic: "react",
    text: "Nếu mục tiêu hàng đầu của dự án là tối ưu SEO (Search Engine Optimization), ta nên ưu tiên phương thức Rendering nào trong Next.js và vì sao?",
    options: [
      "CSR (Client Side Rendering) vì trình duyệt tải rất nhẹ",
      "SSR (Server-Side Rendering) hoặc SSG (Static Site Generation); vì Bot tìm kiếm (Googlebot, Bingbot) sẽ nhận được toàn bộ mã HTML hoàn chỉnh chứa sẵn nội dung, tiêu đề h1 và thẻ meta ngay trong phản hồi đầu tiên, thay vì nhận file HTML rỗng <div id=\"root\"></div> của CSR",
      "Chỉ cần chèn thật nhiều từ khóa vào file README.md",
      "SEO không phụ thuộc vào phương thức rendering của website"
    ],
    answer: 1,
    explanation: "💡 Giải thích SEO phỏng vấn:\nVới CSR truyền thống, bot tìm kiếm nhận được thẻ `<div id=\"root\"></div>` trống rỗng và phải chờ JavaScript tải về thực thi (nhiều crawler mạng xã hội như Facebook, Zalo, Twitter bot thậm chí không chạy JS khi cào thẻ OpenGraph preview).\nVới SSR/SSG, máy chủ trả về mã HTML hoàn chỉnh có sẵn tiêu đề, đoạn văn và thẻ meta `<meta property=\"og:title\">`, giúp nội dung được lập chỉ mục (indexed) ngay lập tức và chính xác 100%.",
    textEn: "If the primary goal of a web project is SEO optimization, which Next.js rendering strategy should be favored and why?",
    optionsEn: [
      "CSR (Client-Side Rendering) because browser payload size is minimal",
      "SSR (Server-Side Rendering) or SSG (Static Site Generation); because search crawlers (Googlebot, Bingbot, social media scrapers) receive fully rendered HTML containing complete text, headers, and meta tags immediately in the initial response, instead of an empty <div id=\"root\"></div> shell",
      "Inserting arbitrary keywords into the project's README.md file",
      "SEO is completely independent of website rendering architecture"
    ]
  },
  {
    id: "ir09",
    topic: "react",
    text: "Khi so sánh cơ chế hiển thị có điều kiện, sự khác nhau giữa directive v-if và v-show trong Vue.js (hoặc tương tự trong React) là gì?",
    options: [
      "v-if chỉ dùng cho ảnh; v-show chỉ dùng cho bảng dữ liệu",
      "v-if thực sự gỡ bỏ hoặc thêm phần tử vào cây DOM (chi phí chuyển đổi cao hơn, phù hợp điều kiện ít thay đổi); v-show luôn render phần tử vào DOM và chỉ ẩn/hiển thị bằng thuộc tính CSS display: none (chi phí khởi tạo ban đầu cao hơn nhưng chuyển đổi bật/tắt cực nhanh)",
      "v-show làm trang web tải chậm hơn 10 lần",
      "Cả hai giống hệt nhau về cả cấu trúc DOM lẫn hiệu năng"
    ],
    answer: 1,
    explanation: "• `v-if`: Điều kiện sai -> phần tử hoàn toàn không tồn tại trong DOM. Rất tiết kiệm tài nguyên nếu điều kiện hiếm khi xảy ra.\n• `v-show`: Phần tử luôn được tạo trong DOM, chỉ thêm style `display: none`. Phù hợp tuyệt đối cho các thành phần bật/tắt liên tục (như Popup Modal, Tooltip, Tab chuyển đổi, Dropdown menu).",
    textEn: "In Vue.js (or conditional rendering concepts), what is the difference between v-if and v-show directives?",
    optionsEn: [
      "v-if is strictly for images; v-show is strictly for data tables",
      "v-if physically attaches or detaches elements from the DOM tree (higher toggle cost, ideal for rarely changing conditions); v-show always renders elements into the DOM and toggles visibility via CSS display: none (higher initial render cost but near-zero toggle cost)",
      "v-show causes the web application to load 10 times slower",
      "Both are identical in terms of DOM tree presence and performance"
    ]
  }
];

export const interviewReact = {
  slug: "interview-react",
  title: "Phỏng Vấn: React & Next.js Frontend",
  description: "Virtual DOM, State vs Props, Hooks (useState, useEffect, useMemo), Next.js SSR/SSG/ISR, 'use client', SEO.",
  icon: "⚛️",
  color: "#61dafb",
  order: 13,
  questions: reactQuestions
};

// 5. Web & JavaScript Fundamentals (Retain 4 web questions + add 6 new = 10)
// Filter out the 2 react questions from existing interviewWeb so they reside exclusively in interviewReact!
const retainedWebQuestions = existingData.interviewWeb.questions.filter(
  q => !["iw04", "iw05"].includes(q.id)
);

const newWebQuestions = [
  {
    id: "iw05",
    topic: "web",
    text: "Trong mô hình Box Model của CSS, sự khác nhau giữa margin và padding là gì?",
    options: [
      "margin là màu nền; padding là màu viền",
      "padding là khoảng cách đệm bên trong đường viền (border) bao quanh nội dung; margin là khoảng cách bên ngoài đường viền đẩy lùi các phần tử lân cận xung quanh",
      "padding chỉ dùng cho thẻ div; margin dùng cho thẻ span",
      "Cả hai hoàn toàn giống nhau và có thể thay thế cho nhau trong mọi trường hợp"
    ],
    answer: 1,
    explanation: "• CSS Box Model từ trong ra ngoài: Content -> Padding -> Border -> Margin.\n• `Padding`: Làm tăng kích thước vùng nền (background) của phần tử.\n• `Margin`: Tạo khoảng trống giữa phần tử này với phần tử khác (có hiện tượng Margin Collapsing giữa 2 margin dọc kề nhau).",
    textEn: "In the CSS Box Model, what is the difference between margin and padding?",
    optionsEn: [
      "margin controls background color; padding controls border color",
      "padding is inner spacing between the content and the element border; margin is outer spacing outside the border separating the element from surrounding neighbors",
      "padding is only applicable to div tags; margin is only for span tags",
      "Both are completely identical and interchangeable"
    ]
  },
  {
    id: "iw06",
    topic: "web",
    text: "DOM (Document Object Model) trong trình duyệt là gì và sự khác nhau giữa document.getElementById và document.querySelector trong JavaScript là gì?",
    options: [
      "DOM là giao thức kết nối internet; getElementById chỉ dùng cho file XML",
      "DOM là giao diện lập trình biểu diễn tài liệu HTML dưới dạng cây các đối tượng (Node Tree); getElementById tìm kiếm trực tiếp theo ID duy nhất (tốc độ thực thi cực nhanh, trả về Element); querySelector nhận bất kỳ chuỗi CSS selector nào (#id, .class, tag[attr]), linh hoạt hơn nhưng tốc độ chậm hơn một chút",
      "querySelector luôn trả về một mảng danh sách tất cả các phần tử",
      "document.getElementById chỉ chạy được trên điện thoại di động"
    ],
    answer: 1,
    explanation: "• DOM: Cây đối tượng cho phép JavaScript đọc, sửa, thêm hoặc xóa các thẻ HTML và style CSS động.\n• `getElementById('my-btn')`: Tìm theo ID (rất nhanh, trả về 1 element hoặc null).\n• `querySelector('.nav > .active')`: Nhận CSS selector phức tạp, trả về phần tử đầu tiên khớp.\n• `querySelectorAll(...)`: Trả về NodeList chứa tất cả các phần tử khớp.",
    textEn: "What is the DOM in browser environments, and how do document.getElementById and document.querySelector differ?",
    optionsEn: [
      "DOM is a networking protocol; getElementById is strictly for XML files",
      "The DOM (Document Object Model) is an API representing HTML documents as a node tree; getElementById queries directly by unique ID (fastest performance, returns an Element); querySelector accepts any CSS selector string (#id, .class, [attr]), offering higher flexibility with slight overhead",
      "querySelector always returns an array of all matching elements",
      "document.getElementById only functions on mobile browsers"
    ]
  },
  {
    id: "iw07",
    topic: "web",
    text: "Khi xử lý sự kiện submit của thẻ `<form>` bằng JavaScript, tại sao lập trình viên hầu như luôn gọi event.preventDefault()?",
    options: [
      "Để xóa sạch cơ sở dữ liệu trên server",
      "Để ngăn chặn hành vi mặc định của trình duyệt là gửi HTTP request đồng bộ và tải lại toàn bộ trang web (page reload), cho phép JavaScript kiểm tra tính hợp lệ và gửi dữ liệu bất đồng bộ qua AJAX / Fetch API",
      "Để tăng tốc độ kết nối mạng lên gấp đôi",
      "Để mã hóa mật khẩu người dùng thành dạng SHA-256"
    ],
    answer: 1,
    explanation: "• Mặc định khi click submit button trong form, trình duyệt sẽ gửi request và reload lại toàn bộ trang (mất toàn bộ state hiện tại của ứng dụng Single Page App).\n• `event.preventDefault()` chặn hành vi reload mặc định, cho phép xử lý dữ liệu bằng JS (validate, hiển thị loading spinner, gọi `fetch('/api/login')`).",
    textEn: "When handling a `<form>` submit event in JavaScript, why do developers almost universally call event.preventDefault()?",
    optionsEn: [
      "To wipe out the backend server database",
      "To prevent the browser's default behavior of issuing a synchronous HTTP request and reloading the entire web page, enabling client-side validation and asynchronous submission via Fetch/AJAX",
      "To double the network connection bandwidth",
      "To automatically hash user passwords using SHA-256"
    ]
  },
  {
    id: "iw08",
    topic: "web",
    text: "Khái niệm Callback trong JavaScript là gì và vấn đề Callback Hell được giải quyết như thế nào trong JavaScript hiện đại?",
    options: [
      "Callback là cuộc gọi điện thoại thoại; Callback Hell là lỗi mất sóng",
      "Callback là một hàm được truyền dưới dạng đối số vào một hàm khác để được gọi lại thực thi sau khi một tác vụ (thường là bất đồng bộ) hoàn tất; Callback Hell (lồng nhau quá nhiều tầng) gây khó đọc và khó bắt lỗi, được giải quyết bằng Promise và cú pháp async/await",
      "Callback chỉ dùng được trong CSS; giải quyết bằng cách cài Bootstrap",
      "Callback Hell không thể giải quyết được trong ngôn ngữ JavaScript"
    ],
    answer: 1,
    explanation: "• Callback: `setTimeout(() => console.log('Done'), 1000)`.\n• Callback Hell (Pyramid of Doom): Khi các tác vụ bất đồng bộ phụ thuộc nhau (đọc file 1 -> đọc file 2 -> ghi DB) lồng nhau sâu hoắm.\n• Giải pháp: ES6 ra mắt `Promise`, và ES8 (ES2017) ra mắt `async/await` giúp viết mã bất đồng bộ trông tuần tự, sáng sủa và bắt lỗi dễ dàng qua `try/catch`.",
    textEn: "What is a Callback in JavaScript, and how was Callback Hell resolved in modern JavaScript?",
    optionsEn: [
      "A callback is an audio phone call; Callback Hell is signal loss",
      "A callback is a function passed as an argument to another function to be executed after an asynchronous task completes; Callback Hell (excessive nested callbacks) was solved by Promises and async/await syntax",
      "Callbacks are only used in CSS; resolved by installing Bootstrap",
      "Callback Hell is an unfixable limitation of the JavaScript language"
    ]
  },
  {
    id: "iw09",
    topic: "web",
    text: "Định dạng JSON là gì và phân biệt hai phương thức JSON.stringify() và JSON.parse() trong JavaScript?",
    options: [
      "JSON là phần mềm chỉnh sửa ảnh; stringify vẽ ảnh, parse xuất video",
      "JSON (JavaScript Object Notation) là định dạng trao đổi dữ liệu dạng văn bản nhẹ, độc lập với ngôn ngữ; JSON.stringify() chuyển đổi JavaScript Object/Array thành chuỗi văn bản JSON; JSON.parse() phân tích chuỗi văn bản JSON thành JavaScript Object tương ứng",
      "JSON.stringify() dùng để giải mã mật mã; JSON.parse() dùng để mã hóa mật mã",
      "Cả hai hàm đều dùng để xóa bộ nhớ cache của trình duyệt"
    ],
    answer: 1,
    explanation: "• JSON: Cú pháp chuẩn dựa trên object literal của JavaScript, chuẩn giao tiếp số 1 của RESTful API.\n• `JSON.stringify(obj)`: Biến object `{ name: 'An', age: 20 }` -> chuỗi text `'{\"name\":\"An\",\"age\":20}'` để gửi qua HTTP body.\n• `JSON.parse(str)`: Biến chuỗi text JSON nhận được từ server -> JavaScript Object để truy xuất `obj.name`.",
    textEn: "What is JSON format, and how do JSON.stringify() and JSON.parse() differ in JavaScript?",
    optionsEn: [
      "JSON is photo editing software; stringify renders images, parse exports video",
      "JSON (JavaScript Object Notation) is a lightweight language-independent data-interchange format; JSON.stringify() serializes a JavaScript Object/Array into a JSON string; JSON.parse() parses a JSON string into its corresponding JavaScript Object",
      "JSON.stringify() decrypts data; JSON.parse() encrypts data",
      "Both functions clear browser memory cache"
    ]
  },
  {
    id: "iw10",
    topic: "web",
    text: "Node.js là gì và cơ chế xử lý Single-Threaded Event Loop của Node.js giúp nó xử lý hàng ngàn kết nối đồng thời (High Concurrency) như thế nào?",
    options: [
      "Node.js là một hệ điều hành mới thay thế Windows và Linux",
      "Node.js là môi trường runtime chạy mã JavaScript ngoài trình duyệt xây dựng trên V8 Engine; sử dụng cơ chế Non-blocking I/O và Event Loop đơn luồng ủy thác các tác vụ nặng (đọc ghi file, mạng, database) cho hệ điều hành bên dưới (libuv thread pool), cho phép tiếp tục nhận các request mới mà không bị chặn (blocked)",
      "Node.js tạo ra 1 tiến trình riêng biệt cho mỗi kết nối của người dùng",
      "Node.js chỉ chạy được trên các máy chủ có 64 core CPU"
    ],
    answer: 1,
    explanation: "💡 Câu hỏi phỏng vấn hay hỏi về Node.js:\n• Không giống Tomcat/Java truyền thống (mỗi request = 1 luồng riêng - Thread-per-request), Node.js chỉ có 1 Main Thread chạy code JavaScript.\n• Khi gặp I/O (Database query, API call), nó chuyển cho libuv xử lý ngầm và đăng ký callback. Main thread lập tức rảnh tay phục vụ request tiếp theo. Khi I/O xong, callback được đẩy vào Event Loop để thực thi.",
    textEn: "What is Node.js and how does its Single-Threaded Event Loop handle high concurrent traffic?",
    optionsEn: [
      "Node.js is a new operating system designed to replace Windows and Linux",
      "Node.js is a JavaScript runtime built on Chrome's V8 engine; its single-threaded Event Loop utilizes non-blocking I/O by delegating heavy operations (filesystem, network, database) to the underlying system (libuv thread pool), allowing it to handle thousands of concurrent requests without blocking",
      "Node.js spawns an isolated OS process for every individual user connection",
      "Node.js requires server hardware with at least 64 CPU cores"
    ]
  }
];

export const interviewWeb = {
  slug: "interview-web",
  title: "Phỏng Vấn: Web & JavaScript Fundamentals",
  description: "Session vs Cookie, HTTP GET/POST/PUT, JS == vs ===, Box Model margin/padding, Asynchronous & Callback, JSON.",
  icon: "🌐",
  color: "#f59e0b",
  order: 14,
  questions: [...retainedWebQuestions, ...newWebQuestions]
};

// 6. DevOps, Testing, Scrum & Project (Retain 5 + add 4 new = 9)
const newDevOpsQuestions = [
  {
    id: "idv06",
    topic: "devops",
    text: "Trong Unit Test ứng dụng Java/Spring Boot, thư viện Mockito dùng để làm gì và ý nghĩa của các annotation @Mock và @InjectMocks?",
    options: [
      "Mockito dùng để tạo giao diện người dùng tự động",
      "Dùng để tạo các đối tượng giả lập (Mock objects) cô lập tầng đang kiểm thử khỏi các phụ thuộc bên ngoài (như Database Repository, API bên thứ ba); @Mock tạo đối tượng giả lập; @InjectMocks tự động tiêm các mock này vào đối tượng cần kiểm thử (thường là Service)",
      "Mockito dùng để mã hóa mật khẩu người dùng trước khi lưu",
      "Mockito bắt buộc phải chạy trên máy chủ thật có kết nối Database"
    ],
    answer: 1,
    explanation: "💡 Nguyên lý Unit Test cốt lõi: Kiểm tra 1 đơn vị code (1 method của Service) một cách độc lập.\nVí dụ khi test `UserService.createUser()`: Ta không muốn gọi Database thật. Ta dùng `@Mock UserRepository` và cấu hình hành vi giả: `when(userRepository.save(any())).thenReturn(fakeUser)`. Sau đó `@InjectMocks UserService userService` để test logic tính toán của Service.",
    textEn: "In Java/Spring Boot Unit Testing, what is Mockito used for and what do @Mock and @InjectMocks do?",
    optionsEn: [
      "Mockito automatically generates user interfaces",
      "Mockito creates simulated mock objects to isolate the class under test from external dependencies (such as Repositories or external APIs); @Mock creates a simulated dependency; @InjectMocks creates the target instance and injects the created mocks into it",
      "Mockito encrypts user credentials before persisting to disk",
      "Mockito strictly requires a live database connection"
    ]
  },
  {
    id: "idv07",
    topic: "devops",
    text: "So sánh Kiểm thử tự động (Automation Testing) và Kiểm thử thủ công (Manual Testing)? Khi nào nên áp dụng loại nào?",
    options: [
      "Manual Test đã lỗi thời và không còn công ty nào sử dụng",
      "Manual Testing thực hiện bằng thao tác tay của con người, rất linh hoạt cho kiểm thử giao diện/trải nghiệm người dùng (UX) và tính năng mới thay đổi liên tục; Automation Testing dùng kịch bản mã hóa (Selenium, JUnit, Playwright) cho phép chạy lặp lại hàng nghìn lần nhanh chóng, cực kỳ phù hợp cho Kiểm thử hồi quy (Regression Testing) và tích hợp vào CI/CD Pipeline",
      "Automation Testing chỉ dùng để kiểm tra tốc độ đường truyền mạng",
      "Manual Testing chạy nhanh hơn Automation Testing 10 lần"
    ],
    answer: 1,
    explanation: "• `Manual Testing`: Tốt cho giai đoạn đầu của dự án, kiểm thử khám phá (Exploratory Testing), đánh giá cảm nhận trực quan của con người.\n• `Automation Testing`: Chi phí ban đầu cao để viết kịch bản, nhưng khi hệ thống đã ổn định thì chạy kiểm thử hồi quy (Regression Test) mỗi khi push code lên Git cực kỳ rẻ và phát hiện bug ngay lập tức.",
    textEn: "Compare Automation Testing and Manual Testing. When should each approach be utilized?",
    optionsEn: [
      "Manual testing is obsolete and no longer used in professional companies",
      "Manual Testing relies on human interaction, ideal for exploratory UX testing and rapidly changing new features; Automation Testing uses scripted tools (Selenium, JUnit, Playwright) to run thousands of test cases reliably, excelling at Regression Testing within CI/CD pipelines",
      "Automation Testing only tests network transmission speed",
      "Manual Testing is 10 times faster than Automation Testing"
    ]
  },
  {
    id: "idv08",
    topic: "devops",
    text: "Sự khác biệt cơ bản giữa mô hình Thác nước (Waterfall) và mô hình Linh hoạt (Agile / Scrum) trong phát triển phần mềm là gì?",
    options: [
      "Waterfall chỉ dùng cho dự án của học sinh; Scrum dùng cho ngân hàng",
      "Waterfall thực hiện tuần tự qua các giai đoạn nghiêm ngặt (Phân tích -> Thiết kế -> Lập trình -> Kiểm thử), yêu cầu chốt cứng từ đầu và rất khó thay đổi; Agile/Scrum chia nhỏ dự án thành các chu kỳ ngắn (Sprint 1-4 tuần), giao sản phẩm tăng dần (Incremental) và thích ứng nhanh với các thay đổi yêu cầu",
      "Scrum không cần kiểm thử phần mềm",
      "Cả hai mô hình có tiến trình và cách quản lý giống hệt nhau"
    ],
    answer: 1,
    explanation: "• Waterfall: Khách hàng chỉ thấy sản phẩm ở cuối dự án (rủi ro cao nếu yêu cầu ban đầu bị hiểu sai).\n• Agile/Scrum: Cứ sau mỗi Sprint (2 tuần), nhóm phát triển demo một phần phần mềm chạy được (working software) cho khách hàng xem và góp ý, giúp giảm thiểu rủi ro trễ hạn và đáp ứng thị trường nhanh chóng.",
    textEn: "What is the primary difference between the Waterfall model and Agile/Scrum in software development?",
    optionsEn: [
      "Waterfall is only for student projects; Scrum is for banking",
      "Waterfall executes sequentially through rigid phases (Analysis -> Design -> Implementation -> Testing) with fixed upfront requirements; Agile/Scrum divides work into short iterative Sprints (1-4 weeks), delivering incremental working software adaptable to evolving requirements",
      "Scrum does not require software testing",
      "Both models follow identical processes and management cadences"
    ]
  },
  {
    id: "idv09",
    topic: "devops",
    text: "Khi thiết kế tính năng Tìm kiếm (Search) trong hệ thống phần mềm, luồng xử lý chuẩn ở phía Backend nên được thiết kế như thế nào để tối ưu hiệu năng và tránh quá tải Database?",
    options: [
      "Cho phép client gọi API tìm kiếm sau mỗi ký tự gõ phím mà không cần throttle, query thẳng SELECT * FROM table WHERE column LIKE '%kw%'",
      "Phía Client áp dụng Debounce (chờ 300-500ms sau khi ngừng gõ); phía Backend kiểm tra Cache (Redis/Memcached) trước; nếu cache miss thì truy vấn Database có đánh chỉ mục (Index) hoặc sử dụng Search Engine chuyên dụng (Elasticsearch), kết hợp phân trang (LIMIT/OFFSET) và chỉ trả về các trường dữ liệu cần thiết",
      "Tắt hoàn toàn tính năng tìm kiếm trên server",
      "Gửi toàn bộ database về cho trình duyệt của client tự tìm"
    ],
    answer: 1,
    explanation: "💡 Trả lời chuẩn kiến trúc hệ thống (System Architecture):\n1. `Client Debounce`: Tránh spam 10 request khi gõ 10 chữ cái.\n2. `Cache Layer`: Cache kết quả của các từ khóa phổ biến (top searches) trong Redis.\n3. `Full-Text Search Engine`: Khi dữ liệu lớn, câu `LIKE '%abc%'` sẽ Full Table Scan gây treo database. Cần dùng Elasticsearch/OpenSearch hoặc MySQL Fulltext Index.\n4. `Pagination`: Luôn giới hạn số lượng bản ghi trả về (ví dụ page=1&size=20).",
    textEn: "When designing a Search feature in software architecture, how should the backend flow be structured to optimize performance and prevent database overload?",
    optionsEn: [
      "Allow clients to invoke the search API on every keystroke without throttling and execute unindexed SELECT * LIKE '%kw%' queries",
      "Client applies Debouncing (300-500ms delay); Backend checks in-memory cache (Redis) first; on cache miss, queries indexed database columns or dedicated search engines (Elasticsearch) with pagination (LIMIT/OFFSET) returning only required projection fields",
      "Disable the search feature completely on the server",
      "Stream the entire database dump to the browser for client-side evaluation"
    ]
  }
];

const interviewDevOps = {
  ...existingData.interviewDevOps,
  title: "Phỏng Vấn: Git, Testing, Scrum & Dự Án",
  description: "Git conflict, Unit Test & Mockito, Automation vs Manual, Scrum/Agile SDLC, Test Cases, Môi trường chạy.",
  questions: [...existingData.interviewDevOps.questions, ...newDevOpsQuestions]
};

// 7. AI, LLM & Tooling (Retain 4 + add 2 new = 6)
const newAiQuestions = [
  {
    id: "iai05",
    topic: "ai",
    text: "Trong việc phát triển phần mềm với sự hỗ trợ của AI (như Antigravity, Cursor, Claude Code), các file cấu hình ngữ cảnh dự án như claude.md hay AGENTS.md đóng vai trò gì?",
    options: [
      "Là file chứa mã độc để tấn công máy chủ",
      "Cung cấp ngữ cảnh hệ thống (System Prompt / Context), quy ước mã nguồn (Coding standards), kiến trúc công nghệ, các quy tắc bảo mật và hướng dẫn quy trình đặc thù của dự án để AI Assistant hiểu sâu dự án và sinh code tuân thủ 100% chuẩn mực của đội ngũ",
      "Là file chứa giấy phép bản quyền phần mềm để nộp cho cơ quan thuế",
      "Chỉ dùng để đổi màu giao diện của IDE"
    ],
    answer: 1,
    explanation: "💡 Xu hướng phỏng vấn AI Tooling mới nhất:\nFile `claude.md` / `AGENTS.md` hoạt động như một cuốn 'Sổ tay hướng dẫn dự án' dành riêng cho AI Agent. Nó chứa: Tech stack, kiến trúc thư mục, quy tắc đặt tên, cách chạy lệnh test/build, và các lỗi thường gặp, giúp AI không sinh ra code lạc đề hoặc dùng sai thư viện.",
    textEn: "In AI-assisted software engineering (tools like Antigravity, Cursor, Claude Code), what role do context configuration files like claude.md or AGENTS.md serve?",
    optionsEn: [
      "They are malicious scripts used to attack servers",
      "They provide persistent System Prompts, project-specific coding standards, architecture constraints, and workflow guidelines so that the AI Assistant produces code adhering strictly to the team's conventions",
      "They store software copyright certificates for taxation audits",
      "They only modify the visual color themes of the IDE"
    ]
  },
  {
    id: "iai06",
    topic: "ai",
    text: "Khi tích hợp mô hình ngôn ngữ lớn (LLM API như OpenAI, Gemini) vào ứng dụng Backend, tại sao phản hồi thường được truyền về Client dưới dạng Streaming (Server-Sent Events - SSE)?",
    options: [
      "Vì Streaming giúp làm giảm dung lượng của cơ sở dữ liệu",
      "Vì LLM sinh từ (tokens) tuần tự theo thời gian; cơ chế Streaming (SSE) cho phép đẩy từng token về client ngay khi vừa được tạo ra, giảm thời gian phản hồi đầu tiên (Time to First Token - TTFT) từ hàng chục giây xuống dưới 1 giây, mang lại trải nghiệm tương tác trực quan tức thì cho người dùng",
      "Streaming chỉ dùng được khi xem phim, không áp dụng cho văn bản",
      "Bắt buộc phải dùng WebSocket hai chiều, SSE không truyền được text"
    ],
    answer: 1,
    explanation: "• LLM hoạt động theo cơ chế sinh từ tuần tự (Autoregressive generation). Nếu đợi model sinh xong toàn bộ bài viết 1000 từ mới trả về response, người dùng phải nhìn màn hình quay quay 15-30 giây.\n• Giao thức Server-Sent Events (SSE) với header `Content-Type: text/event-stream` cho phép Backend đẩy từng chữ (chunk) về trình duyệt ngay lập tức giống như chữ đang được gõ trực tiếp.",
    textEn: "When integrating LLM APIs (OpenAI, Gemini) into backend services, why are responses streamed to clients using Server-Sent Events (SSE)?",
    optionsEn: [
      "Because streaming reduces database storage capacity",
      "Because LLMs generate tokens sequentially; Streaming (SSE) pushes tokens to the client as they are generated, drastically cutting Time to First Token (TTFT) from dozens of seconds down to under 1 second and providing an immediate responsive user experience",
      "Streaming is exclusively used for video content, not text",
      "Bi-directional WebSockets are strictly required; SSE cannot transmit text"
    ]
  }
];

const interviewAi = {
  ...existingData.interviewAi,
  title: "Phỏng Vấn: AI, LLM & Prompt Engineering",
  description: "LLM, System Prompt & Custom Skills (AGENTS.md), AI Agent vs Chatbot, Đánh giá code AI, Tích hợp LLM API Backend.",
  questions: [...existingData.interviewAi.questions, ...newAiQuestions]
};

// 8. Aggregate All Interview Questions (interviewAll)
const allQuestions = [
  ...interviewSql.questions,
  ...interviewJavaCore.questions,
  ...interviewSpring.questions,
  ...interviewReact.questions,
  ...interviewWeb.questions,
  ...interviewDevOps.questions,
  ...interviewAi.questions,
];

const interviewAll = {
  slug: "interview-all",
  title: "Tổng Hợp Câu Hỏi Phỏng Vấn 1-1",
  description: "Trọn bộ câu hỏi phỏng vấn thực tế: SQL & JDBC, Java Core & OOP, Spring Boot & JPA, React & Next.js, Web, Git & Testing, AI Tooling.",
  icon: "🎯",
  color: "#ef4444",
  order: 9,
  questions: allQuestions
};

const ALL_INTERVIEW_QUIZZES = [
  interviewAll,
  interviewSql,
  interviewJavaCore,
  interviewSpring,
  interviewReact,
  interviewWeb,
  interviewDevOps,
  interviewAi,
];

console.log("-----------------------------------------");
console.log("SUMMARY OF NEW INTERVIEW QUIZZES:");
ALL_INTERVIEW_QUIZZES.forEach(q => {
  console.log(`- [${q.slug}] ${q.title}: ${q.questions.length} questions`);
});
console.log("Total aggregated interview questions:", allQuestions.length);
console.log("-----------------------------------------");

// Generate output file content
const output = `// Bộ câu hỏi ôn tập phỏng vấn 1-1 phân loại theo từng dạng chuyên đề (Có song ngữ EN & VI):
export const interviewSql = ${JSON.stringify(interviewSql, null, 2)};
export const interviewJavaCore = ${JSON.stringify(interviewJavaCore, null, 2)};
export const interviewSpring = ${JSON.stringify(interviewSpring, null, 2)};
export const interviewReact = ${JSON.stringify(interviewReact, null, 2)};
export const interviewWeb = ${JSON.stringify(interviewWeb, null, 2)};
export const interviewDevOps = ${JSON.stringify(interviewDevOps, null, 2)};
export const interviewAi = ${JSON.stringify(interviewAi, null, 2)};
export const interviewAll = ${JSON.stringify(interviewAll, null, 2)};

export const ALL_INTERVIEW_QUIZZES = [
  interviewAll,
  interviewSql,
  interviewJavaCore,
  interviewSpring,
  interviewReact,
  interviewWeb,
  interviewDevOps,
  interviewAi,
];
`;

const targetPath = path.resolve(__dirname, "../lib/interviewData.js");
fs.writeFileSync(targetPath, output, "utf8");
console.log("Successfully written updated interviewData.js to:", targetPath);
