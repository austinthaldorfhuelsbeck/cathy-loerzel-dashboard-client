import React from 'react';
import { Outlet } from "react-router-dom"
import DashboardHeader from "./components/Headers/DashboardHeader"
import DashboardSidebar from "./components/Sidebars/DashboardSidebar"

import "./App.css"

export default function App() {  
  return (
    <div>
      <DashboardHeader />
      <div className="container-fluid">
        <div className="row">
          <DashboardSidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
