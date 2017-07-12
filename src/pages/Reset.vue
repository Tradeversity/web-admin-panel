<template>
  <v-layout column align-center>
    <v-flex xs12>
      <v-card class="login-card">
        <form @submit.prevent="reset">
          <v-card-title class="primary white--text">
            Reset password
          </v-card-title>
          <v-card-row>
            <v-card-text>
              <v-text-field
                name="password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                type="password"
                v-model="confirm"
              ></v-text-field>
            </v-card-text>
          </v-card-row>
          <v-card-row actions>
            <v-btn
              flat
              type="submit"
              class="primary--text"
              :loading="isLoading"
            >Reset</v-btn>
          </v-card-row>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import api from '@/api'

export default {
  name: 'Login',
  data (router) {
    return {
      password: '',
      confirm: '',
      isLoading: false,
      snackbar: false,
      formState: {
        form: 'info',
        snackMessage: 'Invite user to organization',
        password: {
          hint: 'Please enter at least 8 characters',
          error: false,
        },
        confirm: {
          hint: '',
          error: false,
        }
      },
    }
  },
  computed: {
    token () {
      return this.$route.query.token || null
    }
  },
  methods: {
    reset () {
      const isPasswordLong = this.password.length > 7
      const isSame = this.password === this.confirm

      if (!isPasswordLong) {
        this.formState.password.hint = 'Passwords should be at least 8 characters'
        this.formState.password.error = true
        this.formState.passwordConfirm.error = true
      }

      if (!isSame) {
        this.formState.passwordConfirm.hint = "Your passwords don't match"
        this.formState.passwordConfirm.error = true
      }

      if (isPasswordLong && isSame) {
        this.isLoading = true

        api.request('post', `/login/reset_password/${this.token}`, {
          password: this.password,
        })
        .then(response => {
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
      }
    }
  },
  mounted () {
    if (this.token === null) {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-card
  min-width: 300px
  margin-top: 200px
</style>
