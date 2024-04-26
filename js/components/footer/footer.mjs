const footerTemplate = document.createElement("template")
footerTemplate.innerHTML = `
<footer>
    <p>Copyright © HotView Labs 2024 -</p>
</footer>
`

class customFooter extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: "open" })

    this.style = `
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #6767;
    text-align: center;
    color: #676767;
    font-size: 0.75rem;
    `

    this.shadowRoot.append(footerTemplate.content.cloneNode(true))
  }
}

customElements.define("hvl-footer", customFooter)
