## Day 1: Introduction to React & JSX (5 hours)

Welcome to the exciting world of React\! Today, we're kicking off our journey into building modern, interactive user interfaces. By the end of this session, you'll understand the core concepts behind React, get your development environment set up, and start writing your first React code using JSX.

-----

### Concepts Explained:

#### What is React?

React is a **JavaScript library for building user interfaces**. Developed by Facebook (now Meta), it's one of the most popular tools for creating dynamic and efficient web applications.

  * **Declarative vs. Imperative Programming:**

      * **Imperative:** You tell the computer *how* to do something step-by-step. Think of giving precise cooking instructions: "Take the flour, add water, mix for 2 minutes."
      * **Declarative:** You tell the computer *what* you want to achieve, and it figures out the *how*. In React, you describe what your UI *should look like* for a given state, and React efficiently updates the DOM to match that description. You say: "I want a button that says 'Click Me'," not "Find the button element, change its text content..." This makes your code easier to understand and debug.

  * **Component-Based Architecture:**

      * React encourages you to break down your UI into small, independent, and reusable pieces called **components**.
      * Think of building with LEGOs. Each LEGO brick is a component. You combine these smaller bricks to build larger structures (your application).
      * This approach makes your code more organized, maintainable, and scalable.

  * **Virtual DOM:**

      * The **DOM (Document Object Model)** is a programming interface for web documents. It represents the page structure and allows JavaScript to interact with it. Directly manipulating the DOM can be slow.
      * React uses a **Virtual DOM**, which is a lightweight copy of the actual DOM.
      * When your component's state changes, React first updates its Virtual DOM. Then, it efficiently compares the new Virtual DOM with the previous one to figure out *only* what has changed. Finally, it updates *only* those necessary changes in the real DOM. This process, called **reconciliation**, makes React applications incredibly fast and efficient.

-----

#### Setting up a React Project:

To start building React apps, you need a development environment. The easiest way to get started is by using a tool that sets up a basic project structure for you.

  * **Introduction to Create React App (CRA) or Vite:**

      * **Create React App (CRA):** A popular tool that sets up a new React project with a pre-configured build environment. It's great for learning and medium-sized projects because it handles all the complex build configurations (Webpack, Babel, etc.) for you.
      * **Vite (Recommended for Speed):** A newer build tool that offers a much faster development experience, especially for larger projects. It uses native ES modules and a "no-bundle" development server. For modern React development, Vite is often preferred.

    **To create a new React project with Vite:**
    (Make sure you have Node.js installed)

    ```bash
    npm create vite@latest my-react-app -- --template react
    cd my-react-app
    npm install
    npm run dev
    ```

    This will create a new React project, install its dependencies, and start a development server.

  * **Project Structure (`src`, `public`, `node_modules`):**
    When you create a React project, you'll see a few key folders:

      * **`node_modules/`**: Contains all the third-party libraries and packages your project depends on (like React itself, Axios, etc.). You typically don't touch this folder directly.
      * **`public/`**: Contains static assets like `index.html` (the single HTML file your SPA loads), images, and other files that are served directly.
      * **`src/`**: This is where you'll spend almost all your time coding\! It contains your React components, JavaScript files, and CSS files. `index.js` (or `main.jsx` in Vite) is usually the entry point of your React application.
      * **`package.json`**: Lists your project's dependencies and scripts.

-----

#### JSX (JavaScript XML):

React uses **JSX**, which stands for **JavaScript XML**. It's a syntax extension for JavaScript that allows you to write HTML-like code directly within your JavaScript files. React then transforms this JSX into regular JavaScript calls that create UI elements.

  * **Why JSX?** It makes writing UI components much more intuitive and readable, blending the power of JavaScript with the familiarity of HTML.

  * **Syntax Rules:**

      * **Single Root Element:** Every JSX block must return a single root element. If you need to return multiple elements, wrap them in a `<div>`, a `<Fragment>` (or `<>`), or a custom component.
        ```jsx
        // Correct: Single root element (div)
        <div>
          <h1>Hello</h1>
          <p>World</p>
        </div>

        // Correct: Using a Fragment (shorthand <>)
        <>
          <h1>Hello</h1>
          <p>World</p>
        </>

        // Incorrect: Multiple root elements
        // <h1>Hello</h1>
        // <p>World</p>
        ```
      * **`camelCase` for Attributes:** HTML attributes like `onclick` become `onClick`, `tabindex` becomes `tabIndex`. This aligns with JavaScript's camelCase convention.
      * **`className` Instead of `class`:** Since `class` is a reserved keyword in JavaScript, JSX uses `className` for applying CSS classes.
        ```jsx
        <div className="my-class">Hello</div>
        ```
      * **Self-Closing Tags:** Tags like `<img />`, `<input />`, `<br />` must be explicitly self-closing in JSX.
        ```jsx
        <img src="logo.png" alt="Logo" />
        <input type="text" />
        ```

  * **Embedding JavaScript Expressions in JSX (`{}`):**
    You can embed any valid JavaScript expression directly within your JSX by wrapping it in curly braces `{}`. This is incredibly powerful for dynamic content.

    ```jsx
    const name = "Alice";
    const age = 30;
    const isLoggedIn = true;

    return (
      <div>
        <p>Hello, {name}!</p> {/* Embedding a variable */}
        <p>You are {age * 2} years old in dog years.</p> {/* Embedding an expression */}
        {isLoggedIn ? <p>Welcome back!</p> : <button>Login</button>} {/* Conditional rendering */}
      </div>
    );
    ```

  * **Rendering Lists with `map` (Brief Introduction):**
    When you have an array of data and want to render a list of elements for each item, the JavaScript `Array.prototype.map()` method is your best friend in React.

    ```jsx
    const fruits = ['Apple', 'Banana', 'Cherry'];

    return (
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li> // `key` prop is important for lists, more on this later!
        ))}
      </ul>
    );
    ```

-----

#### Components:

As mentioned, components are the building blocks of React applications. Today, we'll focus on **Functional Components**, which are the modern and preferred way to write React components.

  * **Functional Components (The Modern Way):**

      * These are plain JavaScript functions that accept a single "props" object argument (short for properties) and return JSX.
      * They are simpler to write and read compared to class components (which were used in older React versions).

    <!-- end list -->

    ```jsx
    // A simple functional component
    function MyComponent() {
      return <div>This is my first React component!</div>;
    }
    ```

  * **Rendering Components in `App.js`:**
    Your `App.js` (or `main.jsx`/`index.js`) is typically where your main application component lives. You render other components within it by treating them like HTML tags.

    ```jsx
    // src/App.js
    import React from 'react';
    import MyComponent from './components/MyComponent'; // Import your component

    function App() {
      return (
        <div>
          <h1>My React Application</h1>
          <MyComponent /> {/* Render your component here */}
        </div>
      );
    }

    export default App;
    ```

    *Note: Components usually start with an uppercase letter (`MyComponent`), distinguishing them from standard HTML elements (`div`, `p`).*

  * **Passing Static Props (Properties) to Components:**
    Props are how you pass data from a parent component to a child component. They are read-only and immutable (cannot be changed by the child component).

    ```jsx
    // src/components/Greeting.jsx
    import React from 'react';

    function Greeting(props) {
      return <p>Hello, {props.name}!</p>;
    }

    export default Greeting;

    // src/App.js (Parent component)
    import React from 'react';
    import Greeting from './components/Greeting';

    function App() {
      return (
        <div>
          <Greeting name="Alice" /> {/* Passing a static string prop */}
          <Greeting name="Bob" />
        </div>
      );
    }

    export default App;
    ```

-----

### Examples:

Let's put these concepts into practice. Remember to store new components in `src/components`.

**1. Hello World Component (`src/App.js`)**

This is the simplest React application.

```jsx
// src/App.js
import React from 'react';
import './App.css'; // Assuming you have an App.css for basic styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, React!</h1>
        <p>This is my first React application.</p>
      </header>
    </div>
  );
}

export default App;
```

**2. Basic JSX Rules (`src/components/JsxRulesDemo.jsx`)**

Demonstrates `className`, self-closing tags, and embedding variables.

```jsx
// src/components/JsxRulesDemo.jsx
import React from 'react';

function JsxRulesDemo() {
  const userName = "React Learner";
  const currentYear = new Date().getFullYear();
  const isLoggedIn = true;

  return (
    <div className="jsx-demo-container"> {/* using className */}
      <h2>JSX Rules in Action</h2>
      <p>Hello, {userName}!</p> {/* Embedding a variable */}
      
      {/* Self-closing tag */}
      <hr /> 

      <p>Current year: {currentYear}</p> {/* Embedding an expression */}

      {/* Conditional rendering using JavaScript expression */}
      {isLoggedIn ? (
        <p>You are logged in. Welcome!</p>
      ) : (
        <button className="login-button">Please Log In</button>
      )}

      {/* Example of an image tag */}
      {/* <img src="https://placehold.co/100x50/aabbcc/ffffff?text=Image" alt="Placeholder" /> */}
    </div>
  );
}

export default JsxRulesDemo;

// To use this, import it into App.js:
// import JsxRulesDemo from './components/JsxRulesDemo';
// Then render: <JsxRulesDemo />
```

**3. Greeting Component (`src/components/Greeting.jsx`)**

Create a `Greeting` component that accepts a `name` prop and displays "Hello, \[name]\!".

```jsx
// src/components/Greeting.jsx
import React from 'react';

function Greeting(props) {
  // We can also destructure props for cleaner code:
  // function Greeting({ name }) {
  //   return <p>Hello, {name}!</p>;
  // }
  return (
    <div style={{ border: '1px solid lightblue', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <p>Hello, {props.name}!</p>
      <small>This greeting is from the Greeting component.</small>
    </div>
  );
  
}

export default Greeting;

// To use this in App.js:
// import Greeting from './components/Greeting';
// function App() {
//   return (
//     <div>
//       <Greeting name="Alice" />
//       <Greeting name="Bob" />
//       <Greeting name="Charlie" />
//     </div>
//   );
// }
```

-----

### Exercises:

Time to practice\!

1.  **Personal Info Card:**

      * Create a new functional component (e.g., `PersonalInfoCard.jsx`) in `src/components`.
      * It should accept `name`, `age`, and `bio` as props.
      * Display these pieces of information within the component.
      * Render this component in `App.js`, passing your own personal info as props.

2.  **Simple Header/Footer:**

      * Build a basic page layout.
      * Create two separate functional components: `Header.jsx` and `Footer.jsx` in `src/components`.
      * The `Header` could contain your app's title.
      * The `Footer` could contain a copyright notice.
      * Render these `Header` and `Footer` components in your `App.js` to create a simple page structure.

3.  **JSX Playground:**

      * Create a new component (e.g., `JsxPlayground.jsx`) in `src/components`.
      * Inside this component, experiment with different JSX expressions:
          * Arithmetic operations (e.g., `{10 + 5}`).
          * String concatenation (e.g., `{'Hello' + ' World'}`).
          * Calling simple JavaScript functions (e.g., `{Math.random()}`).
          * Using arrays to render multiple elements (e.g., `{[<p>Item 1</p>, <p>Item 2</p>]}`).
      * Render `JsxPlayground` in `App.js` to see your experiments.

-----

### Key Takeaways:

  * **React** is a JavaScript library for building user interfaces using a **declarative** and **component-based** approach.
  * The **Virtual DOM** helps React efficiently update the UI.
  * **JSX** is a syntax extension that lets you write HTML-like code within JavaScript, making UI definition intuitive.
  * **Components** are reusable building blocks of your UI, and **functional components** are the modern standard.
  * **Props** are the primary way to pass data down from parent components to child components.

You've now taken your first steps into the world of React\! Keep experimenting with JSX and components.