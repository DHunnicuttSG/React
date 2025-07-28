# Day 4: React Router (Basic) (5 hours)
Welcome back! Today, we're going to transform our static React applications into dynamic, multi-page experiences using React Router. This library is essential for building Single Page Applications (SPAs) where users can navigate between different "views" without full page reloads.

## Section 1: Understanding Client-Side Routing (45 minutes)
**Learning Objectives:**

Understand the concept of client-side routing.
Differentiate between client-side and server-side routing.
Grasp the core idea of Single Page Applications (SPAs).
Concepts Explained:

1. What is Routing?
(10 minutes - Lecture)

In the context of web applications, routing is the process of navigating between different content or "pages" based on the URL in the browser's address bar. It's how a user moves from /about to /products or to /user/123.

2. Server-Side Routing (Traditional Websites)
(15 minutes - Lecture & Discussion)

Historically, web applications used server-side routing (also known as Multi-Page Applications or MPAs).

* How it works:

    * When you type a URL (e.g., www.example.com/about) into your browser, your browser sends a request to the server.
    * The server receives this request, finds the HTML file corresponding to /about, and sends the entire HTML file back to your browser.
    * The browser then "reloads" the entire page to display the new content.

* Drawbacks:

    * Full page reloads can feel slow and disrupt the user experience (flash of white screen).
    * More network requests.

3. Client-Side Routing & Single Page Applications (SPAs)
(20 minutes - Lecture & Discussion)

Modern web applications, especially those built with frameworks like React, often leverage client-side routing within Single Page Applications (SPAs).

What is an SPA?

It's a web application that loads a single HTML page initially.

Subsequent "page changes" don't involve a full page reload. Instead, JavaScript dynamically updates the content of the existing HTML page based on the URL.

How client-side routing works:

When the URL changes (e.g., by clicking a link), the JavaScript code running in your browser intercepts the request.

It prevents the browser's default behavior of sending a new request to the server.

Instead, it looks at the new URL, determines which React component should be displayed for that URL, and then renders only that component (or part of the page) without reloading the entire page.

The URL in the address bar is updated using the Browser History API (pushState).

* Benefits:

    * Faster transitions: Smoother, app-like experience as only part of the content changes.
    * Better user experience: No disruptive full page reloads.
    * Less server load: After the initial load, fewer full page requests are made to the server.
    * Libraries: react-router-dom is the de-facto standard for client-side routing in React applications.

### Section 2: Setting up react-router-dom (90 minutes)
**Learning Objectives:**

Set up react-router-dom in a React application.

Understand BrowserRouter, Routes, and Route components.

Use the element prop to render components.

Briefly introduce the index prop.

Concepts Explained:

We'll be using react-router-dom v6, which has a slightly different (and often simpler) API than previous versions.

1. Installation and Basic Setup
(20 minutes - Live Coding)

First, let's install the library:

```Bash

# Using npm
npm install react-router-dom

# Or using yarn
yarn add react-router-dom
```

Next, to enable routing for your entire application, you need to wrap your root component (usually App.js) with the BrowserRouter component. This component uses the HTML5 history API to keep your UI in sync with the URL.

```JavaScript

// src/index.js (or App.js, depending on your setup)
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
(Explain that BrowserRouter provides the routing context to all components within it.)

2. Routes Component: The Container
(15 minutes - Live Coding)

The Routes component acts as a container for all your individual Route definitions. It's responsible for looking at the current URL and rendering the Route whose path matches.

3. Route Component: Defining Mappings
(30 minutes - Live Coding)

The Route component is where you define the mapping between a URL path and the React component that should be rendered when that path is active.

path prop: A string that represents the URL path.

element prop: A JSX element (your component) to render when the path matches. Important: Pass the component as a JSX element, not just the component name.

Basic Syntax:

```JavaScript

import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
</Routes>
```

4. index Prop (Brief Introduction)
(10 minutes - Lecture)

The index prop is used in nested routes (which we'll briefly cover later) to indicate the default child route that should render when the parent path matches exactly. Think of it as the "home page" for a nested route group.

```JavaScript

// Example for later
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardOverview />} /> {/* Renders when path is exactly /dashboard */}
  <Route path="settings" element={<DashboardSettings />} /> {/* Renders when path is /dashboard/settings */}
</Route>
```

(Just mention its purpose; we'll see it in action in Section 5.)

Live Coding Example: Simple Blog - Home, About, Posts
(15 minutes - Live Coding)

Let's create a minimal blog structure.

Create three new simple functional components: HomePage.jsx, AboutPage.jsx, PostsPage.jsx. Each can just return a ```<div>``` with an ```<h1>``` like "Welcome to Home!"

Update App.js:

```JavaScript

// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './pages/HomePage'; // Assuming you put pages in a 'pages' folder
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <div>
      <header>
        <h1>My Simple Blog</h1>
        {/* Navigation will go here soon! */}
      </header>

      <main>
        <Routes> {/* Routes container */}
          <Route path="/" element={<HomePage />} /> {/* Route for Home */}
          <Route path="/about" element={<AboutPage />} /> {/* Route for About */}
          <Route path="/posts" element={<PostsPage />} /> {/* Route for Posts */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
```

(Run the application. Demonstrate navigating by manually typing /about, /posts in the URL bar and show the component changing. Emphasize that there are no full page reloads.)

### Section 3: Navigation (90 minutes)
**Learning Objectives:**

* Navigate between pages using the Link component.
* Use the useNavigate hook for programmatic navigation.

**Concepts Explained:**
* Now that we have routes defined, how do users actually move between them?

1. Link Component for Declarative Navigation
(45 minutes - Live Coding)

The Link component is the primary way to navigate around your application. It renders an accessible anchor tag (```<a>```) in the DOM, but it prevents the default browser behavior (full page reload) and uses React Router to handle the navigation.

to prop: Specifies the path to navigate to.

Syntax:

```JavaScript

import { Link } from 'react-router-dom';

<Link to="/about">About Us</Link>
<Link to="/posts">View All Posts</Link>
```

**Live Coding Example: Adding Navigation to Simple Blog**

Let's add a navigation bar to our App.js using Link components.

```JavaScript

// src/App.js (updated)
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Link
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <div>
      <header>
        <h1>My Simple Blog</h1>
        <nav> {/* Navigation bar */}
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/posts">Posts</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
```

(Demonstrate clicking the links and observing the content change without reloading. Highlight the URL changing smoothly.)

2. useNavigate Hook for Programmatic Navigation
(45 minutes - Live Coding)

Sometimes, you need to navigate programmatically, not just by clicking a link. For example:

After a form submission.

After a successful login.

When a user clicks a button that isn't naturally a link.

The useNavigate hook gives you access to a Maps function that you can call from your component's logic.

Usage:

```JavaScript

import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Do some logic...
    navigate('/dashboard'); // Navigate to /dashboard
  };

  const goBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <button onClick={handleClick}>Go to Dashboard</button>
    <button onClick={goBack}>Go Back</button>
  );
}
```

Live Coding Example: Go Home Button

Let's add a "Go Home" button on our AboutPage using useNavigate.

```JavaScript

// src/pages/AboutPage.jsx (updated)
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AboutPage() {
  const navigate = useNavigate(); // Get the navigate function

  const goToHome = () => {
    navigate('/'); // Navigate to the root path
  };

  return (
    <div>
      <h1>About Us</h1>
      <p>This is the About page of our simple blog.</p>
      <button onClick={goToHome}>Go to Home Page</button>
    </div>
  );
}

export default AboutPage;
```
(Demonstrate clicking the button. Explain scenarios where useNavigate is preferred over Link.)

### Section 4: URL Parameters (90 minutes)
**Learning Objectives:**

* Define dynamic segments in routes (e.g., /users/:id).
* Access URL parameters using the useParams hook.

Concepts Explained:

Often, you need routes that display specific items, like a user profile (/users/5) or a product detail page (/products/P123). The 5 or P123 part of the URL is a URL parameter (or path parameter).

1. Defining Dynamic Segments in Routes (/users/:id)
(30 minutes - Live Coding)

You define a dynamic segment in your Route path using a colon (:) followed by a name.

```JavaScript

<Route path="/users/:userId" element={<UserProfile />} />
<Route path="/products/:productId" element={<ProductDetail />} />
```

Here, :userId and :productId are placeholders that will match any value in that position of the URL.

Live Coding Example: Posts Detail Page

Let's make our /posts page list posts, and clicking a post will take us to a detail page like /posts/1, /posts/2, etc.

Modify PostsPage.jsx to show a list of dummy posts:

```JavaScript

// src/pages/PostsPage.jsx (updated)
import React from 'react';
import { Link } from 'react-router-dom';

const dummyPosts = [
  { id: '1', title: 'First Blog Post', content: 'Content of the first post...' },
  { id: '2', title: 'Second Blog Post', content: 'Content of the second post...' },
  { id: '3', title: 'Third Blog Post', content: 'Content of the third post...' },
];

function PostsPage() {
  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {dummyPosts.map(post => (
          <li key={post.id}>
            {/* Link to a dynamic path using template literals */}
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PostsPage;
```

Update App.js to add a new Route for the post detail:

```JavaScript

// src/App.js (updated)
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage'; // Will create this

function App() {
  return (
    <div>
      <header>
        <h1>My Simple Blog</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/posts">Posts</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostsPage />} />
          {/* Define a dynamic route for individual posts */}
          <Route path="/posts/:postId" element={<PostDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
```

(Emphasize the :postId syntax.)

2. Accessing Parameters with useParams Hook
(40 minutes - Live Coding)

The useParams hook is a React Hook that allows you to access the URL parameters (the dynamic segments) from the current route. It returns an object where keys are the names you defined in the path (e.g., postId) and values are the actual values from the URL.

```JavaScript

import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { postId } = useParams(); // Destructure postId from the object

  // Now you can use postId to fetch data, display content, etc.
  // const post = fetchPostById(postId); // Example: fetch from an API
  return (
    <div>
      <h2>Post ID: {postId}</h2>
      {/* ... display post content based on postId ... */}
    </div>
  );
}
```

Live Coding Example: Displaying Post Details

Now, let's create PostDetailPage.jsx to display the postId.

```JavaScript

// src/pages/PostDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

// Re-using dummy posts for demonstration
const dummyPosts = [
  { id: '1', title: 'First Blog Post', content: 'Content of the first post...' },
  { id: '2', title: 'Second Blog Post', content: 'Content of the second post...' },
  { id: '3', title: 'Third Blog Post', content: 'Content of the third post...' },
];

function PostDetailPage() {
  const { postId } = useParams(); // Get the postId from the URL
  const navigate = useNavigate(); // For navigating back

  // Find the post that matches the postId from our dummy data
  const post = dummyPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div>
        <h2>Post Not Found!</h2>
        <button onClick={() => navigate('/posts')}>Back to Posts</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Post ID: {postId}</p>
      <p>{post.content}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate('/posts')}>Back to All Posts</button>
    </div>
  );
}

export default PostDetailPage;
```

(Demonstrate clicking a post, seeing its details, and the use of useParams. Also show the "Go Back" functionality.)

### Example: User Profile Page
**(20 minutes - Live Coding / Guided Exercise)**

Let's quickly build a user profile example combining what we've learned.

Create a UsersPage.jsx that lists dummy users ({ id: 'u1', name: 'User One' }). Each user name should be a Link to /users/:id.

Create a UserProfilePage.jsx that uses useParams to get the userId and displays details for that user.

Add /users and /users/:userId routes to App.js.

(Guide students through this mini-project, reinforcing the concepts.)

### Section 5: Nested Routes (Brief) & Wrap-up (45 minutes)
**Learning Objectives:**

Understand how to define simple nested routes.

Concepts Explained:

1. Nested Routes
(25 minutes - Live Coding)

For more complex layouts, like a dashboard with multiple sections (Overview, Settings, Reports), you might want nested routes. This allows a parent component to define a common layout, and its child routes render within that layout.

Syntax: You define Route components inside another Route component.

Outlet Component: The parent route component must use the Outlet component from react-router-dom. This is where the child route's element will be rendered.

Live Coding Example: Dashboard Sections

```JavaScript

// src/App.js (updated with nested dashboard routes)
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// ... other imports ...
import DashboardLayout from './pages/DashboardLayout'; // Parent for nested routes
import DashboardOverview from './pages/DashboardOverview'; // Child 1
import DashboardSettings from './pages/DashboardSettings'; // Child 2

function App() {
  return (
    <div>
      <header>
        {/* ... navigation ... */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/users">Users</Link></li> {/* Add Users link */}
            <li><Link to="/dashboard">Dashboard</Link></li> {/* Add Dashboard link */}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          <Route path="/users" element={<UsersPage />} /> {/* Users list */}
          <Route path="/users/:userId" element={<UserProfilePage />} /> {/* User Profile */}

          {/* Nested Routes for Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} /> {/* Default child for /dashboard */}
            <Route path="settings" element={<DashboardSettings />} /> {/* /dashboard/settings */}
            {/* You could add more like <Route path="reports" element={<DashboardReports />} /> */}
          </Route>

          {/* Optional: 404 Not Found route */}
          <Route path="*" element={<div><h1>404 Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
```

```JavaScript

// src/pages/DashboardLayout.jsx (Parent component for nested routes)
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet

function DashboardLayout() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Overview</Link></li> {/* Navigates to /dashboard (index route) */}
          <li><Link to="/dashboard/settings">Settings</Link></li>
        </ul>
      </nav>
      <hr />
      <div style={{ padding: '20px', border: '1px dashed lightgray' }}>
        {/* The Outlet is where the nested child route's component will render */}
        <Outlet />
      </div>
    </div>
  );
}
export default DashboardLayout;
```

```
// src/pages/DashboardOverview.jsx (Child 1)
import React from 'react';
function DashboardOverview() {
  return <h3>Dashboard Overview Content</h3>;
}
export default DashboardOverview;
```

```
// src/pages/DashboardSettings.jsx (Child 2)
import React from 'react';
function DashboardSettings() {
  return <h3>Dashboard Settings Content</h3>;
}
export default DashboardSettings;
```

(Demonstrate navigating to /dashboard and /dashboard/settings, showing how Outlet works. Explain that the index route matches the parent path exactly.)

Key Takeaways & Q&A
(20 minutes - Recap & Discussion)

Client-Side Routing is the backbone of SPAs, providing seamless navigation without full page reloads.
react-router-dom is the standard library for this.
BrowserRouter wraps your app to provide routing context.
Routes contains all your Route definitions.
Route maps a path to an element (your component).
Link is for declarative navigation (like ```<a>``` but without full reloads).
useNavigate is for programmatic navigation (e.g., after an action).
URL Parameters (/items/:id) allow for dynamic routes, accessed with useParams.
Nested Routes (<Outlet /> and child <Route>s) help organize complex layouts.

Exercises (Assign for practice):
Basic Website Navigation:
Create a simple website with Home, Products, and Contact pages.
Implement navigation using Link components in a common header or navbar.
Ensure each page displays a unique heading.

Product Detail Page:
Take the list of products you might have from Day 3's exercises (or create a new dummy array).
Make each product name in the list clickable using a Link component.
Clicking it should navigate to a /products/:id route.
Create a ProductDetail component that uses useParams to fetch (or display from a dummy array) and show more details about that specific product.

Dashboard Sections:
Expand on the nested routes example.
Create a Dashboard component that acts as the parent.
Inside Dashboard, define nested routes for at least three sections: "Profile", "Notifications", and "Settings".
Each section should have its own small component that renders some content.
Implement navigation links within the Dashboard component for these sections.

