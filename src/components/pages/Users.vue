<template>
  <v-card>
    <v-card-title>
      Users
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
      v-bind:headers="headers"
      v-bind:items="flaggedUsers"
      v-bind:search="search"
    >
      <template slot="items" scope="props">
        <td>
          <v-edit-dialog
            @open="props.item._name = props.item.name"
            @cancel="props.item.name = props.item._name || props.item.name"
            lazy
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              label="Edit"
              v-bind:value="props.item.name"
              v-on:change="val => props.item.name = val"
              single-line counter="counter"
            ></v-text-field>
            <v-text-field
              slot="input"
              label="Edit"
              v-bind:value="props.item.name"
              v-on:change="val => props.item.name = val"
              single-line counter="counter"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.reports }}</td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import fab from 'vue-fab'

export default {
  name: 'Users',
  components: {
    fab
  },
  data () {
    return {
      isUserDialogOpen: false,
      search: '',
      pagination: {},
      bgColor: '#52A9DB',
      position: 'bottom-right',
      fabActions: [
        {
          name: 'addUser',
          icon: 'account_circle'
        }
      ],
      headers: [
        {
          text: 'Name',
          value: 'name',
          left: true,
        },
        { text: 'Email', value: 'email' },
        { text: 'Flags', value: 'flags' },
      ],
    }
  },
  computed: {
    flaggedUsers () {
      return this.$store.state.flaggedUsers
    }
  },
  methods: {
    addUser (event) {
      console.log('Adding user...')
      this.isUserDialogOpen = !this.isUserDialogOpen
    }
  },
  mounted () {
    if (this.$store.state.flaggedUsers.length < 1) {
      this.$store.dispatch('GET_FLAGGED_USERS')
      // this.$store.dispatch('GET_USERS')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
