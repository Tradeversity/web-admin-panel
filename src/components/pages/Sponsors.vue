<template>
  <v-card>
    <v-card-title>
      Sponsored Listings
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
        <td>
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
</template>

<script>
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
      headers: headers,
    }
  },
  computed: {
    listings () {
      return [
        {
          title: 'grass',
          category: 'earth',
          created_at: 15645645635,
        }, {
          title: 'house',
          category: 'pizza',
          created_at: 15645645635,
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
