import { POSTS_URL } from "../urls.mjs"
import { createErrorPage } from "./404.mjs"

export async function getAllPosts(author, page, limit) {
  if (!author) throw new Error("Author param is missing")

  try {
    const response = await fetch(
      `${POSTS_URL}${author}?${
        page ? "page=" + page : ""
      }${limit ? "&limit=" + limit : ""}`,
      {
        method: "GET",
      }
    )

    const responseData = await response.json()

    if (response.ok) {
      const data = responseData
      return data
    } else {
      console.error(responseData)
      createErrorPage(responseData)
      return false
    }
  } catch (e) {
    console.error(e)
  }
}
