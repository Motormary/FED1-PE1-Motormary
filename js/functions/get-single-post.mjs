import { POSTS_URL } from "../urls.mjs"
import { createErrorPage } from "./404.mjs"

export default async function getSinglePost(author, postId) {
  try {
    const response = await fetch(`${POSTS_URL}${author}/${postId}`, {
      method: "GET",
      cache: "no-store"
    })

    const responseData = await response.json()
    if (response.ok) {
      return responseData
    } else {
      return response.status
    }
  } catch (e) {
    createErrorPage("Error", "Something went wrong, try again later")
    console.error(e)
  }
}
