import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BlogForm from "../components/Forms/BlogForm"

import { readBlog } from "../utils/api"

export default function Blog() {
  const { blogId } = useParams()

  // Load the current blog
  const [blog, setBlog] = useState({})
  useEffect(() => {
    async function loadBlog() {
      const response = await readBlog(blogId)
      const blog = response.data
      // date needs to be reformatted to display with html date format
      blog.date = blog.date.toString().slice(0, 10)
      setBlog(blog)
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
