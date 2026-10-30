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
      "explanation": "🎯 Bản chất dễ hiểu:\n• INNER JOIN: Chỉ lấy phần giao nhau (Intersection) giữa 2 bảng. Chỉ những dòng nào có khóa khớp ở cả 2 bảng mới được xuất hiện trong kết quả.\n• LEFT JOIN: Lấy 100% tất cả các dòng của Bảng Bên Trái. Nếu bảng bên phải có dữ liệu khớp thì điền vào, nếu không có dữ liệu khớp thì điền giá trị `NULL`.\n\n💻 Tình huống phỏng vấn kinh điển:\n\"Làm thế nào để tìm danh sách những Khách Hàng CHƯA TỪNG mua đơn hàng nào?\"\n-> Dùng LEFT JOIN bảng Khách Hàng với Đơn Hàng, và thêm điều kiện `WHERE DonHang.id IS NULL`!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `WHERE`: Lọc từng dòng dữ liệu ĐƠN LẺ trước khi gom nhóm (GROUP BY). Trong WHERE tuyệt đối không được dùng các hàm tổng hợp như `COUNT()`, `SUM()`, `AVG()` (ví dụ viết `WHERE COUNT(*) > 5` sẽ bị báo lỗi cú pháp ngay).\n• `HAVING`: Lọc trên các NHÓM DỮ LIỆU sau khi đã gom nhóm bằng GROUP BY xong xuôi. Thường đi kèm với hàm tổng hợp (ví dụ: `HAVING COUNT(don_hang) >= 5`).\n\n💡 Thần chú ghi nhớ: \"WHERE lọc trước khi nhóm - HAVING lọc sau khi nhóm\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐể tìm người có TUỔI BÉ NHẤT, tức là người có NGÀY SINH GẦN VỚI HIỆN TẠI NHẤT (ngày sinh lớn nhất / mới nhất).\nDo đó ta phải sắp xếp ngày sinh giảm dần `ORDER BY ngay_sinh DESC` và lấy 10 người đầu tiên bằng `LIMIT 10`.\n(Rất nhiều bạn bị bẫy chọn `ASC` là ra những cụ già lớn tuổi nhất!).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCú pháp xóa dữ liệu có điều kiện trong SQL chuẩn:\n`DELETE FROM ten_bang WHERE dieu_kien;`\nỞ đây điều kiện là chưa đủ 18 tuổi (`tuoi < 18`), nên câu lệnh chính xác là:\n`DELETE FROM ung_vien WHERE tuoi < 18;`",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `CHAR(10)`: Kiểu chuỗi CỐ ĐỊNH độ dài. Nếu bạn chỉ lưu chữ \"ABC\" (3 ký tự), database vẫn tự động bù thêm 7 khoảng trắng vào sau để đủ 10 byte trên ổ cứng. Thích hợp cho các trường có độ dài luôn cố định như: Mã CCCD, Mã bưu chính, Mã màu Hex, Mã tiền tệ (USD, VND).\n• `VARCHAR(10)`: Kiểu chuỗi CO GIÃN độ dài (Variable Character). Lưu \"ABC\" thì chỉ tốn đúng 3 byte + 1 byte lưu độ dài, giúp tiết kiệm tối đa dung lượng ổ cứng. Dùng cho: Họ tên, Địa chỉ, Email.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nThứ tự viết code SQL hoàn toàn KHÁC với thứ tự Database thực sự thực thi bên dưới!\nThứ tự logic chuẩn xác của RDBMS:\n1. `FROM` (Xác định nguồn bảng và JOIN)\n2. `WHERE` (Lọc các dòng thỏa điều kiện)\n3. `GROUP BY` (Gom nhóm các dòng)\n4. `HAVING` (Lọc trên các nhóm)\n5. `SELECT` (Chọn các cột hiển thị)\n6. `DISTINCT` (Loại bỏ dòng trùng lặp)\n7. `ORDER BY` (Sắp xếp kết quả tăng/giảm)\n8. `LIMIT / OFFSET` (Cắt lấy số dòng phân trang)\n\n💡 Mẹo phỏng vấn: Tại sao không thể dùng bí danh (Alias) đặt trong SELECT để lọc trong WHERE? Vì WHERE chạy ở bước 2, trong khi SELECT tận bước 5 mới chạy!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐề bài yêu cầu:\n1. Điểm dưới trung bình: `WHERE diem < 5`\n2. Thống kê theo từng quê quán: `GROUP BY que_quan`\n3. Đếm số lượng: `COUNT(*)`\n-> Câu hoàn chỉnh: `SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;`",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCó 2 cách chuẩn mực:\nCách 1: Dùng `LEFT JOIN` bảng sinhvien với dang_ky, rồi lọc `WHERE dang_ky.ma_sv IS NULL`.\nCách 2: Dùng `NOT EXISTS (SELECT 1 FROM dang_ky WHERE dang_ky.ma_sv = sinhvien.id)` (thường được tối ưu hóa rất tốt trên database hiện đại).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `UNION`: Gộp kết quả của 2 câu truy vấn và TỰ ĐỘNG LOẠI BỎ CÁC DÒNG TRÙNG NHAU. Để loại bỏ trùng lặp, database bắt buộc phải tốn tài nguyên sắp xếp (Sort) toàn bộ dữ liệu.\n• `UNION ALL`: Gộp mù quáng toàn bộ dữ liệu của cả 2 câu truy vấn, CÓ TRÙNG CŨNG GIỮ NGUYÊN. Vì không phải lọc trùng nên tốc độ chạy nhanh hơn UNION rất nhiều lần.\n\n💡 Mẹo: Nếu bạn biết chắc 2 tập dữ liệu không thể trùng nhau (hoặc bài toán chấp nhận trùng), hãy luôn dùng `UNION ALL` để tối ưu hiệu năng.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `DELETE`: Lệnh DML. Xóa từng dòng theo điều kiện WHERE, có ghi lại Transaction Log từng dòng nên có thể `ROLLBACK` (hoàn tác) được. Chạy chậm nhất.\n• `TRUNCATE`: Lệnh DDL. Xóa sạch bách toàn bộ dữ liệu trong bảng trong nháy mắt, reset bộ đếm Auto-Increment về 1. Cực nhanh vì giải phóng thẳng các Data Pages trên ổ cứng, không ghi log từng dòng và KHÔNG THỂ ROLLBACK được trong hầu hết CSDL.\n• `DROP`: Xóa sổ hoàn toàn cả dữ liệu lẫn cấu trúc bảng, biến mất vĩnh viễn khỏi Database.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCú pháp cập nhật:\n`UPDATE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';`\nTăng điểm hiện tại lên 1 đơn vị cho những ai có giới tính là 'Nu'.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nLọc nữ trước: `WHERE gioi_tinh = 'Nu'`.\nGom nhóm theo quê: `GROUP BY que_quan`.\nĐếm số lượng: `COUNT(*)`.\n-> `SELECT que_quan, COUNT(*) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;`",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKhóa chính tổng hợp (Composite Primary Key) là khóa chính được tạo thành từ **sự kết hợp của 2 hoặc nhiều cột** gom lại để định danh duy nhất một bản ghi.\nVí dụ: Bảng `dang_ky_mon_hoc (ma_sinh_vien, ma_mon_hoc)`. Một sinh viên có thể đăng ký nhiều môn, một môn có nhiều sinh viên, nhưng cặp `(ma_sinh_vien, ma_mon_hoc)` thì chỉ được xuất hiện duy nhất 1 lần.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nNgười dùng MỚI NHẤT tức là người có thời gian tạo `created_at` lớn nhất (gần hiện tại nhất).\nDo đó phải sắp xếp giảm dần `ORDER BY created_at DESC` và lấy 100 dòng đầu tiên bằng `LIMIT 100`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ mục lục sách):\nIndex trong database giống như Mục Lục ở cuối cuốn từ điển.\n• Cần đánh Index (thường là B-Tree Index) trên các cột thường xuyên xuất hiện trong mệnh đề `WHERE`, `JOIN`, `ORDER BY`.\n• BẪY TỐI KỴ: Không bao giờ bọc hàm xung quanh cột có Index, ví dụ viết `WHERE YEAR(created_at) = 2026` sẽ làm vô hiệu hóa hoàn toàn Index và khiến Database phải quét toàn bộ bảng (Full Table Scan)! Phải viết thành: `WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nVIEW là một **Bảng Ảo** được định nghĩa bằng một câu lệnh SELECT lưu trữ trong Database. Bản thân View không hề chứa dữ liệu riêng trên ổ cứng.\nMục đích sử dụng:\n1. Bảo mật: Ẩn bớt các cột nhạy cảm (như mật khẩu, lương) và chỉ cấp quyền cho user xem qua View.\n2. Đơn giản hóa: Gom câu query JOIN 5-6 bảng phức tạp thành 1 View gọn gàng để lập trình viên chỉ cần `SELECT * FROM view_doanh_thu`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTrong JDBC có 3 loại Statement:\n1. `Statement`: Dùng cho câu lệnh SQL tĩnh không có tham số (Rất nguy hiểm vì dễ bị nối chuỗi dính SQL Injection).\n2. `PreparedStatement`: Dùng cho câu lệnh có tham số `?`. Được biên dịch trước, chống 100% SQL Injection và chạy nhanh hơn.\n3. `CallableStatement`: Dùng riêng để gọi các **Stored Procedure** hoặc Function được viết sẵn trong cơ sở dữ liệu.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nNgoài chống SQL Injection, PreparedStatement vượt trội về hiệu năng nhờ cơ chế **Query Plan Caching**:\nMỗi khi nhận 1 câu SQL, CSDL phải tốn CPU làm 4 bước: Kiểm tra cú pháp -> Kiểm tra ngữ nghĩa -> Tối ưu hóa đường đi -> Biên dịch ra kế hoạch thực thi (Execution Plan).\nVới PreparedStatement, CSDL làm 4 bước này duy nhất 1 lần và lưu kế hoạch vào bộ nhớ Cache. Các lần gọi tiếp theo chỉ việc nạp tham số mới vào chạy ngay, giúp tiết kiệm tới 80% tải CPU cho Database Server khi chạy các vòng lặp thêm/sửa hàng loạt.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tủ quần áo ngăn nắp):\n• Sơ đồ ERD: Bản vẽ thiết kế kiến trúc các thực thể và mối quan hệ giữa chúng trước khi bắt tay vào tạo bảng.\n• Chuẩn hóa dữ liệu (1NF, 2NF, 3NF): Giống như việc bạn phân loại đồ đạc vào đúng ngăn tủ để:\n  1. Loại bỏ Dư thừa dữ liệu (không lưu trùng lặp 1 thông tin ở 10 nơi khác nhau).\n  2. Tránh Dị thường khi cập nhật (sửa địa chỉ khách hàng ở bảng này nhưng quên sửa ở bảng kia).\n  3. Bảo vệ Tính toàn vẹn dữ liệu.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCâu hỏi bẫy kinh điển số 1 trong các buổi phỏng vấn Java!\n• Java có cơ chế \"Integer Cache\": JVM tự động tạo sẵn một hồ chứa các đối tượng Integer có giá trị từ **-128 đến 127** (theo quy chuẩn Java Language Specification khi Autoboxing).\n• Với giá trị 100: Nằm trong vùng Cache [-128, 127], nên cả biến `a` và `b` cùng trỏ tới 1 ô nhớ đối tượng duy nhất -> So sánh tham chiếu địa chỉ `a == b` cho kết quả `true`.\n• Với giá trị 200: Vượt ra ngoài vùng Cache, JVM bắt buộc phải gọi `new Integer(200)` tạo ra 2 đối tượng độc lập nằm ở 2 ô nhớ khác nhau trên Heap -> So sánh tham chiếu `c == d` trả về `false`!\n\n💡 Mẹo phỏng vấn:\nĐể so sánh giá trị của các Wrapper Class (Integer, Long, Double...), LUÔN LUÔN dùng phương thức `.equals()` (`c.equals(d)` sẽ là `true`), tuyệt đối không dùng toán tử `==`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKhi bạn duyệt qua một ArrayList bằng vòng lặp `for-each` (hoặc `for` thông thường) và gọi trực tiếp `list.remove(item)`, Java sẽ lập tức quăng lỗi `ConcurrentModificationException`.\n\nTại sao?\nBên dưới, vòng lặp for-each sử dụng một đối tượng `Iterator`. Trong ArrayList có một biến đếm gọi là `modCount` (số lần thêm/sửa/xóa danh sách). Iterator giữ một bản sao gọi là `expectedModCount`.\nKhi bạn gọi `list.remove()`, biến `modCount` tăng lên nhưng `expectedModCount` trong Iterator không hề hay biết. Ở bước lặp tiếp theo, Iterator phát hiện `modCount != expectedModCount` -> Nó nghi ngờ danh sách đang bị một luồng khác chỉnh sửa đồng thời làm sai lệch dữ liệu -> Nó lập tức báo lỗi ngay (Cơ chế Fail-Fast).\n\n💻 Cách giải quyết chuẩn mực:\n1. Dùng `Iterator`: `Iterator<String> it = list.iterator(); while(it.hasNext()) { if(...) it.remove(); }`\n2. Dùng Java 8 Lambda (Ngắn gọn và xịn nhất): `list.removeIf(item -> item.equals(\"X\"));`",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ bàn làm việc và nhà kho):\n• Vùng nhớ STACK (Bàn làm việc cá nhân): Mỗi luồng (Thread) có 1 Stack riêng. Dùng để lưu trữ các lời gọi hàm (Stack Frame), các biến cục bộ kiểu nguyên thủy (`int`, `boolean`) và các con trỏ địa chỉ tham chiếu. Bộ nhớ Stack cực kỳ nhỏ nhưng tốc độ truy xuất siêu nhanh. Khi hàm chạy xong, Stack Frame tự động bị xóa sổ ngay lập tức.\n• Vùng nhớ HEAP (Kho hàng khổng lồ dùng chung): Nơi lưu trữ tất cả các ĐỐI TƯỢNG (Objects) thực tế và mảng trong Java (kể cả String, ArrayList hay User object). Khi không còn ai trỏ tới đối tượng trong Heap nữa, nó sẽ được dọn dẹp bởi Garbage Collector (GC).\n\n💡 Bẫy phỏng vấn (Hai loại lỗi tràn bộ nhớ):\n• `StackOverflowError`: Xảy ra khi gọi đệ quy vô tận không có điểm dừng làm đầy bộ nhớ Stack.\n• `OutOfMemoryError (OOM)`: Xảy ra khi tạo quá nhiều Object lớn trong Heap mà Garbage Collector dọn không kịp làm cạn kiệt RAM.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKết quả trả về chắc chắn bằng 2!\n\nTại sao?\nTrong cấu trúc `try-catch-finally`, quy tắc bất di bất dịch của Java là: **Khối finally LUÔN LUÔN được thực thi trước khi hàm thực sự trả quyền điều khiển về cho nơi gọi**.\nKhi gặp `return 1;` trong khối try, JVM đã chuẩn bị sẵn giá trị 1 để trả về. Nhưng trước khi thoát hàm, nó bắt buộc phải chạy qua khối `finally`. Tại đây nó gặp lệnh `return 2;` -> Lệnh return trong finally ghi đè hoàn toàn (override) giá trị trả về trước đó!\n\n💡 Cảnh báo thực tế:\nViết lệnh `return` trong khối `finally` là một \"Anti-pattern\" (viết code tối kỵ) vì nó sẽ nuốt chửng luôn cả các Exception văng ra từ khối try, khiến việc bắt lỗi trở nên bất khả thi. Các công cụ quét code như SonarQube sẽ cảnh báo đỏ lỗi này.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `Comparable` (Nội lực bên trong): Class tự implement interface này và viết hàm `compareTo(other)` để định nghĩa thứ tự sắp xếp MẶC ĐỊNH của chính nó (ví dụ: Học sinh thì mặc định sắp xếp theo Mã số ID tăng dần).\n• `Comparator` (Bên ngoài chấm điểm): Là một class hoặc biểu thức Lambda độc lập bên ngoài, viết hàm `compare(o1, o2)` để cung cấp CÁC TIÊU CHÍ SẮP XẾP KHÁC NHAU tùy theo nhu cầu (ví dụ: Lúc thì cần xếp theo Điểm thi giảm dần, lúc thì cần xếp theo Tên bảng chữ cái A-Z).\n\n💻 Ví dụ code Java 8 cực đẹp:\n```java\n// Dùng Comparator linh hoạt:\nstudents.sort(Comparator.comparing(Student::getGpa).reversed()\n                        .thenComparing(Student::getName));\n```\n\n💡 Mẹo phỏng vấn: Hãy nhớ thần chú: \"Comparable là 1 tiêu chí tự nhiên nằm BÊN TRONG class; Comparator là nhiều tiêu chí linh hoạt nằm BÊN NGOÀI class\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nPhương thức `static` trong Java KHÔNG THỂ BỊ OVERRIDE (Ghi đè) bởi lớp con!\n\nNếu lớp con khai báo 1 static method có tên và tham số y hệt lớp cha thì sao?\nĐó là hiện tượng **Method Hiding (Ẩn phương thức)** chứ tuyệt đối không phải Đa hình (Polymorphism/Overriding).\nBởi vì phương thức static thuộc về CLASS chứ không thuộc về INSTANCE (đối tượng). Trình biên dịch sẽ liên kết tĩnh (Static Binding / Compile-time) dựa vào KIỂU KHAI BÁO của biến tham chiếu chứ không quan tâm đối tượng thực tế lúc chạy là gì!\n\n💻 Ví dụ:\n`Parent p = new Child(); p.print();` -> Sẽ in ra hàm của `Parent` chứ không bao giờ gọi hàm của `Child`!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tìm đồ trong tủ đồ):\nHashSet hoạt động bằng cách băm đối tượng (`hashCode()`) để chọn ngăn tủ (Bucket) cất giữ.\nKhi bạn sửa đổi thuộc tính của đối tượng đã nằm trong tủ, mã `hashCode()` mới của nó sẽ bị thay đổi hoàn toàn.\nKhi bạn gọi `hashSet.contains(object)`, HashSet dùng hashCode mới để tìm kiếm -> Nó chạy đến SAI NGĂN TỦ -> Kết quả trả về `false` (không tìm thấy), mặc dù đối tượng đó vẫn đang nằm chình ình trong HashSet!\n\n💡 Hậu quả kinh hoàng & Mẹo phỏng vấn:\nĐối tượng này sẽ bị kẹt vĩnh viễn trong HashSet, bạn không thể xóa nó bằng `remove()` được nữa -> Gây rò rỉ bộ nhớ (MEMORY LEAK) nghiêm trọng!\nQuy tắc vàng: \"Chỉ sử dụng các thuộc tính Bất biến (Immutable fields như ID, final string) để tham gia tính toán hàm hashCode() và equals()\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Checked Exception (Ngoại lệ kiểm tra): Kế thừa từ `java.lang.Exception` (nhưng không kế thừa `RuntimeException`). Trình biên dịch BẮT BUỘC bạn phải xử lý ngay lúc viết code (bằng `try-catch` hoặc khai báo `throws` ở hàm). Thường là các lỗi khách quan do môi trường bên ngoài: Mất mạng, file không tồn tại (`FileNotFoundException`), lỗi database (`SQLException`).\n• Unchecked Exception (Ngoại lệ lúc chạy): Kế thừa từ `java.lang.RuntimeException`. Trình biên dịch KHÔNG BẮT BUỘC phải try-catch. Thường là lỗi ngớ ngẩn do lập trình viên viết ẩu: `NullPointerException` (quên kiểm tra null), `ArrayIndexOutOfBoundsException` (truy cập quá chỉ số mảng), `ArithmeticException` (chia cho 0).\n\n💡 Mẹo phỏng vấn: Trong các framework hiện đại như Spring Framework, hầu hết các exception đều được bọc lại thành Unchecked Exception (ví dụ `DataAccessException`) để tránh làm code bị rối rắm bởi hàng trăm khối try-catch không cần thiết.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ làm phẳng hộp bánh):\n• `map()`: Chuyển đổi tỉ lệ 1 - 1. Cứ 1 phần tử đầu vào biến thành 1 phần tử đầu ra.\n  Ví dụ: Danh sách tên thường `[\"nam\", \"an\"]` qua `map(String::toUpperCase)` -> `[\"NAM\", \"AN\"]`.\n• `flatMap()`: Chuyển đổi và \"LÀM PHẲNG\" (Flattening) tỉ lệ 1 - N. Nhận vào các danh sách lồng nhau (List of Lists) và gộp tất cả các phần tử con thành MỘT LUỒNG PHẲNG DUY NHẤT.\n\n💻 Ví dụ thực tế:\nMỗi lớp học có 1 danh sách học sinh: `List<ClassRoom>` (mỗi classroom có `List<Student>`).\nNếu dùng `classes.stream().map(ClassRoom::getStudents)` -> Bạn sẽ nhận được `Stream<List<Student>>` (luồng chứa các danh sách con).\nNếu dùng `classes.stream().flatMap(c -> c.getStudents().stream())` -> Bạn nhận được `Stream<Student>` (danh sách phẳng của toàn bộ học sinh trong trường)!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCơ chế Try-with-resources (ra đời từ Java 7) yêu cầu tài nguyên phải implement interface `java.lang.AutoCloseable` (hoặc `java.io.Closeable`).\n\nTại sao đây là tính năng tuyệt vời?\nTrước Java 7, mỗi lần mở kết nối JDBC hoặc đọc file, lập trình viên phải viết khối `finally` dài ngoằng để gọi `.close()`. Nếu trong finally lại bị văng lỗi thì lỗi gốc ban đầu trong khối try sẽ bị nuốt chửng!\nVới Try-with-resources:\n```java\ntry (Connection conn = dataSource.getConnection();\n     PreparedStatement ps = conn.prepareStatement(sql)) {\n  // Thực thi nghiệp vụ...\n} // Java TỰ ĐỘNG gọi close() đúng thứ tự ngược lại, kể cả khi có Exception văng ra!\n```",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ giấy nháp):\n• String (Bất biến - Immutable): Giống như viết chữ bằng bút mực không thể tẩy xóa. Mỗi lần bạn nối chuỗi `s = s + \"a\"`, Java không hề sửa chuỗi cũ mà âm thầm tạo ra một Đối Tượng Mới trên Heap. Nếu nối chuỗi trong vòng lặp 10.000 lần, Java sẽ tạo ra 10.000 đối tượng rác làm tràn RAM!\n• StringBuilder (Khả biến - Mutable): Giống như bảng phấn xóa được. Nó sửa trực tiếp trên mảng ký tự nội bộ `char[]` nên tốc độ nối chuỗi nhanh gấp hàng trăm lần String. Dành cho môi trường Đơn luồng (Single-thread).\n• StringBuffer: Giống hệt StringBuilder nhưng có thêm từ khóa `synchronized` trên các method để an toàn trong môi trường Đa luồng (Thread-safe). Tuy nhiên do phải khóa luồng (Locking) nên tốc độ chạy chậm hơn StringBuilder.\n\n💡 Mẹo phỏng vấn: 99% trường hợp nối chuỗi trong hàm chỉ chạy đơn luồng, hãy luôn dùng `StringBuilder` để đạt tốc độ tối đa!",
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
      "explanation": "🎯 Bản chất dễ hiểu (4 trụ cột OOP):\n1. Đóng gói (Encapsulation): Che giấu dữ liệu nhạy cảm bên trong bằng `private`, chỉ cho bên ngoài truy cập thông qua các hàm `getter/setter` có kiểm tra hợp lệ. (Ví dụ: Số dư tài khoản không cho gán trực tiếp `soDu = -500`, phải qua hàm `rutTien()` kiểm tra xem có đủ tiền không).\n2. Kế thừa (Inheritance): Lớp con tái sử dụng và mở rộng thuộc tính, phương thức của lớp cha qua từ khóa `extends`, tránh viết lại code trùng lặp. (Ví dụ: Class `Dog` kế thừa từ class `Animal`).\n3. Đa hình (Polymorphism): Cùng một hành vi nhưng thể hiện khác nhau ở từng đối tượng. (Ví dụ: Cùng gọi hàm `keu()`, nhưng Chó thì sủa \"Gâu gâu\", Mèo thì kêu \"Meo meo\").\n4. Trừu tượng (Abstraction): Tập trung vào việc đối tượng \"LÀM ĐƯỢC GÌ\" thay vì chi tiết nó \"LÀM NHƯ THẾ NÀO\". (Ví dụ: Bạn lái ô tô chỉ cần đạp chân ga là xe chạy, không cần biết bugi đánh lửa phun xăng bên trong động cơ ra sao).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Đa hình lúc biên dịch (Compile-time / Đa hình tĩnh): Thể hiện qua **Method Overloading (Nạp chồng)**. Trong cùng 1 class có nhiều hàm cùng tên nhưng khác nhau về số lượng hoặc kiểu tham số. Trình biên dịch nhìn vào tham số lúc viết code là biết ngay hàm nào được gọi.\n• Đa hình lúc thực thi (Runtime / Đa hình động): Thể hiện qua **Method Overriding (Ghi đè)**. Lớp con viết lại method của lớp cha. Lúc viết code ta dùng biến cha trỏ vào con `Animal a = new Dog(); a.makeSound();`. Lúc biên dịch chỉ biết đó là Animal, phải đợi đến lúc chạy (Runtime), JVM mới nhìn vào vùng nhớ thực tế thấy đó là con Chó và gọi hàm sủa của Dog (cơ chế Dynamic Method Dispatch).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nSắp xếp phạm vi từ hẹp nhất đến rộng nhất:\n1. `private`: Ích kỷ nhất, chỉ duy nhất bên trong chính Class đó mới nhìn thấy.\n2. `default` (không ghi gì - package-private): Chỉ các Class nằm trong CÙNG MỘT PACKAGE mới nhìn thấy nhau.\n3. `protected`: Nằm trong cùng Package + Bất kỳ LỚP CON (Subclass) nào kế thừa nó kể cả nằm ở package khác.\n4. `public`: Hào phóng nhất, ai ở bất kỳ đâu trong toàn bộ project cũng gọi được.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTừ khóa `final` mang ý nghĩa là \"BẤT BIẾN / CHỐT CHẶN CUỐI CÙNG\":\n• `final variable`: Biến trở thành hằng số, chỉ được gán giá trị 1 lần duy nhất, không thể thay đổi giá trị (như số PI = 3.14).\n• `final method`: Lớp con không được phép Ghi đè (Override) phương thức này (để bảo vệ logic cốt lõi không bị lớp con sửa đổi làm sai lệch).\n• `final class`: Tuyệt đối không cho phép class nào khác Kế thừa (Inherit) nó.\n\n💡 Ví dụ đắt giá: Class `java.lang.String` là một `final class`! Java cố tình làm điều này để không ai có thể tạo ra một lớp con giả mạo String nhằm mục đích tấn công bảo mật hay phá vỡ String Pool.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKhi khởi tạo một đối tượng lớp con, nền móng của lớp cha bắt buộc phải được dựng lên TRƯỚC. Do đó, lệnh gọi `super()` (gọi constructor của cha) **bắt buộc phải là dòng code đầu tiên** trong Constructor của lớp con.\nNếu bạn để bất kỳ dòng lệnh nào khác lên trước `super()`, trình biên dịch Java sẽ báo lỗi ngay lập tức.\nNếu bạn không tự tay viết `super()`, trình biên dịch sẽ tự động chèn ngầm `super();` không tham số vào dòng đầu tiên cho bạn.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ hồ nước chung):\nString Pool là một vùng nhớ đặc biệt trong Heap do JVM quản lý để tiết kiệm bộ nhớ:\n• Khi bạn khai báo chuỗi dạng Literal: `String s1 = \"Java\"; String s2 = \"Java\";` -> JVM kiểm tra thấy \"Java\" đã có sẵn trong Pool, nó cho `s2` trỏ chung vào ô nhớ của `s1`. Do đó `s1 == s2` cho kết quả `true` (vì so sánh 2 địa chỉ ô nhớ giống nhau).\n• Nhưng khi bạn dùng từ khóa `new`: `String s3 = new String(\"Java\");` -> JVM bị ép buộc phải cấp phát một ô nhớ Object HOÀN TOÀN MỚI nằm ngoài Pool. Khi đó `s1 == s3` sẽ trả về `false`!\n\n💡 Quy tắc sống còn: Trong Java, 100% trường hợp so sánh chuỗi hãy dùng phương thức `s1.equals(s3)` (so sánh nội dung ký tự), không bao giờ dùng toán tử `==`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nJAVA LÀ 100% PASS-BY-VALUE (Truyền giá trị)! Java không hề có con trỏ tham chiếu như C++.\n\nNhiều người hay nhầm vì thấy sửa object trong hàm thì ở ngoài bị đổi theo. Hãy phân biệt rõ:\n• Khi truyền biến nguyên thủy (`int x = 10`): Java sao chép nguyên giá trị 10 vào hàm. Hàm có đổi `x = 20` thì ở ngoài x vẫn là 10.\n• Khi truyền Object (`Person p = new Person(\"Nam\")`): Java sao chép BẢN SAO CỦA ĐỊA CHỈ Ô NHỚ (Pointer value).\n  - Nếu bạn dùng bản sao địa chỉ đó để sửa thuộc tính: `p.setName(\"Bình\")` -> Tên bị đổi vì cùng trỏ vào 1 ngôi nhà trên Heap.\n  - Nhưng nếu bạn gán `p = new Person(\"Khác\")` bên trong hàm -> Đối tượng `p` ở bên ngoài hoàn toàn KHÔNG HỀ BỊ THAY ĐỔI, vì bạn chỉ vừa trỏ bản sao sang một ngôi nhà mới!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `List` (ArrayList, LinkedList): Giống như hàng người xếp hàng mua vé. Có thứ tự trước sau (Index 0, 1, 2...) và CHO PHÉP người trùng tên đứng lặp lại.\n• `Set` (HashSet, TreeSet): Giống như một túi đựng bóng độc nhất. KHÔNG CHO PHÉP phần tử trùng lặp (nếu thêm phần tử đã có rồi thì nó bỏ qua). Không đảm bảo thứ tự chèn (với HashSet).\n• `Map` (HashMap, TreeMap): Giống như cuốn Sổ danh bạ điện thoại lưu theo cặp **Key - Value** (Tên người - Số điện thoại). Các Key là duy nhất không được trùng nhau (nếu put trùng key sẽ ghi đè giá trị cũ).",
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
      "explanation": "🎯 Bản chất dễ hiểu (Cây tầm gửi và rễ cây):\nGarbage Collector (GC) trong JVM không đếm thời gian sống của đối tượng, mà dùng thuật toán **Truy vết khả năng tiếp cận (Reachability Analysis)** bắt đầu từ các GC Roots.\nGC Roots là những rễ cây vững chắc đang còn hoạt động: biến cục bộ trong Stack của luồng đang chạy, biến static của class, các luồng (Thread) đang active.\n• Nếu từ GC Roots có đường dây tham chiếu nối tới đối tượng -> Đối tượng còn sống.\n• Nếu đối tượng bị đứt toàn bộ liên lạc (Unreachable), trôi nổi vô thừa nhận trong Heap -> Nó bị coi là Rác và sẽ bị GC gom tiêu hủy giải phóng RAM.\n\n💡 Mẹo phỏng vấn: Lệnh `System.gc()` chỉ là lời \"thỉnh cầu\" JVM hãy dọn rác, còn việc JVM có dọn rác ngay hay không là do JVM tự quyết định, ta không thể ép buộc!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Spring Framework thuần giống như bạn đi mua linh kiện máy tính rời: Bạn phải tự mua CPU, RAM, nguồn, tự viết hàng trăm dòng cấu hình XML rườm rà, tự cài đặt web server Tomcat bên ngoài rồi deploy file `.war` lên rất cực khổ.\n• Spring Boot giống như chiếc máy tính xách tay Laptop đóng gói sẵn:\n  1. Auto-configuration: Tự động đoán và cấu hình những thứ phổ biến (thấy có MySQL driver là tự cấu hình DataSource).\n  2. Starter Dependencies: Chỉ cần khai báo 1 dòng `spring-boot-starter-web` là tự kéo đủ thư viện cần thiết.\n  3. Embedded Tomcat: Web server được nhúng thẳng vào file `.jar`, chỉ cần chạy `java -jar app.jar` là web hoạt động ngay lập tức!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nVòng đời của một Spring Bean trải qua các giai đoạn chính:\n1. Khởi tạo (Instantiation): Gọi Constructor để tạo object trong RAM.\n2. Tiêm phụ thuộc (Populate Properties): Inject các dependency qua `@Autowired`.\n3. Gọi các Aware Interfaces: Nếu bean cần biết về môi trường (như `BeanNameAware`, `ApplicationContextAware`).\n4. Tiền khởi tạo & Khởi tạo: Chạy các hàm gắn annotation `@PostConstruct` hoặc phương thức `afterPropertiesSet()`.\n5. Sẵn sàng phục vụ (Ready for use): Bean nằm trong Container phục vụ ứng dụng.\n6. Hủy bỏ (Destruction): Khi ứng dụng tắt, gọi các hàm dọn dẹp `@PreDestroy` để đóng file, đóng kết nối database.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCó 3 cách thực hiện Dependency Injection (DI):\n1. Field Injection: Gắn `@Autowired` trực tiếp lên thuộc tính (Tiện nhưng nguy hiểm, khó viết Unit Test).\n2. Setter Injection: Dùng hàm `setXyz()` (Dành cho các phụ thuộc không bắt buộc).\n3. **Constructor Injection (Được Spring Team khuyến nghị 100%)**: Truyền dependency qua hàm khởi tạo Constructor.\n\nTại sao Constructor Injection là số 1?\n• Cho phép khai báo biến là `final` -> Đảm bảo tính bất biến (Immutable), tránh bị đổi lén.\n• Rất dễ viết Unit Test với Mockito: Chỉ cần `new UserService(mockRepo)` mà không cần bật cả Spring IoC container nặng nề.\n• Phát hiện lỗi phụ thuộc vòng tròn (Circular Dependency) ngay lúc khởi động ứng dụng.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Hành trình của 1 Request):\nKhi người dùng gửi request `GET /api/users`:\n1. `DispatcherServlet` (Chàng lễ tân trung tâm): Nhận toàn bộ request đến đầu tiên.\n2. `HandlerMapping`: Lễ tân tra danh bạ xem URL này thuộc về Controller nào xử lý.\n3. `Controller`: Tiếp nhận request, đọc tham số và gọi xuống tầng nghiệp vụ.\n4. `Service`: Xử lý logic tính toán, kiểm tra quyền hạn, quản lý giao dịch (@Transactional).\n5. `Repository / DAO`: Tương tác với Database bằng Hibernate/JPA.\n6. Dữ liệu quay ngược trở lại Controller và được serialize thành JSON trả về cho Client.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐể tránh việc ở mỗi Controller đều phải viết lặp đi lặp lại hàng trăm khối `try-catch`, Spring Boot cung cấp giải pháp xử lý ngoại lệ tập trung (Global Exception Handling) bằng cách kết hợp:\n• `@RestControllerAdvice` (hoặc `@ControllerAdvice`): Đánh dấu class là bộ lọc bắt lỗi toàn cục cho tất cả các Controller trong dự án.\n• `@ExceptionHandler(UserNotFoundException.class)`: Đặt trên từng method để bắt đúng loại lỗi cụ thể và trả về định dạng JSON lỗi chuẩn hóa thống nhất (gồm: timestamp, status code, error message).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCORS (Cross-Origin Resource Sharing) là một cơ chế BẢO MẬT CỦA TRÌNH DUYỆT.\nKhi frontend chạy ở `http://localhost:3000` gọi API sang backend ở `http://localhost:8080` (khác Port hoặc khác Domain), trình duyệt sẽ chặn đứng lại vì nghi ngờ trang web lạ đang lén gọi trộm API của bạn!\n\nCách xử lý chuẩn trong Spring Boot:\n1. Cấp Controller: Dùng `@CrossOrigin(origins = \"http://localhost:3000\")`.\n2. Cấp toàn cục (Khuyên dùng): Cấu hình bean `WebMvcConfigurer` và ghi đè hàm `addCorsMappings` để cho phép domain frontend, các HTTP method (GET, POST, PUT, DELETE) và headers cần thiết.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `singleton` (Scope mặc định): Spring IoC Container chỉ tạo DUY NHẤT 1 instance của Bean và chia sẻ cho toàn bộ ứng dụng dùng chung. Cực kỳ tiết kiệm RAM, nhưng Bean bắt buộc phải thiết kế dạng **Stateless** (không lưu trạng thái riêng của người dùng để tránh xung đột đa luồng).\n• `prototype`: Mỗi khi có ai đó yêu cầu inject (@Autowired) hoặc gọi `getBean()`, Spring sẽ TẠO RA MỘT INSTANCE HOÀN TOÀN MỚI. Phù hợp cho các đối tượng cần lưu trạng thái tạm thời (Stateful).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `@Controller`: Dành cho ứng dụng web truyền thống (Server-Side Rendering). Giá trị trả về của hàm là một chuỗi Tên View (ví dụ return `\"home\"` -> ViewResolver sẽ đi tìm file `home.html` hoặc `home.jsp` để hiển thị).\n• `@RestController`: Dành cho RESTful API. Thực chất nó là viết tắt của:\n`@RestController = @Controller + @ResponseBody`\nMọi dữ liệu trả về từ hàm (như User object, List) sẽ được thư viện Jackson tự động chuyển đổi thành chuỗi JSON/XML nằm trong HTTP Response Body trả thẳng về cho frontend/mobile app.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `@Component`: Là annotation \"cha\" tổng quát, đánh dấu bất kỳ class nào là 1 Spring Bean để Spring tự động quét và quản lý (Component Scanning).\n• `@Service`: Chuyên biệt hóa của @Component ở tầng Nghiệp vụ (Business logic).\n• `@Repository`: Chuyên biệt hóa ở tầng Dữ liệu (DAO/Database). Nó có tính năng đặc biệt: Tự động bắt các lỗi SQL của database và dịch sang ngoại lệ `DataAccessException` của Spring.\n• `@Bean`: Dùng ở cấp độ METHOD bên trong class cấu hình `@Configuration`. Dùng khi bạn muốn khởi tạo bean từ thư viện của bên thứ 3 mà bạn không thể sửa code để gắn @Component lên đầu class của họ.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nSpring Boot dùng thư viện `spring-boot-starter-validation` (chuẩn Hibernate Validator):\n• Khai báo ràng buộc trên DTO: `@NotNull` (không null), `@NotBlank` (chuỗi không rỗng và không toàn khoảng trắng), `@Size(min=6, max=20)`, `@Email`.\n• `@Valid`: Là chuẩn tiêu chuẩn của Java/Jakarta Bean Validation (JSR-380).\n• `@Validated`: Là annotation do Spring cung cấp, mở rộng thêm tính năng **Validation Groups** (ví dụ: Lúc Tạo mới thì ID được null, nhưng lúc Cập nhật thì ID bắt buộc phải có).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• JPA (Java Persistence API): Là cuốn HỢP ĐỒNG / BỘ ĐẶC TẢ tiêu chuẩn (chỉ gồm các interface, không có code thực thi).\n• Hibernate: Là NGƯỜI THỰC THI hợp đồng đó (thư viện ORM cụ thể làm việc kết nối database).\n• Spring Data JPA: Là bộ khung tiện ích tầng trên giúp bạn không phải viết code Hibernate dài dòng, tự động sinh ra các câu query thông qua các Interface Repository.\n• `JpaRepository` kế thừa từ `PagingAndSortingRepository` và `CrudRepository`. Nó tiện hơn vì các hàm như `findAll()` trả về sẵn `List<T>` (thay vì `Iterable<T>`) và có thêm các hàm xịn như `flush()`, `saveAndFlush()`, `deleteInBatch()`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCó 4 cách chính để viết query trong Spring Data JPA:\n1. Query Method (Derived Query): Spring tự sinh SQL từ tên hàm: `findByEmailAndStatus(String email, int status)`. Rất nhanh và tiện cho các câu query đơn giản.\n2. `@Query` với JPQL: Viết câu truy vấn dựa trên Tên Entity và Thuộc tính Java: `@Query(\"SELECT u FROM User u WHERE u.age > :age\")` (Độc lập với hệ quản trị CSDL).\n3. `@Query(nativeQuery = true)`: Viết câu lệnh SQL thuần của MySQL/Postgres khi cần dùng các hàm đặc thù của CSDL.\n4. Specifications / Criteria API: Dùng code Java để xây dựng câu truy vấn động khi form tìm kiếm có quá nhiều bộ lọc tùy chọn.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ hồ bơi kết nối):\nKhởi tạo một kết nối TCP và bắt tay xác thực với Database Server tốn hàng trăm mili-giây. Nếu mỗi request của user đều mở kết nối mới rồi đóng lại thì Database sẽ chết ngắc vì kiệt quệ tài nguyên!\nConnection Pool (như HikariCP) duy trì sẵn một đàn kết nối mở sẵn (ví dụ 10-20 kết nối). Khi Service cần truy vấn, nó chạy ra \"mượn\" 1 kết nối có sẵn, chạy xong thì \"trả lại\" cho hồ bơi.\nHikariCP là thư viện Connection Pool mặc định của Spring Boot vì nó được tối ưu mã bytecode siêu nhỏ, tiêu thụ ít CPU và đạt tốc độ mượn trả kết nối nhanh nhất thế giới hiện nay!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ bản vẽ nháp):\nHãy tưởng tượng bạn muốn sửa một ngôi nhà 10 tầng.\n• Real DOM giống như bạn mang búa đập tường gạch xây lại ngay lập tức: cực kỳ tốn công sức, bụi bặm và làm rung lắc cả tòa nhà (trình duyệt phải tính toán lại Layout và vẽ lại Pixel - Reflow & Repaint).\n• Virtual DOM giống như bạn lấy bút chì sửa trên một bản vẽ nháp 3D trong máy tính (RAM). Bạn có thể tẩy xóa, thay đổi 100 lần trên bản vẽ siêu nhanh. Sau khi chốt phương án cuối cùng, bạn so sánh bản vẽ mới với bản vẽ cũ (thuật toán Diffing) và chỉ cho thợ đến sửa đúng 1 viên gạch bị hỏng (Reconciliation & Batching).\n\n💻 Ví dụ thực tế:\nTrong danh sách 1.000 sản phẩm Shopee, khi người dùng bấm nút \"Thích\" ở sản phẩm số 500:\nNhờ Virtual DOM, React chỉ tìm ra đúng icon trái tim đổi từ màu xám sang đỏ và cập nhật đúng 1 thẻ <i> đó trên màn hình, 999 sản phẩm còn lại hoàn toàn không bị vẽ lại!\n\n💡 Mẹo phỏng vấn & Ghi điểm:\nNhớ 2 từ khóa kỹ thuật đắt giá: \"Diffing Algorithm\" (so sánh 2 cây ảo với độ phức tạp O(n)) và \"Batching\" (gộp nhiều thay đổi state liên tiếp để render 1 lần duy nhất). Tránh nói \"Virtual DOM luôn nhanh hơn DOM thật\" mà hãy nói \"Virtual DOM giúp tối ưu số lần chạm vào Real DOM\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKHÔNG! Virtual DOM không phải là phép thuật và KHÔNG LUÔN LUÔN nhanh hơn Real DOM thật trong mọi tình huống.\n\nTại sao?\nBản thân việc tạo ra các JavaScript Object để làm Virtual DOM trên RAM và chạy thuật toán so sánh Diffing giữa 2 cây cũng tốn CPU và bộ nhớ.\n• Với trang web đơn giản: Chỉ có 1 nút bấm đổi màu chữ, việc viết JavaScript thuần `document.getElementById('btn').style.color = 'red'` chạy thẳng vào Real DOM trong 0.001 mili-giây, nhanh hơn React rất nhiều (vì React phải qua 5-6 bước tạo VDOM, so sánh rồi mới đụng vào Real DOM).\n\n💻 Ví dụ thực tế:\nCác framework hiện đại như Svelte không hề dùng Virtual DOM. Svelte biên dịch code ngay lúc build time thành các lệnh thao tác trực tiếp vào Real DOM nên chạy nhanh và nhẹ hơn React trong các bài test hiệu năng đơn giản.\n\n💡 Mẹo phỏng vấn (Bẫy nhà tuyển dụng hay gài):\nNgười phỏng vấn hỏi câu này để xem bạn có \"thần thánh hóa\" React hay không.\nHãy trả lời: \"Lợi thế lớn nhất của Virtual DOM không phải là đánh bại Real DOM ở các thao tác đơn lẻ, mà là mang lại trải nghiệm lập trình Khai báo (Declarative UI - UI = f(state)) và đảm bảo hiệu năng 'ĐỦ TỐT' (predictable performance) cho các ứng dụng quy mô khổng lồ hàng nghìn component phức tạp\". Trả lời như vậy bạn sẽ đạt điểm tuyệt đối!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ đời sống):\n• Props (Properties) giống như \"Họ tên hoặc Gen di truyền do bố mẹ đặt cho bạn\": Do component cha truyền xuống cho component con. Component con chỉ được phép đọc (Read-only / Immutable), tuyệt đối KHÔNG ĐƯỢC tự ý sửa đổi props của chính mình.\n• State giống như \"Tâm trạng hoặc Tiền trong ví của chính bạn\": Do chính component đó tự khai báo, tự quản lý và có thể thay đổi bất cứ lúc nào qua hàm setter (như `setCount`). Khi state thay đổi, component sẽ tự động re-render để cập nhật giao diện mới.\n\n💻 Ví dụ code thực tế:\n```jsx\n// Component Cha:\n<UserProfile username=\"trung_admin\" /> // \"trung_admin\" là PROPS truyền xuống\n\n// Component Con (UserProfile):\nfunction UserProfile({ username }) {\n  // username là read-only, không được gán username = \"khac\"\n  const [isOnline, setIsOnline] = useState(true); // isOnline là STATE nội tại\n  return <div>{username} - {isOnline ? \"🟢 Đang online\" : \"⚪ Vắng mặt\"}</div>;\n}\n```\n\n💡 Mẹo phỏng vấn & Câu hỏi mở rộng:\n\"Nếu component con muốn thay đổi dữ liệu của component cha thì làm thế nào?\"\n-> Trả lời: Áp dụng kỹ thuật \"Lifting State Up\" (Nâng state lên cha). Component cha truyền 1 hàm callback xuống làm props cho con, khi con cần đổi dữ liệu sẽ gọi hàm callback đó để cha tự update state của mình.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `useState`: Chuyên lo phần \"Dữ liệu hiển thị\" trên màn hình. Cứ mỗi lần state đổi giá trị -> React tự động vẽ lại (re-render) component.\n• `useEffect`: Chuyên lo các công việc \"Hậu trường / Tác vụ phụ\" (Side Effects) diễn ra SAU KHI giao diện đã được vẽ xong lên màn hình: gọi API backend lấy dữ liệu, lắng nghe sự kiện cuộn trang, hẹn giờ `setInterval`, hoặc đổi tiêu đề trang web `document.title`.\n\n💻 Ví dụ thực tế (Trang bảng tin):\n```jsx\nfunction NewsFeed() {\n  const [posts, setPosts] = useState([]); // 1. State lưu bài viết\n\n  useEffect(() => {\n    // 2. Chạy sau khi giao diện hiện lên: Gọi API lấy bài viết từ server\n    fetch('/api/posts')\n      .then(res => res.json())\n      .then(data => setPosts(data));\n  }, []); // 3. [] rỗng nghĩa là chỉ chạy 1 lần duy nhất khi vừa vào trang\n}\n```\n\n💡 Bẫy phỏng vấn kinh điển (Infinite Loop):\nNếu bạn gọi `setPosts()` bên trong `useEffect` mà KHÔNG CÓ mảng dependencies `[]`, component sẽ re-render liên tục vô tận (State đổi -> Render -> Chạy useEffect -> State lại đổi -> Lại render...) làm treo đơ trình duyệt của người dùng!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tủ lạnh):\n• `useMemo`: Ghi nhớ \"KẾT QUẢ của món ăn\" (đã nấu xong rồi cất vào tủ lạnh, lần sau đói lấy ra ăn ngay chứ không nấu lại từ đầu).\n• `useCallback`: Ghi nhớ \"CÔNG THỨC / ĐỊNH NGHĨA HÀM\" (giữ nguyên con trỏ hàm ở vùng nhớ cũ, không đẻ ra con trỏ hàm mới mỗi lần re-render).\n\n💻 Ví dụ thực tế:\n```jsx\n// useMemo: items có 50.000 sản phẩm, chỉ tính tổng lại khi mảng items thay đổi\nconst totalPrice = useMemo(() => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}, [items]);\n\n// useCallback: Giữ nguyên hàm handleDelete để truyền xuống component con <ProductItem />\n// Giúp ProductItem (được bọc React.memo) không bị re-render oan uổng\nconst handleDelete = useCallback((id) => {\n  setItems(prev => prev.filter(x => x.id !== id));\n}, []);\n```\n\n💡 Mẹo phỏng vấn:\n\"Có nên bọc useMemo và useCallback cho TẤT CẢ biến và hàm trong dự án không?\"\n-> Trả lời: TUYỆT ĐỐI KHÔNG! Bản thân việc gọi hook và duy trì mảng dependencies cũng tiêu tốn bộ nhớ RAM và CPU. Chỉ dùng khi phép tính thực sự nặng (xử lý hàng nghìn phần tử) hoặc khi truyền hàm xuống component con nặng có áp dụng `React.memo`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ gọi món nhà hàng):\n• CSR (Client-Side Rendering): Nhà hàng phát cho bạn nguyên liệu tươi mang về nhà tự nấu (Server chỉ gửi file HTML rỗng + file JS to, trình duyệt của bạn tự chạy JS để vẽ UI). Lần đầu mở web sẽ hơi chậm, nhưng khi đã tải xong thì chuyển trang mượt như bơ.\n• SSR (Server-Side Rendering): Khách gọi món nào, đầu bếp trong bếp nấu ngay lập tức trên chảo nóng món đó rồi bưng ra (Server render HTML tươi mới theo từng request của user). Dữ liệu luôn mới nhất, nhưng máy chủ phải hoạt động nhiều.\n• SSG (Static Site Generation): Đóng hộp sẵn 100 phần ăn từ 4h sáng (Build time). Khách đến là bốc phát ngay trong 0.01 giây qua CDN. Cực nhanh, siêu tiết kiệm server, nhưng không đổi được thực đơn trong ngày.\n• ISR (Incremental Static Regeneration): Vừa muốn nhanh như đồ hộp đóng sẵn (SSG), vừa muốn tự động cập nhật món mới mà không phải đóng cửa quán để nấu lại từ đầu (tự revalidate sau mỗi X giây ở chế độ nền).\n\n💡 Mẹo phỏng vấn: Khi nào dùng cái nào?\n• Trang tin tức, Landing Page, Blog, Tài liệu -> Chọn SSG.\n• Trang thương mại điện tử có hàng triệu sản phẩm -> Chọn ISR (revalidate: 60s).\n• Trang Dashboard cá nhân hóa tài khoản ngân hàng -> Chọn SSR hoặc CSR.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTrong Next.js App Router (từ phiên bản 13 trở lên), mặc định 100% component đều là React Server Components (RSC). Tức là code chỉ chạy trên máy chủ server, gửi về trình duyệt mã HTML siêu nhẹ và KHÔNG KÈM MÃ JAVASCRIPT nào.\nNhưng máy chủ thì làm sao biết người dùng bấm chuột vào đâu? Máy chủ cũng không có `localStorage` hay bàn phím!\nDo đó, chỉ thị `\"use client\";` đặt ở dòng 1 là chiếc cầu nối báo cho Next.js biết: \"Từ đây trở đi, hãy đóng gói JavaScript gửi xuống cho trình duyệt để người dùng có thể tương tác!\".\n\n💻 Khi nào BẮT BUỘC dùng `\"use client\"`:\n1. Dùng React Hooks: `useState`, `useEffect`, `useRef`, `useContext`.\n2. Dùng Event Listeners: `onClick`, `onChange`, `onSubmit`.\n3. Dùng API trình duyệt: `window`, `document`, `localStorage`, `navigator`.\n\n💡 Mẹo phỏng vấn:\nĐừng bao giờ bọc `\"use client\"` ở trang ngoài cùng (Page cha). Hãy đẩy nó xuống các component lá nhỏ nhất có thể (ví dụ chỉ bọc riêng cho nút bấm `<AddToCartButton />`) để giữ cho phần lớn trang web vẫn là Server Component giúp web đạt điểm tốc độ cao nhất.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nBot tìm kiếm của Google (Googlebot) hay crawler khi share link lên Facebook/Zalo hoạt động như một người đọc báo siêu lười.\n• Với React CSR truyền thống: Khi bot ghé thăm, nó chỉ nhìn thấy file HTML vỏn vẹn đúng 1 dòng: `<div id=\"root\"></div>`. Bot không rảnh chờ 3 giây để tải file JavaScript về chạy -> Bot kết luận trang web này trống rỗng -> Rớt hạng SEO thảm hại!\n• Với Next.js SSR / SSG: Máy chủ trả về ngay lập tức mã HTML hoàn chỉnh có sẵn tiêu đề `<h1>`, nội dung bài viết và thẻ `<meta property=\"og:title\">`. Bot đọc được nội dung trong 0.1 giây -> Lập chỉ mục (Index) ngay lập tức và hiển thị ảnh thumbnail cực đẹp khi chia sẻ link!\n\n💡 Mẹo phỏng vấn:\nNhắc thêm chỉ số Core Web Vitals của Google: FCP (First Contentful Paint) và LCP (Largest Contentful Paint) - thời gian hiển thị nội dung chính đầu tiên trên màn hình. SSR/SSG giúp điểm LCP xanh mướt (dưới 1.5 giây).",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ ngôi nhà):\n• `v-if`: Giống như việc bạn \"Đập bỏ hoàn toàn ngôi nhà\" khi không dùng đến, và khi cần thì \"Xây lại từ móng\" (phần tử bị xóa hoàn toàn khỏi cây DOM, hủy hết state và event listener).\n• `v-show`: Giống như bạn vẫn giữ nguyên ngôi nhà đó, chỉ \"Kéo rèm che lại\" (phần tử vẫn luôn nằm trong cây DOM, chỉ gắn thêm thuộc tính CSS `display: none`).\n\n💻 Khi nào dùng cái nào?\n• Dùng `v-show`: Khi thành phần đó bị bật/tắt liên tục hàng chục lần (ví dụ: Popup Modal, Menu Dropdown, Tab chuyển đổi, Tooltip). Vì chi phí chuyển đổi (Toggle cost) gần như bằng 0.\n• Dùng `v-if`: Khi điều kiện ít khi thay đổi (ví dụ: Khu vực dành riêng cho Admin - nếu user không phải admin thì không cần tạo sẵn trong DOM làm tốn RAM).\n\n💡 Mẹo phỏng vấn: Trong React, cú pháp tương đương `v-if` là `{isOpen && <Modal />}` (render có điều kiện), còn tương đương `v-show` là `<Modal style={{ display: isOpen ? 'block' : 'none' }} />`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ vé xe & bãi giữ xe):\n• Cookie: Giống như \"Vé xem phim giấy bạn tự cầm trong ví\" (lưu ở Client trình duyệt). Lần sau vào rạp bạn giơ vé ra. Nhược điểm: Dễ bị người khác móc túi hoặc sửa vé (xâm nhập bằng JavaScript XSS) nếu không cài cờ bảo vệ.\n• Session: Giống như \"Chiếc xe máy bạn gửi trong bãi đỗ xe an toàn của siêu thị\" (toàn bộ dữ liệu mật lưu ở Server). Bạn chỉ cầm duy nhất một mảnh vé nhựa có ghi mã số `Session ID = ABC123`. Khi bạn giơ thẻ ra, bảo vệ tự vào kho lấy xe ra cho bạn.\n\n💻 Thông số kỹ thuật cần nhớ:\n• Cookie lưu tối đa khoảng 4KB, tự động đính kèm vào mọi HTTP Request gửi lên server. Cần gắn cờ `HttpOnly` (chống JS đọc trộm) và `Secure` (chỉ gửi qua HTTPS).\n• Session lưu trên RAM server, database hoặc Redis (chuẩn nhất cho hệ thống phân tán nhiều server).\n\n💡 Mẹo phỏng vấn: Khi người phỏng vấn hỏi \"Làm sao duy trì đăng nhập giữa các microservices?\", hãy trả lời dùng JWT (JSON Web Token) lưu ở HttpOnly Cookie hoặc Session tập trung trên Redis Cache!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• GET: Dùng để LẤY dữ liệu (chỉ đọc, tham số nằm lộ trên URL `?page=1&limit=10`, trình duyệt tự động cache lại).\n• POST: Dùng để TẠO MỚI dữ liệu (dữ liệu giấu trong Request Body, an toàn và dung lượng không giới hạn).\n• PUT: Dùng để CẬP NHẬT THAY THẾ TOÀN BỘ một bản ghi đã tồn tại.\n\n💡 Khái niệm \"Idempotent\" (Ăn điểm tuyệt đối):\nNhà tuyển dụng rất thích hỏi từ này!\n• Idempotent nghĩa là: Bạn bấm gọi 1 lần hay bấm F5 gọi 100 lần liên tiếp thì trạng thái hệ thống vẫn y như vậy.\n  - `GET`, `PUT`, `DELETE` là Idempotent (sửa đè 100 lần thì bản ghi vẫn mang giá trị đó, xóa 100 lần thì bản ghi vẫn đã biến mất).\n  - `POST` KHÔNG PHẢI Idempotent (bạn bấm submit 5 lần sẽ tạo ra 5 đơn hàng khác nhau và trừ tiền 5 lần trong tài khoản!).\n\n💡 Mẹo mở rộng: Muốn cập nhật MỘT PHẦN thuộc tính (ví dụ chỉ đổi số điện thoại của user) thì chuẩn RESTful dùng `PATCH`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `==` là \"So sánh ba phải\" (Type Coercion - tự ý ép kiểu ngầm định). Hai kiểu dữ liệu khác nhau nó cũng ráng ép về cùng 1 kiểu để so sánh.\n• `===` là \"So sánh nghiêm ngặt\" (Strict Equality). Yêu cầu cả KIỂU DỮ LIỆU lẫn GIÁ TRỊ phải giống hệt nhau 100%, không hề có bất kỳ sự ép kiểu nào.\n\n💻 Những bẫy \"kinh dị\" của `==` trong JavaScript:\n```javascript\n5 == '5'        // true (ép string sang number)\nfalse == 0      // true (ép boolean sang number)\nnull == undefined // true\n[] == false     // true (mảng rỗng ép về boolean)\n```\nNhưng với toán tử `===`: Tất cả 4 phép so sánh trên đều trả về `false`!\n\n💡 Mẹo phỏng vấn: Luôn khẳng định trong dự án thực tế, bạn và đội ngũ 100% sử dụng `===` (kết hợp ESLint rule `eqeqeq`) để triệt tiêu các lỗi logic ngầm cực kỳ nguy hiểm.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• DOM (Document Object Model): Cây phả hệ biểu diễn tài liệu HTML thành các đối tượng JavaScript, giúp bạn có thể dùng code để thêm, sửa, xóa thẻ HTML hoặc đổi màu CSS.\n• `document.getElementById('my-id')`: Giống như bạn tìm người qua Số Căn cước công dân duy nhất. Engine trình duyệt tìm trực tiếp trong Bảng băm (Hash Table) với độ phức tạp O(1) siêu nhanh.\n• `document.querySelector('.container > button.active')`: Giống như bạn cầm bản mô tả nhận dạng đi rà soát từng người trong phòng. Cú pháp cực kỳ linh hoạt (nhận mọi CSS selector), nhưng tốn CPU hơn một chút để duyệt cây.\n\n💡 Mẹo phỏng vấn: Nếu chỉ cần lấy 1 phần tử theo ID cố định, hãy ưu tiên `getElementById`. Nếu cần tìm phần tử theo class lồng nhau hoặc thuộc tính động `[data-status=\"active\"]`, hãy dùng `querySelector`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ đóng gói hộp quà):\n• Content: Món quà quý giá bên trong.\n• Padding: Lớp xốp đệm bọc xung quanh món quà bên trong hộp.\n• Border: Vỏ hộp carton cứng bên ngoài.\n• Margin: Khoảng cách từ hộp quà của bạn đẩy lùi hộp quà của người khác để chúng không chạm vào nhau.\n\n💻 Bẫy CSS kinh điển:\nMặc định trong CSS (`box-sizing: content-box`), khi bạn set `width: 200px` rồi thêm `padding: 20px`, cái hộp sẽ bị phình to thành 240px làm vỡ tung layout giao diện!\n\n💡 Mẹo phỏng vấn:\nLuôn khai báo ở dòng đầu tiên của file CSS:\n```css\n* {\n  box-sizing: border-box;\n}\n```\nKhi đó dù bạn có thêm padding hay border bao nhiêu thì chiều rộng tổng thể của phần tử vẫn giữ nguyên đúng 200px như thiết kế!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• DOM (Document Object Model): Cây phả hệ biểu diễn tài liệu HTML thành các đối tượng JavaScript, giúp bạn có thể dùng code để thêm, sửa, xóa thẻ HTML hoặc đổi màu CSS.\n• `document.getElementById('my-id')`: Giống như bạn tìm người qua Số Căn cước công dân duy nhất. Engine trình duyệt tìm trực tiếp trong Bảng băm (Hash Table) với độ phức tạp O(1) siêu nhanh.\n• `document.querySelector('.container > button.active')`: Giống như bạn cầm bản mô tả nhận dạng đi rà soát từng người trong phòng. Cú pháp cực kỳ linh hoạt (nhận mọi CSS selector), nhưng tốn CPU hơn một chút để duyệt cây.\n\n💡 Mẹo phỏng vấn: Nếu chỉ cần lấy 1 phần tử theo ID cố định, hãy ưu tiên `getElementById`. Nếu cần tìm phần tử theo class lồng nhau hoặc thuộc tính động `[data-status=\"active\"]`, hãy dùng `querySelector`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTừ những năm 1995, hành vi mặc định của thẻ `<form>` trong HTML là khi bấm Submit, trình duyệt sẽ gửi request đồng bộ và TẢI LẠI TOÀN BỘ TRANG WEB (Page Reload).\nTrong các ứng dụng web hiện đại (SPA như React, Vue, Next.js), nếu trang web bị reload thì:\n1. Toàn bộ state trên RAM bị xóa sạch.\n2. Màn hình bị chớp trắng giật cục làm trải nghiệm người dùng cực tệ.\n\nVì vậy, lập trình viên gọi `event.preventDefault()` để chặn đứng hành vi reload trang cổ lỗ sĩ đó, mở đường cho việc validate dữ liệu bằng JavaScript và gửi request ngầm qua `fetch()` hoặc `axios` mà màn hình vẫn đứng yên mượt mà!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ thẻ rung trà sữa):\nBạn đến quán gọi món trà sữa. Thu ngân đưa cho bạn một chiếc \"Thẻ rung báo lấy đồ\" (đó chính là Callback). Trong lúc chờ pha chế (tác vụ bất đồng bộ mất 5 phút), bạn thoải mái ngồi lướt TikTok hoặc trò chuyện (Non-blocking I/O). Khi trà sữa làm xong, thẻ rung lên bạn mới ra quầy lấy đồ.\n\nCallback Hell là gì?\nNếu bạn phải đợi làm trà sữa -> xong lại cầm thẻ đợi nướng bánh -> xong lại cầm thẻ đợi đóng gói... Các hàm callback lồng nhau 7-8 tầng hình kim tự tháp (Pyramid of Doom), khiến code thụt lề sâu hoắm, đọc đau mắt và nếu có lỗi thì không biết văng ra ở tầng nào!\n\n💡 Mẹo phỏng vấn:\nTrình bày lịch sử tiến hóa của JavaScript:\n1. Giai đoạn sơ khai: Dùng Callback (dễ dính Callback Hell).\n2. ES6 (2015): Ra mắt `Promise` với chuỗi `.then().catch()`.\n3. ES8 (2017): Đỉnh cao `async/await` - viết mã bất đồng bộ trông tuần tự, sáng sủa y hệt mã đồng bộ và bắt lỗi nhẹ nhàng bằng khối `try-catch`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tháo lắp xe đạp):\n• `JSON.stringify(object)`: Giống như bạn tháo rời chiếc xe đạp ra và đóng gói gọn gàng vào thùng các-tông (Biến đổi Object/Array trong RAM thành chuỗi văn bản Text thuần túy) để có thể gửi bưu điện qua đường truyền mạng internet hoặc lưu vào localStorage.\n• `JSON.parse(string)`: Giống như người nhận mở thùng các-tông và lắp ráp các bộ phận lại thành chiếc xe đạp hoàn chỉnh (Phân tích chuỗi Text thành JavaScript Object) để có thể leo lên chạy (`user.name`).\n\n💡 Bẫy phỏng vấn hay gài:\n1. `JSON.stringify()` sẽ tự động vứt bỏ các thuộc tính chứa hàm `function()`, `undefined` hoặc `Symbol`.\n2. Nếu chuỗi truyền vào `JSON.parse()` bị sai cú pháp (ví dụ thiếu dấu ngoặc kép, thừa dấu phẩy cuối cùng), nó sẽ quăng lỗi `SyntaxError` làm sập luôn ứng dụng nếu bạn không bọc trong khối `try-catch`!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ quán ăn 1 bồi bàn):\nKhông giống như Tomcat/Java truyền thống (mỗi khách hàng là 1 nhân viên phục vụ riêng - Thread-per-request, 10.000 khách là tốn 10.000 luồng làm nghẽn RAM), Node.js chỉ có DUY NHẤT 1 người bồi bàn (Single Main Thread).\n• Khi khách gọi món hầm (I/O tốn thời gian như đọc file, query DB, gọi API bên thứ ba): Bồi bàn ghi phiếu rồi chuyển ngay cho nhà bếp (libuv thread pool chạy ngầm trong OS). Bồi bàn không hề đứng chờ mà quay sang nhận order của khách tiếp theo ngay lập tức (Non-blocking).\n• Khi bếp nấu xong, chuông reo (Event Loop), bồi bàn mới bưng món ra cho khách.\n\n💡 Điểm yếu chí mạng của Node.js:\nNếu có 1 vị khách bắt bồi bàn ngồi giải phương trình tích phân bậc 4 (tác vụ CPU-intensive như mã hóa video, nén file zip lớn, AI model), người bồi bàn sẽ bị kẹt cứng và HÀNG NGHÌN KHÁCH HÀNG KHÁC PHÍA SAU BỊ TREO HOÀN TOÀN! Do đó với tác vụ CPU nặng, người ta dùng Worker Threads hoặc chuyển sang dùng Go/Java.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nGit Conflict xảy ra khi 2 lập trình viên cùng sửa đổi trên CÙNG MỘT DÒNG CODE ở 2 nhánh khác nhau, khiến Git không biết nên nghe theo ai.\nQuy trình xử lý chuẩn của một kỹ sư chuyên nghiệp:\n1. Mở file xung đột lên (chú ý các dấu mốc `<<<<<<< HEAD` và `>>>>>>>`).\n2. Trao đổi trực tiếp với người đồng đội đã viết đoạn code đó để thống nhất giữ code nào, bỏ code nào hoặc kết hợp cả hai.\n3. Chỉnh sửa code, xóa sạch các dấu mốc xung đột của Git.\n4. Chạy lại bài test kiểm tra xem ứng dụng còn chạy tốt không.\n5. Thực hiện `git add` và `git commit` để hoàn tất việc giải quyết conflict.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nUnit Test là việc kiểm thử ở mức độ nhỏ nhất: kiểm tra từng hàm/method đơn lẻ của một Class xem có cho kết quả đúng như kỳ vọng hay không.\nTại sao Unit Test cực kỳ quan trọng?\nTheo mô hình Kim Tự Tháp Kiểm Thử (Testing Pyramid): Unit Test có tốc độ chạy nhanh nhất (vài mili-giây) và chi phí sửa lỗi rẻ nhất. Phát hiện bug ngay lúc viết code giúp bạn tự tin Refactor (tối ưu cấu trúc) mã nguồn trong tương lai mà không sợ làm hỏng các tính năng cũ đang chạy ổn định.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTrong mô hình Agile/Scrum, một chu kỳ phát triển gọi là **Sprint**, thường kéo dài từ **1 đến 4 tuần** (phổ biến nhất là 2 tuần).\nMỗi Sprint bắt buộc gồm 4 sự kiện cốt lõi:\n1. Sprint Planning (Đầu Sprint): Họp lên kế hoạch chọn các công việc sẽ làm.\n2. Daily Scrum (Hàng ngày 15 phút): Báo cáo 3 câu hỏi (Hôm qua làm gì? Hôm nay làm gì? Có khó khăn gì cản trở không?).\n3. Sprint Review (Cuối Sprint): Demo sản phẩm chạy được cho khách hàng/Product Owner xem và nhận góp ý.\n4. Sprint Retrospective (Họp cải tiến nội bộ): Đội ngũ cùng nhìn lại xem Sprint qua điều gì làm tốt, điều gì làm dở và cần cải tiến hành động gì trong Sprint tới.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐể phỏng vấn thể hiện tư duy kiểm thử sâu sắc của một kỹ sư phần mềm, đừng chỉ nói \"kiểm tra đúng pass thì vào\". Phải liệt kê đủ 4 nhóm test cases:\n1. Luồng chuẩn (Happy Path): Nhập đúng username/password -> Đăng nhập thành công, chuyển hướng trang đúng, lưu token vào cookie.\n2. Luồng lỗi nghiệp vụ (Bad Cases): Sai mật khẩu, tài khoản chưa kích hoạt email, tài khoản bị admin khóa.\n3. Kiểm tra tính hợp lệ (Validation): Để trống ô nhập, nhập ký tự đặc biệt, email sai định dạng.\n4. Bảo mật & Tấn công (Security): Thử tấn công SQL Injection (`' OR 1=1 --`), tấn công XSS, và cơ chế Rate Limiting (nhập sai 5 lần liên tiếp thì tạm khóa tài khoản 15 phút để chống Brute-force).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nMột dự án phần mềm chuyên nghiệp luôn có ít nhất 3 môi trường tách biệt:\n1. Dev (Development): Môi trường máy cá nhân của lập trình viên để tha hồ viết và test code nháp.\n2. Staging / UAT: Môi trường có cấu hình giống hệt máy chủ thật để đội tester và khách hàng vào nghiệm thu tính năng.\n3. Production (Prod): Môi trường máy chủ thật đang phục vụ hàng triệu người dùng thực tế.\nFile `prod.env` chứa các biến môi trường nhạy cảm của server thật (URL Database thật, API Key thanh toán thật, Secret Key JWT) và TUYỆT ĐỐI KHÔNG ĐƯỢC PUSH LÊN GITHUB CÔNG KHAI để tránh bị lộ lọt dữ liệu.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ diễn viên đóng thế):\nKhi viết Unit Test cho tầng `UserService`, mục tiêu là chỉ kiểm tra xem logic tính toán của UserService có đúng hay không. Bạn KHÔNG MUỐN kết nối vào Database thật (vì DB thật chạy chậm và làm bẩn dữ liệu).\nMockito là thư viện tạo ra các \"Diễn viên đóng thế\" (Mock objects):\n• `@Mock UserRepository userRepository`: Tạo một repository giả.\n• `when(userRepository.findByEmail(\"a@gmail.com\")).thenReturn(Optional.of(fakeUser))`: Dạy cho diễn viên giả cách trả lời kịch bản.\n• `@InjectMocks UserService userService`: Tự động nhét các diễn viên giả này vào UserService để bạn an tâm test độc lập.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Manual Testing (Thủ công): Con người tự click chuột và gõ phím. Cực kỳ tốt ở giai đoạn đầu của tính năng mới, kiểm tra cảm nhận người dùng (UX) và kiểm thử khám phá (Exploratory Testing). Nhược điểm: Chậm, tốn nhân lực và dễ sai sót khi phải lặp lại.\n• Automation Testing (Tự động): Dùng code kịch bản (Selenium, Playwright, JUnit) chạy tự động. Thích hợp nhất cho **Kiểm thử hồi quy (Regression Testing)**: Mỗi khi lập trình viên sửa code và tạo Pull Request lên Git, kịch bản tự động chạy lại 500 bài test trong 2 phút để đảm bảo không có tính năng cũ nào bị hỏng.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Waterfall (Thác nước): Làm tuần tự như xây nhà bê-tông (Phân tích 3 tháng -> Thiết kế 2 tháng -> Lập trình 6 tháng -> Test 3 tháng). Khách hàng phải đợi 1 năm mới nhìn thấy phần mềm. Rủi ro khổng lồ: Nếu sau 1 năm khách đổi ý thì toàn bộ dự án bị đập đi xây lại!\n• Agile / Scrum (Linh hoạt): Chia nhỏ thành từng chu kỳ ngắn 2 tuần (Sprint). Cứ sau 2 tuần là bàn giao 1 tính năng chạy được cho khách hàng sờ tận tay và góp ý ngay. Nhờ vậy thích ứng cực nhanh với thay đổi của thị trường và giảm thiểu rủi ro thất bại.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Kiến trúc tìm kiếm chịu tải cao):\nKhi thiết kế ô tìm kiếm Shopee/Lazada, nếu người dùng gõ chữ \"áo\" mà backend query thẳng vào Database `SELECT * FROM sp WHERE ten LIKE '%áo%'` thì Database sẽ sập ngay lập tức!\nLuồng xử lý kiến trúc chuẩn Backend:\n1. Phía Client: Áp dụng **Debounce** (chờ user ngừng gõ phím 300-500ms mới phát request).\n2. Tầng Caching: Kiểm tra từ khóa trong **Redis Cache** trước. Nếu có sẵn trong cache -> Trả về ngay trong 2 mili-giây.\n3. Nếu Cache Miss: Dùng Search Engine chuyên dụng (**Elasticsearch**) hoặc truy vấn CSDL có đánh chỉ mục (Fulltext Index).\n4. Luôn luôn **Phân trang (Pagination)**: Chỉ trả về 20 kết quả đầu tiên và chỉ chọn những cột cần thiết (`id, name, thumbnail, price`), không bao giờ dùng `SELECT *`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nLLM (Large Language Model - Mô hình ngôn ngữ lớn như GPT-4, Claude, Gemini) là mạng nơ-ron học sâu được huấn luyện trên hàng nghìn tỷ từ ngữ từ khắp Internet.\nVề bản chất xác suất: LLM hoạt động bằng cách dự đoán từ ngữ tiếp theo (Next-token prediction) có khả năng xuất hiện cao nhất dựa trên ngữ cảnh được cung cấp.\nTrong phát triển phần mềm, LLM được ứng dụng để: Tự động hoàn thành code (Autocompletion), giải thích các đoạn mã phức tạp (Code explanation), tạo Unit Test tự động, phát hiện lỗ hổng bảo mật và hỗ trợ giải quyết lỗi (Debugging).",
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
      "explanation": "🎯 Bản chất dễ hiểu (Công thức Prompt chuẩn 5 thành phần):\nĐể AI không trả lời lan man hoặc sinh ra code rác, một Prompt chuyên nghiệp cần có đủ 5 yếu tố:\n1. Role (Vai trò): \"Bạn là chuyên gia Senior Spring Boot & Database Architect.\"\n2. Context (Bối cảnh): \"Tôi đang xây dựng API giỏ hàng cho trang thương mại điện tử Next.js kết nối MongoDB.\"\n3. Task (Yêu cầu cụ thể): \"Hãy viết 1 API thêm sản phẩm vào giỏ hàng, có xử lý trừ số lượng tồn kho.\"\n4. Constraints (Ràng buộc): \"Sử dụng Java 17, xử lý Transaction bằng @Transactional, kiểm tra trường hợp tồn kho bằng 0 thì báo lỗi OutOfStockException.\"\n5. Output Format (Định dạng đầu ra): \"Chỉ trả về mã nguồn Service và DTO, có kèm chú thích tiếng Việt ngắn gọn.\"",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCode do AI sinh ra rất hay gặp hiện tượng **Ảo giác (Hallucination)** - tức là AI tự bịa ra những hàm hoặc thư viện hoàn toàn không tồn tại, hoặc sinh code có lỗ hổng bảo mật tiềm ẩn.\nQuy trình của một kỹ sư phần mềm khi dùng code AI:\n1. Đọc hiểu từng dòng code, không bao giờ Copy-Paste mù quáng.\n2. Viết Unit Test để xác minh tính đúng đắn với các trường hợp biên (Edge Cases).\n3. Kiểm tra bảo mật: Xem có bị lỗi SQL Injection, Hardcode mật khẩu hoặc rò rỉ dữ liệu nhạy cảm hay không.\n4. Tối ưu lại cho đúng chuẩn quy ước mã nguồn (Coding Conventions) của dự án.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ Tư vấn viên vs Nhân viên thực thi):\n• Chatbot AI (như ChatGPT giao diện web): Hoạt động theo cơ chế Single-turn Request/Response. Bạn hỏi 1 câu thì nó trả lời 1 đoạn văn bản rồi đứng yên đó chờ lệnh tiếp theo. Nó không thể tự chạm vào máy tính của bạn.\n• AI Agent (như Antigravity, Devin, Claude Code): Là một thực thể có trí tuệ tự hành (Autonomous Agency). Nó có:\n  1. Mục tiêu (Goal): Nhận 1 nhiệm vụ lớn phức tạp.\n  2. Lập kế hoạch (Planning & Reasoning): Tự chia nhiệm vụ thành 10 bước nhỏ.\n  3. Sử dụng công cụ (Tool Use): Tự mở terminal chạy lệnh build, tự đọc file, tự sửa mã nguồn, tự chạy test.\n  4. Tự sửa sai (Self-Correction): Nếu test báo đỏ, Agent tự phân tích lỗi và sửa lại code cho đến khi test xanh mới thôi!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Cuốn sổ tay chỉ dẫn dự án):\nKhi bạn mới vào công ty, đồng đội đưa cho bạn cuốn sổ tay hướng dẫn dự án: Công ty dùng tech stack gì, code đặt ở thư mục nào, quy tắc đặt tên ra sao, cách chạy test thế nào.\nFile `claude.md` hoặc `AGENTS.md` chính là \"Cuốn sổ tay hướng dẫn dành riêng cho AI Coding Assistant\".\nNó cung cấp ngữ cảnh hệ thống bền vững (Persistent System Context) để mỗi khi AI tham gia vào dự án, nó luôn tuân thủ 100% chuẩn mực kỹ thuật của đội ngũ, không tự ý cài thư viện lung tung hoặc sinh code lạc quẻ.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nMô hình LLM sinh văn bản theo từng từ một (Autoregressive generation - từng token nối tiếp nhau).\nNếu bạn đợi AI viết xong toàn bộ bài văn 1.000 từ rồi mới gửi về qua HTTP response thông thường, người dùng sẽ phải ngồi nhìn màn hình quay quay trong 20-30 giây (trải nghiệm cực kỳ tệ và tưởng ứng dụng bị đơ).\nBằng cách sử dụng **Server-Sent Events (SSE)** với header `Content-Type: text/event-stream`:\nBackend sẽ \"bắn\" từng chữ (token) về trình duyệt ngay khi nó vừa được AI nghĩ ra trong vòng 0.5 giây đầu tiên. Người dùng nhìn thấy con trỏ gõ chữ từng ký tự mượt mà trước mắt, tạo cảm giác hệ thống phản hồi tức thì!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• INNER JOIN: Chỉ lấy phần giao nhau (Intersection) giữa 2 bảng. Chỉ những dòng nào có khóa khớp ở cả 2 bảng mới được xuất hiện trong kết quả.\n• LEFT JOIN: Lấy 100% tất cả các dòng của Bảng Bên Trái. Nếu bảng bên phải có dữ liệu khớp thì điền vào, nếu không có dữ liệu khớp thì điền giá trị `NULL`.\n\n💻 Tình huống phỏng vấn kinh điển:\n\"Làm thế nào để tìm danh sách những Khách Hàng CHƯA TỪNG mua đơn hàng nào?\"\n-> Dùng LEFT JOIN bảng Khách Hàng với Đơn Hàng, và thêm điều kiện `WHERE DonHang.id IS NULL`!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `WHERE`: Lọc từng dòng dữ liệu ĐƠN LẺ trước khi gom nhóm (GROUP BY). Trong WHERE tuyệt đối không được dùng các hàm tổng hợp như `COUNT()`, `SUM()`, `AVG()` (ví dụ viết `WHERE COUNT(*) > 5` sẽ bị báo lỗi cú pháp ngay).\n• `HAVING`: Lọc trên các NHÓM DỮ LIỆU sau khi đã gom nhóm bằng GROUP BY xong xuôi. Thường đi kèm với hàm tổng hợp (ví dụ: `HAVING COUNT(don_hang) >= 5`).\n\n💡 Thần chú ghi nhớ: \"WHERE lọc trước khi nhóm - HAVING lọc sau khi nhóm\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐể tìm người có TUỔI BÉ NHẤT, tức là người có NGÀY SINH GẦN VỚI HIỆN TẠI NHẤT (ngày sinh lớn nhất / mới nhất).\nDo đó ta phải sắp xếp ngày sinh giảm dần `ORDER BY ngay_sinh DESC` và lấy 10 người đầu tiên bằng `LIMIT 10`.\n(Rất nhiều bạn bị bẫy chọn `ASC` là ra những cụ già lớn tuổi nhất!).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCú pháp xóa dữ liệu có điều kiện trong SQL chuẩn:\n`DELETE FROM ten_bang WHERE dieu_kien;`\nỞ đây điều kiện là chưa đủ 18 tuổi (`tuoi < 18`), nên câu lệnh chính xác là:\n`DELETE FROM ung_vien WHERE tuoi < 18;`",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `CHAR(10)`: Kiểu chuỗi CỐ ĐỊNH độ dài. Nếu bạn chỉ lưu chữ \"ABC\" (3 ký tự), database vẫn tự động bù thêm 7 khoảng trắng vào sau để đủ 10 byte trên ổ cứng. Thích hợp cho các trường có độ dài luôn cố định như: Mã CCCD, Mã bưu chính, Mã màu Hex, Mã tiền tệ (USD, VND).\n• `VARCHAR(10)`: Kiểu chuỗi CO GIÃN độ dài (Variable Character). Lưu \"ABC\" thì chỉ tốn đúng 3 byte + 1 byte lưu độ dài, giúp tiết kiệm tối đa dung lượng ổ cứng. Dùng cho: Họ tên, Địa chỉ, Email.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nThứ tự viết code SQL hoàn toàn KHÁC với thứ tự Database thực sự thực thi bên dưới!\nThứ tự logic chuẩn xác của RDBMS:\n1. `FROM` (Xác định nguồn bảng và JOIN)\n2. `WHERE` (Lọc các dòng thỏa điều kiện)\n3. `GROUP BY` (Gom nhóm các dòng)\n4. `HAVING` (Lọc trên các nhóm)\n5. `SELECT` (Chọn các cột hiển thị)\n6. `DISTINCT` (Loại bỏ dòng trùng lặp)\n7. `ORDER BY` (Sắp xếp kết quả tăng/giảm)\n8. `LIMIT / OFFSET` (Cắt lấy số dòng phân trang)\n\n💡 Mẹo phỏng vấn: Tại sao không thể dùng bí danh (Alias) đặt trong SELECT để lọc trong WHERE? Vì WHERE chạy ở bước 2, trong khi SELECT tận bước 5 mới chạy!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐề bài yêu cầu:\n1. Điểm dưới trung bình: `WHERE diem < 5`\n2. Thống kê theo từng quê quán: `GROUP BY que_quan`\n3. Đếm số lượng: `COUNT(*)`\n-> Câu hoàn chỉnh: `SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;`",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCó 2 cách chuẩn mực:\nCách 1: Dùng `LEFT JOIN` bảng sinhvien với dang_ky, rồi lọc `WHERE dang_ky.ma_sv IS NULL`.\nCách 2: Dùng `NOT EXISTS (SELECT 1 FROM dang_ky WHERE dang_ky.ma_sv = sinhvien.id)` (thường được tối ưu hóa rất tốt trên database hiện đại).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `UNION`: Gộp kết quả của 2 câu truy vấn và TỰ ĐỘNG LOẠI BỎ CÁC DÒNG TRÙNG NHAU. Để loại bỏ trùng lặp, database bắt buộc phải tốn tài nguyên sắp xếp (Sort) toàn bộ dữ liệu.\n• `UNION ALL`: Gộp mù quáng toàn bộ dữ liệu của cả 2 câu truy vấn, CÓ TRÙNG CŨNG GIỮ NGUYÊN. Vì không phải lọc trùng nên tốc độ chạy nhanh hơn UNION rất nhiều lần.\n\n💡 Mẹo: Nếu bạn biết chắc 2 tập dữ liệu không thể trùng nhau (hoặc bài toán chấp nhận trùng), hãy luôn dùng `UNION ALL` để tối ưu hiệu năng.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `DELETE`: Lệnh DML. Xóa từng dòng theo điều kiện WHERE, có ghi lại Transaction Log từng dòng nên có thể `ROLLBACK` (hoàn tác) được. Chạy chậm nhất.\n• `TRUNCATE`: Lệnh DDL. Xóa sạch bách toàn bộ dữ liệu trong bảng trong nháy mắt, reset bộ đếm Auto-Increment về 1. Cực nhanh vì giải phóng thẳng các Data Pages trên ổ cứng, không ghi log từng dòng và KHÔNG THỂ ROLLBACK được trong hầu hết CSDL.\n• `DROP`: Xóa sổ hoàn toàn cả dữ liệu lẫn cấu trúc bảng, biến mất vĩnh viễn khỏi Database.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCú pháp cập nhật:\n`UPDATE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';`\nTăng điểm hiện tại lên 1 đơn vị cho những ai có giới tính là 'Nu'.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nLọc nữ trước: `WHERE gioi_tinh = 'Nu'`.\nGom nhóm theo quê: `GROUP BY que_quan`.\nĐếm số lượng: `COUNT(*)`.\n-> `SELECT que_quan, COUNT(*) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;`",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKhóa chính tổng hợp (Composite Primary Key) là khóa chính được tạo thành từ **sự kết hợp của 2 hoặc nhiều cột** gom lại để định danh duy nhất một bản ghi.\nVí dụ: Bảng `dang_ky_mon_hoc (ma_sinh_vien, ma_mon_hoc)`. Một sinh viên có thể đăng ký nhiều môn, một môn có nhiều sinh viên, nhưng cặp `(ma_sinh_vien, ma_mon_hoc)` thì chỉ được xuất hiện duy nhất 1 lần.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nNgười dùng MỚI NHẤT tức là người có thời gian tạo `created_at` lớn nhất (gần hiện tại nhất).\nDo đó phải sắp xếp giảm dần `ORDER BY created_at DESC` và lấy 100 dòng đầu tiên bằng `LIMIT 100`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ mục lục sách):\nIndex trong database giống như Mục Lục ở cuối cuốn từ điển.\n• Cần đánh Index (thường là B-Tree Index) trên các cột thường xuyên xuất hiện trong mệnh đề `WHERE`, `JOIN`, `ORDER BY`.\n• BẪY TỐI KỴ: Không bao giờ bọc hàm xung quanh cột có Index, ví dụ viết `WHERE YEAR(created_at) = 2026` sẽ làm vô hiệu hóa hoàn toàn Index và khiến Database phải quét toàn bộ bảng (Full Table Scan)! Phải viết thành: `WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nVIEW là một **Bảng Ảo** được định nghĩa bằng một câu lệnh SELECT lưu trữ trong Database. Bản thân View không hề chứa dữ liệu riêng trên ổ cứng.\nMục đích sử dụng:\n1. Bảo mật: Ẩn bớt các cột nhạy cảm (như mật khẩu, lương) và chỉ cấp quyền cho user xem qua View.\n2. Đơn giản hóa: Gom câu query JOIN 5-6 bảng phức tạp thành 1 View gọn gàng để lập trình viên chỉ cần `SELECT * FROM view_doanh_thu`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTrong JDBC có 3 loại Statement:\n1. `Statement`: Dùng cho câu lệnh SQL tĩnh không có tham số (Rất nguy hiểm vì dễ bị nối chuỗi dính SQL Injection).\n2. `PreparedStatement`: Dùng cho câu lệnh có tham số `?`. Được biên dịch trước, chống 100% SQL Injection và chạy nhanh hơn.\n3. `CallableStatement`: Dùng riêng để gọi các **Stored Procedure** hoặc Function được viết sẵn trong cơ sở dữ liệu.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nNgoài chống SQL Injection, PreparedStatement vượt trội về hiệu năng nhờ cơ chế **Query Plan Caching**:\nMỗi khi nhận 1 câu SQL, CSDL phải tốn CPU làm 4 bước: Kiểm tra cú pháp -> Kiểm tra ngữ nghĩa -> Tối ưu hóa đường đi -> Biên dịch ra kế hoạch thực thi (Execution Plan).\nVới PreparedStatement, CSDL làm 4 bước này duy nhất 1 lần và lưu kế hoạch vào bộ nhớ Cache. Các lần gọi tiếp theo chỉ việc nạp tham số mới vào chạy ngay, giúp tiết kiệm tới 80% tải CPU cho Database Server khi chạy các vòng lặp thêm/sửa hàng loạt.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tủ quần áo ngăn nắp):\n• Sơ đồ ERD: Bản vẽ thiết kế kiến trúc các thực thể và mối quan hệ giữa chúng trước khi bắt tay vào tạo bảng.\n• Chuẩn hóa dữ liệu (1NF, 2NF, 3NF): Giống như việc bạn phân loại đồ đạc vào đúng ngăn tủ để:\n  1. Loại bỏ Dư thừa dữ liệu (không lưu trùng lặp 1 thông tin ở 10 nơi khác nhau).\n  2. Tránh Dị thường khi cập nhật (sửa địa chỉ khách hàng ở bảng này nhưng quên sửa ở bảng kia).\n  3. Bảo vệ Tính toàn vẹn dữ liệu.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCâu hỏi bẫy kinh điển số 1 trong các buổi phỏng vấn Java!\n• Java có cơ chế \"Integer Cache\": JVM tự động tạo sẵn một hồ chứa các đối tượng Integer có giá trị từ **-128 đến 127** (theo quy chuẩn Java Language Specification khi Autoboxing).\n• Với giá trị 100: Nằm trong vùng Cache [-128, 127], nên cả biến `a` và `b` cùng trỏ tới 1 ô nhớ đối tượng duy nhất -> So sánh tham chiếu địa chỉ `a == b` cho kết quả `true`.\n• Với giá trị 200: Vượt ra ngoài vùng Cache, JVM bắt buộc phải gọi `new Integer(200)` tạo ra 2 đối tượng độc lập nằm ở 2 ô nhớ khác nhau trên Heap -> So sánh tham chiếu `c == d` trả về `false`!\n\n💡 Mẹo phỏng vấn:\nĐể so sánh giá trị của các Wrapper Class (Integer, Long, Double...), LUÔN LUÔN dùng phương thức `.equals()` (`c.equals(d)` sẽ là `true`), tuyệt đối không dùng toán tử `==`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKhi bạn duyệt qua một ArrayList bằng vòng lặp `for-each` (hoặc `for` thông thường) và gọi trực tiếp `list.remove(item)`, Java sẽ lập tức quăng lỗi `ConcurrentModificationException`.\n\nTại sao?\nBên dưới, vòng lặp for-each sử dụng một đối tượng `Iterator`. Trong ArrayList có một biến đếm gọi là `modCount` (số lần thêm/sửa/xóa danh sách). Iterator giữ một bản sao gọi là `expectedModCount`.\nKhi bạn gọi `list.remove()`, biến `modCount` tăng lên nhưng `expectedModCount` trong Iterator không hề hay biết. Ở bước lặp tiếp theo, Iterator phát hiện `modCount != expectedModCount` -> Nó nghi ngờ danh sách đang bị một luồng khác chỉnh sửa đồng thời làm sai lệch dữ liệu -> Nó lập tức báo lỗi ngay (Cơ chế Fail-Fast).\n\n💻 Cách giải quyết chuẩn mực:\n1. Dùng `Iterator`: `Iterator<String> it = list.iterator(); while(it.hasNext()) { if(...) it.remove(); }`\n2. Dùng Java 8 Lambda (Ngắn gọn và xịn nhất): `list.removeIf(item -> item.equals(\"X\"));`",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ bàn làm việc và nhà kho):\n• Vùng nhớ STACK (Bàn làm việc cá nhân): Mỗi luồng (Thread) có 1 Stack riêng. Dùng để lưu trữ các lời gọi hàm (Stack Frame), các biến cục bộ kiểu nguyên thủy (`int`, `boolean`) và các con trỏ địa chỉ tham chiếu. Bộ nhớ Stack cực kỳ nhỏ nhưng tốc độ truy xuất siêu nhanh. Khi hàm chạy xong, Stack Frame tự động bị xóa sổ ngay lập tức.\n• Vùng nhớ HEAP (Kho hàng khổng lồ dùng chung): Nơi lưu trữ tất cả các ĐỐI TƯỢNG (Objects) thực tế và mảng trong Java (kể cả String, ArrayList hay User object). Khi không còn ai trỏ tới đối tượng trong Heap nữa, nó sẽ được dọn dẹp bởi Garbage Collector (GC).\n\n💡 Bẫy phỏng vấn (Hai loại lỗi tràn bộ nhớ):\n• `StackOverflowError`: Xảy ra khi gọi đệ quy vô tận không có điểm dừng làm đầy bộ nhớ Stack.\n• `OutOfMemoryError (OOM)`: Xảy ra khi tạo quá nhiều Object lớn trong Heap mà Garbage Collector dọn không kịp làm cạn kiệt RAM.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKết quả trả về chắc chắn bằng 2!\n\nTại sao?\nTrong cấu trúc `try-catch-finally`, quy tắc bất di bất dịch của Java là: **Khối finally LUÔN LUÔN được thực thi trước khi hàm thực sự trả quyền điều khiển về cho nơi gọi**.\nKhi gặp `return 1;` trong khối try, JVM đã chuẩn bị sẵn giá trị 1 để trả về. Nhưng trước khi thoát hàm, nó bắt buộc phải chạy qua khối `finally`. Tại đây nó gặp lệnh `return 2;` -> Lệnh return trong finally ghi đè hoàn toàn (override) giá trị trả về trước đó!\n\n💡 Cảnh báo thực tế:\nViết lệnh `return` trong khối `finally` là một \"Anti-pattern\" (viết code tối kỵ) vì nó sẽ nuốt chửng luôn cả các Exception văng ra từ khối try, khiến việc bắt lỗi trở nên bất khả thi. Các công cụ quét code như SonarQube sẽ cảnh báo đỏ lỗi này.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `Comparable` (Nội lực bên trong): Class tự implement interface này và viết hàm `compareTo(other)` để định nghĩa thứ tự sắp xếp MẶC ĐỊNH của chính nó (ví dụ: Học sinh thì mặc định sắp xếp theo Mã số ID tăng dần).\n• `Comparator` (Bên ngoài chấm điểm): Là một class hoặc biểu thức Lambda độc lập bên ngoài, viết hàm `compare(o1, o2)` để cung cấp CÁC TIÊU CHÍ SẮP XẾP KHÁC NHAU tùy theo nhu cầu (ví dụ: Lúc thì cần xếp theo Điểm thi giảm dần, lúc thì cần xếp theo Tên bảng chữ cái A-Z).\n\n💻 Ví dụ code Java 8 cực đẹp:\n```java\n// Dùng Comparator linh hoạt:\nstudents.sort(Comparator.comparing(Student::getGpa).reversed()\n                        .thenComparing(Student::getName));\n```\n\n💡 Mẹo phỏng vấn: Hãy nhớ thần chú: \"Comparable là 1 tiêu chí tự nhiên nằm BÊN TRONG class; Comparator là nhiều tiêu chí linh hoạt nằm BÊN NGOÀI class\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nPhương thức `static` trong Java KHÔNG THỂ BỊ OVERRIDE (Ghi đè) bởi lớp con!\n\nNếu lớp con khai báo 1 static method có tên và tham số y hệt lớp cha thì sao?\nĐó là hiện tượng **Method Hiding (Ẩn phương thức)** chứ tuyệt đối không phải Đa hình (Polymorphism/Overriding).\nBởi vì phương thức static thuộc về CLASS chứ không thuộc về INSTANCE (đối tượng). Trình biên dịch sẽ liên kết tĩnh (Static Binding / Compile-time) dựa vào KIỂU KHAI BÁO của biến tham chiếu chứ không quan tâm đối tượng thực tế lúc chạy là gì!\n\n💻 Ví dụ:\n`Parent p = new Child(); p.print();` -> Sẽ in ra hàm của `Parent` chứ không bao giờ gọi hàm của `Child`!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tìm đồ trong tủ đồ):\nHashSet hoạt động bằng cách băm đối tượng (`hashCode()`) để chọn ngăn tủ (Bucket) cất giữ.\nKhi bạn sửa đổi thuộc tính của đối tượng đã nằm trong tủ, mã `hashCode()` mới của nó sẽ bị thay đổi hoàn toàn.\nKhi bạn gọi `hashSet.contains(object)`, HashSet dùng hashCode mới để tìm kiếm -> Nó chạy đến SAI NGĂN TỦ -> Kết quả trả về `false` (không tìm thấy), mặc dù đối tượng đó vẫn đang nằm chình ình trong HashSet!\n\n💡 Hậu quả kinh hoàng & Mẹo phỏng vấn:\nĐối tượng này sẽ bị kẹt vĩnh viễn trong HashSet, bạn không thể xóa nó bằng `remove()` được nữa -> Gây rò rỉ bộ nhớ (MEMORY LEAK) nghiêm trọng!\nQuy tắc vàng: \"Chỉ sử dụng các thuộc tính Bất biến (Immutable fields như ID, final string) để tham gia tính toán hàm hashCode() và equals()\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Checked Exception (Ngoại lệ kiểm tra): Kế thừa từ `java.lang.Exception` (nhưng không kế thừa `RuntimeException`). Trình biên dịch BẮT BUỘC bạn phải xử lý ngay lúc viết code (bằng `try-catch` hoặc khai báo `throws` ở hàm). Thường là các lỗi khách quan do môi trường bên ngoài: Mất mạng, file không tồn tại (`FileNotFoundException`), lỗi database (`SQLException`).\n• Unchecked Exception (Ngoại lệ lúc chạy): Kế thừa từ `java.lang.RuntimeException`. Trình biên dịch KHÔNG BẮT BUỘC phải try-catch. Thường là lỗi ngớ ngẩn do lập trình viên viết ẩu: `NullPointerException` (quên kiểm tra null), `ArrayIndexOutOfBoundsException` (truy cập quá chỉ số mảng), `ArithmeticException` (chia cho 0).\n\n💡 Mẹo phỏng vấn: Trong các framework hiện đại như Spring Framework, hầu hết các exception đều được bọc lại thành Unchecked Exception (ví dụ `DataAccessException`) để tránh làm code bị rối rắm bởi hàng trăm khối try-catch không cần thiết.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ làm phẳng hộp bánh):\n• `map()`: Chuyển đổi tỉ lệ 1 - 1. Cứ 1 phần tử đầu vào biến thành 1 phần tử đầu ra.\n  Ví dụ: Danh sách tên thường `[\"nam\", \"an\"]` qua `map(String::toUpperCase)` -> `[\"NAM\", \"AN\"]`.\n• `flatMap()`: Chuyển đổi và \"LÀM PHẲNG\" (Flattening) tỉ lệ 1 - N. Nhận vào các danh sách lồng nhau (List of Lists) và gộp tất cả các phần tử con thành MỘT LUỒNG PHẲNG DUY NHẤT.\n\n💻 Ví dụ thực tế:\nMỗi lớp học có 1 danh sách học sinh: `List<ClassRoom>` (mỗi classroom có `List<Student>`).\nNếu dùng `classes.stream().map(ClassRoom::getStudents)` -> Bạn sẽ nhận được `Stream<List<Student>>` (luồng chứa các danh sách con).\nNếu dùng `classes.stream().flatMap(c -> c.getStudents().stream())` -> Bạn nhận được `Stream<Student>` (danh sách phẳng của toàn bộ học sinh trong trường)!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCơ chế Try-with-resources (ra đời từ Java 7) yêu cầu tài nguyên phải implement interface `java.lang.AutoCloseable` (hoặc `java.io.Closeable`).\n\nTại sao đây là tính năng tuyệt vời?\nTrước Java 7, mỗi lần mở kết nối JDBC hoặc đọc file, lập trình viên phải viết khối `finally` dài ngoằng để gọi `.close()`. Nếu trong finally lại bị văng lỗi thì lỗi gốc ban đầu trong khối try sẽ bị nuốt chửng!\nVới Try-with-resources:\n```java\ntry (Connection conn = dataSource.getConnection();\n     PreparedStatement ps = conn.prepareStatement(sql)) {\n  // Thực thi nghiệp vụ...\n} // Java TỰ ĐỘNG gọi close() đúng thứ tự ngược lại, kể cả khi có Exception văng ra!\n```",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ giấy nháp):\n• String (Bất biến - Immutable): Giống như viết chữ bằng bút mực không thể tẩy xóa. Mỗi lần bạn nối chuỗi `s = s + \"a\"`, Java không hề sửa chuỗi cũ mà âm thầm tạo ra một Đối Tượng Mới trên Heap. Nếu nối chuỗi trong vòng lặp 10.000 lần, Java sẽ tạo ra 10.000 đối tượng rác làm tràn RAM!\n• StringBuilder (Khả biến - Mutable): Giống như bảng phấn xóa được. Nó sửa trực tiếp trên mảng ký tự nội bộ `char[]` nên tốc độ nối chuỗi nhanh gấp hàng trăm lần String. Dành cho môi trường Đơn luồng (Single-thread).\n• StringBuffer: Giống hệt StringBuilder nhưng có thêm từ khóa `synchronized` trên các method để an toàn trong môi trường Đa luồng (Thread-safe). Tuy nhiên do phải khóa luồng (Locking) nên tốc độ chạy chậm hơn StringBuilder.\n\n💡 Mẹo phỏng vấn: 99% trường hợp nối chuỗi trong hàm chỉ chạy đơn luồng, hãy luôn dùng `StringBuilder` để đạt tốc độ tối đa!",
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
      "explanation": "🎯 Bản chất dễ hiểu (4 trụ cột OOP):\n1. Đóng gói (Encapsulation): Che giấu dữ liệu nhạy cảm bên trong bằng `private`, chỉ cho bên ngoài truy cập thông qua các hàm `getter/setter` có kiểm tra hợp lệ. (Ví dụ: Số dư tài khoản không cho gán trực tiếp `soDu = -500`, phải qua hàm `rutTien()` kiểm tra xem có đủ tiền không).\n2. Kế thừa (Inheritance): Lớp con tái sử dụng và mở rộng thuộc tính, phương thức của lớp cha qua từ khóa `extends`, tránh viết lại code trùng lặp. (Ví dụ: Class `Dog` kế thừa từ class `Animal`).\n3. Đa hình (Polymorphism): Cùng một hành vi nhưng thể hiện khác nhau ở từng đối tượng. (Ví dụ: Cùng gọi hàm `keu()`, nhưng Chó thì sủa \"Gâu gâu\", Mèo thì kêu \"Meo meo\").\n4. Trừu tượng (Abstraction): Tập trung vào việc đối tượng \"LÀM ĐƯỢC GÌ\" thay vì chi tiết nó \"LÀM NHƯ THẾ NÀO\". (Ví dụ: Bạn lái ô tô chỉ cần đạp chân ga là xe chạy, không cần biết bugi đánh lửa phun xăng bên trong động cơ ra sao).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Đa hình lúc biên dịch (Compile-time / Đa hình tĩnh): Thể hiện qua **Method Overloading (Nạp chồng)**. Trong cùng 1 class có nhiều hàm cùng tên nhưng khác nhau về số lượng hoặc kiểu tham số. Trình biên dịch nhìn vào tham số lúc viết code là biết ngay hàm nào được gọi.\n• Đa hình lúc thực thi (Runtime / Đa hình động): Thể hiện qua **Method Overriding (Ghi đè)**. Lớp con viết lại method của lớp cha. Lúc viết code ta dùng biến cha trỏ vào con `Animal a = new Dog(); a.makeSound();`. Lúc biên dịch chỉ biết đó là Animal, phải đợi đến lúc chạy (Runtime), JVM mới nhìn vào vùng nhớ thực tế thấy đó là con Chó và gọi hàm sủa của Dog (cơ chế Dynamic Method Dispatch).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nSắp xếp phạm vi từ hẹp nhất đến rộng nhất:\n1. `private`: Ích kỷ nhất, chỉ duy nhất bên trong chính Class đó mới nhìn thấy.\n2. `default` (không ghi gì - package-private): Chỉ các Class nằm trong CÙNG MỘT PACKAGE mới nhìn thấy nhau.\n3. `protected`: Nằm trong cùng Package + Bất kỳ LỚP CON (Subclass) nào kế thừa nó kể cả nằm ở package khác.\n4. `public`: Hào phóng nhất, ai ở bất kỳ đâu trong toàn bộ project cũng gọi được.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTừ khóa `final` mang ý nghĩa là \"BẤT BIẾN / CHỐT CHẶN CUỐI CÙNG\":\n• `final variable`: Biến trở thành hằng số, chỉ được gán giá trị 1 lần duy nhất, không thể thay đổi giá trị (như số PI = 3.14).\n• `final method`: Lớp con không được phép Ghi đè (Override) phương thức này (để bảo vệ logic cốt lõi không bị lớp con sửa đổi làm sai lệch).\n• `final class`: Tuyệt đối không cho phép class nào khác Kế thừa (Inherit) nó.\n\n💡 Ví dụ đắt giá: Class `java.lang.String` là một `final class`! Java cố tình làm điều này để không ai có thể tạo ra một lớp con giả mạo String nhằm mục đích tấn công bảo mật hay phá vỡ String Pool.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKhi khởi tạo một đối tượng lớp con, nền móng của lớp cha bắt buộc phải được dựng lên TRƯỚC. Do đó, lệnh gọi `super()` (gọi constructor của cha) **bắt buộc phải là dòng code đầu tiên** trong Constructor của lớp con.\nNếu bạn để bất kỳ dòng lệnh nào khác lên trước `super()`, trình biên dịch Java sẽ báo lỗi ngay lập tức.\nNếu bạn không tự tay viết `super()`, trình biên dịch sẽ tự động chèn ngầm `super();` không tham số vào dòng đầu tiên cho bạn.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ hồ nước chung):\nString Pool là một vùng nhớ đặc biệt trong Heap do JVM quản lý để tiết kiệm bộ nhớ:\n• Khi bạn khai báo chuỗi dạng Literal: `String s1 = \"Java\"; String s2 = \"Java\";` -> JVM kiểm tra thấy \"Java\" đã có sẵn trong Pool, nó cho `s2` trỏ chung vào ô nhớ của `s1`. Do đó `s1 == s2` cho kết quả `true` (vì so sánh 2 địa chỉ ô nhớ giống nhau).\n• Nhưng khi bạn dùng từ khóa `new`: `String s3 = new String(\"Java\");` -> JVM bị ép buộc phải cấp phát một ô nhớ Object HOÀN TOÀN MỚI nằm ngoài Pool. Khi đó `s1 == s3` sẽ trả về `false`!\n\n💡 Quy tắc sống còn: Trong Java, 100% trường hợp so sánh chuỗi hãy dùng phương thức `s1.equals(s3)` (so sánh nội dung ký tự), không bao giờ dùng toán tử `==`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nJAVA LÀ 100% PASS-BY-VALUE (Truyền giá trị)! Java không hề có con trỏ tham chiếu như C++.\n\nNhiều người hay nhầm vì thấy sửa object trong hàm thì ở ngoài bị đổi theo. Hãy phân biệt rõ:\n• Khi truyền biến nguyên thủy (`int x = 10`): Java sao chép nguyên giá trị 10 vào hàm. Hàm có đổi `x = 20` thì ở ngoài x vẫn là 10.\n• Khi truyền Object (`Person p = new Person(\"Nam\")`): Java sao chép BẢN SAO CỦA ĐỊA CHỈ Ô NHỚ (Pointer value).\n  - Nếu bạn dùng bản sao địa chỉ đó để sửa thuộc tính: `p.setName(\"Bình\")` -> Tên bị đổi vì cùng trỏ vào 1 ngôi nhà trên Heap.\n  - Nhưng nếu bạn gán `p = new Person(\"Khác\")` bên trong hàm -> Đối tượng `p` ở bên ngoài hoàn toàn KHÔNG HỀ BỊ THAY ĐỔI, vì bạn chỉ vừa trỏ bản sao sang một ngôi nhà mới!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `List` (ArrayList, LinkedList): Giống như hàng người xếp hàng mua vé. Có thứ tự trước sau (Index 0, 1, 2...) và CHO PHÉP người trùng tên đứng lặp lại.\n• `Set` (HashSet, TreeSet): Giống như một túi đựng bóng độc nhất. KHÔNG CHO PHÉP phần tử trùng lặp (nếu thêm phần tử đã có rồi thì nó bỏ qua). Không đảm bảo thứ tự chèn (với HashSet).\n• `Map` (HashMap, TreeMap): Giống như cuốn Sổ danh bạ điện thoại lưu theo cặp **Key - Value** (Tên người - Số điện thoại). Các Key là duy nhất không được trùng nhau (nếu put trùng key sẽ ghi đè giá trị cũ).",
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
      "explanation": "🎯 Bản chất dễ hiểu (Cây tầm gửi và rễ cây):\nGarbage Collector (GC) trong JVM không đếm thời gian sống của đối tượng, mà dùng thuật toán **Truy vết khả năng tiếp cận (Reachability Analysis)** bắt đầu từ các GC Roots.\nGC Roots là những rễ cây vững chắc đang còn hoạt động: biến cục bộ trong Stack của luồng đang chạy, biến static của class, các luồng (Thread) đang active.\n• Nếu từ GC Roots có đường dây tham chiếu nối tới đối tượng -> Đối tượng còn sống.\n• Nếu đối tượng bị đứt toàn bộ liên lạc (Unreachable), trôi nổi vô thừa nhận trong Heap -> Nó bị coi là Rác và sẽ bị GC gom tiêu hủy giải phóng RAM.\n\n💡 Mẹo phỏng vấn: Lệnh `System.gc()` chỉ là lời \"thỉnh cầu\" JVM hãy dọn rác, còn việc JVM có dọn rác ngay hay không là do JVM tự quyết định, ta không thể ép buộc!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Spring Framework thuần giống như bạn đi mua linh kiện máy tính rời: Bạn phải tự mua CPU, RAM, nguồn, tự viết hàng trăm dòng cấu hình XML rườm rà, tự cài đặt web server Tomcat bên ngoài rồi deploy file `.war` lên rất cực khổ.\n• Spring Boot giống như chiếc máy tính xách tay Laptop đóng gói sẵn:\n  1. Auto-configuration: Tự động đoán và cấu hình những thứ phổ biến (thấy có MySQL driver là tự cấu hình DataSource).\n  2. Starter Dependencies: Chỉ cần khai báo 1 dòng `spring-boot-starter-web` là tự kéo đủ thư viện cần thiết.\n  3. Embedded Tomcat: Web server được nhúng thẳng vào file `.jar`, chỉ cần chạy `java -jar app.jar` là web hoạt động ngay lập tức!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nVòng đời của một Spring Bean trải qua các giai đoạn chính:\n1. Khởi tạo (Instantiation): Gọi Constructor để tạo object trong RAM.\n2. Tiêm phụ thuộc (Populate Properties): Inject các dependency qua `@Autowired`.\n3. Gọi các Aware Interfaces: Nếu bean cần biết về môi trường (như `BeanNameAware`, `ApplicationContextAware`).\n4. Tiền khởi tạo & Khởi tạo: Chạy các hàm gắn annotation `@PostConstruct` hoặc phương thức `afterPropertiesSet()`.\n5. Sẵn sàng phục vụ (Ready for use): Bean nằm trong Container phục vụ ứng dụng.\n6. Hủy bỏ (Destruction): Khi ứng dụng tắt, gọi các hàm dọn dẹp `@PreDestroy` để đóng file, đóng kết nối database.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCó 3 cách thực hiện Dependency Injection (DI):\n1. Field Injection: Gắn `@Autowired` trực tiếp lên thuộc tính (Tiện nhưng nguy hiểm, khó viết Unit Test).\n2. Setter Injection: Dùng hàm `setXyz()` (Dành cho các phụ thuộc không bắt buộc).\n3. **Constructor Injection (Được Spring Team khuyến nghị 100%)**: Truyền dependency qua hàm khởi tạo Constructor.\n\nTại sao Constructor Injection là số 1?\n• Cho phép khai báo biến là `final` -> Đảm bảo tính bất biến (Immutable), tránh bị đổi lén.\n• Rất dễ viết Unit Test với Mockito: Chỉ cần `new UserService(mockRepo)` mà không cần bật cả Spring IoC container nặng nề.\n• Phát hiện lỗi phụ thuộc vòng tròn (Circular Dependency) ngay lúc khởi động ứng dụng.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Hành trình của 1 Request):\nKhi người dùng gửi request `GET /api/users`:\n1. `DispatcherServlet` (Chàng lễ tân trung tâm): Nhận toàn bộ request đến đầu tiên.\n2. `HandlerMapping`: Lễ tân tra danh bạ xem URL này thuộc về Controller nào xử lý.\n3. `Controller`: Tiếp nhận request, đọc tham số và gọi xuống tầng nghiệp vụ.\n4. `Service`: Xử lý logic tính toán, kiểm tra quyền hạn, quản lý giao dịch (@Transactional).\n5. `Repository / DAO`: Tương tác với Database bằng Hibernate/JPA.\n6. Dữ liệu quay ngược trở lại Controller và được serialize thành JSON trả về cho Client.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐể tránh việc ở mỗi Controller đều phải viết lặp đi lặp lại hàng trăm khối `try-catch`, Spring Boot cung cấp giải pháp xử lý ngoại lệ tập trung (Global Exception Handling) bằng cách kết hợp:\n• `@RestControllerAdvice` (hoặc `@ControllerAdvice`): Đánh dấu class là bộ lọc bắt lỗi toàn cục cho tất cả các Controller trong dự án.\n• `@ExceptionHandler(UserNotFoundException.class)`: Đặt trên từng method để bắt đúng loại lỗi cụ thể và trả về định dạng JSON lỗi chuẩn hóa thống nhất (gồm: timestamp, status code, error message).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCORS (Cross-Origin Resource Sharing) là một cơ chế BẢO MẬT CỦA TRÌNH DUYỆT.\nKhi frontend chạy ở `http://localhost:3000` gọi API sang backend ở `http://localhost:8080` (khác Port hoặc khác Domain), trình duyệt sẽ chặn đứng lại vì nghi ngờ trang web lạ đang lén gọi trộm API của bạn!\n\nCách xử lý chuẩn trong Spring Boot:\n1. Cấp Controller: Dùng `@CrossOrigin(origins = \"http://localhost:3000\")`.\n2. Cấp toàn cục (Khuyên dùng): Cấu hình bean `WebMvcConfigurer` và ghi đè hàm `addCorsMappings` để cho phép domain frontend, các HTTP method (GET, POST, PUT, DELETE) và headers cần thiết.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `singleton` (Scope mặc định): Spring IoC Container chỉ tạo DUY NHẤT 1 instance của Bean và chia sẻ cho toàn bộ ứng dụng dùng chung. Cực kỳ tiết kiệm RAM, nhưng Bean bắt buộc phải thiết kế dạng **Stateless** (không lưu trạng thái riêng của người dùng để tránh xung đột đa luồng).\n• `prototype`: Mỗi khi có ai đó yêu cầu inject (@Autowired) hoặc gọi `getBean()`, Spring sẽ TẠO RA MỘT INSTANCE HOÀN TOÀN MỚI. Phù hợp cho các đối tượng cần lưu trạng thái tạm thời (Stateful).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `@Controller`: Dành cho ứng dụng web truyền thống (Server-Side Rendering). Giá trị trả về của hàm là một chuỗi Tên View (ví dụ return `\"home\"` -> ViewResolver sẽ đi tìm file `home.html` hoặc `home.jsp` để hiển thị).\n• `@RestController`: Dành cho RESTful API. Thực chất nó là viết tắt của:\n`@RestController = @Controller + @ResponseBody`\nMọi dữ liệu trả về từ hàm (như User object, List) sẽ được thư viện Jackson tự động chuyển đổi thành chuỗi JSON/XML nằm trong HTTP Response Body trả thẳng về cho frontend/mobile app.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `@Component`: Là annotation \"cha\" tổng quát, đánh dấu bất kỳ class nào là 1 Spring Bean để Spring tự động quét và quản lý (Component Scanning).\n• `@Service`: Chuyên biệt hóa của @Component ở tầng Nghiệp vụ (Business logic).\n• `@Repository`: Chuyên biệt hóa ở tầng Dữ liệu (DAO/Database). Nó có tính năng đặc biệt: Tự động bắt các lỗi SQL của database và dịch sang ngoại lệ `DataAccessException` của Spring.\n• `@Bean`: Dùng ở cấp độ METHOD bên trong class cấu hình `@Configuration`. Dùng khi bạn muốn khởi tạo bean từ thư viện của bên thứ 3 mà bạn không thể sửa code để gắn @Component lên đầu class của họ.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nSpring Boot dùng thư viện `spring-boot-starter-validation` (chuẩn Hibernate Validator):\n• Khai báo ràng buộc trên DTO: `@NotNull` (không null), `@NotBlank` (chuỗi không rỗng và không toàn khoảng trắng), `@Size(min=6, max=20)`, `@Email`.\n• `@Valid`: Là chuẩn tiêu chuẩn của Java/Jakarta Bean Validation (JSR-380).\n• `@Validated`: Là annotation do Spring cung cấp, mở rộng thêm tính năng **Validation Groups** (ví dụ: Lúc Tạo mới thì ID được null, nhưng lúc Cập nhật thì ID bắt buộc phải có).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• JPA (Java Persistence API): Là cuốn HỢP ĐỒNG / BỘ ĐẶC TẢ tiêu chuẩn (chỉ gồm các interface, không có code thực thi).\n• Hibernate: Là NGƯỜI THỰC THI hợp đồng đó (thư viện ORM cụ thể làm việc kết nối database).\n• Spring Data JPA: Là bộ khung tiện ích tầng trên giúp bạn không phải viết code Hibernate dài dòng, tự động sinh ra các câu query thông qua các Interface Repository.\n• `JpaRepository` kế thừa từ `PagingAndSortingRepository` và `CrudRepository`. Nó tiện hơn vì các hàm như `findAll()` trả về sẵn `List<T>` (thay vì `Iterable<T>`) và có thêm các hàm xịn như `flush()`, `saveAndFlush()`, `deleteInBatch()`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCó 4 cách chính để viết query trong Spring Data JPA:\n1. Query Method (Derived Query): Spring tự sinh SQL từ tên hàm: `findByEmailAndStatus(String email, int status)`. Rất nhanh và tiện cho các câu query đơn giản.\n2. `@Query` với JPQL: Viết câu truy vấn dựa trên Tên Entity và Thuộc tính Java: `@Query(\"SELECT u FROM User u WHERE u.age > :age\")` (Độc lập với hệ quản trị CSDL).\n3. `@Query(nativeQuery = true)`: Viết câu lệnh SQL thuần của MySQL/Postgres khi cần dùng các hàm đặc thù của CSDL.\n4. Specifications / Criteria API: Dùng code Java để xây dựng câu truy vấn động khi form tìm kiếm có quá nhiều bộ lọc tùy chọn.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ hồ bơi kết nối):\nKhởi tạo một kết nối TCP và bắt tay xác thực với Database Server tốn hàng trăm mili-giây. Nếu mỗi request của user đều mở kết nối mới rồi đóng lại thì Database sẽ chết ngắc vì kiệt quệ tài nguyên!\nConnection Pool (như HikariCP) duy trì sẵn một đàn kết nối mở sẵn (ví dụ 10-20 kết nối). Khi Service cần truy vấn, nó chạy ra \"mượn\" 1 kết nối có sẵn, chạy xong thì \"trả lại\" cho hồ bơi.\nHikariCP là thư viện Connection Pool mặc định của Spring Boot vì nó được tối ưu mã bytecode siêu nhỏ, tiêu thụ ít CPU và đạt tốc độ mượn trả kết nối nhanh nhất thế giới hiện nay!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ bản vẽ nháp):\nHãy tưởng tượng bạn muốn sửa một ngôi nhà 10 tầng.\n• Real DOM giống như bạn mang búa đập tường gạch xây lại ngay lập tức: cực kỳ tốn công sức, bụi bặm và làm rung lắc cả tòa nhà (trình duyệt phải tính toán lại Layout và vẽ lại Pixel - Reflow & Repaint).\n• Virtual DOM giống như bạn lấy bút chì sửa trên một bản vẽ nháp 3D trong máy tính (RAM). Bạn có thể tẩy xóa, thay đổi 100 lần trên bản vẽ siêu nhanh. Sau khi chốt phương án cuối cùng, bạn so sánh bản vẽ mới với bản vẽ cũ (thuật toán Diffing) và chỉ cho thợ đến sửa đúng 1 viên gạch bị hỏng (Reconciliation & Batching).\n\n💻 Ví dụ thực tế:\nTrong danh sách 1.000 sản phẩm Shopee, khi người dùng bấm nút \"Thích\" ở sản phẩm số 500:\nNhờ Virtual DOM, React chỉ tìm ra đúng icon trái tim đổi từ màu xám sang đỏ và cập nhật đúng 1 thẻ <i> đó trên màn hình, 999 sản phẩm còn lại hoàn toàn không bị vẽ lại!\n\n💡 Mẹo phỏng vấn & Ghi điểm:\nNhớ 2 từ khóa kỹ thuật đắt giá: \"Diffing Algorithm\" (so sánh 2 cây ảo với độ phức tạp O(n)) và \"Batching\" (gộp nhiều thay đổi state liên tiếp để render 1 lần duy nhất). Tránh nói \"Virtual DOM luôn nhanh hơn DOM thật\" mà hãy nói \"Virtual DOM giúp tối ưu số lần chạm vào Real DOM\".",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nKHÔNG! Virtual DOM không phải là phép thuật và KHÔNG LUÔN LUÔN nhanh hơn Real DOM thật trong mọi tình huống.\n\nTại sao?\nBản thân việc tạo ra các JavaScript Object để làm Virtual DOM trên RAM và chạy thuật toán so sánh Diffing giữa 2 cây cũng tốn CPU và bộ nhớ.\n• Với trang web đơn giản: Chỉ có 1 nút bấm đổi màu chữ, việc viết JavaScript thuần `document.getElementById('btn').style.color = 'red'` chạy thẳng vào Real DOM trong 0.001 mili-giây, nhanh hơn React rất nhiều (vì React phải qua 5-6 bước tạo VDOM, so sánh rồi mới đụng vào Real DOM).\n\n💻 Ví dụ thực tế:\nCác framework hiện đại như Svelte không hề dùng Virtual DOM. Svelte biên dịch code ngay lúc build time thành các lệnh thao tác trực tiếp vào Real DOM nên chạy nhanh và nhẹ hơn React trong các bài test hiệu năng đơn giản.\n\n💡 Mẹo phỏng vấn (Bẫy nhà tuyển dụng hay gài):\nNgười phỏng vấn hỏi câu này để xem bạn có \"thần thánh hóa\" React hay không.\nHãy trả lời: \"Lợi thế lớn nhất của Virtual DOM không phải là đánh bại Real DOM ở các thao tác đơn lẻ, mà là mang lại trải nghiệm lập trình Khai báo (Declarative UI - UI = f(state)) và đảm bảo hiệu năng 'ĐỦ TỐT' (predictable performance) cho các ứng dụng quy mô khổng lồ hàng nghìn component phức tạp\". Trả lời như vậy bạn sẽ đạt điểm tuyệt đối!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ đời sống):\n• Props (Properties) giống như \"Họ tên hoặc Gen di truyền do bố mẹ đặt cho bạn\": Do component cha truyền xuống cho component con. Component con chỉ được phép đọc (Read-only / Immutable), tuyệt đối KHÔNG ĐƯỢC tự ý sửa đổi props của chính mình.\n• State giống như \"Tâm trạng hoặc Tiền trong ví của chính bạn\": Do chính component đó tự khai báo, tự quản lý và có thể thay đổi bất cứ lúc nào qua hàm setter (như `setCount`). Khi state thay đổi, component sẽ tự động re-render để cập nhật giao diện mới.\n\n💻 Ví dụ code thực tế:\n```jsx\n// Component Cha:\n<UserProfile username=\"trung_admin\" /> // \"trung_admin\" là PROPS truyền xuống\n\n// Component Con (UserProfile):\nfunction UserProfile({ username }) {\n  // username là read-only, không được gán username = \"khac\"\n  const [isOnline, setIsOnline] = useState(true); // isOnline là STATE nội tại\n  return <div>{username} - {isOnline ? \"🟢 Đang online\" : \"⚪ Vắng mặt\"}</div>;\n}\n```\n\n💡 Mẹo phỏng vấn & Câu hỏi mở rộng:\n\"Nếu component con muốn thay đổi dữ liệu của component cha thì làm thế nào?\"\n-> Trả lời: Áp dụng kỹ thuật \"Lifting State Up\" (Nâng state lên cha). Component cha truyền 1 hàm callback xuống làm props cho con, khi con cần đổi dữ liệu sẽ gọi hàm callback đó để cha tự update state của mình.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `useState`: Chuyên lo phần \"Dữ liệu hiển thị\" trên màn hình. Cứ mỗi lần state đổi giá trị -> React tự động vẽ lại (re-render) component.\n• `useEffect`: Chuyên lo các công việc \"Hậu trường / Tác vụ phụ\" (Side Effects) diễn ra SAU KHI giao diện đã được vẽ xong lên màn hình: gọi API backend lấy dữ liệu, lắng nghe sự kiện cuộn trang, hẹn giờ `setInterval`, hoặc đổi tiêu đề trang web `document.title`.\n\n💻 Ví dụ thực tế (Trang bảng tin):\n```jsx\nfunction NewsFeed() {\n  const [posts, setPosts] = useState([]); // 1. State lưu bài viết\n\n  useEffect(() => {\n    // 2. Chạy sau khi giao diện hiện lên: Gọi API lấy bài viết từ server\n    fetch('/api/posts')\n      .then(res => res.json())\n      .then(data => setPosts(data));\n  }, []); // 3. [] rỗng nghĩa là chỉ chạy 1 lần duy nhất khi vừa vào trang\n}\n```\n\n💡 Bẫy phỏng vấn kinh điển (Infinite Loop):\nNếu bạn gọi `setPosts()` bên trong `useEffect` mà KHÔNG CÓ mảng dependencies `[]`, component sẽ re-render liên tục vô tận (State đổi -> Render -> Chạy useEffect -> State lại đổi -> Lại render...) làm treo đơ trình duyệt của người dùng!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tủ lạnh):\n• `useMemo`: Ghi nhớ \"KẾT QUẢ của món ăn\" (đã nấu xong rồi cất vào tủ lạnh, lần sau đói lấy ra ăn ngay chứ không nấu lại từ đầu).\n• `useCallback`: Ghi nhớ \"CÔNG THỨC / ĐỊNH NGHĨA HÀM\" (giữ nguyên con trỏ hàm ở vùng nhớ cũ, không đẻ ra con trỏ hàm mới mỗi lần re-render).\n\n💻 Ví dụ thực tế:\n```jsx\n// useMemo: items có 50.000 sản phẩm, chỉ tính tổng lại khi mảng items thay đổi\nconst totalPrice = useMemo(() => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}, [items]);\n\n// useCallback: Giữ nguyên hàm handleDelete để truyền xuống component con <ProductItem />\n// Giúp ProductItem (được bọc React.memo) không bị re-render oan uổng\nconst handleDelete = useCallback((id) => {\n  setItems(prev => prev.filter(x => x.id !== id));\n}, []);\n```\n\n💡 Mẹo phỏng vấn:\n\"Có nên bọc useMemo và useCallback cho TẤT CẢ biến và hàm trong dự án không?\"\n-> Trả lời: TUYỆT ĐỐI KHÔNG! Bản thân việc gọi hook và duy trì mảng dependencies cũng tiêu tốn bộ nhớ RAM và CPU. Chỉ dùng khi phép tính thực sự nặng (xử lý hàng nghìn phần tử) hoặc khi truyền hàm xuống component con nặng có áp dụng `React.memo`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ gọi món nhà hàng):\n• CSR (Client-Side Rendering): Nhà hàng phát cho bạn nguyên liệu tươi mang về nhà tự nấu (Server chỉ gửi file HTML rỗng + file JS to, trình duyệt của bạn tự chạy JS để vẽ UI). Lần đầu mở web sẽ hơi chậm, nhưng khi đã tải xong thì chuyển trang mượt như bơ.\n• SSR (Server-Side Rendering): Khách gọi món nào, đầu bếp trong bếp nấu ngay lập tức trên chảo nóng món đó rồi bưng ra (Server render HTML tươi mới theo từng request của user). Dữ liệu luôn mới nhất, nhưng máy chủ phải hoạt động nhiều.\n• SSG (Static Site Generation): Đóng hộp sẵn 100 phần ăn từ 4h sáng (Build time). Khách đến là bốc phát ngay trong 0.01 giây qua CDN. Cực nhanh, siêu tiết kiệm server, nhưng không đổi được thực đơn trong ngày.\n• ISR (Incremental Static Regeneration): Vừa muốn nhanh như đồ hộp đóng sẵn (SSG), vừa muốn tự động cập nhật món mới mà không phải đóng cửa quán để nấu lại từ đầu (tự revalidate sau mỗi X giây ở chế độ nền).\n\n💡 Mẹo phỏng vấn: Khi nào dùng cái nào?\n• Trang tin tức, Landing Page, Blog, Tài liệu -> Chọn SSG.\n• Trang thương mại điện tử có hàng triệu sản phẩm -> Chọn ISR (revalidate: 60s).\n• Trang Dashboard cá nhân hóa tài khoản ngân hàng -> Chọn SSR hoặc CSR.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTrong Next.js App Router (từ phiên bản 13 trở lên), mặc định 100% component đều là React Server Components (RSC). Tức là code chỉ chạy trên máy chủ server, gửi về trình duyệt mã HTML siêu nhẹ và KHÔNG KÈM MÃ JAVASCRIPT nào.\nNhưng máy chủ thì làm sao biết người dùng bấm chuột vào đâu? Máy chủ cũng không có `localStorage` hay bàn phím!\nDo đó, chỉ thị `\"use client\";` đặt ở dòng 1 là chiếc cầu nối báo cho Next.js biết: \"Từ đây trở đi, hãy đóng gói JavaScript gửi xuống cho trình duyệt để người dùng có thể tương tác!\".\n\n💻 Khi nào BẮT BUỘC dùng `\"use client\"`:\n1. Dùng React Hooks: `useState`, `useEffect`, `useRef`, `useContext`.\n2. Dùng Event Listeners: `onClick`, `onChange`, `onSubmit`.\n3. Dùng API trình duyệt: `window`, `document`, `localStorage`, `navigator`.\n\n💡 Mẹo phỏng vấn:\nĐừng bao giờ bọc `\"use client\"` ở trang ngoài cùng (Page cha). Hãy đẩy nó xuống các component lá nhỏ nhất có thể (ví dụ chỉ bọc riêng cho nút bấm `<AddToCartButton />`) để giữ cho phần lớn trang web vẫn là Server Component giúp web đạt điểm tốc độ cao nhất.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nBot tìm kiếm của Google (Googlebot) hay crawler khi share link lên Facebook/Zalo hoạt động như một người đọc báo siêu lười.\n• Với React CSR truyền thống: Khi bot ghé thăm, nó chỉ nhìn thấy file HTML vỏn vẹn đúng 1 dòng: `<div id=\"root\"></div>`. Bot không rảnh chờ 3 giây để tải file JavaScript về chạy -> Bot kết luận trang web này trống rỗng -> Rớt hạng SEO thảm hại!\n• Với Next.js SSR / SSG: Máy chủ trả về ngay lập tức mã HTML hoàn chỉnh có sẵn tiêu đề `<h1>`, nội dung bài viết và thẻ `<meta property=\"og:title\">`. Bot đọc được nội dung trong 0.1 giây -> Lập chỉ mục (Index) ngay lập tức và hiển thị ảnh thumbnail cực đẹp khi chia sẻ link!\n\n💡 Mẹo phỏng vấn:\nNhắc thêm chỉ số Core Web Vitals của Google: FCP (First Contentful Paint) và LCP (Largest Contentful Paint) - thời gian hiển thị nội dung chính đầu tiên trên màn hình. SSR/SSG giúp điểm LCP xanh mướt (dưới 1.5 giây).",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ ngôi nhà):\n• `v-if`: Giống như việc bạn \"Đập bỏ hoàn toàn ngôi nhà\" khi không dùng đến, và khi cần thì \"Xây lại từ móng\" (phần tử bị xóa hoàn toàn khỏi cây DOM, hủy hết state và event listener).\n• `v-show`: Giống như bạn vẫn giữ nguyên ngôi nhà đó, chỉ \"Kéo rèm che lại\" (phần tử vẫn luôn nằm trong cây DOM, chỉ gắn thêm thuộc tính CSS `display: none`).\n\n💻 Khi nào dùng cái nào?\n• Dùng `v-show`: Khi thành phần đó bị bật/tắt liên tục hàng chục lần (ví dụ: Popup Modal, Menu Dropdown, Tab chuyển đổi, Tooltip). Vì chi phí chuyển đổi (Toggle cost) gần như bằng 0.\n• Dùng `v-if`: Khi điều kiện ít khi thay đổi (ví dụ: Khu vực dành riêng cho Admin - nếu user không phải admin thì không cần tạo sẵn trong DOM làm tốn RAM).\n\n💡 Mẹo phỏng vấn: Trong React, cú pháp tương đương `v-if` là `{isOpen && <Modal />}` (render có điều kiện), còn tương đương `v-show` là `<Modal style={{ display: isOpen ? 'block' : 'none' }} />`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ vé xe & bãi giữ xe):\n• Cookie: Giống như \"Vé xem phim giấy bạn tự cầm trong ví\" (lưu ở Client trình duyệt). Lần sau vào rạp bạn giơ vé ra. Nhược điểm: Dễ bị người khác móc túi hoặc sửa vé (xâm nhập bằng JavaScript XSS) nếu không cài cờ bảo vệ.\n• Session: Giống như \"Chiếc xe máy bạn gửi trong bãi đỗ xe an toàn của siêu thị\" (toàn bộ dữ liệu mật lưu ở Server). Bạn chỉ cầm duy nhất một mảnh vé nhựa có ghi mã số `Session ID = ABC123`. Khi bạn giơ thẻ ra, bảo vệ tự vào kho lấy xe ra cho bạn.\n\n💻 Thông số kỹ thuật cần nhớ:\n• Cookie lưu tối đa khoảng 4KB, tự động đính kèm vào mọi HTTP Request gửi lên server. Cần gắn cờ `HttpOnly` (chống JS đọc trộm) và `Secure` (chỉ gửi qua HTTPS).\n• Session lưu trên RAM server, database hoặc Redis (chuẩn nhất cho hệ thống phân tán nhiều server).\n\n💡 Mẹo phỏng vấn: Khi người phỏng vấn hỏi \"Làm sao duy trì đăng nhập giữa các microservices?\", hãy trả lời dùng JWT (JSON Web Token) lưu ở HttpOnly Cookie hoặc Session tập trung trên Redis Cache!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• GET: Dùng để LẤY dữ liệu (chỉ đọc, tham số nằm lộ trên URL `?page=1&limit=10`, trình duyệt tự động cache lại).\n• POST: Dùng để TẠO MỚI dữ liệu (dữ liệu giấu trong Request Body, an toàn và dung lượng không giới hạn).\n• PUT: Dùng để CẬP NHẬT THAY THẾ TOÀN BỘ một bản ghi đã tồn tại.\n\n💡 Khái niệm \"Idempotent\" (Ăn điểm tuyệt đối):\nNhà tuyển dụng rất thích hỏi từ này!\n• Idempotent nghĩa là: Bạn bấm gọi 1 lần hay bấm F5 gọi 100 lần liên tiếp thì trạng thái hệ thống vẫn y như vậy.\n  - `GET`, `PUT`, `DELETE` là Idempotent (sửa đè 100 lần thì bản ghi vẫn mang giá trị đó, xóa 100 lần thì bản ghi vẫn đã biến mất).\n  - `POST` KHÔNG PHẢI Idempotent (bạn bấm submit 5 lần sẽ tạo ra 5 đơn hàng khác nhau và trừ tiền 5 lần trong tài khoản!).\n\n💡 Mẹo mở rộng: Muốn cập nhật MỘT PHẦN thuộc tính (ví dụ chỉ đổi số điện thoại của user) thì chuẩn RESTful dùng `PATCH`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• `==` là \"So sánh ba phải\" (Type Coercion - tự ý ép kiểu ngầm định). Hai kiểu dữ liệu khác nhau nó cũng ráng ép về cùng 1 kiểu để so sánh.\n• `===` là \"So sánh nghiêm ngặt\" (Strict Equality). Yêu cầu cả KIỂU DỮ LIỆU lẫn GIÁ TRỊ phải giống hệt nhau 100%, không hề có bất kỳ sự ép kiểu nào.\n\n💻 Những bẫy \"kinh dị\" của `==` trong JavaScript:\n```javascript\n5 == '5'        // true (ép string sang number)\nfalse == 0      // true (ép boolean sang number)\nnull == undefined // true\n[] == false     // true (mảng rỗng ép về boolean)\n```\nNhưng với toán tử `===`: Tất cả 4 phép so sánh trên đều trả về `false`!\n\n💡 Mẹo phỏng vấn: Luôn khẳng định trong dự án thực tế, bạn và đội ngũ 100% sử dụng `===` (kết hợp ESLint rule `eqeqeq`) để triệt tiêu các lỗi logic ngầm cực kỳ nguy hiểm.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• DOM (Document Object Model): Cây phả hệ biểu diễn tài liệu HTML thành các đối tượng JavaScript, giúp bạn có thể dùng code để thêm, sửa, xóa thẻ HTML hoặc đổi màu CSS.\n• `document.getElementById('my-id')`: Giống như bạn tìm người qua Số Căn cước công dân duy nhất. Engine trình duyệt tìm trực tiếp trong Bảng băm (Hash Table) với độ phức tạp O(1) siêu nhanh.\n• `document.querySelector('.container > button.active')`: Giống như bạn cầm bản mô tả nhận dạng đi rà soát từng người trong phòng. Cú pháp cực kỳ linh hoạt (nhận mọi CSS selector), nhưng tốn CPU hơn một chút để duyệt cây.\n\n💡 Mẹo phỏng vấn: Nếu chỉ cần lấy 1 phần tử theo ID cố định, hãy ưu tiên `getElementById`. Nếu cần tìm phần tử theo class lồng nhau hoặc thuộc tính động `[data-status=\"active\"]`, hãy dùng `querySelector`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ đóng gói hộp quà):\n• Content: Món quà quý giá bên trong.\n• Padding: Lớp xốp đệm bọc xung quanh món quà bên trong hộp.\n• Border: Vỏ hộp carton cứng bên ngoài.\n• Margin: Khoảng cách từ hộp quà của bạn đẩy lùi hộp quà của người khác để chúng không chạm vào nhau.\n\n💻 Bẫy CSS kinh điển:\nMặc định trong CSS (`box-sizing: content-box`), khi bạn set `width: 200px` rồi thêm `padding: 20px`, cái hộp sẽ bị phình to thành 240px làm vỡ tung layout giao diện!\n\n💡 Mẹo phỏng vấn:\nLuôn khai báo ở dòng đầu tiên của file CSS:\n```css\n* {\n  box-sizing: border-box;\n}\n```\nKhi đó dù bạn có thêm padding hay border bao nhiêu thì chiều rộng tổng thể của phần tử vẫn giữ nguyên đúng 200px như thiết kế!",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• DOM (Document Object Model): Cây phả hệ biểu diễn tài liệu HTML thành các đối tượng JavaScript, giúp bạn có thể dùng code để thêm, sửa, xóa thẻ HTML hoặc đổi màu CSS.\n• `document.getElementById('my-id')`: Giống như bạn tìm người qua Số Căn cước công dân duy nhất. Engine trình duyệt tìm trực tiếp trong Bảng băm (Hash Table) với độ phức tạp O(1) siêu nhanh.\n• `document.querySelector('.container > button.active')`: Giống như bạn cầm bản mô tả nhận dạng đi rà soát từng người trong phòng. Cú pháp cực kỳ linh hoạt (nhận mọi CSS selector), nhưng tốn CPU hơn một chút để duyệt cây.\n\n💡 Mẹo phỏng vấn: Nếu chỉ cần lấy 1 phần tử theo ID cố định, hãy ưu tiên `getElementById`. Nếu cần tìm phần tử theo class lồng nhau hoặc thuộc tính động `[data-status=\"active\"]`, hãy dùng `querySelector`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTừ những năm 1995, hành vi mặc định của thẻ `<form>` trong HTML là khi bấm Submit, trình duyệt sẽ gửi request đồng bộ và TẢI LẠI TOÀN BỘ TRANG WEB (Page Reload).\nTrong các ứng dụng web hiện đại (SPA như React, Vue, Next.js), nếu trang web bị reload thì:\n1. Toàn bộ state trên RAM bị xóa sạch.\n2. Màn hình bị chớp trắng giật cục làm trải nghiệm người dùng cực tệ.\n\nVì vậy, lập trình viên gọi `event.preventDefault()` để chặn đứng hành vi reload trang cổ lỗ sĩ đó, mở đường cho việc validate dữ liệu bằng JavaScript và gửi request ngầm qua `fetch()` hoặc `axios` mà màn hình vẫn đứng yên mượt mà!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ thẻ rung trà sữa):\nBạn đến quán gọi món trà sữa. Thu ngân đưa cho bạn một chiếc \"Thẻ rung báo lấy đồ\" (đó chính là Callback). Trong lúc chờ pha chế (tác vụ bất đồng bộ mất 5 phút), bạn thoải mái ngồi lướt TikTok hoặc trò chuyện (Non-blocking I/O). Khi trà sữa làm xong, thẻ rung lên bạn mới ra quầy lấy đồ.\n\nCallback Hell là gì?\nNếu bạn phải đợi làm trà sữa -> xong lại cầm thẻ đợi nướng bánh -> xong lại cầm thẻ đợi đóng gói... Các hàm callback lồng nhau 7-8 tầng hình kim tự tháp (Pyramid of Doom), khiến code thụt lề sâu hoắm, đọc đau mắt và nếu có lỗi thì không biết văng ra ở tầng nào!\n\n💡 Mẹo phỏng vấn:\nTrình bày lịch sử tiến hóa của JavaScript:\n1. Giai đoạn sơ khai: Dùng Callback (dễ dính Callback Hell).\n2. ES6 (2015): Ra mắt `Promise` với chuỗi `.then().catch()`.\n3. ES8 (2017): Đỉnh cao `async/await` - viết mã bất đồng bộ trông tuần tự, sáng sủa y hệt mã đồng bộ và bắt lỗi nhẹ nhàng bằng khối `try-catch`.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ tháo lắp xe đạp):\n• `JSON.stringify(object)`: Giống như bạn tháo rời chiếc xe đạp ra và đóng gói gọn gàng vào thùng các-tông (Biến đổi Object/Array trong RAM thành chuỗi văn bản Text thuần túy) để có thể gửi bưu điện qua đường truyền mạng internet hoặc lưu vào localStorage.\n• `JSON.parse(string)`: Giống như người nhận mở thùng các-tông và lắp ráp các bộ phận lại thành chiếc xe đạp hoàn chỉnh (Phân tích chuỗi Text thành JavaScript Object) để có thể leo lên chạy (`user.name`).\n\n💡 Bẫy phỏng vấn hay gài:\n1. `JSON.stringify()` sẽ tự động vứt bỏ các thuộc tính chứa hàm `function()`, `undefined` hoặc `Symbol`.\n2. Nếu chuỗi truyền vào `JSON.parse()` bị sai cú pháp (ví dụ thiếu dấu ngoặc kép, thừa dấu phẩy cuối cùng), nó sẽ quăng lỗi `SyntaxError` làm sập luôn ứng dụng nếu bạn không bọc trong khối `try-catch`!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ quán ăn 1 bồi bàn):\nKhông giống như Tomcat/Java truyền thống (mỗi khách hàng là 1 nhân viên phục vụ riêng - Thread-per-request, 10.000 khách là tốn 10.000 luồng làm nghẽn RAM), Node.js chỉ có DUY NHẤT 1 người bồi bàn (Single Main Thread).\n• Khi khách gọi món hầm (I/O tốn thời gian như đọc file, query DB, gọi API bên thứ ba): Bồi bàn ghi phiếu rồi chuyển ngay cho nhà bếp (libuv thread pool chạy ngầm trong OS). Bồi bàn không hề đứng chờ mà quay sang nhận order của khách tiếp theo ngay lập tức (Non-blocking).\n• Khi bếp nấu xong, chuông reo (Event Loop), bồi bàn mới bưng món ra cho khách.\n\n💡 Điểm yếu chí mạng của Node.js:\nNếu có 1 vị khách bắt bồi bàn ngồi giải phương trình tích phân bậc 4 (tác vụ CPU-intensive như mã hóa video, nén file zip lớn, AI model), người bồi bàn sẽ bị kẹt cứng và HÀNG NGHÌN KHÁCH HÀNG KHÁC PHÍA SAU BỊ TREO HOÀN TOÀN! Do đó với tác vụ CPU nặng, người ta dùng Worker Threads hoặc chuyển sang dùng Go/Java.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nGit Conflict xảy ra khi 2 lập trình viên cùng sửa đổi trên CÙNG MỘT DÒNG CODE ở 2 nhánh khác nhau, khiến Git không biết nên nghe theo ai.\nQuy trình xử lý chuẩn của một kỹ sư chuyên nghiệp:\n1. Mở file xung đột lên (chú ý các dấu mốc `<<<<<<< HEAD` và `>>>>>>>`).\n2. Trao đổi trực tiếp với người đồng đội đã viết đoạn code đó để thống nhất giữ code nào, bỏ code nào hoặc kết hợp cả hai.\n3. Chỉnh sửa code, xóa sạch các dấu mốc xung đột của Git.\n4. Chạy lại bài test kiểm tra xem ứng dụng còn chạy tốt không.\n5. Thực hiện `git add` và `git commit` để hoàn tất việc giải quyết conflict.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nUnit Test là việc kiểm thử ở mức độ nhỏ nhất: kiểm tra từng hàm/method đơn lẻ của một Class xem có cho kết quả đúng như kỳ vọng hay không.\nTại sao Unit Test cực kỳ quan trọng?\nTheo mô hình Kim Tự Tháp Kiểm Thử (Testing Pyramid): Unit Test có tốc độ chạy nhanh nhất (vài mili-giây) và chi phí sửa lỗi rẻ nhất. Phát hiện bug ngay lúc viết code giúp bạn tự tin Refactor (tối ưu cấu trúc) mã nguồn trong tương lai mà không sợ làm hỏng các tính năng cũ đang chạy ổn định.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nTrong mô hình Agile/Scrum, một chu kỳ phát triển gọi là **Sprint**, thường kéo dài từ **1 đến 4 tuần** (phổ biến nhất là 2 tuần).\nMỗi Sprint bắt buộc gồm 4 sự kiện cốt lõi:\n1. Sprint Planning (Đầu Sprint): Họp lên kế hoạch chọn các công việc sẽ làm.\n2. Daily Scrum (Hàng ngày 15 phút): Báo cáo 3 câu hỏi (Hôm qua làm gì? Hôm nay làm gì? Có khó khăn gì cản trở không?).\n3. Sprint Review (Cuối Sprint): Demo sản phẩm chạy được cho khách hàng/Product Owner xem và nhận góp ý.\n4. Sprint Retrospective (Họp cải tiến nội bộ): Đội ngũ cùng nhìn lại xem Sprint qua điều gì làm tốt, điều gì làm dở và cần cải tiến hành động gì trong Sprint tới.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nĐể phỏng vấn thể hiện tư duy kiểm thử sâu sắc của một kỹ sư phần mềm, đừng chỉ nói \"kiểm tra đúng pass thì vào\". Phải liệt kê đủ 4 nhóm test cases:\n1. Luồng chuẩn (Happy Path): Nhập đúng username/password -> Đăng nhập thành công, chuyển hướng trang đúng, lưu token vào cookie.\n2. Luồng lỗi nghiệp vụ (Bad Cases): Sai mật khẩu, tài khoản chưa kích hoạt email, tài khoản bị admin khóa.\n3. Kiểm tra tính hợp lệ (Validation): Để trống ô nhập, nhập ký tự đặc biệt, email sai định dạng.\n4. Bảo mật & Tấn công (Security): Thử tấn công SQL Injection (`' OR 1=1 --`), tấn công XSS, và cơ chế Rate Limiting (nhập sai 5 lần liên tiếp thì tạm khóa tài khoản 15 phút để chống Brute-force).",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nMột dự án phần mềm chuyên nghiệp luôn có ít nhất 3 môi trường tách biệt:\n1. Dev (Development): Môi trường máy cá nhân của lập trình viên để tha hồ viết và test code nháp.\n2. Staging / UAT: Môi trường có cấu hình giống hệt máy chủ thật để đội tester và khách hàng vào nghiệm thu tính năng.\n3. Production (Prod): Môi trường máy chủ thật đang phục vụ hàng triệu người dùng thực tế.\nFile `prod.env` chứa các biến môi trường nhạy cảm của server thật (URL Database thật, API Key thanh toán thật, Secret Key JWT) và TUYỆT ĐỐI KHÔNG ĐƯỢC PUSH LÊN GITHUB CÔNG KHAI để tránh bị lộ lọt dữ liệu.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ diễn viên đóng thế):\nKhi viết Unit Test cho tầng `UserService`, mục tiêu là chỉ kiểm tra xem logic tính toán của UserService có đúng hay không. Bạn KHÔNG MUỐN kết nối vào Database thật (vì DB thật chạy chậm và làm bẩn dữ liệu).\nMockito là thư viện tạo ra các \"Diễn viên đóng thế\" (Mock objects):\n• `@Mock UserRepository userRepository`: Tạo một repository giả.\n• `when(userRepository.findByEmail(\"a@gmail.com\")).thenReturn(Optional.of(fakeUser))`: Dạy cho diễn viên giả cách trả lời kịch bản.\n• `@InjectMocks UserService userService`: Tự động nhét các diễn viên giả này vào UserService để bạn an tâm test độc lập.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Manual Testing (Thủ công): Con người tự click chuột và gõ phím. Cực kỳ tốt ở giai đoạn đầu của tính năng mới, kiểm tra cảm nhận người dùng (UX) và kiểm thử khám phá (Exploratory Testing). Nhược điểm: Chậm, tốn nhân lực và dễ sai sót khi phải lặp lại.\n• Automation Testing (Tự động): Dùng code kịch bản (Selenium, Playwright, JUnit) chạy tự động. Thích hợp nhất cho **Kiểm thử hồi quy (Regression Testing)**: Mỗi khi lập trình viên sửa code và tạo Pull Request lên Git, kịch bản tự động chạy lại 500 bài test trong 2 phút để đảm bảo không có tính năng cũ nào bị hỏng.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\n• Waterfall (Thác nước): Làm tuần tự như xây nhà bê-tông (Phân tích 3 tháng -> Thiết kế 2 tháng -> Lập trình 6 tháng -> Test 3 tháng). Khách hàng phải đợi 1 năm mới nhìn thấy phần mềm. Rủi ro khổng lồ: Nếu sau 1 năm khách đổi ý thì toàn bộ dự án bị đập đi xây lại!\n• Agile / Scrum (Linh hoạt): Chia nhỏ thành từng chu kỳ ngắn 2 tuần (Sprint). Cứ sau 2 tuần là bàn giao 1 tính năng chạy được cho khách hàng sờ tận tay và góp ý ngay. Nhờ vậy thích ứng cực nhanh với thay đổi của thị trường và giảm thiểu rủi ro thất bại.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Kiến trúc tìm kiếm chịu tải cao):\nKhi thiết kế ô tìm kiếm Shopee/Lazada, nếu người dùng gõ chữ \"áo\" mà backend query thẳng vào Database `SELECT * FROM sp WHERE ten LIKE '%áo%'` thì Database sẽ sập ngay lập tức!\nLuồng xử lý kiến trúc chuẩn Backend:\n1. Phía Client: Áp dụng **Debounce** (chờ user ngừng gõ phím 300-500ms mới phát request).\n2. Tầng Caching: Kiểm tra từ khóa trong **Redis Cache** trước. Nếu có sẵn trong cache -> Trả về ngay trong 2 mili-giây.\n3. Nếu Cache Miss: Dùng Search Engine chuyên dụng (**Elasticsearch**) hoặc truy vấn CSDL có đánh chỉ mục (Fulltext Index).\n4. Luôn luôn **Phân trang (Pagination)**: Chỉ trả về 20 kết quả đầu tiên và chỉ chọn những cột cần thiết (`id, name, thumbnail, price`), không bao giờ dùng `SELECT *`.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nLLM (Large Language Model - Mô hình ngôn ngữ lớn như GPT-4, Claude, Gemini) là mạng nơ-ron học sâu được huấn luyện trên hàng nghìn tỷ từ ngữ từ khắp Internet.\nVề bản chất xác suất: LLM hoạt động bằng cách dự đoán từ ngữ tiếp theo (Next-token prediction) có khả năng xuất hiện cao nhất dựa trên ngữ cảnh được cung cấp.\nTrong phát triển phần mềm, LLM được ứng dụng để: Tự động hoàn thành code (Autocompletion), giải thích các đoạn mã phức tạp (Code explanation), tạo Unit Test tự động, phát hiện lỗ hổng bảo mật và hỗ trợ giải quyết lỗi (Debugging).",
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
      "explanation": "🎯 Bản chất dễ hiểu (Công thức Prompt chuẩn 5 thành phần):\nĐể AI không trả lời lan man hoặc sinh ra code rác, một Prompt chuyên nghiệp cần có đủ 5 yếu tố:\n1. Role (Vai trò): \"Bạn là chuyên gia Senior Spring Boot & Database Architect.\"\n2. Context (Bối cảnh): \"Tôi đang xây dựng API giỏ hàng cho trang thương mại điện tử Next.js kết nối MongoDB.\"\n3. Task (Yêu cầu cụ thể): \"Hãy viết 1 API thêm sản phẩm vào giỏ hàng, có xử lý trừ số lượng tồn kho.\"\n4. Constraints (Ràng buộc): \"Sử dụng Java 17, xử lý Transaction bằng @Transactional, kiểm tra trường hợp tồn kho bằng 0 thì báo lỗi OutOfStockException.\"\n5. Output Format (Định dạng đầu ra): \"Chỉ trả về mã nguồn Service và DTO, có kèm chú thích tiếng Việt ngắn gọn.\"",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nCode do AI sinh ra rất hay gặp hiện tượng **Ảo giác (Hallucination)** - tức là AI tự bịa ra những hàm hoặc thư viện hoàn toàn không tồn tại, hoặc sinh code có lỗ hổng bảo mật tiềm ẩn.\nQuy trình của một kỹ sư phần mềm khi dùng code AI:\n1. Đọc hiểu từng dòng code, không bao giờ Copy-Paste mù quáng.\n2. Viết Unit Test để xác minh tính đúng đắn với các trường hợp biên (Edge Cases).\n3. Kiểm tra bảo mật: Xem có bị lỗi SQL Injection, Hardcode mật khẩu hoặc rò rỉ dữ liệu nhạy cảm hay không.\n4. Tối ưu lại cho đúng chuẩn quy ước mã nguồn (Coding Conventions) của dự án.",
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
      "explanation": "🎯 Bản chất dễ hiểu (Ẩn dụ Tư vấn viên vs Nhân viên thực thi):\n• Chatbot AI (như ChatGPT giao diện web): Hoạt động theo cơ chế Single-turn Request/Response. Bạn hỏi 1 câu thì nó trả lời 1 đoạn văn bản rồi đứng yên đó chờ lệnh tiếp theo. Nó không thể tự chạm vào máy tính của bạn.\n• AI Agent (như Antigravity, Devin, Claude Code): Là một thực thể có trí tuệ tự hành (Autonomous Agency). Nó có:\n  1. Mục tiêu (Goal): Nhận 1 nhiệm vụ lớn phức tạp.\n  2. Lập kế hoạch (Planning & Reasoning): Tự chia nhiệm vụ thành 10 bước nhỏ.\n  3. Sử dụng công cụ (Tool Use): Tự mở terminal chạy lệnh build, tự đọc file, tự sửa mã nguồn, tự chạy test.\n  4. Tự sửa sai (Self-Correction): Nếu test báo đỏ, Agent tự phân tích lỗi và sửa lại code cho đến khi test xanh mới thôi!",
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
      "explanation": "🎯 Bản chất dễ hiểu (Cuốn sổ tay chỉ dẫn dự án):\nKhi bạn mới vào công ty, đồng đội đưa cho bạn cuốn sổ tay hướng dẫn dự án: Công ty dùng tech stack gì, code đặt ở thư mục nào, quy tắc đặt tên ra sao, cách chạy test thế nào.\nFile `claude.md` hoặc `AGENTS.md` chính là \"Cuốn sổ tay hướng dẫn dành riêng cho AI Coding Assistant\".\nNó cung cấp ngữ cảnh hệ thống bền vững (Persistent System Context) để mỗi khi AI tham gia vào dự án, nó luôn tuân thủ 100% chuẩn mực kỹ thuật của đội ngũ, không tự ý cài thư viện lung tung hoặc sinh code lạc quẻ.",
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
      "explanation": "🎯 Bản chất dễ hiểu:\nMô hình LLM sinh văn bản theo từng từ một (Autoregressive generation - từng token nối tiếp nhau).\nNếu bạn đợi AI viết xong toàn bộ bài văn 1.000 từ rồi mới gửi về qua HTTP response thông thường, người dùng sẽ phải ngồi nhìn màn hình quay quay trong 20-30 giây (trải nghiệm cực kỳ tệ và tưởng ứng dụng bị đơ).\nBằng cách sử dụng **Server-Sent Events (SSE)** với header `Content-Type: text/event-stream`:\nBackend sẽ \"bắn\" từng chữ (token) về trình duyệt ngay khi nó vừa được AI nghĩ ra trong vòng 0.5 giây đầu tiên. Người dùng nhìn thấy con trỏ gõ chữ từng ký tự mượt mà trước mắt, tạo cảm giác hệ thống phản hồi tức thì!",
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
