import { handleDeletePost } from "../pages/list.mjs"

const allPostsEl = document.querySelector("div.all-posts-container")


// Create post elements for list.html
export default function createPostsToEdit(data) {
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
    viewHref.href = `/post/?author=${post.author.name}&postId=${post.id}`
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
    // ---------------------------------------

    deleteAction.appendChild(deleteicon)
    deleteInfoContainer.appendChild(deleteInfoText)
    deleteIconContainer.append(deleteAction, deleteInfoContainer)
    optionsContainer.appendChild(deleteIconContainer)

    postContainer.append(textContainer, optionsContainer)
    allPostsEl.appendChild(postContainer)
  })
}
