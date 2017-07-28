<template>
  <v-dialog v-model="isOpen" width="400">
    <v-card>
      <form @submit.prevent="submit">
        <v-card-title>
          <span class="headline">Add Listing</span>
        </v-card-title>

        <v-card-text>
          <v-card class="primary pt-3 pb-3">
            <v-card-title class="white--text">
              <span class="title">
                Drag photos into here to upload or

                <input
                  type="file"
                  class="white--text pt-3 hide"
                  value="Browse your computer"
                />

                <a href="" class="white--text pt-3" @click.stop="fileUpload">
                  Browse your computer
                </a>
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
            placeholder="0.00"
            prefix="$"
            @keypress.native="numberOnly"
          ></v-text-field>

          <v-text-field
            label="Description"
            v-model="formData.description"
          ></v-text-field>

          <v-select
            :items="typeItems"
            label="Type"
            v-model="type"
            single-line
            auto
          ></v-select>

          <v-select
            :items="categoryItems"
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
// import { forEach, isArray, has } from 'lodash'

export default {
  name: 'AddListingDialog',
  data: () => ({
    editMode: false,
    typeItems: [
      'item',
      'service',
      'event',
    ],
    categoryItems: [

    ],
    conditionItems: [

    ],
  }),
  components: {

  },
  computed: {
    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        !value && this.$store.commit('CLOSE_DIALOG', this.$options.name)
      }
    },

    formData: {
      get () {
        return this.$store.getters.newSponsoredListing
      },

      set (value) {
        console.log('formdata', value)
        value && this.$store.commit('SET_NEW_SPONSORED_LISTING', value)
      }
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
        return this.formData.category
      },

      set (value) {

      }
    },

    condition: {
      get () {
        return this.formData.condition
      },

      set (value) {

      }
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

    }
  }
}
</script>

<style lang="stylus" scoped>
.hide
  display: none
</style>
