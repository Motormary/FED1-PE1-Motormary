import { getAuth } from "../../auth.mjs"
import createAuthedNav from "./create-auth-nav.mjs"
import { contentStyle, navStyle } from "./styles.mjs"

const template = document.createElement("template")
const templateStyle = document.createElement("style")
templateStyle.innerHTML = contentStyle
// Html for navbar
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

// Create web component for navbar
class CustomNav extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: "open" })

    this.style = navStyle

    this.shadowRoot.append(templateStyle, template.content.cloneNode(true))
  }

  // Check if the user has auth when component loads
  connectedCallback() {
    const navLinks = this.shadowRoot.querySelector("ul")

    const isAuthed = getAuth()

    if (isAuthed) createAuthedNav(navLinks) // Update navbar html if user is authed
  }
}

customElements.define("nav-bar", CustomNav)
