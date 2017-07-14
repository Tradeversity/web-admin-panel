import _ from 'lodash'

const isDev = false

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
    console.log('start')
    // Probably should be set inline, not by location
    const offset = new Date().getTimezoneOffset()
    // const startTime = new Date()
    // const start = `${data.startDate}${offset}:${data.startTime}`
    // const end = `${data.endDate}${offset}:${data.endTime}`
    const start = `${data.startDate} ${data.startTime}`
    const end = `${data.endDate} ${data.endTime}`

    data.startTime = Date.parse(start)
    data.endTime = Date.parse(end)

    console.log('offset', offset)
    console.log('start', start)
    console.log('end', end)
    console.log('data start', data.startTime)
    console.log('data end', data.endTime)
  } else {
    const currentEpoch = Date.now()
    data.startTime = currentEpoch
    data.endTime = currentEpoch + 15000
  }

  return {
    title: data.title,
    description: data.description,
    start_time: data.startTime,
    end_time: data.endTime,
    location: data.locationData.addressData.locality,
    lat: data.lat,
    long: data.long,
    places_id: data.locationData.placeResultData.place_id,
  }
}

export default {
  eventFormData,
}
