import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EventForm from "../components/Forms/EventForm"

import { readEvent } from "../utils/api"

export default function Event() {
  const { eventId } = useParams()

  // Load the current event
  const [event, setEvent] = useState({})
  useEffect(() => {
    async function loadEvent() {
      const eventFromAPI = await readEvent(eventId)
      setEvent(eventFromAPI.data)
    }
    loadEvent()
  }, [eventId])

  if (event.event_id) {
    return (
      <EventForm {...event} />
    )
  }
  return "Loading..."
}
