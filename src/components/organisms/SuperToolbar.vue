<template>
  <v-toolbar
    class="primary white--text elevation-0"
    :fixed="fixed"
    light
    extended
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
        @click.native.stop="goToSchool"
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
        to="/global/schools"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-toolbar-title class="hidden-sm-and-down">
      Global admin
    </v-toolbar-title>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  name: 'SuperToolbar',
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
  methods: {
    openDrawer () {
      this.$store.commit('TOGGLE_DRAWER')
    },

    goToSchool () {
      this.$router.push({path: `/global/schools/create`})
    },
  }
}
</script>

<style lang="stylus" scoped>

</style>
