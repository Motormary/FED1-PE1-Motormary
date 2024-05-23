import { getAuth } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
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

async function getPostsForEdit() {
  const posts = await getAllPosts(auth.name, page)
  if (posts.data[0]?.id) {
    allPostsEl.innerHTML = ""
    filterPostsToEdit(posts.data)
  } else {
    createEmptyPosts()
  }
}

getPostsForEdit()

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

function createPostsToEdit(data) {
  data.forEach((post) => {
    const postContainer = document.createElement("div")
    postContainer.classList.add("post-to-edit")

    // -------- Title & Body --------
    const textContainer = document.createElement("div")
    textContainer.classList.add("edit-text")

    const postTitle = document.createElement("p")
    postTitle.classList.add("edit-title")
    postTitle.textContent = post.title

    const postBody = document.createElement("p")
    postBody.classList.add("edit-body")
    postBody.textContent = post.body

    textContainer.append(postTitle, postBody)
    // -------------------------------

    // ------------- Action Icons ----------------
    const optionsContainer = document.createElement("div")
    optionsContainer.classList.add("edit-options")

    // ---------- View Post Icon ----------------
    const viewIconContainer = document.createElement("div")
    const viewHref = document.createElement("a")
    const viewIcon = document.createElement("i")
    const viewInfoContainer = document.createElement("div")
    const viewInfoText = document.createElement("p")

    viewIconContainer.classList.add("action-icon")
    viewHref.href = `/post/?author=${auth.name}&postId=${post.id}`
    viewIcon.classList.add("fa-regular", "fa-eye")
    viewInfoContainer.classList.add("info-text")
    viewInfoText.textContent = "View Post"

    viewHref.appendChild(viewIcon)
    viewInfoContainer.appendChild(viewInfoText)
    viewIconContainer.append(viewHref, viewInfoContainer)
    optionsContainer.appendChild(viewIconContainer)
    // ---------------------------

    // -------------- Edit Post Icon ----------------
    const EditIconContainer = document.createElement("div")
    const editAction = document.createElement("a")
    const editIcon = document.createElement("i")
    const editInfoContainer = document.createElement("div")
    const editInfoText = document.createElement("p")

    EditIconContainer.classList.add("action-icon")
    editAction.href = `/post/edit.html?author=${post.author.name}&postId=${post.id}`
    editIcon.classList.add("fa-regular", "fa-pen-to-square")
    editInfoContainer.classList.add("info-text")
    editInfoText.textContent = "Edit Post"

    editAction.appendChild(editIcon)
    editInfoContainer.appendChild(editInfoText)
    EditIconContainer.append(editAction, editInfoContainer)
    optionsContainer.appendChild(EditIconContainer)
    // ------------------------------------

    // ----------- Delete Post Icon -----------
    const deleteIconContainer = document.createElement("div")
    const deleteAction = document.createElement("a")
    const deleteicon = document.createElement("i")
    const deleteInfoContainer = document.createElement("div")
    const deleteInfoText = document.createElement("p")

    deleteIconContainer.classList.add("action-icon")
    deleteAction.addEventListener("click", (e) => {
      e.preventDefault()
      handleDeletePost(post, postContainer)
    })
    deleteicon.classList.add("fa-regular", "fa-trash-can")
    deleteInfoContainer.classList.add("info-text")
    deleteInfoText.textContent = "Delete Post"

    deleteAction.appendChild(deleteicon)
    deleteInfoContainer.appendChild(deleteInfoText)
    deleteIconContainer.append(deleteAction, deleteInfoContainer)
    optionsContainer.appendChild(deleteIconContainer)

    postContainer.append(textContainer, optionsContainer)
    allPostsEl.appendChild(postContainer)
  })
}

function handleDeletePost(post, postContainer) {
  const response = deletePost(post.author.name, post.id)
  if (response) {
    showToast("Post deleted")
    postContainer.remove()
    checkPostsLength()
  } else {
    showToast("Something went wrong, try again or contact support")
  }
}

function checkPostsLength() {
  const posts = document.querySelectorAll(".post-to-edit")

  if (!posts.length) createEmptyPosts()
}

function createEmptyPosts() {
  allPostsEl.innerHTML = `
    <div style="text-align: center; margin-top: 15%; line-height: 2rem;">    
        <h3>There are no posts to edit</h3>
        <a style="text-decoration: underline;" href="/">Go Home</a>
    </div>
    `
}
