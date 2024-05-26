const containerEl = document.querySelector("div.thumbnails-container")
import formateDateTime from "./format-date.mjs"

export default function createThumbnails(data) {
  let thumbnailHtml = ""
  data.forEach((post) => {
    const date = formateDateTime(post.created)
    
    thumbnailHtml += `
      <div class="thumbnail">
        <div class="thumbnail-border"></div>
            <a href="/post/index.html?author=${post.author.name}&postId=${post.id}">
                <img src="${post.media.url}" alt="banner">
            </a>
            <div class="thumbnail-text">
                <span>${post.tags[0]}</span>
                <a href="/post/index.html?author=${post.author.name}&postId=${post.id}">
                    <p class="thumbnail-title">${post.title}</p>
                </a>
                <div class="thumbnail-creator">
                    <div class="creator">
                        <img class="creator-avatar" src="${post.author.avatar.url}" alt="avatar">
                        <p>${post.author.name}</p>
                    </div>
                    <p>${date}</p>
                </div>
          </div>
      </div>
  
          `
    containerEl.innerHTML = thumbnailHtml
  })
}
