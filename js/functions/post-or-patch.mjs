import { getAuthField } from "../auth.mjs"
import { showToast } from "../components/toast.mjs"
import handleErrors from "../functions/handle-input-errors.mjs"
import removeErrors from "../functions/remove-errors.mjs"
import { POSTS_URL } from "../urls.mjs"

export async function postOrPatchPost(event, method, author, postId) {
  event.preventDefault()
  if (!author) throw new Error("Author missing")
  const accessToken = getAuthField("accessToken")
  if (!accessToken) throw new Error("Auth is missing")
  removeErrors()
  const formData = new FormData(event.target)

  const formObject = formatPostData(formData)
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
      handleErrors(responseData)
    }
  } catch (e) {
    showToast("Something went wrong, try again or contact support.")
    console.error(e)
  }
}

export function formatPostData(formData) {
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
