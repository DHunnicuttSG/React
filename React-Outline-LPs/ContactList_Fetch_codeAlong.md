# Building a React CRUD Application

This lesson will guide you through building a client-side React application that performs CRUD operations on contact data. The application will use React Hooks for state management, Bootstrap for styling, and interact with a backend API for data persistence.

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

* Set up a new React project.
* Understand and implement functional components with React Hooks (useState, useEffect).
* Manage application-level and component-level state.
* Design and build reusable React components (UserTable, AddUserForm, EditUserForm).
* Integrate with a RESTful API using the fetch API for CRUD operations (GET, POST, PUT, DELETE).
* Apply basic styling using React-Bootstrap.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
* Node.js (LTS version recommended)
* npm (Node Package Manager, comes with Node.js) or Yarn
* A code editor (e.g., VS Code)

### 🚀 Step 1: Project Setup
First, let's create a new React project and install the necessary dependencies.

1. Create a New React App:

Open your terminal or command prompt and run:
```bash
npm create vite@latest

# follow the prompts and name your project contact-crud-app
# *** be sure to use only lowercase letters in the project name
# choose React as framework
# choose javascript  
```

2. Install React-Bootstrap:

We'll use React-Bootstrap for easy styling and responsive components.
```bash
npm install react-bootstrap bootstrap
```

3. Clean Up Boilerplate (Optional but Recommended):
* Delete App.test.jsx, logo.svg, reportWebVitals.jsx, and setupTests.jsx from the src folder.
* Modify src/App.jsx and src/index.jsx to remove references to the deleted files.

Your src/index.js should look something like this:
```React
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

And src/App.jsx will become the App.jsx file we'll build.

4. Create Component Folders:
Inside your src directory, create the following folders:
* src/tables
* src/Forms

Your src directory structure should now look like this:
```
src/
├── App.js (will be renamed to App.jsx)
├── index.js
├── index.css
├── Forms/
└── tables/
```

### 🧩 Step 2: Build the UserTable Component

This component will display the list of contacts in a table format.
1. Create src/tables/UserTable.jsx:
```React
import React from "react";
import { Table, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css"; // Already imported in App.jsx or index.js

const UserTable = (props) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th> {/* For Edit Button */}
          <th></th> {/* For Delete Button */}
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map((user) => (
            <tr key={user.contactId}>
              <td>{user.contactId} </td>
              <td>{user.firstName} </td>
              <td>{user.lastName} </td>
              <td>{user.company} </td>
              <td>{user.phone} </td>
              <td>{user.email} </td>
              <td>
                <Button variant="info" onClick={() => props.editRow(user)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => props.deleteUser(user.contactId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8}>No Users</td> {/* Adjusted colspan */}
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
```

* This component receives users, deleteUser, and editRow as props.
* It maps over the users array to create a table row for each user.
* key={user.contactId} is crucial for React's list rendering optimization.
* The "Edit" and "Delete" buttons trigger the respective functions passed from the parent component (App.jsx).

### 📝 Step 3: Build the AddUserForm Component

This component will provide a form for adding new contacts.

1. Create src/Forms/AddUserForm.jsx:

```React
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css' // Already imported

const AddUserForm = (props) => {
    // Initial state for a new user form
    const initialFormState = {
        contactId: null,
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: ''
    }
    // State hook to manage form input
    const [user, setUser] = useState(initialFormState)

    // Handles changes in form input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value }) // Update the specific field
    }

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault() // Prevent default form submission
                // Basic validation: ensure first name and last name are not empty
                if (!user.firstName || !user.lastName) return

                props.addUser(user) // Call the addUser function from props
                setUser(initialFormState) // Reset the form after submission
            }}
        >
            <div className='form-group col'>
                <label>First Name</label>
                <input type='text' name='firstName' value={user.firstName}
                    onChange={handleInputChange} className="form-control" /> {/* Added Bootstrap class */}
            </div>
            <div className='form-group col'>
                <label>Last Name</label>
                <input type='text' name='lastName' value={user.lastName}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Company</label>
                <input type='text' name='company' value={user.company}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Phone</label>
                <input type='text' name='phone' value={user.phone}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Email</label>
                <input type='text' name='email' value={user.email}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <Button variant="primary" type='submit' className="mt-3"> {/* Added Bootstrap class and margin */}
                Add New User
            </Button>
        </Form>
    )
}

export default AddUserForm
```

* Uses useState to manage the user object, representing the form's current input.
* handleInputChange is a generic handler for all input fields, updating the corresponding property in the user state.
* onSubmit prevents the default form behavior, calls the addUser function (passed via props) with the current user data, and then resets the form.

### ✏️ Step 4: Build the EditUserForm Component

This component will provide a form for editing existing contacts.
1. Create src/Forms/EditForm.jsx:

```React
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css' // Already imported

const EditUserForm = (props) => {
    // Initialize local state 'user' with the 'currentUser' passed as prop
    const [user, setUser] = useState(props.currentUser)

    // Update local 'user' state whenever 'props.currentUser' changes
    useEffect(() => {
        setUser(props.currentUser)
    }, [props.currentUser]) // Dependency array ensures effect runs when currentUser changes

    // Handles changes in form input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault()
                // Basic validation: ensure first name and last name are not empty
                if (!user.firstName || !user.lastName) return
                props.updateUser(user.contactId, user) // Call updateUser from props
            }}
        >
            <div className='form-group col'>
                <label>First Name</label>
                <input type='text' name='firstName' value={user.firstName}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Last Name</label>
                <input type='text' name='lastName' value={user.lastName}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Company</label>
                <input type='text' name='company' value={user.company}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Phone</label>
                <input type='text' name='phone' value={user.phone}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <div className='form-group col'>
                <label>Email</label>
                <input type='text' name='email' value={user.email}
                    onChange={handleInputChange} className="form-control" />
            </div>
            <Button variant="success" type='submit' className="mt-3"> {/* Added Bootstrap class and margin */}
                Update Contact
            </Button>
            <Button
                onClick={() => props.setEditing(false)}
                className='button muted-button mt-3 ms-2' // Added Bootstrap margin and spacing
                variant="secondary"
            >
                Cancel
            </Button>
        </Form>
    )
}

export default EditUserForm
```

* Uses useState to manage the user object, initialized with props.currentUser.
* useEffect is crucial here: it ensures that when a different user is selected for editing (i.e., props.currentUser changes), the form's local user state is updated accordingly.
* handleInputChange works similarly to AddUserForm.
* onSubmit calls the updateUser function (passed via props) with the contactId and the updatedUser data.
* The "Cancel" button simply sets editing to false in the parent component.

### 🏠 Step 5: Assemble App.jsx (Main Component)

This is the central component that manages the application's state and orchestrates the CRUD operations.

* Update src/App.jsx:

```React
import React, { useState, useEffect } from 'react';
import UserTable from './tables/UserTable'
import AddUserForm from './Forms/AddUserForm'
import EditUserForm from './Forms/EditForm'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => { // Removed props as it's not used directly here
  // This URL points to your backend Flask API.
  // IMPORTANT: Replace this with your actual backend URL if different.
  const SERVICE_URL = 'http://contactlist.us-east-1.elasticbeanstalk.com'

  // State to hold the list of users
  const [users, setUsers] = useState([]) // Start with an empty array for dynamic data

  // State to manage whether we are in "editing" mode or "adding" mode
  const [editing, setEditing] = useState(false)

  // State to hold the user currently being edited
  const initialFormState = {
    contactId: null,
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: ''
  }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  // --- CRUD Operations ---

  // READ: Fetches user data from the API
  const getUserData = () => {
    return fetch(SERVICE_URL + '/contacts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(users => {
        setUsers(users); // Update the users state with fetched data
        console.log('Fetched users:', users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        // Fallback to dummy data if API fails, useful for development
        setUsers([
          { contactId: 1, firstName: 'Ada', lastName: 'Lovelace', company: 'Babbage Inc.', phone: '555 - 1234', email: 'Ada@Babbage.com' },
          { contactId: 2, firstName: 'Charles', lastName: 'Babbage', company: 'Babbage Inc.', phone: '555 - 1224', email: 'Charles@Babbage.com' },
          { contactId: 3, firstName: 'Grace', lastName: 'Hopper', company: 'US Navy', phone: '555 - NAVY', email: 'Grace@USN.gov' },
        ]);
      });
  }

  // CREATE: Adds a new user to the API
  const addUser = (user) => {
    fetch(SERVICE_URL + '/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Add Contact - Success:', data);
        getUserData(); // Refresh the user list after adding
      })
      .catch((error) => {
        console.error('Add Contact - Error:', error);
      });
  }

  // DELETE: Deletes a user from the API
  const deleteUser = (contactId) => {
    console.log(`Submitting delete for contact id ${contactId}`)

    fetch(SERVICE_URL + '/contact/' + contactId, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // No need to parse JSON for DELETE if backend doesn't return body
        getUserData(); // Refresh the user list after deleting
        console.log('Delete successful');
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  }

  // UPDATE: Sets the form to editing mode and loads user data
  const editRow = (user) => {
    setEditing(true) // Switch to editing mode
    setCurrentUser({ // Set the current user for the EditForm
      contactId: user.contactId,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      phone: user.phone,
      email: user.email
    })
  }

  // UPDATE: Sends updated user data to the API
  const updateUser = (contactId, updatedUser) => {
    console.log(`Submitting edit for contact id ${contactId}`)
    console.log(updatedUser)

    fetch(SERVICE_URL + '/contact/' + contactId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Update Contact - Success:', data);
        setEditing(false) // Exit editing mode
        getUserData(); // Refresh the user list after updating
      })
      .catch((error) => {
        console.error('Error updating contact:', error);
      });
  }

  // useEffect Hook: Runs once after the initial render to fetch data
  useEffect(() => {
    getUserData()
  }, []) // Empty dependency array means this runs only once on mount


  return (
    <Container className="mt-5"> {/* Added margin top for better spacing */}
      <Row>
        <Col>
          <h1 className='text-center'>CRUD App with Hooks</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={9}>
          <h2>Contact Table</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow}
          />
        </Col>
        <Col sm={3}>
          {editing ? ( // Conditionally render EditForm or AddUserForm
            <div>
              <h2>Edit Contact</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h2>Add Contact</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
        </Col>
      </Row>
    </Container>
  )
}

export default App;
```

* State Management:
    * users: Stores the list of all contacts.
    * editing: A boolean to switch between "add user" and "edit user" forms.
    * currentUser: Stores the data of the user currently being edited.

* SERVICE_URL: Crucial! This is the endpoint for your backend API. Make sure it's correct. The provided URL http://contactlist.us-east-1.elasticbeanstalk.com is an example; you'll need to replace it with your actual Flask backend URL.

* CRUD Functions (getUserData, addUser, deleteUser, updateUser): These functions handle the API calls using fetch. They update the users state after successful operations.

* useEffect: The useEffect hook with an empty dependency array ([]) ensures that getUserData() is called only once when the component mounts, fetching the initial list of contacts.

* Conditional Rendering: The editing state determines whether the AddUserForm or EditUserForm is displayed.

* Props Passing: All necessary functions and data are passed down to child components as props.

### 🚀 Step 6: Run the Application

Now that all the components are in place, you can run your React application.

1. Start the React Development Server:In your terminal, from the contact-crud-app directory, run:
```bash
npm run dev
```

This will open your application in your default web browser, usually at 

`http://localhost:5173`.

**\*\*Front end apps will have different ports they use\*\***

2. Ensure Backend API is Running:

For the CRUD operations to work, your backend Flask API (or whatever backend you're using at SERVICE_URL) must be running and accessible. If you're running a Flask app locally, ensure it's on the correct port (e.g., http://localhost:5000) and has CORS enabled.
### 🎉 Conclusion

Congratulations! You've just built a functional React CRUD application. You've learned how to:

* Structure a React project with multiple components.
* Manage state effectively using useState and useEffect.
* Pass data and functions between parent and child components using props.
* Perform asynchronous operations (API calls) using fetch.
* Conditionally render components based on application state.

Next Steps:

* Implement your Backend API: If you haven't already, set up a backend API (like the Flask example you saw earlier) that handles /contacts (GET), /contact/ (POST), /contact/{id} (PUT, DELETE) requests.

* Add Input Validation: Enhance the forms with more robust client-side input validation.

* Error Handling UI: Display user-friendly error messages if API calls fail.

* Loading States: Add loading indicators while data is being fetched or updated.

* Styling Improvements: Explore more advanced Bootstrap features or custom CSS.

* Routing: For multi-page applications, consider adding React Router.