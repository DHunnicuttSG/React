import React from "react";

function MyHeader() {
    return (
        <>
            <div>
                <h1>My Website</h1>
                <hr/>
                    <div className="container">
                        <a id="home">Home </a>
                        <a id="resume">Resume </a>
                        <a id="hobbies">Hobbies </a>
                        <a id="education">Education </a>
                        <a id="info">Contact </a>
                    </div>
                <hr/>
            </div>
        </>
    )
}

export default MyHeader