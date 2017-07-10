<template>
  <v-toolbar
    primary
    fixed
    light
    dense
    dark
  >
    <v-toolbar-title class="hidden-sm-and-down">
      Super admin panel
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-model="isMenuOpen">
      <v-list>
        <v-list-tile href="https://www.tradeversity.com/">
          Website
        </v-list-tile>
        <v-list-tile href="https://www.tradeversity.com/app/">
          Web app
        </v-list-tile>
        <v-list-tile to="/logout">
          Logout
        </v-list-tile>
      </v-list>
      <v-btn flat icon slot="activator">
        <v-icon>
          more_vert
        </v-icon>
      </v-btn>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: 'SuperToolbar',
  data: () => ({
    isMenuOpen: false,
  })
}
</script>

<style lang="stylus" scoped>

</style>
