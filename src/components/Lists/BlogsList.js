import LoadMoreButton from "../Buttons/LoadMoreButton"
import BlogCard from "../Cards/BlogCard"

export default function BlogsList({ blogs }) {
  // Only previews the first six items
  let blogsPreview = blogs.map((blog) => <BlogCard blog={blog} />)
  if (blogsPreview.length > 6) {
    blogsPreview = blogsPreview.slice(0, 6)
    blogsPreview.push(<LoadMoreButton url="blogs" />)
  }
  
  return (
    <div>
      <h2>Blogs</h2>
      {blogs ? blogsPreview : "Loading..."}
    </div>
  )
}
