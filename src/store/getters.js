/*
 * Getters.js
 * + Takes the active state and returns relevant data
 *
*/

import _ from 'lodash'

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

const activeUI = state => ''
const username = state => state.user.display_name || 'Admin'
const schoolID = state => state.school.id
const avatar = state => _.has(state.user, 'avatar_url') && state.user.avatar_url
const organizationID = state => _.has(state.user, 'id') && state.user.id

export default {
  activeUI,
  username,
  avatar,
  schoolID,
  schoolColor,
  organizationID
}
