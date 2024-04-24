import { contentStyle, navStyle } from "./styles.mjs"
const authList = `
<li><a href="/">Blog</a></li>
<li class="dropdown"><img src="" alt="">
  <div class="dropdown-content">
    <a href="/post/edit.html">Edit Post</a>
    <a href="/post/index.html">New Post</a>
  </div>
</li>
`

const template = document.createElement("template")
const templateStyle = document.createElement("style")
templateStyle.innerHTML = contentStyle
template.innerHTML = `
<nav class="nav-content">
    <div class="logo-container">
      <a title="Home" href="/">
        <slot></slot>
        <p>HvL</p>
      </a>
    </div>
    <ul>
      <li><a href="/">Blog</a></li>
      <li><a class="login-link" href="/login.html">Login</a></li>
    </ul>
  </nav>
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
    console.log("connected")

    navLinks.innerHTML = authList
    
  }

  updateCartLength() {
    // Called whenever a product is added to the cart.
  }

  diconnectedCallback() {
    window.removeEventListener("updateCart", this.updateCartLength.bind(this))
  }
}

customElements.define("nav-bar", CustomNav)
