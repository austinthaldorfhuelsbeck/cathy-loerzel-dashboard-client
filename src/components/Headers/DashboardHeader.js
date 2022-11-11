import React, { useState } from "react"
import LoginBar from "./LoginBar"

export default function DashboardHeader({ user, setUser, handleLogout }) {
  // Handle show/hide login bar
  const [isLogin, setIsLogin] = useState(false)
  
  // Top left greets user when signed in
  const personalizedIntro = user ? "Hello, " + user.name + "!" : "Dashboard"

  // Search bar renders when signed in
  const SearchBar = ({ user }) => user ? (
    <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
  ) : ""
  
  // Sign in button changes to sign out when signed in
  const SignInButton = ({ isLogin, setIsLogin }) => {
    // Toggle bar when signed out
    const handleClick = () => setIsLogin(!isLogin)

    // Text of button changes depending on signed in/out
    return user ? (
      <div onClick={handleLogout}>Sign Out</div>
    ) : (
      <div onClick={handleClick}>Sign In</div>
    )
  }

  return (
    <>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0 px-3" href="/">{personalizedIntro}</a>
        <SearchBar user={user} />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <div className="nav-link"><SignInButton isLogin={isLogin} setIsLogin={setIsLogin} /></div>
          </li>
        </ul>
      </nav>
    <LoginBar toggle={isLogin} setToggle={setIsLogin} setUser={setUser} />
  </>
  )
}