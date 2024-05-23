const bannerEL = document.querySelector("img.post-banner")
const titleEl = document.querySelector("h1.post-title")
const descriptionEl = document.querySelector("p.date-type")
const textBodyEl = document.querySelector("div.post-text")
const authorNameEl = document.querySelector("p.author-name")
const authorTitleEl = document.querySelector("p.author-title")
const morePostsEl = document.querySelector("div.more-container")
const url = new URLSearchParams(window.location.search)
const postId = url.get("postId")
console.log(url)


async function getPost() {

}