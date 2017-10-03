<template>
  <v-dialog v-model="isOpen" width="400">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">Add Listing</span>
        </v-card-title>

        <v-alert
          :success="alert.type === 'success'"
          :info="alert.type === 'info'"
          :warning="alert.type === 'warning'"
          :error="alert.type === 'error'"
          :value="alert.active"
        >
          {{ alert.message }}
        </v-alert>

        <v-card-media
          v-if="!errorActive && (isUploading || newImages.length > 0)"
          v-bind:src="primaryImageSrc"
          class="white--text"
          height="300"
        >
          <v-container v-if="isUploading" fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-center justify-center flexbox>
                <v-progress-circular
                  indeterminate
                  :size="100"
                  class="primary--text"
                ></v-progress-circular>
              </v-flex>
            </v-layout>
          </v-container>

          <v-carousel v-if="newImages.length > 1">
            <v-carousel-item
              v-for="(image, index) in newImages"
              v-bind:src="image.media_url"
              v-bind:key="index"
            ></v-carousel-item>
          </v-carousel>
        </v-card-media>

        <v-card-text>
          <v-card class="primary pt-3 pb-3">
            <v-card-title class="white--text">
              <span class="title">
                Drag photos into here to upload or

                <input
                  type="file"
                  class="white--text pt-3"
                  value="Browse your computer"
                  @change="fileUpload"
                />
              </span>
            </v-card-title>
          </v-card>
        </v-card-text>

        <v-card-text class="text-xs-left">
          <v-text-field
            label="Title"
            v-model="formData.title"
          ></v-text-field>

          <v-text-field
            label="Amount"
            v-model="formData.price"
            hint="Please add the cent amount and decimal point"
            placeholder="0.00"
            prefix="$"
            @keypress.native="numberOnly"
          ></v-text-field>

          <v-text-field
            label="Description"
            v-model="formData.description"
          ></v-text-field>

          <v-text-field
            label="Sponsored Link"
            v-model="formData.additional_properties.info_url"
            v-if="formData.is_promoted"
          ></v-text-field>

          <!-- <v-select
            :items="typeItems"
            label="Type"
            v-model="type"
            single-line
            auto
          ></v-select> -->

          <v-select
            v-bind:items="categoryItems"
            label="Category"
            v-model="category"
            single-line
            auto
          ></v-select>

          <v-select
            v-bind:items="conditionItems"
            label="Condition"
            v-model="condition"
            single-line
            auto
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            secondary
            flat
            @click.native="reset"
          >Reset</v-btn>
          <v-btn
            primary
            flat
            @click.native="submit"
          >Submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { forEach, isArray, has } from 'lodash'

export default {
  name: 'AddListingDialog',
  data: () => ({
    isUploading: false,
    editMode: false,
    hasStaticMap: false,
    staticMapURL: '',
    newImages: [],
  }),
  beforeDestroy () {
    this.$store.commit('CLOSE_DIALOG_ALERT')
  },
  mounted () {
    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    window.addEventListener('drop', (event) => {
      event.preventDefault()

      this.isUploading = true

      const images = Array.from(event.dataTransfer.files)
        .filter(file => file.type.startsWith('image/'))

      const done = Promise.all(images.map(imageFile => {
        return imageFile
      }))

      done.then(response => {
        isArray(response) && forEach(response, file => {
          this.$store.dispatch('POST_IMAGE', file)
            .then(media => {
              const data = this.formData
              this.newImages.push(media)
              data.assets = this.newImages
              this.isUploading = false
            })
        })
      })
      .catch(error => {
        if (error) {
          this.isUploading = false
        }
      })
    })
  },
  components: {

  },
  computed: {
    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)

        if (this.errorActive) {
          this.$store.commit('CLOSE_DIALOG_ALERT')
        }
      }
    },

    alert () {
      return this.$store.state.activeDialogAlert
    },

    errorActive () {
      return this.alert.active
    },

    formData: {
      get () {
        return this.$store.getters.newSponsoredListing
      },

      set (value) {
        value && this.$store.commit('SET_NEW_SPONSORED_LISTING', value)
      }
    },

    primaryImageSrc () {
      return isArray(this.newImages) && has(this.newImages[0], 'media_url')
      ? this.newImages[0].media_url
      : ''
    },

    type: {
      get () {
        return this.formData.type
      },

      set (value) {
        console.log('type', value)
      }
    },

    category: {
      get () {
        // if (this.categoryItems.indexOf(this.formData.category) === -1) {
        //   this.categoryItems.push(this.formData.category)
        // }

        return this.formData.category
      },

      set (value) {
        const data = this.formData
        data.category = value
        this.$store.commit('SET_NEW_SPONSORED_LISTING', data)
      }
    },

    condition: {
      get () {
        // if (this.conditionItems.indexOf(this.formData.condition) === -1) {
        //   this.conditionItems.push(this.formData.condition)
        // }

        return this.formData.condition
      },

      set (value) {
        const data = this.formData
        data.condition = value
        this.$store.commit('SET_NEW_SPONSORED_LISTING', data)
      }
    },

    conditionItems () {
      return [
        'New',
        'Slighty used',
        'Okay',
        'Used',
        'Poor',
      ]
    },

    categoryItems () {
      return this.$store.state.school.categories
    },
  },
  methods: {
    numberOnly (event = window.event) {
      const charCode = event.which || event.keyCode

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        event.preventDefault()
      } else {
        return true
      }
    },

    fileUpload (event) {
      event.preventDefault()
      this.isUploading = true

      if (this.errorActive) {
        this.$store.commit('CLOSE_DIALOG_ALERT')
      }

      const images = Array.from(event.target.files)
        .filter(file => file.type.startsWith('image/'))

      const done = Promise.all(images.map(imageFile => {
        return imageFile
      }))

      done.then(response => {
        isArray(response) && forEach(response, file => {
          this.$store.dispatch('POST_IMAGE', file)
            .then(media => {
              const data = this.formData
              this.isUploading = false
              this.newImages.push(media)
              data.assets = this.newImages
            })
        })
      })
      .catch(error => {
        if (error) {
          this.isUploading = false
        }
      })
    },

    reset () {
      this.$store.commit('SET_NEW_SPONSORED_LISTING', {
        title: '',
        price: '',
        description: '',
        type: '',
        category: '',
        condition: '',
      })
    },

    submit () {
      if (has(this.formData, 'id')) {
        this.$store.dispatch('PUT_SPONSORED_LISTING', this.formData)
          .then(response => {
            this.reset()
            this.$store.commit('CLOSE_DIALOG', 'AddListingDialog')
            this.$store.dispatch('GET_SPONSORED_LISTINGS')
          })

        return
      }

      if (
        has(this.formData, 'title') &&
        has(this.formData, 'price') &&
        has(this.formData, 'description') &&
        has(this.formData, 'category') &&
        has(this.formData, 'condition') &&
        has(this.formData, 'assets')
      ) {
        this.$store.dispatch('POST_SPONSORED_LISTING', this.formData)
          .then(response => {
            this.reset()
            this.$store.commit('CLOSE_DIALOG', 'AddListingDialog')
            this.$store.dispatch('GET_SPONSORED_LISTINGS')
          })
      } else {
        console.log('Please fill out all fields...')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.hide
  display: none

.card
  overflow: hidden
</style>
