import { getAuth } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
import formatRegData from "../functions/format-registration-data.mjs"
import handleErrors from "../functions/handle-input-errors.mjs"
import removeErrors from "../functions/remove-errors.mjs"
import validatePassword from "../functions/validate-password.mjs"
import { REGISTER_URL } from "../urls.mjs"

const auth = getAuth()

if (!auth) window.location.replace("/account/login.html")

const registerForm = document.querySelector("form#registerForm")
registerForm.addEventListener("submit", registerUser)

async function registerUser(event) {
  event.preventDefault()
  removeErrors() // If errors - remove them.

  const formData = new FormData(event.target)

  const isPasswordValid = validatePassword(formData) // Validate "confirm password" field.

  if (!isPasswordValid) return

  const formObject = formatRegData(formData) // Format nested data: {}

  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })

    if (response.ok) {
      showToast("Account created successfully!")
    } else {
      const data = await response.json()
      if (data.errors.length && data.errors[0]?.path) {
        handleErrors(data) // If the error has a path the label will be set to red with the error message displayed beneath the input.
      } else {
        showToast(data.errors[0].message) // If no path, display error in a toast.
      }
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}


