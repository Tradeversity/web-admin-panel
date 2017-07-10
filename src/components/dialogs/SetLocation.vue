<template>
  <v-dialog v-model="isOpen">
    <v-card img="https://vuetifyjs.com/static/doc-images/toolbar/map.jpg" flat height="300px">
      <v-toolbar class="white" floating dense>
        <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
        <v-btn icon>
          <v-icon>my_location</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SetLocationDialog',
  computed: {
    isOpen: {
      get () {
        return this.$store.state.isSetLocationDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_SET_LOCATION_DIALOG')
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
