import { has, isNil } from 'lodash'

const adminFormData = state => {
  const {
    first_name,
    last_name,
  } = state.newAdmin

  return {
    firstName: first_name,
    lastName: last_name,
  }
}

const schoolFormData = state => {
  const data = state.newSchool
  data.availableCategories = state.availableCategories

  return data
}

export default {
  adminFormData,
  schoolFormData,
  getAdminFormType: state => has(state.newAdmin, 'id') && !isNil(state.newAdmin.id),
}
