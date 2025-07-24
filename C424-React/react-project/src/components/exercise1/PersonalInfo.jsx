import React from "react";

function PersonalInfo({myName, age, bio}) {
    return (
        <>
            <hr/>
            <h2>Name: {myName || "*****"}</h2>
            <h2>Age: {age || "*****"}</h2>
            <h3>Personal Bio:</h3>
            <p>{bio}</p>
            <hr/>
        </>
    )
}

export default PersonalInfo