// Check if passwords match when registering for account - else create error message
export default function validatePassword(formData) {
    const password1 = formData.get("password")
    const password2 = formData.get("confirm")
    if (password1 !== password2) {
      const pwLabel = document.querySelector("#reg_pw_label")
      const pwError = document.querySelector("#reg_pw_error")
  
      pwLabel.classList.add("error")
      pwError.textContent = "Password does not match"
      return false
    } else return true
  }