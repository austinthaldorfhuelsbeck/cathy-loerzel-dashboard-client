import React, { useState, useEffect } from "react"

// API methods
import { listBlogs, listEvents } from "../utils/api"

// Components
import CreateBlogButton from "../components/Buttons/CreateBlogButton"
import CreateEventButton from "../components/Buttons/CreateEventButton"
import BlogsList from "../components/Lists/BlogsList"
import EventsList from "../components/Lists/EventsList"

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
          <BlogsList blogs={blogs} />
        </div>
        <div className="col col-md-6">
          <EventsList events={events} />
        </div>
      </div>
    </div>
  )
}
