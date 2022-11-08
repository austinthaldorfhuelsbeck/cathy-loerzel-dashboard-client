import React from 'react';
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const blogDateFormat = (
    new Date(blog.date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})
  );

  const shortBlogText = blog.text.length < 100 ? blog.text: blog.text.slice(0, 100) + "...";

  return (
      <div className="card flex-md-row mb-4 box-shadow h-md-250">
        <img className="card-img-right flex-auto d-none d-md-block" alt="Thumbnail [200x250]" src={blog.img} />
        <div className="card-body">
          <strong className="d-inline-block mb-2 text-secondary">{blog.category} | {blog.topic}</strong>
          <Link to={`/blogs/${blog.blog_id}`}>
            <h3 className="card-title mb-0">{blog.title}</h3>
          </Link>
          <div className="mb-1 text-muted">{blogDateFormat}</div>
          <p className="card-text mb-auto">
            {shortBlogText}
          </p>
          <Link to={`/blogs/${blog.blog_id}`}>Continue reading</Link>
        </div>
      </div>
  );
}