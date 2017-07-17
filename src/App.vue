<template>
  <v-app id="app">
    <drawer v-if="navbar.isActive ===  'admin'"></drawer>
    <toolbar v-if="navbar.isActive ===  'admin'"></toolbar>
    <super-toolbar v-if="navbar.isActive ===  'super'"></super-toolbar>
    <event-toolbar v-if="navbar.isActive ===  'event'"></event-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>

        <v-btn
          fab
          dark
          fixed
          bottom
          right
          :style="{ backgroundColor: schoolColor }"
          @click.native.stop="add"
          v-show="isFABActive"
        >
          <v-icon>add</v-icon>
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
    <confirm-dialog></confirm-dialog>
    <event-dialog></event-dialog>
    <listing-dialog></listing-dialog>
  </v-app>
</template>

<script>
import Drawer from '@/components/organisms/Drawer'
import Toolbar from '@/components/organisms/Toolbar'
import SuperToolbar from '@/components/organisms/SuperToolbar'
import EventToolbar from '@/components/organisms/EventToolbar'

import UserDialog from '@/components/dialogs/User'
import FlaggedDialog from '@/components/dialogs/Flagged'
import AddListingDialog from '@/components/dialogs/AddListing'
import AddOrganizationDialog from '@/components/dialogs/AddOrganization'
import AddAdminDialog from '@/components/dialogs/AddAdmin'
import AddSchoolDialog from '@/components/dialogs/AddSchool'
import AddEventDialog from '@/components/dialogs/AddEvent'
import SetLocationDialog from '@/components/dialogs/SetLocation'
import ConfirmDialog from '@/components/dialogs/Confirm'
import ListingDialog from '@/components/dialogs/Listing'
import EventDialog from '@/components/dialogs/Event'

export default {
  name: 'app',
  components: {
    Drawer,
    Toolbar,
    SuperToolbar,
    EventToolbar,
    UserDialog,
    FlaggedDialog,
    AddListingDialog,
    AddAdminDialog,
    AddSchoolDialog,
    AddEventDialog,
    AddOrganizationDialog,
    SetLocationDialog,
    ConfirmDialog,
    ListingDialog,
    EventDialog,
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
    navbar () {
      let active = ''

      if (this.$route.path === `/school/${this.schoolName}/event-manager`) {
        active = 'event'
      } else if (this.$route.path.indexOf('/school') > -1) {
        active = 'admin'
      } else if (this.$route.path === '/super') {
        active = 'super'
      }

      return {
        isActive: active,
      }
    },

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
            this.$store.commit('OPEN_VIEW_LISTING_DIALOG')
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

// #D6262E red
// #00BFA5 blue
// #30d6bf teal
$theme := {
  primary: $blue.darken-2
  accent: $blue.accent-2
  secondary: $grey.darken-3
  info: $blue.base
  warning: $amber.base
  error: $red.base
  success: $green.base
}

// $theme := {
//   primary: #D6262E
//   accent: #30d6bf
//   secondary: $grey.darken-3
//   info: $blue.base
//   warning: $amber.base
//   error: $red.base
//   success: $green.base
// }

@import '../node_modules/vuetify/src/stylus/main'

body, html, #app
  background-color: #f6f6f6

#app
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

  // .fab-wrapper
  //   right: 1rem !important
  //   i
  //     left: unset
  //   .fab
  //     bottom: 0
  //     left: -.3rem
  //     right: 0

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
