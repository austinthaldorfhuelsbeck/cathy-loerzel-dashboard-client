import React, { useState } from "react"

export default function LoginBar({ toggle, setToggle, setUser }) {
  // Store error and success to display upon submit
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Load initial data
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  //// HANDLERS ///
  const handleSubmit = (e) => {
    const toggle = () => setToggle(!toggle)
    e.preventDefault()
    setUser({ ...formData })
      // .then((event) => setSuccess(event.data.id))
      // .catch((err) => setError(err.message))
    toggle()
  }
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
    [target.name]: target.value
    })
  }

  return toggle ? (
    <nav className="bg-light p-2">
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-5 form-group p-2">
            <input
              className="form-control mx-2"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="col-5 form-group p-2">
            <input
              className="form-control mx-2"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="col col-2 p-2">
            <button type="submit" className="btn btn-dark mx-1">
              Submit
            </button>
          </div>
        </div>
      </form>
    </nav>
  ) : null
}
