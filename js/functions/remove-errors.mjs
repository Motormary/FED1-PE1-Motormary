export default function removeErrors() {
    // Removes red color from label
    const errors = document.querySelectorAll(".error")
    if (errors) errors.forEach((error) => error.classList.remove("error"))
    
    // Removes error message beneath inputfield
    const errorMessages = document.querySelectorAll(".error-message")
    if (errorMessages) errorMessages.forEach((error) => (error.textContent = ""))
  }