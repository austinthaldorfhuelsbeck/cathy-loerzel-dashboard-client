import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function DashboardHeader() {
  const [query, setQuery] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (e) => {
    e.preventDefault()
    setSearchParams({ query: e.target.value })
    setQuery(e.target.value)
  }

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0 px-3" href="/">Cathy Loerzel</a>
      <input
        className="form-control form-control-dark w-100"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
        value={query} />
    </nav>
  )
}