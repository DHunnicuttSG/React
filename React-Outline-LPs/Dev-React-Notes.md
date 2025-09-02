**NOTE: The content on the Git Repo was created and used in an instructor led class**

### Introduction to React and JSX

* Introduction:
    * Need to include some basic definitions here.  Start with State, Props, and components(functional & class). 

* Setting up React Project
    * Need to include a link to Node.js and possibly instructions on how to install it. 
    * need to mention that all commands are in lowercase. 
    * SPA is never defined:  Single Page Application
    * Probably need to include a detailed description of how the code is rendered and backtrack through index.html, index.js, and App.js

* JSX (JavaScript XML)
    * Not a lot of content here but I suppose it goes into more detail on the next section

* Section for Introduction to JSX syntax goes to LinkedIn learning course.  
    * Do we really want to use linkedIn content?

* Embedding JS Expressions in JSX
    * There is no context or content here.  You have a statement with simple example and not much of an explanation behind what you are showing the student. 

* Components
    * This is NOT an example of a functional component.  It is a function. 
    * This example will not work.  There is no export command in the MyComponent.  When you try to run the app it will throw an error.
    * You would also need to use the import react statements in the components. 
    * functional component should look like this:

```js
// A simple functional component
import React from 'react'

function MyComponent() {
    return (
        <div>
            This is my first React Component!
        </div>
    )
}

export default MyComponent
```

* Introduction to React Components
    * LinkedIn learning module.  This is kind of confusing jumping into the middle of a course topic. 

* Defining Functional Components
    * LinkedIn learning module.  Same as above.

* Creating a higher-order Component
    * LinkedIn learning module.  Jumping into the middle of these learning modules is confusing.  This one for example, uses a Python and Django backend instead of Java.  These are two more things the student would need to know if they wanted to create the React code and have it work.  

* Passing Static Props(properties) to Componnents
    * This is a good example but there is no explaination of what the code is doing and how it works. 

* Examples
    * These are good.  The last example only shows one way to pass props, there are several. 
 
* Exercises
    * First two are good.  Last one would be difficult without any more explaination on the map function. There was one mention of it earlier with a "more to come later" message.

* Key Takeaways
    * Only one mention of the DOM and virtual DOM.  Needs to be more content on this topic. 

* Notes:  This section needs to have simple, concrete examples of introductory topics. The section seems to be all over the place.  I would suggest starting with the DOM and Virtual DOM explainations, then definitions of state and props, then introduce components (your basic building blocks). Keep it simple in the intro.

### State and Event Handling

* Introduction
    * The objectives are good, the definition of state is good.  The reasoning why is good.  I would suggest adding a written definition of Component, and props.

* State vs. Props
    * Nice table with good info but needs a prop definition to help support it.

* Passing data via props
    * LinkedIn learning module.  Within 30 seconds video refers to previous example within LinkedIn course.  No foundation to build on unless you go back into the LinkedIn course. The example here is not bad. 

* Passing data as props
    * LinkedIn learning module.  Using previously build app in the LinkedIn course.  Also intoduces async functions (too early).

* Managing props and state
    * LinkedIn learning module. Intro of the spread operator. May need a simpler example, ie. Use ... when updating state.

* Examples
    * Remove the "note to instructor"

* The useState Hook
    * Remove "30 minutes..." from end of Syntax line.
    * The rest is fine.

* Live Coding Example: A Simple Counter
    * If you want this content to be self-paced, I think you need some explaination of the code in the content, not just a note to the instructor to do that. 

* Updating State (Asynchronous nature)
    * This is part of the counter demo.  I think it should be included to help explain how React updates state. 

* Exercise: useState Practice
    * This is fine.

* Key Takeaways
    * This is fine. 

### Event Handling

* Event Handling
    * Correct Bye to by in the Learning Objectives
    * Could probably use a chart for uses of the other common events

* Passing Event Handlers as Functions
    * This is fine

* Accessing Event Objects
    * Take out the "```JavaScript" at the beginning of the code section, this is markdown formatting.
    * Need explaination of the code

* Exercise: Interactive Image Gallery
    * This is fine

* Conditional Rendering Concepts
    * This is fine

* Using conditional rendering
    * LinkedIn learning module. This is fine. 

* When to use if/else
    * This is fine

* Logical && Operator
    * This is fine

* Exercise: Loading Indicator
    * This is fine

* Wrap-up and Q&A
    * This is fine