<template>
  <v-dialog v-model="isOpen">
    <v-card>

        <v-card-title>Add Listing</v-card-title>

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
            dark
            single-line
            auto
          ></v-select>
          <v-select
            :items="[
              { text: 'condition 1' },
              { text: 'condition 2' },
            ]"
            label="Condition"
            dark
            single-line
            auto
          ></v-select>
        </v-card-text>

      <v-card-actions>
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
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddListingDialog',
  computed: {
    isOpen: {
      get () {
        return this.$store.state.isAddListingDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_ADD_LISTING_DIALOG')
        }
      }
    }
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
