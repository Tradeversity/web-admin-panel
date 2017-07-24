import _ from 'lodash'

const getEventFormData = state => (data = state.newEvent) => {
  if (
    _.has(data.locationData, 'addressData.latitude') &&
    _.has(data.locationData, 'addressData.longitude')
  ) {
    data.lat = data.locationData.addressData.latitude
    data.long = data.locationData.addressData.longitude
  }

  return {
    title: data.title,
    address: data.address,
    description: data.description,
    start_time: data.start_time,
    end_time: data.end_time,
    location: data.location,
    lat: data.lat,
    long: data.long,
    places_id: data.locationData.placeResultData.place_id,
  }
}

export default {
  getEventFormData,
  startDate: state => _.has(state.formData, 'startDate') && state.formData.startDate
}
