import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Button, TextField, Card, CardContent, IconButton, Snackbar, Alert } from "@mui/material";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity, duration: 5000 }); 
  };  

  const addTodo = () => {
    if (!newTodo.trim()) {
      showAlert("Todo không thể để trống!", "warning");
      return;
    }
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
    showAlert("Thêm Todo thành công!", "success");
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    showAlert(`Todo đã được ${updatedTodos[index].completed ? "hoàn thành" : "bỏ hoàn thành"}!`, "info");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    showAlert("Xóa Todo thành công!", "error");
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      showAlert("Nội dung Todo không thể trống!", "warning");
      return;
    }
    const updatedTodos = [...todos];
    updatedTodos[editIndex].text = editText;
    setTodos(updatedTodos);
    setEditIndex(null);
    showAlert("Cập nhật Todo thành công!", "success");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 16, backgroundColor: "white", borderRadius: 8, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>Todo List</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          data-testid="todo-input"
          className="border p-2 w-full rounded"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()} 
        />
        <Button
          data-testid="add-button"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          + Add
        </Button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <Card key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, marginBottom: 8 }}>
            <CardContent style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              {editIndex === index ? (
                <>
                  <TextField
                    data-testid={`edit-input-${index}`}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    autoFocus
                    fullWidth
                  />
                  <IconButton data-testid={`submit-button-${index}`} onClick={saveEdit} color="success">
                    ✅
                  </IconButton>
                </>
              ) : (
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
              )}
            </CardContent>
            <div>
              <IconButton data-testid={`edit-button-${index}`} onClick={() => startEdit(index)} color="primary">
                <Pencil size={16} />
              </IconButton>
              <IconButton data-testid={`delete-button-${index}`} onClick={() => deleteTodo(index)} color="secondary">
                <Trash size={16} />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>

      <Snackbar open={alert.open} autoHideDuration={alert.duration} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

