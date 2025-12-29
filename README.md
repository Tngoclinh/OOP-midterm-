# 🏥 Hệ Thống Quản Lý Bệnh Viện

Dự án **Hệ Thống Quản Lý Bệnh Viện** là một ứng dụng web full-stack được xây dựng để quản lý các hoạt động cốt lõi của một bệnh viện, bao gồm quản lý bệnh nhân, bác sĩ, khoa, và lịch hẹn khám.

Ứng dụng bao gồm một **backend** xây dựng bằng **Spring Boot (Java)** cung cấp các RESTful API và một **frontend** đơn giản bằng **HTML, CSS, và JavaScript** để tương tác với người dùng.

---

## ✨ Tính Năng Chính

* **Quản lý Bệnh nhân:** Thêm, sửa, xóa, và tìm kiếm thông tin bệnh nhân.
* **Quản lý Bác sĩ:** Thêm, sửa, xóa, và tìm kiếm thông tin bác sĩ.
* **Quản lý Khoa:** Quản lý danh sách các khoa trong bệnh viện.
* **Quản lý Lịch hẹn:** Tạo và quản lý các lịch hẹn khám giữa bác sĩ và bệnh nhân.
* **Quản lý Ca khám:** Thiết lập các ca làm việc cho bác sĩ.
* **Xác thực người dùng:** Đăng nhập/Đăng xuất để thực hiện các thao tác yêu cầu quyền.

---

## 🛠️ Công Nghệ Sử Dụng

### **Backend**

| Thành phần       | Công nghệ                   |
| :--------------- | :-------------------------- |
| ☕ Ngôn ngữ       | **Java 21**                 |
| 🧩 Framework     | **Spring Boot 3.x**         |
| 🗃️ ORM          | Spring Data JPA (Hibernate) |
| 🔐 Bảo mật       | Spring Security, JWT        |
| 🏦 Cơ sở dữ liệu | MySQL 8+                    |
| 🧰 Build Tool    | Maven                       |
| 📄 API Docs      | SpringDoc (OpenAPI/Swagger) |
| 💡 Thư viện      | Lombok, JJWT                |

### **Frontend**

| Thành phần    | Công nghệ                   |
| :------------ | :-------------------------- |
| 🌐 Ngôn ngữ   | HTML, CSS, JavaScript       |
| 📞 API Client | Fetch API                   |
| 🎨 Styling    | CSS thuần                   |
| 🏗️ Framework | Không sử dụng               |

---

## 📂 Cấu Trúc Dự Án

```
.
├── assets/
│   └── er_diagram.png      # Sơ đồ ERD
├── backend/
│   └── hospital/           # Source code Spring Boot
├── database/
│   └── back_up_hospital.sql # File backup CSDL
├── frontend/
│   └── index.html          # Giao diện người dùng chạy bắt đầu từ đây
└── README.md               # File hướng dẫn này
```

---

## 🗺️ Sơ Đồ Cơ Sở Dữ Liệu (ERD)

Cấu trúc quan hệ giữa các bảng trong cơ sở dữ liệu được minh họa dưới đây:

![Sơ đồ ERD của Bệnh viện](assets/erd-diagram-v2.png)

---

## 🎥 Video Demo Dự Án

👉 **YouTube Demo:** [https://www.youtube.com/watch?v=79ztaWB1HkY](https://www.youtube.com/watch?v=79ztaWB1HkY)

---

## 🚀 Hướng Dẫn Cài Đặt và Chạy Dự Án

### **Điều kiện tiên quyết**

* **JDK 21** hoặc mới hơn.
* **Maven 3.8** hoặc mới hơn.
* **MySQL 8.0** hoặc mới hơn.
* Một trình duyệt web hiện đại (Chrome, Firefox, Edge).

### **1. Cài Đặt Backend**

#### a. Khởi tạo Cơ sở dữ liệu

1. **Cài đặt và khởi động MySQL Server.**
2. Mở MySQL client (ví dụ: MySQL Workbench, DBeaver).
3. Mở cái file `database/back_up_hospital.sql` ra và ấn Execute All.


#### b. Cấu hình Backend

1. Mở file `backend/hospital/src/main/resources/application.properties`.
2. Chỉnh sửa các thông tin kết nối CSDL cho phù hợp với môi trường của bạn:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hospital
   spring.datasource.username=root
   spring.datasource.password=your_password_here
   app.upload-dir=your_assets_folder_here
   ```

   > Thay `your_password_here` bằng mật khẩu MySQL của bạn.
   > Thay `your_assets_folder_here` bằng đường dẫn đến folder assets ví dụ: file:C:/Users/ADMIN/Desktop/OOP-midterm--tmp-backup-version/OOP-midterm--main-lastest/assets`.

#### c. Chạy Backend

1. Mở terminal hoặc Command Prompt, di chuyển vào thư mục `backend/hospital`:

   ```sh
   cd backend/hospital
   ```
2. Sử dụng Maven để build và chạy ứng dụng:

   ```sh
   ./mvnw spring-boot:run
   ```
3. Backend sẽ khởi động và chạy tại địa chỉ `http://localhost:8080`.

### **2. Chạy Frontend**

1. Mở file `frontend/index.html` trực tiếp bằng trình duyệt web của bạn.
2. Giao diện quản lý sẽ hiển thị và tự động kết nối đến backend đang chạy ở `http://localhost:8080`.

> **Lưu ý:** Để thực hiện các chức năng thêm, sửa, xóa, bạn cần đăng nhập. Một tài khoản mặc định có thể đã được tạo sẵn trong file backup CSDL.

### **3. Kiểm tra API (Tùy chọn)**

Sau khi backend đã chạy, bạn có thể truy cập vào giao diện Swagger UI để xem danh sách các API và thử nghiệm chúng:

* **URL:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---
