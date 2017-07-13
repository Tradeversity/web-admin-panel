<template>
  <v-dialog v-model="isOpen" width="400" content-class="dialog">
    <v-card>
      <v-card-media
        v-if="listing.carousel && !editMode"
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

      <v-card-text v-if="editMode">
        <v-card class="primary">
          <v-card-title class="white--text">
            <span class="title">
              Drag photos into here to upload or
              <a href="#" class="white--text">
                Browse your computer
              </a>
            </span>
          </v-card-title>
        </v-card>
      </v-card-text>

      <v-alert error v-model="listing.isFlagged " v-if="!editMode">
        This listing has been flagged
      </v-alert>

      <v-card-text v-if="listing.isFlagged && !editMode">
        <v-btn
          block
          primary
          class="mb-3"
          @click.native.stop="approve"
        >
          Approve
        </v-btn>
        <v-btn
          block
          error
          @click.native.stop="deny"
        >
          Deny
        </v-btn>
      </v-card-text>

      <v-card-text v-if="!editMode">
        Description - {{ listing.description }}
      </v-card-text>

      <v-list v-if="!editMode">
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

      <v-card-text v-else>
        <v-text-field
          label="Title"
          v-model="formData.title"
        ></v-text-field>
        <v-text-field
          label="Price"
          v-model="formData.price"
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="formData.description"
        ></v-text-field>
        <v-text-field
          label="Listing type"
          v-model="formData.listing_type"
        ></v-text-field>
        <v-text-field
          label="Category"
          v-model="formData.category"
        ></v-text-field>
        <v-text-field
          label="Condition"
          v-model="formData.additional_properties.condition"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn flat icon v-tooltip:top="{ html: 'Edit listing' }" @click.native.stop="editMode = !editMode">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-dialog v-model="deleteDialog" lazy absolute>
          <v-btn
            flat
            icon
            slot="activator"
            v-tooltip:top="{ html: 'Delete listing' }"
          >
            <v-icon>delete</v-icon>
          </v-btn>

          <v-card>
            <v-card-title>
              <span class="headline">Delete</span>
              <v-spacer></v-spacer>
              <v-btn icon flat @click.native.stop="deleteDialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              Are you sure you would like to delete <b>{{ listing.title }}</b>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                @click.native.stop="deleteDialog = false"
              >Cancel</v-btn>
              <v-btn
                flat
                primary
                @click.native="deleteListing"
              >Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ViewListingDialog',
  data: () => ({
    deleteDialog: false,
    editMode: false,
  }),
  computed: {
    isOpen: {
      get () {
        return this.$store.state.isViewListingDialogOpen
      },

      set (value) {
        if (!value) {
          if (this.editMode) {
            this.editMode = false
          }

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

    formData () {
      return this.listing
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
  },
  methods: {
    editListing () {
      this.$store.commit('SET_NEW_LISTING', this.listing)
      this.$store.commit('OPEN_ADD_LISTING_DIALOG')
    },

    deleteListing () {
      this.$store.dispatch('DELETE_LISTING', this.listing.id)
      this.$store.dispatch('GET_LISTING')
      this.deleteDialog = false
    },

    approve () {
      this.listing.isFlagged = false
    },

    deny () {
      this.listing.isFlagged = false
    }
  }
}
</script>

<style lang="stylus">
.dialog
  overflow: visible
</style>

<style lang="stylus" scoped>
.drop
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6)

.overlay
  position: absolute
  z-index: 1000
</style>
