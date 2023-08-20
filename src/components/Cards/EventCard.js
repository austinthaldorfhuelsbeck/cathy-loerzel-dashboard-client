import { Link } from "react-router-dom"

export default function EventCard({ event }) {
  const formatDate = (date) => (
    new Date(date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})
  );

  const formatContent = (content) =>
    content.length < 200 ? content : content.slice(0, 200) + "..."

  return (
    <Link to={`/events/${event.event_id}`}>
      <div className="card flex-md-row mb-4 box-shadow h-md-250">
        <div className="card-body d-flex flex-column align-items-start">
          <strong className="d-inline-block mb-2 text-secondary">{event.type}</strong>
          <h3 className="card-title mb-0">{event.name}</h3>
          <div className="card-subtitle mb-1 text-muted">{formatDate(event.date)}</div>
          <p className="card-text">
            {event.content && formatContent(event.content)}
          </p>
        </div>
      </div>
    </Link>
  )
}