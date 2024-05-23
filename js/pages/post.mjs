import { createErrorPage } from "../functions/404.mjs"
import formateDateTime from "../functions/format-date.mjs"
import { getAllPosts } from "../functions/get-all-posts.mjs"
import getSinglePost from "../functions/get-single-post.mjs"

const bannerEL = document.querySelector("img.post-banner")
const titleEl = document.querySelector("h1.post-title")
const descriptionEl = document.querySelector("p.date-type")
const textBodyEl = document.querySelector("div.post-text")
const authorAvatarEl = document.querySelector("img.author-avatar")
const authorNameEl = document.querySelector("p.author-name")
const authorTitleEl = document.querySelector("p.author-title")
const morePostContainerEl = document.querySelector("div.other-posts")
const morePostsEl = document.querySelector("div.more-container")

async function getPost() {
  const url = new URLSearchParams(window.location.search)
  const postId = url.get("postId")
  const author = url.get("author")

  const data = await getSinglePost(author, postId)

  if (data.data.id) {
    populatePost(data.data)
  } else {
    createErrorPage(
      data.data,
      "This is not the post you are looking for"
    )
  }
}

getPost()

async function populatePost(data) {
  const postDate = formateDateTime(data.created)
  const postBody = data.body.split("\n")
  const otherPosts = await getAllPosts(data.author.name, 4)
  let newBody = ""
  postBody.forEach((paragraph) => {
    if (paragraph) return (newBody += `<p>${paragraph}</p>`)
  })

  bannerEL.src = data?.media?.url || "/assets/images/b1.png"
  titleEl.textContent = data.title
  descriptionEl.textContent = `${
    data?.tags[0] ? data.tags[0] + " - " : ""
  }${postDate}`
  textBodyEl.innerHTML = newBody
  authorAvatarEl.src = data.author.avatar.url
  authorNameEl.textContent = data.author.name
  authorTitleEl.textContent = "Manager"

  if (otherPosts && otherPosts.length > 2) {
    populateOtherPosts(otherPosts, data.id)
  }
}

function populateOtherPosts(otherPosts, currentPostId) {
    morePostContainerEl.removeAttribute("hidden")
    let posts = ""

    otherPosts.forEach((post) => {
      if (post.id !== currentPostId) // Avoid showing current post as "other"
        return (posts += `
            <a href="/post/?author=${post.author.name}&postId=${post.id}">
                <p class="other-title">${post.title}</p>
                <p class="description other-body">${post.body ? post.body.slice(0, 25) + "..." : ""}</p>
            </a>
            `)
    })

    morePostsEl.innerHTML = posts
}
