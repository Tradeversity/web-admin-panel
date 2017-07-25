<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">
             Add admin
          </span>
        </v-card-title>

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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="secondary--text"
            flat
            @click.native="reset"
          >Reset</v-btn>
          <v-btn
            class="primary--text darken-1"
            type="submit"
            flat
            :loading="isLoading"
          >Submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import validateEmail from '@/services/validateEmail'

export default {
  name: 'AddAdminDialog',
  data () {
    return {
      confirm: '',
      isLoading: false,
      formState: {
        form: 'info',
        snackMessage: 'Invite user to be a school admin',
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
    school () {
      return this.$store.state.school
    },

    formData: {
      get () {
        if (
            this.$store.state.newAdmin.hasOwnProperty('id') &&
            this.$store.state.newAdmin.id.length > 1
          ) {
          return {
            firstName: this.$store.state.newAdmin.first_name,
            lastName: this.$store.state.newAdmin.last_name,
          }
        }

        return this.$store.state.newAdmin
      },

      set (value) {
        this.$store.commit('SET_NEW_ADMIN', this.formData)
        // console.log(this.$store.state.newAdmin, value)
      }
    },

    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },
  },
  methods: {
    reset () {
      this.$store.commit('SET_NEW_ADMIN', {
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
        const data = this.formData
        data.schoolId = this.school.id
        console.log(this.school, this.$store.state.newAdmin)
        data.isEdit = (
          this.$store.state.newAdmin.hasOwnProperty('id') && this.$store.state.newAdmin.id.length > 1
        )

        this.$store.dispatch('POST_ADMIN', data)
          .then(response => {
            if (response.error) {
              return response.error
            }

            this.$store.commit('CLOSE_ADD_ADMIN_DIALOG')
            this.formState.snackMessage = 'Success!'
            this.formState.form = 'success'
          })
          .catch(error => {
            this.formState.snackMessage = 'Error!'
            console.log(error)
          })
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
