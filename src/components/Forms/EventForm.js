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
        name="content"
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

  return (
    <>
      <form className="p-5" onSubmit={handleSubmit} noValidate>

        <div className="row">
          {inputGroup("name", "Event Name *", "e.g. Redeeming Heartache Conference", formData.name)}
        </div>
        <div className="row">
          <div className="col col-md-3 py-1">
            <label><strong>Date *</strong></label>
            <DatePicker className="form-control" selected={startDate} onChange={handleDateChange} />
          </div>
          <div className="col">
            {inputGroup("url", "URL *", "e.g. https://theallendercenter.org/events/2726298", formData.url)}
          </div>
        </div>
        <div className="row">
          {textAreaGroup("content", "Description *", "Add a description of the event here.", formData.content)}
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