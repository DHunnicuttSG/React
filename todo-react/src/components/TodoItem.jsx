import React from 'react';
import './TodoItem.css'; // Import item styling

function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <div className={`todo-item ${todo.finished ? 'finished' : ''}`}>
      <div className="todo-details">
        <h4 className="todo-text">{todo.todo}</h4>
        {todo.note && <p className="todo-note">Note: {todo.note}</p>}
        <span className="todo-status">Status: {todo.finished ? 'Finished' : 'Pending'}</span>
      </div>
      <div className="todo-actions">
        <button className="edit-button" onClick={() => onEdit(todo)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
