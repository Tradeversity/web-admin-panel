<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  }),
  created () {

  }
}
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/settings/_colors'

// #D6262E red
// #00BFA5 blue
// #30d6bf teal
// $theme := {
//   primary: $blue.darken-2
//   accent: $blue.accent-2
//   secondary: $grey.darken-3
//   info: $blue.base
//   warning: $amber.base
//   error: $red.base
//   success: $green.base
// }

$theme := {
  primary: #D6262E
  accent: #30d6bf
  secondary: $grey.darken-3
  info: $blue.base
  warning: $amber.base
  error: $red.base
  success: $green.base
}

@import '../node_modules/vuetify/src/stylus/main'

body, html, #app
  background-color: #f6f6f6
  overflow-x: hidden
  overflow-y: auto

#app
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

main
  overflow-y: auto

.container
  max-width: 1000px;

.dialog
  background-color: white

.input-group
  i, label
    color: $theme.secondary !important
</style>

<style lang="stylus" scoped>
.image-wrapper
  padding: 5rem 5rem 1rem 5rem

.nav-item
  text-decoration: none

.pull-bottom
  position: absolute
  bottom: 0
  left: 0
  width: 100%

.fab
  position: fixed
  bottom: 1rem
  right: 1rem
</style>
