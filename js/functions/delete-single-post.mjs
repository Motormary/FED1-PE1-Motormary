import { getAuthField } from "../auth.mjs"
import { POSTS_URL } from "../urls.mjs"

export default async function deletePost(author, postId) {
  if (!author || !postId) throw new Error("Params missing")

  const auth = getAuthField("accessToken")

  if (!auth) throw new Error("Auth is missing")

  try {
    const response = await fetch(`${POSTS_URL}${author}/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    })

    if (response.ok) {
      return true
    } else return false
  } catch (e) {
    console.error(e)
  }
}
