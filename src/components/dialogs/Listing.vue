<template>
  <v-dialog v-model="isOpen" width="400">
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
        <v-card class="primary pt-3 pb-3">
          <v-card-title class="white--text">
            <span class="title">
              Drag photos into here to upload or
              <a href="#" class="white--text pt-3">
                Browse your computer
              </a>
            </span>
          </v-card-title>
        </v-card>
      </v-card-text>

      <v-alert
        error
        class="mt-0"
        v-if="!editMode"
        v-model="listing.isFlagged"
      >
        This listing has been flagged
      </v-alert>

      <v-card-text v-if="!editMode">
        Description - {{ listing.description }}
      </v-card-text>

      <v-list v-if="!editMode">
        <v-list-tile v-for="(description, index) in descriptions" :key="index">
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
          v-model="formData.condition"
        ></v-text-field>
      </v-card-text>

      <v-divider v-if="isPromoted || listing.isFlagged"></v-divider>

      <v-card-actions v-if="isPromoted">
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click.native.stop="openEditDialog"
        >
          Edit
        </v-btn>

        <v-dialog
          v-model="deleteDialog"
          lazy
          absolute
        >
          <v-btn
            flat
            slot="activator"
          >
            Delete
          </v-btn>

          <v-card>
            <v-card-title>
              <span class="headline">Delete</span>
              <v-spacer></v-spacer>
              <v-btn
                flat
                icon
                @click.native.stop="deleteDialog = false"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              Are you sure you would like to delete <b>{{ listing.title }}</b>
            </v-card-text>
            <v-card-actions class="actions">
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

      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click.native.stop="deny"
          v-if="listing.isFlagged && !editMode"
        >
          Deny
        </v-btn>

        <v-btn
          flat
          @click.native.stop="approve"
          v-if="listing.isFlagged && !editMode"
        >
          Approve
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { forEach, isArray, has } from 'lodash'

export default {
  name: 'ListingDialog',
  data: () => ({
    deleteDialog: false,
    editMode: false,
    isCreate: false,
  }),
  computed: {
    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },

    listing () {
      const listing = this.$store.getters.listing

      if (listing.id === undefined || listing.id === null) {
        this.isCreate = true
      }

      listing.condition = has(listing, 'additional_properties.condition')
        ? listing.additional_properties.condition
        : ''

      return this.$store.getters.listing
    },

    isPromoted () {
      return this.listing.is_promoted && this.$route.path.indexOf('sponsors') !== -1
    },

    newImages: {
      get () {
        return []
      },

      set (value) {
        console.log('new value', value)
      }
    },

    listingImage () {
      if (this.listing.carousel.length === 1) {
        return this.listing.carousel[0]
      }
    },

    formData () {
      return this.editMode ? {} : this.listing
    },

    descriptions () {
      return [
        {
          type: 'ID',
          text: this.listing.id || '',
        }, {
          type: 'Price',
          text: `$${this.listing.price || ''}`,
        }, {
          type: 'Status',
          text: this.listing.status || '',
        }, {
          type: 'Category',
          text: this.listing.category || '',
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
    openEditDialog () {
      this.$store.commit('SET_NEW_SPONSORED_LISTING', this.listing)
      this.$store.commit('CLOSE_DIALOG', 'ListingDialog')
      this.$store.commit('OPEN_DIALOG', 'AddListingDialog')
    },

    editListing () {
      this.$store.commit('SET_NEW_LISTING', this.listing)
      this.$store.commit('OPEN_DIALOG', 'AddListingDialog')
    },

    deleteListing () {
      this.$store.dispatch('DELETE_LISTING', this.listing.id)
        .then(response => {
          this.$store.commit('CLOSE_DIALOG', 'ListingDialog')
          this.$store.dispatch('GET_LISTINGS')
          this.deleteDialog = false
        })
    },

    approve () {
      this.$store.dispatch('POST_UNFLAG_LISTING', this.listing.id)
        .then(response => {
          this.listing.isFlagged = false
          this.$store.commit('CLOSE_DIALOG', this.$options.name)
        })
    },

    deny () {
      this.$store.dispatch('POST_REMOVE_LISTING', this.listing.id)
        .then(response => {
          this.listing.isFlagged = false
          this.$store.commit('CLOSE_DIALOG', this.$options.name)
        })
    }
  },
  mounted () {
    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    window.addEventListener('drop', (event) => {
      event.preventDefault()

      const images = Array.from(event.dataTransfer.files)
        .filter(file => file.type.startsWith('image/'))

      const done = Promise.all(images.map(imageFile => {
        return imageFile
      }))

      done.then(response => {
        isArray(response) && forEach(response, file => {
          this.$store.dispatch('POST_IMAGE', file)
            .then(media => {
              this.newImages.push(media)
            })
        })
      })
    })
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
