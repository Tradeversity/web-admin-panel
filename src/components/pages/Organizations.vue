<template>
  <v-card>
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
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="organizations"
      :search="search"
    >

      <template slot="items" scope="props" >
        <td>
          {{ props.item.title }}
        </td>
        <td
          class="text-xs-right"

        >
          {{ props.item.category }}
        </td>
        <td
          class="text-xs-right"

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
  { text: 'Name', value: 'name', left: true },
  { text: 'Email', value: 'email' },
]

export default {
  name: 'Organizations',
  data () {
    return {
      search: '',
      pagination: {},
      headers: headers,
    }
  },
  computed: {
    organizations () {
      return this.$store.state.organizations.length > 0 &&
        this.$store.state.organizations.map((value) => {
          value['name'] = `${value.first_name} ${value.last_name}`
          return value
        }) || []
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
