import { getAuthField } from "../auth.mjs"
import { postOrPatchPost } from "../functions/post-or-patch.mjs"

const form = document.querySelector("form")
const auth = getAuthField("name")

form.addEventListener("submit", (e) => postOrPatchPost(e, "POST", auth))