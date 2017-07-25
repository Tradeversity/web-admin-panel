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
            v-model="filter"
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
            v-if="keywords.additional_filters.length > 0"
            class="pt-3 pb-4"
          >
            <v-chip
              v-for="keyword in keywords.additional_filters"
              @click.native.stop="removeFilter(keyword)"
              :key="keyword"
              close
            >{{ keyword }}</v-chip>
          </v-card-text>
          <v-card-text v-else>
            No filters have been set
          </v-card-text>

      </v-card>
    </v-flex>
    <v-flex xs12 class="text-xs-center mt-5">
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
    </v-flex>
    <v-flex xs12 v-if="hideDefaults">
      <v-card class="default-card">
        <v-card-title>
          <span class="headline">
            Default filters
          </span>
        </v-card-title>
        <v-list>
          <v-list-tile
            v-for="keyword in keywords.disabled_filters"
            @click.native.stop="removeFilter(keyword)"
            :key="keyword"
          >
            <v-list-tile-content>
              {{ keyword }}
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>remove_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Filters',
    data () {
      return {
        hideDefaults: false,
        filter: '',
        addFilterError: false,
        filterHint: 'Flags any listings that matches this keyword',
      }
    },
    computed: {
      keywords () {
        return this.$store.state.filters
      }
    },
    methods: {
      addFilter () {
        if (this.$store.state.filters.indexOf(this.filter) !== -1) {
          this.addFilterError = true
          this.filterHint = 'Duplicate keyword'
          return false
        }

        if (this.filter.length > 2) {
          this.$store.commit('ADD_FILTER_KEYWORD', this.filter)
          this.$store.dispatch('PUT_WORD_FILTER', this.$store.state.filters)
          this.filter = ''
        } else {
          this.addFilterError = true
          this.filterHint = 'Keyword needs to be longer than 2 characters'
        }
      },

      removeFilter (filter) {
        this.$store.commit('REMOVE_FILTER_KEYWORD', filter)
        this.$store.dispatch('PUT_WORD_FILTER', this.$store.state.filters)
      }
    },
    watch: {
      filter (newValue, oldValue) {
        if (this.addFilterError && newValue !== oldValue) {
          this.addFilterError = false
          this.filterHint = 'Clean up some listings'
        }
      }
    },
    mounted () {
      if (this.$store.state.filters.length < 1) {
        this.$store.dispatch('GET_WORD_FILTER')
      }
    }
  }
</script>

<style lang="stylus" scoped>
.container
  position: relative

.default-card
  max-width: 400px
  margin: 0 auto
  margin-top: 30px
</style>
