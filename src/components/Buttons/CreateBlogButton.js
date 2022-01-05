import { Link } from "react-router-dom"

export default function CreateBlogButton() {
  return (
    <Link to={`/blogs/new`}>
      <button type="button" className="btn btn-secondary mx-1">
        <span className="oi oi-plus mr-1"></span>Create Blog
      </button>
    </Link>
  )
}
