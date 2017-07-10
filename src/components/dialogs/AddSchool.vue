<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">

        <v-card-title class="primary white--text">
          Add school
        </v-card-title>

        <v-card-text class="text-xs-left">
          <v-text-field
            label="Name"
            :hint="formState.name.hint"
            :error="formState.name.error"
            :persistent-hint="formState.name.error"
            v-model="formData.name"
          ></v-text-field>
          <v-text-field
            label="Short name"
            :hint="formState.shortName.hint"
            :error="formState.shortName.error"
            :persistent-hint="formState.shortName.error"
            v-model="formData.shortName"
          ></v-text-field>
          <v-text-field
            label="Asset name"
            :hint="formState.assetName.hint"
            :error="formState.assetName.error"
            :persistent-hint="formState.assetName.error"
            v-model="formData.assetName"
          ></v-text-field>
          <v-text-field
            label="Domain name"
            :hint="formState.domainName.hint"
            :error="formState.domainName.error"
            :persistent-hint="formState.domainName.error"
            v-model="formData.domainName"
          ></v-text-field>
          <v-text-field
            label="Registration allowed"
            type="checkbox"
            :hint="formState.registration.hint"
            :error="formState.registration.error"
            :persistent-hint="formState.registration.error"
            v-model="formData.registration"
          ></v-text-field>
          <v-text-field
            label="Sendy ID"
            :hint="formState.sendyID.hint"
            :error="formState.sendyID.error"
            :persistent-hint="formState.sendyID.error"
            v-model="formData.sendyID"
          ></v-text-field>
          <v-text-field
            label="Longitude"
            type="number"
            :hint="formState.long.hint"
            :error="formState.long.error"
            :persistent-hint="formState.long.error"
            v-model="formData.long"
          ></v-text-field>
          <v-text-field
            label="Latitude"
            type="number"
            :hint="formState.lat.hint"
            :error="formState.lat.error"
            :persistent-hint="formState.lat.error"
            v-model="formData.lat"
          ></v-text-field>
          <v-text-field
            label="Radius"
            type="number"
            :hint="formState.radius.hint"
            :error="formState.radius.error"
            :persistent-hint="formState.radius.error"
            v-model="formData.radius"
          ></v-text-field>
          <v-text-field
            label="Color"
            type="number"
            :hint="formState.color.hint"
            :error="formState.color.error"
            :persistent-hint="formState.color.error"
            v-model="formData.color"
          ></v-text-field>
          <v-text-field
            label="Color"
            type="number"
            :hint="formState.color.hint"
            :error="formState.color.error"
            :persistent-hint="formState.color.error"
            v-model="formData.color"
          ></v-text-field>
          <v-text-field
            label="Color"
            type="number"
            :hint="formState.radius.hint"
            :error="formState.radius.error"
            :persistent-hint="formState.radius.error"
            v-model="formData.color"
          ></v-text-field>
          <v-text-field
            label="Categories"
            type="text"
            :hint="formState.categories.hint"
            :error="formState.categories.error"
            :persistent-hint="formState.categories.error"
            v-model="formData.categories"
          ></v-text-field>
        </v-card-text>

      <v-card-actions>
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
      </v-card-actions>
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
  name: 'AddSchoolDialog',
  data () {
    return {
      snackbar: false,
      confirm: '',
      isLoading: false,
      fieldNames: [
        'name',
        'shortName',
        'assetName',
        'domainName',
        'registration',
        'sendyID',
        'long',
        'lat',
        'radius',
        'color',
        'categories',
      ]
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
      state.snackMessage = 'Add school'

      // console.log('state', state)

      return state
    },

    formData: {
      get () {
        return this.$store.state.newSchool
      },

      set (value) {
        this.$store.commit('SET_NEW_SCHOOL', this.formData)
        // console.log(this.$store.state.newSchool, value)
      }
    },

    isOpen: {
      get () {
        return this.$store.state.isAddSchoolDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_ADD_SCHOOL_DIALOG')
        }
      }
    }
  },
  methods: {
    reset () {
      this.$store.commit('SET_NEW_SCHOOL', {
        name: '',
        shortName: '',
        assetName: '',
        domainName: '',
        registration: false,
        sendyID: '',
        long: '',
        lat: '',
        radius: '',
        color: [],
        categories: [
          'everything-else'
        ],
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
