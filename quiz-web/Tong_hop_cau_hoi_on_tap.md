# Tổng hợp câu hỏi phỏng vấn theo nhóm

&nbsp;

---

## 1\. Frontend (HTML / CSS / JS / Bootstrap)

**HTML/CSS**

- Các cách tạo nút bấm trong HTML  
- Phân biệt `margin` vs `padding`  
- Cách select phần tử HTML thông qua `id`  
- `DOM` là gì? Vai trò của DOM trong việc thao tác cấu trúc/nội dung trang HTML?  
- `DOM` là gì? Khi React cập nhật thay đổi thì `Virtual DOM` với `DOM` cái nào nhanh hơn?  
- `Virtual DOM` là gì? Hoạt động như thế nào trong React? Viết thế nào?  
- So sánh `DOM` vs `Virtual DOM` (cách hoạt động, hiệu năng). `Virtual DOM` có luôn nhanh hơn `DOM` thật không?

**JavaScript**

- Submit form bằng cách dùng lệnh JS  
- Phân biệt `==` vs `===`  
- Regular Expression (regex) trong JS  
- `JSON` là gì?  
- `Callback` là gì? Cho ví dụ luồng thực tế sử dụng Callback  
- Bất đồng bộ (Asynchronous) là gì? Phân biệt `Timestamp` và cơ chế bất đồng bộ  
- `JSTL` là gì?

**React**

- Các hook trong ReactJS  
- Phân biệt `state` và `props`  
- Phân biệt `useEffect` và `useState`  
- React có vai trò gì trong frontend?

**Vue.js**

- Phân biệt `ref` vs `props` trong VueJS  
- So sánh `v-if` vs `v-show`

**Next.js**

- Next.js có những loại Rendering nào? Giải thích cơ chế hoạt động của từng loại  
- Directive `"use client"` dùng để làm gì? Khi nào cần dùng?  
- Nếu tối ưu SEO thì nên dùng loại Rendering nào? Vì sao?

---

## 2\. Java (Core Java \+ Collections \+ Exception)

**OOP / Ngôn ngữ**

- Các đặc tính của OOP. Hiểu như thế nào về OOP?  
- Tính đa hình là gì? Cho ví dụ thực tế  
- 4 Access Modifier và khái niệm  
- Từ khóa `final` (áp dụng cho biến, method, class)  
- Từ khóa `static`  
- `Static Method` có override được không?  
- `super()` là gì? Khi nào cần gọi và ràng buộc vị trí trong constructor  
- Phân biệt `Primitive Type` vs `Reference Type`  
- `Wrapper Class` là gì?  
- Tham trị và tham chiếu trong Java là gì? Cho ví dụ  
- Ép kiểu (casting) trong Java

**String**

- Các cách khai báo chuỗi trong Java  
- `String Builder` vs `String Buffer`  
- Xử lý chuỗi (String handling)  
- `String Pool` là gì?  
- Phân biệt `==` và `equals()`. So sánh 2 String bằng `==` có thể cho kết quả sai không, vì sao?

**Collections**

- `List` vs `Map`  
- `List` vs `Set`  
- `Array` vs `ArrayList` — khác biệt? Cái nào nhanh hơn?  
- `ArrayList` kết hợp vòng `for` và `remove` sẽ bị hiện tượng gì?  
- `HashSet` là gì? Cơ chế hoạt động? Dùng khi nào?  
- Nếu muốn thêm object của class tự định nghĩa vào `HashSet` thì cần làm gì?  
- Nếu thêm 1 biến vào `HashSet`, sau đó thay đổi giá trị của biến đó thì `contains()` trả về kết quả gì?  
- Phân biệt `Comparator` và `Comparable`

**Exception**

- Exception là gì?  
- Xử lý Exception trong Java như thế nào?  
- Phân biệt Checked Exception và Unchecked Exception (kèm ví dụ cụ thể)  
- `try-catch-finally` là gì?  
- `try-with-resources` — cách dùng? So sánh với `try-catch-finally`  
- Một class muốn dùng được trong `try-with-resources` phải implement interface gì?  
- Trong `try-catch` có đoạn `return 1` và `finally` là `return 2` thì kết quả cuối cùng bằng mấy?  
- Giải thích lệnh `break` và `continue`  
- `error handle` trong Java

**Memory / GC**

- Phân biệt vùng nhớ `Stack` và `Heap`  
- Cho `Integer a = 100, b = 100, c = 200, d = 200` — so sánh `a == b` và `c == d`, giải thích vì sao (Integer Cache)  
- Nếu Garbage Collection (GC) lỡ dọn dẹp luôn đối tượng đang dùng thì sao?  
- Trong trường hợp nào GC không chạy?

**Java version / Stream**

- Dùng Java phiên bản nào?  
- Có sử dụng Stream API không? Dùng như thế nào?  
- Sự khác nhau giữa `map` và `flatmap`  
- Lambda Expression  
- Cách chạy ứng dụng bằng dòng lệnh (CLI)  
- Thường dùng IDE nào?

---

## 3\. Spring (Framework \+ Spring Boot)

**Tổng quan**

- Spring Boot khác gì với Spring?  
- Phân biệt Spring MVC vs Spring Boot  
- Luồng xử lý của một request trong Spring Boot (khi gửi request thì luồng chạy thế nào)

**DI / Bean**

- Dependency Injection (DI) là gì? Có những cách DI nào?  
- Vòng đời của Bean (Bean Lifecycle) trong Spring diễn ra như thế nào (từ khởi tạo đến hủy)?  
- Bean Scope là gì? Phân biệt `singleton` và `prototype`  
- Làm thế nào để khởi tạo và quản lý Bean trong Spring Boot?  
- Phân biệt `@Service`, `@Component`, `@Bean`  
- Phân biệt `@Controller` vs `@Service`

**Controller / REST**

- `@Controller` vs `@RestController` khác nhau thế nào?  
- Trong Spring Boot, nếu dùng `@Controller` thì cần kết hợp annotation nào để trả về JSON thay vì tên View?  
- `Component` trả về kiểu dữ liệu gì? `ResponseEntity` trả về gì?  
- Nếu muốn một `Component` trả về JSON thì cần làm như thế nào?  
- REST API là gì?  
- Setup 1 dự án REST API như thế nào? Có các thành phần nào?

**Validation**

- Spring Boot dùng annotation nào để validate dữ liệu đầu vào (`@NotNull`, `@NotBlank`, `@Size`, `@Email`, `@Min/@Max`, `@Pattern`...)  
- Muốn validate 2 field cùng lúc thì phải làm sao?  
- `@Valid` dùng để làm gì? Khác gì `@Validated`?

**Exception Handling**

- Spring Boot xử lý Exception như thế nào?  
- Có thể tự định nghĩa Custom Exception và Custom Validation không?  
- `@ExceptionHandler` trong Controller và xử lý global bằng `@ControllerAdvice` khác nhau thế nào? Nếu cả hai cùng bắt 1 exception thì cái nào được ưu tiên?

**Security / Config**

- Spring Security là gì?  
- Biết config Security, CORS không?  
- Filter trong Java là gì? (không phải Filter trong Stream API / Filter Chain)

**Database integration**

- Spring Boot dùng gì để kết nối Database?  
- Spring Boot kết nối với Database như thế nào? Trình bày các bước cấu hình kết nối MySQL  
- Cách kết nối với Database trong Service  
- Nếu project có 4–5 JDBC Driver thì làm thế nào để chọn Driver cần dùng?

---

## 4\. ORM Hibernate / JPA

**JPA / Hibernate**

- Khi dùng JPA trong Spring Boot, truy vấn Database như thế nào?  
- `HQL` là gì? Viết HQL như thế nào và dùng annotation nào?  
- `Query Method` là gì? Viết thử một câu Query Method  
- Trong Spring Data JPA, có những cách nào để viết câu truy vấn trong Repository? Kể tên và ví dụ cho từng cách  
- Viết truy vấn tìm sinh viên có điểm trên 5 theo điều kiện: tên, ID, quê quán  
- Cách định nghĩa `Entity` và sử dụng `Repository` trong Spring Boot để thao tác DB  
- Vai trò của `Entity`, `Repository`, `Service` trong Spring Boot  
- Bên dưới, Hibernate giao tiếp với Database như thế nào? (JDBC, `Session`/`EntityManager`, `Persistence Context`)

**Repository**

- `CrudRepository`, `PagingAndSortingRepository`, `JpaRepository` — phân biệt  
- Một interface Repository extends `JpaRepository` nhưng không gắn `@Repository` thì có chạy được không? Tại sao?

---

## 5\. SQL / Database

**SQL cơ bản**

- `INNER JOIN` vs `LEFT JOIN`  
- 4 loại JOIN  
- `GROUP BY`, `HAVING`  
- Phân biệt `WHERE` và `HAVING`  
- `UNION` vs `UNION ALL`  
- `TRUNCATE`, `DELETE`, `DROP`  
- Phân biệt `DELETE` và `TRUNCATE`  
- `CHAR` vs `VARCHAR`  
- Kiểu dữ liệu trong SQL  
- Trình tự thực hiện của câu SQL (thứ tự thực thi các mệnh đề)  
- Composite Key là gì?  
- Performance của câu truy vấn SQL

**Thiết kế / DDL**

- Thiết kế ERD  
- `CREATE VIEW`  
- Có biết viết script SQL không?

**Truy vấn thực hành (bài tập)**

- Lấy top 10 sinh viên có tuổi bé nhất  
- Xóa những hồ sơ ứng viên không đủ tuổi làm việc  
- Thống kê có bao nhiêu SV dưới điểm TB theo quê quán  
- Đếm số lượng SV nữ theo quê quán  
- Tìm các SV chưa đăng ký khóa học nào  
- Tìm 10 SV có điểm cao nhất  
- Update điểm cho các SV nữ tăng lên 1 điểm  
- Truy vấn lồng nhau (subquery)  
- Lấy 100 người vào mới nhất (phân tích \+ viết câu truy vấn)

**JDBC**

- JDBC có bao nhiêu loại `Statement`? (`Statement`, `PreparedStatement`, `CallableStatement`) — mỗi loại dùng khi nào?  
- Ngoài chống SQL Injection, `PreparedStatement` còn ưu điểm gì so với `Statement`?  
- Cơ chế cache `Statement` trong Database/JDBC hoạt động thế nào?

---

## 6\. DSA (Data Structures & Algorithms)

- Có biết về DSA không? Các loại search, sort  
- Tìm số nguyên lớn thứ 2 trong mảng (viết code, giải thích, xử lý trùng nhau / không có phần tử lớn thứ 2\)  
- Tính tổng các số lẻ trong mảng các số nguyên  
- Đếm có bao nhiêu từ trong văn bản  
- Đếm tần suất xuất hiện của từng ký tự trong một chuỗi bằng Java

---

## 7\. Scrum / Agile / SDLC ✳️ (mở rộng từ "Scrum")

- Scrum là gì? Một Sprint trong Scrum gồm những hoạt động nào?  
- Waterfall là gì? Khác Scrum như thế nào?  
- Software Development Life Cycle (SDLC) là gì?  
- Vòng đời phát triển dự án gồm những giai đoạn nào?

---

## 8\. Git

- Quản lý source code với Git bằng cách nào?  
- Cách xử lý khi xảy ra conflict trong Git / cách resolve conflict  
- Biết dùng GitHub, GitLab không?

---

## 9\. Soft Skill

- Giới thiệu bản thân  
- Định hướng nghề nghiệp trong 3–5 năm tới là gì?  
- Nếu công việc khiến em không có thời gian học tiếng Nhật thì em sẽ xử lý thế nào?  
- Quá trình học tiếng Nhật, trình độ hiện tại?  
- Bạn thường dùng IDE nào để phát triển?  
- Dùng Java phiên bản nào?

---

## 10\. Experience / Project

**Kinh nghiệm dự án**

- Mục đích của dự án là gì? Dự án giải quyết vấn đề gì?  
- Em phụ trách những phần nào trong dự án?  
- Em đã làm những công việc gì trong dự án?  
- Với feature em làm thì em thiết kế DB như thế nào?  
- Em đã thiết kế database chưa?

**Thiết kế hệ thống / Kiến trúc**

- Có biết vẽ và mô tả Architecture Design không?  
- Làm thế nào để từ source code hiểu được và vẽ lại ra Diagram?  
- Nếu làm chức năng tìm kiếm, luồng xử lý ở phía backend sẽ chạy như thế nào?  
- Giả sử xây dựng trang Login, sau khi đăng nhập thành công hệ thống hiển thị danh sách dữ liệu — thiết kế và triển khai như thế nào?  
- Có 2 server riêng biệt, trong service xử lý như thế nào để kết nối với DB (API Composition)?

**DevOps / Deploy**

- `prod.env` là gì? Dùng để làm gì?  
- Các môi trường chạy dự án thường gồm những gì?  
- Đã từng deploy dự án chưa? Deploy dự án lên server như thế nào?

**Testing (kinh nghiệm)**

- Em kiểm thử dự án như thế nào?  
- Đã từng thực hiện những loại test nào? Có dùng automation test không?  
- Biết unit test không?

---

### 11\. Testing

- Unit Test là gì? Đã thực hiện Unit Test như thế nào?  
- Mockito là gì? Dùng để giả lập dependency khi test Service (ví dụ JUnit \+ Mockito)  
- Automation Testing là gì? Các loại kiểm thử tự động? Công cụ thường dùng \+ ví dụ  
- Manual Testing là gì? Khác Automation Testing thế nào? Khi nào dùng loại nào?  
- Cho ví dụ luồng test đi qua các tầng của hệ thống  
- Nếu test trang Login hoặc test tìm kiếm địa chỉ nhà thì sẽ test những trường hợp nào?

### 12\. Web Fundamentals (HTTP / Session / REST)

- `Session` vs `Cookie`  
- `GET` vs `POST`  
- Phân biệt `GET`, `POST`, `PUT`  
- Việc validation phía Server hay Client tốt hơn?  
- Request đến 1 endpoint API như thế nào?  
- Flow xử lý trong mô hình MVC  
- `MVC` là gì?  
- `REST API` là gì?  
- `JSON` là gì?

### 13\. Node.js / Backend JS

- Node.js là gì?  
- Luồng xử lý của Node.js như thế nào?  
- `npm` là gì? Dùng để làm gì?  
- `Timestamp` trong Node.js là gì?

### 14\. AI / AI Tooling (LLM Integration)

**Kiến thức LLM**

- LLM là gì? Ứng dụng của LLM trong dự án của em?  
- Cách cấu hình và tích hợp LLM vào ứng dụng?  
- Cách gọi API của AI/LLM từ Backend mà em đã dùng?

**Sử dụng AI trong công việc**

- Làm thế nào để kiểm tra và đánh giá code AI?  
- Khi code bằng AI, bạn sử dụng model hoặc agent như thế nào? Viết prompt ra sao?  
- Có biết `claude.md` không? Khi cài skill cho AI rồi thì sử dụng nó thế nào?  
- Cách sử dụng AI để implement 1 chức năng  
- Có biết AI sẽ làm ra khoảng bao nhiêu file không?  
- Nếu có AI manager, làm thế nào để tạo ra một task hoàn thiện?  
- Cách bạn điều phối và quản lý AI để nó thực hiện từng vai trò trong dự án?

### 15\. JDBC (nếu muốn tách riêng khỏi SQL)

- Các loại `Statement` trong JDBC (`Statement`, `PreparedStatement`, `CallableStatement`)  
- `PreparedStatement` ưu điểm gì so với `Statement` (ngoài chống SQL Injection)  
- Cơ chế cache Statement  
- Cấu hình nhiều JDBC Driver — chọn Driver nào?

---

## 📊 Ghi chú về độ phủ & tần suất

- **Câu hỏi lặp lại nhiều nhất** (nên ôn kỹ): `INNER JOIN vs LEFT JOIN`, `GROUP BY / HAVING`, `Session vs Cookie`, `GET vs POST`, `submit form bằng JS`, `các đặc tính OOP`, `try-with-resources`, `== vs ===`, vòng đời Bean, luồng request Spring Boot.  
- **Nhóm câu hỏi "bài tập code"**: chủ yếu nằm ở Java Core (mảng, chuỗi, Collection), SQL (truy vấn thực hành) và DSA — có thể luyện thêm dạng này.  
- **Nhóm câu hỏi mới nổi**: AI/LLM & AI Tooling xuất hiện dày ở các buổi gần đây — nên chuẩn bị ví dụ thực tế (dùng AI trong dự án, prompt, đánh giá code AI).  
- **Nhóm câu hỏi "kinh nghiệm"**: thường gắn với CV, yêu cầu kể lại feature cụ thể \+ thiết kế DB cho feature đó → nên chuẩn bị 1–2 câu chuyện STAR.