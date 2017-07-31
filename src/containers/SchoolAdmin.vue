<template>
  <v-card class="grey lighten-5 background" flat>
    <drawer></drawer>
    <toolbar></toolbar>

    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

    <v-btn
      fab
      dark
      fixed
      bottom
      right
      :style="{ backgroundColor: schoolColor }"
      @click.native.stop="fabAction"
      v-show="isFabActive"
    >
      <v-icon>add</v-icon>
    </v-btn>

     <user-dialog></user-dialog>
    <add-listing-dialog></add-listing-dialog>
     <add-organization-dialog></add-organization-dialog>
    <event-dialog></event-dialog>
    <listing-dialog></listing-dialog>
  </v-card>
</template>

<script>
import Drawer from '@/components/organisms/Drawer'
import Toolbar from '@/components/organisms/Toolbar'

import AddListingDialog from '@/components/dialogs/AddListing'
import AddOrganizationDialog from '@/components/dialogs/AddOrganization'
import EventDialog from '@/components/dialogs/Event'
import SetLocationDialog from '@/components/dialogs/SetLocation'
import UserDialog from '@/components/dialogs/User'
import ListingDialog from '@/components/dialogs/Listing'

export default {
  name: 'SchoolAdminContainer',
  components: {
    Drawer,
    Toolbar,
    AddListingDialog,
    AddOrganizationDialog,
    EventDialog,
    SetLocationDialog,
    UserDialog,
    ListingDialog,
  },
  created () {
    console.log(this.$route.fullPath)
    this.$store.commit('OPEN_DRAWER')
  },
  computed: {
    schoolColor () {
      return this.$store.getters.schoolColor
    },

    isFabActive () {
      return this.$store.getters.isFabActive
    }
  },
  methods: {
    fabAction () {
      this.$store.dispatch('TRIGGER_FAB_ACTION')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

