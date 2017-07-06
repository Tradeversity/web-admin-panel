<template>
  <v-card>
    <v-card-title>
      Events

      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="events"
      v-bind:search="search"
    >
      <template slot="items" scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.location }}</td>
        <td class="text-xs-right">
          {{ new Date(props.item.created_at).toDateString() }}
        </td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Event',
  data () {
    return {
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Title',
          value: 'title',
          left: true,
        },
        { text: 'Location', value: 'location' },
        { text: 'Created', value: 'created_at' },
      ],
    }
  },
  computed: {
    events () {
      return this.$store.state.events
    }
  },
  methods: {
    refresh () {

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
