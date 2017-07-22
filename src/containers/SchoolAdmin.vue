<template>
  <div>
    <drawer></drawer>
    <toolbar></toolbar>

    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

    <user-dialog></user-dialog>
    <add-listing-dialog></add-listing-dialog>
    <add-event-dialog></add-event-dialog>
    <add-organization-dialog></add-organization-dialog>
    <event-dialog></event-dialog>
    <listing-dialog></listing-dialog>
  </div>
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
    this.$store.commit('OPEN_DRAWER')
  },
}
</script>

<style lang="stylus" scoped>

</style>

