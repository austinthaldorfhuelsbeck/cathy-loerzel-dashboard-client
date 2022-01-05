import { Link } from "react-router-dom"

export default function BlogCard({ blog }) {
  return (
    <Link to={`blogs/${blog.blog_id}`}>
      <div className="card m-3">
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{blog.category}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{blog.topic}</h6>
          <p className="card-text">
            {blog.text.length < 200 ? blog.text: blog.text.slice(0, 200) + "..."}
          </p>
        </div>
      </div>
    </Link>
  )
}