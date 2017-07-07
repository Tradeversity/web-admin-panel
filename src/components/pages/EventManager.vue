<template>
  <v-layout column align-center>
    <v-flex xs12 class="mb-4">
      <router-link to="/logout">Go back to login...</router-link>
    </v-flex>
    <v-flex xs6 class="mb-4 card-wrap" v-for="event in events" :key="event.id">
      <v-card>
        <v-card-row :style="{ backgroundColor: school.formattedColor }">
          <v-card-title class="white--text">
            {{ event.title }}
          </v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            <b>Description:</b> {{ event.description }} <br>
            <b>Start time:</b> {{ event.start_time }} <br>
            <b>End time:</b> {{ event.end_time }} <br>
            <b>Location:</b> {{ event.location }}
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn flat>Delete</v-btn>
          <v-btn flat>Edit</v-btn>
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
    },

    school () {
      const school = this.$store.state.school
      let formattedColor = false

      if ((
        school.color[0] === 255 &&
        school.color[1] === 255 &&
        school.color[2] === 255
      ) || (
        school.color[0] === 0 &&
        school.color[1] === 0 &&
        school.color[2] === 0
      )) {
        formattedColor = '#D6262E'
      } else {
        formattedColor = `rgb(${school.color[0]}, ${school.color[1]}, ${school.color[2]})`
      }

      school.formattedColor = formattedColor
      return school
    }
  },
  mounted () {
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
