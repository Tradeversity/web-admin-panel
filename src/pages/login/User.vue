<template>
  <v-card class="card">
    <form @submit.prevent="login">
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          name="email"
          label="Email"
          type="email"
          v-model="formData.email"
          :hint="formState.email.hint"
          :error="formState.email.error"
          :persistent-hint="formState.email.error"
        ></v-text-field>
        <v-text-field
          name="password"
          label="Password"
          type="password"
          v-model="formData.password"
          :hint="formState.password.hint"
          :error="formState.password.error"
          :persistent-hint="formState.password.error"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          type="submit"
          class="primary--text"
          :loading="isLoading"
        >Login</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import api from '@/api'
import validateEmail from '@/services/validateEmail'
import { has } from 'lodash'

export default {
  name: 'Login',
  data () {
    return {
      isLoading: false,
      formData: {
        email: '',
        password: '',
      },
      formState: {
        form: 'info',
        email: {
          hint: '',
          error: false,
        },
        password: {
          hint: '',
          error: false,
        }
      },
    }
  },
  computed: {
    isOpen: {
      get () {
        const hasDialog = has(this.$store.state, `dialogs[${this.$options.name}].active`)
        return hasDialog && this.$store.state.dialogs[this.$options.name].active
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },
  },
  watch: {
    email (value) {
      this.$cookie.set('TV_ADMIN_EMAIL', value)
    }
  },
  methods: {
    login () {
      const { email, password } = this.formData
      const isEmailValid = validateEmail(email)
      const isPasswordLong = password.length > 7

      if (!isEmailValid) {
        this.formState.email.hint = 'Please enter a valid email'
        this.formState.email.error = true
      }

      if (!isPasswordLong) {
        this.formState.password.hint = 'Passwords should be at least 8 characters'
        this.formState.password.error = true
        this.formState.passwordConfirm.error = true
      }

      if (isEmailValid && isPasswordLong) {
        this.isLoading = true

        api.request('post', '/login/', {
          email: email,
          password: password,
          type: 'Web',
          platform: window.navigator.userAgent
        })
        .then(response => {
          this.isLoading = false

          if (!response.data) {
            return false
          }

          this.$cookie.set('TV_ADMIN_USER', JSON.stringify(response.data))
          // this.$cookie.set('TV_ADMIN_TOKEN', response.data.access_token)
          window.localStorage.setItem('TV_ADMIN_TOKEN', response.data.access_token)

          this.$store.commit('SET_USER', response.data)
          // this.$store.dispatch('GET_ALL_SCHOOLS')
          //  .then(() => {
          const schoolName = this.$store.state.school.short_name

          if (response.data.user.account_role === 'global_admin') {
            console.log('Sending to super...')
            this.$router.push({
              path: '/global/schools',
            })
          } else if (response.data.user.account_role === 'admin') {
            this.$router.push({
              path: `/school/${schoolName}/dashboard`,
            })
          } else if (response.data.user.account_type === 'organization') {
            this.$router.push({
              path: `/school/${schoolName}/event-manager`,
            })
          }
            // })
            // .catch((error) => {
            //   console.log('EOROROROR', error)
            // })
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
          this.formState.password.error = false
          this.formState.email.error = true
          this.formState.email.hint = "Email and password don't match"
          this.formState.password.hint = ''
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  width: 300px
</style>
