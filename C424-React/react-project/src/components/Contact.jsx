import React from "react";

function ContactCard(props) {
    return (
        <>
            <div>
                <hr/>
                <h2>First Name: {props.firstName || "*****"}</h2>
                <h2>Last Name: {props.lastName || "*****"}</h2>
                <h2>Email: {props.email || "*****"}</h2>
                <h2>Phone Name: {props.phone || "*****"}</h2>
                <hr/>
            </div>
        </>
    )
}

export default ContactCard