import React from "react";
import { Table, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const UserTable = (props) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Company</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map((user) => (
            <tr key={user.contactId}>
              <td>{user.contactId} </td>
              <td>{user.firstName} </td>
              <td>{user.lastName} </td>
              <td>{user.company} </td>
              <td>{user.phone} </td>
              <td>{user.email} </td>
              <td>
                <Button className="primary" onClick={() => props.editRow(user)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  className="primary"
                  onClick={() => props.deleteUser(user.contactId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Users</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
