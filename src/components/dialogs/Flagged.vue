<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-row primary>
        <v-card-title>Flagged</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text>

        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn class="blue--text darken-1" flat @click.native="close">Deny</v-btn>
        <v-btn class="blue--text darken-1" flat @click.native="close">Approve</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Flagged',
  computed: {
    isOpen () {
      return this.$store.state.isFlaggedDialogOpen
    }
  },
  methods: {
    close () {
      this.$store.commit('CLOSE_FLAGGED_DIALOG')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
