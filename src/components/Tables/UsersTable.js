import React from "react";

export default function UsersTable({
  users,
  setUser,
  isPasswordChange,
  setIsPasswordChange
}) {

  // User row
  const UserRow = ({ user, setUser }) => {
    // Event handler
    const handleClick = () => {
      if (!isPasswordChange) {
        setIsPasswordChange(!isPasswordChange)
      }
      setUser(user)
    }

    return (
      <tr>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td className="cursor-pointer" onClick={handleClick}>
          Change Password
        </td>
      </tr>
    )
  }

  // Change password row

  // Build table rows from users list
  const tableRows = users.map((user) => (
    <UserRow key={user.user_id} user={user} setUser={setUser} />)
  )
  
  return (
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
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )
}
