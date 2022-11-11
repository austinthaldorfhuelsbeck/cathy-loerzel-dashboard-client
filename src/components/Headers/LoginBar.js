import React, { useEffect, useState } from "react"

export default function LoginBar({ toggle, setToggle, users, setUser }) {
  // Store error and success to display upon submit
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Load initial blank form
  const initialFormData = {
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialFormData)

  //// HANDLERS ///
  const handleSubmit = (e) => {
    // toggles display of login bar
    const toggle = () => setToggle(!toggle)
    e.preventDefault()
    // reset form
    setFormData(initialFormData)
    // check if the provided user was found
    const user = users.find((user) => user.email === formData.email)
    if (user) {
      // check if the password is correct
      if (user.password === formData.password) {
        setError(null)
        setSuccess(true)
        toggle()
        setUser(user)
      } else {
        setError("Sorry, that password is incorrect. Please try again.")
      }
    } else {
      setError("Email not found. Please try again.")
    }
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
              type="email"
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
      {success && (
        <div className="alert alert-success" role="alert">
          Successfully signed in.
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {`Error: ${error}`}
        </div>
      )}
    </nav>
  ) : null
}
