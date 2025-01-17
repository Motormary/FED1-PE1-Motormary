import { getAllPosts } from "./get-all-posts.mjs"

const carousel = document.querySelector("div.carousel-images")
const next = document.querySelector("button.next")
const prev = document.querySelector("button.prev")
const imageHrefEl = document.querySelectorAll("a.banner")
const bannerTitleEl = document.querySelectorAll("h2.banner-title")
const bannerBodyEl = document.querySelectorAll("p.banner-body")
const totalImages = imageHrefEl.length
const bannerDot = document.querySelectorAll(".banner-dot")

imageHrefEl.forEach((el) =>
  el.addEventListener("touchstart", handleTouchStart, false)
)
imageHrefEl.forEach((el) =>
  el.addEventListener("touchend", handleTouchEnd, false)
)

let touchData = {}

// Change banner index on mobile if user swipes

// Save touch position at start of touch
function handleTouchStart(event) {
  const touch = event.changedTouches

  for (let i = 0; i < touch.length; i++) {
    touchData[touch[i].identifier] = { // Set id for touch event
      pageX: touch[i].pageX, // Position of touch at start
    }
  }
}

// Handle touch data at end of touch
function handleTouchEnd(event) {
  const touch = event.changedTouches
  let touchInfo

  for (let i = 0; i < touch.length; i++) {
    touchInfo = touchData[touch[i].identifier]
    touchInfo.calcX = touch[i].pageX - touchInfo.pageX // Calculate distance moved since start
  }
  // Check if user swipes over 50px in X axis
  if (touchInfo.calcX > 50) {
    // Handle left swipe
    handlePrev()
  } else if (touchInfo.calcX < -50) {
    // Handle right swipe
    handleNext()
  }
}

let currentIndex = 0
let prevIndex

async function getPostsForCarousel() {
  const response = await getAllPosts({
    author: "mkm",
    limit: 3,
  })

  if (response?.data[0]?.id) {
    response.data.forEach((post, index) => {
      const bodySnippet = post?.body?.split(".") || [""] // Create snippet from the first line in body - OR a failsafe array with undefined to avoid error

      // Set banner as background image to make it easy for placing text above
      imageHrefEl[index].style = `
        background-image: url("${post.media.url}");
        `
      imageHrefEl[
        index
      ].href = `/post/index.html?author=${post.author.name}&postId=${post.id}`

      // Set title and body snippet
      bannerTitleEl[index].textContent = post.title
      bannerBodyEl[index].textContent = bodySnippet[0]
    })
  } else console.error("No images found", response.data)
}

getPostsForCarousel()

function setIndexColor() {
  bannerDot.forEach((dot, index) => {
    if (index === currentIndex) dot.style.color = "#555"
    // Create icon elements which highlights if it's the same index as banner showing
    else dot.style.color = "#67676755"
  })
}

setIndexColor()

function handlePrev() {
  // Save current index as prevIndex
  prevIndex = currentIndex

  // Go back one image, if we're at the start, go to the last image
  currentIndex = (currentIndex - 1 + totalImages) % totalImages
  carousel.insertBefore(imageHrefEl[currentIndex], carousel.firstChild)
  setIndexColor()
}

function handleNext() {
  prevIndex = currentIndex

  // Go to the next image, if we're at the end, go to first image
  currentIndex = (currentIndex + 1) % totalImages
  carousel.appendChild(imageHrefEl[prevIndex])
  setIndexColor()
}

next.addEventListener("click", handleNext)

prev.addEventListener("click", handlePrev)

// Function to handle auto slide through the banners by calling HandleNext and then itself
function autoPlay() {
  setTimeout(() => {
    handleNext()
    autoPlay()
  }, 10000)
}

autoPlay()
