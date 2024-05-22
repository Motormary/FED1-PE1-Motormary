export function checkAuth() {
  let auth = localStorage.auth || sessionStorage.auth

  if (auth) {
    return auth
  } else return false
}

export function logout() {
  localStorage.clear("auth")
  sessionStorage.clear("auth")
  window.location.href = "/"
}