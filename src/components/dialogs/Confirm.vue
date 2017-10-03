<template>
  <v-dialog v-model="isOpen">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon flat @click.native.stop="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat secondary @click.native.stop="close">
          Cancel
        </v-btn>
        <v-btn flat primary>
          {{ confirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data: () => ({
    title: 'Confirm',
    message: 'Are you sure you would like to take this action?',
    confirm: 'Confirm'
  }),
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

    },
  },
  methods: {
    close () {
      this.$store.commit('CLOSE_CONFIRM_DIALOG')
    }
  },
  mounted () {
    const confirm = this.$store.state.confirmationAction

    if (
      confirm &&
      confirm.hasOwnProperty('type') &&
      confirm.hasOwnProperty('action')
    ) {
      switch (confirm.action) {
        case 'delete':
          this.title = 'Delete'
          this.confirm = 'Delete'
          this.message = `Are you sure you would like to delete ${confirm.data.title}`
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
