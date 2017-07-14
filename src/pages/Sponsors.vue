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
    >

      <template slot="items" scope="props" >
        <td @click.stop="openListing(props.item)">
          <v-edit-dialog
            @open="props.item._title = props.item.title"
            @cancel="props.item.title = props.item._title || props.item.title"
            lazy
          > {{ props.item.title }}
            <v-text-field
              slot="input"
              label="Edit"
              v-bind:value="props.item.title"
              v-on:change="val => props.item.title = val"
              single-line counter="counter"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right" @click.stop="openListing(props.item)">
          {{ props.item.category }}
        </td>
        <td class="text-xs-right" @click.stop="openListing(props.item)">
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
import _ from 'lodash'

const headers = [
  { text: 'Title', value: 'title', left: true },
  { text: 'Category', value: 'category' },
  { text: 'Created', value: 'created_at' },
]

export default {
  name: 'Sponsors',
  data () {
    return {
      search: '',
      pagination: {},
      isLoading: false,
      headers: headers,
    }
  },
  computed: {
    listings () {
      console.log(this.$store.state.sponsoredListings)
      return _.isObject(this.$store.state.sponsoredListings) ? [
        {
          title: 'grass',
          category: 'earth',
          created_at: 15645645635,
        }, {
          title: 'house',
          category: 'pizza',
          created_at: 15645645635,
        },
      ] : this.$store.state.sponsoredListings
    }
  },
  methods: {
    refresh () {
      this.isLoading = true
      this.$store.dispatch('GET_SPONSORED_LISTINGS').then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      })
    },

    openListing (item) {
      this.$store.commit('SET_SELECTED_LISTING', item)
      this.$store.commit('OPEN_VIEW_LISTING_DIALOG')
    },
  },
  mounted () {
    this.$store.dispatch('GET_SPONSORED_LISTINGS')
  }
}
</script>

<style scoped>

</style>
