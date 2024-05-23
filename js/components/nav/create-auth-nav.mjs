import { getAuthField, logout } from "../../auth.mjs"

export default function createAuthedNav(navList) {
    navList.innerHTML = ""
    const blogItem = document.createElement("li")
    const blogRef = document.createElement("a")
    blogRef.textContent = "Blog"
    blogRef.href = "/"
  
    blogItem.appendChild(blogRef)
  
    const avatarItem = document.createElement("li")
    avatarItem.classList.add("dropdown")
    avatarItem.tabIndex = 0
    const avatarImg = document.createElement("img")
    avatarImg.src = getAuthField("avatar").url || "/assets/images/alt.png"
    avatarImg.alt = "AA"
  
    
    const dropdown = document.createElement("div")
    dropdown.classList.add("dropdown-content")
  
    const userMail = document.createElement("span")
    userMail.textContent = getAuthField("name") || "Logged in"
  
    const postLink = document.createElement("a")
    postLink.href = "/post/create.html"
    postLink.textContent = "New Post"
  
    const editLink = document.createElement("a")
    editLink.href = "/post/list.html"
    editLink.textContent = "All Posts"

    const newAcc = document.createElement("a")
    newAcc.href = "/account/register.html"
    newAcc.textContent = "New Account"
  
    const logoutBtn = document.createElement("button")
    logoutBtn.classList.add("logout")
    logoutBtn.textContent = "Sign out"
  
    dropdown.append(userMail, postLink, newAcc, editLink, logoutBtn)
    avatarItem.append(avatarImg, dropdown)
  
    navList.append(blogItem, avatarItem)
  
    logoutBtn.addEventListener("click", logout)
  
  }