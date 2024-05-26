import { getAllPosts } from "../js/functions/get-all-posts.mjs"
import createPagination from "./functions/create-pagination.mjs"
import createThumbnails from "./functions/create-thumbnails.mjs"

const containerEl = document.querySelector("div.thumbnails-container")
const searchEl = document.querySelector("input#search-posts")
const searchIcon = document.querySelector("i.search-icon")
const filterEl = document.querySelectorAll("button.feed")
const selectEl = document.querySelector("select.filter-select")
const clearFilterEL = document.querySelector("button#clear-filters")
const paginationBtns = document.querySelectorAll("button.pagination-btn")
let url = new URLSearchParams(window.location.search)

searchIcon.addEventListener("click", () =>
  handleQueryParams("search", searchEl.value.toLowerCase())
)

searchIcon.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleQueryParams("search", searchEl.value.toLowerCase())
  }
})
searchEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleQueryParams("search", searchEl.value.toLowerCase())
  }
})

searchEl.addEventListener("keyup", (e) => {
  if (e.key === "Backspace" && searchEl.value.length === 0) {
    handleQueryParams("search")
  }
})

selectEl.addEventListener("change", (e) =>
  handleQueryParams("order", e.target.value)
)

filterEl.forEach((filter) => {
  const value = filter.getAttribute("data-value")
  filter.addEventListener("click", () => handleQueryParams("tag", value))
})

clearFilterEL.addEventListener("click", handleClearFilters)

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
  if (key !== "page") {
    url.delete("page")
  }
  handleUpdateUrl()
}

function handleUpdateUrl() {
  const newUrl = window.location.pathname + "?" + url.toString()
  history.pushState(null, "", newUrl)

  getAndCreatePosts()
}

async function getAndCreatePosts() {
  const page = url.get("page")
  const order = url.get("order")
  const tag = url.get("tag")
  const search = url.get("search")

  const response = await getAllPosts({
    author: "mkm",
    tag: tag ? tag.toUpperCase() : "",
    page: page ? page : 1,
    limit: search ? "" : 12,
    sort: order ? order : "desc",
  })
  if (response?.data?.length) {
    handleFilterData(response)
    checkIfFilters()
    createPagination(response.meta)
  } else containerEl.innerHTML = `<p>There are no posts to display</p>`
}

function handleFilterData(posts) {
  const searchQuery = url.get("search")
  let filteredData = posts.data
  if (searchQuery) {
    filteredData = posts.data.filter((post) => {
      return (
        // Returns if either title or body matches
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }

  if (!filteredData?.length) {
    containerEl.innerHTML = `<p>No results</p>`
  } else {
    createThumbnails(filteredData)
  }
}

getAndCreatePosts()

function handleClearFilters() {
  let params = new URLSearchParams(window.location.search)
  params.forEach((value, key) => url.delete(key))
  searchEl.value = ""
  selectEl.value = "sortby"
  handleUpdateUrl()
}

function checkIfFilters() {
  if (url.size) {
    clearFilterEL.style = "visibility: visible;"
  } else {
    clearFilterEL.style = "visibility: hidden;"
  }
}

