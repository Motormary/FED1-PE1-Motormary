// Formats given date to readable format
export default function formateDateTime(dateTime) {
  const date = new Date(dateTime)

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)

  return formattedDate

}
