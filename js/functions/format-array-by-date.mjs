export default function formatPostsByAge(posts) {
  if (!posts) return
  const formatedData =  posts.slice().sort((a, b) => {
    if (a.created < b.created) return -1
    if (a.created > b.created) return 1
    return 0
  })

  return formatedData
}