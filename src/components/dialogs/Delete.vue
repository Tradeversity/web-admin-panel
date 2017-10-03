<template>
  <v-dialog
    v-model="isOpen"
    content-class="delete-dialog-index"
    lazy
    absolute
  >
    <v-card class="delete-dialog">
      <v-card-title>
        <span class="headline">Delete</span>
        <v-spacer></v-spacer>
        <v-btn
          flat
          icon
          @click.native.stop="cancelDelete"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-alert error v-model="hasError400" class="mt-0">
        400: Listing has already been deleted
      </v-alert>

      <v-card-text>
        Are you sure you would like to delete <b>{{ data.title }}</b>
      </v-card-text>
      <v-card-actions class="actions">
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click.native.stop="cancelDelete"
        >Cancel</v-btn>
        <v-btn
          flat
          primary
          @click.native="deleteListing"
        >Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  data: () => ({
    hasError400: false,
  }),
  beforeDestroy () {
    this.hasError400 = false
  },
  computed: {
    data () {
      return this.$store.getters.deleteDialogData
    },

    isOpen: {
      get () {
        return this.$store.getters.isDialogActive(this.$options.name)
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_DIALOG', this.$options.name)
          this.hasError400 = false
        }
      }
    },
  },
  methods: {
    cancelDelete () {
      this.$store.commit('CLOSE_DIALOG', this.$options.name)
      this.$store.commit('OPEN_DIALOG', 'ListingDialog')
      this.$store.commit('CLOSE_DIALOG_ALERT')
    },

    deleteListing () {
      this.$store.commit('CLOSE_DIALOG_ALERT')
      this.$store.dispatch('DELETE_LISTING', this.data.id)
        .then(response => {
          if (response.toString().indexOf('400') === -1) {
            this.$store.commit('CLOSE_DIALOG', this.$options.name)
            this.$store.dispatch('GET_SPONSORED_LISTINGS')
          } else {
            this.hasError400 = true
          }
        })
    },
  }
}
</script>

<style lang="stylus">
.delete-dialog-index
  z-index: 2000
</style>

<style lang="stylus" scoped>
.delete-dialog
  z-index: 2000
</style>

