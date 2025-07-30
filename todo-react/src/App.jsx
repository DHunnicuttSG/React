import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css'; // Import basic app styling

const API_BASE_URL = 'http://127.0.0.1:5000/todos'; // Ensure this matches your Flask API URL

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null); // State to hold the todo being edited

  // --- Fetch Todos (GET) ---
  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.error || err.message}`);
      } else if (err.request) {
        setError("Network error: No response from server. Is the backend running?");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // --- Add Todo (POST) ---
  const addTodo = async (newTodoData) => {
    setIsLoading(true); // You could have a separate form-specific loading state
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, newTodoData);
      setTodos(prevTodos => [...prevTodos, response.data]); // Add new todo to state
      setTodoToEdit(null); // Clear form after adding
      return true; // Indicate success
    } catch (err) {
      console.error("Failed to add todo:", err);
      setError(err.response?.data?.error || err.message || "Could not add todo.");
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  // --- Update Todo (PUT) ---
  const updateTodo = async (id, updatedTodoData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTodoData);
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? response.data : todo))
      );
      setTodoToEdit(null); // Clear form after editing
      return true; // Indicate success
    } catch (err) {
      console.error("Failed to update todo:", err);
      setError(err.response?.data?.error || err.message || "Could not update todo.");
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  // --- Delete Todo (DELETE) ---
  const deleteTodo = async (id) => {
    // Using a simple window.confirm for demonstration. For production, use a custom modal.
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setError(err.response?.data?.error || err.message || "Could not delete todo.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Form Submission (Add or Edit) ---
  const handleFormSubmit = async (todoData) => {
    if (todoToEdit) {
      // It's an edit operation
      return await updateTodo(todoToEdit.id, todoData);
    } else {
      // It's an add operation
      return await addTodo(todoData);
    }
  };

  // --- Handle Edit Button Click ---
  const handleEditClick = (todo) => {
    setTodoToEdit(todo);
  };

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>

      <TodoForm onSubmit={handleFormSubmit} todoToEdit={todoToEdit} />

      {isLoading && <p className="loading-message">Loading todos...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!isLoading && !error && todos.length === 0 && (
        <p className="no-todos-message">No todos found. Add one above!</p>
      )}

      <div className="todo-list">
        {!isLoading && !error && todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEditClick}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
