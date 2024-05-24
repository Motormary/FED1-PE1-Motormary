import { getAllPosts } from "../js/functions/get-all-posts.mjs"
import formatPostsByAge from "./functions/format-array-by-date.mjs"
import formateDateTime from "./functions/format-date.mjs"
import borderEffect from "./functions/thumbnail-effect.mjs"

const containerEl = document.querySelector("div.thumbnails-container")
const searchEl = document.querySelector("input#search-posts")
const searchIcon = document.querySelector("i.search-icon")
const filterEl = document.querySelectorAll("button.feed")
const selectEl = document.querySelector("select.filter-select")
const clearFilterEL = document.querySelector("button#clear-filters")
let url = new URLSearchParams(window.location.search)
const page = url.get("page")

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

selectEl.addEventListener("change", () =>
  handleQueryParams("order", selectEl.value.toLowerCase())
)

filterEl.forEach((filter) => {
  const value = filter.getAttribute("data-value")
  filter.addEventListener("click", () => handleQueryParams("tag", value))
})

clearFilterEL.addEventListener("click", (e) => {
  let params = new URLSearchParams(window.location.search)
  params.forEach((value, key) => url.delete(key))
  searchEl.value = ""
  selectEl.value = "sortby"
  handleUpdateUrl()
})

function handleQueryParams(key, value) {
  if (key && !value) {
    url.delete(key)
  } else {
    url.set(key, value)
  }
  handleUpdateUrl()
}

function handleUpdateUrl() {
  const newUrl = window.location.pathname + "?" + url.toString()
  history.pushState(null, "", newUrl)

  populatePosts()
}

async function populatePosts() {
  const response = await getAllPosts("mkm", page ? page : 1, 12)
  if (response?.data.length) {
    handleFilterData(response.data)
    if (url.size) clearFilterEL.style = "visibility: visible;"
    else clearFilterEL.style = "visibility: hidden;"
  } else containerEl.innerHTML = `<p>There are no posts to display</p>`
}

function handleFilterData(data) {
  const tagQuery = url.get("tag")
  const searchQuery = url.get("search")
  const orderQuery = url.get("order")
  let filteredData = data
  if (tagQuery || searchQuery) {
    filteredData = data.filter((post) => {
      if (searchQuery && tagQuery) {
        return (
          (post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(tagQuery.toLowerCase())
            )) ||
          (post.body.toLowerCase().includes(searchQuery.toLowerCase()) &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(tagQuery.toLowerCase())
            ))
        )
      } else if (searchQuery && !tagQuery) {
        return (
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } else if (tagQuery && !searchQuery) {
        return post.tags.some((tag) =>
          tag.toLowerCase().includes(tagQuery.toLowerCase())
        )
      }
    })
  }

  if (orderQuery === "oldest") {
    filteredData = formatPostsByAge(filteredData)
  }

  if (!filteredData?.length) {
    containerEl.innerHTML = `<p>No results</p>`
  } else createThumbnails(filteredData)
}

populatePosts()

// Create thumbnails - Prettier's a bitch
function createThumbnails(data) {
  containerEl.innerHTML = ""
  data.forEach((post, index) => {
    const thumbnailEl = document.createElement("div")
    thumbnailEl.classList.add("thumbnail")
    thumbnailEl.addEventListener("mouseover", borderEffect)
    thumbnailEl.innerHTML = `
    <div class="thumbnail-border"></div>
            <a href="/post/index.html?author=${post.author.name}&postId=${post.id}">
                <img src="${post.media.url}" alt="${post?.media?.url || "Post Banner"}">
            </a>
        <div class="thumbnail-text">
            <span>${post.tags[0]}</span>
            <a href="/post/index.html?author=${post.author.name}&postId=${post.id}">
                <p class="thumbnail-title">${post.title}</p>
            </a>
            <div class="thumbnail-creator">
                <div class="creator">
                    <img class="creator-avatar" src="${
                      post.author.avatar.url
                    }" alt="${post.author.avatar.alt}">
                    <p>${post.author.name}</p>
                </div>
                <p>${formateDateTime(post.created)}</p>
            </div>
        </div>
        `
    containerEl.appendChild(thumbnailEl)
  })
}
