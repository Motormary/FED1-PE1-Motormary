export function showToast(message, href = "/", duration = 5000) {
  const toast = document.getElementById("toast");
  toast.href = href
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}
