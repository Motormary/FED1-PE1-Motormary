export default function handleErrors(data) {
    data.errors.forEach((error) => {
      const errorMessage = error.message
      const errorPath = error.path[0]
      
      const fieldWithError = document.querySelector(`label[for=${errorPath}]`)
      const errorField = document.querySelector(`span.${errorPath}-error`)
      
      fieldWithError.classList.add("error")
      errorField.textContent = errorMessage
      
    })
  }