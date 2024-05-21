import { showToast } from "../components/toast.mjs"
import { REGISTER_URL } from "../urls.mjs"
const registerForm = document.querySelector("form#registerForm")

registerForm.addEventListener("submit", registerUser)

async function registerUser(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries())

  if (formData.get("avatar.url")) {
    formObject.avatar = {
      url: formData.get("avatar.url"),
      alt: formData.get("avatar.alt") || "avatar",
    }
  }
  if (formData.get("banner.url")) {
    formObject.banner = {
      url: formData.get("banner.url"),
      alt: formData.get("banner.alt") || "banner",
    }
  }

  formObject.venueManager = formData.has("venueManager")

  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })

    if (response.ok) {
      window.location.href = "/account/login.html"
    } else {
      const data = await response.json()
      console.log(data)
      showToast(data.errors[0].message)
    }

  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}
