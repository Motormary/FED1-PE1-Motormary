import { showToast } from "../components/toast.mjs"
import { LOGIN_URL } from "../urls.mjs"

const loginForm = document.querySelector("form#loginForm")
const inputfields = document.querySelectorAll(".inputfield")

loginForm.addEventListener("submit", loginUser)

async function loginUser(event) {
  event.preventDefault()
  inputfields.forEach(error => error.classList.remove("error"))

  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries())

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
      const isSaveSelected = formData.has("save-auth")
      
      handleSaveAuth(data, isSaveSelected)

      window.location.href = "/"
      
    } else {
      inputfields.forEach(field => field.classList.add("error"))
      const errorData = await response.json()
      showToast(errorData.errors[0].message)
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}

function handleSaveAuth(data, save) {
  if (save) {
    localStorage.hvlAuth = JSON.stringify(data)
  } else {
    sessionStorage.hvlAuth = JSON.stringify(data)
  }
}
