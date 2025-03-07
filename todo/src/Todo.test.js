import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe("Todo List", () => {
  test("renders input field and add button", () => {
    render(<Todo />);
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
  });

  test("adds a new todo", async () => {
    render(<Todo />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // Chờ todo xuất hiện
    expect(await screen.findByText("New Todo")).toBeInTheDocument();
  });

  test("marks a todo as complete/incomplete", async () => {
    render(<Todo />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    // Chờ checkbox xuất hiện
    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("edits a todo", async () => {
    render(<Todo />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");
  
    // Nhập nội dung vào ô input và thêm todo
    fireEvent.change(input, { target: { value: "Editable Todo" } });
    fireEvent.click(addButton);
  
    // Đợi Todo xuất hiện
    await screen.findByText("Editable Todo");
  
    // Click nút Edit
    const editButton = screen.getByTestId("edit-button-0");
    fireEvent.click(editButton);
  
    // Tìm input thực sự bên trong MUI TextField
    const editContainer = await screen.findByTestId("edit-input-0");
    const editInput = editContainer.querySelector("input"); // Lấy input thực tế
  
    // Kiểm tra xem đã tìm được input
    expect(editInput).toBeTruthy();
  
    // Chỉnh sửa nội dung và blur để lưu
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "Updated Todo");
    fireEvent.blur(editInput);
  
    // Kiểm tra Todo đã được cập nhật
    expect(await screen.findByText("Updated Todo")).toBeInTheDocument();
  });
  
  test("deletes a todo", async () => {
    render(<Todo />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, { target: { value: "Delete Me" } });
    fireEvent.click(addButton);

    const deleteButton = await screen.findByTestId("delete-button-0");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });

  test("prevents adding empty todos", () => {
    render(<Todo />);
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    // Không có todo nào được thêm
    expect(screen.queryByTestId("todo-item")).not.toBeInTheDocument();
  });
});
