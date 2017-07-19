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
                <a href="#" class="white--text pt-3">
                  Browse your computer
                </a>
              </span>
            </v-card-title>
          </v-card>
        </v-card-text>

        <v-card-text class="text-xs-left">
          <v-text-field label="Title"></v-text-field>
          <v-text-field label="Amount"></v-text-field>
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

export default {
  name: 'AddListingDialog',
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
    reset () {

    },

    submit () {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
