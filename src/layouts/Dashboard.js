import React, { useState, useEffect } from "react"

// API methods
import { listBlogs, listEvents } from "../utils/api"

// Components
import CreateBlogButton from "../components/Buttons/CreateBlogButton"
import CreateEventButton from "../components/Buttons/CreateEventButton"
import ItemsList from "../components/Lists/ItemsList"

export default function Dashboard() {
  
  // Load all blogs and events

  const [blogs, setBlogs] = useState([])
  const [events, setEvents] = useState([])
  useEffect(() => {
    async function loadBlogs() {
      const response = await listBlogs()
      setBlogs(response.data)
    }
    async function loadEvents() {
      const response = await listEvents()
      setEvents(response.data)
    }
    loadBlogs()
    loadEvents()
  }, [])

  return (
    <div className="container home">
      <CreateBlogButton />
      <CreateEventButton />
      <div className="row my-5">
        <div className="col col-md-6">
          <h2>Blogs</h2>
          <ItemsList selectedList="blogs" items={blogs} preview={true} />
        </div>
        <div className="col col-md-6">
          <h2>Events</h2>
          <ItemsList selectedList="events" items={events} preview={true} />
        </div>
      </div>
    </div>
  )
}
