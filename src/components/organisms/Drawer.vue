<template>
  <v-navigation-drawer
    light
    persistent
    enable-resize-watcher
    v-model="isOpen"
    width="250"
  >
    <v-list class="pa-0">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img
            v-if="hasAvatar"
            :src="avatar"
            role="presentation"
          />

          <v-icon v-else x-large>account_circle</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ username }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0 nav-list" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="(page, index) in pages"
        :key="index"
        :to="page.path"
      >
        <v-list-tile-action>
          <v-icon>
            {{ page.icon }}
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ page.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile to="/logout">
        <v-list-tile-action>
          <v-icon>power_settings_new</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Logout
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Drawer',
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
    },

    schoolName () {
      // console.log('School', this.$store.state.school)
      if (
        this.$store.state.hasOwnProperty('school') &&
        this.$store.state.school.hasOwnProperty('short_name')
      ) {
        return this.$store.state.school.short_name
      } else {
        // this.$router.push({
        //   path: '/login'
        // })

        return false
      }
    },

    username () {
      return this.$store.getters.username
    },

    avatar () {
      return this.$store.getters.avatar
    },

    hasAvatar () {
      return this.$store.getters.avatar
    },

    pages () {
      return [
        {
          title: 'Dashboard',
          path: `/school/${this.schoolName}/dashboard`,
          icon: 'dashboard',
        }, {
          title: 'Users',
          path: `/school/${this.schoolName}/users`,
          icon: 'people',
        }, {
          title: 'Listings',
          path: `/school/${this.schoolName}/listings`,
          icon: 'view_list',
        }, {
          title: 'Sponsors',
          path: `/school/${this.schoolName}/sponsors`,
          icon: 'store',
        }, {
          title: 'Organizations',
          path: `/school/${this.schoolName}/organizations`,
          icon: 'folder_shared',
        }, {
          title: 'Events',
          path: `/school/${this.schoolName}/events`,
          icon: 'event',
        }, {
          title: 'Filters',
          path: `/school/${this.schoolName}/filters`,
          icon: 'note_add',
        },
      ]
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
