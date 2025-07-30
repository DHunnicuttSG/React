import React, { useState, useEffect } from 'react';
import './TodoForm.css'; // Import form styling

function TodoForm({ onSubmit, todoToEdit }) {
  const [todoText, setTodoText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [finishedStatus, setFinishedStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null); // Error specific to form submission

  // Populate form fields if a todoToEdit is provided
  useEffect(() => {
    if (todoToEdit) {
      setTodoText(todoToEdit.todo);
      setNoteText(todoToEdit.note || ''); // Ensure note is not null
      setFinishedStatus(todoToEdit.finished);
    } else {
      // Clear form when no todo is being edited
      setTodoText('');
      setNoteText('');
      setFinishedStatus(false);
    }
    setFormError(null); // Clear form-specific errors on edit/clear
  }, [todoToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // Basic validation
    if (!todoText.trim()) {
      setFormError("To-Do text cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    const todoData = {
      todo: todoText.trim(),
      note: noteText.trim() || null, // Send null if note is empty
      finished: finishedStatus,
    };

    // Call the onSubmit prop passed from App.js
    const success = await onSubmit(todoData);
    if (!success) {
      setFormError("Operation failed. Please try again.");
    } else {
      // Form fields are cleared by the useEffect when todoToEdit becomes null
      // or if it was an add operation and successful.
    }
    setIsSubmitting(false);
  };

  const handleClearForm = () => {
    setTodoText('');
    setNoteText('');
    setFinishedStatus(false);
    setFormError(null);
    // If todoToEdit is set, this will effectively "cancel" the edit
    // by setting it back to null in the parent (App.js)
    if (todoToEdit && typeof onSubmit === 'function') {
      onSubmit(null); // A way to signal parent to clear todoToEdit, if onSubmit handles it
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>{todoToEdit ? 'Edit To-Do' : 'Add New To-Do'}</h3>
      <div className="form-group">
        <label htmlFor="todoText">To-Do:</label>
        <input
          type="text"
          id="todoText"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="noteText">Note (Optional):</label>
        <textarea
          id="noteText"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows="3"
        ></textarea>
      </div>
      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="finishedStatus"
          checked={finishedStatus}
          onChange={(e) => setFinishedStatus(e.target.checked)}
        />
        <label htmlFor="finishedStatus">Finished</label>
      </div>
      {formError && <p className="form-error">{formError}</p>}
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (todoToEdit ? 'Saving...' : 'Adding...') : (todoToEdit ? 'Save Changes' : 'Add To-Do')}
        </button>
        {todoToEdit && (
          <button type="button" onClick={() => setTodoToEdit(null)} className="cancel-button">
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;
