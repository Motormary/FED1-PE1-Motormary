export function checkAuth() {
  let auth = localStorage.auth || sessionStorage.auth

  if (auth) {
    auth = JSON.parse(auth)
    return auth
  } else return false
}