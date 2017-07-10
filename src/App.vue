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
          class="fab"
          :style="{ backgroundColor: schoolColor }"
          @click.native.stop="add"
          v-show="isFABActive"
        >
          <v-icon class="white--text">add</v-icon>
        </v-btn>
      </v-container>
    </main>

    <set-location-dialog></set-location-dialog>
    <user-dialog></user-dialog>
    <flagged-dialog></flagged-dialog>
    <add-listing-dialog></add-listing-dialog>
    <add-admin-dialog></add-admin-dialog>
    <add-school-dialog></add-school-dialog>
    <add-event-dialog></add-event-dialog>
    <add-organization-dialog></add-organization-dialog>
  </v-app>
</template>

<script>
import Avatar from '@/assets/avatar.png'
import UserDialog from '@/components/dialogs/User.vue'
import FlaggedDialog from '@/components/dialogs/Flagged.vue'
import AddListingDialog from '@/components/dialogs/AddListing.vue'
import AddOrganizationDialog from '@/components/dialogs/AddOrganization.vue'
import AddAdminDialog from '@/components/dialogs/AddAdmin.vue'
import AddSchoolDialog from '@/components/dialogs/AddSchool.vue'
import AddEventDialog from '@/components/dialogs/AddEvent.vue'
import SetLocationDialog from '@/components/dialogs/SetLocation.vue'

export default {
  name: 'app',
  components: {
    UserDialog,
    FlaggedDialog,
    AddListingDialog,
    AddAdminDialog,
    AddSchoolDialog,
    AddEventDialog,
    AddOrganizationDialog,
    SetLocationDialog,
  },
  data () {
    return {
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
    schoolColor () {
      return this.$store.getters.schoolColor
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

    isLogged () {
      const isAuthed = this.$route.meta.requiredAuth || false
      const navbar = !this.$route.meta.noNavbar
      const hasToken = this.$cookie.get('TV_ADMIN_TOKEN')
      return isAuthed && hasToken !== null && navbar
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
        case '/super':
        case `/school/${this.schoolName}/event-manager`:
        case `/school/${this.schoolName}/sponsors`:
        case `/school/${this.schoolName}/organizations`:
          isActive = true
          break
      }

      // console.log(this.$route.path, this.schoolName)

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
    add () {
      if (this.isFABActive) {
        switch (this.$route.path) {
          case `/school/${this.schoolName}/event-manager`:
            this.$store.commit('OPEN_ADD_EVENT_DIALOG')
            break
          case `/school/${this.schoolName}/sponsors`:
            this.$store.commit('OPEN_ADD_LISTING_DIALOG')
            break
          case `/school/${this.schoolName}/organizations`:
            this.$store.commit('OPEN_ADD_ORGANIZATION_DIALOG')
            break
          case '/super':
            this.$store.commit('OPEN_ADD_SCHOOL_DIALOG')
            break
        }
      }
    }
  },
  mounted () {
    const school = this.$store.state.school

    if (school === null || school === undefined) {
      // this.$router.push({
      //   path: '/login'
      // })
    } else {
      this.schoolName = school.short_name
    }
  }
}
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/settings/_colors'

// #D6262E
// #00BFA5
$theme := {
  primary: $blue.darken-2
  accent: $blue.accent-2
  secondary: $grey.darken-3
  info: $blue.base
  warning: $amber.base
  error: $red.base
  success: $green.base
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
