import { Link } from "react-router-dom"

export default function DashboardHeader({ title, content }) {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <h1 className="display-4">
          <Link to="/">{title}</Link>
        </h1>
        <p className="lead">{content}</p>
      </div>
    </header>
  )
}
