import React from 'react';
import { render } from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"

// layout

import Dashboard from "./layouts/Dashboard"
import Event from "./layouts/Event"
import Blog from "./layouts/Blog"

// components

import BlogForm from "./components/Forms/BlogForm"
import BlogsGrid from "./components/Grids/BlogsGrid"
import EventForm from "./components/Forms/EventForm"
import EventsGrid from "./components/Grids/EventsGrid"

const rootElement = document.getElementById("root")
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="blogs">
          <Route path="new" element={<BlogForm />} />
          <Route path=":blogId" element={<Blog />} />
          <Route index element={<BlogsGrid />} />
        </Route>
        <Route path="events">
          <Route path="new" element={<EventForm />} />
          <Route path=":eventId" element={<Event />} />
          <Route index element={<EventsGrid />} />
        </Route>
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)