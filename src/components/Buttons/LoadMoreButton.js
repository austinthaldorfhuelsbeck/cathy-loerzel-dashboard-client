import { Link } from "react-router-dom"

export default function LoadMoreButton({ url }) {
  return (
    <Link to={url}>
      <button type="button" className="btn btn-primary">
        Load More...
      </button>
    </Link>
  )
}
