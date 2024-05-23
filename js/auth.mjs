export function getAuth() {
  let auth = localStorage.hvlAuth || sessionStorage.hvlAuth

  if (auth) {
    auth = JSON.parse(auth)
    return auth
  } else return false
}

export function getAuthField(field) {
  const data = getAuth()

  const requestedField = data[field]
  
  return requestedField
}

export function logout() {
  localStorage.clear("hvlAuth")
  sessionStorage.clear("hvlAuth")
  window.location.href = "/"
}