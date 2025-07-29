// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactItem from './components/ContactItem';
import './App.css'; // Optional: for basic styling

const API_BASE_URL = 'http://contactlist.us-east-1.elasticbeanstalk.com/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null); // State to hold contact being edited

  // --- Fetch Contacts (GET) ---
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      // Map API response to desired structure for local use
      const fetchedContacts = response.data.map(apiContact => {
        const [firstName = '', lastName = ''] = apiContact.name ? apiContact.name.split(' ') : ['', ''];
        return {
          id: apiContact.id,
          firstName: firstName,
          lastName: lastName,
          email: apiContact.email,
          phone: apiContact.phone,
          company: apiContact.company || '', // Company is not from API, initialize or add if exists
        };
      });
      setContacts(fetchedContacts);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data || err.message}`);
      } else if (err.request) {
        setError("Network error: No response from server.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // --- Add Contact (POST) ---
  const addContact = async (newContactData) => {
    setIsLoading(true); // Can set specific form loading, but for simplicity, global loading
    setError(null);
    try {
      // Map to API's expected 'name' field
      const apiPayload = {
        name: `${newContactData.firstName} ${newContactData.lastName}`.trim(),
        email: newContactData.email,
        phone: newContactData.phone,
        // company is not sent to this API
      };
      const response = await axios.post(API_BASE_URL, apiPayload);
      const addedContact = response.data;
      
      // Update local state with the new contact including the ID from API
      setContacts(prevContacts => [
        ...prevContacts,
        {
          id: addedContact.id,
          firstName: newContactData.firstName,
          lastName: newContactData.lastName,
          email: newContactData.email,
          phone: newContactData.phone,
          company: newContactData.company, // Keep company in local state
        }
      ]);
      setContactToEdit(null); // Clear form after adding
      return true; // Indicate success
    } catch (err) {
      console.error("Failed to add contact:", err);
      setError(err.response?.data || err.message || "Could not add contact.");
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  // --- Update Contact (PUT) ---
  const updateContact = async (id, updatedContactData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Map to API's expected 'name' field
      const apiPayload = {
        name: `${updatedContactData.firstName} ${updatedContactData.lastName}`.trim(),
        email: updatedContactData.email,
        phone: updatedContactData.phone,
        // company is not sent to this API
      };
      const response = await axios.put(`${API_BASE_URL}/${id}`, apiPayload);
      const updatedApiContact = response.data;

      // Update local state
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === id
            ? {
                id: updatedApiContact.id, // Use ID from API response
                firstName: updatedContactData.firstName,
                lastName: updatedContactData.lastName,
                email: updatedContactData.email,
                phone: updatedContactData.phone,
                company: updatedContactData.company, // Keep company in local state
              }
            : contact
        )
      );
      setContactToEdit(null); // Clear form after editing
      return true; // Indicate success
    } catch (err) {
      console.error("Failed to update contact:", err);
      setError(err.response?.data || err.message || "Could not update contact.");
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  // --- Delete Contact (DELETE) ---
  const deleteContact = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (err) {
      console.error("Failed to delete contact:", err);
      setError(err.response?.data || err.message || "Could not delete contact.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Form Submission (Add or Edit) ---
  const handleFormSubmit = async (contactData) => {
    if (contactToEdit) {
      // It's an edit operation
      await updateContact(contactToEdit.id, contactData);
    } else {
      // It's an add operation
      await addContact(contactData);
    }
  };

  // --- Handle Edit Button Click ---
  const handleEditClick = (contact) => {
    setContactToEdit(contact);
  };

  return (
    <div className="app-container">
      <h1>My Contacts</h1>

      <ContactForm onSubmit={handleFormSubmit} contactToEdit={contactToEdit} />

      {isLoading && <p className="loading-message">Loading contacts...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!isLoading && !error && contacts.length === 0 && (
        <p className="no-contacts-message">No contacts found. Add one above!</p>
      )}

      <div className="contact-list">
        {!isLoading && !error && contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={handleEditClick}
            onDelete={deleteContact}
          />
        ))}
      </div>
    </div>
  );
}

export default App;