import { showToast } from "../components/toast.mjs"
import { LOGIN_URL } from "../urls.mjs"

const loginForm = document.querySelector("form#loginForm")

loginForm.addEventListener("submit", loginUser)

async function loginUser(event) {
  event.preventDefault()
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
      const accessToken = data.accessToken
      if (formData.has("save-auth")) {
        localStorage.auth = accessToken
        localStorage.email = data.email
      } else {
        sessionStorage.auth = accessToken
        sessionStorage.email = data.email
      }
      window.location.href = "/"
      loginForm.classList.remove("error")
    } else {
      loginForm.classList.add("error")
      const errorData = await response.json()
      showToast(errorData.errors[0].message)
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}
