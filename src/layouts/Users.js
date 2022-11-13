import React, { useEffect, useState } from "react";
import UsersTable from "../components/Tables/UsersTable";
import PasswordChangeForm from "../components/Forms/PasswordChangeForm";
import { listUsers, updateUser } from "../utils/api";

export default function Users() {
  // Define state
  const [users, setUsers] = useState([]) // for loading users
  const [user, setUser] = useState({}) // for selected user
  const [error, setError] = useState(null) // for API errors
  const [success, setSuccess] = useState(null) // for API success
  const [isPasswordChange, setIsPasswordChange] = useState(false)

  // API Utilities
  const loadUsers = () => { // Load list of users
    const abortController = new AbortController()
    setError(null)

    listUsers(abortController.signal)
      .then(res => res.data)
      .then((res) => setUsers(res))
      .catch(setError)
  }
  const changeUser = (updatedUser) => { // Change a user
    const abortController = new AbortController()
    setError(null)

    updateUser(updatedUser, abortController.signal)
      .then(res => res.data)
      .catch(setError)
  }

  useEffect(loadUsers, []) // Initial page draw

  // Define props
  const usersTableProps = {
    users,
    setUser,
    isPasswordChange,
    setIsPasswordChange
  }
  const passwordChangeProps = {
    user,
    changeUser,
    setSuccess,
    setError,
    isPasswordChange,
    setIsPasswordChange
  }

  return (
    <div className="container home">
      <UsersTable { ...usersTableProps } />
      {success && (
        <div className="alert alert-success" role="alert">
          {`Success! Password changed for user ${success}`}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {`Error: ${error}`}
        </div>
      )}
      {isPasswordChange && <PasswordChangeForm { ...passwordChangeProps } />}
    </div>
  )
}
