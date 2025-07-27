# Day 3: Props Deep Dive & Lists (5 hours)
Welcome back, everyone! Today, we're building on our understanding of components and state by taking a deeper dive into Props and learning how to efficiently render Lists of data. These are crucial skills for building any real-world React application.

## Section 1: Props Revisited – Deeper Understanding (90 minutes)
**Learning Objectives:**

* Master passing various types of data via props.

* Understand parent-child communication using callback functions passed as props.

* Learn to effectively destructure props for cleaner code.

**Concepts Explained:**

We touched on props on Day 1 as a way to pass data down the component tree. Today, we'll explore more advanced use cases, especially for communication between components.

1. Passing Functions as Props (Callback Functions)
(40 minutes - Lecture & Live Coding: Parent-Child Communication Example)

So far, we've mostly passed primitive values (strings, numbers) or simple objects as props. But what if a child component needs to tell its parent something happened? For instance, a child button was clicked, or a child input field changed. This is where passing functions as props, often called callback functions, comes in handy.

The Idea: The parent defines a function. The parent then passes this function as a prop to its child. When an event happens in the child, the child calls the function it received from the parent. This "callbacks" to the parent, allowing the parent to update its state or perform actions.

Why is this important?

Data Flow: React has a one-way data flow (props down, events up). Callback functions are the standard way for children to influence their parents.

Encapsulation: The child component doesn't need to know how the parent will react; it just needs to know what function to call.

Live Coding Example: Parent-Child Counter

Let's modify our counter. The "Increment" and "Decrement" logic will live in the parent, but the buttons will be in a child component.

```JavaScript

// ParentComponent.jsx
import React, { useState } from 'react';
import ChildButton from './ChildButton'; // Assume ChildButton is in a separate file

function ParentCounter() {
  const [count, setCount] = useState(0);

  // This function will be passed down to the child
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <h1>Parent Counter: {count}</h1>
      {/* Passing the functions as props */}
      <ChildButton onIncrement={handleIncrement} onDecrement={handleDecrement} />
    </div>
  );
}

export default ParentCounter;

// ChildButton.jsx
import React from 'react';

// We receive onIncrement and onDecrement as props
function ChildButton({ onIncrement, onDecrement }) {
  return (
    <div>
      <button onClick={onIncrement}>Increment from Child</button>
      <button onClick={onDecrement}>Decrement from Child</button>
    </div>
  );
}

export default ChildButton;
```

(Walk through the code, emphasizing how handleIncrement is defined in ParentCounter, passed as onIncrement prop, and then called by ChildButton's onClick handler.)

**Example:** Task List - Marking as Completed

Let's imagine a TaskItem component that receives a task and needs to tell its parent when it's completed.


```JavaScript

// TaskList.jsx (Parent)
import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React Props', completed: false },
    { id: 2, text: 'Build a Counter App', completed: false },
    { id: 3, text: 'Understand Lists', completed: false },
  ]);

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task} // Pass the entire task object
          onToggleComplete={handleToggleComplete} // Pass the callback function
        />
      ))}
    </div>
  );
}
export default TaskList;

// TaskItem.jsx (Child)
import React from 'react';

function TaskItem({ task, onToggleComplete }) {
  const itemStyle = {
    textDecoration: task.completed ? 'line-through' : 'none',
    color: task.completed ? 'gray' : 'black',
  };

  return (
    <li style={itemStyle}>
      {task.text}
      <button onClick={() => onToggleComplete(task.id)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
    </li>
  );
}
export default TaskItem;
```

(Explain how onToggleComplete is passed down, and how TaskItem calls it with task.id to identify which task to update.)

2. Passing Objects and Arrays as Props
(20 minutes - Lecture & Live Coding: UserProfileCard)

You've likely done this already, but it's important to explicitly state that you can pass complex JavaScript data types like objects and arrays directly as props.

Syntax: Just like any other prop, use curly braces {} to embed the JavaScript object or array.

```JavaScript

// Parent component
// Use this code in the App component
const userData = {
  name: 'Alice Wonderland',
  age: 30,
  email: 'alice@example.com',
  isPremium: true,
  hobbies: ['Reading', 'Gardening', 'Coding']
};

<UserProfileCard user={userData} />

// UserProfileCard.jsx
import React from 'react';

function UserProfileCard({ user }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{user.name}</h3>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      {user.isPremium && <p>🌟 Premium User</p>}
      <h4>Hobbies:</h4>
      <ul>
        {user.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li> // Use index as key here, as hobbies list isn't reordered.
        ))}
      </ul>
    </div>
  );
}

export default UserProfileCard;
```
(Point out how the user object is passed and then its properties accessed in the child. Also, briefly mention hobbies array being mapped.)

3. Destructuring Props
(30 minutes - Lecture & Live Coding)

As your components grow, you might end up with many props. Accessing them as props.someProp, props.anotherProp can become verbose. Destructuring is a JavaScript feature that makes accessing props much cleaner and more readable.

The Idea: Instead of receiving a single props object, you can immediately "pull out" the specific properties you need from it directly in the function signature.

Before Destructuring:

```JavaScript

function MyComponent(props) {
  return <p>Hello, {props.name}. Your age is {props.age}.</p>;
}
```
With Destructuring:

```JavaScript

function MyComponent({ name, age }) {
  return <p>Hello, {name}. Your age is {age}.</p>;
}
```
Or, if you prefer named parameters for clarity with many props:

```JavaScript

function MyComponent(props) {
  const { name, age } = props; // Destructure inside the function body
  return <p>Hello, {name}. Your age is {age}.</p>;
}
```
### Live Coding: Refactor Previous Examples

Let's go back to our ChildButton and TaskItem examples and apply prop destructuring.

ChildButton.jsx (before):

```JavaScript

function ChildButton(props) {
  return (
    <div>
      <button onClick={props.onIncrement}>Increment from Child</button>
      <button onClick={props.onDecrement}>Decrement from Child</button>
    </div>
  );
}
```
ChildButton.jsx (after destructuring):

```JavaScript

function ChildButton({ onIncrement, onDecrement }) {
  return (
    <div>
      <button onClick={onIncrement}>Increment from Child</button>
      <button onClick={onDecrement}>Decrement from Child</button>
    </div>
  );
}
```
(Repeat for TaskItem and UserProfileCard.)

### Section 2: Rendering Lists of Data (120 minutes)
**Learning Objectives:**

Understand how to render collections of data using map.

Learn the importance of the key prop when rendering lists.

Choose appropriate keys for list items.

**Concepts Explained:**

React applications often need to display lists of items: a list of products, a list of users, a list of comments. Manually creating JSX for each item is tedious and not scalable.

1. The Array.prototype.map() Method
(40 minutes - Lecture & Live Coding: User Profiles)

The most common and powerful way to render lists in React is using the JavaScript Array.prototype.map() method.

What map does: It creates a new array by calling a provided function on every element in the original array.

How it applies to React: We can use map to transform an array of data (e.g., an array of user objects) into an array of React elements (e.g., an array of UserProfileCard components).

Basic Syntax:

```JavaScript

const numbers = [1, 2, 3];
const doubledNumbers = numbers.map(number => number * 2); // [2, 4, 6]

const names = ['Alice', 'Bob', 'Charlie'];
const listItems = names.map(name => <li>{name}</li>);
// listItems will be: [<li>Alice</li>, <li>Bob</li>, <li>Charlie</li>]
```

### Live Coding Example: Rendering a List of User Profiles

Let's create an array of user objects and render them using our UserProfileCard component.

```JavaScript

// App.jsx or UserList.jsx
import React from 'react';
import UserProfileCard from './UserProfileCard';

function UserList() {
  const users = [
    { id: 1, name: 'Alice', age: 28, email: 'alice@example.com', isPremium: true, hobbies: ['Gardening'] },
    { id: 2, name: 'Bob', age: 35, email: 'bob@example.com', isPremium: false, hobbies: ['Photography', 'Hiking'] },
    { id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com', isPremium: true, hobbies: ['Gaming', 'Reading'] },
  ];

  return (
    <div>
      <h2>Our Users</h2>
      {users.map(user => (
        // For now, we'll put key here, but we'll explain why next!
        <UserProfileCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
```
(Explain how users.map() iterates over each user object and returns a UserProfileCard component for each, creating an array of components that React can render.)

2. Why key prop is Essential for List Items
(40 minutes - Lecture & Visual Demonstration)

You might have noticed that key={user.id} in the previous example. This key prop is absolutely critical when rendering lists in React.

React's Reconciliation Algorithm: When React updates the UI, it needs to figure out what has changed efficiently. When dealing with lists, it needs a way to identify each individual item in the list.

The Problem without key: If you don't provide a unique key, React uses the item's index in the array as its default key. This seems fine at first, but it causes problems when:

List items are reordered: React thinks the content of an item has changed, when only its position has changed. This leads to inefficient re-renders, or worse, incorrect state being associated with the wrong item (e.g., a text input's value moving with the index, not the actual item).

List items are added or removed: React can't efficiently identify which item was added/removed, leading to performance issues and potential bugs with component state.

Analogy: Imagine a class of students. If they don't have name tags (keys), and they keep shuffling their seats, the teacher (React) has a hard time figuring out who moved, who left, or who joined. With name tags (unique keys), the teacher can easily track each student regardless of their position.

Visual Demonstration (use simple code examples to show behavior):

No Key / Index Key (Bad for mutable lists): Show a list of items with an input field. When you reorder the list (e.g., move the first item to the last position), the input field's value might stick to the original index rather than the item.

Unique Key (Good): Show the same scenario with a unique ID for each item. Demonstrate that the input field's value stays with its corresponding item regardless of reordering.

3. Choosing a Good key (Unique ID vs. Index)
(40 minutes - Lecture & Discussion)

The key prop must be a unique and stable identifier for each item in the list.

Best Practice: Unique ID from Data (Preferred)

If your data comes from a database or API, it almost always has a unique ID (e.g., id, uuid). Use this!

Example: user.id, task.id, product.sku.

```JavaScript

{items.map(item => (
  <MyItemComponent key={item.id} item={item} />
))}
```

When to use index as a key (Use with caution!)

Only use the array index as a key if ALL of these conditions are true:

The list is static and will never change (items are not added, removed, or reordered).

The list items have no unique IDs provided by the data.

The list is not filtered or sorted.

If any of these conditions are false, using the index as a key will lead to performance issues and potential bugs.

```JavaScript

// Acceptable if list is completely static and never changes position
{['apple', 'banana', 'cherry'].map((fruit, index) => (
  <li key={index}>{fruit}</li>
))}
```

Recap: Always strive for a stable, unique ID from your data for the key prop. Only fall back to index if you are absolutely sure the list will never change in order or content.

Section 3: Prop Drilling (Problem Introduction) (60 minutes)
Learning Objectives:

Introduce the concept of "prop drilling" as a problem.

Briefly mention solutions without diving deep.

**Concepts Explained:**

1. What is Prop Drilling and Why It's a Problem?
(40 minutes - Lecture & Visual Aid/Diagram)

As your React applications grow, you'll inevitably encounter a challenge known as "Prop Drilling" (sometimes called "Plumbing" or "Threaded Props").

What it is: Prop drilling occurs when you need to pass data from a parent component down to a deeply nested child component, and you have to pass that prop through many intermediate components that don't actually use that prop themselves. They just "drill" it down to the next level.

Scenario: Imagine App -> Dashboard -> Sidebar -> UserDisplay -> Avatar. If App has userPreferences and only Avatar needs them, Dashboard, Sidebar, and UserDisplay all have to accept and pass userPreferences down, even though they don't use them.

Why it's a problem:

* Readability: It makes your code harder to read and understand. You see props being passed around that don't seem to be used.

* Maintainability: If you change the name of a prop, or need to add a new prop to a deeply nested component, you have to modify every intermediate component in the chain. This is tedious and error-prone.

* Refactoring Complexity: It makes it difficult to rearrange your component tree because you have these tight dependencies on prop paths.

* Debugging: Tracing the origin of a prop can be difficult when it's passed through many layers.

* Performance (Minor): While React is optimized, unnecessary re-renders can technically occur if intermediate components re-render when they receive a new prop, even if they don't use it.

Visual Aid/Diagram: Draw a component tree on the whiteboard or use a slide:

      App (has userPreferences)
        |
      Dashboard (receives userPreferences, passes them down)
        |
      Sidebar (receives userPreferences, passes them down)
        |
      UserDisplay (receives userPreferences, passes them down)
        |
      Avatar (FINALLY uses userPreferences)
(Explain how each intermediate component is just a "middleman" for the userPreferences prop.)

2. Briefly Mention Solutions (Without Diving Deep)
(20 minutes - Lecture & Discussion)

Prop drilling is a common problem, and React provides solutions! We won't dive deep into them today, but it's important to know they exist and that you're not stuck with prop drilling in large apps.

**Context API (useContext Hook):**

* Allows you to create a "global" data store that any component within a specific part of your component tree can access directly, without props needing to be explicitly passed down.
* Think of it like a public bulletin board that components can read from and write to.
* State Management Libraries (e.g., Redux, Zustand, Recoil):
* For very large and complex applications, dedicated state management libraries provide more robust ways to manage application-wide state outside of the component tree.
* They offer centralized stores, predictable state updates, and powerful debugging tools.
* Other patterns: Component Composition, Render Props (less common with Hooks).

(Emphasize that we'll cover the Context API in a later day, and state management libraries are often a next step after mastering React fundamentals.)

### Wrap-up and Exercises (60 minutes)
**Key Takeaways:**

* Props are powerful: Not just for values, but also for functions (callbacks) to enable parent-child communication.
* Destructuring props makes your code cleaner and easier to read.
* Array.prototype.map() is your go-to method for rendering lists of items.
* The key prop is crucial for efficient and stable list rendering in React; always use a stable, unique ID for your keys.
* Prop drilling is a common problem in larger apps that has dedicated solutions (like Context API and state management libraries) we'll explore later.

### Exercises (Choose 1-2 based on remaining time and class pace):

**Shopping List:**

* Goal: Practice map, key, and passing callbacks for removing items.
* Create a ShoppingList component.
* It should have a state variable items (an array of objects, e.g., { id: 1, name: 'Milk' }).
* Render each item as a ShoppingListItem component.
* Each ShoppingListItem should display the item's name and have a "Remove" button.
* When the "Remove" button is clicked, it should call a callback prop to remove that item from the parent's items state. (Remember to use filter to create a new array without the removed item).

**Photo Gallery:**

* Goal: Practice rendering complex objects in lists, map, and key.
* Create a PhotoGallery component.
* Define an array of photo objects in its state (e.g., { id: 1, url: '...', title: 'Sunset' }).
* Use map to render each photo as a GalleryItem component.
* Each GalleryItem should receive the photo object as a prop and display the image and its title.

**Interactive Menu:**

* Goal: Practice passing complex objects and callbacks, also conditional rendering for selected items.
* Create a MenuItemList component.
* It should have an array of menu items (objects with id, name, price).
* Render each item as a MenuItem component.
* When a MenuItem is clicked, it should use a callback prop to tell the parent which item was clicked.
* The parent component should then log the name and price of the clicked item to the console.
* (Bonus): Add a state to the parent selectedItem and visually highlight the MenuItem if it's the currently selected one.
