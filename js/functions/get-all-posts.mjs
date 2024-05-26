import { POSTS_URL } from "../urls.mjs"
import { createErrorPage } from "./404.mjs"

// Returns all post with the given filters
export async function getAllPosts({author, tag, page, limit, sort}) {
  if (!author) throw new Error("Author param is missing")

  try {
    const response = await fetch(
      `${POSTS_URL}${author}?${tag ? "_tag=" + tag : ""}${page ? "&page=" + page : ""}${
        limit ? "&limit=" + limit : ""
      }${sort ? "&sortOrder=" + sort : ""}`,
      {
        method: "GET",
      }
    )

    const responseData = await response.json()

    if (response.ok) {
      const data = responseData
      return data
    } else {
      createErrorPage(responseData)
      return false
    }
  } catch (e) {
    console.error(e)
  }
}
