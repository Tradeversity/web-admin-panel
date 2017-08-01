<template>
  <v-toolbar
    fixed
    :style="{
      backgroundColor: $store.getters.schoolColor,
      color: $store.getters.primaryTextColor
    }"
  >
    <v-toolbar-side-icon
      light
      class="white--text"
      @click.native.stop="toggleDrawer"
    ></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down white--text">
      Admin panel
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  computed: {
    isOpen: {
      get () {
        return this.$store.state.isDrawerOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_DRAWER')
        }
      }
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('TOGGLE_DRAWER')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
