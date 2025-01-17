const mainEl = document.querySelector("main")

// Replace main html with error and message from backend if recieved, else show a 404
export function createErrorPage(errorCode = 404, message = "Page could not be found") {
    mainEl.innerHTML = `
    <div style="margin: auto; text-align: center; padding: 20%;">
        <h1 style="font-size: 4rem; color: red;">${errorCode}</h1>
        <h4 style="font-weight: bold;">${message} 🧙‍♂️</h4>
    </div>
    `
}