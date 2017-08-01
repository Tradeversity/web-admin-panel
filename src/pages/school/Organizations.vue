<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      <span class="headline">
        Organizations
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
      :headers="headers"
      :items="organizations"
      :search="search"
      :no-data-text="noDataText"
    >

      <template slot="items" scope="props" >
        <td @click.stop="openOrganization(props.item)">
          {{ props.item.display_name }}
        </td>
        <td class="text-xs-right" @click.stop="openOrganization(props.item)">
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
  { text: 'Name', value: 'display_name', align: 'left' },
  { text: 'Created at', value: 'created_at' },
]

export default {
  name: 'Organizations',
  data () {
    return {
      search: '',
      pagination: {},
      isLoading: false,
      headers: headers,
      setTime: setTime,
    }
  },
  computed: {
    organizations () {
      return this.$store.getters.organizations
    },

    noDataText () {
      return `There are currently no Organizations`
    },
  },
  methods: {
    openOrganization (item) {
      this.$store.commit('SET_NEW_ORGANIZATION', item)
      this.$store.commit('OPEN_DIALOG', 'AddOrganizationDialog')

      // this.$store.dispatch('GET_ORGANIZATION', item)
      //   .then(() => {
      //     this.$store.commit('OPEN_DIALOG', 'AddOrganizationDialog')
      //   })
    },
    refresh () {
      this.isLoading = true
      this.$store.dispatch('GET_ORGANIZATIONS').then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      })
    }
  },
  mounted () {
    this.$store.dispatch('GET_ORGANIZATIONS')
  }
}
</script>

<style lang="stylus" scoped>
td
  cursor: pointer
</style>
