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
const loadMoreBtn = document.querySelector("button#load-more")
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

selectEl.addEventListener("change", () =>
  handleQueryParams("order", selectEl.value.toLowerCase())
)

filterEl.forEach((filter) => {
  const value = filter.getAttribute("data-value")
  filter.addEventListener("click", () => handleQueryParams("tag", value))
})

clearFilterEL.addEventListener("click", () => {
  let params = new URLSearchParams(window.location.search)
  params.forEach((value, key) => url.delete(key))
  searchEl.value = ""
  selectEl.value = "sortby"
  handleUpdateUrl()
  loadMoreBtn.classList.remove("hidden")
})


loadMoreBtn.addEventListener("click", () => {
  const sizeValue = url.get("size") || 12
  handleQueryParams("size", Number(sizeValue) + 12)
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
  const page = url.get("page")
  const order = url.get("order")
  const size = url.get("size")
  
  const response = await getAllPosts(
    "mkm",
    page ? page : 1,
    size ? size : 12,
    order ? order : "desc"
  )
  if (response?.data.length) {
    handleFilterData(response.data)
    handleMorePosts(response)
    if (url.size) clearFilterEL.style = "visibility: visible;"
    else clearFilterEL.style = "visibility: hidden;"
  } else containerEl.innerHTML = `<p>There are no posts to display</p>`
}

function handleFilterData(data) {
  const tagQuery = url.get("tag")
  const searchQuery = url.get("search")
  let filteredData = data
  if (tagQuery || searchQuery) {
    filteredData = data.filter((post) => {
      if (searchQuery && tagQuery) {
        return (
          // Returns if both title and tag queries match
          (post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(tagQuery.toLowerCase())
            )) || // OR
            // Returns if both body and tag queries match
          (post.body.toLowerCase().includes(searchQuery.toLowerCase()) &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(tagQuery.toLowerCase())
            ))
        )
      } else if (searchQuery && !tagQuery) {
        return (
          // Returns if either title or body matches
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } else if (tagQuery && !searchQuery) {
        // Returns tag queries
        return post.tags.some((tag) =>
          tag.toLowerCase().includes(tagQuery.toLowerCase())
        )
      }
    })
  }

  if (!filteredData?.length) {
    containerEl.innerHTML = `<p>No results</p>`
  } else {
    createThumbnails(filteredData)
  }
}

function handleMorePosts(data) {
  console.log("asd")
  if (!data.meta.nextPage) {
    loadMoreBtn.classList.add("hidden")
  }
}

populatePosts()

function createThumbnails(data) {
  let thumbnailHtml = ""
  data.forEach((post, index) => {
    thumbnailHtml += `
    <div class="thumbnail">
      <div class="thumbnail-border"></div>
              <a href="/post/index.html?author=${post.author.name}&postId=${
        post.id
      }">
                  <img src="${post.media.url}" alt="${
        post?.media?.url || "Post Banner"
      }">
              </a>
          <div class="thumbnail-text">
              <span>${post.tags[0]}</span>
              <a href="/post/index.html?author=${post.author.name}&postId=${
        post.id
      }">
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
    </div>

        `
    containerEl.innerHTML = thumbnailHtml
  })
}
