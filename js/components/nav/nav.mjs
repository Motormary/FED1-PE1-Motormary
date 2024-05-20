import { checkAuth } from "../../auth.mjs"
import { contentStyle, navStyle } from "./styles.mjs"

const authedNav = `
<li><a href="/">Blog</a></li>
<li class="dropdown" tabIndex="0"><img src="../assets/images/alt.png" alt="">
  <div class="dropdown-content">
    <span>administrator@hvl.com</span>
    <a href="/post/index.html">New Post</a>
    <a href="/post/edit.html">Edit Post</a>
    <button class="logout" onclick="logout()">Log out</button>
  </div>
</li>
`

const nonAuth = `
<li><a href="/">Blog</a></li>
<li><a class="login-link" href="/account/login.html">Login</a></li>
`

const template = document.createElement("template")
const templateStyle = document.createElement("style")
templateStyle.innerHTML = contentStyle
template.innerHTML = `
<div class="nav-content">
    <div class="logo-container">
      <a title="Home" href="/">
        <img class="nav-logo" src="../assets/images/logo.png" alt="Logo">
        <p>HvL</p>
      </a>
    </div>
    <nav>    
      <ul>

      </ul>
    </nav>
  </div>
`
class CustomNav extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: "open" })

    this.style = navStyle

    this.shadowRoot.append(templateStyle, template.content.cloneNode(true))


    this.updateCartLength()

    window.addEventListener("updateCart", this.updateCartLength.bind(this))
  }

  connectedCallback() {
    const navLinks = this.shadowRoot.querySelector("ul")

    const isAuthed = checkAuth()

    if (isAuthed) navLinks.innerHTML = authedNav
    else navLinks.innerHTML = nonAuth
    
  }

  updateCartLength() {
    // Called whenever a product is added to the cart.
  }

  diconnectedCallback() {
    window.removeEventListener("updateCart", this.updateCartLength.bind(this))
  }
}

customElements.define("nav-bar", CustomNav)
