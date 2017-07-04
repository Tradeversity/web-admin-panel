<template>
  <v-layout>
    <v-navigation-drawer
      width="250px"
      persistent
      light
      :mini-variant.sync="mini"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Doe</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0 nav-list" dense>
        <v-divider></v-divider>
        <v-list-item v-for="page in pages" :key="pages">
          <router-link :to="page.path" class="nav-item">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>{{ page.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ page.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <router-link to="/logout" class="nav-item">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>power_settings_new</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Logout
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="primary" fixed light>
      <v-toolbar-side-icon
        light
        @click.native.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down">

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon light>
        <v-icon>
          account_circle
        </v-icon>
      </v-btn>
      <v-btn icon light>
        <v-icon>
          notifications
        </v-icon>
      </v-btn>
      <v-btn icon light>
        <v-icon>
          more_vert
        </v-icon>
      </v-btn>
    </v-toolbar>
  </v-layout>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      drawer: true,
      right: null,
      left: null,
      mini: false,
      pages: [
        {
          title: 'Dashboard',
          path: '/dashboard',
          icon: 'dashboard',
        }, {
          title: 'Users',
          path: '/users',
          icon: 'people',
        }, {
          title: 'Listings',
          path: '/listings',
          icon: 'view_list',
        }, {
          title: 'Sponsors',
          path: '/sponsors',
          icon: 'store',
        }, {
          title: 'Organizations',
          path: '/organizations',
          icon: 'folder_shared',
        }, {
          title: 'Filters',
          path: '/filters',
          icon: 'note_add',
        },
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.image-wrapper
  padding: 5rem 5rem 1rem 5rem

.nav-item
  text-decoration: none

.pull-bottom
  position: absolute
  bottom: 0
  left: 0
  width: 100%
</style>
