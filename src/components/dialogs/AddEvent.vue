<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">
      <v-card-row class="primary">
        <v-card-title class="white--text">
          Add admin
        </v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text class="text-xs-left">
          <v-text-field
            label="Title"
            :hint="formState.title.hint"
            :error="formState.title.error"
            :persistent-hint="formState.title.error"
            v-model="formData.title"
          ></v-text-field>
          <v-text-field
            label="Description"
            :hint="formState.description.hint"
            :error="formState.description.error"
            :persistent-hint="formState.description.error"
            v-model="formData.description"
          ></v-text-field>
          <v-text-field
            label="Start time"
            :hint="formState.startTime.hint"
            :error="formState.startTime.error"
            :persistent-hint="formState.startTime.error"
            v-model="formData.startTime"
          ></v-text-field>
          <v-text-field
            label="End time"
            :hint="formState.endTime.hint"
            :error="formState.endTime.error"
            :persistent-hint="formState.endTime.error"
            v-model="formData.endTime"
          ></v-text-field>
          <v-text-field
            label="Location"
            :hint="formState.location.hint"
            :error="formState.location.error"
            :persistent-hint="formState.location.error"
            v-model="formData.location"
          ></v-text-field>
          <v-text-field
            label="Longitude"
            :hint="formState.long.hint"
            :error="formState.long.error"
            :persistent-hint="formState.long.error"
            v-model="formData.long"
          ></v-text-field>
          <v-text-field
            label="Latitude"
            :hint="formState.lat.hint"
            :error="formState.lat.error"
            :persistent-hint="formState.lat.error"
            v-model="formData.lat"
          ></v-text-field>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn
          class="accent--text"
          flat
          @click.native="reset"
        >Reset</v-btn>
        <v-btn
          class="secondary--text darken-1"
          type="submit"
          flat
          :loading="isLoading"
        >Submit</v-btn>
      </v-card-row>
      </form>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :success="formState.form === 'success'"
      :error="formState.form === 'error'"
    >
      {{ formState.form.snackMessage }}
      <v-btn flat light @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
// import validateEmail from '@/services/validateEmail'

export default {
  name: 'AddEventDialog',
  data () {
    return {
      snackbar: false,
      confirm: '',
      isLoading: false,
      fieldNames: [
        'title',
        'description',
        'startTime',
        'endTime',
        'location',
        'lat',
        'long',
      ],
      // formState: {
      //   form: 'info',
      //   snackMessage: 'Invite user to be a school admin',
      //   firstName: {
      //     hint: '',
      //     error: false,
      //   },
      //   lastName: {
      //     hint: '',
      //     error: false,
      //   },
      //   email: {
      //     hint: 'Invite will be sent to this address',
      //     error: false,
      //   },
      //   password: {
      //     hint: 'Please enter at least 8 characters',
      //     error: false,
      //   },
      //   location: {
      //     hint: '',
      //     error: false,
      //   }
      // },
    }
  },
  computed: {
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

    formData: {
      get () {
        return this.$store.state.newEvent
      },

      set (value) {
        this.$store.commit('SET_NEW_EVENT', this.formData)
        // console.log(this.$store.state.newEvent, value)
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

</style>
