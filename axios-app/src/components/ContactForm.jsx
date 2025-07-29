// src/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import './ContactForm.css'; // Optional: for basic styling

function ContactForm({ onSubmit, contactToEdit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // This field is local to the UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null); // Error specific to form submission

  // Populate form fields if a contactToEdit is provided
  useEffect(() => {
    if (contactToEdit) {
      setFirstName(contactToEdit.firstName);
      setLastName(contactToEdit.lastName);
      setPhone(contactToEdit.phone);
      setEmail(contactToEdit.email);
      setCompany(contactToEdit.company || ''); // Ensure company is set, even if null/undefined
    } else {
      // Clear form when no contact is being edited
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setCompany('');
    }
    setFormError(null); // Clear form-specific errors on edit/clear
  }, [contactToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // Basic validation
    if (!firstName || !lastName || !email || !phone) {
      setFormError("Please fill in all required fields (First Name, Last Name, Email, Phone).");
      setIsSubmitting(false);
      return;
    }

    const contactData = {
      firstName,
      lastName,
      phone,
      email,
      company,
    };

    // Call the onSubmit prop passed from App.js
    const success = await onSubmit(contactData);
    if (!success) {
      setFormError("Operation failed. Please try again.");
    } else {
      // Form fields are cleared by the useEffect when contactToEdit becomes null
      // or if it was an add operation and successful.
    }
    setIsSubmitting(false);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>{contactToEdit ? 'Edit Contact' : 'Add New Contact'}</h3>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Company:</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        <small>(Company field is local and not saved to the public API)</small>
      </div>
      {formError && <p className="form-error">{formError}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (contactToEdit ? 'Updating...' : 'Adding...') : (contactToEdit ? 'Update Contact' : 'Add Contact')}
      </button>
    </form>
  );
}

export default ContactForm;