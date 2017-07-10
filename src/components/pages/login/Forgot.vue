<template>
  <v-card class="card">
    <v-card-title>
      <span class="headline">
        Send reset link
      </span>
    </v-card-title>

    <v-card-text>
      <v-text-field
        name="email"
        label="Email"
        type="email"
        primary
        v-model="email"
        :hint="message"
        :error="error"
        :persistent-hint="error"
        append-icon="arrow_forward"
        :append-icon-cb="sendEmail"
        @keyup.native.enter="sendEmail"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api'
import validateEmail from '@/services/validateEmail'

export default {
  name: 'Forgot',
  data () {
    return {
      error: false,
      message: '',
      email: '',
    }
  },
  methods: {
    sendEmail () {
      const isEmailValid = validateEmail(this.email)

      if (isEmailValid) {
        this.isLoading = true

        api.request('post', `/login/forgot_password`, {
          email: this.email,
        })
        .then(response => {
          this.$router.push({
            path: '/login/success'
          })
        })
        .catch(error => {
          this.error = true
          this.message = 'Please enter a valid email'
          console.log(error)
        })
      } else {
        this.error = true
        this.message = 'Please enter a valid email'
      }
    }
  },
  mounted () {
    this.email = this.$cookie.get('TV_ADMIN_EMAIL') || ''
  }
}
</script>

<style lang="stylus" scoped>
.card
  width: 300px
</style>
