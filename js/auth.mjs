// Get saved auth from local/session storage
export function getAuth() {
  let auth = localStorage.hvlAuth || sessionStorage.hvlAuth

  if (auth) {
    auth = JSON.parse(auth)
    return auth
  } else return false
}

// Get a specific value from the auth, e.g "accessToken"
export function getAuthField(field) {
  const data = getAuth()

  const requestedField = data[field]
  
  return requestedField
}

// Sign the user out by clearing auth from local/session storage
export function logout() {
  localStorage.clear("hvlAuth")
  sessionStorage.clear("hvlAuth")
  window.location.href = "/"
}