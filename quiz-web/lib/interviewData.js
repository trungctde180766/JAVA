// Bộ câu hỏi ôn tập phỏng vấn 1-1 phân loại theo từng dạng chuyên đề (Có song ngữ EN & VI):
export const interviewSql = {
  "slug": "interview-sql",
  "title": "Phỏng Vấn: SQL & Cơ Sở Dữ Liệu",
  "description": "Inner/Left Join, Group By & Having, Performance, Indexing, Execution Order, DML vs DDL, Subqueries.",
  "icon": "🗄️",
  "color": "#06b6d4",
  "order": 10,
  "questions": [
    {
      "id": "isql01",
      "topic": "sql",
      "text": "Phân biệt INNER JOIN và LEFT JOIN trong SQL?",
      "options": [
        "INNER JOIN trả về tất cả các dòng của cả hai bảng; LEFT JOIN chỉ trả về các dòng khớp nhau",
        "INNER JOIN chỉ trả về các dòng có điều kiện kết nối khớp ở cả 2 bảng; LEFT JOIN trả về toàn bộ dòng từ bảng bên trái và các dòng khớp từ bảng bên phải (nếu không khớp thì giá trị bên phải là NULL)",
        "LEFT JOIN bắt buộc phải có khóa ngoại (Foreign Key), INNER JOIN thì không cần",
        "Cả hai có kết quả giống nhau, chỉ khác về tốc độ thực thi"
      ],
      "answer": 1,
      "explanation": "• INNER JOIN: Chỉ lấy giao điểm (intersection) giữa 2 bảng.\n• LEFT JOIN (LEFT OUTER JOIN): Giữ nguyên 100% dòng của bảng trái. Bảng phải không có dữ liệu tương ứng sẽ điền NULL.\n💡 Mẹo phỏng vấn: Khi nhà tuyển dụng hỏi 'Làm sao tìm những khách hàng CHƯA từng đặt đơn hàng nào?', câu trả lời chuẩn là dùng LEFT JOIN bảng Customers với Orders và kiểm tra `WHERE Orders.id IS NULL` (hoặc dùng NOT EXISTS).",
      "textEn": "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
      "optionsEn": [
        "INNER JOIN returns all rows from both tables; LEFT JOIN only returns matching rows",
        "INNER JOIN only returns rows where the join condition matches in both tables; LEFT JOIN returns all rows from the left table and matched rows from the right table (with NULL for non-matches)",
        "LEFT JOIN requires a Foreign Key, while INNER JOIN does not",
        "Both produce the same result, differing only in execution speed"
      ]
    },
    {
      "id": "isql02",
      "topic": "sql",
      "text": "Phân biệt mệnh đề WHERE và HAVING trong câu lệnh truy vấn SQL?",
      "options": [
        "WHERE dùng để lọc các nhóm sau khi GROUP BY; HAVING dùng để lọc từng dòng trước khi nhóm",
        "WHERE lọc từng bản ghi riêng lẻ trước khi thực hiện gom nhóm (GROUP BY); HAVING dùng để lọc các nhóm sau khi đã gom nhóm và có thể sử dụng các hàm tổng hợp (Aggregate Functions như COUNT, SUM, AVG)",
        "HAVING có thể dùng độc lập mà không cần GROUP BY và chạy nhanh hơn WHERE",
        "WHERE chỉ áp dụng cho kiểu số, HAVING áp dụng cho kiểu chuỗi"
      ],
      "answer": 1,
      "explanation": "• WHERE: Lọc dữ liệu ở cấp độ từng row trước khi nhóm. WHERE không được chứa hàm tổng hợp (ví dụ: `WHERE COUNT(*) > 5` sẽ báo lỗi cú pháp).\n• HAVING: Lọc ở cấp độ group sau khi đã tính toán hàm tổng hợp (ví dụ: `HAVING COUNT(*) >= 2`).",
      "textEn": "What is the difference between WHERE and HAVING clauses in an SQL query?",
      "optionsEn": [
        "WHERE filters groups after GROUP BY; HAVING filters individual rows before grouping",
        "WHERE filters individual rows before grouping (GROUP BY); HAVING filters groups after grouping and can use aggregate functions (such as COUNT, SUM, AVG)",
        "HAVING can be used independently without GROUP BY and runs faster than WHERE",
        "WHERE applies only to numeric types, HAVING applies to string types"
      ]
    },
    {
      "id": "isql03",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, ngay_sinh). Câu truy vấn nào lấy danh sách 10 bạn sinh viên có tuổi bé nhất?",
      "options": [
        "SELECT * FROM sinhvien ORDER BY ngay_sinh ASC LIMIT 10;",
        "SELECT * FROM sinhvien ORDER BY ngay_sinh DESC LIMIT 10;",
        "SELECT TOP 10 * FROM sinhvien WHERE ngay_sinh = MIN(ngay_sinh);",
        "SELECT * FROM sinhvien GROUP BY ngay_sinh HAVING COUNT(*) <= 10;"
      ],
      "answer": 1,
      "explanation": "• Bẫy tư duy phỏng vấn: Người có TUỔI BÉ NHẤT tức là người SINH RA GẦN ĐÂY NHẤT (ngày sinh lớn nhất / mới nhất).\n• Do đó phải sắp xếp theo ngày sinh giảm dần: `ORDER BY ngay_sinh DESC LIMIT 10`.\n• Nếu dùng ASC sẽ ra người có ngày sinh xa nhất trong quá khứ (tức là người nhiều tuổi nhất).",
      "textEn": "Given table sinhvien (id, ho_ten, ngay_sinh). Which query retrieves the 10 youngest students?",
      "optionsEn": [
        "SELECT * FROM sinhvien ORDER BY ngay_sinh ASC LIMIT 10;",
        "SELECT * FROM sinhvien ORDER BY ngay_sinh DESC LIMIT 10;",
        "SELECT TOP 10 * FROM sinhvien WHERE ngay_sinh = MIN(ngay_sinh);",
        "SELECT * FROM sinhvien GROUP BY ngay_sinh HAVING COUNT(*) <= 10;"
      ]
    },
    {
      "id": "isql04",
      "topic": "sql",
      "text": "Câu lệnh nào sau đây dùng để xoá những hồ sơ ứng viên chưa đủ tuổi làm việc (dưới 18 tuổi) từ bảng ung_vien (id, ho_ten, tuoi)?",
      "options": [
        "DROP FROM ung_vien WHERE tuoi < 18;",
        "TRUNCATE TABLE ung_vien WHERE tuoi < 18;",
        "DELETE FROM ung_vien WHERE tuoi < 18;",
        "REMOVE ung_vien WHERE tuoi < 18;"
      ],
      "answer": 2,
      "explanation": "• `DELETE FROM <table> WHERE <condition>;` là câu lệnh DML chuẩn dùng để xoá các dòng thoả mãn điều kiện.\n• `TRUNCATE` không hỗ trợ mệnh đề WHERE (nó xoá sạch toàn bộ dữ liệu bảng).\n• `DROP` xoá luôn cả định nghĩa và cấu trúc bảng khỏi database.",
      "textEn": "Which statement is used to delete candidate records under 18 years old from table ung_vien (id, ho_ten, tuoi)?",
      "optionsEn": [
        "DROP FROM ung_vien WHERE tuoi < 18;",
        "TRUNCATE TABLE ung_vien WHERE tuoi < 18;",
        "DELETE FROM ung_vien WHERE tuoi < 18;",
        "REMOVE ung_vien WHERE tuoi < 18;"
      ]
    },
    {
      "id": "isql05",
      "topic": "sql",
      "text": "Phân biệt kiểu dữ liệu CHAR và VARCHAR trong cơ sở dữ liệu?",
      "options": [
        "CHAR là chuỗi có độ dài cố định (fixed-length), tự đệm khoảng trắng nếu chuỗi ngắn hơn; VARCHAR là chuỗi có độ dài biến đổi (variable-length), chỉ chiếm dung lượng bằng độ dài chuỗi thực tế + bytes lưu độ dài",
        "CHAR lưu được tiếng Việt Unicode, VARCHAR chỉ lưu được ký tự ASCII",
        "VARCHAR tìm kiếm nhanh hơn CHAR trong mọi trường hợp vì tốn ít dung lượng ổ đĩa hơn",
        "CHAR chỉ chứa tối đa 255 ký tự, VARCHAR chứa không giới hạn ký tự"
      ],
      "answer": 0,
      "explanation": "• CHAR(n): Chiếm đúng n ký tự dù chuỗi ngắn hơn. Dùng tối ưu cho dữ liệu có độ dài cố định như: Mã quốc gia (VN, US), Giới tính (M/F), Mã hash MD5, Mã CCCD -> Truy cập nhanh hơn và không bị phân mảnh bộ nhớ.\n• VARCHAR(n): Độ dài linh hoạt từ 0 đến n. Dùng cho: Họ tên, email, mô tả.",
      "textEn": "What is the difference between CHAR and VARCHAR data types in a relational database?",
      "optionsEn": [
        "CHAR is fixed-length, padding with spaces if shorter; VARCHAR is variable-length, consuming only actual string bytes + length prefix bytes",
        "CHAR supports Unicode Vietnamese, VARCHAR only supports ASCII characters",
        "VARCHAR searches faster than CHAR in all cases because it uses less disk space",
        "CHAR holds up to 255 characters, VARCHAR holds unlimited characters"
      ]
    },
    {
      "id": "isql06",
      "topic": "sql",
      "text": "Thứ tự thực thi logic (Execution Order) chuẩn của một câu lệnh truy vấn SQL là gì?",
      "options": [
        "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
        "FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT",
        "FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY",
        "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> LIMIT"
      ],
      "answer": 1,
      "explanation": "💡 Mẹo phỏng vấn cực hay: SQL không chạy từ SELECT trước!\nThứ tự chạy logic thực tế của Database Engine:\n1. FROM & JOIN (Xác định nguồn bảng)\n2. WHERE (Lọc dòng thô)\n3. GROUP BY (Gom nhóm dữ liệu)\n4. HAVING (Lọc nhóm sau tính toán hàm tổng hợp)\n5. SELECT (Tính toán cột, đặt alias)\n6. DISTINCT (Loại bỏ bản ghi trùng)\n7. ORDER BY (Sắp xếp kết quả)\n8. LIMIT / OFFSET (Cắt trang)\n=> Vì WHERE chạy trước SELECT nên bạn không thể dùng alias được đặt ở SELECT trong mệnh đề WHERE!",
      "textEn": "What is the standard logical execution order of an SQL query statement?",
      "optionsEn": [
        "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
        "FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT",
        "FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY",
        "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> LIMIT"
      ]
    },
    {
      "id": "isql07",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, diem, que_quan). Câu truy vấn nào thống kê số lượng sinh viên có điểm dưới trung bình (diem < 5) theo từng quê quán?",
      "options": [
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING diem < 5;",
        "SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;",
        "SELECT que_quan, SUM(diem) FROM sinhvien WHERE diem < 5;",
        "SELECT que_quan, COUNT(diem < 5) FROM sinhvien GROUP BY que_quan;"
      ],
      "answer": 1,
      "explanation": "• Lọc các sinh viên có điểm < 5 trước bằng mệnh đề `WHERE diem < 5`.\n• Gom nhóm theo quê quán bằng `GROUP BY que_quan`.\n• Đếm số lượng sinh viên trong mỗi nhóm bằng `COUNT(*)`.\n(Không dùng HAVING diem < 5 vì 'diem' không phải là hàm tổng hợp).",
      "textEn": "Given table sinhvien (id, ho_ten, diem, que_quan). Which query counts the number of students with below-average scores (diem < 5) grouped by hometown?",
      "optionsEn": [
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING diem < 5;",
        "SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;",
        "SELECT que_quan, SUM(diem) FROM sinhvien WHERE diem < 5;",
        "SELECT que_quan, COUNT(diem < 5) FROM sinhvien GROUP BY que_quan;"
      ]
    },
    {
      "id": "isql08",
      "topic": "sql",
      "text": "Làm thế nào để tìm danh sách các sinh viên CHƯA đăng ký bất kỳ khoá học nào (bảng sinhvien và bảng dang_ky)?",
      "options": [
        "SELECT sv.* FROM sinhvien sv INNER JOIN dang_ky dk ON sv.id = dk.sinhvien_id;",
        "SELECT sv.* FROM sinhvien sv LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE dk.sinhvien_id IS NULL;",
        "SELECT sv.* FROM sinhvien sv RIGHT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE sv.id IS NULL;",
        "SELECT sv.* FROM sinhvien sv WHERE sv.id = (SELECT sinhvien_id FROM dang_ky);"
      ],
      "answer": 1,
      "explanation": "• Dùng `LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id` để giữ toàn bộ sinh viên.\n• Mệnh đề `WHERE dk.sinhvien_id IS NULL` sẽ lọc ra những bạn chưa hề có dòng nào tương ứng trong bảng đăng ký.\n• Cách 2 tương đương: `SELECT * FROM sinhvien sv WHERE NOT EXISTS (SELECT 1 FROM dang_ky dk WHERE dk.sinhvien_id = sv.id);`",
      "textEn": "How do you find the list of students who have NOT registered for any courses (tables sinhvien and dang_ky)?",
      "optionsEn": [
        "SELECT sv.* FROM sinhvien sv INNER JOIN dang_ky dk ON sv.id = dk.sinhvien_id;",
        "SELECT sv.* FROM sinhvien sv LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE dk.sinhvien_id IS NULL;",
        "SELECT sv.* FROM sinhvien sv RIGHT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE sv.id IS NULL;",
        "SELECT sv.* FROM sinhvien sv WHERE sv.id = (SELECT sinhvien_id FROM dang_ky);"
      ]
    },
    {
      "id": "isql09",
      "topic": "sql",
      "text": "Phân biệt toán tử UNION và UNION ALL trong SQL?",
      "options": [
        "UNION gộp kết quả và tự động loại bỏ các dòng trùng lặp (DISTINCT); UNION ALL gộp kết quả và giữ nguyên toàn bộ các dòng (kể cả trùng lặp), do đó chạy nhanh hơn UNION",
        "UNION ALL chỉ dùng được khi hai bảng có cùng tên cột; UNION không cần",
        "UNION chạy nhanh hơn UNION ALL vì dữ liệu trả về ít hơn",
        "Cả hai đều loại bỏ dòng trùng, chỉ khác nhau về thứ tự sắp xếp"
      ],
      "answer": 0,
      "explanation": "• `UNION`: Tự động loại bỏ các bản ghi trùng lặp giữa các truy vấn. Để làm được điều này, database phải thực hiện thêm bước sắp xếp hoặc Hash (tốn CPU và RAM).\n• `UNION ALL`: Nối dữ liệu trực tiếp mà không kiểm tra trùng lặp -> Hiệu năng cao hơn nhiều.\n💡 Nếu biết chắc dữ liệu không trùng lặp hoặc cần giữ dữ liệu trùng, luôn dùng `UNION ALL`.",
      "textEn": "What is the difference between UNION and UNION ALL operators in SQL?",
      "optionsEn": [
        "UNION merges results and eliminates duplicate rows (DISTINCT); UNION ALL retains all rows including duplicates, thus executing faster than UNION",
        "UNION ALL can only be used when both tables share identical column names; UNION does not require this",
        "UNION runs faster than UNION ALL because it returns less data",
        "Both eliminate duplicates, differing only in sort order"
      ]
    },
    {
      "id": "isql10",
      "topic": "sql",
      "text": "So sánh 3 câu lệnh xoá dữ liệu trong SQL: DELETE, TRUNCATE và DROP?",
      "options": [
        "DELETE là DML (có thể rollback, hỗ trợ WHERE, kích hoạt Trigger, chậm hơn); TRUNCATE là DDL (xoá toàn bộ data, reset auto_increment, không WHERE, không kích hoạt Trigger row, cực nhanh); DROP là DDL (xoá cả dữ liệu lẫn cấu trúc bảng)",
        "Cả 3 câu lệnh đều có thể Rollback được trong mọi database",
        "TRUNCATE chậm hơn DELETE vì phải xoá từng bản ghi từ đầu đến cuối",
        "DELETE tự động reset cột ID tăng tự động về 1"
      ],
      "answer": 0,
      "explanation": "• DELETE (DML): Xoá từng dòng, ghi nhật ký giao dịch (Transaction log) chi tiết cho từng dòng, có thể rollback trong transaction, kích hoạt trigger.\n• TRUNCATE (DDL): Giải phóng toàn bộ trang dữ liệu (data pages), reset bộ đếm auto-increment, cực nhanh, không hỗ trợ WHERE.\n• DROP (DDL): Xoá sổ cả cấu trúc bảng, index, trigger liên quan khỏi Database.",
      "textEn": "Compare the 3 data deletion commands in SQL: DELETE, TRUNCATE, and DROP?",
      "optionsEn": [
        "DELETE is DML (rollbackable, supports WHERE, fires Triggers, slower); TRUNCATE is DDL (clears all data, resets auto_increment, no WHERE, does not fire row Triggers, very fast); DROP is DDL (removes both data and table structure)",
        "All 3 commands can be rolled back in any database",
        "TRUNCATE is DML, while DELETE and DROP are DDL",
        "DELETE and TRUNCATE only mark records as hidden; only DROP actually deletes data on disk"
      ]
    },
    {
      "id": "isql11",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, gioi_tinh, diem). Câu lệnh nào cập nhật tăng 1 điểm cho tất cả sinh viên nữ (gioi_tinh = 'Nu')?",
      "options": [
        "UPDATE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';",
        "ALTER TABLE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';",
        "MODIFY sinhvien diem = diem + 1 WHERE gioi_tinh = 'Nu';",
        "UPDATE diem = diem + 1 FROM sinhvien WHERE gioi_tinh = 'Nu';"
      ],
      "answer": 0,
      "explanation": "Cú pháp chuẩn của câu lệnh cập nhật dữ liệu SQL:\n`UPDATE <tên_bảng> SET <tên_cột> = <giá_trị_mới> WHERE <điều_kiện>;`",
      "textEn": "Given table sinhvien (id, ho_ten, gioi_tinh, diem). Which query retrieves students with higher scores than the average score of all students?",
      "optionsEn": [
        "SELECT * FROM sinhvien WHERE diem > AVG(diem);",
        "SELECT * FROM sinhvien WHERE diem > (SELECT AVG(diem) FROM sinhvien);",
        "SELECT * FROM sinhvien HAVING diem > AVG(diem);",
        "SELECT * FROM sinhvien GROUP BY id HAVING diem > AVG(diem);"
      ]
    },
    {
      "id": "isql12",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, gioi_tinh, que_quan). Câu lệnh nào đếm số lượng sinh viên nữ theo từng quê quán?",
      "options": [
        "SELECT que_quan, COUNT(*) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;",
        "SELECT que_quan, COUNT(gioi_tinh = 'Nu') FROM sinhvien GROUP BY que_quan;",
        "SELECT que_quan, SUM(gioi_tinh) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;",
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING gioi_tinh = 'Nu';"
      ],
      "answer": 0,
      "explanation": "Lọc sinh viên nữ trước bằng `WHERE gioi_tinh = 'Nu'`, sau đó gom nhóm theo `GROUP BY que_quan` và đếm bằng `COUNT(*)`.",
      "textEn": "Given table sinhvien (id, ho_ten, gioi_tinh, que_quan). Which query counts the number of male and female students in each hometown?",
      "optionsEn": [
        "SELECT que_quan, gioi_tinh, COUNT(*) FROM sinhvien GROUP BY que_quan, gioi_tinh;",
        "SELECT que_quan, COUNT(gioi_tinh) FROM sinhvien GROUP BY que_quan;",
        "SELECT que_quan, gioi_tinh, SUM(*) FROM sinhvien GROUP BY que_quan;",
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY gioi_tinh;"
      ]
    },
    {
      "id": "isql13",
      "topic": "sql",
      "text": "Khóa chính tổng hợp (Composite Primary Key) trong cơ sở dữ liệu là gì?",
      "options": [
        "Là khóa chính được tạo tự động bằng chuỗi UUID kết hợp số nguyên",
        "Là khóa chính được cấu thành từ hai hay nhiều cột kết hợp lại với nhau để tạo ra tính duy nhất (unique) cho mỗi dòng trong bảng",
        "Là một cột vừa làm Primary Key vừa làm Foreign Key",
        "Là khóa chính có thể chứa giá trị NULL"
      ],
      "answer": 1,
      "explanation": "• Composite Primary Key là khóa chính gồm từ 2 cột trở lên. Ví dụ: Trong bảng trung gian `order_details`, cặp cột `(order_id, product_id)` cùng nhau làm khóa chính để đảm bảo 1 đơn hàng không bị thêm 1 sản phẩm 2 lần.\n• Tất cả các cột tham gia Composite Key đều KHÔNG được phép mang giá trị NULL.",
      "textEn": "What is a Composite Primary Key in a relational database?",
      "optionsEn": [
        "A primary key composed of two or more columns combined together to uniquely identify a record in a table",
        "A primary key automatically auto-incremented by the database",
        "A table that contains two distinct independent primary keys",
        "A foreign key that references multiple parent tables simultaneously"
      ]
    },
    {
      "id": "isql14",
      "topic": "sql",
      "text": "Câu truy vấn nào sau đây lấy danh sách 100 người dùng được tạo mới nhất từ bảng users (id, username, created_at)?",
      "options": [
        "SELECT * FROM users ORDER BY created_at DESC LIMIT 100;",
        "SELECT * FROM users ORDER BY created_at ASC LIMIT 100;",
        "SELECT TOP 100 * FROM users WHERE created_at = MAX(created_at);",
        "SELECT * FROM users GROUP BY created_at LIMIT 100;"
      ],
      "answer": 0,
      "explanation": "Người dùng mới nhất tức là thời gian `created_at` lớn nhất -> Sắp xếp giảm dần bằng `ORDER BY created_at DESC` và lấy 100 dòng đầu bằng `LIMIT 100`.",
      "textEn": "Which query retrieves the 100 most recently registered users (sorted by registration timestamp in descending order)?",
      "optionsEn": [
        "SELECT * FROM users ORDER BY created_at ASC LIMIT 100;",
        "SELECT * FROM users ORDER BY created_at DESC LIMIT 100;",
        "SELECT TOP 100 * FROM users WHERE created_at = MAX(created_at);",
        "SELECT * FROM users GROUP BY created_at LIMIT 100;"
      ]
    },
    {
      "id": "isql15",
      "topic": "sql",
      "text": "Về tối ưu hiệu năng cơ sở dữ liệu (Database Indexing & Performance), phát biểu nào sau đây là CHÍNH XÁC nhất?",
      "options": [
        "Nên đánh Index trên tất cả các cột của bảng để tăng tốc độ truy vấn tối đa",
        "Tạo B-Tree Index trên các cột thường xuyên dùng trong WHERE, JOIN và ORDER BY; tránh dùng hàm trên cột được đánh index (như WHERE YEAR(created_at) = 2026) vì sẽ làm vô hiệu hoá index và dẫn đến Full Table Scan",
        "Luôn dùng SELECT * thay vì chỉ định rõ tên cột để database tự cache tối ưu",
        "Chỉ cần đánh index trên bảng ít dữ liệu, bảng hàng triệu dòng thì không cần"
      ],
      "answer": 1,
      "explanation": "💡 Kiến thức phỏng vấn quan trọng về Index:\n1. Đánh index quá nhiều sẽ làm CHẬM các thao tác ghi (INSERT/UPDATE/DELETE) vì database phải cập nhật lại cây B-Tree.\n2. Khi viết điều kiện `WHERE FUNCTION(col) = value` (ví dụ: `WHERE LOWER(email) = 'abc'`), bộ tối ưu truy vấn không dùng được index thông thường mà phải quét toàn bộ bảng (Full Table Scan).\n3. Tránh `SELECT *`, chỉ select các cột thực sự cần dùng để giảm tải I/O và băng thông mạng.",
      "textEn": "Regarding Database Indexing & Performance, which statement is ACCURATE?",
      "optionsEn": [
        "Creating an Index significantly speeds up SELECT queries, but slows down INSERT, UPDATE, DELETE operations and consumes extra disk/RAM space",
        "Creating Indexes on every column in a table is always a best practice",
        "Indexes only accelerate text queries and have no effect on numbers or dates",
        "Using `SELECT *` has no negative impact on database indexes or cache"
      ]
    },
    {
      "id": "isql16",
      "topic": "sql",
      "text": "View trong hệ quản trị cơ sở dữ liệu SQL là gì và mục đích sử dụng chính là gì?",
      "options": [
        "Là một bảng vật lý chiếm dung lượng riêng biệt và tự động sao chép toàn bộ dữ liệu từ bảng gốc",
        "Là một bảng ảo (Virtual Table) dựa trên kết quả của một câu lệnh SELECT; không lưu trữ dữ liệu thực tế (trừ Materialized View), giúp che giấu độ phức tạp của truy vấn và hỗ trợ phân quyền bảo mật dữ liệu",
        "Là một Index đặc biệt giúp tăng tốc độ ghi dữ liệu",
        "Là một thủ tục lưu trữ (Stored Procedure) có thể truyền tham số đầu vào"
      ],
      "answer": 1,
      "explanation": "• View là một bảng ảo (Virtual Table). Khi bạn SELECT từ View, database sẽ thực thi câu lệnh SELECT bên dưới định nghĩa của View.\n• Mục đích: Che giấu các câu JOIN phức tạp, tính toán sẵn các cột nghiệp vụ, và phân quyền bảo mật (chỉ cho phép nhân viên xem View chứa thông tin không nhạy cảm thay vì bảng chính chứa lương hoặc mật khẩu).",
      "textEn": "What is a View in an SQL database management system and what is its primary purpose?",
      "optionsEn": [
        "A View is a virtual table based on the result set of an SQL query; it does not store raw data itself, helping encapsulate query logic, improve security, and simplify complex queries",
        "A View is a temporary physical table stored permanently on hard drive for backup purposes",
        "A View is a function used to validate data input before INSERT",
        "A View automatically duplicates the entire database to a secondary server"
      ]
    }
  ]
};
export const interviewJavaCore = {
  "slug": "interview-javacore",
  "title": "Phỏng Vấn: Java Core & OOP Chuyên Sâu",
  "description": "4 đặc tính OOP, Stack/Heap, Integer Cache, Exception, ConcurrentModificationException, HashSet, Stream API, GC.",
  "icon": "☕",
  "color": "#f59e0b",
  "order": 11,
  "questions": [
    {
      "id": "ijc01",
      "topic": "javacore",
      "text": "Cho đoạn mã sau trong Java:\nInteger a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));\nKết quả in ra màn hình là gì và giải thích tại sao?",
      "code": "Integer a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));",
      "options": [
        "true true",
        "false false",
        "true false",
        "false true"
      ],
      "answer": 2,
      "explanation": "💡 Câu hỏi kinh điển trong phỏng vấn Java:\n• Java có cơ chế Integer Cache lưu trữ sẵn các đối tượng Integer từ -128 đến 127 (theo Java Language Specification khi Autoboxing `Integer.valueOf()`).\n• Với 100: Cả `a` và `b` cùng trỏ tới 1 đối tượng duy nhất trong cache -> `a == b` so sánh địa chỉ tham chiếu cho kết quả `true`.\n• Với 200: Vượt ngoài vùng cache [-128, 127], JVM gọi `new Integer(200)` tạo ra 2 đối tượng độc lập trên Heap -> `c == d` so sánh tham chiếu trả về `false`!\n=> Để so sánh giá trị Wrapper Class luôn dùng `.equals()`.",
      "textEn": "Given the following Java snippet:\nInteger a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));\nWhat is printed to the console?",
      "optionsEn": [
        "true true",
        "true false",
        "false false",
        "false true"
      ]
    },
    {
      "id": "ijc02",
      "topic": "javacore",
      "text": "Hiện tượng gì xảy ra khi dùng vòng lặp for thông thường hoặc for-each và gọi list.remove(item) trực tiếp trên một ArrayList?",
      "options": [
        "Ném ra NullPointerException",
        "Ném ra ConcurrentModificationException",
        "Ném ra IndexOutOfBoundsException",
        "Chương trình chạy bình thường không có lỗi gì"
      ],
      "answer": 1,
      "explanation": "• ArrayList áp dụng cơ chế Fail-Fast Iterator bằng biến đếm `modCount`.\n• Khi duyệt danh sách bằng for-each/Iterator mà tự ý gọi `list.remove()` của List thì `expectedModCount != modCount` -> Ném ngay `ConcurrentModificationException`.\n💡 Cách sửa chuẩn khi phỏng vấn:\n1. Dùng `Iterator.remove()`: `Iterator<String> it = list.iterator(); while(it.hasNext()){ if(...) it.remove(); }`\n2. Dùng Java 8: `list.removeIf(item -> ...);`",
      "textEn": "What happens when using a regular for-each loop to remove elements from an ArrayList while iterating over it?",
      "optionsEn": [
        "Elements are deleted normally without error",
        "Throws ConcurrentModificationException at runtime",
        "Throws IndexOutOfBoundsException",
        "The program terminates with an infinite loop"
      ]
    },
    {
      "id": "ijc03",
      "topic": "javacore",
      "text": "Phân biệt vùng nhớ Stack và Heap trong máy ảo Java Virtual Machine (JVM)?",
      "options": [
        "Stack lưu trữ các đối tượng (Objects); Heap lưu trữ các biến nguyên thủy cục bộ và tham chiếu",
        "Stack lưu trữ các lời gọi hàm (call stack), biến cục bộ và con trỏ tham chiếu, mỗi Thread có Stack riêng; Heap lưu trữ toàn bộ Object và mảng, dùng chung cho tất cả các Thread và được quản lý bởi Garbage Collector",
        "Dung lượng vùng nhớ Stack lớn hơn Heap rất nhiều và không bao giờ bị tràn bộ nhớ",
        "Heap tự động giải phóng bộ nhớ ngay khi kết thúc hàm mà không cần Garbage Collector"
      ],
      "answer": 1,
      "explanation": "• Stack: Lưu trữ frame gọi hàm, biến cục bộ (primitive) và biến tham chiếu. Cực nhanh, LIFO, mỗi Thread có Stack độc lập. Tràn bộ nhớ gây `StackOverflowError` (thường do đệ quy vô hạn).\n• Heap: Lưu toàn bộ Object thực tế và mảng (`new Object()`). Được chia sẻ giữa các Thread, do Garbage Collector thu gom giải phóng. Tràn bộ nhớ gây `OutOfMemoryError` (thường do memory leak).",
      "textEn": "Distinguish between Stack and Heap memory in the Java Virtual Machine (JVM)?",
      "optionsEn": [
        "Stack stores all instantiated Objects; Heap stores primitive variables and method call frames",
        "Stack stores primitive variables, method call frames, and Object references (thread-private, auto-cleared upon method exit); Heap stores actual Objects (shared by all threads, managed by Garbage Collector)",
        "Stack and Heap are both managed entirely by the Garbage Collector",
        "Heap memory is always faster and smaller in size than Stack memory"
      ]
    },
    {
      "id": "ijc04",
      "topic": "javacore",
      "text": "Trong Java, cho hàm sau:\npublic static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}\nKhi thực thi test(), giá trị trả về là bao nhiêu?",
      "code": "public static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}",
      "options": [
        "1",
        "2",
        "Báo lỗi biên dịch vì có 2 lệnh return",
        "3"
      ],
      "answer": 1,
      "explanation": "• Khối `finally` LUÔN LUÔN được thực thi sau khi khối `try` kết thúc (trừ trường hợp gọi `System.exit(0)` hoặc JVM crash).\n• Lệnh `return 2;` trong `finally` sẽ ghi đè (override) hoàn toàn giá trị trả về trước đó của `try`, do đó hàm trả về `2`.\n💡 Lưu ý: Trong code thực tế không bao giờ nên return trong khối finally vì nó có thể nuốt cả Exception đang được ném ra từ khối try!",
      "textEn": "In Java, given the following method:\npublic static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}\nWhat does test() return when executed?",
      "optionsEn": [
        "Returns 1",
        "Returns 2",
        "Compilation error because multiple returns are illegal",
        "Throws an Exception at runtime"
      ]
    },
    {
      "id": "ijc05",
      "topic": "javacore",
      "text": "Phân biệt giữa hai interface Comparable và Comparator trong Java?",
      "options": [
        "Comparable nằm trong java.util, định nghĩa phương thức compare(); Comparator nằm trong java.lang, định nghĩa compareTo()",
        "Comparable sửa đổi trực tiếp class cần so sánh (natural ordering) qua phương thức compareTo(T o); Comparator tạo class/lambda riêng biệt bên ngoài (custom ordering) qua phương thức compare(T o1, T o2)",
        "Comparable cho phép sắp xếp theo nhiều tiêu chí khác nhau cùng lúc; Comparator chỉ cho phép sắp xếp theo 1 tiêu chí duy nhất",
        "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi"
      ],
      "answer": 1,
      "explanation": "• `Comparable<T>` (thuộc package `java.lang`): Có method `int compareTo(T o)`. Phải implements trực tiếp vào class Entity để định nghĩa thứ tự sắp xếp tự nhiên mặc định.\n• `Comparator<T>` (thuộc package `java.util`): Có method `int compare(T o1, T o2)`. Rất linh hoạt, có thể tạo nhiều tiêu chí sắp xếp bên ngoài mà không cần sửa code class gốc, hỗ trợ viết Lambda cực ngắn: `Comparator.comparing(Student::getAge)`. ",
      "textEn": "Distinguish between Comparable and Comparator interfaces in Java?",
      "optionsEn": [
        "Comparable defines natural ordering inside the class itself via compareTo(o); Comparator defines external custom sorting via compare(o1, o2)",
        "Comparator belongs to java.lang; Comparable belongs to java.util",
        "Comparable can sort by multiple dynamic criteria at runtime; Comparator only supports a single fixed criterion",
        "Both are identical and can be used interchangeably without any difference"
      ]
    },
    {
      "id": "ijc06",
      "topic": "javacore",
      "text": "Phương thức tĩnh (static method) trong Java có thể được Override (Ghi đè) bởi lớp con không?",
      "options": [
        "Có, static method override bình thường giống như instance method",
        "Không! Đó không phải là Override mà là Method Hiding (Ẩn phương thức); phương thức được gọi sẽ phụ thuộc vào kiểu tham chiếu lúc khai báo (Compile-time) chứ không phải đối tượng thực tế lúc chạy (Runtime)",
        "Chỉ override được nếu phương thức đó có modifier public",
        "Có, nhưng bắt buộc phải có annotation @Override"
      ],
      "answer": 1,
      "explanation": "• Đa hình động (Dynamic Polymorphism / Overriding) chỉ áp dụng cho instance method dựa trên đối tượng thực tế lúc Runtime.\n• `static method` thuộc về Class, được liên kết tĩnh (Static Binding) ở thời điểm biên dịch (Compile-time). Khi lớp con viết static method trùng tên/tham số, nó chỉ ẩn phương thức của lớp cha (Method Hiding). Nếu thêm `@Override` compiler sẽ báo lỗi!",
      "textEn": "Can a static method in Java be Overridden by a subclass?",
      "optionsEn": [
        "Yes, static methods can be overridden with dynamic polymorphism just like instance methods",
        "No. Declaring a method with the same signature in a subclass only hides the parent method (Method Hiding) and is bound at compile-time",
        "Only when the static method is marked protected",
        "Yes, provided the @Override annotation is explicitly attached"
      ]
    },
    {
      "id": "ijc07",
      "topic": "javacore",
      "text": "Nếu thêm một đối tượng vào HashSet, sau đó thay đổi giá trị thuộc tính tham gia tính toán hashCode() của đối tượng đó, thì khi gọi hashSet.contains(object) sẽ trả về kết quả gì?",
      "options": [
        "Luôn trả về true",
        "Thường trả về false vì hash code mới sẽ trỏ tới bucket khác, khiến HashSet không tìm thấy đối tượng dù nó vẫn đang nằm trong tập hợp (hiện tượng đối tượng bị kẹt / rò rỉ bộ nhớ)",
        "Ném ngoại lệ ConcurrentModificationException",
        "HashSet tự động cập nhật lại vị trí bucket của đối tượng"
      ],
      "answer": 1,
      "explanation": "• `HashSet` dựa vào `hashCode()` để tìm bucket index, rồi mới dùng `equals()` so sánh.\n• Khi bạn sửa thuộc tính tham gia tính `hashCode()`, mã băm mới sẽ trỏ tới một bucket khác. Khi gọi `contains()`, HashSet tìm ở bucket mới (vốn đang rỗng) nên trả về `false`!\n💡 Quy tắc vàng phỏng vấn: Các đối tượng dùng làm Key trong `HashMap` hoặc phần tử trong `HashSet` PHẢI là **Immutable** (Bất biến)!",
      "textEn": "If an object is added to a HashSet, and then the field used to compute its hashCode() is modified, what happens when calling set.contains(obj)?",
      "optionsEn": [
        "Always returns true because the object reference in memory has not changed",
        "Likely returns false because the new hashCode points to a different bucket in the hash table, potentially causing a memory leak",
        "Throws an InvalidKeyException",
        "HashSet automatically recomputes and updates the hash table instantly"
      ]
    },
    {
      "id": "ijc08",
      "topic": "javacore",
      "text": "Phân biệt Checked Exception và Unchecked Exception trong ngôn ngữ Java?",
      "options": [
        "Checked Exception kế thừa từ RuntimeException; Unchecked Exception kế thừa từ Exception",
        "Checked Exception là các lỗi kế thừa từ Exception (ngoại trừ RuntimeException), bắt buộc phải bắt (try-catch) hoặc khai báo (throws) lúc biên dịch (ví dụ: IOException, SQLException); Unchecked Exception kế thừa từ RuntimeException, xảy ra do lỗi logic lập trình và không bắt buộc khai báo lúc biên dịch (ví dụ: NullPointerException, ArrayIndexOutOfBoundsException)",
        "Unchecked Exception là các lỗi phần cứng như OutOfMemoryError, StackOverflowError",
        "Checked Exception chỉ xảy ra ở Java phiên bản cũ"
      ],
      "answer": 1,
      "explanation": "• Checked Exception: Trình biên dịch bắt buộc lập trình viên phải xử lý (`try-catch` hoặc `throws`) trước khi compile (ví dụ: `FileNotFoundException`, `SQLException`).\n• Unchecked Exception (`RuntimeException` và con cháu): Thường do lỗi lập trình logic (chia cho 0 `ArithmeticException`, con trỏ null `NullPointerException`), không bắt buộc khai báo ở compile-time.",
      "textEn": "What is the difference between Checked Exception and Unchecked Exception in Java?",
      "optionsEn": [
        "Checked Exceptions (inherit from Exception but not RuntimeException) are checked at compile time and MUST be handled via try-catch or throws; Unchecked Exceptions (inherit from RuntimeException/Error) occur at runtime and are not required to be caught",
        "Unchecked Exceptions must be declared using the throws keyword, while Checked Exceptions do not",
        "Checked Exceptions can never be caught using a try-catch block",
        "RuntimeException is a Checked Exception"
      ]
    },
    {
      "id": "ijc09",
      "topic": "javacore",
      "text": "Sự khác biệt giữa map() và flatMap() trong Java 8 Stream API là gì?",
      "options": [
        "map() dùng để lọc phần tử, flatMap() dùng để biến đổi phần tử",
        "map() chuyển đổi từng phần tử thành một giá trị mới (tỉ lệ 1-1); flatMap() chuyển đổi từng phần tử thành một Stream các giá trị rồi 'làm phẳng' (flatten) các Stream con đó thành một Stream duy nhất (tỉ lệ 1-nhiều)",
        "flatMap() chỉ dùng được với kiểu dữ liệu nguyên thủy như int, float",
        "map() chạy song song (Parallel), flatMap() chạy tuần tự"
      ],
      "answer": 1,
      "explanation": "• `map(x -> f(x))`: Ánh xạ 1 giá trị thành 1 giá trị mới. Ví dụ: List<Student> -> map(Student::getName) -> List<String>.\n• `flatMap(x -> f(x).stream())`: Biến đổi và làm phẳng. Ví dụ: Một đơn hàng có List<Item>. Danh sách đơn hàng `List<Order>` dùng flatMap sẽ gom toàn bộ Item của tất cả đơn hàng thành `Stream<Item>` duy nhất thay vì `Stream<List<Item>>` lồng nhau.",
      "textEn": "What is the key difference between map() and flatMap() in Java 8 Stream API?",
      "optionsEn": [
        "map() transforms each element into another value (1-to-1); flatMap() transforms each element into a Stream and flattens multiple streams into a single stream (1-to-N flattening)",
        "map() operates on parallel streams; flatMap() only operates on sequential streams",
        "map() filters elements; flatMap() changes the type of elements",
        "There is no difference; flatMap() is merely deprecated syntax for map()"
      ]
    },
    {
      "id": "ijc10",
      "topic": "javacore",
      "text": "Cơ chế Try-with-resources trong Java 7+ yêu cầu tài nguyên (resource) phải implement interface nào để tự động đóng?",
      "options": [
        "java.io.Closeable hoặc java.lang.AutoCloseable",
        "java.io.Serializable",
        "java.lang.Cloneable",
        "java.util.Disposable"
      ],
      "answer": 0,
      "explanation": "Trong cú pháp: `try (Connection conn = ...; PreparedStatement ps = ...) { ... }`, bất kỳ đối tượng nào khai báo trong ngoặc tròn bắt buộc phải implement interface `java.lang.AutoCloseable` (hoặc `java.io.Closeable`). Khi khối try kết thúc, hàm `close()` sẽ được tự động gọi theo thứ tự ngược lại.",
      "textEn": "What requirement must a resource satisfy to be used within Java 7+ Try-with-resources statement?",
      "optionsEn": [
        "Must implement the java.lang.AutoCloseable or java.io.Closeable interface",
        "Must implement java.io.Serializable interface",
        "Must declare a static void close() method",
        "Must be instantiated using a Singleton design pattern"
      ]
    },
    {
      "id": "ijc11",
      "topic": "javacore",
      "text": "So sánh hiệu năng và đặc tính giữa String, StringBuilder và StringBuffer?",
      "options": [
        "String là mutable; StringBuilder và StringBuffer là immutable",
        "String là immutable (bất biến, mỗi lần nối chuỗi tạo đối tượng mới trên Heap); StringBuilder là mutable, không thread-safe nhưng tốc độ nối chuỗi nhanh nhất; StringBuffer là mutable, thread-safe (các method có synchronized) nên an toàn đa luồng nhưng chậm hơn StringBuilder",
        "StringBuffer chạy nhanh hơn StringBuilder trong môi trường đa luồng",
        "Cả ba đều có tốc độ như nhau từ Java 11 trở đi"
      ],
      "answer": 1,
      "explanation": "• `String`: Bất biến (Immutable), an toàn cho String Pool và đa luồng, nhưng nếu nối chuỗi trong vòng lặp `for` sẽ tạo hàng nghìn object rác làm chậm bộ nhớ.\n• `StringBuilder`: Khả biến (Mutable), không đồng bộ (Not thread-safe), tốc độ cao nhất -> Dùng trong 1 thread / hàm.\n• `StringBuffer`: Khả biến (Mutable), có từ khóa `synchronized` -> Thread-safe, an toàn khi nhiều luồng cùng thao tác.",
      "textEn": "Compare the performance and characteristics among String, StringBuilder, and StringBuffer in Java?",
      "optionsEn": [
        "String is immutable (thread-safe, creates new object on concatenation); StringBuilder is mutable (not thread-safe, fastest concatenation); StringBuffer is mutable (thread-safe via synchronized methods, slower than StringBuilder)",
        "StringBuilder is immutable; String and StringBuffer are mutable",
        "StringBuffer runs faster than StringBuilder in single-threaded environments",
        "All three have identical performance and memory overhead"
      ]
    }
  ]
};
export const interviewSpring = {
  "slug": "interview-spring",
  "title": "Phỏng Vấn: Spring Boot & Backend REST API",
  "description": "Spring vs Spring Boot, Bean Lifecycle, Dependency Injection, Request Flow, REST API, CORS, Exception Handling.",
  "icon": "🍃",
  "color": "#10b981",
  "order": 12,
  "questions": [
    {
      "id": "isp01",
      "topic": "spring",
      "text": "Điểm khác biệt lớn nhất giữa Spring Boot và Spring Framework thuần là gì?",
      "options": [
        "Spring Boot dùng ngôn ngữ lập trình khác với Spring Framework",
        "Spring Boot cung cấp tính năng Tự động cấu hình (Auto-Configuration), máy chủ nhúng sẵn (Embedded Tomcat/Jetty), các gói phụ thuộc rút gọn (Starter Dependencies) giúp tạo ứng dụng chạy ngay độc lập mà không cần cấu hình XML phức tạp",
        "Spring Boot không hỗ trợ mô hình MVC hay kết nối cơ sở dữ liệu",
        "Spring Boot chỉ chạy được trên nền tảng đám mây AWS"
      ],
      "answer": 1,
      "explanation": "• Spring Framework thuần đòi hỏi cấu hình thủ công rất nhiều qua file XML hoặc class Config (DataSource, DispatcherServlet, ViewResolver...).\n• Spring Boot với phương châm 'Opinionated Defaults' tự động dò tìm dependencies trong classpath để cấu hình tự động (Auto-Configuration), tích hợp sẵn Web Server nhúng (Tomcat) giúp đóng gói thành 1 file JAR duy nhất (`java -jar app.jar`).",
      "textEn": "What is the most significant difference between Spring Boot and the traditional Spring Framework?",
      "optionsEn": [
        "Spring Boot is a completely new language that replaces Java",
        "Spring Boot provides Auto-configuration, Starter dependencies, and an Embedded Web Server (Tomcat/Jetty), eliminating complex XML configuration",
        "Spring Framework does not support Dependency Injection; only Spring Boot does",
        "Spring Boot can only be used for building microservices, not monolithic web applications"
      ]
    },
    {
      "id": "isp02",
      "topic": "spring",
      "text": "Trình tự các giai đoạn chính trong Vòng đời của một Bean (Bean Lifecycle) trong Spring IoC Container là gì?",
      "options": [
        "Destroy -> Initialize -> Instantiate -> Populate Properties",
        "Khởi tạo Instance -> Tiêm phụ thuộc (Populate Properties) -> Gọi các Aware interfaces -> BeanPostProcessor (Before Init) -> Khởi tạo (@PostConstruct/InitializingBean) -> BeanPostProcessor (After Init) -> Sẵn sàng sử dụng (Ready) -> Hủy bỏ (@PreDestroy/DisposableBean)",
        "Load DB -> Render View -> Destroy",
        "Compile -> Bytecode -> Run -> Garbage Collect"
      ],
      "answer": 1,
      "explanation": "Vòng đời đầy đủ của Bean trong Spring IoC:\n1. Instantiate: Khởi tạo instance bằng constructor.\n2. Populate Properties: Tiêm các dependency (@Autowired).\n3. BeanNameAware / BeanFactoryAware.\n4. BeanPostProcessor - postProcessBeforeInitialization.\n5. @PostConstruct / InitializingBean.afterPropertiesSet().\n6. BeanPostProcessor - postProcessAfterInitialization (nơi tạo Proxy cho AOP/Transactional).\n7. Ready: Bean sẵn sàng phục vụ.\n8. Container Shutdown -> @PreDestroy / DisposableBean.destroy().",
      "textEn": "What is the sequence of key phases in a Spring Bean's Lifecycle?",
      "optionsEn": [
        "Instantiation -> Populate Properties -> BeanNameAware / BeanFactoryAware -> BeanPostProcessor (Before Init) -> @PostConstruct / init-method -> BeanPostProcessor (After Init) -> Ready for Use -> @PreDestroy / destroy",
        "Destroy -> Instantiation -> PostConstruct -> BeanPostProcessor",
        "Init-method -> Instantiation -> Populate Properties -> Destroy",
        "BeanPostProcessor -> Instantiation -> Destroy"
      ]
    },
    {
      "id": "isp03",
      "topic": "spring",
      "text": "Trong Spring Boot, có những cách nào để thực hiện Dependency Injection (DI) và cách nào được Spring Team khuyến nghị sử dụng nhất?",
      "options": [
        "Field Injection (@Autowired trên biến), Setter Injection, Constructor Injection. Khuyên dùng Constructor Injection nhất",
        "Chỉ có 1 cách duy nhất là Field Injection",
        "Khuyên dùng Field Injection vì viết code ngắn gọn nhất",
        "Khuyên dùng Setter Injection vì linh hoạt thay đổi được sau khi khởi tạo"
      ],
      "answer": 0,
      "explanation": "Spring hỗ trợ 3 cách DI:\n1. Field Injection: `@Autowired private Service s;` (Dễ viết nhưng khó viết Unit Test độc lập và dễ che giấu lỗi phụ thuộc vòng Circular Dependency).\n2. Setter Injection: Dùng setter method (phù hợp với optional dependency).\n3. Constructor Injection (KHUYẾN NGHỊ): Giúp dependency là `final` (bất biến), đảm bảo object không bao giờ ở trạng thái null khi khởi tạo, và dễ dàng viết Unit Test mà không cần Spring Container.",
      "textEn": "What are the ways to achieve Dependency Injection in Spring Boot, and which is recommended as best practice?",
      "optionsEn": [
        "Field Injection (@Autowired on field), Setter Injection, and Constructor Injection. Constructor Injection is the recommended best practice because it enforces immutability (final fields) and simplifies unit testing without mocking Spring container",
        "Field Injection is the recommended best practice because it requires writing the least code",
        "Setter Injection is always the only supported injection mechanism in Spring Boot",
        "Spring Boot does not support Constructor Injection"
      ]
    },
    {
      "id": "isp04",
      "topic": "spring",
      "text": "Luồng xử lý của một HTTP Request gửi đến ứng dụng Spring Boot diễn ra theo thứ tự nào?",
      "options": [
        "Controller -> Database -> Service -> DispatcherServlet",
        "Client -> Filter Chain -> DispatcherServlet -> HandlerMapping -> Interceptor (preHandle) -> Controller -> Service -> Repository -> Database -> Response JSON qua HttpMessageConverter",
        "Client -> Repository -> Service -> Controller",
        "DispatcherServlet -> Service -> Controller -> Database"
      ],
      "answer": 1,
      "explanation": "Luồng chi tiết của Request trong Spring Boot:\n1. Request qua bộ lọc Servlet Filters (ví dụ: Spring Security Filter).\n2. Đi vào `DispatcherServlet` (Front Controller).\n3. Tra cứu `HandlerMapping` để tìm Controller và hàm xử lý tương ứng.\n4. Chạy qua `HandlerInterceptor` (hàm preHandle).\n5. Gọi method của `@RestController`.\n6. Controller gọi nghiệp vụ tại `@Service`.\n7. Service gọi truy vấn DB tại `@Repository` (Spring Data JPA).\n8. Kết quả trả về được `HttpMessageConverter` (Jackson) serialize thành JSON gửi về Client.",
      "textEn": "What is the flow of an incoming HTTP Request in a Spring Boot MVC application?",
      "optionsEn": [
        "Client -> DispatcherServlet -> HandlerMapping -> Interceptor/Controller -> Service -> Repository (DB) -> View/ResponseBody (JSON) -> Client",
        "Client -> Controller -> DispatcherServlet -> DB",
        "Client -> Repository -> Service -> Controller",
        "Client -> Interceptor -> Repository -> View"
      ]
    },
    {
      "id": "isp05",
      "topic": "spring",
      "text": "Để xử lý ngoại lệ tập trung (Global Exception Handling) trong Spring Boot REST API theo chuẩn kiến trúc, ta sử dụng các Annotation nào?",
      "options": [
        "@RestControllerAdvice kết hợp với @ExceptionHandler",
        "@ExceptionFilter và @Catch",
        "Chỉ dùng try-catch trong từng hàm của Controller",
        "@GlobalError và @CatchAll"
      ],
      "answer": 0,
      "explanation": "• `@RestControllerAdvice`: Đánh dấu class xử lý lỗi toàn cục cho toàn bộ các Controller trong hệ thống.\n• `@ExceptionHandler(TênNgoạiLệ.class)`: Bắt chính xác loại exception đó và trả về định dạng JSON ApiResponse chuẩn (chứa timestamp, status code, error message) mà không làm lộ StackTrace nguy hiểm ra ngoài.",
      "textEn": "How is Global Exception Handling implemented centrally in a Spring Boot REST API?",
      "optionsEn": [
        "Use @ControllerAdvice (or @RestControllerAdvice) combined with @ExceptionHandler methods to catch and format exceptions into uniform response bodies",
        "Wrap every Controller method in a manual try-catch block",
        "Catch errors inside the index.html file",
        "Set server.error.include-stacktrace=always in application.properties"
      ]
    },
    {
      "id": "isp06",
      "topic": "spring",
      "text": "Lỗi CORS (Cross-Origin Resource Sharing) là gì và cách cấu hình giải quyết trong Spring Boot?",
      "options": [
        "Lỗi do cơ sở dữ liệu từ chối kết nối; giải quyết bằng cách mở port database",
        "Cơ chế bảo mật của trình duyệt chặn các request xuất phát từ một Origin (Domain/Port/Protocol) khác với Origin của server; giải quyết trong Spring Boot bằng @CrossOrigin trên Controller hoặc cấu hình bean WebMvcConfigurer / CorsFilter",
        "Lỗi do sai định dạng JSON khi gửi từ Frontend",
        "Lỗi hết hạn Token xác thực"
      ],
      "answer": 1,
      "explanation": "• CORS là cơ chế bảo mật do TRÌNH DUYỆT thực thi để ngăn chặn trang web này gửi request ngầm sang một trang web khác.\n• Ví dụ: Frontend chạy tại `http://localhost:3000` gọi sang Backend `http://localhost:8080`.\n• Cách giải quyết chuẩn trong Spring Boot: Thêm cấu hình `CorsRegistry` trong `WebMvcConfigurer` cho phép origin `http://localhost:3000` và các method GET, POST, PUT, DELETE.",
      "textEn": "What is a CORS (Cross-Origin Resource Sharing) error and how is it resolved in Spring Boot?",
      "optionsEn": [
        "A browser security mechanism blocking requests from a different origin (domain, port, protocol); resolved in Spring Boot using @CrossOrigin on controllers or configuring a WebMvcConfigurer with CorsRegistry",
        "A database connection timeout error; resolved by increasing DB pool size",
        "A syntax error caused by missing semicolons in JavaScript",
        "A hardware error caused by low available server RAM"
      ]
    }
  ]
};
export const interviewWeb = {
  "slug": "interview-web",
  "title": "Phỏng Vấn: Web & Frontend (JS, React, HTML/CSS)",
  "description": "Session vs Cookie, GET/POST/PUT, DOM & Virtual DOM, == vs ===, React Hooks, State/Props, Validation.",
  "icon": "🌐",
  "color": "#6366f1",
  "order": 13,
  "questions": [
    {
      "id": "iw01",
      "topic": "web",
      "text": "Phân biệt cơ chế lưu trữ giữa Session và Cookie trên ứng dụng Web?",
      "options": [
        "Cookie lưu ở Server; Session lưu ở Client",
        "Cookie được lưu trữ trực tiếp trên trình duyệt của người dùng (Client, dung lượng nhỏ tối đa ~4KB); Session được lưu trữ trên Server (bảo mật hơn, chứa được nhiều dữ liệu), Server nhận diện phiên của Client thông qua Session ID gửi kèm trong Cookie",
        "Cookie không bao giờ hết hạn, Session tự mất sau 5 giây",
        "Cả Cookie và Session đều được lưu trong LocalStorage"
      ],
      "answer": 1,
      "explanation": "• Cookie: Lưu ở Browser, dung lượng nhỏ (~4KB), gửi kèm tự động trong header HTTP mỗi khi gọi request. Thuộc tính `HttpOnly` ngăn chặn JavaScript truy cập (chống XSS), `SameSite` chống CSRF.\n• Session: Lưu trữ dữ liệu phiên đăng nhập trên RAM của Server hoặc Redis. Server cấp cho client một `SessionId` (thường lưu trong cookie `JSESSIONID`).",
      "textEn": "What is the difference between Session and Cookie storage mechanisms in web applications?",
      "optionsEn": [
        "Cookie is stored on the client browser (size limit ~4KB, sent with HTTP headers); Session is stored securely on the web server (stores sensitive user state, identified via a session ID cookie)",
        "Session is stored on client browser; Cookie is stored on database server",
        "Cookies can never expire; Sessions expire immediately on every page reload",
        "Cookies can store up to 50MB of data"
      ]
    },
    {
      "id": "iw02",
      "topic": "web",
      "text": "So sánh các phương thức HTTP: GET, POST và PUT trong RESTful API?",
      "options": [
        "GET dùng để tạo mới; POST dùng để lấy dữ liệu; PUT dùng để xoá",
        "GET: Lấy dữ liệu, tham số gửi qua Query URL, có thể cache, idempotent (gọi nhiều lần liên tiếp không làm đổi trạng thái server); POST: Tạo mới tài nguyên, dữ liệu gửi trong Request Body, không idempotent; PUT: Cập nhật / thay thế toàn bộ tài nguyên, có tính idempotent",
        "GET bảo mật hơn POST vì không thấy dữ liệu trong body",
        "PUT chỉ dùng được với các file hình ảnh lớn"
      ],
      "answer": 1,
      "explanation": "💡 Khái niệm Idempotent rất hay hỏi:\n• `Idempotent`: Thao tác gọi 1 lần hay n lần liên tiếp thì trạng thái hệ thống vẫn y như vậy (`GET`, `PUT`, `DELETE` là idempotent).\n• `POST`: Không idempotent (mỗi lần submit form sẽ tạo thêm 1 bản ghi mới).\n• `PUT` thay thế toàn bộ bản ghi; nếu muốn cập nhật một phần thuộc tính nên dùng `PATCH`.",
      "textEn": "Compare HTTP methods: GET, POST, and PUT in RESTful API design?",
      "optionsEn": [
        "GET retrieves data (idempotent, parameters in URL query string, cacheable); POST creates new resources (non-idempotent, payload in body); PUT updates/replaces an entire existing resource (idempotent)",
        "GET is used to delete records; POST is used to retrieve records",
        "POST is idempotent; PUT is not idempotent",
        "All three methods have identical behavior and can be swapped arbitrarily"
      ]
    },
    {
      "id": "iw03",
      "topic": "web",
      "text": "Trong ngôn ngữ JavaScript, sự khác biệt giữa toán tử == và === là gì?",
      "options": [
        "== là so sánh gán giá trị; === là so sánh bằng",
        "== là so sánh lỏng lẻo (loose equality) - tự động ép kiểu dữ liệu (Type Coercion) trước khi so sánh; === là so sánh nghiêm ngặt (strict equality) - yêu cầu cả kiểu dữ liệu lẫn giá trị phải giống nhau mà không hề ép kiểu",
        "=== chạy chậm hơn == rất nhiều",
        "Cả hai cho kết quả giống hệt nhau trong mọi trường hợp"
      ],
      "answer": 1,
      "explanation": "• `==` (ép kiểu ngầm định): `5 == '5'` -> `true`; `false == 0` -> `true`; `null == undefined` -> `true`.\n• `===` (so sánh nghiêm ngặt): `5 === '5'` -> `false` (vì `number !== string`); `null === undefined` -> `false`.\n=> Trong dự án thực tế luôn luôn dùng `===` để tránh bẫy ép kiểu quái dị của JavaScript.",
      "textEn": "In JavaScript, what is the difference between the equality operator == and strict equality operator ===?",
      "optionsEn": [
        "== performs type coercion before comparison; === compares both value and type without conversion (strict equality)",
        "=== converts strings to numbers before comparison",
        "== is only used for numbers, === is used for strings",
        "There is no difference in modern ES6 JavaScript"
      ]
    },
    {
      "id": "iw04",
      "topic": "web",
      "text": "Virtual DOM trong thư viện React là gì và cơ chế hoạt động của nó như thế nào?",
      "options": [
        "Virtual DOM là bản sao lưu dưới database của giao diện web",
        "Virtual DOM là một bản biểu diễn trừu tượng của Real DOM dưới dạng JavaScript Object nằm trong bộ nhớ; khi state thay đổi, React so sánh Virtual DOM mới và cũ (thuật toán Diffing) rồi chỉ cập nhật phần tử thực sự thay đổi lên Real DOM (Reconciliation / Batching) giúp tăng hiệu năng render",
        "Virtual DOM thao tác trực tiếp với phần cứng màn hình nên nhanh hơn Real DOM hàng nghìn lần",
        "Virtual DOM làm ứng dụng tốn bộ nhớ hơn và không có lợi ích gì đáng kể"
      ],
      "answer": 1,
      "explanation": "• Thao tác trực tiếp với Real DOM của trình duyệt rất tốn kém tài nguyên vì kích hoạt quá trình tính toán lại layout (Reflow) và vẽ lại pixel (Repaint).\n• React tạo Virtual DOM trên RAM (nhẹ hơn DOM thật rất nhiều), khi state thay đổi nó dùng thuật toán Diffing tìm ra phần khác biệt nhỏ nhất và cập nhật hàng loạt (Batching) lên Real DOM.",
      "textEn": "What is the Virtual DOM in React and how does it optimize UI performance?",
      "optionsEn": [
        "A lightweight virtual in-memory copy of the real DOM. When state changes, React updates Virtual DOM, computes differences (Diffing Algorithm / Reconciliation), and updates only the modified nodes in the Real DOM in batches",
        "A separate browser window used to render HTML",
        "A database table used to store React component state",
        "A plugin that completely replaces the browser DOM engine"
      ]
    },
    {
      "id": "iw05",
      "topic": "web",
      "text": "Trong React, phân biệt giữa State và Props?",
      "options": [
        "State truyền từ cha xuống con; Props lưu dữ liệu nội bộ",
        "Props (Properties) là dữ liệu truyền từ component cha xuống component con, component con chỉ đọc (Read-only / Immutable); State là dữ liệu trạng thái nội tại do chính component đó quản lý và có thể thay đổi được qua các hàm cập nhật (như useState)",
        "Props có thể thay đổi trực tiếp bằng lệnh gán this.props = ...",
        "Chỉ có Class Component mới có State, Functional Component không thể có State"
      ],
      "answer": 1,
      "explanation": "• `Props`: Do cha truyền xuống con. Con không được phép thay đổi props của mình (đảm bảo luồng dữ liệu 1 chiều One-way Data Flow).\n• `State`: Dữ liệu nội tại của component. Khi state thay đổi (qua `setState` hoặc `setX`), component và các con của nó sẽ re-render.",
      "textEn": "In React, what is the difference between State and Props?",
      "optionsEn": [
        "Props are inputs passed down from parent components (immutable to the receiving component); State is managed internally within a component and can change over time via setState / useState",
        "Props can be modified directly; State is read-only",
        "State can only be used in Functional components, Props only in Class components",
        "There is no difference; Props and State are synonyms in React"
      ]
    },
    {
      "id": "iw06",
      "topic": "web",
      "text": "Khi xây dựng form nhập liệu, việc kiểm tra tính hợp lệ của dữ liệu (Validation) nên thực hiện ở phía Client hay phía Server?",
      "options": [
        "Chỉ cần làm ở Client là đủ vì đã có JavaScript chặn người dùng",
        "Chỉ cần làm ở Server vì Client không quan trọng",
        "Bắt buộc phải làm ở cả hai phía: Client Validation giúp phản hồi tức thì và nâng cao trải nghiệm người dùng (UX); Server Validation là chốt chặn bắt buộc vì bảo mật (người dùng có thể bypass client bằng Postman, cURL hoặc tắt JavaScript)",
        "Làm ở đâu cũng được, phụ thuộc vào sở thích của lập trình viên"
      ],
      "answer": 2,
      "explanation": "💡 Nguyên tắc vàng bảo mật phần mềm: 'Never trust user input'.\n• Phía Client có thể bị vượt qua dễ dàng bằng cách gọi thẳng API bằng Postman, tắt JS trên trình duyệt hoặc sửa DOM trong DevTools.\n• Do đó, Server Validation là bắt buộc sống còn để chống SQL Injection, dữ liệu hỏng. Client validation để tăng tốc độ phản hồi cho người dùng.",
      "textEn": "When building input forms, why is client-side validation alone insufficient?",
      "optionsEn": [
        "Because client-side validation can be easily bypassed (using Postman, curl, or disabling JS); server-side validation is strictly required for data integrity and system security",
        "Client-side validation causes database crashes",
        "Browsers do not support validating text input fields",
        "Server-side validation is only needed when using microservices"
      ]
    }
  ]
};
export const interviewDevOps = {
  "slug": "interview-devops",
  "title": "Phỏng Vấn: Git, Testing & Quy Trình Dự Án",
  "description": "Git conflicts, Unit test, Test cases, CI/CD, SDLC, Scrum vs Waterfall, Dev/Staging/Prod.",
  "icon": "🛠️",
  "color": "#ec4899",
  "order": 14,
  "questions": [
    {
      "id": "idv01",
      "topic": "devops",
      "text": "Khi thực hiện git merge nhánh tính năng vào nhánh chính và xảy ra Git Conflict (Xung đột mã nguồn), quy trình xử lý chuẩn là gì?",
      "options": [
        "Xoá luôn nhánh chính và tạo lại từ đầu",
        "Dùng cờ --force để ghi đè mã nguồn của người khác",
        "Mở các file bị conflict, trao đổi với đồng đội viết đoạn code đó, chỉnh sửa giữ lại mã nguồn chính xác nhất (xoá các dấu <<<<<<<, =======, >>>>>>>), lưu file, chạy git add <file>, sau đó chạy git commit để hoàn tất merge",
        "Đóng IDE lại và không đẩy code lên nữa"
      ],
      "answer": 2,
      "explanation": "• Xung đột (Conflict) xảy ra khi 2 lập trình viên cùng chỉnh sửa trên cùng 1 dòng của 1 file.\n• Quy trình chuẩn: Dùng công cụ giải quyết xung đột (VS Code / Git Merge Tool), xem xét sự khác biệt, trao đổi với đồng nghiệp nếu cần, chọn phiên bản code đúng, xoá marker conflict, `git add` và commit.",
      "textEn": "When performing a git merge and encountering a Merge Conflict, what is the standard resolution process?",
      "optionsEn": [
        "Identify conflicting files with `git status`, manually resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), stage files with `git add`, and finalize with `git commit`",
        "Delete the local repository and clone from remote again",
        "Force push with `git push -f` to overwrite remote changes",
        "Run `git reset --hard` to abandon all teammates' commits"
      ]
    },
    {
      "id": "idv02",
      "topic": "devops",
      "text": "Unit Test là gì và tại sao cần viết Unit Test trong dự án phần mềm?",
      "options": [
        "Là việc kiểm thử toàn bộ hệ thống từ giao diện người dùng đến database trên môi trường Production",
        "Là việc kiểm thử từng đơn vị mã nguồn nhỏ nhất (thường là một method hoặc class) một cách độc lập và cô lập với các phụ thuộc bên ngoài (bằng cách Mocking như Mockito); giúp phát hiện lỗi sớm, tự tin refactor code và đảm bảo chất lượng phần mềm",
        "Là bài test do khách hàng kiểm tra trước khi thanh toán hợp đồng",
        "Là công cụ tự động viết code thay cho lập trình viên"
      ],
      "answer": 1,
      "explanation": "• Unit Test tập trung vào logic của 1 hàm đơn lẻ, chạy cực nhanh (mili-giây), dùng mock để giả lập database/service phụ thuộc (sử dụng JUnit 5 + Mockito trong Java).\n• Lợi ích lớn nhất: Giúp lập trình viên tự tin nâng cấp, tối ưu hóa (refactor) mà không sợ làm hỏng tính năng cũ (Regression testing).",
      "textEn": "What is a Unit Test and why is writing Unit Tests critical in professional software projects?",
      "optionsEn": [
        "Automated tests that verify individual units of code (such as a single method or class) in isolation (often mocking dependencies), helping catch regressions early, improve design, and enable confident refactoring",
        "Manual tests executed by QA testing engineers before release",
        "Load testing the production server under 10,000 concurrent users",
        "Tests checking the visual appearance of CSS buttons across mobile devices"
      ]
    },
    {
      "id": "idv03",
      "topic": "devops",
      "text": "Trong mô hình phát triển phần mềm Scrum, một chu kỳ Sprint thường kéo dài bao lâu và gồm những sự kiện (Scrum Events) chính nào?",
      "options": [
        "Kéo dài 1 năm, chỉ có sự kiện báo cáo cuối năm",
        "Thường kéo dài từ 1 đến 4 tuần (phổ biến nhất là 2 tuần); bao gồm 4 sự kiện chính: Sprint Planning (Lập kế hoạch), Daily Standup (Họp hằng ngày 15 phút), Sprint Review (Demo sản phẩm) và Sprint Retrospective (Họp cải tiến quy trình)",
        "Kéo dài vô tận đến khi nào xong toàn bộ dự án",
        "Chỉ gồm việc viết tài liệu và không cần lập trình"
      ],
      "answer": 1,
      "explanation": "Khung làm việc Scrum:\n1. Sprint Planning: Chọn các Task từ Product Backlog đưa vào Sprint Backlog.\n2. Daily Scrum (Standup): 15 phút mỗi ngày (Hôm qua làm gì? Hôm nay làm gì? Có khó khăn gì không?).\n3. Sprint Review: Trình diễn (demo) sản phẩm hoàn thiện cho Product Owner và Stakeholders.\n4. Sprint Retrospective: Cả team họp đúc rút kinh nghiệm (Cái gì làm tốt? Cái gì cần cải thiện?).",
      "textEn": "In the Scrum software development framework, how long does a typical Sprint cycle last?",
      "optionsEn": [
        "Typically 1 to 4 weeks (most commonly 2 weeks), ending with a potentially shippable product increment",
        "Exactly 6 months to 1 year",
        "1 single day only",
        "There is no fixed timebox; a sprint ends whenever developers finish writing code"
      ]
    },
    {
      "id": "idv04",
      "topic": "devops",
      "text": "Để thiết kế test cases cho chức năng Đăng Nhập (Login), một kỹ sư phần mềm cần bao quát những trường hợp nào?",
      "options": [
        "Chỉ cần test 1 trường hợp đăng nhập đúng tài khoản và mật khẩu",
        "Bao quát: Happy Path (đúng user/pass), Sai mật khẩu, Tài khoản không tồn tại, Để trống trường input, Nhập khoảng trắng, Nhập ký tự đặc biệt / SQL Injection, Tài khoản bị khóa (banned), Giới hạn số lần thử sai (Rate limit / Brute force), Nhớ mật khẩu (Remember me)",
        "Chỉ cần test giao diện trên điện thoại di động",
        "Chỉ test xem nút bấm có màu xanh không"
      ],
      "answer": 1,
      "explanation": "💡 Thể hiện tư duy kiểm thử (Testing Mindset) toàn diện:\n• Functional: Đúng pass -> vào trang chủ; Sai pass -> thông báo lỗi phù hợp.\n• Boundary/Edge: Tên quá dài, ký tự unicode, để trống.\n• Security: Thử SQL Injection (`' OR 1=1 --`), mã hóa password bcrypt, bảo vệ brute-force khóa tài khoản sau 5 lần nhập sai.",
      "textEn": "To design comprehensive test cases for a Login feature, what categories must be covered?",
      "optionsEn": [
        "Positive cases (valid credentials), Negative cases (wrong password, non-existent username, blank inputs, special characters/SQL injection), and Non-functional cases (rate limiting, password masking, remember me)",
        "Only test with a correct admin username and password",
        "Only test how fast the login button animates",
        "Only test login on a single Chrome browser version"
      ]
    },
    {
      "id": "idv05",
      "topic": "devops",
      "text": "Các môi trường chạy dự án thông thường gồm những môi trường nào và vai trò của file cấu hình prod.env là gì?",
      "options": [
        "Chỉ có 1 môi trường duy nhất chạy trên máy tính của lập trình viên",
        "Thường gồm: Development (môi trường lập trình local), Staging/UAT (môi trường thử nghiệm giả lập Production để QA test và khách hàng nghiệm thu), Production (môi trường thực tế cho người dùng cuối). File prod.env chứa cấu hình biến môi trường riêng biệt (DB production, domain live, API keys bảo mật) cho môi trường Production",
        "prod.env là file mã nguồn chứa logic xử lý thanh toán",
        "Staging là nơi lưu trữ backup mã nguồn khi bị mất điện"
      ],
      "answer": 1,
      "explanation": "• Dev: Chạy trên máy cá nhân, dùng DB local/docker.\n• Staging / UAT: Giống hệt môi trường thật 99%, dùng dữ liệu giả lập để kiểm thử toàn diện.\n• Production: Chạy cho khách hàng thật, yêu cầu ổn định 99.99%, backup liên tục, log giám sát chặt chẽ.",
      "textEn": "What are the standard software deployment environments in an enterprise project pipeline?",
      "optionsEn": [
        "Local (developer machine) -> DEV / SIT (development integration) -> UAT / Staging (user acceptance testing, pre-production mirror) -> PROD (live production environment)",
        "Only Local and PROD",
        "Cloud and Local only",
        "Staging only"
      ]
    }
  ]
};
export const interviewAi = {
  "slug": "interview-ai",
  "title": "Phỏng Vấn: AI, LLM & Prompt Engineering",
  "description": "LLM Architecture, API integration, Prompting techniques, Code review AI, AI agents workflow.",
  "icon": "🤖",
  "color": "#8b5cf6",
  "order": 15,
  "questions": [
    {
      "id": "iai01",
      "topic": "ai",
      "text": "LLM (Large Language Model - Mô hình Ngôn ngữ Lớn) là gì và ứng dụng thực tế của nó trong phát triển phần mềm hiện đại?",
      "options": [
        "Là một phần mềm diệt virus thông minh tự động chặn hacker",
        "Là mô hình trí tuệ nhân tạo được huấn luyện trên lượng dữ liệu văn bản khổng lồ dựa trên kiến trúc Transformer, có khả năng hiểu, sinh ngôn ngữ tự nhiên và code; ứng dụng trong sinh mã nguồn (Code generation), giải thích code, viết test tự động, tìm lỗi (Debugging) và tìm kiếm ngữ nghĩa (Semantic search)",
        "Là một hệ quản trị cơ sở dữ liệu mới thay thế cho MySQL",
        "Là một ngôn ngữ lập trình hướng đối tượng mới cạnh tranh với Java"
      ],
      "answer": 1,
      "explanation": "LLM (Gemini, Claude, GPT) sử dụng kiến trúc Transformer với cơ chế Self-Attention. Trong kỹ thuật phần mềm, LLM giúp tăng năng suất vượt bậc: chuyển mô tả nghiệp vụ thành code, tạo dữ liệu mẫu (mock data), phân tích log tìm bug, sinh tài liệu API (Swagger).",
      "textEn": "What is an LLM (Large Language Model) and how is it typically applied in software engineering?",
      "optionsEn": [
        "A deep learning AI model trained on massive text codebases to predict tokens and understand context, applied to code generation, code review, test case generation, debugging, and smart documentation",
        "A relational database optimization tool like MySQL Index",
        "A physical hardware robot that types on mechanical keyboards",
        "An antivirus software scanning computer memory for trojans"
      ]
    },
    {
      "id": "iai02",
      "topic": "ai",
      "text": "Để viết một Prompt hiệu quả cho AI giải quyết một tính năng kỹ thuật trong phần mềm, cấu trúc Prompt chuẩn cần có những thành phần nào?",
      "options": [
        "Chỉ cần viết 1 câu ngắn gọn: 'Hãy viết code cho tôi'",
        "Cấu trúc chuẩn gồm: Role (Định vị vai trò chuyên gia), Context (Ngữ cảnh dự án, công nghệ sử dụng, phiên bản), Task (Nhiệm vụ cụ thể cần làm), Constraints (Ràng buộc kỹ thuật, bảo mật, thư viện cho phép), và Output Format (Định dạng kết quả mong muốn)",
        "Viết càng nhiều từ tiếng Anh phức tạp càng tốt, không cần nói rõ công nghệ",
        "Viết bằng mã nhị phân 0 và 1"
      ],
      "answer": 1,
      "explanation": "💡 Cấu trúc Prompt chuyên nghiệp (RC-TCO Framework):\n1. Role: 'Bạn là chuyên gia Senior Java Spring Boot...'\n2. Context: 'Hệ thống dùng Java 21, Spring Boot 3.3, MySQL 8...'\n3. Task: 'Hãy viết REST API đăng ký người dùng...'\n4. Constraints: 'Không dùng Lombok, mã hóa password bằng BCrypt, validate bằng jakarta.validation...'\n5. Output: 'Chỉ trả về code Controller và DTO kèm comment tiếng Việt'.",
      "textEn": "To write an effective Prompt for an AI coding assistant, what core framework should be provided?",
      "optionsEn": [
        "Role (persona), Context (tech stack, existing architecture), Clear Task (specific goal), Constraints (libraries, forbidden patterns), and Expected Output format (code example, step-by-step diff)",
        "Write a single sentence 'write code for me' without any details",
        "Paste entire gigabytes of source code into prompt without instructions",
        "Only use prompts written in Python language"
      ]
    },
    {
      "id": "iai03",
      "topic": "ai",
      "text": "Khi sử dụng code do AI tạo ra (AI-generated code), người lập trình viên cần làm gì để đảm bảo an toàn và chất lượng phần mềm?",
      "options": [
        "Sao chép và dán trực tiếp vào dự án mà không cần đọc lại vì AI không bao giờ sai",
        "Đọc hiểu cẩn thận từng dòng code, kiểm tra tính bảo mật (lỗ hổng bảo mật, leak secret key), chạy Unit Test kiểm chứng, kiểm tra xem code có tuân thủ đúng kiến trúc dự án và chạy thử nghiệm trước khi commit",
        "Chỉ kiểm tra xem code có ngắn hay không",
        "Yêu cầu AI tự ký cam kết bảo hành phần mềm"
      ],
      "answer": 1,
      "explanation": "Lập trình viên là người chịu trách nhiệm cuối cùng (Responsible AI). AI có thể sinh ra code lỗi thời, thư viện bị deprecate, hoặc thậm chí sinh ra lỗ hổng bảo mật nghiêm trọng (SQL Injection, hardcoded password). Bắt buộc phải Code Review kỹ càng và chạy Test trước khi đưa vào codebase.",
      "textEn": "When using code generated by AI, what principle must developers always maintain?",
      "optionsEn": [
        "Review every line of code, verify security vulnerabilities/hallucinations, run automated tests, and ensure full understanding before committing to production",
        "Copy and paste code directly into production without testing since AI never makes errors",
        "Hide AI usage from teammates and commit without checking",
        "Never use AI for any programming tasks whatsoever"
      ]
    },
    {
      "id": "iai04",
      "topic": "ai",
      "text": "Khái niệm AI Agent trong phát triển phần mềm khác với một Chatbot AI thông thường ở điểm nào?",
      "options": [
        "AI Agent không có khả năng hiểu tiếng Việt",
        "AI Agent có khả năng tự nhận thức mục tiêu, lập kế hoạch từng bước (Reasoning & Planning), tự động sử dụng công cụ (Tool calling / Function calling như đọc ghi file, chạy command, gọi API) và tự sửa lỗi (Self-correction) để hoàn thành nhiệm vụ phức tạp mà không cần con người can thiệp từng bước",
        "AI Agent chỉ hoạt động được khi có mạng xã hội",
        "Cả hai hoàn toàn giống nhau"
      ],
      "answer": 1,
      "explanation": "• Chatbot: Chỉ nhận prompt và trả về text 1 lần (Single-turn request/response).\n• AI Agent: Có bộ nhớ (Memory), có khả năng suy nghĩ (Thought), chọn công cụ (Tool execution) như đọc file, viết code, chạy lệnh terminal, quan sát kết quả (Observation), và lặp lại vòng lặp cho đến khi hoàn thành mục tiêu tổng thể được giao.",
      "textEn": "How does an AI Agent differ from a simple AI Chatbot in software development?",
      "optionsEn": [
        "An AI Agent has agency: it can perceive its environment, formulate multi-step plans, autonomously invoke tools (terminal, file edits, git, browser, APIs), observe outcomes, and self-correct until reaching a defined goal",
        "An AI Agent is merely a chatbot that responds with emojis",
        "An AI Agent only runs on mobile phones",
        "There is no difference; Agent is purely a marketing buzzword"
      ]
    }
  ]
};
export const interviewAll = {
  "slug": "interview-all",
  "title": "Tổng Hợp Câu Hỏi Phỏng Vấn 1-1",
  "description": "Bộ đề tổng hợp 48 câu hỏi phỏng vấn 1-1 bao trọn: SQL, Java Core, Spring Boot, Web Frontend, Git & AI.",
  "icon": "🎯",
  "color": "#ef4444",
  "order": 9,
  "questions": [
    {
      "id": "isql01",
      "topic": "sql",
      "text": "Phân biệt INNER JOIN và LEFT JOIN trong SQL?",
      "options": [
        "INNER JOIN trả về tất cả các dòng của cả hai bảng; LEFT JOIN chỉ trả về các dòng khớp nhau",
        "INNER JOIN chỉ trả về các dòng có điều kiện kết nối khớp ở cả 2 bảng; LEFT JOIN trả về toàn bộ dòng từ bảng bên trái và các dòng khớp từ bảng bên phải (nếu không khớp thì giá trị bên phải là NULL)",
        "LEFT JOIN bắt buộc phải có khóa ngoại (Foreign Key), INNER JOIN thì không cần",
        "Cả hai có kết quả giống nhau, chỉ khác về tốc độ thực thi"
      ],
      "answer": 1,
      "explanation": "• INNER JOIN: Chỉ lấy giao điểm (intersection) giữa 2 bảng.\n• LEFT JOIN (LEFT OUTER JOIN): Giữ nguyên 100% dòng của bảng trái. Bảng phải không có dữ liệu tương ứng sẽ điền NULL.\n💡 Mẹo phỏng vấn: Khi nhà tuyển dụng hỏi 'Làm sao tìm những khách hàng CHƯA từng đặt đơn hàng nào?', câu trả lời chuẩn là dùng LEFT JOIN bảng Customers với Orders và kiểm tra `WHERE Orders.id IS NULL` (hoặc dùng NOT EXISTS).",
      "textEn": "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
      "optionsEn": [
        "INNER JOIN returns all rows from both tables; LEFT JOIN only returns matching rows",
        "INNER JOIN only returns rows where the join condition matches in both tables; LEFT JOIN returns all rows from the left table and matched rows from the right table (with NULL for non-matches)",
        "LEFT JOIN requires a Foreign Key, while INNER JOIN does not",
        "Both produce the same result, differing only in execution speed"
      ]
    },
    {
      "id": "isql02",
      "topic": "sql",
      "text": "Phân biệt mệnh đề WHERE và HAVING trong câu lệnh truy vấn SQL?",
      "options": [
        "WHERE dùng để lọc các nhóm sau khi GROUP BY; HAVING dùng để lọc từng dòng trước khi nhóm",
        "WHERE lọc từng bản ghi riêng lẻ trước khi thực hiện gom nhóm (GROUP BY); HAVING dùng để lọc các nhóm sau khi đã gom nhóm và có thể sử dụng các hàm tổng hợp (Aggregate Functions như COUNT, SUM, AVG)",
        "HAVING có thể dùng độc lập mà không cần GROUP BY và chạy nhanh hơn WHERE",
        "WHERE chỉ áp dụng cho kiểu số, HAVING áp dụng cho kiểu chuỗi"
      ],
      "answer": 1,
      "explanation": "• WHERE: Lọc dữ liệu ở cấp độ từng row trước khi nhóm. WHERE không được chứa hàm tổng hợp (ví dụ: `WHERE COUNT(*) > 5` sẽ báo lỗi cú pháp).\n• HAVING: Lọc ở cấp độ group sau khi đã tính toán hàm tổng hợp (ví dụ: `HAVING COUNT(*) >= 2`).",
      "textEn": "What is the difference between WHERE and HAVING clauses in an SQL query?",
      "optionsEn": [
        "WHERE filters groups after GROUP BY; HAVING filters individual rows before grouping",
        "WHERE filters individual rows before grouping (GROUP BY); HAVING filters groups after grouping and can use aggregate functions (such as COUNT, SUM, AVG)",
        "HAVING can be used independently without GROUP BY and runs faster than WHERE",
        "WHERE applies only to numeric types, HAVING applies to string types"
      ]
    },
    {
      "id": "isql03",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, ngay_sinh). Câu truy vấn nào lấy danh sách 10 bạn sinh viên có tuổi bé nhất?",
      "options": [
        "SELECT * FROM sinhvien ORDER BY ngay_sinh ASC LIMIT 10;",
        "SELECT * FROM sinhvien ORDER BY ngay_sinh DESC LIMIT 10;",
        "SELECT TOP 10 * FROM sinhvien WHERE ngay_sinh = MIN(ngay_sinh);",
        "SELECT * FROM sinhvien GROUP BY ngay_sinh HAVING COUNT(*) <= 10;"
      ],
      "answer": 1,
      "explanation": "• Bẫy tư duy phỏng vấn: Người có TUỔI BÉ NHẤT tức là người SINH RA GẦN ĐÂY NHẤT (ngày sinh lớn nhất / mới nhất).\n• Do đó phải sắp xếp theo ngày sinh giảm dần: `ORDER BY ngay_sinh DESC LIMIT 10`.\n• Nếu dùng ASC sẽ ra người có ngày sinh xa nhất trong quá khứ (tức là người nhiều tuổi nhất).",
      "textEn": "Given table sinhvien (id, ho_ten, ngay_sinh). Which query retrieves the 10 youngest students?",
      "optionsEn": [
        "SELECT * FROM sinhvien ORDER BY ngay_sinh ASC LIMIT 10;",
        "SELECT * FROM sinhvien ORDER BY ngay_sinh DESC LIMIT 10;",
        "SELECT TOP 10 * FROM sinhvien WHERE ngay_sinh = MIN(ngay_sinh);",
        "SELECT * FROM sinhvien GROUP BY ngay_sinh HAVING COUNT(*) <= 10;"
      ]
    },
    {
      "id": "isql04",
      "topic": "sql",
      "text": "Câu lệnh nào sau đây dùng để xoá những hồ sơ ứng viên chưa đủ tuổi làm việc (dưới 18 tuổi) từ bảng ung_vien (id, ho_ten, tuoi)?",
      "options": [
        "DROP FROM ung_vien WHERE tuoi < 18;",
        "TRUNCATE TABLE ung_vien WHERE tuoi < 18;",
        "DELETE FROM ung_vien WHERE tuoi < 18;",
        "REMOVE ung_vien WHERE tuoi < 18;"
      ],
      "answer": 2,
      "explanation": "• `DELETE FROM <table> WHERE <condition>;` là câu lệnh DML chuẩn dùng để xoá các dòng thoả mãn điều kiện.\n• `TRUNCATE` không hỗ trợ mệnh đề WHERE (nó xoá sạch toàn bộ dữ liệu bảng).\n• `DROP` xoá luôn cả định nghĩa và cấu trúc bảng khỏi database.",
      "textEn": "Which statement is used to delete candidate records under 18 years old from table ung_vien (id, ho_ten, tuoi)?",
      "optionsEn": [
        "DROP FROM ung_vien WHERE tuoi < 18;",
        "TRUNCATE TABLE ung_vien WHERE tuoi < 18;",
        "DELETE FROM ung_vien WHERE tuoi < 18;",
        "REMOVE ung_vien WHERE tuoi < 18;"
      ]
    },
    {
      "id": "isql05",
      "topic": "sql",
      "text": "Phân biệt kiểu dữ liệu CHAR và VARCHAR trong cơ sở dữ liệu?",
      "options": [
        "CHAR là chuỗi có độ dài cố định (fixed-length), tự đệm khoảng trắng nếu chuỗi ngắn hơn; VARCHAR là chuỗi có độ dài biến đổi (variable-length), chỉ chiếm dung lượng bằng độ dài chuỗi thực tế + bytes lưu độ dài",
        "CHAR lưu được tiếng Việt Unicode, VARCHAR chỉ lưu được ký tự ASCII",
        "VARCHAR tìm kiếm nhanh hơn CHAR trong mọi trường hợp vì tốn ít dung lượng ổ đĩa hơn",
        "CHAR chỉ chứa tối đa 255 ký tự, VARCHAR chứa không giới hạn ký tự"
      ],
      "answer": 0,
      "explanation": "• CHAR(n): Chiếm đúng n ký tự dù chuỗi ngắn hơn. Dùng tối ưu cho dữ liệu có độ dài cố định như: Mã quốc gia (VN, US), Giới tính (M/F), Mã hash MD5, Mã CCCD -> Truy cập nhanh hơn và không bị phân mảnh bộ nhớ.\n• VARCHAR(n): Độ dài linh hoạt từ 0 đến n. Dùng cho: Họ tên, email, mô tả.",
      "textEn": "What is the difference between CHAR and VARCHAR data types in a relational database?",
      "optionsEn": [
        "CHAR is fixed-length, padding with spaces if shorter; VARCHAR is variable-length, consuming only actual string bytes + length prefix bytes",
        "CHAR supports Unicode Vietnamese, VARCHAR only supports ASCII characters",
        "VARCHAR searches faster than CHAR in all cases because it uses less disk space",
        "CHAR holds up to 255 characters, VARCHAR holds unlimited characters"
      ]
    },
    {
      "id": "isql06",
      "topic": "sql",
      "text": "Thứ tự thực thi logic (Execution Order) chuẩn của một câu lệnh truy vấn SQL là gì?",
      "options": [
        "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
        "FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT",
        "FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY",
        "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> LIMIT"
      ],
      "answer": 1,
      "explanation": "💡 Mẹo phỏng vấn cực hay: SQL không chạy từ SELECT trước!\nThứ tự chạy logic thực tế của Database Engine:\n1. FROM & JOIN (Xác định nguồn bảng)\n2. WHERE (Lọc dòng thô)\n3. GROUP BY (Gom nhóm dữ liệu)\n4. HAVING (Lọc nhóm sau tính toán hàm tổng hợp)\n5. SELECT (Tính toán cột, đặt alias)\n6. DISTINCT (Loại bỏ bản ghi trùng)\n7. ORDER BY (Sắp xếp kết quả)\n8. LIMIT / OFFSET (Cắt trang)\n=> Vì WHERE chạy trước SELECT nên bạn không thể dùng alias được đặt ở SELECT trong mệnh đề WHERE!",
      "textEn": "What is the standard logical execution order of an SQL query statement?",
      "optionsEn": [
        "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT",
        "FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT",
        "FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY",
        "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> LIMIT"
      ]
    },
    {
      "id": "isql07",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, diem, que_quan). Câu truy vấn nào thống kê số lượng sinh viên có điểm dưới trung bình (diem < 5) theo từng quê quán?",
      "options": [
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING diem < 5;",
        "SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;",
        "SELECT que_quan, SUM(diem) FROM sinhvien WHERE diem < 5;",
        "SELECT que_quan, COUNT(diem < 5) FROM sinhvien GROUP BY que_quan;"
      ],
      "answer": 1,
      "explanation": "• Lọc các sinh viên có điểm < 5 trước bằng mệnh đề `WHERE diem < 5`.\n• Gom nhóm theo quê quán bằng `GROUP BY que_quan`.\n• Đếm số lượng sinh viên trong mỗi nhóm bằng `COUNT(*)`.\n(Không dùng HAVING diem < 5 vì 'diem' không phải là hàm tổng hợp).",
      "textEn": "Given table sinhvien (id, ho_ten, diem, que_quan). Which query counts the number of students with below-average scores (diem < 5) grouped by hometown?",
      "optionsEn": [
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING diem < 5;",
        "SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;",
        "SELECT que_quan, SUM(diem) FROM sinhvien WHERE diem < 5;",
        "SELECT que_quan, COUNT(diem < 5) FROM sinhvien GROUP BY que_quan;"
      ]
    },
    {
      "id": "isql08",
      "topic": "sql",
      "text": "Làm thế nào để tìm danh sách các sinh viên CHƯA đăng ký bất kỳ khoá học nào (bảng sinhvien và bảng dang_ky)?",
      "options": [
        "SELECT sv.* FROM sinhvien sv INNER JOIN dang_ky dk ON sv.id = dk.sinhvien_id;",
        "SELECT sv.* FROM sinhvien sv LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE dk.sinhvien_id IS NULL;",
        "SELECT sv.* FROM sinhvien sv RIGHT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE sv.id IS NULL;",
        "SELECT sv.* FROM sinhvien sv WHERE sv.id = (SELECT sinhvien_id FROM dang_ky);"
      ],
      "answer": 1,
      "explanation": "• Dùng `LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id` để giữ toàn bộ sinh viên.\n• Mệnh đề `WHERE dk.sinhvien_id IS NULL` sẽ lọc ra những bạn chưa hề có dòng nào tương ứng trong bảng đăng ký.\n• Cách 2 tương đương: `SELECT * FROM sinhvien sv WHERE NOT EXISTS (SELECT 1 FROM dang_ky dk WHERE dk.sinhvien_id = sv.id);`",
      "textEn": "How do you find the list of students who have NOT registered for any courses (tables sinhvien and dang_ky)?",
      "optionsEn": [
        "SELECT sv.* FROM sinhvien sv INNER JOIN dang_ky dk ON sv.id = dk.sinhvien_id;",
        "SELECT sv.* FROM sinhvien sv LEFT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE dk.sinhvien_id IS NULL;",
        "SELECT sv.* FROM sinhvien sv RIGHT JOIN dang_ky dk ON sv.id = dk.sinhvien_id WHERE sv.id IS NULL;",
        "SELECT sv.* FROM sinhvien sv WHERE sv.id = (SELECT sinhvien_id FROM dang_ky);"
      ]
    },
    {
      "id": "isql09",
      "topic": "sql",
      "text": "Phân biệt toán tử UNION và UNION ALL trong SQL?",
      "options": [
        "UNION gộp kết quả và tự động loại bỏ các dòng trùng lặp (DISTINCT); UNION ALL gộp kết quả và giữ nguyên toàn bộ các dòng (kể cả trùng lặp), do đó chạy nhanh hơn UNION",
        "UNION ALL chỉ dùng được khi hai bảng có cùng tên cột; UNION không cần",
        "UNION chạy nhanh hơn UNION ALL vì dữ liệu trả về ít hơn",
        "Cả hai đều loại bỏ dòng trùng, chỉ khác nhau về thứ tự sắp xếp"
      ],
      "answer": 0,
      "explanation": "• `UNION`: Tự động loại bỏ các bản ghi trùng lặp giữa các truy vấn. Để làm được điều này, database phải thực hiện thêm bước sắp xếp hoặc Hash (tốn CPU và RAM).\n• `UNION ALL`: Nối dữ liệu trực tiếp mà không kiểm tra trùng lặp -> Hiệu năng cao hơn nhiều.\n💡 Nếu biết chắc dữ liệu không trùng lặp hoặc cần giữ dữ liệu trùng, luôn dùng `UNION ALL`.",
      "textEn": "What is the difference between UNION and UNION ALL operators in SQL?",
      "optionsEn": [
        "UNION merges results and eliminates duplicate rows (DISTINCT); UNION ALL retains all rows including duplicates, thus executing faster than UNION",
        "UNION ALL can only be used when both tables share identical column names; UNION does not require this",
        "UNION runs faster than UNION ALL because it returns less data",
        "Both eliminate duplicates, differing only in sort order"
      ]
    },
    {
      "id": "isql10",
      "topic": "sql",
      "text": "So sánh 3 câu lệnh xoá dữ liệu trong SQL: DELETE, TRUNCATE và DROP?",
      "options": [
        "DELETE là DML (có thể rollback, hỗ trợ WHERE, kích hoạt Trigger, chậm hơn); TRUNCATE là DDL (xoá toàn bộ data, reset auto_increment, không WHERE, không kích hoạt Trigger row, cực nhanh); DROP là DDL (xoá cả dữ liệu lẫn cấu trúc bảng)",
        "Cả 3 câu lệnh đều có thể Rollback được trong mọi database",
        "TRUNCATE chậm hơn DELETE vì phải xoá từng bản ghi từ đầu đến cuối",
        "DELETE tự động reset cột ID tăng tự động về 1"
      ],
      "answer": 0,
      "explanation": "• DELETE (DML): Xoá từng dòng, ghi nhật ký giao dịch (Transaction log) chi tiết cho từng dòng, có thể rollback trong transaction, kích hoạt trigger.\n• TRUNCATE (DDL): Giải phóng toàn bộ trang dữ liệu (data pages), reset bộ đếm auto-increment, cực nhanh, không hỗ trợ WHERE.\n• DROP (DDL): Xoá sổ cả cấu trúc bảng, index, trigger liên quan khỏi Database.",
      "textEn": "Compare the 3 data deletion commands in SQL: DELETE, TRUNCATE, and DROP?",
      "optionsEn": [
        "DELETE is DML (rollbackable, supports WHERE, fires Triggers, slower); TRUNCATE is DDL (clears all data, resets auto_increment, no WHERE, does not fire row Triggers, very fast); DROP is DDL (removes both data and table structure)",
        "All 3 commands can be rolled back in any database",
        "TRUNCATE is DML, while DELETE and DROP are DDL",
        "DELETE and TRUNCATE only mark records as hidden; only DROP actually deletes data on disk"
      ]
    },
    {
      "id": "isql11",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, gioi_tinh, diem). Câu lệnh nào cập nhật tăng 1 điểm cho tất cả sinh viên nữ (gioi_tinh = 'Nu')?",
      "options": [
        "UPDATE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';",
        "ALTER TABLE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';",
        "MODIFY sinhvien diem = diem + 1 WHERE gioi_tinh = 'Nu';",
        "UPDATE diem = diem + 1 FROM sinhvien WHERE gioi_tinh = 'Nu';"
      ],
      "answer": 0,
      "explanation": "Cú pháp chuẩn của câu lệnh cập nhật dữ liệu SQL:\n`UPDATE <tên_bảng> SET <tên_cột> = <giá_trị_mới> WHERE <điều_kiện>;`",
      "textEn": "Given table sinhvien (id, ho_ten, gioi_tinh, diem). Which query retrieves students with higher scores than the average score of all students?",
      "optionsEn": [
        "SELECT * FROM sinhvien WHERE diem > AVG(diem);",
        "SELECT * FROM sinhvien WHERE diem > (SELECT AVG(diem) FROM sinhvien);",
        "SELECT * FROM sinhvien HAVING diem > AVG(diem);",
        "SELECT * FROM sinhvien GROUP BY id HAVING diem > AVG(diem);"
      ]
    },
    {
      "id": "isql12",
      "topic": "sql",
      "text": "Cho bảng sinhvien (id, ho_ten, gioi_tinh, que_quan). Câu lệnh nào đếm số lượng sinh viên nữ theo từng quê quán?",
      "options": [
        "SELECT que_quan, COUNT(*) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;",
        "SELECT que_quan, COUNT(gioi_tinh = 'Nu') FROM sinhvien GROUP BY que_quan;",
        "SELECT que_quan, SUM(gioi_tinh) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;",
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY que_quan HAVING gioi_tinh = 'Nu';"
      ],
      "answer": 0,
      "explanation": "Lọc sinh viên nữ trước bằng `WHERE gioi_tinh = 'Nu'`, sau đó gom nhóm theo `GROUP BY que_quan` và đếm bằng `COUNT(*)`.",
      "textEn": "Given table sinhvien (id, ho_ten, gioi_tinh, que_quan). Which query counts the number of male and female students in each hometown?",
      "optionsEn": [
        "SELECT que_quan, gioi_tinh, COUNT(*) FROM sinhvien GROUP BY que_quan, gioi_tinh;",
        "SELECT que_quan, COUNT(gioi_tinh) FROM sinhvien GROUP BY que_quan;",
        "SELECT que_quan, gioi_tinh, SUM(*) FROM sinhvien GROUP BY que_quan;",
        "SELECT que_quan, COUNT(*) FROM sinhvien GROUP BY gioi_tinh;"
      ]
    },
    {
      "id": "isql13",
      "topic": "sql",
      "text": "Khóa chính tổng hợp (Composite Primary Key) trong cơ sở dữ liệu là gì?",
      "options": [
        "Là khóa chính được tạo tự động bằng chuỗi UUID kết hợp số nguyên",
        "Là khóa chính được cấu thành từ hai hay nhiều cột kết hợp lại với nhau để tạo ra tính duy nhất (unique) cho mỗi dòng trong bảng",
        "Là một cột vừa làm Primary Key vừa làm Foreign Key",
        "Là khóa chính có thể chứa giá trị NULL"
      ],
      "answer": 1,
      "explanation": "• Composite Primary Key là khóa chính gồm từ 2 cột trở lên. Ví dụ: Trong bảng trung gian `order_details`, cặp cột `(order_id, product_id)` cùng nhau làm khóa chính để đảm bảo 1 đơn hàng không bị thêm 1 sản phẩm 2 lần.\n• Tất cả các cột tham gia Composite Key đều KHÔNG được phép mang giá trị NULL.",
      "textEn": "What is a Composite Primary Key in a relational database?",
      "optionsEn": [
        "A primary key composed of two or more columns combined together to uniquely identify a record in a table",
        "A primary key automatically auto-incremented by the database",
        "A table that contains two distinct independent primary keys",
        "A foreign key that references multiple parent tables simultaneously"
      ]
    },
    {
      "id": "isql14",
      "topic": "sql",
      "text": "Câu truy vấn nào sau đây lấy danh sách 100 người dùng được tạo mới nhất từ bảng users (id, username, created_at)?",
      "options": [
        "SELECT * FROM users ORDER BY created_at DESC LIMIT 100;",
        "SELECT * FROM users ORDER BY created_at ASC LIMIT 100;",
        "SELECT TOP 100 * FROM users WHERE created_at = MAX(created_at);",
        "SELECT * FROM users GROUP BY created_at LIMIT 100;"
      ],
      "answer": 0,
      "explanation": "Người dùng mới nhất tức là thời gian `created_at` lớn nhất -> Sắp xếp giảm dần bằng `ORDER BY created_at DESC` và lấy 100 dòng đầu bằng `LIMIT 100`.",
      "textEn": "Which query retrieves the 100 most recently registered users (sorted by registration timestamp in descending order)?",
      "optionsEn": [
        "SELECT * FROM users ORDER BY created_at ASC LIMIT 100;",
        "SELECT * FROM users ORDER BY created_at DESC LIMIT 100;",
        "SELECT TOP 100 * FROM users WHERE created_at = MAX(created_at);",
        "SELECT * FROM users GROUP BY created_at LIMIT 100;"
      ]
    },
    {
      "id": "isql15",
      "topic": "sql",
      "text": "Về tối ưu hiệu năng cơ sở dữ liệu (Database Indexing & Performance), phát biểu nào sau đây là CHÍNH XÁC nhất?",
      "options": [
        "Nên đánh Index trên tất cả các cột của bảng để tăng tốc độ truy vấn tối đa",
        "Tạo B-Tree Index trên các cột thường xuyên dùng trong WHERE, JOIN và ORDER BY; tránh dùng hàm trên cột được đánh index (như WHERE YEAR(created_at) = 2026) vì sẽ làm vô hiệu hoá index và dẫn đến Full Table Scan",
        "Luôn dùng SELECT * thay vì chỉ định rõ tên cột để database tự cache tối ưu",
        "Chỉ cần đánh index trên bảng ít dữ liệu, bảng hàng triệu dòng thì không cần"
      ],
      "answer": 1,
      "explanation": "💡 Kiến thức phỏng vấn quan trọng về Index:\n1. Đánh index quá nhiều sẽ làm CHẬM các thao tác ghi (INSERT/UPDATE/DELETE) vì database phải cập nhật lại cây B-Tree.\n2. Khi viết điều kiện `WHERE FUNCTION(col) = value` (ví dụ: `WHERE LOWER(email) = 'abc'`), bộ tối ưu truy vấn không dùng được index thông thường mà phải quét toàn bộ bảng (Full Table Scan).\n3. Tránh `SELECT *`, chỉ select các cột thực sự cần dùng để giảm tải I/O và băng thông mạng.",
      "textEn": "Regarding Database Indexing & Performance, which statement is ACCURATE?",
      "optionsEn": [
        "Creating an Index significantly speeds up SELECT queries, but slows down INSERT, UPDATE, DELETE operations and consumes extra disk/RAM space",
        "Creating Indexes on every column in a table is always a best practice",
        "Indexes only accelerate text queries and have no effect on numbers or dates",
        "Using `SELECT *` has no negative impact on database indexes or cache"
      ]
    },
    {
      "id": "isql16",
      "topic": "sql",
      "text": "View trong hệ quản trị cơ sở dữ liệu SQL là gì và mục đích sử dụng chính là gì?",
      "options": [
        "Là một bảng vật lý chiếm dung lượng riêng biệt và tự động sao chép toàn bộ dữ liệu từ bảng gốc",
        "Là một bảng ảo (Virtual Table) dựa trên kết quả của một câu lệnh SELECT; không lưu trữ dữ liệu thực tế (trừ Materialized View), giúp che giấu độ phức tạp của truy vấn và hỗ trợ phân quyền bảo mật dữ liệu",
        "Là một Index đặc biệt giúp tăng tốc độ ghi dữ liệu",
        "Là một thủ tục lưu trữ (Stored Procedure) có thể truyền tham số đầu vào"
      ],
      "answer": 1,
      "explanation": "• View là một bảng ảo (Virtual Table). Khi bạn SELECT từ View, database sẽ thực thi câu lệnh SELECT bên dưới định nghĩa của View.\n• Mục đích: Che giấu các câu JOIN phức tạp, tính toán sẵn các cột nghiệp vụ, và phân quyền bảo mật (chỉ cho phép nhân viên xem View chứa thông tin không nhạy cảm thay vì bảng chính chứa lương hoặc mật khẩu).",
      "textEn": "What is a View in an SQL database management system and what is its primary purpose?",
      "optionsEn": [
        "A View is a virtual table based on the result set of an SQL query; it does not store raw data itself, helping encapsulate query logic, improve security, and simplify complex queries",
        "A View is a temporary physical table stored permanently on hard drive for backup purposes",
        "A View is a function used to validate data input before INSERT",
        "A View automatically duplicates the entire database to a secondary server"
      ]
    },
    {
      "id": "ijc01",
      "topic": "javacore",
      "text": "Cho đoạn mã sau trong Java:\nInteger a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));\nKết quả in ra màn hình là gì và giải thích tại sao?",
      "code": "Integer a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));",
      "options": [
        "true true",
        "false false",
        "true false",
        "false true"
      ],
      "answer": 2,
      "explanation": "💡 Câu hỏi kinh điển trong phỏng vấn Java:\n• Java có cơ chế Integer Cache lưu trữ sẵn các đối tượng Integer từ -128 đến 127 (theo Java Language Specification khi Autoboxing `Integer.valueOf()`).\n• Với 100: Cả `a` và `b` cùng trỏ tới 1 đối tượng duy nhất trong cache -> `a == b` so sánh địa chỉ tham chiếu cho kết quả `true`.\n• Với 200: Vượt ngoài vùng cache [-128, 127], JVM gọi `new Integer(200)` tạo ra 2 đối tượng độc lập trên Heap -> `c == d` so sánh tham chiếu trả về `false`!\n=> Để so sánh giá trị Wrapper Class luôn dùng `.equals()`.",
      "textEn": "Given the following Java snippet:\nInteger a = 100, b = 100;\nInteger c = 200, d = 200;\nSystem.out.println((a == b) + \" \" + (c == d));\nWhat is printed to the console?",
      "optionsEn": [
        "true true",
        "true false",
        "false false",
        "false true"
      ]
    },
    {
      "id": "ijc02",
      "topic": "javacore",
      "text": "Hiện tượng gì xảy ra khi dùng vòng lặp for thông thường hoặc for-each và gọi list.remove(item) trực tiếp trên một ArrayList?",
      "options": [
        "Ném ra NullPointerException",
        "Ném ra ConcurrentModificationException",
        "Ném ra IndexOutOfBoundsException",
        "Chương trình chạy bình thường không có lỗi gì"
      ],
      "answer": 1,
      "explanation": "• ArrayList áp dụng cơ chế Fail-Fast Iterator bằng biến đếm `modCount`.\n• Khi duyệt danh sách bằng for-each/Iterator mà tự ý gọi `list.remove()` của List thì `expectedModCount != modCount` -> Ném ngay `ConcurrentModificationException`.\n💡 Cách sửa chuẩn khi phỏng vấn:\n1. Dùng `Iterator.remove()`: `Iterator<String> it = list.iterator(); while(it.hasNext()){ if(...) it.remove(); }`\n2. Dùng Java 8: `list.removeIf(item -> ...);`",
      "textEn": "What happens when using a regular for-each loop to remove elements from an ArrayList while iterating over it?",
      "optionsEn": [
        "Elements are deleted normally without error",
        "Throws ConcurrentModificationException at runtime",
        "Throws IndexOutOfBoundsException",
        "The program terminates with an infinite loop"
      ]
    },
    {
      "id": "ijc03",
      "topic": "javacore",
      "text": "Phân biệt vùng nhớ Stack và Heap trong máy ảo Java Virtual Machine (JVM)?",
      "options": [
        "Stack lưu trữ các đối tượng (Objects); Heap lưu trữ các biến nguyên thủy cục bộ và tham chiếu",
        "Stack lưu trữ các lời gọi hàm (call stack), biến cục bộ và con trỏ tham chiếu, mỗi Thread có Stack riêng; Heap lưu trữ toàn bộ Object và mảng, dùng chung cho tất cả các Thread và được quản lý bởi Garbage Collector",
        "Dung lượng vùng nhớ Stack lớn hơn Heap rất nhiều và không bao giờ bị tràn bộ nhớ",
        "Heap tự động giải phóng bộ nhớ ngay khi kết thúc hàm mà không cần Garbage Collector"
      ],
      "answer": 1,
      "explanation": "• Stack: Lưu trữ frame gọi hàm, biến cục bộ (primitive) và biến tham chiếu. Cực nhanh, LIFO, mỗi Thread có Stack độc lập. Tràn bộ nhớ gây `StackOverflowError` (thường do đệ quy vô hạn).\n• Heap: Lưu toàn bộ Object thực tế và mảng (`new Object()`). Được chia sẻ giữa các Thread, do Garbage Collector thu gom giải phóng. Tràn bộ nhớ gây `OutOfMemoryError` (thường do memory leak).",
      "textEn": "Distinguish between Stack and Heap memory in the Java Virtual Machine (JVM)?",
      "optionsEn": [
        "Stack stores all instantiated Objects; Heap stores primitive variables and method call frames",
        "Stack stores primitive variables, method call frames, and Object references (thread-private, auto-cleared upon method exit); Heap stores actual Objects (shared by all threads, managed by Garbage Collector)",
        "Stack and Heap are both managed entirely by the Garbage Collector",
        "Heap memory is always faster and smaller in size than Stack memory"
      ]
    },
    {
      "id": "ijc04",
      "topic": "javacore",
      "text": "Trong Java, cho hàm sau:\npublic static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}\nKhi thực thi test(), giá trị trả về là bao nhiêu?",
      "code": "public static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}",
      "options": [
        "1",
        "2",
        "Báo lỗi biên dịch vì có 2 lệnh return",
        "3"
      ],
      "answer": 1,
      "explanation": "• Khối `finally` LUÔN LUÔN được thực thi sau khi khối `try` kết thúc (trừ trường hợp gọi `System.exit(0)` hoặc JVM crash).\n• Lệnh `return 2;` trong `finally` sẽ ghi đè (override) hoàn toàn giá trị trả về trước đó của `try`, do đó hàm trả về `2`.\n💡 Lưu ý: Trong code thực tế không bao giờ nên return trong khối finally vì nó có thể nuốt cả Exception đang được ném ra từ khối try!",
      "textEn": "In Java, given the following method:\npublic static int test() {\n    try {\n        return 1;\n    } finally {\n        return 2;\n    }\n}\nWhat does test() return when executed?",
      "optionsEn": [
        "Returns 1",
        "Returns 2",
        "Compilation error because multiple returns are illegal",
        "Throws an Exception at runtime"
      ]
    },
    {
      "id": "ijc05",
      "topic": "javacore",
      "text": "Phân biệt giữa hai interface Comparable và Comparator trong Java?",
      "options": [
        "Comparable nằm trong java.util, định nghĩa phương thức compare(); Comparator nằm trong java.lang, định nghĩa compareTo()",
        "Comparable sửa đổi trực tiếp class cần so sánh (natural ordering) qua phương thức compareTo(T o); Comparator tạo class/lambda riêng biệt bên ngoài (custom ordering) qua phương thức compare(T o1, T o2)",
        "Comparable cho phép sắp xếp theo nhiều tiêu chí khác nhau cùng lúc; Comparator chỉ cho phép sắp xếp theo 1 tiêu chí duy nhất",
        "Cả hai hoàn toàn giống nhau, chỉ khác tên gọi"
      ],
      "answer": 1,
      "explanation": "• `Comparable<T>` (thuộc package `java.lang`): Có method `int compareTo(T o)`. Phải implements trực tiếp vào class Entity để định nghĩa thứ tự sắp xếp tự nhiên mặc định.\n• `Comparator<T>` (thuộc package `java.util`): Có method `int compare(T o1, T o2)`. Rất linh hoạt, có thể tạo nhiều tiêu chí sắp xếp bên ngoài mà không cần sửa code class gốc, hỗ trợ viết Lambda cực ngắn: `Comparator.comparing(Student::getAge)`. ",
      "textEn": "Distinguish between Comparable and Comparator interfaces in Java?",
      "optionsEn": [
        "Comparable defines natural ordering inside the class itself via compareTo(o); Comparator defines external custom sorting via compare(o1, o2)",
        "Comparator belongs to java.lang; Comparable belongs to java.util",
        "Comparable can sort by multiple dynamic criteria at runtime; Comparator only supports a single fixed criterion",
        "Both are identical and can be used interchangeably without any difference"
      ]
    },
    {
      "id": "ijc06",
      "topic": "javacore",
      "text": "Phương thức tĩnh (static method) trong Java có thể được Override (Ghi đè) bởi lớp con không?",
      "options": [
        "Có, static method override bình thường giống như instance method",
        "Không! Đó không phải là Override mà là Method Hiding (Ẩn phương thức); phương thức được gọi sẽ phụ thuộc vào kiểu tham chiếu lúc khai báo (Compile-time) chứ không phải đối tượng thực tế lúc chạy (Runtime)",
        "Chỉ override được nếu phương thức đó có modifier public",
        "Có, nhưng bắt buộc phải có annotation @Override"
      ],
      "answer": 1,
      "explanation": "• Đa hình động (Dynamic Polymorphism / Overriding) chỉ áp dụng cho instance method dựa trên đối tượng thực tế lúc Runtime.\n• `static method` thuộc về Class, được liên kết tĩnh (Static Binding) ở thời điểm biên dịch (Compile-time). Khi lớp con viết static method trùng tên/tham số, nó chỉ ẩn phương thức của lớp cha (Method Hiding). Nếu thêm `@Override` compiler sẽ báo lỗi!",
      "textEn": "Can a static method in Java be Overridden by a subclass?",
      "optionsEn": [
        "Yes, static methods can be overridden with dynamic polymorphism just like instance methods",
        "No. Declaring a method with the same signature in a subclass only hides the parent method (Method Hiding) and is bound at compile-time",
        "Only when the static method is marked protected",
        "Yes, provided the @Override annotation is explicitly attached"
      ]
    },
    {
      "id": "ijc07",
      "topic": "javacore",
      "text": "Nếu thêm một đối tượng vào HashSet, sau đó thay đổi giá trị thuộc tính tham gia tính toán hashCode() của đối tượng đó, thì khi gọi hashSet.contains(object) sẽ trả về kết quả gì?",
      "options": [
        "Luôn trả về true",
        "Thường trả về false vì hash code mới sẽ trỏ tới bucket khác, khiến HashSet không tìm thấy đối tượng dù nó vẫn đang nằm trong tập hợp (hiện tượng đối tượng bị kẹt / rò rỉ bộ nhớ)",
        "Ném ngoại lệ ConcurrentModificationException",
        "HashSet tự động cập nhật lại vị trí bucket của đối tượng"
      ],
      "answer": 1,
      "explanation": "• `HashSet` dựa vào `hashCode()` để tìm bucket index, rồi mới dùng `equals()` so sánh.\n• Khi bạn sửa thuộc tính tham gia tính `hashCode()`, mã băm mới sẽ trỏ tới một bucket khác. Khi gọi `contains()`, HashSet tìm ở bucket mới (vốn đang rỗng) nên trả về `false`!\n💡 Quy tắc vàng phỏng vấn: Các đối tượng dùng làm Key trong `HashMap` hoặc phần tử trong `HashSet` PHẢI là **Immutable** (Bất biến)!",
      "textEn": "If an object is added to a HashSet, and then the field used to compute its hashCode() is modified, what happens when calling set.contains(obj)?",
      "optionsEn": [
        "Always returns true because the object reference in memory has not changed",
        "Likely returns false because the new hashCode points to a different bucket in the hash table, potentially causing a memory leak",
        "Throws an InvalidKeyException",
        "HashSet automatically recomputes and updates the hash table instantly"
      ]
    },
    {
      "id": "ijc08",
      "topic": "javacore",
      "text": "Phân biệt Checked Exception và Unchecked Exception trong ngôn ngữ Java?",
      "options": [
        "Checked Exception kế thừa từ RuntimeException; Unchecked Exception kế thừa từ Exception",
        "Checked Exception là các lỗi kế thừa từ Exception (ngoại trừ RuntimeException), bắt buộc phải bắt (try-catch) hoặc khai báo (throws) lúc biên dịch (ví dụ: IOException, SQLException); Unchecked Exception kế thừa từ RuntimeException, xảy ra do lỗi logic lập trình và không bắt buộc khai báo lúc biên dịch (ví dụ: NullPointerException, ArrayIndexOutOfBoundsException)",
        "Unchecked Exception là các lỗi phần cứng như OutOfMemoryError, StackOverflowError",
        "Checked Exception chỉ xảy ra ở Java phiên bản cũ"
      ],
      "answer": 1,
      "explanation": "• Checked Exception: Trình biên dịch bắt buộc lập trình viên phải xử lý (`try-catch` hoặc `throws`) trước khi compile (ví dụ: `FileNotFoundException`, `SQLException`).\n• Unchecked Exception (`RuntimeException` và con cháu): Thường do lỗi lập trình logic (chia cho 0 `ArithmeticException`, con trỏ null `NullPointerException`), không bắt buộc khai báo ở compile-time.",
      "textEn": "What is the difference between Checked Exception and Unchecked Exception in Java?",
      "optionsEn": [
        "Checked Exceptions (inherit from Exception but not RuntimeException) are checked at compile time and MUST be handled via try-catch or throws; Unchecked Exceptions (inherit from RuntimeException/Error) occur at runtime and are not required to be caught",
        "Unchecked Exceptions must be declared using the throws keyword, while Checked Exceptions do not",
        "Checked Exceptions can never be caught using a try-catch block",
        "RuntimeException is a Checked Exception"
      ]
    },
    {
      "id": "ijc09",
      "topic": "javacore",
      "text": "Sự khác biệt giữa map() và flatMap() trong Java 8 Stream API là gì?",
      "options": [
        "map() dùng để lọc phần tử, flatMap() dùng để biến đổi phần tử",
        "map() chuyển đổi từng phần tử thành một giá trị mới (tỉ lệ 1-1); flatMap() chuyển đổi từng phần tử thành một Stream các giá trị rồi 'làm phẳng' (flatten) các Stream con đó thành một Stream duy nhất (tỉ lệ 1-nhiều)",
        "flatMap() chỉ dùng được với kiểu dữ liệu nguyên thủy như int, float",
        "map() chạy song song (Parallel), flatMap() chạy tuần tự"
      ],
      "answer": 1,
      "explanation": "• `map(x -> f(x))`: Ánh xạ 1 giá trị thành 1 giá trị mới. Ví dụ: List<Student> -> map(Student::getName) -> List<String>.\n• `flatMap(x -> f(x).stream())`: Biến đổi và làm phẳng. Ví dụ: Một đơn hàng có List<Item>. Danh sách đơn hàng `List<Order>` dùng flatMap sẽ gom toàn bộ Item của tất cả đơn hàng thành `Stream<Item>` duy nhất thay vì `Stream<List<Item>>` lồng nhau.",
      "textEn": "What is the key difference between map() and flatMap() in Java 8 Stream API?",
      "optionsEn": [
        "map() transforms each element into another value (1-to-1); flatMap() transforms each element into a Stream and flattens multiple streams into a single stream (1-to-N flattening)",
        "map() operates on parallel streams; flatMap() only operates on sequential streams",
        "map() filters elements; flatMap() changes the type of elements",
        "There is no difference; flatMap() is merely deprecated syntax for map()"
      ]
    },
    {
      "id": "ijc10",
      "topic": "javacore",
      "text": "Cơ chế Try-with-resources trong Java 7+ yêu cầu tài nguyên (resource) phải implement interface nào để tự động đóng?",
      "options": [
        "java.io.Closeable hoặc java.lang.AutoCloseable",
        "java.io.Serializable",
        "java.lang.Cloneable",
        "java.util.Disposable"
      ],
      "answer": 0,
      "explanation": "Trong cú pháp: `try (Connection conn = ...; PreparedStatement ps = ...) { ... }`, bất kỳ đối tượng nào khai báo trong ngoặc tròn bắt buộc phải implement interface `java.lang.AutoCloseable` (hoặc `java.io.Closeable`). Khi khối try kết thúc, hàm `close()` sẽ được tự động gọi theo thứ tự ngược lại.",
      "textEn": "What requirement must a resource satisfy to be used within Java 7+ Try-with-resources statement?",
      "optionsEn": [
        "Must implement the java.lang.AutoCloseable or java.io.Closeable interface",
        "Must implement java.io.Serializable interface",
        "Must declare a static void close() method",
        "Must be instantiated using a Singleton design pattern"
      ]
    },
    {
      "id": "ijc11",
      "topic": "javacore",
      "text": "So sánh hiệu năng và đặc tính giữa String, StringBuilder và StringBuffer?",
      "options": [
        "String là mutable; StringBuilder và StringBuffer là immutable",
        "String là immutable (bất biến, mỗi lần nối chuỗi tạo đối tượng mới trên Heap); StringBuilder là mutable, không thread-safe nhưng tốc độ nối chuỗi nhanh nhất; StringBuffer là mutable, thread-safe (các method có synchronized) nên an toàn đa luồng nhưng chậm hơn StringBuilder",
        "StringBuffer chạy nhanh hơn StringBuilder trong môi trường đa luồng",
        "Cả ba đều có tốc độ như nhau từ Java 11 trở đi"
      ],
      "answer": 1,
      "explanation": "• `String`: Bất biến (Immutable), an toàn cho String Pool và đa luồng, nhưng nếu nối chuỗi trong vòng lặp `for` sẽ tạo hàng nghìn object rác làm chậm bộ nhớ.\n• `StringBuilder`: Khả biến (Mutable), không đồng bộ (Not thread-safe), tốc độ cao nhất -> Dùng trong 1 thread / hàm.\n• `StringBuffer`: Khả biến (Mutable), có từ khóa `synchronized` -> Thread-safe, an toàn khi nhiều luồng cùng thao tác.",
      "textEn": "Compare the performance and characteristics among String, StringBuilder, and StringBuffer in Java?",
      "optionsEn": [
        "String is immutable (thread-safe, creates new object on concatenation); StringBuilder is mutable (not thread-safe, fastest concatenation); StringBuffer is mutable (thread-safe via synchronized methods, slower than StringBuilder)",
        "StringBuilder is immutable; String and StringBuffer are mutable",
        "StringBuffer runs faster than StringBuilder in single-threaded environments",
        "All three have identical performance and memory overhead"
      ]
    },
    {
      "id": "isp01",
      "topic": "spring",
      "text": "Điểm khác biệt lớn nhất giữa Spring Boot và Spring Framework thuần là gì?",
      "options": [
        "Spring Boot dùng ngôn ngữ lập trình khác với Spring Framework",
        "Spring Boot cung cấp tính năng Tự động cấu hình (Auto-Configuration), máy chủ nhúng sẵn (Embedded Tomcat/Jetty), các gói phụ thuộc rút gọn (Starter Dependencies) giúp tạo ứng dụng chạy ngay độc lập mà không cần cấu hình XML phức tạp",
        "Spring Boot không hỗ trợ mô hình MVC hay kết nối cơ sở dữ liệu",
        "Spring Boot chỉ chạy được trên nền tảng đám mây AWS"
      ],
      "answer": 1,
      "explanation": "• Spring Framework thuần đòi hỏi cấu hình thủ công rất nhiều qua file XML hoặc class Config (DataSource, DispatcherServlet, ViewResolver...).\n• Spring Boot với phương châm 'Opinionated Defaults' tự động dò tìm dependencies trong classpath để cấu hình tự động (Auto-Configuration), tích hợp sẵn Web Server nhúng (Tomcat) giúp đóng gói thành 1 file JAR duy nhất (`java -jar app.jar`).",
      "textEn": "What is the most significant difference between Spring Boot and the traditional Spring Framework?",
      "optionsEn": [
        "Spring Boot is a completely new language that replaces Java",
        "Spring Boot provides Auto-configuration, Starter dependencies, and an Embedded Web Server (Tomcat/Jetty), eliminating complex XML configuration",
        "Spring Framework does not support Dependency Injection; only Spring Boot does",
        "Spring Boot can only be used for building microservices, not monolithic web applications"
      ]
    },
    {
      "id": "isp02",
      "topic": "spring",
      "text": "Trình tự các giai đoạn chính trong Vòng đời của một Bean (Bean Lifecycle) trong Spring IoC Container là gì?",
      "options": [
        "Destroy -> Initialize -> Instantiate -> Populate Properties",
        "Khởi tạo Instance -> Tiêm phụ thuộc (Populate Properties) -> Gọi các Aware interfaces -> BeanPostProcessor (Before Init) -> Khởi tạo (@PostConstruct/InitializingBean) -> BeanPostProcessor (After Init) -> Sẵn sàng sử dụng (Ready) -> Hủy bỏ (@PreDestroy/DisposableBean)",
        "Load DB -> Render View -> Destroy",
        "Compile -> Bytecode -> Run -> Garbage Collect"
      ],
      "answer": 1,
      "explanation": "Vòng đời đầy đủ của Bean trong Spring IoC:\n1. Instantiate: Khởi tạo instance bằng constructor.\n2. Populate Properties: Tiêm các dependency (@Autowired).\n3. BeanNameAware / BeanFactoryAware.\n4. BeanPostProcessor - postProcessBeforeInitialization.\n5. @PostConstruct / InitializingBean.afterPropertiesSet().\n6. BeanPostProcessor - postProcessAfterInitialization (nơi tạo Proxy cho AOP/Transactional).\n7. Ready: Bean sẵn sàng phục vụ.\n8. Container Shutdown -> @PreDestroy / DisposableBean.destroy().",
      "textEn": "What is the sequence of key phases in a Spring Bean's Lifecycle?",
      "optionsEn": [
        "Instantiation -> Populate Properties -> BeanNameAware / BeanFactoryAware -> BeanPostProcessor (Before Init) -> @PostConstruct / init-method -> BeanPostProcessor (After Init) -> Ready for Use -> @PreDestroy / destroy",
        "Destroy -> Instantiation -> PostConstruct -> BeanPostProcessor",
        "Init-method -> Instantiation -> Populate Properties -> Destroy",
        "BeanPostProcessor -> Instantiation -> Destroy"
      ]
    },
    {
      "id": "isp03",
      "topic": "spring",
      "text": "Trong Spring Boot, có những cách nào để thực hiện Dependency Injection (DI) và cách nào được Spring Team khuyến nghị sử dụng nhất?",
      "options": [
        "Field Injection (@Autowired trên biến), Setter Injection, Constructor Injection. Khuyên dùng Constructor Injection nhất",
        "Chỉ có 1 cách duy nhất là Field Injection",
        "Khuyên dùng Field Injection vì viết code ngắn gọn nhất",
        "Khuyên dùng Setter Injection vì linh hoạt thay đổi được sau khi khởi tạo"
      ],
      "answer": 0,
      "explanation": "Spring hỗ trợ 3 cách DI:\n1. Field Injection: `@Autowired private Service s;` (Dễ viết nhưng khó viết Unit Test độc lập và dễ che giấu lỗi phụ thuộc vòng Circular Dependency).\n2. Setter Injection: Dùng setter method (phù hợp với optional dependency).\n3. Constructor Injection (KHUYẾN NGHỊ): Giúp dependency là `final` (bất biến), đảm bảo object không bao giờ ở trạng thái null khi khởi tạo, và dễ dàng viết Unit Test mà không cần Spring Container.",
      "textEn": "What are the ways to achieve Dependency Injection in Spring Boot, and which is recommended as best practice?",
      "optionsEn": [
        "Field Injection (@Autowired on field), Setter Injection, and Constructor Injection. Constructor Injection is the recommended best practice because it enforces immutability (final fields) and simplifies unit testing without mocking Spring container",
        "Field Injection is the recommended best practice because it requires writing the least code",
        "Setter Injection is always the only supported injection mechanism in Spring Boot",
        "Spring Boot does not support Constructor Injection"
      ]
    },
    {
      "id": "isp04",
      "topic": "spring",
      "text": "Luồng xử lý của một HTTP Request gửi đến ứng dụng Spring Boot diễn ra theo thứ tự nào?",
      "options": [
        "Controller -> Database -> Service -> DispatcherServlet",
        "Client -> Filter Chain -> DispatcherServlet -> HandlerMapping -> Interceptor (preHandle) -> Controller -> Service -> Repository -> Database -> Response JSON qua HttpMessageConverter",
        "Client -> Repository -> Service -> Controller",
        "DispatcherServlet -> Service -> Controller -> Database"
      ],
      "answer": 1,
      "explanation": "Luồng chi tiết của Request trong Spring Boot:\n1. Request qua bộ lọc Servlet Filters (ví dụ: Spring Security Filter).\n2. Đi vào `DispatcherServlet` (Front Controller).\n3. Tra cứu `HandlerMapping` để tìm Controller và hàm xử lý tương ứng.\n4. Chạy qua `HandlerInterceptor` (hàm preHandle).\n5. Gọi method của `@RestController`.\n6. Controller gọi nghiệp vụ tại `@Service`.\n7. Service gọi truy vấn DB tại `@Repository` (Spring Data JPA).\n8. Kết quả trả về được `HttpMessageConverter` (Jackson) serialize thành JSON gửi về Client.",
      "textEn": "What is the flow of an incoming HTTP Request in a Spring Boot MVC application?",
      "optionsEn": [
        "Client -> DispatcherServlet -> HandlerMapping -> Interceptor/Controller -> Service -> Repository (DB) -> View/ResponseBody (JSON) -> Client",
        "Client -> Controller -> DispatcherServlet -> DB",
        "Client -> Repository -> Service -> Controller",
        "Client -> Interceptor -> Repository -> View"
      ]
    },
    {
      "id": "isp05",
      "topic": "spring",
      "text": "Để xử lý ngoại lệ tập trung (Global Exception Handling) trong Spring Boot REST API theo chuẩn kiến trúc, ta sử dụng các Annotation nào?",
      "options": [
        "@RestControllerAdvice kết hợp với @ExceptionHandler",
        "@ExceptionFilter và @Catch",
        "Chỉ dùng try-catch trong từng hàm của Controller",
        "@GlobalError và @CatchAll"
      ],
      "answer": 0,
      "explanation": "• `@RestControllerAdvice`: Đánh dấu class xử lý lỗi toàn cục cho toàn bộ các Controller trong hệ thống.\n• `@ExceptionHandler(TênNgoạiLệ.class)`: Bắt chính xác loại exception đó và trả về định dạng JSON ApiResponse chuẩn (chứa timestamp, status code, error message) mà không làm lộ StackTrace nguy hiểm ra ngoài.",
      "textEn": "How is Global Exception Handling implemented centrally in a Spring Boot REST API?",
      "optionsEn": [
        "Use @ControllerAdvice (or @RestControllerAdvice) combined with @ExceptionHandler methods to catch and format exceptions into uniform response bodies",
        "Wrap every Controller method in a manual try-catch block",
        "Catch errors inside the index.html file",
        "Set server.error.include-stacktrace=always in application.properties"
      ]
    },
    {
      "id": "isp06",
      "topic": "spring",
      "text": "Lỗi CORS (Cross-Origin Resource Sharing) là gì và cách cấu hình giải quyết trong Spring Boot?",
      "options": [
        "Lỗi do cơ sở dữ liệu từ chối kết nối; giải quyết bằng cách mở port database",
        "Cơ chế bảo mật của trình duyệt chặn các request xuất phát từ một Origin (Domain/Port/Protocol) khác với Origin của server; giải quyết trong Spring Boot bằng @CrossOrigin trên Controller hoặc cấu hình bean WebMvcConfigurer / CorsFilter",
        "Lỗi do sai định dạng JSON khi gửi từ Frontend",
        "Lỗi hết hạn Token xác thực"
      ],
      "answer": 1,
      "explanation": "• CORS là cơ chế bảo mật do TRÌNH DUYỆT thực thi để ngăn chặn trang web này gửi request ngầm sang một trang web khác.\n• Ví dụ: Frontend chạy tại `http://localhost:3000` gọi sang Backend `http://localhost:8080`.\n• Cách giải quyết chuẩn trong Spring Boot: Thêm cấu hình `CorsRegistry` trong `WebMvcConfigurer` cho phép origin `http://localhost:3000` và các method GET, POST, PUT, DELETE.",
      "textEn": "What is a CORS (Cross-Origin Resource Sharing) error and how is it resolved in Spring Boot?",
      "optionsEn": [
        "A browser security mechanism blocking requests from a different origin (domain, port, protocol); resolved in Spring Boot using @CrossOrigin on controllers or configuring a WebMvcConfigurer with CorsRegistry",
        "A database connection timeout error; resolved by increasing DB pool size",
        "A syntax error caused by missing semicolons in JavaScript",
        "A hardware error caused by low available server RAM"
      ]
    },
    {
      "id": "iw01",
      "topic": "web",
      "text": "Phân biệt cơ chế lưu trữ giữa Session và Cookie trên ứng dụng Web?",
      "options": [
        "Cookie lưu ở Server; Session lưu ở Client",
        "Cookie được lưu trữ trực tiếp trên trình duyệt của người dùng (Client, dung lượng nhỏ tối đa ~4KB); Session được lưu trữ trên Server (bảo mật hơn, chứa được nhiều dữ liệu), Server nhận diện phiên của Client thông qua Session ID gửi kèm trong Cookie",
        "Cookie không bao giờ hết hạn, Session tự mất sau 5 giây",
        "Cả Cookie và Session đều được lưu trong LocalStorage"
      ],
      "answer": 1,
      "explanation": "• Cookie: Lưu ở Browser, dung lượng nhỏ (~4KB), gửi kèm tự động trong header HTTP mỗi khi gọi request. Thuộc tính `HttpOnly` ngăn chặn JavaScript truy cập (chống XSS), `SameSite` chống CSRF.\n• Session: Lưu trữ dữ liệu phiên đăng nhập trên RAM của Server hoặc Redis. Server cấp cho client một `SessionId` (thường lưu trong cookie `JSESSIONID`).",
      "textEn": "What is the difference between Session and Cookie storage mechanisms in web applications?",
      "optionsEn": [
        "Cookie is stored on the client browser (size limit ~4KB, sent with HTTP headers); Session is stored securely on the web server (stores sensitive user state, identified via a session ID cookie)",
        "Session is stored on client browser; Cookie is stored on database server",
        "Cookies can never expire; Sessions expire immediately on every page reload",
        "Cookies can store up to 50MB of data"
      ]
    },
    {
      "id": "iw02",
      "topic": "web",
      "text": "So sánh các phương thức HTTP: GET, POST và PUT trong RESTful API?",
      "options": [
        "GET dùng để tạo mới; POST dùng để lấy dữ liệu; PUT dùng để xoá",
        "GET: Lấy dữ liệu, tham số gửi qua Query URL, có thể cache, idempotent (gọi nhiều lần liên tiếp không làm đổi trạng thái server); POST: Tạo mới tài nguyên, dữ liệu gửi trong Request Body, không idempotent; PUT: Cập nhật / thay thế toàn bộ tài nguyên, có tính idempotent",
        "GET bảo mật hơn POST vì không thấy dữ liệu trong body",
        "PUT chỉ dùng được với các file hình ảnh lớn"
      ],
      "answer": 1,
      "explanation": "💡 Khái niệm Idempotent rất hay hỏi:\n• `Idempotent`: Thao tác gọi 1 lần hay n lần liên tiếp thì trạng thái hệ thống vẫn y như vậy (`GET`, `PUT`, `DELETE` là idempotent).\n• `POST`: Không idempotent (mỗi lần submit form sẽ tạo thêm 1 bản ghi mới).\n• `PUT` thay thế toàn bộ bản ghi; nếu muốn cập nhật một phần thuộc tính nên dùng `PATCH`.",
      "textEn": "Compare HTTP methods: GET, POST, and PUT in RESTful API design?",
      "optionsEn": [
        "GET retrieves data (idempotent, parameters in URL query string, cacheable); POST creates new resources (non-idempotent, payload in body); PUT updates/replaces an entire existing resource (idempotent)",
        "GET is used to delete records; POST is used to retrieve records",
        "POST is idempotent; PUT is not idempotent",
        "All three methods have identical behavior and can be swapped arbitrarily"
      ]
    },
    {
      "id": "iw03",
      "topic": "web",
      "text": "Trong ngôn ngữ JavaScript, sự khác biệt giữa toán tử == và === là gì?",
      "options": [
        "== là so sánh gán giá trị; === là so sánh bằng",
        "== là so sánh lỏng lẻo (loose equality) - tự động ép kiểu dữ liệu (Type Coercion) trước khi so sánh; === là so sánh nghiêm ngặt (strict equality) - yêu cầu cả kiểu dữ liệu lẫn giá trị phải giống nhau mà không hề ép kiểu",
        "=== chạy chậm hơn == rất nhiều",
        "Cả hai cho kết quả giống hệt nhau trong mọi trường hợp"
      ],
      "answer": 1,
      "explanation": "• `==` (ép kiểu ngầm định): `5 == '5'` -> `true`; `false == 0` -> `true`; `null == undefined` -> `true`.\n• `===` (so sánh nghiêm ngặt): `5 === '5'` -> `false` (vì `number !== string`); `null === undefined` -> `false`.\n=> Trong dự án thực tế luôn luôn dùng `===` để tránh bẫy ép kiểu quái dị của JavaScript.",
      "textEn": "In JavaScript, what is the difference between the equality operator == and strict equality operator ===?",
      "optionsEn": [
        "== performs type coercion before comparison; === compares both value and type without conversion (strict equality)",
        "=== converts strings to numbers before comparison",
        "== is only used for numbers, === is used for strings",
        "There is no difference in modern ES6 JavaScript"
      ]
    },
    {
      "id": "iw04",
      "topic": "web",
      "text": "Virtual DOM trong thư viện React là gì và cơ chế hoạt động của nó như thế nào?",
      "options": [
        "Virtual DOM là bản sao lưu dưới database của giao diện web",
        "Virtual DOM là một bản biểu diễn trừu tượng của Real DOM dưới dạng JavaScript Object nằm trong bộ nhớ; khi state thay đổi, React so sánh Virtual DOM mới và cũ (thuật toán Diffing) rồi chỉ cập nhật phần tử thực sự thay đổi lên Real DOM (Reconciliation / Batching) giúp tăng hiệu năng render",
        "Virtual DOM thao tác trực tiếp với phần cứng màn hình nên nhanh hơn Real DOM hàng nghìn lần",
        "Virtual DOM làm ứng dụng tốn bộ nhớ hơn và không có lợi ích gì đáng kể"
      ],
      "answer": 1,
      "explanation": "• Thao tác trực tiếp với Real DOM của trình duyệt rất tốn kém tài nguyên vì kích hoạt quá trình tính toán lại layout (Reflow) và vẽ lại pixel (Repaint).\n• React tạo Virtual DOM trên RAM (nhẹ hơn DOM thật rất nhiều), khi state thay đổi nó dùng thuật toán Diffing tìm ra phần khác biệt nhỏ nhất và cập nhật hàng loạt (Batching) lên Real DOM.",
      "textEn": "What is the Virtual DOM in React and how does it optimize UI performance?",
      "optionsEn": [
        "A lightweight virtual in-memory copy of the real DOM. When state changes, React updates Virtual DOM, computes differences (Diffing Algorithm / Reconciliation), and updates only the modified nodes in the Real DOM in batches",
        "A separate browser window used to render HTML",
        "A database table used to store React component state",
        "A plugin that completely replaces the browser DOM engine"
      ]
    },
    {
      "id": "iw05",
      "topic": "web",
      "text": "Trong React, phân biệt giữa State và Props?",
      "options": [
        "State truyền từ cha xuống con; Props lưu dữ liệu nội bộ",
        "Props (Properties) là dữ liệu truyền từ component cha xuống component con, component con chỉ đọc (Read-only / Immutable); State là dữ liệu trạng thái nội tại do chính component đó quản lý và có thể thay đổi được qua các hàm cập nhật (như useState)",
        "Props có thể thay đổi trực tiếp bằng lệnh gán this.props = ...",
        "Chỉ có Class Component mới có State, Functional Component không thể có State"
      ],
      "answer": 1,
      "explanation": "• `Props`: Do cha truyền xuống con. Con không được phép thay đổi props của mình (đảm bảo luồng dữ liệu 1 chiều One-way Data Flow).\n• `State`: Dữ liệu nội tại của component. Khi state thay đổi (qua `setState` hoặc `setX`), component và các con của nó sẽ re-render.",
      "textEn": "In React, what is the difference between State and Props?",
      "optionsEn": [
        "Props are inputs passed down from parent components (immutable to the receiving component); State is managed internally within a component and can change over time via setState / useState",
        "Props can be modified directly; State is read-only",
        "State can only be used in Functional components, Props only in Class components",
        "There is no difference; Props and State are synonyms in React"
      ]
    },
    {
      "id": "iw06",
      "topic": "web",
      "text": "Khi xây dựng form nhập liệu, việc kiểm tra tính hợp lệ của dữ liệu (Validation) nên thực hiện ở phía Client hay phía Server?",
      "options": [
        "Chỉ cần làm ở Client là đủ vì đã có JavaScript chặn người dùng",
        "Chỉ cần làm ở Server vì Client không quan trọng",
        "Bắt buộc phải làm ở cả hai phía: Client Validation giúp phản hồi tức thì và nâng cao trải nghiệm người dùng (UX); Server Validation là chốt chặn bắt buộc vì bảo mật (người dùng có thể bypass client bằng Postman, cURL hoặc tắt JavaScript)",
        "Làm ở đâu cũng được, phụ thuộc vào sở thích của lập trình viên"
      ],
      "answer": 2,
      "explanation": "💡 Nguyên tắc vàng bảo mật phần mềm: 'Never trust user input'.\n• Phía Client có thể bị vượt qua dễ dàng bằng cách gọi thẳng API bằng Postman, tắt JS trên trình duyệt hoặc sửa DOM trong DevTools.\n• Do đó, Server Validation là bắt buộc sống còn để chống SQL Injection, dữ liệu hỏng. Client validation để tăng tốc độ phản hồi cho người dùng.",
      "textEn": "When building input forms, why is client-side validation alone insufficient?",
      "optionsEn": [
        "Because client-side validation can be easily bypassed (using Postman, curl, or disabling JS); server-side validation is strictly required for data integrity and system security",
        "Client-side validation causes database crashes",
        "Browsers do not support validating text input fields",
        "Server-side validation is only needed when using microservices"
      ]
    },
    {
      "id": "idv01",
      "topic": "devops",
      "text": "Khi thực hiện git merge nhánh tính năng vào nhánh chính và xảy ra Git Conflict (Xung đột mã nguồn), quy trình xử lý chuẩn là gì?",
      "options": [
        "Xoá luôn nhánh chính và tạo lại từ đầu",
        "Dùng cờ --force để ghi đè mã nguồn của người khác",
        "Mở các file bị conflict, trao đổi với đồng đội viết đoạn code đó, chỉnh sửa giữ lại mã nguồn chính xác nhất (xoá các dấu <<<<<<<, =======, >>>>>>>), lưu file, chạy git add <file>, sau đó chạy git commit để hoàn tất merge",
        "Đóng IDE lại và không đẩy code lên nữa"
      ],
      "answer": 2,
      "explanation": "• Xung đột (Conflict) xảy ra khi 2 lập trình viên cùng chỉnh sửa trên cùng 1 dòng của 1 file.\n• Quy trình chuẩn: Dùng công cụ giải quyết xung đột (VS Code / Git Merge Tool), xem xét sự khác biệt, trao đổi với đồng nghiệp nếu cần, chọn phiên bản code đúng, xoá marker conflict, `git add` và commit.",
      "textEn": "When performing a git merge and encountering a Merge Conflict, what is the standard resolution process?",
      "optionsEn": [
        "Identify conflicting files with `git status`, manually resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), stage files with `git add`, and finalize with `git commit`",
        "Delete the local repository and clone from remote again",
        "Force push with `git push -f` to overwrite remote changes",
        "Run `git reset --hard` to abandon all teammates' commits"
      ]
    },
    {
      "id": "idv02",
      "topic": "devops",
      "text": "Unit Test là gì và tại sao cần viết Unit Test trong dự án phần mềm?",
      "options": [
        "Là việc kiểm thử toàn bộ hệ thống từ giao diện người dùng đến database trên môi trường Production",
        "Là việc kiểm thử từng đơn vị mã nguồn nhỏ nhất (thường là một method hoặc class) một cách độc lập và cô lập với các phụ thuộc bên ngoài (bằng cách Mocking như Mockito); giúp phát hiện lỗi sớm, tự tin refactor code và đảm bảo chất lượng phần mềm",
        "Là bài test do khách hàng kiểm tra trước khi thanh toán hợp đồng",
        "Là công cụ tự động viết code thay cho lập trình viên"
      ],
      "answer": 1,
      "explanation": "• Unit Test tập trung vào logic của 1 hàm đơn lẻ, chạy cực nhanh (mili-giây), dùng mock để giả lập database/service phụ thuộc (sử dụng JUnit 5 + Mockito trong Java).\n• Lợi ích lớn nhất: Giúp lập trình viên tự tin nâng cấp, tối ưu hóa (refactor) mà không sợ làm hỏng tính năng cũ (Regression testing).",
      "textEn": "What is a Unit Test and why is writing Unit Tests critical in professional software projects?",
      "optionsEn": [
        "Automated tests that verify individual units of code (such as a single method or class) in isolation (often mocking dependencies), helping catch regressions early, improve design, and enable confident refactoring",
        "Manual tests executed by QA testing engineers before release",
        "Load testing the production server under 10,000 concurrent users",
        "Tests checking the visual appearance of CSS buttons across mobile devices"
      ]
    },
    {
      "id": "idv03",
      "topic": "devops",
      "text": "Trong mô hình phát triển phần mềm Scrum, một chu kỳ Sprint thường kéo dài bao lâu và gồm những sự kiện (Scrum Events) chính nào?",
      "options": [
        "Kéo dài 1 năm, chỉ có sự kiện báo cáo cuối năm",
        "Thường kéo dài từ 1 đến 4 tuần (phổ biến nhất là 2 tuần); bao gồm 4 sự kiện chính: Sprint Planning (Lập kế hoạch), Daily Standup (Họp hằng ngày 15 phút), Sprint Review (Demo sản phẩm) và Sprint Retrospective (Họp cải tiến quy trình)",
        "Kéo dài vô tận đến khi nào xong toàn bộ dự án",
        "Chỉ gồm việc viết tài liệu và không cần lập trình"
      ],
      "answer": 1,
      "explanation": "Khung làm việc Scrum:\n1. Sprint Planning: Chọn các Task từ Product Backlog đưa vào Sprint Backlog.\n2. Daily Scrum (Standup): 15 phút mỗi ngày (Hôm qua làm gì? Hôm nay làm gì? Có khó khăn gì không?).\n3. Sprint Review: Trình diễn (demo) sản phẩm hoàn thiện cho Product Owner và Stakeholders.\n4. Sprint Retrospective: Cả team họp đúc rút kinh nghiệm (Cái gì làm tốt? Cái gì cần cải thiện?).",
      "textEn": "In the Scrum software development framework, how long does a typical Sprint cycle last?",
      "optionsEn": [
        "Typically 1 to 4 weeks (most commonly 2 weeks), ending with a potentially shippable product increment",
        "Exactly 6 months to 1 year",
        "1 single day only",
        "There is no fixed timebox; a sprint ends whenever developers finish writing code"
      ]
    },
    {
      "id": "idv04",
      "topic": "devops",
      "text": "Để thiết kế test cases cho chức năng Đăng Nhập (Login), một kỹ sư phần mềm cần bao quát những trường hợp nào?",
      "options": [
        "Chỉ cần test 1 trường hợp đăng nhập đúng tài khoản và mật khẩu",
        "Bao quát: Happy Path (đúng user/pass), Sai mật khẩu, Tài khoản không tồn tại, Để trống trường input, Nhập khoảng trắng, Nhập ký tự đặc biệt / SQL Injection, Tài khoản bị khóa (banned), Giới hạn số lần thử sai (Rate limit / Brute force), Nhớ mật khẩu (Remember me)",
        "Chỉ cần test giao diện trên điện thoại di động",
        "Chỉ test xem nút bấm có màu xanh không"
      ],
      "answer": 1,
      "explanation": "💡 Thể hiện tư duy kiểm thử (Testing Mindset) toàn diện:\n• Functional: Đúng pass -> vào trang chủ; Sai pass -> thông báo lỗi phù hợp.\n• Boundary/Edge: Tên quá dài, ký tự unicode, để trống.\n• Security: Thử SQL Injection (`' OR 1=1 --`), mã hóa password bcrypt, bảo vệ brute-force khóa tài khoản sau 5 lần nhập sai.",
      "textEn": "To design comprehensive test cases for a Login feature, what categories must be covered?",
      "optionsEn": [
        "Positive cases (valid credentials), Negative cases (wrong password, non-existent username, blank inputs, special characters/SQL injection), and Non-functional cases (rate limiting, password masking, remember me)",
        "Only test with a correct admin username and password",
        "Only test how fast the login button animates",
        "Only test login on a single Chrome browser version"
      ]
    },
    {
      "id": "idv05",
      "topic": "devops",
      "text": "Các môi trường chạy dự án thông thường gồm những môi trường nào và vai trò của file cấu hình prod.env là gì?",
      "options": [
        "Chỉ có 1 môi trường duy nhất chạy trên máy tính của lập trình viên",
        "Thường gồm: Development (môi trường lập trình local), Staging/UAT (môi trường thử nghiệm giả lập Production để QA test và khách hàng nghiệm thu), Production (môi trường thực tế cho người dùng cuối). File prod.env chứa cấu hình biến môi trường riêng biệt (DB production, domain live, API keys bảo mật) cho môi trường Production",
        "prod.env là file mã nguồn chứa logic xử lý thanh toán",
        "Staging là nơi lưu trữ backup mã nguồn khi bị mất điện"
      ],
      "answer": 1,
      "explanation": "• Dev: Chạy trên máy cá nhân, dùng DB local/docker.\n• Staging / UAT: Giống hệt môi trường thật 99%, dùng dữ liệu giả lập để kiểm thử toàn diện.\n• Production: Chạy cho khách hàng thật, yêu cầu ổn định 99.99%, backup liên tục, log giám sát chặt chẽ.",
      "textEn": "What are the standard software deployment environments in an enterprise project pipeline?",
      "optionsEn": [
        "Local (developer machine) -> DEV / SIT (development integration) -> UAT / Staging (user acceptance testing, pre-production mirror) -> PROD (live production environment)",
        "Only Local and PROD",
        "Cloud and Local only",
        "Staging only"
      ]
    },
    {
      "id": "iai01",
      "topic": "ai",
      "text": "LLM (Large Language Model - Mô hình Ngôn ngữ Lớn) là gì và ứng dụng thực tế của nó trong phát triển phần mềm hiện đại?",
      "options": [
        "Là một phần mềm diệt virus thông minh tự động chặn hacker",
        "Là mô hình trí tuệ nhân tạo được huấn luyện trên lượng dữ liệu văn bản khổng lồ dựa trên kiến trúc Transformer, có khả năng hiểu, sinh ngôn ngữ tự nhiên và code; ứng dụng trong sinh mã nguồn (Code generation), giải thích code, viết test tự động, tìm lỗi (Debugging) và tìm kiếm ngữ nghĩa (Semantic search)",
        "Là một hệ quản trị cơ sở dữ liệu mới thay thế cho MySQL",
        "Là một ngôn ngữ lập trình hướng đối tượng mới cạnh tranh với Java"
      ],
      "answer": 1,
      "explanation": "LLM (Gemini, Claude, GPT) sử dụng kiến trúc Transformer với cơ chế Self-Attention. Trong kỹ thuật phần mềm, LLM giúp tăng năng suất vượt bậc: chuyển mô tả nghiệp vụ thành code, tạo dữ liệu mẫu (mock data), phân tích log tìm bug, sinh tài liệu API (Swagger).",
      "textEn": "What is an LLM (Large Language Model) and how is it typically applied in software engineering?",
      "optionsEn": [
        "A deep learning AI model trained on massive text codebases to predict tokens and understand context, applied to code generation, code review, test case generation, debugging, and smart documentation",
        "A relational database optimization tool like MySQL Index",
        "A physical hardware robot that types on mechanical keyboards",
        "An antivirus software scanning computer memory for trojans"
      ]
    },
    {
      "id": "iai02",
      "topic": "ai",
      "text": "Để viết một Prompt hiệu quả cho AI giải quyết một tính năng kỹ thuật trong phần mềm, cấu trúc Prompt chuẩn cần có những thành phần nào?",
      "options": [
        "Chỉ cần viết 1 câu ngắn gọn: 'Hãy viết code cho tôi'",
        "Cấu trúc chuẩn gồm: Role (Định vị vai trò chuyên gia), Context (Ngữ cảnh dự án, công nghệ sử dụng, phiên bản), Task (Nhiệm vụ cụ thể cần làm), Constraints (Ràng buộc kỹ thuật, bảo mật, thư viện cho phép), và Output Format (Định dạng kết quả mong muốn)",
        "Viết càng nhiều từ tiếng Anh phức tạp càng tốt, không cần nói rõ công nghệ",
        "Viết bằng mã nhị phân 0 và 1"
      ],
      "answer": 1,
      "explanation": "💡 Cấu trúc Prompt chuyên nghiệp (RC-TCO Framework):\n1. Role: 'Bạn là chuyên gia Senior Java Spring Boot...'\n2. Context: 'Hệ thống dùng Java 21, Spring Boot 3.3, MySQL 8...'\n3. Task: 'Hãy viết REST API đăng ký người dùng...'\n4. Constraints: 'Không dùng Lombok, mã hóa password bằng BCrypt, validate bằng jakarta.validation...'\n5. Output: 'Chỉ trả về code Controller và DTO kèm comment tiếng Việt'.",
      "textEn": "To write an effective Prompt for an AI coding assistant, what core framework should be provided?",
      "optionsEn": [
        "Role (persona), Context (tech stack, existing architecture), Clear Task (specific goal), Constraints (libraries, forbidden patterns), and Expected Output format (code example, step-by-step diff)",
        "Write a single sentence 'write code for me' without any details",
        "Paste entire gigabytes of source code into prompt without instructions",
        "Only use prompts written in Python language"
      ]
    },
    {
      "id": "iai03",
      "topic": "ai",
      "text": "Khi sử dụng code do AI tạo ra (AI-generated code), người lập trình viên cần làm gì để đảm bảo an toàn và chất lượng phần mềm?",
      "options": [
        "Sao chép và dán trực tiếp vào dự án mà không cần đọc lại vì AI không bao giờ sai",
        "Đọc hiểu cẩn thận từng dòng code, kiểm tra tính bảo mật (lỗ hổng bảo mật, leak secret key), chạy Unit Test kiểm chứng, kiểm tra xem code có tuân thủ đúng kiến trúc dự án và chạy thử nghiệm trước khi commit",
        "Chỉ kiểm tra xem code có ngắn hay không",
        "Yêu cầu AI tự ký cam kết bảo hành phần mềm"
      ],
      "answer": 1,
      "explanation": "Lập trình viên là người chịu trách nhiệm cuối cùng (Responsible AI). AI có thể sinh ra code lỗi thời, thư viện bị deprecate, hoặc thậm chí sinh ra lỗ hổng bảo mật nghiêm trọng (SQL Injection, hardcoded password). Bắt buộc phải Code Review kỹ càng và chạy Test trước khi đưa vào codebase.",
      "textEn": "When using code generated by AI, what principle must developers always maintain?",
      "optionsEn": [
        "Review every line of code, verify security vulnerabilities/hallucinations, run automated tests, and ensure full understanding before committing to production",
        "Copy and paste code directly into production without testing since AI never makes errors",
        "Hide AI usage from teammates and commit without checking",
        "Never use AI for any programming tasks whatsoever"
      ]
    },
    {
      "id": "iai04",
      "topic": "ai",
      "text": "Khái niệm AI Agent trong phát triển phần mềm khác với một Chatbot AI thông thường ở điểm nào?",
      "options": [
        "AI Agent không có khả năng hiểu tiếng Việt",
        "AI Agent có khả năng tự nhận thức mục tiêu, lập kế hoạch từng bước (Reasoning & Planning), tự động sử dụng công cụ (Tool calling / Function calling như đọc ghi file, chạy command, gọi API) và tự sửa lỗi (Self-correction) để hoàn thành nhiệm vụ phức tạp mà không cần con người can thiệp từng bước",
        "AI Agent chỉ hoạt động được khi có mạng xã hội",
        "Cả hai hoàn toàn giống nhau"
      ],
      "answer": 1,
      "explanation": "• Chatbot: Chỉ nhận prompt và trả về text 1 lần (Single-turn request/response).\n• AI Agent: Có bộ nhớ (Memory), có khả năng suy nghĩ (Thought), chọn công cụ (Tool execution) như đọc file, viết code, chạy lệnh terminal, quan sát kết quả (Observation), và lặp lại vòng lặp cho đến khi hoàn thành mục tiêu tổng thể được giao.",
      "textEn": "How does an AI Agent differ from a simple AI Chatbot in software development?",
      "optionsEn": [
        "An AI Agent has agency: it can perceive its environment, formulate multi-step plans, autonomously invoke tools (terminal, file edits, git, browser, APIs), observe outcomes, and self-correct until reaching a defined goal",
        "An AI Agent is merely a chatbot that responds with emojis",
        "An AI Agent only runs on mobile phones",
        "There is no difference; Agent is purely a marketing buzzword"
      ]
    }
  ]
};

export const ALL_INTERVIEW_QUIZZES = [
  interviewAll,
  interviewSql,
  interviewJavaCore,
  interviewSpring,
  interviewWeb,
  interviewDevOps,
  interviewAi,
];
