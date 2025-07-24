## Day 2: State & Event Handling (5 hours)
Learning Objectives:

Understand component state and its importance.

Use the useState hook to manage component state.

Handle user interactions with event listeners.

Implement conditional rendering based on state.

Concepts Explained:

State:

What is state? Why do components need state?
(15 minutes - Lecture & Discussion)

- Imagine a user interface. It's not static, right? Buttons get clicked, text fields get typed into, items get added to a cart, or a user logs in and their profile picture appears. All of these changes in the UI are driven by data that changes over time. This changing data within a component is what we call State.

- Definition: State is a plain JavaScript object that holds data that can change over the lifetime of a component. When state changes, React efficiently re-renders the component and its children to reflect the updated data.

### Why do components need state?

- Interactivity: State allows components to react to user input (e.g., a counter incrementing when a button is clicked).

- Dynamic UIs: It enables components to display different content or behaviors based on internal conditions (e.g., showing a loading spinner while data is being fetched).

- Data Management: Components can manage their own internal data without relying solely on props passed down from parents.

- Analogy: Think of a light switch. The "state" of the light switch can be either "on" or "off." When you flip the switch (an "event"), its state changes, and the light bulb (the UI) responds accordingly.


### State vs. Props (Props are immutable, State is mutable).
- This is a really important concept to grasp early on. While both props and state are used to hold data in React, they serve fundamentally different purposes.

| Feature	| Props	| State |
| ----- | ----- | ----- |
| Mutability | Immutable (cannot be changed by the component receiving them) |	Mutable (can be changed by the component that owns them) |
| Ownership | Owned by the parent component and passed down to children	| Owned and managed by the component itself |
| Purpose |	Pass data from parent to child components; configure a component |	Manage internal data that changes over time; enable interactivity |
| Analogy |	Instructions given to you (you can't change the instructions) |	Your personal "to-do" list (you can add, remove, or cross off items) |

### Key Takeaways:

- Props go down, state lives inside.

- If a component needs to change a piece of data, it should manage that data as state.

- If a component receives data from its parent and doesn't need to change it, it should receive it as props.

### Example Scenario Discussion:

Let's say we're building a UserProfile component.

- What data would be best managed as props? (e.g., userName, profilePictureUrl, joinDate - typically static user data).

- What data would be best managed as state? (e.g., isEditingProfile (boolean), numberOfFollowers (if it updates dynamically), showNotificationsBadge - data that the component itself might change or that changes frequently).

(Allow time for questions and reinforce understanding.)

### Section 2: The useState Hook (90 minutes)
### Learning Objectives:

- Use the useState hook to manage component state.

Concepts Explained:

Introducing the useState Hook
(30 minutes - Lecture & Live Coding)

Prior to Hooks, state was primarily managed in class components. With the introduction of Hooks, we can now use state directly in functional components, making our code cleaner and more concise. The primary Hook for managing state in functional components is useState.

- What is a Hook? Hooks are special functions that let you "hook into" React features from your functional components. useState is one of them.

Importing useState: We need to import it from React:

```JavaScript
import React, { useState } from 'react';
```

**Syntax**: const [stateVariable, setStateFunction] = useState(initialValue);
(30 minutes - Live Coding & Walkthrough)

Let's break down the syntax:

1. useState(initialValue):

- This is the useState Hook itself.

- It takes one argument: initialValue. This is the value your state will have when the component first renders. It can be a number, string, boolean, object, array, etc.

- It returns an array with exactly two elements.

2. [stateVariable, setStateFunction]:

- This is array destructuring. We're using it to extract the two elements returned by useState into named variables.

- stateVariable: This is the current value of your state. You'll use this variable in your JSX to display the state.

- setStateFunction: This is a function that you call to update the stateVariable. When you call this function, React will re-render the component with the new state value.

### Live Coding Example: A Simple Counter

Let's build a basic counter component.

```JavaScript

import React, { useState } from 'react';

function Counter() {
  // 1. Declare a state variable called 'count' and its updater 'setCount'
  // 2. Initialize 'count' to 0
  const [count, setCount] = useState(0);

  // Function to increment the counter
  const increment = () => {
    setCount(count + 1); // Update the 'count' state
  };

  // Function to decrement the counter
  const decrement = () => {
    setCount(count - 1); // Update the 'count' state
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
```

(Walk through the code line by line, explaining each part. Emphasize the connection between count in JSX and setCount in the increment and decrement functions.)

Updating State (Asynchronous Nature)
(30 minutes - Lecture & Explanation)

This is a common gotcha for beginners. When you call setStateFunction, React doesn't immediately update the state and re-render the component. State updates are asynchronous and batched.

* What does this mean?

    - If you call setCount(count + 1) multiple times in quick succession within the same event handler, React might batch those updates for performance reasons.

    - If you log count immediately after calling setCount(count + 1), you might see the old value of count, not the newly updated one, because the update hasn't been processed yet.

* Why is it asynchronous? React batches state updates to improve performance. Instead of re-rendering the component after every single setState call, it waits until all state updates from a particular event are processed and then performs a single re-render.

* How to deal with it (Functional Updates):
If your new state depends on the previous state, it's best practice to pass a function to your setStateFunction. This function will receive the previous state as an argument.

```JavaScript

const increment = () => {
  // Correct way when new state depends on previous state
  setCount(prevCount => prevCount + 1);
};

const doubleIncrement = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1); // Both will correctly increment by 1 each
};
```

This ensures you're always working with the most up-to-date state.

**(Exercise: useState Practice)**

* Create a component ToggleButton:

    * It should have a state variable isOn initialized to false.

    * Display "Light is ON" or "Light is OFF" based on isOn.

    * Have a button that toggles the isOn state when clicked.

(Optional Advanced): Create an input field where you can type your name. The component should display "Hello, [Your Name]!" and update as you type. (This bridges to event handling).

### Section 3: Event Handling (100 minutes)
### Learning Objectives:

* Handle user interactions with event listeners.

* Pass event handlers as functions.

* Access event objects.

Concepts Explained:

Common Events in React
(20 minutes - Lecture & Examples)

React's event system is very similar to the native DOM event system, but with a few key differences (e.g., camelCase for event names, synthetic event object).

* Naming Convention: Event names in React are typically camelCase (e.g., onClick, onChange, onSubmit, onMouseEnter, onKeyDown).

* Passing Functions: You pass a function as the event handler, not a string.

Let's look at some common ones:

* onClick: Fires when an element is clicked.

    ```JavaScript

    <button onClick={() => alert('Button Clicked!')}>Click Me</button>
    ```

* onChange: Fires when the value of an input, select, or textarea element changes. Essential for form inputs.

    ```JavaScript

    <input type="text" onChange={(event) => console.log(event.target.value)} />
    ```

* onSubmit: Fires when a form is submitted.

    ```JavaScript

    <form onSubmit={() => console.log('Form submitted!')}>
    {/* ... form elements ... */}
    <button type="submit">Submit</button>
    </form>
    ```

* Other common events: onDoubleClick, onMouseDown, onMouseUp, onMouseMove, onMouseEnter, onMouseLeave, onFocus, onBlur, onKeyDown, onKeyUp.

**Passing Event Handlers as Functions**
(30 minutes - Live Coding & Best Practices)

This is where the magic happens. We connect user actions to state updates.

* Inline Arrow Functions (Simple Cases):

    ```JavaScript

    <button onClick={() => setCount(count + 1)}>Increment</button>
    ```

Good for very simple, one-liner operations.

* Defining Separate Functions (Recommended for Clarity):
For more complex logic, define a separate function within your component.

    ```JavaScript

    function MyComponent() {
    const [message, setMessage] = useState('Hello');

    const handleClick = () => {
        setMessage('Button was clicked!');
    };

    return (
        <div>
        <p>{message}</p>
        <button onClick={handleClick}>Change Message</button>
        </div>
    );
    }
    ```

**Important:** Notice we pass handleClick without parentheses (handleClick), because we want to pass the function definition itself, not the result of calling it immediately. If you did onClick={handleClick()}, the function would run immediately when the component renders, not when the button is clicked.

* Passing Arguments to Event Handlers:
Sometimes you need to pass extra data to your event handler (e.g., the ID of an item being deleted). You can do this using an arrow function.

    ```JavaScript

    function ItemList() {
    const items = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }];

    const handleDelete = (id) => {
        console.log(`Deleting item with ID: ${id}`);
        // In a real app, you'd update state here to remove the item
    };

    return (
        <ul>
        {items.map(item => (
            <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
        ))}
        </ul>
    );
    }
    ```

Accessing Event Objects
(50 minutes - Live Coding & Form Example)

When an event occurs, React (like the DOM) provides an **event object** that contains information about the event itself. React wraps the native browser event into a **SyntheticEvent** object. This ensures cross-browser compatibility.

* Properties of the Event Object:

    * event.target: The DOM element that triggered the event.

    * event.target.value: Particularly useful for input fields to get the current value.

    * event.preventDefault(): Prevents the default browser behavior for an event (e.g., preventing a form from reloading the page on submit).

    * Many other properties like clientX, clientY, keyCode, etc., depending on the event type.

Live Coding Example: A Controlled Input Form

This is a classic example of using onChange and onSubmit with state.

    ```JavaScript

    import React, { useState } from 'react';

    function MyForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value); // event.target is the input element
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior (page reload)
        console.log('Form Submitted!');
        console.log('Name:', name);
        console.log('Email:', email);
        // You would typically send this data to an API here
        setName(''); // Clear the input field after submission
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            id="name"
            value={name} // The input value is controlled by our state
            onChange={handleNameChange}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            />
        </div>
        <button type="submit">Submit</button>
        <p>Current Name: {name}</p>
        <p>Current Email: {email}</p>
        </form>
    );
    }

    export default MyForm;
    ```

(Walk through the code, emphasizing event.target.value, event.preventDefault(), and how value={name} combined with onChange={handleNameChange} creates a "controlled component" where React is the single source of truth for the input's value.)

**(Exercise: Interactive Image Gallery)**

* Create an ImageGallery component.

* It should have a state variable currentImageIndex initialized to 0.

* Have an array of image URLs (e.g., 3-4 images).

* Display the image corresponding to currentImageIndex.

* Include "Previous" and "Next" buttons.

* When "Next" is clicked, increment currentImageIndex (handle wrapping around to 0 if at the end).

* When "Previous" is clicked, decrement currentImageIndex (handle wrapping around to the last image if at the beginning).

### Section 4: Conditional Rendering (90 minutes)
**Learning Objectives:**

Implement conditional rendering based on state.

**Concepts Explained:**

Sometimes, you want to show or hide elements, or render different components entirely, based on certain conditions (often, the value of your state). This is called Conditional Rendering.

Using if/else Statements
(30 minutes - Lecture & Live Coding)

You can use standard JavaScript if/else statements outside of your return JSX, or within helper functions, to determine what to render.

```JavaScript

import React, { useState } from 'react';

function LoginControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  let button;
  if (isLoggedIn) {
    button = <button onClick={handleLogoutClick}>Logout</button>;
  } else {
    button = <button onClick={handleLoginClick}>Login</button>;
  }

  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
      {button}
    </div>
  );
}

export default LoginControl;
```

* When to use if/else: Best for when you need to render entirely different branches of JSX, or if your logic is complex and needs to be encapsulated before the return statement.

**Ternary Operator** (condition ? true : false)
(30 minutes - Lecture & Live Coding)

The ternary operator is a concise way to render one thing if a condition is true, and another if it's false, directly within your JSX.

```JavaScript

import React, { useState } from 'react';

function ShowHideText() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide Text' : 'Show Text'}
      </button>
      {isVisible ? <p>This text can be hidden or shown!</p> : null}
      {/* Or, if you want to render an empty string instead of null */}
      {/* {isVisible ? <p>This text can be hidden or shown!</p> : ''} */}
    </div>
  );
}

export default ShowHideText;
```

* When to use Ternary: Ideal for simple, inline conditional rendering of elements or different text within an element.

### Logical && Operator
(30 minutes - Lecture & Live Coding)

If you only want to render something if a condition is true, and render nothing if it's false, the logical && operator is very handy.

In JavaScript, true && expression evaluates to expression, and false && expression evaluates to false. In React, if false is returned, nothing is rendered.

```JavaScript

import React, { useState } from 'react';

function NotificationBadge() {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notificationCount, setNotificationCount] = useState(5);

  const clearNotifications = () => {
    setHasNotifications(false);
    setNotificationCount(0);
  };

  return (
    <div>
      <h2>My Dashboard</h2>
      {hasNotifications && ( // If hasNotifications is true, the following JSX is rendered
        <p>You have {notificationCount} new notifications! <button onClick={clearNotifications}>Clear</button></p>
      )}
      {!hasNotifications && <p>No new notifications.</p>}
      {/* Another example: only show "Pro User" if user is a pro */}
      {/* {isProUser && <span className="pro-badge">Pro User</span>} */}
    </div>
  );
}

export default NotificationBadge;
```

* When to use &&: Perfect for rendering components or elements conditionally when there's no "else" state (i.e., you just want to render something or nothing).

(Exercise: Loading Indicator)

* Create a component DataFetcher.

* It should have a state variable isLoading initialized to true.

* It should also have a state variable data initialized to null.

* Simulate a data fetch using setTimeout (e.g., after 3 seconds, set isLoading to false and data to some dummy value like "Data loaded successfully!").

* Use conditional rendering:

    * If isLoading is true, display a <p>Loading data...</p>.

    * If isLoading is false and data is not null, display the data.

Wrap-up and Q&A (10 minutes)
Recap:

    * State: Dynamic data within a component. Mutable.

    * Props: Data passed to a component. Immutable.

    * useState: The Hook for managing state in functional components.

    * Event Handling: Reacting to user interactions using onClick, onChange, etc.

    * Conditional Rendering: Showing/hiding content based on state using if/else, ternary, or &&.

* Key takeaway: With state and event handling, your React components can now become truly interactive and responsive to user input!

**Homework:**

    * Combine the concepts: Build a simple to-do list application where you can add new tasks (using input and state), mark tasks as complete (toggling a boolean state), and delete tasks.

    * Review the React Hooks documentation for useState.
