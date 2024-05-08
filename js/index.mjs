const carousel = document.querySelector("div.carousel-images")
const next = document.querySelector("button.next")
const prev = document.querySelector("button.prev")
const images = document.querySelectorAll("a.banner")
const totalImages = images.length
const bannerDot = document.querySelectorAll(".banner-dot")

let currentIndex = 0
let prevIndex

function setIndexColor() {
  bannerDot.forEach((dot, index) => {
    if (index === currentIndex) dot.style.color = "#555"
    else dot.style.color = "#67676755"
  })
}

setIndexColor()

function handlePrev() {
  // Save current index as prevIndex
  prevIndex = currentIndex

  // Go back one image, if we're at the start, go to the last image
  currentIndex = (currentIndex - 1 + totalImages) % totalImages
  carousel.insertBefore(images[currentIndex], carousel.firstChild)
  setIndexColor()
}

function handleNext() {
  prevIndex = currentIndex

  // Go to the next image, if we're at the end, go to first image
  currentIndex = (currentIndex + 1) % totalImages
  carousel.appendChild(images[prevIndex])
  setIndexColor()
}

next.addEventListener("click", handleNext)

prev.addEventListener("click", handlePrev)

function autoPlay() {
  setTimeout(() => {
    handleNext()
    autoPlay()
  }, 6000)
}

autoPlay()