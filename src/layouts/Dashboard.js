import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

// API methods
import { listBlogs, listEvents } from "../utils/api"

// Components
import ItemsList from "../components/Lists/ItemsList"

export default function Dashboard() {
  
  const [searchParams] = useSearchParams()

  // Load all blogs and events

  const [blogs, setBlogs] = useState([])
  const [events, setEvents] = useState([])
  useEffect(() => {
    async function loadBlogs() {
      const response = await listBlogs()
      const data = response.data
      if (searchParams.get('q')) {
        setBlogs(data.filter((blog) => {
          return (blog.title.toLowerCase().includes(searchParams.get('q').toLowerCase())) ||
            (blog.text.toLowerCase().includes(searchParams.get('q').toLowerCase()))
        }))
      } else {
        setBlogs(data)
      }
    }
    async function loadEvents() {
      const response = await listEvents()
      const data = response.data
      if (searchParams.get('q')) {
        setEvents(data.filter((event) => {
          return (event.name.toLowerCase().includes(searchParams.get('q').toLowerCase())) ||
            (event.content.toLowerCase().includes(searchParams.get('q').toLowerCase()))
        }))
      } else {
        setBlogs(data)
      }
    }
    loadBlogs()
    loadEvents()
  }, [searchParams])

  return (
    <div className="container home">
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
