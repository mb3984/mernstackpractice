import { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addTodo(newTodo);
      setNewTodo("");
      fetchTodos();
    }
  };

  const handleUpdateTodo = async (id) => {
    if (editText.trim()) {
      await updateTodo(id, editText);
      setEditTodoId(null);
      setEditText("");
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };
  return (
    <>
      <h2>TodoList</h2>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleUpdateTodo(todo._id)}>
                  update
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button
                  onClick={() => {
                    setEditTodoId(todo._id);
                    setEditText(todo.text);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
