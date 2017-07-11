const schoolID = state => {
  return state.school.id
}

const schoolColor = state => {
  const school = state.school
  let formattedColor = false

  if (!school.hasOwnProperty('color')) {
    return '#D6262E'
  }

  if ((
    school.color[0] === 255 &&
    school.color[1] === 255 &&
    school.color[2] === 255
  ) || (
    school.color[0] === 0 &&
    school.color[1] === 0 &&
    school.color[2] === 0
  )) {
    formattedColor = '#D6262E'
  } else {
    formattedColor = `rgb(${school.color[0]}, ${school.color[1]}, ${school.color[2]})`
  }

  return formattedColor
}

const username = state => {
  return state.user.display_name || 'Admin'
}

const avatar = state => {
  return state.user.avatar_url || false
}

const activeUI = (state) => {
  // const route = state.route
  // console.log(state)
  return ''
}

export default {
  activeUI,
  username,
  avatar,
  schoolID,
  schoolColor,
}
