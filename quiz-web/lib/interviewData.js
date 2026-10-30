// Bộ câu hỏi ôn tập phỏng vấn 1-1 phân loại theo từng dạng chuyên đề (Có song ngữ EN & VI):
export const interviewSql = {
  "slug": "interview-sql",
  "title": "Phỏng Vấn: SQL, Database & JDBC",
  "description": "Inner/Left Join, Group By & Having, Performance, Indexing, Execution Order, DML vs DDL, JDBC Statements.",
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
    },
    {
      "id": "isql17",
      "topic": "sql",
      "text": "Trong công nghệ JDBC của Java, phân biệt 3 loại đối tượng thực thi câu lệnh: Statement, PreparedStatement và CallableStatement?",
      "options": [
        "Statement dùng cho câu lệnh SELECT; PreparedStatement dùng cho INSERT/UPDATE; CallableStatement dùng cho DELETE",
        "Statement thực thi câu lệnh SQL tĩnh không có tham số; PreparedStatement biên dịch trước (pre-compiled) câu lệnh có tham số (?) giúp chống SQL Injection và tăng tốc độ; CallableStatement dùng để gọi các Stored Procedure / Function được lưu sẵn trong Database",
        "CallableStatement chỉ dùng được với hệ quản trị CSDL Oracle, các CSDL khác không hỗ trợ",
        "PreparedStatement chạy chậm hơn Statement vì phải qua bước kiểm tra kiểu dữ liệu"
      ],
      "answer": 1,
      "explanation": "• Statement: Tạo câu lệnh SQL tĩnh bằng phép nối chuỗi (dễ bị SQL Injection và DB phải parse lại mỗi lần chạy).\n• PreparedStatement: Câu lệnh được biên dịch trước, tham số được truyền qua dấu `?`, tự động escape ký tự nguy hiểm và được DB cache Execution Plan.\n• CallableStatement: Dùng để thực thi Stored Procedure có tham số IN/OUT.\n💡 Mẹo phỏng vấn: Luôn khẳng định trong dự án thực tế luôn dùng PreparedStatement (hoặc qua ORM như JPA/Hibernate) để đảm bảo 100% bảo mật chống SQL Injection.",
      "textEn": "In Java JDBC, what are the differences between Statement, PreparedStatement, and CallableStatement?",
      "optionsEn": [
        "Statement is used for SELECT; PreparedStatement is used for INSERT/UPDATE; CallableStatement is used for DELETE",
        "Statement executes static SQL strings without parameters; PreparedStatement executes pre-compiled SQL queries with placeholders (?) to prevent SQL Injection and optimize speed; CallableStatement is used to execute Stored Procedures and Functions stored in the database",
        "CallableStatement is only supported in Oracle database systems",
        "PreparedStatement is slower than Statement due to type-checking overhead"
      ]
    },
    {
      "id": "isql18",
      "topic": "sql",
      "text": "Ngoài khả năng chống tấn công SQL Injection, PreparedStatement còn có ưu điểm vượt trội nào về mặt hiệu năng so với Statement thường?",
      "options": [
        "PreparedStatement tự động nén dữ liệu truyền qua mạng",
        "RDBMS phân tích cú pháp (Parse), biên dịch (Compile) và lưu trữ kế hoạch thực thi (Query Execution Plan Cache) cho câu lệnh mẫu 1 lần duy nhất; các lần gọi sau chỉ cần truyền giá trị tham số mới vào thực thi ngay mà không cần biên dịch lại",
        "PreparedStatement bỏ qua bước kiểm tra quyền hạn của người dùng",
        "PreparedStatement ghi đè dữ liệu trực tiếp vào ổ cứng không qua bộ đệm RAM"
      ],
      "answer": 1,
      "explanation": "💡 Giải thích chuyên sâu cho câu hỏi phỏng vấn hay gặp:\nKhi gửi 1 câu SQL, RDBMS phải trải qua: Syntax Checking -> Semantic Checking -> Query Optimization -> Compile Execution Plan. Với `PreparedStatement`, các bước tốn CPU này chỉ chạy 1 lần. Khi chạy vòng lặp 1.000 lần thêm dữ liệu, PreparedStatement giúp giảm tải 80-90% thời gian xử lý của Database Server so với Statement thường.",
      "textEn": "Besides preventing SQL Injection, what major performance advantage does PreparedStatement offer over standard Statement?",
      "optionsEn": [
        "PreparedStatement automatically compresses data transmitted over the network",
        "The database engine parses, optimizes, and compiles the query execution plan once (Query Plan Caching); subsequent executions only bind new parameter values without re-compiling",
        "PreparedStatement bypasses database permission checks",
        "PreparedStatement writes directly to disk without using RAM buffers"
      ]
    },
    {
      "id": "isql19",
      "topic": "sql",
      "text": "Mục đích cốt lõi của việc thiết kế Sơ đồ Quan hệ Thực thể (ERD) và quá trình Chuẩn hóa dữ liệu (Normalization - 1NF, 2NF, 3NF) là gì?",
      "options": [
        "Tăng kích thước lưu trữ của database để bán thêm dung lượng ổ cứng",
        "Loại bỏ hiện tượng dư thừa dữ liệu (Data Redundancy), ngăn chặn các dị thường khi Thêm/Sửa/Xóa dữ liệu (Insertion/Update/Deletion Anomalies) và đảm bảo tính toàn vẹn dữ liệu (Data Integrity)",
        "Làm cho các câu truy vấn SELECT có tốc độ nhanh nhất có thể trong mọi tình huống mà không cần đánh index",
        "Ép buộc mọi bảng chỉ được có duy nhất 1 cột khóa chính là kiểu số nguyên"
      ],
      "answer": 1,
      "explanation": "• 1NF: Mỗi cột chứa giá trị nguyên tố (Atomic values), không có cột lặp lại.\n• 2NF: Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hoàn toàn vào toàn bộ khóa chính (loại bỏ phụ thuộc một phần vào Composite Key).\n• 3NF: Đạt 2NF và không có phụ thuộc bắc cầu giữa các thuộc tính không khóa.\n💡 Mẹo phỏng vấn: Chuẩn hóa cao (3NF) giúp dữ liệu nhất quán, không bị trùng lặp khi update; tuy nhiên trong hệ thống Big Data/Data Warehouse hoặc báo cáo, người ta có thể 'Khử chuẩn hóa' (Denormalization) có chủ đích để giảm JOIN tăng tốc độ đọc.",
      "textEn": "What is the primary purpose of Entity Relationship Diagram (ERD) design and Database Normalization (1NF, 2NF, 3NF)?",
      "optionsEn": [
        "To increase database storage size to utilize excess disk space",
        "To eliminate data redundancy, prevent insertion/update/deletion anomalies, and ensure data integrity",
        "To ensure SELECT queries run at maximum speed under all circumstances without indexes",
        "To force all database tables to only contain integer primary keys"
      ]
    }
  ]
};
export const interviewJavaCore = {
  "slug": "interview-javacore",
  "title": "Phỏng Vấn: Java Core, OOP & Collections",
  "description": "OOP 4 tính chất, final/static, String Pool, Collections List/Set/Map, Exception, Memory Stack/Heap, GC, Stream API.",
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
    },
    {
      "id": "ijc12",
      "topic": "javacore",
      "text": "Bốn tính chất cốt lõi của Lập trình Hướng đối tượng (OOP) trong ngôn ngữ Java là gì?",
      "options": [
        "Biên dịch (Compilation), Thực thi (Execution), Quản lý bộ nhớ (Garbage Collection), Đa luồng (Multithreading)",
        "Đóng gói (Encapsulation), Kế thừa (Inheritance), Đa hình (Polymorphism) và Trừu tượng (Abstraction)",
        "Static, Final, Abstract, Interface",
        "Public, Protected, Default, Private"
      ],
      "answer": 1,
      "explanation": "💡 Tóm tắt phỏng vấn ngắn gọn và sắc sảo:\n1. Đóng gói (Encapsulation): Che giấu dữ liệu nội bộ bằng private và cung cấp getter/setter.\n2. Kế thừa (Inheritance): Tái sử dụng và mở rộng thuộc tính/phương thức từ class cha qua từ khóa `extends`.\n3. Đa hình (Polymorphism): Một hành vi có thể thể hiện dưới nhiều hình thái khác nhau (Overloading & Overriding).\n4. Trừu tượng (Abstraction): Tập trung vào đối tượng làm ĐƯỢC GÌ thay vì làm NHƯ THẾ NÀO (qua abstract class và interface).",
      "textEn": "What are the four fundamental pillars of Object-Oriented Programming (OOP) in Java?",
      "optionsEn": [
        "Compilation, Execution, Garbage Collection, Multithreading",
        "Encapsulation, Inheritance, Polymorphism, Abstraction",
        "Static, Final, Abstract, Interface",
        "Public, Protected, Default, Private"
      ]
    },
    {
      "id": "ijc13",
      "topic": "javacore",
      "text": "Trong Java, sự khác biệt giữa Đa hình lúc biên dịch (Compile-time Polymorphism) và Đa hình lúc chạy (Runtime Polymorphism) là gì?",
      "options": [
        "Compile-time là dùng interface; Runtime là dùng abstract class",
        "Compile-time thể hiện qua Nạp chồng phương thức (Method Overloading - cùng tên khác tham số, quyết định lúc compile); Runtime thể hiện qua Ghi đè phương thức (Method Overriding - lớp con viết lại method lớp cha, quyết định lúc chạy thông qua Dynamic Method Dispatch)",
        "Compile-time chỉ áp dụng cho biến static; Runtime chỉ áp dụng cho biến final",
        "Cả hai đều xảy ra lúc chạy và không có gì khác biệt"
      ],
      "answer": 1,
      "explanation": "• Method Overloading (Đa hình tĩnh / Compile-time): Trình biên dịch dựa vào số lượng và kiểu tham số để biết chính xác hàm nào được gọi.\n• Method Overriding (Đa hình động / Runtime): Biến tham chiếu kiểu cha trỏ đến đối tượng con (`Animal a = new Dog(); a.makeSound()`), JVM phải đợi đến lúc chạy mới biết đối tượng thực tế là `Dog` để gọi `Dog.makeSound()`.",
      "textEn": "In Java, what is the difference between Compile-time Polymorphism and Runtime Polymorphism?",
      "optionsEn": [
        "Compile-time uses interfaces; Runtime uses abstract classes",
        "Compile-time is achieved via Method Overloading (resolved at compilation time based on parameter signatures); Runtime is achieved via Method Overriding (resolved at runtime via Dynamic Method Dispatch based on actual object instance)",
        "Compile-time only applies to static variables; Runtime only applies to final variables",
        "Both occur at runtime with no practical differences"
      ]
    },
    {
      "id": "ijc14",
      "topic": "javacore",
      "text": "Sắp xếp phạm vi truy cập (Scope) của 4 Access Modifier trong Java từ hẹp nhất đến rộng nhất?",
      "options": [
        "default < private < protected < public",
        "private < default (package-private) < protected < public",
        "private < protected < default < public",
        "protected < private < default < public"
      ],
      "answer": 1,
      "explanation": "1. `private`: Chỉ truy cập được bên trong chính class đó.\n2. `default` (không khai báo gì): Truy cập được bởi tất cả class trong CÙNG package.\n3. `protected`: Truy cập được trong cùng package + các lớp con (subclass) kể cả ở package khác.\n4. `public`: Truy cập tự do từ mọi nơi trong toàn bộ project.",
      "textEn": "Order Java's 4 Access Modifiers from narrowest to widest accessibility scope?",
      "optionsEn": [
        "default < private < protected < public",
        "private < default (package-private) < protected < public",
        "private < protected < default < public",
        "protected < private < default < public"
      ]
    },
    {
      "id": "ijc15",
      "topic": "javacore",
      "text": "Tác dụng của từ khóa final trong Java khi áp dụng cho Biến, Phương thức (Method) và Lớp (Class) là gì?",
      "options": [
        "Biến thành hằng số không đổi; Phương thức không thể bị Ghi đè (Override); Lớp không thể bị Kế thừa (Inheritance)",
        "Biến được lưu vào bộ nhớ cache; Phương thức chạy nhanh hơn; Lớp tự động chuyển thành singleton",
        "Biến chỉ đọc lúc biên dịch; Phương thức chỉ được gọi 1 lần; Lớp không thể tạo object bằng từ khóa new",
        "Biến tự động giải phóng vùng nhớ; Phương thức chạy đa luồng; Lớp không có constructor"
      ],
      "answer": 0,
      "explanation": "• `final variable`: Giá trị chỉ được gán một lần duy nhất (hằng số).\n• `final method`: Lớp con không được phép override phương thức này (bảo toàn logic cốt lõi).\n• `final class`: Không class nào có thể kế thừa class này (ví dụ: `java.lang.String` là final class để đảm bảo tính bất biến Immutable và bảo mật).",
      "textEn": "What is the effect of the final keyword when applied to Variables, Methods, and Classes in Java?",
      "optionsEn": [
        "Variable becomes constant (cannot be reassigned); Method cannot be overridden by subclasses; Class cannot be extended (inherited)",
        "Variable is stored in cache; Method runs faster; Class becomes a singleton",
        "Variable is compile-time only; Method can only be called once; Class cannot be instantiated with new",
        "Variable is auto-garbage-collected; Method is multi-threaded; Class has no constructor"
      ]
    },
    {
      "id": "ijc16",
      "topic": "javacore",
      "text": "Khi gọi hàm super() để kích hoạt Constructor của lớp cha trong Constructor của lớp con, quy tắc bắt buộc là gì?",
      "options": [
        "super() phải được đặt ở dòng cuối cùng của Constructor lớp con",
        "Lệnh gọi super(...) bắt buộc phải là câu lệnh đầu tiên trong Constructor của lớp con",
        "super() chỉ được gọi nếu phương thức đó có gắn từ khóa static",
        "Không được truyền tham số vào super()"
      ],
      "answer": 1,
      "explanation": "• Trong Java, khi khởi tạo một đối tượng lớp con, trạng thái của lớp cha phải được khởi tạo TRƯỚC TIÊN. Do đó lệnh gọi `super(...)` (hoặc `this(...)`) bắt buộc phải là dòng lệnh đầu tiên trong Constructor.\n• Nếu lập trình viên không viết `super(...)`, trình biên dịch Java sẽ tự động chèn `super()` không tham số vào dòng đầu tiên.",
      "textEn": "What is the mandatory rule when calling super() in a subclass constructor in Java?",
      "optionsEn": [
        "super() must be placed as the last statement in the subclass constructor",
        "The call to super(...) must be the very first statement in the subclass constructor",
        "super() can only be called if the constructor is marked static",
        "super() cannot take any parameters"
      ]
    },
    {
      "id": "ijc17",
      "topic": "javacore",
      "text": "Cơ chế String Constant Pool trong Java hoạt động thế nào và tại sao so sánh chuỗi bằng toán tử == có thể cho kết quả sai?",
      "options": [
        "String Pool lưu chuỗi vào ổ cứng để tiết kiệm RAM",
        "String Pool là vùng nhớ đặc biệt trong Heap lưu trữ các chuỗi literal để tái sử dụng; toán tử == so sánh địa chỉ tham chiếu vùng nhớ (reference), trong khi chuỗi tạo bằng new String(...) sẽ tạo object mới ngoài Pool khiến == trả về false dù nội dung giống nhau",
        "Toán tử == chỉ so sánh được chuỗi có độ dài dưới 10 ký tự",
        "String Pool tự động xóa chuỗi sau 5 giây nếu không ai dùng"
      ],
      "answer": 1,
      "explanation": "• Khi khai báo `String s1 = \"Java\"; String s2 = \"Java\";` -> Cả hai trỏ cùng 1 địa chỉ trong String Pool nên `s1 == s2` là `true`.\n• Khi khai báo `String s3 = new String(\"Java\");` -> Tạo đối tượng mới trên Heap nên `s1 == s3` là `false`!\n💡 Quy tắc bất biến: Luôn dùng `s1.equals(s3)` để so sánh nội dung chuỗi trong Java.",
      "textEn": "How does the String Constant Pool work in Java, and why can comparing strings with == yield incorrect results?",
      "optionsEn": [
        "String Pool saves strings to disk to conserve RAM",
        "String Pool is a special storage area in Heap that reuses string literals; operator == checks reference equality (memory addresses), whereas new String(...) allocates a distinct object outside the pool, causing == to evaluate to false even with identical contents",
        "Operator == only compares strings with fewer than 10 characters",
        "String Pool automatically expires strings after 5 seconds"
      ]
    },
    {
      "id": "ijc18",
      "topic": "javacore",
      "text": "Trong ngôn ngữ Java, phương thức truyền tham số vào hàm (Argument Passing) là Pass-by-value hay Pass-by-reference?",
      "options": [
        "Java truyền kiểu nguyên thủy bằng Pass-by-value, truyền Object bằng Pass-by-reference",
        "Java là 100% Pass-by-value: Khi truyền biến nguyên thủy là truyền bản sao của giá trị; khi truyền Object là truyền bản sao của địa chỉ tham chiếu (reference pointer)",
        "Java là 100% Pass-by-reference giống con trỏ C++",
        "Phụ thuộc vào việc hàm đó có gắn từ khóa static hay không"
      ],
      "answer": 1,
      "explanation": "💡 Câu hỏi bẫy kinh điển trong phỏng vấn Java:\nJava KHÔNG CÓ Pass-by-reference. Java luôn là Pass-by-value.\nKhi truyền 1 object `Person p` vào hàm `change(Person person)`:\n- Nếu bạn gọi `person.setName(\"Nam\")`: Thuộc tính của object bị thay đổi vì cả 2 con trỏ cùng trỏ đến 1 vùng nhớ Heap.\n- Nhưng nếu bạn gán `person = new Person(\"Lan\")`: Object `p` ở ngoài hàm hoàn toàn KHÔNG THAY ĐỔI vì `person` chỉ là bản sao của địa chỉ tham chiếu!",
      "textEn": "In Java, is argument passing Pass-by-value or Pass-by-reference?",
      "optionsEn": [
        "Java uses Pass-by-value for primitives and Pass-by-reference for Objects",
        "Java is strictly 100% Pass-by-value: For primitives it passes a copy of the literal value; for objects it passes a copy of the reference address (pointer value)",
        "Java is strictly 100% Pass-by-reference similar to C++ pointers",
        "It depends on whether the method has the static modifier"
      ]
    },
    {
      "id": "ijc19",
      "topic": "javacore",
      "text": "Phân biệt 3 Interface cốt lõi trong Java Collections Framework: List, Set và Map?",
      "options": [
        "List là danh sách liên kết; Set là mảng 1 chiều; Map là mảng 2 chiều",
        "List lưu trữ có thứ tự và cho phép phần tử trùng lặp; Set lưu trữ các phần tử duy nhất không trùng lặp; Map lưu trữ dữ liệu theo cặp Khóa - Giá trị (Key-Value) với các Key là duy nhất",
        "Set cho phép nhiều key trùng nhau; Map không lưu được chuỗi ký tự",
        "List và Set không thể chứa phần tử null"
      ],
      "answer": 1,
      "explanation": "• `List` (ArrayList, LinkedList): Có chỉ số (Index), duy trì thứ tự chèn, cho phép trùng lặp.\n• `Set` (HashSet, TreeSet): Không cho phép trùng lặp phần tử (dựa vào `hashCode` và `equals`).\n• `Map` (HashMap, TreeMap): Lưu theo cặp `Key - Value`. Key là duy nhất (nếu put trùng key sẽ ghi đè value cũ).",
      "textEn": "What are the distinctions among the 3 core interfaces in Java Collections Framework: List, Set, and Map?",
      "optionsEn": [
        "List is a linked list; Set is a 1D array; Map is a 2D array",
        "List maintains insertion order and allows duplicate elements; Set stores unique elements without duplicates; Map stores Key-Value pairs where each Key must be unique",
        "Set allows duplicate keys; Map cannot store string values",
        "List and Set cannot contain null elements"
      ]
    },
    {
      "id": "ijc20",
      "topic": "javacore",
      "text": "Trong máy ảo Java (JVM), Garbage Collector (GC) quyết định một đối tượng đủ điều kiện bị thu gom rác dựa trên nguyên lý nào?",
      "options": [
        "Khi đối tượng đã được tạo quá 10 phút mà không được gọi",
        "Khi đối tượng trở nên 'Không thể tiếp cận' (Unreachable) - tức không còn bất kỳ đường dẫn tham chiếu nào xuất phát từ các GC Roots (như biến cục bộ trên Stack, luồng đang chạy, biến static)",
        "Khi lập trình viên gọi lệnh System.gc() thì đối tượng lập tức bị xóa ngay",
        "Khi dung lượng RAM của máy tính bị đầy 100%"
      ],
      "answer": 1,
      "explanation": "• JVM dùng thuật toán Reachability Analysis (Truy vết khả năng tiếp cận) bắt đầu từ các GC Roots.\n• Nếu một object trong Heap không có đường dẫn nào kết nối tới GC Root, nó được coi là rác (Garbage) và đủ điều kiện bị thu dọn.\n💡 Mẹo phỏng vấn: Lệnh `System.gc()` chỉ là lời 'gợi ý' (suggestion) cho JVM chứ không hề cam kết JVM sẽ chạy GC ngay lập tức.",
      "textEn": "In JVM, what principle determines that an object is eligible for Garbage Collection (GC)?",
      "optionsEn": [
        "When the object has existed for more than 10 minutes without being accessed",
        "When the object becomes Unreachable - meaning there are no valid reference chains connecting it to any GC Roots (such as stack local variables, active threads, static references)",
        "When the developer explicitly executes System.gc(), the object is immediately destroyed",
        "When computer RAM utilization reaches 100%"
      ]
    }
  ]
};
export const interviewSpring = {
  "slug": "interview-spring",
  "title": "Phỏng Vấn: Spring Boot, JPA & Hibernate",
  "description": "IoC & DI, Bean Scope & Lifecycle, @RestController vs @Controller, JPA/Hibernate, Validation, Global Exception, CORS.",
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
    },
    {
      "id": "isp07",
      "topic": "spring",
      "text": "Trong Spring Framework, Bean Scope là gì và phân biệt giữa hai phạm vi phổ biến nhất: singleton và prototype?",
      "options": [
        "singleton chỉ dùng cho Database; prototype chỉ dùng cho Web Controller",
        "singleton (mặc định) chỉ tạo duy nhất 1 instance của Bean trên toàn bộ Spring IoC Container; prototype tạo một instance mới mỗi khi Bean được yêu cầu inject hoặc gọi qua getBean()",
        "prototype lưu Bean vào Session của người dùng; singleton lưu vào Cookie",
        "singleton chỉ sống trong 1 request; prototype sống vĩnh viễn"
      ],
      "answer": 1,
      "explanation": "• `singleton` (default scope): Spring IoC Container chỉ khởi tạo 1 instance duy nhất và chia sẻ cho tất cả các class inject nó (vô cùng tối ưu bộ nhớ, tuy nhiên phải thiết kế Stateless - không lưu trạng thái mutable để tránh Race Condition).\n• `prototype`: Mỗi lần inject (@Autowired) sẽ sinh ra 1 object hoàn toàn mới.\n• Các web scopes khác: `request`, `session`, `application`.",
      "textEn": "In Spring Framework, what is Bean Scope and how do singleton and prototype scopes differ?",
      "optionsEn": [
        "singleton is only for databases; prototype is only for Web Controllers",
        "singleton (default) creates a single shared instance per Spring IoC Container; prototype creates a new distinct instance each time the bean is requested or injected",
        "prototype stores beans in user Session; singleton stores in Cookies",
        "singleton lives only for 1 HTTP request; prototype lives permanently"
      ]
    },
    {
      "id": "isp08",
      "topic": "spring",
      "text": "Sự khác biệt cốt lõi giữa hai Annotation @Controller và @RestController trong Spring Boot là gì?",
      "options": [
        "@Controller chỉ dùng cho microservices; @RestController dùng cho monolith",
        "@Controller trả về tên View (như HTML, JSP, Thymeleaf) để ViewResolver phân giải giao diện; @RestController là sự kết hợp của @Controller + @ResponseBody, tự động serialize kết quả trả về thành JSON/XML trong HTTP Response Body (dành cho REST API)",
        "@RestController bắt buộc phải kết hợp với Servlet; @Controller không cần",
        "Cả hai giống hệt nhau, @RestController chỉ là tên viết tắt"
      ],
      "answer": 1,
      "explanation": "• `@Controller`: Dành cho ứng dụng MVC truyền thống (Server-Side Rendering). Return string `\"index\"` -> tìm file `index.html`.\n• `@RestController` = `@Controller` + `@ResponseBody`: Dành cho RESTful Web Services. Return object `User` -> Jackson ObjectMapper tự động parse sang chuỗi JSON `{\"id\": 1, \"name\": \"Trung\"}` và trả thẳng về client.",
      "textEn": "What is the core difference between @Controller and @RestController in Spring Boot?",
      "optionsEn": [
        "@Controller is for microservices; @RestController is for monoliths",
        "@Controller returns a view template name resolved by ViewResolver; @RestController is a convenience annotation combining @Controller and @ResponseBody, automatically serializing return values directly into JSON/XML HTTP response bodies (for REST APIs)",
        "@RestController strictly requires Servlets; @Controller does not",
        "Both are completely identical; @RestController is merely an alias"
      ]
    },
    {
      "id": "isp09",
      "topic": "spring",
      "text": "Phân biệt các Annotation Stereotype: @Component, @Service, @Repository và @Bean trong Spring Boot?",
      "options": [
        "@Component chỉ dùng cho cấu hình mạng; @Bean dùng cho cơ sở dữ liệu",
        "@Component là annotation cha tổng quát; @Service dùng cho tầng Business Logic; @Repository dùng cho tầng DAO/Truy xuất dữ liệu (hỗ trợ dịch Exception); @Bean được đặt trên method trong class @Configuration để đăng ký bean của thư viện bên thứ 3",
        "@Bean tự động xóa dữ liệu sau khi chạy; @Service chạy ngầm vô hạn",
        "@Repository không thể inject vào Service"
      ],
      "answer": 1,
      "explanation": "• `@Component`: Đánh dấu class là một Spring-managed Bean để Component Scanning tự động phát hiện.\n• `@Service`: Chuyên biệt hóa của `@Component` ở tầng nghiệp vụ.\n• `@Repository`: Chuyên biệt hóa ở tầng dữ liệu, tự động kích hoạt cơ chế dịch lỗi database (PersistenceExceptionTranslationPostProcessor) sang Spring's DataAccessException.\n• `@Bean`: Áp dụng ở cấp độ Method, dùng khi bạn muốn tạo Bean từ class của thư viện bên ngoài mà bạn không thể chỉnh sửa source code để thêm `@Component`.",
      "textEn": "Distinguish between Spring's stereotype annotations: @Component, @Service, @Repository, and @Bean?",
      "optionsEn": [
        "@Component is only for networking; @Bean is only for databases",
        "@Component is the generic stereotype; @Service marks the business logic layer; @Repository marks the DAO/data access layer (with exception translation); @Bean is method-level in @Configuration classes to instantiate 3rd-party library beans",
        "@Bean deletes data automatically after execution; @Service runs indefinitely in the background",
        "@Repository cannot be injected into Service classes"
      ]
    },
    {
      "id": "isp10",
      "topic": "spring",
      "text": "Trong Spring Boot REST API, cơ chế Validation dữ liệu đầu vào hoạt động như thế nào và sự khác nhau giữa @Valid và @Validated là gì?",
      "options": [
        "@Valid chỉ kiểm tra số chẵn; @Validated kiểm tra số lẻ",
        "Khai báo các ràng buộc (@NotNull, @NotBlank, @Size, @Email...) trên thuộc tính DTO; @Valid là chuẩn tiêu chuẩn của Jakarta/JSR-380; @Validated là annotation của Spring, hỗ trợ thêm tính năng Validation theo nhóm (Validation Groups)",
        "@Validated chỉ chạy được trên môi trường Linux",
        "Không cần thư viện validation, Spring Boot tự động đoán đúng dữ liệu"
      ],
      "answer": 1,
      "explanation": "• Dùng `spring-boot-starter-validation`.\n• `@NotBlank`: Áp dụng cho String (không null, độ dài > 0 sau khi trim).\n• `@NotNull`: Không được null (thường dùng cho ID, Số, Date).\n• `@Valid`: Chuẩn Java/Jakarta Specification, kích hoạt validation lồng nhau.\n• `@Validated`: Do Spring cung cấp, hỗ trợ kiểm tra trên method parameter và phân nhóm (`groups = {OnCreate.class, OnUpdate.class}`).",
      "textEn": "In Spring Boot, how does input validation work and what is the difference between @Valid and @Validated?",
      "optionsEn": [
        "@Valid only validates even numbers; @Validated validates odd numbers",
        "Validation constraints (@NotNull, @NotBlank, @Size, @Email) are defined on DTO fields; @Valid is standard Jakarta/JSR-380; @Validated is Spring-specific and supports Validation Groups",
        "@Validated only runs on Linux operating systems",
        "Spring Boot automatically infers validation rules without any annotations"
      ]
    },
    {
      "id": "isp11",
      "topic": "spring",
      "text": "Mối quan hệ giữa JPA, Hibernate và Spring Data JPA là gì? Phân biệt CrudRepository và JpaRepository?",
      "options": [
        "JPA là cơ sở dữ liệu NoSQL; Hibernate là công cụ vẽ biểu đồ",
        "JPA là bộ đặc tả tiêu chuẩn (Specification); Hibernate là thư viện hiện thực (Implementation); Spring Data JPA là framework trừu tượng hóa tầng Repository; JpaRepository kế thừa CrudRepository và PagingAndSortingRepository, bổ sung thêm các phương thức flush(), batch delete và trả về List thay vì Iterable",
        "JpaRepository không hỗ trợ phân trang dữ liệu; CrudRepository hỗ trợ phân trang",
        "Bắt buộc phải gắn @Repository lên interface JpaRepository thì project mới chạy được"
      ],
      "answer": 1,
      "explanation": "💡 Mẹo phỏng vấn cực hay:\n1. JPA là hợp đồng (Interface/Spec), Hibernate là người thực thi hợp đồng.\n2. Interface extends `JpaRepository` KHÔNG CẦN gắn `@Repository` vì Spring Data JPA tự động tạo Proxy bean cho mọi interface extends Repository.\n3. `JpaRepository` tiện hơn `CrudRepository` vì các hàm như `findAll()` trả về thẳng `List<T>` (thay vì `Iterable<T>`), và có sẵn các hàm `saveAndFlush()`, `deleteInBatch()`.",
      "textEn": "What is the relationship among JPA, Hibernate, and Spring Data JPA? How do CrudRepository and JpaRepository differ?",
      "optionsEn": [
        "JPA is a NoSQL database; Hibernate is a diagramming library",
        "JPA is the official Java ORM specification; Hibernate is the concrete implementation; Spring Data JPA is an abstraction framework over data repositories; JpaRepository extends CrudRepository and PagingAndSortingRepository, adding flush(), batch deletion, and returning List<T> instead of Iterable<T>",
        "JpaRepository does not support pagination; CrudRepository does",
        "Adding @Repository on a JpaRepository interface is strictly required for the application to compile"
      ]
    },
    {
      "id": "isp12",
      "topic": "spring",
      "text": "Trong Spring Data JPA, có những cách chính nào để định nghĩa câu truy vấn dữ liệu từ Database trong interface Repository?",
      "options": [
        "Chỉ có thể viết code Java thuần kết nối JDBC",
        "1. Query Creation from Method Names (Derived Query như findByEmailAndStatus); 2. Annotation @Query với JPQL (hướng đối tượng); 3. Annotation @Query(nativeQuery = true) viết SQL thuần của DBMS; 4. Criteria API / Specification cho truy vấn động phức tạp",
        "Bắt buộc phải dùng XML mapping",
        "JPA chỉ hỗ trợ tìm kiếm theo ID, không hỗ trợ các điều kiện khác"
      ],
      "answer": 1,
      "explanation": "• Derived Queries: Tiện lợi cho câu ngắn (`findByAgeGreaterThan(int age)`).\n• JPQL (`@Query(\"SELECT u FROM User u WHERE u.email = :email\")`): Truy vấn dựa trên Tên Entity và Thuộc tính Java, độc lập với hệ quản trị CSDL.\n• Native Query (`@Query(value = \"SELECT * FROM users WHERE ...\", nativeQuery = true)`): Khi cần tận dụng tính năng riêng biệt của DBMS (như JSON operator, window functions).\n• Spring Data Specifications: Dùng khi form tìm kiếm có nhiều điều kiện lọc động (Dynamic Search).",
      "textEn": "In Spring Data JPA, what are the primary ways to define database queries in a Repository interface?",
      "optionsEn": [
        "Only by writing manual raw JDBC code",
        "1. Query Creation from Method Names (Derived queries like findByEmailAndStatus); 2. @Query with JPQL (Object-oriented); 3. @Query(nativeQuery = true) for raw DBMS SQL; 4. Criteria API / Specifications for dynamic criteria filtering",
        "XML mapping files are strictly mandatory",
        "JPA only supports queries by primary key ID and cannot filter by other columns"
      ]
    },
    {
      "id": "isp13",
      "topic": "spring",
      "text": "Spring Boot cấu hình kết nối Database như thế nào và tại sao nó chọn HikariCP làm Connection Pool mặc định?",
      "options": [
        "Cấu hình trong file HTML; HikariCP là CSDL chạy trên RAM",
        "Cấu hình qua file application.properties / application.yml (spring.datasource.url, username, password, driver-class-name); HikariCP được chọn vì là Connection Pool mã nguồn mở nhẹ nhất, nhanh nhất và tiêu thụ ít CPU nhất hiện nay, giúp duy trì sẵn các kết nối TCP để tái sử dụng mà không mất công tạo mới mỗi request",
        "HikariCP tự động sao lưu dữ liệu sang Google Drive mỗi 10 phút",
        "Spring Boot không hỗ trợ Connection Pool, mỗi request tạo 1 kết nối mới rồi đóng lại"
      ],
      "answer": 1,
      "explanation": "💡 Kiến trúc kết nối DB:\nKhởi tạo kết nối TCP và xác thực với Database Server tốn hàng chục đến hàng trăm mili-giây. Connection Pool (như HikariCP) duy trì sẵn một nhóm (pool) kết nối mở. Khi Service cần query, nó 'mượn' 1 connection từ pool, thực thi xong thì 'trả lại' cho pool thay vì đóng kết nối thật, giúp ứng dụng chịu tải hàng nghìn request/giây mà không làm nghẽn DB.",
      "textEn": "How does Spring Boot configure database connectivity and why does it use HikariCP as the default Connection Pool?",
      "optionsEn": [
        "Configured in HTML files; HikariCP is an in-memory database",
        "Configured via application.properties / application.yml (spring.datasource.url, username, password, driver-class-name); HikariCP is chosen because it is the fastest, lightest, and most CPU-efficient open-source connection pool, maintaining reusable TCP connections to eliminate per-request connection overhead",
        "HikariCP automatically backs up databases to Google Drive every 10 minutes",
        "Spring Boot does not support connection pooling; it opens and closes a new connection on every request"
      ]
    }
  ]
};
export const interviewReact = {
  "slug": "interview-react",
  "title": "Phỏng Vấn: React & Next.js Frontend",
  "description": "Virtual DOM, State vs Props, Hooks (useState, useEffect, useMemo), Next.js SSR/SSG/ISR, 'use client', SEO.",
  "icon": "⚛️",
  "color": "#61dafb",
  "order": 13,
  "questions": [
    {
      "id": "ir01",
      "topic": "react",
      "text": "Virtual DOM trong thư viện React là gì và cơ chế hoạt động của thuật toán Reconciliation (Diffing) diễn ra như thế nào?",
      "options": [
        "Virtual DOM là bản sao lưu dưới database của giao diện web",
        "Virtual DOM là một bản biểu diễn trừu tượng của Real DOM dưới dạng JavaScript Object nằm trong bộ nhớ RAM; khi state thay đổi, React so sánh Virtual DOM mới và cũ (thuật toán Diffing) rồi chỉ cập nhật phần tử thực sự thay đổi lên Real DOM (Reconciliation / Batching) giúp tăng hiệu năng render",
        "Virtual DOM thao tác trực tiếp với phần cứng màn hình nên nhanh hơn Real DOM hàng nghìn lần",
        "Virtual DOM làm ứng dụng tốn bộ nhớ hơn và không có lợi ích gì đáng kể"
      ],
      "answer": 1,
      "explanation": "• Thao tác trực tiếp với Real DOM của trình duyệt rất tốn kém tài nguyên vì kích hoạt quá trình tính toán lại layout (Reflow) và vẽ lại pixel (Repaint).\n• React tạo Virtual DOM trên RAM (nhẹ hơn DOM thật rất nhiều), khi state thay đổi nó dùng thuật toán Diffing tìm ra phần khác biệt nhỏ nhất và cập nhật hàng loạt (Batching) lên Real DOM.",
      "textEn": "What is the Virtual DOM in React and how does the Reconciliation (Diffing) algorithm optimize UI performance?",
      "optionsEn": [
        "A database backup of the user interface stored on the backend",
        "A lightweight virtual in-memory copy of the real DOM. When state changes, React updates Virtual DOM, computes differences (Diffing Algorithm / Reconciliation), and updates only the modified nodes in the Real DOM in batches",
        "A hardware-accelerated direct screen renderer",
        "A plugin that increases memory usage without practical benefits"
      ]
    },
    {
      "id": "ir02",
      "topic": "react",
      "text": "Virtual DOM có luôn luôn nhanh hơn Real DOM thật trong mọi tình huống không? Vì sao?",
      "options": [
        "Có, Virtual DOM luôn nhanh hơn 100% trong mọi trường hợp bất kể kích thước ứng dụng",
        "Không. Với các ứng dụng đơn giản hoặc thao tác DOM tĩnh nhỏ lẻ, việc thao tác trực tiếp Real DOM thực tế nhanh hơn vì không mất chi phí RAM tạo Virtual DOM và thời gian chạy thuật toán so sánh Diffing; lợi thế lớn nhất của React là trải nghiệm lập trình (DX) và cập nhật tối ưu hàng loạt (Batching) cho ứng dụng lớn phức tạp",
        "Virtual DOM chỉ chạy nhanh hơn khi người dùng sử dụng trình duyệt Google Chrome",
        "Virtual DOM chỉ nhanh hơn khi có kết nối Internet tốc độ cao"
      ],
      "answer": 1,
      "explanation": "💡 Câu hỏi phỏng vấn xuất sắc phân loại ứng viên:\nVirtual DOM KHÔNG PHẢI sinh ra để nhanh hơn Real DOM thuần túy (viết Vanilla JS tối ưu tay cho 1 element luôn nhanh hơn bất kỳ framework nào). Virtual DOM sinh ra để lập trình viên có thể viết code dạng Declarative (khai báo: 'giao diện trông như thế này dựa trên state'), và React đảm bảo hiệu năng ở mức 'đủ tốt' (good enough performance) trên các ứng dụng quy mô khổng lồ.",
      "textEn": "Is the Virtual DOM always faster than the Real DOM under all circumstances? Why?",
      "optionsEn": [
        "Yes, Virtual DOM is 100% faster in every single case regardless of application complexity",
        "No. For simple websites or localized DOM modifications, direct Real DOM manipulation is faster because it avoids in-memory VDOM allocation and diffing algorithm overhead; React's primary strengths are developer experience (DX), declarative UI, and batched updates for complex applications",
        "Virtual DOM is only faster when running specifically on Google Chrome",
        "Virtual DOM is only faster with high-speed broadband connections"
      ]
    },
    {
      "id": "ir03",
      "topic": "react",
      "text": "Trong React, phân biệt giữa State và Props?",
      "options": [
        "State truyền từ cha xuống con; Props lưu dữ liệu nội bộ",
        "Props (Properties) là dữ liệu truyền từ component cha xuống component con, component con chỉ đọc (Read-only / Immutable); State là dữ liệu trạng thái nội tại do chính component đó quản lý và khi thay đổi (qua setState / useState) sẽ kích hoạt component re-render",
        "Props có thể thay đổi trực tiếp bằng lệnh gán this.props = ...",
        "Chỉ có Class Component mới có State, Functional Component không thể có State"
      ],
      "answer": 1,
      "explanation": "• `Props`: Do component cha truyền xuống con. Component con không được phép thay đổi props của chính mình (đảm bảo luồng dữ liệu 1 chiều One-Way Data Flow).\n• `State`: Biến trạng thái nội tại. Khi gọi `setCount(newVal)`, React lên lịch re-render lại component để cập nhật UI tương ứng.",
      "textEn": "In React, what is the fundamental difference between State and Props?",
      "optionsEn": [
        "State is passed from parent to child; Props is private local data",
        "Props (Properties) are inputs passed down from a parent component (read-only and immutable for the child); State represents internal component state managed locally that triggers re-rendering when updated via setState/useState",
        "Props can be modified directly via assignment",
        "Only Class Components can have State; Functional Components cannot hold state"
      ]
    },
    {
      "id": "ir04",
      "topic": "react",
      "text": "Phân biệt vai trò và cơ chế hoạt động giữa hai React Hook cơ bản: useState và useEffect?",
      "options": [
        "useState dùng để gọi API; useEffect dùng để lưu giá trị ô input",
        "useState dùng để khai báo và quản lý biến trạng thái (re-render UI khi giá trị đổi); useEffect dùng để thực thi các tác vụ phụ (Side Effects như gọi API, đăng ký event listener, thao tác DOM, timers) sau khi component đã render lên màn hình",
        "useEffect chỉ chạy duy nhất 1 lần khi tắt trình duyệt",
        "Cả hai hook này có thể đặt bên trong vòng lặp for hoặc câu lệnh if tùy ý"
      ],
      "answer": 1,
      "explanation": "• `useState`: Quản lý state cục bộ. Mỗi lần gọi hàm setter (`setCount`), React xếp lịch re-render component.\n• `useEffect(callback, deps)`: Xử lý Side Effects.\n  - `deps = undefined`: Chạy sau mỗi lần render.\n  - `deps = []`: Chỉ chạy 1 lần duy nhất sau mount (tương đương `componentDidMount`).\n  - `deps = [a, b]`: Chạy lại khi `a` hoặc `b` thay đổi giá trị.\n  - Return cleanup function: Chạy trước khi unmount để tránh rò rỉ bộ nhớ (Memory Leak).",
      "textEn": "What are the distinct roles and mechanisms of the fundamental React Hooks: useState and useEffect?",
      "optionsEn": [
        "useState is used to call APIs; useEffect is used to store input values",
        "useState declares and manages local component state (triggering UI re-renders on change); useEffect executes Side Effects (such as data fetching, event listeners, subscriptions, timers) after the component renders",
        "useEffect only runs when closing the browser tab",
        "Both hooks can be freely placed inside for loops and if statements"
      ]
    },
    {
      "id": "ir05",
      "topic": "react",
      "text": "Khi nào nên sử dụng hai hook useMemo và useCallback trong React để tối ưu hiệu năng?",
      "options": [
        "Bắt buộc phải bọc tất cả mọi biến và hàm trong useMemo và useCallback để ứng dụng chạy nhanh nhất",
        "useMemo dùng để ghi nhớ kết quả của một phép tính toán tốn kém (expensive calculation); useCallback dùng để ghi nhớ định nghĩa hàm (function reference) tránh tạo con trỏ hàm mới mỗi lần re-render khi truyền xuống component con bọc React.memo",
        "useMemo dùng để gọi API; useCallback dùng để kết nối Database",
        "Hai hook này chỉ dùng được trong môi trường React Native"
      ],
      "answer": 1,
      "explanation": "💡 Lưu ý phỏng vấn về việc tối ưu hiệu năng (Performance Optimization):\nKhông nên lạm dụng `useMemo`/`useCallback` bừa bãi vì bản thân việc khởi tạo hook và mảng dependencies cũng tốn RAM và chi phí so sánh.\n- Dùng `useMemo`: Khi có phép tính lặp phức tạp (sort/filter mảng hàng nghìn phần tử).\n- Dùng `useCallback`: Khi truyền callback function xuống component con (được bọc bởi `React.memo`) để tránh component con bị re-render vô ích.",
      "textEn": "When should useMemo and useCallback be used in React for performance optimization?",
      "optionsEn": [
        "All variables and functions must be wrapped in useMemo and useCallback to maximize application speed",
        "useMemo memoizes the computed result of an expensive calculation; useCallback memoizes a function reference to prevent creating a new function instance on every render when passing callbacks to memoized child components (React.memo)",
        "useMemo is for fetching APIs; useCallback is for connecting to databases",
        "These two hooks can only be used in React Native applications"
      ]
    },
    {
      "id": "ir06",
      "topic": "react",
      "text": "Next.js hỗ trợ những phương thức Rendering (kết xuất trang) nào và điểm khác biệt chính giữa chúng là gì?",
      "options": [
        "Next.js chỉ hỗ trợ Client Side Rendering giống hệt Create-React-App",
        "1. CSR (Client-Side Rendering): Render hoàn toàn trên trình duyệt; 2. SSR (Server-Side Rendering): Render HTML trên Server cho mỗi request; 3. SSG (Static Site Generation): Tạo sẵn file HTML lúc build time; 4. ISR (Incremental Static Regeneration): Cập nhật ngầm trang tĩnh sau khoảng thời gian định sẵn mà không cần build lại toàn bộ web",
        "Next.js chỉ render được ảnh và video, không render được văn bản",
        "SSR chạy chậm hơn CSR 100 lần trong mọi tình huống"
      ],
      "answer": 1,
      "explanation": "• `CSR`: Nhẹ server nhưng chậm lần đầu (FCP) và kém SEO.\n• `SSR` (`getServerSideProps` hoặc dynamic fetch): Luôn có dữ liệu mới nhất, tốt cho trang Dashboard cá nhân hóa theo từng user.\n• `SSG` (`generateStaticParams` / static export): Tốc độ cực nhanh vì phân phối qua CDN, hoàn hảo cho blog, tài liệu, landing page.\n• `ISR`: Lấy ưu điểm của cả SSG và SSR (trang tĩnh nhưng có thể tự động revalidate sau X giây khi có dữ liệu mới).",
      "textEn": "What rendering strategies does Next.js support, and what are their key distinctions?",
      "optionsEn": [
        "Next.js only supports standard Client-Side Rendering identical to Create-React-App",
        "1. CSR (Client-Side Rendering): Executed in browser; 2. SSR (Server-Side Rendering): HTML generated on server per request; 3. SSG (Static Site Generation): HTML pre-rendered at build time; 4. ISR (Incremental Static Regeneration): Re-generates static pages in background on-demand without full site rebuilds",
        "Next.js only renders media files and cannot render text",
        "SSR is always 100 times slower than CSR in every scenario"
      ]
    },
    {
      "id": "ir07",
      "topic": "react",
      "text": "Trong Next.js App Router (React Server Components), chỉ thị \"use client\" đặt ở đầu file có ý nghĩa gì và khi nào bắt buộc phải dùng?",
      "options": [
        "Bắt buộc đặt trên 100% tất cả các file trong project Next.js",
        "Đánh dấu ranh giới chuyển đổi từ Server Component sang Client Component; bắt buộc phải dùng khi component có sử dụng React State/Hooks (useState, useEffect), Event Listeners (onClick, onChange) hoặc truy cập Web API trình duyệt (window, localStorage)",
        "Báo hiệu rằng file này là file CSS",
        "Cho phép kết nối trực tiếp đến cơ sở dữ liệu MongoDB mà không cần bảo mật"
      ],
      "answer": 1,
      "explanation": "• Trong Next.js App Router, mặc định tất cả component đều là React Server Components (RSC) - được render hoàn toàn trên server và không kèm JavaScript bundle xuống client, giúp web siêu nhẹ.\n• Khi bạn cần tính tương tác (Interactive): form input, click button, dùng `useState`, `useEffect`, `useRouter`,... thì BẮT BUỘC phải thêm `\"use client\";` ở dòng đầu tiên.",
      "textEn": "In Next.js App Router (React Server Components), what does the \"use client\" directive signify and when is it required?",
      "optionsEn": [
        "It must be added at the top of 100% of files in a Next.js project",
        "It marks the boundary between Server Components and Client Components; it is mandatory when a component uses React State/Hooks (useState, useEffect), DOM Event Listeners (onClick, onChange), or browser Web APIs (window, localStorage)",
        "It signals that the file contains CSS stylesheets",
        "It enables direct insecure client connections to MongoDB databases"
      ]
    },
    {
      "id": "ir08",
      "topic": "react",
      "text": "Nếu mục tiêu hàng đầu của dự án là tối ưu SEO (Search Engine Optimization), ta nên ưu tiên phương thức Rendering nào trong Next.js và vì sao?",
      "options": [
        "CSR (Client Side Rendering) vì trình duyệt tải rất nhẹ",
        "SSR (Server-Side Rendering) hoặc SSG (Static Site Generation); vì Bot tìm kiếm (Googlebot, Bingbot) sẽ nhận được toàn bộ mã HTML hoàn chỉnh chứa sẵn nội dung, tiêu đề h1 và thẻ meta ngay trong phản hồi đầu tiên, thay vì nhận file HTML rỗng <div id=\"root\"></div> của CSR",
        "Chỉ cần chèn thật nhiều từ khóa vào file README.md",
        "SEO không phụ thuộc vào phương thức rendering của website"
      ],
      "answer": 1,
      "explanation": "💡 Giải thích SEO phỏng vấn:\nVới CSR truyền thống, bot tìm kiếm nhận được thẻ `<div id=\"root\"></div>` trống rỗng và phải chờ JavaScript tải về thực thi (nhiều crawler mạng xã hội như Facebook, Zalo, Twitter bot thậm chí không chạy JS khi cào thẻ OpenGraph preview).\nVới SSR/SSG, máy chủ trả về mã HTML hoàn chỉnh có sẵn tiêu đề, đoạn văn và thẻ meta `<meta property=\"og:title\">`, giúp nội dung được lập chỉ mục (indexed) ngay lập tức và chính xác 100%.",
      "textEn": "If the primary goal of a web project is SEO optimization, which Next.js rendering strategy should be favored and why?",
      "optionsEn": [
        "CSR (Client-Side Rendering) because browser payload size is minimal",
        "SSR (Server-Side Rendering) or SSG (Static Site Generation); because search crawlers (Googlebot, Bingbot, social media scrapers) receive fully rendered HTML containing complete text, headers, and meta tags immediately in the initial response, instead of an empty <div id=\"root\"></div> shell",
        "Inserting arbitrary keywords into the project's README.md file",
        "SEO is completely independent of website rendering architecture"
      ]
    },
    {
      "id": "ir09",
      "topic": "react",
      "text": "Khi so sánh cơ chế hiển thị có điều kiện, sự khác nhau giữa directive v-if và v-show trong Vue.js (hoặc tương tự trong React) là gì?",
      "options": [
        "v-if chỉ dùng cho ảnh; v-show chỉ dùng cho bảng dữ liệu",
        "v-if thực sự gỡ bỏ hoặc thêm phần tử vào cây DOM (chi phí chuyển đổi cao hơn, phù hợp điều kiện ít thay đổi); v-show luôn render phần tử vào DOM và chỉ ẩn/hiển thị bằng thuộc tính CSS display: none (chi phí khởi tạo ban đầu cao hơn nhưng chuyển đổi bật/tắt cực nhanh)",
        "v-show làm trang web tải chậm hơn 10 lần",
        "Cả hai giống hệt nhau về cả cấu trúc DOM lẫn hiệu năng"
      ],
      "answer": 1,
      "explanation": "• `v-if`: Điều kiện sai -> phần tử hoàn toàn không tồn tại trong DOM. Rất tiết kiệm tài nguyên nếu điều kiện hiếm khi xảy ra.\n• `v-show`: Phần tử luôn được tạo trong DOM, chỉ thêm style `display: none`. Phù hợp tuyệt đối cho các thành phần bật/tắt liên tục (như Popup Modal, Tooltip, Tab chuyển đổi, Dropdown menu).",
      "textEn": "In Vue.js (or conditional rendering concepts), what is the difference between v-if and v-show directives?",
      "optionsEn": [
        "v-if is strictly for images; v-show is strictly for data tables",
        "v-if physically attaches or detaches elements from the DOM tree (higher toggle cost, ideal for rarely changing conditions); v-show always renders elements into the DOM and toggles visibility via CSS display: none (higher initial render cost but near-zero toggle cost)",
        "v-show causes the web application to load 10 times slower",
        "Both are identical in terms of DOM tree presence and performance"
      ]
    }
  ]
};
export const interviewWeb = {
  "slug": "interview-web",
  "title": "Phỏng Vấn: Web & JavaScript Fundamentals",
  "description": "Session vs Cookie, HTTP GET/POST/PUT, JS == vs ===, Box Model margin/padding, Asynchronous & Callback, JSON.",
  "icon": "🌐",
  "color": "#f59e0b",
  "order": 14,
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
      "id": "iw05",
      "topic": "web",
      "text": "Trong mô hình Box Model của CSS, sự khác nhau giữa margin và padding là gì?",
      "options": [
        "margin là màu nền; padding là màu viền",
        "padding là khoảng cách đệm bên trong đường viền (border) bao quanh nội dung; margin là khoảng cách bên ngoài đường viền đẩy lùi các phần tử lân cận xung quanh",
        "padding chỉ dùng cho thẻ div; margin dùng cho thẻ span",
        "Cả hai hoàn toàn giống nhau và có thể thay thế cho nhau trong mọi trường hợp"
      ],
      "answer": 1,
      "explanation": "• CSS Box Model từ trong ra ngoài: Content -> Padding -> Border -> Margin.\n• `Padding`: Làm tăng kích thước vùng nền (background) của phần tử.\n• `Margin`: Tạo khoảng trống giữa phần tử này với phần tử khác (có hiện tượng Margin Collapsing giữa 2 margin dọc kề nhau).",
      "textEn": "In the CSS Box Model, what is the difference between margin and padding?",
      "optionsEn": [
        "margin controls background color; padding controls border color",
        "padding is inner spacing between the content and the element border; margin is outer spacing outside the border separating the element from surrounding neighbors",
        "padding is only applicable to div tags; margin is only for span tags",
        "Both are completely identical and interchangeable"
      ]
    },
    {
      "id": "iw06",
      "topic": "web",
      "text": "DOM (Document Object Model) trong trình duyệt là gì và sự khác nhau giữa document.getElementById và document.querySelector trong JavaScript là gì?",
      "options": [
        "DOM là giao thức kết nối internet; getElementById chỉ dùng cho file XML",
        "DOM là giao diện lập trình biểu diễn tài liệu HTML dưới dạng cây các đối tượng (Node Tree); getElementById tìm kiếm trực tiếp theo ID duy nhất (tốc độ thực thi cực nhanh, trả về Element); querySelector nhận bất kỳ chuỗi CSS selector nào (#id, .class, tag[attr]), linh hoạt hơn nhưng tốc độ chậm hơn một chút",
        "querySelector luôn trả về một mảng danh sách tất cả các phần tử",
        "document.getElementById chỉ chạy được trên điện thoại di động"
      ],
      "answer": 1,
      "explanation": "• DOM: Cây đối tượng cho phép JavaScript đọc, sửa, thêm hoặc xóa các thẻ HTML và style CSS động.\n• `getElementById('my-btn')`: Tìm theo ID (rất nhanh, trả về 1 element hoặc null).\n• `querySelector('.nav > .active')`: Nhận CSS selector phức tạp, trả về phần tử đầu tiên khớp.\n• `querySelectorAll(...)`: Trả về NodeList chứa tất cả các phần tử khớp.",
      "textEn": "What is the DOM in browser environments, and how do document.getElementById and document.querySelector differ?",
      "optionsEn": [
        "DOM is a networking protocol; getElementById is strictly for XML files",
        "The DOM (Document Object Model) is an API representing HTML documents as a node tree; getElementById queries directly by unique ID (fastest performance, returns an Element); querySelector accepts any CSS selector string (#id, .class, [attr]), offering higher flexibility with slight overhead",
        "querySelector always returns an array of all matching elements",
        "document.getElementById only functions on mobile browsers"
      ]
    },
    {
      "id": "iw07",
      "topic": "web",
      "text": "Khi xử lý sự kiện submit của thẻ `<form>` bằng JavaScript, tại sao lập trình viên hầu như luôn gọi event.preventDefault()?",
      "options": [
        "Để xóa sạch cơ sở dữ liệu trên server",
        "Để ngăn chặn hành vi mặc định của trình duyệt là gửi HTTP request đồng bộ và tải lại toàn bộ trang web (page reload), cho phép JavaScript kiểm tra tính hợp lệ và gửi dữ liệu bất đồng bộ qua AJAX / Fetch API",
        "Để tăng tốc độ kết nối mạng lên gấp đôi",
        "Để mã hóa mật khẩu người dùng thành dạng SHA-256"
      ],
      "answer": 1,
      "explanation": "• Mặc định khi click submit button trong form, trình duyệt sẽ gửi request và reload lại toàn bộ trang (mất toàn bộ state hiện tại của ứng dụng Single Page App).\n• `event.preventDefault()` chặn hành vi reload mặc định, cho phép xử lý dữ liệu bằng JS (validate, hiển thị loading spinner, gọi `fetch('/api/login')`).",
      "textEn": "When handling a `<form>` submit event in JavaScript, why do developers almost universally call event.preventDefault()?",
      "optionsEn": [
        "To wipe out the backend server database",
        "To prevent the browser's default behavior of issuing a synchronous HTTP request and reloading the entire web page, enabling client-side validation and asynchronous submission via Fetch/AJAX",
        "To double the network connection bandwidth",
        "To automatically hash user passwords using SHA-256"
      ]
    },
    {
      "id": "iw08",
      "topic": "web",
      "text": "Khái niệm Callback trong JavaScript là gì và vấn đề Callback Hell được giải quyết như thế nào trong JavaScript hiện đại?",
      "options": [
        "Callback là cuộc gọi điện thoại thoại; Callback Hell là lỗi mất sóng",
        "Callback là một hàm được truyền dưới dạng đối số vào một hàm khác để được gọi lại thực thi sau khi một tác vụ (thường là bất đồng bộ) hoàn tất; Callback Hell (lồng nhau quá nhiều tầng) gây khó đọc và khó bắt lỗi, được giải quyết bằng Promise và cú pháp async/await",
        "Callback chỉ dùng được trong CSS; giải quyết bằng cách cài Bootstrap",
        "Callback Hell không thể giải quyết được trong ngôn ngữ JavaScript"
      ],
      "answer": 1,
      "explanation": "• Callback: `setTimeout(() => console.log('Done'), 1000)`.\n• Callback Hell (Pyramid of Doom): Khi các tác vụ bất đồng bộ phụ thuộc nhau (đọc file 1 -> đọc file 2 -> ghi DB) lồng nhau sâu hoắm.\n• Giải pháp: ES6 ra mắt `Promise`, và ES8 (ES2017) ra mắt `async/await` giúp viết mã bất đồng bộ trông tuần tự, sáng sủa và bắt lỗi dễ dàng qua `try/catch`.",
      "textEn": "What is a Callback in JavaScript, and how was Callback Hell resolved in modern JavaScript?",
      "optionsEn": [
        "A callback is an audio phone call; Callback Hell is signal loss",
        "A callback is a function passed as an argument to another function to be executed after an asynchronous task completes; Callback Hell (excessive nested callbacks) was solved by Promises and async/await syntax",
        "Callbacks are only used in CSS; resolved by installing Bootstrap",
        "Callback Hell is an unfixable limitation of the JavaScript language"
      ]
    },
    {
      "id": "iw09",
      "topic": "web",
      "text": "Định dạng JSON là gì và phân biệt hai phương thức JSON.stringify() và JSON.parse() trong JavaScript?",
      "options": [
        "JSON là phần mềm chỉnh sửa ảnh; stringify vẽ ảnh, parse xuất video",
        "JSON (JavaScript Object Notation) là định dạng trao đổi dữ liệu dạng văn bản nhẹ, độc lập với ngôn ngữ; JSON.stringify() chuyển đổi JavaScript Object/Array thành chuỗi văn bản JSON; JSON.parse() phân tích chuỗi văn bản JSON thành JavaScript Object tương ứng",
        "JSON.stringify() dùng để giải mã mật mã; JSON.parse() dùng để mã hóa mật mã",
        "Cả hai hàm đều dùng để xóa bộ nhớ cache của trình duyệt"
      ],
      "answer": 1,
      "explanation": "• JSON: Cú pháp chuẩn dựa trên object literal của JavaScript, chuẩn giao tiếp số 1 của RESTful API.\n• `JSON.stringify(obj)`: Biến object `{ name: 'An', age: 20 }` -> chuỗi text `'{\"name\":\"An\",\"age\":20}'` để gửi qua HTTP body.\n• `JSON.parse(str)`: Biến chuỗi text JSON nhận được từ server -> JavaScript Object để truy xuất `obj.name`.",
      "textEn": "What is JSON format, and how do JSON.stringify() and JSON.parse() differ in JavaScript?",
      "optionsEn": [
        "JSON is photo editing software; stringify renders images, parse exports video",
        "JSON (JavaScript Object Notation) is a lightweight language-independent data-interchange format; JSON.stringify() serializes a JavaScript Object/Array into a JSON string; JSON.parse() parses a JSON string into its corresponding JavaScript Object",
        "JSON.stringify() decrypts data; JSON.parse() encrypts data",
        "Both functions clear browser memory cache"
      ]
    },
    {
      "id": "iw10",
      "topic": "web",
      "text": "Node.js là gì và cơ chế xử lý Single-Threaded Event Loop của Node.js giúp nó xử lý hàng ngàn kết nối đồng thời (High Concurrency) như thế nào?",
      "options": [
        "Node.js là một hệ điều hành mới thay thế Windows và Linux",
        "Node.js là môi trường runtime chạy mã JavaScript ngoài trình duyệt xây dựng trên V8 Engine; sử dụng cơ chế Non-blocking I/O và Event Loop đơn luồng ủy thác các tác vụ nặng (đọc ghi file, mạng, database) cho hệ điều hành bên dưới (libuv thread pool), cho phép tiếp tục nhận các request mới mà không bị chặn (blocked)",
        "Node.js tạo ra 1 tiến trình riêng biệt cho mỗi kết nối của người dùng",
        "Node.js chỉ chạy được trên các máy chủ có 64 core CPU"
      ],
      "answer": 1,
      "explanation": "💡 Câu hỏi phỏng vấn hay hỏi về Node.js:\n• Không giống Tomcat/Java truyền thống (mỗi request = 1 luồng riêng - Thread-per-request), Node.js chỉ có 1 Main Thread chạy code JavaScript.\n• Khi gặp I/O (Database query, API call), nó chuyển cho libuv xử lý ngầm và đăng ký callback. Main thread lập tức rảnh tay phục vụ request tiếp theo. Khi I/O xong, callback được đẩy vào Event Loop để thực thi.",
      "textEn": "What is Node.js and how does its Single-Threaded Event Loop handle high concurrent traffic?",
      "optionsEn": [
        "Node.js is a new operating system designed to replace Windows and Linux",
        "Node.js is a JavaScript runtime built on Chrome's V8 engine; its single-threaded Event Loop utilizes non-blocking I/O by delegating heavy operations (filesystem, network, database) to the underlying system (libuv thread pool), allowing it to handle thousands of concurrent requests without blocking",
        "Node.js spawns an isolated OS process for every individual user connection",
        "Node.js requires server hardware with at least 64 CPU cores"
      ]
    }
  ]
};
export const interviewDevOps = {
  "slug": "interview-devops",
  "title": "Phỏng Vấn: Git, Testing, Scrum & Dự Án",
  "description": "Git conflict, Unit Test & Mockito, Automation vs Manual, Scrum/Agile SDLC, Test Cases, Môi trường chạy.",
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
    },
    {
      "id": "idv06",
      "topic": "devops",
      "text": "Trong Unit Test ứng dụng Java/Spring Boot, thư viện Mockito dùng để làm gì và ý nghĩa của các annotation @Mock và @InjectMocks?",
      "options": [
        "Mockito dùng để tạo giao diện người dùng tự động",
        "Dùng để tạo các đối tượng giả lập (Mock objects) cô lập tầng đang kiểm thử khỏi các phụ thuộc bên ngoài (như Database Repository, API bên thứ ba); @Mock tạo đối tượng giả lập; @InjectMocks tự động tiêm các mock này vào đối tượng cần kiểm thử (thường là Service)",
        "Mockito dùng để mã hóa mật khẩu người dùng trước khi lưu",
        "Mockito bắt buộc phải chạy trên máy chủ thật có kết nối Database"
      ],
      "answer": 1,
      "explanation": "💡 Nguyên lý Unit Test cốt lõi: Kiểm tra 1 đơn vị code (1 method của Service) một cách độc lập.\nVí dụ khi test `UserService.createUser()`: Ta không muốn gọi Database thật. Ta dùng `@Mock UserRepository` và cấu hình hành vi giả: `when(userRepository.save(any())).thenReturn(fakeUser)`. Sau đó `@InjectMocks UserService userService` để test logic tính toán của Service.",
      "textEn": "In Java/Spring Boot Unit Testing, what is Mockito used for and what do @Mock and @InjectMocks do?",
      "optionsEn": [
        "Mockito automatically generates user interfaces",
        "Mockito creates simulated mock objects to isolate the class under test from external dependencies (such as Repositories or external APIs); @Mock creates a simulated dependency; @InjectMocks creates the target instance and injects the created mocks into it",
        "Mockito encrypts user credentials before persisting to disk",
        "Mockito strictly requires a live database connection"
      ]
    },
    {
      "id": "idv07",
      "topic": "devops",
      "text": "So sánh Kiểm thử tự động (Automation Testing) và Kiểm thử thủ công (Manual Testing)? Khi nào nên áp dụng loại nào?",
      "options": [
        "Manual Test đã lỗi thời và không còn công ty nào sử dụng",
        "Manual Testing thực hiện bằng thao tác tay của con người, rất linh hoạt cho kiểm thử giao diện/trải nghiệm người dùng (UX) và tính năng mới thay đổi liên tục; Automation Testing dùng kịch bản mã hóa (Selenium, JUnit, Playwright) cho phép chạy lặp lại hàng nghìn lần nhanh chóng, cực kỳ phù hợp cho Kiểm thử hồi quy (Regression Testing) và tích hợp vào CI/CD Pipeline",
        "Automation Testing chỉ dùng để kiểm tra tốc độ đường truyền mạng",
        "Manual Testing chạy nhanh hơn Automation Testing 10 lần"
      ],
      "answer": 1,
      "explanation": "• `Manual Testing`: Tốt cho giai đoạn đầu của dự án, kiểm thử khám phá (Exploratory Testing), đánh giá cảm nhận trực quan của con người.\n• `Automation Testing`: Chi phí ban đầu cao để viết kịch bản, nhưng khi hệ thống đã ổn định thì chạy kiểm thử hồi quy (Regression Test) mỗi khi push code lên Git cực kỳ rẻ và phát hiện bug ngay lập tức.",
      "textEn": "Compare Automation Testing and Manual Testing. When should each approach be utilized?",
      "optionsEn": [
        "Manual testing is obsolete and no longer used in professional companies",
        "Manual Testing relies on human interaction, ideal for exploratory UX testing and rapidly changing new features; Automation Testing uses scripted tools (Selenium, JUnit, Playwright) to run thousands of test cases reliably, excelling at Regression Testing within CI/CD pipelines",
        "Automation Testing only tests network transmission speed",
        "Manual Testing is 10 times faster than Automation Testing"
      ]
    },
    {
      "id": "idv08",
      "topic": "devops",
      "text": "Sự khác biệt cơ bản giữa mô hình Thác nước (Waterfall) và mô hình Linh hoạt (Agile / Scrum) trong phát triển phần mềm là gì?",
      "options": [
        "Waterfall chỉ dùng cho dự án của học sinh; Scrum dùng cho ngân hàng",
        "Waterfall thực hiện tuần tự qua các giai đoạn nghiêm ngặt (Phân tích -> Thiết kế -> Lập trình -> Kiểm thử), yêu cầu chốt cứng từ đầu và rất khó thay đổi; Agile/Scrum chia nhỏ dự án thành các chu kỳ ngắn (Sprint 1-4 tuần), giao sản phẩm tăng dần (Incremental) và thích ứng nhanh với các thay đổi yêu cầu",
        "Scrum không cần kiểm thử phần mềm",
        "Cả hai mô hình có tiến trình và cách quản lý giống hệt nhau"
      ],
      "answer": 1,
      "explanation": "• Waterfall: Khách hàng chỉ thấy sản phẩm ở cuối dự án (rủi ro cao nếu yêu cầu ban đầu bị hiểu sai).\n• Agile/Scrum: Cứ sau mỗi Sprint (2 tuần), nhóm phát triển demo một phần phần mềm chạy được (working software) cho khách hàng xem và góp ý, giúp giảm thiểu rủi ro trễ hạn và đáp ứng thị trường nhanh chóng.",
      "textEn": "What is the primary difference between the Waterfall model and Agile/Scrum in software development?",
      "optionsEn": [
        "Waterfall is only for student projects; Scrum is for banking",
        "Waterfall executes sequentially through rigid phases (Analysis -> Design -> Implementation -> Testing) with fixed upfront requirements; Agile/Scrum divides work into short iterative Sprints (1-4 weeks), delivering incremental working software adaptable to evolving requirements",
        "Scrum does not require software testing",
        "Both models follow identical processes and management cadences"
      ]
    },
    {
      "id": "idv09",
      "topic": "devops",
      "text": "Khi thiết kế tính năng Tìm kiếm (Search) trong hệ thống phần mềm, luồng xử lý chuẩn ở phía Backend nên được thiết kế như thế nào để tối ưu hiệu năng và tránh quá tải Database?",
      "options": [
        "Cho phép client gọi API tìm kiếm sau mỗi ký tự gõ phím mà không cần throttle, query thẳng SELECT * FROM table WHERE column LIKE '%kw%'",
        "Phía Client áp dụng Debounce (chờ 300-500ms sau khi ngừng gõ); phía Backend kiểm tra Cache (Redis/Memcached) trước; nếu cache miss thì truy vấn Database có đánh chỉ mục (Index) hoặc sử dụng Search Engine chuyên dụng (Elasticsearch), kết hợp phân trang (LIMIT/OFFSET) và chỉ trả về các trường dữ liệu cần thiết",
        "Tắt hoàn toàn tính năng tìm kiếm trên server",
        "Gửi toàn bộ database về cho trình duyệt của client tự tìm"
      ],
      "answer": 1,
      "explanation": "💡 Trả lời chuẩn kiến trúc hệ thống (System Architecture):\n1. `Client Debounce`: Tránh spam 10 request khi gõ 10 chữ cái.\n2. `Cache Layer`: Cache kết quả của các từ khóa phổ biến (top searches) trong Redis.\n3. `Full-Text Search Engine`: Khi dữ liệu lớn, câu `LIKE '%abc%'` sẽ Full Table Scan gây treo database. Cần dùng Elasticsearch/OpenSearch hoặc MySQL Fulltext Index.\n4. `Pagination`: Luôn giới hạn số lượng bản ghi trả về (ví dụ page=1&size=20).",
      "textEn": "When designing a Search feature in software architecture, how should the backend flow be structured to optimize performance and prevent database overload?",
      "optionsEn": [
        "Allow clients to invoke the search API on every keystroke without throttling and execute unindexed SELECT * LIKE '%kw%' queries",
        "Client applies Debouncing (300-500ms delay); Backend checks in-memory cache (Redis) first; on cache miss, queries indexed database columns or dedicated search engines (Elasticsearch) with pagination (LIMIT/OFFSET) returning only required projection fields",
        "Disable the search feature completely on the server",
        "Stream the entire database dump to the browser for client-side evaluation"
      ]
    }
  ]
};
export const interviewAi = {
  "slug": "interview-ai",
  "title": "Phỏng Vấn: AI, LLM & Prompt Engineering",
  "description": "LLM, System Prompt & Custom Skills (AGENTS.md), AI Agent vs Chatbot, Đánh giá code AI, Tích hợp LLM API Backend.",
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
    },
    {
      "id": "iai05",
      "topic": "ai",
      "text": "Trong việc phát triển phần mềm với sự hỗ trợ của AI (như Antigravity, Cursor, Claude Code), các file cấu hình ngữ cảnh dự án như claude.md hay AGENTS.md đóng vai trò gì?",
      "options": [
        "Là file chứa mã độc để tấn công máy chủ",
        "Cung cấp ngữ cảnh hệ thống (System Prompt / Context), quy ước mã nguồn (Coding standards), kiến trúc công nghệ, các quy tắc bảo mật và hướng dẫn quy trình đặc thù của dự án để AI Assistant hiểu sâu dự án và sinh code tuân thủ 100% chuẩn mực của đội ngũ",
        "Là file chứa giấy phép bản quyền phần mềm để nộp cho cơ quan thuế",
        "Chỉ dùng để đổi màu giao diện của IDE"
      ],
      "answer": 1,
      "explanation": "💡 Xu hướng phỏng vấn AI Tooling mới nhất:\nFile `claude.md` / `AGENTS.md` hoạt động như một cuốn 'Sổ tay hướng dẫn dự án' dành riêng cho AI Agent. Nó chứa: Tech stack, kiến trúc thư mục, quy tắc đặt tên, cách chạy lệnh test/build, và các lỗi thường gặp, giúp AI không sinh ra code lạc đề hoặc dùng sai thư viện.",
      "textEn": "In AI-assisted software engineering (tools like Antigravity, Cursor, Claude Code), what role do context configuration files like claude.md or AGENTS.md serve?",
      "optionsEn": [
        "They are malicious scripts used to attack servers",
        "They provide persistent System Prompts, project-specific coding standards, architecture constraints, and workflow guidelines so that the AI Assistant produces code adhering strictly to the team's conventions",
        "They store software copyright certificates for taxation audits",
        "They only modify the visual color themes of the IDE"
      ]
    },
    {
      "id": "iai06",
      "topic": "ai",
      "text": "Khi tích hợp mô hình ngôn ngữ lớn (LLM API như OpenAI, Gemini) vào ứng dụng Backend, tại sao phản hồi thường được truyền về Client dưới dạng Streaming (Server-Sent Events - SSE)?",
      "options": [
        "Vì Streaming giúp làm giảm dung lượng của cơ sở dữ liệu",
        "Vì LLM sinh từ (tokens) tuần tự theo thời gian; cơ chế Streaming (SSE) cho phép đẩy từng token về client ngay khi vừa được tạo ra, giảm thời gian phản hồi đầu tiên (Time to First Token - TTFT) từ hàng chục giây xuống dưới 1 giây, mang lại trải nghiệm tương tác trực quan tức thì cho người dùng",
        "Streaming chỉ dùng được khi xem phim, không áp dụng cho văn bản",
        "Bắt buộc phải dùng WebSocket hai chiều, SSE không truyền được text"
      ],
      "answer": 1,
      "explanation": "• LLM hoạt động theo cơ chế sinh từ tuần tự (Autoregressive generation). Nếu đợi model sinh xong toàn bộ bài viết 1000 từ mới trả về response, người dùng phải nhìn màn hình quay quay 15-30 giây.\n• Giao thức Server-Sent Events (SSE) với header `Content-Type: text/event-stream` cho phép Backend đẩy từng chữ (chunk) về trình duyệt ngay lập tức giống như chữ đang được gõ trực tiếp.",
      "textEn": "When integrating LLM APIs (OpenAI, Gemini) into backend services, why are responses streamed to clients using Server-Sent Events (SSE)?",
      "optionsEn": [
        "Because streaming reduces database storage capacity",
        "Because LLMs generate tokens sequentially; Streaming (SSE) pushes tokens to the client as they are generated, drastically cutting Time to First Token (TTFT) from dozens of seconds down to under 1 second and providing an immediate responsive user experience",
        "Streaming is exclusively used for video content, not text",
        "Bi-directional WebSockets are strictly required; SSE cannot transmit text"
      ]
    }
  ]
};
export const interviewAll = {
  "slug": "interview-all",
  "title": "Tổng Hợp Câu Hỏi Phỏng Vấn 1-1",
  "description": "Trọn bộ câu hỏi phỏng vấn thực tế: SQL & JDBC, Java Core & OOP, Spring Boot & JPA, React & Next.js, Web, Git & Testing, AI Tooling.",
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
      "id": "isql17",
      "topic": "sql",
      "text": "Trong công nghệ JDBC của Java, phân biệt 3 loại đối tượng thực thi câu lệnh: Statement, PreparedStatement và CallableStatement?",
      "options": [
        "Statement dùng cho câu lệnh SELECT; PreparedStatement dùng cho INSERT/UPDATE; CallableStatement dùng cho DELETE",
        "Statement thực thi câu lệnh SQL tĩnh không có tham số; PreparedStatement biên dịch trước (pre-compiled) câu lệnh có tham số (?) giúp chống SQL Injection và tăng tốc độ; CallableStatement dùng để gọi các Stored Procedure / Function được lưu sẵn trong Database",
        "CallableStatement chỉ dùng được với hệ quản trị CSDL Oracle, các CSDL khác không hỗ trợ",
        "PreparedStatement chạy chậm hơn Statement vì phải qua bước kiểm tra kiểu dữ liệu"
      ],
      "answer": 1,
      "explanation": "• Statement: Tạo câu lệnh SQL tĩnh bằng phép nối chuỗi (dễ bị SQL Injection và DB phải parse lại mỗi lần chạy).\n• PreparedStatement: Câu lệnh được biên dịch trước, tham số được truyền qua dấu `?`, tự động escape ký tự nguy hiểm và được DB cache Execution Plan.\n• CallableStatement: Dùng để thực thi Stored Procedure có tham số IN/OUT.\n💡 Mẹo phỏng vấn: Luôn khẳng định trong dự án thực tế luôn dùng PreparedStatement (hoặc qua ORM như JPA/Hibernate) để đảm bảo 100% bảo mật chống SQL Injection.",
      "textEn": "In Java JDBC, what are the differences between Statement, PreparedStatement, and CallableStatement?",
      "optionsEn": [
        "Statement is used for SELECT; PreparedStatement is used for INSERT/UPDATE; CallableStatement is used for DELETE",
        "Statement executes static SQL strings without parameters; PreparedStatement executes pre-compiled SQL queries with placeholders (?) to prevent SQL Injection and optimize speed; CallableStatement is used to execute Stored Procedures and Functions stored in the database",
        "CallableStatement is only supported in Oracle database systems",
        "PreparedStatement is slower than Statement due to type-checking overhead"
      ]
    },
    {
      "id": "isql18",
      "topic": "sql",
      "text": "Ngoài khả năng chống tấn công SQL Injection, PreparedStatement còn có ưu điểm vượt trội nào về mặt hiệu năng so với Statement thường?",
      "options": [
        "PreparedStatement tự động nén dữ liệu truyền qua mạng",
        "RDBMS phân tích cú pháp (Parse), biên dịch (Compile) và lưu trữ kế hoạch thực thi (Query Execution Plan Cache) cho câu lệnh mẫu 1 lần duy nhất; các lần gọi sau chỉ cần truyền giá trị tham số mới vào thực thi ngay mà không cần biên dịch lại",
        "PreparedStatement bỏ qua bước kiểm tra quyền hạn của người dùng",
        "PreparedStatement ghi đè dữ liệu trực tiếp vào ổ cứng không qua bộ đệm RAM"
      ],
      "answer": 1,
      "explanation": "💡 Giải thích chuyên sâu cho câu hỏi phỏng vấn hay gặp:\nKhi gửi 1 câu SQL, RDBMS phải trải qua: Syntax Checking -> Semantic Checking -> Query Optimization -> Compile Execution Plan. Với `PreparedStatement`, các bước tốn CPU này chỉ chạy 1 lần. Khi chạy vòng lặp 1.000 lần thêm dữ liệu, PreparedStatement giúp giảm tải 80-90% thời gian xử lý của Database Server so với Statement thường.",
      "textEn": "Besides preventing SQL Injection, what major performance advantage does PreparedStatement offer over standard Statement?",
      "optionsEn": [
        "PreparedStatement automatically compresses data transmitted over the network",
        "The database engine parses, optimizes, and compiles the query execution plan once (Query Plan Caching); subsequent executions only bind new parameter values without re-compiling",
        "PreparedStatement bypasses database permission checks",
        "PreparedStatement writes directly to disk without using RAM buffers"
      ]
    },
    {
      "id": "isql19",
      "topic": "sql",
      "text": "Mục đích cốt lõi của việc thiết kế Sơ đồ Quan hệ Thực thể (ERD) và quá trình Chuẩn hóa dữ liệu (Normalization - 1NF, 2NF, 3NF) là gì?",
      "options": [
        "Tăng kích thước lưu trữ của database để bán thêm dung lượng ổ cứng",
        "Loại bỏ hiện tượng dư thừa dữ liệu (Data Redundancy), ngăn chặn các dị thường khi Thêm/Sửa/Xóa dữ liệu (Insertion/Update/Deletion Anomalies) và đảm bảo tính toàn vẹn dữ liệu (Data Integrity)",
        "Làm cho các câu truy vấn SELECT có tốc độ nhanh nhất có thể trong mọi tình huống mà không cần đánh index",
        "Ép buộc mọi bảng chỉ được có duy nhất 1 cột khóa chính là kiểu số nguyên"
      ],
      "answer": 1,
      "explanation": "• 1NF: Mỗi cột chứa giá trị nguyên tố (Atomic values), không có cột lặp lại.\n• 2NF: Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hoàn toàn vào toàn bộ khóa chính (loại bỏ phụ thuộc một phần vào Composite Key).\n• 3NF: Đạt 2NF và không có phụ thuộc bắc cầu giữa các thuộc tính không khóa.\n💡 Mẹo phỏng vấn: Chuẩn hóa cao (3NF) giúp dữ liệu nhất quán, không bị trùng lặp khi update; tuy nhiên trong hệ thống Big Data/Data Warehouse hoặc báo cáo, người ta có thể 'Khử chuẩn hóa' (Denormalization) có chủ đích để giảm JOIN tăng tốc độ đọc.",
      "textEn": "What is the primary purpose of Entity Relationship Diagram (ERD) design and Database Normalization (1NF, 2NF, 3NF)?",
      "optionsEn": [
        "To increase database storage size to utilize excess disk space",
        "To eliminate data redundancy, prevent insertion/update/deletion anomalies, and ensure data integrity",
        "To ensure SELECT queries run at maximum speed under all circumstances without indexes",
        "To force all database tables to only contain integer primary keys"
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
      "id": "ijc12",
      "topic": "javacore",
      "text": "Bốn tính chất cốt lõi của Lập trình Hướng đối tượng (OOP) trong ngôn ngữ Java là gì?",
      "options": [
        "Biên dịch (Compilation), Thực thi (Execution), Quản lý bộ nhớ (Garbage Collection), Đa luồng (Multithreading)",
        "Đóng gói (Encapsulation), Kế thừa (Inheritance), Đa hình (Polymorphism) và Trừu tượng (Abstraction)",
        "Static, Final, Abstract, Interface",
        "Public, Protected, Default, Private"
      ],
      "answer": 1,
      "explanation": "💡 Tóm tắt phỏng vấn ngắn gọn và sắc sảo:\n1. Đóng gói (Encapsulation): Che giấu dữ liệu nội bộ bằng private và cung cấp getter/setter.\n2. Kế thừa (Inheritance): Tái sử dụng và mở rộng thuộc tính/phương thức từ class cha qua từ khóa `extends`.\n3. Đa hình (Polymorphism): Một hành vi có thể thể hiện dưới nhiều hình thái khác nhau (Overloading & Overriding).\n4. Trừu tượng (Abstraction): Tập trung vào đối tượng làm ĐƯỢC GÌ thay vì làm NHƯ THẾ NÀO (qua abstract class và interface).",
      "textEn": "What are the four fundamental pillars of Object-Oriented Programming (OOP) in Java?",
      "optionsEn": [
        "Compilation, Execution, Garbage Collection, Multithreading",
        "Encapsulation, Inheritance, Polymorphism, Abstraction",
        "Static, Final, Abstract, Interface",
        "Public, Protected, Default, Private"
      ]
    },
    {
      "id": "ijc13",
      "topic": "javacore",
      "text": "Trong Java, sự khác biệt giữa Đa hình lúc biên dịch (Compile-time Polymorphism) và Đa hình lúc chạy (Runtime Polymorphism) là gì?",
      "options": [
        "Compile-time là dùng interface; Runtime là dùng abstract class",
        "Compile-time thể hiện qua Nạp chồng phương thức (Method Overloading - cùng tên khác tham số, quyết định lúc compile); Runtime thể hiện qua Ghi đè phương thức (Method Overriding - lớp con viết lại method lớp cha, quyết định lúc chạy thông qua Dynamic Method Dispatch)",
        "Compile-time chỉ áp dụng cho biến static; Runtime chỉ áp dụng cho biến final",
        "Cả hai đều xảy ra lúc chạy và không có gì khác biệt"
      ],
      "answer": 1,
      "explanation": "• Method Overloading (Đa hình tĩnh / Compile-time): Trình biên dịch dựa vào số lượng và kiểu tham số để biết chính xác hàm nào được gọi.\n• Method Overriding (Đa hình động / Runtime): Biến tham chiếu kiểu cha trỏ đến đối tượng con (`Animal a = new Dog(); a.makeSound()`), JVM phải đợi đến lúc chạy mới biết đối tượng thực tế là `Dog` để gọi `Dog.makeSound()`.",
      "textEn": "In Java, what is the difference between Compile-time Polymorphism and Runtime Polymorphism?",
      "optionsEn": [
        "Compile-time uses interfaces; Runtime uses abstract classes",
        "Compile-time is achieved via Method Overloading (resolved at compilation time based on parameter signatures); Runtime is achieved via Method Overriding (resolved at runtime via Dynamic Method Dispatch based on actual object instance)",
        "Compile-time only applies to static variables; Runtime only applies to final variables",
        "Both occur at runtime with no practical differences"
      ]
    },
    {
      "id": "ijc14",
      "topic": "javacore",
      "text": "Sắp xếp phạm vi truy cập (Scope) của 4 Access Modifier trong Java từ hẹp nhất đến rộng nhất?",
      "options": [
        "default < private < protected < public",
        "private < default (package-private) < protected < public",
        "private < protected < default < public",
        "protected < private < default < public"
      ],
      "answer": 1,
      "explanation": "1. `private`: Chỉ truy cập được bên trong chính class đó.\n2. `default` (không khai báo gì): Truy cập được bởi tất cả class trong CÙNG package.\n3. `protected`: Truy cập được trong cùng package + các lớp con (subclass) kể cả ở package khác.\n4. `public`: Truy cập tự do từ mọi nơi trong toàn bộ project.",
      "textEn": "Order Java's 4 Access Modifiers from narrowest to widest accessibility scope?",
      "optionsEn": [
        "default < private < protected < public",
        "private < default (package-private) < protected < public",
        "private < protected < default < public",
        "protected < private < default < public"
      ]
    },
    {
      "id": "ijc15",
      "topic": "javacore",
      "text": "Tác dụng của từ khóa final trong Java khi áp dụng cho Biến, Phương thức (Method) và Lớp (Class) là gì?",
      "options": [
        "Biến thành hằng số không đổi; Phương thức không thể bị Ghi đè (Override); Lớp không thể bị Kế thừa (Inheritance)",
        "Biến được lưu vào bộ nhớ cache; Phương thức chạy nhanh hơn; Lớp tự động chuyển thành singleton",
        "Biến chỉ đọc lúc biên dịch; Phương thức chỉ được gọi 1 lần; Lớp không thể tạo object bằng từ khóa new",
        "Biến tự động giải phóng vùng nhớ; Phương thức chạy đa luồng; Lớp không có constructor"
      ],
      "answer": 0,
      "explanation": "• `final variable`: Giá trị chỉ được gán một lần duy nhất (hằng số).\n• `final method`: Lớp con không được phép override phương thức này (bảo toàn logic cốt lõi).\n• `final class`: Không class nào có thể kế thừa class này (ví dụ: `java.lang.String` là final class để đảm bảo tính bất biến Immutable và bảo mật).",
      "textEn": "What is the effect of the final keyword when applied to Variables, Methods, and Classes in Java?",
      "optionsEn": [
        "Variable becomes constant (cannot be reassigned); Method cannot be overridden by subclasses; Class cannot be extended (inherited)",
        "Variable is stored in cache; Method runs faster; Class becomes a singleton",
        "Variable is compile-time only; Method can only be called once; Class cannot be instantiated with new",
        "Variable is auto-garbage-collected; Method is multi-threaded; Class has no constructor"
      ]
    },
    {
      "id": "ijc16",
      "topic": "javacore",
      "text": "Khi gọi hàm super() để kích hoạt Constructor của lớp cha trong Constructor của lớp con, quy tắc bắt buộc là gì?",
      "options": [
        "super() phải được đặt ở dòng cuối cùng của Constructor lớp con",
        "Lệnh gọi super(...) bắt buộc phải là câu lệnh đầu tiên trong Constructor của lớp con",
        "super() chỉ được gọi nếu phương thức đó có gắn từ khóa static",
        "Không được truyền tham số vào super()"
      ],
      "answer": 1,
      "explanation": "• Trong Java, khi khởi tạo một đối tượng lớp con, trạng thái của lớp cha phải được khởi tạo TRƯỚC TIÊN. Do đó lệnh gọi `super(...)` (hoặc `this(...)`) bắt buộc phải là dòng lệnh đầu tiên trong Constructor.\n• Nếu lập trình viên không viết `super(...)`, trình biên dịch Java sẽ tự động chèn `super()` không tham số vào dòng đầu tiên.",
      "textEn": "What is the mandatory rule when calling super() in a subclass constructor in Java?",
      "optionsEn": [
        "super() must be placed as the last statement in the subclass constructor",
        "The call to super(...) must be the very first statement in the subclass constructor",
        "super() can only be called if the constructor is marked static",
        "super() cannot take any parameters"
      ]
    },
    {
      "id": "ijc17",
      "topic": "javacore",
      "text": "Cơ chế String Constant Pool trong Java hoạt động thế nào và tại sao so sánh chuỗi bằng toán tử == có thể cho kết quả sai?",
      "options": [
        "String Pool lưu chuỗi vào ổ cứng để tiết kiệm RAM",
        "String Pool là vùng nhớ đặc biệt trong Heap lưu trữ các chuỗi literal để tái sử dụng; toán tử == so sánh địa chỉ tham chiếu vùng nhớ (reference), trong khi chuỗi tạo bằng new String(...) sẽ tạo object mới ngoài Pool khiến == trả về false dù nội dung giống nhau",
        "Toán tử == chỉ so sánh được chuỗi có độ dài dưới 10 ký tự",
        "String Pool tự động xóa chuỗi sau 5 giây nếu không ai dùng"
      ],
      "answer": 1,
      "explanation": "• Khi khai báo `String s1 = \"Java\"; String s2 = \"Java\";` -> Cả hai trỏ cùng 1 địa chỉ trong String Pool nên `s1 == s2` là `true`.\n• Khi khai báo `String s3 = new String(\"Java\");` -> Tạo đối tượng mới trên Heap nên `s1 == s3` là `false`!\n💡 Quy tắc bất biến: Luôn dùng `s1.equals(s3)` để so sánh nội dung chuỗi trong Java.",
      "textEn": "How does the String Constant Pool work in Java, and why can comparing strings with == yield incorrect results?",
      "optionsEn": [
        "String Pool saves strings to disk to conserve RAM",
        "String Pool is a special storage area in Heap that reuses string literals; operator == checks reference equality (memory addresses), whereas new String(...) allocates a distinct object outside the pool, causing == to evaluate to false even with identical contents",
        "Operator == only compares strings with fewer than 10 characters",
        "String Pool automatically expires strings after 5 seconds"
      ]
    },
    {
      "id": "ijc18",
      "topic": "javacore",
      "text": "Trong ngôn ngữ Java, phương thức truyền tham số vào hàm (Argument Passing) là Pass-by-value hay Pass-by-reference?",
      "options": [
        "Java truyền kiểu nguyên thủy bằng Pass-by-value, truyền Object bằng Pass-by-reference",
        "Java là 100% Pass-by-value: Khi truyền biến nguyên thủy là truyền bản sao của giá trị; khi truyền Object là truyền bản sao của địa chỉ tham chiếu (reference pointer)",
        "Java là 100% Pass-by-reference giống con trỏ C++",
        "Phụ thuộc vào việc hàm đó có gắn từ khóa static hay không"
      ],
      "answer": 1,
      "explanation": "💡 Câu hỏi bẫy kinh điển trong phỏng vấn Java:\nJava KHÔNG CÓ Pass-by-reference. Java luôn là Pass-by-value.\nKhi truyền 1 object `Person p` vào hàm `change(Person person)`:\n- Nếu bạn gọi `person.setName(\"Nam\")`: Thuộc tính của object bị thay đổi vì cả 2 con trỏ cùng trỏ đến 1 vùng nhớ Heap.\n- Nhưng nếu bạn gán `person = new Person(\"Lan\")`: Object `p` ở ngoài hàm hoàn toàn KHÔNG THAY ĐỔI vì `person` chỉ là bản sao của địa chỉ tham chiếu!",
      "textEn": "In Java, is argument passing Pass-by-value or Pass-by-reference?",
      "optionsEn": [
        "Java uses Pass-by-value for primitives and Pass-by-reference for Objects",
        "Java is strictly 100% Pass-by-value: For primitives it passes a copy of the literal value; for objects it passes a copy of the reference address (pointer value)",
        "Java is strictly 100% Pass-by-reference similar to C++ pointers",
        "It depends on whether the method has the static modifier"
      ]
    },
    {
      "id": "ijc19",
      "topic": "javacore",
      "text": "Phân biệt 3 Interface cốt lõi trong Java Collections Framework: List, Set và Map?",
      "options": [
        "List là danh sách liên kết; Set là mảng 1 chiều; Map là mảng 2 chiều",
        "List lưu trữ có thứ tự và cho phép phần tử trùng lặp; Set lưu trữ các phần tử duy nhất không trùng lặp; Map lưu trữ dữ liệu theo cặp Khóa - Giá trị (Key-Value) với các Key là duy nhất",
        "Set cho phép nhiều key trùng nhau; Map không lưu được chuỗi ký tự",
        "List và Set không thể chứa phần tử null"
      ],
      "answer": 1,
      "explanation": "• `List` (ArrayList, LinkedList): Có chỉ số (Index), duy trì thứ tự chèn, cho phép trùng lặp.\n• `Set` (HashSet, TreeSet): Không cho phép trùng lặp phần tử (dựa vào `hashCode` và `equals`).\n• `Map` (HashMap, TreeMap): Lưu theo cặp `Key - Value`. Key là duy nhất (nếu put trùng key sẽ ghi đè value cũ).",
      "textEn": "What are the distinctions among the 3 core interfaces in Java Collections Framework: List, Set, and Map?",
      "optionsEn": [
        "List is a linked list; Set is a 1D array; Map is a 2D array",
        "List maintains insertion order and allows duplicate elements; Set stores unique elements without duplicates; Map stores Key-Value pairs where each Key must be unique",
        "Set allows duplicate keys; Map cannot store string values",
        "List and Set cannot contain null elements"
      ]
    },
    {
      "id": "ijc20",
      "topic": "javacore",
      "text": "Trong máy ảo Java (JVM), Garbage Collector (GC) quyết định một đối tượng đủ điều kiện bị thu gom rác dựa trên nguyên lý nào?",
      "options": [
        "Khi đối tượng đã được tạo quá 10 phút mà không được gọi",
        "Khi đối tượng trở nên 'Không thể tiếp cận' (Unreachable) - tức không còn bất kỳ đường dẫn tham chiếu nào xuất phát từ các GC Roots (như biến cục bộ trên Stack, luồng đang chạy, biến static)",
        "Khi lập trình viên gọi lệnh System.gc() thì đối tượng lập tức bị xóa ngay",
        "Khi dung lượng RAM của máy tính bị đầy 100%"
      ],
      "answer": 1,
      "explanation": "• JVM dùng thuật toán Reachability Analysis (Truy vết khả năng tiếp cận) bắt đầu từ các GC Roots.\n• Nếu một object trong Heap không có đường dẫn nào kết nối tới GC Root, nó được coi là rác (Garbage) và đủ điều kiện bị thu dọn.\n💡 Mẹo phỏng vấn: Lệnh `System.gc()` chỉ là lời 'gợi ý' (suggestion) cho JVM chứ không hề cam kết JVM sẽ chạy GC ngay lập tức.",
      "textEn": "In JVM, what principle determines that an object is eligible for Garbage Collection (GC)?",
      "optionsEn": [
        "When the object has existed for more than 10 minutes without being accessed",
        "When the object becomes Unreachable - meaning there are no valid reference chains connecting it to any GC Roots (such as stack local variables, active threads, static references)",
        "When the developer explicitly executes System.gc(), the object is immediately destroyed",
        "When computer RAM utilization reaches 100%"
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
      "id": "isp07",
      "topic": "spring",
      "text": "Trong Spring Framework, Bean Scope là gì và phân biệt giữa hai phạm vi phổ biến nhất: singleton và prototype?",
      "options": [
        "singleton chỉ dùng cho Database; prototype chỉ dùng cho Web Controller",
        "singleton (mặc định) chỉ tạo duy nhất 1 instance của Bean trên toàn bộ Spring IoC Container; prototype tạo một instance mới mỗi khi Bean được yêu cầu inject hoặc gọi qua getBean()",
        "prototype lưu Bean vào Session của người dùng; singleton lưu vào Cookie",
        "singleton chỉ sống trong 1 request; prototype sống vĩnh viễn"
      ],
      "answer": 1,
      "explanation": "• `singleton` (default scope): Spring IoC Container chỉ khởi tạo 1 instance duy nhất và chia sẻ cho tất cả các class inject nó (vô cùng tối ưu bộ nhớ, tuy nhiên phải thiết kế Stateless - không lưu trạng thái mutable để tránh Race Condition).\n• `prototype`: Mỗi lần inject (@Autowired) sẽ sinh ra 1 object hoàn toàn mới.\n• Các web scopes khác: `request`, `session`, `application`.",
      "textEn": "In Spring Framework, what is Bean Scope and how do singleton and prototype scopes differ?",
      "optionsEn": [
        "singleton is only for databases; prototype is only for Web Controllers",
        "singleton (default) creates a single shared instance per Spring IoC Container; prototype creates a new distinct instance each time the bean is requested or injected",
        "prototype stores beans in user Session; singleton stores in Cookies",
        "singleton lives only for 1 HTTP request; prototype lives permanently"
      ]
    },
    {
      "id": "isp08",
      "topic": "spring",
      "text": "Sự khác biệt cốt lõi giữa hai Annotation @Controller và @RestController trong Spring Boot là gì?",
      "options": [
        "@Controller chỉ dùng cho microservices; @RestController dùng cho monolith",
        "@Controller trả về tên View (như HTML, JSP, Thymeleaf) để ViewResolver phân giải giao diện; @RestController là sự kết hợp của @Controller + @ResponseBody, tự động serialize kết quả trả về thành JSON/XML trong HTTP Response Body (dành cho REST API)",
        "@RestController bắt buộc phải kết hợp với Servlet; @Controller không cần",
        "Cả hai giống hệt nhau, @RestController chỉ là tên viết tắt"
      ],
      "answer": 1,
      "explanation": "• `@Controller`: Dành cho ứng dụng MVC truyền thống (Server-Side Rendering). Return string `\"index\"` -> tìm file `index.html`.\n• `@RestController` = `@Controller` + `@ResponseBody`: Dành cho RESTful Web Services. Return object `User` -> Jackson ObjectMapper tự động parse sang chuỗi JSON `{\"id\": 1, \"name\": \"Trung\"}` và trả thẳng về client.",
      "textEn": "What is the core difference between @Controller and @RestController in Spring Boot?",
      "optionsEn": [
        "@Controller is for microservices; @RestController is for monoliths",
        "@Controller returns a view template name resolved by ViewResolver; @RestController is a convenience annotation combining @Controller and @ResponseBody, automatically serializing return values directly into JSON/XML HTTP response bodies (for REST APIs)",
        "@RestController strictly requires Servlets; @Controller does not",
        "Both are completely identical; @RestController is merely an alias"
      ]
    },
    {
      "id": "isp09",
      "topic": "spring",
      "text": "Phân biệt các Annotation Stereotype: @Component, @Service, @Repository và @Bean trong Spring Boot?",
      "options": [
        "@Component chỉ dùng cho cấu hình mạng; @Bean dùng cho cơ sở dữ liệu",
        "@Component là annotation cha tổng quát; @Service dùng cho tầng Business Logic; @Repository dùng cho tầng DAO/Truy xuất dữ liệu (hỗ trợ dịch Exception); @Bean được đặt trên method trong class @Configuration để đăng ký bean của thư viện bên thứ 3",
        "@Bean tự động xóa dữ liệu sau khi chạy; @Service chạy ngầm vô hạn",
        "@Repository không thể inject vào Service"
      ],
      "answer": 1,
      "explanation": "• `@Component`: Đánh dấu class là một Spring-managed Bean để Component Scanning tự động phát hiện.\n• `@Service`: Chuyên biệt hóa của `@Component` ở tầng nghiệp vụ.\n• `@Repository`: Chuyên biệt hóa ở tầng dữ liệu, tự động kích hoạt cơ chế dịch lỗi database (PersistenceExceptionTranslationPostProcessor) sang Spring's DataAccessException.\n• `@Bean`: Áp dụng ở cấp độ Method, dùng khi bạn muốn tạo Bean từ class của thư viện bên ngoài mà bạn không thể chỉnh sửa source code để thêm `@Component`.",
      "textEn": "Distinguish between Spring's stereotype annotations: @Component, @Service, @Repository, and @Bean?",
      "optionsEn": [
        "@Component is only for networking; @Bean is only for databases",
        "@Component is the generic stereotype; @Service marks the business logic layer; @Repository marks the DAO/data access layer (with exception translation); @Bean is method-level in @Configuration classes to instantiate 3rd-party library beans",
        "@Bean deletes data automatically after execution; @Service runs indefinitely in the background",
        "@Repository cannot be injected into Service classes"
      ]
    },
    {
      "id": "isp10",
      "topic": "spring",
      "text": "Trong Spring Boot REST API, cơ chế Validation dữ liệu đầu vào hoạt động như thế nào và sự khác nhau giữa @Valid và @Validated là gì?",
      "options": [
        "@Valid chỉ kiểm tra số chẵn; @Validated kiểm tra số lẻ",
        "Khai báo các ràng buộc (@NotNull, @NotBlank, @Size, @Email...) trên thuộc tính DTO; @Valid là chuẩn tiêu chuẩn của Jakarta/JSR-380; @Validated là annotation của Spring, hỗ trợ thêm tính năng Validation theo nhóm (Validation Groups)",
        "@Validated chỉ chạy được trên môi trường Linux",
        "Không cần thư viện validation, Spring Boot tự động đoán đúng dữ liệu"
      ],
      "answer": 1,
      "explanation": "• Dùng `spring-boot-starter-validation`.\n• `@NotBlank`: Áp dụng cho String (không null, độ dài > 0 sau khi trim).\n• `@NotNull`: Không được null (thường dùng cho ID, Số, Date).\n• `@Valid`: Chuẩn Java/Jakarta Specification, kích hoạt validation lồng nhau.\n• `@Validated`: Do Spring cung cấp, hỗ trợ kiểm tra trên method parameter và phân nhóm (`groups = {OnCreate.class, OnUpdate.class}`).",
      "textEn": "In Spring Boot, how does input validation work and what is the difference between @Valid and @Validated?",
      "optionsEn": [
        "@Valid only validates even numbers; @Validated validates odd numbers",
        "Validation constraints (@NotNull, @NotBlank, @Size, @Email) are defined on DTO fields; @Valid is standard Jakarta/JSR-380; @Validated is Spring-specific and supports Validation Groups",
        "@Validated only runs on Linux operating systems",
        "Spring Boot automatically infers validation rules without any annotations"
      ]
    },
    {
      "id": "isp11",
      "topic": "spring",
      "text": "Mối quan hệ giữa JPA, Hibernate và Spring Data JPA là gì? Phân biệt CrudRepository và JpaRepository?",
      "options": [
        "JPA là cơ sở dữ liệu NoSQL; Hibernate là công cụ vẽ biểu đồ",
        "JPA là bộ đặc tả tiêu chuẩn (Specification); Hibernate là thư viện hiện thực (Implementation); Spring Data JPA là framework trừu tượng hóa tầng Repository; JpaRepository kế thừa CrudRepository và PagingAndSortingRepository, bổ sung thêm các phương thức flush(), batch delete và trả về List thay vì Iterable",
        "JpaRepository không hỗ trợ phân trang dữ liệu; CrudRepository hỗ trợ phân trang",
        "Bắt buộc phải gắn @Repository lên interface JpaRepository thì project mới chạy được"
      ],
      "answer": 1,
      "explanation": "💡 Mẹo phỏng vấn cực hay:\n1. JPA là hợp đồng (Interface/Spec), Hibernate là người thực thi hợp đồng.\n2. Interface extends `JpaRepository` KHÔNG CẦN gắn `@Repository` vì Spring Data JPA tự động tạo Proxy bean cho mọi interface extends Repository.\n3. `JpaRepository` tiện hơn `CrudRepository` vì các hàm như `findAll()` trả về thẳng `List<T>` (thay vì `Iterable<T>`), và có sẵn các hàm `saveAndFlush()`, `deleteInBatch()`.",
      "textEn": "What is the relationship among JPA, Hibernate, and Spring Data JPA? How do CrudRepository and JpaRepository differ?",
      "optionsEn": [
        "JPA is a NoSQL database; Hibernate is a diagramming library",
        "JPA is the official Java ORM specification; Hibernate is the concrete implementation; Spring Data JPA is an abstraction framework over data repositories; JpaRepository extends CrudRepository and PagingAndSortingRepository, adding flush(), batch deletion, and returning List<T> instead of Iterable<T>",
        "JpaRepository does not support pagination; CrudRepository does",
        "Adding @Repository on a JpaRepository interface is strictly required for the application to compile"
      ]
    },
    {
      "id": "isp12",
      "topic": "spring",
      "text": "Trong Spring Data JPA, có những cách chính nào để định nghĩa câu truy vấn dữ liệu từ Database trong interface Repository?",
      "options": [
        "Chỉ có thể viết code Java thuần kết nối JDBC",
        "1. Query Creation from Method Names (Derived Query như findByEmailAndStatus); 2. Annotation @Query với JPQL (hướng đối tượng); 3. Annotation @Query(nativeQuery = true) viết SQL thuần của DBMS; 4. Criteria API / Specification cho truy vấn động phức tạp",
        "Bắt buộc phải dùng XML mapping",
        "JPA chỉ hỗ trợ tìm kiếm theo ID, không hỗ trợ các điều kiện khác"
      ],
      "answer": 1,
      "explanation": "• Derived Queries: Tiện lợi cho câu ngắn (`findByAgeGreaterThan(int age)`).\n• JPQL (`@Query(\"SELECT u FROM User u WHERE u.email = :email\")`): Truy vấn dựa trên Tên Entity và Thuộc tính Java, độc lập với hệ quản trị CSDL.\n• Native Query (`@Query(value = \"SELECT * FROM users WHERE ...\", nativeQuery = true)`): Khi cần tận dụng tính năng riêng biệt của DBMS (như JSON operator, window functions).\n• Spring Data Specifications: Dùng khi form tìm kiếm có nhiều điều kiện lọc động (Dynamic Search).",
      "textEn": "In Spring Data JPA, what are the primary ways to define database queries in a Repository interface?",
      "optionsEn": [
        "Only by writing manual raw JDBC code",
        "1. Query Creation from Method Names (Derived queries like findByEmailAndStatus); 2. @Query with JPQL (Object-oriented); 3. @Query(nativeQuery = true) for raw DBMS SQL; 4. Criteria API / Specifications for dynamic criteria filtering",
        "XML mapping files are strictly mandatory",
        "JPA only supports queries by primary key ID and cannot filter by other columns"
      ]
    },
    {
      "id": "isp13",
      "topic": "spring",
      "text": "Spring Boot cấu hình kết nối Database như thế nào và tại sao nó chọn HikariCP làm Connection Pool mặc định?",
      "options": [
        "Cấu hình trong file HTML; HikariCP là CSDL chạy trên RAM",
        "Cấu hình qua file application.properties / application.yml (spring.datasource.url, username, password, driver-class-name); HikariCP được chọn vì là Connection Pool mã nguồn mở nhẹ nhất, nhanh nhất và tiêu thụ ít CPU nhất hiện nay, giúp duy trì sẵn các kết nối TCP để tái sử dụng mà không mất công tạo mới mỗi request",
        "HikariCP tự động sao lưu dữ liệu sang Google Drive mỗi 10 phút",
        "Spring Boot không hỗ trợ Connection Pool, mỗi request tạo 1 kết nối mới rồi đóng lại"
      ],
      "answer": 1,
      "explanation": "💡 Kiến trúc kết nối DB:\nKhởi tạo kết nối TCP và xác thực với Database Server tốn hàng chục đến hàng trăm mili-giây. Connection Pool (như HikariCP) duy trì sẵn một nhóm (pool) kết nối mở. Khi Service cần query, nó 'mượn' 1 connection từ pool, thực thi xong thì 'trả lại' cho pool thay vì đóng kết nối thật, giúp ứng dụng chịu tải hàng nghìn request/giây mà không làm nghẽn DB.",
      "textEn": "How does Spring Boot configure database connectivity and why does it use HikariCP as the default Connection Pool?",
      "optionsEn": [
        "Configured in HTML files; HikariCP is an in-memory database",
        "Configured via application.properties / application.yml (spring.datasource.url, username, password, driver-class-name); HikariCP is chosen because it is the fastest, lightest, and most CPU-efficient open-source connection pool, maintaining reusable TCP connections to eliminate per-request connection overhead",
        "HikariCP automatically backs up databases to Google Drive every 10 minutes",
        "Spring Boot does not support connection pooling; it opens and closes a new connection on every request"
      ]
    },
    {
      "id": "ir01",
      "topic": "react",
      "text": "Virtual DOM trong thư viện React là gì và cơ chế hoạt động của thuật toán Reconciliation (Diffing) diễn ra như thế nào?",
      "options": [
        "Virtual DOM là bản sao lưu dưới database của giao diện web",
        "Virtual DOM là một bản biểu diễn trừu tượng của Real DOM dưới dạng JavaScript Object nằm trong bộ nhớ RAM; khi state thay đổi, React so sánh Virtual DOM mới và cũ (thuật toán Diffing) rồi chỉ cập nhật phần tử thực sự thay đổi lên Real DOM (Reconciliation / Batching) giúp tăng hiệu năng render",
        "Virtual DOM thao tác trực tiếp với phần cứng màn hình nên nhanh hơn Real DOM hàng nghìn lần",
        "Virtual DOM làm ứng dụng tốn bộ nhớ hơn và không có lợi ích gì đáng kể"
      ],
      "answer": 1,
      "explanation": "• Thao tác trực tiếp với Real DOM của trình duyệt rất tốn kém tài nguyên vì kích hoạt quá trình tính toán lại layout (Reflow) và vẽ lại pixel (Repaint).\n• React tạo Virtual DOM trên RAM (nhẹ hơn DOM thật rất nhiều), khi state thay đổi nó dùng thuật toán Diffing tìm ra phần khác biệt nhỏ nhất và cập nhật hàng loạt (Batching) lên Real DOM.",
      "textEn": "What is the Virtual DOM in React and how does the Reconciliation (Diffing) algorithm optimize UI performance?",
      "optionsEn": [
        "A database backup of the user interface stored on the backend",
        "A lightweight virtual in-memory copy of the real DOM. When state changes, React updates Virtual DOM, computes differences (Diffing Algorithm / Reconciliation), and updates only the modified nodes in the Real DOM in batches",
        "A hardware-accelerated direct screen renderer",
        "A plugin that increases memory usage without practical benefits"
      ]
    },
    {
      "id": "ir02",
      "topic": "react",
      "text": "Virtual DOM có luôn luôn nhanh hơn Real DOM thật trong mọi tình huống không? Vì sao?",
      "options": [
        "Có, Virtual DOM luôn nhanh hơn 100% trong mọi trường hợp bất kể kích thước ứng dụng",
        "Không. Với các ứng dụng đơn giản hoặc thao tác DOM tĩnh nhỏ lẻ, việc thao tác trực tiếp Real DOM thực tế nhanh hơn vì không mất chi phí RAM tạo Virtual DOM và thời gian chạy thuật toán so sánh Diffing; lợi thế lớn nhất của React là trải nghiệm lập trình (DX) và cập nhật tối ưu hàng loạt (Batching) cho ứng dụng lớn phức tạp",
        "Virtual DOM chỉ chạy nhanh hơn khi người dùng sử dụng trình duyệt Google Chrome",
        "Virtual DOM chỉ nhanh hơn khi có kết nối Internet tốc độ cao"
      ],
      "answer": 1,
      "explanation": "💡 Câu hỏi phỏng vấn xuất sắc phân loại ứng viên:\nVirtual DOM KHÔNG PHẢI sinh ra để nhanh hơn Real DOM thuần túy (viết Vanilla JS tối ưu tay cho 1 element luôn nhanh hơn bất kỳ framework nào). Virtual DOM sinh ra để lập trình viên có thể viết code dạng Declarative (khai báo: 'giao diện trông như thế này dựa trên state'), và React đảm bảo hiệu năng ở mức 'đủ tốt' (good enough performance) trên các ứng dụng quy mô khổng lồ.",
      "textEn": "Is the Virtual DOM always faster than the Real DOM under all circumstances? Why?",
      "optionsEn": [
        "Yes, Virtual DOM is 100% faster in every single case regardless of application complexity",
        "No. For simple websites or localized DOM modifications, direct Real DOM manipulation is faster because it avoids in-memory VDOM allocation and diffing algorithm overhead; React's primary strengths are developer experience (DX), declarative UI, and batched updates for complex applications",
        "Virtual DOM is only faster when running specifically on Google Chrome",
        "Virtual DOM is only faster with high-speed broadband connections"
      ]
    },
    {
      "id": "ir03",
      "topic": "react",
      "text": "Trong React, phân biệt giữa State và Props?",
      "options": [
        "State truyền từ cha xuống con; Props lưu dữ liệu nội bộ",
        "Props (Properties) là dữ liệu truyền từ component cha xuống component con, component con chỉ đọc (Read-only / Immutable); State là dữ liệu trạng thái nội tại do chính component đó quản lý và khi thay đổi (qua setState / useState) sẽ kích hoạt component re-render",
        "Props có thể thay đổi trực tiếp bằng lệnh gán this.props = ...",
        "Chỉ có Class Component mới có State, Functional Component không thể có State"
      ],
      "answer": 1,
      "explanation": "• `Props`: Do component cha truyền xuống con. Component con không được phép thay đổi props của chính mình (đảm bảo luồng dữ liệu 1 chiều One-Way Data Flow).\n• `State`: Biến trạng thái nội tại. Khi gọi `setCount(newVal)`, React lên lịch re-render lại component để cập nhật UI tương ứng.",
      "textEn": "In React, what is the fundamental difference between State and Props?",
      "optionsEn": [
        "State is passed from parent to child; Props is private local data",
        "Props (Properties) are inputs passed down from a parent component (read-only and immutable for the child); State represents internal component state managed locally that triggers re-rendering when updated via setState/useState",
        "Props can be modified directly via assignment",
        "Only Class Components can have State; Functional Components cannot hold state"
      ]
    },
    {
      "id": "ir04",
      "topic": "react",
      "text": "Phân biệt vai trò và cơ chế hoạt động giữa hai React Hook cơ bản: useState và useEffect?",
      "options": [
        "useState dùng để gọi API; useEffect dùng để lưu giá trị ô input",
        "useState dùng để khai báo và quản lý biến trạng thái (re-render UI khi giá trị đổi); useEffect dùng để thực thi các tác vụ phụ (Side Effects như gọi API, đăng ký event listener, thao tác DOM, timers) sau khi component đã render lên màn hình",
        "useEffect chỉ chạy duy nhất 1 lần khi tắt trình duyệt",
        "Cả hai hook này có thể đặt bên trong vòng lặp for hoặc câu lệnh if tùy ý"
      ],
      "answer": 1,
      "explanation": "• `useState`: Quản lý state cục bộ. Mỗi lần gọi hàm setter (`setCount`), React xếp lịch re-render component.\n• `useEffect(callback, deps)`: Xử lý Side Effects.\n  - `deps = undefined`: Chạy sau mỗi lần render.\n  - `deps = []`: Chỉ chạy 1 lần duy nhất sau mount (tương đương `componentDidMount`).\n  - `deps = [a, b]`: Chạy lại khi `a` hoặc `b` thay đổi giá trị.\n  - Return cleanup function: Chạy trước khi unmount để tránh rò rỉ bộ nhớ (Memory Leak).",
      "textEn": "What are the distinct roles and mechanisms of the fundamental React Hooks: useState and useEffect?",
      "optionsEn": [
        "useState is used to call APIs; useEffect is used to store input values",
        "useState declares and manages local component state (triggering UI re-renders on change); useEffect executes Side Effects (such as data fetching, event listeners, subscriptions, timers) after the component renders",
        "useEffect only runs when closing the browser tab",
        "Both hooks can be freely placed inside for loops and if statements"
      ]
    },
    {
      "id": "ir05",
      "topic": "react",
      "text": "Khi nào nên sử dụng hai hook useMemo và useCallback trong React để tối ưu hiệu năng?",
      "options": [
        "Bắt buộc phải bọc tất cả mọi biến và hàm trong useMemo và useCallback để ứng dụng chạy nhanh nhất",
        "useMemo dùng để ghi nhớ kết quả của một phép tính toán tốn kém (expensive calculation); useCallback dùng để ghi nhớ định nghĩa hàm (function reference) tránh tạo con trỏ hàm mới mỗi lần re-render khi truyền xuống component con bọc React.memo",
        "useMemo dùng để gọi API; useCallback dùng để kết nối Database",
        "Hai hook này chỉ dùng được trong môi trường React Native"
      ],
      "answer": 1,
      "explanation": "💡 Lưu ý phỏng vấn về việc tối ưu hiệu năng (Performance Optimization):\nKhông nên lạm dụng `useMemo`/`useCallback` bừa bãi vì bản thân việc khởi tạo hook và mảng dependencies cũng tốn RAM và chi phí so sánh.\n- Dùng `useMemo`: Khi có phép tính lặp phức tạp (sort/filter mảng hàng nghìn phần tử).\n- Dùng `useCallback`: Khi truyền callback function xuống component con (được bọc bởi `React.memo`) để tránh component con bị re-render vô ích.",
      "textEn": "When should useMemo and useCallback be used in React for performance optimization?",
      "optionsEn": [
        "All variables and functions must be wrapped in useMemo and useCallback to maximize application speed",
        "useMemo memoizes the computed result of an expensive calculation; useCallback memoizes a function reference to prevent creating a new function instance on every render when passing callbacks to memoized child components (React.memo)",
        "useMemo is for fetching APIs; useCallback is for connecting to databases",
        "These two hooks can only be used in React Native applications"
      ]
    },
    {
      "id": "ir06",
      "topic": "react",
      "text": "Next.js hỗ trợ những phương thức Rendering (kết xuất trang) nào và điểm khác biệt chính giữa chúng là gì?",
      "options": [
        "Next.js chỉ hỗ trợ Client Side Rendering giống hệt Create-React-App",
        "1. CSR (Client-Side Rendering): Render hoàn toàn trên trình duyệt; 2. SSR (Server-Side Rendering): Render HTML trên Server cho mỗi request; 3. SSG (Static Site Generation): Tạo sẵn file HTML lúc build time; 4. ISR (Incremental Static Regeneration): Cập nhật ngầm trang tĩnh sau khoảng thời gian định sẵn mà không cần build lại toàn bộ web",
        "Next.js chỉ render được ảnh và video, không render được văn bản",
        "SSR chạy chậm hơn CSR 100 lần trong mọi tình huống"
      ],
      "answer": 1,
      "explanation": "• `CSR`: Nhẹ server nhưng chậm lần đầu (FCP) và kém SEO.\n• `SSR` (`getServerSideProps` hoặc dynamic fetch): Luôn có dữ liệu mới nhất, tốt cho trang Dashboard cá nhân hóa theo từng user.\n• `SSG` (`generateStaticParams` / static export): Tốc độ cực nhanh vì phân phối qua CDN, hoàn hảo cho blog, tài liệu, landing page.\n• `ISR`: Lấy ưu điểm của cả SSG và SSR (trang tĩnh nhưng có thể tự động revalidate sau X giây khi có dữ liệu mới).",
      "textEn": "What rendering strategies does Next.js support, and what are their key distinctions?",
      "optionsEn": [
        "Next.js only supports standard Client-Side Rendering identical to Create-React-App",
        "1. CSR (Client-Side Rendering): Executed in browser; 2. SSR (Server-Side Rendering): HTML generated on server per request; 3. SSG (Static Site Generation): HTML pre-rendered at build time; 4. ISR (Incremental Static Regeneration): Re-generates static pages in background on-demand without full site rebuilds",
        "Next.js only renders media files and cannot render text",
        "SSR is always 100 times slower than CSR in every scenario"
      ]
    },
    {
      "id": "ir07",
      "topic": "react",
      "text": "Trong Next.js App Router (React Server Components), chỉ thị \"use client\" đặt ở đầu file có ý nghĩa gì và khi nào bắt buộc phải dùng?",
      "options": [
        "Bắt buộc đặt trên 100% tất cả các file trong project Next.js",
        "Đánh dấu ranh giới chuyển đổi từ Server Component sang Client Component; bắt buộc phải dùng khi component có sử dụng React State/Hooks (useState, useEffect), Event Listeners (onClick, onChange) hoặc truy cập Web API trình duyệt (window, localStorage)",
        "Báo hiệu rằng file này là file CSS",
        "Cho phép kết nối trực tiếp đến cơ sở dữ liệu MongoDB mà không cần bảo mật"
      ],
      "answer": 1,
      "explanation": "• Trong Next.js App Router, mặc định tất cả component đều là React Server Components (RSC) - được render hoàn toàn trên server và không kèm JavaScript bundle xuống client, giúp web siêu nhẹ.\n• Khi bạn cần tính tương tác (Interactive): form input, click button, dùng `useState`, `useEffect`, `useRouter`,... thì BẮT BUỘC phải thêm `\"use client\";` ở dòng đầu tiên.",
      "textEn": "In Next.js App Router (React Server Components), what does the \"use client\" directive signify and when is it required?",
      "optionsEn": [
        "It must be added at the top of 100% of files in a Next.js project",
        "It marks the boundary between Server Components and Client Components; it is mandatory when a component uses React State/Hooks (useState, useEffect), DOM Event Listeners (onClick, onChange), or browser Web APIs (window, localStorage)",
        "It signals that the file contains CSS stylesheets",
        "It enables direct insecure client connections to MongoDB databases"
      ]
    },
    {
      "id": "ir08",
      "topic": "react",
      "text": "Nếu mục tiêu hàng đầu của dự án là tối ưu SEO (Search Engine Optimization), ta nên ưu tiên phương thức Rendering nào trong Next.js và vì sao?",
      "options": [
        "CSR (Client Side Rendering) vì trình duyệt tải rất nhẹ",
        "SSR (Server-Side Rendering) hoặc SSG (Static Site Generation); vì Bot tìm kiếm (Googlebot, Bingbot) sẽ nhận được toàn bộ mã HTML hoàn chỉnh chứa sẵn nội dung, tiêu đề h1 và thẻ meta ngay trong phản hồi đầu tiên, thay vì nhận file HTML rỗng <div id=\"root\"></div> của CSR",
        "Chỉ cần chèn thật nhiều từ khóa vào file README.md",
        "SEO không phụ thuộc vào phương thức rendering của website"
      ],
      "answer": 1,
      "explanation": "💡 Giải thích SEO phỏng vấn:\nVới CSR truyền thống, bot tìm kiếm nhận được thẻ `<div id=\"root\"></div>` trống rỗng và phải chờ JavaScript tải về thực thi (nhiều crawler mạng xã hội như Facebook, Zalo, Twitter bot thậm chí không chạy JS khi cào thẻ OpenGraph preview).\nVới SSR/SSG, máy chủ trả về mã HTML hoàn chỉnh có sẵn tiêu đề, đoạn văn và thẻ meta `<meta property=\"og:title\">`, giúp nội dung được lập chỉ mục (indexed) ngay lập tức và chính xác 100%.",
      "textEn": "If the primary goal of a web project is SEO optimization, which Next.js rendering strategy should be favored and why?",
      "optionsEn": [
        "CSR (Client-Side Rendering) because browser payload size is minimal",
        "SSR (Server-Side Rendering) or SSG (Static Site Generation); because search crawlers (Googlebot, Bingbot, social media scrapers) receive fully rendered HTML containing complete text, headers, and meta tags immediately in the initial response, instead of an empty <div id=\"root\"></div> shell",
        "Inserting arbitrary keywords into the project's README.md file",
        "SEO is completely independent of website rendering architecture"
      ]
    },
    {
      "id": "ir09",
      "topic": "react",
      "text": "Khi so sánh cơ chế hiển thị có điều kiện, sự khác nhau giữa directive v-if và v-show trong Vue.js (hoặc tương tự trong React) là gì?",
      "options": [
        "v-if chỉ dùng cho ảnh; v-show chỉ dùng cho bảng dữ liệu",
        "v-if thực sự gỡ bỏ hoặc thêm phần tử vào cây DOM (chi phí chuyển đổi cao hơn, phù hợp điều kiện ít thay đổi); v-show luôn render phần tử vào DOM và chỉ ẩn/hiển thị bằng thuộc tính CSS display: none (chi phí khởi tạo ban đầu cao hơn nhưng chuyển đổi bật/tắt cực nhanh)",
        "v-show làm trang web tải chậm hơn 10 lần",
        "Cả hai giống hệt nhau về cả cấu trúc DOM lẫn hiệu năng"
      ],
      "answer": 1,
      "explanation": "• `v-if`: Điều kiện sai -> phần tử hoàn toàn không tồn tại trong DOM. Rất tiết kiệm tài nguyên nếu điều kiện hiếm khi xảy ra.\n• `v-show`: Phần tử luôn được tạo trong DOM, chỉ thêm style `display: none`. Phù hợp tuyệt đối cho các thành phần bật/tắt liên tục (như Popup Modal, Tooltip, Tab chuyển đổi, Dropdown menu).",
      "textEn": "In Vue.js (or conditional rendering concepts), what is the difference between v-if and v-show directives?",
      "optionsEn": [
        "v-if is strictly for images; v-show is strictly for data tables",
        "v-if physically attaches or detaches elements from the DOM tree (higher toggle cost, ideal for rarely changing conditions); v-show always renders elements into the DOM and toggles visibility via CSS display: none (higher initial render cost but near-zero toggle cost)",
        "v-show causes the web application to load 10 times slower",
        "Both are identical in terms of DOM tree presence and performance"
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
      "id": "iw05",
      "topic": "web",
      "text": "Trong mô hình Box Model của CSS, sự khác nhau giữa margin và padding là gì?",
      "options": [
        "margin là màu nền; padding là màu viền",
        "padding là khoảng cách đệm bên trong đường viền (border) bao quanh nội dung; margin là khoảng cách bên ngoài đường viền đẩy lùi các phần tử lân cận xung quanh",
        "padding chỉ dùng cho thẻ div; margin dùng cho thẻ span",
        "Cả hai hoàn toàn giống nhau và có thể thay thế cho nhau trong mọi trường hợp"
      ],
      "answer": 1,
      "explanation": "• CSS Box Model từ trong ra ngoài: Content -> Padding -> Border -> Margin.\n• `Padding`: Làm tăng kích thước vùng nền (background) của phần tử.\n• `Margin`: Tạo khoảng trống giữa phần tử này với phần tử khác (có hiện tượng Margin Collapsing giữa 2 margin dọc kề nhau).",
      "textEn": "In the CSS Box Model, what is the difference between margin and padding?",
      "optionsEn": [
        "margin controls background color; padding controls border color",
        "padding is inner spacing between the content and the element border; margin is outer spacing outside the border separating the element from surrounding neighbors",
        "padding is only applicable to div tags; margin is only for span tags",
        "Both are completely identical and interchangeable"
      ]
    },
    {
      "id": "iw06",
      "topic": "web",
      "text": "DOM (Document Object Model) trong trình duyệt là gì và sự khác nhau giữa document.getElementById và document.querySelector trong JavaScript là gì?",
      "options": [
        "DOM là giao thức kết nối internet; getElementById chỉ dùng cho file XML",
        "DOM là giao diện lập trình biểu diễn tài liệu HTML dưới dạng cây các đối tượng (Node Tree); getElementById tìm kiếm trực tiếp theo ID duy nhất (tốc độ thực thi cực nhanh, trả về Element); querySelector nhận bất kỳ chuỗi CSS selector nào (#id, .class, tag[attr]), linh hoạt hơn nhưng tốc độ chậm hơn một chút",
        "querySelector luôn trả về một mảng danh sách tất cả các phần tử",
        "document.getElementById chỉ chạy được trên điện thoại di động"
      ],
      "answer": 1,
      "explanation": "• DOM: Cây đối tượng cho phép JavaScript đọc, sửa, thêm hoặc xóa các thẻ HTML và style CSS động.\n• `getElementById('my-btn')`: Tìm theo ID (rất nhanh, trả về 1 element hoặc null).\n• `querySelector('.nav > .active')`: Nhận CSS selector phức tạp, trả về phần tử đầu tiên khớp.\n• `querySelectorAll(...)`: Trả về NodeList chứa tất cả các phần tử khớp.",
      "textEn": "What is the DOM in browser environments, and how do document.getElementById and document.querySelector differ?",
      "optionsEn": [
        "DOM is a networking protocol; getElementById is strictly for XML files",
        "The DOM (Document Object Model) is an API representing HTML documents as a node tree; getElementById queries directly by unique ID (fastest performance, returns an Element); querySelector accepts any CSS selector string (#id, .class, [attr]), offering higher flexibility with slight overhead",
        "querySelector always returns an array of all matching elements",
        "document.getElementById only functions on mobile browsers"
      ]
    },
    {
      "id": "iw07",
      "topic": "web",
      "text": "Khi xử lý sự kiện submit của thẻ `<form>` bằng JavaScript, tại sao lập trình viên hầu như luôn gọi event.preventDefault()?",
      "options": [
        "Để xóa sạch cơ sở dữ liệu trên server",
        "Để ngăn chặn hành vi mặc định của trình duyệt là gửi HTTP request đồng bộ và tải lại toàn bộ trang web (page reload), cho phép JavaScript kiểm tra tính hợp lệ và gửi dữ liệu bất đồng bộ qua AJAX / Fetch API",
        "Để tăng tốc độ kết nối mạng lên gấp đôi",
        "Để mã hóa mật khẩu người dùng thành dạng SHA-256"
      ],
      "answer": 1,
      "explanation": "• Mặc định khi click submit button trong form, trình duyệt sẽ gửi request và reload lại toàn bộ trang (mất toàn bộ state hiện tại của ứng dụng Single Page App).\n• `event.preventDefault()` chặn hành vi reload mặc định, cho phép xử lý dữ liệu bằng JS (validate, hiển thị loading spinner, gọi `fetch('/api/login')`).",
      "textEn": "When handling a `<form>` submit event in JavaScript, why do developers almost universally call event.preventDefault()?",
      "optionsEn": [
        "To wipe out the backend server database",
        "To prevent the browser's default behavior of issuing a synchronous HTTP request and reloading the entire web page, enabling client-side validation and asynchronous submission via Fetch/AJAX",
        "To double the network connection bandwidth",
        "To automatically hash user passwords using SHA-256"
      ]
    },
    {
      "id": "iw08",
      "topic": "web",
      "text": "Khái niệm Callback trong JavaScript là gì và vấn đề Callback Hell được giải quyết như thế nào trong JavaScript hiện đại?",
      "options": [
        "Callback là cuộc gọi điện thoại thoại; Callback Hell là lỗi mất sóng",
        "Callback là một hàm được truyền dưới dạng đối số vào một hàm khác để được gọi lại thực thi sau khi một tác vụ (thường là bất đồng bộ) hoàn tất; Callback Hell (lồng nhau quá nhiều tầng) gây khó đọc và khó bắt lỗi, được giải quyết bằng Promise và cú pháp async/await",
        "Callback chỉ dùng được trong CSS; giải quyết bằng cách cài Bootstrap",
        "Callback Hell không thể giải quyết được trong ngôn ngữ JavaScript"
      ],
      "answer": 1,
      "explanation": "• Callback: `setTimeout(() => console.log('Done'), 1000)`.\n• Callback Hell (Pyramid of Doom): Khi các tác vụ bất đồng bộ phụ thuộc nhau (đọc file 1 -> đọc file 2 -> ghi DB) lồng nhau sâu hoắm.\n• Giải pháp: ES6 ra mắt `Promise`, và ES8 (ES2017) ra mắt `async/await` giúp viết mã bất đồng bộ trông tuần tự, sáng sủa và bắt lỗi dễ dàng qua `try/catch`.",
      "textEn": "What is a Callback in JavaScript, and how was Callback Hell resolved in modern JavaScript?",
      "optionsEn": [
        "A callback is an audio phone call; Callback Hell is signal loss",
        "A callback is a function passed as an argument to another function to be executed after an asynchronous task completes; Callback Hell (excessive nested callbacks) was solved by Promises and async/await syntax",
        "Callbacks are only used in CSS; resolved by installing Bootstrap",
        "Callback Hell is an unfixable limitation of the JavaScript language"
      ]
    },
    {
      "id": "iw09",
      "topic": "web",
      "text": "Định dạng JSON là gì và phân biệt hai phương thức JSON.stringify() và JSON.parse() trong JavaScript?",
      "options": [
        "JSON là phần mềm chỉnh sửa ảnh; stringify vẽ ảnh, parse xuất video",
        "JSON (JavaScript Object Notation) là định dạng trao đổi dữ liệu dạng văn bản nhẹ, độc lập với ngôn ngữ; JSON.stringify() chuyển đổi JavaScript Object/Array thành chuỗi văn bản JSON; JSON.parse() phân tích chuỗi văn bản JSON thành JavaScript Object tương ứng",
        "JSON.stringify() dùng để giải mã mật mã; JSON.parse() dùng để mã hóa mật mã",
        "Cả hai hàm đều dùng để xóa bộ nhớ cache của trình duyệt"
      ],
      "answer": 1,
      "explanation": "• JSON: Cú pháp chuẩn dựa trên object literal của JavaScript, chuẩn giao tiếp số 1 của RESTful API.\n• `JSON.stringify(obj)`: Biến object `{ name: 'An', age: 20 }` -> chuỗi text `'{\"name\":\"An\",\"age\":20}'` để gửi qua HTTP body.\n• `JSON.parse(str)`: Biến chuỗi text JSON nhận được từ server -> JavaScript Object để truy xuất `obj.name`.",
      "textEn": "What is JSON format, and how do JSON.stringify() and JSON.parse() differ in JavaScript?",
      "optionsEn": [
        "JSON is photo editing software; stringify renders images, parse exports video",
        "JSON (JavaScript Object Notation) is a lightweight language-independent data-interchange format; JSON.stringify() serializes a JavaScript Object/Array into a JSON string; JSON.parse() parses a JSON string into its corresponding JavaScript Object",
        "JSON.stringify() decrypts data; JSON.parse() encrypts data",
        "Both functions clear browser memory cache"
      ]
    },
    {
      "id": "iw10",
      "topic": "web",
      "text": "Node.js là gì và cơ chế xử lý Single-Threaded Event Loop của Node.js giúp nó xử lý hàng ngàn kết nối đồng thời (High Concurrency) như thế nào?",
      "options": [
        "Node.js là một hệ điều hành mới thay thế Windows và Linux",
        "Node.js là môi trường runtime chạy mã JavaScript ngoài trình duyệt xây dựng trên V8 Engine; sử dụng cơ chế Non-blocking I/O và Event Loop đơn luồng ủy thác các tác vụ nặng (đọc ghi file, mạng, database) cho hệ điều hành bên dưới (libuv thread pool), cho phép tiếp tục nhận các request mới mà không bị chặn (blocked)",
        "Node.js tạo ra 1 tiến trình riêng biệt cho mỗi kết nối của người dùng",
        "Node.js chỉ chạy được trên các máy chủ có 64 core CPU"
      ],
      "answer": 1,
      "explanation": "💡 Câu hỏi phỏng vấn hay hỏi về Node.js:\n• Không giống Tomcat/Java truyền thống (mỗi request = 1 luồng riêng - Thread-per-request), Node.js chỉ có 1 Main Thread chạy code JavaScript.\n• Khi gặp I/O (Database query, API call), nó chuyển cho libuv xử lý ngầm và đăng ký callback. Main thread lập tức rảnh tay phục vụ request tiếp theo. Khi I/O xong, callback được đẩy vào Event Loop để thực thi.",
      "textEn": "What is Node.js and how does its Single-Threaded Event Loop handle high concurrent traffic?",
      "optionsEn": [
        "Node.js is a new operating system designed to replace Windows and Linux",
        "Node.js is a JavaScript runtime built on Chrome's V8 engine; its single-threaded Event Loop utilizes non-blocking I/O by delegating heavy operations (filesystem, network, database) to the underlying system (libuv thread pool), allowing it to handle thousands of concurrent requests without blocking",
        "Node.js spawns an isolated OS process for every individual user connection",
        "Node.js requires server hardware with at least 64 CPU cores"
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
      "id": "idv06",
      "topic": "devops",
      "text": "Trong Unit Test ứng dụng Java/Spring Boot, thư viện Mockito dùng để làm gì và ý nghĩa của các annotation @Mock và @InjectMocks?",
      "options": [
        "Mockito dùng để tạo giao diện người dùng tự động",
        "Dùng để tạo các đối tượng giả lập (Mock objects) cô lập tầng đang kiểm thử khỏi các phụ thuộc bên ngoài (như Database Repository, API bên thứ ba); @Mock tạo đối tượng giả lập; @InjectMocks tự động tiêm các mock này vào đối tượng cần kiểm thử (thường là Service)",
        "Mockito dùng để mã hóa mật khẩu người dùng trước khi lưu",
        "Mockito bắt buộc phải chạy trên máy chủ thật có kết nối Database"
      ],
      "answer": 1,
      "explanation": "💡 Nguyên lý Unit Test cốt lõi: Kiểm tra 1 đơn vị code (1 method của Service) một cách độc lập.\nVí dụ khi test `UserService.createUser()`: Ta không muốn gọi Database thật. Ta dùng `@Mock UserRepository` và cấu hình hành vi giả: `when(userRepository.save(any())).thenReturn(fakeUser)`. Sau đó `@InjectMocks UserService userService` để test logic tính toán của Service.",
      "textEn": "In Java/Spring Boot Unit Testing, what is Mockito used for and what do @Mock and @InjectMocks do?",
      "optionsEn": [
        "Mockito automatically generates user interfaces",
        "Mockito creates simulated mock objects to isolate the class under test from external dependencies (such as Repositories or external APIs); @Mock creates a simulated dependency; @InjectMocks creates the target instance and injects the created mocks into it",
        "Mockito encrypts user credentials before persisting to disk",
        "Mockito strictly requires a live database connection"
      ]
    },
    {
      "id": "idv07",
      "topic": "devops",
      "text": "So sánh Kiểm thử tự động (Automation Testing) và Kiểm thử thủ công (Manual Testing)? Khi nào nên áp dụng loại nào?",
      "options": [
        "Manual Test đã lỗi thời và không còn công ty nào sử dụng",
        "Manual Testing thực hiện bằng thao tác tay của con người, rất linh hoạt cho kiểm thử giao diện/trải nghiệm người dùng (UX) và tính năng mới thay đổi liên tục; Automation Testing dùng kịch bản mã hóa (Selenium, JUnit, Playwright) cho phép chạy lặp lại hàng nghìn lần nhanh chóng, cực kỳ phù hợp cho Kiểm thử hồi quy (Regression Testing) và tích hợp vào CI/CD Pipeline",
        "Automation Testing chỉ dùng để kiểm tra tốc độ đường truyền mạng",
        "Manual Testing chạy nhanh hơn Automation Testing 10 lần"
      ],
      "answer": 1,
      "explanation": "• `Manual Testing`: Tốt cho giai đoạn đầu của dự án, kiểm thử khám phá (Exploratory Testing), đánh giá cảm nhận trực quan của con người.\n• `Automation Testing`: Chi phí ban đầu cao để viết kịch bản, nhưng khi hệ thống đã ổn định thì chạy kiểm thử hồi quy (Regression Test) mỗi khi push code lên Git cực kỳ rẻ và phát hiện bug ngay lập tức.",
      "textEn": "Compare Automation Testing and Manual Testing. When should each approach be utilized?",
      "optionsEn": [
        "Manual testing is obsolete and no longer used in professional companies",
        "Manual Testing relies on human interaction, ideal for exploratory UX testing and rapidly changing new features; Automation Testing uses scripted tools (Selenium, JUnit, Playwright) to run thousands of test cases reliably, excelling at Regression Testing within CI/CD pipelines",
        "Automation Testing only tests network transmission speed",
        "Manual Testing is 10 times faster than Automation Testing"
      ]
    },
    {
      "id": "idv08",
      "topic": "devops",
      "text": "Sự khác biệt cơ bản giữa mô hình Thác nước (Waterfall) và mô hình Linh hoạt (Agile / Scrum) trong phát triển phần mềm là gì?",
      "options": [
        "Waterfall chỉ dùng cho dự án của học sinh; Scrum dùng cho ngân hàng",
        "Waterfall thực hiện tuần tự qua các giai đoạn nghiêm ngặt (Phân tích -> Thiết kế -> Lập trình -> Kiểm thử), yêu cầu chốt cứng từ đầu và rất khó thay đổi; Agile/Scrum chia nhỏ dự án thành các chu kỳ ngắn (Sprint 1-4 tuần), giao sản phẩm tăng dần (Incremental) và thích ứng nhanh với các thay đổi yêu cầu",
        "Scrum không cần kiểm thử phần mềm",
        "Cả hai mô hình có tiến trình và cách quản lý giống hệt nhau"
      ],
      "answer": 1,
      "explanation": "• Waterfall: Khách hàng chỉ thấy sản phẩm ở cuối dự án (rủi ro cao nếu yêu cầu ban đầu bị hiểu sai).\n• Agile/Scrum: Cứ sau mỗi Sprint (2 tuần), nhóm phát triển demo một phần phần mềm chạy được (working software) cho khách hàng xem và góp ý, giúp giảm thiểu rủi ro trễ hạn và đáp ứng thị trường nhanh chóng.",
      "textEn": "What is the primary difference between the Waterfall model and Agile/Scrum in software development?",
      "optionsEn": [
        "Waterfall is only for student projects; Scrum is for banking",
        "Waterfall executes sequentially through rigid phases (Analysis -> Design -> Implementation -> Testing) with fixed upfront requirements; Agile/Scrum divides work into short iterative Sprints (1-4 weeks), delivering incremental working software adaptable to evolving requirements",
        "Scrum does not require software testing",
        "Both models follow identical processes and management cadences"
      ]
    },
    {
      "id": "idv09",
      "topic": "devops",
      "text": "Khi thiết kế tính năng Tìm kiếm (Search) trong hệ thống phần mềm, luồng xử lý chuẩn ở phía Backend nên được thiết kế như thế nào để tối ưu hiệu năng và tránh quá tải Database?",
      "options": [
        "Cho phép client gọi API tìm kiếm sau mỗi ký tự gõ phím mà không cần throttle, query thẳng SELECT * FROM table WHERE column LIKE '%kw%'",
        "Phía Client áp dụng Debounce (chờ 300-500ms sau khi ngừng gõ); phía Backend kiểm tra Cache (Redis/Memcached) trước; nếu cache miss thì truy vấn Database có đánh chỉ mục (Index) hoặc sử dụng Search Engine chuyên dụng (Elasticsearch), kết hợp phân trang (LIMIT/OFFSET) và chỉ trả về các trường dữ liệu cần thiết",
        "Tắt hoàn toàn tính năng tìm kiếm trên server",
        "Gửi toàn bộ database về cho trình duyệt của client tự tìm"
      ],
      "answer": 1,
      "explanation": "💡 Trả lời chuẩn kiến trúc hệ thống (System Architecture):\n1. `Client Debounce`: Tránh spam 10 request khi gõ 10 chữ cái.\n2. `Cache Layer`: Cache kết quả của các từ khóa phổ biến (top searches) trong Redis.\n3. `Full-Text Search Engine`: Khi dữ liệu lớn, câu `LIKE '%abc%'` sẽ Full Table Scan gây treo database. Cần dùng Elasticsearch/OpenSearch hoặc MySQL Fulltext Index.\n4. `Pagination`: Luôn giới hạn số lượng bản ghi trả về (ví dụ page=1&size=20).",
      "textEn": "When designing a Search feature in software architecture, how should the backend flow be structured to optimize performance and prevent database overload?",
      "optionsEn": [
        "Allow clients to invoke the search API on every keystroke without throttling and execute unindexed SELECT * LIKE '%kw%' queries",
        "Client applies Debouncing (300-500ms delay); Backend checks in-memory cache (Redis) first; on cache miss, queries indexed database columns or dedicated search engines (Elasticsearch) with pagination (LIMIT/OFFSET) returning only required projection fields",
        "Disable the search feature completely on the server",
        "Stream the entire database dump to the browser for client-side evaluation"
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
    },
    {
      "id": "iai05",
      "topic": "ai",
      "text": "Trong việc phát triển phần mềm với sự hỗ trợ của AI (như Antigravity, Cursor, Claude Code), các file cấu hình ngữ cảnh dự án như claude.md hay AGENTS.md đóng vai trò gì?",
      "options": [
        "Là file chứa mã độc để tấn công máy chủ",
        "Cung cấp ngữ cảnh hệ thống (System Prompt / Context), quy ước mã nguồn (Coding standards), kiến trúc công nghệ, các quy tắc bảo mật và hướng dẫn quy trình đặc thù của dự án để AI Assistant hiểu sâu dự án và sinh code tuân thủ 100% chuẩn mực của đội ngũ",
        "Là file chứa giấy phép bản quyền phần mềm để nộp cho cơ quan thuế",
        "Chỉ dùng để đổi màu giao diện của IDE"
      ],
      "answer": 1,
      "explanation": "💡 Xu hướng phỏng vấn AI Tooling mới nhất:\nFile `claude.md` / `AGENTS.md` hoạt động như một cuốn 'Sổ tay hướng dẫn dự án' dành riêng cho AI Agent. Nó chứa: Tech stack, kiến trúc thư mục, quy tắc đặt tên, cách chạy lệnh test/build, và các lỗi thường gặp, giúp AI không sinh ra code lạc đề hoặc dùng sai thư viện.",
      "textEn": "In AI-assisted software engineering (tools like Antigravity, Cursor, Claude Code), what role do context configuration files like claude.md or AGENTS.md serve?",
      "optionsEn": [
        "They are malicious scripts used to attack servers",
        "They provide persistent System Prompts, project-specific coding standards, architecture constraints, and workflow guidelines so that the AI Assistant produces code adhering strictly to the team's conventions",
        "They store software copyright certificates for taxation audits",
        "They only modify the visual color themes of the IDE"
      ]
    },
    {
      "id": "iai06",
      "topic": "ai",
      "text": "Khi tích hợp mô hình ngôn ngữ lớn (LLM API như OpenAI, Gemini) vào ứng dụng Backend, tại sao phản hồi thường được truyền về Client dưới dạng Streaming (Server-Sent Events - SSE)?",
      "options": [
        "Vì Streaming giúp làm giảm dung lượng của cơ sở dữ liệu",
        "Vì LLM sinh từ (tokens) tuần tự theo thời gian; cơ chế Streaming (SSE) cho phép đẩy từng token về client ngay khi vừa được tạo ra, giảm thời gian phản hồi đầu tiên (Time to First Token - TTFT) từ hàng chục giây xuống dưới 1 giây, mang lại trải nghiệm tương tác trực quan tức thì cho người dùng",
        "Streaming chỉ dùng được khi xem phim, không áp dụng cho văn bản",
        "Bắt buộc phải dùng WebSocket hai chiều, SSE không truyền được text"
      ],
      "answer": 1,
      "explanation": "• LLM hoạt động theo cơ chế sinh từ tuần tự (Autoregressive generation). Nếu đợi model sinh xong toàn bộ bài viết 1000 từ mới trả về response, người dùng phải nhìn màn hình quay quay 15-30 giây.\n• Giao thức Server-Sent Events (SSE) với header `Content-Type: text/event-stream` cho phép Backend đẩy từng chữ (chunk) về trình duyệt ngay lập tức giống như chữ đang được gõ trực tiếp.",
      "textEn": "When integrating LLM APIs (OpenAI, Gemini) into backend services, why are responses streamed to clients using Server-Sent Events (SSE)?",
      "optionsEn": [
        "Because streaming reduces database storage capacity",
        "Because LLMs generate tokens sequentially; Streaming (SSE) pushes tokens to the client as they are generated, drastically cutting Time to First Token (TTFT) from dozens of seconds down to under 1 second and providing an immediate responsive user experience",
        "Streaming is exclusively used for video content, not text",
        "Bi-directional WebSockets are strictly required; SSE cannot transmit text"
      ]
    }
  ]
};

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
