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
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return await response.json();
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