<template>
  <v-app id="app">
    <v-navigation-drawer
      width="250px"
      persistent
      light
      :mini-variant.sync="mini"
      v-model="drawer"
      enable-resize-watcher
      v-if="isLogged"
    >
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img
                :src="avatar"
                role="presentation"
              />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ user.display_name || ''}}
              </v-list-tile-title>
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

    <v-toolbar class="primary" fixed light v-if="isLogged">
      <v-toolbar-side-icon
        light
        @click.native.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down">

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon light to="/logout" router>
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

    <main>
      <v-container fluid>
        <router-view></router-view>

        <v-btn
          floating
          class="primary fab"
          @click.native.stop="add"
          v-show="isFABActive"
        >
          <v-icon light>add</v-icon>
        </v-btn>
      </v-container>
    </main>

    <flagged-dialog></flagged-dialog>
    <add-listing-dialog></add-listing-dialog>
    <add-organization-dialog></add-organization-dialog>
  </v-app>
</template>

<script>
import Avatar from '@/assets/avatar.png'
import FlaggedDialog from '@/components/dialogs/Flagged.vue'
import AddListingDialog from '@/components/dialogs/AddListing.vue'
import AddOrganizationDialog from '@/components/dialogs/AddOrganization.vue'

export default {
  name: 'app',
  components: {
    FlaggedDialog,
    AddListingDialog,
    AddOrganizationDialog,
  },
  data () {
    return {
      bgColor: '#52A9DB',
      position: 'bottom-right',
      fabActions: [
        {
          name: 'addListing',
          icon: 'account_circle'
        }
      ],
      drawer: true,
      right: null,
      left: null,
      mini: false,
    }
  },
  computed: {
    schoolName () {
      console.log('School', this.$store.state.school)
      if (
        this.$store.state.hasOwnProperty('school') &&
        this.$store.state.school.hasOwnProperty('short_name')
      ) {
        return this.$store.state.school.short_name
      } else {
        this.$router.push({
          path: '/login'
        })

        return false
      }
    },

    isLogged () {
      const isAuthed = this.$route.meta.requiredAuth || false
      const hasToken = this.$cookie.get('TV_ADMIN_TOKEN')
      return isAuthed && hasToken !== null
    },

    user () {
      return this.$store.state.user.user || {}
    },

    avatar () {
      return this.user.avatar_url || Avatar
    },

    isFABActive () {
      let isActive = false

      switch (this.$route.path) {
        case '/sponsors':
        case '/organizations':
          isActive = true
          break
      }

      return isActive
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
          title: 'Flagged',
          path: `/school/${this.schoolName}/flagged`,
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
          title: 'Filters',
          path: `/school/${this.schoolName}/filters`,
          icon: 'note_add',
        },
      ]
    }
  },
  methods: {
    add () {
      if (this.isFABActive) {
        switch (this.$route.path) {
          case '/sponsors':
            this.$store.commit('OPEN_ADD_LISTING_DIALOG')
            break
          case '/organizations':
            this.$store.commit('OPEN_ADD_ORGANIZATION_DIALOG')
            break
        }
      }
    }
  },
  mounted () {
    const school = this.$store.state.school

    if (school === null || school === undefined) {
      this.$router.push({
        path: '/login'
      })
    } else {
      this.schoolName = school.short_name
    }
  }
}
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/settings/_colors'

// #00BFA5
$theme := {
  primary: #D6262E
  accent: $red.accent-2
  secondary: $grey.darken-1
  info: $blue.lighten-1
  warning: $amber.darken-2
  error: $red.accent-4
  success: $green.lighten-2
}

@import '../node_modules/vuetify/src/stylus/main'

body, html, #app
  background-color: #f6f6f6

#app
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

  .fab-wrapper
    right: 1rem !important
    i
      left: unset
    .fab
      bottom: 0
      left: -.3rem
      right: 0

.container
  max-width: 1200px;

.dialog
  background-color: white

.input-group
  i, label
    color: $theme.secondary !important
</style>

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

.fab
  position: fixed
  bottom: 1rem
  right: 1rem
</style>
