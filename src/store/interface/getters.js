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

const listing = (state) => {
  const data = state.selectedListing || {}

  if (_.has(data, 'primary_media')) {
    data.carousel = []
    data.carousel.push(data.primary_media.thumbnail_url)

    if (_.has(data, 'media')) {
      data.media.forEach((value) => {
        data.carousel.push(value.thumbnail_url)
      })
    }
  } else {
    data.carousel = false
  }

  return data
}

const activeUI = state => ''
const username = state => state.user.display_name || 'Admin'
const schoolID = state => state.school.id
const schoolShortName = state => state.school.short_name
const avatar = state => _.has(state.user.user, 'avatar_url') && state.user.avatar_url
const organizationID = state => _.has(state.user.user, 'id') && state.user.user.id

const isFabActive = state => {
  const route = state.route.fullPath

  return route.indexOf('organization') !== -1 || route.indexOf('sponsors') !== -1
}

const isDialogActive = state => name => {
  return _.has(state.dialogs, `[${name}].active`) && state.dialogs[name].active
}

export default {
  listing,
  activeUI,
  username,
  avatar,
  schoolID,
  schoolShortName,
  schoolColor,
  organizationID,
  isDialogActive,
  isFabActive,
}
