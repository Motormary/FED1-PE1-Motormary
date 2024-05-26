import { showToast } from "../components/toast.mjs"
import removeErrors from "../functions/remove-errors.mjs"
import { LOGIN_URL } from "../urls.mjs"

const loginForm = document.querySelector("form#loginForm")
const inputLabels = document.querySelectorAll(".inputfield")

loginForm.addEventListener("submit", loginUser)

async function loginUser(event) {
  event.preventDefault()
  removeErrors() // Remove any errors

  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries()) // Create object from formData

  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })

    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.data
      const isSaveSelected = formData.has("save-auth") // Check if user selected the "Keep me signed in option"
      
      handleSaveAuth(data, isSaveSelected) // Save auth

      window.location.href = "/"
      
    } else {
      inputLabels.forEach(field => field.classList.add("error")) // If failed login - add error class to labels
      const errorData = await response.json()
      showToast(errorData.errors[0].message) // Display a toast with the error
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}

// Save auth to session/local storage depending on save value
function handleSaveAuth(data, save) {
  if (save) {
    localStorage.hvlAuth = JSON.stringify(data)
  } else {
    sessionStorage.hvlAuth = JSON.stringify(data)
  }
}
