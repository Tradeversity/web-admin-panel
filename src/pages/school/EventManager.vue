<template>
  <v-layout column align-center>
    <v-flex xs7 class="mb-4 card-wrap" v-for="eventItem in events" :key="eventItem.id">
      <event-card :item="eventItem"></event-card>
    </v-flex>
  </v-layout>
</template>

<script>
import EventCard from '@/components/organisms/EventCard'

export default {
  name: 'Events',
  components: {
    EventCard
  },
  methods: {
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
    this.$store.dispatch('GET_ORGANIZATION_EVENTS')
  }
}
</script>

<style lang="stylus" scoped>
.card-wrap
  width: 500px
</style>
