<template>
  <v-layout column align-center>
    <v-flex xs12>
      <v-card class="login-card">
        <form @submit.prevent="login">
          <v-card-title class="primary white--text">
            Tradeversity
          </v-card-title>
          <v-card-row>
            <v-card-text>
              <v-text-field
                name="email"
                label="Email"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-card-text>
          </v-card-row>
          <v-card-row actions>
            <v-btn
              flat
              type="submit"
              class="primary--text"
              :loading="isLoading"
            >Login</v-btn>
          </v-card-row>
        </form>
      </v-card>
    </v-flex>
    <v-flex xs12 class="pt-3">
      <a>
        Forgot password?
      </a>
    </v-flex>
  </v-layout>
</template>

<script>
import api from '@/api'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      email: '',
      password: '',
      forgotEmail: '',
      isLoading: false,
      isForgotCardActive: false,
    }
  },
  methods: {
    login () {
      const { email, password } = this
      this.isLoading = true

      api.request('post', '/login/', {
        email: email,
        password: password,
        type: 'Web',
        platform: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36'
      })
      .then(response => {
        this.isLoading = false

        if (!response.data) {
          return false
        }

        this.$store.commit('SET_USER', response.data)
        this.$store.dispatch('GET_ALL_SCHOOLS')
        this.$cookie.set('user', JSON.stringify(response.data))
        this.$cookie.set('token', response.data.access_token)
        this.$cookie.set('secret', response.data.access_secret)
        this.$router.push({ path: '/dashboard' })
      })
      .catch(error => {
        console.log(error)
        this.isLoading = false
      })
    },

    forgot () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.login-card
  min-width: 300px
  margin-top: 200px
</style>
