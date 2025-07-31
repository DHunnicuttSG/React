# This section has NOT been tested

-----

## Day 6: Context API & State Management (5 hours)

Welcome back\! Today, we're tackling a common challenge in React applications: efficiently sharing "global" or "app-wide" data without resorting to tedious prop passing. We'll learn about React's built-in **Context API**, a powerful tool for state management that helps us avoid **prop drilling**.

-----

### **Section 1: The Problem of Prop Drilling (45 minutes)**

**Learning Objectives:**

  * Understand the limitations of prop drilling.
  * Review scenarios where props have to be passed through many levels.

**Concepts Explained:**

You've learned that props are the primary way to pass data down from parent components to child components. This works great for simple component hierarchies. However, as your application grows and components become deeply nested, you might encounter a pattern called **Prop Drilling**.

  * **Review Scenarios:**
    Imagine you have a piece of data (e.g., the currently logged-in user's information, or the current theme setting) that is defined at the very top of your application (`App.js`). Now, imagine a component that is several levels deep in your component tree needs access to this data.

    **Example Hierarchy:**

    ```
    App.js (has currentUser data)
      |
      -- Dashboard.jsx (receives currentUser, but doesn't use it)
         |
         -- Sidebar.jsx (receives currentUser, but doesn't use it)
            |
            -- UserProfileCard.jsx (receives currentUser, uses it to display name)
               |
               -- Avatar.jsx (receives currentUser, uses it to display profile picture)
    ```

    In this scenario, `Dashboard.jsx` and `Sidebar.jsx` don't actually *need* the `currentUser` data themselves. They simply act as intermediaries, passing the `currentUser` prop down to their children, who then pass it further down, until it finally reaches `UserProfileCard.jsx` and `Avatar.jsx` where it's actually used.

  * **What is Prop Drilling?**
    Prop drilling is the process of passing data from a parent component to a deeply nested child component by passing it through intermediate components that don't actually need the data themselves. They just "drill" the prop down.

  * **Limitations and Why It's a Problem:**

    1.  **Verbosity:** Your code becomes cluttered with props being passed down unnecessarily.
    2.  **Maintainability:** If you change the name of a prop, or if a new component in the middle needs to access that prop, you have to modify *every intermediate component* in the chain. This is tedious and error-prone.
    3.  **Readability:** It makes your component hierarchy harder to understand. It's not immediately clear which components genuinely use a prop versus which ones are just passing it along.
    4.  **Refactoring Complexity:** It makes it difficult to rearrange your component tree because of these tight dependencies on prop paths.

    Prop drilling is a clear signal that there might be a better way to manage and share that specific piece of data.

-----

### **Section 2: Context API (1 hour 45 minutes)**

**Learning Objectives:**

  * Learn how to use React's Context API for global state.
  * Understand `React.createContext()`, `Context.Provider`, and `useContext()`.
  * Know when to use Context vs. `useState`.

**Concepts Explained:**

React's **Context API** provides a solution to prop drilling. It allows you to create a "global" data store that can be accessed by any component within a specific part of your component tree, without explicitly passing props down at every level.

#### **1. Purpose of Context API:**

  * **Global Data Access:** Context provides a way to pass data through the component tree without having to pass props down manually at every level.
  * **Decoupling:** It decouples components that need data from components that provide data, reducing the need for intermediate components to know about data they don't use.
  * **Common Use Cases:** Theming (light/dark mode), user authentication status, preferred language, global settings, or any data that is considered "global" to a significant portion of your application.

#### **2. `React.createContext()`: Creating a Context Object**

This function creates a Context object. When React renders a component that subscribes to this Context object, it will read the current context value from the closest matching `Provider` above it in the tree.

  * It takes an optional `defaultValue` argument. This value is used when a component consumes the context but there's no matching `Provider` above it in the tree. This can be useful for testing components in isolation without wrapping them in a `Provider`.

    ```jsx
    // src/contexts/ThemeContext.js
    import React from 'react';

    // Create a Context object. 'light' is the default value.
    const ThemeContext = React.createContext('light');

    export default ThemeContext;
    ```

#### **3. `Context.Provider`: Providing the Context Value**

Every Context object comes with a `Provider` React component. The `Provider` component makes the context value available to any nested components that consume it.

  * It takes a `value` prop. This `value` is the data that you want to make available to all components within this Provider's subtree.

  * Any component inside the `Provider` (regardless of how deep) can access this `value`.

    ```jsx
    // src/App.js (or a dedicated ThemeProvider.jsx)
    import React, { useState } from 'react';
    import ThemeContext from './contexts/ThemeContext'; // Import the context

    function App() {
      const [theme, setTheme] = useState('light'); // State to manage the theme

      const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
      };

      return (
        // The Provider makes the 'theme' value and 'toggleTheme' function available
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {/* All components here and below can access the theme */}
          <button onClick={toggleTheme}>Toggle Theme</button>
          {/* ... other components ... */}
        </ThemeContext.Provider>
      );
    }
    ```

#### **4. `useContext()` Hook: Consuming the Context Value**

The `useContext` Hook is the modern way to read the current context value in a functional component.

  * It takes the Context object itself (e.g., `ThemeContext`) as an argument.

  * It returns the current value of that context as provided by the closest `Provider` above it.

    ```jsx
    // src/components/ThemedButton.jsx
    import React, { useContext } from 'react';
    import ThemeContext from '../contexts/ThemeContext'; // Import the context

    function ThemedButton() {
      // Consume the context value
      const { theme, toggleTheme } = useContext(ThemeContext);

      const buttonStyle = {
        backgroundColor: theme === 'dark' ? '#333' : '#eee',
        color: theme === 'dark' ? 'white' : 'black',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
      };

      return (
        <button style={buttonStyle} onClick={toggleTheme}>
          Current Theme: {theme.toUpperCase()}
        </button>
      );
    }

    export default ThemedButton;
    ```

#### **5. When to Use Context:**

Context API is powerful, but it's not a replacement for all `useState` needs.

  * **Use Context for "Global" or "App-Wide" Data:**

      * **Theming:** Light/dark mode, color palettes.
      * **User Authentication Status:** `isLoggedIn`, `currentUser` object, `login`/`logout` functions.
      * **Language Preferences:** `currentLanguage`, `setLanguage` function.
      * **Global Settings:** User preferences that affect many parts of the UI.
      * **Shopping Cart (Item Count/Basic State):** While full cart logic might use `useReducer` or a library, a simple item count can be in context.

  * **Do NOT Use Context for:**

      * **Local Component State:** If a component's state only affects itself and its immediate children (1-2 levels deep), `useState` and props are simpler and more appropriate.
      * **Frequent Updates:** If the context value changes very frequently, it might cause many components consuming it to re-render, potentially impacting performance. For high-frequency updates, consider other patterns or state management libraries.
      * **Complex Application State:** For very large and complex applications with intricate state transitions, dedicated state management libraries (like Redux, Zustand, Recoil) might offer more robust tools (middleware, dev tools, selectors). Context is great for simpler global state.

-----

### Examples:

Let's build out the theme switcher and user authentication examples.

#### **1. Theme Switcher:**

We'll create a `ThemeContext` to manage light or dark mode. A button in a child component will toggle the theme, and other components will consume the theme to change their styles.

**a. `src/contexts/ThemeContext.js`**

```jsx
// src/contexts/ThemeContext.js
import React from 'react';

// Create the ThemeContext with a default value (useful for testing or if no Provider is found)
const ThemeContext = React.createContext({
  theme: 'light', // Default theme
  toggleTheme: () => {}, // Default empty function
});

export default ThemeContext;
```

**b. `src/components/ThemeToggleButton.jsx`**

This component will toggle the theme.

```jsx
// src/components/ThemeToggleButton.jsx
import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext'; // Import the context

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Consume theme and toggle function

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1em',
    backgroundColor: theme === 'dark' ? '#6c757d' : '#007bff', // Different colors based on theme
    color: 'white',
    transition: 'background-color 0.3s ease',
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

export default ThemeToggleButton;
```

**c. `src/components/ThemedContent.jsx`**

This component will display content whose background and text color change with the theme.

```jsx
// src/components/ThemedContent.jsx
import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext'; // Import the context

function ThemedContent() {
  const { theme } = useContext(ThemeContext); // Consume only the theme value

  const contentStyle = {
    padding: '30px',
    margin: '20px 0',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: theme === 'dark' ? '#444' : '#f8f9fa', // Dark/light background
    color: theme === 'dark' ? '#f8f9fa' : '#343a40', // Dark/light text
    border: `1px solid ${theme === 'dark' ? '#666' : '#e0e0e0'}`,
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <div style={contentStyle}>
      <h3>This content changes with the theme!</h3>
      <p>Current theme is: **{theme.toUpperCase()}**</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  );
}

export default ThemedContent;
```

**d. `src/App.js` (Integrating the Theme Context)**

This component will provide the theme context to its children.

```jsx
// src/App.js
import React, { useState } from 'react';
import ThemeContext from './contexts/ThemeContext'; // Import the context
import ThemeToggleButton from './components/ThemeToggleButton';
import ThemedContent from './components/ThemedContent';

function App() {
  const [theme, setTheme] = useState('light'); // State to manage the current theme

  // Function to toggle the theme, passed down via context
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // The value provided to the context. It includes both the theme and the toggle function.
  const themeContextValue = { theme, toggleTheme };

  return (
    // Wrap the entire application (or a relevant part) with the ThemeContext.Provider
    <ThemeContext.Provider value={themeContextValue}>
      <div style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#222' : '#f0f2f5', // Global background based on theme
        color: theme === 'dark' ? '#eee' : '#333', // Global text color
        transition: 'background-color 0.3s ease, color 0.3s ease',
        padding: '20px',
        textAlign: 'center',
      }}>
        <h1>Context API Theme Switcher</h1>
        <ThemeToggleButton /> {/* This component consumes and changes the theme */}
        <ThemedContent /> {/* This component consumes the theme to style itself */}
        <ThemedContent /> {/* Another instance showing reusability */}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
```

*(Demonstrate toggling the theme and seeing all `ThemedContent` components update simultaneously. Explain how `ThemeContext.Provider` makes the `theme` and `toggleTheme` accessible without prop drilling.)*

-----

#### **2. User Authentication Context:**

Simulate a `UserContext` that holds the current user's name and a login/logout function. Components can access the user's name directly.

**a. `src/contexts/AuthContext.js`**

```jsx
// src/contexts/AuthContext.js
import React from 'react';

const AuthContext = React.createContext({
  user: null, // No user logged in by default
  login: (username) => {}, // Placeholder login function
  logout: () => {}, // Placeholder logout function
});

export default AuthContext;
```

**b. `src/components/AuthStatus.jsx`**

Displays login status and user name.

```jsx
// src/components/AuthStatus.jsx
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'; // Import context

function AuthStatus() {
  const { user, logout } = useContext(AuthContext); // Consume user and logout function

  if (!user) {
    return <p style={{ color: '#dc3545', fontWeight: 'bold' }}>Not logged in.</p>;
  }

  return (
    <div style={{ backgroundColor: '#d4edda', border: '1px solid #28a745', borderRadius: '8px', padding: '15px', margin: '10px auto', maxWidth: '300px' }}>
      <p style={{ color: '#28a745', margin: 0 }}>Logged in as: <strong>{user.username}</strong></p>
      <button
        onClick={logout}
        style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default AuthStatus;
```

**c. `src/components/LoginButton.jsx`**

A simple button to trigger login.

```jsx
// src/components/LoginButton.jsx
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'; // Import context

function LoginButton() {
  const { user, login } = useContext(AuthContext); // Consume user and login function

  if (user) {
    return null; // Don't show login button if already logged in
  }

  return (
    <button
      onClick={() => login('DemoUser')} // Call login function with a dummy username
      style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
    >
      Login
    </button>
  );
}

export default LoginButton;
```

**d. `src/App.js` (Integrating the Auth Context)**

Add the `AuthContext.Provider` to `App.js`.

```jsx
// src/App.js (updated to include Auth Context)
import React, { useState } from 'react';
// Theme Context Imports
import ThemeContext from './contexts/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';
import ThemedContent from './components/ThemedContent';
// Auth Context Imports
import AuthContext from './contexts/AuthContext';
import AuthStatus from './components/AuthStatus';
import LoginButton from './components/LoginButton';

function App() {
  // Theme State
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const themeContextValue = { theme, toggleTheme };

  // Auth State
  const [currentUser, setCurrentUser] = useState(null); // null means not logged in

  const login = (username) => {
    // In a real app, this would involve API calls, token storage, etc.
    setCurrentUser({ username: username });
    console.log(`${username} logged in.`);
  };

  const logout = () => {
    // In a real app, this would involve clearing tokens, etc.
    setCurrentUser(null);
    console.log('User logged out.');
  };

  const authContextValue = { user: currentUser, login, logout };

  return (
    // You can nest Providers if they manage different concerns
    <ThemeContext.Provider value={themeContextValue}>
      <AuthContext.Provider value={authContextValue}>
        <div style={{
          minHeight: '100vh',
          backgroundColor: theme === 'dark' ? '#222' : '#f0f2f5',
          color: theme === 'dark' ? '#eee' : '#333',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          padding: '20px',
          textAlign: 'center',
        }}>
          <h1>Context API Examples</h1>

          {/* Theme Section */}
          <h2>Theme Switcher</h2>
          <ThemeToggleButton />
          <ThemedContent />

          <hr style={{ margin: '40px auto', width: '80%', borderColor: theme === 'dark' ? '#555' : '#ddd' }} />

          {/* Authentication Section */}
          <h2>User Authentication</h2>
          <LoginButton />
          <AuthStatus />
          
          <div style={{ marginTop: '20px', fontSize: '0.9em', color: theme === 'dark' ? '#bbb' : '#666' }}>
            <p>Auth Status and Login Button are separate components, but share user data via Context.</p>
          </div>

        </div>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
```

*(Demonstrate logging in and out, and how `AuthStatus` updates without `App.js` directly passing props to it.)*

-----

### Exercises:

Time to apply what you've learned\!

1.  **Language Selector:**

      * Implement a `LanguageContext` (`currentLanguage`, `setLanguage`).
      * Create a `LanguageSwitcher` component (e.g., with buttons or a dropdown for English/Spanish).
      * Display a greeting message (e.g., "Hello\!" or "Hola\!") in a deeply nested component that consumes the `LanguageContext`.

2.  **Shopping Cart Item Count:**

      * Create a `CartContext` that stores only the `numberOfItems` in a shopping cart.
      * Create a `ProductPage` component with an "Add to Cart" button. When clicked, it should call a function from the context to increment `numberOfItems`.
      * Create a `Header` component that displays the total `numberOfItems` from the `CartContext`.

3.  **Notification System (Basic):**

      * Create a `NotificationContext` that can trigger and display temporary messages (e.g., "Item added to cart\!", "Login successful\!").
      * The context should manage an array of active notifications (e.g., `{ id: 1, message: '...', type: 'success' }`).
      * The context should provide a function like `showNotification(message, type)` that adds a new notification to the array and automatically removes it after a few seconds (`setTimeout`).
      * Create a `NotificationDisplay` component that consumes the context and renders the active notifications.
      * Have a button in a separate component somewhere in the app that calls `showNotification` from the context.

-----

### Key Takeaways:

  * **Prop drilling** is a common problem where props are passed unnecessarily through many component levels.
  * **Context API** solves prop drilling for data that needs to be accessible by many components at different nesting levels (e.g., theming, authentication, language).
  * Use **`React.createContext()`** to define the context.
  * Use **`Context.Provider`** to make data available to its subtree via the `value` prop.
  * Use the **`useContext()` Hook** to consume data from the context in functional components.
  * Context is for "global" data, not a replacement for all `useState` needs. Use `useState` for local component state.