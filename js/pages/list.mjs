import { getAuth } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
import createPostsToEdit from "../functions/create-posts-list.mjs"
import deletePost from "../functions/delete-single-post.mjs"
import { getAllPosts } from "../functions/get-all-posts.mjs"

const searchEl = document.querySelector("input[type=search]")
const allPostsEl = document.querySelector("div.all-posts-container")
const url = new URLSearchParams(window.location.search)
const page = url.get("page")

const auth = getAuth()

if (!auth) {
  window.location.replace("/account/login.html")
}

searchEl.addEventListener("keyup", () => {
  getPostsForEdit()
})

// Get all posts of the logged in user
async function getPostsForEdit() {
  const posts = await getAllPosts({
    author: auth.name, 
    page: page
  })
  if (posts.data[0]?.id) {
    allPostsEl.innerHTML = "" // Reset html when searching
    filterPostsToEdit(posts.data)
  } else {
    createEmptyPosts()
  }
}

getPostsForEdit()

// Filter posts through search query
function filterPostsToEdit(data) {
  const searchValue = searchEl.value.toLowerCase()

  const filteredData = data.filter((post) => {
    return (
      post.body.toLowerCase().includes(searchValue) ||
      post.title.toLowerCase().includes(searchValue) ||
      post.tags.some((tag) => tag.includes(searchValue))
    )
  })

  if (!filteredData.length) allPostsEl.innerHTML = `<p>No results</p>`

  createPostsToEdit(filteredData)
}

// Create post elements


// Handle delete post
export function handleDeletePost(post, postContainer) {
  const response = deletePost(post.author.name, post.id)
  if (response) {
    showToast("Post deleted")
    postContainer.remove() // Remove post from html
    checkPostsLength() // Check if it was the last post deleted
  } else {
    showToast("Something went wrong, try again or contact support")
  }
}

// Check if any posts in array
function checkPostsLength() {
  const posts = document.querySelectorAll(".post-to-edit")

  if (!posts.length) createEmptyPosts()
}

// Create message if no posts to display
function createEmptyPosts() {
  allPostsEl.innerHTML = `
    <div style="text-align: center; margin-top: 15%; line-height: 2rem;">    
        <h3>There are no posts to edit</h3>
        <a style="text-decoration: underline;" href="/">Go Home</a>
    </div>
    `
}
