<template>
  <v-dialog v-model="isOpen" width="500">
    <v-card flat>
      <v-toolbar class="white" floating absolute dense>
        <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
        <v-btn icon>
          <v-icon>my_location</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>

      <v-map id="EventLocation" :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :lat-lng="marker"></v-marker>
      </v-map>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import Leaflet from 'leaflet'

export default {
  name: 'SetLocationDialog',
  data: () => ({
    zoom: 13,
    center: [47.413220, -1.219482],
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: Leaflet.latLng(47.413220, -1.219482),
  }),
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-geojson-layer': Vue2Leaflet.GeoJSON,
    'v-marker': Vue2Leaflet.Marker
  },
  computed: {
    isOpen: {
      get () {
        return true // this.$store.state.isSetLocationDialogOpen
      },

      set (value) {
        if (!value) {
          this.$store.commit('CLOSE_SET_LOCATION_DIALOG')
        }
      }
    }
  },
  mounted () {
    // Leaflet.map('EventLocation').setView([51.505, -0.09], 13)
  }
}
</script>

<style lang="stylus" scoped>
.toolbar
  position: absolute
  top: 0
  right: 0
  left: unset
  z-index: 1000

#EventLocation
  height: 500px
  width: 500px
</style>
