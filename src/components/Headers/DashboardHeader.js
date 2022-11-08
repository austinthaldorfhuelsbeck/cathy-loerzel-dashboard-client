import React from 'react';
import { signOut } from "supertokens-auth-react/recipe/passwordless";

export default function DashboardHeader() {
  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0 px-3" href="/">Cathy Loerzel</a>
      <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <div className="nav-link" onClick={onLogout}>Sign Out</div>
        </li>
      </ul>
    </nav>
  )
}