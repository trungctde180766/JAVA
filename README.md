# 🎓 JAVA QUIZ MASTER & INTERVIEW PRO - NỀN TẢNG ÔN THI & PHỎNG VẤN 1-1

Hệ thống ôn luyện thi trắc nghiệm Java và **bộ câu hỏi ôn tập phỏng vấn 1-1 toàn diện**, giải thích chi tiết bằng tiếng Việt, tích hợp trình biên dịch/highlight code cú pháp, lưu vết tiến độ học tập trên **MongoDB Atlas** và quy trình **CI/CD tự động**.

---

## 🚀 Tính năng nổi bật

### 1. 🎯 Bộ Câu Hỏi Ôn Tập Phỏng Vấn 1-1 (Theo Từng Dạng Chuyên Sâu)
Hệ thống câu hỏi phỏng vấn thực chiến được phân loại rõ ràng theo từng mảng kỹ năng:
- **🗄️ SQL & Cơ Sở Dữ Liệu (`interview-sql`)**: Inner Join vs Left Join, Group By & Having, Lọc Top sinh viên tuổi bé nhất/điểm cao nhất, DML vs DDL (Delete vs Truncate vs Drop), Thứ tự thực thi SQL, Indexing & Tối ưu hiệu năng, Composite Key, View.
- **☕ Java Core & OOP Chuyên Sâu (`interview-javacore`)**: 4 đặc tính OOP, Vùng nhớ Stack vs Heap, Bẫy Integer Cache (-128 đến 127), ConcurrentModificationException khi remove trong vòng lặp for, HashSet trap khi sửa thuộc tính, Try-catch-finally return, Comparable vs Comparator, String vs StringBuilder vs StringBuffer, map() vs flatMap() Stream API.
- **🍃 Spring Boot & REST API (`interview-spring`)**: Spring vs Spring Boot, Vòng đời của một Bean (Bean Lifecycle), Dependency Injection (Constructor vs Field vs Setter), Luồng xử lý một Request trong Spring Boot (DispatcherServlet -> Service -> Repository), Cấu hình CORS & Spring Security, Global Exception Handling với `@RestControllerAdvice`.
- **🌐 Web & Frontend (`interview-web`)**: Session vs Cookie, Phương thức HTTP (GET, POST, PUT), Toán tử `==` vs `===` trong JavaScript, Virtual DOM trong React vs Real DOM, State vs Props, Validation phía Client vs Server.
- **🛠️ Git, Testing & Quy Trình Dự Án (`interview-devops`)**: Quy trình xử lý Git Conflict, Unit Test & Mocking với Mockito/JUnit, Thiết kế Test cases cho trang Đăng Nhập, Software Development Life Cycle (SDLC), Scrum Framework & các sự kiện trong một Sprint, Môi trường Dev/Staging/Production.
- **🤖 AI, LLM & Prompt Engineering (`interview-ai`)**: Kiến trúc LLM và ứng dụng trong phát triển phần mềm, Kỹ thuật viết Prompt hiệu quả (RC-TCO framework), Đánh giá và kiểm tra code do AI sinh ra, Khái niệm AI Agent & Tool calling.
- **🎯 Đề Tổng Hợp Phỏng Vấn 1-1 (`interview-all`)**: Trộn toàn bộ 48 câu hỏi phỏng vấn giúp bạn thi thử phản xạ như khi đi phỏng vấn trực tiếp!

### 2. 📚 3 Bộ Đề Thi Trắc Nghiệm Môn Học (Gốc)
- **Bộ đề 1 (Quiz 1 - 39 câu)**: Kiến thức tổng hợp cốt lõi Java (OOP, cú pháp, collection, keyword, method).
- **Bộ đề 2 (Quiz 2 - 20 câu)**: Chuyên sâu Kế thừa (Inheritance), Constructor, Đa hình (Polymorphism), Interface & Abstract class.
- **Bộ đề 3 (Quiz Day 3 - 21 câu)**: Phân tích code output, Exception Handling, String/StringBuffer, static context, phạm vi truy cập (Access Modifiers).

### 3. 💡 Chế Độ Ôn Luyện & Thi Thử Linh Hoạt
- **Chế độ Ôn luyện (Practice Mode)**: Làm từng câu, biết kết quả tức thì kèm **giải thích tường tận bằng tiếng Việt** và phân tích tại sao các đáp án khác sai + **mẹo trả lời ghi điểm phỏng vấn**.
- **Chế độ Thi thử (Exam Mode)**: Bấm giờ đếm ngược thực chiến, bảng câu hỏi nhanh (Question Palette), gắn cờ câu phân vân, nộp bài chấm điểm tự động.
- **Chế độ Ôn câu sai (Mistakes Tracker)**: Tự động gom những câu làm sai để luyện lại đến khi nắm vững (Spaced Repetition).
- **Bộ sưu tập câu hỏi (Bookmarks ⭐)**: Đánh dấu những câu hỏi hay hoặc bẫy phỏng vấn để xem lại bất cứ lúc nào.
- **Luyện theo Chuyên đề (Topic Mode)**: Luyện riêng từng phần: SQL, Java Core, Spring Boot, Web Frontend, Git/DevOps, AI, OOP, Constructor, Interface, String,...

### 2. 🔐 Hệ thống Xác thực & Người dùng
- Đăng ký tài khoản nhanh chóng chỉ với **Tên đăng nhập** & **Mật khẩu**.
- Mật khẩu được mã hóa an toàn bằng `bcryptjs`.
- Phiên đăng nhập được quản lý bằng `JWT (jose)` lưu trong HTTP-only Cookie bảo mật cao.
- Lưu trữ lịch sử tất cả các lượt thi, điểm số, thời gian làm bài, phân tích điểm mạnh/điểm yếu theo từng chủ đề.

### 3. 🛡️ Trang Quản trị Admin (`/admin`)
- Tài khoản quản trị mặc định:
  - **Tên đăng nhập:** `trungadmin`
  - **Mật khẩu:** `trungadmin123`
- Quản lý danh sách người dùng (khóa/mở tài khoản, đổi quyền, reset mật khẩu, xóa tài khoản).
- Trình biên tập đề thi trực quan (**Visual Quiz Editor**):
  - Thêm, sửa, xóa câu hỏi.
  - Hỗ trợ đoạn code Java với tính năng xem trước (Preview) tô màu cú pháp tức thì.
  - Sửa đáp án đúng, nội dung các lựa chọn, giải thích chi tiết.
- Nút **Khôi phục dữ liệu gốc (1-Click Re-seed)**: Đặt lại toàn bộ 80 câu hỏi chuẩn ban đầu bất cứ lúc nào nếu cần.

### 4. ⚡ Giao diện Hiện đại & Tối ưu hiệu năng
- Giao diện Dark mode thời thượng phong cách Glassmorphism.
- Code syntax highlighter không phụ thuộc thư viện nặng, tối ưu tải trang cực nhanh.
- Xây dựng trên **Next.js 16 (App Router)** & MongoDB Atlas.

---

## 🛠️ Công nghệ sử dụng

- **Frontend & Backend**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud NoSQL Database)
- **Styling**: Vanilla CSS Design System (Custom Tokens, CSS Variables, Responsive Grid)
- **Authentication**: JWT (`jose`) + `bcryptjs`
- **CI/CD**: GitHub Actions (Tự động build, kiểm tra chất lượng mã nguồn trên mỗi commit)
- **Deployment**: Tối ưu sẵn sàng deploy 1-click lên [Vercel](https://vercel.com/)

---

## 📦 Cấu trúc Thư mục

```text
JAVA/
├── .github/
│   └── workflows/
│       └── ci.yml               # CI/CD Pipeline (GitHub Actions)
├── quiz-web/                    # Mã nguồn chính ứng dụng Next.js
│   ├── app/                     # App Router (Pages & API Routes)
│   │   ├── admin/               # Trang quản trị dành cho trungadmin
│   │   ├── api/                 # REST APIs (Auth, Quizzes, Attempts, Bookmarks, Admin)
│   │   ├── login/ & register/   # Đăng nhập & Đăng ký
│   │   ├── profile/             # Thông tin cá nhân & Lịch sử làm bài
│   │   ├── quiz/[slug]/         # Giao diện làm bài thi & ôn tập
│   │   ├── layout.js            # Global Layout & Navbar
│   │   └── page.js              # Trang chủ hiển thị danh sách đề thi
│   ├── components/              # Các UI component tái sử dụng (Navbar, Footer, CodeBlock)
│   ├── lib/                     # Modules cốt lõi
│   │   ├── auth.js              # JWT & Session helpers
│   │   ├── db.js                # Kết nối MongoDB Atlas & Auto-seed
│   │   ├── highlight.js         # Trình tô màu cú pháp code Java
│   │   ├── quizzes.js           # Truy vấn dữ liệu đề thi & tạo phiên làm bài
│   │   ├── seedData.js          # Dữ liệu 80 câu hỏi và giải thích tiếng Việt
│   │   └── topics.js            # Danh mục chuyên đề
│   ├── .env.example             # Mẫu cấu hình biến môi trường
│   ├── package.json
│   └── next.config.mjs
├── Quiz 1/                      # Ảnh chụp màn hình đề thi 1 gốc (39 ảnh)
├── Quiz 2/                      # Ảnh chụp màn hình đề thi 2 gốc (20 ảnh)
├── Quiz Day 3 (1)/              # Ảnh chụp màn hình đề thi 3 gốc (21 ảnh)
├── .gitignore
└── README.md
```

---

## 💻 Hướng dẫn Cài đặt & Chạy dưới Local

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 18.18.0 trở lên (khuyên dùng Node.js 20 LTS).
- **Git**

### 2. Cài đặt các gói phụ thuộc
Mở terminal hoặc PowerShell:

```bash
cd quiz-web
npm install
```

### 3. Cấu hình Biến môi trường
Tạo file `.env.local` bên trong thư mục `quiz-web/` (hoặc sao chép từ `.env.example`):

```ini
MONGODB_URI=mongodb+srv://thanhtrungse18b05_db_user:doO4DjnFsZsvNUGM@cluster0.bhtl8lr.mongodb.net/javaquiz?retryWrites=true&w=majority
MONGODB_DB=javaquiz
JWT_SECRET=super-secret-key-java-quiz-2026-production
ADMIN_USERNAME=trungadmin
ADMIN_PASSWORD=trungadmin123
```

> **Ghi chú**: Kết nối MongoDB Atlas đã được tạo sẵn cấu hình và tự động kích hoạt tạo bảng, chỉ mục và nạp dữ liệu 80 câu hỏi cùng tài khoản admin ngay lần chạy đầu tiên.

### 4. Khởi động ứng dụng
```bash
npm run dev
```

Truy cập trên trình duyệt tại: **`http://localhost:3000`**

---

## 🚢 Hướng dẫn Deploy lên Vercel

Ứng dụng được thiết kế tối ưu tuyệt đối cho nền tảng **Vercel**:

### Cách 1: Deploy qua Giao diện Web Vercel (Khuyên dùng)
1. Đăng nhập vào [Vercel Dashboard](https://vercel.com).
2. Bấm **"Add New..."** -> **"Project"** -> Chọn repository: `trungctde180766/JAVA`.
3. Trong phần **Root Directory**: Chọn **`quiz-web`** (bấm *Edit* và chọn thư mục `quiz-web`).
4. Trong phần **Environment Variables**, điền các biến môi trường sau:
   - `MONGODB_URI`: `mongodb+srv://thanhtrungse18b05_db_user:doO4DjnFsZsvNUGM@cluster0.bhtl8lr.mongodb.net/javaquiz?retryWrites=true&w=majority`
   - `MONGODB_DB`: `javaquiz`
   - `JWT_SECRET`: một chuỗi ký tự bí mật bất kỳ (ví dụ: `my-super-secret-jwt-key-2026`)
   - `ADMIN_USERNAME`: `trungadmin`
   - `ADMIN_PASSWORD`: `trungadmin123`
5. Bấm **"Deploy"**. Vercel sẽ tự động build và cấp domain HTTPS miễn phí trong vòng 1-2 phút!

---

## 🔄 Quy trình CI/CD (GitHub Actions)

Dự án đã tích hợp sẵn workflow tự động tại file [`.github/workflows/ci.yml`](.github/workflows/ci.yml):
- **Trigger**: Tự động kích hoạt mỗi khi có code mới được `push` hoặc tạo `pull_request` vào nhánh `main` hoặc `master`.
- **Nhiệm vụ**:
  - Tải mã nguồn.
  - Cài đặt Node.js và cache dependencies để tối ưu tốc độ.
  - Cài đặt thư viện (`npm ci`).
  - Kiểm tra và build thử ứng dụng Next.js (`npm run build`) để đảm bảo không có lỗi cú pháp hoặc lỗi tương thích trước khi triển khai.

---

## 🔑 Tài khoản mặc định

| Vai trò | Tên đăng nhập | Mật khẩu mặc định | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `trungadmin` | `trungadmin123` | Toàn quyền quản lý đề thi, sửa/thêm câu hỏi, quản lý thành viên, khôi phục DB |
| **Học viên (User)** | Tự đăng ký qua form `/register` | Mật khẩu tự đặt | Thi thử, ôn luyện, đánh dấu câu hỏi, theo dõi lịch sử và tiến độ cá nhân |

---

## 📝 Bản quyền & Giấy phép
Dự án được xây dựng phục vụ mục đích học tập và ôn thi chứng chỉ / phỏng vấn môn Lập trình Java.
Mọi thắc mắc hoặc đóng góp vui lòng mở Issue hoặc Pull Request trên GitHub repo [trungctde180766/JAVA](https://github.com/trungctde180766/JAVA).
