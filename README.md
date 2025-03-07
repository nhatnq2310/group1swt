Nguyễn Quang Nhật - SE160985
# Spring Boot REST API - Tổng Quan Dự Án

## 1. Giới Thiệu
Dự án này là một **Spring Boot REST API** cung cấp chức năng CRUD để quản lý mục (items). Nó tuân theo kiến trúc phân lớp gồm **Controller, Service và Repository**. API được kiểm thử bằng **JUnit và Mockito**, đảm bảo **độ phủ kiểm thử 80-90%**.

## 2. Cấu Trúc Dự Án
```
com.example.demo
│── CrudApplication.java  (Lớp chính - Main class)
│── controller
│   ├── ItemController.java  (Xử lý các yêu cầu HTTP)
│── entity
│   ├── Item.java  (Định nghĩa thực thể Item)
│── repository
│   ├── ItemRepository.java  (Xử lý truy vấn cơ sở dữ liệu)
│── service
│   ├── ItemService.java  (Xử lý logic nghiệp vụ CRUD)
```

### **Thư Mục Kiểm Thử (src/test/java/com/example/demo)**
```
com.example.demo
│── controller
│   ├── ItemControllerTest.java  (Kiểm thử API endpoint)
│── service
│   ├── ItemServiceTest.java  (Kiểm thử logic nghiệp vụ)
│── repository
│   ├── ItemRepositoryTest.java  (Kiểm thử thao tác cơ sở dữ liệu)
```

## 3. Giải Thích Từng Phần
### **1. Lớp Thực Thể (`Item.java`)**
- Đại diện cho đối tượng `Item` với các thuộc tính `id` và `name`.
- Sử dụng `@Entity` để ánh xạ với cơ sở dữ liệu.

### **2. Lớp Repository (`ItemRepository.java`)**
- Kế thừa `JpaRepository<Item, Long>` để có sẵn các phương thức CRUD.
- Xử lý tương tác trực tiếp với cơ sở dữ liệu.

### **3. Lớp Service (`ItemService.java`)**
- Chứa logic nghiệp vụ của CRUD.
- Sử dụng `@Service` để làm trung gian giữa Controller và Repository.
- Xử lý ngoại lệ và kiểm tra đầu vào.

### **4. Lớp Controller (`ItemController.java`)**
- Định nghĩa các API REST (`GET`, `POST`, `PUT`, `DELETE`).
- Sử dụng `@RestController` để xử lý yêu cầu HTTP.
- Trả về mã trạng thái phù hợp (ví dụ: 200 OK, 404 Not Found).

### **5. Kiểm Thử (`JUnit & Mockito`)**
- **Kiểm thử Service (`ItemServiceTest.java`)**:
  - Dùng Mockito để giả lập `ItemRepository`.
  - Kiểm tra logic nghiệp vụ và tương tác với repository.
- **Kiểm thử Controller (`ItemControllerTest.java`)**:
  - Dùng `MockMvc` để kiểm thử API REST.
  - Xác nhận mã trạng thái HTTP và phản hồi JSON.
- **Kiểm thử Repository (`ItemRepositoryTest.java`)**:
  - Kiểm thử thao tác cơ sở dữ liệu với H2 (DB trong bộ nhớ để kiểm thử).

## 4. Cách Đạt 80-90% Độ Phủ Kiểm Thử
Để đảm bảo độ phủ cao:
✅ **Giả lập phụ thuộc** trong kiểm thử service và controller.
✅ **Bao gồm các trường hợp thành công và thất bại** (ví dụ: không tìm thấy item).
✅ **Dùng `@DataJpaTest` cho kiểm thử repository** để xác nhận hoạt động với DB.

## 5. Các Best Practices Được Áp Dụng
🔹 **Kiến trúc phân lớp** (Controller → Service → Repository).  
🔹 **Dùng DTO để xử lý request tốt hơn** (nếu có).  
🔹 **Xử lý ngoại lệ hợp lý** (`@ExceptionHandler`).  
🔹 **Kiểm thử đơn vị & Độ phủ kiểm thử cao** với JUnit & Mockito.  
🔹 **Spring Boot Annotations** (`@RestController`, `@Service`, `@Repository`).  

