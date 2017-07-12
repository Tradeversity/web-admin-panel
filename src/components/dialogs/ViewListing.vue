<template>
  <v-dialog v-model="isOpen" width="400">
    <v-card>
      <v-card-media
        v-if="listing.carousel"
        class="white--text"
        :src="listingImage"
        height="300"
      >
        <v-container fill-height fluid class="overlay">
          <v-layout fill-height>
            <v-flex xs12 align-start flexbox>
              <span class="headline drop">
                {{
                  this.listing.price === 0
                    ? 'Free'
                    : `$${this.listing.price}`
                }} - {{ listing.title }}
              </span>
            </v-flex>
          </v-layout>
        </v-container>

        <v-carousel v-if="listing.carousel.length > 1">
          <v-carousel-item
            v-for="(image, index) in listing.carousel"
            :src="image"
            :key="index"
          ></v-carousel-item>
        </v-carousel>
      </v-card-media>

      <v-list>
        <v-list-tile v-for="description in descriptions" :key="description">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ description.type }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ description.text }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat primary>Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ViewListingDialog',
  data: () => ({

  }),
  computed: {
    isOpen: {
      get () {
        return this.$store.state.isViewListingDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_VIEW_LISTING_DIALOG')
        }
      }
    },

    listing () {
      return this.$store.getters.listing
    },

    listingImage () {
      if (this.listing.carousel.length === 1) {
        return this.listing.carousel[0]
      }
    },

    descriptions () {
      return [
        {
          type: 'ID',
          text: this.listing.id,
        }, {
          type: 'Price',
          text: `$${this.listing.price}`,
        }, {
          type: 'Status',
          text: this.listing.status,
        }, {
          type: 'Category',
          text: this.listing.category,
        }, {
          type: 'Posted',
          text: new Date(this.listing.created_at).toDateString(),
        }, {
          type: 'Expires at',
          text: new Date(this.listing.expires_at).toDateString(),
        },
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.drop
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6)

.overlay
  position: absolute
  z-index: 1000
</style>
