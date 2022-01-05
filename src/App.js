import { Outlet } from "react-router-dom"
import DashboardHeader from "./components/Headers/DashboardHeader"

export default function App() {
  // PROPS
  const headerProps = {
    title: "Admin Dashboard",
    content: "Cathy Loerzel"
  }  
  
  return (
    <div>
      <DashboardHeader {...headerProps} />
      <Outlet />
    </div>
  )
}
