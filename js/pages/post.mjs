import { getAuth } from "../auth.mjs"
import { createErrorPage } from "../functions/404.mjs"
import formateDateTime from "../functions/format-date.mjs"
import { getAllPosts } from "../functions/get-all-posts.mjs"
import getSinglePost from "../functions/get-single-post.mjs"

const bannerEL = document.querySelector("img.post-banner")
const titleEl = document.querySelector("h1.post-title")
const hrefEl = document.querySelector("a#edit-ref")
const descriptionEl = document.querySelector("p.date-type")
const textBodyEl = document.querySelector("div.post-text")
const authorAvatarEl = document.querySelector("img.author-avatar")
const authorNameEl = document.querySelector("p.author-name")
const authorTitleEl = document.querySelector("a.author-title")
const morePostContainerEl = document.querySelector("div.other-posts")
const morePostsEl = document.querySelector("div.more-container")
const headtitleEl = document.querySelector("title")
const auth = getAuth()

async function getPost() {
  const url = new URLSearchParams(window.location.search) // Get params from URL
  const postId = url.get("postId")
  const author = url.get("author")

  const data = await getSinglePost(author, postId)

  if (data?.data?.id) {
    populatePost(data.data)
  } else {
    createErrorPage(data.data, "This is not the post you are looking for") // If error - display error code and message from server
  }
}

getPost()

async function populatePost(data) {
  const postDate = formateDateTime(data.created) // Format date to readable
  const postBody = data.body.split("\n") // Create array of paragraphs
  const otherPosts = await getAllPosts({ // Get more posts from the author
    author: data.author.name,
    limit: 4
  })

  let newBody = ""
  postBody.forEach((paragraph) => {
    if (paragraph) return (newBody += `<p>${paragraph}</p>`) // Put each body-paragraph in it's own paragraph-element and return as html
  })

  bannerEL.src = data?.media?.url || "/assets/images/filler.png"
  titleEl.textContent = data.title
  descriptionEl.textContent = `${
    data?.tags[0] ? data.tags[0] + " - " : ""
  }${postDate}`
  textBodyEl.innerHTML = newBody
  authorAvatarEl.src = data.author.avatar.url
  authorNameEl.textContent = data.author.name
  authorTitleEl.textContent = data.author.email
  authorTitleEl.href = `mailto:${data.author.email}`
  authorTitleEl.setAttribute("title", data.author.email) // Set the email in the title attribute in case it overflows
  headtitleEl.textContent = data.title

  if (auth) { // If user has auth, update href for edit button
    hrefEl.href = `/post/edit.html?author=${data.author.name}&postId=${data.id}`
  } else hrefEl.remove()

  if (otherPosts && otherPosts.data.length > 1) { // If the user has more than 1 post, create section with "Other posts from this author"
    populateOtherPosts(otherPosts.data, data.id)
  }
}

function populateOtherPosts(otherPosts, currentPostId) {
  // Make container visible
  morePostContainerEl.removeAttribute("hidden")
  let posts = ""

  otherPosts.forEach((post) => {
    // Create a snippet from the first line in the body
    // If no hard stops, slice the body, if no body, create empty array to avoid error
    const bodySnippet = post.body.split(".") || [post.body.slice(0, 100)] || [""]
    if (post.id !== currentPostId) // Avoid showing current post as "other"
      return (posts += `
            <a href="/post/?author=${post.author.name}&postId=${post.id}">
                <p class="other-title">${post.title}</p>
                <p class="description other-body">${
                  bodySnippet[0]
                }</p>
            </a>
            `)
  })

  morePostsEl.innerHTML = posts
}
