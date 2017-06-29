<template>
  <v-card>
    <v-card-title>
      Flagged Listings
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
      :headers="headers"
      :items="listings"
      :search="search"
    >

      <template slot="items" scope="props" >
        <td @click.stop="openFlaggedItem(props.item)">
          {{ props.item.title }}
        </td>
        <td
          class="text-xs-right"
          @click.stop="openFlaggedItem(props.item)"
        >
          {{ props.item.category }}
        </td>
        <td
          class="text-xs-right"
          @click.stop="openFlaggedItem(props.item)"
        >
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
const headers = [
  { text: 'Title', value: 'title', left: true },
  { text: 'Category', value: 'category' },
  { text: 'Created', value: 'created_at' },
]

export default {
  name: 'Flagged',
  data () {
    return {
      search: '',
      pagination: {},
      isListingDialogOpen: false,
      headers: headers,
    }
  },
  computed: {
    listings () {
      return this.$store.state.flaggedListings || []
    }
  },
  watch: {
    isListingDialogOpen: (value) => {
      // console.log('Listings', value)
    }
  },
  methods: {
    openFlaggedItem: function (item) {
      this.$store.commit('SET_FLAGGED_ITEM', item)
      this.$store.commit('OPEN_FLAGGED_DIALOG')
    }
  },
  mounted () {
    if (this.$store.state.listings.length < 1) {
      // console.log(this.$store.state)
      this.$store.dispatch('GET_FLAGGED_LISTINGS')
    }
  }
}
</script>

<style lang="stylus" scoped>
.tr-click-wrapper
  width: 100%
  display: inline-block
</style>
