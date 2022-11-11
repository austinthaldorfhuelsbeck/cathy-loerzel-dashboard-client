import React, { useEffect, useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import DashboardHeader from "./components/Headers/DashboardHeader"
import DashboardSidebar from "./components/Sidebars/DashboardSidebar"
import usersFromAPI from "./data/data"

import "./App.css"

export default function App() {
  // Navigate hook for log out
  const navigate = useNavigate()

  // State for users and currently logged in user
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  // Load list of users
  useEffect(() => {
    setUsers(usersFromAPI)
  }, [])

  // Log in button functionality
  const handleLogout = () => {
    setUser(null)
    navigate("/")
  }

  // Default for unauthenticated users
  const Home = ({ user }) => (user === null)
    ? <h2 className="text-center py-5">You must be logged in to view that.</h2>
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
    handleLogout: handleLogout
  }

  return (
    <div>
      <DashboardHeader { ...props } />
      <Home user={user} />
    </div>
  )
}
