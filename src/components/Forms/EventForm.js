import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import { useParams, useNavigate, Link } from "react-router-dom"
import { updateEvent, createEvent, deleteEvent } from "../../utils/api"

import "react-datepicker/dist/react-datepicker.css"

export default function EventForm(props = {
  event_id: null,
  name: "",
  content: "",
  url: ""
}) {

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
  const [startDate, setStartDate] = useState(new Date())
  useEffect(() => {
    setFormData(props)
    if (props.date) setStartDate(new Date(props.date))
  }, [props])

  //// HANDLERS ////

  // Submit will update or create,
  // depending if there is a param found
  const handleSubmit = (e) => {
    e.preventDefault()
    formData.date = startDate
    if (eventId) {
      updateEvent({ ...formData })
        .then((event) => setSuccess(event.data.event_id))
        .catch((err) => setError(err.message))
    } else {
      createEvent({ ...formData })
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
  const handleDateChange = (date) => {
    setStartDate(date)
    setFormData({
      ...formData,
      date: startDate
    })
  }
  // Cancel navigates home
  const handleCancel = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <>
      <form className="p-5" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="e.g. Redeeming Heartache Conference"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <DatePicker selected={startDate} onChange={handleDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            className="form-control"
            type="text"
            placeholder="e.g. https://theallendercenter.org/events/2726298"
            name="url"
            onChange={handleChange}
            value={formData.url}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Description</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Add a description of the event here."
            name="content"
            onChange={handleChange}
            value={formData.content}
          />
        </div>
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
      {success && (
        <div className="alert alert-success" role="alert">
          {`Success! Event ID: ${success}`}
          <Link to="/events"><h3>Back to All</h3></Link>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </>
  )
}