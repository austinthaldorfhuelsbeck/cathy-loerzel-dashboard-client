import React, { useEffect, useState } from "react";
import { listUsers } from "../utils/api";

export default function Users() {
  // State for users
  const [users, setUsers] = useState([])
  // State for API errors
  const [err, setErr] = useState(null)

  // Load list of users
  const loadUsers = () => {
    const abortController = new AbortController()
    setErr(null)

    listUsers(abortController.signal)
      .then(res => res.data)
      .then((res) => setUsers(res))
      .catch(setErr)
  }
  useEffect(loadUsers, [])

  // Build table rows from users list
  const tableRows = (
    users.map((user) => (
      <tr key={(user.user_id)}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>Change Password</td>
      </tr>
    ))
  )

  return (
    <div className="container home">
      {err}
      <div className="row my-5">
        <h2>Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}
