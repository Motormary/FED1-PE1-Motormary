// Maps over errors from backend and updates the input-label class and error element which displays the given error message
export default function handleErrors(data) {
    data.errors.forEach((error) => {
      const errorMessage = error.message
      const errorPath = error?.path[0]

      if (!errorPath) return
      
      const fieldWithError = document.querySelector(`label[for=${errorPath}]`)
      const errorField = document.querySelector(`span.${errorPath}-error`)
      
      fieldWithError.classList.add("error")
      errorField.textContent = errorMessage
      
    })
  }