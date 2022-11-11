import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import DashboardHeader from "./components/Headers/DashboardHeader"
import DashboardSidebar from "./components/Sidebars/DashboardSidebar"

import { listUsers, updateUser } from "./utils/api"

import "./App.css"

export default function App() {


  // State for users and currently logged in user
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  // State for API errors
  const [err, setErr] = useState(null)

  // Load list of users
  const loadUsers = () => {
    const abortController = new AbortController()
    setErr(null)

    listUsers(abortController.signal)
      .then(res => res.data)
      .then((res) => {
        setUsers(res)
        const user = res.find((u) => u.isLoggedIn)
        if (user) setUser(user)
      })
      .catch(setErr)
  }
  useEffect(loadUsers, [])

  // Method to log in and out
  const logChange = (user, value) => {
    const abortController = new AbortController()
    setErr(null)

    if (user) {
      updateUser({ ...user, isLoggedIn: value }, abortController.signal)
    }
  }

  // Default for unauthenticated users
  const Home = ({ user }) => (user === null) || (user === undefined)
    ? ""
    : <Dashboard />

  // Dashboard for authenticated users
  const Dashboard = () => (
    <div className="container-fluid">
      <div className="row">
        <DashboardSidebar />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  )

  // Build props
  const props = {
    user: user,
    users: users,
    setUser: setUser,
    logChange: logChange
  }

  return (
    <div>
      {err}
      <DashboardHeader { ...props } />
      <Home user={user} />
    </div>
  )
}
