import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

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

  const { quill, quillRef } = useQuill()

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
  useEffect(() => {
    setFormData(props)
  }, [props])
  useEffect(() => {
    if (quill && blogId) {
      quill.clipboard.dangerouslyPasteHTML(formData.content);
    }
  }, [quill, formData.content, blogId]);

  //// HANDLERS ////

  // Submit will update or create,
  // depending if there is a param found
  const handleSubmit = (e) => {
    e.preventDefault()
    // append blog ID if left blank
    if (!formData.blog_id) {
      setFormData({
        ...formData,
        blog_id: formData.title.replace(/\s/g, "-").toLowerCase()
      })
    }
    // update or create
    if (blogId) {
      updateBlog({
        ...formData,
        content: quill.root.innerHTML // append formatted html from quill
      })
        .then((blog) => setSuccess(blog.data.blog_id))
        .catch((err) => {
          setError(err.message)
          alert(err.message)
        })
    } else {
      createBlog({
        ...formData,
        content: quill.root.innerHTML // append formatted html from quill
      })
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
  const inputGroup = (type, name, title, placeholder, value) => (
    <div className="form-group py-1">
      <label htmlFor={name}><strong>{title}</strong></label>
      <input
        className="form-control my-1"
        type={type}
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
        type="text"
        rows="5"
        placeholder={placeholder}
        name="text"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
  const textHtmlGroup = (name, title, value) => (
    <div
      className="form-group py-1"
      // style={{ width: 500, height: 200 }}
    >
      <label htmlFor={name}><strong>{title}</strong></label>
      <div
        ref={quillRef}
        name="content"
        value={value}
        onChange={handleChange}
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

  // console.log(formData)

  return success ?
    (
      <div className="alert alert-success" role="alert">
        {`Success! Blog ID: ${success}`}
        <h3><Link to="/blogs">Back to All</Link></h3>
      </div>
    ) :
    (
      <>
        {headerImage}
        <form className="p-5" onSubmit={handleSubmit} noValidate>

          <div className="row">
            <h3>Basic Info</h3>
            <hr />
            <div className="col col-md-8">
              {inputGroup("text", "title", "Title *", "Title of the blog post", formData.title)}
              {inputGroup("text", "blog_id", "Blog ID", "ID used in the blog's URL", formData.blog_id)}
              <p className="text-muted"><em>Automatically generated from the title if left blank.</em></p>
            </div>
            <div className="col col-md-4">
              {controlGroup("category", "Category *", ["writing", "podcasts", "teaching"], formData.category)}
              {controlGroup(
                "topic",
                "Topic *",
                ["redeeming-heartache", "leadership", "sexual-abuse", "allender-methodology", "spiritual-warfare"],
                formData.topic
              )}
              {inputGroup("date", "date", "Date", "", formData.date)}
              <p className="text-muted"><em>Defaults to today if left blank.</em></p>
            </div>
          </div>

          <div className="row">
            <h3>Details</h3>
            <hr />
            {inputGroup("text", "img", "Image URL *", "Full URL of the hero image", formData.img)}
            <p className="text-muted"><em>Enter the address for the thumbnail image that will display with the post.</em></p>
            {inputGroup("text", "url", "Post URL *", "Clickthrough URL for the post", formData.url)}
            <p className="text-muted"><em>When the thumbnail image is clicked, it links here.</em></p>
            {conditionalURL}
            {textAreaGroup("text", "Description *", "A brief description of the post.", formData.text)}
            <p className="text-muted"><em>This could be the first paragraph of the post. Automatically shortened to 250 characters for the preview.</em></p>
          </div>

          <div className="row pb-5">
            <h3>Content</h3>
            <hr />
            {textHtmlGroup("content", "", formData.content)}
          </div>

          <div className="row py-5">
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
        {error && (
          <div className="alert alert-danger" role="alert">
            {`Error: ${error}`}
          </div>
        )}
      </>
    )
}
