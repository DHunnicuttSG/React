# Day 6: Forms & Controlled Components (5 hours)
### Learning Objectives:
* Understand the concept of controlled components in React.
* Handle various form input types (text, textarea, select, checkbox, radio).
* Implement form submission logic.
* Perform basic client-side form validation.

**Concepts Explained:**
**Controlled Components:**

In React, a "controlled component" is an input form element whose value is managed entirely by React state. This means that React's state is the "single source of truth" for the input data. Whenever the input's value changes (e.g., the user types), the change is first reflected in React's state, and then React re-renders the component to update the input's value attribute.

**Key characteristics:**

The value attribute of the input is directly bound to a piece of React state.

An onChange event handler is crucial. This handler updates the React state whenever the input's value changes, typically using setState. Without onChange, the input would be read-only because its value is fixed by the initial state.

**Basic Example Structure:**

```JavaScript

import React, { useState } from 'react';

function ControlledInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value); // Update state with the new input value
  };

  return (
    <div>
      <label>
        Type something:
        <input
          type="text"
          value={inputValue} // Input's value is controlled by inputValue state
          onChange={handleChange} // onChange updates inputValue state
        />
      </label>
      <p>Current value: {inputValue}</p>
    </div>
  );
}

export default ControlledInput;
```

Handling Different Input Types:
The core principle of value and onChange applies across all form elements, but there are slight nuances for different types.

1. Text Inputs (```<input type="text">, <textarea>```):

```<input type="text">```: Straightforward. event.target.value gives the current text.

```<textarea>```: In HTML, ```<textarea>```'s value is typically between its tags. In React, you use the value prop just like a regular input.

```JavaScript

// Inside a component's render method or JSX:
const [message, setMessage] = useState('');

const handleMessageChange = (event) => {
  setMessage(event.target.value);
};

return (
  <div>
    <label>
      Your Message:
      <textarea value={message} onChange={handleMessageChange} rows="5" cols="30" />
    </label>
    <p>You wrote: {message}</p>
  </div>
);
```

2. Select Dropdowns (```<select>```):

The value prop is set on the ```<select>``` tag itself, not on the ```<option>``` tags.

The value prop determines which option is selected.

For multiple selections, you pass an array to value and set the multiple attribute on ```<select>```.

```JavaScript

// Inside a component's render method or JSX:
const [fruit, setFruit] = useState('apple'); // Default value

const handleFruitChange = (event) => {
  setFruit(event.target.value);
};

return (
  <div>
    <label>
      Choose a fruit:
      <select value={fruit} onChange={handleFruitChange}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="apple">Apple</option>
      </select>
    </label>
    <p>Selected fruit: {fruit}</p>
  </div>
);
```

3. Checkboxes (```<input type="checkbox">```):

Instead of value, you often use the checked prop (a boolean) to control a checkbox.  

event.target.checked gives the boolean state of the checkbox.

```JavaScript

// Inside a component's render method or JSX:
const [isChecked, setIsChecked] = useState(false);

const handleCheckboxChange = (event) => {
  setIsChecked(event.target.checked);
};

return (
  <div>
    <label>
      <input
        type="checkbox"
        checked={isChecked} // Controlled by isChecked state
        onChange={handleCheckboxChange} // Updates isChecked state
      />
      Subscribe to Newsletter
    </label>
    <p>Subscription status: {isChecked ? 'Subscribed' : 'Not Subscribed'}</p>
  </div>
);
```

4. Radio Buttons (```<input type="radio">```):

Radio buttons in a group share the same name attribute, but each has a unique value.

The checked prop is true for the selected radio button and false for others in the group.

The onChange handler updates the state with the value of the selected radio button.

```JavaScript

// Inside a component's render method or JSX:
const [gender, setGender] = useState('male'); // Default selection

const handleGenderChange = (event) => {
  setGender(event.target.value);
};

return (
  <div>
    <p>Select your gender:</p>
    <label>
      <input
        type="radio"
        name="gender"
        value="male"
        checked={gender === 'male'}
        onChange={handleGenderChange}
      />{' '}
      Male
    </label>
    <label>
      <input
        type="radio"
        name="gender"
        value="female"
        checked={gender === 'female'}
        onChange={handleGenderChange}
      />{' '}
      Female
    </label>
    <label>
      <input
        type="radio"
        name="gender"
        value="preferNotToSay"
        checked={gender === 'preferNotToSay'}
        onChange={handleGenderChange}
      />{' '}
      Prefer not to say
    </label>
    <p>Selected gender: {gender}</p>
  </div>
);
```

**Form Submission:**  
The onSubmit event handler is attached to the ```<form>``` element itself.

Inside the handler, event.preventDefault() is crucial. This method stops the default browser behavior of submitting the form, which typically involves a full page reload. By preventing this, you can handle the form submission with JavaScript (e.g., sending data to an API).

```JavaScript

const handleSubmit = (event) => {
  event.preventDefault(); // Prevents default form submission behavior
  console.log('Form submitted!');
  // Here you would process the form data, e.g., send it to an API
};

return (
  <form onSubmit={handleSubmit}>
    {/* ... form inputs ... */}
    <button type="submit">Submit</button>
  </form>
);
```

**Basic Form Validation:**

Client-side validation provides immediate feedback to the user, improving user experience. It typically involves:

* Checking for empty fields: Ensure required fields have values.

* Format validation: Checking if an email is a valid format, password meets length requirements, etc.

* Displaying error messages: Inform the user what needs to be corrected.

* Validation logic is usually performed within the onSubmit handler before processing the data.

**Examples:**  
Let's create a comprehensive "User Registration Form" that demonstrates all the concepts: controlled components, multiple input types, form submission, and basic client-side validation.

src/components/UserRegistrationForm.jsx

```JavaScript

import React, { useState } from 'react';

function UserRegistrationForm() {
  // State for all form fields
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    role: 'user', // Default value for select
    newsletter: false, // Default for checkbox
    gender: '', // Default for radio
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(''); // Success/Error message after submission

  // Generic handler for all text/select inputs using event.target.name
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox checked state
    }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.gender) {
        newErrors.gender = 'Please select a gender.';
    }
    // No validation for role/newsletter as they have default values or are optional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission

    setIsSubmitting(true);
    setSubmitMessage(''); // Clear previous messages

    const isValid = validateForm(); // Run client-side validation

    if (isValid) {
      try {
        // Simulate an API call
        console.log('Form data submitted:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        // Assuming successful submission
        setSubmitMessage('Registration successful! Welcome aboard.');
        // Optionally clear form data after successful submission
        setFormData({
            firstName: '',
            email: '',
            password: '',
            role: 'user',
            newsletter: false,
            gender: '',
        });
      } catch (error) {
        setSubmitMessage('Registration failed. Please try again later.');
        console.error('Submission error:', error);
      }
    } else {
      setSubmitMessage('Please correct the errors in the form.');
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name (Text Input) */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName" // Important for generic handleChange
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: errors.firstName ? '1px solid red' : '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.firstName && <p style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{errors.firstName}</p>}
        </div>

        {/* Email (Email Input) */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: errors.email ? '1px solid red' : '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{errors.email}</p>}
        </div>

        {/* Password (Password Input) */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: errors.password ? '1px solid red' : '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{errors.password}</p>}
        </div>

        {/* Role (Select Dropdown) */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Newsletter (Checkbox) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            Subscribe to Newsletter
          </label>
        </div>

        {/* Gender (Radio Buttons) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Gender:</label>
          <div>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                style={{ marginRight: '5px' }}
              />
              Male
            </label>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                style={{ marginRight: '5px' }}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="preferNotToSay"
                checked={formData.gender === 'preferNotToSay'}
                onChange={handleChange}
                style={{ marginRight: '5px' }}
              />
              Prefer not to say
            </label>
          </div>
          {errors.gender && <p style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{errors.gender}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1em',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
            transition: 'background-color 0.3s ease',
          }}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {/* Submission Message */}
        {submitMessage && (
          <p style={{
            marginTop: '15px',
            textAlign: 'center',
            color: submitMessage.includes('successful') ? 'green' : 'red',
            backgroundColor: submitMessage.includes('successful') ? '#e6ffe6' : '#ffe6e6',
            padding: '10px',
            borderRadius: '4px',
            border: `1px solid ${submitMessage.includes('successful') ? 'green' : 'red'}`,
          }}>
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default UserRegistrationForm;
```

How to run this example:

Create a new React app if you haven't already: ```npm create vite@latest``` 
* project Name: my-forms-app
* framework: React
* variant: Javascript

Navigate into the folder: cd my-forms-app

Replace the content of src/App.js with the UserRegistrationForm code. (Or better yet, create src/components/UserRegistrationForm.jsx and import it into App.js: import UserRegistrationForm from './components/UserRegistrationForm'; then render ```<UserRegistrationForm />``` in App.js's return statement).

Run the app: npm run dev

Exercises:
To-Do List Input: Create an input field and an "Add" button. When the button is clicked, add the input's value as a new to-do item to a list (from Day 3). Clear the input after adding.

Hint: Use useState for the input value and another useState for the array of to-do items.

Product Filter: A list of products with a search input. As the user types, filter the displayed products dynamically.

Hint: Store the full list of products in one state, and the search term in another. Filter the products array based on the search term before rendering.

Simple Calculator: Two input fields for numbers and a select dropdown for operation (+, -, *, /). A button to calculate and display the result.

Hint: Use useState for each number input, one for the selected operation, and one for the result.

Key Takeaways:
Controlled components ensure React manages form input values, making forms predictable and easier to validate. By binding input value to state and updating state with onChange, you create a robust and manageable data flow for all your forms.
