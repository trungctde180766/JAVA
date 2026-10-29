# 🎓 Java Quiz Master - Web Application

Frontend & Backend Next.js application for Java Quiz Master.

## 🚀 Quick Start

1. Cài đặt dependencies:
   ```bash
   npm install
   ```

2. Tạo file `.env.local` (tham khảo `.env.example`):
   ```ini
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   MONGODB_DB=javaquiz
   JWT_SECRET=your-secret-key-at-least-32-chars
   ```

3. Khởi động môi trường phát triển:
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

4. Nạp lại cơ sở dữ liệu nếu cần:
   ```bash
   npm run seed
   ```

Chi tiết xem tại [README.md chính](../README.md).
