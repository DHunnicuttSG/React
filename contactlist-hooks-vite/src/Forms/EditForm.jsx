import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

const EditUserForm = (props) => {
    const [user, setUser] = useState(props.currentUser)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault()
                props.updateUser(user.contactId, user)
            }}
        >
            <div className='form-group col'>
                <label>First Name</label>
                <input type='text' name='firstName' value={user.firstName}
                    onChange={handleInputChange} />
            </div>
            <div className='form-group col'>
                <label>Last Name</label>
                <input type='text' name='lastName' value={user.lastName}
                    onChange={handleInputChange} />
            </div>
            <div className='form-group col'>
                <label>Company</label>
                <input type='text' name='company' value={user.company}
                    onChange={handleInputChange} />
            </div>
            <div className='form-group col'>
                <label>Phone</label>
                <input type='text' name='phone' value={user.phone}
                    onChange={handleInputChange} />
            </div>
            <div className='form-group col'>
                <label>Email</label>
                <input type='text' name='email' value={user.email}
                    onChange={handleInputChange} />
            </div>
            <Button
                type='submit'
            >Update Contact</Button>
            <Button
                onClick={() => props.setEditing(false)}
                className='button muted-button'
            >
                Cancel</Button>
        </Form>

    )

}

export default EditUserForm