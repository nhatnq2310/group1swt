# Ứng dụng Todo List với React và Material-UI (MUI)

Ứng dụng Todo List đơn giản này được xây dựng bằng React và Material-UI (MUI). Nó cho phép người dùng thêm, chỉnh sửa, đánh dấu hoàn thành và xóa các công việc.

## Tính năng

* **Thêm công việc:** Người dùng có thể thêm công việc mới vào danh sách.
* **Chỉnh sửa công việc:** Người dùng có thể chỉnh sửa nội dung của công việc hiện có.
* **Đánh dấu hoàn thành:** Người dùng có thể đánh dấu công việc là đã hoàn thành.
* **Xóa công việc:** Người dùng có thể xóa công việc khỏi danh sách.

## Cấu trúc thư mục

src/
├── components/
│   ├── Todo.js         # Component Todo riêng lẻ
│   ├── TodoForm.js     # Component form thêm/chỉnh sửa Todo
│   └── TodoList.js     # Component danh sách Todo
├── App.js             # Component App chính
└── index.js           # Điểm vào của ứng dụng


## Giải thích code chính

* **`App.js`**:
    * Quản lý trạng thái của danh sách công việc.
    * Cung cấp các hàm để thêm, chỉnh sửa, hoàn thành và xóa công việc.
    * Render component `TodoList`.
* **`TodoList.js`**:
    * Hiển thị danh sách các công việc.
    * Sử dụng component `Todo` để render từng công việc.
* **`Todo.js`**:
    * Hiển thị một công việc riêng lẻ.
    * Cho phép chỉnh sửa và xóa công việc.
* **`TodoForm.js`**:
    * Cho phép người dùng thêm hoặc chỉnh sửa một công việc.

## Cài đặt và chạy ứng dụng

1.  Cài đặt các dependencies:

    ```bash
    npm install
    ```

2.  Chạy ứng dụng:

    ```bash
    npm start
    ```

## Dependencies

* React
* Material-UI (MUI)

## Cách sử dụng

* Nhập công việc mới vào ô input và nhấn Enter hoặc nút "Add".
* Nhấp vào công việc để đánh dấu là hoàn thành.
* Nhấn vào biểu tượng chỉnh sửa để chỉnh sửa công việc.
* Nhấn vào biểu tượng thùng rác để xóa công việc