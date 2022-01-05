import LoadMoreButton from "../Buttons/LoadMoreButton"
import EventCard from "../Cards/EventCard"

export default function EventsList({ events }) {
  // Only previews the first six items
  let eventsPreview = events.map((event) => <EventCard event={event} />)
  if (eventsPreview.length > 6) {
    eventsPreview = eventsPreview.slice(0, 6)
    eventsPreview.push(<LoadMoreButton url="events" />)
  }
  
  return (
    <div>
      <h2>Events</h2>
      {events ? eventsPreview : "Loading..."}
    </div>
  )
}
