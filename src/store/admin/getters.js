import { has, isNil, isUndefined } from 'lodash'

const adminFormData = state => {
  const data = {
    firstName: state.newAdmin.first_name,
    lastName: state.newAdmin.last_name,
  }

  if (has(state, 'newAdmin.id')) {
    data.id = state.newAdmin.id
  }

  return data
}

const schoolFormData = state => {
  const data = state.newSchool
  data.availableCategories = state.availableCategories

  if (isUndefined(data.registration) || isNil(data.registration)) {
    data.registration = true
  }

  return data
}

export default {
  adminFormData,
  schoolFormData,
  getAdminFormType: state => has(state.newAdmin, 'id') && !isNil(state.newAdmin.id),
}
