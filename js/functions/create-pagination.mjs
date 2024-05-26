import { handleQueryParams } from "../index.mjs"

const paginationContainer = document.querySelector("div.pagination")

export default function createPagination(data) {
    if (!data) return
  
    const { pageCount, currentPage } = data
  
    if (pageCount > 1) {
      // Create "First Page" button
      const firstPageBtn = document.createElement("button")
      firstPageBtn.classList.add("pagination-btn")
      firstPageBtn.id = "first-page"
      firstPageBtn.textContent = "First Page"
      firstPageBtn.addEventListener("click", () => handleQueryParams("page", 1))
  
      // Create "Last Page" button
      const lastPageBtn = document.createElement("button")
      lastPageBtn.classList.add("pagination-btn")
      lastPageBtn.id = "last-page"
      lastPageBtn.textContent = "Last Page"
      lastPageBtn.addEventListener("click", () =>
        handleQueryParams("page", pageCount)
      )
  
      // Replace children with first and last page buttons
      paginationContainer.replaceChildren(firstPageBtn, lastPageBtn)
  
      //** Mr.Jippity (GPT) helped me improve this with the Math syntaxes - Makes sure the selected page stays in center if possible */
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(pageCount, currentPage + 2)
  
      if (endPage - startPage < 4) {
        if (startPage === 1) {
          endPage = Math.min(5, pageCount)
        } else if (endPage === pageCount) {
          startPage = Math.max(1, pageCount - 4)
        }
      }
      //** End */
  
      // Create numbered page buttons
      for (let i = startPage; i <= endPage; i++) {
        const btnEl = document.createElement("button")
        btnEl.classList.add("pagination-btn")
        if (i === currentPage || !currentPage) {
          btnEl.classList.add("active") // Highlight current page button
        }
        btnEl.textContent = i
        btnEl.addEventListener("click", () => handleQueryParams("page", i)) // Update URL parameters
        lastPageBtn.before(btnEl)
      }
    } else {
      paginationContainer.innerHTML = ""
    }
  }
  