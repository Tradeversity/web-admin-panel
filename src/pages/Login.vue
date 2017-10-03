<template>
  <v-layout column align-center>
    <v-flex xs12 class="mt-5">
      <img
        :src="brandLogo"
        alt="brand"
        role="presentation"
        class="logo"
      >
    </v-flex>
    <v-flex xs12 class="mt-5">
      <router-view></router-view>
    </v-flex>
    <v-flex xs12 class="mt-3">
      <router-link
        v-show="page === 'User'"
        to="/login/forgot"
      >
        Forgot password?
      </router-link>
      <router-link
        v-show="page === 'Forgot'"
        to="/login"
      >
        Go back to login
      </router-link>
    </v-flex>
  </v-layout>
</template>

<script>
import brandLogo from '@/assets/brand_logo.svg'

export default {
  name: 'Login',
  data () {
    return {
      brandLogo: brandLogo,
    }
  },
  computed: {
    page () {
      return this.$route.name
    }
  },
}
</script>

<style lang="stylus" scoped>
.login-card
  min-width: 300px

.logo
  width: 100px
</style>
