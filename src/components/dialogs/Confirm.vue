<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-title>
        <span class="headline">Confirm</span>
        <v-spacer></v-spacer>
        <v-btn icon flat @click.native.stop="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        Are you sure you would like to take this action?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat secondary @click.native.stop="close">
          Cancel
        </v-btn>
        <v-btn flat primary>
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  computed: {
    isOpen: {
      get () {
        return this.$store.state.isConfirmDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_CONFIRM_DIALOG')
        }
      }
    },

    action () {
      console.log(this.$store.state.confirmationAction)
      return this.$store.state.confirmationAction
    }
  },
  methods: {
    close () {
      this.$store.commit('CLOSE_CONFIRM_DIALOG')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
