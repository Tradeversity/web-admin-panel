<template>
  <v-dialog v-model="isOpen">
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
                <a href="#" class="white--text pt-3">
                  Browse your computer
                </a>
              </span>
            </v-card-title>
          </v-card>
        </v-card-text>

        <v-card-text class="text-xs-left">
          <v-text-field label="Title"></v-text-field>
          <input type="text" v-digits-only>
          <v-text-field

            label="Amount"
            placeholder="0.00"
            prefix="$"
          ></v-text-field>
          <v-text-field label="Description"></v-text-field>
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
            class="accent--text"
            flat
            @click.native="reset"
          >Reset</v-btn>
          <v-btn
            class="secondary--text darken-1"
            flat
            @click.native="submit"
          >Submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { has } from 'lodash'
import { digitsOnly } from '@/services/filters'

export default {
  name: 'AddListingDialog',
  data: () => ({
    rules: {

    }
  }),
  components: {
    digitsOnly
  },
  computed: {
    isOpen: {
      get () {
        const hasDialog = has(this.$store.state, `dialogs[${this.$options.name}].active`)
        return hasDialog && this.$store.state.dialogs[this.$options.name].active
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

    reset () {

    },

    submit () {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
