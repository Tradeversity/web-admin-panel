<template>
  <v-card class="login-card">
    <v-card-title class="primary white--text">
      Success
    </v-card-title>
    <v-card-row>
      <v-card-text class="subheading">
        We have sent an email to you with a password reset link.
      </v-card-text>
    </v-card-row>
    <v-card-row actions>
      <v-btn flat primary to="/login" router>
        Return
      </v-btn>
    </v-card-row>
  </v-card>
</template>

<script>
export default {
  name: 'Success',
}
</script>

<style lang="stylus" scoped>
.card
  width: 300px
</style>
