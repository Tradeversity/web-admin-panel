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

const primaryTextColor = state => {
  if (!_.has(state, 'school.color')) {
    return '#0f0f0f'
  }

  const color = state.school.color
  const red = color[0]
  const green = color[1]
  const blue = color[2]

  const contrastColor = (
    (red * 0.299) +
    (green * 0.587) +
    (blue * 0.114)
  ) > 187
  ? '#0f0f0f'
  : '#f6f6f6'

  return contrastColor
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
const schoolShortName = state => _.has(state, 'school.short_name')
  ? state.school.short_name.split(' ').join('').toLowerCase()
  : 'tradeversity'

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
  primaryTextColor,
  organizationID,
  isDialogActive,
  isFabActive,
}
