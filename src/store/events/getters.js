import _ from 'lodash'

const getEventFormData = state => (data = state.newEvent) => {
  if (
    _.has(data.locationData, 'addressData.latitude') &&
    _.has(data.locationData, 'addressData.longitude')
  ) {
    data.lat = data.locationData.addressData.latitude
    data.long = data.locationData.addressData.longitude
  }

  let formattedData = {
    title: data.title,
    address: data.address,
    event_url: data.link,
    description: data.description,
    start_time: data.start_time,
    end_time: data.end_time,
    location: data.location,
    lat: data.lat,
    long: data.long,
  }
  if (data.locationData.placeResultData) {
    formattedData['places_id'] = data.locationData.placeResultData.place_id
  }
  if (data.id) {
    formattedData['id'] = data.id
  }

  return formattedData
}

export default {
  getEventFormData,
  startDate: state => _.has(state.formData, 'startDate') && state.formData.startDate
}
