<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen">
      {{ data }}
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ListingDialog',
    data: () => ({

    }),
    computed: {
      isOpen () {
        return this.$store.state.isViewListingDialogOpen
      },

      data () {
        return this.$store.state.selectedListing
      }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>

<style lang="stylus" scoped>

</style>
