import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BlogForm from "../components/Forms/BlogForm"

import { readBlog } from "../utils/api"

export default function Blog() {
  const { blogId } = useParams()

  // Load the current blog
  const [blog, setBlog] = useState({})
  useEffect(() => {
    async function loadBlog() {
      const blogFromAPI = await readBlog(blogId)
      setBlog(blogFromAPI.data)
    }
    loadBlog()
  }, [blogId])

  if (blog.blog_id) {
    return (
      <BlogForm {...blog} />
    )
  }
  return "Loading..."
}
