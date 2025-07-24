import React, { useState } from "react";

function MyForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(name)
        console.log(email)
        setName('')
        setEmail('')

    }


    return (
        <>
            <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" value={name} onChange={handleNameChange} /> 
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <button type="submit">Submit</button>
            <p>Current Name: {name}</p>
            <p>Current Email: {email}</p>
            </form>
        </>
    )
}

export default MyForm