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
      <template slot="items" scope="props" @click.stop="openFlaggedItem">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">
          {{ props.item.category }}
        </td>
        <td class="text-xs-right">
          {{ new Date(props.item.created_at).toDateString() }}
        </td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>

    <!--<v-btn primary light @click.native.stop="isListingDialogOpen = !isListingDialogOpen">Open Dialog</v-btn>
    <listing-dialog :isListingDialogOpen="isListingDialogOpen" />-->
</template>

<script>
import ListingDialog from '@/components/dialogs/Listing'

const headers = [
  { text: 'Title', value: 'title', left: true },
  { text: 'Category', value: 'category' },
  { text: 'Created', value: 'created_at' },
]

export default {
  name: 'Listings',
  components: { ListingDialog },
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
      console.log('Listing', this.$store.state.listings)
      return this.$store.state.listings || []
    }
  },
  watch: {
    isListingDialogOpen: (value) => {
      console.log('Listings', value)
    }
  },
  methods: {
    openFlaggedItem: function () {
      console.log('opening...')
      this.$store.commit('OPEN_FLAGGED_DIALOG')
    }
  },
  mounted () {
    if (this.$store.state.listings.length < 1) {
      console.log(this.$store.state)
      this.$store.dispatch('GET_LISTINGS')
    }
  }
}
</script>

<style lang="stylus">

</style>
