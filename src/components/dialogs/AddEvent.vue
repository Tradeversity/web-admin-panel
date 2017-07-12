/*
 *  Event.vue
 *  + Add, Edit, Delete events
 *
 *
*/

<template>
  <v-dialog v-model="isOpen" width="500">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>

        <v-card-text class="text-xs-left">
          <v-text-field
            label="Title"
            max="80"
            counter
            :hint="formState.title.hint"
            :error="formState.title.error"
            :persistent-hint="formState.title.error"
            v-model="formData.title"
          ></v-text-field>

          <v-text-field
            label="Description"
            max="150"
            counter
            multi-line
            :hint="formState.description.hint"
            :error="formState.description.error"
            :persistent-hint="formState.description.error"
            v-model="formData.description"
          ></v-text-field>

          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="datePicker1"
                transition="scale-transition"
                offset-y
                :nudge-left="40"
              >
                <v-text-field
                  slot="activator"
                  prepend-icon="date_range"
                  label="Start date"
                  readonly
                  :hint="formState.startDate.hint"
                  :error="formState.startDate.error"
                  :persistent-hint="formState.startDate.error"
                  v-model="formData.startDate"
                ></v-text-field>
                <v-date-picker
                  v-model="formData.startDate"
                  autosave
                ></v-date-picker>
              </v-menu>

            </v-flex>
            <v-flex xs12 sm6>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="timePicker1"
                transition="scale-transition"
                offset-y
                :nudge-left="40"
              >
                <v-text-field
                  slot="activator"
                  prepend-icon="access_time"
                  label="Start time"
                  readonly
                  :hint="formState.startTime.hint"
                  :error="formState.startTime.error"
                  :persistent-hint="formState.startTime.error"
                  v-model="formData.startTime"
                ></v-text-field>
                <v-time-picker
                  v-model="formData.startTime"
                  autosave
                ></v-time-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm12>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="timePicker2"
                transition="scale-transition"
                offset-y
                :nudge-left="40"
              >
                <v-text-field
                  slot="activator"
                  prepend-icon="access_time"
                  label="End time"
                  readonly
                  :hint="formState.endTime.hint"
                  :error="formState.endTime.error"
                  :persistent-hint="formState.endTime.error"
                  v-model="formData.endTime"
                ></v-text-field>
                <v-time-picker
                  v-model="formData.endTime"
                  autosave
                ></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm12>


              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="datePicker2"
                transition="scale-transition"
                offset-y
                :nudge-left="40"
              >
                <v-text-field
                  slot="activator"
                  prepend-icon="date_range"
                  label="End date"
                  readonly
                  :hint="formState.endDate.hint"
                  :error="formState.endDate.error"
                  :persistent-hint="formState.endDate.error"
                  v-model="formData.endDate"
                ></v-text-field>
                <v-date-picker
                  v-model="formData.endDate"
                  autosave
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <location-search
            id="LocationSearch"
            prependIcon="my_location"
            prependIconCB
            placeholder="Search location..."
          ></location-search>

          <!-- <div class="input-group input-group--text-field">
            <div class="input-group__input">
              <vue-google-autocomplete
                id="map"
                name="LocationSearch"
                class="search"
                placeholder="Location"
                :placechanged="getAddressData"
              ></vue-google-autocomplete>
            </div>
          </div> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            @click.native="reset"
          >Reset</v-btn>
          <v-btn
            type="submit"
            flat
            primary
            :loading="isLoading"
          >Submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete'
import LocationSearch from '@/components/molecules/LocationSearch'
// import validateEmail from '@/services/validateEmail'

export default {
  name: 'AddEventDialog',
  components: {
    // VueGoogleAutocomplete
    LocationSearch,
  },
  data () {
    return {
      timePicker1: false,
      timePicker2: false,
      datePicker1: false,
      datePicker2: false,
      confirm: '',
      isLoading: false,
      fieldNames: [
        'title',
        'description',
        'startDate',
        'endDate',
        'startTime',
        'endTime',
        'location',
        'lat',
        'long',
      ],
    }
  },
  computed: {
    schoolColor () {
      return this.$store.getters.schoolColor
    },

    formState () {
      let state = {}

      this.fieldNames.map(name => {
        state[name] = {
          hint: '',
          error: false,
        }
      })

      state.form = 'info'
      state.snackMessage = 'Add event'

      // console.log('state', state)

      return state
    },

    title () {
      return 'Create event'
    },

    formData: {
      get () {
        return this.$store.state.newEvent
      },

      set (value) {
        console.log(value)
        this.$store.commit('SET_NEW_EVENT', this.formData)
        console.log(this.$store.state.newEvent, value)
      }
    },

    isOpen: {
      get () {
        return this.$store.state.isAddEventDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_ADD_EVENT_DIALOG')
        }
      }
    }
  },
  methods: {
    getAddressData (value) {
      console.log(value)
    },

    openSetLocation () {
      this.$store.commit('OPEN_SET_LOCATION_DIALOG')
    },

    reset () {
      this.$store.commit('SET_NEW_EVENT', {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        lat: '',
        long: '',
      })

      this.confirm = ''
    },

    submit () {
      // const isFirstNameVaild = this.formData.firstName.length > 1
      // const isLastNameVaild = this.formData.lastName.length > 1
      // const isEmailValid = validateEmail(this.formData.email)
      // const isPasswordLong = this.formData.password.length > 7
      // const isPasswordSame = this.formData.password === this.confirm
      // const isPasswordValid = isPasswordLong && isPasswordSame

      // if (!isFirstNameVaild) {
      //   this.formState.firstName.hint = 'Please enter a valid name'
      //   this.formState.firstName.error = true
      // }

      // if (!isLastNameVaild) {
      //   this.formState.lastName.hint = 'Please enter a valid name'
      //   this.formState.lastName.error = true
      // }

      // if (!isEmailValid) {
      //   this.formState.email.hint = 'Please enter a valid email'
      //   this.formState.email.error = true
      // }

      // if (!isPasswordLong) {
      //   this.formState.password.hint = 'Passwords should be at least 8 characters'
      //   this.formState.password.error = true
      //   this.formState.passwordConfirm.error = true
      // }

      // if (!isPasswordSame) {
      //   this.formState.passwordConfirm.hint = "Your passwords don't match"
      //   this.formState.passwordConfirm.error = true
      // }

      // if (
      //     isFirstNameVaild &&
      //     isLastNameVaild &&
      //     isEmailValid &&
      //     isPasswordValid
      //   ) {
      //   const data = this.formData
      //   data.schoolId = this.school.id

      //   this.$store.dispatch('POST_ADMIN', data)
      //     .then(response => {
      //       if (response.error) {
      //         return response.error
      //       }

      //       this.$store.commit('CLOSE_ADD_ADMIN_DIALOG')
      //       this.formState.snackMessage = 'Success!'
      //       this.formState.form = 'success'
      //     })
      //     .catch(error => {
      //       this.formState.snackMessage = 'Error!'
      //       console.log(error)
      //     })
      // } else {
      //   this.formState.snackMessage = 'Error!'
      //   this.formState.form = 'error'

      //   // setTimeout(() => {
      //   //   this.formState.firstName.error = false
      //   //   this.formState.lastName.error = false
      //   //   this.formState.email.error = false
      //   //   this.formState.password.error = false
      //   //   this.formState.passwordConfirm.error = false
      //   // }, 2000)
      // }

      // this.formState.snackbar = true
    }
  },
}
</script>

<style lang="stylus" scoped>
.search
  border-bottom: 1px solid grey
</style>
