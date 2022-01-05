import { Link } from "react-router-dom"

export default function CreateEventButton() {
  return (
    <Link to={`/events/new`}>
      <button type="button" className="btn btn-secondary mx-1">
        <span className="oi oi-plus mr-1"></span>Create Event
      </button>
    </Link>
  )
}
