import { getAuthField } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
import handleErrors from "../functions/handle-input-errors.mjs"
import removeErrors from "../functions/remove-errors.mjs"
import { POSTS_URL } from "../urls.mjs"
const form = document.querySelector("form#create")

form.addEventListener("submit", createPost)

async function createPost(event) {
  event.preventDefault()
  removeErrors()
  const formData = new FormData(event.target)
  const author = getAuthField("name")
  const accessToken = getAuthField("accessToken")

  const formObject = formatPostData(formData)

  try {
    const response = await fetch(POSTS_URL + author, {
      method: "POST",
      "Content-Type": "application/json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formObject),
    })

    const responseData = await response.json()
    if (response.ok) {
      const data = responseData.data
      showToast("Post created!", `/post/?author=${author}&postId=${data.id}`)
    } else {
      handleErrors(responseData)
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}

function formatPostData(formData) {
  const formObject = Object.fromEntries(formData)

  // Create array of tags + remove undefined/white spaces from array
  formObject.tags = formObject.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "")

  if (formObject.media) {
    formObject.media = {
      url: formObject.media,
      alt: "banner",
    }
  } else {
    delete formObject.media
  }

  return formObject
}
