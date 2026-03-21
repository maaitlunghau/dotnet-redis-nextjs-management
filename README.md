# Fullstack Product Management with Redis Caching 🚀

Chào mừng bạn đến với dự án Fullstack Product Management — một môi trường thực hành ứng dụng công nghệ hiện đại để giải quyết bài toán hiệu năng và quản lý dữ liệu hiệu quả.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Thành phần | Công nghệ |
| :--- | :--- |
| **Backend** | ![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat&logo=dotnet&logoColor=white) |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![TanStack Query](https://img.shields.io/badge/Tanstack%20Query-FF4154?style=flat&logo=react-query&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) |
| **Cache** | ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) |
| **Architecture** | Repository Pattern |

---

## 🏗️ Kiến trúc Repository Pattern

Dự án được xây dựng dựa trên Repository Pattern nhằm tạo ra sự tách biệt rõ ràng (Separation of Concerns):

- **Controllers**: Lớp giao tiếp API, xử lý các request/response.
- **Repositories**: Lớp trừu tượng hóa việc truy cập dữ liệu từ MySQL.
- **Caching Layer**: Hệ thống tầng đệm sử dụng Redis để giảm tải cho database, tăng tốc độ phản hồi cho người dùng cuối.

---

## 🎯 Mục đích của project

Dự án này được khởi tạo không chỉ để xây dựng một ứng dụng CRUD cơ bản, mà còn là một "phòng Lab" thực tế để:

1.  **Luyện tập kỹ năng Fullstack**: Kết nối mượt mà giữa ASP.NET Web API và Next.js.
2.  **Làm chủ Redis**: Hiểu rõ cơ chế Caching (Cache Aside), cách lưu trữ dữ liệu dạng Key-Value và quản lý vòng đời của cache (TTL).
3.  **Tối ưu hóa Performance**: Học cách giảm độ trễ (Latency) cho ứng dụng thông qua việc tận dụng In-memory database.
4.  **Kiến trúc sạch (Clean Code)**: Áp dụng Repository Pattern để mã nguồn linh hoạt, dễ kiểm thử và bảo trì.

---

## 💡 Hướng dẫn kỹ thuật (Tham khảo)

Dành cho việc tự học và triển khai thủ công:

### setup & Code Redis trong .NET Core
- Sử dụng package: `Microsoft.Extensions.Caching.StackExchangeRedis`.
- Đăng ký dịch vụ trong `Program.cs` thông qua `AddStackExchangeRedisCache`.
- Sử dụng interface `IDistributedCache` trong Controller để thực hiện logic Get/Set dữ liệu.

### Cấu hình TanStack Query trong Next.js
- Kết nối Client-side với API thông qua `QueryClientProvider`.
- Tận dụng `useQuery` và `useMutation` để quản lý trạng thái đồng bộ dữ liệu.
- Phối hợp nhịp nhàng giữa Cache tại Frontend (TanStack) và Cache tại Backend (Redis) để đạt hiệu năng tối đa.

---

## ✨ Mong muốn sau dự án

Sau khi hoàn thành project này, mục tiêu lớn nhất là có thể:
- Tự tin triển khai các hệ thống có sử dụng Redis làm cache.
- Hiểu được sự khác biệt về hiệu năng giữa việc truy vấn trực tiếp DB và truy vấn qua cache.
- Xây dựng được tư duy hệ thống (System Thinking) trong việc thiết kế luồng dữ liệu cho một ứng dụng thực tế.

---
*Chúc bạn có những giờ học tập và thực hành đầy hứng khởi!* 🎯
