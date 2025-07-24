import React, { useState } from "react";

function LoginControl() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLoginClick = () => setIsLoggedIn(true)
    const handleLogoutClick = () => setIsLoggedIn(false)

    let button
     
    if(isLoggedIn) {
        button = <button onClick={handleLogoutClick}>Logout</button>
    } else {
        button = <button onClick={handleLoginClick}>Login</button>
    }

    return (
        <div>
            {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
            {button}
        </div>
    )
}

export default LoginControl