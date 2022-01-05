import React, { useState, useEffect } from "react"

import { listBlogs } from "../utils/api"

import CreateBlogButton from "../components/Buttons/CreateBlogButton"
import CreateEventButton from "../components/Buttons/CreateEventButton"
import BlogsList from "../components/Lists/BlogsList"

export default function Dashboard() {
  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {
    async function loadBlogs() {
      const response = await listBlogs()
      setBlogs(response.data)
    }
    loadBlogs()
  }, [])

  return (
    <div className="container home">
      <CreateBlogButton />
      <CreateEventButton />
      <div className="row my-5">
        <div className="col col-md-6">
          <BlogsList blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
