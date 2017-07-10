<template>
  <div id="EventLocation" class="map">

  </div>
</template>

<script>
import Leaflet from 'leaflet'

// const apiToken = 'AIzaSyBpnXldNOLRyuT4SP_3gDvmpUaNpPrO9eM'
// load(apiToken)

export default {
  name: 'EventLocationMap',
  components: {

  },
  data: () => ({

  }),
  mounted () {
    Leaflet.map('EventLocation').setView([50, -10], 13)
  }
}
</script>

<style lang="stylus" scoped>
.map
  height: 200px
</style>

