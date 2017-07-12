<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-media :src="listingImage" height="200">

      </v-card-media>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ViewListingDialog',
  data: () => ({
    isOpen: false,
  }),
  computed: {
    listing () {
      return this.$store.statelisting
    },

    listingImage () {
      return '' // this.listing.media_url
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
