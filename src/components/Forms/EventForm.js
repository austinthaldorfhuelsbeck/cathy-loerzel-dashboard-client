import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

import { updateEvent, createEvent, deleteEvent } from "../../utils/api"

import "react-datepicker/dist/react-datepicker.css"

export default function EventForm(props = {
  event_id: null,
  name: "",
  type: "",
  date: "",
  content: "",
  url: ""
}) {

  const { quill, quillRef } = useQuill()

  // Find the event ID, if it exists
  const { eventId } = useParams()
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
    if (quill && eventId ) {
      quill.clipboard.dangerouslyPasteHTML(formData.content)
    }
  }, [quill, formData.content, props, eventId])

  //// HANDLERS ////

  // Submit will update or create,
  // depending if there is a param found
  const handleSubmit = (e) => {
    e.preventDefault()
    if (eventId) {
      updateEvent({
        ...formData,
        content: quill.root.innerHTML // append formatted html from quill
      })
        .then((event) => setSuccess(event.data.event_id))
        .catch((err) => setError(err.message))
    } else {
      createEvent({
        ...formData,
        content: quill.root.innerHTML // append formatted html from quill
      })
        .then((event) => setSuccess(event.data.event_id))
        .catch((err) => setError(err.message))
    }
  }
  // Delete will remove the object from the database
  const handleDelete = () => {
    if (
      window.confirm("Delete this event? You will not be able to recover it.")
    ) {
      const loadDelete = async () => await deleteEvent(eventId)
      loadDelete()
      navigate("/")
    }
  }
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }
  // Cancel navigates home
  const handleCancel = (e) => {
    e.preventDefault()
    navigate("/")
  }

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

  return (
    <>
      <form className="p-5" onSubmit={handleSubmit} noValidate>

        <div className="row">
          <div className="col col-md-8 py-1">
            {inputGroup("text", "name", "Event Name *", "e.g. Redeeming Heartache Conference", formData.name)}
          </div>
          <div className="col col-md-4 py-1">
            {controlGroup(
              "type",
              "Type *",
              ["retreats", "conferences", "coaching", "intensives"],
              formData.type
            )}
          </div>
        </div>
        <div className="row">
          <div className="col col-md-3 py-1">
            {inputGroup("date", "date", "Date *", "", formData.date)}
          </div>
          <div className="col">
            {inputGroup("text", "url", "URL *", "e.g. https://theallendercenter.org/events/2726298", formData.url)}
          </div>
        </div>
        <div className="row pb-5">
          {textHtmlGroup("content", "Content", formData.content)}
        </div>
        {success && (
          <div className="alert alert-success my-3" role="alert">
            {`Success! Event ID: ${success}`}
            <Link to="/events"><h3>Back to All</h3></Link>
          </div>
        )}
        {error && (
          <div className="alert alert-danger my-3" role="alert">
            {error}
          </div>
        )}
        <div className="row my-4">
          <div className="col col-6">
            <button onClick={handleCancel} className="btn btn-secondary mx-1">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-1">
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
    </>
  )
}