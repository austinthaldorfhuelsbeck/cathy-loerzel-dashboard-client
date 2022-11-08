// React Dependencies
import React from 'react';
import { render } from "react-dom";
import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// SuperTokens
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";

// layout
import App from "./App"
import Dashboard from "./layouts/Dashboard"
import Event from "./layouts/Event"
import Blog from "./layouts/Blog"

// components
import BlogForm from "./components/Forms/BlogForm"
import BlogsGrid from "./components/Grids/BlogsGrid"
import EventForm from "./components/Forms/EventForm"
import EventsGrid from "./components/Grids/EventsGrid"

const rootElement = document.getElementById("root")

// SuperTokens
SuperTokens.init({
  appInfo: {
      appName: "Cathy Admin Dashboard",
      apiDomain: process.env.REACT_APP_API_BASE_URL,
      websiteDomain: "http://localhost:3000",
      apiBasePath: "/auth",
      websiteBasePath: "/login"
  },
  recipeList: [
      Passwordless.init({
          contactMethod: "EMAIL"
      }),
      Session.init()
  ]
});

render(
  <SuperTokensWrapper>
    <BrowserRouter>
      <Routes>
        {/*This renders the login UI on the /login route*/}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
        <Route path="/" element={
          <SessionAuth>
            <App />
          </SessionAuth>
        }>
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
        </Route>
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  </SuperTokensWrapper>,
  rootElement
)