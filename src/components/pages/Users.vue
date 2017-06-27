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

    <!--<fab
      :position="position"
      :bg-color="bgColor"
      :actions="fabActions"
      @addUser="addUser"
    ></fab>

    <v-dialog v-model="isUserDialogOpen">
      <v-card>
        <v-card-row>
          <v-card-title>User Profile</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            <v-text-field label="Email" required></v-text-field>
            <v-text-field label="Password" type="password" required></v-text-field>
            <v-text-field label="Legal first name" required></v-text-field>
            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            <v-text-field label="Legal last name" hint="example of persistent helper text"
              persistent-hint
              required
            ></v-text-field>
            <v-select
              label="Age"
              required
              :items="['0-17', '18-29', '30-54', '54+']"
            ></v-select>
            <small>*indicates required field</small>
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="blue--text darken-1" flat @click.native="isUserDialogOpen = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="isUserDialogOpen = false">Save</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>-->
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
