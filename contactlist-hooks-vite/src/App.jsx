import React, { useState, useEffect } from 'react';
import UserTable from './tables/UserTable'
import AddUserForm from './Forms/AddUserForm'
import EditUserForm from './Forms/EditForm'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = (props) => {
  const SERVICE_URL = 'http://contactlist.us-east-1.elasticbeanstalk.com'

  const getUserData = () => {
    return fetch(SERVICE_URL + '/contacts')        // get users list
      .then(response => response.json())           // parse JSON
      .then(users => setUsers(users))              // pick first user
  }

  const userData = [
    { contactId: 1, firstName: 'Ada', lastName: 'Lovelace', company: 'Babbage Inc.', phone: '555 - 1234', email: 'Ada@Babbage.com' },
    { contactId: 2, firstName: 'Charles', lastName: 'Babbage', company: 'Babbage Inc.', phone: '555 - 1224', email: 'Charles@Babbage.com' },
    { contactId: 3, firstName: 'Grace', lastName: 'Hopper', company: 'US Navy', phone: '555 - NAVY', email: 'Grace@USN.gov' },
  ]

  const [users, setUsers] = useState(userData)

  const addUser = (user) => {
    fetch(SERVICE_URL + '/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Add Contact - Success:', data);
        getUserData();
      })
      .catch((error) => {
        console.log('Add Contact - Error:')
        console.log(error)
      });

    console.log(users)
  }

  const deleteUser = (contactId) => {
    console.log(`Submitting delete for contact id ${contactId}`)

    fetch(SERVICE_URL + '/contact/' + contactId, {
      method: 'DELETE',
    })
      .then(data => {
        getUserData();
        console.log('Delete successful');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const initialFormState = {
    contactId: null,
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: ''
  }
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  const editRow = (user) => {
    setEditing(true)

    setCurrentUser({
      contactId: user.contactId,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      phone: user.phone,
      email: user.email
    })
  }

  const updateUser = (contactId, updatedUser) => {

    console.log(`Submitting edit for contact id ${contactId}`)
    console.log(updatedUser)

    fetch(SERVICE_URL + '/contact/' + contactId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setEditing(false)
        getUserData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getUserData()
  }, [props])


  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-center'>CRUD App with Hooks</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={9}>
          <h2>Contact Table</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow}
          />
        </Col>
        <Col sm={3}>
          {editing ? (
            <div>
              <h2>Edit Contact</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h2>Add Contact</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
        </Col>
      </Row>
    </Container>
  )
}

export default App;
