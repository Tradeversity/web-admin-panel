const getTime = (epoch) => {
  const exp = `/Date(${epoch})/`
  const date = new Date(parseFloat(exp.substr(6)))
  const minutes = date.getMinutes()
  const hours = date.getHours()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const mid = hours > 12 ? 'pm' : 'am'

  return `${day}/${month} ${hours}:${minutes}${mid}`
}

export default getTime
