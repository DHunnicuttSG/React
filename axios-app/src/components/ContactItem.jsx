// src/components/ContactItem.jsx
import React from 'react';
import './ContactItem.css'; // Optional: for basic styling

function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-item">
      <div className="contact-details">
        <strong>{contact.firstName} {contact.lastName}</strong>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        {contact.company && <p>Company: {contact.company}</p>} {/* Only show if company exists */}
      </div>
      <div className="contact-actions">
        <button className="edit-button" onClick={() => onEdit(contact)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ContactItem;