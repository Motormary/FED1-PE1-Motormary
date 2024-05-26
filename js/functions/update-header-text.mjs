const headerEl = document.querySelector("h1.blog-feed")


// Updates the header element for the front page depending on the filtered tag value
export default function updateHeaderElement(value) {
  switch (value) {
    case "ai": {
      headerEl.textContent = "Artificial Intelligence"
    } break
    case "cg": {
      headerEl.textContent = "Cryptography"
    } break
    case "ml": {
      headerEl.textContent = "Machine Learning"
    } break
    case "cs": {
      headerEl.textContent = "Cyber Security"
    } break
    default: {
      headerEl.textContent = "All posts"
    }
  }
}