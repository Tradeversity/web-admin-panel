<template>
  <v-toolbar
    class="elevation-0"
    :style="{
      backgroundColor: $store.getters.schoolColor,
      color: $store.getters.primaryTextColor
    }"
    extended
    :fixed="fixed"
  >
    <v-toolbar-side-icon
      :style="{
        color: $store.getters.primaryTextColor
      }"
      @click.native.stop="openDrawer"
    ></v-toolbar-side-icon>

    <v-fab-transition>
      <v-btn
        v-show="hasFab"
        class="white"
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
        class="white"
        :to="dashboardLink"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-toolbar-title class="hidden-sm-and-down">
      Event Manager
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      icon
      flat
      :style="{
        color: $store.getters.primaryTextColor
      }"
      v-tooltip:left="{ html: filterText}"
      @click.native.stop="toggleIsOwned"
    >
      <v-icon>filter_list</v-icon>
    </v-btn>
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
  created () {
    console.log(this.$store.getters.primaryTextColor)
  },
  mounted () {
    setTimeout(() => {
      this.hasFab = true
    }, 500)
  },
  computed: {
    isOwned () {
      return this.$store.state.isEventsOwned
    },

    filterText () {
      return this.isOwned ? 'Show all events' : 'Show your events'
    },

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
    },

    toggleIsOwned () {
      this.isOwned
        ? this.$store.dispatch('GET_EVENTS')
        : this.$store.dispatch('GET_ORGANIZATION_EVENTS')

      this.$store.commit('TOGGLE_IS_EVENTS_OWNED')
    }
  }
}
</script>

<style lang="stylus" scoped>
// .back
//   bottom: 0
</style>
