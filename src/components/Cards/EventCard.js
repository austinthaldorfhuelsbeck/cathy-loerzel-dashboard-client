import React from 'react';
import { Link } from "react-router-dom"

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event.event_id}`}>
      <div className="card flex-md-row mb-4 box-shadow h-md-250">
        <div className="card-body d-flex flex-column align-items-start">
          <h5 className="card-title">{event.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{event.date}</h6>
          <p className="card-text">
            {event.content.length < 200 ? event.content : event.content.slice(0, 200) + "..."}
          </p>
        </div>
      </div>
    </Link>
  )
}