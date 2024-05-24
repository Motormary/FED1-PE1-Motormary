import { getAuth } from "../auth.mjs"
import { postOrPatchPost } from "../functions/post-or-patch.mjs"

const form = document.querySelector("form")
const auth = getAuth()

if (!auth) window.location.replace("/account/login.html")

form.addEventListener("submit", (e) => postOrPatchPost(e, "POST", auth.name))