export default function createUnAuthorizedeNavLinks() {
  const homeItem = document.createElement("li")
  const homeLink = document.createElement("a")
  homeLink.classList.add("nav-link")
  homeLink.href = "/"
  homeLink.textContent = "Home"

  homeItem.appendChild(homeLink)

  //-----------------------------------------------------------------------

  const cartItem = document.createElement("li")
  const cartLink = document.createElement("a")
  cartLink.classList.add("nav-link", "cart")
  cartLink.href = "/cart.html"
  cartLink.textContent = "Cart"

  cartItem.appendChild(cartLink)

  //-----------------------------------------------------------------------

  return { homeItem, homeLink, cartItem, cartLink };
}
