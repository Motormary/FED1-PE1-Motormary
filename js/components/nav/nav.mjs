import { checkAuth } from "../../auth.mjs"
import createAuthedNav from "./create-auth-nav.mjs"
import { contentStyle, navStyle } from "./styles.mjs"

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
      <li><a href="/">Blog</a></li>
      <li><a class="login-link" href="/account/login.html">Login</a></li>
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

    if (isAuthed) createAuthedNav(navLinks)

  }

  updateCartLength() {
    // Called whenever a product is added to the cart.
  }

  diconnectedCallback() {
    window.removeEventListener("updateCart", this.updateCartLength.bind(this))
  }
}

customElements.define("nav-bar", CustomNav)
