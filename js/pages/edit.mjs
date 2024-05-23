import { getAuth } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
import { createErrorPage } from "../functions/404.mjs"
import deletePost from "../functions/delete-single-post.mjs"
import getSinglePost from "../functions/get-single-post.mjs"
import { postOrPatchPost } from "../functions/post-or-patch.mjs"

const formEl = document.querySelector("form#edit")
const titleEl = document.querySelector("input[name=title")
const bodyEl = document.querySelector("textarea[name=body]")
const mediaEl = document.querySelector("input[name=media]")
const tagsEl = document.querySelector("input[name=tags]")
const deleteBtn = document.querySelector("button.delete-post")
const backBtn = document.querySelector(".edit-back")
const url = new URLSearchParams(window.location.search)
const author = url.get("author")
const postId = url.get("postId")

formEl.addEventListener("submit", (e) => {
  postOrPatchPost(e, "PUT", author, postId)
})

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault()
  handleDeletePost()
})

backBtn.addEventListener("click", () => window.history.back())

const auth = getAuth()

if (!auth) {
  window.location.replace("/account/login.html")
}

async function getEditPost() {
  if (author && postId) {
    const singlePost = await getSinglePost(author, postId)
    if (singlePost.data?.id) {
      populateEditFields(singlePost.data)
    } else createErrorPage(singlePost)
  } else createErrorPage()
}

getEditPost()

function populateEditFields(data) {
  titleEl.value = data.title
  bodyEl.value = data.body
  mediaEl.value = data.media.url
  tagsEl.value = data.tags.toString().replaceAll(",", ", ")
}

async function handleDeletePost() {
  const response = await deletePost(author, postId)
  if (response) {
    window.location.href = "/post/list.html"
  } else {
    showToast("Something went wrong, try again or contact support")
  }
}
