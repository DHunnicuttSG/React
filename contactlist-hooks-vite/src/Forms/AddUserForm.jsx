import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddUserForm = (props) => {

    const initialFormState = {
        contactId: null,
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: ''
    }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault()
                props.addUser(user)
                setUser(initialFormState)
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
            >Add New User</Button>
        </Form>
    )
}

export default AddUserForm