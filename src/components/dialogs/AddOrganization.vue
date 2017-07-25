<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">Invite user</span>
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
          flat
          v-if="!isEdit"
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
import { has } from 'lodash'
import validateEmail from '@/services/validateEmail'

const isLength = (
  value,
  minLength = 0,
  maxLength = 0,
  ) => {
  const isBelow = maxLength === 0 ? true : value.length <= maxLength
  return value !== undefined && value.length >= minLength && isBelow
}

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
  created () {
    this.$store.commit('ADD_DIALOG', this.$options.name)
  },
  watch: {

  },
  computed: {
    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },

    formData: {
      get () {
        return this.$store.getters.organization
      },

      set (value) {
        this.$store.commit('SET_NEW_ORGANIZATION', this.formData)
      }
    },

    isEdit () {
      return has(this.formData, 'id') &&
        this.formData.id !== null &&
        this.formData.id.length > 4
    }
  },
  methods: {
    reset () {
      if (this.isEdit) {
        return false
      }

      this.$store.commit('SET_NEW_ORGANIZATION', {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })

      this.confirm = ''
    },

    submit () {
      if (this.isEdit) {
        this.$store.dispatch('PUT_ORGANIZATION')

        return
      }

      const isFirstNameVaild = isLength(this.formData.firstName, 1)
      const isLastNameVaild = isLength(this.formData.lastName, 1)
      const isEmailValid = validateEmail(this.formData.email)
      const isPasswordLong = isLength(this.formData.password, 7)
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
        this.$store.dispatch('POST_ORGANIZATION')
        this.$store.commit('SET_NEW_ORGANIZATION', {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        })

        this.confirm = ''

        this.$store.commit('CLOSE_DIALOG', this.$options.name)
        this.formState.snackMessage = 'Success!'
        this.formState.form = 'success'
      } else {
        this.formState.snackMessage = 'Error!'
        this.formState.form = 'error'
      }

      this.formState.snackbar = true
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
