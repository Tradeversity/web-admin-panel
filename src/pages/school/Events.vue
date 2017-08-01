<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      <span class="headline">
        {{ title }}
      </span>

      <v-btn
        icon
        flat
        v-tooltip:right="{ html: 'Show queued items'}"
        v-if="!hasFlagged && !showQueue"
        @click.native="showQueue = !showQueue"
      >
        <v-icon>flag</v-icon>
      </v-btn>

      <v-btn
        icon
        flat
        v-tooltip:right="{ html: 'Show flagged items'}"
        v-if="showQueue"
        @click.native="showQueue = !showQueue"
      >
        <v-icon>format_list_bulleted</v-icon>
      </v-btn>

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
      :headers="headers"
      :items="events"
      :search="search"
      :no-data-text="noDataText"
    >
      <template slot="items" scope="props">
        <td @click.stop="viewEvent(props.item)">{{ props.item.title }}</td>
        <td class="text-xs-right" @click.stop="viewEvent(props.item)">{{ props.item.location }}</td>
        <td class="text-xs-right" @click.stop="viewEvent(props.item)">
          {{ setTime(props.item.created_at) }}
        </td>
        <td class="text-xs-right" v-if="!showQueue" @click.stop="viewEvent(props.item)">
          {{ props.item.is_approved ? 'Yes' : 'No' }}
        </td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import setTime from '@/services/setTime'

export default {
  name: 'Event',
  data () {
    return {
      search: '',
      pagination: {},
      showQueue: true,
      hasFlagged: true,
      setTime: setTime,
    }
  },
  computed: {
    title () {
      return `${this.showQueue ? 'Flagged' : 'All'} Events`
    },

    headers () {
      const headers = [
        {
          text: 'Title',
          value: 'title',
          align: 'left',
        },
        { text: 'Location', value: 'location' },
        { text: 'Created', value: 'created_at' },
      ]

      if (!this.showQueue) {
        headers.push({ text: 'Approved', value: 'approved' })
      }

      return headers
    },

    noDataText () {
      return `There are currently no ${this.hasFlagged ? 'Flagged' : ''} Events`
    },

    events () {
      const flaggedEvents = this.$store.state.events
        .filter(event => !event.is_approved)

      if (flaggedEvents < 1) {
        this.showQueue = false
      } else {
        this.hasFlagged = false
      }

      return this.showQueue
        ? flaggedEvents
        : this.$store.state.events
    },

    isLoading () {
      return this.$store.state.isTableLoading
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

    viewEvent (event) {
      this.$store.commit('SET_SELECTED_EVENT', event)
      this.$store.commit('OPEN_DIALOG', 'EventDialog')
    }
  },
  mounted () {
    this.$store.dispatch('GET_EVENTS')
  }
}
</script>

<style lang="stylus" scoped>
td
  cursor: pointer
</style>
