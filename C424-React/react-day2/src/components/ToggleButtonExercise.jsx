import React, { useState } from 'react';

function ToggleMe() {
 
  const [isOn, setIsOn] = useState(false);

 const handleToggle = () => setIsOn(!isOn)
    
  return (
    <div>
      <h2>State: {isOn ? "Light is on" : "Light is off" }</h2>
      <button onClick={(handleToggle)}>Toggle Button</button>
      <hr/>
    </div>
  );
}


export default ToggleMe;