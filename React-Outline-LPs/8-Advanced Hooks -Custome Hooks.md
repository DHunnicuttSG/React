-----
# This section has not been tested 

## Day 8: Advanced Hooks & Custom Hooks (5 hours)

Welcome back, everyone\! Today, we're diving deeper into the powerful world of React Hooks. While `useState` and `useEffect` are fundamental, React offers more specialized hooks for specific use cases, and even allows you to create your own\! We'll explore `useRef`, `useReducer`, and the incredibly useful concept of **Custom Hooks**.

-----

### **Section 1: The `useRef` Hook (1 hour 15 minutes)**

**Learning Objectives:**

  * Understand when and how to use `useRef`.
  * Learn its syntax and how to access its `current` property.
  * Identify scenarios where `useRef` is appropriate vs. when it's not.

**Concepts Explained:**

You've seen how React's declarative nature usually abstracts away direct DOM manipulation. However, there are times when you need to interact directly with a DOM element or persist a mutable value across renders without causing a re-render. That's where `useRef` comes in.

#### **1. Purpose of `useRef`:**

`useRef` serves two primary purposes:

  * **Accessing DOM Elements Directly:** This is the most common use case. If you need to, for example, focus an input field, play/pause a video, measure element dimensions, or integrate with a third-party DOM library, `useRef` provides a way to get a direct reference to the underlying DOM node.
  * **Persisting Mutable Values Across Renders:** `useRef` can also hold any mutable value (not just DOM elements) that you want to persist across component re-renders without triggering a re-render itself. Unlike state variables, changing a `ref.current` value does *not* cause the component to re-render. This is useful for things like timer IDs, mutable objects that don't affect render output, or previous values of props/state.

#### **2. Syntax: `const ref = useRef(initialValue);`**

  * `useRef` returns a plain JavaScript object with a single property called `current`.

  * The `initialValue` argument is what `ref.current` will be initialized to on the first render.

  * The returned `ref` object will persist for the entire lifetime of the component.

    ```jsx
    import React, { useRef } from 'react';

    function MyComponent() {
      const myInputRef = useRef(null); // Initialize with null for DOM elements

      // ...
    }
    ```

#### **3. `ref.current`:**

  * This is where the actual reference (either to a DOM node or your mutable value) is stored.
  * When used with a DOM element, you attach the `ref` object to the element's `ref` attribute in JSX:
    ```jsx
    <input ref={myInputRef} type="text" />
    ```
    After the component renders, `myInputRef.current` will point directly to that `<input>` DOM element.

#### **4. When NOT to use `useRef` (Avoid for State Management):**

  * **Do NOT use `useRef` to manage values that directly affect the component's render output.** If a value change should cause a re-render, it should be managed with `useState`.
  * `useRef` is for "escape hatches" or values that are mutable but don't need to trigger UI updates.

**Live Coding Example: Focus Input**

Let's use `useRef` to automatically focus an input field when the component mounts.

```react
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  // 1. Create a ref object
  const inputRef = useRef(null);

  useEffect(() => {
    // 2. Access the DOM element via .current and call its methods
    // This effect runs once after the initial render
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  }, []); // Empty dependency array means it runs only on mount

  const handleClick = () => {
    // You can also interact with the DOM element later
    if (inputRef.current) {
      alert(`Current input value: ${inputRef.current.value}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Focus Input Example (useRef)</h3>
      <input
        type="text"
        ref={inputRef} {/* 3. Attach the ref to the DOM element */}
        placeholder="I will be focused automatically"
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', marginRight: '10px' }}
      />
      <button onClick={handleClick} style={{ padding: '8px 12px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white' }}>
        Show Value
      </button>
      <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
        (Check console for initial focus, then click "Show Value")
      </p>
    </div>
  );
}

export default FocusInput;

// To use this in App.js:
// import FocusInput from './components/FocusInput';
// function App() { return <FocusInput />; }
```

*(Demonstrate the input automatically focusing. Discuss scenarios like media playback, measuring dimensions, or integrating D3/charting libraries.)*

-----

### **Section 2: The `useReducer` Hook (1 hour 45 minutes)**

**Learning Objectives:**

  * Learn `useReducer` as an alternative to `useState` for complex state logic.
  * Understand the `reducerFunction` and `dispatch` concepts.

**Concepts Explained:**

While `useState` is excellent for simple state variables, managing complex state (especially when multiple state variables are related or when state transitions are intricate) can lead to verbose `useState` calls and logic scattered across a component. `useReducer` offers a more structured and predictable way to manage such state.

#### **1. Alternative to `useState` for Complex State Logic:**

`useReducer` is often preferred when:

  * Your state logic involves multiple sub-values.
  * The next state depends on the previous state in a complex way.
  * You want to centralize state update logic in one place (the reducer function).
  * You need to pass down the ability to update state to deeply nested children without prop drilling (by passing the `dispatch` function).

It's conceptually similar to Redux, but built into React itself for local component state.

#### **2. Syntax: `const [state, dispatch] = useReducer(reducerFunction, initialState);`**

  * **`reducerFunction`**: This is a pure function that takes two arguments: the current `state` and an `action` object. It then returns the `new state`. It should *always* return a new state object and *never* modify the original `state` directly.
      * Signature: `(state, action) => newState`
  * **`initialState`**: The initial value of your state.
  * **`state`**: The current state value, similar to the state returned by `useState`.
  * **`dispatch`**: A function that you call to "dispatch" an action. When `dispatch` is called, React will run your `reducerFunction` with the current state and the action you dispatched, and then update the component's state with the new value returned by the reducer.

#### **3. `reducerFunction`: Pure function `(state, action) => newState`**

The reducer function is the heart of `useReducer`. It's a pure function, meaning:

  * Given the same `state` and `action`, it will always return the same `newState`.
  * It has no side effects (e.g., no API calls, no direct DOM manipulation, no `console.log` for debugging purposes that changes behavior).
  * It **must not mutate** the original `state` object. Always return a *new* state object.

A common pattern inside a reducer is using a `switch` statement on `action.type` to handle different types of state updates.

```javascript
// Example reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET_VALUE':
      return { count: action.payload }; // Action can carry data (payload)
    default:
      return state; // Always return current state for unknown actions
  }
};
```

#### **4. `dispatch`: Function to send actions to the reducer**

You call `dispatch` with an `action` object. The `action` object typically has a `type` property (a string describing the action) and can optionally have a `payload` property (any data needed for the update).

```jsx
// Inside your component
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET_VALUE', payload: 100 });
```

**Live Coding Example: Complex Counter (useReducer)**

Let's refactor a counter to use `useReducer`, adding increment, decrement, and reset actions.

```react
import React, { useReducer } from 'react';

// 1. Define the reducer function
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET_TO':
      // Action can carry data (payload)
      return { count: action.payload };
    default:
      // Always return the current state for unknown actions
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function ComplexCounter() {
  // 2. Initialize useReducer: [state, dispatch] = useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Complex Counter (useReducer)</h3>
      <p style={{ fontSize: '2em', textAlign: 'center', margin: '15px 0' }}>Count: {state.count}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white' }}
        >
          Increment
        </button>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#ffc107', color: '#333' }}
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#dc3545', color: 'white' }}
        >
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_TO', payload: 100 })}
          style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#17a2b8', color: 'white' }}
        >
          Set to 100
        </button>
      </div>
    </div>
  );
}

export default ComplexCounter;

// To use this in App.js:
// import ComplexCounter from './components/ComplexCounter';
// function App() { return <ComplexCounter />; }
```

*(Demonstrate each button's effect. Emphasize that all state logic is now centralized in `counterReducer`.)*

-----

### **Section 3: Custom Hooks (1 hour 30 minutes)**

**Learning Objectives:**

  * Understand the purpose of Custom Hooks.
  * Learn the naming convention for Custom Hooks.
  * Create and utilize custom hooks for reusable logic.

**Concepts Explained:**

As your React applications grow, you'll often find yourself writing the same stateful logic (e.g., managing form input, handling local storage, tracking window size) in multiple components. **Custom Hooks** allow you to extract and reuse this logic.

#### **1. Purpose: Extracting Reusable Stateful Logic:**

  * **Code Reusability:** Avoid duplicating logic across different components.
  * **Separation of Concerns:** Keep your components focused on rendering UI, while custom hooks handle the complex stateful or side-effect logic.
  * **Readability:** Components become cleaner and easier to understand.
  * **Testability:** Logic extracted into a custom hook can be tested independently.

#### **2. Naming Convention: `useSomething`:**

  * Custom Hooks are regular JavaScript functions.
  * They **must** start with the word `use` (e.g., `useToggle`, `useLocalStorage`). This is a crucial convention that allows React's linter to enforce the "Rules of Hooks" (e.g., calling hooks only at the top level of a React function component or another custom Hook).

#### **3. How to Create and Use Them:**

1.  **Create a new file:** Typically in a `src/hooks` directory (e.g., `src/hooks/useToggle.js`).
2.  **Define a function:** Name it according to the `useSomething` convention.
3.  **Use other Hooks inside:** Your custom hook can call other built-in Hooks (`useState`, `useEffect`, `useRef`, `useCallback`, etc.) or even other custom hooks.
4.  **Return values:** Return whatever values or functions your component needs to use (e.g., state, dispatch, helper functions).
5.  **Use in components:** Import and call your custom hook like any other hook.

**Live Coding Example 1: `useToggle` Custom Hook**

A common pattern is toggling a boolean value. Let's create a custom hook for this.

```react
// src/hooks/useToggle.js
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // useCallback memoizes the toggle function, preventing unnecessary re-renders
  // of child components that receive this function as a prop.
  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []); // No dependencies, so `toggle` function is stable

  return [value, toggle]; // Return the current value and the toggle function
}

export default useToggle;
```

Now, let's use it in a component:

```react
// src/components/ToggleDemo.jsx
import React from 'react';
import useToggle from '../hooks/useToggle'; // Import your custom hook

function ToggleDemo() {
  // Use the custom hook
  const [isLightOn, toggleLight] = useToggle(false); // Initial state is false
  const [isMenuOpen, toggleMenu] = useToggle(true); // Initial state is true

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>useToggle Custom Hook Demo</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p>Light Status: {isLightOn ? 'ON 💡' : 'OFF 🌑'}</p>
        <button
          onClick={toggleLight}
          style={{ padding: '8px 12px', borderRadius: '5px', border: 'none', backgroundColor: isLightOn ? '#ffc107' : '#6c757d', color: isLightOn ? '#333' : 'white' }}
        >
          Toggle Light
        </button>
      </div>

      <div>
        <p>Menu Status: {isMenuOpen ? 'Open ✅' : 'Closed ❌'}</p>
        <button
          onClick={toggleMenu}
          style={{ padding: '8px 12px', borderRadius: '5px', border: 'none', backgroundColor: isMenuOpen ? '#28a745' : '#dc3545', color: 'white' }}
        >
          Toggle Menu
        </button>
      </div>
    </div>
  );
}

export default ToggleDemo;

// To use this in App.js:
// import ToggleDemo from './components/ToggleDemo';
// function App() { return <ToggleDemo />; }
```

*(Demonstrate how `useToggle` simplifies the component's logic. Emphasize reusability.)*

**Live Coding Example 2: `useLocalStorage` Custom Hook**

This hook will store and retrieve a value from local storage, keeping it in sync with React state.

```react
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]); // Rerun effect if key or storedValue changes

  return [storedValue, setStoredValue]; // Return the state and its setter
}

export default useLocalStorage;
```

Now, let's use it in a component:

```react
// src/components/LocalStorageDemo.jsx
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Import custom hook

function LocalStorageDemo() {
  // Use the custom hook to manage a 'name' in local storage
  const [name, setName] = useLocalStorage('userName', 'Guest');
  // Use the custom hook to manage a 'darkMode' setting
  const [darkMode, setDarkMode] = useLocalStorage('darkModeEnabled', false);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#eee' : '#333' }}>
      <h3>useLocalStorage Custom Hook Demo</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Your Name (saved locally):</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '200px', backgroundColor: darkMode ? '#555' : '#fff', color: darkMode ? '#eee' : '#333' }}
        />
        <p>Hello, {name}!</p>
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(prev => !prev)}
            style={{ marginRight: '10px' }}
          />
          Enable Dark Mode
        </label>
        <p>Dark Mode is {darkMode ? 'Enabled' : 'Disabled'}</p>
      </div>
      <p style={{ fontSize: '0.9em', color: darkMode ? '#bbb' : '#666', marginTop: '10px' }}>
        (Try typing your name and toggling dark mode, then refresh the page. Your settings should persist!)
      </p>
    </div>
  );
}

export default LocalStorageDemo;

// To use this in App.js:
// import LocalStorageDemo from './components/LocalStorageDemo';
// function App() { return <LocalStorageDemo />; }
```

*(Demonstrate typing a name, toggling dark mode, then refreshing the page to show persistence. Explain the `try...catch` for `localStorage` access.)*

-----

### **Exercises:**

Time to apply what you've learned\!

1.  **Click Outside Detector:**

      * Create a component (e.g., `DropdownMenu.jsx` or `Modal.jsx`) that simulates a dropdown menu or modal.
      * It should have a button to open/close it.
      * **Use `useRef`** to reference the dropdown/modal content.
      * **Use `useEffect`** to add and remove a global click event listener (`document.addEventListener('mousedown', ...)`).
      * When a click occurs, check if `event.target` is *outside* the referenced element. If it is, close the dropdown/modal.
      * *Hint*: Remember to clean up your event listener in `useEffect`'s return function.

2.  **Shopping Cart `useReducer`:**

      * (If you have a shopping cart from Day 6, refactor it. Otherwise, create a simplified one.)
      * Implement a shopping cart where you can:
          * Add items (`{ id: 1, name: 'Item A', price: 10, quantity: 1 }`).
          * Remove items.
          * Update item quantity (increment/decrement).
      * **Use `useReducer`** to manage the `cartItems` array.
      * Define a `cartReducer` that handles actions like `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`.

3.  **`useWindowSize` Custom Hook:**

      * Create a custom hook named `useWindowSize` in `src/hooks`.
      * This hook should track and return the current `window.innerWidth` and `window.innerHeight`.
      * **Use `useState`** to hold the dimensions.
      * **Use `useEffect`** to add and remove a `resize` event listener (`window.addEventListener('resize', ...)`) that updates the state.
      * Use this custom hook in a component to display the dynamic window dimensions as you resize your browser window.

-----

### Key Takeaways:

  * **`useRef`** is your tool for direct DOM access (e.g., focusing inputs, playing media) and for persisting any mutable value across renders without triggering re-renders.
  * **`useReducer`** is a powerful alternative to `useState` for managing complex state logic, especially when state transitions are intricate or involve multiple related values. It promotes predictable state updates through a `reducer` function and `dispatch` actions.
  * **Custom Hooks** are functions that allow you to extract and reuse stateful logic from your components. They must start with `use` and can call other built-in or custom hooks. They are essential for building scalable and maintainable React applications.

You've now added powerful tools to your React toolkit, enabling you to handle more complex scenarios and write cleaner, more reusable code\!