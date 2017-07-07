<template>
  <v-card>
    <v-progress-linear
      v-show="isLoading"
      :indeterminate="true"
    ></v-progress-linear>
    <v-card-title>
      Organizations
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
    >

      <template slot="items" scope="props" >
        <td>
          {{ props.item.display_name }}
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
</template>

<script>
const headers = [
  { text: 'Name', value: 'display_name', left: true },
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
    }
  },
  computed: {
    organizations () {
      return this.$store.state.organizations
    }
  },
  methods: {
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
    if (this.$store.state.organizations.length < 1) {
      this.$store.dispatch('GET_ORGANIZATIONS')
    }
  }
}
</script>

<style scoped>

</style>
