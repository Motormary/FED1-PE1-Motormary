// Dynamic modal where user should have 2 steps before resolving a promise, e.g deleting a post

export default async function twoStepModal({
  title,
  body,
  btnText,
  someFunction,
}) {

  // Create new promise
  return new Promise((resolve, reject) => {
    // ------- Modal Container ----------
    const modalContainer = document.createElement("div")
    modalContainer.classList.add("tsContainer")

    // -------- Modal ------------
    const modalEl = document.createElement("div")
    modalEl.classList.add("tsModal")

    // -------- Title ----------
    const titleEl = document.createElement("h4")
    titleEl.classList.add("tsTitle")
    titleEl.textContent = title

    // ---------- Body ------------
    const bodyEl = document.createElement("p")
    bodyEl.classList.add("tsBody")
    bodyEl.textContent = body

    // ------- Button Container --------
    const btnContainer = document.createElement("div")
    btnContainer.classList.add("tsBtnContainer")

    // ------- Close Button ------------
    const closeBtn = document.createElement("button")
    closeBtn.classList.add("tsCancel")
    closeBtn.textContent = "Cancel"
    closeBtn.setAttribute("tabindex", "1") // Accessability
    closeBtn.addEventListener("click", handleCloseModal)

    // --- Run provided function Button -----
    const acceptBtn = document.createElement("button")
    acceptBtn.classList.add("tsAccept")
    acceptBtn.setAttribute("tabindex", "1") // Accessability
    acceptBtn.textContent = btnText
    acceptBtn.addEventListener("click", async () => {
      try {
        const result = await someFunction()
        resolve(result) // Resolve promise of provided function and close modal
        modalContainer.remove()
      } catch (error) { // If errors, reject and close
        reject(error)
        modalContainer.remove()
      }
    })

    // ------ X icon - close button ---------
    const escapeBtn = document.createElement("button")
    escapeBtn.classList.add("tsEscape")
    escapeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>` // X - Icon
    escapeBtn.setAttribute("tabindex", "1") // Accessability
    escapeBtn.addEventListener("click", handleCloseModal)

    btnContainer.append(closeBtn, acceptBtn)
    modalEl.append(titleEl, bodyEl, btnContainer, escapeBtn)
    modalContainer.appendChild(modalEl)
    document.body.appendChild(modalContainer)

    // ------- "Escape" Listener ---------
    window.addEventListener("keydown", handleEscKey)

    // Close modal function
    function handleCloseModal() {
      reject(new Error("User cancelled the operation"))
      modalContainer.remove()
      window.removeEventListener("keydown", handleEscKey)
    }

    // Key checker function
    function handleEscKey(e) {
      if (e.key === "Escape") {
        handleCloseModal()
      }
    }
  })
}
