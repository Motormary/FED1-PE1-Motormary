import { getAllPosts } from "../js/functions/get-all-posts.mjs"
import createPagination from "./functions/create-pagination.mjs"
import createThumbnails from "./functions/create-thumbnails.mjs"
import updateHeaderElement from "./functions/update-header-text.mjs"

const containerEl = document.querySelector("div.thumbnails-container")
const searchEl = document.querySelector("input#search-posts")
const searchIcon = document.querySelector("i.search-icon")
const filterEl = document.querySelectorAll("button.feed")
const selectEl = document.querySelector("select.filter-select")
const optionEl = document.querySelectorAll("option.select-option")
const clearFilterEL = document.querySelector("button#clear-filters")
const paginationBtns = document.querySelectorAll("button.pagination-btn")

let url = new URLSearchParams(window.location.search)
updateHeaderElement(url.get("tag"))

// Make search icon clickable
searchIcon.addEventListener("click", () =>
  handleQueryParams("search", searchEl.value.toLowerCase())
)

// Make search icon accessible
searchIcon.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleQueryParams("search", searchEl.value.toLowerCase())
  }
})

// Trigger search query with "Enter" key
searchEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleQueryParams("search", searchEl.value.toLowerCase())
  }
})

// Trigger refetch if user deletes search value
searchEl.addEventListener("keyup", (e) => {
  if (e.key === "Backspace" && searchEl.value.length === 0) {
    handleQueryParams("search")
  }
})

// Add event listener for option instead of select element so we can hide the "Sort by" option
// and remove the current value by selecting it
optionEl.forEach(option => {
  option.addEventListener("click", (e) => {
    if (e.target.value === url.get("order")) {
      selectEl.value = "sortby"
      handleQueryParams("order")
    } else {
      handleQueryParams("order", e.target.value)
    }
  })
})

// Handle selecting tags
filterEl.forEach((filter) => {
  const value = filter.getAttribute("data-value")
  filter.addEventListener("click", () => {
    updateHeaderElement(value)
    handleQueryParams("tag", value)
  })
})

// Handle clear filter
clearFilterEL.addEventListener("click", handleClearFilters)

// Handle pagination
paginationBtns.forEach((btn) => {
  const selectedPage = btn.getAttribute("data-value")
  btn.addEventListener("click", () => handleQueryParams("page", selectedPage))
})

// Updates/deletes the URL params
export function handleQueryParams(key, value) {
  if (key && !value) {
    url.delete(key)
  } else {
    url.set(key, value)
  }
  if (key !== "page") { // Go to page 1 if a new filter is selected
    url.delete("page")
  }
  handleUpdateUrl()
}

// Update query params in URL without hard refreshing the page
function handleUpdateUrl() {
  const newUrl = window.location.pathname + "?" + url.toString()
  history.pushState(null, "", newUrl)
  getAndCreatePosts()
}

// Handle get blog posts
async function getAndCreatePosts() {
  const page = url.get("page")
  const order = url.get("order")
  const tag = url.get("tag")
  const search = url.get("search")

  const response = await getAllPosts({
    author: "mkm",
    tag: tag ? tag.toUpperCase() : "", // Set tag to uppercase on get/create for failsafe, since backend tag filtering is case sensitive
    page: page ? page : 1,
    limit: search ? "" : 12, // Set limit to 12 posts per page, unless there is a search query
    sort: order ? order : "desc",
  })
  if (response?.data?.length) { // Check if there are any posts in response
    handleFilterData(response)
    createPagination(response.meta)
  } else containerEl.innerHTML = `<p>There are no posts to display</p>` // If there are no posts in the response, update UI with "No posts"
  checkIfFilters() // Check for filters
}

// Filter posts through search query
function handleFilterData(posts) {
  const searchQuery = url.get("search")
  let filteredData = posts.data
  if (searchQuery) { // Check if there is any search query before filtering
    filteredData = posts.data.filter((post) => {
      return (
        // Return post if either title or body matches query
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }

  if (!filteredData?.length) {
    containerEl.innerHTML = `<p>No results</p>` // If query has no match, update UI with "No results"
  } else {
    createThumbnails(filteredData)
  }
}

getAndCreatePosts()

// Clear all the query params from the URL and reset the value of the filter elements
function handleClearFilters() {
  let params = new URLSearchParams(window.location.search)
  params.forEach((value, key) => url.delete(key))
  searchEl.value = ""
  selectEl.value = "sortby"
  updateHeaderElement()
  handleUpdateUrl() // Refetch posts without any filters
}

// Hide / Show the "Clear Filters" button
function checkIfFilters() {
  if (url.size) { // Check if there any URL query params
    clearFilterEL.style = "visibility: visible;"
  } else {
    clearFilterEL.style = "visibility: hidden;"
  }
}
