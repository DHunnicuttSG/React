import React from "react";

function RenderMaps() {
    
    const fruits = ['Apple', 'Grapefruit', 'Banana', 'Orange', 'Pear', 'Avacado']

    const users = [
        {id: 1, name: "Robert"},
        {id: 2, name: "Anwar"},
        {id: 3, name: "Georgia"},
        {id: 4, name: "Maryia"},
        {id: 5, name: "Finnley"},
        {id: 6, name: "Tommy"},
    ]
    
    return (
        <>
            <h1>React rendering with Maps</h1>

            <div>
                <ul>
                    {fruits.map((fruit,index) => (
                        <li key={index}>{fruit}</li>
                    ))}
                    
                </ul>
            </div>
<hr/>
            <div>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <span>Name: {user.name} </span>
                            <span>ID: {user.id}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default RenderMaps