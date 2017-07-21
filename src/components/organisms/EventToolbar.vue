<template>
  <v-toolbar
    class="primary white--text elevation-0"
    fixed
    extended
  >
    <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon>
    <v-fab-transition>
      <v-btn
        v-show="hasFab"
        class="accent"
        absolute
        bottom
        left
        fab
        @click.native.stop="goToEvent"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-toolbar-title class="hidden-sm-and-down">
      Event Manager
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
  name: 'EventToolbar',
  data: () => ({
    isMenuOpen: false,
    hasFab: false,
  }),
  mounted () {
    setTimeout(() => {
      this.hasFab = true
    }, 500)
  },
  methods: {
    goToEvent () {
      const schoolShortName = this.$store.getters.schoolShortName
      this.$router.push({path: `/school/${schoolShortName}/event-manager/create`})
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
