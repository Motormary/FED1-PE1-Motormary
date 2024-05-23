export function showToast(message, href, duration = 5000) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  if (href) {
    const btn = document.createElement("a")
    btn.style = "padding: 0.5rem; border: solid 1px #67676730; border-radius: 6px; margin-left: 1rem;"
    btn.innerText = "Go to"
    btn.href = href
    toast.appendChild(btn)
  }
  
  setTimeout(() => {
    toast.classList.remove("show");
    toast.innerHTML = ""
  }, duration);
}
