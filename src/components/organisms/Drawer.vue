<template>
  <v-navigation-drawer
    light
    persistent
    enable-resize-watcher
    v-model="isOpen"
    width="250px"
  >
    <v-list class="pa-0">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img
            :src="avatar"
            role="presentation"
          />
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
        v-for="page in pages"
        :key="pages"
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
import Avatar from '@/assets/avatar.png'

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

    username () {
      return this.$store.getters.username
    },

    avatar () {
      return this.$store.getters.avatar || Avatar
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
