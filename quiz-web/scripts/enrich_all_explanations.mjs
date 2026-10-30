import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read current interviewData.js
const currentData = await import("../lib/interviewData.js");

console.log("Starting deep enrichment of all 86 interview explanations...");

// Mapping of enhanced explanations: key is question id
const explanationsMap = {
  // ==========================================
  // 1. REACT & NEXT.JS (ir01 - ir09)
  // ==========================================
  "ir01": `🎯 Bản chất dễ hiểu (Ẩn dụ bản vẽ nháp):
Hãy tưởng tượng bạn muốn sửa một ngôi nhà 10 tầng.
• Real DOM giống như bạn mang búa đập tường gạch xây lại ngay lập tức: cực kỳ tốn công sức, bụi bặm và làm rung lắc cả tòa nhà (trình duyệt phải tính toán lại Layout và vẽ lại Pixel - Reflow & Repaint).
• Virtual DOM giống như bạn lấy bút chì sửa trên một bản vẽ nháp 3D trong máy tính (RAM). Bạn có thể tẩy xóa, thay đổi 100 lần trên bản vẽ siêu nhanh. Sau khi chốt phương án cuối cùng, bạn so sánh bản vẽ mới với bản vẽ cũ (thuật toán Diffing) và chỉ cho thợ đến sửa đúng 1 viên gạch bị hỏng (Reconciliation & Batching).

💻 Ví dụ thực tế:
Trong danh sách 1.000 sản phẩm Shopee, khi người dùng bấm nút "Thích" ở sản phẩm số 500:
Nhờ Virtual DOM, React chỉ tìm ra đúng icon trái tim đổi từ màu xám sang đỏ và cập nhật đúng 1 thẻ <i> đó trên màn hình, 999 sản phẩm còn lại hoàn toàn không bị vẽ lại!

💡 Mẹo phỏng vấn & Ghi điểm:
Nhớ 2 từ khóa kỹ thuật đắt giá: "Diffing Algorithm" (so sánh 2 cây ảo với độ phức tạp O(n)) và "Batching" (gộp nhiều thay đổi state liên tiếp để render 1 lần duy nhất). Tránh nói "Virtual DOM luôn nhanh hơn DOM thật" mà hãy nói "Virtual DOM giúp tối ưu số lần chạm vào Real DOM".`,

  "ir02": `🎯 Bản chất dễ hiểu:
KHÔNG! Virtual DOM không phải là phép thuật và KHÔNG LUÔN LUÔN nhanh hơn Real DOM thật trong mọi tình huống.

Tại sao?
Bản thân việc tạo ra các JavaScript Object để làm Virtual DOM trên RAM và chạy thuật toán so sánh Diffing giữa 2 cây cũng tốn CPU và bộ nhớ.
• Với trang web đơn giản: Chỉ có 1 nút bấm đổi màu chữ, việc viết JavaScript thuần \`document.getElementById('btn').style.color = 'red'\` chạy thẳng vào Real DOM trong 0.001 mili-giây, nhanh hơn React rất nhiều (vì React phải qua 5-6 bước tạo VDOM, so sánh rồi mới đụng vào Real DOM).

💻 Ví dụ thực tế:
Các framework hiện đại như Svelte không hề dùng Virtual DOM. Svelte biên dịch code ngay lúc build time thành các lệnh thao tác trực tiếp vào Real DOM nên chạy nhanh và nhẹ hơn React trong các bài test hiệu năng đơn giản.

💡 Mẹo phỏng vấn (Bẫy nhà tuyển dụng hay gài):
Người phỏng vấn hỏi câu này để xem bạn có "thần thánh hóa" React hay không.
Hãy trả lời: "Lợi thế lớn nhất của Virtual DOM không phải là đánh bại Real DOM ở các thao tác đơn lẻ, mà là mang lại trải nghiệm lập trình Khai báo (Declarative UI - UI = f(state)) và đảm bảo hiệu năng 'ĐỦ TỐT' (predictable performance) cho các ứng dụng quy mô khổng lồ hàng nghìn component phức tạp". Trả lời như vậy bạn sẽ đạt điểm tuyệt đối!`,

  "ir03": `🎯 Bản chất dễ hiểu (Ẩn dụ đời sống):
• Props (Properties) giống như "Họ tên hoặc Gen di truyền do bố mẹ đặt cho bạn": Do component cha truyền xuống cho component con. Component con chỉ được phép đọc (Read-only / Immutable), tuyệt đối KHÔNG ĐƯỢC tự ý sửa đổi props của chính mình.
• State giống như "Tâm trạng hoặc Tiền trong ví của chính bạn": Do chính component đó tự khai báo, tự quản lý và có thể thay đổi bất cứ lúc nào qua hàm setter (như \`setCount\`). Khi state thay đổi, component sẽ tự động re-render để cập nhật giao diện mới.

💻 Ví dụ code thực tế:
\`\`\`jsx
// Component Cha:
<UserProfile username="trung_admin" /> // "trung_admin" là PROPS truyền xuống

// Component Con (UserProfile):
function UserProfile({ username }) {
  // username là read-only, không được gán username = "khac"
  const [isOnline, setIsOnline] = useState(true); // isOnline là STATE nội tại
  return <div>{username} - {isOnline ? "🟢 Đang online" : "⚪ Vắng mặt"}</div>;
}
\`\`\`

💡 Mẹo phỏng vấn & Câu hỏi mở rộng:
"Nếu component con muốn thay đổi dữ liệu của component cha thì làm thế nào?"
-> Trả lời: Áp dụng kỹ thuật "Lifting State Up" (Nâng state lên cha). Component cha truyền 1 hàm callback xuống làm props cho con, khi con cần đổi dữ liệu sẽ gọi hàm callback đó để cha tự update state của mình.`,

  "ir04": `🎯 Bản chất dễ hiểu:
• \`useState\`: Chuyên lo phần "Dữ liệu hiển thị" trên màn hình. Cứ mỗi lần state đổi giá trị -> React tự động vẽ lại (re-render) component.
• \`useEffect\`: Chuyên lo các công việc "Hậu trường / Tác vụ phụ" (Side Effects) diễn ra SAU KHI giao diện đã được vẽ xong lên màn hình: gọi API backend lấy dữ liệu, lắng nghe sự kiện cuộn trang, hẹn giờ \`setInterval\`, hoặc đổi tiêu đề trang web \`document.title\`.

💻 Ví dụ thực tế (Trang bảng tin):
\`\`\`jsx
function NewsFeed() {
  const [posts, setPosts] = useState([]); // 1. State lưu bài viết

  useEffect(() => {
    // 2. Chạy sau khi giao diện hiện lên: Gọi API lấy bài viết từ server
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []); // 3. [] rỗng nghĩa là chỉ chạy 1 lần duy nhất khi vừa vào trang
}
\`\`\`

💡 Bẫy phỏng vấn kinh điển (Infinite Loop):
Nếu bạn gọi \`setPosts()\` bên trong \`useEffect\` mà KHÔNG CÓ mảng dependencies \`[]\`, component sẽ re-render liên tục vô tận (State đổi -> Render -> Chạy useEffect -> State lại đổi -> Lại render...) làm treo đơ trình duyệt của người dùng!`,

  "ir05": `🎯 Bản chất dễ hiểu (Ẩn dụ tủ lạnh):
• \`useMemo\`: Ghi nhớ "KẾT QUẢ của món ăn" (đã nấu xong rồi cất vào tủ lạnh, lần sau đói lấy ra ăn ngay chứ không nấu lại từ đầu).
• \`useCallback\`: Ghi nhớ "CÔNG THỨC / ĐỊNH NGHĨA HÀM" (giữ nguyên con trỏ hàm ở vùng nhớ cũ, không đẻ ra con trỏ hàm mới mỗi lần re-render).

💻 Ví dụ thực tế:
\`\`\`jsx
// useMemo: items có 50.000 sản phẩm, chỉ tính tổng lại khi mảng items thay đổi
const totalPrice = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);

// useCallback: Giữ nguyên hàm handleDelete để truyền xuống component con <ProductItem />
// Giúp ProductItem (được bọc React.memo) không bị re-render oan uổng
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(x => x.id !== id));
}, []);
\`\`\`

💡 Mẹo phỏng vấn:
"Có nên bọc useMemo và useCallback cho TẤT CẢ biến và hàm trong dự án không?"
-> Trả lời: TUYỆT ĐỐI KHÔNG! Bản thân việc gọi hook và duy trì mảng dependencies cũng tiêu tốn bộ nhớ RAM và CPU. Chỉ dùng khi phép tính thực sự nặng (xử lý hàng nghìn phần tử) hoặc khi truyền hàm xuống component con nặng có áp dụng \`React.memo\`.`,

  "ir06": `🎯 Bản chất dễ hiểu (Ẩn dụ gọi món nhà hàng):
• CSR (Client-Side Rendering): Nhà hàng phát cho bạn nguyên liệu tươi mang về nhà tự nấu (Server chỉ gửi file HTML rỗng + file JS to, trình duyệt của bạn tự chạy JS để vẽ UI). Lần đầu mở web sẽ hơi chậm, nhưng khi đã tải xong thì chuyển trang mượt như bơ.
• SSR (Server-Side Rendering): Khách gọi món nào, đầu bếp trong bếp nấu ngay lập tức trên chảo nóng món đó rồi bưng ra (Server render HTML tươi mới theo từng request của user). Dữ liệu luôn mới nhất, nhưng máy chủ phải hoạt động nhiều.
• SSG (Static Site Generation): Đóng hộp sẵn 100 phần ăn từ 4h sáng (Build time). Khách đến là bốc phát ngay trong 0.01 giây qua CDN. Cực nhanh, siêu tiết kiệm server, nhưng không đổi được thực đơn trong ngày.
• ISR (Incremental Static Regeneration): Vừa muốn nhanh như đồ hộp đóng sẵn (SSG), vừa muốn tự động cập nhật món mới mà không phải đóng cửa quán để nấu lại từ đầu (tự revalidate sau mỗi X giây ở chế độ nền).

💡 Mẹo phỏng vấn: Khi nào dùng cái nào?
• Trang tin tức, Landing Page, Blog, Tài liệu -> Chọn SSG.
• Trang thương mại điện tử có hàng triệu sản phẩm -> Chọn ISR (revalidate: 60s).
• Trang Dashboard cá nhân hóa tài khoản ngân hàng -> Chọn SSR hoặc CSR.`,

  "ir07": `🎯 Bản chất dễ hiểu:
Trong Next.js App Router (từ phiên bản 13 trở lên), mặc định 100% component đều là React Server Components (RSC). Tức là code chỉ chạy trên máy chủ server, gửi về trình duyệt mã HTML siêu nhẹ và KHÔNG KÈM MÃ JAVASCRIPT nào.
Nhưng máy chủ thì làm sao biết người dùng bấm chuột vào đâu? Máy chủ cũng không có \`localStorage\` hay bàn phím!
Do đó, chỉ thị \`"use client";\` đặt ở dòng 1 là chiếc cầu nối báo cho Next.js biết: "Từ đây trở đi, hãy đóng gói JavaScript gửi xuống cho trình duyệt để người dùng có thể tương tác!".

💻 Khi nào BẮT BUỘC dùng \`"use client"\`:
1. Dùng React Hooks: \`useState\`, \`useEffect\`, \`useRef\`, \`useContext\`.
2. Dùng Event Listeners: \`onClick\`, \`onChange\`, \`onSubmit\`.
3. Dùng API trình duyệt: \`window\`, \`document\`, \`localStorage\`, \`navigator\`.

💡 Mẹo phỏng vấn:
Đừng bao giờ bọc \`"use client"\` ở trang ngoài cùng (Page cha). Hãy đẩy nó xuống các component lá nhỏ nhất có thể (ví dụ chỉ bọc riêng cho nút bấm \`<AddToCartButton />\`) để giữ cho phần lớn trang web vẫn là Server Component giúp web đạt điểm tốc độ cao nhất.`,

  "ir08": `🎯 Bản chất dễ hiểu:
Bot tìm kiếm của Google (Googlebot) hay crawler khi share link lên Facebook/Zalo hoạt động như một người đọc báo siêu lười.
• Với React CSR truyền thống: Khi bot ghé thăm, nó chỉ nhìn thấy file HTML vỏn vẹn đúng 1 dòng: \`<div id="root"></div>\`. Bot không rảnh chờ 3 giây để tải file JavaScript về chạy -> Bot kết luận trang web này trống rỗng -> Rớt hạng SEO thảm hại!
• Với Next.js SSR / SSG: Máy chủ trả về ngay lập tức mã HTML hoàn chỉnh có sẵn tiêu đề \`<h1>\`, nội dung bài viết và thẻ \`<meta property="og:title">\`. Bot đọc được nội dung trong 0.1 giây -> Lập chỉ mục (Index) ngay lập tức và hiển thị ảnh thumbnail cực đẹp khi chia sẻ link!

💡 Mẹo phỏng vấn:
Nhắc thêm chỉ số Core Web Vitals của Google: FCP (First Contentful Paint) và LCP (Largest Contentful Paint) - thời gian hiển thị nội dung chính đầu tiên trên màn hình. SSR/SSG giúp điểm LCP xanh mướt (dưới 1.5 giây).`,

  "ir09": `🎯 Bản chất dễ hiểu (Ẩn dụ ngôi nhà):
• \`v-if\`: Giống như việc bạn "Đập bỏ hoàn toàn ngôi nhà" khi không dùng đến, và khi cần thì "Xây lại từ móng" (phần tử bị xóa hoàn toàn khỏi cây DOM, hủy hết state và event listener).
• \`v-show\`: Giống như bạn vẫn giữ nguyên ngôi nhà đó, chỉ "Kéo rèm che lại" (phần tử vẫn luôn nằm trong cây DOM, chỉ gắn thêm thuộc tính CSS \`display: none\`).

💻 Khi nào dùng cái nào?
• Dùng \`v-show\`: Khi thành phần đó bị bật/tắt liên tục hàng chục lần (ví dụ: Popup Modal, Menu Dropdown, Tab chuyển đổi, Tooltip). Vì chi phí chuyển đổi (Toggle cost) gần như bằng 0.
• Dùng \`v-if\`: Khi điều kiện ít khi thay đổi (ví dụ: Khu vực dành riêng cho Admin - nếu user không phải admin thì không cần tạo sẵn trong DOM làm tốn RAM).

💡 Mẹo phỏng vấn: Trong React, cú pháp tương đương \`v-if\` là \`{isOpen && <Modal />}\` (render có điều kiện), còn tương đương \`v-show\` là \`<Modal style={{ display: isOpen ? 'block' : 'none' }} />\`.`,

  // ==========================================
  // 2. WEB & JAVASCRIPT (iw01 - iw10)
  // ==========================================
  "iw01": `🎯 Bản chất dễ hiểu (Ẩn dụ vé xe & bãi giữ xe):
• Cookie: Giống như "Vé xem phim giấy bạn tự cầm trong ví" (lưu ở Client trình duyệt). Lần sau vào rạp bạn giơ vé ra. Nhược điểm: Dễ bị người khác móc túi hoặc sửa vé (xâm nhập bằng JavaScript XSS) nếu không cài cờ bảo vệ.
• Session: Giống như "Chiếc xe máy bạn gửi trong bãi đỗ xe an toàn của siêu thị" (toàn bộ dữ liệu mật lưu ở Server). Bạn chỉ cầm duy nhất một mảnh vé nhựa có ghi mã số \`Session ID = ABC123\`. Khi bạn giơ thẻ ra, bảo vệ tự vào kho lấy xe ra cho bạn.

💻 Thông số kỹ thuật cần nhớ:
• Cookie lưu tối đa khoảng 4KB, tự động đính kèm vào mọi HTTP Request gửi lên server. Cần gắn cờ \`HttpOnly\` (chống JS đọc trộm) và \`Secure\` (chỉ gửi qua HTTPS).
• Session lưu trên RAM server, database hoặc Redis (chuẩn nhất cho hệ thống phân tán nhiều server).

💡 Mẹo phỏng vấn: Khi người phỏng vấn hỏi "Làm sao duy trì đăng nhập giữa các microservices?", hãy trả lời dùng JWT (JSON Web Token) lưu ở HttpOnly Cookie hoặc Session tập trung trên Redis Cache!`,

  "iw02": `🎯 Bản chất dễ hiểu:
• GET: Dùng để LẤY dữ liệu (chỉ đọc, tham số nằm lộ trên URL \`?page=1&limit=10\`, trình duyệt tự động cache lại).
• POST: Dùng để TẠO MỚI dữ liệu (dữ liệu giấu trong Request Body, an toàn và dung lượng không giới hạn).
• PUT: Dùng để CẬP NHẬT THAY THẾ TOÀN BỘ một bản ghi đã tồn tại.

💡 Khái niệm "Idempotent" (Ăn điểm tuyệt đối):
Nhà tuyển dụng rất thích hỏi từ này!
• Idempotent nghĩa là: Bạn bấm gọi 1 lần hay bấm F5 gọi 100 lần liên tiếp thì trạng thái hệ thống vẫn y như vậy.
  - \`GET\`, \`PUT\`, \`DELETE\` là Idempotent (sửa đè 100 lần thì bản ghi vẫn mang giá trị đó, xóa 100 lần thì bản ghi vẫn đã biến mất).
  - \`POST\` KHÔNG PHẢI Idempotent (bạn bấm submit 5 lần sẽ tạo ra 5 đơn hàng khác nhau và trừ tiền 5 lần trong tài khoản!).

💡 Mẹo mở rộng: Muốn cập nhật MỘT PHẦN thuộc tính (ví dụ chỉ đổi số điện thoại của user) thì chuẩn RESTful dùng \`PATCH\`.`,

  "iw03": `🎯 Bản chất dễ hiểu:
• \`==\` là "So sánh ba phải" (Type Coercion - tự ý ép kiểu ngầm định). Hai kiểu dữ liệu khác nhau nó cũng ráng ép về cùng 1 kiểu để so sánh.
• \`===\` là "So sánh nghiêm ngặt" (Strict Equality). Yêu cầu cả KIỂU DỮ LIỆU lẫn GIÁ TRỊ phải giống hệt nhau 100%, không hề có bất kỳ sự ép kiểu nào.

💻 Những bẫy "kinh dị" của \`==\` trong JavaScript:
\`\`\`javascript
5 == '5'        // true (ép string sang number)
false == 0      // true (ép boolean sang number)
null == undefined // true
[] == false     // true (mảng rỗng ép về boolean)
\`\`\`
Nhưng với toán tử \`===\`: Tất cả 4 phép so sánh trên đều trả về \`false\`!

💡 Mẹo phỏng vấn: Luôn khẳng định trong dự án thực tế, bạn và đội ngũ 100% sử dụng \`===\` (kết hợp ESLint rule \`eqeqeq\`) để triệt tiêu các lỗi logic ngầm cực kỳ nguy hiểm.`,

  "iw04": `🎯 Bản chất dễ hiểu (Ẩn dụ sân bay):
• Client-side Validation: Giống như bảo vệ nhắc bạn cởi áo khoác và tháo thắt lưng từ ngoài cổng. Nhắc nhở nhanh, lịch sự, đỡ tốn thời gian.
• Server-side Validation: Giống như máy quét an ninh X-quang kiểm tra hộ chiếu và hành lý trước khi lên máy bay.

Tại sao Client Validation KHÔNG BAO GIỜ là đủ?
Kẻ xấu hoặc hacker không thèm dùng giao diện website của bạn! Họ mở Postman, viết lệnh cURL trong Terminal hoặc script Python gửi thẳng request POST chứa chuỗi độc hại \`DROP TABLE users;\` hoặc số tiền âm \`-1.000.000đ\` vào API server. Khi đó toàn bộ JavaScript ở client đều bị bypass hoàn toàn!

💡 Mẹo phỏng vấn:
"Client Validation phục vụ trải nghiệm người dùng (UX) để họ sửa lỗi ngay lập tức mà không phải chờ mạng; Server Validation là chốt chặn bắt buộc vì Bảo mật và Tính toàn vẹn dữ liệu (Security & Data Integrity)".`,

  "iw05": `🎯 Bản chất dễ hiểu (Ẩn dụ đóng gói hộp quà):
• Content: Món quà quý giá bên trong.
• Padding: Lớp xốp đệm bọc xung quanh món quà bên trong hộp.
• Border: Vỏ hộp carton cứng bên ngoài.
• Margin: Khoảng cách từ hộp quà của bạn đẩy lùi hộp quà của người khác để chúng không chạm vào nhau.

💻 Bẫy CSS kinh điển:
Mặc định trong CSS (\`box-sizing: content-box\`), khi bạn set \`width: 200px\` rồi thêm \`padding: 20px\`, cái hộp sẽ bị phình to thành 240px làm vỡ tung layout giao diện!

💡 Mẹo phỏng vấn:
Luôn khai báo ở dòng đầu tiên của file CSS:
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`
Khi đó dù bạn có thêm padding hay border bao nhiêu thì chiều rộng tổng thể của phần tử vẫn giữ nguyên đúng 200px như thiết kế!`,

  "iw06": `🎯 Bản chất dễ hiểu:
• DOM (Document Object Model): Cây phả hệ biểu diễn tài liệu HTML thành các đối tượng JavaScript, giúp bạn có thể dùng code để thêm, sửa, xóa thẻ HTML hoặc đổi màu CSS.
• \`document.getElementById('my-id')\`: Giống như bạn tìm người qua Số Căn cước công dân duy nhất. Engine trình duyệt tìm trực tiếp trong Bảng băm (Hash Table) với độ phức tạp O(1) siêu nhanh.
• \`document.querySelector('.container > button.active')\`: Giống như bạn cầm bản mô tả nhận dạng đi rà soát từng người trong phòng. Cú pháp cực kỳ linh hoạt (nhận mọi CSS selector), nhưng tốn CPU hơn một chút để duyệt cây.

💡 Mẹo phỏng vấn: Nếu chỉ cần lấy 1 phần tử theo ID cố định, hãy ưu tiên \`getElementById\`. Nếu cần tìm phần tử theo class lồng nhau hoặc thuộc tính động \`[data-status="active"]\`, hãy dùng \`querySelector\`.`,

  "iw07": `🎯 Bản chất dễ hiểu:
Từ những năm 1995, hành vi mặc định của thẻ \`<form>\` trong HTML là khi bấm Submit, trình duyệt sẽ gửi request đồng bộ và TẢI LẠI TOÀN BỘ TRANG WEB (Page Reload).
Trong các ứng dụng web hiện đại (SPA như React, Vue, Next.js), nếu trang web bị reload thì:
1. Toàn bộ state trên RAM bị xóa sạch.
2. Màn hình bị chớp trắng giật cục làm trải nghiệm người dùng cực tệ.

Vì vậy, lập trình viên gọi \`event.preventDefault()\` để chặn đứng hành vi reload trang cổ lỗ sĩ đó, mở đường cho việc validate dữ liệu bằng JavaScript và gửi request ngầm qua \`fetch()\` hoặc \`axios\` mà màn hình vẫn đứng yên mượt mà!`,

  "iw08": `🎯 Bản chất dễ hiểu (Ẩn dụ thẻ rung trà sữa):
Bạn đến quán gọi món trà sữa. Thu ngân đưa cho bạn một chiếc "Thẻ rung báo lấy đồ" (đó chính là Callback). Trong lúc chờ pha chế (tác vụ bất đồng bộ mất 5 phút), bạn thoải mái ngồi lướt TikTok hoặc trò chuyện (Non-blocking I/O). Khi trà sữa làm xong, thẻ rung lên bạn mới ra quầy lấy đồ.

Callback Hell là gì?
Nếu bạn phải đợi làm trà sữa -> xong lại cầm thẻ đợi nướng bánh -> xong lại cầm thẻ đợi đóng gói... Các hàm callback lồng nhau 7-8 tầng hình kim tự tháp (Pyramid of Doom), khiến code thụt lề sâu hoắm, đọc đau mắt và nếu có lỗi thì không biết văng ra ở tầng nào!

💡 Mẹo phỏng vấn:
Trình bày lịch sử tiến hóa của JavaScript:
1. Giai đoạn sơ khai: Dùng Callback (dễ dính Callback Hell).
2. ES6 (2015): Ra mắt \`Promise\` với chuỗi \`.then().catch()\`.
3. ES8 (2017): Đỉnh cao \`async/await\` - viết mã bất đồng bộ trông tuần tự, sáng sủa y hệt mã đồng bộ và bắt lỗi nhẹ nhàng bằng khối \`try-catch\`.`,

  "iw09": `🎯 Bản chất dễ hiểu (Ẩn dụ tháo lắp xe đạp):
• \`JSON.stringify(object)\`: Giống như bạn tháo rời chiếc xe đạp ra và đóng gói gọn gàng vào thùng các-tông (Biến đổi Object/Array trong RAM thành chuỗi văn bản Text thuần túy) để có thể gửi bưu điện qua đường truyền mạng internet hoặc lưu vào localStorage.
• \`JSON.parse(string)\`: Giống như người nhận mở thùng các-tông và lắp ráp các bộ phận lại thành chiếc xe đạp hoàn chỉnh (Phân tích chuỗi Text thành JavaScript Object) để có thể leo lên chạy (\`user.name\`).

💡 Bẫy phỏng vấn hay gài:
1. \`JSON.stringify()\` sẽ tự động vứt bỏ các thuộc tính chứa hàm \`function()\`, \`undefined\` hoặc \`Symbol\`.
2. Nếu chuỗi truyền vào \`JSON.parse()\` bị sai cú pháp (ví dụ thiếu dấu ngoặc kép, thừa dấu phẩy cuối cùng), nó sẽ quăng lỗi \`SyntaxError\` làm sập luôn ứng dụng nếu bạn không bọc trong khối \`try-catch\`!`,

  "iw10": `🎯 Bản chất dễ hiểu (Ẩn dụ quán ăn 1 bồi bàn):
Không giống như Tomcat/Java truyền thống (mỗi khách hàng là 1 nhân viên phục vụ riêng - Thread-per-request, 10.000 khách là tốn 10.000 luồng làm nghẽn RAM), Node.js chỉ có DUY NHẤT 1 người bồi bàn (Single Main Thread).
• Khi khách gọi món hầm (I/O tốn thời gian như đọc file, query DB, gọi API bên thứ ba): Bồi bàn ghi phiếu rồi chuyển ngay cho nhà bếp (libuv thread pool chạy ngầm trong OS). Bồi bàn không hề đứng chờ mà quay sang nhận order của khách tiếp theo ngay lập tức (Non-blocking).
• Khi bếp nấu xong, chuông reo (Event Loop), bồi bàn mới bưng món ra cho khách.

💡 Điểm yếu chí mạng của Node.js:
Nếu có 1 vị khách bắt bồi bàn ngồi giải phương trình tích phân bậc 4 (tác vụ CPU-intensive như mã hóa video, nén file zip lớn, AI model), người bồi bàn sẽ bị kẹt cứng và HÀNG NGHÌN KHÁCH HÀNG KHÁC PHÍA SAU BỊ TREO HOÀN TOÀN! Do đó với tác vụ CPU nặng, người ta dùng Worker Threads hoặc chuyển sang dùng Go/Java.`,

  // ==========================================
  // 3. JAVA CORE, OOP & COLLECTIONS (ijc01 - ijc20)
  // ==========================================
  "ijc01": `🎯 Bản chất dễ hiểu:
Câu hỏi bẫy kinh điển số 1 trong các buổi phỏng vấn Java!
• Java có cơ chế "Integer Cache": JVM tự động tạo sẵn một hồ chứa các đối tượng Integer có giá trị từ **-128 đến 127** (theo quy chuẩn Java Language Specification khi Autoboxing).
• Với giá trị 100: Nằm trong vùng Cache [-128, 127], nên cả biến \`a\` và \`b\` cùng trỏ tới 1 ô nhớ đối tượng duy nhất -> So sánh tham chiếu địa chỉ \`a == b\` cho kết quả \`true\`.
• Với giá trị 200: Vượt ra ngoài vùng Cache, JVM bắt buộc phải gọi \`new Integer(200)\` tạo ra 2 đối tượng độc lập nằm ở 2 ô nhớ khác nhau trên Heap -> So sánh tham chiếu \`c == d\` trả về \`false\`!

💡 Mẹo phỏng vấn:
Để so sánh giá trị của các Wrapper Class (Integer, Long, Double...), LUÔN LUÔN dùng phương thức \`.equals()\` (\`c.equals(d)\` sẽ là \`true\`), tuyệt đối không dùng toán tử \`==\`.`,

  "ijc02": `🎯 Bản chất dễ hiểu:
Khi bạn duyệt qua một ArrayList bằng vòng lặp \`for-each\` (hoặc \`for\` thông thường) và gọi trực tiếp \`list.remove(item)\`, Java sẽ lập tức quăng lỗi \`ConcurrentModificationException\`.

Tại sao?
Bên dưới, vòng lặp for-each sử dụng một đối tượng \`Iterator\`. Trong ArrayList có một biến đếm gọi là \`modCount\` (số lần thêm/sửa/xóa danh sách). Iterator giữ một bản sao gọi là \`expectedModCount\`.
Khi bạn gọi \`list.remove()\`, biến \`modCount\` tăng lên nhưng \`expectedModCount\` trong Iterator không hề hay biết. Ở bước lặp tiếp theo, Iterator phát hiện \`modCount != expectedModCount\` -> Nó nghi ngờ danh sách đang bị một luồng khác chỉnh sửa đồng thời làm sai lệch dữ liệu -> Nó lập tức báo lỗi ngay (Cơ chế Fail-Fast).

💻 Cách giải quyết chuẩn mực:
1. Dùng \`Iterator\`: \`Iterator<String> it = list.iterator(); while(it.hasNext()) { if(...) it.remove(); }\`
2. Dùng Java 8 Lambda (Ngắn gọn và xịn nhất): \`list.removeIf(item -> item.equals("X"));\``,

  "ijc03": `🎯 Bản chất dễ hiểu (Ẩn dụ bàn làm việc và nhà kho):
• Vùng nhớ STACK (Bàn làm việc cá nhân): Mỗi luồng (Thread) có 1 Stack riêng. Dùng để lưu trữ các lời gọi hàm (Stack Frame), các biến cục bộ kiểu nguyên thủy (\`int\`, \`boolean\`) và các con trỏ địa chỉ tham chiếu. Bộ nhớ Stack cực kỳ nhỏ nhưng tốc độ truy xuất siêu nhanh. Khi hàm chạy xong, Stack Frame tự động bị xóa sổ ngay lập tức.
• Vùng nhớ HEAP (Kho hàng khổng lồ dùng chung): Nơi lưu trữ tất cả các ĐỐI TƯỢNG (Objects) thực tế và mảng trong Java (kể cả String, ArrayList hay User object). Khi không còn ai trỏ tới đối tượng trong Heap nữa, nó sẽ được dọn dẹp bởi Garbage Collector (GC).

💡 Bẫy phỏng vấn (Hai loại lỗi tràn bộ nhớ):
• \`StackOverflowError\`: Xảy ra khi gọi đệ quy vô tận không có điểm dừng làm đầy bộ nhớ Stack.
• \`OutOfMemoryError (OOM)\`: Xảy ra khi tạo quá nhiều Object lớn trong Heap mà Garbage Collector dọn không kịp làm cạn kiệt RAM.`,

  "ijc04": `🎯 Bản chất dễ hiểu:
Kết quả trả về chắc chắn bằng 2!

Tại sao?
Trong cấu trúc \`try-catch-finally\`, quy tắc bất di bất dịch của Java là: **Khối finally LUÔN LUÔN được thực thi trước khi hàm thực sự trả quyền điều khiển về cho nơi gọi**.
Khi gặp \`return 1;\` trong khối try, JVM đã chuẩn bị sẵn giá trị 1 để trả về. Nhưng trước khi thoát hàm, nó bắt buộc phải chạy qua khối \`finally\`. Tại đây nó gặp lệnh \`return 2;\` -> Lệnh return trong finally ghi đè hoàn toàn (override) giá trị trả về trước đó!

💡 Cảnh báo thực tế:
Viết lệnh \`return\` trong khối \`finally\` là một "Anti-pattern" (viết code tối kỵ) vì nó sẽ nuốt chửng luôn cả các Exception văng ra từ khối try, khiến việc bắt lỗi trở nên bất khả thi. Các công cụ quét code như SonarQube sẽ cảnh báo đỏ lỗi này.`,

  "ijc05": `🎯 Bản chất dễ hiểu:
• \`Comparable\` (Nội lực bên trong): Class tự implement interface này và viết hàm \`compareTo(other)\` để định nghĩa thứ tự sắp xếp MẶC ĐỊNH của chính nó (ví dụ: Học sinh thì mặc định sắp xếp theo Mã số ID tăng dần).
• \`Comparator\` (Bên ngoài chấm điểm): Là một class hoặc biểu thức Lambda độc lập bên ngoài, viết hàm \`compare(o1, o2)\` để cung cấp CÁC TIÊU CHÍ SẮP XẾP KHÁC NHAU tùy theo nhu cầu (ví dụ: Lúc thì cần xếp theo Điểm thi giảm dần, lúc thì cần xếp theo Tên bảng chữ cái A-Z).

💻 Ví dụ code Java 8 cực đẹp:
\`\`\`java
// Dùng Comparator linh hoạt:
students.sort(Comparator.comparing(Student::getGpa).reversed()
                        .thenComparing(Student::getName));
\`\`\`

💡 Mẹo phỏng vấn: Hãy nhớ thần chú: "Comparable là 1 tiêu chí tự nhiên nằm BÊN TRONG class; Comparator là nhiều tiêu chí linh hoạt nằm BÊN NGOÀI class".`,

  "ijc06": `🎯 Bản chất dễ hiểu:
Phương thức \`static\` trong Java KHÔNG THỂ BỊ OVERRIDE (Ghi đè) bởi lớp con!

Nếu lớp con khai báo 1 static method có tên và tham số y hệt lớp cha thì sao?
Đó là hiện tượng **Method Hiding (Ẩn phương thức)** chứ tuyệt đối không phải Đa hình (Polymorphism/Overriding).
Bởi vì phương thức static thuộc về CLASS chứ không thuộc về INSTANCE (đối tượng). Trình biên dịch sẽ liên kết tĩnh (Static Binding / Compile-time) dựa vào KIỂU KHAI BÁO của biến tham chiếu chứ không quan tâm đối tượng thực tế lúc chạy là gì!

💻 Ví dụ:
\`Parent p = new Child(); p.print();\` -> Sẽ in ra hàm của \`Parent\` chứ không bao giờ gọi hàm của \`Child\`!`,

  "ijc07": `🎯 Bản chất dễ hiểu (Ẩn dụ tìm đồ trong tủ đồ):
HashSet hoạt động bằng cách băm đối tượng (\`hashCode()\`) để chọn ngăn tủ (Bucket) cất giữ.
Khi bạn sửa đổi thuộc tính của đối tượng đã nằm trong tủ, mã \`hashCode()\` mới của nó sẽ bị thay đổi hoàn toàn.
Khi bạn gọi \`hashSet.contains(object)\`, HashSet dùng hashCode mới để tìm kiếm -> Nó chạy đến SAI NGĂN TỦ -> Kết quả trả về \`false\` (không tìm thấy), mặc dù đối tượng đó vẫn đang nằm chình ình trong HashSet!

💡 Hậu quả kinh hoàng & Mẹo phỏng vấn:
Đối tượng này sẽ bị kẹt vĩnh viễn trong HashSet, bạn không thể xóa nó bằng \`remove()\` được nữa -> Gây rò rỉ bộ nhớ (MEMORY LEAK) nghiêm trọng!
Quy tắc vàng: "Chỉ sử dụng các thuộc tính Bất biến (Immutable fields như ID, final string) để tham gia tính toán hàm hashCode() và equals()".`,

  "ijc08": `🎯 Bản chất dễ hiểu:
• Checked Exception (Ngoại lệ kiểm tra): Kế thừa từ \`java.lang.Exception\` (nhưng không kế thừa \`RuntimeException\`). Trình biên dịch BẮT BUỘC bạn phải xử lý ngay lúc viết code (bằng \`try-catch\` hoặc khai báo \`throws\` ở hàm). Thường là các lỗi khách quan do môi trường bên ngoài: Mất mạng, file không tồn tại (\`FileNotFoundException\`), lỗi database (\`SQLException\`).
• Unchecked Exception (Ngoại lệ lúc chạy): Kế thừa từ \`java.lang.RuntimeException\`. Trình biên dịch KHÔNG BẮT BUỘC phải try-catch. Thường là lỗi ngớ ngẩn do lập trình viên viết ẩu: \`NullPointerException\` (quên kiểm tra null), \`ArrayIndexOutOfBoundsException\` (truy cập quá chỉ số mảng), \`ArithmeticException\` (chia cho 0).

💡 Mẹo phỏng vấn: Trong các framework hiện đại như Spring Framework, hầu hết các exception đều được bọc lại thành Unchecked Exception (ví dụ \`DataAccessException\`) để tránh làm code bị rối rắm bởi hàng trăm khối try-catch không cần thiết.`,

  "ijc09": `🎯 Bản chất dễ hiểu (Ẩn dụ làm phẳng hộp bánh):
• \`map()\`: Chuyển đổi tỉ lệ 1 - 1. Cứ 1 phần tử đầu vào biến thành 1 phần tử đầu ra.
  Ví dụ: Danh sách tên thường \`["nam", "an"]\` qua \`map(String::toUpperCase)\` -> \`["NAM", "AN"]\`.
• \`flatMap()\`: Chuyển đổi và "LÀM PHẲNG" (Flattening) tỉ lệ 1 - N. Nhận vào các danh sách lồng nhau (List of Lists) và gộp tất cả các phần tử con thành MỘT LUỒNG PHẲNG DUY NHẤT.

💻 Ví dụ thực tế:
Mỗi lớp học có 1 danh sách học sinh: \`List<ClassRoom>\` (mỗi classroom có \`List<Student>\`).
Nếu dùng \`classes.stream().map(ClassRoom::getStudents)\` -> Bạn sẽ nhận được \`Stream<List<Student>>\` (luồng chứa các danh sách con).
Nếu dùng \`classes.stream().flatMap(c -> c.getStudents().stream())\` -> Bạn nhận được \`Stream<Student>\` (danh sách phẳng của toàn bộ học sinh trong trường)!`,

  "ijc10": `🎯 Bản chất dễ hiểu:
Cơ chế Try-with-resources (ra đời từ Java 7) yêu cầu tài nguyên phải implement interface \`java.lang.AutoCloseable\` (hoặc \`java.io.Closeable\`).

Tại sao đây là tính năng tuyệt vời?
Trước Java 7, mỗi lần mở kết nối JDBC hoặc đọc file, lập trình viên phải viết khối \`finally\` dài ngoằng để gọi \`.close()\`. Nếu trong finally lại bị văng lỗi thì lỗi gốc ban đầu trong khối try sẽ bị nuốt chửng!
Với Try-with-resources:
\`\`\`java
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement(sql)) {
  // Thực thi nghiệp vụ...
} // Java TỰ ĐỘNG gọi close() đúng thứ tự ngược lại, kể cả khi có Exception văng ra!
\`\`\``,

  "ijc11": `🎯 Bản chất dễ hiểu (Ẩn dụ giấy nháp):
• String (Bất biến - Immutable): Giống như viết chữ bằng bút mực không thể tẩy xóa. Mỗi lần bạn nối chuỗi \`s = s + "a"\`, Java không hề sửa chuỗi cũ mà âm thầm tạo ra một Đối Tượng Mới trên Heap. Nếu nối chuỗi trong vòng lặp 10.000 lần, Java sẽ tạo ra 10.000 đối tượng rác làm tràn RAM!
• StringBuilder (Khả biến - Mutable): Giống như bảng phấn xóa được. Nó sửa trực tiếp trên mảng ký tự nội bộ \`char[]\` nên tốc độ nối chuỗi nhanh gấp hàng trăm lần String. Dành cho môi trường Đơn luồng (Single-thread).
• StringBuffer: Giống hệt StringBuilder nhưng có thêm từ khóa \`synchronized\` trên các method để an toàn trong môi trường Đa luồng (Thread-safe). Tuy nhiên do phải khóa luồng (Locking) nên tốc độ chạy chậm hơn StringBuilder.

💡 Mẹo phỏng vấn: 99% trường hợp nối chuỗi trong hàm chỉ chạy đơn luồng, hãy luôn dùng \`StringBuilder\` để đạt tốc độ tối đa!`,

  "ijc12": `🎯 Bản chất dễ hiểu (4 trụ cột OOP):
1. Đóng gói (Encapsulation): Che giấu dữ liệu nhạy cảm bên trong bằng \`private\`, chỉ cho bên ngoài truy cập thông qua các hàm \`getter/setter\` có kiểm tra hợp lệ. (Ví dụ: Số dư tài khoản không cho gán trực tiếp \`soDu = -500\`, phải qua hàm \`rutTien()\` kiểm tra xem có đủ tiền không).
2. Kế thừa (Inheritance): Lớp con tái sử dụng và mở rộng thuộc tính, phương thức của lớp cha qua từ khóa \`extends\`, tránh viết lại code trùng lặp. (Ví dụ: Class \`Dog\` kế thừa từ class \`Animal\`).
3. Đa hình (Polymorphism): Cùng một hành vi nhưng thể hiện khác nhau ở từng đối tượng. (Ví dụ: Cùng gọi hàm \`keu()\`, nhưng Chó thì sủa "Gâu gâu", Mèo thì kêu "Meo meo").
4. Trừu tượng (Abstraction): Tập trung vào việc đối tượng "LÀM ĐƯỢC GÌ" thay vì chi tiết nó "LÀM NHƯ THẾ NÀO". (Ví dụ: Bạn lái ô tô chỉ cần đạp chân ga là xe chạy, không cần biết bugi đánh lửa phun xăng bên trong động cơ ra sao).`,

  "ijc13": `🎯 Bản chất dễ hiểu:
• Đa hình lúc biên dịch (Compile-time / Đa hình tĩnh): Thể hiện qua **Method Overloading (Nạp chồng)**. Trong cùng 1 class có nhiều hàm cùng tên nhưng khác nhau về số lượng hoặc kiểu tham số. Trình biên dịch nhìn vào tham số lúc viết code là biết ngay hàm nào được gọi.
• Đa hình lúc thực thi (Runtime / Đa hình động): Thể hiện qua **Method Overriding (Ghi đè)**. Lớp con viết lại method của lớp cha. Lúc viết code ta dùng biến cha trỏ vào con \`Animal a = new Dog(); a.makeSound();\`. Lúc biên dịch chỉ biết đó là Animal, phải đợi đến lúc chạy (Runtime), JVM mới nhìn vào vùng nhớ thực tế thấy đó là con Chó và gọi hàm sủa của Dog (cơ chế Dynamic Method Dispatch).`,

  "ijc14": `🎯 Bản chất dễ hiểu:
Sắp xếp phạm vi từ hẹp nhất đến rộng nhất:
1. \`private\`: Ích kỷ nhất, chỉ duy nhất bên trong chính Class đó mới nhìn thấy.
2. \`default\` (không ghi gì - package-private): Chỉ các Class nằm trong CÙNG MỘT PACKAGE mới nhìn thấy nhau.
3. \`protected\`: Nằm trong cùng Package + Bất kỳ LỚP CON (Subclass) nào kế thừa nó kể cả nằm ở package khác.
4. \`public\`: Hào phóng nhất, ai ở bất kỳ đâu trong toàn bộ project cũng gọi được.`,

  "ijc15": `🎯 Bản chất dễ hiểu:
Từ khóa \`final\` mang ý nghĩa là "BẤT BIẾN / CHỐT CHẶN CUỐI CÙNG":
• \`final variable\`: Biến trở thành hằng số, chỉ được gán giá trị 1 lần duy nhất, không thể thay đổi giá trị (như số PI = 3.14).
• \`final method\`: Lớp con không được phép Ghi đè (Override) phương thức này (để bảo vệ logic cốt lõi không bị lớp con sửa đổi làm sai lệch).
• \`final class\`: Tuyệt đối không cho phép class nào khác Kế thừa (Inherit) nó.

💡 Ví dụ đắt giá: Class \`java.lang.String\` là một \`final class\`! Java cố tình làm điều này để không ai có thể tạo ra một lớp con giả mạo String nhằm mục đích tấn công bảo mật hay phá vỡ String Pool.`,

  "ijc16": `🎯 Bản chất dễ hiểu:
Khi khởi tạo một đối tượng lớp con, nền móng của lớp cha bắt buộc phải được dựng lên TRƯỚC. Do đó, lệnh gọi \`super()\` (gọi constructor của cha) **bắt buộc phải là dòng code đầu tiên** trong Constructor của lớp con.
Nếu bạn để bất kỳ dòng lệnh nào khác lên trước \`super()\`, trình biên dịch Java sẽ báo lỗi ngay lập tức.
Nếu bạn không tự tay viết \`super()\`, trình biên dịch sẽ tự động chèn ngầm \`super();\` không tham số vào dòng đầu tiên cho bạn.`,

  "ijc17": `🎯 Bản chất dễ hiểu (Ẩn dụ hồ nước chung):
String Pool là một vùng nhớ đặc biệt trong Heap do JVM quản lý để tiết kiệm bộ nhớ:
• Khi bạn khai báo chuỗi dạng Literal: \`String s1 = "Java"; String s2 = "Java";\` -> JVM kiểm tra thấy "Java" đã có sẵn trong Pool, nó cho \`s2\` trỏ chung vào ô nhớ của \`s1\`. Do đó \`s1 == s2\` cho kết quả \`true\` (vì so sánh 2 địa chỉ ô nhớ giống nhau).
• Nhưng khi bạn dùng từ khóa \`new\`: \`String s3 = new String("Java");\` -> JVM bị ép buộc phải cấp phát một ô nhớ Object HOÀN TOÀN MỚI nằm ngoài Pool. Khi đó \`s1 == s3\` sẽ trả về \`false\`!

💡 Quy tắc sống còn: Trong Java, 100% trường hợp so sánh chuỗi hãy dùng phương thức \`s1.equals(s3)\` (so sánh nội dung ký tự), không bao giờ dùng toán tử \`==\`.`,

  "ijc18": `🎯 Bản chất dễ hiểu:
JAVA LÀ 100% PASS-BY-VALUE (Truyền giá trị)! Java không hề có con trỏ tham chiếu như C++.

Nhiều người hay nhầm vì thấy sửa object trong hàm thì ở ngoài bị đổi theo. Hãy phân biệt rõ:
• Khi truyền biến nguyên thủy (\`int x = 10\`): Java sao chép nguyên giá trị 10 vào hàm. Hàm có đổi \`x = 20\` thì ở ngoài x vẫn là 10.
• Khi truyền Object (\`Person p = new Person("Nam")\`): Java sao chép BẢN SAO CỦA ĐỊA CHỈ Ô NHỚ (Pointer value).
  - Nếu bạn dùng bản sao địa chỉ đó để sửa thuộc tính: \`p.setName("Bình")\` -> Tên bị đổi vì cùng trỏ vào 1 ngôi nhà trên Heap.
  - Nhưng nếu bạn gán \`p = new Person("Khác")\` bên trong hàm -> Đối tượng \`p\` ở bên ngoài hoàn toàn KHÔNG HỀ BỊ THAY ĐỔI, vì bạn chỉ vừa trỏ bản sao sang một ngôi nhà mới!`,

  "ijc19": `🎯 Bản chất dễ hiểu:
• \`List\` (ArrayList, LinkedList): Giống như hàng người xếp hàng mua vé. Có thứ tự trước sau (Index 0, 1, 2...) và CHO PHÉP người trùng tên đứng lặp lại.
• \`Set\` (HashSet, TreeSet): Giống như một túi đựng bóng độc nhất. KHÔNG CHO PHÉP phần tử trùng lặp (nếu thêm phần tử đã có rồi thì nó bỏ qua). Không đảm bảo thứ tự chèn (với HashSet).
• \`Map\` (HashMap, TreeMap): Giống như cuốn Sổ danh bạ điện thoại lưu theo cặp **Key - Value** (Tên người - Số điện thoại). Các Key là duy nhất không được trùng nhau (nếu put trùng key sẽ ghi đè giá trị cũ).`,

  "ijc20": `🎯 Bản chất dễ hiểu (Cây tầm gửi và rễ cây):
Garbage Collector (GC) trong JVM không đếm thời gian sống của đối tượng, mà dùng thuật toán **Truy vết khả năng tiếp cận (Reachability Analysis)** bắt đầu từ các GC Roots.
GC Roots là những rễ cây vững chắc đang còn hoạt động: biến cục bộ trong Stack của luồng đang chạy, biến static của class, các luồng (Thread) đang active.
• Nếu từ GC Roots có đường dây tham chiếu nối tới đối tượng -> Đối tượng còn sống.
• Nếu đối tượng bị đứt toàn bộ liên lạc (Unreachable), trôi nổi vô thừa nhận trong Heap -> Nó bị coi là Rác và sẽ bị GC gom tiêu hủy giải phóng RAM.

💡 Mẹo phỏng vấn: Lệnh \`System.gc()\` chỉ là lời "thỉnh cầu" JVM hãy dọn rác, còn việc JVM có dọn rác ngay hay không là do JVM tự quyết định, ta không thể ép buộc!`,

  // ==========================================
  // 4. SPRING BOOT & REST API (isp01 - isp13)
  // ==========================================
  "isp01": `🎯 Bản chất dễ hiểu:
• Spring Framework thuần giống như bạn đi mua linh kiện máy tính rời: Bạn phải tự mua CPU, RAM, nguồn, tự viết hàng trăm dòng cấu hình XML rườm rà, tự cài đặt web server Tomcat bên ngoài rồi deploy file \`.war\` lên rất cực khổ.
• Spring Boot giống như chiếc máy tính xách tay Laptop đóng gói sẵn:
  1. Auto-configuration: Tự động đoán và cấu hình những thứ phổ biến (thấy có MySQL driver là tự cấu hình DataSource).
  2. Starter Dependencies: Chỉ cần khai báo 1 dòng \`spring-boot-starter-web\` là tự kéo đủ thư viện cần thiết.
  3. Embedded Tomcat: Web server được nhúng thẳng vào file \`.jar\`, chỉ cần chạy \`java -jar app.jar\` là web hoạt động ngay lập tức!`,

  "isp02": `🎯 Bản chất dễ hiểu:
Vòng đời của một Spring Bean trải qua các giai đoạn chính:
1. Khởi tạo (Instantiation): Gọi Constructor để tạo object trong RAM.
2. Tiêm phụ thuộc (Populate Properties): Inject các dependency qua \`@Autowired\`.
3. Gọi các Aware Interfaces: Nếu bean cần biết về môi trường (như \`BeanNameAware\`, \`ApplicationContextAware\`).
4. Tiền khởi tạo & Khởi tạo: Chạy các hàm gắn annotation \`@PostConstruct\` hoặc phương thức \`afterPropertiesSet()\`.
5. Sẵn sàng phục vụ (Ready for use): Bean nằm trong Container phục vụ ứng dụng.
6. Hủy bỏ (Destruction): Khi ứng dụng tắt, gọi các hàm dọn dẹp \`@PreDestroy\` để đóng file, đóng kết nối database.`,

  "isp03": `🎯 Bản chất dễ hiểu:
Có 3 cách thực hiện Dependency Injection (DI):
1. Field Injection: Gắn \`@Autowired\` trực tiếp lên thuộc tính (Tiện nhưng nguy hiểm, khó viết Unit Test).
2. Setter Injection: Dùng hàm \`setXyz()\` (Dành cho các phụ thuộc không bắt buộc).
3. **Constructor Injection (Được Spring Team khuyến nghị 100%)**: Truyền dependency qua hàm khởi tạo Constructor.

Tại sao Constructor Injection là số 1?
• Cho phép khai báo biến là \`final\` -> Đảm bảo tính bất biến (Immutable), tránh bị đổi lén.
• Rất dễ viết Unit Test với Mockito: Chỉ cần \`new UserService(mockRepo)\` mà không cần bật cả Spring IoC container nặng nề.
• Phát hiện lỗi phụ thuộc vòng tròn (Circular Dependency) ngay lúc khởi động ứng dụng.`,

  "isp04": `🎯 Bản chất dễ hiểu (Hành trình của 1 Request):
Khi người dùng gửi request \`GET /api/users\`:
1. \`DispatcherServlet\` (Chàng lễ tân trung tâm): Nhận toàn bộ request đến đầu tiên.
2. \`HandlerMapping\`: Lễ tân tra danh bạ xem URL này thuộc về Controller nào xử lý.
3. \`Controller\`: Tiếp nhận request, đọc tham số và gọi xuống tầng nghiệp vụ.
4. \`Service\`: Xử lý logic tính toán, kiểm tra quyền hạn, quản lý giao dịch (@Transactional).
5. \`Repository / DAO\`: Tương tác với Database bằng Hibernate/JPA.
6. Dữ liệu quay ngược trở lại Controller và được serialize thành JSON trả về cho Client.`,

  "isp05": `🎯 Bản chất dễ hiểu:
Để tránh việc ở mỗi Controller đều phải viết lặp đi lặp lại hàng trăm khối \`try-catch\`, Spring Boot cung cấp giải pháp xử lý ngoại lệ tập trung (Global Exception Handling) bằng cách kết hợp:
• \`@RestControllerAdvice\` (hoặc \`@ControllerAdvice\`): Đánh dấu class là bộ lọc bắt lỗi toàn cục cho tất cả các Controller trong dự án.
• \`@ExceptionHandler(UserNotFoundException.class)\`: Đặt trên từng method để bắt đúng loại lỗi cụ thể và trả về định dạng JSON lỗi chuẩn hóa thống nhất (gồm: timestamp, status code, error message).`,

  "isp06": `🎯 Bản chất dễ hiểu:
CORS (Cross-Origin Resource Sharing) là một cơ chế BẢO MẬT CỦA TRÌNH DUYỆT.
Khi frontend chạy ở \`http://localhost:3000\` gọi API sang backend ở \`http://localhost:8080\` (khác Port hoặc khác Domain), trình duyệt sẽ chặn đứng lại vì nghi ngờ trang web lạ đang lén gọi trộm API của bạn!

Cách xử lý chuẩn trong Spring Boot:
1. Cấp Controller: Dùng \`@CrossOrigin(origins = "http://localhost:3000")\`.
2. Cấp toàn cục (Khuyên dùng): Cấu hình bean \`WebMvcConfigurer\` và ghi đè hàm \`addCorsMappings\` để cho phép domain frontend, các HTTP method (GET, POST, PUT, DELETE) và headers cần thiết.`,

  "isp07": `🎯 Bản chất dễ hiểu:
• \`singleton\` (Scope mặc định): Spring IoC Container chỉ tạo DUY NHẤT 1 instance của Bean và chia sẻ cho toàn bộ ứng dụng dùng chung. Cực kỳ tiết kiệm RAM, nhưng Bean bắt buộc phải thiết kế dạng **Stateless** (không lưu trạng thái riêng của người dùng để tránh xung đột đa luồng).
• \`prototype\`: Mỗi khi có ai đó yêu cầu inject (@Autowired) hoặc gọi \`getBean()\`, Spring sẽ TẠO RA MỘT INSTANCE HOÀN TOÀN MỚI. Phù hợp cho các đối tượng cần lưu trạng thái tạm thời (Stateful).`,

  "isp08": `🎯 Bản chất dễ hiểu:
• \`@Controller\`: Dành cho ứng dụng web truyền thống (Server-Side Rendering). Giá trị trả về của hàm là một chuỗi Tên View (ví dụ return \`"home"\` -> ViewResolver sẽ đi tìm file \`home.html\` hoặc \`home.jsp\` để hiển thị).
• \`@RestController\`: Dành cho RESTful API. Thực chất nó là viết tắt của:
\`@RestController = @Controller + @ResponseBody\`
Mọi dữ liệu trả về từ hàm (như User object, List) sẽ được thư viện Jackson tự động chuyển đổi thành chuỗi JSON/XML nằm trong HTTP Response Body trả thẳng về cho frontend/mobile app.`,

  "isp09": `🎯 Bản chất dễ hiểu:
• \`@Component\`: Là annotation "cha" tổng quát, đánh dấu bất kỳ class nào là 1 Spring Bean để Spring tự động quét và quản lý (Component Scanning).
• \`@Service\`: Chuyên biệt hóa của @Component ở tầng Nghiệp vụ (Business logic).
• \`@Repository\`: Chuyên biệt hóa ở tầng Dữ liệu (DAO/Database). Nó có tính năng đặc biệt: Tự động bắt các lỗi SQL của database và dịch sang ngoại lệ \`DataAccessException\` của Spring.
• \`@Bean\`: Dùng ở cấp độ METHOD bên trong class cấu hình \`@Configuration\`. Dùng khi bạn muốn khởi tạo bean từ thư viện của bên thứ 3 mà bạn không thể sửa code để gắn @Component lên đầu class của họ.`,

  "isp10": `🎯 Bản chất dễ hiểu:
Spring Boot dùng thư viện \`spring-boot-starter-validation\` (chuẩn Hibernate Validator):
• Khai báo ràng buộc trên DTO: \`@NotNull\` (không null), \`@NotBlank\` (chuỗi không rỗng và không toàn khoảng trắng), \`@Size(min=6, max=20)\`, \`@Email\`.
• \`@Valid\`: Là chuẩn tiêu chuẩn của Java/Jakarta Bean Validation (JSR-380).
• \`@Validated\`: Là annotation do Spring cung cấp, mở rộng thêm tính năng **Validation Groups** (ví dụ: Lúc Tạo mới thì ID được null, nhưng lúc Cập nhật thì ID bắt buộc phải có).`,

  "isp11": `🎯 Bản chất dễ hiểu:
• JPA (Java Persistence API): Là cuốn HỢP ĐỒNG / BỘ ĐẶC TẢ tiêu chuẩn (chỉ gồm các interface, không có code thực thi).
• Hibernate: Là NGƯỜI THỰC THI hợp đồng đó (thư viện ORM cụ thể làm việc kết nối database).
• Spring Data JPA: Là bộ khung tiện ích tầng trên giúp bạn không phải viết code Hibernate dài dòng, tự động sinh ra các câu query thông qua các Interface Repository.
• \`JpaRepository\` kế thừa từ \`PagingAndSortingRepository\` và \`CrudRepository\`. Nó tiện hơn vì các hàm như \`findAll()\` trả về sẵn \`List<T>\` (thay vì \`Iterable<T>\`) và có thêm các hàm xịn như \`flush()\`, \`saveAndFlush()\`, \`deleteInBatch()\`.`,

  "isp12": `🎯 Bản chất dễ hiểu:
Có 4 cách chính để viết query trong Spring Data JPA:
1. Query Method (Derived Query): Spring tự sinh SQL từ tên hàm: \`findByEmailAndStatus(String email, int status)\`. Rất nhanh và tiện cho các câu query đơn giản.
2. \`@Query\` với JPQL: Viết câu truy vấn dựa trên Tên Entity và Thuộc tính Java: \`@Query("SELECT u FROM User u WHERE u.age > :age")\` (Độc lập với hệ quản trị CSDL).
3. \`@Query(nativeQuery = true)\`: Viết câu lệnh SQL thuần của MySQL/Postgres khi cần dùng các hàm đặc thù của CSDL.
4. Specifications / Criteria API: Dùng code Java để xây dựng câu truy vấn động khi form tìm kiếm có quá nhiều bộ lọc tùy chọn.`,

  "isp13": `🎯 Bản chất dễ hiểu (Ẩn dụ hồ bơi kết nối):
Khởi tạo một kết nối TCP và bắt tay xác thực với Database Server tốn hàng trăm mili-giây. Nếu mỗi request của user đều mở kết nối mới rồi đóng lại thì Database sẽ chết ngắc vì kiệt quệ tài nguyên!
Connection Pool (như HikariCP) duy trì sẵn một đàn kết nối mở sẵn (ví dụ 10-20 kết nối). Khi Service cần truy vấn, nó chạy ra "mượn" 1 kết nối có sẵn, chạy xong thì "trả lại" cho hồ bơi.
HikariCP là thư viện Connection Pool mặc định của Spring Boot vì nó được tối ưu mã bytecode siêu nhỏ, tiêu thụ ít CPU và đạt tốc độ mượn trả kết nối nhanh nhất thế giới hiện nay!`,

  // ==========================================
  // 5. SQL, DATABASE & JDBC (isql01 - isql19)
  // ==========================================
  "isql01": `🎯 Bản chất dễ hiểu:
• INNER JOIN: Chỉ lấy phần giao nhau (Intersection) giữa 2 bảng. Chỉ những dòng nào có khóa khớp ở cả 2 bảng mới được xuất hiện trong kết quả.
• LEFT JOIN: Lấy 100% tất cả các dòng của Bảng Bên Trái. Nếu bảng bên phải có dữ liệu khớp thì điền vào, nếu không có dữ liệu khớp thì điền giá trị \`NULL\`.

💻 Tình huống phỏng vấn kinh điển:
"Làm thế nào để tìm danh sách những Khách Hàng CHƯA TỪNG mua đơn hàng nào?"
-> Dùng LEFT JOIN bảng Khách Hàng với Đơn Hàng, và thêm điều kiện \`WHERE DonHang.id IS NULL\`!`,

  "isql02": `🎯 Bản chất dễ hiểu:
• \`WHERE\`: Lọc từng dòng dữ liệu ĐƠN LẺ trước khi gom nhóm (GROUP BY). Trong WHERE tuyệt đối không được dùng các hàm tổng hợp như \`COUNT()\`, \`SUM()\`, \`AVG()\` (ví dụ viết \`WHERE COUNT(*) > 5\` sẽ bị báo lỗi cú pháp ngay).
• \`HAVING\`: Lọc trên các NHÓM DỮ LIỆU sau khi đã gom nhóm bằng GROUP BY xong xuôi. Thường đi kèm với hàm tổng hợp (ví dụ: \`HAVING COUNT(don_hang) >= 5\`).

💡 Thần chú ghi nhớ: "WHERE lọc trước khi nhóm - HAVING lọc sau khi nhóm".`,

  "isql03": `🎯 Bản chất dễ hiểu:
Để tìm người có TUỔI BÉ NHẤT, tức là người có NGÀY SINH GẦN VỚI HIỆN TẠI NHẤT (ngày sinh lớn nhất / mới nhất).
Do đó ta phải sắp xếp ngày sinh giảm dần \`ORDER BY ngay_sinh DESC\` và lấy 10 người đầu tiên bằng \`LIMIT 10\`.
(Rất nhiều bạn bị bẫy chọn \`ASC\` là ra những cụ già lớn tuổi nhất!).`,

  "isql04": `🎯 Bản chất dễ hiểu:
Cú pháp xóa dữ liệu có điều kiện trong SQL chuẩn:
\`DELETE FROM ten_bang WHERE dieu_kien;\`
Ở đây điều kiện là chưa đủ 18 tuổi (\`tuoi < 18\`), nên câu lệnh chính xác là:
\`DELETE FROM ung_vien WHERE tuoi < 18;\``,

  "isql05": `🎯 Bản chất dễ hiểu:
• \`CHAR(10)\`: Kiểu chuỗi CỐ ĐỊNH độ dài. Nếu bạn chỉ lưu chữ "ABC" (3 ký tự), database vẫn tự động bù thêm 7 khoảng trắng vào sau để đủ 10 byte trên ổ cứng. Thích hợp cho các trường có độ dài luôn cố định như: Mã CCCD, Mã bưu chính, Mã màu Hex, Mã tiền tệ (USD, VND).
• \`VARCHAR(10)\`: Kiểu chuỗi CO GIÃN độ dài (Variable Character). Lưu "ABC" thì chỉ tốn đúng 3 byte + 1 byte lưu độ dài, giúp tiết kiệm tối đa dung lượng ổ cứng. Dùng cho: Họ tên, Địa chỉ, Email.`,

  "isql06": `🎯 Bản chất dễ hiểu:
Thứ tự viết code SQL hoàn toàn KHÁC với thứ tự Database thực sự thực thi bên dưới!
Thứ tự logic chuẩn xác của RDBMS:
1. \`FROM\` (Xác định nguồn bảng và JOIN)
2. \`WHERE\` (Lọc các dòng thỏa điều kiện)
3. \`GROUP BY\` (Gom nhóm các dòng)
4. \`HAVING\` (Lọc trên các nhóm)
5. \`SELECT\` (Chọn các cột hiển thị)
6. \`DISTINCT\` (Loại bỏ dòng trùng lặp)
7. \`ORDER BY\` (Sắp xếp kết quả tăng/giảm)
8. \`LIMIT / OFFSET\` (Cắt lấy số dòng phân trang)

💡 Mẹo phỏng vấn: Tại sao không thể dùng bí danh (Alias) đặt trong SELECT để lọc trong WHERE? Vì WHERE chạy ở bước 2, trong khi SELECT tận bước 5 mới chạy!`,

  "isql07": `🎯 Bản chất dễ hiểu:
Đề bài yêu cầu:
1. Điểm dưới trung bình: \`WHERE diem < 5\`
2. Thống kê theo từng quê quán: \`GROUP BY que_quan\`
3. Đếm số lượng: \`COUNT(*)\`
-> Câu hoàn chỉnh: \`SELECT que_quan, COUNT(*) FROM sinhvien WHERE diem < 5 GROUP BY que_quan;\``,

  "isql08": `🎯 Bản chất dễ hiểu:
Có 2 cách chuẩn mực:
Cách 1: Dùng \`LEFT JOIN\` bảng sinhvien với dang_ky, rồi lọc \`WHERE dang_ky.ma_sv IS NULL\`.
Cách 2: Dùng \`NOT EXISTS (SELECT 1 FROM dang_ky WHERE dang_ky.ma_sv = sinhvien.id)\` (thường được tối ưu hóa rất tốt trên database hiện đại).`,

  "isql09": `🎯 Bản chất dễ hiểu:
• \`UNION\`: Gộp kết quả của 2 câu truy vấn và TỰ ĐỘNG LOẠI BỎ CÁC DÒNG TRÙNG NHAU. Để loại bỏ trùng lặp, database bắt buộc phải tốn tài nguyên sắp xếp (Sort) toàn bộ dữ liệu.
• \`UNION ALL\`: Gộp mù quáng toàn bộ dữ liệu của cả 2 câu truy vấn, CÓ TRÙNG CŨNG GIỮ NGUYÊN. Vì không phải lọc trùng nên tốc độ chạy nhanh hơn UNION rất nhiều lần.

💡 Mẹo: Nếu bạn biết chắc 2 tập dữ liệu không thể trùng nhau (hoặc bài toán chấp nhận trùng), hãy luôn dùng \`UNION ALL\` để tối ưu hiệu năng.`,

  "isql10": `🎯 Bản chất dễ hiểu:
• \`DELETE\`: Lệnh DML. Xóa từng dòng theo điều kiện WHERE, có ghi lại Transaction Log từng dòng nên có thể \`ROLLBACK\` (hoàn tác) được. Chạy chậm nhất.
• \`TRUNCATE\`: Lệnh DDL. Xóa sạch bách toàn bộ dữ liệu trong bảng trong nháy mắt, reset bộ đếm Auto-Increment về 1. Cực nhanh vì giải phóng thẳng các Data Pages trên ổ cứng, không ghi log từng dòng và KHÔNG THỂ ROLLBACK được trong hầu hết CSDL.
• \`DROP\`: Xóa sổ hoàn toàn cả dữ liệu lẫn cấu trúc bảng, biến mất vĩnh viễn khỏi Database.`,

  "isql11": `🎯 Bản chất dễ hiểu:
Cú pháp cập nhật:
\`UPDATE sinhvien SET diem = diem + 1 WHERE gioi_tinh = 'Nu';\`
Tăng điểm hiện tại lên 1 đơn vị cho những ai có giới tính là 'Nu'.`,

  "isql12": `🎯 Bản chất dễ hiểu:
Lọc nữ trước: \`WHERE gioi_tinh = 'Nu'\`.
Gom nhóm theo quê: \`GROUP BY que_quan\`.
Đếm số lượng: \`COUNT(*)\`.
-> \`SELECT que_quan, COUNT(*) FROM sinhvien WHERE gioi_tinh = 'Nu' GROUP BY que_quan;\``,

  "isql13": `🎯 Bản chất dễ hiểu:
Khóa chính tổng hợp (Composite Primary Key) là khóa chính được tạo thành từ **sự kết hợp của 2 hoặc nhiều cột** gom lại để định danh duy nhất một bản ghi.
Ví dụ: Bảng \`dang_ky_mon_hoc (ma_sinh_vien, ma_mon_hoc)\`. Một sinh viên có thể đăng ký nhiều môn, một môn có nhiều sinh viên, nhưng cặp \`(ma_sinh_vien, ma_mon_hoc)\` thì chỉ được xuất hiện duy nhất 1 lần.`,

  "isql14": `🎯 Bản chất dễ hiểu:
Người dùng MỚI NHẤT tức là người có thời gian tạo \`created_at\` lớn nhất (gần hiện tại nhất).
Do đó phải sắp xếp giảm dần \`ORDER BY created_at DESC\` và lấy 100 dòng đầu tiên bằng \`LIMIT 100\`.`,

  "isql15": `🎯 Bản chất dễ hiểu (Ẩn dụ mục lục sách):
Index trong database giống như Mục Lục ở cuối cuốn từ điển.
• Cần đánh Index (thường là B-Tree Index) trên các cột thường xuyên xuất hiện trong mệnh đề \`WHERE\`, \`JOIN\`, \`ORDER BY\`.
• BẪY TỐI KỴ: Không bao giờ bọc hàm xung quanh cột có Index, ví dụ viết \`WHERE YEAR(created_at) = 2026\` sẽ làm vô hiệu hóa hoàn toàn Index và khiến Database phải quét toàn bộ bảng (Full Table Scan)! Phải viết thành: \`WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'\`.`,

  "isql16": `🎯 Bản chất dễ hiểu:
VIEW là một **Bảng Ảo** được định nghĩa bằng một câu lệnh SELECT lưu trữ trong Database. Bản thân View không hề chứa dữ liệu riêng trên ổ cứng.
Mục đích sử dụng:
1. Bảo mật: Ẩn bớt các cột nhạy cảm (như mật khẩu, lương) và chỉ cấp quyền cho user xem qua View.
2. Đơn giản hóa: Gom câu query JOIN 5-6 bảng phức tạp thành 1 View gọn gàng để lập trình viên chỉ cần \`SELECT * FROM view_doanh_thu\`.`,

  "isql17": `🎯 Bản chất dễ hiểu:
Trong JDBC có 3 loại Statement:
1. \`Statement\`: Dùng cho câu lệnh SQL tĩnh không có tham số (Rất nguy hiểm vì dễ bị nối chuỗi dính SQL Injection).
2. \`PreparedStatement\`: Dùng cho câu lệnh có tham số \`?\`. Được biên dịch trước, chống 100% SQL Injection và chạy nhanh hơn.
3. \`CallableStatement\`: Dùng riêng để gọi các **Stored Procedure** hoặc Function được viết sẵn trong cơ sở dữ liệu.`,

  "isql18": `🎯 Bản chất dễ hiểu:
Ngoài chống SQL Injection, PreparedStatement vượt trội về hiệu năng nhờ cơ chế **Query Plan Caching**:
Mỗi khi nhận 1 câu SQL, CSDL phải tốn CPU làm 4 bước: Kiểm tra cú pháp -> Kiểm tra ngữ nghĩa -> Tối ưu hóa đường đi -> Biên dịch ra kế hoạch thực thi (Execution Plan).
Với PreparedStatement, CSDL làm 4 bước này duy nhất 1 lần và lưu kế hoạch vào bộ nhớ Cache. Các lần gọi tiếp theo chỉ việc nạp tham số mới vào chạy ngay, giúp tiết kiệm tới 80% tải CPU cho Database Server khi chạy các vòng lặp thêm/sửa hàng loạt.`,

  "isql19": `🎯 Bản chất dễ hiểu (Ẩn dụ tủ quần áo ngăn nắp):
• Sơ đồ ERD: Bản vẽ thiết kế kiến trúc các thực thể và mối quan hệ giữa chúng trước khi bắt tay vào tạo bảng.
• Chuẩn hóa dữ liệu (1NF, 2NF, 3NF): Giống như việc bạn phân loại đồ đạc vào đúng ngăn tủ để:
  1. Loại bỏ Dư thừa dữ liệu (không lưu trùng lặp 1 thông tin ở 10 nơi khác nhau).
  2. Tránh Dị thường khi cập nhật (sửa địa chỉ khách hàng ở bảng này nhưng quên sửa ở bảng kia).
  3. Bảo vệ Tính toàn vẹn dữ liệu.`,

  // ==========================================
  // 6. DEVOPS, TESTING & PROJECT (idv01 - idv09)
  // ==========================================
  "idv01": `🎯 Bản chất dễ hiểu:
Git Conflict xảy ra khi 2 lập trình viên cùng sửa đổi trên CÙNG MỘT DÒNG CODE ở 2 nhánh khác nhau, khiến Git không biết nên nghe theo ai.
Quy trình xử lý chuẩn của một kỹ sư chuyên nghiệp:
1. Mở file xung đột lên (chú ý các dấu mốc \`<<<<<<< HEAD\` và \`>>>>>>>\`).
2. Trao đổi trực tiếp với người đồng đội đã viết đoạn code đó để thống nhất giữ code nào, bỏ code nào hoặc kết hợp cả hai.
3. Chỉnh sửa code, xóa sạch các dấu mốc xung đột của Git.
4. Chạy lại bài test kiểm tra xem ứng dụng còn chạy tốt không.
5. Thực hiện \`git add\` và \`git commit\` để hoàn tất việc giải quyết conflict.`,

  "idv02": `🎯 Bản chất dễ hiểu:
Unit Test là việc kiểm thử ở mức độ nhỏ nhất: kiểm tra từng hàm/method đơn lẻ của một Class xem có cho kết quả đúng như kỳ vọng hay không.
Tại sao Unit Test cực kỳ quan trọng?
Theo mô hình Kim Tự Tháp Kiểm Thử (Testing Pyramid): Unit Test có tốc độ chạy nhanh nhất (vài mili-giây) và chi phí sửa lỗi rẻ nhất. Phát hiện bug ngay lúc viết code giúp bạn tự tin Refactor (tối ưu cấu trúc) mã nguồn trong tương lai mà không sợ làm hỏng các tính năng cũ đang chạy ổn định.`,

  "idv03": `🎯 Bản chất dễ hiểu:
Trong mô hình Agile/Scrum, một chu kỳ phát triển gọi là **Sprint**, thường kéo dài từ **1 đến 4 tuần** (phổ biến nhất là 2 tuần).
Mỗi Sprint bắt buộc gồm 4 sự kiện cốt lõi:
1. Sprint Planning (Đầu Sprint): Họp lên kế hoạch chọn các công việc sẽ làm.
2. Daily Scrum (Hàng ngày 15 phút): Báo cáo 3 câu hỏi (Hôm qua làm gì? Hôm nay làm gì? Có khó khăn gì cản trở không?).
3. Sprint Review (Cuối Sprint): Demo sản phẩm chạy được cho khách hàng/Product Owner xem và nhận góp ý.
4. Sprint Retrospective (Họp cải tiến nội bộ): Đội ngũ cùng nhìn lại xem Sprint qua điều gì làm tốt, điều gì làm dở và cần cải tiến hành động gì trong Sprint tới.`,

  "idv04": `🎯 Bản chất dễ hiểu:
Để phỏng vấn thể hiện tư duy kiểm thử sâu sắc của một kỹ sư phần mềm, đừng chỉ nói "kiểm tra đúng pass thì vào". Phải liệt kê đủ 4 nhóm test cases:
1. Luồng chuẩn (Happy Path): Nhập đúng username/password -> Đăng nhập thành công, chuyển hướng trang đúng, lưu token vào cookie.
2. Luồng lỗi nghiệp vụ (Bad Cases): Sai mật khẩu, tài khoản chưa kích hoạt email, tài khoản bị admin khóa.
3. Kiểm tra tính hợp lệ (Validation): Để trống ô nhập, nhập ký tự đặc biệt, email sai định dạng.
4. Bảo mật & Tấn công (Security): Thử tấn công SQL Injection (\`' OR 1=1 --\`), tấn công XSS, và cơ chế Rate Limiting (nhập sai 5 lần liên tiếp thì tạm khóa tài khoản 15 phút để chống Brute-force).`,

  "idv05": `🎯 Bản chất dễ hiểu:
Một dự án phần mềm chuyên nghiệp luôn có ít nhất 3 môi trường tách biệt:
1. Dev (Development): Môi trường máy cá nhân của lập trình viên để tha hồ viết và test code nháp.
2. Staging / UAT: Môi trường có cấu hình giống hệt máy chủ thật để đội tester và khách hàng vào nghiệm thu tính năng.
3. Production (Prod): Môi trường máy chủ thật đang phục vụ hàng triệu người dùng thực tế.
File \`prod.env\` chứa các biến môi trường nhạy cảm của server thật (URL Database thật, API Key thanh toán thật, Secret Key JWT) và TUYỆT ĐỐI KHÔNG ĐƯỢC PUSH LÊN GITHUB CÔNG KHAI để tránh bị lộ lọt dữ liệu.`,

  "idv06": `🎯 Bản chất dễ hiểu (Ẩn dụ diễn viên đóng thế):
Khi viết Unit Test cho tầng \`UserService\`, mục tiêu là chỉ kiểm tra xem logic tính toán của UserService có đúng hay không. Bạn KHÔNG MUỐN kết nối vào Database thật (vì DB thật chạy chậm và làm bẩn dữ liệu).
Mockito là thư viện tạo ra các "Diễn viên đóng thế" (Mock objects):
• \`@Mock UserRepository userRepository\`: Tạo một repository giả.
• \`when(userRepository.findByEmail("a@gmail.com")).thenReturn(Optional.of(fakeUser))\`: Dạy cho diễn viên giả cách trả lời kịch bản.
• \`@InjectMocks UserService userService\`: Tự động nhét các diễn viên giả này vào UserService để bạn an tâm test độc lập.`,

  "idv07": `🎯 Bản chất dễ hiểu:
• Manual Testing (Thủ công): Con người tự click chuột và gõ phím. Cực kỳ tốt ở giai đoạn đầu của tính năng mới, kiểm tra cảm nhận người dùng (UX) và kiểm thử khám phá (Exploratory Testing). Nhược điểm: Chậm, tốn nhân lực và dễ sai sót khi phải lặp lại.
• Automation Testing (Tự động): Dùng code kịch bản (Selenium, Playwright, JUnit) chạy tự động. Thích hợp nhất cho **Kiểm thử hồi quy (Regression Testing)**: Mỗi khi lập trình viên sửa code và tạo Pull Request lên Git, kịch bản tự động chạy lại 500 bài test trong 2 phút để đảm bảo không có tính năng cũ nào bị hỏng.`,

  "idv08": `🎯 Bản chất dễ hiểu:
• Waterfall (Thác nước): Làm tuần tự như xây nhà bê-tông (Phân tích 3 tháng -> Thiết kế 2 tháng -> Lập trình 6 tháng -> Test 3 tháng). Khách hàng phải đợi 1 năm mới nhìn thấy phần mềm. Rủi ro khổng lồ: Nếu sau 1 năm khách đổi ý thì toàn bộ dự án bị đập đi xây lại!
• Agile / Scrum (Linh hoạt): Chia nhỏ thành từng chu kỳ ngắn 2 tuần (Sprint). Cứ sau 2 tuần là bàn giao 1 tính năng chạy được cho khách hàng sờ tận tay và góp ý ngay. Nhờ vậy thích ứng cực nhanh với thay đổi của thị trường và giảm thiểu rủi ro thất bại.`,

  "idv09": `🎯 Bản chất dễ hiểu (Kiến trúc tìm kiếm chịu tải cao):
Khi thiết kế ô tìm kiếm Shopee/Lazada, nếu người dùng gõ chữ "áo" mà backend query thẳng vào Database \`SELECT * FROM sp WHERE ten LIKE '%áo%'\` thì Database sẽ sập ngay lập tức!
Luồng xử lý kiến trúc chuẩn Backend:
1. Phía Client: Áp dụng **Debounce** (chờ user ngừng gõ phím 300-500ms mới phát request).
2. Tầng Caching: Kiểm tra từ khóa trong **Redis Cache** trước. Nếu có sẵn trong cache -> Trả về ngay trong 2 mili-giây.
3. Nếu Cache Miss: Dùng Search Engine chuyên dụng (**Elasticsearch**) hoặc truy vấn CSDL có đánh chỉ mục (Fulltext Index).
4. Luôn luôn **Phân trang (Pagination)**: Chỉ trả về 20 kết quả đầu tiên và chỉ chọn những cột cần thiết (\`id, name, thumbnail, price\`), không bao giờ dùng \`SELECT *\`.`,

  // ==========================================
  // 7. AI, LLM & TOOLING (iai01 - iai06)
  // ==========================================
  "iai01": `🎯 Bản chất dễ hiểu:
LLM (Large Language Model - Mô hình ngôn ngữ lớn như GPT-4, Claude, Gemini) là mạng nơ-ron học sâu được huấn luyện trên hàng nghìn tỷ từ ngữ từ khắp Internet.
Về bản chất xác suất: LLM hoạt động bằng cách dự đoán từ ngữ tiếp theo (Next-token prediction) có khả năng xuất hiện cao nhất dựa trên ngữ cảnh được cung cấp.
Trong phát triển phần mềm, LLM được ứng dụng để: Tự động hoàn thành code (Autocompletion), giải thích các đoạn mã phức tạp (Code explanation), tạo Unit Test tự động, phát hiện lỗ hổng bảo mật và hỗ trợ giải quyết lỗi (Debugging).`,

  "iai02": `🎯 Bản chất dễ hiểu (Công thức Prompt chuẩn 5 thành phần):
Để AI không trả lời lan man hoặc sinh ra code rác, một Prompt chuyên nghiệp cần có đủ 5 yếu tố:
1. Role (Vai trò): "Bạn là chuyên gia Senior Spring Boot & Database Architect."
2. Context (Bối cảnh): "Tôi đang xây dựng API giỏ hàng cho trang thương mại điện tử Next.js kết nối MongoDB."
3. Task (Yêu cầu cụ thể): "Hãy viết 1 API thêm sản phẩm vào giỏ hàng, có xử lý trừ số lượng tồn kho."
4. Constraints (Ràng buộc): "Sử dụng Java 17, xử lý Transaction bằng @Transactional, kiểm tra trường hợp tồn kho bằng 0 thì báo lỗi OutOfStockException."
5. Output Format (Định dạng đầu ra): "Chỉ trả về mã nguồn Service và DTO, có kèm chú thích tiếng Việt ngắn gọn."`,

  "iai03": `🎯 Bản chất dễ hiểu:
Code do AI sinh ra rất hay gặp hiện tượng **Ảo giác (Hallucination)** - tức là AI tự bịa ra những hàm hoặc thư viện hoàn toàn không tồn tại, hoặc sinh code có lỗ hổng bảo mật tiềm ẩn.
Quy trình của một kỹ sư phần mềm khi dùng code AI:
1. Đọc hiểu từng dòng code, không bao giờ Copy-Paste mù quáng.
2. Viết Unit Test để xác minh tính đúng đắn với các trường hợp biên (Edge Cases).
3. Kiểm tra bảo mật: Xem có bị lỗi SQL Injection, Hardcode mật khẩu hoặc rò rỉ dữ liệu nhạy cảm hay không.
4. Tối ưu lại cho đúng chuẩn quy ước mã nguồn (Coding Conventions) của dự án.`,

  "iai04": `🎯 Bản chất dễ hiểu (Ẩn dụ Tư vấn viên vs Nhân viên thực thi):
• Chatbot AI (như ChatGPT giao diện web): Hoạt động theo cơ chế Single-turn Request/Response. Bạn hỏi 1 câu thì nó trả lời 1 đoạn văn bản rồi đứng yên đó chờ lệnh tiếp theo. Nó không thể tự chạm vào máy tính của bạn.
• AI Agent (như Antigravity, Devin, Claude Code): Là một thực thể có trí tuệ tự hành (Autonomous Agency). Nó có:
  1. Mục tiêu (Goal): Nhận 1 nhiệm vụ lớn phức tạp.
  2. Lập kế hoạch (Planning & Reasoning): Tự chia nhiệm vụ thành 10 bước nhỏ.
  3. Sử dụng công cụ (Tool Use): Tự mở terminal chạy lệnh build, tự đọc file, tự sửa mã nguồn, tự chạy test.
  4. Tự sửa sai (Self-Correction): Nếu test báo đỏ, Agent tự phân tích lỗi và sửa lại code cho đến khi test xanh mới thôi!`,

  "iai05": `🎯 Bản chất dễ hiểu (Cuốn sổ tay chỉ dẫn dự án):
Khi bạn mới vào công ty, đồng đội đưa cho bạn cuốn sổ tay hướng dẫn dự án: Công ty dùng tech stack gì, code đặt ở thư mục nào, quy tắc đặt tên ra sao, cách chạy test thế nào.
File \`claude.md\` hoặc \`AGENTS.md\` chính là "Cuốn sổ tay hướng dẫn dành riêng cho AI Coding Assistant".
Nó cung cấp ngữ cảnh hệ thống bền vững (Persistent System Context) để mỗi khi AI tham gia vào dự án, nó luôn tuân thủ 100% chuẩn mực kỹ thuật của đội ngũ, không tự ý cài thư viện lung tung hoặc sinh code lạc quẻ.`,

  "iai06": `🎯 Bản chất dễ hiểu:
Mô hình LLM sinh văn bản theo từng từ một (Autoregressive generation - từng token nối tiếp nhau).
Nếu bạn đợi AI viết xong toàn bộ bài văn 1.000 từ rồi mới gửi về qua HTTP response thông thường, người dùng sẽ phải ngồi nhìn màn hình quay quay trong 20-30 giây (trải nghiệm cực kỳ tệ và tưởng ứng dụng bị đơ).
Bằng cách sử dụng **Server-Sent Events (SSE)** với header \`Content-Type: text/event-stream\`:
Backend sẽ "bắn" từng chữ (token) về trình duyệt ngay khi nó vừa được AI nghĩ ra trong vòng 0.5 giây đầu tiên. Người dùng nhìn thấy con trỏ gõ chữ từng ký tự mượt mà trước mắt, tạo cảm giác hệ thống phản hồi tức thì!`
};

// Update explanations for all quizzes
function enrichQuiz(quiz) {
  let count = 0;
  const enrichedQuestions = quiz.questions.map(q => {
    if (explanationsMap[q.id]) {
      count++;
      return {
        ...q,
        explanation: explanationsMap[q.id]
      };
    }
    return q;
  });
  console.log(`Quiz [${quiz.slug}]: Enriched ${count}/${quiz.questions.length} questions`);
  return {
    ...quiz,
    questions: enrichedQuestions
  };
}

const enrichedSql = enrichQuiz(currentData.interviewSql);
const enrichedJavaCore = enrichQuiz(currentData.interviewJavaCore);
const enrichedSpring = enrichQuiz(currentData.interviewSpring);
const enrichedReact = enrichQuiz(currentData.interviewReact);
const enrichedWeb = enrichQuiz(currentData.interviewWeb);
const enrichedDevOps = enrichQuiz(currentData.interviewDevOps);
const enrichedAi = enrichQuiz(currentData.interviewAi);

const enrichedAllQuestions = [
  ...enrichedSql.questions,
  ...enrichedJavaCore.questions,
  ...enrichedSpring.questions,
  ...enrichedReact.questions,
  ...enrichedWeb.questions,
  ...enrichedDevOps.questions,
  ...enrichedAi.questions,
];

const enrichedAll = {
  ...currentData.interviewAll,
  questions: enrichedAllQuestions
};

console.log(`Aggregated total in interviewAll: ${enrichedAllQuestions.length} questions.`);

// Reconstruct interviewData.js
const newFileContent = `// Bộ câu hỏi ôn tập phỏng vấn 1-1 phân loại theo từng dạng chuyên đề (Có song ngữ EN & VI):
export const interviewSql = ${JSON.stringify(enrichedSql, null, 2)};
export const interviewJavaCore = ${JSON.stringify(enrichedJavaCore, null, 2)};
export const interviewSpring = ${JSON.stringify(enrichedSpring, null, 2)};
export const interviewReact = ${JSON.stringify(enrichedReact, null, 2)};
export const interviewWeb = ${JSON.stringify(enrichedWeb, null, 2)};
export const interviewDevOps = ${JSON.stringify(enrichedDevOps, null, 2)};
export const interviewAi = ${JSON.stringify(enrichedAi, null, 2)};
export const interviewAll = ${JSON.stringify(enrichedAll, null, 2)};

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

const interviewDataPath = path.resolve(__dirname, "../lib/interviewData.js");
fs.writeFileSync(interviewDataPath, newFileContent, "utf8");
console.log("Successfully wrote deeply enriched explanations to interviewData.js!");
