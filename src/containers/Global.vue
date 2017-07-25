<template>
  <div>
    <v-navigation-drawer
      v-model="isOpen"
      temporary
      enable-resize-watcher
      overflow
    >
      <v-list>
        <v-list-tile to="/global/schools">
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

    <super-toolbar :fixed="isDashboard"></super-toolbar>

    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

    <add-admin-dialog></add-admin-dialog>
  </div>
</template>

<script>
import SuperToolbar from '@/components/organisms/SuperToolbar'
import AddAdminDialog from '@/components/dialogs/AddAdmin'

export default {
  name: 'GlobalContainer',
  components: {
    SuperToolbar,
    AddAdminDialog,
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
      return this.$route.fullPath.indexOf('create') === -1
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
    },
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.container
  margin-top: 40px
</style>

