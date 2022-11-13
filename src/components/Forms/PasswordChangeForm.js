import React, { useState } from "react"

export default function PasswordChangeForm({
  user,
  changeUser,
  setSuccess,
  setError,
  isPasswordChange,
  setIsPasswordChange
}) {
  const initialFormData = {
    current_password: "",
    new_password: "",
    confirm_password: ""
  }
  const [formData, setFormData] = useState(initialFormData)

  //// HANDLERS ////
  const handleSubmit = (e) => {
    e.preventDefault()
    // reset form
    setFormData(initialFormData)
    // check if the provided current password is correct
    if (user.password === formData.current_password) {
      // check if new password was provided
      if (formData.new_password) {
        // check if the new passwords match
        if (formData.new_password === formData.confirm_password) {
          // Success
          changeUser({ ...user, password: formData.new_password })
          setSuccess(user.user_id)
          setError(null)
          handleCancel()
        } else {
          setError("Provided new passwords do not match. Please try again.")
        }
      } else {
        setError("Please provide a new password.")
      }
    } else {
      setError("Current password incorrect. Please try again.")
    }
  }
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
    [target.name]: target.value
    })
  }
  const handleCancel = () => {
    setFormData(initialFormData)
    setIsPasswordChange(!isPasswordChange)
  }

  return (
    <div className="row my-5">
      <h3>Change Password for {user.first_name}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col col-md-5 form-group p-2">
            <input
              className="form-control mx-2"
              type="password"
              placeholder="Current Password"
              name="current_password"
              onChange={handleChange}
              value={formData.current_password}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-md-5 form-group p-2">
            <input
              className="form-control mx-2"
              type="password"
              placeholder="New Password"
              name="new_password"
              onChange={handleChange}
              value={formData.new_password}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-md-5 form-group p-2">
            <input
              className="form-control mx-2"
              type="password"
              placeholder="Confirm New Password"
              name="confirm_password"
              onChange={handleChange}
              value={formData.confirm_password}
            />
          </div>
        </div>
        <div className="row">
          <div className="col col-2 p-2">
            <button type="submit" className="btn btn-dark mx-1">
              Submit
            </button>
          </div>
          <div className="col col-2 p-2">
            <button onClick={handleCancel} className="btn btn-secondary mx-1">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
