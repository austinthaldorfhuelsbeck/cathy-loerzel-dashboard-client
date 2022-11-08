import React from 'react';
import { Link } from "react-router-dom"

export default function LoadMoreButton({ url }) {
  return (
    <Link to={url}>
      <button type="button" className="btn btn-secondary">
        Load More...
      </button>
    </Link>
  )
}
