<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      <span class="headline">{{ title }}</span>

      <v-btn
        icon
        flat
        v-tooltip:right="{ html: 'Show flagged items'}"
        v-if="!showFlagged"
        @click.native.stop="loadFlaggedItems"
      >
        <v-icon>flag</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-tooltip:right="{ html: 'Show flagged items'}"
        v-if="showFlagged"
        @click.native.stop="loadListings"
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
      :items="listings"
      :search="search"
      :no-data-text="noDataText"
    >
      <template slot="items" scope="props">
        <td @click.stop="openListing(props.item)">
          {{ props.item.title }}
        </td>
        <td
          class="text-xs-right"
          @click.stop="openListing(props.item)"
        >
          {{ props.item.category }}
        </td>
        <td
          class="text-xs-right"
          @click.stop="openListing(props.item)"
        >
          {{ setTime(props.item.created_at) }}
        </td>
        <!-- <td
          class="text-xs-right"
          v-if="!showFlagged"
          @click.stop="openListing(props.item)"
        >
          {{ props.item.}}
        </td> -->
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
  name: 'Listing',
  data: () => ({
    search: '',
    pagination: {},
    isListingDialogOpen: false,
    isLoading: false,
    showFlagged: true,
    setTime: setTime,
  }),
  computed: {
    title () {
      return `${this.showFlagged ? 'Flagged' : 'All'} Listings`
    },

    headers () {
      const headers = [
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Category', value: 'category' },
        { text: 'Created', value: 'created_at' },
      ]

      // if (!this.showFlagged) {
      //   headers.push({ text: 'Flagged', value: 'is_flagged' })
      // }

      return headers
    },

    noDataText () {
      return `There are currently no ${this.showFlagged ? 'Flagged' : ''} Listings`
    },

    listings () {
      return (this.showFlagged
      ? this.$store.getters.flaggedListings
      : this.$store.getters.listings) || []
    }
  },
  methods: {
    openListing (item) {
      item.isFlagged = this.showFlagged
      this.$store.commit('SET_SELECTED_LISTING', item)
      this.$store.commit('OPEN_DIALOG', 'ListingDialog')
    },

    loadListings () {
      this.showFlagged = false

      if (this.$store.state.listings.length < 1) {
        this.isLoading = true
        this.$store.dispatch('GET_LISTINGS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    },

    loadFlaggedItems () {
      this.showFlagged = true

      if (this.$store.state.flaggedListings.length < 1) {
        this.isLoading = true
        this.$store.dispatch('GET_FLAGGED_LISTINGS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    },

    refresh () {
      this.isLoading = true
      if (this.showFlagged) {
        this.$store.dispatch('GET_FLAGGED_LISTINGS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      } else {
        this.$store.dispatch('GET_LISTINGS').then(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_FLAGGED_LISTINGS')
    this.$store.dispatch('GET_LISTINGS')

    if (this.$store.state.flaggedListings.length < 1) {
      this.showFlagged = false
    }
  }
}
</script>

<style lang="stylus" scoped>
td
  cursor: pointer

.tr-click-wrapper
  width: 100%
  display: inline-block
</style>
