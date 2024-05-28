import { getAuthField } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
import handleErrors from "../functions/handle-input-errors.mjs"
import removeErrors from "../functions/remove-errors.mjs"
import { POSTS_URL } from "../urls.mjs"

export async function postOrPatchPost(event, method, author, postId) {
  event.preventDefault()
  if (!author) throw new Error("Author missing") // Check for author before getting access token
  const accessToken = getAuthField("accessToken")
  if (!accessToken) throw new Error("Auth is missing")
  removeErrors()
  const formData = new FormData(event.target)

  const formObject = formatPostData(formData)
  formObject.tags = formObject.tags.map(tag => tag.toUpperCase()) // Failsafe - because backend tag filtering is apparently case sensitive.
  
  try {
    const response = await fetch(
      `${POSTS_URL}${author}${postId ? "/" + postId : ""}`,
      {
        method: method,
        "Content-Type": "application/json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formObject),
      }
    )

    const responseData = await response.json()
    if (response.ok) {
      const data = responseData.data
      showToast(
        "Success!",
        `/post/?author=${data.author.name}&postId=${data.id}`
      )
    } else {
      if (responseData.errors[0]?.path) { // If error has a path show errors on input field
        handleErrors(responseData)
      } else {
        showToast(responseData.errors[0]?.message) // If no path, show error in toast
      }
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}

// Create and format post object to correct format
export function formatPostData(formData) {
  const formObject = Object.fromEntries(formData)

  // Create array of tags
  formObject.tags = formObject.tags
    .split(",")
    .map((tag) => tag.trim()) // Remove white spaces
    .filter((tag) => tag !== "") // Remove any empty values

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
