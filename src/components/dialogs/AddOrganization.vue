<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">
      <v-card-row class="primary">
        <v-card-title class="white--text">
          Invite user
        </v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text class="text-xs-left">
          <v-text-field
            label="First name"
            :hint="formState.firstName.hint"
            :error="formState.firstName.error"
            :persistent-hint="formState.firstName.error"
            v-model="formData.firstName"
          ></v-text-field>
          <v-text-field
            label="Last name"
            :hint="formState.lastName.hint"
            :error="formState.lastName.error"
            :persistent-hint="formState.lastName.error"
            v-model="formData.lastName"
          ></v-text-field>
          <v-text-field
            label="Email"
            type="email"
            :hint="formState.email.hint"
            :error="formState.email.error"
            :persistent-hint="formState.email.error"
            v-model="formData.email"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            :hint="formState.password.hint"
            :error="formState.password.error"
            :persistent-hint="formState.password.error"
            v-model="formData.password"
          ></v-text-field>
          <v-text-field
            label="Confirm password"
            type="password"
            :hint="formState.passwordConfirm.hint"
            :error="formState.passwordConfirm.error"
            :persistent-hint="formState.passwordConfirm.error"
            v-model="confirm"
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
import validateEmail from '@/services/validateEmail'

export default {
  name: 'AddOrganizationDialog',
  data () {
    return {
      snackbar: false,
      confirm: '',
      isLoading: false,
      formState: {
        form: 'info',
        snackMessage: 'Invite user to organization',
        firstName: {
          hint: '',
          error: false,
        },
        lastName: {
          hint: '',
          error: false,
        },
        email: {
          hint: 'Invite will be sent to this address',
          error: false,
        },
        password: {
          hint: 'Please enter at least 8 characters',
          error: false,
        },
        passwordConfirm: {
          hint: '',
          error: false,
        }
      },
    }
  },
  computed: {
    formData: {
      get () {
        return this.$store.state.newOrganization
      },

      set (value) {
        this.$store.commit('SET_NEW_ORGANIZATION', this.formData)
        console.log(this.$store.state.newOrganization, value)
      }
    },

    isOpen: {
      get () {
        return this.$store.state.isAddOrganizationDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_ADD_ORGANIZATION_DIALOG')
        }
      }
    }
  },
  methods: {
    reset () {
      this.$store.commit('SET_NEW_ORGANIZATION', {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })

      this.confirm = ''
    },

    submit () {
      const isFirstNameVaild = this.formData.firstName.length > 1
      const isLastNameVaild = this.formData.lastName.length > 1
      const isEmailValid = validateEmail(this.formData.email)
      const isPasswordLong = this.formData.password.length > 7
      const isPasswordSame = this.formData.password === this.confirm
      const isPasswordValid = isPasswordLong && isPasswordSame

      if (!isFirstNameVaild) {
        this.formState.firstName.hint = 'Please enter a valid name'
        this.formState.firstName.error = true
      }

      if (!isLastNameVaild) {
        this.formState.lastName.hint = 'Please enter a valid name'
        this.formState.lastName.error = true
      }

      if (!isEmailValid) {
        this.formState.email.hint = 'Please enter a valid email'
        this.formState.email.error = true
      }

      if (!isPasswordLong) {
        this.formState.password.hint = 'Passwords should be at least 8 characters'
        this.formState.password.error = true
        this.formState.passwordConfirm.error = true
      }

      if (!isPasswordSame) {
        this.formState.passwordConfirm.hint = "Your passwords don't match"
        this.formState.passwordConfirm.error = true
      }

      if (
          isFirstNameVaild &&
          isLastNameVaild &&
          isEmailValid &&
          isPasswordValid
        ) {
        this.$store.dispatch('POST_ORGANIZATION', this.formData)
        this.$store.commit('SET_NEW_ORGANIZATION', {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        })

        this.$store.commit('CLOSE_ADD_ORGANIZATION_DIALOG')
        this.formState.snackMessage = 'Success!'
        this.formState.form = 'success'
      } else {
        this.formState.snackMessage = 'Error!'
        this.formState.form = 'error'

        // setTimeout(() => {
        //   this.formState.firstName.error = false
        //   this.formState.lastName.error = false
        //   this.formState.email.error = false
        //   this.formState.password.error = false
        //   this.formState.passwordConfirm.error = false
        // }, 2000)
      }

      this.formState.snackbar = true
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
