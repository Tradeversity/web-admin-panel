<template>
  <v-card class="grey lighten-5 background" flat>
    <v-navigation-drawer
      v-model="isOpen"
      temporary
      enable-resize-watcher
      overflow
    >
      <v-list>
        <v-list-tile :to="dashboardLink">
          Dashboard
        </v-list-tile>
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
    </v-navigation-drawer>

    <event-toolbar :fixed="isDashboard"></event-toolbar>



    <main v-if="isDashboard">
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

    <v-container v-else>
      <router-view></router-view>
    </v-container>
  </v-card>
</template>

<script>
import EventToolbar from '@/components/organisms/EventToolbar'
import CreateEvent from '@/pages/organization/CreateEvent'

export default {
  name: 'EventManagerTheme',
  components: {
    EventToolbar,
    CreateEvent,
  },
  data: () => ({

  }),
  created () {
    this.$store.commit('CLOSE_DRAWER')
  },
  mounted () {

  },
  computed: {
    isDashboard () {
      return (
        this.$route.fullPath.indexOf('create') === -1 &&
        this.$route.fullPath.indexOf('edit') === -1
      )
    },

    dashboardLink () {
      const schoolShortName = this.$store.state.school.short_name
      return `/school/${schoolShortName}/event-manager/`
    },

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

  }
}
</script>

<style lang="stylus" scoped>
.background
  background-color: #f6f6f6 !important
</style>

