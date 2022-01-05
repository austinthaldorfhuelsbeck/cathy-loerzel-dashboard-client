import { render } from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"

// layout

import Dashboard from "./layouts/Dashboard"
import Blogs from "./layouts/Blogs"
import Events from "./layouts/Events"

const rootElement = document.getElementById("root")
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="events" element={<Events />} />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)