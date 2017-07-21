<template>
  <v-toolbar
    class="primary white--text elevation-0"
    extended
    :fixed="fixed"
  >
    <v-toolbar-side-icon
      class="white--text"
      @click.native.stop="openDrawer"
    ></v-toolbar-side-icon>

    <v-fab-transition>
      <v-btn
        v-show="hasFab"
        class="accent white--text"
        absolute
        bottom
        left
        fab
        v-if="fixed"
        @click.native.stop="goToEvent"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-btn
        v-else
        absolute
        bottom
        left
        fab
        class="accent back white--text"
        :to="dashboardLink"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-toolbar-title class="hidden-sm-and-down">
      Event Manager
    </v-toolbar-title>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  name: 'EventToolbar',
  props: ['fixed'],
  data: () => ({
    isMenuOpen: false,
    hasFab: false,
  }),
  mounted () {
    setTimeout(() => {
      this.hasFab = true
    }, 500)
  },
  computed: {
    shortName () {
      return this.$store.state.school.short_name
    },

    dashboardLink () {
      return `/school/${this.shortName}/event-manager/`
    },
  },
  methods: {
    goToEvent () {
      this.$router.push({path: `/school/${this.shortName}/event-manager/create`})
    },

    openDrawer () {
      console.log('yes')
      this.$store.commit('TOGGLE_DRAWER')
    }
  }
}
</script>

<style lang="stylus" scoped>
// .back
//   bottom: 0
</style>
