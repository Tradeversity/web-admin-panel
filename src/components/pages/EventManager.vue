<template>
  <v-layout column align-center>
    <v-flex xs12 class="mb-4">
      <router-link to="/logout">Go back to login...</router-link>
    </v-flex>
    <v-flex xs6 class="mb-4 card-wrap" v-for="event in events" :key="event.id">
      <v-card>

        <v-card-title class="white--text" :style="{ backgroundColor: schoolColor }">
          <span class="headline">{{ event.title }}</span>
        </v-card-title>

        <v-card-media>
          <!--<event-location-map></event-location-map>-->
          <img :src="`https://maps.googleapis.com/maps/api/staticmap?scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=color:red%7Clabel:C%7C${event.lat},${event.long}&key=AIzaSyBpnXldNOLRyuT4SP_3gDvmpUaNpPrO9eM`" alt="google map image">
        </v-card-media>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Description
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ event.description }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Start time
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ getTime(event.start_time) }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                End time
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ getTime(event.end_time) }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                Location
              </v-list-tile-title>
              <v-list-tile-sub-title>
                {{ event.location }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-btn flat>Delete</v-btn>
          <v-btn flat>Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import EventLocationMap from '@/components/organisms/EventLocationMap'

export default {
  name: 'Events',
  components: {
  //   EventLocationMap,
  },
  methods: {
    getTime (epoch) {
      const exp = `/Date(${epoch})/`
      const date = new Date(parseFloat(exp.substr(6)))
      const minutes = date.getMinutes()
      const hours = date.getHours()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const mid = hours > 12 ? 'pm' : 'am'

      return `${day}/${month} ${hours}:${minutes}${mid}`
    }
  },
  computed: {
    events () {
      return this.$store.state.events
    },

    school () {
      return this.$store.state.school
    },

    schoolColor () {
      return this.$store.getters.schoolColor
    }
  },
  mounted () {
    this.$store.dispatch('GET_EVENTS')
    if (this.$store.state.events.length < 1) {
      this.$store.dispatch('GET_EVENTS')
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-wrap
  width: 500px
</style>
