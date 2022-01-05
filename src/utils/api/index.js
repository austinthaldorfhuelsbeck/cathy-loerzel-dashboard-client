/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers()
headers.append("Content-Type", "application/json")

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the request.
 * @param options
 *  any options for fetch
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.status < 200 || response.status > 399) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
  }
}

/**
 * Retrieves all existing blogs.
 * @returns {Promise<[blog]>}
 *  a promise that resolves to a possibly empty array of blogs saved in the database.
 */
export async function listBlogs(signal) {
  const url = `${API_BASE_URL}/blogs`
  return await fetchJson(url, { signal })
}

/**
 * Saves blog to the database.
 * Validation will be performed at the API level.
 * @param blog
 *  the blog to save
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<blog>}
 *  a promise that resolves the saved blog, which will now have an `id` property.
 */
 export async function createBlog(blog, signal) {
  const url = `${API_BASE_URL}/blogs`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(blog),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Retrieves the blog with the specified `blogId`
 * @param blogId
 *  the `id` property matching the desired blog.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 *  a promise that resolves to the saved blog.
 */
 export async function readBlog(blogId, signal) {
  const url = `${API_BASE_URL}/blogs/${blogId}`
  return await fetchJson(url, { signal })
}

/**
 * Updates an existing blog
 * @param updatedBlog
 *  the blog to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated blog.
 */
export async function updateBlog(updatedBlog, signal) {
  const url = `${API_BASE_URL}/blogs/${updatedBlog.blog_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedBlog),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Retrieves all existing events.
 * @returns {Promise<[event]>}
 *  a promise that resolves to a possibly empty array of events saved in the database.
 */
 export async function listEvents(signal) {
  const url = `${API_BASE_URL}/events`
  return await fetchJson(url, { signal })
}

/**
 * Saves event to the database.
 * Validation will be performed at the API level.
 * @param event
 *  the event to save
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<event>}
 *  a promise that resolves the saved event, which will now have an `id` property.
 */
 export async function createEvent(event, signal) {
  const url = `${API_BASE_URL}/events`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(event),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Retrieves the event with the specified `eventId`
 * @param eventId
 *  the `id` property matching the desired event.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<any>}
 *  a promise that resolves to the saved event.
 */
 export async function readEvent(eventId, signal) {
  const url = `${API_BASE_URL}/events/${eventId}`
  return await fetchJson(url, { signal })
}

/**
 * Updates an existing event
 * @param updatedEvent
 *  the event to save, which must have an `id` property.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<Error|*>}
 *  a promise that resolves to the updated event.
 */
export async function updateEvent(updatedEvent, signal) {
  const url = `${API_BASE_URL}/events/${updatedEvent.event_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedEvent),
    signal,
  }
  return await fetchJson(url, options);
}

export async function deleteEvent(eventId, signal) {
  const url = `${API_BASE_URL}/events/${eventId}`
  const options = { method: "DELETE", signal }
  return await fetchJson(url, options)
}

export async function deleteBlog(blogId, signal) {
  const url = `${API_BASE_URL}/blogs/${blogId}`
  const options = { method: "DELETE", signal }
  return await fetchJson(url, options)
}