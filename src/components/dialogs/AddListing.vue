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
          ></v-text-field>

          <v-text-field
            label="Amount"
            placeholder="0.00"
            prefix="$"
          ></v-text-field>

          <v-text-field
            label="Description"
          ></v-text-field>

          <v-select
            :items="[
              { text: 'item' },
              { text: 'service' },
              { text: 'event' },
            ]"
            label="Type"
            single-line
            auto
          ></v-select>

          <v-select
            :items="[
              { text: 'category 1' },
              { text: 'category 2' },
            ]"
            label="Category"
            single-line
            auto
          ></v-select>

          <v-select
            :items="[
              { text: 'condition 1' },
              { text: 'condition 2' },
            ]"
            label="Condition"
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
export default {
  name: 'AddListingDialog',
  data: () => ({
    rules: {

    }
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
  },
  methods: {
    numberOnly (event = window.event) {
      const charCode = event.which || event.keyCode
      console.log(event)
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
