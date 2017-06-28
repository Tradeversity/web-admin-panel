<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-row primary>
        <v-card-title>Flagged</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text class="text-xs-left">
          {{ this.data.id }}
          {{ this.data.title }}
          {{ this.data.category }}
          {{ this.data.created }}
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn
          class="accent--text"
          flat
          @click.native="deny"
        >Deny</v-btn>
        <v-btn
          class="secondary--text darken-1"
          flat
          @click.native="approve"
        >Approve</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FlaggedDialog',
  computed: {
    data () {
      return this.$store.state.flaggedItem || {}
    },

    isOpen: {
      get () {
        return this.$store.state.isFlaggedDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_FLAGGED_DIALOG')
        }
      }
    }
  },
  methods: {
    approve () {
      this.$store.dispatch('POST_UNFLAG_LISTING', this.data.id)
      this.$store.commit('CLOSE_FLAGGED_DIALOG')
    },

    deny () {
      this.$store.dispatch('POST_REMOVE_LISTING', this.data.id)
      this.$store.commit('CLOSE_FLAGGED_DIALOG')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
