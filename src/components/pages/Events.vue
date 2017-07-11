<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      <span class="headline">
        Events
      </span>

      <v-spacer></v-spacer>

      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
      <v-btn icon flat @click.native.stop="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
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
        <td class="text-xs-right">
          <v-btn flat icon @click.native.stop="approve(props.item.id)">
            <v-icon>check_circle</v-icon>
          </v-btn>
          <v-btn flat icon @click.native.stop="deny(props.item.id)">
            <v-icon>cancel</v-icon>
          </v-btn>
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
      isLoading: false,
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
      return this.$store.state.events.filter(event => !event.is_approved)
    }
  },
  methods: {
    refresh () {
      this.isLoading = true
      this.$store.dispatch('GET_EVENTS').then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      })
    },

    approve (id) {
      this.$store.dispatch('POST_APPROVE_EVENT', id)
    },

    deny (id) {
      this.$store.dispatch('POST_DENY_EVENT', id)
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
