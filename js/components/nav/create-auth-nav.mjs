import { getAuthField, logout } from "../../auth.mjs"

// Creates the HTML for the navbar if the user is logged in
export default function createAuthedNav(navList) {
  navList.innerHTML = ""

  // Blog link
  const blogItem = document.createElement("li")
  const blogRef = document.createElement("a")
  blogRef.textContent = "Blog"
  blogRef.href = "/"
  blogItem.appendChild(blogRef)

  // Avatar
  const avatarItem = document.createElement("li")
  avatarItem.classList.add("dropdown")
  avatarItem.tabIndex = 0
  const avatarImg = document.createElement("img")
  avatarImg.src = getAuthField("avatar").url || "/assets/images/alt.png"
  avatarImg.alt = "AA"

  // Container for dropdown menu
  const dropdown = document.createElement("div")
  dropdown.classList.add("dropdown-content")

  // Shows the name of current user logged in
  const userMail = document.createElement("span")
  userMail.textContent = getAuthField("name") || "Logged in"

  // Create new post link
  const postLink = document.createElement("a")
  postLink.href = "/post/create.html"
  postLink.textContent = "New Post"

  // Edit posts link
  const editLink = document.createElement("a")
  editLink.href = "/post/list.html"
  editLink.textContent = "All Posts"

  // Register link
  const newAcc = document.createElement("a")
  newAcc.href = "/account/register.html"
  newAcc.textContent = "New Account"

  // Sign out button
  const logoutBtn = document.createElement("button")
  logoutBtn.classList.add("logout")
  logoutBtn.textContent = "Sign out"
  logoutBtn.addEventListener("click", logout)
  // ----------------

  dropdown.append(userMail, postLink, newAcc, editLink, logoutBtn)
  avatarItem.append(avatarImg, dropdown)

  navList.append(blogItem, avatarItem)
}
