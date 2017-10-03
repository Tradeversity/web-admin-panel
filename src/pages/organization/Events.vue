<template>
  <v-layout column align-center class="wrap">
    <!-- <v-flex
      v-if="isLoading"
      xs7
    >
      <v-progress-circular
        indeterminate
        size="50"
        :style="{
          color: $store.getters.primaryTextColor
        }"
      ></v-progress-circular>
    </v-flex> -->
    <v-flex v-if="isEmpty && !isLoading" xs7>
      <span class="headline">
        There doesn't seem to be any events listed.
      </span>
    </v-flex>
    <v-flex
      xs7
      class="mt-2 mb-2 card-wrap"
      v-for="eventItem in events"
      :key="eventItem.id"
      v-else
    >
      <event-card :item="eventItem"></event-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { isEmpty } from 'lodash'
import EventCard from '@/components/organisms/EventCard'

export default {
  name: 'Events',
  components: {
    EventCard,
  },
  methods: {
    deleteEvent (eventItem) {
      this.$store.commit('SET_CONFIRMATION_ACTION', eventItem)
      this.$store.commit('OPEN_CONFIRM_DIALOG')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isEventLoading
    },

    isOwned () {
      return this.$store.state.isEventsOwned
    },

    isEmpty () {
      return this.isOwned
        ? isEmpty(this.$store.state.organizationEvents)
        : isEmpty(this.$store.state.events)
    },

    events () {
      return this.isOwned
        ? this.$store.state.organizationEvents.map(event => {
          event.isOwned = true
          return event
        }) || []
        : this.$store.state.events || []
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
      .then(() => {
        this.$store.commit('TOGGLE_IS_EVENT_LOADING')
      })
  }
}
</script>

<style lang="stylus" scoped>
.card-wrap
  width: 500px

.wrap
  margin-top: 68px
  padding-bottom: 50px
</style>
