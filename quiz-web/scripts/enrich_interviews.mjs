import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDb } from "../lib/db.js";
import {
  interviewSql,
  interviewJavaCore,
  interviewSpring,
  interviewWeb,
  interviewDevOps,
  interviewAi,
  interviewAll,
  ALL_INTERVIEW_QUIZZES,
} from "../lib/interviewData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// English translation dictionary by question id
const TRANSLATIONS = {
  isql01: {
    textEn: "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
    optionsEn: [
      "INNER JOIN returns all rows from both tables; LEFT JOIN only returns matching rows",
      "INNER JOIN only returns rows where the join condition matches in both tables; LEFT JOIN returns all rows from the left table and matched rows from the right table (with NULL for non-matches)",
      "LEFT JOIN requires a Foreign Key, while INNER JOIN does not",
      "Both produce the same result, differing only in execution speed",
    ],
  },
  isql02: {
    textEn: "What is the difference between WHERE and HAVING clauses in an SQL query?",
    optionsEn: [
      "WHERE filters groups after GROUP BY; HAVING filters individual rows before grouping",
      "WHERE filters individual rows before grouping (GROUP BY); HAVING filters groups after grouping and can use aggregate functions (such as COUNT, SUM, AVG)",
      "HAVING can be used independently without GROUP BY and runs faster than WHERE",
      "WHERE applies only to numeric types, HAVING applies to string types",
    ],
  },
  isql03: {
    textEn: "Given table sinhvien (id, ho_ten, ngay_sinh). Which query retrieves the 10 youngest students?",
    optionsEn: [
      "SELECT * FROM sinhvien ORDER BY ngay_sinh ASC LIMIT 10;",
      "SELECT * FROM sinhvien ORDER BY ngay_sinh DESC LIMIT 10;",
      "SELECT TOP 10 * FROM sinhvien WHERE ngay_sinh = MIN(ngay_sinh);",
      "SELECT * FROM sinhvien GROUP BY ngay_sinh HAVING COUNT(*) <= 10;",
    ],
  },
  isql04: {
    textEn: "Which statement is used to delete candidate records under 18 years old from table ung_vien (id, ho_ten, tuoi)?",
    optionsEn: [
      "DROP FROM ung_vien WHERE tuoi < 18;",
      "TRUNCATE TABLE ung_vien WHERE tuoi < 18;",
      "DELETE FROM ung_vien WHERE tuoi < 18;",
      "REMOVE ung_vien WHERE tuoi < 18;",
    ],
  },
  isql05: {
    textEn: "What is the difference between CHAR and VARCHAR data types in a relational database?",
    optionsEn: [
      "CHAR is fixed-length, padding with spaces if shorter; VARCHAR is variable-length, consuming only actual string bytes + length prefix bytes",
      "CHAR supports Unicode Vietnamese, VARCHAR only supports ASCII characters",
      "VARCHAR searches faster than CHAR in all cases because it uses less disk space",
      "CHAR holds up to 255 characters, VARCHAR holds unlimited characters",
    ],
  },
  isql06: {
    textEn: "What is the standard logical execution order of an SQL query statement?",
    optionsEn: [
      "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
      "FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT",
      "FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY",
      "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> LIMIT",
    ],
  },
  isql07: {
    textEn: "Given table sinhvien (id, ho_ten, diem, que_quan). Which query counts the number of students with below-average scores (diem < 5) grouped by hometown?",
    optionsEn: [
      "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING diem < 5;",
      "SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;",
      "SELECT que_quan, SUM(diem) FROM sinhvien WHERE diem < 5;",
      "SELECT que_quan, COUNT(diem < 5) FROM sinhvien GROUP BY que_quan;",
    ],
  },
  isql08: {
    textEn: "How do you find the list of students who have NOT registered for any courses (tables sinhvien and dang_ky)?",
    optionsEn: [
      "SELECT sv.* FROM sinhvien sv INNER JOIN dang_ky dk ON sv.id = dk.sinhvien_id;",
      "SELECT sv.* FROM sinhvien sv LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE dk.sinhvien_id IS NULL;",
      "SELECT sv.* FROM sinhvien sv RIGHT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE sv.id IS NULL;",
      "SELECT sv.* FROM sinhvien sv WHERE sv.id = (SELECT sinhvien_id FROM dang_ky);",
    ],
  },
  isql09: {
    textEn: "What is the difference between UNION and UNION ALL operators in SQL?",
    optionsEn: [
      "UNION merges results and eliminates duplicate rows (DISTINCT); UNION ALL retains all rows including duplicates, thus executing faster than UNION",
      "UNION ALL can only be used when both tables share identical column names; UNION does not require this",
      "UNION runs faster than UNION ALL because it returns less data",
      "Both eliminate duplicates, differing only in sort order",
    ],
  },
  isql10: {
    textEn: "Compare the 3 data deletion commands in SQL: DELETE, TRUNCATE, and DROP?",
    optionsEn: [
      "DELETE is DML (rollbackable, supports WHERE, fires Triggers, slower); TRUNCATE is DDL (clears all data, resets auto_increment, no WHERE, does not fire row Triggers, very fast); DROP is DDL (removes both data and table structure)",
      "All 3 commands can be rolled back in any database",
      "TRUNCATE is DML, while DELETE and DROP are DDL",
      "DELETE and TRUNCATE only mark records as hidden; only DROP actually deletes data on disk",
    ],
  },
  isql11: {
    textEn: "Given table sinhvien (id, ho_ten, gioi_tinh, diem). Which query retrieves students with higher scores than the average score of all students?",
    optionsEn: [
      "SELECT * FROM sinhvien WHERE diem > AVG(diem);",
      "SELECT * FROM sinhvien WHERE diem > (SELECT AVG(diem) FROM sinhvien);",
      "SELECT * FROM sinhvien HAVING diem > AVG(diem);",
      "SELECT * FROM sinhvien GROUP BY id HAVING diem > AVG(diem);",
    ],
  },
  isql12: {
    textEn: "Given table sinhvien (id, ho_ten, gioi_tinh, que_quan). Which query counts the number of male and female students in each hometown?",
    optionsEn: [
      "SELECT que_quan, gioi_tinh, COUNT(*) FROM sinhvien GROUP BY que_quan, gioi_tinh;",
      "SELECT que_quan, COUNT(gioi_tinh) FROM sinhvien GROUP BY que_quan;",
      "SELECT que_quan, gioi_tinh, SUM(*) FROM sinhvien GROUP BY que_quan;",
      "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY gioi_tinh;",
    ],
  },
  isql13: {
    textEn: "What is a Composite Primary Key in a relational database?",
    optionsEn: [
      "A primary key composed of two or more columns combined together to uniquely identify a record in a table",
      "A primary key automatically auto-incremented by the database",
      "A table that contains two distinct independent primary keys",
      "A foreign key that references multiple parent tables simultaneously",
    ],
  },
  isql14: {
    textEn: "Which query retrieves the 100 most recently registered users (sorted by registration timestamp in descending order)?",
    optionsEn: [
      "SELECT * FROM users ORDER BY created_at ASC LIMIT 100;",
      "SELECT * FROM users ORDER BY created_at DESC LIMIT 100;",
      "SELECT TOP 100 * FROM users WHERE created_at = MAX(created_at);",
      "SELECT * FROM users GROUP BY created_at LIMIT 100;",
    ],
  },
  isql15: {
    textEn: "Regarding Database Indexing & Performance, which statement is ACCURATE?",
    optionsEn: [
      "Creating an Index significantly speeds up SELECT queries, but slows down INSERT, UPDATE, DELETE operations and consumes extra disk/RAM space",
      "Creating Indexes on every column in a table is always a best practice",
      "Indexes only accelerate text queries and have no effect on numbers or dates",
      "Using `SELECT *` has no negative impact on database indexes or cache",
    ],
  },
  isql16: {
    textEn: "What is a View in an SQL database management system and what is its primary purpose?",
    optionsEn: [
      "A View is a virtual table based on the result set of an SQL query; it does not store raw data itself, helping encapsulate query logic, improve security, and simplify complex queries",
      "A View is a temporary physical table stored permanently on hard drive for backup purposes",
      "A View is a function used to validate data input before INSERT",
      "A View automatically duplicates the entire database to a secondary server",
    ],
  },

  // Java Core
  ijc01: {
    textEn: "Given the following Java snippet:\nInteger a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));\nWhat is printed to the console?",
    optionsEn: [
      "true true",
      "true false",
      "false false",
      "false true",
    ],
  },
  ijc02: {
    textEn: "What happens when using a regular for-each loop to remove elements from an ArrayList while iterating over it?",
    optionsEn: [
      "Elements are deleted normally without error",
      "Throws ConcurrentModificationException at runtime",
      "Throws IndexOutOfBoundsException",
      "The program terminates with an infinite loop",
    ],
  },
  ijc03: {
    textEn: "Distinguish between Stack and Heap memory in the Java Virtual Machine (JVM)?",
    optionsEn: [
      "Stack stores all instantiated Objects; Heap stores primitive variables and method call frames",
      "Stack stores primitive variables, method call frames, and Object references (thread-private, auto-cleared upon method exit); Heap stores actual Objects (shared by all threads, managed by Garbage Collector)",
      "Stack and Heap are both managed entirely by the Garbage Collector",
      "Heap memory is always faster and smaller in size than Stack memory",
    ],
  },
  ijc04: {
    textEn: "In Java, given the following method:\npublic static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}\nWhat does test() return when executed?",
    optionsEn: [
      "Returns 1",
      "Returns 2",
      "Compilation error because multiple returns are illegal",
      "Throws an Exception at runtime",
    ],
  },
  ijc05: {
    textEn: "Distinguish between Comparable and Comparator interfaces in Java?",
    optionsEn: [
      "Comparable defines natural ordering inside the class itself via compareTo(o); Comparator defines external custom sorting via compare(o1, o2)",
      "Comparator belongs to java.lang; Comparable belongs to java.util",
      "Comparable can sort by multiple dynamic criteria at runtime; Comparator only supports a single fixed criterion",
      "Both are identical and can be used interchangeably without any difference",
    ],
  },
  ijc06: {
    textEn: "Can a static method in Java be Overridden by a subclass?",
    optionsEn: [
      "Yes, static methods can be overridden with dynamic polymorphism just like instance methods",
      "No. Declaring a method with the same signature in a subclass only hides the parent method (Method Hiding) and is bound at compile-time",
      "Only when the static method is marked protected",
      "Yes, provided the @Override annotation is explicitly attached",
    ],
  },
  ijc07: {
    textEn: "If an object is added to a HashSet, and then the field used to compute its hashCode() is modified, what happens when calling set.contains(obj)?",
    optionsEn: [
      "Always returns true because the object reference in memory has not changed",
      "Likely returns false because the new hashCode points to a different bucket in the hash table, potentially causing a memory leak",
      "Throws an InvalidKeyException",
      "HashSet automatically recomputes and updates the hash table instantly",
    ],
  },
  ijc08: {
    textEn: "What is the difference between Checked Exception and Unchecked Exception in Java?",
    optionsEn: [
      "Checked Exceptions (inherit from Exception but not RuntimeException) are checked at compile time and MUST be handled via try-catch or throws; Unchecked Exceptions (inherit from RuntimeException/Error) occur at runtime and are not required to be caught",
      "Unchecked Exceptions must be declared using the throws keyword, while Checked Exceptions do not",
      "Checked Exceptions can never be caught using a try-catch block",
      "RuntimeException is a Checked Exception",
    ],
  },
  ijc09: {
    textEn: "What is the key difference between map() and flatMap() in Java 8 Stream API?",
    optionsEn: [
      "map() transforms each element into another value (1-to-1); flatMap() transforms each element into a Stream and flattens multiple streams into a single stream (1-to-N flattening)",
      "map() operates on parallel streams; flatMap() only operates on sequential streams",
      "map() filters elements; flatMap() changes the type of elements",
      "There is no difference; flatMap() is merely deprecated syntax for map()",
    ],
  },
  ijc10: {
    textEn: "What requirement must a resource satisfy to be used within Java 7+ Try-with-resources statement?",
    optionsEn: [
      "Must implement the java.lang.AutoCloseable or java.io.Closeable interface",
      "Must implement java.io.Serializable interface",
      "Must declare a static void close() method",
      "Must be instantiated using a Singleton design pattern",
    ],
  },
  ijc11: {
    textEn: "Compare the performance and characteristics among String, StringBuilder, and StringBuffer in Java?",
    optionsEn: [
      "String is immutable (thread-safe, creates new object on concatenation); StringBuilder is mutable (not thread-safe, fastest concatenation); StringBuffer is mutable (thread-safe via synchronized methods, slower than StringBuilder)",
      "StringBuilder is immutable; String and StringBuffer are mutable",
      "StringBuffer runs faster than StringBuilder in single-threaded environments",
      "All three have identical performance and memory overhead",
    ],
  },

  // Spring Boot
  isp01: {
    textEn: "What is the most significant difference between Spring Boot and the traditional Spring Framework?",
    optionsEn: [
      "Spring Boot is a completely new language that replaces Java",
      "Spring Boot provides Auto-configuration, Starter dependencies, and an Embedded Web Server (Tomcat/Jetty), eliminating complex XML configuration",
      "Spring Framework does not support Dependency Injection; only Spring Boot does",
      "Spring Boot can only be used for building microservices, not monolithic web applications",
    ],
  },
  isp02: {
    textEn: "What is the sequence of key phases in a Spring Bean's Lifecycle?",
    optionsEn: [
      "Instantiation -> Populate Properties -> BeanNameAware / BeanFactoryAware -> BeanPostProcessor (Before Init) -> @PostConstruct / init-method -> BeanPostProcessor (After Init) -> Ready for Use -> @PreDestroy / destroy",
      "Destroy -> Instantiation -> PostConstruct -> BeanPostProcessor",
      "Init-method -> Instantiation -> Populate Properties -> Destroy",
      "BeanPostProcessor -> Instantiation -> Destroy",
    ],
  },
  isp03: {
    textEn: "What are the ways to achieve Dependency Injection in Spring Boot, and which is recommended as best practice?",
    optionsEn: [
      "Field Injection (@Autowired on field), Setter Injection, and Constructor Injection. Constructor Injection is the recommended best practice because it enforces immutability (final fields) and simplifies unit testing without mocking Spring container",
      "Field Injection is the recommended best practice because it requires writing the least code",
      "Setter Injection is always the only supported injection mechanism in Spring Boot",
      "Spring Boot does not support Constructor Injection",
    ],
  },
  isp04: {
    textEn: "What is the flow of an incoming HTTP Request in a Spring Boot MVC application?",
    optionsEn: [
      "Client -> DispatcherServlet -> HandlerMapping -> Interceptor/Controller -> Service -> Repository (DB) -> View/ResponseBody (JSON) -> Client",
      "Client -> Controller -> DispatcherServlet -> DB",
      "Client -> Repository -> Service -> Controller",
      "Client -> Interceptor -> Repository -> View",
    ],
  },
  isp05: {
    textEn: "How is Global Exception Handling implemented centrally in a Spring Boot REST API?",
    optionsEn: [
      "Use @ControllerAdvice (or @RestControllerAdvice) combined with @ExceptionHandler methods to catch and format exceptions into uniform response bodies",
      "Wrap every Controller method in a manual try-catch block",
      "Catch errors inside the index.html file",
      "Set server.error.include-stacktrace=always in application.properties",
    ],
  },
  isp06: {
    textEn: "What is a CORS (Cross-Origin Resource Sharing) error and how is it resolved in Spring Boot?",
    optionsEn: [
      "A browser security mechanism blocking requests from a different origin (domain, port, protocol); resolved in Spring Boot using @CrossOrigin on controllers or configuring a WebMvcConfigurer with CorsRegistry",
      "A database connection timeout error; resolved by increasing DB pool size",
      "A syntax error caused by missing semicolons in JavaScript",
      "A hardware error caused by low available server RAM",
    ],
  },

  // Web Frontend
  iw01: {
    textEn: "What is the difference between Session and Cookie storage mechanisms in web applications?",
    optionsEn: [
      "Cookie is stored on the client browser (size limit ~4KB, sent with HTTP headers); Session is stored securely on the web server (stores sensitive user state, identified via a session ID cookie)",
      "Session is stored on client browser; Cookie is stored on database server",
      "Cookies can never expire; Sessions expire immediately on every page reload",
      "Cookies can store up to 50MB of data",
    ],
  },
  iw02: {
    textEn: "Compare HTTP methods: GET, POST, and PUT in RESTful API design?",
    optionsEn: [
      "GET retrieves data (idempotent, parameters in URL query string, cacheable); POST creates new resources (non-idempotent, payload in body); PUT updates/replaces an entire existing resource (idempotent)",
      "GET is used to delete records; POST is used to retrieve records",
      "POST is idempotent; PUT is not idempotent",
      "All three methods have identical behavior and can be swapped arbitrarily",
    ],
  },
  iw03: {
    textEn: "In JavaScript, what is the difference between the equality operator == and strict equality operator ===?",
    optionsEn: [
      "== performs type coercion before comparison; === compares both value and type without conversion (strict equality)",
      "=== converts strings to numbers before comparison",
      "== is only used for numbers, === is used for strings",
      "There is no difference in modern ES6 JavaScript",
    ],
  },
  iw04: {
    textEn: "What is the Virtual DOM in React and how does it optimize UI performance?",
    optionsEn: [
      "A lightweight virtual in-memory copy of the real DOM. When state changes, React updates Virtual DOM, computes differences (Diffing Algorithm / Reconciliation), and updates only the modified nodes in the Real DOM in batches",
      "A separate browser window used to render HTML",
      "A database table used to store React component state",
      "A plugin that completely replaces the browser DOM engine",
    ],
  },
  iw05: {
    textEn: "In React, what is the difference between State and Props?",
    optionsEn: [
      "Props are inputs passed down from parent components (immutable to the receiving component); State is managed internally within a component and can change over time via setState / useState",
      "Props can be modified directly; State is read-only",
      "State can only be used in Functional components, Props only in Class components",
      "There is no difference; Props and State are synonyms in React",
    ],
  },
  iw06: {
    textEn: "When building input forms, why is client-side validation alone insufficient?",
    optionsEn: [
      "Because client-side validation can be easily bypassed (using Postman, curl, or disabling JS); server-side validation is strictly required for data integrity and system security",
      "Client-side validation causes database crashes",
      "Browsers do not support validating text input fields",
      "Server-side validation is only needed when using microservices",
    ],
  },

  // DevOps & Git
  idv01: {
    textEn: "When performing a git merge and encountering a Merge Conflict, what is the standard resolution process?",
    optionsEn: [
      "Identify conflicting files with `git status`, manually resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), stage files with `git add`, and finalize with `git commit`",
      "Delete the local repository and clone from remote again",
      "Force push with `git push -f` to overwrite remote changes",
      "Run `git reset --hard` to abandon all teammates' commits",
    ],
  },
  idv02: {
    textEn: "What is a Unit Test and why is writing Unit Tests critical in professional software projects?",
    optionsEn: [
      "Automated tests that verify individual units of code (such as a single method or class) in isolation (often mocking dependencies), helping catch regressions early, improve design, and enable confident refactoring",
      "Manual tests executed by QA testing engineers before release",
      "Load testing the production server under 10,000 concurrent users",
      "Tests checking the visual appearance of CSS buttons across mobile devices",
    ],
  },
  idv03: {
    textEn: "In the Scrum software development framework, how long does a typical Sprint cycle last?",
    optionsEn: [
      "Typically 1 to 4 weeks (most commonly 2 weeks), ending with a potentially shippable product increment",
      "Exactly 6 months to 1 year",
      "1 single day only",
      "There is no fixed timebox; a sprint ends whenever developers finish writing code",
    ],
  },
  idv04: {
    textEn: "To design comprehensive test cases for a Login feature, what categories must be covered?",
    optionsEn: [
      "Positive cases (valid credentials), Negative cases (wrong password, non-existent username, blank inputs, special characters/SQL injection), and Non-functional cases (rate limiting, password masking, remember me)",
      "Only test with a correct admin username and password",
      "Only test how fast the login button animates",
      "Only test login on a single Chrome browser version",
    ],
  },
  idv05: {
    textEn: "What are the standard software deployment environments in an enterprise project pipeline?",
    optionsEn: [
      "Local (developer machine) -> DEV / SIT (development integration) -> UAT / Staging (user acceptance testing, pre-production mirror) -> PROD (live production environment)",
      "Only Local and PROD",
      "Cloud and Local only",
      "Staging only",
    ],
  },

  // AI & LLM
  iai01: {
    textEn: "What is an LLM (Large Language Model) and how is it typically applied in software engineering?",
    optionsEn: [
      "A deep learning AI model trained on massive text codebases to predict tokens and understand context, applied to code generation, code review, test case generation, debugging, and smart documentation",
      "A relational database optimization tool like MySQL Index",
      "A physical hardware robot that types on mechanical keyboards",
      "An antivirus software scanning computer memory for trojans",
    ],
  },
  iai02: {
    textEn: "To write an effective Prompt for an AI coding assistant, what core framework should be provided?",
    optionsEn: [
      "Role (persona), Context (tech stack, existing architecture), Clear Task (specific goal), Constraints (libraries, forbidden patterns), and Expected Output format (code example, step-by-step diff)",
      "Write a single sentence 'write code for me' without any details",
      "Paste entire gigabytes of source code into prompt without instructions",
      "Only use prompts written in Python language",
    ],
  },
  iai03: {
    textEn: "When using code generated by AI, what principle must developers always maintain?",
    optionsEn: [
      "Review every line of code, verify security vulnerabilities/hallucinations, run automated tests, and ensure full understanding before committing to production",
      "Copy and paste code directly into production without testing since AI never makes errors",
      "Hide AI usage from teammates and commit without checking",
      "Never use AI for any programming tasks whatsoever",
    ],
  },
  iai04: {
    textEn: "How does an AI Agent differ from a simple AI Chatbot in software development?",
    optionsEn: [
      "An AI Agent has agency: it can perceive its environment, formulate multi-step plans, autonomously invoke tools (terminal, file edits, git, browser, APIs), observe outcomes, and self-correct until reaching a defined goal",
      "An AI Agent is merely a chatbot that responds with emojis",
      "An AI Agent only runs on mobile phones",
      "There is no difference; Agent is purely a marketing buzzword",
    ],
  },
};

async function main() {
  console.log("Enriching interviewData.js with English translations...");
  const interviewPath = path.resolve(__dirname, "../lib/interviewData.js");
  let content = fs.readFileSync(interviewPath, "utf8");

  // For each question in interview quizzes, insert textEn and optionsEn
  for (const [id, trans] of Object.entries(TRANSLATIONS)) {
    if (!content.includes(`id: "${id}"`)) {
      console.warn(`Could not find id: "${id}" in interviewData.js`);
      continue;
    }

    // Insert textEn and optionsEn right after text: ...
    const textPattern = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?text:\\s*"[\\s\\S]*?",)`);
    if (!textPattern.test(content)) {
      console.warn(`Could not find text pattern for ${id}`);
      continue;
    }

    if (content.includes(`id: "${id}"`) && content.includes(`textEn:`)) {
      // already has it, skip or replace
      continue;
    }

    // Let's replace the whole question object or append textEn and optionsEn
  }

  // To do this cleanly and safely, let's load all interview quizzes in JS and re-serialize interviewData.js!
  const quizzesToSave = [
    interviewSql,
    interviewJavaCore,
    interviewSpring,
    interviewWeb,
    interviewDevOps,
    interviewAi,
  ];

  for (const qz of quizzesToSave) {
    for (const q of qz.questions) {
      if (TRANSLATIONS[q.id]) {
        q.textEn = TRANSLATIONS[q.id].textEn;
        q.optionsEn = TRANSLATIONS[q.id].optionsEn;
      }
    }
  }

  // interviewAll questions
  interviewAll.questions = [
    ...interviewSql.questions,
    ...interviewJavaCore.questions,
    ...interviewSpring.questions,
    ...interviewWeb.questions,
    ...interviewDevOps.questions,
    ...interviewAi.questions,
  ];

  const newFileContent = `// Bộ câu hỏi ôn tập phỏng vấn 1-1 phân loại theo từng dạng chuyên đề (Có song ngữ EN & VI):
export const interviewSql = ${JSON.stringify(interviewSql, null, 2)};
export const interviewJavaCore = ${JSON.stringify(interviewJavaCore, null, 2)};
export const interviewSpring = ${JSON.stringify(interviewSpring, null, 2)};
export const interviewWeb = ${JSON.stringify(interviewWeb, null, 2)};
export const interviewDevOps = ${JSON.stringify(interviewDevOps, null, 2)};
export const interviewAi = ${JSON.stringify(interviewAi, null, 2)};
export const interviewAll = ${JSON.stringify(interviewAll, null, 2)};

export const ALL_INTERVIEW_QUIZZES = [
  interviewAll,
  interviewSql,
  interviewJavaCore,
  interviewSpring,
  interviewWeb,
  interviewDevOps,
  interviewAi,
];
`;

  fs.writeFileSync(interviewPath, newFileContent, "utf8");
  console.log("Successfully updated interviewData.js with English translations!");

  // Now sync directly to MongoDB Atlas
  console.log("Syncing interview quizzes to MongoDB Atlas...");
  const db = await getDb();
  const col = db.collection("quizzes");
  const now = new Date();

  for (const q of [
    interviewSql,
    interviewJavaCore,
    interviewSpring,
    interviewWeb,
    interviewDevOps,
    interviewAi,
    interviewAll,
  ]) {
    const res = await col.updateOne(
      { slug: q.slug },
      {
        $set: {
          title: q.title,
          description: q.description,
          color: q.color,
          icon: q.icon,
          order: q.order,
          isAiGenerated: false,
          questions: q.questions,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    console.log(`Updated ${q.slug}: matched=${res.matchedCount}, modified=${res.modifiedCount}, upserted=${res.upsertedCount}`);
  }

  console.log("All interview quizzes successfully synced with English translations to MongoDB Atlas!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error in enrich_interviews:", err);
  process.exit(1);
});
