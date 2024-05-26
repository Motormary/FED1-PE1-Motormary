// Formats data for registration form
export default function formatRegData(data) {
    const formObject = Object.fromEntries(data.entries())
  
    if (data.get("avatar.url")) {
      formObject.avatar = {
        url: data.get("avatar.url"),
        alt: data.get("avatar.alt") || "avatar",
      }
    }
    if (data.get("banner.url")) {
      formObject.banner = {
        url: data.get("banner.url"),
        alt: data.get("banner.alt") || "banner",
      }
    }
  
    formObject.venueManager = data.has("venueManager")
  
    return formObject
  }