<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">
            {{ title }}
          </span>

          <v-spacer></v-spacer>

          <v-btn
            flat
            icon
            @click.native.stop="close"
          >
            <v-icon>close</v-icon>
          </v-btn>
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
            hint="Please enter at least 8 characters"
            :error="!$v.formData.password.minLength"
            :persistent-hint="$v.formData.password.minLength"
            v-model="formData.password"
          ></v-text-field>

          <v-text-field
            label="Confirm password"
            type="password"
            :hint="formState.passwordConfirm.hint"
            :error="!$v.formData.passwordConfirm.sameAsPassword"
            :persistent-hint="!$v.formData.passwordConfirm.sameAsPassword"
            v-model="confirm"
          ></v-text-field>
        </v-card-text>

        <v-card-actions v-if="isEdit">
          <v-btn
            icon
            flat
            v-tooltip:right="{ html: 'Delete admin user' }"
            @click.native="deleteAdmin"
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="primary--text darken-1"
            type="submit"
            flat
            :loading="isLoading"
          >Update</v-btn>
        </v-card-actions>

        <v-card-actions v-else>
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
import { has } from 'lodash'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validateEmail from '@/services/validateEmail'

export default {
  name: 'AddAdminDialog',
  data: () => ({
    passwordMinLength: 8,
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
  }),
  validations () {
    return {
      formData: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(this.passwordMinLength),
          // minLengthHint: 'Please enter at least 8 characters',
        },
        passwordConfirm: {
          required,
          minLength: minLength(this.passwordMinLength),
          sameAsPassword: sameAs('password'),
        },
      }
    }
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
        return this.$store.getters.adminFormData
      },

      set (value) {
        this.$store.commit('SET_NEW_ADMIN', this.formData)
      }
    },

    isEdit () {
      return has(this.formData, 'id') && this.formData.id.length > 1
    },

    school () {
      return this.$store.state.school
    },

    title () {
      return this.isEdit ? 'Edit admin' : 'Add admin'
    }
  },
  methods: {
    close () {
      this.$store.commit('CLOSE_DIALOG', this.$options.name)
    },

    deleteAdmin () {
      if (!this.isEdit) {
        console.log('This is not edit mode, please select a proper user.')
        return false
      }

      this.$store.dispatch('DELETE_ADMIN', this.formData)
        .then(response => {
          this.$store.dispatch('GET_ALL_SCHOOLS')
          this.$store.commit('CLOSE_DIALOG', this.$options.name)
        })
    },

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
      if (this.isEdit) {
        this.$store.dispatch('PUT_ADMIN', this.formData)
          .then(response => {
            this.$store.commit('CLOSE_DIALOG', 'AddAdminDialog')
          })
          .catch(error => {
            console.log(error)
          })

        return
      }

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

        data.isEdit = (
          this.$store.state.newAdmin.hasOwnProperty('id') && this.$store.state.newAdmin.id.length > 1
        )

        this.$store.dispatch('POST_ADMIN', data)
          .then(response => {
            this.$store.commit('CLOSE_DIALOG', 'AddAdminDialog')
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
