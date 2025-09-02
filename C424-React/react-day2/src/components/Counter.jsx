import React, { useState } from 'react';

function Counter() {
  // 1. Declare a state variable called 'count' and its updater 'setCount'
  // 2. Initialize 'count' to 0
  const [count, setCount] = useState(0);

  // Function to increment the counter
  
//   function increment() {
//     setCount((count) => count + 1)
//   }
  
  
//   const increment = () => {
//     setCount(count + 1); // Update the 'count' state
//   };

  // Function to decrement the counter
//   const decrement = () => {
//     setCount(count - 1); // Update the 'count' state
//   };

const increment = () => {setCount(count => count + 1);
};
  // Correct way when new state depends on previous state
  

const doubleIncrement = () => {
  setCount(myPrevCount => myPrevCount + 1);
  setCount(myPrevCount => myPrevCount + 1); // Both will correctly increment by 1 each
};

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={doubleIncrement}>Double Increment</button>
    </div>
  );
}

export default Counter;