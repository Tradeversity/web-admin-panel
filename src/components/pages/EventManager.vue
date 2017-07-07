<template>
  <v-layout row>
    <v-flex xs6 v-for="event in events" :key="event.id">
      <v-card>
        <v-card-row>
          <v-card-title>
            {{ event.title }}
          </v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            {{ event.description }}
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn flat>Okay</v-btn>
        </v-card-row>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Events',
  computed: {
    events () {
      return this.$store.state.events
    }
  },
  mounted () {
    if (this.$store.state.events.length < 1) {
      this.$store.dispatch('GET_EVENTS')
    }
  }
}
</script>

<style>

</style>
