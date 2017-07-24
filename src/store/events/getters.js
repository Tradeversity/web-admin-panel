import _ from 'lodash'
import moment from 'moment'

const isDev = false

const convertPM = (time) => {
  const removedPost = time.replace('pm', '')
  const colonIndex = time.indexOf(':')
  let hh = removedPost.slice(0, colonIndex)

  hh = parseInt(hh) + 12

  return `${hh}${removedPost.slice(colonIndex)}`
}

const convertPeriod = (time) => {
  if (
    time.indexOf('am') !== -1 ||
    time.indexOf('pm') !== -1
  ) {
    return time.indexOf('am') !== -1
      ? time.replace('am', '')
      : convertPM(time)
  }

  return time
}

const formatDateTime = (date, time) => {
  return `${date.replace(/-/ig, '/')} ${convertPeriod(time)}:00`
}

const eventFormData = (state) => {
  let data = state.newEvent || {}

  if (_.isEmpty(data)) {
    return false
  }

  if (
    _.has(data.locationData, 'addressData.latitude') &&
    _.has(data.locationData, 'addressData.longitude')
  ) {
    data.lat = data.locationData.addressData.latitude
    data.long = data.locationData.addressData.longitude
  }

  if (
    _.has(data, 'startTime') &&
    _.has(data, 'startDate') &&
    _.has(data, 'endTime') &&
    _.has(data, 'endDate') &&
    isDev
  ) {
    const offset = new Date().getTimezoneOffset()

    const start = formatDateTime(data.startDate, data.startTime)
    const end = formatDateTime(data.endDate, data.endTime)
    const format = 'MN/DD/YYYY HH:mm:ss A'

    data.startTime = moment(start + offset, format).zone(offset).unix()
    data.endTime = moment(end + offset, format).zone(offset).unix()
  } else {
    const currentEpoch = Math.round(Date.now() / 1000)
    data.startTime = currentEpoch
    data.endTime = currentEpoch + 8.64e+7 // One day
  }

  if (!_.has(data, 'locationData.placeResultData.place_id')) {
    return false
  }

  return {
    title: data.title,
    address: data.address,
    description: data.description,
    start_time: data.startTime,
    end_time: data.endTime,
    location: data.location,
    lat: data.lat,
    long: data.long,
    places_id: data.locationData.placeResultData.place_id,
  }
}

export default {
  eventFormData,
  startDate: state => _.has(state.formData, 'startDate') && state.formData.startDate
}
