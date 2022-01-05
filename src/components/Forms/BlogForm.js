import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateBlog, createBlog } from "../../utils/api"

export default function BlogForm(props = {
  blog_id: "",
  order: null,
  title: "",
  featured: null,
  category: "",
  topic: "",
  date: null,
  text: "",
  img: "",
  content: "",
  audio: "",
  video: "",
  url: ""
}) {

  const { blogId } = useParams()

  // Load initial data if updating
  // (Blank if creating new)
  const [formData, setFormData] = useState({})
  useEffect(() => setFormData(props), [props])
  
  // Navigate hook for submit and cancel
  const navigate = useNavigate()

  // HANDLERS //
  // Submit will update or create, depending if there is a param
  const handleSubmit = (e) => {
    e.preventDefault()
    if (blogId) {
      updateBlog({ ...formData })
        .then(navigate("/blogs"))
    } else {
      createBlog({ ...formData })
        .then(navigate("/blogs"))
    }
  }
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }
  // Cancel navigates home
  const handleCancel = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <form className="p-5" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          className="form-control"
          type="text"
          placeholder="Title of the blog post"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="blog_id">(Optional) Blog ID</label>
        <input
          className="form-control"
          type="text"
          placeholder="ID used in the blog's URL"
          name="blog_id"
          onChange={handleChange}
          value={formData.blog_id}
        />
      </div>
      <div className="form-group">
        <label htmlFor="order">Order #</label>
        <input
          className="form-control"
          type="number"
          placeholder="(optional) Order # for sorting"
          name="order"
          onChange={handleChange}
          value={formData.order}
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          placeholder="Check if featured"
          name="featured"
          onChange={handleChange}
          value={formData.featured}
        />
        <label className="form-check-label" htmlFor="featured">
          Featured
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          className="form-control"
          name="category"
          onChange={handleChange}
          value={formData.category}
        >
          <option>writing</option>
          <option>podcasts</option>
          <option>teaching</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="topic">Topic</label>
        <select
          className="form-control"
          name="topic"
          onChange={handleChange}
          value={formData.topic}
        >
          <option>redeeming-heartache</option>
          <option>leadership</option>
          <option>sexual-abuse</option>
          <option>allender-methodology</option>
          <option>spiritual-warfare</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          className="form-control"
          type="text"
          name="date"
          onChange={handleChange}
          value={formData.date}
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Description</label>
        <textarea
          className="form-control"
          rows="5"
          placeholder="Brief description of the blog post"
          name="text"
          onChange={handleChange}
          value={formData.text}
        />
      </div>
      <div className="form-group">
        <label htmlFor="img">Image URL</label>
        <input
          className="form-control"
          type="text"
          placeholder="Full url of the hero image"
          name="img"
          onChange={handleChange}
          value={formData.img}
        />
      </div>
      <div className="form-group">
        <label htmlFor="audio">Audio URL</label>
        <input
          className="form-control"
          type="text"
          placeholder="Full url of the podcast audio"
          name="audio"
          onChange={handleChange}
          value={formData.audio}
        />
      </div>
      <div className="form-group">
        <label htmlFor="video">Video URL</label>
        <input
          className="form-control"
          type="text"
          placeholder="Full url of the lesson video"
          name="video"
          onChange={handleChange}
          value={formData.video}
        />
      </div>
      <div className="form-group">
        <label htmlFor="video">Post URL</label>
        <input
          className="form-control"
          type="text"
          placeholder="Clickthrough URL for the post"
          name="url"
          onChange={handleChange}
          value={formData.url}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          className="form-control"
          rows="5"
          placeholder="HTML content of the post"
          name="content"
          onChange={handleChange}
          value={formData.content}
        />
      </div>
      <button onClick={handleCancel} className="btn btn-secondary mx-1">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary mx-1">
        Submit
      </button>
    </form>
  )
}
