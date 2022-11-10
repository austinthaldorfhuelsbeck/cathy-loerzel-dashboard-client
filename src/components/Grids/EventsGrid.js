import { useState, useEffect } from "react";

// API methods
import { listEvents } from "../../utils/api";
import ItemsList from "../Lists/ItemsList";

export default function EventsGrid() {

  // Load all events

  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function loadEvents() {
      const response = await listEvents()
      setEvents(response.data)
    }
    loadEvents()
  }, []);

  return <ItemsList selectedList="events" items={events} preview={false} />;
}
