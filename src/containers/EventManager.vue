<template>
  <v-card class="grey lighten-5" flat>
    <event-toolbar></event-toolbar>

    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

  </v-card>
</template>

<script>
import EventToolbar from '@/components/organisms/EventToolbar'
import CreateEvent from '@/pages/organization/CreateEvent'

export default {
  name: 'EventManagerTheme',
  components: {
    EventToolbar,
    CreateEvent,
  },
  data: () => ({

  }),
  created () {

  },
  mounted () {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>

</style>
