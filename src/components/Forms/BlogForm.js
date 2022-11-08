import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { updateBlog, createBlog, deleteBlog } from "../../utils/api"

export default function BlogForm(props = {
  blog_id: "",
  order: null,
  title: "",
  featured: null,
  category: "",
  topic: "",
  date: "",
  text: "",
  img: "",
  content: "",
  audio: "",
  video: "",
  url: ""
}) {

  // Find the blog ID, if it exists
  const { blogId } = useParams()
  // Navigate hook for submit and cancel
  const navigate = useNavigate()

  // Store error and success to display upon submit
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Load initial data if updating
  // (Blank if creating new)
  const [formData, setFormData] = useState({})
  useEffect(() => setFormData(props), [props])

  //// HANDLERS ////

  // Submit will update or create,
  // depending if there is a param found
  const handleSubmit = (e) => {
    e.preventDefault()
    if (blogId) {
      updateBlog({ ...formData })
        .then((blog) => setSuccess(blog.data.blog_id))
        .catch((err) => setError(err.message))
    } else {
      createBlog({ ...formData })
        .then((blog) => setSuccess(blog.data.blog_id))
        .catch((err) => setError(err.message))
    }
  }
  // Delete will remove the object from the database
  const handleDelete = () => {
    if (
      window.confirm("Delete this blog? You will not be able to recover it.")
    ) {
      const loadDelete = async () => await deleteBlog(blogId)
      loadDelete()
      navigate("/")
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

  // Header image
  const headerImage = formData.img && (
    <img className="preview-header" src={formData.img} alt="Header 200px preview" />
  )

  // Form group classes
  const inputGroup = (name, title, placeholder, value) => (
    <div className="form-group py-1">
      <label htmlFor={name}><strong>{title}</strong></label>
      <input
        className="form-control my-1"
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  )
  const textAreaGroup = (name, title, placeholder, value) => (
    <div className="form-group py-1">
      <label htmlFor={name}><strong>{title}</strong></label>
        <textarea
          className="form-control my-1"
          rows="8"
          placeholder={placeholder}
          name="text"
          onChange={handleChange}
          value={value}
        />
    </div>
  )
  const controlGroup = (name, title, options, value) => (
    <div className="form-group py-1">
      <label htmlFor={name}><strong>{title}</strong></label>
      <select
        className="form-control my-1"
        name={name}
        onChange={handleChange}
        value={value}
      >
        <option>{`--Choose a ${name}--`}</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  )

  // Conditional URL rendering
  const conditionalURL = (
    <>
      {formData.category === "podcasts" && inputGroup("audio", "Audio URL *", "Full url of the podcast audio", formData.audio)}
      {formData.category === "teaching" && inputGroup("video", "Video URL *", "Full url of the lesson video", formData.video)}
    </>
  )

  return (
    <>
      {headerImage}
      <form className="p-5" onSubmit={handleSubmit} noValidate>

        <div className="row">
          <h3>Basic Info</h3>
          <hr />
          <div className="col col-md-6">
            {inputGroup("title", "Title *", "Title of the blog post", formData.title)}
            {inputGroup("blog_id", "Blog ID", "ID used in the blog's URL", formData.blog_id)}
            <p className="text-muted"><em>Automatically generated from the title if left blank.</em></p>
          </div>
          <div className="col col-md-6">
            {controlGroup("category", "Category *", ["writing", "podcasts", "teaching"], formData.category)}
            {controlGroup(
              "topic",
              "Topic *",
              ["redeeming-heartache", "leadership", "sexual-abuse", "allender-methodology", "spiritual-warfare"],
              formData.topic
            )}
            {inputGroup("date", "Date", "e.g. September 1, 1991", formData.date)}
            <p className="text-muted"><em>Defaults to today if left blank.</em></p>
          </div>
        </div>

        <div className="row">
          <h3>Details</h3>
          <hr />
          {inputGroup("img", "Image URL *", "Full URL of the hero image", formData.img)}
          <p className="text-muted"><em>Enter the address for the thumbnail image that will display with the post.</em></p>
          {inputGroup("url", "Post URL *", "Clickthrough URL for the post", formData.url)}
          <p className="text-muted"><em>When the thumbnail image is clicked, it links here.</em></p>
          {conditionalURL}
          {textAreaGroup("text", "Description *", "A brief description of the post.", formData.text)}
          <p className="text-muted"><em>This could be the first paragraph of the post. Automatically shortened to 250 characters for the preview.</em></p>
        </div>

        <div className="row">
          <h3>Content</h3>
          <hr />
          {textAreaGroup("content", "", "HTML content of the post.", formData.content)}
        </div>

        <div className="row py-3">
          <div className="col col-6">
            <button onClick={handleCancel} className="btn btn-secondary mx-1">
              Cancel
            </button>
            <button type="submit" className="btn btn-dark mx-1">
              Submit
            </button>
          </div>
          <div className="col col-6">
            <button onClick={handleDelete} className="btn btn-danger mx-1">
              Delete
            </button>
          </div>
        </div>
      </form>

      {success && (
        <div className="alert alert-success" role="alert">
          {`Success! Blog ID: ${success}`}
          <h3><Link to="/blogs">Back to All</Link></h3>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {`Error: ${error}`}
        </div>
      )}
    </>
  )
}
