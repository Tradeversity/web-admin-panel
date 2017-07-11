<template>
  <v-layout column align-center>
    <v-flex xs7 class="mb-4 card-wrap" v-for="eventItem in events" :key="eventItem.id">
      <event-card :item="eventItem"></event-card>
    </v-flex>
  </v-layout>
</template>

<script>
import EventCard from '@/components/organisms/EventCard'
// import EventLocationMap from '@/components/organisms/EventLocationMap'

export default {
  name: 'Events',
  components: {
    EventCard
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
    },

    deleteEvent (eventItem) {
      this.$store.commit('SET_CONFIRMATION_ACTION', eventItem)
      this.$store.commit('OPEN_CONFIRM_DIALOG')
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
  }
}
</script>

<style lang="stylus" scoped>
.card-wrap
  width: 500px
</style>
