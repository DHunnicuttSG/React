# This content has NOT been tested

-----

## Day 9: Data Fetching & Error Boundaries (5 hours)

Welcome back\! Today, we're making your React applications more robust and user-friendly. We'll learn how to handle the complexities of **data fetching**, including showing loading states and managing errors. Then, we'll introduce **Error Boundaries**, a crucial React feature for preventing your entire application from crashing due to unexpected rendering errors.

-----

### **Section 1: Advanced Data Fetching Patterns (2 hours 30 minutes)**

**Learning Objectives:**

  * Implement robust data fetching with loading and error states.
  * Understand conditional rendering based on loading, error, and data states.
  * Use `try...catch` with `axios` (or `fetch`) for network and HTTP error handling.

**Concepts Explained:**

When your React component fetches data from an API, it's not an instantaneous process. There are distinct phases, and we need to manage our component's state to reflect these phases to the user:

1.  **Loading State:** The period *while* the request is in progress. The user should see a "Loading..." message, spinner, or skeleton UI.
2.  **Success State:** When the data has been successfully retrieved. The UI should display the fetched data.
3.  **Error State:** If something goes wrong during the fetch (network issue, invalid response, API error).

We need to manage these states in our component's local state and conditionally render different UI elements based on them.

#### **1. Managing Loading State**

**(40 minutes - Lecture & Live Coding)**

The first step is to inform the user that something is happening. This is done with a `loading` state.

  * **How:** Use a boolean state variable, e.g., `isLoading`, initialized to `true` (since the fetch starts immediately). Set it to `false` once the data is received or an error occurs.
  * **Why:** Provides immediate feedback to the user, prevents them from thinking the app is frozen, and improves perceived performance.

**Live Coding Example: Basic User List with Loading**

Let's fetch a list of dummy users with a simulated delay using Axios.

```react
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // We'll use axios for this example

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial state: loading

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real app, this would be:
        // const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // setTodos(response.data);

        // For demonstration, use dummy data
        const dummyUsers = [
          { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
          { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
        ];
        setUsers(dummyUsers);

      } catch (error) {
        console.error("Error fetching users:", error);
        // We'll handle displaying errors in the next section
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUsers();
  }, []); // Empty dependency array: run once on mount

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2em', color: '#555' }}>
        Loading users...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #eee', borderRadius: '8px' }}>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{ border: '1px solid #f0f0f0', padding: '10px', marginBottom: '8px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;

// To use this in App.js:
// import UserList from './components/UserList';
// function App() { return <UserList />; }
```

*(Demonstrate the "Loading users..." message appearing for 2 seconds before the list shows up. Discuss putting this `UserList` component into `App.js`.)*

#### **2. Managing Error State (`try...catch` with `axios`)**

**(40 minutes - Lecture & Live Coding)**

Network requests can fail for many reasons: server down, no internet, invalid response. We need to catch these errors and display a helpful message to the user.

  * **How:**
      * Use another state variable, e.g., `error`, initialized to `null`.
      * Wrap your `async`/`await` `axios` call in a `try...catch` block.
      * `axios` automatically throws an error for *any* non-2xx HTTP status code, simplifying error checks compared to `fetch`.
      * In the `catch` block, set the `error` state with the error message.
  * **Why:** Informs the user something went wrong, helps with debugging, and prevents a broken UI.

**Live Coding Example: User List with Robust Error Handling**

Let's modify our `UserList` to handle errors. We'll simulate an API failure.

```react
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error message

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true); // Ensure loading state is true at the start of fetch
        setError(null); // Clear any previous errors

        // Simulate an API call that might fail (e.g., a bad URL)
        // const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Correct URL
        const response = await axios.get('https://jsonplaceholder.typicode.com/non-existent-endpoint'); // Simulate 404 error

        // Simulate a network error (uncomment to test)
        // throw new Error('Simulated network disconnected!');

        setUsers(response.data);

      } catch (err) {
        console.error("Failed to fetch users:", err);
        // Axios error object structure provides more details
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${err.response.status} - ${err.response.data.message || err.response.statusText || 'Server Error'}`);
        } else if (err.request) {
          // Request was made but no response received (e.g., network down)
          setError("Network error: No response from server. Check your internet connection or API status.");
        } else {
          // Something else happened while setting up the request
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false); // Always stop loading
      }
    };

    fetchUsers();
  }, []);

  // Conditional rendering order: isLoading -> error -> data
  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2em', color: '#555' }}>
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center', border: '1px solid red', borderRadius: '8px', backgroundColor: '#ffe6e6' }}>
        Error: {error}
      </div>
    ); // Display error
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #eee', borderRadius: '8px' }}>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{ border: '1px solid #f0f0f0', padding: '10px', marginBottom: '8px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
```

*(Demonstrate the error scenario by using the bad URL or uncommenting the `throw new Error` line. Show the red error message. Discuss the `finally` block for consistent `isLoading` state and the different types of `axios` errors.)*

#### **3. Conditional Rendering based on States**

**(30 minutes - Lecture & Discussion)**

The order of your `if` statements for `isLoading`, `error`, and data rendering matters for a logical flow:

1.  **`isLoading` check first:** This is usually the highest priority. If you're loading, nothing else should be displayed yet.
2.  **`error` check second:** If loading is complete but there was an error, display the error.
3.  **Data rendering last:** Only if not loading and no error occurred, display the actual data.

This ensures a clear and predictable UI flow for the user.

-----

### **Section 2: Error Boundaries (2 hours 30 minutes)**

**Learning Objectives:**

  * Understand the concept of Error Boundaries.
  * Learn how to implement a basic Error Boundary (using class components).
  * Differentiate between errors handled by `try...catch` and Error Boundaries.

**Concepts Explained:**

Even with robust data fetching and state management, unexpected JavaScript errors can occur during the **rendering phase** of your React components (e.g., trying to access a property of `null`, a typo in a variable name leading to a crash). By default, such an error will "unmount" your entire component tree, leading to a blank screen for the user.

#### **1. Purpose of Error Boundaries**

**(30 minutes - Lecture & Discussion)**

  * **Definition:** Error Boundaries are React components that **catch JavaScript errors anywhere in their child component tree**, log those errors, and display a fallback UI instead of crashing the entire application.
  * **Analogy:** Think of an Error Boundary as a "try...catch" block for your UI rendering. If a component *within* the boundary throws an error during rendering, the boundary catches it, and your application can still display *something* (e.g., "Something went wrong\!").
  * **What they catch:**
      * Errors in render method
      * Errors in lifecycle methods (e.g., `componentDidMount`, `componentDidUpdate` of class components)
      * Errors in constructors
      * Errors in event handlers (if re-thrown from a synchronous event handler that's part of the render flow).
  * **What they DO NOT catch:**
      * **Errors inside event handlers (unless specifically re-thrown):** E.g., a `console.log(null.property)` inside an `onClick` directly will not be caught by an Error Boundary. You should use regular `try...catch` inside event handlers.
      * Asynchronous code (e.g., `setTimeout` callbacks, `Promise.then()` callbacks, `fetch`/`axios` errors) *unless* these errors cause a render error. You must use `try...catch` for these.
      * Server-side rendering errors.
      * Errors thrown in the Error Boundary itself (it would crash).

#### **2. Implementation - Class Components (Required\!)**

**(40 minutes - Lecture & Live Coding)**

A key rule for Error Boundaries: **They must be class components.** Functional components and Hooks cannot currently be Error Boundaries.

An Error Boundary needs to implement at least one of these static lifecycle methods:

  * **`static getDerivedStateFromError(error)`:**

      * This static method is called when an error is thrown in a child component.
      * It receives the error as an argument.
      * It should return an object to update the state of the Error Boundary. This state update will trigger a re-render of the boundary with its fallback UI.
      * It's used to update the state to indicate an error has occurred (e.g., `hasError: true`).

  * **`componentDidCatch(error, errorInfo)`:**

      * This instance method is called after an error has been caught.
      * It receives the `error` and an `errorInfo` object (containing `componentStack` details).
      * This is typically where you would perform side effects, like **logging the error to an error reporting service** (e.g., Sentry, Bugsnag).
      * It should **not** be used to update state to render fallback UI (that's `getDerivedStateFromError`'s job).

**Live Coding Example: Generic ErrorBoundary Component**

```react
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This method is called after an error has been thrown by a descendant component.
  // It returns a value to update the state.
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // This method is called after an error has been caught.
  // It's used for side effects like logging errors.
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Optionally store error details in state if you want to display them
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ border: '2px solid red', padding: '20px', margin: '20px', backgroundColor: '#ffe6e6', borderRadius: '8px' }}>
          <h2 style={{ color: '#d32f2f', textAlign: 'center' }}>Oops! Something went wrong.</h2>
          <p style={{ textAlign: 'center', color: '#721c24' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          {/* Optional: Show error details in development */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '15px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '5px' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#721c24' }}>Error Details (Dev Mode)</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    // Normally, render children
    return this.props.children;
  }
}

export default ErrorBoundary;
```

*(Explain each part of the class component: constructor, `getDerivedStateFromError`, `componentDidCatch`, and `render`. Emphasize its role as a wrapper.)*

#### **3. When to Use Error Boundaries**

**(20 minutes - Lecture)**

  * **Where to place them:** Wrap logical parts of your UI that, if they fail, shouldn't bring down the whole application.

      * **Per-component:** Wrap individual widgets or complex components.
      * **Per-route/Page:** Wrap entire page components to protect specific sections of your app.
      * **Top-level (less common):** You *can* wrap your entire `App` component, but this would show a fallback for *any* rendering error, which might not be specific enough. It's usually better to have more granular boundaries.

  * **Crucial Reminder:** Error Boundaries are for **rendering-related JavaScript errors**. They are NOT for:

      * Asynchronous errors (like network request failures from `fetch` or `axios` that you handle with `try...catch`).
      * Errors in event handlers that are not part of the render phase (e.g., direct `onClick` where you do `null.prop`). Handle these with `try...catch` inside the event handler itself.

#### **4. Live Coding Example: Simple Error Boundary in Action**

**(30 minutes - Live Coding)**

Let's create a component that *will* throw an error, and then wrap it with our `ErrorBoundary`.

```react
import React from 'react';

function BuggyComponent({ shouldThrowError }) {
  if (shouldThrowError) {
    // This will throw an error during rendering
    throw new Error('I am a synthetic error from BuggyComponent!');
  }

  // Intentionally trying to access a property of null if shouldThrowError is true
  // This will cause a rendering error.
  // const data = null;
  // if (shouldThrowError) {
  //   console.log(data.property); // This would crash the component
  // }

  return (
    <div style={{ padding: '20px', border: '1px dashed #666', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <p>This is a component that works fine.</p>
      <p>Try setting `shouldThrowError` to true to see the error boundary in action.</p>
    </div>
  );
}

export default BuggyComponent;
```

**Integrating into `App.js`:**

```react
import React, { useState } from 'react';
import UserList from './components/UserList'; // From Section 1
import ErrorBoundary from './components/ErrorBoundary'; // Your ErrorBoundary
import BuggyComponent from './components/BuggyComponent'; // The component that might throw

function App() {
  const [showBug, setShowBug] = useState(false); // State to toggle error in BuggyComponent

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center' }}>React Day 9: Data Fetching & Error Boundaries</h1>

      <h2 style={{ marginTop: '40px' }}>Data Fetching Example</h2>
      <ErrorBoundary> {/* Wrap UserList with ErrorBoundary as a safety net */}
        <UserList />
      </ErrorBoundary>

      <hr style={{ margin: '50px auto', width: '80%', borderColor: '#ddd' }} />

      <h2 style={{ marginTop: '40px' }}>Error Boundary Demonstration</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setShowBug(prev => !prev)}
          style={{ padding: '10px 20px', fontSize: '1em', borderRadius: '5px', border: 'none', backgroundColor: showBug ? '#ffc107' : '#28a745', color: showBug ? '#333' : 'white', cursor: 'pointer' }}
        >
          Toggle Bug in Component ({showBug ? 'ON' : 'OFF'})
        </button>
      </div>
      
      {/* Wrap BuggyComponent with ErrorBoundary */}
      <ErrorBoundary>
        <BuggyComponent shouldThrowError={showBug} />
      </ErrorBoundary>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        When the bug is ON, the `BuggyComponent` will throw a rendering error, and the `ErrorBoundary` will catch it and display its fallback UI instead of crashing the whole application. Check your browser's console for the logged error.
      </p>
    </div>
  );
}

export default App;
```

\*(Demonstrate:

1.  Navigate to the app.
2.  Toggle the bug off – component renders normally.
3.  Toggle the bug on – the Error Boundary's fallback UI appears *instead of* the `BuggyComponent` crashing the whole app.
4.  Show the console where `componentDidCatch` has logged the error.
    Emphasize that the *rest* of the app (e.g., the `UserList`) remains functional.)\*

#### **5. Putting it all Together**

**(20 minutes - Discussion)**

  * **`try...catch` for Async/Event Handlers:** Use this *inside* your functions (e.g., `useEffect`'s callback, `onClick` handlers) to handle expected errors like network failures or validation errors. This gives you fine-grained control over specific error messages for specific operations.
  * **Error Boundaries for Rendering/Lifecycle Errors:** Use these as a safety net around components or sections of your UI that might unexpectedly throw an error during their render cycle or in their constructors/lifecycle methods. They prevent a single rogue component from crashing the entire application.

They complement each other, covering different types of errors in your application.

-----

### **Wrap-up and Exercises (30 minutes)**

**Key Takeaways:**

  * **Robust Data Fetching:** Always manage `isLoading`, `error`, and data states for a better user experience. Use `try...catch` and appropriate error checks (like `axios`'s automatic error throwing) for comprehensive error handling during network requests.
  * **Error Boundaries:** Essential for application resilience. They are **class components** that implement `static getDerivedStateFromError` (for fallback UI) and `componentDidCatch` (for logging).
  * **Crucial Distinction:** Error Boundaries catch **rendering errors**; `try...catch` handles **asynchronous and event handler errors**. They work together.

**Exercises (Assign for practice):**

1.  **Post Viewer with States:**

      * Create a component `PostViewer`.
      * It should take a `postId` prop.
      * Inside `PostViewer`, use `useEffect` to fetch a single blog post from a simulated API (e.g., `https://jsonplaceholder.typicode.com/posts/{postId}`).
      * Manage `isLoading`, `error`, and `post` states.
      * Display "Loading post..." while fetching.
      * If the fetch succeeds, display the post's title and body.
      * If the `postId` is invalid (e.g., a 404 from the API for a non-existent ID), show "Post not found."
      * If the fetch fails due to a network error or simulated API error, show "Failed to load post."

2.  **Simulated API Failure (Advanced Test):**

      * Modify your `PostViewer` component (or any data fetching component) to *intentionally* fail under certain conditions (e.g., if `postId` is "999" or randomly, or by rejecting the promise in a `setTimeout` to simulate a timeout).
      * Ensure your component correctly displays distinct error messages for different failure types (e.g., "Post not found" vs. "Network error" vs. "Unexpected server error").

3.  **Component with Intentional Error:**

      * Create a new component called `DataDisplayWidget`.
      * This component should take a `data` prop.
      * Inside `DataDisplayWidget`, if the `data` prop is `null` or `undefined`, intentionally throw an error in its `return` (JSX) block (e.g., `if (!data) { throw new Error("Data prop is missing!"); }`).
      * Wrap this `DataDisplayWidget` with your `ErrorBoundary` in `App.js` (or a parent component).
      * Pass `null` as the `data` prop to `DataDisplayWidget` to see the `ErrorBoundary`'s fallback UI in action.

-----