<template>
  <v-layout row wrap justify-space-between>
    <v-flex xs12 sm6 md4 class="mb-4">
      <v-card>

        <v-card-title>
          <span class="headline">
            Set filter
          </span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            name="filterKeyword"
            label="Keyword"
            :hint="filterHint"
            :error="addFilterError"
            v-model="filterQuery"
            autofocus
            min="3"
            append-icon="arrow_forward"
            :append-icon-cb="addFilter"
            @keyup.native.enter="addFilter"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md7>
      <v-card>
        <v-card-title>
          <span class="headline">
            Active filters
          </span>
        </v-card-title>

        <v-card-text
          v-if="additionalFilters.length > 0"
          class="pt-3 pb-4"
        >
          <v-chip
            v-for="keyword in additionalFilters"
            @click.native.stop="removeFilter(keyword)"
            :key="keyword"
            label
          >
            {{ keyword }}
            <v-icon right class="pl-1">close</v-icon>
          </v-chip>
        </v-card-text>
        <v-card-text v-else>
          No filters have been set
        </v-card-text>
      </v-card>
    </v-flex>

   <!-- <v-flex xs12 class="text-xs-center mt-5">
      <v-btn
        primary
        v-if="hideDefaults"
        @click.native.stop="hideDefaults = false"
      >
        Hide default filters
      </v-btn>

      <v-btn
        primary
        v-else
        @click.native.stop="hideDefaults = true"
      >
        Show default filters
      </v-btn>
    </v-flex>-->

    <v-flex xs12 sm6 v-if="hideDefaults">
      <v-card class="default-card">
        <v-card-title>
          <span class="headline">
            Active default
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="searchActive"
          ></v-text-field>
        </v-card-text>
        <v-list class="scrollable">
          <v-list-tile
            v-for="filter in filteredDefaultFilters"
            @click.native.stop="removeDisabledFilter(filter)"
            :key="filter"
          >
            <v-list-tile-content>
              {{ filter }}
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>remove_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            v-if="filteredDefaultFilters.length === 0"
          >
            Your search doesn't match any filters
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 v-if="hideDefaults">
      <v-card class="default-card">
        <v-card-title>
          <span class="headline">
            Disabled default
          </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="searchDisabled"
          ></v-text-field>
        </v-card-text>
        <v-list class="scrollable">
          <v-list-tile
            v-for="filter in filteredDisabledFilters"
            @click.native.stop="addDisabledFilter(filter)"
            :key="filter"
          >
            <v-list-tile-content>
              {{ filter }}
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>remove_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile
            v-if="filteredDisabledFilters.length === 0"
          >
            Your search doesn't match any filters
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { indexOf, filter } from 'lodash'

export default {
  name: 'Filters',
  data () {
    return {
      searchActive: '',
      searchDisabled: '',
      filterQuery: '',
      hideDefaults: false,
      addFilterError: false,
      filterHint: 'Flags any listings that matches this keyword',
    }
  },
  computed: {
    keywords () {
      return this.$store.state.filters
    },

    filteredDefaultFilters () {
      const filters = this.$store.getters.defaultFilters || []

      // If search query, filter items
      const searchedFilters = this.searchActive.length > 0 &&
        filter(filters, filter =>
          indexOf(filter.toLowerCase(), this.searchActive.toLowerCase()) > -1)

      return searchedFilters || filters
    },

    additionalFilters () {
      return this.$store.getters.additionalFilters || []
    },

    filteredDisabledFilters () {
      const filters = this.$store.getters.disabledFilters

      // If search query, filter items
      const searchedFilters = this.searchDisabled.length > 0 &&
        filter(filters, filter =>
          indexOf(filter.toLowerCase(), this.searchDisabled.toLowerCase()) > -1)

      return searchedFilters || filters
    },
  },
  methods: {
    addFilter () {
      if (indexOf(this.additionalFilters, this.filterQuery) !== -1) {
        this.addFilterError = true
        this.filterHint = 'Duplicate keyword'
        return false
      }

      if (this.filterQuery.length > 2) {
        this.$store.commit('ADD_FILTER_KEYWORD', this.filterQuery)
        this.$store.dispatch('PUT_WORD_FILTER')
        this.filterQuery = ''
      } else {
        this.addFilterError = true
        this.filterHint = 'Keyword needs to be longer than 2 characters'
      }
    },

    removeFilter (filter) {
      this.$store.commit('REMOVE_FILTER_KEYWORD', filter)
      this.$store.dispatch('PUT_WORD_FILTER')
    },

    removeDisabledFilter (filter) {
      this.$store.commit('ADD_DISABLED_FILTER', filter)
      this.$store.dispatch('PUT_WORD_FILTER')
    },

    addDisabledFilter (filter) {
      this.$store.commit('REMOVE_DISABLED_FILTER', filter)
      this.$store.dispatch('PUT_WORD_FILTER')
    }
  },
  watch: {
    filterQuery (newValue, oldValue) {
      if (this.addFilterError && newValue !== oldValue) {
        this.addFilterError = false
        this.filterHint = 'Clean up some listings'
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_WORD_FILTER')
    this.$store.dispatch('GET_DEFAULT_FILTERS')
  }
}
</script>

<style lang="stylus" scoped>
.container
  position: relative

.chip
  cursor: pointer

.default-card
  max-width: 400px
  margin: 0 auto
  margin-top: 30px
  margin-bottom: 40px

.scrollable
  max-height: 400px
  overflow-y: auto
</style>
