<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      <span class="headline">Sponsored Listings</span>
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
      :items="listings"
      :search="search"
      :no-data-text="noDataText"
    >
      <template slot="items" scope="props">
        <td @click.stop="openListing(props.item)">
          {{ props.item.title }}
        </td>
        <td class="text-xs-right" @click.stop="openListing(props.item)">
          {{ props.item.category }}
        </td>
        <td class="text-xs-right" @click.stop="openListing(props.item)">
          {{ setTime(props.item.created_at) }}
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

const headers = [
  { text: 'Title', value: 'title', align: 'left' },
  { text: 'Category', value: 'category' },
  { text: 'Created', value: 'created_at' },
]

export default {
  name: 'Sponsors',
  data: () => ({
    search: '',
    pagination: {},
    isLoading: false,
    headers: headers,
    setTime: setTime,
  }),
  computed: {
    listings () {
      return this.$store.state.sponsoredListings
    },

    noDataText () {
      return `There are currently no Sponsored Listings`
    },
  },
  methods: {
    openListing (item) {
      this.$store.commit('SET_SELECTED_LISTING', item)
      this.$store.commit('OPEN_DIALOG', 'ListingDialog')
    },

    refresh () {
      this.isLoading = true
      this.$store.dispatch('GET_SPONSORED_LISTINGS').then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      })
    },
  },
  mounted () {
    this.$store.dispatch('GET_SPONSORED_LISTINGS')
  }
}
</script>

<style lang="stylus" scoped>
td
  cursor: pointer
</style>
